"""Create/link the shared 3-offer price asset; unlink superseded asset (dry-run default)."""

from __future__ import annotations

import argparse
import sys

from google.ads.googleads.errors import GoogleAdsException

from google_ads.client import customer_id, load_client
from google_ads.site_pricing import (
    SHARED_PRICE_CAMPAIGNS,
    shared_price_asset_name,
    shared_price_offerings,
)

CURRENT_ASSET_ID = 422028348046  # v4 — Foreign from $895 (Sep 16 2026)
SUPERSEDED_ASSET_ID = 390754746354  # v3 — Foreign from $930 (Jul 11 2026)


def dollars_to_micros(amount: float) -> int:
    return int(round(amount * 1_000_000))


def campaign_resources(client, cid: str) -> dict[str, str]:
    names = ", ".join(f"'{n}'" for n in SHARED_PRICE_CAMPAIGNS)
    query = f"""
        SELECT campaign.name, campaign.resource_name
        FROM campaign
        WHERE campaign.name IN ({names})
          AND campaign.status != 'REMOVED'
    """
    service = client.get_service("GoogleAdsService")
    out = {
        row.campaign.name: row.campaign.resource_name
        for row in service.search(customer_id=cid, query=query)
    }
    missing = [n for n in SHARED_PRICE_CAMPAIGNS if n not in out]
    if missing:
        raise SystemExit(f"Missing campaigns: {', '.join(missing)}")
    return out


def linked_price_assets(client, cid: str) -> list[dict]:
    query = """
        SELECT
          campaign.name,
          campaign_asset.resource_name,
          asset.id,
          asset.name,
          asset.price_asset.price_offerings
        FROM campaign_asset
        WHERE asset.type = 'PRICE'
          AND campaign_asset.status != 'REMOVED'
    """
    service = client.get_service("GoogleAdsService")
    rows = []
    for row in service.search(customer_id=cid, query=query):
        offerings = []
        for o in row.asset.price_asset.price_offerings:
            offerings.append(
                {
                    "header": o.header,
                    "price": o.price.amount_micros / 1_000_000,
                    "url": o.final_url,
                }
            )
        rows.append(
            {
                "campaign": row.campaign.name,
                "link": row.campaign_asset.resource_name,
                "asset_id": row.asset.id,
                "asset_name": row.asset.name,
                "offerings": offerings,
            }
        )
    return rows


def build_price_asset(client):
    asset = client.get_type("Asset")
    asset.name = shared_price_asset_name(version=4)
    price_asset = asset.price_asset
    price_asset.type_ = client.enums.PriceExtensionTypeEnum.SERVICES
    price_asset.language_code = "en"
    price_asset.price_qualifier = client.enums.PriceExtensionPriceQualifierEnum.FROM
    unit_enum = client.enums.PriceExtensionPriceUnitEnum

    for offering in shared_price_offerings():
        po = client.get_type("PriceOffering")
        po.header = offering.header
        po.description = offering.description
        po.price.amount_micros = dollars_to_micros(offering.price_dollars)
        po.price.currency_code = "USD"
        po.final_url = offering.final_url
        if offering.unit == "PER_MONTH":
            po.unit = unit_enum.PER_MONTH
        price_asset.price_offerings.append(po)
    return asset


def create_asset(client, cid: str, dry_run: bool) -> str | None:
    if dry_run:
        print(f"[dry-run] create asset: {shared_price_asset_name()}")
        for o in shared_price_offerings():
            unit = f" /{o.unit}" if o.unit else ""
            print(f"  {o.header}: ${o.price_dollars:g}{unit} → {o.final_url}")
        return None

    service = client.get_service("AssetService")
    operation = client.get_type("AssetOperation")
    operation.create = build_price_asset(client)
    response = service.mutate_assets(customer_id=cid, operations=[operation])
    resource = response.results[0].resource_name
    print(f"OK created {resource}")
    return resource


def link_asset(client, cid: str, campaign_resource: str, asset_resource: str, dry_run: bool) -> None:
    if dry_run:
        print(f"[dry-run] link {asset_resource} → {campaign_resource}")
        return
    service = client.get_service("CampaignAssetService")
    operation = client.get_type("CampaignAssetOperation")
    link = operation.create
    link.campaign = campaign_resource
    link.asset = asset_resource
    link.field_type = client.enums.AssetFieldTypeEnum.PRICE
    service.mutate_campaign_assets(customer_id=cid, operations=[operation])


def unlink_asset(client, cid: str, campaign_asset_resource: str, dry_run: bool) -> None:
    if dry_run:
        print(f"[dry-run] unlink {campaign_asset_resource}")
        return
    service = client.get_service("CampaignAssetService")
    operation = client.get_type("CampaignAssetOperation")
    operation.remove = campaign_asset_resource
    service.mutate_campaign_assets(customer_id=cid, operations=[operation])


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--execute", action="store_true")
    args = parser.parse_args(argv)
    dry_run = not args.execute

    client = load_client()
    cid = customer_id()
    campaigns = campaign_resources(client, cid)

    print("Current linked PRICE assets:")
    links = linked_price_assets(client, cid)
    for row in links:
        foreign = next(
            (o for o in row["offerings"] if "Foreign" in o["header"]),
            None,
        )
        foreign_price = foreign["price"] if foreign else "?"
        print(
            f"  {row['campaign']}: asset {row['asset_id']} "
            f"({row['asset_name']}) foreign=${foreign_price:g}"
        )

    superseded = [r for r in links if r["asset_id"] == SUPERSEDED_ASSET_ID]
    if not superseded and not dry_run:
        print(f"WARN no live links on superseded asset {SUPERSEDED_ASSET_ID}")

    asset_resource = create_asset(client, cid, dry_run)
    if dry_run:
        asset_resource = "customers/DRYRUN/assets/NEW"

    for row in superseded:
        unlink_asset(client, cid, row["link"], dry_run)

    for name in SHARED_PRICE_CAMPAIGNS:
        try:
            link_asset(client, cid, campaigns[name], asset_resource, dry_run)
            if not dry_run:
                print(f"OK linked on {name}")
        except GoogleAdsException as exc:
            msgs = "; ".join(e.message for e in exc.failure.errors)
            print(f"FAIL link {name}: {msgs}")
            return 1

    print("Done." + (" (dry-run)" if dry_run else ""))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
