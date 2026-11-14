import json, time, urllib.request, urllib.parse, collections, sys
TAX = ["Social Worker","Counselor","Marriage & Family Therapist","Psychologist","Psychiatric/Mental Health","Psychiatry"]
base="https://npiregistry.cms.hhs.gov/api/?"
recs={}
capped=[]
for tax in TAX:
    for p in range(100,150):
        pc=f"{p}*"
        for skip in range(0,1001,200):
            q=urllib.parse.urlencode({"version":"2.1","enumeration_type":"NPI-2","state":"NY","taxonomy_description":tax,"postal_code":pc,"limit":200,"skip":skip})
            for attempt in range(3):
                try:
                    d=json.load(urllib.request.urlopen(base+q,timeout=30)); break
                except Exception as e:
                    time.sleep(2); d={"results":[]}
            res=d.get("results",[]) or []
            for r in res:
                n=r["number"]
                prim=[t for t in r.get("taxonomies",[]) if t.get("primary")]
                recs.setdefault(n,{"date":r["basic"].get("enumeration_date",""),"prim":(prim[0]["desc"] if prim else ""),"name":r["basic"].get("organization_name",""),"tax":set()})["tax"].add(tax)
            time.sleep(0.15)
            if len(res)<200: break
            if skip==1000: capped.append((tax,pc))
print("unique orgs",len(recs)); print("capped",capped)
by=collections.Counter(v["date"][:4] for v in recs.values())
print("by year", sorted(by.items()))
bt=collections.Counter()
for v in recs.values():
    for t in v["tax"]: bt[(t,v["date"][:4]>="2025")]+=1
print(sorted(bt.items()))
json.dump({k:{**v,"tax":sorted(v["tax"])} for k,v in recs.items()}, open(sys.argv[1],"w"))
