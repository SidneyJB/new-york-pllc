"""Run Google Ads report queries and write exports."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import date
from pathlib import Path
from typing import Any, TextIO

from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException

from google_ads.client import BASE, load_client, run_query
from google_ads.export import row_to_dict, write_csv, write_json
from google_ads.reports import Report, get_report


@dataclass
class PullResult:
    slug: str
    path: Path | None
    rows: int
    query: str


def build_query(report: Report, start: str, end: str) -> str:
    lines = ["SELECT", "  " + ",\n  ".join(report.fields), f"FROM {report.resource}"]
    clauses: list[str] = []
    if report.dated and report.slug != "change-history":
        clauses.append(f"segments.date BETWEEN '{start}' AND '{end}'")
    for clause in report.where:
        clauses.append(clause.format(start=start, end=end))
    if clauses:
        lines.append("WHERE " + "\n  AND ".join(clauses))
    if report.order_by:
        lines.append("ORDER BY " + ", ".join(report.order_by))
    if report.slug == "change-history":
        lines.append("LIMIT 10000")
    return "\n".join(lines)


def output_path(
    report: Report,
    *,
    start: str,
    end: str,
    output_dir: Path,
    output_format: str,
) -> Path:
    output_dir.mkdir(parents=True, exist_ok=True)
    suffix = output_format if output_format != "csv" else "csv"
    if report.dated:
        stem = f"Ads - {report.slug}_api_{start}_to_{end}"
    else:
        stem = f"Ads - {report.slug}_api_snapshot_{date.today().isoformat()}"
    return output_dir / f"{stem}.{suffix}"


def fetch_rows(
    client: GoogleAdsClient,
    customer_id: str,
    report: Report,
    query: str,
) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    for batch in run_query(client, customer_id, query):
        for row in batch.results:
            rows.append(row_to_dict(row, list(report.fields)))
    return rows


def pull_report(
    client: GoogleAdsClient,
    customer_id: str,
    slug: str,
    *,
    start: str,
    end: str,
    output_dir: Path,
    output_format: str = "csv",
    compat_names: bool = False,
    dry_run: bool = False,
    stdout: TextIO | None = None,
) -> PullResult:
    report = get_report(slug)
    query = build_query(report, start, end)

    if dry_run:
        print(f"# {report.slug}: {report.title}")
        print(query)
        print("")
        return PullResult(slug=slug, path=None, rows=0, query=query)

    rows = fetch_rows(client, customer_id, report, query)

    if stdout is not None:
        if output_format == "json":
            import json

            json.dump(rows, stdout, indent=2)
            stdout.write("\n")
        else:
            fieldnames = list(report.fields)
            writer = __import__("csv").DictWriter(stdout, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(rows)
        return PullResult(slug=slug, path=None, rows=len(rows), query=query)

    path = output_path(
        report,
        start=start,
        end=end,
        output_dir=output_dir,
        output_format=output_format,
    )
    if output_format == "json":
        write_json(path, rows)
    else:
        write_csv(path, list(report.fields), rows)

    if compat_names and report.compat_filename and output_format == "csv":
        compat = output_dir / report.compat_filename
        compat.write_bytes(path.read_bytes())

    return PullResult(slug=slug, path=path, rows=len(rows), query=query)


def pull_reports(
    slugs: list[str],
    *,
    customer_id: str,
    start: str,
    end: str,
    output_dir: Path | None = None,
    output_format: str = "csv",
    compat_names: bool = False,
    dry_run: bool = False,
    client: GoogleAdsClient | None = None,
) -> list[PullResult]:
    ads_client = client or load_client()
    out_dir = output_dir or BASE
    results: list[PullResult] = []

    for slug in slugs:
        try:
            result = pull_report(
                ads_client,
                customer_id,
                slug,
                start=start,
                end=end,
                output_dir=out_dir,
                output_format=output_format,
                compat_names=compat_names,
                dry_run=dry_run,
            )
        except GoogleAdsException as exc:
            messages = [error.message for error in exc.failure.errors]
            raise SystemExit(
                f"Report '{slug}' failed:\n" + "\n".join(messages)
            ) from exc
        results.append(result)

    return results


def print_account_info(client: GoogleAdsClient, customer_id: str) -> None:
    ga_service = client.get_service("GoogleAdsService")
    query = """
        SELECT
          customer.id,
          customer.descriptive_name,
          customer.currency_code,
          customer.time_zone,
          customer.manager,
          customer.test_account,
          customer.optimization_score
        FROM customer
        LIMIT 1
    """
    for batch in ga_service.search_stream(customer_id=customer_id, query=query):
        for row in batch.results:
            customer = row.customer
            print(f"Customer ID:      {customer.id}")
            print(f"Name:             {customer.descriptive_name}")
            print(f"Currency:         {customer.currency_code}")
            print(f"Time zone:        {customer.time_zone}")
            print(f"Manager account:  {customer.manager}")
            print(f"Test account:     {customer.test_account}")
            print(f"Optimization:     {customer.optimization_score:.2f}")
