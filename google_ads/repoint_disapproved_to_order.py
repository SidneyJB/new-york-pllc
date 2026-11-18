"""Repoint the 3 disapproved 01_Core ads and the disapproved sitelink from the DIY guide to /order.

P2-08 policy fix (freeze exception). Approved by Sid in chat, Nov 18 2026, after the Jul 10 2026
appeal on the same ads failed (Government Documents). Ads pointing to /order are approved.

    .venv/bin/python -m google_ads.repoint_disapproved_to_order            # validate only
    .venv/bin/python -m google_ads.repoint_disapproved_to_order --confirm  # apply
"""
from __future__ import annotations

import argparse

from google.api_core import protobuf_helpers

from google_ads.client import customer_id, load_client

NEW_URL = "https://www.nypllc.com/order"
OLD_PATH = "/how-to-form-a-pllc-in-ny"
AD_IDS = ["816213581518", "816213581680", "816286167770"]
SITELINK_ASSET_ID = "388656387708"


def show(client, cid: str) -> None:
    gas = client.get_service("GoogleAdsService")
    q = f"""SELECT ad_group_ad.ad.id, ad_group_ad.ad.final_urls, campaign.name, ad_group.name,
                   ad_group_ad.policy_summary.approval_status
            FROM ad_group_ad WHERE ad_group_ad.ad.id IN ({",".join(AD_IDS)})"""
    for r in gas.search(customer_id=cid, query=q):
        a = r.ad_group_ad
        print("ad", a.ad.id, r.campaign.name, r.ad_group.name, list(a.ad.final_urls), a.policy_summary.approval_status.name)
    q = f"SELECT asset.id, asset.final_urls, asset.sitelink_asset.link_text, asset.policy_summary.approval_status FROM asset WHERE asset.id = {SITELINK_ASSET_ID}"
    for r in gas.search(customer_id=cid, query=q):
        print("sitelink", r.asset.id, r.asset.sitelink_asset.link_text, list(r.asset.final_urls), r.asset.policy_summary.approval_status.name)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--confirm", action="store_true")
    args = ap.parse_args()
    client = load_client()
    cid = customer_id()
    print("BEFORE"); show(client, cid)

    ad_ops = []
    for ad_id in AD_IDS:
        op = client.get_type("AdOperation")
        ad = op.update
        ad.resource_name = client.get_service("AdService").ad_path(cid, ad_id)
        ad.final_urls.append(NEW_URL)
        client.copy_from(op.update_mask, protobuf_helpers.field_mask(None, ad._pb))
        ad_ops.append(op)
    asset_op = client.get_type("AssetOperation")
    asset = asset_op.update
    asset.resource_name = client.get_service("AssetService").asset_path(cid, SITELINK_ASSET_ID)
    asset.final_urls.append(NEW_URL)
    client.copy_from(asset_op.update_mask, protobuf_helpers.field_mask(None, asset._pb))

    validate = not args.confirm
    ad_req = client.get_type("MutateAdsRequest")
    ad_req.customer_id = cid
    ad_req.operations.extend(ad_ops)
    ad_req.validate_only = validate
    client.get_service("AdService").mutate_ads(request=ad_req)
    asset_req = client.get_type("MutateAssetsRequest")
    asset_req.customer_id = cid
    asset_req.operations.append(asset_op)
    asset_req.validate_only = validate
    client.get_service("AssetService").mutate_assets(request=asset_req)
    print("validate_only passed" if validate else "APPLIED")
    if args.confirm:
        print("AFTER"); show(client, cid)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
