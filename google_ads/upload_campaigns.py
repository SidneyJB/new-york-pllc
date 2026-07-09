"""Upload paused Phase 1 Search campaigns from google-ads-campaign-build/manifest.json.

Supports resume (skip existing campaigns/ad groups/keywords) and automatic
policy-exemption requests for exemptible keyword policy violations.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from google.ads.googleads.errors import GoogleAdsException

from google_ads.client import customer_id, load_client

BASE = Path(__file__).resolve().parent.parent
MANIFEST_PATH = BASE / "google-ads-campaign-build" / "manifest.json"

NY_GEO_TARGET_CONSTANT = "geoTargetConstants/21167"
EN_LANGUAGE_CONSTANT = "languageConstants/1000"
TARGET_CPA_MICROS = 90_000_000


def load_manifest(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def existing_campaign_map(client, cid: str) -> dict[str, str]:
    service = client.get_service("GoogleAdsService")
    query = (
        "SELECT campaign.name, campaign.resource_name FROM campaign "
        "WHERE campaign.status != 'REMOVED'"
    )
    return {
        row.campaign.name: row.campaign.resource_name
        for row in service.search(customer_id=cid, query=query)
    }


def existing_ad_group_map(client, cid: str, campaign_name: str) -> dict[str, str]:
    service = client.get_service("GoogleAdsService")
    query = f"""
        SELECT ad_group.name, ad_group.resource_name
        FROM ad_group
        WHERE campaign.name = '{campaign_name}'
          AND ad_group.status != 'REMOVED'
    """
    return {
        row.ad_group.name: row.ad_group.resource_name
        for row in service.search(customer_id=cid, query=query)
    }


def existing_keywords(
    client, cid: str, campaign_name: str, ad_group_name: str
) -> set[tuple[str, str]]:
    service = client.get_service("GoogleAdsService")
    query = f"""
        SELECT ad_group_criterion.keyword.text,
               ad_group_criterion.keyword.match_type
        FROM keyword_view
        WHERE campaign.name = '{campaign_name}'
          AND ad_group.name = '{ad_group_name}'
          AND ad_group_criterion.negative = FALSE
          AND ad_group_criterion.status != 'REMOVED'
    """
    return {
        (
            row.ad_group_criterion.keyword.text,
            row.ad_group_criterion.keyword.match_type.name,
        )
        for row in service.search(customer_id=cid, query=query)
    }


def create_budget(client, cid: str, campaign_name: str, daily_usd: int, dry_run: bool) -> str:
    budget_service = client.get_service("CampaignBudgetService")
    budget_name = f"{campaign_name} budget"
    if dry_run:
        print(f"  [dry-run] budget {budget_name}: ${daily_usd}/day")
        return f"customers/{cid}/campaignBudgets/0"

    operation = client.get_type("CampaignBudgetOperation")
    budget = operation.create
    budget.name = budget_name
    budget.amount_micros = daily_usd * 1_000_000
    budget.delivery_method = client.enums.BudgetDeliveryMethodEnum.STANDARD
    budget.explicitly_shared = False

    response = budget_service.mutate_campaign_budgets(
        customer_id=cid, operations=[operation]
    )
    resource = response.results[0].resource_name
    print(f"  budget: {resource}")
    return resource


def create_campaign(
    client,
    cid: str,
    spec: dict,
    budget_resource: str,
    dry_run: bool,
) -> str:
    campaign_service = client.get_service("CampaignService")
    name = spec["campaign_name"]
    if dry_run:
        print(f"  [dry-run] campaign {name} (PAUSED)")
        return f"customers/{cid}/campaigns/0"

    operation = client.get_type("CampaignOperation")
    campaign = operation.create
    campaign.name = name
    campaign.status = client.enums.CampaignStatusEnum.PAUSED
    campaign.advertising_channel_type = (
        client.enums.AdvertisingChannelTypeEnum.SEARCH
    )
    campaign.campaign_budget = budget_resource

    campaign.maximize_conversions.target_cpa_micros = TARGET_CPA_MICROS

    campaign.network_settings.target_google_search = True
    campaign.network_settings.target_search_network = False
    campaign.network_settings.target_content_network = False
    campaign.network_settings.target_partner_search_network = False

    campaign.geo_target_type_setting.positive_geo_target_type = (
        client.enums.PositiveGeoTargetTypeEnum.PRESENCE
    )
    campaign.geo_target_type_setting.negative_geo_target_type = (
        client.enums.NegativeGeoTargetTypeEnum.PRESENCE
    )

    campaign.contains_eu_political_advertising = (
        client.enums.EuPoliticalAdvertisingStatusEnum.DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING
    )

    response = campaign_service.mutate_campaigns(
        customer_id=cid, operations=[operation]
    )
    resource = response.results[0].resource_name
    print(f"  campaign: {resource}")
    return resource


def create_campaign_criteria(
    client, cid: str, campaign_resource: str, dry_run: bool
) -> None:
    if dry_run:
        print("  [dry-run] campaign criteria: NY geo + English")
        return

    service = client.get_service("CampaignCriterionService")
    operations = []

    for criterion_type, constant in (
        ("LOCATION", NY_GEO_TARGET_CONSTANT),
        ("LANGUAGE", EN_LANGUAGE_CONSTANT),
    ):
        operation = client.get_type("CampaignCriterionOperation")
        criterion = operation.create
        criterion.campaign = campaign_resource
        if criterion_type == "LOCATION":
            criterion.location.geo_target_constant = constant
        else:
            criterion.language.language_constant = constant
        operations.append(operation)

    service.mutate_campaign_criteria(customer_id=cid, operations=operations)
    print("  campaign criteria: geo + language")


def attach_shared_negative_sets(
    client, cid: str, campaign_resource: str, shared_set_ids: str, dry_run: bool
) -> None:
    ids = [s.strip() for s in shared_set_ids.split(",") if s.strip()]
    if dry_run:
        print(f"  [dry-run] attach {len(ids)} shared negative lists")
        return

    service = client.get_service("CampaignSharedSetService")
    shared_set_service = client.get_service("SharedSetService")
    operations = []
    for shared_set_id in ids:
        operation = client.get_type("CampaignSharedSetOperation")
        css = operation.create
        css.campaign = campaign_resource
        css.shared_set = shared_set_service.shared_set_path(cid, shared_set_id)
        operations.append(operation)

    service.mutate_campaign_shared_sets(customer_id=cid, operations=operations)
    print(f"  shared negatives attached: {len(ids)} lists")


def create_ad_group(
    client,
    cid: str,
    campaign_resource: str,
    ad_group_name: str,
    dry_run: bool,
) -> str:
    if dry_run:
        print(f"    [dry-run] ad group: {ad_group_name}")
        return f"customers/{cid}/adGroups/0"

    service = client.get_service("AdGroupService")
    operation = client.get_type("AdGroupOperation")
    ad_group = operation.create
    ad_group.name = ad_group_name
    ad_group.campaign = campaign_resource
    ad_group.status = client.enums.AdGroupStatusEnum.ENABLED
    ad_group.type_ = client.enums.AdGroupTypeEnum.SEARCH_STANDARD

    response = service.mutate_ad_groups(customer_id=cid, operations=[operation])
    resource = response.results[0].resource_name
    print(f"    ad group: {ad_group_name}")
    return resource


def _keyword_operation(client, ad_group_resource: str, kw: dict):
    match_enum = client.enums.KeywordMatchTypeEnum
    operation = client.get_type("AdGroupCriterionOperation")
    criterion = operation.create
    criterion.ad_group = ad_group_resource
    criterion.status = client.enums.AdGroupCriterionStatusEnum.ENABLED
    criterion.keyword.text = kw["keyword_text"]
    criterion.keyword.match_type = getattr(match_enum, kw["match_type"])
    return operation


def _extract_exemptible_keys(exc: GoogleAdsException) -> list:
    keys = []
    for error in exc.failure.errors:
        pvd = error.details.policy_violation_details
        if pvd and pvd.is_exemptible:
            keys.append(pvd.key)
    return keys


def create_keywords(
    client,
    cid: str,
    ad_group_resource: str,
    keywords: list[dict],
    *,
    dry_run: bool,
    already: set[tuple[str, str]] | None = None,
) -> dict:
    """Create keywords one-by-one so policy exemptions can be requested per keyword."""
    already = already or set()
    pending = [
        kw
        for kw in keywords
        if (kw["keyword_text"], kw["match_type"]) not in already
    ]
    skipped = len(keywords) - len(pending)

    if dry_run:
        print(f"      [dry-run] {len(pending)} keywords ({skipped} already live)")
        return {
            "created": 0,
            "exempted": 0,
            "skipped": skipped,
            "failed": 0,
            "failures": [],
        }

    service = client.get_service("AdGroupCriterionService")
    created = 0
    exempted = 0
    failures: list[dict] = []

    for kw in pending:
        text = kw["keyword_text"]
        match_type = kw["match_type"]
        operation = _keyword_operation(client, ad_group_resource, kw)
        try:
            service.mutate_ad_group_criteria(
                customer_id=cid, operations=[operation]
            )
            created += 1
            continue
        except GoogleAdsException as exc:
            keys = _extract_exemptible_keys(exc)
            if not keys:
                msg = "; ".join(e.message for e in exc.failure.errors)
                print(f"      FAIL [{match_type}] {text}: {msg}")
                failures.append(
                    {
                        "keyword_text": text,
                        "match_type": match_type,
                        "error": msg,
                        "exemptible": False,
                    }
                )
                continue

            # Retry with exemption request (API equivalent of "request review").
            retry = _keyword_operation(client, ad_group_resource, kw)
            retry.exempt_policy_violation_keys.extend(keys)
            try:
                service.mutate_ad_group_criteria(
                    customer_id=cid, operations=[retry]
                )
                created += 1
                exempted += 1
                policy = keys[0].policy_name if keys else "unknown"
                print(f"      EXEMPT [{match_type}] {text} ({policy})")
            except GoogleAdsException as retry_exc:
                msg = "; ".join(e.message for e in retry_exc.failure.errors)
                print(f"      FAIL-EXEMPT [{match_type}] {text}: {msg}")
                failures.append(
                    {
                        "keyword_text": text,
                        "match_type": match_type,
                        "error": msg,
                        "exemptible": True,
                    }
                )

    print(
        f"      keywords: +{created} "
        f"(exempted {exempted}, skipped {skipped}, failed {len(failures)})"
    )
    return {
        "created": created,
        "exempted": exempted,
        "skipped": skipped,
        "failed": len(failures),
        "failures": failures,
    }


def upload_campaign(client, cid: str, spec: dict, dry_run: bool) -> dict:
    name = spec["campaign_name"]
    print(f"\n{name}")

    campaigns = existing_campaign_map(client, cid)
    if name in campaigns:
        campaign_resource = campaigns[name]
        print(f"  resume existing campaign: {campaign_resource}")
    else:
        budget_resource = create_budget(
            client, cid, name, int(spec["budget_daily_usd"]), dry_run
        )
        campaign_resource = create_campaign(
            client, cid, spec, budget_resource, dry_run
        )
        create_campaign_criteria(client, cid, campaign_resource, dry_run)
        attach_shared_negative_sets(
            client, cid, campaign_resource, spec["negative_shared_set_ids"], dry_run
        )

    ad_groups = (
        {}
        if dry_run and name not in campaigns
        else existing_ad_group_map(client, cid, name)
    )

    ad_group_created = 0
    keyword_stats = {
        "created": 0,
        "exempted": 0,
        "skipped": 0,
        "failed": 0,
        "failures": [],
    }

    for ag in spec["ad_groups"]:
        ag_name = ag["ad_group_name"]
        if ag_name in ad_groups:
            ad_group_resource = ad_groups[ag_name]
            print(f"    resume ad group: {ag_name}")
            already = existing_keywords(client, cid, name, ag_name)
        else:
            ad_group_resource = create_ad_group(
                client, cid, campaign_resource, ag_name, dry_run
            )
            ad_group_created += 1
            already = set()

        stats = create_keywords(
            client,
            cid,
            ad_group_resource,
            ag["keywords"],
            dry_run=dry_run,
            already=already,
        )
        for key in ("created", "exempted", "skipped", "failed"):
            keyword_stats[key] += stats[key]
        keyword_stats["failures"].extend(stats["failures"])

    return {
        "campaign_name": name,
        "campaign_resource": campaign_resource,
        "ad_groups_created": ad_group_created,
        "keywords": keyword_stats,
        "final_urls": {
            ag["ad_group_name"]: ag["final_url"] for ag in spec["ad_groups"]
        },
    }


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--manifest",
        type=Path,
        default=MANIFEST_PATH,
        help="Path to manifest.json",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print planned mutations without calling the API",
    )
    parser.add_argument(
        "--customer-id",
        default=None,
        help="Override GOOGLE_ADS_CUSTOMER_ID",
    )
    parser.add_argument(
        "--only",
        nargs="+",
        default=None,
        help="Only process these campaign names",
    )
    args = parser.parse_args(argv)

    manifest = load_manifest(args.manifest)
    client = load_client()
    cid = customer_id(args.customer_id)

    specs = manifest["campaigns"]
    if args.only:
        wanted = set(args.only)
        specs = [s for s in specs if s["campaign_name"] in wanted]
        missing = wanted - {s["campaign_name"] for s in specs}
        if missing:
            print(f"Unknown campaign(s): {', '.join(sorted(missing))}", file=sys.stderr)
            return 1

    print(
        f"Uploading/resuming {len(specs)} campaign(s) "
        f"{'(dry-run)' if args.dry_run else 'to account ' + cid}"
    )

    results = []
    try:
        for spec in specs:
            results.append(upload_campaign(client, cid, spec, args.dry_run))
    except GoogleAdsException as exc:
        print("\nGoogle Ads API error:", file=sys.stderr)
        for error in exc.failure.errors:
            print(f"  {error.error_code}: {error.message}", file=sys.stderr)
        return 1

    out_path = args.manifest.parent / "upload-result.json"
    payload = {
        "dry_run": args.dry_run,
        "customer_id": cid,
        "uploaded": results,
    }
    if not args.dry_run:
        out_path.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
        print(f"\nWrote {out_path}")

    total_created = sum(r["keywords"]["created"] for r in results)
    total_exempted = sum(r["keywords"]["exempted"] for r in results)
    total_failed = sum(r["keywords"]["failed"] for r in results)
    print(
        f"\nDone: {len(results)} campaign(s), "
        f"+{total_created} keywords ({total_exempted} with exemption), "
        f"{total_failed} failed"
    )
    print("Note: RSAs not created yet; final URLs are in upload-result.json per ad group.")
    return 1 if total_failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
