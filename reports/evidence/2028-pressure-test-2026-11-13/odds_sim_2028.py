#!/usr/bin/env python3
"""
2028 odds simulation for the Nov 13 2026 pressure test of the path-to-$1M plan.

Run from anywhere:
    python3 new-york-pllc/reports/evidence/2028-pressure-test-2026-11-13/odds_sim_2028.py
    python3 .../odds_sim_2028.py --out sim-output.txt     (also saves the printout next to this file)

Read-only. It imports scripts/model_2028.py and calls run() in memory. It never calls that
script's main(), so it does not rewrite reports/p2-11-model-2026-11-11/. Fixed seed, so a
re-run prints the same numbers.

What it is: the P2-11 monthly model for formations, virtual mail and RA, wrapped in a
Monte Carlo over the inputs nobody has measured yet. Each scenario is 6,000 draws.

Every input below is tagged:
  [M] measured Nov 13 2026 (CRM read-only queries, Stripe report, NY open data). See README.
  [E] estimate built from measured counts.
  [A] assumption. Nothing measures it yet. These carry most of the uncertainty.

The outputs are odds under these assumptions, not forecasts. Read README.md §6 before quoting one.
"""
from __future__ import annotations

import argparse
import math
import os
import random
import sys
from copy import deepcopy

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '..', '..', 'scripts'))
import model_2028 as M  # noqa: E402

A = M.A

# ---------------------------------------------------------------- measured corrections to the model
# [M] Nov 2025 - Mar 2026 formation orders by Eastern-time month, crm_queries.cjs B1 (the model assumed 45 a month).
A['history'].update({'2025-11': 24, '2025-12': 32, '2026-01': 51, '2026-02': 34, '2026-03': 39})
# Run through 2029 so recurring effects of a 2027 decision show up. Channels stay flat after Dec 2028.
M.MONTHS = M.month_list(end=(2029, 12))
_path_value = M.path_value
M.path_value = lambda p, i: _path_value(p, min(i, 25))

RETAIL = ['google', 'organic_ai_other', 'f1_recovery', 'f2_conversion', 'bing']
BASE_CONTRIB = A['retail_contribution']
BASE_SCORP = A['scorp_attach']

# [M] PLLC orders Mar-Oct 2026 (n=392). Group B = behavioral health + nurse practitioners
# (payment-plan use 42-62%); group A = everyone else (29-44%).
SHARE_B, SHARE_A = 0.44, 0.56
VM_B, VM_A = 0.312, 0.257        # mail-service attach
SC_B, SC_A = 0.165, 0.123        # S-corp election attach
PRICE_STEPS = [885, 985, 1085, 1185, 1285, 1385, 1485]


def tn(mu, sd, lo, hi):
    while True:
        x = random.gauss(mu, sd)
        if lo <= x <= hi:
            return x


def ln(median, sigma):
    return math.exp(random.gauss(math.log(median), sigma))


# ---------------------------------------------------------------- core: formations + virtual mail + RA
def core(plan):
    """One draw of the P2-11 model. Returns ({2028: $, 2029: $}, mail subs Dec 2028, orders in 2028)."""
    s = {'partner': (0, 0, 0), 'upside_services_month': 0, 'cred_jobs': (0, 0, 0)}   # partners at zero (decision log Nov 13)
    shock = tn(1.0, plan['shock_sd'], 0.7, 1.3) if plan.get('shock_sd') else 1.0      # [A] common demand swing
    growth = tn(0.04, 0.04, -0.05, 0.14)      # [A] non-Google orders per year. Flat Jul-Oct [M]; the PLLC market grew ~8-10%/yr [M]
    org_end = 25 * (1 + growth) ** 2 * shock
    s['organic_ai_other'] = (25, 25 * (1 + growth), org_end)
    g_end = tn(33, 4, 22, 42) * shock         # [A] Google orders/month by Dec 2028 at the $105 hold (38 in Oct [M])
    if plan.get('bid_step') and random.random() < 0.38:
        g_end += random.uniform(4, 10)        # [A] one bid step buys reach 38% of the time (May 2026 test bought position, not reach)
    if random.random() < 0.07:
        g_end *= random.uniform(0.5, 0.8)     # [A] ads policy or account problem
    s['google'] = (30, (30 + g_end) / 2 + 1, g_end)
    fx = plan.get('fixes')
    s['bing'] = (0, 4, 4) if random.random() < (0.45 if fx else 0.12) else (0, 0, 0)             # [A]
    f1 = 6 if random.random() < (0.5 if fx else 0.2) else (3 if random.random() < 0.5 else 0)    # [A] checkout recovery
    f2 = 6 if random.random() < (0.5 if fx else 0.2) else 3                                      # [A] conversion fixes
    s['f1_recovery'] = (0, f1, f1)
    s['f2_conversion'] = (0, f2 * 0.7, f2)
    attach = tn(0.275 if fx else 0.26, 0.025, 0.19, 0.34)      # [M] 27% mature attach; Jun-Jul cohorts 21%/19%
    s['vm_churn'] = tn(0.022, 0.005, 0.012, 0.035)            # [M] 1.7% net since Apr; 2.7% trailing 30 days
    s['ra_first_renewal'] = random.uniform(0.55, 0.80) if fx else random.uniform(0.45, 0.72)   # [A] unmeasured; 4 of 9 paid so far [M]

    # Price response. e = % of orders lost per 1% of price, by group. [A] medians; nothing has measured them.
    z = random.gauss(0, 1)
    e_b = plan.get('eB', 0.9) * math.exp(0.5 * (0.6 * z + 0.8 * random.gauss(0, 1)))
    e_a = plan.get('eA', 0.45) * math.exp(0.5 * (0.6 * z + 0.8 * random.gauss(0, 1)))
    pa, pb = plan.get('PA', 885), plan.get('PB', 885)
    if pa == pb:
        # One price for everyone. Climb one step at a time; the only thing a guardrail can see is a collapse (>28% of orders lost).
        p = 885
        for step in PRICE_STEPS[1:]:
            if step > pa:
                break
            if SHARE_A * (step / 885.0) ** (-e_a) + SHARE_B * (step / 885.0) ** (-e_b) < 0.72:
                break
            p = step
        pa = pb = p
    else:
        def climb(target, e):
            p = 885
            for step in PRICE_STEPS[1:]:
                if step > target:
                    break
                if (step / 885.0) ** (-e) < 0.72:
                    break
                p = step
            return p
        pa, pb = climb(pa, e_a), climb(pb, e_b)
    f_a, f_b = (pa / 885.0) ** (-e_a), (pb / 885.0) ** (-e_b)
    vol = SHARE_A * f_a + SHARE_B * f_b
    gain = (SHARE_A * f_a * (pa - 885) + SHARE_B * f_b * (pb - 885)) * 0.971 / vol       # net of card fee
    # Losing more of group B also lowers mail and S-corp attach, because B attaches more [M].
    rel_vm = (SHARE_A * f_a * VM_A + SHARE_B * f_b * VM_B) / (vol * (SHARE_A * VM_A + SHARE_B * VM_B))
    rel_sc = (SHARE_A * f_a * SC_A + SHARE_B * f_b * SC_B) / (vol * (SHARE_A * SC_A + SHARE_B * SC_B))
    s['vm_attach'] = attach * rel_vm
    for c in RETAIL:
        a, b, cc = s[c]
        s[c] = (a, b * vol, cc * vol)
    A['retail_contribution'] = BASE_CONTRIB + gain
    A['scorp_attach'] = BASE_SCORP * rel_sc
    rows = M.run(s)
    A['retail_contribution'] = BASE_CONTRIB
    A['scorp_attach'] = BASE_SCORP
    profit = {y: sum(r['operating_profit'] for r in rows if r['month'].startswith(str(y))) for y in (2028, 2029)}
    subs = next(r['vm_subs_end'] for r in rows if r['month'] == '2028-12')
    orders = sum(r['orders_total'] for r in rows if r['month'].startswith('2028'))
    return profit, subs, orders


# ---------------------------------------------------------------- credentialing
def credentialing(plan, year):
    """Net credentialing profit for the year.
    mode 'none'       : a trickle of inbound requests.
    mode 'plan'       : the Nov 13 plan. Sid delivers; a separate brand with paid ads brings strangers.
    mode 'own'        : own formation customers only; Sid delivers; a coordinator only above 5 jobs a month (plan's hire trigger).
    mode 'own+letters': 'own' plus letters to public filing lists.
    mode 'contractor' : 'own+letters' with a contractor delivering every job.
    """
    mode = plan.get('cred', 'none')
    if mode == 'none':
        return random.uniform(8, 25) * 1e3
    own = min(ln(2.5, 0.45), 6) * 12       # [E] jobs/yr from own customers. Signals [M]: 67 of 545 emailing customers raised it; 20% tick the box; 4 quotes out
    jobs, spend = own, 0.0
    if mode == 'plan':
        strangers = min(ln(1.5, 0.9), 10) * 12
        jobs += strangers
        spend += strangers * random.uniform(300, 900)     # [A] ad cost per client; the standalone doc's own range is $330-1,000
    if mode in ('own+letters', 'contractor'):
        jobs += 1500 * min(ln(0.012, 0.7), 0.05)          # [M] ~1,500 newly filed BH PLLCs a year that are not ours; [A] 1.2% median response
        spend += 4000
        if random.random() < 0.35:                         # [A] letters to the ~14,600 existing BH entities [M] either work or they do not
            jobs += random.uniform(40, 120)
            spend += random.uniform(15, 30) * 1e3
        else:
            spend += 2500
        jobs += random.uniform(0, 24)                      # [A] search and the credentialing page
    if mode == 'contractor':
        labor = jobs * random.uniform(400, 800)            # [A] per job
    else:
        labor = max(0.0, jobs - 60) * random.uniform(450, 600)   # Sid delivers up to 5 a month; plan §3.4 labor above that
    revenue = jobs * random.uniform(1500, 1900)            # [A] one job paid so far, $2,210 at the old prices [M]
    net = revenue * 0.97 * random.uniform(0.90, 0.96) - jobs * 35 - spend - labor   # [A] 4-10% lost to closed-panel credits
    net += 0.4 * jobs * (1.4 if year == 2028 else 2.1) * 249 * 0.7                  # [A] upkeep at $249/yr, 40% attach
    return net * (1.0 if year == 2028 else 1.15)


# ---------------------------------------------------------------- everything else
def extras(plan, year):
    g = 1.0 if year == 2028 else 1.2
    P = plan.get
    # [E] Metro RA renewals at today's collection rate. Not in the P2-11 model. Counts are measured:
    # 410 active + 1,305 trialing clients, 1,566 renewals due in 2027, 377 of 2,271 invoices paid Apr-Jul 2026, ~$48 to us per payment.
    x = tn(30e3, 8e3, 12e3, 50e3)
    if P('metro'):
        x += (random.uniform(15, 35) if random.random() < 0.40 else 0) * 1e3 * g          # [A] cards on file for new Metro orders
        x += (random.uniform(10, 30) if random.random() < 0.40 else random.uniform(2, 6)) * 1e3 * g   # [A] mail offer in Metro's flow
    if P('products'):
        x += (random.uniform(8, 25) if random.random() < 0.60 else random.uniform(3, 8)) * 1e3 * g    # [A] services page: amendments, DBA, good standing, dissolution
        x += (random.uniform(8, 14) if random.random() < 0.50 else 2) * 1e3                           # [A] practice NPI add-on at checkout
        x += (random.uniform(8, 14) if random.random() < 0.60 else 2) * 1e3 * g                       # [A] mail service for past customers (P2-06: 179 candidates [M])
        x += (random.uniform(5, 15) if random.random() < 0.40 else 0) * 1e3                           # [A] foreign-into-NY
    if P('fees'):
        x += (random.uniform(10, 16) if random.random() < 0.60 else 0) * 1e3 * g          # [A] RA with the biennial filing at $129
        x += (random.uniform(8, 20) if random.random() < 0.60 else 0) * 1e3 * g           # [A] $60 mail price for new subscribers
        x += (random.uniform(15, 35) if random.random() < 0.35 else 0) * 1e3              # [A] a higher package tier
    if P('pc'):
        # Revised Nov 14: a PC has no publication, so do-it-yourself costs about $245 and the PLLC price edge is gone.
        x += (random.uniform(10, 25) if random.random() < 0.33 else random.uniform(0, 3)) * 1e3 * g   # [A]
    if P('pc_chat'):
        # The larger PC sizing quoted in chat on Nov 13, before it was revised. Kept only so the chat figures reproduce.
        x += (random.uniform(40, 90) if random.random() < 0.40 else random.uniform(0, 10)) * 1e3 * g
    if P('mail_outreach'):
        # Mail-service outreach to existing PLLCs, as quoted in chat (worth about $4K expected). Dropped from the program.
        x += ((random.uniform(20, 50) * g) if random.random() < 0.25 else -3) * 1e3
    if P('ops_hire'):
        x -= 33e3                                                                          # plan §3C $27K plus tools
    if random.random() < 0.05:
        x -= 40e3                                                                          # [A] mail-suite disruption (CMRA question open)
    return x


def draw(plan):
    ex = plan.get('exec', 1.0)
    if ex < 1.0:
        # Each item only gets done with this probability. Price is a switch, so it is not included.
        plan = dict(plan)
        for k in ('fixes', 'bid_step', 'metro', 'products', 'fees', 'pc', 'pc_chat', 'mail_outreach'):
            if plan.get(k) and random.random() > ex:
                plan[k] = False
        if plan.get('cred') in ('own+letters', 'contractor') and random.random() > ex:
            plan['cred'] = 'own'
    profit, subs, orders = core(plan)
    out = {y: profit[y] + credentialing(plan, y) + extras(plan, y) for y in (2028, 2029)}
    if plan.get('acq') and random.random() < plan['acq']:
        lo, hi = plan.get('acq_rng', (150, 300))
        ebitda = random.uniform(lo, hi) * 1e3 * random.uniform(0.8, 1.05)     # [A] profit after paying a manager; some slips after close
        for y in (2028, 2029):
            out[y] += ebitda * (1 - 0.315) - (25e3 if y == 2028 else 0)        # [A] 3x price, 90% financed at 10.5%; interest netted out
    return out, subs, orders


def sim(label, plan, n=6000, seed=20261113):
    random.seed(seed)
    r28, r29, subs, orders = [], [], [], []
    for _ in range(n):
        o, s, od = draw(plan)
        r28.append(o[2028]); r29.append(o[2029]); subs.append(s); orders.append(od)
    for r in (r28, r29, subs, orders):
        r.sort()
    q = lambda r, p: r[int(p * len(r))]
    share = lambda r, t: sum(1 for v in r if v >= t) / len(r)
    return {
        'label': label, 'mean': sum(r28) / n, 'p10': q(r28, .1), 'p50': q(r28, .5), 'p90': q(r28, .9),
        'p800': share(r28, 8e5), 'p900': share(r28, 9e5), 'p1m': share(r28, 1e6),
        'p50_2029': q(r29, .5), 'p1m_2029': share(r29, 1e6), 'orders': q(orders, .5), 'subs': q(subs, .5),
    }


def line(r):
    return (f"{r['label']:58s} 2028 P10 {r['p10']/1e3:4.0f}  P50 {r['p50']/1e3:4.0f}  P90 {r['p90']/1e3:4.0f}"
            f" | >=800K {r['p800']:4.0%}  >=900K {r['p900']:4.0%}  >=1M {r['p1m']:4.0%}"
            f" | 2029 P50 {r['p50_2029']/1e3:4.0f}  >=1M {r['p1m_2029']:4.0%}"
            f" | orders {r['orders']:4.0f}  mail subs {r['subs']:3.0f}")


# ---------------------------------------------------------------- scenarios
NOTHING = dict(cred='none')
CURRENT_PLAN = dict(fixes=True, PA=985, PB=985, cred='plan', ops_hire=True)
# Sid's decisions, Nov 13 2026: $800K is the working target; no price by profession; no ops help now;
# PCs stay shelved; no credentialing contractor yet (Sid delivers); acquisition looked at lightly.
ADOPTED = dict(fixes=True, bid_step=True, cred='own+letters', metro=True, products=True, PA=885, PB=885)
# The program quoted in chat on Nov 13 before the decisions: contractor delivers credentialing, PCs at the old size,
# mail outreach to existing PLLCs, fee changes, an ops hire.
CHAT = dict(fixes=True, bid_step=True, cred='contractor', metro=True, products=True, fees=True,
            pc_chat=True, mail_outreach=True, ops_hire=True)
SLIP = dict(exec=0.65, shock_sd=0.08)


def minus(plan, *keys, **changes):
    out = {k: v for k, v in plan.items() if k not in keys}
    out.update(changes)
    return out


STEP3 = minus(CHAT, 'pc_chat')
STEP4 = minus(STEP3, 'mail_outreach')
STEP5 = minus(STEP4, 'fees')
STEP6 = minus(STEP5, 'ops_hire')
SPLIT = dict(PA=1285, PB=885)

SECTIONS = [
    ('Reference points', [
        ('Do nothing new', NOTHING),
        ('Nov 13 plan ($985 for all, Sid delivers credentialing, ads)', CURRENT_PLAN),
    ]),
    ('After Sid\'s Nov 13 decisions (price held at $885)', [
        ('Adopted program, everything done', ADOPTED),
        ('Adopted program, each item 65% likely to get done', {**ADOPTED, 'exec': 0.65, 'shock_sd': 0.08}),
        ('Adopted program, each item 50% likely', {**ADOPTED, 'exec': 0.50, 'shock_sd': 0.08}),
        ('... without the letters to public lists', {**ADOPTED, 'cred': 'own'}),
        ('... without Metro', {**ADOPTED, 'metro': False}),
        ('... without the product items', {**ADOPTED, 'products': False}),
        ('... without the stuck fixes', {**ADOPTED, 'fixes': False}),
        ('... without the bid step', {**ADOPTED, 'bid_step': False}),
    ]),
    ('Still-open options on top of the adopted program (everything done)', [
        ('+ fee changes (RA $129 with biennial, $60 mail, higher tier)', {**ADOPTED, 'fees': True}),
        ('+ $985 for everyone (the Feb test still on file)', {**ADOPTED, 'PA': 985, 'PB': 985}),
        ('+ $985 for everyone, if the barrier worry is right', {**ADOPTED, 'PA': 985, 'PB': 985, 'eB': 1.6, 'eA': 0.7}),
        ('+ fee changes and $985 for everyone', {**ADOPTED, 'fees': True, 'PA': 985, 'PB': 985}),
        ('+ a light acquisition look (15% chance of closing $150-300K)', {**ADOPTED, 'acq': 0.15}),
    ]),
    ('How the 95% quoted in chat on Nov 13 becomes the 77% above (everything done)', [
        ('1 Chat program, $885 therapists+NPs / $1,285 others', {**CHAT, **SPLIT}),
        ('2 Price held at $885 (price by profession declined)', CHAT),
        ('3 PCs removed (estimate revised; they stay shelved)', STEP3),
        ('4 Mail outreach to existing PLLCs removed', STEP4),
        ('5 Fee changes no longer assumed (still an open call)', STEP5),
        ('6 No ops hire (decision)', STEP6),
        ('7 Sid delivers credentialing (decision) = adopted program', ADOPTED),
    ]),
    ('The same three points with each item 65% likely to get done', [
        ('1 Chat program, price by profession', {**CHAT, **SPLIT, **SLIP}),
        ('2 Chat program, price held at $885', {**CHAT, **SLIP}),
        ('7 Adopted program', {**ADOPTED, **SLIP}),
    ]),
    ('What would restore it, on the adopted program', [
        ('Price by profession $885 / $1,085, everything done', {**ADOPTED, 'PA': 1085, 'PB': 885}),
        ('Price by profession $885 / $1,285, everything done', {**ADOPTED, **SPLIT}),
        ('  ... if the barrier worry is right', {**ADOPTED, **SPLIT, 'eB': 1.6, 'eA': 0.7}),
        ('  ... 65% done', {**ADOPTED, **SPLIT, **SLIP}),
        ('$985 for everyone, 65% done', {**ADOPTED, 'PA': 985, 'PB': 985, **SLIP}),
        ('Fee changes and $985 for everyone, 65% done', {**ADOPTED, 'fees': True, 'PA': 985, 'PB': 985, **SLIP}),
        ('Ops help ($33K) lifting completion from 65% to 90%', {**ADOPTED, 'ops_hire': True, 'exec': 0.90, 'shock_sd': 0.08}),
    ]),
]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--out', help='also save the printout to this file name, next to the script')
    ap.add_argument('-n', type=int, default=6000)
    args = ap.parse_args()
    lines = ['2028 odds simulation. Dollars in $K. Inputs and tags are in the script; limits are in README.md section 6.',
             f'{args.n} draws per row, seed 20261113.', '']
    for title, rows in SECTIONS:
        lines.append('== ' + title)
        for label, plan in rows:
            lines.append(line(sim(label, plan, n=args.n)))
        lines.append('')
    text = '\n'.join(lines)
    print(text)
    if args.out:
        with open(os.path.join(HERE, os.path.basename(args.out)), 'w') as f:
            f.write(text + '\n')


if __name__ == '__main__':
    main()
