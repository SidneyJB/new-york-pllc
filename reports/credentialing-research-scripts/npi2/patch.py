import json,sys
sys.path.insert(0,'.')
from states import pull
cells={"MD":[("Counselor","212")]}
for st,cl in cells.items():
    d=json.load(open(f"out_{st}.json")); recs=d["recs"]; still=[]
    for tax,z3 in cl:
        for i in range(10):
            res,c=pull({"state":st,"taxonomy_description":tax,"postal_code":f"{z3}{i}*"})
            if c: still.append((tax,z3+str(i)))
            for r in res:
                n=r["number"]; b=r["basic"]
                loc=[a for a in r.get("addresses",[]) if a.get("address_purpose")=="LOCATION"]
                prim=[t for t in r.get("taxonomies",[]) if t.get("primary")]
                e=recs.setdefault(n,{"date":b.get("enumeration_date",""),"locst":loc[0].get("state","") if loc else "","prim":(prim[0]["desc"] if prim else ""),"name":b.get("organization_name",""),"tax":[],"status":b.get("status","")})
                if tax not in e["tax"]: e["tax"].append(tax)
    d["capped"]=still; json.dump(d,open(f"out_{st}.json","w")); print(st,len(recs),"still capped",still)
