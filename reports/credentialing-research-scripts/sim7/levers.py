import random, math
random.seed(3)
def ln(med,p90):
    s=math.log(p90/med)/1.2816; return med*math.exp(random.gauss(0,s))
def q(a,p): a=sorted(a); return a[int(p*len(a))]
N=40000; out={k:[] for k in ["NYther","NYpresc","OOS","NYgroups","OOSgroups","Tele","Medicare"]}
for _ in range(N):
    D=math.exp(random.gauss(0,0.35)); cac=random.uniform(0.6,1.6)
    n=ln(4,9)*D; out["NYther"].append(12*(n*1500-n*300*cac-0.03*n*1500+n*14*0.45*0.75*39*0.4))
    n=ln(3,7)*D; out["NYpresc"].append(12*(n*2600-n*500*cac-0.03*n*2600+n*14*0.45*0.75*39*0.6))
    n=ln(5,14)*D; out["OOS"].append(12*(n*2000-n*900*cac-0.03*n*2000)-5000)
    g=ln(10,25)*D; c=g*ln(7,13); ng=g/18; r=c*105+ng*(1500+350*7)+c*0.25/12*595
    out["NYgroups"].append(12*(r*0.97-ng*2000*cac))
    g=ln(6,18)*D; c=g*ln(7,13); ng=g/15; r=c*105+ng*(1500+350*7)+c*0.25/12*595
    out["OOSgroups"].append(12*(r*0.97-ng*2000*cac))
    a=ln(3,8)*D; c=a*ln(20,50); r=c*150+c*0.03*600
    out["Tele"].append(12*(r*0.97-(a/12)*5000*cac)-25000)
    n=ln(3,8)*D; out["Medicare"].append(12*n*(395*0.97-150*cac))
for k,v in out.items(): print(k, "if it works: p10 %.0fK med %.0fK p90 %.0fK"%(q(v,.1)/1e3,q(v,.5)/1e3,q(v,.9)/1e3))
