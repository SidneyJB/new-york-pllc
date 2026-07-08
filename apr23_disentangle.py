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

CHANGE_DATE = date(2026, 3, 7)
latest_day = max(r["day"] for r in kw_rows)
start_last30 = latest_day - timedelta(days=29)
end_prior30 = start_last30 - timedelta(days=1)
start_prior30 = end_prior30 - timedelta(days=29)

# Split: pllc broad vs everything else, last 30 vs prior 30
print("=" * 90)
print("DISENTANGLING: Was the +12 conversions from tCPA raise or pllc broad?")
print("=" * 90)
print(f"Prior 30: {start_prior30} to {end_prior30}")
print(f"Last 30:  {start_last30} to {latest_day}")

def summarize(rows, label):
    days = len(set(r["day"] for r in rows)) if rows else 0
    clicks = sum(r["clicks"] for r in rows)
    impr = sum(r["impr"] for r in rows)
    cost = sum(r["cost"] for r in rows)
    conv = sum(r["conv"] for r in rows)
    cpa = cost/conv if conv > 0 else 0
    cvr = conv/clicks*100 if clicks > 0 else 0
    print(f"  {label}")
    print(f"    Days: {days}  Imp: {impr:.0f}  Clk: {clicks:.0f}  Conv: {conv:.0f}  Cost: ${cost:.2f}  CPA: ${cpa:.2f}  CVR: {cvr:.1f}%")
    return {"conv": conv, "clicks": clicks, "cost": cost, "impr": impr, "days": days}

# pllc broad
pllc_prior = [r for r in kw_rows if r["keyword"] == "pllc" and start_prior30 <= r["day"] <= end_prior30]
pllc_last = [r for r in kw_rows if r["keyword"] == "pllc" and start_last30 <= r["day"] <= latest_day]

# everything except pllc
other_prior = [r for r in kw_rows if r["keyword"] != "pllc" and start_prior30 <= r["day"] <= end_prior30]
other_last = [r for r in kw_rows if r["keyword"] != "pllc" and start_last30 <= r["day"] <= latest_day]

print(f"\n--- 'pllc' (Broad) keyword only ---")
pp = summarize(pllc_prior, "Prior 30")
pl = summarize(pllc_last, "Last 30")
print(f"    DELTA: {pp['conv']:.0f} → {pl['conv']:.0f} conv  ({pl['conv']-pp['conv']:+.0f})")

print(f"\n--- All OTHER keywords (phrase/exact) ---")
op = summarize(other_prior, "Prior 30")
ol = summarize(other_last, "Last 30")
print(f"    DELTA: {op['conv']:.0f} → {ol['conv']:.0f} conv  ({ol['conv']-op['conv']:+.0f})")

print(f"\n--- TOTAL ---")
print(f"    Prior 30 total conv: {pp['conv']+op['conv']:.0f}")
print(f"    Last 30 total conv:  {pl['conv']+ol['conv']:.0f}")
print(f"    Total delta:         {(pl['conv']+ol['conv'])-(pp['conv']+op['conv']):+.0f}")

# Also look at pllc broad weekly to see its ramp
print(f"\n\n--- 'pllc' Broad — WEEKLY (to see if it ramped after going broad) ---")
def iso_week(d):
    return d.isocalendar()[:2]

pllc_weekly = defaultdict(lambda: {"clicks":0,"impr":0,"cost":0,"conv":0,"days":0})
for r in kw_rows:
    if r["keyword"] == "pllc":
        wk = iso_week(r["day"])
        pllc_weekly[wk]["clicks"] += r["clicks"]
        pllc_weekly[wk]["impr"] += r["impr"]
        pllc_weekly[wk]["cost"] += r["cost"]
        pllc_weekly[wk]["conv"] += r["conv"]
        pllc_weekly[wk]["days"] += 1

other_weekly = defaultdict(lambda: {"clicks":0,"impr":0,"cost":0,"conv":0,"days":0})
for r in kw_rows:
    if r["keyword"] != "pllc":
        wk = iso_week(r["day"])
        other_weekly[wk]["clicks"] += r["clicks"]
        other_weekly[wk]["impr"] += r["impr"]
        other_weekly[wk]["cost"] += r["cost"]
        other_weekly[wk]["conv"] += r["conv"]
        other_weekly[wk]["days"] += 1

print(f"\n{'Week':>10}  |  {'--- pllc broad ---':>40}  |  {'--- all other kw ---':>40}")
print(f"{'':>10}  |  {'Imp':>6} {'Clk':>5} {'Conv':>4} {'Cost':>8} {'CPA':>8} {'CVR':>5}  |  {'Imp':>6} {'Clk':>5} {'Conv':>4} {'Cost':>8} {'CPA':>8} {'CVR':>5}")
all_weeks = sorted(set(list(pllc_weekly.keys()) + list(other_weekly.keys())))
for wk in all_weeks:
    p = pllc_weekly[wk]
    o = other_weekly[wk]
    p_cpa = f"${p['cost']/p['conv']:.0f}" if p['conv'] > 0 else "--"
    p_cvr = f"{p['conv']/p['clicks']*100:.0f}%" if p['clicks'] > 0 else "--"
    o_cpa = f"${o['cost']/o['conv']:.0f}" if o['conv'] > 0 else "--"
    o_cvr = f"{o['conv']/o['clicks']*100:.0f}%" if o['clicks'] > 0 else "--"
    marker = " <<<" if wk == iso_week(CHANGE_DATE) else ""
    print(f"  {wk[0]}-W{wk[1]:02d}  |  {p['impr']:>6.0f} {p['clicks']:>5.0f} {p['conv']:>4.0f} ${p['cost']:>7.2f} {p_cpa:>8} {p_cvr:>5}  |  {o['impr']:>6.0f} {o['clicks']:>5.0f} {o['conv']:>4.0f} ${o['cost']:>7.2f} {o_cpa:>8} {o_cvr:>5}{marker}")
