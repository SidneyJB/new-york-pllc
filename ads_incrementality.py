#!/usr/bin/env python3
"""
Incrementality tooling for NYPLLC Google Ads.

Two questions this answers:

  cannibalization  Which queries are we PAYING for that we already rank for
                   organically? Needs a manual Search Console export (see
                   --help for the exact steps).

  recovery         Is delivery actually recovering after the 2026-08-04
                   negative-list fix, and are extra Google-attributed orders
                   NEW orders or just re-attributed ones?

Examples:
  .venv/bin/python ads_incrementality.py cannibalization --gsc "gsc/Queries.csv"
  .venv/bin/python ads_incrementality.py cannibalization --gsc "gsc/Queries.csv" --days 90 --out cann.csv
  .venv/bin/python ads_incrementality.py recovery --weeks 16
  .venv/bin/python ads_incrementality.py recovery --weeks 16 --orders ../orders-attribution.csv
"""

from __future__ import annotations

import argparse
import csv
import re
import sys
from collections import defaultdict
from datetime import date, timedelta
from pathlib import Path

from google_ads.client import BASE, customer_id, load_client

# The day the stop-word negatives were removed and Sales geo was reverted.
FIX_DATE = date(2026, 8, 4)

# Organic position at or above which a paid click is largely buying a click we
# would likely have won for free.
TOP_RANK_CUTOFF = 3.0


def _norm(q: str) -> str:
    """Normalise a query so GSC and Ads text join reliably."""
    return re.sub(r"\s+", " ", q.strip().lower())


def _run(client, cid, query):
    """Materialise a GAQL stream. The service must outlive the stream."""
    service = client.get_service("GoogleAdsService")
    rows = []
    for batch in service.search_stream(customer_id=cid, query=query):
        rows.extend(batch.results)
    return rows


# --------------------------------------------------------------------------
# Search Console CSV
# --------------------------------------------------------------------------

GSC_QUERY_COLS = ("top queries", "query", "queries", "search query")
GSC_CLICK_COLS = ("clicks", "url clicks")
GSC_IMPR_COLS = ("impressions",)
GSC_POS_COLS = ("position", "average position", "avg. position", "avg position")


def _pick(header: list[str], candidates: tuple[str, ...]) -> int | None:
    lowered = [h.strip().lower().lstrip("\ufeff") for h in header]
    for cand in candidates:
        if cand in lowered:
            return lowered.index(cand)
    return None


def _to_float(raw: str) -> float:
    cleaned = (raw or "").strip().replace("%", "").replace(",", "")
    try:
        return float(cleaned)
    except ValueError:
        return 0.0


def load_gsc(path: Path) -> dict[str, dict]:
    """Parse a Search Console 'Queries' CSV export."""
    if not path.exists():
        raise SystemExit(f"GSC export not found: {path}")

    with path.open(newline="", encoding="utf-8-sig") as fh:
        rows = list(csv.reader(fh))
    if not rows:
        raise SystemExit(f"GSC export is empty: {path}")

    header = rows[0]
    qi = _pick(header, GSC_QUERY_COLS)
    ci = _pick(header, GSC_CLICK_COLS)
    ii = _pick(header, GSC_IMPR_COLS)
    pi = _pick(header, GSC_POS_COLS)

    if qi is None or pi is None:
        raise SystemExit(
            f"Could not find query/position columns in {path}.\n"
            f"Header was: {header}\n"
            "Expected a Search Console Queries export with 'Top queries' and 'Position'."
        )

    out: dict[str, dict] = {}
    for row in rows[1:]:
        if not row or len(row) <= max(x for x in (qi, ci, ii, pi) if x is not None):
            continue
        q = _norm(row[qi])
        if not q:
            continue
        out[q] = {
            "query": q,
            "clicks": _to_float(row[ci]) if ci is not None else 0.0,
            "impressions": _to_float(row[ii]) if ii is not None else 0.0,
            "position": _to_float(row[pi]),
        }
    if not out:
        raise SystemExit(f"No usable rows parsed from {path}")
    return out


# --------------------------------------------------------------------------
# cannibalization
# --------------------------------------------------------------------------

def fetch_ads_terms(client, cid, start: str, end: str) -> dict[str, dict]:
    rows = _run(
        client,
        cid,
        f"""
        SELECT search_term_view.search_term, campaign.name,
               metrics.impressions, metrics.clicks,
               metrics.cost_micros, metrics.conversions
        FROM search_term_view
        WHERE segments.date BETWEEN '{start}' AND '{end}'
        """,
    )
    agg: dict[str, dict] = {}
    for r in rows:
        q = _norm(r.search_term_view.search_term)
        d = agg.setdefault(
            q, {"query": q, "impressions": 0, "clicks": 0, "cost": 0.0, "conv": 0.0, "campaigns": set()}
        )
        d["impressions"] += r.metrics.impressions
        d["clicks"] += r.metrics.clicks
        d["cost"] += r.metrics.cost_micros / 1e6
        d["conv"] += r.metrics.conversions
        d["campaigns"].add(r.campaign.name)
    return agg


def classify(paid: dict | None, organic: dict | None) -> str:
    if paid and not organic:
        return "PAID_ONLY"
    if organic and not paid:
        return "ORGANIC_ONLY"
    pos = organic["position"]
    if pos <= TOP_RANK_CUTOFF:
        return "OVERLAP_TOP3"
    if pos <= 10:
        return "OVERLAP_PAGE1"
    return "OVERLAP_DEEP"


EXPLAIN = {
    "OVERLAP_TOP3": "Paying for clicks on queries we already rank 1-3 for — highest cannibalization risk",
    "OVERLAP_PAGE1": "Ranking 4-10; paid adds real visibility but partially overlaps",
    "OVERLAP_DEEP": "Ranking past page 1 — paid is doing the work, largely incremental",
    "PAID_ONLY": "No organic presence at all — fully incremental paid traffic",
    "ORGANIC_ONLY": "Ranking but not bidding — check whether these are worth buying",
}
ORDER = ["OVERLAP_TOP3", "OVERLAP_PAGE1", "OVERLAP_DEEP", "PAID_ONLY", "ORGANIC_ONLY"]

# Warn when GSC and Ads windows differ by more than this many days.
GSC_WINDOW_TOLERANCE_DAYS = 3


def _check_gsc_window(ads_start: str, ads_end: str, gsc_start: str | None, gsc_end: str | None) -> None:
    if gsc_start or gsc_end:
        if not (gsc_start and gsc_end):
            raise SystemExit("Provide both --gsc-start and --gsc-end, or neither.")
        gsc_s = date.fromisoformat(gsc_start)
        gsc_e = date.fromisoformat(gsc_end)
        ads_s = date.fromisoformat(ads_start)
        ads_e = date.fromisoformat(ads_end)
        start_gap = abs((ads_s - gsc_s).days)
        end_gap = abs((ads_e - gsc_e).days)
        if start_gap > GSC_WINDOW_TOLERANCE_DAYS or end_gap > GSC_WINDOW_TOLERANCE_DAYS:
            print(
                "\n!!! WARNING: GSC and Ads date windows do not align !!!\n"
                f"    Ads window: {ads_start} to {ads_end}\n"
                f"    GSC window: {gsc_start} to {gsc_end}\n"
                f"    Start dates differ by {start_gap} day(s); end dates by {end_gap} day(s).\n"
                "    Organic rankings and paid spend are being compared across different\n"
                "    periods — overlap percentages may be misleading. Continuing anyway.\n"
            )
        else:
            print(f"GSC window : {gsc_start} to {gsc_end}  (aligned with Ads window)")
        return

    print(
        f"Ads window : {ads_start} to {ads_end}\n"
        "NOTE: Confirm your GSC export covers the same date range. If it does not,\n"
        "      re-export with matching dates or pass --gsc-start / --gsc-end so this\n"
        "      tool can check alignment."
    )


def cmd_cannibalization(args) -> int:
    end = args.end or date.today().isoformat()
    start = args.start or (date.fromisoformat(end) - timedelta(days=args.days - 1)).isoformat()

    gsc = load_gsc(Path(args.gsc))
    _check_gsc_window(start, end, args.gsc_start, args.gsc_end)
    client = load_client()
    cid = customer_id(args.customer_id)
    paid = fetch_ads_terms(client, cid, start, end)

    if args.gsc_start and args.gsc_end:
        print()
    print(f"GSC export : {args.gsc}  ({len(gsc)} queries)")
    print(f"Ads terms  : {len(paid)} queries\n")

    merged = []
    organic_only = []
    for q in set(gsc) | set(paid):
        p, o = paid.get(q), gsc.get(q)
        row = {
            "query": q,
            "bucket": classify(p, o),
            "organic_position": round(o["position"], 1) if o else "",
            "organic_clicks": int(o["clicks"]) if o else 0,
            "paid_clicks": int(p["clicks"]) if p else 0,
            "paid_cost": round(p["cost"], 2) if p else 0.0,
            "paid_conv": round(p["conv"], 1) if p else 0.0,
            "campaigns": " | ".join(sorted(p["campaigns"])) if p else "",
        }
        if o and not p:
            organic_only.append(row)
        else:
            merged.append(row)

    totals = defaultdict(lambda: {"n": 0, "cost": 0.0, "clicks": 0, "conv": 0.0})
    for m in merged:
        t = totals[m["bucket"]]
        t["n"] += 1
        t["cost"] += m["paid_cost"]
        t["clicks"] += m["paid_clicks"]
        t["conv"] += m["paid_conv"]
    if organic_only:
        totals["ORGANIC_ONLY"]["n"] = len(organic_only)

    spend = sum(t["cost"] for t in totals.values()) or 1.0

    print("=== PAID SPEND BY ORGANIC OVERLAP ===\n")
    print(f"{'bucket':<15} {'queries':>8} {'clicks':>7} {'cost':>9} {'% spend':>8} {'conv':>6}")
    for b in ORDER:
        if b not in totals:
            continue
        t = totals[b]
        print(
            f"{b:<15} {t['n']:>8} {t['clicks']:>7} ${t['cost']:>8.0f} "
            f"{t['cost'] / spend * 100:>7.1f}% {t['conv']:>6.1f}"
        )
    print()
    for b in ORDER:
        if b in totals:
            print(f"  {b:<15} {EXPLAIN[b]}")

    risk = totals["OVERLAP_TOP3"]["cost"]
    print(
        f"\n>>> Cannibalization exposure: ${risk:.0f} of ${spend:.0f} "
        f"({risk / spend * 100:.1f}%) went to queries already ranking top {TOP_RANK_CUTOFF:.0f}."
    )
    print(
        "    This is an upper bound, not a refund estimate — some of those clicks\n"
        "    would not have converted organically. Treat it as the set to test."
    )

    print("\n=== TOP 15 CANNIBALIZATION CANDIDATES (by paid cost) ===")
    top = sorted(
        (m for m in merged if m["bucket"] == "OVERLAP_TOP3"),
        key=lambda m: -m["paid_cost"],
    )[:15]
    if top:
        print(f"{'query':<38} {'pos':>5} {'org clk':>8} {'paid clk':>9} {'cost':>8} {'conv':>6}")
        for m in top:
            print(
                f"{m['query'][:37]:<38} {m['organic_position']:>5} {m['organic_clicks']:>8} "
                f"{m['paid_clicks']:>9} ${m['paid_cost']:>7.0f} {m['paid_conv']:>6.1f}"
            )
    else:
        print("  none — no paid query currently ranks in the organic top 3")

    if organic_only:
        print(f"\n=== ORGANIC-ONLY ({len(organic_only)} GSC queries with no paid spend) ===")
        print(f"{'query':<38} {'pos':>5} {'org clk':>8}")
        for m in sorted(organic_only, key=lambda m: -m["organic_clicks"])[:10]:
            print(
                f"{m['query'][:37]:<38} {m['organic_position']:>5} {m['organic_clicks']:>8}"
            )
        if len(organic_only) > 10:
            print(f"  ... and {len(organic_only) - 10} more (see --out CSV)")

    if args.out:
        out = Path(args.out)
        all_rows = merged + organic_only
        if not all_rows:
            raise SystemExit("No rows to write.")
        with out.open("w", newline="", encoding="utf-8") as fh:
            w = csv.DictWriter(fh, fieldnames=list(all_rows[0].keys()))
            w.writeheader()
            w.writerows(
                sorted(all_rows, key=lambda m: (ORDER.index(m["bucket"]), -m["paid_cost"]))
            )
        print(f"\nWrote {len(all_rows)} rows -> {out}")

    print(
        "\nCaveat: Google only reports search terms that clear a privacy threshold,\n"
        "so low-volume paid queries are missing from the Ads side of this join."
    )
    return 0


# --------------------------------------------------------------------------
# recovery
# --------------------------------------------------------------------------

def _week_marker(week: str) -> str:
    return ">>>" if date.fromisoformat(week) >= FIX_DATE - timedelta(days=6) else "   "


def _print_recovery_table(
    weeks: dict[str, dict],
    *,
    show_eligible: bool,
    eligible_approx: bool = False,
    orders: dict[str, dict] | None = None,
) -> None:
    head = f"{'week':<12}"
    if show_eligible:
        label = "eligible" if not eligible_approx else "elig~"
        head += f" {label:>9}"
    head += f" {'impr':>7} {'clicks':>7} {'cost':>8} {'adsConv':>8}"
    if orders:
        head += f" {'orders':>7} {'gClick':>7} {'untagged':>9}"
    print(head)

    for w in sorted(weeks):
        d = weeks[w]
        mark = _week_marker(w)
        line = f"{mark}{w:<9}"
        if show_eligible:
            elig = d.get("eligible", 0)
            if eligible_approx:
                line += f" {elig:>9.0f}~"
            else:
                line += f" {elig:>9.0f}"
        line += (
            f" {d['impr']:>7.0f} {d['clicks']:>7.0f} "
            f"${d['cost']:>7.0f} {d['conv']:>8.1f}"
        )
        if orders:
            o = orders.get(w)
            line += (
                f" {o['orders']:>7} {o['gclick']:>7} {o['untagged']:>9}"
                if o
                else f" {'-':>7} {'-':>7} {'-':>9}"
            )
        print(line)


def cmd_recovery(args) -> int:
    client = load_client()
    cid = customer_id(args.customer_id)
    start = (date.today() - timedelta(weeks=args.weeks)).isoformat()
    end = date.today().isoformat()

    rows = _run(
        client,
        cid,
        f"""
        SELECT segments.week, campaign.name, metrics.impressions, metrics.clicks,
               metrics.cost_micros, metrics.conversions,
               metrics.search_impression_share
        FROM campaign
        WHERE segments.date BETWEEN '{start}' AND '{end}'
          AND campaign.status != 'REMOVED'
        """,
    )

    account: dict[str, dict] = defaultdict(
        lambda: {"impr": 0, "clicks": 0, "cost": 0.0, "conv": 0.0, "eligible": 0.0}
    )
    campaigns: dict[str, dict[str, dict]] = defaultdict(
        lambda: defaultdict(
            lambda: {"impr": 0, "clicks": 0, "cost": 0.0, "conv": 0.0, "eligible": 0.0}
        )
    )
    for r in rows:
        w = str(r.segments.week)
        camp = r.campaign.name
        impr = r.metrics.impressions
        clicks = r.metrics.clicks
        cost = r.metrics.cost_micros / 1e6
        conv = r.metrics.conversions
        is_ = r.metrics.search_impression_share or 0

        ad = account[w]
        ad["impr"] += impr
        ad["clicks"] += clicks
        ad["cost"] += cost
        ad["conv"] += conv
        if is_:
            ad["eligible"] += impr / is_

        cd = campaigns[camp][w]
        cd["impr"] += impr
        cd["clicks"] += clicks
        cd["cost"] += cost
        cd["conv"] += conv
        if is_:
            cd["eligible"] += impr / is_

    orders = load_orders(Path(args.orders)) if args.orders else {}

    print("=== DELIVERY RECOVERY ===")
    print(f"Negative-list fix applied {FIX_DATE.isoformat()} (marked >>>)\n")

    if args.account_only:
        print("=== ACCOUNT WEEKLY (compact) ===")
        print("elig~ = approximate account-level eligible (do not treat as exact)\n")
        _print_recovery_table(account, show_eligible=True, eligible_approx=True, orders=orders)
    else:
        active = sorted(
            c for c, weeks in campaigns.items() if sum(d["impr"] for d in weeks.values()) > 0
        )
        for camp in active:
            print(f"--- {camp} ---")
            _print_recovery_table(campaigns[camp], show_eligible=True, orders=None)
            print()

        print("=== ACCOUNT TOTALS ===")
        print("(impressions, clicks, cost, and conversions sum across campaigns;\n"
        " eligible is omitted here — see per-campaign blocks above.)\n")
        _print_recovery_table(account, show_eligible=False, orders=orders)

    print(
        "\nHow to read this:\n"
        "  eligible = impressions / impression share, per campaign. Each campaign's\n"
        "             impression share is computed over its own auction set, so this\n"
        "             number is only meaningful within a single campaign — not when\n"
        "             summed across the account. Watch it per campaign first.\n"
    )
    if args.account_only:
        print(
            "  elig~ on the account row is a rough sum for trend-spotting only — the\n"
            "             per-campaign breakdown (default view) is the rigorous one.\n"
        )
    if orders:
        print(
            "  The incrementality test: as gClick rises, does 'untagged' hold steady or fall?\n"
            "    untagged HOLDS  -> the extra paid orders are genuinely new demand.\n"
            "    untagged FALLS  -> we are re-attributing orders we would have won anyway.\n"
        )
    else:
        print(
            "  Add --orders <csv> from the CRM to get the attribution split alongside.\n"
            "    cd ../PLLC-CRM/crm && npx tsx scripts/orders-attribution.ts --weekly --csv out.csv\n"
        )
    return 0


ORDER_REQUIRED_COLS = ("week", "orders", "google_click", "untagged")


def load_orders(path: Path) -> dict[str, dict]:
    """Read the CRM orders-attribution weekly CSV."""
    if not path.exists():
        raise SystemExit(f"Orders CSV not found: {path}")
    with path.open(newline="", encoding="utf-8-sig") as fh:
        reader = csv.DictReader(fh)
        if not reader.fieldnames:
            raise SystemExit(f"Orders CSV is empty: {path}")
        lowered = {h.strip().lower().lstrip("\ufeff") for h in reader.fieldnames}
        missing = [c for c in ORDER_REQUIRED_COLS if c not in lowered]
        if missing:
            raise SystemExit(
                f"Orders CSV missing required columns: {', '.join(missing)}\n"
                f"Header was: {list(reader.fieldnames)}\n"
                "Expected: week,orders,google_click,other_utm,untagged,revenue_cents"
            )

        def _col(row: dict, name: str) -> str:
            for key, val in row.items():
                if key.strip().lower().lstrip("\ufeff") == name:
                    return val or ""
            return ""

        out = {}
        for row in reader:
            week = _col(row, "week").strip()
            if not week:
                continue
            out[week] = {
                "orders": int(_col(row, "orders") or 0),
                "gclick": int(_col(row, "google_click") or 0),
                "untagged": int(_col(row, "untagged") or 0),
            }
    return out


# --------------------------------------------------------------------------

def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description="Measure Google Ads incrementality for NYPLLC.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
How to export Search Console queries (manual, ~2 minutes):
  1. https://search.google.com/search-console  ->  property www.nypllc.com
  2. Performance -> Search results
  3. Date: set a custom range matching your --days window (default 90)
  4. Make sure the QUERIES tab is selected below the chart
  5. Export (top right) -> Download CSV  ->  unzip
  6. Use the file named Queries.csv

  Note: GSC caps the export at 1,000 rows. That is fine here — we only care
  about queries with enough volume to matter.
""",
    )
    sub = p.add_subparsers(dest="command", required=True)

    c = sub.add_parser("cannibalization", help="Join GSC organic rankings against paid search terms")
    c.add_argument("--gsc", required=True, help="Path to Search Console Queries.csv export")
    c.add_argument("--days", type=int, default=90, help="Ads window in days (default: 90)")
    c.add_argument("--start", help="Ads window start YYYY-MM-DD")
    c.add_argument("--end", help="Ads window end YYYY-MM-DD")
    c.add_argument("--gsc-start", help="Start date of the GSC export window (YYYY-MM-DD)")
    c.add_argument("--gsc-end", help="End date of the GSC export window (YYYY-MM-DD)")
    c.add_argument("--out", help="Write the full joined table to this CSV")
    c.add_argument("--customer-id", help="Override GOOGLE_ADS_CUSTOMER_ID")
    c.set_defaults(func=cmd_cannibalization)

    r = sub.add_parser("recovery", help="Weekly delivery + attribution trend around the fix")
    r.add_argument("--weeks", type=int, default=16, help="Weeks of history (default: 16)")
    r.add_argument("--orders", help="CRM orders-attribution weekly CSV to merge in")
    r.add_argument(
        "--account-only",
        action="store_true",
        help="Compact account rollup (eligible shown as approximate)",
    )
    r.add_argument("--customer-id", help="Override GOOGLE_ADS_CUSTOMER_ID")
    r.set_defaults(func=cmd_recovery)

    return p


def main(argv=None) -> int:
    args = build_parser().parse_args(argv)
    return args.func(args)


if __name__ == "__main__":
    sys.exit(main())
