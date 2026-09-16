"""Set ENABLED/PAUSED on a campaign by name (dry-run by default)."""

from __future__ import annotations

import argparse
import sys

from google.ads.googleads.errors import GoogleAdsException
from google.protobuf import field_mask_pb2

from google_ads.client import customer_id, load_client


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--campaign", required=True)
    parser.add_argument("--status", required=True, choices=("PAUSED", "ENABLED"))
    parser.add_argument("--execute", action="store_true")
    args = parser.parse_args(argv)

    client = load_client()
    cid = customer_id()
    ga = client.get_service("GoogleAdsService")
    query = f"""
        SELECT campaign.resource_name, campaign.status, campaign.name
        FROM campaign
        WHERE campaign.name = '{args.campaign}'
          AND campaign.status != 'REMOVED'
    """
    rows = list(ga.search(customer_id=cid, query=query))
    if not rows:
        print(f"FAIL no campaign: {args.campaign}")
        return 1
    row = rows[0]
    current = row.campaign.status.name
    resource = row.campaign.resource_name
    print(f"{resource} {current} → {args.status}")
    if current == args.status:
        print("already at target; no mutate")
        return 0
    if not args.execute:
        print("dry-run (pass --execute to mutate)")
        return 0

    service = client.get_service("CampaignService")
    op = client.get_type("CampaignOperation")
    campaign = op.update
    campaign.resource_name = resource
    campaign.status = getattr(client.enums.CampaignStatusEnum, args.status)
    op.update_mask.CopyFrom(field_mask_pb2.FieldMask(paths=["status"]))
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
