import csv
from datetime import datetime, date
from collections import defaultdict

BASE = "/Users/sidneybrodsky/Dev/financial-planner/apr 23 ads reports"

def parse_pct(v):
    if not v or v == "--": return None
    v = v.strip()
    if v.startswith("< "):
        return float(v.replace("< ","").replace("%","").replace(",",""))
    if v.startswith("> "):
        return float(v.replace("> ","").replace("%","").replace(",",""))
    return float(v.replace("%","").replace(",",""))

def parse_num(v):
    if not v or v == "--": return 0.0
    return float(v.replace(",","").replace("$",""))

# --- 1. Campaign daily ---
camp_rows = []
with open(f"{BASE}/Campaign performance apr 23.csv") as f:
    lines = f.readlines()
    reader = csv.DictReader(lines[2:])
    for r in reader:
        if not r.get("Day") or "Total" in r.get("Campaign",""):
            continue
        camp_rows.append({
            "day": datetime.strptime(r["Day"], "%Y-%m-%d").date(),
            "clicks": parse_num(r["Clicks"]),
            "impr": parse_num(r["Impr."]),
            "cost": parse_num(r["Cost"]),
            "conv": parse_num(r["Conversions"]),
            "sis": parse_pct(r.get("Search impr. share")),
            "lost_rank": parse_pct(r.get("Search lost IS (rank)")),
            "lost_budget": parse_pct(r.get("Search lost IS (budget)")),
        })

# --- 2. Keyword daily (focus on pllc) ---
kw_rows = []
with open(f"{BASE}/Search keyword apr 23.csv") as f:
    lines = f.readlines()
    reader = csv.DictReader(lines[2:])
    for r in reader:
        if not r.get("Day"):
            continue
        kw_rows.append({
            "keyword": r["Search keyword"].strip().lower(),
            "match": r.get("Search keyword match type","").strip(),
            "day": datetime.strptime(r["Day"], "%Y-%m-%d").date(),
            "clicks": parse_num(r["Clicks"]),
            "impr": parse_num(r["Impr."]),
            "cost": parse_num(r["Cost"]),
            "conv": parse_num(r["Conversions"]),
        })

# Determine the change date - pllc was switched back to broad and tCPA raised to 90.
# From prior context this was around Mar 6-8. Let's use Mar 7 as the cutoff.
# We'll also look at weekly buckets to see the trend.
CHANGE_DATE = date(2026, 3, 7)

print("=" * 80)
print("CAMPAIGN-LEVEL: BEFORE vs AFTER CHANGES (pllc broad + tCPA $90)")
print(f"Change date: {CHANGE_DATE}")
print("=" * 80)

before = [r for r in camp_rows if r["day"] < CHANGE_DATE]
after  = [r for r in camp_rows if r["day"] >= CHANGE_DATE]

def summarize_period(rows, label):
    days = len(rows)
    clicks = sum(r["clicks"] for r in rows)
    impr = sum(r["impr"] for r in rows)
    cost = sum(r["cost"] for r in rows)
    conv = sum(r["conv"] for r in rows)
    sis_vals = [r["sis"] for r in rows if r["sis"] is not None]
    lr_vals = [r["lost_rank"] for r in rows if r["lost_rank"] is not None]
    lb_vals = [r["lost_budget"] for r in rows if r["lost_budget"] is not None]
    
    cpa = cost/conv if conv > 0 else float('inf')
    cpc = cost/clicks if clicks > 0 else 0
    cvr = (conv/clicks*100) if clicks > 0 else 0
    avg_sis = sum(sis_vals)/len(sis_vals) if sis_vals else 0
    avg_lr = sum(lr_vals)/len(lr_vals) if lr_vals else 0
    avg_lb = sum(lb_vals)/len(lb_vals) if lb_vals else 0
    
    print(f"\n--- {label} ({days} days: {rows[0]['day']} to {rows[-1]['day']}) ---")
    print(f"  Impressions:   {impr:,.0f}  ({impr/days:,.0f}/day)")
    print(f"  Clicks:        {clicks:,.0f}  ({clicks/days:,.1f}/day)")
    print(f"  Cost:          ${cost:,.2f}  (${cost/days:,.2f}/day)")
    print(f"  Conversions:   {conv:,.0f}  ({conv/days:,.2f}/day)")
    print(f"  CPA:           ${cpa:,.2f}")
    print(f"  CPC:           ${cpc:,.2f}")
    print(f"  CVR:           {cvr:.2f}%")
    print(f"  Avg Search IS: {avg_sis:.1f}%")
    print(f"  Avg Lost IS (rank):   {avg_lr:.1f}%")
    print(f"  Avg Lost IS (budget): {avg_lb:.1f}%")
    return {"clicks": clicks, "impr": impr, "cost": cost, "conv": conv, 
            "days": days, "cpa": cpa, "cvr": cvr, "avg_sis": avg_sis, "avg_lr": avg_lr}

b = summarize_period(before, "BEFORE changes")
a = summarize_period(after, "AFTER changes")

print(f"\n--- DELTA ---")
print(f"  Clicks/day:  {b['clicks']/b['days']:.1f} → {a['clicks']/a['days']:.1f}  ({(a['clicks']/a['days'] - b['clicks']/b['days'])/( b['clicks']/b['days'])*100:+.1f}%)")
print(f"  Conv/day:    {b['conv']/b['days']:.2f} → {a['conv']/a['days']:.2f}  ({(a['conv']/a['days'] - b['conv']/b['days'])/(b['conv']/b['days'])*100:+.1f}%)")
print(f"  CPA:         ${b['cpa']:.2f} → ${a['cpa']:.2f}  ({(a['cpa']-b['cpa'])/b['cpa']*100:+.1f}%)")
print(f"  Search IS:   {b['avg_sis']:.1f}% → {a['avg_sis']:.1f}%  ({a['avg_sis']-b['avg_sis']:+.1f}pp)")
print(f"  Lost IS(rank): {b['avg_lr']:.1f}% → {a['avg_lr']:.1f}%  ({a['avg_lr']-b['avg_lr']:+.1f}pp)")

# --- Weekly campaign trend ---
print("\n" + "=" * 80)
print("WEEKLY CAMPAIGN TREND (Mon-Sun buckets)")
print("=" * 80)

def iso_week(d):
    return d.isocalendar()[:2]

weekly = defaultdict(lambda: {"clicks":0,"impr":0,"cost":0,"conv":0,"sis":[],"lr":[],"days":0})
for r in camp_rows:
    wk = iso_week(r["day"])
    weekly[wk]["clicks"] += r["clicks"]
    weekly[wk]["impr"] += r["impr"]
    weekly[wk]["cost"] += r["cost"]
    weekly[wk]["conv"] += r["conv"]
    weekly[wk]["days"] += 1
    if r["sis"] is not None: weekly[wk]["sis"].append(r["sis"])
    if r["lost_rank"] is not None: weekly[wk]["lr"].append(r["lost_rank"])

print(f"{'Week':>12}  {'Days':>4}  {'Impr':>7}  {'Clicks':>6}  {'Conv':>5}  {'CPA':>8}  {'CPC':>7}  {'CVR':>6}  {'Srch IS':>7}  {'Lost(r)':>7}")
for wk in sorted(weekly.keys()):
    w = weekly[wk]
    cpa = w["cost"]/w["conv"] if w["conv"] > 0 else 0
    cpc = w["cost"]/w["clicks"] if w["clicks"] > 0 else 0
    cvr = w["conv"]/w["clicks"]*100 if w["clicks"] > 0 else 0
    sis = sum(w["sis"])/len(w["sis"]) if w["sis"] else 0
    lr = sum(w["lr"])/len(w["lr"]) if w["lr"] else 0
    marker = " <<<" if wk == iso_week(CHANGE_DATE) else ""
    print(f"  {wk[0]}-W{wk[1]:02d}    {w['days']:>3}  {w['impr']:>7,.0f}  {w['clicks']:>6,.0f}  {w['conv']:>5,.0f}  ${cpa:>7,.2f}  ${cpc:>6,.2f}  {cvr:>5.1f}%  {sis:>6.1f}%  {lr:>6.1f}%{marker}")

# --- 3. pllc keyword specifically ---
print("\n" + "=" * 80)
print("KEYWORD 'pllc' (BROAD) — BEFORE vs AFTER")
print("=" * 80)

pllc_before = [r for r in kw_rows if r["keyword"] == "pllc" and r["day"] < CHANGE_DATE]
pllc_after  = [r for r in kw_rows if r["keyword"] == "pllc" and r["day"] >= CHANGE_DATE]

def summarize_kw(rows, label):
    days = len(set(r["day"] for r in rows))
    clicks = sum(r["clicks"] for r in rows)
    impr = sum(r["impr"] for r in rows)
    cost = sum(r["cost"] for r in rows)
    conv = sum(r["conv"] for r in rows)
    cpa = cost/conv if conv > 0 else float('inf')
    cpc = cost/clicks if clicks > 0 else 0
    cvr = (conv/clicks*100) if clicks > 0 else 0
    print(f"\n  {label} ({days} days with data)")
    print(f"    Impressions: {impr:,.0f}  ({impr/days:,.0f}/day)" if days else "")
    print(f"    Clicks:      {clicks:,.0f}  ({clicks/days:,.1f}/day)" if days else "")
    print(f"    Cost:        ${cost:,.2f}")
    print(f"    Conversions: {conv:,.0f}  ({conv/days:,.2f}/day)" if days else "")
    print(f"    CPA:         ${cpa:,.2f}")
    print(f"    CPC:         ${cpc:,.2f}")
    print(f"    CVR:         {cvr:.2f}%")
    return {"clicks": clicks, "impr": impr, "cost": cost, "conv": conv, "days": days, "cpa": cpa}

pb = summarize_kw(pllc_before, "BEFORE")
pa = summarize_kw(pllc_after, "AFTER")

if pb["days"] and pa["days"]:
    print(f"\n  DELTA (pllc):")
    print(f"    Clicks/day: {pb['clicks']/pb['days']:.1f} → {pa['clicks']/pa['days']:.1f}")
    print(f"    Conv/day:   {pb['conv']/pb['days']:.2f} → {pa['conv']/pa['days']:.2f}")
    print(f"    CPA:        ${pb['cpa']:.2f} → ${pa['cpa']:.2f}")

# --- Other keywords ---
print("\n" + "=" * 80)
print("ALL KEYWORDS — AFTER period performance")
print("=" * 80)

kw_after_agg = defaultdict(lambda: {"clicks":0,"impr":0,"cost":0,"conv":0,"days":set()})
for r in kw_rows:
    if r["day"] >= CHANGE_DATE:
        k = r["keyword"]
        kw_after_agg[k]["clicks"] += r["clicks"]
        kw_after_agg[k]["impr"] += r["impr"]
        kw_after_agg[k]["cost"] += r["cost"]
        kw_after_agg[k]["conv"] += r["conv"]
        kw_after_agg[k]["days"].add(r["day"])

print(f"{'Keyword':>35}  {'Clicks':>6}  {'Impr':>6}  {'Conv':>5}  {'Cost':>9}  {'CPA':>8}  {'CVR':>6}")
for kw, v in sorted(kw_after_agg.items(), key=lambda x: -x[1]["conv"]):
    if v["clicks"] < 5: continue
    cpa = v["cost"]/v["conv"] if v["conv"] > 0 else 0
    cvr = v["conv"]/v["clicks"]*100 if v["clicks"] > 0 else 0
    cpa_str = f"${cpa:,.2f}" if v["conv"] > 0 else "no conv"
    print(f"  {kw:>35}  {v['clicks']:>6}  {v['impr']:>6}  {v['conv']:>5,.0f}  ${v['cost']:>8,.2f}  {cpa_str:>8}  {cvr:>5.1f}%")

# --- 4. Last 30 days vs prior 30 days (what the UI shows) ---
print("\n" + "=" * 80)
print("LAST 30 DAYS vs PRIOR 30 DAYS (matching Google Ads UI comparison)")
print("=" * 80)

latest_day = max(r["day"] for r in camp_rows)
cutoff_30 = date(latest_day.year, latest_day.month, latest_day.day) 
from datetime import timedelta
end_last30 = latest_day
start_last30 = latest_day - timedelta(days=29)
end_prior30 = start_last30 - timedelta(days=1)
start_prior30 = end_prior30 - timedelta(days=29)

last30 = [r for r in camp_rows if start_last30 <= r["day"] <= end_last30]
prior30 = [r for r in camp_rows if start_prior30 <= r["day"] <= end_prior30]

print(f"\nPrior 30: {start_prior30} to {end_prior30}")
print(f"Last 30:  {start_last30} to {end_last30}")

p = summarize_period(prior30, f"PRIOR 30 days ({start_prior30} to {end_prior30})")
l = summarize_period(last30, f"LAST 30 days ({start_last30} to {end_last30})")

print(f"\n--- DELTA (30d vs 30d) ---")
print(f"  Conversions:   {p['conv']:.0f} → {l['conv']:.0f}  ({l['conv']-p['conv']:+.0f})")
print(f"  Conv/day:      {p['conv']/p['days']:.2f} → {l['conv']/l['days']:.2f}")
print(f"  Clicks/day:    {p['clicks']/p['days']:.1f} → {l['clicks']/l['days']:.1f}")
print(f"  CPA:           ${p['cpa']:.2f} → ${l['cpa']:.2f}")
print(f"  CVR:           {p['cvr']:.1f}% → {l['cvr']:.1f}%")
print(f"  Search IS:     {p['avg_sis']:.1f}% → {l['avg_sis']:.1f}%")
print(f"  Lost IS(rank): {p['avg_lr']:.1f}% → {l['avg_lr']:.1f}%")

# --- pllc keyword last 30 vs prior 30 ---
print("\n" + "=" * 80)
print("KEYWORD 'pllc' — LAST 30 vs PRIOR 30")
print("=" * 80)

pllc_last30 = [r for r in kw_rows if r["keyword"] == "pllc" and start_last30 <= r["day"] <= end_last30]
pllc_prior30 = [r for r in kw_rows if r["keyword"] == "pllc" and start_prior30 <= r["day"] <= end_prior30]

pp = summarize_kw(pllc_prior30, f"PRIOR 30 ({start_prior30} to {end_prior30})")
pl = summarize_kw(pllc_last30, f"LAST 30 ({start_last30} to {end_last30})")

if pp["days"] and pl["days"]:
    print(f"\n  DELTA (pllc 30d vs 30d):")
    print(f"    Conversions: {pp['conv']:.0f} → {pl['conv']:.0f}  ({pl['conv']-pp['conv']:+.0f})")
    print(f"    Clicks/day:  {pp['clicks']/pp['days']:.1f} → {pl['clicks']/pl['days']:.1f}")
    print(f"    Conv/day:    {pp['conv']/pp['days']:.2f} → {pl['conv']/pl['days']:.2f}")
    print(f"    CPA:         ${pp['cpa']:.2f} → ${pl['cpa']:.2f}")
