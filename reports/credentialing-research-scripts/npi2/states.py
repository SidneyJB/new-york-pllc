import json, time, urllib.request, urllib.parse, collections, sys, threading
from concurrent.futures import ThreadPoolExecutor
TAX = ["Social Worker","Counselor","Marriage & Family Therapist","Psychologist","Psych/Mental Health","Psychiatry"]
def rng(a,b): return list(range(a,b+1))
ZIP = {
 "NY": rng(100,149)+[5,63], "NJ": rng(70,89), "CT": rng(60,69), "PA": rng(150,196),
 "FL": rng(320,349), "TX": rng(750,799)+[885], "CA": rng(900,961), "MA": rng(10,27)+[55],
 "IL": rng(600,629), "GA": rng(300,319)+[398,399], "NC": rng(270,289), "AZ": rng(850,865),
 "CO": rng(800,816), "WA": rng(980,994),
}
base="https://npiregistry.cms.hhs.gov/api/?"
def get(params):
    q=urllib.parse.urlencode({"version":"2.1","enumeration_type":"NPI-2",**params,"limit":200})
    for attempt in range(4):
        try:
            return json.load(urllib.request.urlopen(base+q,timeout=40)).get("results",[]) or []
        except Exception as e:
            time.sleep(2+attempt*2)
    print("FAIL",params,file=sys.stderr); return []
def pull(params):
    out=[]; capped=False
    for skip in range(0,1001,200):
        res=get({**params,"skip":skip}); out+=res; time.sleep(0.1)
        if len(res)<200: break
        if skip==1000: capped=True
    return out,capped
def do_state(st):
    recs={}; capped=[]
    def add(res,tax):
        for r in res:
            n=r["number"]; b=r["basic"]
            loc=[a for a in r.get("addresses",[]) if a.get("address_purpose")=="LOCATION"]
            locst=loc[0].get("state","") if loc else ""
            prim=[t for t in r.get("taxonomies",[]) if t.get("primary")]
            e=recs.setdefault(n,{"date":b.get("enumeration_date",""),"locst":locst,"prim":(prim[0]["desc"] if prim else ""),"name":b.get("organization_name",""),"tax":set(),"status":b.get("status","")})
            e["tax"].add(tax)
    for tax in TAX:
        res,c=pull({"state":st,"taxonomy_description":tax})
        if not c:
            add(res,tax); continue
        for p in ZIP[st]:
            res,c2=pull({"state":st,"taxonomy_description":tax,"postal_code":f"{p:03d}*"})
            add(res,tax)
            if c2: capped.append((tax,p))
    json.dump({"capped":capped,"recs":{k:{**v,"tax":sorted(v["tax"])} for k,v in recs.items()}},open(f"out_{st}.json","w"))
    by=collections.Counter(v["date"][:4] for v in recs.values() if v["locst"]==st)
    print(st,len(recs),"capped",capped,"by year",sorted(by.items())[-6:],flush=True)
if __name__=="__main__":
  sts=sys.argv[1:] or list(ZIP)
  with ThreadPoolExecutor(5) as ex: list(ex.map(do_state,sts))
