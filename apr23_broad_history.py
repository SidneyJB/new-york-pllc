import csv
from datetime import datetime, date, timedelta
from collections import defaultdict

BASE = "/Users/sidneybrodsky/Dev/financial-planner/apr 23 ads reports"

def parse_num(v):
    if not v or v == "--": return 0.0
    return float(v.replace(",","").replace("$",""))

kw_rows = []
with open(f"{BASE}/Search keyword apr 23.csv") as f:
    lines = f.readlines()
    reader = csv.DictReader(lines[2:])
    for r in reader:
        if not r.get("Day"): continue
        kw_rows.append({
            "keyword": r["Search keyword"].strip().lower(),
            "match": r.get("Search keyword match type","").strip(),
            "day": datetime.strptime(r["Day"], "%Y-%m-%d").date(),
            "clicks": parse_num(r["Clicks"]),
            "impr": parse_num(r["Impr."]),
            "cost": parse_num(r["Cost"]),
            "conv": parse_num(r["Conversions"]),
        })

camp_rows = []
with open(f"{BASE}/Campaign performance apr 23.csv") as f:
    lines = f.readlines()
    reader = csv.DictReader(lines[2:])
    for r in reader:
        if not r.get("Day") or "Total" in r.get("Campaign",""): continue
        from apr23_tcpa_projection import parse_pct
        camp_rows.append({
            "day": datetime.strptime(r["Day"], "%Y-%m-%d").date(),
            "sis": parse_pct(r.get("Search impr. share")),
            "lost_rank": parse_pct(r.get("Search lost IS (rank)")),
        })

# pllc keyword daily data
pllc = [r for r in kw_rows if r["keyword"] == "pllc"]
pllc.sort(key=lambda x: x["day"])

print("=" * 90)
print("'pllc' KEYWORD — FULL DAILY HISTORY (match type shown)")
print("Three eras: Original Broad (tCPA $82), Phrase period, Back to Broad (tCPA $90)")
print("=" * 90)

# Weekly view
def iso_week(d):
    return d.isocalendar()[:2]

pllc_weekly = defaultdict(lambda: {"clicks":0,"impr":0,"cost":0,"conv":0,"days":0,"matches":set()})
for r in pllc:
    wk = iso_week(r["day"])
    pllc_weekly[wk]["clicks"] += r["clicks"]
    pllc_weekly[wk]["impr"] += r["impr"]
    pllc_weekly[wk]["cost"] += r["cost"]
    pllc_weekly[wk]["conv"] += r["conv"]
    pllc_weekly[wk]["days"] += 1
    pllc_weekly[wk]["matches"].add(r["match"])

# Campaign-level SIS weekly
camp_weekly_sis = defaultdict(lambda: {"sis": [], "lr": []})
for r in camp_rows:
    wk = iso_week(r["day"])
    if r["sis"] is not None: camp_weekly_sis[wk]["sis"].append(r["sis"])
    if r["lost_rank"] is not None: camp_weekly_sis[wk]["lr"].append(r["lost_rank"])

print(f"\n{'Week':>10}  {'Match':>8}  {'Imp':>6}  {'Clk':>5}  {'Conv':>4}  {'Cost':>9}  {'CPA':>8}  {'CVR':>6}  {'CPC':>7}  {'Imp/d':>6}  {'Camp SIS':>8}  {'Era':>20}")
for wk in sorted(pllc_weekly.keys()):
    w = pllc_weekly[wk]
    cpa = f"${w['cost']/w['conv']:.0f}" if w['conv'] > 0 else "--"
    cvr = f"{w['conv']/w['clicks']*100:.0f}%" if w['clicks'] > 0 else "--"
    cpc = f"${w['cost']/w['clicks']:.2f}" if w['clicks'] > 0 else "--"
    impd = w['impr']/w['days'] if w['days'] > 0 else 0
    match = ",".join(w["matches"])
    
    c = camp_weekly_sis.get(wk, {"sis":[], "lr":[]})
    sis = f"{sum(c['sis'])/len(c['sis']):.1f}%" if c['sis'] else "--"
    
    # Determine era
    if "Broad" in match and wk < iso_week(date(2026, 1, 15)):
        era = "BROAD + tCPA $82"
    elif "Phrase" in match and "Broad" not in match:
        era = "PHRASE + tCPA $82"
    elif "Broad" in match and wk >= iso_week(date(2026, 3, 7)):
        era = "BROAD + tCPA $90"
    else:
        era = "transition"
    
    print(f"  {wk[0]}-W{wk[1]:02d}  {match:>8}  {w['impr']:>6.0f}  {w['clicks']:>5.0f}  {w['conv']:>4.0f}  ${w['cost']:>8.2f}  {cpa:>8}  {cvr:>6}  {cpc:>7}  {impd:>6.0f}  {sis:>8}  {era:>20}")

# Aggregate by era
print("\n" + "=" * 90)
print("AGGREGATED BY ERA")
print("=" * 90)

eras = {
    "Broad + tCPA $82": [],
    "Phrase + tCPA $82": [],
    "Broad + tCPA $90": [],
}

for r in pllc:
    if r["match"] == "Broad match" and r["day"] < date(2026, 1, 15):
        eras["Broad + tCPA $82"].append(r)
    elif r["match"] == "Phrase match":
        eras["Phrase + tCPA $82"].append(r)
    elif r["match"] == "Broad match" and r["day"] >= date(2026, 3, 7):
        eras["Broad + tCPA $90"].append(r)

for era_name, rows in eras.items():
    if not rows: continue
    days = len(set(r["day"] for r in rows))
    clicks = sum(r["clicks"] for r in rows)
    impr = sum(r["impr"] for r in rows)
    cost = sum(r["cost"] for r in rows)
    conv = sum(r["conv"] for r in rows)
    cpa = cost/conv if conv > 0 else 0
    cpc = cost/clicks if clicks > 0 else 0
    cvr = conv/clicks*100 if clicks > 0 else 0
    
    print(f"\n  {era_name} ({days} days: {min(r['day'] for r in rows)} to {max(r['day'] for r in rows)})")
    print(f"    Impressions:  {impr:,.0f}  ({impr/days:,.0f}/day)")
    print(f"    Clicks:       {clicks:,.0f}  ({clicks/days:,.1f}/day)")
    print(f"    Conversions:  {conv:,.0f}  ({conv/days:,.2f}/day)")
    print(f"    Cost:         ${cost:,.2f}  (${cost/days:,.2f}/day)")
    print(f"    CPA:          ${cpa:,.2f}")
    print(f"    CPC:          ${cpc:,.2f}")
    print(f"    CVR:          {cvr:.1f}%")
