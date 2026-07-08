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
        })

kw_rows = []
with open(f"{BASE}/Search keyword apr 23.csv") as f:
    lines = f.readlines()
    reader = csv.DictReader(lines[2:])
    for r in reader:
        if not r.get("Day"): continue
        kw_rows.append({
            "keyword": r["Search keyword"].strip().lower(),
            "day": datetime.strptime(r["Day"], "%Y-%m-%d").date(),
            "clicks": parse_num(r["Clicks"]),
            "impr": parse_num(r["Impr."]),
            "cost": parse_num(r["Cost"]),
            "conv": parse_num(r["Conversions"]),
        })

latest_day = max(r["day"] for r in camp_rows)

# ============================================================
# What happened when tCPA went from 82 to 90?
# We need to figure out when that change happened.
# From context: tCPA was raised around the same time as the broad switch (~Mar 6-7)
# But the broad switch effect is confounded. Let's look at what we CAN isolate.
# ============================================================

print("=" * 90)
print("WHAT ACTUALLY HAPPENED WHEN tCPA WENT 82 → 90")
print("=" * 90)

# The other keywords (not pllc) are the cleanest signal for tCPA effect
# because they didn't change match type. Only the bid ceiling changed for them.
print("\n--- Non-pllc keywords: 4-week windows ---")
print("(These keywords didn't change match type, so any change = tCPA + market)")

# Let's do 4-week rolling windows
windows = []
all_days = sorted(set(r["day"] for r in camp_rows))
min_day = min(all_days)
max_day = max(all_days)

d = min_day
while d + timedelta(days=27) <= max_day:
    end = d + timedelta(days=27)
    other = [r for r in kw_rows if r["keyword"] != "pllc" and d <= r["day"] <= end]
    camp = [r for r in camp_rows if d <= r["day"] <= end]
    
    o_clicks = sum(r["clicks"] for r in other)
    o_conv = sum(r["conv"] for r in other)
    o_cost = sum(r["cost"] for r in other)
    o_impr = sum(r["impr"] for r in other)
    
    c_sis = [r["sis"] for r in camp if r["sis"] is not None]
    c_lr = [r["lost_rank"] for r in camp if r["lost_rank"] is not None]
    
    windows.append({
        "start": d, "end": end,
        "o_clicks": o_clicks, "o_conv": o_conv, "o_cost": o_cost, "o_impr": o_impr,
        "avg_sis": sum(c_sis)/len(c_sis) if c_sis else 0,
        "avg_lr": sum(c_lr)/len(c_lr) if c_lr else 0,
    })
    d += timedelta(days=28)

print(f"{'Period':>25}  {'Imp':>6}  {'Clk':>5}  {'Conv':>4}  {'Cost':>9}  {'CPA':>8}  {'CVR':>6}  {'SIS':>6}  {'LostR':>6}")
for w in windows:
    cpa = w["o_cost"]/w["o_conv"] if w["o_conv"] > 0 else 0
    cvr = w["o_conv"]/w["o_clicks"]*100 if w["o_clicks"] > 0 else 0
    cpa_s = f"${cpa:.0f}" if w["o_conv"] > 0 else "--"
    print(f"  {w['start']} to {w['end']}  {w['o_impr']:>6.0f}  {w['o_clicks']:>5.0f}  {w['o_conv']:>4.0f}  ${w['o_cost']:>8.2f}  {cpa_s:>8}  {cvr:>5.1f}%  {w['avg_sis']:>5.1f}%  {w['avg_lr']:>5.1f}%")

# ============================================================
# Current run rate (last 30 days)
# ============================================================
print("\n" + "=" * 90)
print("CURRENT RUN RATE (last 30 days)")
print("=" * 90)

start_last30 = latest_day - timedelta(days=29)
last30 = [r for r in camp_rows if r["day"] >= start_last30]

total_clicks = sum(r["clicks"] for r in last30)
total_impr = sum(r["impr"] for r in last30)
total_cost = sum(r["cost"] for r in last30)
total_conv = sum(r["conv"] for r in last30)
avg_sis = sum(r["sis"] for r in last30 if r["sis"]) / len([r for r in last30 if r["sis"]])
avg_lr = sum(r["lost_rank"] for r in last30 if r["lost_rank"]) / len([r for r in last30 if r["lost_rank"]])

cpa = total_cost/total_conv if total_conv > 0 else 0
cpc = total_cost/total_clicks if total_clicks > 0 else 0
cvr = total_conv/total_clicks*100 if total_clicks > 0 else 0
ctr = total_clicks/total_impr*100 if total_impr > 0 else 0

print(f"  Daily spend:      ${total_cost/30:.2f}")
print(f"  Monthly spend:    ${total_cost:.2f}")
print(f"  Impressions:      {total_impr:.0f}  ({total_impr/30:.0f}/day)")
print(f"  Clicks:           {total_clicks:.0f}  ({total_clicks/30:.1f}/day)")
print(f"  CTR:              {ctr:.1f}%")
print(f"  Avg CPC:          ${cpc:.2f}")
print(f"  Conversions:      {total_conv:.0f}  ({total_conv/30:.2f}/day)")
print(f"  CPA:              ${cpa:.2f}")
print(f"  CVR:              {cvr:.1f}%")
print(f"  Search IS:        {avg_sis:.1f}%")
print(f"  Lost IS (rank):   {avg_lr:.1f}%")
print(f"  Lost IS (budget): ~0%")

# ============================================================
# CPC distribution — what are we paying per click?
# ============================================================
print("\n" + "=" * 90)
print("CPC DISTRIBUTION (last 30 days, daily avg CPC)")
print("=" * 90)

daily_cpcs = []
for r in last30:
    if r["clicks"] > 0:
        daily_cpcs.append(r["cost"] / r["clicks"])

daily_cpcs.sort()
print(f"  Min daily CPC:    ${min(daily_cpcs):.2f}")
print(f"  25th pctile:      ${daily_cpcs[len(daily_cpcs)//4]:.2f}")
print(f"  Median:           ${daily_cpcs[len(daily_cpcs)//2]:.2f}")
print(f"  75th pctile:      ${daily_cpcs[3*len(daily_cpcs)//4]:.2f}")
print(f"  Max daily CPC:    ${max(daily_cpcs):.2f}")

# ============================================================
# What does the tCPA history actually tell us?
# tCPA 82: most of the "before" period
# tCPA 90: ~Mar 7 onwards
# ============================================================
print("\n" + "=" * 90)
print("tCPA 82 vs tCPA 90 — CAMPAIGN LEVEL (isolating the tCPA change)")
print("=" * 90)

TCPA_CHANGE = date(2026, 3, 7)

# Use the same 30-day window before/after the tCPA change
# but since broad also changed, let's look at campaign-level SIS/Lost rank
# which reflects ALL auctions, not just one keyword

pre_tcpa = [r for r in camp_rows if date(2026, 2, 5) <= r["day"] < TCPA_CHANGE]
post_tcpa_early = [r for r in camp_rows if TCPA_CHANGE <= r["day"] < date(2026, 3, 25)]
post_tcpa_recent = [r for r in camp_rows if r["day"] >= start_last30]

def camp_summary(rows, label):
    if not rows: return
    days = len(rows)
    clicks = sum(r["clicks"] for r in rows)
    impr = sum(r["impr"] for r in rows)
    cost = sum(r["cost"] for r in rows)
    conv = sum(r["conv"] for r in rows)
    sis = [r["sis"] for r in rows if r["sis"] is not None]
    lr = [r["lost_rank"] for r in rows if r["lost_rank"] is not None]
    
    cpa = cost/conv if conv > 0 else 0
    cvr = conv/clicks*100 if clicks > 0 else 0
    avg_sis = sum(sis)/len(sis) if sis else 0
    avg_lr = sum(lr)/len(lr) if lr else 0
    
    print(f"\n  {label} ({days} days)")
    print(f"    Spend/day:    ${cost/days:.2f}")
    print(f"    Clicks/day:   {clicks/days:.1f}")
    print(f"    Conv/day:     {conv/days:.2f}")
    print(f"    CPA:          ${cpa:.2f}")
    print(f"    CVR:          {cvr:.1f}%")
    print(f"    Search IS:    {avg_sis:.1f}%")
    print(f"    Lost IS(rank):{avg_lr:.1f}%")

camp_summary(pre_tcpa, "tCPA $82 (Feb 5 – Mar 6)")
camp_summary(post_tcpa_early, "tCPA $90, transition period (Mar 7 – Mar 24)")  
camp_summary(post_tcpa_recent, "tCPA $90, steady state (last 30 days)")

# ============================================================
# Revenue analysis - what is each conversion worth?
# ============================================================
print("\n" + "=" * 90)
print("UNIT ECONOMICS")
print("=" * 90)
print(f"  Price per PLLC formation:  $885")
print(f"  Current CPA (last 30d):    ${cpa:.2f}")
print(f"  Gross margin per conv:     ${885 - cpa:.2f}")
print(f"  ROAS:                      {885/cpa:.1f}x")
print(f"")
print(f"  At tCPA $105:")
print(f"    If actual CPA lands at ~$105-115:")
print(f"    Gross margin per conv:   ${885 - 110:.2f}")
print(f"    ROAS:                    {885/110:.1f}x")
print(f"")
print(f"  Current monthly:")
print(f"    Conversions:  ~{total_conv/30*30:.0f}")
print(f"    Revenue:      ${total_conv * 885:,.0f}")
print(f"    Ad spend:     ${total_cost:,.0f}")
print(f"    Gross profit: ${total_conv * 885 - total_cost:,.0f}")
