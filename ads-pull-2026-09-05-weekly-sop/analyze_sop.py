#!/usr/bin/env python3
from __future__ import annotations

import csv
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def fnum(x):
    try:
        return float(x or 0)
    except ValueError:
        return 0.0


def dollars(m):
    return fnum(m) / 1_000_000


def roll_campaigns(path):
    by = defaultdict(
        lambda: {
            "impr": 0.0,
            "clicks": 0.0,
            "cost": 0.0,
            "conv": 0.0,
            "conv_date": 0.0,
            "is_w": 0.0,
            "rank_w": 0.0,
            "budg_w": 0.0,
        }
    )
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
    out = {}
    tot = defaultdict(float)
    for name, d in by.items():
        is_ = d["is_w"] / d["impr"] if d["impr"] else 0
        rank = d["rank_w"] / d["impr"] if d["impr"] else 0
        budg = d["budg_w"] / d["impr"] if d["impr"] else 0
        elig = d["impr"] / is_ if is_ else 0
        cpa = d["cost"] / d["conv"] if d["conv"] else None
        out[name] = {**d, "is": is_, "rank": rank, "budg": budg, "elig": elig, "cpa": cpa}
        for k in ("impr", "clicks", "cost", "conv", "conv_date"):
            tot[k] += d[k]
    tot["cpa"] = tot["cost"] / tot["conv"] if tot["conv"] else None
    return out, tot


def print_table(title, rolled, tot):
    print(f"\n=== {title} ===")
    print(
        f"{'campaign':<22} {'impr':>6} {'clk':>5} {'spend':>8} {'conv':>7} {'cdate':>7} "
        f"{'cpa':>8} {'IS':>6} {'rank':>6} {'budg':>6} {'elig':>7}"
    )
    live = ["Sales-Search-1", "01_Core_Exact_NY", "02_Professions_NY", "03_ForeignQual_US"]
    names = [n for n in live if n in rolled] + [n for n in sorted(rolled) if n not in live]
    for name in names:
        d = rolled[name]
        cpa = f"${d['cpa']:.0f}" if d["cpa"] else "—"
        print(
            f"{name:<22} {d['impr']:6.0f} {d['clicks']:5.0f} ${d['cost']:7.2f} "
            f"{d['conv']:7.2f} {d['conv_date']:7.2f} {cpa:>8} {d['is']*100:5.1f}% "
            f"{d['rank']*100:5.1f}% {d['budg']*100:5.1f}% {d['elig']:7.0f}"
        )
    cpa = f"${tot['cpa']:.0f}" if tot["cpa"] else "—"
    print(
        f"{'ACCOUNT':<22} {tot['impr']:6.0f} {tot['clicks']:5.0f} ${tot['cost']:7.2f} "
        f"{tot['conv']:7.2f} {tot['conv_date']:7.2f} {cpa:>8}"
    )


def conv_actions(path, label=""):
    by = defaultdict(lambda: {"conv": 0.0, "date": 0.0, "all": 0.0, "val": 0.0})
    with path.open() as fh:
        for row in csv.DictReader(fh):
            name = row["segments.conversion_action_name"]
            by[name]["conv"] += fnum(row["metrics.conversions"])
            by[name]["date"] += fnum(row["metrics.conversions_by_conversion_date"])
            by[name]["all"] += fnum(row["metrics.all_conversions"])
            by[name]["val"] += fnum(row["metrics.conversions_value"])
    print(f"\n--- conversion actions {label} ---")
    for name, d in sorted(by.items(), key=lambda x: -x[1]["conv"]):
        print(
            f"  {name}: click={d['conv']:.3f} by-date={d['date']:.3f} "
            f"all={d['all']:.3f} value=${d['val']:.0f}"
        )


def phrase_blocks(kwt, neg):
    kw_toks = kwt.split()
    neg_toks = neg.split()
    n = len(neg_toks)
    if n == 0:
        return False
    for i in range(len(kw_toks) - n + 1):
        if kw_toks[i : i + n] == neg_toks:
            return True
    return False


def main():
    for label, p in [
        ("7d Aug 30–Sep 5", ROOT / "rolling-7d/Ads - campaigns_api_2026-08-30_to_2026-09-05.csv"),
        ("28d Aug 9–Sep 5", ROOT / "rolling-28d/Ads - campaigns_api_2026-08-09_to_2026-09-05.csv"),
        ("30d Aug 7–Sep 5", ROOT / "rolling-30d/Ads - campaigns_api_2026-08-07_to_2026-09-05.csv"),
        ("Sep MTD", ROOT / "sep-mtd/Ads - campaigns_api_2026-09-01_to_2026-09-05.csv"),
    ]:
        rolled, tot = roll_campaigns(p)
        print_table(label, rolled, tot)

    conv_actions(ROOT / "rolling-7d/Ads - conversion-actions_api_2026-08-30_to_2026-09-05.csv", "7d")
    conv_actions(ROOT / "rolling-28d/Ads - conversion-actions_api_2026-08-09_to_2026-09-05.csv", "28d")
    conv_actions(ROOT / "rolling-30d/Ads - conversion-actions_api_2026-08-07_to_2026-09-05.csv", "30d")
    conv_actions(ROOT / "sep-mtd/Ads - conversion-actions_api_2026-09-01_to_2026-09-05.csv", "Sep MTD")

    print("\n=== DEVICES ===")
    for label, p in [
        ("7d", ROOT / "rolling-7d/Ads - devices_api_2026-08-30_to_2026-09-05.csv"),
        ("30d", ROOT / "rolling-30d/Ads - devices_api_2026-08-07_to_2026-09-05.csv"),
    ]:
        by = defaultdict(lambda: {"clk": 0.0, "conv": 0.0, "cost": 0.0})
        with p.open() as fh:
            for row in csv.DictReader(fh):
                dev = row["segments.device"]
                by[dev]["clk"] += fnum(row["metrics.clicks"])
                by[dev]["conv"] += fnum(row["metrics.conversions"])
                by[dev]["cost"] += dollars(row["metrics.cost_micros"])
        print(label)
        for dev, d in sorted(by.items()):
            cvr = d["conv"] / d["clk"] * 100 if d["clk"] else 0
            print(f"  {dev}: clk={d['clk']:.0f} conv={d['conv']:.2f} cvr={cvr:.1f}% spend=${d['cost']:.0f}")

    print("\n=== 01 KEYWORD CONV (Jul 9–Sep 5) ===")
    kwp = ROOT / "Ads - keywords_api_2026-07-09_to_2026-09-05.csv"
    core = defaultdict(lambda: {"impr": 0, "clk": 0, "cost": 0, "conv": 0})
    tot = defaultdict(float)
    with kwp.open() as fh:
        for row in csv.DictReader(fh):
            if row["campaign.name"] != "01_Core_Exact_NY":
                continue
            text = row["ad_group_criterion.keyword.text"].lower()
            d = core[text]
            d["impr"] += fnum(row["metrics.impressions"])
            d["clk"] += fnum(row["metrics.clicks"])
            d["cost"] += dollars(row["metrics.cost_micros"])
            d["conv"] += fnum(row["metrics.conversions"])
            tot["conv"] += fnum(row["metrics.conversions"])
            tot["cost"] += dollars(row["metrics.cost_micros"])
            tot["clk"] += fnum(row["metrics.clicks"])
    print(f"  01 total conv={tot['conv']:.2f} clk={tot['clk']:.0f} spend=${tot['cost']:.2f}")
    print("  converters:")
    for text, d in sorted(core.items(), key=lambda x: -x[1]["conv"]):
        if d["conv"] > 0:
            print(f"    [{text}] clk={d['clk']:.0f} ${d['cost']:.2f} conv={d['conv']:.2f}")

    print("\n=== SEARCH TERMS converters (Jul 9–Sep 5) ===")
    stp = ROOT / "Ads - search-terms_api_2026-07-09_to_2026-09-05.csv"
    st = defaultdict(lambda: {"conv": 0.0, "cost": 0.0, "clk": 0.0, "impr": 0.0, "camps": set()})
    st7 = defaultdict(lambda: {"conv": 0.0, "cost": 0.0, "clk": 0.0, "camps": set()})
    with stp.open() as fh:
        for row in csv.DictReader(fh):
            term = row["search_term_view.search_term"].lower()
            d = st[term]
            d["conv"] += fnum(row["metrics.conversions"])
            d["cost"] += dollars(row["metrics.cost_micros"])
            d["clk"] += fnum(row["metrics.clicks"])
            d["impr"] += fnum(row["metrics.impressions"])
            d["camps"].add(row["campaign.name"])
            if row["segments.date"] >= "2026-08-30":
                e = st7[term]
                e["conv"] += fnum(row["metrics.conversions"])
                e["cost"] += dollars(row["metrics.cost_micros"])
                e["clk"] += fnum(row["metrics.clicks"])
                e["camps"].add(row["campaign.name"])

    print("lifetime converters:")
    for term, d in sorted(st.items(), key=lambda x: (-x[1]["conv"], -x[1]["cost"])):
        if d["conv"] >= 0.5:
            print(
                f"  {term!r:40} conv={d['conv']:.2f} ${d['cost']:.0f} clk={d['clk']:.0f} "
                f"{','.join(sorted(d['camps']))}"
            )

    print("\n7d converters / spend:")
    for term, d in sorted(st7.items(), key=lambda x: (-x[1]["conv"], -x[1]["cost"]))[:30]:
        if d["conv"] > 0 or d["cost"] >= 10:
            print(
                f"  {term!r:40} conv={d['conv']:.2f} ${d['cost']:.0f} clk={d['clk']:.0f} "
                f"{','.join(sorted(d['camps']))}"
            )

    print("\n7d high-spend 0 conv:")
    zeros = [(t, d) for t, d in st7.items() if d["conv"] == 0 and d["cost"] >= 8]
    for term, d in sorted(zeros, key=lambda x: -x[1]["cost"])[:20]:
        print(f"  {term!r:40} ${d['cost']:.0f} clk={d['clk']:.0f} {','.join(sorted(d['camps']))}")

    junk_tokens = (
        "availability",
        "lookup",
        "salary",
        "jobs",
        "template",
        "login",
        "blumberg",
        "seal",
        "corporate book",
    )
    print("\nPossible junk 7d:")
    found = False
    for term, d in sorted(st7.items(), key=lambda x: -x[1]["cost"]):
        if any(tok in term for tok in junk_tokens):
            found = True
            print(f"  {term!r} ${d['cost']:.2f} clk={d['clk']:.0f}")
    if not found:
        print("  none")

    print("\n=== SELF-BLOCK ===")
    lists = defaultdict(list)
    with (ROOT / "shared-negatives.csv").open() as fh:
        for row in csv.DictReader(fh):
            lists[row["shared_set.name"]].append(
                (row["shared_criterion.keyword.text"].lower(), row["shared_criterion.keyword.match_type"])
            )
    print("list sizes:", {k: len(v) for k, v in sorted(lists.items())})
    camp_attach = defaultdict(list)
    with (ROOT / "Ads - campaign-shared-sets_api_snapshot_2026-09-05.csv").open() as fh:
        for row in csv.DictReader(fh):
            camp_attach[row["campaign.name"]].append(row["shared_set.name"])

    ag_negs = defaultdict(list)
    with (ROOT / "Ads - negative-keywords_api_snapshot_2026-09-05.csv").open() as fh:
        for row in csv.DictReader(fh):
            if row["ad_group_criterion.status"] != "ENABLED":
                continue
            t = row["ad_group_criterion.keyword.text"].lower()
            mt = row["ad_group_criterion.keyword.match_type"]
            ag_negs[(row["campaign.name"], row["ad_group.name"])].append((t, mt))

    enabled = []
    skipped_ag = 0
    with (ROOT / "Ads - keyword-settings_api_snapshot_2026-09-05.csv").open() as fh:
        for row in csv.DictReader(fh):
            if row["ad_group_criterion.negative"].lower() == "true":
                continue
            if row["ad_group_criterion.status"] != "ENABLED":
                continue
            if row["campaign.status"] != "ENABLED" and row["campaign.name"] != "03_ForeignQual_US":
                continue
            if row["ad_group.status"] != "ENABLED":
                skipped_ag += 1
                continue
            enabled.append(row)
    print(f"skipped non-enabled AGs: {skipped_ag}")

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
        for neg, mt in ag_negs.get((camp, ag), []):
            if mt == "PHRASE" and phrase_blocks(text, neg):
                reasons.append(f"ag phrase '{neg}'")
            elif mt == "EXACT" and text == neg:
                reasons.append(f"ag exact '{neg}'")
        if reasons:
            hits.append((camp, text, reasons))
            counts[camp]["blocked"] += 1
    for camp, d in sorted(counts.items()):
        print(f"  {camp}: {d['blocked']} of {d['n']}")
    if hits:
        for h in hits[:20]:
            print("  HIT", h)
    else:
        print("  PASS")

    print("\nDangerous short phrase negs:")
    danger = False
    for name, members in lists.items():
        for neg, mt in members:
            if mt == "PHRASE" and (len(neg) < 3 or neg in {"in", "or", "me", "ok", "hi", "la", "oh"}):
                danger = True
                print(f"  {name}: '{neg}'")
    if not danger:
        print("  none")

    print("\n02 keyword 7d:")
    with kwp.open() as fh:
        by = defaultdict(lambda: {"impr": 0, "clk": 0, "cost": 0, "conv": 0})
        for row in csv.DictReader(fh):
            if row["campaign.name"] != "02_Professions_NY":
                continue
            if row["segments.date"] < "2026-08-30":
                continue
            t = row["ad_group_criterion.keyword.text"]
            by[t]["impr"] += fnum(row["metrics.impressions"])
            by[t]["clk"] += fnum(row["metrics.clicks"])
            by[t]["cost"] += dollars(row["metrics.cost_micros"])
            by[t]["conv"] += fnum(row["metrics.conversions"])
        for t, d in sorted(by.items(), key=lambda x: -x[1]["cost"]):
            if d["impr"] or d["clk"] or d["cost"]:
                print(
                    f"  {t}: impr={d['impr']:.0f} clk={d['clk']:.0f} ${d['cost']:.2f} conv={d['conv']:.1f}"
                )


if __name__ == "__main__":
    main()
