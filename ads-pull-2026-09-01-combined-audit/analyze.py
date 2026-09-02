#!/usr/bin/env python3
"""Roll up combined-audit CSVs. Run from repo root."""
from __future__ import annotations

import csv
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SOP = Path(__file__).resolve().parent.parent / "ads-pull-2026-09-01-weekly-sop"

BLOCKED_EXAMPLES = [
    "form a pllc in new york",
    "start a pllc in ny",
    "cost to form a pllc in new york",
    "pllc in ny",
    "pllc in new york",
    "pllc formation service near me",
    "form a pllc in ny",
    "start a pllc in new york",
    "how much does a pllc cost in ny",
    "forming a pllc in new york",
    "forming a pllc in ny",
    "set up a pllc in ny",
    "create a pllc in new york",
    "file a pllc in ny",
    "open a pllc in new york",
    "md pllc ny",
    "how much is a pllc in new york",
]


def fnum(x: str) -> float:
    try:
        return float(x or 0)
    except ValueError:
        return 0.0


def dollars(micros: str) -> float:
    return fnum(micros) / 1_000_000


def roll_campaigns(path: Path) -> dict:
    by = defaultdict(lambda: {
        "impr": 0.0, "clicks": 0.0, "cost": 0.0, "conv": 0.0, "conv_date": 0.0,
        "is_w": 0.0, "rank_w": 0.0, "budg_w": 0.0, "days": 0,
    })
    with path.open() as fh:
        for row in csv.DictReader(fh):
            name = row["campaign.name"]
            impr = fnum(row["metrics.impressions"])
            d = by[name]
            d["impr"] += impr
            d["clicks"] += fnum(row["metrics.clicks"])
            d["cost"] += dollars(row["metrics.cost_micros"])
            d["conv"] += fnum(row["metrics.conversions"])
            d["conv_date"] += fnum(row["metrics.conversions_by_conversion_date"])
            d["is_w"] += fnum(row["metrics.search_impression_share"]) * impr
            d["rank_w"] += fnum(row["metrics.search_rank_lost_impression_share"]) * impr
            d["budg_w"] += fnum(row["metrics.search_budget_lost_impression_share"]) * impr
            d["days"] += 1
    out = {}
    for name, d in by.items():
        is_ = d["is_w"] / d["impr"] if d["impr"] else 0
        rank = d["rank_w"] / d["impr"] if d["impr"] else 0
        budg = d["budg_w"] / d["impr"] if d["impr"] else 0
        elig = d["impr"] / is_ if is_ else 0
        cpa = d["cost"] / d["conv"] if d["conv"] else None
        out[name] = {**d, "is": is_, "rank": rank, "budg": budg, "elig": elig, "cpa": cpa}
    return out


def print_campaign_table(title: str, rolled: dict) -> None:
    print(f"\n=== {title} ===")
    print(f"{'campaign':<22} {'impr':>6} {'clk':>5} {'spend':>8} {'conv':>6} {'cpa':>7} {'IS':>6} {'rank':>6} {'budg':>6} {'elig':>7}")
    tot = defaultdict(float)
    for name in sorted(rolled):
        d = rolled[name]
        tot["impr"] += d["impr"]
        tot["clicks"] += d["clicks"]
        tot["cost"] += d["cost"]
        tot["conv"] += d["conv"]
        cpa = f"${d['cpa']:.0f}" if d["cpa"] else "—"
        print(
            f"{name:<22} {d['impr']:>6.0f} {d['clicks']:>5.0f} ${d['cost']:>7.2f} "
            f"{d['conv']:>6.1f} {cpa:>7} {d['is']*100:>5.1f}% {d['rank']*100:>5.1f}% "
            f"{d['budg']*100:>5.1f}% {d['elig']:>7.0f}"
        )
    cpa = tot["cost"] / tot["conv"] if tot["conv"] else None
    print(
        f"{'ACCOUNT':<22} {tot['impr']:>6.0f} {tot['clicks']:>5.0f} ${tot['cost']:>7.2f} "
        f"{tot['conv']:>6.1f} {f'${cpa:.0f}' if cpa else '—':>7}"
    )
    print(f"GATE: account ≥28 conv ≤$105 → conv={tot['conv']:.1f} CPA={cpa}")


def conv_actions(path: Path) -> None:
    by = defaultdict(lambda: {"conv": 0.0, "date": 0.0, "all": 0.0, "val": 0.0})
    with path.open() as fh:
        for row in csv.DictReader(fh):
            name = row["segments.conversion_action_name"]
            by[name]["conv"] += fnum(row["metrics.conversions"])
            by[name]["date"] += fnum(row["metrics.conversions_by_conversion_date"])
            by[name]["all"] += fnum(row["metrics.all_conversions"])
            by[name]["val"] += fnum(row["metrics.conversions_value"])
    print("\n--- conversion actions ---")
    for name, d in sorted(by.items(), key=lambda x: -x[1]["conv"]):
        print(f"  {name}: click-attr={d['conv']:.2f} by-date={d['date']:.2f} all={d['all']:.2f} value=${d['val']:.0f}")


def keyword_roll(path: Path, since="2026-08-04") -> dict:
    by = defaultdict(lambda: {
        "impr": 0.0, "clicks": 0.0, "cost": 0.0, "conv": 0.0,
        "campaigns": set(), "match": "", "serving": set(),
    })
    with path.open() as fh:
        for row in csv.DictReader(fh):
            if row["segments.date"] < since:
                continue
            key = (row["campaign.name"], row["ad_group_criterion.keyword.text"].lower())
            d = by[key]
            d["impr"] += fnum(row["metrics.impressions"])
            d["clicks"] += fnum(row["metrics.clicks"])
            d["cost"] += dollars(row["metrics.cost_micros"])
            d["conv"] += fnum(row["metrics.conversions"])
            d["campaigns"].add(row["campaign.name"])
            d["match"] = row["ad_group_criterion.keyword.match_type"]
            d["serving"].add(row["ad_group_criterion.system_serving_status"])
    return by


def leftover_negatives() -> None:
    shared = SOP / "shared-negatives.csv"
    kw = SOP / "Ads - keyword-settings_api_snapshot_2026-09-01.csv"
    negs = SOP / "Ads - negative-keywords_api_snapshot_2026-09-01.csv"
    attach = SOP / "Ads - campaign-shared-sets_api_snapshot_2026-09-01.csv"

    lists: dict[str, list[tuple[str, str]]] = defaultdict(list)
    with shared.open() as fh:
        for row in csv.DictReader(fh):
            lists[row["shared_set.name"]].append(
                (row["shared_criterion.keyword.text"].lower(), row["shared_criterion.keyword.match_type"])
            )

    print("\n=== LEFTOVER / DANGEROUS NEGATIVES ===")
    print("Shared list member counts:")
    for name, members in sorted(lists.items()):
        short = [t for t, m in members if len(t) < 3]
        common = [t for t, m in members if t in {"in", "or", "me", "ok", "la", "ca", "pa", "co", "de", "hi", "id", "ma", "mo", "ne", "va", "wa", "md", "vs"}]
        print(f"  {name}: {len(members)} members; <3-char={short or 'none'}; stop-word-ish={common or 'none'}")

    camp_attach: dict[str, set[str]] = defaultdict(set)
    with attach.open() as fh:
        for row in csv.DictReader(fh):
            camp_attach[row["campaign.name"]].add(row["shared_set.name"])

    ag_negs: dict[tuple[str, str], list[tuple[str, str]]] = defaultdict(list)
    camp_negs: dict[str, list[tuple[str, str]]] = defaultdict(list)
    with negs.open() as fh:
        for row in csv.DictReader(fh):
            text = row["ad_group_criterion.keyword.text"].lower()
            mt = row["ad_group_criterion.keyword.match_type"]
            ag = row.get("ad_group.name") or ""
            camp_negs[row["campaign.name"]].append((text, mt))
            if ag:
                ag_negs[(row["campaign.name"], ag)].append((text, mt))

    leftover_short = []
    for camp, items in camp_negs.items():
        for t, m in items:
            if m == "PHRASE" and (len(t) < 3 or t in {"in", "or", "me", "ok", "md"}):
                leftover_short.append((camp, t, m))
    print("\nCampaign/ad-group leftover stop-word phrase negatives:")
    if leftover_short:
        for row in leftover_short:
            print(" ", row)
    else:
        print("  none")

    # Self-block: enabled positive keywords vs attached phrase/exact negatives
    print("\n=== SELF-BLOCK CHECK (enabled keywords vs attached lists + campaign/ad-group negs) ===")

    def phrase_blocks(kw: str, neg: str) -> bool:
        # Google phrase negative: all tokens in order as a subsequence of words
        kw_toks = kw.split()
        neg_toks = neg.split()
        if not neg_toks:
            return False
        n = len(neg_toks)
        for i in range(len(kw_toks) - n + 1):
            if kw_toks[i : i + n] == neg_toks:
                return True
        return False

    def exact_blocks(kw: str, neg: str) -> bool:
        return kw == neg

    enabled = []
    with kw.open() as fh:
        for row in csv.DictReader(fh):
            if row["ad_group_criterion.negative"].lower() == "true":
                continue
            if row["ad_group_criterion.status"] != "ENABLED":
                continue
            if row["campaign.status"] != "ENABLED" and row["campaign.name"] != "03_ForeignQual_US":
                # still check paused 03
                if row["campaign.name"] != "03_ForeignQual_US":
                    continue
            if row["ad_group.status"] != "ENABLED":
                continue
            enabled.append(row)

    hits = []
    for row in enabled:
        camp = row["campaign.name"]
        ag = row["ad_group.name"]
        text = row["ad_group_criterion.keyword.text"].lower()
        reasons = []
        for list_name in camp_attach.get(camp, []):
            for neg, mt in lists.get(list_name, []):
                if mt == "PHRASE" and phrase_blocks(text, neg):
                    reasons.append(f"list {list_name} phrase '{neg}'")
                elif mt == "EXACT" and exact_blocks(text, neg):
                    reasons.append(f"list {list_name} exact '{neg}'")
        for neg, mt in ag_negs.get((camp, ag), []) + camp_negs.get(camp, []):
            if mt == "PHRASE" and phrase_blocks(text, neg):
                reasons.append(f"ag/camp phrase '{neg}'")
            elif mt == "EXACT" and exact_blocks(text, neg):
                reasons.append(f"ag/camp exact '{neg}'")
        if reasons:
            hits.append((camp, text, reasons))

    counts = defaultdict(lambda: {"n": 0, "blocked": 0})
    for row in enabled:
        counts[row["campaign.name"]]["n"] += 1
    for camp, text, reasons in hits:
        counts[camp]["blocked"] += 1

    for camp, d in sorted(counts.items()):
        print(f"  {camp}: {d['blocked']} of {d['n']} enabled keywords self-blocked")
    if hits:
        print("  HITS:")
        for camp, text, reasons in hits[:30]:
            print(f"    [{camp}] {text} ← {'; '.join(reasons[:3])}")
    else:
        print("  PASS — 0 self-blocked")


def main() -> None:
    print_campaign_table(
        "AUG CALENDAR 2026-08-01 to 2026-08-31",
        roll_campaigns(ROOT / "aug-calendar/Ads - campaigns_api_2026-08-01_to_2026-08-31.csv"),
    )
    conv_actions(ROOT / "aug-calendar/Ads - conversion-actions_api_2026-08-01_to_2026-08-31.csv")

    print_campaign_table(
        "POST-FIX 2026-08-04 to 2026-09-01",
        roll_campaigns(ROOT / "post-fix/Ads - campaigns_api_2026-08-04_to_2026-09-01.csv"),
    )
    conv_actions(ROOT / "post-fix/Ads - conversion-actions_api_2026-08-04_to_2026-09-01.csv")

    print_campaign_table(
        "ROLLING 30D 2026-08-03 to 2026-09-01",
        roll_campaigns(ROOT / "rolling-30d/Ads - campaigns_api_2026-08-03_to_2026-09-01.csv"),
    )
    conv_actions(ROOT / "rolling-30d/Ads - conversion-actions_api_2026-08-03_to_2026-09-01.csv")

    kws = keyword_roll(ROOT / "post-fix/Ads - keywords_api_2026-08-04_to_2026-09-01.csv")
    print("\n=== PREVIOUSLY BLOCKED KEYWORDS (Aug 4–Sep 1 keyword report) ===")
    print(f"{'campaign':<22} {'keyword':<36} {'match':<8} {'impr':>5} {'clk':>4} {'spend':>7} {'conv':>5} {'serving'}")
    seen = set()
    for (camp, text), d in sorted(kws.items(), key=lambda x: (-x[1]["impr"], x[0][1])):
        if text not in BLOCKED_EXAMPLES:
            continue
        seen.add(text)
        print(
            f"{camp:<22} {text:<36} {d['match']:<8} {d['impr']:>5.0f} {d['clicks']:>4.0f} "
            f"${d['cost']:>6.2f} {d['conv']:>5.1f} {','.join(d['serving'])}"
        )
    missing = [t for t in BLOCKED_EXAMPLES if t not in seen]
    if missing:
        print("  no rows (zero impressions) for:", ", ".join(missing))

    print("\n=== 01 Core Exact keyword totals Aug 4–Sep 1 ===")
    core = {k: v for k, v in kws.items() if k[0] == "01_Core_Exact_NY"}
    tot = defaultdict(float)
    converters = []
    serving = []
    silent = []
    for (camp, text), d in sorted(core.items(), key=lambda x: -x[1]["cost"]):
        tot["impr"] += d["impr"]
        tot["clicks"] += d["clicks"]
        tot["cost"] += d["cost"]
        tot["conv"] += d["conv"]
        if d["conv"] > 0:
            converters.append((text, d))
        elif d["impr"] > 0:
            serving.append((text, d))
        else:
            silent.append(text)
    cpa = tot["cost"] / tot["conv"] if tot["conv"] else None
    print(f"  keywords with rows: {len(core)}  impr={tot['impr']:.0f} clk={tot['clicks']:.0f} spend=${tot['cost']:.2f} conv={tot['conv']:.2f} cpa={cpa}")
    print("  converters:")
    for text, d in converters:
        print(f"    [{text}] clk={d['clicks']:.0f} ${d['cost']:.2f} conv={d['conv']:.2f}")
    print("  serving, 0 conv (top 15 by spend):")
    for text, d in serving[:15]:
        print(f"    [{text}] impr={d['impr']:.0f} clk={d['clicks']:.0f} ${d['cost']:.2f} serving={','.join(d['serving'])}")

    print("\n=== 02 Professions keyword totals Aug 4–Sep 1 ===")
    p02 = {k: v for k, v in kws.items() if k[0] == "02_Professions_NY"}
    tot2 = defaultdict(float)
    for (camp, text), d in p02.items():
        tot2["impr"] += d["impr"]
        tot2["clicks"] += d["clicks"]
        tot2["cost"] += d["cost"]
        tot2["conv"] += d["conv"]
        if d["impr"] or d["clicks"] or d["cost"]:
            print(f"    [{text}] impr={d['impr']:.0f} clk={d['clicks']:.0f} ${d['cost']:.2f} conv={d['conv']:.1f}")
    print(f"  02 rollup: impr={tot2['impr']:.0f} clk={tot2['clicks']:.0f} spend=${tot2['cost']:.2f} conv={tot2['conv']:.1f}")

    leftover_negatives()


if __name__ == "__main__":
    main()
