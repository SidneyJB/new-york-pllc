"""Remove legacy California exacts from Generic after the state group exists.

Dry-run by default. This script never changes campaign or ad-group status.
"""

from __future__ import annotations

import argparse

from google.ads.googleads.errors import GoogleAdsException

from google_ads.client import customer_id, load_client

CAMPAIGN = "03_ForeignQual_US"
SOURCE_GROUP = "Generic-ForeignQual"
TARGET_GROUP = "California"
SOURCE_KEYWORDS = {
    "california pllc new york",
    "ca pllc doing business in new york",
}
TARGET_KEYWORDS = {
    "california pllc new york",
    "ca pllc new york",
    "ca pllc doing business in new york",
    "register california pllc in new york",
}
STALE_TARGET_KEYWORDS = {"california pllc doing business in new york"}


def keyword_rows(client, cid: str, ad_group: str):
    service = client.get_service("GoogleAdsService")
    query = f"""
        SELECT ad_group_criterion.resource_name,
               ad_group_criterion.keyword.text,
               ad_group_criterion.keyword.match_type,
               ad_group_criterion.status
        FROM keyword_view
        WHERE campaign.name = '{CAMPAIGN}'
          AND ad_group.name = '{ad_group}'
          AND ad_group_criterion.negative = FALSE
          AND ad_group_criterion.status != 'REMOVED'
    """
    return list(service.search(customer_id=cid, query=query))


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--execute", action="store_true")
    args = parser.parse_args()

    client = load_client()
    cid = customer_id()
    target = {
        row.ad_group_criterion.keyword.text.casefold()
        for row in keyword_rows(client, cid, TARGET_GROUP)
        if row.ad_group_criterion.keyword.match_type.name == "EXACT"
    }
    missing = sorted(TARGET_KEYWORDS - target)
    if missing:
        print(f"FAIL target group is missing exact keywords: {', '.join(missing)}")
        return 1

    removals = [
        row
        for row in keyword_rows(client, cid, SOURCE_GROUP)
        if row.ad_group_criterion.keyword.match_type.name == "EXACT"
        and row.ad_group_criterion.keyword.text.casefold() in SOURCE_KEYWORDS
    ]
    removals.extend(
        row
        for row in keyword_rows(client, cid, TARGET_GROUP)
        if row.ad_group_criterion.keyword.match_type.name == "EXACT"
        and row.ad_group_criterion.keyword.text.casefold() in STALE_TARGET_KEYWORDS
    )
    if not removals:
        print("California keyword routing is already reconciled.")
        return 0

    for row in removals:
        print(
            f"{'[execute]' if args.execute else '[dry-run]'} remove "
            f"{row.ad_group_criterion.keyword.text}"
        )
    if not args.execute:
        print("Dry-run only. Pass --execute after reviewing.")
        return 0

    service = client.get_service("AdGroupCriterionService")
    operations = []
    for row in removals:
        operation = client.get_type("AdGroupCriterionOperation")
        operation.remove = row.ad_group_criterion.resource_name
        operations.append(operation)
    try:
        service.mutate_ad_group_criteria(customer_id=cid, operations=operations)
    except GoogleAdsException as exc:
        print("FAIL " + "; ".join(error.message for error in exc.failure.errors))
        return 1

    print(f"Removed {len(operations)} legacy California exacts.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
