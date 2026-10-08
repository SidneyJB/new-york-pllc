#!/usr/bin/env python3
"""
Checkout funnel by device (last 60 days) for F2 baseline.

Uses GA4 Data API when credentials are available:
  - page_view on /order or /order-llc (proxy: order page landings)
  - purchase (confirmation)

checkout_start / lead_start are Vercel Web Analytics custom events (not mirrored to GA4).
If GA4 is unavailable, prints setup instructions.

Run from the **new-york-pllc** git repo (sibling of PLLC-CRM under pllc-business):

  cd ~/Dev/pllc-business/new-york-pllc

Auth (recommended if gcloud shows “This app is blocked”):
  - GOOGLE_APPLICATION_CREDENTIALS → service account JSON; enable Google Analytics Data API
    on the GCP project; add the SA email in GA4 Admin → Property access management → Viewer.
    See reports/checkout-funnel-by-device-2026-10-07.md.

Auth (user ADC — often blocked for Analytics on gcloud’s default OAuth client):
  - Own OAuth desktop client + --client-id-file=... with gcloud auth application-default login
  - Or gcloud ADC with cloud-platform + analytics.readonly (may still be blocked)

Required:
  - GA4_PROPERTY_ID — numeric id from GA4 Admin → Property settings (not G-X6Y3R8ZTXS)

Usage:
  python3 -m venv .venv-ga4 && .venv-ga4/bin/pip install google-analytics-data
  export GA4_PROPERTY_ID=123456789
  .venv-ga4/bin/python scripts/pull_checkout_funnel_by_device.py --days 60
"""

from __future__ import annotations

import argparse
import datetime as dt
import os
import sys
from collections import defaultdict

MEASUREMENT_ID = "G-X6Y3R8ZTXS"
DEFAULT_DAYS = 60


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser()
    p.add_argument("--days", type=int, default=DEFAULT_DAYS)
    p.add_argument(
        "--out",
        type=str,
        default="reports/checkout-funnel-by-device-2026-10-07.md",
    )
    return p.parse_args()


def try_import_ga4():
    try:
        from google.analytics.data_v1beta import BetaAnalyticsDataClient
        from google.analytics.data_v1beta.types import (
            DateRange,
            Dimension,
            Filter,
            FilterExpression,
            Metric,
            RunReportRequest,
        )

        return BetaAnalyticsDataClient, RunReportRequest, DateRange, Dimension, Metric, Filter, FilterExpression
    except ImportError:
        return None


def resolve_property_id() -> str | None:
    explicit = os.environ.get("GA4_PROPERTY_ID", "").strip()
    if explicit:
        return explicit
    print(
        "Set GA4_PROPERTY_ID to the numeric Property ID from GA4 Admin → Property settings.\n"
        f"(Measurement ID on site is {MEASUREMENT_ID}; that is not the property id.)",
        file=sys.stderr,
    )
    return None


def run_event_report(client, request_factory, property_id: str, event_name: str, days: int):
    RunReportRequest, DateRange, Dimension, Metric, Filter, FilterExpression = request_factory[1:]
    end = dt.date.today()
    start = end - dt.timedelta(days=days)
    request = RunReportRequest(
        property=f"properties/{property_id}",
        dimensions=[Dimension(name="deviceCategory")],
        metrics=[Metric(name="eventCount")],
        date_ranges=[DateRange(start_date=start.isoformat(), end_date=end.isoformat())],
        dimension_filter=FilterExpression(
            filter=Filter(
                field_name="eventName",
                string_filter=Filter.StringFilter(value=event_name),
            )
        ),
    )
    response = client.run_report(request)
    out: dict[str, int] = defaultdict(int)
    for row in response.rows:
        device = row.dimension_values[0].value or "(not set)"
        count = int(row.metric_values[0].value or "0")
        out[device] += count
    return dict(out)


def run_order_page_views(client, request_factory, property_id: str, days: int):
    RunReportRequest, DateRange, Dimension, Metric, Filter, FilterExpression = request_factory[1:]
    end = dt.date.today()
    start = end - dt.timedelta(days=days)
    request = RunReportRequest(
        property=f"properties/{property_id}",
        dimensions=[Dimension(name="deviceCategory")],
        metrics=[Metric(name="screenPageViews")],
        date_ranges=[DateRange(start_date=start.isoformat(), end_date=end.isoformat())],
        dimension_filter=FilterExpression(
            filter=Filter(
                field_name="pagePath",
                string_filter=Filter.StringFilter(
                    match_type=Filter.StringFilter.MatchType.PARTIAL_REGEXP,
                    value=r"^/order(-llc)?(/|$)",
                ),
            )
        ),
    )
    response = client.run_report(request)
    out: dict[str, int] = defaultdict(int)
    for row in response.rows:
        device = row.dimension_values[0].value or "(not set)"
        count = int(row.metric_values[0].value or "0")
        out[device] += count
    return dict(out)


def pct(part: int, whole: int) -> str:
    if whole <= 0:
        return "n/a"
    return f"{100.0 * part / whole:.1f}%"


def write_report(path: str, days: int, order_views: dict, purchases: dict) -> None:
    devices = sorted(set(order_views) | set(purchases))
    lines = [
        f"# Checkout funnel by device (last {days} days)",
        "",
        f"Generated: {dt.date.today().isoformat()}",
        "",
        "Source: GA4 property for `www.nypllc.com` (`G-X6Y3R8ZTXS`).",
        "",
        "**Note:** `checkout_start` and `lead_start` fire to **Vercel Web Analytics** only.",
        "This report uses **order page views** (`/order`, `/order-llc`) as the upper-funnel proxy,",
        "then **GA4 `purchase`** on the confirmation page.",
        "",
        "| Device | Order page views | Purchases | Purchase / order-page view |",
        "|--------|------------------|-----------|----------------------------|",
    ]
    for device in devices:
        views = order_views.get(device, 0)
        buys = purchases.get(device, 0)
        lines.append(f"| {device} | {views} | {buys} | {pct(buys, views)} |")
    totals_views = sum(order_views.values())
    totals_buys = sum(purchases.values())
    lines.append(f"| **All** | **{totals_views}** | **{totals_buys}** | **{pct(totals_buys, totals_views)}** |")
    lines.extend(
        [
            "",
            "## F2 read",
            "",
            "Compare **mobile vs desktop** purchase rate on order-page views.",
            "Largest gap device is the first mobile pass target (integrated plan F2).",
            "",
            "## Vercel (optional second step)",
            "",
            "In Vercel → Analytics → Events, filter `checkout_start` and `purchase` by device",
            "for the same window to align with on-site checkout_started counts.",
            "",
        ]
    )
    os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    print(f"Wrote {path}")


def main() -> int:
    args = parse_args()
    ga4 = try_import_ga4()
    if not ga4:
        print(
            "Install google-analytics-data, then authenticate and set the property id:\n"
            "  cd ~/Dev/pllc-business/new-york-pllc\n"
            "  python3 -m venv .venv-ga4 && .venv-ga4/bin/pip install google-analytics-data\n"
            "  gcloud auth application-default login "
            "--scopes=https://www.googleapis.com/auth/cloud-platform,"
            "https://www.googleapis.com/auth/analytics.readonly\n"
            "  export GA4_PROPERTY_ID=<numeric id from GA4 Admin → Property settings>",
            file=sys.stderr,
        )
        return 1

    property_id = resolve_property_id()
    if not property_id:
        return 1

    BetaAnalyticsDataClient, *rest = ga4
    try:
        client = BetaAnalyticsDataClient()
    except Exception as exc:  # noqa: BLE001
        print(
            f"GA4 client auth failed: {exc}\n"
            "Run: gcloud auth application-default login "
            "--scopes=https://www.googleapis.com/auth/cloud-platform,"
            "https://www.googleapis.com/auth/analytics.readonly",
            file=sys.stderr,
        )
        return 1

    factory = (BetaAnalyticsDataClient, *rest)
    order_views = run_order_page_views(client, factory, property_id, args.days)
    purchases = run_event_report(client, factory, property_id, "purchase", args.days)
    write_report(args.out, args.days, order_views, purchases)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
