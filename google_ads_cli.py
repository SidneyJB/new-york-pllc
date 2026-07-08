#!/usr/bin/env python3
"""
Google Ads API export CLI for NYPLLC.

Examples:
  .venv/bin/python google_ads_cli.py list
  .venv/bin/python google_ads_cli.py account
  .venv/bin/python google_ads_cli.py pull core
  .venv/bin/python google_ads_cli.py pull keywords search-terms --days 30
  .venv/bin/python google_ads_cli.py pull all --start 2025-10-22 --end 2026-04-23
  .venv/bin/python google_ads_cli.py pull campaigns --days 7 --compat
  .venv/bin/python google_ads_cli.py pull keywords --dry-run
  .venv/bin/python google_ads_cli.py query --sql "SELECT campaign.name FROM campaign LIMIT 5"
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from google_ads.client import BASE, customer_id, load_client, parse_date_range
from google_ads.pull import print_account_info, pull_report, pull_reports
from google_ads.reports import PRESETS, REPORTS, resolve_report_names


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Pull Google Ads reports for NYPLLC via API.",
    )
    subparsers = parser.add_subparsers(dest="command", required=True)

    list_parser = subparsers.add_parser("list", help="List available reports and presets")
    list_parser.add_argument(
        "--tag",
        help="Filter reports by tag (e.g. performance, search, structure)",
    )

    subparsers.add_parser("account", help="Show account metadata for the configured customer")

    pull_parser = subparsers.add_parser("pull", help="Pull one or more reports")
    pull_parser.add_argument(
        "reports",
        nargs="+",
        metavar="REPORT",
        help="Report slug or preset (core, performance, structure, all, keywords, ...)",
    )
    pull_parser.add_argument("--days", type=int, default=30, help="Rolling date range (default: 30)")
    pull_parser.add_argument("--start", help="Start date YYYY-MM-DD")
    pull_parser.add_argument("--end", help="End date YYYY-MM-DD")
    pull_parser.add_argument(
        "--output-dir",
        type=Path,
        default=BASE,
        help=f"Directory for exports (default: {BASE})",
    )
    pull_parser.add_argument(
        "--format",
        choices=("csv", "json"),
        default="csv",
        dest="output_format",
        help="Output format (default: csv)",
    )
    pull_parser.add_argument(
        "--customer-id",
        help="Override GOOGLE_ADS_CUSTOMER_ID from .env",
    )
    pull_parser.add_argument(
        "--compat",
        action="store_true",
        help="Also write ads_analysis-compatible filenames for keyword/search-term reports",
    )
    pull_parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print GAQL queries without calling the API",
    )
    pull_parser.add_argument(
        "--stdout",
        action="store_true",
        help="Write the first pulled report to stdout instead of a file",
    )

    query_parser = subparsers.add_parser("query", help="Run a custom GAQL query")
    query_parser.add_argument("--sql", required=True, help="GAQL query string")
    query_parser.add_argument("--customer-id", help="Override GOOGLE_ADS_CUSTOMER_ID from .env")
    query_parser.add_argument(
        "--output",
        type=Path,
        help="Optional CSV output path (prints rows to stdout if omitted)",
    )

    return parser


def cmd_list(args: argparse.Namespace) -> int:
    if args.tag:
        print(f"Reports tagged '{args.tag}':\n")
        for slug, report in sorted(REPORTS.items()):
            if args.tag in report.tags:
                dated = "dated" if report.dated else "snapshot"
                print(f"  {slug:<22} [{dated}] {report.title}")
        print("")
        return 0

    print("Presets:")
    for name, members in sorted(PRESETS.items()):
        print(f"  {name:<12} -> {', '.join(members)}")
    print("")
    print("Reports:")
    for slug, report in sorted(REPORTS.items()):
        dated = "dated" if report.dated else "snapshot"
        tags = ", ".join(report.tags) if report.tags else "-"
        print(f"  {slug:<22} [{dated}] {report.title}")
        print(f"{'':24} tags: {tags}")
    print("")
    print("Usage: google_ads_cli.py pull core")
    print("       google_ads_cli.py pull keywords campaigns --days 14")
    return 0


def cmd_account(args: argparse.Namespace) -> int:
    client = load_client()
    cid = customer_id(args.customer_id if hasattr(args, "customer_id") else None)
    print_account_info(client, cid)
    return 0


def cmd_pull(args: argparse.Namespace) -> int:
    slugs = resolve_report_names(args.reports)
    start, end = parse_date_range(days=args.days, start=args.start, end=args.end)
    cid = customer_id(args.customer_id)

    if args.stdout and len(slugs) != 1:
        raise SystemExit("--stdout only supports pulling a single report.")

    if args.dry_run:
        for slug in slugs:
            pull_report(
                load_client(),
                cid,
                slug,
                start=start,
                end=end,
                output_dir=args.output_dir,
                output_format=args.output_format,
                compat_names=args.compat,
                dry_run=True,
            )
        return 0

    client = load_client()
    if args.stdout:
        result = pull_report(
            client,
            cid,
            slugs[0],
            start=start,
            end=end,
            output_dir=args.output_dir,
            output_format=args.output_format,
            compat_names=args.compat,
            stdout=sys.stdout,
        )
        return 0

    results = pull_reports(
        slugs,
        customer_id=cid,
        start=start,
        end=end,
        output_dir=args.output_dir,
        output_format=args.output_format,
        compat_names=args.compat,
        client=client,
    )

    print(f"Date range: {start} to {end}")
    print(f"Customer:   {cid}")
    print("")
    for result in results:
        if result.path is None:
            continue
        size = result.path.stat().st_size
        print(f"  {result.slug:<22} {result.rows:>6,} rows  {result.path.name} ({size:,} bytes)")
        if args.compat and get_report_compat(result.slug):
            print(f"{'':24} compat -> {get_report_compat(result.slug)}")
    return 0


def get_report_compat(slug: str) -> str | None:
    report = REPORTS.get(slug)
    return report.compat_filename if report else None


def cmd_query(args: argparse.Namespace) -> int:
    import csv

    from google_ads.client import run_query
    from google_ads.export import row_to_dict

    client = load_client()
    cid = customer_id(args.customer_id)
    query = args.sql.strip()

    fieldnames: list[str] = []
    rows: list[dict] = []
    for batch in run_query(client, cid, query):
        for row in batch.results:
            if not fieldnames:
                # Best effort: infer from first row by walking common paths in query
                fieldnames = _infer_fields_from_query(query)
            if fieldnames:
                rows.append(row_to_dict(row, fieldnames))
            else:
                rows.append({"result": str(row)})

    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        with open(args.output, "w", newline="", encoding="utf-8") as handle:
            if rows and fieldnames:
                writer = csv.DictWriter(handle, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(rows)
            else:
                handle.write("result\n")
                for row in rows:
                    handle.write(f"{row.get('result', '')}\n")
        print(f"Wrote {args.output} ({len(rows):,} rows)")
        return 0

    if rows and fieldnames:
        writer = csv.DictWriter(sys.stdout, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)
    else:
        for row in rows:
            print(row.get("result", row))
    return 0


def _infer_fields_from_query(query: str) -> list[str]:
    upper = query.upper()
    select_idx = upper.find("SELECT")
    from_idx = upper.find("FROM")
    if select_idx == -1 or from_idx == -1:
        return []
    chunk = query[select_idx + len("SELECT") : from_idx]
    return [part.strip() for part in chunk.replace("\n", " ").split(",") if part.strip()]


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)

    if args.command == "list":
        return cmd_list(args)
    if args.command == "account":
        return cmd_account(args)
    if args.command == "pull":
        return cmd_pull(args)
    if args.command == "query":
        return cmd_query(args)
    parser.error(f"Unknown command: {args.command}")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
