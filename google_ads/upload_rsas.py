"""Upload assembled RSAs from google-ads-campaign-build/rsas/rsa_manifest.json."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from google.ads.googleads.errors import GoogleAdsException

from google_ads.client import customer_id, load_client

BASE = Path(__file__).resolve().parent.parent
MANIFEST_PATH = BASE / "google-ads-campaign-build" / "rsas" / "rsa_manifest.json"


def load_manifest(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


DRAFT_CAMPAIGNS = (
    "01_Core_Exact_NY",
    "02_Professions_NY",
    "03_ForeignQual_US",
)


def ad_group_map(client, cid: str) -> dict[tuple[str, str], str]:
    service = client.get_service("GoogleAdsService")
    names = ", ".join(f"'{n}'" for n in DRAFT_CAMPAIGNS)
    query = f"""
        SELECT campaign.name, ad_group.name, ad_group.resource_name
        FROM ad_group
        WHERE campaign.name IN ({names})
          AND ad_group.status != 'REMOVED'
    """
    return {
        (row.campaign.name, row.ad_group.name): row.ad_group.resource_name
        for row in service.search(customer_id=cid, query=query)
    }


def existing_rsa_index(client, cid: str) -> dict[tuple[str, str, str], str]:
    """Existing RSAs keyed by (campaign, ad_group, ad.name) → ad_group_ad resource_name."""
    service = client.get_service("GoogleAdsService")
    names = ", ".join(f"'{n}'" for n in DRAFT_CAMPAIGNS)
    query = f"""
        SELECT campaign.name, ad_group.name, ad_group_ad.ad.name, ad_group_ad.resource_name
        FROM ad_group_ad
        WHERE campaign.name IN ({names})
          AND ad_group_ad.status != 'REMOVED'
          AND ad_group_ad.ad.type = 'RESPONSIVE_SEARCH_AD'
    """
    return {
        (row.campaign.name, row.ad_group.name, row.ad_group_ad.ad.name): row.ad_group_ad.resource_name
        for row in service.search(customer_id=cid, query=query)
    }


def remove_rsa(client, cid: str, resource_name: str, dry_run: bool) -> None:
    if dry_run:
        print(f"  [dry-run] remove {resource_name}")
        return
    service = client.get_service("AdGroupAdService")
    operation = client.get_type("AdGroupAdOperation")
    operation.remove = resource_name
    service.mutate_ad_group_ads(customer_id=cid, operations=[operation])


def create_rsa(
    client,
    cid: str,
    ad_group_resource: str,
    rsa: dict,
    dry_run: bool,
) -> str | None:
    if dry_run:
        pin = next(
            (h["text"] for h in rsa["headlines"] if h.get("pinned_position") in ("1", 1)),
            None,
        )
        print(
            f"  [dry-run] {rsa['campaign_name']} / {rsa['ad_group_name']} / "
            f"{rsa['rsa_variant']} ({len(rsa['headlines'])}H/{len(rsa['descriptions'])}D)"
            + (f" pin={pin!r}" if pin else "")
        )
        return None

    service = client.get_service("AdGroupAdService")
    operation = client.get_type("AdGroupAdOperation")
    ad_group_ad = operation.create
    ad_group_ad.ad_group = ad_group_resource
    # ENABLED inside PAUSED campaigns = ready when campaign is enabled.
    ad_group_ad.status = client.enums.AdGroupAdStatusEnum.ENABLED

    ad = ad_group_ad.ad
    ad.final_urls.append(rsa["final_url"])
    ad.name = f"{rsa['ad_group_name']} — {rsa['rsa_variant']}"

    pin_enum = client.enums.ServedAssetFieldTypeEnum
    for h in rsa["headlines"]:
        asset = client.get_type("AdTextAsset")
        asset.text = h["text"]
        if h.get("pinned_position") in ("1", 1):
            asset.pinned_field = pin_enum.HEADLINE_1
        ad.responsive_search_ad.headlines.append(asset)

    for d in rsa["descriptions"]:
        asset = client.get_type("AdTextAsset")
        asset.text = d["text"]
        ad.responsive_search_ad.descriptions.append(asset)

    response = service.mutate_ad_group_ads(customer_id=cid, operations=[operation])
    return response.results[0].resource_name


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--manifest", type=Path, default=MANIFEST_PATH)
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--replace", action="store_true", help="Remove existing RSA with same name, then recreate")
    parser.add_argument(
        "--campaigns",
        nargs="+",
        choices=DRAFT_CAMPAIGNS,
        help="Only upload RSAs for these campaigns (default: all in manifest)",
    )
    parser.add_argument("--customer-id", default=None)
    args = parser.parse_args(argv)

    manifest = load_manifest(args.manifest)
    client = load_client()
    cid = customer_id(args.customer_id)
    groups = ad_group_map(client, cid)
    existing = existing_rsa_index(client, cid)

    created = 0
    replaced = 0
    skipped = 0
    failed = 0
    results: list[dict] = []

    rsas = manifest["rsas"]
    if args.campaigns:
        allowed = set(args.campaigns)
        rsas = [r for r in rsas if r["campaign_name"] in allowed]

    print(
        f"Uploading {len(rsas)} RSAs "
        f"{'(dry-run)' if args.dry_run else 'to account ' + cid}"
        + (" replace" if args.replace else "")
    )

    for rsa in rsas:
        key = (rsa["campaign_name"], rsa["ad_group_name"])
        ag_resource = groups.get(key)
        if not ag_resource:
            print(f"  FAIL missing ad group: {key[0]} / {key[1]}")
            failed += 1
            continue

        ad_name = f"{rsa['ad_group_name']} — {rsa['rsa_variant']}"
        index_key = (rsa["campaign_name"], rsa["ad_group_name"], ad_name)
        if index_key in existing:
            if args.replace:
                try:
                    remove_rsa(client, cid, existing[index_key], args.dry_run)
                    del existing[index_key]
                    replaced += 1
                except GoogleAdsException as exc:
                    failed += 1
                    msgs = "; ".join(e.message for e in exc.failure.errors)
                    print(
                        f"  FAIL remove {rsa['campaign_name']} / "
                        f"{rsa['ad_group_name']} / {rsa['rsa_variant']}: {msgs}"
                    )
                    continue
            else:
                print(
                    f"  skip existing: {rsa['campaign_name']} / "
                    f"{rsa['ad_group_name']} / {rsa['rsa_variant']}"
                )
                skipped += 1
                continue

        try:
            resource = create_rsa(client, cid, ag_resource, rsa, args.dry_run)
            if not args.dry_run:
                print(
                    f"  OK {rsa['campaign_name']} / {rsa['ad_group_name']} / "
                    f"{rsa['rsa_variant']}: {resource}"
                )
                results.append(
                    {
                        "campaign_name": rsa["campaign_name"],
                        "ad_group_name": rsa["ad_group_name"],
                        "rsa_variant": rsa["rsa_variant"],
                        "resource_name": resource,
                    }
                )
                created += 1
                existing[index_key] = resource
            else:
                created += 1
        except GoogleAdsException as exc:
            failed += 1
            msgs = "; ".join(e.message for e in exc.failure.errors)
            print(
                f"  FAIL {rsa['campaign_name']} / {rsa['ad_group_name']} / "
                f"{rsa['rsa_variant']}: {msgs}"
            )

    out_path = args.manifest.parent / "rsa-upload-result.json"
    payload = {
        "dry_run": args.dry_run,
        "customer_id": cid,
        "created": created,
        "replaced": replaced,
        "skipped": skipped,
        "failed": failed,
        "results": results,
    }
    if not args.dry_run:
        out_path.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
        print(f"\nWrote {out_path}")

    print(f"\nDone: created={created} replaced={replaced} skipped={skipped} failed={failed}")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
