#!/usr/bin/env python3
"""
P2-11 first-pass 2028 model (Nov 11 2026). Monthly, Nov 2026 - Dec 2028.

Run:  python3 scripts/model_2028.py            (writes reports/p2-11-model-2026-11-11/)

Every assumption is in ASSUMPTIONS / SCENARIOS below with its source. Rules from the
P2-11 checklist this model follows:
  - each formation counted once, under one primary channel
  - VM = opening balance - churn + new paid starts, with a lag from formation
  - RA billed only when a formation reaches its first renewal (12 months), VM clients excluded
  - ads and partner fees deducted once; no labor line (Sid, Nov 9); owner pay shown below operating profit
  - credentialing, PC, affiliates = $0 in the base; shown only as a labeled upside row
"""
from __future__ import annotations

import csv
import json
import os
from copy import deepcopy

OUT = os.path.join(os.path.dirname(__file__), '..', 'reports', 'p2-11-model-2026-11-11')

# ---------------------------------------------------------------- months
def month_list(start=(2026, 11), end=(2028, 12)):
    y, m = start
    out = []
    while (y, m) <= end:
        out.append(f'{y}-{m:02d}')
        m += 1
        if m == 13:
            y, m = y + 1, 1
    return out

MONTHS = month_list()

# ---------------------------------------------------------------- shared assumptions
A = {
    # Unit economics (P1-03 Nov 8: $885 list, $345 filing/notices/cert, card fee, 0.5% bad debt)
    'retail_contribution': 514.0,
    # S-corp add-on: 17.3% attach x $195 net of card fee (revenue levers plan)
    'scorp_attach': 0.173,
    'scorp_net': 195 * (1 - 0.029) - 0.30,
    # Partner orders: referral = client pays $860, we pay $75 fee -> 514 - 25 - 75; wholesale ~ $800 (offset $85)
    'partner_contribution': 420.0,
    # Google: October ~ $103 CPA at tCPA $105 hold; incremental orders at the $150 allowance (decision log Nov 9)
    'google_base_orders': 30,
    'google_base_cpa': 105.0,
    'google_incremental_cpa': 150.0,
    # Bing, when reinstated: assume same incremental CPA
    'bing_cpa': 150.0,
    # VM (P1-05): $50/mo, 2.4%/mo churn, 27% mature 90-day attach; 96 active + 23 trialing on Nov 8
    'vm_price_net': 50 * (1 - 0.029) - 0.30,
    'vm_open_active': 96,
    'vm_open_trialing': 23,
    'vm_trial_convert': 0.80,
    'vm_lag_months': 2,           # formation -> first paid VM month (OP approval + 1 free month)
    'vm_partner_attach_factor': 0.5,
    # Metro VM: 16 clients (12 billing Dec 9 + 4 awaiting card), ~$23.47 to us per charge
    'metro_vm_subs': 14,
    'metro_vm_net': 23.47,
    # RA: $99/yr after the free first year; non-VM retail formations only
    'ra_price_net': 99 * (1 - 0.029) - 0.30,
    'ra_later_renewal': 0.85,
    # Historic formations before Nov 2026 (for RA renewals and existing book). Apr-Oct 2026 actual (P1-05);
    # Nov 2025-Mar 2026 not pulled here: assume 45/mo [U]
    'history': {
        '2025-11': 45, '2025-12': 45, '2026-01': 45, '2026-02': 45, '2026-03': 45,
        '2026-04': 48, '2026-05': 58, '2026-06': 47, '2026-07': 47, '2026-08': 48,
        '2026-09': 51, '2026-10': 68,
    },
    'history_vm_attach': 0.27,
    # Overhead: Relay actual ~$1,365/mo + Spiffy $99 (P1-03 3a). Staffing step when volume needs it.
    'overhead_month': 1365 + 99,
    'staff_threshold_orders': 90,   # formations/month above which Sid alone is assumed not to keep up [I]
    'staff_cost_month': 5000,       # part-time ops help [I]
    # Owner pay (Gusto, all Sid): below operating profit
    'owner_pay_month': 10820,
}

# ---------------------------------------------------------------- scenarios
# Channel paths are (value at Nov 2026, value at Dec 2027, value at Dec 2028), linear in between.
SCENARIOS = {
    'downside': {
        'google': (30, 30, 30),
        'organic_ai_other': (25, 26, 27),
        'f1_recovery': (0, 0, 0),          # capture stays broken
        'f2_conversion': (0, 0, 0),
        'bing': (0, 0, 0),
        'partner': (0, 2, 3),
        'vm_attach': 0.22,
        'vm_churn': 0.03,
        'ra_first_renewal': 0.55,
        'upside_services_month': 0,
    },
    'target': {
        'google': (30, 36, 37),            # F4 +7 central (plan Section 2)
        'organic_ai_other': (25, 30, 36),  # F6 organic/AI ~+20%/yr [I]
        'f1_recovery': (0, 6, 6),          # F1 +6 once capture is fixed (P1-07)
        'f2_conversion': (0, 4, 6),        # F2 +6 central
        'bing': (0, 4, 4),                 # F5 +4 if reinstated
        'partner': (0, 15, 25),            # F7 partner row: plan hurdle 25-30
        'vm_attach': 0.27,
        'vm_churn': 0.024,
        'ra_first_renewal': 0.65,          # plan Section 5 target
        'upside_services_month': 0,
    },
    'strong': {
        'google': (30, 38, 40),
        'organic_ai_other': (25, 33, 42),
        'f1_recovery': (0, 6, 8),
        'f2_conversion': (0, 6, 8),
        'bing': (0, 4, 5),
        'partner': (0, 22, 35),
        'vm_attach': 0.30,
        'vm_churn': 0.02,
        'ra_first_renewal': 0.75,
        'upside_services_month': 0,
    },
}

CHANNELS = ['google', 'organic_ai_other', 'f1_recovery', 'f2_conversion', 'bing', 'partner']


def path_value(p, i):
    """Linear path: index 0 = Nov 2026, index 13 = Dec 2027, index 25 = Dec 2028."""
    a, b, c = p
    if i <= 13:
        return a + (b - a) * i / 13
    return b + (c - b) * (i - 13) / 12


def run(s: dict) -> list[dict]:
    rows = []
    vm_subs = A['vm_open_active'] + A['vm_open_trialing'] * A['vm_trial_convert']
    metro = A['metro_vm_subs']
    formations_by_month = dict(A['history'])
    vm_starts_due: dict[str, float] = {}
    retail_by_month = {k: v for k, v in A['history'].items()}  # history treated as retail
    vm_attach_by_month = {k: A['history_vm_attach'] for k in A['history']}
    # RA book: track each formation cohort's surviving RA payers by month offset
    for i, m in enumerate(MONTHS):
        ch = {c: path_value(s[c], i) for c in CHANNELS}
        retail = sum(v for c, v in ch.items() if c != 'partner')
        partner = ch['partner']
        total = retail + partner
        formations_by_month[m] = total
        retail_by_month[m] = retail
        vm_attach_by_month[m] = s['vm_attach']

        # Formation contribution
        contrib = retail * (A['retail_contribution'] + A['scorp_attach'] * A['scorp_net']) \
            + partner * (A['partner_contribution'] + A['scorp_attach'] * A['scorp_net'])

        # Ads: base Google orders at base CPA, increments at allowance; Bing at its CPA.
        g = ch['google']
        ads = min(g, A['google_base_orders']) * A['google_base_cpa'] \
            + max(0.0, g - A['google_base_orders']) * A['google_incremental_cpa'] \
            + ch['bing'] * A['bing_cpa']

        # VM: new paid starts arrive lag months after formation
        new_vm = (retail + partner * A['vm_partner_attach_factor']) * s['vm_attach']
        idx = MONTHS.index(m) + A['vm_lag_months']
        if idx < len(MONTHS):
            vm_starts_due[MONTHS[idx]] = vm_starts_due.get(MONTHS[idx], 0) + new_vm
        vm_subs = vm_subs * (1 - s['vm_churn']) + vm_starts_due.get(m, 0)
        metro = metro * (1 - s['vm_churn'])
        vm_rev = vm_subs * A['vm_price_net'] + metro * A['metro_vm_net']

        # RA: cohorts formed 12, 24, 36 months earlier, non-VM retail only
        y, mo = int(m[:4]), int(m[5:])
        ra_payers = 0.0
        for back in (12, 24, 36):
            yy, mm = y, mo - back
            while mm <= 0:
                mm += 12
                yy -= 1
            key = f'{yy}-{mm:02d}'
            base = retail_by_month.get(key)
            if base is None:
                continue
            nonvm = base * (1 - vm_attach_by_month.get(key, A['history_vm_attach']))
            survive = s['ra_first_renewal'] * (A['ra_later_renewal'] ** ((back // 12) - 1))
            ra_payers += nonvm * survive
        ra_rev = ra_payers * A['ra_price_net']

        overhead = A['overhead_month'] + (A['staff_cost_month'] if total > A['staff_threshold_orders'] else 0)
        op = contrib + vm_rev + ra_rev - ads - overhead
        rows.append({
            'month': m,
            **{f'orders_{c}': round(v, 1) for c, v in ch.items()},
            'orders_total': round(total, 1),
            'formation_contribution': round(contrib),
            'ads': round(ads),
            'vm_subs_end': round(vm_subs, 1),
            'vm_revenue_net': round(vm_rev),
            'ra_renewals': round(ra_payers, 1),
            'ra_revenue_net': round(ra_rev),
            'overhead': round(overhead),
            'operating_profit': round(op),
            'owner_pay': A['owner_pay_month'],
            'after_owner_pay': round(op - A['owner_pay_month']),
            'upside_services_not_in_base': s['upside_services_month'],
        })
    return rows


def year_sum(rows, year, key):
    return sum(r[key] for r in rows if r['month'].startswith(str(year)))


def summarize(rows):
    keys = ['orders_total', 'formation_contribution', 'ads', 'vm_revenue_net', 'ra_revenue_net',
            'overhead', 'operating_profit', 'after_owner_pay']
    out = {}
    for y in (2027, 2028):
        out[y] = {k: round(year_sum(rows, y, k)) for k in keys}
        dec = next(r for r in rows if r['month'] == f'{y}-12')
        out[y]['orders_per_month_dec'] = dec['orders_total']
        out[y]['vm_subs_dec'] = dec['vm_subs_end']
    return out


def sensitivity():
    """Flex one target-case input at a time; report the change in 2028 operating profit."""
    base = year_sum(run(SCENARIOS['target']), 2028, 'operating_profit')
    tests = {
        'Partner orders 2028 end -10/mo (25 -> 15)': ('partner', (0, 10, 15)),
        'Organic/AI 2028 end -8/mo (36 -> 28)': ('organic_ai_other', (25, 27, 28)),
        'Google 2028 end -7/mo (37 -> 30)': ('google', (30, 30, 30)),
        'Abandoned-checkout recovery never fixed (F1 = 0)': ('f1_recovery', (0, 0, 0)),
        'Bing stays blocked': ('bing', (0, 0, 0)),
        'VM attach 27% -> 22%': ('vm_attach', 0.22),
        'VM churn 2.4% -> 3.0%/mo': ('vm_churn', 0.03),
        'RA first renewal 65% -> 55%': ('ra_first_renewal', 0.55),
    }
    res = []
    for label, (k, v) in tests.items():
        s = deepcopy(SCENARIOS['target'])
        s[k] = v
        delta = year_sum(run(s), 2028, 'operating_profit') - base
        res.append((label, round(delta)))
    # contribution per order -$50
    saved = A['retail_contribution']
    A['retail_contribution'] = saved - 50
    res.append(('Retail contribution per order -$50',
                round(year_sum(run(SCENARIOS['target']), 2028, 'operating_profit') - base)))
    A['retail_contribution'] = saved
    res.sort(key=lambda x: x[1])
    return base, res


def main():
    os.makedirs(OUT, exist_ok=True)
    summary = {}
    for name, s in SCENARIOS.items():
        rows = run(s)
        with open(os.path.join(OUT, f'monthly-{name}.csv'), 'w', newline='') as f:
            w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
            w.writeheader()
            w.writerows(rows)
        summary[name] = summarize(rows)
    base, sens = sensitivity()
    with open(os.path.join(OUT, 'summary.json'), 'w') as f:
        json.dump({'scenarios': summary, 'sensitivity_target_2028': {'base': base, 'deltas': sens}}, f, indent=2)
    print(json.dumps({'scenarios': summary, 'sensitivity': sens, 'target_2028_op': base}, indent=2))


if __name__ == '__main__':
    main()
