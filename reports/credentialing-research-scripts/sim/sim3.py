# Monte Carlo of 2028 credentialing-business revenue by strategy. All inputs are [A]/[E]; see report section 7.
import random, math, statistics as st
random.seed(7); N=40000
def ln(median, p90_over_median):  # lognormal with median and ratio p90/median
    s=math.log(p90_over_median)/1.2816; return median*math.exp(random.gauss(0,s))
def run(strategy):
    cal=[]; arr=[]
    for _ in range(N):
        f=math.exp(random.gauss(0,0.30))  # shared demand/execution factor
        # 1. one-time solo jobs (first-study base: 70 jobs x $1,450)
        if strategy=='base':
            jobs=ln(70,1.9)*f; tick=random.uniform(1250,1700)
        else:  # prescriber/into-NY emphasis: +15 jobs median, higher ticket
            jobs=ln(85,1.9)*f; tick=random.uniform(1400,2000)
        solo=jobs*tick
        # 2. upkeep
        price=249 if strategy=='base' else 480
        subs=0.35*jobs*1.6*random.uniform(0.6,1.0)
        upkeep=subs*price*0.75
        # 3. group retainer
        grp=0.0; grp_arr=0.0
        if strategy!='base':
            if False:: group thesis fails by Sep 2027
                g=ln(8,2.5)*f; size=ln(7,1.6); pc=random.uniform(75,125)
                clin=g*size
                grp_arr=clin*pc*12 + clin*0.25*600 + g*0.3*1500
                grp=grp_arr*0.55       # ramp through 2028
        else:
            if random.random()>0.6:
                g=ln(4,2.0)*f; clin=g*5; grp_arr=clin*249/12*12*1.0; grp=grp_arr*0.6
        # 4. billing adjacency
        bill=0.0; bill_arr=0.0
        if strategy in ('groups+billing','all'):
            if random.random()>0.35:
                clients=ln(20,2.2)*f; bill_arr=clients*random.uniform(3500,6500); bill=bill_arr*0.5
        # 5. acquisition
        acq=0.0; acq_arr=0.0
        if strategy=='all':
            if random.random()<0.12:
                acq_arr=random.uniform(400e3,900e3)*random.uniform(0.75,1.0); acq=acq_arr*random.uniform(0.3,0.9)
        total=solo+upkeep+grp+bill+acq
        run_rate=solo*1.15+subs*price+grp_arr+bill_arr+acq_arr   # Dec-2028 annualized (solo growing ~15%)
        cal.append(total); arr.append(run_rate)
    def p(xs,t): return sum(x>=t for x in xs)/len(xs)
    q=lambda xs,a: sorted(xs)[int(a*len(xs))]
    print(f"{strategy:16s} 2028 rev median {q(cal,.5)/1e3:5.0f}K p10 {q(cal,.1)/1e3:4.0f}K p90 {q(cal,.9)/1e3:5.0f}K | P>=200K {p(cal,200e3):.0%} P>=250K {p(cal,250e3):.0%} P>=500K {p(cal,500e3):.0%} || Dec28 run-rate median {q(arr,.5)/1e3:4.0f}K P>=250K {p(arr,250e3):.0%} P>=500K {p(arr,500e3):.0%}")
run('groups')
