#!/usr/bin/env python3
"""Fill seo-rank-tracker.csv positions from a Search Console Queries export.

Usage:
  python3 seo_rank_tracker.py --gsc gsc/Queries_YYYY-MM-DD_to_YYYY-MM-DD.csv --as-of 2026-09-01

Does not invent ranks. Unmatched tracker rows stay blank.
"""

from __future__ import annotations

import argparse
import csv
from pathlib import Path

TRACKER = Path(__file__).resolve().parent / "seo-rank-tracker.csv"


def load_gsc(path: Path) -> dict[str, tuple[str, str]]:
    with path.open(newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
    out: dict[str, tuple[str, str]] = {}
    for row in rows:
        q = (row.get("Top queries") or row.get("Query") or row.get("query") or "").strip().lower()
        if not q:
            continue
        pos = row.get("Average position") or row.get("Position") or row.get("position") or ""
        impr = row.get("Impressions") or row.get("impressions") or ""
        out[q] = (pos, impr)
    return out


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--gsc", type=Path, required=True)
    p.add_argument("--as-of", required=True, help="Column prefix, e.g. 2026-09-01")
    args = p.parse_args()
    gsc = load_gsc(args.gsc)
    with TRACKER.open(newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
        fieldnames = list(rows[0].keys()) if rows else []
    pos_col = f"{args.as_of}_position"
    impr_col = f"{args.as_of}_impr"
    if pos_col not in fieldnames:
        fieldnames.extend([pos_col, impr_col])
    filled = 0
    for row in rows:
        hit = gsc.get(row["query"].strip().lower())
        if not hit:
            continue
        row[pos_col], row[impr_col] = hit
        filled += 1
    with TRACKER.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        w.writerows(rows)
    print(f"Updated {filled}/{len(rows)} tracker rows from {args.gsc} → {TRACKER}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
