"""Read-only audit: linked price assets vs google_ads/site_pricing.py (exit 1 on drift)."""

from __future__ import annotations

import argparse
import json
import sys

from google_ads.client import customer_id, load_client
from google_ads.site_pricing import (
    DEFERRED_AD_PRICES,
    FOREIGN_QUAL_FLOOR,
    FORMATION_PRICE,
    SHARED_PRICE_CAMPAIGNS,
    VIRTUAL_ADDRESS_MONTHLY,
    shared_price_offerings,
)


def micros_to_dollars(micros: int) -> float:
    return micros / 1_000_000


def fetch_linked_price_assets(client, cid: str) -> list[dict]:
    query = """
        SELECT
          campaign.name,
          campaign.status,
          campaign_asset.status,
          asset.id,
          asset.name,
          asset.price_asset.price_qualifier,
          asset.price_asset.price_offerings
        FROM campaign_asset
        WHERE asset.type = 'PRICE'
          AND campaign_asset.status != 'REMOVED'
          AND campaign.status != 'REMOVED'
    """
    service = client.get_service("GoogleAdsService")
    rows = []
    for row in service.search(customer_id=cid, query=query):
        offerings = []
        for o in row.asset.price_asset.price_offerings:
            offerings.append(
                {
                    "header": o.header,
                    "description": o.description,
                    "price": micros_to_dollars(o.price.amount_micros),
                    "unit": o.unit.name if o.unit else None,
                    "final_url": o.final_url,
                }
            )
        rows.append(
            {
                "campaign": row.campaign.name,
                "campaign_status": row.campaign.status.name,
                "link_status": row.campaign_asset.status.name,
                "asset_id": row.asset.id,
                "asset_name": row.asset.name,
                "qualifier": row.asset.price_asset.price_qualifier.name
                if row.asset.price_asset.price_qualifier
                else None,
                "offerings": offerings,
            }
        )
    return rows


def expected_offering_map() -> dict[str, dict]:
    return {
        o.header: {
            "price": o.price_dollars,
            "unit": o.unit,
            "final_url": o.final_url,
        }
        for o in shared_price_offerings()
    }


def audit_links(links: list[dict]) -> list[str]:
    errors: list[str] = []
    expected = expected_offering_map()
    by_campaign = {r["campaign"]: r for r in links}

    for campaign in SHARED_PRICE_CAMPAIGNS:
        row = by_campaign.get(campaign)
        if not row:
            errors.append(f"{campaign}: no linked PRICE asset")
            continue
        if row["link_status"] != "ENABLED":
            errors.append(f"{campaign}: price link status {row['link_status']}")

    asset_ids = {r["asset_id"] for r in links}
    if len(asset_ids) > 1:
        errors.append(f"multiple linked price assets: {sorted(asset_ids)}")
    elif len(asset_ids) == 0:
        errors.append("no linked price assets on target campaigns")

    if len(asset_ids) == 1:
        sample = links[0]
        got = {o["header"]: o for o in sample["offerings"]}
        for header, exp in expected.items():
            if header not in got:
                errors.append(f"missing offering: {header}")
                continue
            g = got[header]
            if g["price"] != exp["price"]:
                errors.append(
                    f"{header}: ads ${g['price']:g} != site ${exp['price']:g}"
                )
            if g["unit"] != exp["unit"]:
                errors.append(f"{header}: unit {g['unit']} != {exp['unit']}")
            if g["final_url"].rstrip("/") != exp["final_url"].rstrip("/"):
                errors.append(f"{header}: url {g['final_url']} != {exp['final_url']}")

        for header, o in got.items():
            if "Foreign" in header and sample["qualifier"] != "FROM":
                errors.append(f"foreign offering should use FROM qualifier, got {sample['qualifier']}")

        for header, o in got.items():
            if "DBA" in header.upper() or "S Corp" in header or "Registered Agent" in header:
                errors.append(f"deferred SKU should not be in price asset: {header} ${o['price']:g}")

    return errors


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--json", action="store_true")
    args = parser.parse_args(argv)

    client = load_client()
    cid = customer_id()
    links = fetch_linked_price_assets(client, cid)
    errors = audit_links(links)

    payload = {
        "customer_id": cid,
        "expected": {
            "formation": FORMATION_PRICE,
            "virtual_address_monthly": VIRTUAL_ADDRESS_MONTHLY,
            "foreign_floor": FOREIGN_QUAL_FLOOR,
            "deferred_not_in_price_assets": DEFERRED_AD_PRICES,
        },
        "linked": links,
        "errors": errors,
        "ok": not errors,
    }

    if args.json:
        print(json.dumps(payload, indent=2))
    else:
        print(f"Formation ${FORMATION_PRICE} · VA ${VIRTUAL_ADDRESS_MONTHLY}/mo · Foreign from ${FOREIGN_QUAL_FLOOR}")
        for row in links:
            foreign = next((o for o in row["offerings"] if "Foreign" in o["header"]), {})
            print(
                f"  {row['campaign']}: asset {row['asset_id']} "
                f"(foreign ${foreign.get('price', '?')})"
            )
        if errors:
            print("FAIL")
            for err in errors:
                print(f"  - {err}")
        else:
            print("OK price assets match site_pricing.py")

    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
