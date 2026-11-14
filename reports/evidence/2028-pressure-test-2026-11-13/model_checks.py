#!/usr/bin/env python3
"""
Deterministic checks of the Nov 13 2026 path-to-$1M plan against scripts/model_2028.py.

Run:  python3 new-york-pllc/reports/evidence/2028-pressure-test-2026-11-13/model_checks.py [--out model-checks.txt]

Read-only. It imports the model and calls run()/summarize() with overrides in memory.
It never calls the model's main(), so reports/p2-11-model-2026-11-11/ is not rewritten.
"""
from __future__ import annotations

import argparse
import os
import sys
from copy import deepcopy

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '..', '..', 'scripts'))
import model_2028 as M  # noqa: E402

A = M.A
OUT = []


def say(s=''):
    OUT.append(s)
    print(s)


def y2028(s):
    return M.summarize(M.run(s))[2028]


def row(label, s):
    a = y2028(s)
    say(f"{label:62s} F+VM+RA {a['operating_profit']/1e3:5.0f}K  cred {a['credentialing_net']/1e3:4.0f}K  "
        f"total {a['operating_profit_with_credentialing']/1e3:5.0f}K  orders {a['orders_total']:4d}  "
        f"orders/mo Dec {a['orders_per_month_dec']:.0f}  mail subs Dec {a['vm_subs_dec']:.0f}")
    return a


T = M.SCENARIOS['target']
# The plan's "realistic" case (its section 2, step 8): partners 0, organic flat, Bing blocked, fixes at half,
# Google 34, mail attach 25%, churn 2.7%, credentialing about 5 jobs a month.
REAL = deepcopy(T)
REAL.update(partner=(0, 0, 0), organic_ai_other=(25, 25, 25), bing=(0, 0, 0), f2_conversion=(0, 2, 3),
            f1_recovery=(0, 3, 3), google=(30, 33, 34), vm_attach=0.25, vm_churn=0.027, cred_jobs=(2, 4, 5))

say('1. The plan\'s own cases, as the model computes them')
row('Target case as written', T)
real = row('Plan realistic case (plan says $587K / $663K)', REAL)
rows = M.run(REAL)
for k in ('formation_contribution', 'vm_revenue_net', 'ra_revenue_net', 'ads', 'overhead'):
    say(f"     {k:24s} 2028 {M.year_sum(rows, 2028, k)/1e3:6.1f}K   2027 {M.year_sum(rows, 2027, k)/1e3:6.1f}K")
nov = next(r for r in rows if r['month'] == '2026-11')
say(f"     model's own Nov 2026 month: orders {nov['orders_total']}, operating profit ${nov['operating_profit']:,} (x12 = ${nov['operating_profit']*12:,})")

say()
say('2. Measured corrections')
A['history'].update({'2025-11': 24, '2025-12': 32, '2026-01': 51, '2026-02': 34, '2026-03': 39})   # crm_queries.cjs B1, Eastern-time months
row('Realistic + actual Nov 2025-Mar 2026 orders (180, not 225)', REAL)
R50 = deepcopy(REAL); R50['ra_first_renewal'] = 0.50
row('  + RA first renewal 50% (4 of 9 paid so far)', R50)
R17 = deepcopy(R50); R17['vm_churn'] = 0.017
row('  + mail churn at the measured net 1.7%', R17)
FLAT = deepcopy(R50); FLAT.update(google=(30, 30, 30), f1_recovery=(0, 0, 0), f2_conversion=(0, 0, 0), cred_jobs=(1, 1, 1))
row('Flat at 55 orders a month, no fixes, 1 credentialing job', FLAT)
C3 = deepcopy(R50); C3['cred_jobs'] = (1, 3, 3)
row('Central case used in the pressure test (credentialing ~3/mo)', C3)

say()
say('3. Credentialing paths on the realistic base (jobs/month now, Dec 2027, Dec 2028). No acquisition cost in the model.')
for path in [(2, 4, 5), (2, 6, 8), (2, 8, 12), (2, 10, 15), (2, 12, 12), (2, 15, 15)]:
    c = deepcopy(R50); c['cred_jobs'] = path
    a = y2028(c)
    say(f"     {str(path):14s} jobs in 2028 {a['cred_jobs']:4d}   credentialing net {a['credentialing_net']/1e3:6.1f}K   total {a['operating_profit_with_credentialing']/1e3:5.0f}K")

say()
say('4. Every lever in the plan\'s section 3 at full value (its "about $950K-1M")')
ALL = deepcopy(R50); ALL['ra_first_renewal'] = 0.65
ALL.update(bing=(0, 4, 4), f1_recovery=(0, 6, 6), f2_conversion=(0, 4, 6), vm_attach=0.27, vm_churn=0.024)
RETAIL = ['google', 'organic_ai_other', 'f1_recovery', 'f2_conversion', 'bing']
base_c = A['retail_contribution']
for path in [(2, 8, 12), (2, 10, 15)]:
    for gain, vol in [(0, 1.0), (97, 1.0), (97, 0.95), (97, 0.90)]:
        s = deepcopy(ALL); s['cred_jobs'] = path
        for c in RETAIL:
            x, b, z = s[c]; s[c] = (x, b * vol, z * vol)
        A['retail_contribution'] = base_c + gain
        a = y2028(s)
        A['retail_contribution'] = base_c
        say(f"     cred {str(path):11s} price +${gain:<3d} orders x{vol:.2f}: total {a['operating_profit_with_credentialing']/1e3:5.0f}K, "
            f"less the $27K ops hire = {(a['operating_profit_with_credentialing']-27000)/1e3:5.0f}K")

say()
say('5. One price for everyone on the realistic base: change in 2028 profit by share of orders kept')
basev = y2028(R50)['operating_profit_with_credentialing']
for vol in [1.0, 0.97, 0.95, 0.92, 0.90, 0.88, 0.85, 0.80, 0.70]:
    parts = []
    for gain, price in [(97, 985), (194, 1085), (291, 1185), (388, 1285), (583, 1485)]:
        s = deepcopy(R50)
        for c in ('google', 'organic_ai_other', 'f1_recovery', 'f2_conversion'):
            x, b, z = s[c]; s[c] = (x, b * vol, z * vol)
        A['retail_contribution'] = base_c + gain
        d = y2028(s)['operating_profit_with_credentialing'] - basev
        A['retail_contribution'] = base_c
        parts.append(f"${price}: {d/1e3:+5.0f}K")
    say(f"     orders x{vol:.2f}   " + '   '.join(parts))

say()
say('6. Lifetime value of one order, and how many orders a price step can lose before lifetime value falls')
vm_month = 47.60            # P1-05: contribution per mail account per month after refunds and bad debt
for label, attach, churn, ra_first in [('low', 0.27, 0.027, 0.50), ('mid', 0.27, 0.022, 0.60), ('high', 0.27, 0.017, 0.65)]:
    vm = attach * vm_month / churn
    ra = (1 - attach) * ra_first * A['ra_price_net'] / (1 - A['ra_later_renewal'])
    form = A['retail_contribution'] + A['scorp_attach'] * A['scorp_net']
    life = form + vm + ra
    steps = '  '.join(f"${p}: {((p-885)*0.971)/(life+(p-885)*0.971):.0%}" for p in (985, 1085, 1185, 1285, 1485))
    say(f"     {label:4s} formation ${form:,.0f} + mail ${vm:,.0f} + RA ${ra:,.0f} = ${life:,.0f} undiscounted. Break-even order loss -> {steps}")
one_year = 732              # docs/price-test-985.md: 12-month value of a lost order
say("     one-year view ($732 per lost order, price-test-985.md): " +
    '  '.join(f"${p}: {((p-885)*0.971)/(one_year+(p-885)*0.971):.0%}" for p in (985, 1085, 1185, 1285, 1485)))

say()
say('7. On-track path for the program adopted Nov 13 (price held at $885), every input at its expected value from odds_sim_2028.py')
ON = deepcopy(T)
ON.update(partner=(0, 0, 0), organic_ai_other=(25, 26.0, 27.0), google=(30, 33.4, 34.8), bing=(0, 1.8, 1.8),
          f1_recovery=(0, 3.75, 3.75), f2_conversion=(0, 3.15, 4.5), vm_attach=0.275, vm_churn=0.022,
          ra_first_renewal=0.675, cred_jobs=(0, 0, 0))
on_rows = M.run(ON)
for m in ('2026-11', '2027-03', '2027-06', '2027-09', '2027-12', '2028-06', '2028-12'):
    r = next(x for x in on_rows if x['month'] == m)
    say(f"     {m}  orders/mo {r['orders_total']:5.1f}  mail subs {r['vm_subs_end']:5.0f}  RA renewals paid/mo {r['ra_renewals']:5.1f}  "
        f"formations+mail+RA profit/mo ${r['operating_profit']:,}")
say(f"     2028 formations + mail + RA: ${M.year_sum(on_rows, 2028, 'operating_profit'):,}. Credentialing, Metro and the product items sit outside the model; "
    "the simulation's median for the whole program is about $848K.")

if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('--out')
    args = ap.parse_args()
    if args.out:
        with open(os.path.join(HERE, os.path.basename(args.out)), 'w') as f:
            f.write('\n'.join(OUT) + '\n')
