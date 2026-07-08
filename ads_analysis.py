#!/usr/bin/env python3
"""
Deduplicate and analyze Google Ads data.
Compares pre/post tCPA change (Mar 6: $82 → $90).

Run: python3 ads_analysis.py
  (or ./ads_analysis.py if executable)

Expects in same directory:
  - Ads - kw_daily (1).csv
  - Ads - search_terms_daily (1).csv

Outputs:
  - Ads - kw_daily_deduped.csv
  - Ads - search_terms_daily_deduped.csv
  - Printed analysis to stdout
"""

import csv
from pathlib import Path
from collections import defaultdict

BASE = Path(__file__).parent

def load_csv(path):
    with open(path, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))

def dedupe_rows(rows, key_cols, prefer_conv_by_date=None):
    """
    Deduplicate rows by key. When duplicates exist, prefer the row with the
    most complete conversion data (conversions_by_conversion_date if available).
    """
    seen = {}
    for r in rows:
        key = tuple(r.get(c, "") for c in key_cols)
        if key not in seen:
            seen[key] = r
        else:
            existing = seen[key]
            # Prefer row with conversions_by_conversion_date populated
            if prefer_conv_by_date:
                ex_val = existing.get(prefer_conv_by_date, "")
                new_val = r.get(prefer_conv_by_date, "")
                ex_has = str(ex_val).strip() != ""
                new_has = str(new_val).strip() != ""
                if new_has and not ex_has:
                    seen[key] = r
                # else keep existing
    return list(seen.values())

def safe_float(x, default=0):
    try:
        return float(x) if x else default
    except (ValueError, TypeError):
        return default

def main():
    # Prefer (2) if exists (updated export), else (1)
    kw_path = BASE / "Ads - kw_daily (2).csv" if (BASE / "Ads - kw_daily (2).csv").exists() else BASE / "Ads - kw_daily (1).csv"
    st_path = BASE / "Ads - search_terms_daily (2).csv" if (BASE / "Ads - search_terms_daily (2).csv").exists() else BASE / "Ads - search_terms_daily (1).csv"

    kw_rows = load_csv(kw_path)
    st_rows = load_csv(st_path)

    kw_key = ["segments.date", "campaign.name", "ad_group.name", "ad_group_criterion.keyword.text", "ad_group_criterion.keyword.match_type"]
    st_key = ["segments.date", "campaign.name", "ad_group.name", "search_term_view.search_term", "segments.search_term_match_type"]

    kw_before, st_before = len(kw_rows), len(st_rows)
    kw_rows = dedupe_rows(kw_rows, kw_key, prefer_conv_by_date="metrics.conversions_by_conversion_date")
    st_rows = dedupe_rows(st_rows, st_key)
    kw_dup, st_dup = kw_before - len(kw_rows), st_before - len(st_rows)

    # Save deduplicated CSVs first (before any analysis)
    kw_out = BASE / "Ads - kw_daily_deduped.csv"
    st_out = BASE / "Ads - search_terms_daily_deduped.csv"
    if kw_rows:
        with open(kw_out, "w", newline="", encoding="utf-8") as f:
            w = csv.DictWriter(f, fieldnames=kw_rows[0].keys())
            w.writeheader()
            w.writerows(kw_rows)
    if st_rows:
        with open(st_out, "w", newline="", encoding="utf-8") as f:
            w = csv.DictWriter(f, fieldnames=st_rows[0].keys())
            w.writeheader()
            w.writerows(st_rows)
    print(f"Deduplicated files saved: {kw_out.name} ({kw_dup} duplicates removed), {st_out.name} ({st_dup} duplicates removed)")
    print("")

    # Filter NY PLLC Formation, aggregate by date
    mar_pre_start, mar_pre_end = "2026-03-01", "2026-03-05"
    mar_post_start, mar_post_end = "2026-03-06", "2026-03-09"
    feb_start, feb_end = "2026-02-01", "2026-02-28"

    def agg_period(rows, ad_group_col, date_col, cost_col, imp_col, click_col, conv_col,
                   start_a, end_a, start_b, end_b):
        """Aggregate into two periods A and B."""
        period_a = defaultdict(lambda: {"imp": 0, "clicks": 0, "cost": 0, "conv": 0})
        period_b = defaultdict(lambda: {"imp": 0, "clicks": 0, "cost": 0, "conv": 0})
        for r in rows:
            if r.get(ad_group_col) != "NY PLLC Formation":
                continue
            d = r.get(date_col, "")
            imp = safe_float(r.get(imp_col, 0))
            clicks = safe_float(r.get(click_col, 0))
            raw_cost = safe_float(r.get(cost_col, 0))
            # Cost: if > 10000 likely micros (e.g. 2240000 = $2.24)
            cost = raw_cost / 1_000_000 if raw_cost > 10000 else raw_cost
            conv = safe_float(r.get(conv_col, 0)) or safe_float(r.get("metrics.conversions", 0))
            row = {"imp": imp, "clicks": clicks, "cost": cost, "conv": conv}
            if start_a <= d <= end_a:
                for k in row:
                    period_a[d][k] += row[k]
            elif start_b <= d <= end_b:
                for k in row:
                    period_b[d][k] += row[k]
        return period_a, period_b

    # kw: use conversions_by_conversion_date (preferred) or metrics.conversions
    first = kw_rows[0] or {}
    conv_col = "metrics.conversions_by_conversion_date" if "metrics.conversions_by_conversion_date" in first else "metrics.conversions"
    kw_pre, kw_post = agg_period(kw_rows, "ad_group.name", "segments.date", "metrics.cost_micros",
                                  "metrics.impressions", "metrics.clicks", conv_col,
                                  mar_pre_start, mar_pre_end, mar_post_start, mar_post_end)
    _, kw_feb = agg_period(kw_rows, "ad_group.name", "segments.date", "metrics.cost_micros",
                           "metrics.impressions", "metrics.clicks", conv_col,
                           "1999-01-01", "1999-01-01", feb_start, feb_end)  # feb only in period_b

    def sum_period(p):
        return {
            "impressions": sum(x["imp"] for x in p.values()),
            "clicks": sum(x["clicks"] for x in p.values()),
            "cost": sum(x["cost"] for x in p.values()),
            "conversions": sum(x["conv"] for x in p.values()),
            "days": len(p),
        }

    pre = sum_period(kw_pre)
    post = sum_period(kw_post)
    feb = sum_period(kw_feb)

    # Build report
    lines = []
    lines.append("=" * 60)
    lines.append("ADS ANALYSIS - Deduplicated & Period Comparison")
    lines.append("=" * 60)
    lines.append("")
    lines.append("DEDUPLICATION:")
    lines.append(f"  kw_daily: {kw_before} rows → {len(kw_rows)} ({kw_dup} duplicates removed)")
    lines.append(f"  search_terms_daily: {st_before} rows → {len(st_rows)} ({st_dup} duplicates removed)")
    lines.append("")
    lines.append("PERIODS:")
    lines.append("  Pre:  Mar 1–5 (5 days) — tCPA $82")
    lines.append("  Post: Mar 6–9 (4 days) — tCPA $90")
    lines.append("")
    lines.append("-" * 60)
    lines.append("KEYWORD-LEVEL (NY PLLC Formation only)")
    lines.append("-" * 60)

    for label, r in [("Feb (baseline)", feb), ("Pre (Mar 1-5)", pre), ("Post ($90 tCPA)", post)]:
        days = r["days"] or (28 if "Feb" in label else (5 if "Pre" in label else 4))
        lines.append(f"\n{label} ({int(days)} days):")
        lines.append(f"  Impressions:  {r['impressions']:,.0f}")
        lines.append(f"  Clicks:       {r['clicks']:,.0f}")
        lines.append(f"  Cost:         ${r['cost']:,.2f}")
        lines.append(f"  Conversions:  {r['conversions']:.2f}")
        if r["clicks"] > 0:
            lines.append(f"  CPC:          ${r['cost']/r['clicks']:.2f}")
        if r["conversions"] > 0:
            lines.append(f"  CPA:          ${r['cost']/r['conversions']:.2f}")
        lines.append(f"  Per-day conv: {r['conversions']/days:.2f}")

    lines.append("")
    lines.append("-" * 60)
    lines.append("CHANGE: Post ($90) vs Pre (Mar 1-5), per-day")
    lines.append("-" * 60)

    pre_days = pre["days"] or 5
    post_days = post["days"] or 4
    feb_days = feb["days"] or 28
    pre_pd = {k: pre[k]/pre_days for k in ["impressions","clicks","cost","conversions"]}
    post_pd = {k: post[k]/post_days for k in ["impressions","clicks","cost","conversions"]}
    feb_pd = {k: feb[k]/feb_days for k in ["impressions","clicks","cost","conversions"]}

    for m in ["impressions","clicks","cost","conversions"]:
        chg = (post_pd[m] - pre_pd[m]) / pre_pd[m] * 100 if pre_pd[m] else 0
        lines.append(f"  {m}/day: {chg:+.1f}%")

    lines.append("")
    lines.append("-" * 60)
    lines.append("Mar (all) vs Feb: per-day comparison")
    lines.append("-" * 60)
    mar_all = {k: (pre[k] + post[k]) / (pre_days + post_days) for k in ["impressions","clicks","cost","conversions"]}
    for m in ["impressions","clicks","cost","conversions"]:
        chg = (mar_all[m] - feb_pd[m]) / feb_pd[m] * 100 if feb_pd[m] else 0
        lines.append(f"  {m}/day: {chg:+.1f}%")

    lines.append("")
    lines.append("=" * 60)
    lines.append("BOTTOM LINE")
    lines.append("=" * 60)
    conv_chg = (post_pd["conversions"] - pre_pd["conversions"]) / pre_pd["conversions"] * 100 if pre_pd["conversions"] else 0
    if post["conversions"] == 0 and pre["conversions"] == 0:
        lines.append("Zero conversions in both pre and post periods. Conversion lag may apply (1-30 days).")
        lines.append("Feb had {:.2f} conv/day. Pre: {:.2f} conv/day / Post: {:.2f} conv/day.".format(
            feb_pd["conversions"], pre_pd["conversions"], post_pd["conversions"]))
    elif abs(conv_chg) < 20:
        lines.append("No meaningful change in conversions yet. Post period may be too short to judge.")
    else:
        lines.append("Conversions {:.1f}% per day vs pre period.".format(conv_chg))
    lines.append("")

    report = "\n".join(lines)
    print(report)

if __name__ == "__main__":
    main()
