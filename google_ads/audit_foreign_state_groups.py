"""Read-only verification for California and Colorado in campaign 03."""

from __future__ import annotations

import json

from google_ads.client import customer_id, load_client

CAMPAIGN = "03_ForeignQual_US"
GROUPS = ("California", "Colorado")


def main() -> int:
    client = load_client()
    cid = customer_id()
    service = client.get_service("GoogleAdsService")

    campaign_query = f"""
        SELECT campaign.id, campaign.name, campaign.status,
               campaign.bidding_strategy, campaign.bidding_strategy_type,
               campaign.campaign_budget
        FROM campaign
        WHERE campaign.name = '{CAMPAIGN}'
          AND campaign.status != 'REMOVED'
    """
    campaign_rows = list(service.search(customer_id=cid, query=campaign_query))
    if len(campaign_rows) != 1:
        raise SystemExit(f"Expected one {CAMPAIGN} campaign, found {len(campaign_rows)}")
    campaign = campaign_rows[0].campaign

    names = ", ".join(f"'{name}'" for name in GROUPS)
    keyword_query = f"""
        SELECT ad_group.name, ad_group.status,
               ad_group_criterion.keyword.text,
               ad_group_criterion.keyword.match_type,
               ad_group_criterion.status
        FROM keyword_view
        WHERE campaign.name = '{CAMPAIGN}'
          AND ad_group.name IN ({names})
          AND ad_group_criterion.negative = FALSE
          AND ad_group_criterion.status != 'REMOVED'
        ORDER BY ad_group.name, ad_group_criterion.keyword.text
    """
    keywords = [
        {
            "ad_group": row.ad_group.name,
            "ad_group_status": row.ad_group.status.name,
            "keyword": row.ad_group_criterion.keyword.text,
            "match_type": row.ad_group_criterion.keyword.match_type.name,
            "status": row.ad_group_criterion.status.name,
        }
        for row in service.search(customer_id=cid, query=keyword_query)
    ]

    ad_query = f"""
        SELECT ad_group.name, ad_group.status,
               ad_group_ad.ad.name, ad_group_ad.ad.final_urls,
               ad_group_ad.status, ad_group_ad.policy_summary.approval_status
        FROM ad_group_ad
        WHERE campaign.name = '{CAMPAIGN}'
          AND ad_group.name IN ({names})
          AND ad_group_ad.status != 'REMOVED'
        ORDER BY ad_group.name, ad_group_ad.ad.name
    """
    ads = [
        {
            "ad_group": row.ad_group.name,
            "ad_group_status": row.ad_group.status.name,
            "ad_name": row.ad_group_ad.ad.name,
            "final_urls": list(row.ad_group_ad.ad.final_urls),
            "status": row.ad_group_ad.status.name,
            "approval": row.ad_group_ad.policy_summary.approval_status.name,
        }
        for row in service.search(customer_id=cid, query=ad_query)
    ]

    generic_query = f"""
        SELECT ad_group_criterion.keyword.text
        FROM keyword_view
        WHERE campaign.name = '{CAMPAIGN}'
          AND ad_group.name = 'Generic-ForeignQual'
          AND ad_group_criterion.negative = FALSE
          AND ad_group_criterion.status != 'REMOVED'
    """
    legacy_california = {
        "california pllc new york",
        "ca pllc doing business in new york",
    }
    generic_california = [
        row.ad_group_criterion.keyword.text
        for row in service.search(customer_id=cid, query=generic_query)
        if row.ad_group_criterion.keyword.text.casefold() in legacy_california
    ]

    payload = {
        "campaign": {
            "id": campaign.id,
            "name": campaign.name,
            "status": campaign.status.name,
            "bidding_strategy_resource": campaign.bidding_strategy or None,
            "bidding_strategy_type": campaign.bidding_strategy_type.name,
            "campaign_budget": campaign.campaign_budget,
        },
        "keywords": keywords,
        "ads": ads,
        "generic_california_keywords": generic_california,
    }
    print(json.dumps(payload, indent=2))

    errors = []
    if campaign.status.name != "PAUSED":
        errors.append(f"campaign status is {campaign.status.name}, expected PAUSED")
    if campaign.bidding_strategy:
        errors.append("campaign is attached to a portfolio bidding strategy")
    for group in GROUPS:
        group_keywords = [row for row in keywords if row["ad_group"] == group]
        group_ads = [row for row in ads if row["ad_group"] == group]
        if len(group_keywords) != 4:
            errors.append(f"{group} has {len(group_keywords)} keywords, expected 4")
        if len(group_ads) != 2:
            errors.append(f"{group} has {len(group_ads)} ads, expected 2")
    if generic_california:
        errors.append("California keywords remain in Generic-ForeignQual")

    if errors:
        for error in errors:
            print(f"FAIL {error}")
        return 1
    print("OK campaign is paused and unattached; state routing is clean.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
