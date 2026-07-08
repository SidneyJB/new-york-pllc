#!/usr/bin/env python3
"""Pull default Google Ads keyword + search term reports (30 days).

For all reports and options, use google_ads_cli.py instead:
  .venv/bin/python google_ads_cli.py pull core --days 30 --compat
"""

from __future__ import annotations

from google_ads.client import BASE, customer_id, parse_date_range
from google_ads.pull import pull_reports


def main() -> None:
    start, end = parse_date_range(days=30, start=None, end=None)
    results = pull_reports(
        ["keywords", "search-terms"],
        customer_id=customer_id(),
        start=start,
        end=end,
        output_dir=BASE,
        compat_names=True,
    )
    for result in results:
        if result.path is None:
            continue
        size = result.path.stat().st_size
        print(f"Wrote {result.path.name} ({size:,} bytes)")


if __name__ == "__main__":
    main()
