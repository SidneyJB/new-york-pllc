import csv
from datetime import datetime, date, timedelta
from collections import defaultdict

BASE = "/Users/sidneybrodsky/Dev/financial-planner/apr 23 ads reports"

def parse_pct(v):
    if not v or v == "--": return None
    v = v.strip()
    if v.startswith("< "): return float(v.replace("< ","").replace("%","").replace(",",""))
    if v.startswith("> "): return float(v.replace("> ","").replace("%","").replace(",",""))
    return float(v.replace("%","").replace(",",""))

def parse_num(v):
    if not v or v == "--": return 0.0
    return float(v.replace(",","").replace("$",""))

# ============================================================
# LOAD DATA
# ============================================================
camp_rows = []
with open(f"{BASE}/Campaign performance apr 23.csv") as f:
    lines = f.readlines()
    reader = csv.DictReader(lines[2:])
    for r in reader:
        if not r.get("Day") or "Total" in r.get("Campaign",""): continue
        camp_rows.append({
            "day": datetime.strptime(r["Day"], "%Y-%m-%d").date(),
            "clicks": parse_num(r["Clicks"]),
            "impr": parse_num(r["Impr."]),
            "cost": parse_num(r["Cost"]),
            "conv": parse_num(r["Conversions"]),
            "sis": parse_pct(r.get("Search impr. share")),
            "lost_rank": parse_pct(r.get("Search lost IS (rank)")),
            "lost_budget": parse_pct(r.get("Search lost IS (budget)")),
            "top_pct": parse_pct(r.get("Impr. (Top) %")),
            "abs_top_pct": parse_pct(r.get("Impr. (Abs. Top) %")),
        })

kw_rows = []
with open(f"{BASE}/Search keyword apr 23.csv") as f:
    lines = f.readlines()
    reader = csv.DictReader(lines[2:])
    for r in reader:
        if not r.get("Day"): continue
        kw_rows.append({
            "keyword": r["Search keyword"].strip().lower(),
            "match": r.get("Search keyword match type","").strip(),
            "status": r.get("Search keyword status","").strip(),
            "campaign": r.get("Campaign","").strip(),
            "adgroup": r.get("Ad group","").strip(),
            "day": datetime.strptime(r["Day"], "%Y-%m-%d").date(),
            "clicks": parse_num(r["Clicks"]),
            "impr": parse_num(r["Impr."]),
            "cost": parse_num(r["Cost"]),
            "conv": parse_num(r["Conversions"]),
            "top_pct": parse_pct(r.get("Impr. (Top) %")),
            "abs_top_pct": parse_pct(r.get("Impr. (Abs. Top) %")),
        })

st_rows = []
with open(f"{BASE}/Search terms apr 23.csv") as f:
    lines = f.readlines()
    reader = csv.DictReader(lines[2:])
    for r in reader:
        if not r.get("Day"): continue
        st_rows.append({
            "term": r["Search term"].strip().lower(),
            "match_type": r.get("Search terms match type","").strip(),
            "added": r.get("Added/Excluded","").strip(),
            "day": datetime.strptime(r["Day"], "%Y-%m-%d").date(),
            "clicks": parse_num(r["Clicks"]),
            "impr": parse_num(r["Impr."]),
            "cost": parse_num(r["Cost"]),
            "conv": parse_num(r["Conversions"]),
            "top_pct": parse_pct(r.get("Impr. (Top) %")),
            "abs_top_pct": parse_pct(r.get("Impr. (Abs. Top) %")),
        })

latest_day = max(r["day"] for r in camp_rows)
start_last30 = latest_day - timedelta(days=29)

# ============================================================
# 1. DAY-OF-WEEK ANALYSIS (all time)
# ============================================================
print("=" * 90)
print("1. DAY-OF-WEEK PERFORMANCE (full date range)")
print("=" * 90)

dow_agg = defaultdict(lambda: {"clicks":0,"impr":0,"cost":0,"conv":0,"days":0})
dow_names = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
for r in camp_rows:
    d = r["day"].weekday()
    dow_agg[d]["clicks"] += r["clicks"]
    dow_agg[d]["impr"] += r["impr"]
    dow_agg[d]["cost"] += r["cost"]
    dow_agg[d]["conv"] += r["conv"]
    dow_agg[d]["days"] += 1

print(f"{'Day':>5}  {'Weeks':>5}  {'Impr/d':>7}  {'Clk/d':>6}  {'Conv/d':>6}  {'CPA':>8}  {'CPC':>7}  {'CVR':>6}  {'Conv%ofTotal':>12}")
total_conv = sum(v["conv"] for v in dow_agg.values())
for d in range(7):
    v = dow_agg[d]
    cpa = v["cost"]/v["conv"] if v["conv"] > 0 else 0
    cpc = v["cost"]/v["clicks"] if v["clicks"] > 0 else 0
    cvr = v["conv"]/v["clicks"]*100 if v["clicks"] > 0 else 0
    pct = v["conv"]/total_conv*100 if total_conv > 0 else 0
    print(f"  {dow_names[d]:>3}  {v['days']:>5}  {v['impr']/v['days']:>7.0f}  {v['clicks']/v['days']:>6.1f}  {v['conv']/v['days']:>6.2f}  ${cpa:>7.2f}  ${cpc:>6.2f}  {cvr:>5.1f}%  {pct:>10.1f}%")

# ============================================================
# 2. HOUR-OF-DAY (not available in this export, skip)
# ============================================================

# ============================================================
# 3. SEARCH TERM DEEP DIVE — LAST 30 DAYS
# ============================================================
print("\n" + "=" * 90)
print("2. SEARCH TERMS — LAST 30 DAYS (sorted by cost, showing conversion status)")
print("=" * 90)

st_last30 = defaultdict(lambda: {"clicks":0,"impr":0,"cost":0,"conv":0,"days":set(),"match":set(),"added":set()})
for r in st_rows:
    if r["day"] >= start_last30:
        t = r["term"]
        st_last30[t]["clicks"] += r["clicks"]
        st_last30[t]["impr"] += r["impr"]
        st_last30[t]["cost"] += r["cost"]
        st_last30[t]["conv"] += r["conv"]
        st_last30[t]["days"].add(r["day"])
        st_last30[t]["match"].add(r["match_type"])
        st_last30[t]["added"].add(r["added"])

# Converting terms
print(f"\n--- CONVERTING SEARCH TERMS (last 30d) ---")
print(f"{'Search Term':>45}  {'Clicks':>6}  {'Conv':>5}  {'Cost':>9}  {'CPA':>8}  {'CVR':>6}  {'Match':>15}")
converting = sorted([(t,v) for t,v in st_last30.items() if v["conv"] > 0], key=lambda x: -x[1]["conv"])
for t, v in converting:
    cpa = v["cost"]/v["conv"] if v["conv"] > 0 else 0
    cvr = v["conv"]/v["clicks"]*100 if v["clicks"] > 0 else 0
    match = ",".join(v["match"])
    print(f"  {t:>45}  {v['clicks']:>6}  {v['conv']:>5.0f}  ${v['cost']:>8.2f}  ${cpa:>7.2f}  {cvr:>5.1f}%  {match:>15}")

conv_cost = sum(v["cost"] for _,v in converting)
total_cost_30 = sum(v["cost"] for v in st_last30.values())
print(f"\n  Converting terms spent: ${conv_cost:,.2f} of ${total_cost_30:,.2f} total ({conv_cost/total_cost_30*100:.0f}%)")

# Non-converting terms with significant spend
print(f"\n--- NON-CONVERTING TERMS WITH $15+ SPEND (last 30d) — WASTE ---")
print(f"{'Search Term':>45}  {'Clicks':>6}  {'Cost':>9}  {'Match':>15}  {'Added':>10}")
waste = sorted([(t,v) for t,v in st_last30.items() if v["conv"] == 0 and v["cost"] >= 15], key=lambda x: -x[1]["cost"])
waste_total = 0
for t, v in waste:
    match = ",".join(v["match"])
    added = ",".join(v["added"])
    waste_total += v["cost"]
    print(f"  {t:>45}  {v['clicks']:>6}  ${v['cost']:>8.2f}  {match:>15}  {added:>10}")
print(f"\n  Total wasted on non-converting terms ($15+): ${waste_total:,.2f}")

# ============================================================
# 4. CONVERTING SEARCH TERMS — ALL TIME (find your best queries)
# ============================================================
print("\n" + "=" * 90)
print("3. SEARCH TERMS — ALL TIME CONVERTERS (ranked by total conversions)")
print("=" * 90)

st_all = defaultdict(lambda: {"clicks":0,"impr":0,"cost":0,"conv":0})
for r in st_rows:
    t = r["term"]
    st_all[t]["clicks"] += r["clicks"]
    st_all[t]["impr"] += r["impr"]
    st_all[t]["cost"] += r["cost"]
    st_all[t]["conv"] += r["conv"]

print(f"{'Search Term':>45}  {'Clicks':>6}  {'Conv':>5}  {'Cost':>10}  {'CPA':>8}  {'CVR':>6}")
all_converting = sorted([(t,v) for t,v in st_all.items() if v["conv"] > 0], key=lambda x: -x[1]["conv"])
for t, v in all_converting:
    cpa = v["cost"]/v["conv"] if v["conv"] > 0 else 0
    cvr = v["conv"]/v["clicks"]*100 if v["clicks"] > 0 else 0
    print(f"  {t:>45}  {v['clicks']:>6}  {v['conv']:>5.0f}  ${v['cost']:>9.2f}  ${cpa:>7.2f}  {cvr:>5.1f}%")

# ============================================================
# 5. KEYWORD-LEVEL DEEP DIVE — ALL KEYWORDS LAST 30
# ============================================================
print("\n" + "=" * 90)
print("4. KEYWORD PERFORMANCE — LAST 30 DAYS")
print("=" * 90)

kw_last30 = defaultdict(lambda: {"clicks":0,"impr":0,"cost":0,"conv":0,"match":"","days":set(),
                                   "top":[],"abs_top":[]})
for r in kw_rows:
    if r["day"] >= start_last30:
        k = r["keyword"]
        kw_last30[k]["clicks"] += r["clicks"]
        kw_last30[k]["impr"] += r["impr"]
        kw_last30[k]["cost"] += r["cost"]
        kw_last30[k]["conv"] += r["conv"]
        kw_last30[k]["match"] = r["match"]
        kw_last30[k]["days"].add(r["day"])
        if r["top_pct"] is not None: kw_last30[k]["top"].append(r["top_pct"])
        if r["abs_top_pct"] is not None: kw_last30[k]["abs_top"].append(r["abs_top_pct"])

print(f"{'Keyword':>35}  {'Match':>12}  {'Clk':>5}  {'Imp':>6}  {'Conv':>5}  {'Cost':>9}  {'CPA':>8}  {'CVR':>6}  {'TopPg%':>7}  {'AbsTop%':>7}")
for kw, v in sorted(kw_last30.items(), key=lambda x: -x[1]["cost"]):
    cpa = v["cost"]/v["conv"] if v["conv"] > 0 else 0
    cvr = v["conv"]/v["clicks"]*100 if v["clicks"] > 0 else 0
    cpa_str = f"${cpa:,.2f}" if v["conv"] > 0 else "  --"
    top = sum(v["top"])/len(v["top"]) if v["top"] else 0
    atop = sum(v["abs_top"])/len(v["abs_top"]) if v["abs_top"] else 0
    print(f"  {kw:>35}  {v['match']:>12}  {v['clicks']:>5}  {v['impr']:>6}  {v['conv']:>5.0f}  ${v['cost']:>8.2f}  {cpa_str:>8}  {cvr:>5.1f}%  {top:>6.1f}%  {atop:>6.1f}%")

# ============================================================
# 6. TOP-OF-PAGE RATE TREND (weekly)
# ============================================================
print("\n" + "=" * 90)
print("5. TOP-OF-PAGE & ABS-TOP RATE — WEEKLY TREND")
print("=" * 90)

def iso_week(d):
    return d.isocalendar()[:2]

wk_top = defaultdict(lambda: {"top":[],"abs_top":[],"clicks":0,"conv":0,"cost":0,"impr":0})
for r in camp_rows:
    wk = iso_week(r["day"])
    wk_top[wk]["clicks"] += r["clicks"]
    wk_top[wk]["conv"] += r["conv"]
    wk_top[wk]["cost"] += r["cost"]
    wk_top[wk]["impr"] += r["impr"]
    if r["top_pct"] is not None: wk_top[wk]["top"].append(r["top_pct"])
    if r["abs_top_pct"] is not None: wk_top[wk]["abs_top"].append(r["abs_top_pct"])

print(f"{'Week':>10}  {'Top%':>6}  {'AbsTop%':>7}  {'Clk':>5}  {'Imp':>6}  {'Conv':>5}  {'CPA':>8}")
for wk in sorted(wk_top.keys()):
    w = wk_top[wk]
    top = sum(w["top"])/len(w["top"]) if w["top"] else 0
    atop = sum(w["abs_top"])/len(w["abs_top"]) if w["abs_top"] else 0
    cpa = w["cost"]/w["conv"] if w["conv"] > 0 else 0
    print(f"  {wk[0]}-W{wk[1]:02d}  {top:>5.1f}%  {atop:>6.1f}%  {w['clicks']:>5}  {w['impr']:>6}  {w['conv']:>5.0f}  ${cpa:>7.2f}")

# ============================================================
# 7. SEARCH TERM VOLUME BUCKETS — WHERE IS THE MONEY GOING?
# ============================================================
print("\n" + "=" * 90)
print("6. SEARCH TERM CATEGORIES — LAST 30 DAYS (intent buckets)")
print("=" * 90)

def categorize(term):
    t = term.lower()
    if "cost" in t or "price" in t or "how much" in t or "cheap" in t or "fee" in t:
        return "price-shopping"
    if "what is" in t or "meaning" in t or "definition" in t or "vs" in t or "difference" in t:
        return "informational"
    if "new york" in t or "ny " in t or " ny" in t or t.startswith("ny") or "nyc" in t:
        if "form" in t or "creat" in t or "start" in t or "open" in t or "register" in t or "file" in t or "set up" in t or "setup" in t:
            return "NY-formation-intent"
        return "NY-pllc-general"
    if "form" in t or "creat" in t or "start" in t or "open" in t or "register" in t or "file" in t or "set up" in t or "setup" in t:
        return "formation-intent-noNY"
    if "pllc" in t or "professional llc" in t:
        return "pllc-generic"
    return "other"

cat_agg = defaultdict(lambda: {"clicks":0,"impr":0,"cost":0,"conv":0,"terms":set()})
for t, v in st_last30.items():
    cat = categorize(t)
    cat_agg[cat]["clicks"] += v["clicks"]
    cat_agg[cat]["impr"] += v["impr"]
    cat_agg[cat]["cost"] += v["cost"]
    cat_agg[cat]["conv"] += v["conv"]
    cat_agg[cat]["terms"].add(t)

print(f"{'Category':>25}  {'Terms':>5}  {'Clicks':>6}  {'Conv':>5}  {'Cost':>9}  {'CPA':>8}  {'CVR':>6}  {'%Spend':>7}")
for cat, v in sorted(cat_agg.items(), key=lambda x: -x[1]["cost"]):
    cpa = v["cost"]/v["conv"] if v["conv"] > 0 else 0
    cvr = v["conv"]/v["clicks"]*100 if v["clicks"] > 0 else 0
    cpa_str = f"${cpa:,.2f}" if v["conv"] > 0 else "  --"
    pct_spend = v["cost"]/total_cost_30*100
    print(f"  {cat:>25}  {len(v['terms']):>5}  {v['clicks']:>6}  {v['conv']:>5.0f}  ${v['cost']:>8.2f}  {cpa_str:>8}  {cvr:>5.1f}%  {pct_spend:>6.1f}%")

# Show top terms in each non-converting or high-CPA category
for cat in ["other", "informational", "price-shopping", "pllc-generic", "formation-intent-noNY"]:
    if cat not in cat_agg: continue
    terms_in_cat = [(t, st_last30[t]) for t in cat_agg[cat]["terms"] if st_last30[t]["clicks"] >= 2]
    if not terms_in_cat: continue
    terms_in_cat.sort(key=lambda x: -x[1]["cost"])
    print(f"\n  Top terms in '{cat}':")
    for t, v in terms_in_cat[:10]:
        cvr = v["conv"]/v["clicks"]*100 if v["clicks"] > 0 else 0
        conv_str = f"{v['conv']:.0f}" if v["conv"] > 0 else "-"
        print(f"    {t:>45}  clk={v['clicks']}  conv={conv_str}  cost=${v['cost']:.2f}  cvr={cvr:.0f}%")

# ============================================================
# 8. CONVERSION LAG CHECK — clicks in last 7 days vs conversions
# ============================================================
print("\n" + "=" * 90)
print("7. CONVERSION LAG CHECK — daily conv rate last 14 days")
print("=" * 90)

recent = sorted([r for r in camp_rows if r["day"] >= latest_day - timedelta(days=13)], key=lambda x: x["day"])
print(f"{'Day':>12}  {'Clicks':>6}  {'Impr':>6}  {'Conv':>5}  {'Cost':>8}  {'CPA':>8}  {'CVR':>6}  {'SIS':>6}  {'LostR':>6}")
for r in recent:
    cpa = r["cost"]/r["conv"] if r["conv"] > 0 else 0
    cvr = r["conv"]/r["clicks"]*100 if r["clicks"] > 0 else 0
    cpa_str = f"${cpa:.2f}" if r["conv"] > 0 else "  --"
    sis = f"{r['sis']:.1f}%" if r['sis'] is not None else "--"
    lr = f"{r['lost_rank']:.1f}%" if r['lost_rank'] is not None else "--"
    print(f"  {r['day']}  {r['clicks']:>6.0f}  {r['impr']:>6.0f}  {r['conv']:>5.0f}  ${r['cost']:>7.2f}  {cpa_str:>8}  {cvr:>5.1f}%  {sis:>6}  {lr:>6}")

# ============================================================
# 9. MATCH TYPE ANALYSIS on search terms (last 30)
# ============================================================
print("\n" + "=" * 90)
print("8. MATCH TYPE BREAKDOWN — SEARCH TERMS LAST 30 DAYS")
print("=" * 90)

mt_agg = defaultdict(lambda: {"clicks":0,"impr":0,"cost":0,"conv":0,"terms":set()})
for r in st_rows:
    if r["day"] >= start_last30:
        mt = r["match_type"]
        mt_agg[mt]["clicks"] += r["clicks"]
        mt_agg[mt]["impr"] += r["impr"]
        mt_agg[mt]["cost"] += r["cost"]
        mt_agg[mt]["conv"] += r["conv"]
        mt_agg[mt]["terms"].add(r["term"])

print(f"{'Match Type':>20}  {'Terms':>5}  {'Clicks':>6}  {'Conv':>5}  {'Cost':>9}  {'CPA':>8}  {'CVR':>6}")
for mt, v in sorted(mt_agg.items(), key=lambda x: -x[1]["cost"]):
    cpa = v["cost"]/v["conv"] if v["conv"] > 0 else 0
    cvr = v["conv"]/v["clicks"]*100 if v["clicks"] > 0 else 0
    cpa_str = f"${cpa:,.2f}" if v["conv"] > 0 else "  --"
    print(f"  {mt:>20}  {len(v['terms']):>5}  {v['clicks']:>6}  {v['conv']:>5.0f}  ${v['cost']:>8.2f}  {cpa_str:>8}  {cvr:>5.1f}%")
