"""Enabled keywords vs attached shared lists, campaign negatives, and ad-group negatives."""
import csv
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def phrase_blocks(kwt: str, neg: str) -> bool:
    kw_toks = kwt.split()
    neg_toks = neg.split()
    n = len(neg_toks)
    if n == 0:
        return False
    for i in range(len(kw_toks) - n + 1):
        if kw_toks[i : i + n] == neg_toks:
            return True
    return False


def main() -> None:
    lists = defaultdict(list)
    with (ROOT / "shared-negatives.csv").open() as fh:
        for row in csv.DictReader(fh):
            lists[row["shared_set.name"]].append(
                (row["shared_criterion.keyword.text"].lower(), row["shared_criterion.keyword.match_type"])
            )

    print("=== SHARED LISTS ===")
    stop = {"in", "or", "me", "ok", "la", "ca", "pa", "co", "de", "hi", "id", "ma", "mo", "ne", "va", "wa", "md", "oh", "vs"}
    for name, members in sorted(lists.items()):
        short = [t for t, m in members if m == "PHRASE" and len(t) < 3]
        common = [t for t, m in members if m == "PHRASE" and t in stop]
        print(f"  {name}: {len(members)}; phrase<3={short or 'none'}; stop-words={common or 'none'}")

    camp_attach = defaultdict(list)
    with (ROOT / "campaign-shared-sets.csv").open() as fh:
        for row in csv.DictReader(fh):
            if row["campaign_shared_set.status"] != "ENABLED":
                continue
            if row["campaign.status"] != "ENABLED":
                continue
            camp_attach[row["campaign.name"]].append(row["shared_set.name"])
    print("\n=== ATTACHED TO ENABLED CAMPAIGNS ===")
    for camp, names in sorted(camp_attach.items()):
        print(f"  {camp}: {', '.join(names)}")

    kw_file = next(ROOT.glob("Ads - keyword-settings_api_snapshot_*.csv"))
    neg_file = next(ROOT.glob("Ads - negative-keywords_api_snapshot_*.csv"))

    ag_negs = defaultdict(list)
    with neg_file.open() as fh:
        for row in csv.DictReader(fh):
            if row["ad_group_criterion.status"] != "ENABLED":
                continue
            ag_negs[(row["campaign.name"], row["ad_group.name"])].append(
                (row["ad_group_criterion.keyword.text"].lower(), row["ad_group_criterion.keyword.match_type"])
            )

    camp_negs = defaultdict(list)
    with (ROOT / "campaign-negatives.csv").open() as fh:
        for row in csv.DictReader(fh):
            if row["campaign_criterion.status"] != "ENABLED":
                continue
            camp_negs[row["campaign.name"]].append(
                (row["campaign_criterion.keyword.text"].lower(), row["campaign_criterion.keyword.match_type"])
            )

    print("\n=== SHORT PHRASE NEGATIVES (campaign + ad group) ===")
    found_short = False
    for camp, items in list(camp_negs.items()):
        for text, mt in items:
            if mt == "PHRASE" and (len(text) < 3 or text in stop):
                found_short = True
                print(f"  campaign {camp}: {text!r}")
    for (camp, ag), items in ag_negs.items():
        for text, mt in items:
            if mt == "PHRASE" and (len(text) < 3 or text in stop):
                found_short = True
                print(f"  {camp} / {ag}: {text!r}")
    if not found_short:
        print("  none")

    enabled = []
    skipped_ag = 0
    with kw_file.open() as fh:
        for row in csv.DictReader(fh):
            if row["ad_group_criterion.negative"].lower() == "true":
                continue
            if row["ad_group_criterion.status"] != "ENABLED":
                continue
            if row["campaign.status"] != "ENABLED":
                continue
            if row["ad_group.status"] != "ENABLED":
                skipped_ag += 1
                continue
            enabled.append(row)

    print(f"\nEnabled keywords in enabled ad groups: {len(enabled)}; skipped paused ad groups: {skipped_ag}")

    hits = []
    counts = defaultdict(lambda: {"n": 0, "blocked": 0})
    for row in enabled:
        camp = row["campaign.name"]
        counts[camp]["n"] += 1
        text = row["ad_group_criterion.keyword.text"].lower()
        ag = row["ad_group.name"]
        reasons = []
        for list_name in camp_attach.get(camp, []):
            for neg, mt in lists.get(list_name, []):
                if mt == "PHRASE" and phrase_blocks(text, neg):
                    reasons.append(f"list {list_name} phrase '{neg}'")
                elif mt == "EXACT" and text == neg:
                    reasons.append(f"list {list_name} exact '{neg}'")
        for neg, mt in camp_negs.get(camp, []):
            if mt == "PHRASE" and phrase_blocks(text, neg):
                reasons.append(f"campaign phrase '{neg}'")
            elif mt == "EXACT" and text == neg:
                reasons.append(f"campaign exact '{neg}'")
        for neg, mt in ag_negs.get((camp, ag), []):
            if mt == "PHRASE" and phrase_blocks(text, neg):
                reasons.append(f"ad group phrase '{neg}'")
            elif mt == "EXACT" and text == neg:
                reasons.append(f"ad group exact '{neg}'")
        if reasons:
            hits.append((camp, ag, text, reasons))
            counts[camp]["blocked"] += 1

    print("\n=== SELF-BLOCK ===")
    for camp, d in sorted(counts.items()):
        print(f"  {camp}: {d['blocked']} of {d['n']}")
    if hits:
        for camp, ag, text, reasons in hits:
            print(f"  HIT [{camp} / {ag}] {text} <- {'; '.join(reasons)}")
    else:
        print("  PASS — 0 self-blocked")


if __name__ == "__main__":
    main()
