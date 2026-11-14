import random, math, statistics as S
random.seed(7)
def ln(med,p90):  # lognormal from median and p90
    s=math.log(p90/med)/1.2816; return med*math.exp(random.gauss(0,s))
def run(levers, N=40000):
    nets=[];revs=[];detail=[]
    for _ in range(N):
        D=math.exp(random.gauss(0,0.35))          # shared demand/execution factor
        cac=random.uniform(0.6,1.6)                # shared acquisition-cost factor
        m=0; acq=0; tele=False; oos=False
        # 1 NY therapist solo jobs / month (Dec 2028)
        n1=ln(4,9)*D; m+=n1*random.uniform(1300,1700); acq+=n1*300*cac
        # 2 NY prescribers incl. into-NY
        n2=ln(3,7)*D; m+=n2*random.uniform(2300,2900); acq+=n2*500*cac
        solo=n1+n2
        if "oos" in levers and random.random()<0.5:
            oos=True; n3=ln(5,14)*D; m+=n3*random.uniform(1600,2400); acq+=n3*900*cac; solo+=n3
        clin=0; newg=0
        if "groups" in levers and random.random()<0.5:
            g=ln(10,25)*D; cpg=ln(7,13); clin+=g*cpg; newg+=g/18
            if oos and random.random()<0.5:
                g2=ln(6,18)*D; clin+=g2*ln(7,13); newg+=g2/15; g+=g2
            price=random.uniform(90,120)
            m+=clin*price + newg*(1500+350*7) + clin*0.25/12*595
            acq+=newg*2000*cac
        if "tele" in levers and random.random()<0.25:
            tele=True; a=ln(3,8)*D; c=a*ln(20,50); price=random.uniform(120,180)
            m+=c*price + c*0.03*600; acq+=(a/12)*5000*cac; clin+=c
        if "medicare" in levers and random.random()<0.5:
            n=ln(3,8)*D; m+=n*395; acq+=n*150*cac
        # solo upkeep at ~$39/mo: 45% attach, 25% lost, cumulative ~14x December pace
        m+=solo*14*0.45*0.75*39
        rev=12*m
        # costs (annual)
        staff=7000  # ops coordinator share
        if m>15000: staff+=62000
        if m>50000: staff+=58000
        if m>20000: staff+=14000*(1+int((m-20000)//25000))
        other=12000+0.02*rev+(25000 if tele else 0)+(5000 if oos else 0)
        cost=0.03*rev+12*acq+staff+other
        nets.append(rev-cost); revs.append(rev)
    nets.sort(); revs.sort()
    q=lambda a,p: a[int(p*len(a))]
    return dict(rev_med=q(revs,.5),rev_p10=q(revs,.1),rev_p90=q(revs,.9),net_med=q(nets,.5),net_p10=q(nets,.1),net_p90=q(nets,.9),
                p350=sum(n>=350000 for n in nets)/len(nets),p500=sum(n>=500000 for n in nets)/len(nets),
                p250=sum(n>=250000 for n in nets)/len(nets))
combos={"C0 NY solo+prescribers":[], "C1 +NY groups":["groups"], "C2 +multi-state":["groups","oos"], "C3 +telehealth cos +Medicare SKU":["groups","oos","tele","medicare"]}
for k,v in combos.items():
    r=run(v); print(k, {a:(round(b) if b>1 else round(b,3)) for a,b in r.items()})
