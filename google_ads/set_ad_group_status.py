"""Set ENABLED/PAUSED on an ad group by campaign + ad group name."""

from __future__ import annotations

import argparse
import sys

from google.ads.googleads.errors import GoogleAdsException
from google.protobuf import field_mask_pb2

from google_ads.client import customer_id, load_client


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--campaign", required=True)
    parser.add_argument("--ad-group", required=True)
    parser.add_argument("--status", required=True, choices=("PAUSED", "ENABLED"))
    parser.add_argument("--execute", action="store_true")
    args = parser.parse_args(argv)

    client = load_client()
    cid = customer_id()
    ga = client.get_service("GoogleAdsService")
    query = f"""
        SELECT ad_group.resource_name, ad_group.status, ad_group.name
        FROM ad_group
        WHERE campaign.name = '{args.campaign}'
          AND ad_group.name = '{args.ad_group}'
          AND ad_group.status != 'REMOVED'
    """
    rows = list(ga.search(customer_id=cid, query=query))
    if not rows:
        print(f"FAIL no ad group: {args.campaign} / {args.ad_group}")
        return 1
    for row in rows:
        current = row.ad_group.status.name
        resource = row.ad_group.resource_name
        print(f"{resource} {current} → {args.status}")
        if not args.execute:
            continue
        service = client.get_service("AdGroupService")
        op = client.get_type("AdGroupOperation")
        ag = op.update
        ag.resource_name = resource
        ag.status = getattr(client.enums.AdGroupStatusEnum, args.status)
        op.update_mask.CopyFrom(field_mask_pb2.FieldMask(paths=["status"]))
        try:
            service.mutate_ad_groups(customer_id=cid, operations=[op])
        except GoogleAdsException as exc:
            msgs = "; ".join(e.message for e in exc.failure.errors)
            print(f"FAIL {msgs}")
            return 1
    if not args.execute:
        print("dry-run (pass --execute to mutate)")
    else:
        print("OK mutated")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
