"""Attach a Search campaign to the NYPLLC Search Portfolio (dry-run by default)."""

from __future__ import annotations

import argparse
import sys

from google.ads.googleads.errors import GoogleAdsException
from google.protobuf import field_mask_pb2

from google_ads.client import customer_id, load_client

PORTFOLIO_ID = "12148056412"
CAMPAIGN_03 = "03_ForeignQual_US"


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--campaign", default=CAMPAIGN_03)
    parser.add_argument("--strategy-id", default=PORTFOLIO_ID)
    parser.add_argument("--execute", action="store_true")
    args = parser.parse_args(argv)

    client = load_client()
    cid = customer_id()
    ga = client.get_service("GoogleAdsService")
    query = f"""
        SELECT
          campaign.id,
          campaign.name,
          campaign.status,
          campaign.bidding_strategy,
          campaign.bidding_strategy_type
        FROM campaign
        WHERE campaign.name = '{args.campaign}'
          AND campaign.status != 'REMOVED'
    """
    rows = list(ga.search(customer_id=cid, query=query))
    if not rows:
        print(f"FAIL no campaign: {args.campaign}")
        return 1
    row = rows[0]
    resource = client.get_service("CampaignService").campaign_path(cid, row.campaign.id)
    strategy = client.get_service("BiddingStrategyService").bidding_strategy_path(
        cid, args.strategy_id
    )
    current = row.campaign.bidding_strategy or "(inline)"
    print(
        f"{resource} {row.campaign.name} {row.campaign.status.name} "
        f"{row.campaign.bidding_strategy_type.name} {current} → {strategy}"
    )
    if current == strategy:
        print("already attached; no mutate")
        return 0
    if not args.execute:
        print("dry-run (pass --execute to mutate)")
        return 0

    service = client.get_service("CampaignService")
    op = client.get_type("CampaignOperation")
    campaign = op.update
    campaign.resource_name = resource
    campaign.bidding_strategy = strategy
    op.update_mask.CopyFrom(field_mask_pb2.FieldMask(paths=["bidding_strategy"]))
    try:
        service.mutate_campaigns(customer_id=cid, operations=[op])
    except GoogleAdsException as exc:
        msgs = "; ".join(e.message for e in exc.failure.errors)
        print(f"FAIL {msgs}")
        return 1
    print("OK mutated")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
