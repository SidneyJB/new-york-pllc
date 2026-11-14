import json,collections,re
ANN=365/318
rows=[]
for st in ["NY","NJ","CT","PA","FL","TX","CA","MA","IL","GA","NC","AZ","CO","WA"]:
    recs=json.load(open(f"out_{st}.json"))["recs"]
    loc={k:v for k,v in recs.items() if v["locst"]==st}
    def yr(v): return v["date"][:4]
    def presc(v): return any(t in ("Psychiatry","Psych/Mental Health") for t in v["tax"])
    def npsy(v): return "Psych/Mental Health" in v["tax"]
    c=collections.Counter(yr(v) for v in loc.values())
    p=collections.Counter(yr(v) for v in loc.values() if presc(v))
    n=collections.Counter(yr(v) for v in loc.values() if npsy(v))
    th=collections.Counter(yr(v) for v in loc.values() if not presc(v))
    primbh=collections.Counter(yr(v) for v in loc.values() if re.search(r"Social Worker|Counselor|Marriage|Psycholog|Psychiatr|Psych/Mental",v["prim"] or ""))
    pl=collections.Counter(yr(v) for v in loc.values() if re.search(r"\bP\.?L\.?L\.?C\b",v["name"] or "",re.I))
    rows.append((st,len(loc),c["2023"],c["2024"],c["2025"],round(c["2026"]*ANN),p["2025"],round(p["2026"]*ANN),n["2025"],round(n["2026"]*ANN),th["2025"],round(th["2026"]*ANN),primbh["2025"],round(primbh["2026"]*ANN),pl["2026"]))
print("st active 2023 2024 2025 2026ann presc25 presc26ann psyNP25 psyNP26ann ther25 ther26ann primBH25 primBH26ann pllc26ytd")
for r in rows: print(*r)
