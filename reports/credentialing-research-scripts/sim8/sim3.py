# Monthly ramp model, Jan 2027 .. Dec 2028 (24 months). All inputs [A]/[E]; see report §8.3.
import random, math, statistics as St
def ln(med,p90):
    s=math.log(p90/med)/1.2816; return med*math.exp(random.gauss(0,s))
CACMED=1100; MAILMED=0.003
def run(levers, N=20000, seed=11, nyonly=False, out_detail=False):
    random.seed(seed); nets=[]; revs=[]; subsL=[]; jobsL=[]; mrrL=[]
    for _ in range(N):
        D=math.exp(random.gauss(0,0.40))
        c_mail=ln(MAILMED,MAILMED*2.7)*D                 # paid setups per new practice mailed (2-3 touches)
        mail_cost=random.uniform(2.0,4.5)          # $ per practice mailed (all touches)
        cac_search=ln(CACMED,CACMED*2.2)/D                 # $ per paid setup from search
        ticket=random.uniform(1700,2200)           # blended setup ticket (35-45% prescribers)
        attach=random.uniform(0.45,0.70); price=random.uniform(65,95); churn=random.uniform(0.018,0.035)
        seo_dec=ln(3,8)*D                          # SEO/AI-answer setups per month by Dec 2028
        g_ok = "groups" in levers and random.random()<0.5
        g_dec = ln(12,30)*D if g_ok else 0; cpg=ln(7,13); gprice=random.uniform(90,120)
        t_ok = "tele" in levers and random.random()<0.25
        t_dec = ln(3,8)*D if t_ok else 0; tcl=ln(20,50); tprice=random.uniform(120,180)
        sm_ok = "standalone" in levers
        c_exist = ln(0.0015,0.004)*D                # maintenance-only subs per existing practice mailed
        capped = random.random()<0.15
        subs=0.0; book=0.0; cum=0.0
        for mth in range(24):
            q=mth//3
            trust=0.8 if mth<6 else (0.9 if mth<12 else 1.0)
            # practices mailed per month: NY+NJ first, then ~12 states, then national (new BH orgs ~2,230/mo national [M])
            if nyonly: mailed=100
            else: mailed=175 if (mth<3 or c_mail<0.0015) else (1000 if mth<6 else 2230)
            mail_jobs=mailed*c_mail*trust; mail_spend=mailed*mail_cost
            # search budget: test $3K/mo in Q1 2027; scale only if CAC <= $1,200
            if mth<3: sbud=3000
            else: sbud=(10000 if mth<12 else 20000) if cac_search<=1200 else (2000 if cac_search<=1600 else 0)
            if nyonly: sbud=min(sbud,4000)
            search_jobs=(sbud/(cac_search*max(1,(sbud/5000))**0.35) if sbud>0 else 0)*trust
            funnel=(1.5+1.5*mth/23)*D*trust
            seo=seo_dec*(mth/23)**2
            refs=0.02*cum/12*12/12  # ~2%/mo of cumulative clients refer someone? keep small: 0.02 per client-year
            refs=cum*0.02/12*12/12
            jobs=mail_jobs+search_jobs+funnel+seo+refs
            if capped and not nyonly: jobs=min(jobs,12)
            cum+=jobs
            # maintenance book
            new_subs=jobs*attach
            if sm_ok:
                exist_mailed = 0 if mth<6 else (3000 if not nyonly else 600)
                new_subs+=exist_mailed*c_exist*trust + 1.5*D   # + cross-sell to our VM/RA clinician clients
                mail_spend+= exist_mailed*1.25
            subs=subs*(1-churn)+new_subs
            # groups (linear ramp to Dec level, starting Q2 2027)
            gfrac=max(0,(mth-3)/20); groups=g_dec*min(1,gfrac); new_groups=g_dec/20 if mth>=3 else 0
            # telehealth accounts from Q1 2028
            tfrac=max(0,(mth-12)/11); tacc=t_dec*min(1,tfrac)
            rev = jobs*ticket + subs*price + groups*cpg*gprice + new_groups*(1500+350*cpg)*(0.85 if mth<12 else 1) + groups*cpg*0.25/12*595 + tacc*tcl*tprice + tacc*tcl*0.03*600
            acq = mail_spend + sbud + new_groups*2000 + (t_dec/11*5000 if mth>=12 else 0)
            staff=7000/12
            if rev>10000: staff+=62000/12
            if rev>45000: staff+=58000/12
            if rev>80000: staff+=58000/12
            if rev>15000: staff+=14000/12*(1+int((rev-15000)//25000))
            other=1000+0.02*rev+0.03*rev+0.05*rev+(25000/12 if t_ok else 0)
            net=rev-acq-staff-other
        nets.append(12*net); revs.append(12*rev); subsL.append(subs); jobsL.append(jobs); mrrL.append(subs*price+groups*cpg*gprice)
    nets.sort(); revs.sort()
    q=lambda a,p: a[int(p*len(a))]
    r=dict(net_med=q(nets,.5),net_p10=q(nets,.1),net_p90=q(nets,.9),rev_med=q(revs,.5),p350=sum(n>=350e3 for n in nets)/N,p500=sum(n>=500e3 for n in nets)/N,p250=sum(n>=250e3 for n in nets)/N,mean=St.mean(nets),plo=sum(n<75e3 for n in nets)/N,
           subs_med=St.median(subsL),jobs_med=St.median(jobsL))
    return r
