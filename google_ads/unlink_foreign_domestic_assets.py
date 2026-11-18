"""Unlink domestic-only assets from 03_ForeignQual_US only (P2-08 freeze exception, claims fix).

Approved by Sid in chat, Nov 18 2026. Dry run unless --confirm.

    .venv/bin/python -m google_ads.unlink_foreign_domestic_assets
    .venv/bin/python -m google_ads.unlink_foreign_domestic_assets --confirm
"""
from __future__ import annotations

import argparse

from google_ads.client import customer_id, load_client

CAMPAIGN_ID = "24012757620"  # 03_ForeignQual_US
ASSET_IDS = {
    "370198410524": "Callout: Flat $885 Price",
    "370198410509": "Sitelink: Start Your Order — $885",
    "370198410530": "Callout: EIN Included",
    "370198410533": "Callout: Operating Agreement",
    "388575877522": "Callout: RA Year 1 Free",
    "388656609642": "Structured snippet: Services (EIN, Operating Agreement, S Corp)",
}


def linked(client, cid: str) -> list[tuple[str, str, str, str]]:
    query = f"""
        SELECT campaign.id, campaign.name, asset.id, campaign_asset.resource_name,
               campaign_asset.field_type, campaign_asset.status
        FROM campaign_asset
        WHERE campaign.id = {CAMPAIGN_ID} AND campaign_asset.status != 'REMOVED'
    """
    service = client.get_service("GoogleAdsService")
    out = []
    for row in service.search(customer_id=cid, query=query):
        aid = str(row.asset.id)
        if aid in ASSET_IDS:
            out.append((aid, row.campaign.name, row.campaign_asset.resource_name, row.campaign_asset.field_type.name))
    return out


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--confirm", action="store_true")
    args = ap.parse_args()
    client = load_client()
    cid = customer_id()
    rows = linked(client, cid)
    for aid, cname, res, ftype in rows:
        print(f"{'REMOVE' if args.confirm else 'would remove'}: {cname} | {aid} {ftype} | {ASSET_IDS[aid]} | {res}")
    missing = set(ASSET_IDS) - {r[0] for r in rows}
    for aid in sorted(missing):
        print(f"not linked to campaign {CAMPAIGN_ID}: {aid} {ASSET_IDS[aid]}")
    if not args.confirm or not rows:
        return 0
    service = client.get_service("CampaignAssetService")
    ops = []
    for _, _, res, _ in rows:
        op = client.get_type("CampaignAssetOperation")
        op.remove = res
        ops.append(op)
    resp = service.mutate_campaign_assets(customer_id=cid, operations=ops)
    for r in resp.results:
        print("removed", r.resource_name)
    left = linked(client, cid)
    print(f"still linked after removal: {len(left)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
