"""Validate manifest keywords against Google Ads policy (no writes)."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from google.ads.googleads.errors import GoogleAdsException

from google_ads.client import customer_id, load_client
from google_ads.upload_campaigns import MANIFEST_PATH, load_manifest

BASE = Path(__file__).resolve().parent.parent
DEFAULT_OUT = BASE / "google-ads-campaign-build" / "policy-check.json"


def existing_keywords(client, cid: str) -> set[tuple[str, str, str, str]]:
    service = client.get_service("GoogleAdsService")
    query = """
        SELECT campaign.name, ad_group.name,
               ad_group_criterion.keyword.text,
               ad_group_criterion.keyword.match_type
        FROM keyword_view
        WHERE campaign.name IN ('01_Core_Exact_NY', '02_Professions_NY')
          AND ad_group_criterion.negative = FALSE
          AND ad_group_criterion.status != 'REMOVED'
    """
    live: set[tuple[str, str, str, str]] = set()
    for row in service.search(customer_id=cid, query=query):
        mt = row.ad_group_criterion.keyword.match_type.name
        live.add(
            (
                row.campaign.name,
                row.ad_group.name,
                row.ad_group_criterion.keyword.text,
                mt,
            )
        )
    return live


def ad_group_resources(client, cid: str) -> dict[tuple[str, str], str]:
    service = client.get_service("GoogleAdsService")
    query = """
        SELECT campaign.name, ad_group.name, ad_group.resource_name
        FROM ad_group
        WHERE campaign.name IN ('01_Core_Exact_NY', '02_Professions_NY')
          AND ad_group.status != 'REMOVED'
    """
    out: dict[tuple[str, str], str] = {}
    for row in service.search(customer_id=cid, query=query):
        out[(row.campaign.name, row.ad_group.name)] = row.ad_group.resource_name
    return out


def validate_keyword(
    client,
    cid: str,
    ad_group_resource: str,
    keyword_text: str,
    match_type: str,
) -> dict:
    service = client.get_service("AdGroupCriterionService")
    match_enum = client.enums.KeywordMatchTypeEnum

    operation = client.get_type("AdGroupCriterionOperation")
    criterion = operation.create
    criterion.ad_group = ad_group_resource
    criterion.status = client.enums.AdGroupCriterionStatusEnum.ENABLED
    criterion.keyword.text = keyword_text
    criterion.keyword.match_type = getattr(match_enum, match_type)

    request = client.get_type("MutateAdGroupCriteriaRequest")
    request.customer_id = cid
    request.operations.append(operation)
    request.validate_only = True

    try:
        service.mutate_ad_group_criteria(request=request)
        return {"status": "ok", "exemptible": None, "policy": None}
    except GoogleAdsException as exc:
        policies: list[dict] = []
        for error in exc.failure.errors:
            pvd = error.details.policy_violation_details
            if not pvd:
                return {
                    "status": "error",
                    "exemptible": None,
                    "policy": None,
                    "message": error.message,
                }
            key = pvd.key
            policies.append(
                {
                    "policy_name": pvd.external_policy_name or key.policy_name,
                    "description": pvd.external_policy_description,
                    "is_exemptible": bool(pvd.is_exemptible),
                    "violating_text": key.violating_text,
                }
            )

        all_exemptible = bool(policies) and all(p["is_exemptible"] for p in policies)
        any_exemptible = any(p["is_exemptible"] for p in policies)
        if all_exemptible:
            status = "policy_exemptible"
        elif any_exemptible:
            status = "policy_mixed"
        else:
            status = "policy_blocked"

        return {
            "status": status,
            "exemptible": all_exemptible,
            "policy": policies[0]["policy_name"] if policies else None,
            "policies": policies,
        }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--manifest", type=Path, default=MANIFEST_PATH)
    parser.add_argument("--out", type=Path, default=DEFAULT_OUT)
    parser.add_argument("--customer-id", default=None)
    args = parser.parse_args()

    manifest = load_manifest(args.manifest)
    client = load_client()
    cid = customer_id(args.customer_id)
    live = existing_keywords(client, cid)
    ad_groups = ad_group_resources(client, cid)

    # Fallback validation proxies when target ad group not created yet.
    proxies = {
        "01_Core_Exact_NY": ad_groups.get(("01_Core_Exact_NY", "Formation-Core")),
        "02_Professions_NY": ad_groups.get(("02_Professions_NY", "Therapists-LCSW")),
    }

    results: list[dict] = []
    summary = {
        "ok": 0,
        "already_live": 0,
        "policy_exemptible": 0,
        "policy_blocked": 0,
        "policy_mixed": 0,
        "error": 0,
        "skipped_no_ad_group": 0,
    }

    for campaign in manifest["campaigns"]:
        campaign_name = campaign["campaign_name"]
        for ag in campaign["ad_groups"]:
            ag_name = ag["ad_group_name"]
            ag_resource = ad_groups.get((campaign_name, ag_name)) or proxies.get(
                campaign_name
            )
            for kw in ag["keywords"]:
                text = kw["keyword_text"]
                match_type = kw["match_type"]
                key = (campaign_name, ag_name, text, match_type)

                if key in live:
                    row = {
                        "campaign": campaign_name,
                        "ad_group": ag_name,
                        "keyword": text,
                        "match_type": match_type,
                        "status": "already_live",
                        "exemptible": None,
                        "policy": None,
                    }
                    summary["already_live"] += 1
                    results.append(row)
                    continue

                if not ag_resource:
                    row = {
                        "campaign": campaign_name,
                        "ad_group": ag_name,
                        "keyword": text,
                        "match_type": match_type,
                        "status": "skipped_no_ad_group",
                        "exemptible": None,
                        "policy": None,
                    }
                    summary["skipped_no_ad_group"] += 1
                    results.append(row)
                    continue

                used_proxy = (campaign_name, ag_name) not in ad_groups
                checked = validate_keyword(
                    client, cid, ag_resource, text, match_type
                )
                row = {
                    "campaign": campaign_name,
                    "ad_group": ag_name,
                    "keyword": text,
                    "match_type": match_type,
                    "validated_via_proxy_ad_group": used_proxy,
                    **checked,
                }
                status = row["status"]
                if status in summary:
                    summary[status] += 1
                results.append(row)

    payload = {
        "customer_id": cid,
        "manifest": str(args.manifest),
        "summary": summary,
        "results": results,
    }
    args.out.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")

    print(f"Wrote {args.out}")
    print("Summary:", json.dumps(summary))
    exemptible = [r for r in results if r.get("status") == "policy_exemptible"]
    blocked = [r for r in results if r.get("status") == "policy_blocked"]
    mixed = [r for r in results if r.get("status") == "policy_mixed"]
    if exemptible:
        print(f"\nExemptible ({len(exemptible)}):")
        for r in exemptible:
            print(f"  [{r['match_type']}] {r['keyword']} ({r['ad_group']}) — {r['policy']}")
    if mixed:
        print(f"\nMixed exemptibility ({len(mixed)}):")
        for r in mixed:
            print(f"  [{r['match_type']}] {r['keyword']} ({r['ad_group']})")
    if blocked:
        print(f"\nBlocked ({len(blocked)}):")
        for r in blocked:
            print(f"  [{r['match_type']}] {r['keyword']} ({r['ad_group']}) — {r['policy']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
