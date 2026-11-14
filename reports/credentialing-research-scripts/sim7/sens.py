import re
src=open("sim.py").read().split("combos=")[0]
variants={
 "base":src,
 "optimistic (groups p.65 med14, D sigma .45)":src.replace('random.random()<0.5:\n            g=ln(10,25)','random.random()<0.65:\n            g=ln(14,30)').replace("gauss(0,0.35)","gauss(0,0.45)"),
 "pessimistic (groups p.35 med8, CAC x1.5)":src.replace('random.random()<0.5:\n            g=ln(10,25)','random.random()<0.35:\n            g=ln(8,20)').replace("uniform(0.6,1.6)","uniform(0.9,2.4)"),
 "higher correlation (group success tied to D)":src.replace('random.random()<0.5:\n            g=ln(10,25)','random.random()<min(0.95,0.5*D):\n            g=ln(10,25)'),
}
combos={"C1":["groups"],"C2":["groups","oos"],"C3":["groups","oos","tele","medicare"]}
for name,code in variants.items():
    ns={}; exec(code,ns)
    out=[]
    for k,v in combos.items():
        r=ns["run"](v,20000); out.append(f"{k}: net med {r['net_med']/1e3:.0f}K P350 {r['p350']:.2f} P500 {r['p500']:.2f}")
    print(name," | ".join(out))
