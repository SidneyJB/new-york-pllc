import json,glob,collections
ANN=365/318; tot=collections.Counter(); pres=collections.Counter(); np_=collections.Counter(); rows=[]
for f in sorted(glob.glob("out_*.json")):
    st=f[4:6]; recs=json.load(open(f))["recs"]
    loc=[v for v in recs.values() if v["locst"]==st]
    c=collections.Counter(v["date"][:4] for v in loc)
    p=collections.Counter(v["date"][:4] for v in loc if any(t in("Psychiatry","Psych/Mental Health") for t in v["tax"]))
    n=collections.Counter(v["date"][:4] for v in loc if "Psych/Mental Health" in v["tax"])
    for y in ("2023","2024","2025","2026"): tot[y]+=c[y]; pres[y]+=p[y]; np_[y]+=n[y]
    tot["active"]+=len(loc); rows.append((round(c["2026"]*ANN),st,len(loc),c["2025"],round(p["2026"]*ANN)))
print("states",len(rows),"active",tot["active"])
for y in ("2023","2024","2025"): print(y,tot[y],"presc",pres[y],"psychNP",np_[y])
print("2026 ann",round(tot["2026"]*ANN),"presc",round(pres["2026"]*ANN),"psychNP",round(np_["2026"]*ANN))
rows.sort(reverse=True); print("top 25 by 2026 ann (ann, st, active, 2025, presc26ann):"); print(rows[:25])
