#!/usr/bin/env python3
"""
P2-11 first-pass 2028 model (Nov 11 2026). Monthly, Nov 2026 - Dec 2028.

Run:  python3 scripts/model_2028.py                     (writes reports/p2-11-model-2026-11-11/, unchanged)
      python3 scripts/model_2028.py --pass 2026-11-18   (second pass: product mix, cash view, working case,
                                                         Metro RA line; writes reports/p2-11-model-2026-11-18/)

Second pass (Nov 18 2026), all opt-in so the Nov 11 outputs and every script that imports this module are unchanged:
  - product mix (NY PLLC, NY LLC, foreign PLLC/LLC/PC into NY, out-of-state formations) from live CRM data,
    separate from acquisition channel: scenario key 'product_mix': True
  - cash view next to operating profit (installments, filing-fee timing, partner payout lag, credentialing
    upkeep billed annually): run(s, detail=True)
  - ads, partner referral fees, paid staffing, credentialing labor and shared overhead as separate lines, each once
  - 'working' case (EXTRA_SCENARIOS) = the program adopted Nov 13, as in the pressure test's model_checks.py section 7
  - Day-45 proposal section 7 item 8: actual Nov 2025-Mar 2026 orders (CORRECTIONS_2026_11_18), applied only in the pass
  - Metro RA renewals (Sid, Nov 18): their own line at the measured 17% collection rate, 40% as a sensitivity
    (METRO_RA_2026_11_18, scenario key 'metro_ra'). The pre-Metro Nov 18 outputs still regenerate with
    --pass 2026-11-18 --without-metro-ra --out DIR

Every assumption is in ASSUMPTIONS / SCENARIOS below with its source. Rules from the
P2-11 checklist this model follows:
  - each formation counted once, under one primary channel
  - VM = opening balance - churn + new paid starts, with a lag from formation
  - RA billed only when a formation reaches its first renewal (12 months), VM clients excluded
  - ads and partner fees deducted once; no labor line (Sid, Nov 9); owner pay shown below operating profit
  - credentialing: its own line, reported both with and without (labeled scenario, not base)
  - PC, CAQH-only, affiliates = $0
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
    # Insurance credentialing (launched Nov 3 2026). Shown as its own line, reported with and without.
    # Avg job: Danielle $2,210 paid, Gabriella $894 invoiced, Nicole + Nick quoted $1,795 (Nov 11) -> ~$1,670 [T]
    'cred_avg_job': 1670.0,
    'cred_cash_cost_job': 35.0,          # postage, notary, misc (expansion plan 3.4)
    'cred_card_fee': 0.03,
    'cred_sid_jobs_month': 3,            # Sid's capacity before paid help (plan 3.4: hire at ~3+/mo)
    'cred_labor_per_extra_job': 450.0,   # ~13 h x $35/h coordinator for jobs above Sid's capacity [I]
    'cred_upkeep_attach': 0.40,          # plan 3.4 (go bar is 30%)
    'cred_upkeep_month_net': 249 / 12 * 0.97,
    'cred_upkeep_churn': 0.02,           # [I]

    # ------------------------------------------------------------ second pass (Nov 18 2026), opt-in
    # Product mix of retail formation orders, Apr 1 - Nov 18 2026 (400 formation orders), from
    # reports/p2-11-model-2026-11-18/crm-product-mix-output.txt section B [M]. Contribution = net revenue incl. add-ons
    # - stored COGS snapshot - 3% - $0.30 - 0.5% bad debt [M]. NY PLLC uses the model's own figure
    # (retail_contribution + S-corp add-on = $547; measured $547-550), so the sensitivity tests still move it.
    # plan = share on the 4-payment plan [M]. ra = needs our NY registered agent (out-of-state formations do not) [A].
    'products': {
        'ny_pllc':        {'share': 0.948, 'contribution': None,  'cogs': 345, 'plan': 0.42, 'ra': True},
        'ny_llc':         {'share': 0.020, 'contribution': 268.0, 'cogs': 320, 'plan': 0.13, 'ra': True},
        'foreign_pllc':   {'share': 0.018, 'contribution': 662.0, 'cogs': 335, 'plan': 0.0,  'ra': True},
        'foreign_llc_pc': {'share': 0.008, 'contribution': 466.0, 'cogs': 338, 'plan': 0.0,  'ra': True},
        'out_of_state':   {'share': 0.008, 'contribution': 176.0, 'cogs': 330, 'plan': 0.0,  'ra': False},
    },
    # Partner orders are all NY PLLC in the data (6 of 6 since April) [M]; split out the $75 referral fee so it is
    # its own line (partner_contribution 420 = 495 gross - 75 fee; no change to operating profit).
    'partner_referral_fee': 75.0,
    'partner_plan_share': 0.42,          # same as retail NY PLLC [A]
    # Cash timing (months after the order month). Installments: 4 payments at day 0/14/28/42, 99.3% collected
    # (crm-product-mix-output.txt C2) [M]; with order days spread evenly through the month that is 40% / 50% / 10%
    # in months 0 / 1 / 2 [E].
    'cash_plan_schedule': (0.40, 0.50, 0.10),
    # COGS: $10 NYSED review at order; state filing fee + $50 legal notice when DOS is filed (median 63-93 days after
    # the order, section D) [M] -> 25% / 50% / 25% in months 2 / 3 / 4 [E]; $50 certificate of publication about
    # 1.5 months later -> months 4 / 5 [E].
    'cash_cogs_m0': 10.0,
    'cash_cogs_dos_schedule': {2: 0.25, 3: 0.50, 4: 0.25},
    'cash_cogs_certpub': 50.0,
    'cash_certpub_schedule': {4: 0.5, 5: 0.5},
    # Partner payouts: median 51 days from accrual to paid (section E, 7 paid) [M] -> month 2.
    'cash_partner_fee_lag': 2,
    # Credentialing: invoiced up front once the client confirms insurers (Sid, Nov 14; PLLC-CRM
    # credentialing-panel-status.md) -> cash in the job month [A]. Upkeep $249/yr billed annually in advance [A].
}

# Day-45 re-cut proposal (ops/p2-12-day45-recut-proposal-2026-11-14.md) section 7 item 8: actual orders for
# Nov 2025 - Mar 2026 (crm_queries.cjs B1, Eastern time) replace the assumed 45/month [M]. Applied in the Nov 18
# pass only (apply_corrections_2026_11_18), never to the Nov 11 outputs.
CORRECTIONS_2026_11_18 = {
    'history': {'2025-11': 24, '2025-12': 32, '2026-01': 51, '2026-02': 34, '2026-03': 39},
}

# Metro Partner RA renewals (Sid's decision Nov 18 2026: add at today's measured 17% collection rate; raise it only
# if Metro puts cards on file). Metro's clients are Metro's own formation/publishing customers on Metro's Stripe
# account; we get a 50% split through Stripe Connect (PLLC-CRM memory-bank/features/partner-ra.md). They are not our
# formation orders, so they never enter the RA line above (retail formations only), and Metro VM orders get no RA
# record. CRM check Nov 18: of 1,730 live Metro RA clients, 9 share a company name with one of our PLLCs and 0 have
# our own live RA subscription [M]. Counts from a read-only CRM pull, Nov 18 2026 (README section 7).
METRO_RA_2026_11_18 = {
    # 377 paid of 2,271 invoices sent Apr-Jul 2026 (16.6%); every one of those invoices is now paid or voided [M].
    'collection': 0.17,
    # Day-45 re-cut section 6: the pass bar for first-invoice collection if Metro puts cards on file [A].
    'collection_sensitivity': 0.40,
    # Our share per paid renewal: 50% of $99 after Stripe's fee = $47.92 (422 of 423 payments; avg $47.91) [M].
    'net_per_paid': 47.92,
    # Live clients' renewal dates (Eastern), Nov 2026 - Nov 2027 [M]. 'first' = TRIALING (first invoice after the free
    # year); 'repeat' = ACTIVE (paid before). 65 renewals dated Jul-Oct 2026 with open invoices are left out.
    'due_first': {'2026-11': 38, '2026-12': 38, '2027-01': 50, '2027-02': 45, '2027-03': 86, '2027-04': 157,
                  '2027-05': 164, '2027-06': 104, '2027-07': 111, '2027-08': 108, '2027-09': 118,
                  '2027-10': 152, '2027-11': 84},
    'due_repeat': {'2027-03': 1, '2027-04': 31, '2027-05': 87, '2027-06': 121, '2027-07': 119, '2027-08': 34,
                   '2027-09': 10, '2027-10': 5, '2027-11': 2},
    # New Metro RA clients a month: Aug-Oct 2026 average of 108, 120, 152 [M], held flat through 2028 [A]. Their first
    # invoice is due 12 months after the order. November 2026 so far is in due_first; the rest of November at the
    # same pace is 127 - 84 = 43 [E].
    'new_clients_month': 127,
    'new_clients_rest_of_2026_11': 43,
    # Every invoice, first or repeat, is collected at the same rate; unpaid clients are cancelled by the dunning
    # flow and get no further invoice [M rule]. Cash lands in the renewal month in both views: invoices go out about
    # 30 days before the renewal date and paid ones are paid a median 21-24 days after sending [M].
}


def metro_ra(rate: float, repeat_rate: float | None = None, new_rate: float | None = None,
             new_repeat_rate: float | None = None) -> dict:
    """Metro RA renewals by month: invoices, paid renewals, our net. 'existing' = clients in the CRM on Nov 18;
    'new' = clients who start from Nov 19 2026. Rates default to `rate` for every invoice."""
    P = METRO_RA_2026_11_18
    r_e1 = rate
    r_er = rate if repeat_rate is None else repeat_rate
    r_n1 = rate if new_rate is None else new_rate
    r_nr = new_repeat_rate if new_repeat_rate is not None else (repeat_rate if repeat_rate is not None else r_n1)
    starts = {m: (P['new_clients_rest_of_2026_11'] if m == '2026-11' else P['new_clients_month']) for m in MONTHS}
    paid_e, paid_n, out = {}, {}, {}
    for m in MONTHS:
        prev = add_months(m, -12)
        e1, er = P['due_first'].get(m, 0), P['due_repeat'].get(m, 0) + paid_e.get(prev, 0.0)
        n1, nr = starts.get(prev, 0), paid_n.get(prev, 0.0)
        paid_e[m] = e1 * r_e1 + er * r_er
        paid_n[m] = n1 * r_n1 + nr * r_nr
        paid = paid_e[m] + paid_n[m]
        out[m] = {'invoices': e1 + er + n1 + nr, 'paid': paid, 'net': paid * P['net_per_paid']}
    return out


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
        'cred_jobs': (1, 1, 1),            # roughly today's pace, no hire
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
        'cred_jobs': (2, 4, 6),            # 5+ interested now; checkout question + 29-lead email + page
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
        'cred_jobs': (2, 6, 10),           # also sold through partners (accountants, practice consultants)
    },
}

CHANNELS = ['google', 'organic_ai_other', 'f1_recovery', 'f2_conversion', 'bing', 'partner']

# Second-pass scenarios, kept out of SCENARIOS so the Nov 11 run writes exactly what it wrote before.
# 'working': the program adopted Nov 13 (price held at $885, no partner target), every input at its expected value,
# as in reports/evidence/2028-pressure-test-2026-11-13/model_checks.py section 7 [E]. Credentialing follows the
# Day-45 on-track targets (under 1 now -> 7 a month by Dec 2027, Day-45 proposal section 4) and is held at 7 in
# 2028 [A]; it stays its own line.
EXTRA_SCENARIOS = {
    'working': {
        **SCENARIOS['target'],
        'partner': (0, 0, 0),
        'organic_ai_other': (25, 26.0, 27.0),
        'google': (30, 33.4, 34.8),
        'bing': (0, 1.8, 1.8),
        'f1_recovery': (0, 3.75, 3.75),
        'f2_conversion': (0, 3.15, 4.5),
        'vm_attach': 0.275,
        'vm_churn': 0.022,
        'ra_first_renewal': 0.675,
        'cred_jobs': (1, 7, 7),
    },
}


def path_value(p, i):
    """Linear path: index 0 = Nov 2026, index 13 = Dec 2027, index 25 = Dec 2028."""
    a, b, c = p
    if i <= 13:
        return a + (b - a) * i / 13
    return b + (c - b) * (i - 13) / 12


def add_months(key: str, k: int) -> str:
    y, m = int(key[:4]), int(key[5:]) + k
    while m > 12:
        m -= 12
        y += 1
    while m <= 0:
        m += 12
        y -= 1
    return f'{y}-{m:02d}'


def product_table(s: dict) -> dict:
    """Retail product mix for a scenario. Without 'product_mix' every retail order is a NY PLLC (Nov 11 basis)."""
    ny_pllc_c = A['retail_contribution'] + A['scorp_attach'] * A['scorp_net']
    if not s.get('product_mix'):
        p = A['products']['ny_pllc']
        return {'ny_pllc': {**p, 'share': 1.0, 'contribution': ny_pllc_c}}
    out = {}
    for name, p in A['products'].items():
        out[name] = {**p, 'contribution': ny_pllc_c if p['contribution'] is None else p['contribution']}
    tot = sum(p['share'] for p in out.values())
    for p in out.values():
        p['share'] = p['share'] / tot
    return out


def _cohort_cash(flows: dict, month: str, retail: float, partner: float, prods: dict) -> None:
    """Spread one order-month cohort's cash over the following months (cash view only)."""
    def put(k, line, v):
        key = add_months(month, k)
        flows.setdefault(key, {}).setdefault(line, 0.0)
        flows[key][line] += v
    sched = A['cash_plan_schedule']
    groups = [(retail * p['share'], p['contribution'] + p['cogs'], p['plan'], p['cogs']) for p in prods.values()]
    if partner:
        gross = A['partner_contribution'] + A['scorp_attach'] * A['scorp_net'] + A['partner_referral_fee']
        groups.append((partner, gross + A['products']['ny_pllc']['cogs'], A['partner_plan_share'],
                       A['products']['ny_pllc']['cogs']))
        put(A['cash_partner_fee_lag'], 'cash_partner_fees_out', partner * A['partner_referral_fee'])
    for n, inflow, plan, cogs in groups:
        if not n:
            continue
        put(0, 'cash_formation_in', n * inflow * (1 - plan))
        for k, f in enumerate(sched):
            put(k, 'cash_formation_in', n * inflow * plan * f)
        put(0, 'cash_cogs_out', n * A['cash_cogs_m0'])
        dos = cogs - A['cash_cogs_m0'] - A['cash_cogs_certpub']
        for k, f in A['cash_cogs_dos_schedule'].items():
            put(k, 'cash_cogs_out', n * dos * f)
        for k, f in A['cash_certpub_schedule'].items():
            put(k, 'cash_cogs_out', n * A['cash_cogs_certpub'] * f)


def run(s: dict, detail: bool = False) -> list[dict]:
    """Monthly model. detail=False returns exactly the Nov 11 columns. detail=True adds the product split,
    the separately deducted cost lines and the cash view (second pass, Nov 18)."""
    rows = []
    prods = product_table(s)
    retail_unit = sum(p['share'] * p['contribution'] for p in prods.values())
    ra_share = sum(p['share'] for p in prods.values() if p['ra'])
    vm_subs = A['vm_open_active'] + A['vm_open_trialing'] * A['vm_trial_convert']
    metro = A['metro_vm_subs']
    cred_upkeep = 0.0
    formations_by_month = dict(A['history'])
    vm_starts_due: dict[str, float] = {}
    retail_by_month = {k: v for k, v in A['history'].items()}  # history treated as retail
    vm_attach_by_month = {k: A['history_vm_attach'] for k in A['history']}
    flows: dict[str, dict] = {}
    upkeep_adds: dict[str, float] = {}
    if detail:
        for hm, n in A['history'].items():
            _cohort_cash(flows, hm, n, 0.0, prods)
        if s.get('metro_ra'):
            metro_lines = metro_ra(METRO_RA_2026_11_18['collection'])
            metro_sens = metro_ra(METRO_RA_2026_11_18['collection_sensitivity'])
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
        contrib = retail * retail_unit \
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
            nonvm = base * ra_share * (1 - vm_attach_by_month.get(key, A['history_vm_attach']))
            survive = s['ra_first_renewal'] * (A['ra_later_renewal'] ** ((back // 12) - 1))
            ra_payers += nonvm * survive
        ra_rev = ra_payers * A['ra_price_net']

        jobs = path_value(s['cred_jobs'], i)
        extra = max(0.0, jobs - A['cred_sid_jobs_month'])
        cred_jobs_net = jobs * (A['cred_avg_job'] * (1 - A['cred_card_fee']) - A['cred_cash_cost_job']) \
            - extra * A['cred_labor_per_extra_job']
        cred_upkeep = cred_upkeep * (1 - A['cred_upkeep_churn']) + jobs * A['cred_upkeep_attach']
        cred_net = cred_jobs_net + cred_upkeep * A['cred_upkeep_month_net']

        staffing = A['staff_cost_month'] if total > A['staff_threshold_orders'] else 0
        overhead = A['overhead_month'] + staffing
        op = contrib + vm_rev + ra_rev - ads - overhead
        row = {
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
            'cred_jobs': round(jobs, 1),
            'cred_upkeep_clients': round(cred_upkeep, 1),
            'credentialing_net': round(cred_net),
            'operating_profit_with_credentialing': round(op + cred_net),
        }
        if detail:
            _cohort_cash(flows, m, retail, partner, prods)
            f = flows.get(m, {})
            # Credentialing cash: job fee up front; upkeep billed a year at a time (new, then anniversaries).
            upkeep_adds[m] = jobs * A['cred_upkeep_attach']
            annual = A['cred_upkeep_month_net'] * 12
            upkeep_billed = sum(upkeep_adds.get(add_months(m, -12 * k), 0.0)
                                * (1 - A['cred_upkeep_churn']) ** (12 * k) for k in (0, 1, 2))
            cred_cash = cred_jobs_net + upkeep_billed * annual
            fees = partner * A['partner_referral_fee']
            cash = f.get('cash_formation_in', 0) - f.get('cash_cogs_out', 0) - f.get('cash_partner_fees_out', 0) \
                + vm_rev + ra_rev - ads - overhead
            prod_orders = {f'orders_{k}': round(retail * p['share'] + (partner if k == 'ny_pllc' else 0), 1)
                           for k, p in prods.items()}
            row.update({
                **prod_orders,
                'formation_contribution_before_referral_fees': round(contrib + fees),
                'partner_referral_fees': round(fees),
                'shared_overhead': round(A['overhead_month']),
                'staffing': round(staffing),
                'cred_job_fees_net': round(jobs * (A['cred_avg_job'] * (1 - A['cred_card_fee']) - A['cred_cash_cost_job'])),
                'cred_labor': round(extra * A['cred_labor_per_extra_job']),
                'cred_upkeep_net': round(cred_upkeep * A['cred_upkeep_month_net']),
                'cash_formation_in': round(f.get('cash_formation_in', 0)),
                'cash_cogs_out': round(f.get('cash_cogs_out', 0)),
                'cash_partner_fees_out': round(f.get('cash_partner_fees_out', 0)),
                'cash_vm_in': round(vm_rev),
                'cash_ra_in': round(ra_rev),
                'cash_ads_out': round(ads),
                'cash_overhead_out': round(overhead),
                'cash_net': round(cash),
                'cash_after_owner_pay': round(cash - A['owner_pay_month']),
                'cash_credentialing_net': round(cred_cash),
                'cash_net_with_credentialing': round(cash + cred_cash),
                'ra_billed_annual_in_advance': round(ra_rev),
            })
            if s.get('metro_ra'):
                mr = metro_lines[m]
                mnet = mr['net']
                row.update({
                    'metro_ra_invoices': round(mr['invoices'], 1),
                    'metro_ra_paid': round(mr['paid'], 1),
                    'metro_ra_net': round(mnet),
                    'metro_ra_net_at_40pct_sensitivity': round(metro_sens[m]['net']),
                    'operating_profit_with_metro_ra': round(op + mnet),
                    'after_owner_pay_with_metro_ra': round(op + mnet - A['owner_pay_month']),
                    'operating_profit_with_metro_ra_and_credentialing': round(op + mnet + cred_net),
                    'cash_metro_ra_in': round(mnet),
                    'cash_net_with_metro_ra': round(cash + mnet),
                    'cash_after_owner_pay_with_metro_ra': round(cash + mnet - A['owner_pay_month']),
                    'cash_net_with_metro_ra_and_credentialing': round(cash + mnet + cred_cash),
                })
        rows.append(row)
    return rows


def year_sum(rows, year, key):
    return sum(r[key] for r in rows if r['month'].startswith(str(year)))


def summarize(rows):
    keys = ['orders_total', 'formation_contribution', 'ads', 'vm_revenue_net', 'ra_revenue_net',
            'overhead', 'operating_profit', 'after_owner_pay', 'cred_jobs', 'credentialing_net',
            'operating_profit_with_credentialing']
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


# ---------------------------------------------------------------- second pass (Nov 18 2026)
OUT_2026_11_18 = os.path.join(os.path.dirname(__file__), '..', 'reports', 'p2-11-model-2026-11-18')
PASS2_CASES = ['downside', 'target', 'strong', 'working']
YEARS = (2027, 2028)


def pass2_scenario(name: str, metro: bool = True) -> dict:
    s = deepcopy(SCENARIOS.get(name) or EXTRA_SCENARIOS[name])
    s['product_mix'] = True
    if metro:
        s['metro_ra'] = True
    return s


METRO_KEYS = ['metro_ra_invoices', 'metro_ra_paid', 'metro_ra_net', 'metro_ra_net_at_40pct_sensitivity',
              'operating_profit_with_metro_ra', 'after_owner_pay_with_metro_ra',
              'operating_profit_with_metro_ra_and_credentialing', 'cash_net_with_metro_ra',
              'cash_after_owner_pay_with_metro_ra', 'cash_net_with_metro_ra_and_credentialing']


def metro_ra_summary() -> dict:
    """Metro RA line by year at 17% [M], 40% [A], and two memo readings."""
    P = METRO_RA_2026_11_18
    runs = {
        'collection_17pct_M': metro_ra(P['collection']),
        'sensitivity_40pct_A': metro_ra(P['collection_sensitivity']),
        'memo_cards_on_new_orders_only_40pct_A': metro_ra(P['collection'], new_rate=P['collection_sensitivity']),
        'memo_past_payers_renew_at_85pct_A': metro_ra(P['collection'], repeat_rate=A['ra_later_renewal']),
    }
    out = {}
    for k, rows in runs.items():
        out[k] = {}
        for y in (2026,) + YEARS:
            ms = [m for m in MONTHS if m.startswith(str(y))]
            out[k][y] = {'invoices': round(sum(rows[m]['invoices'] for m in ms)),
                         'paid': round(sum(rows[m]['paid'] for m in ms)),
                         'net': round(sum(rows[m]['net'] for m in ms))}
    return out


class apply_corrections_2026_11_18:
    """Context manager: Day-45 section 7 item 8 history correction, undone on exit."""
    def __enter__(self):
        self.saved = dict(A['history'])
        A['history'].update(CORRECTIONS_2026_11_18['history'])

    def __exit__(self, *exc):
        A['history'].clear()
        A['history'].update(self.saved)


def ra_deferral(rows) -> dict:
    """Memo: RA is billed a year in advance. Both views book it when billed; an accrual P&L would spread each
    billing over 12 months. Deferred balance at each December (billings inside the model horizon only)."""
    out = {}
    for y in YEARS:
        end = f'{y}-12'
        bal = 0.0
        for r in rows:
            if r['month'] > end:
                continue
            months_in = (int(end[:4]) - int(r['month'][:4])) * 12 + int(end[5:]) - int(r['month'][5:]) + 1
            if months_in < 12:
                bal += r['ra_revenue_net'] * (12 - months_in) / 12
        out[y] = round(bal)
    return out


def summarize_pass2(rows, s) -> dict:
    prods = product_table(s)
    keys = ['orders_total', 'formation_contribution_before_referral_fees', 'partner_referral_fees',
            'formation_contribution', 'vm_revenue_net', 'ra_revenue_net', 'ads', 'shared_overhead', 'staffing',
            'operating_profit', 'after_owner_pay', 'cred_jobs', 'cred_job_fees_net', 'cred_labor', 'cred_upkeep_net',
            'credentialing_net', 'operating_profit_with_credentialing',
            'cash_formation_in', 'cash_cogs_out', 'cash_partner_fees_out', 'cash_net', 'cash_after_owner_pay',
            'cash_credentialing_net', 'cash_net_with_credentialing'] + [f'orders_{k}' for k in prods]
    out = {}
    defer = ra_deferral(rows)
    for y in YEARS:
        d = {k: round(year_sum(rows, y, k)) for k in keys}
        partner = year_sum(rows, y, 'orders_partner')
        d['contribution_by_product'] = {
            k: round((d[f'orders_{k}'] - (partner if k == 'ny_pllc' else 0)) * p['contribution'])
            for k, p in prods.items()}
        d['contribution_by_product']['partner_ny_pllc_after_fee'] = round(
            partner * (A['partner_contribution'] + A['scorp_attach'] * A['scorp_net']))
        dec = next(r for r in rows if r['month'] == f'{y}-12')
        d['orders_per_month_dec'] = dec['orders_total']
        d['vm_subs_dec'] = dec['vm_subs_end']
        d['memo_ra_deferred_balance_dec'] = defer[y]
        # check: every cost line deducted once -> components add back to operating profit
        comp = d['formation_contribution_before_referral_fees'] - d['partner_referral_fees'] + d['vm_revenue_net'] \
            + d['ra_revenue_net'] - d['ads'] - d['shared_overhead'] - d['staffing']
        d['check_components_minus_op'] = comp - d['operating_profit']
        if 'metro_ra_net' in rows[0]:
            for k in METRO_KEYS:
                d[k] = round(year_sum(rows, y, k))
            d['check_op_plus_metro_minus_total'] = d['operating_profit'] + d['metro_ra_net'] \
                - d['operating_profit_with_metro_ra']
            d['check_cash_plus_metro_minus_total'] = d['cash_net'] + d['metro_ra_net'] - d['cash_net_with_metro_ra']
        out[y] = d
    return out


def main_2026_11_18(metro: bool = True, out_dir: str = OUT_2026_11_18):
    os.makedirs(out_dir, exist_ok=True)
    summary, bridge = {}, {}
    for name in PASS2_CASES:
        base = SCENARIOS.get(name) or EXTRA_SCENARIOS[name]
        nov11 = year_sum(run(base), 2028, 'operating_profit')          # Nov 11 basis
        with apply_corrections_2026_11_18():
            hist = year_sum(run(base), 2028, 'operating_profit')       # + actual Nov 2025-Mar 2026 orders
            s = pass2_scenario(name, metro)
            rows = run(s, detail=True)                                   # + product mix (+ Metro RA line)
        with open(os.path.join(out_dir, f'monthly-{name}.csv'), 'w', newline='') as f:
            w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
            w.writeheader()
            w.writerows(rows)
        summary[name] = summarize_pass2(rows, s)
        bridge[name] = {'nov11_basis_2028_op': nov11,
                        'history_correction': hist - nov11,
                        'product_mix': summary[name][2028]['operating_profit'] - hist,
                        'nov18_2028_op': summary[name][2028]['operating_profit']}
        if metro:
            bridge[name]['metro_ra_line'] = summary[name][2028]['metro_ra_net']
            bridge[name]['nov18_with_metro_ra_2028_op'] = summary[name][2028]['operating_profit_with_metro_ra']
    mix = {k: {'share': p['share'], 'contribution': p['contribution'], 'cogs': p['cogs'], 'plan_share': p['plan'],
               'ra_eligible': p['ra']} for k, p in product_table({'product_mix': True}).items()}
    res = {'pass': '2026-11-18', 'product_mix': mix, 'bridge_2028_op': bridge, 'scenarios': summary}
    if metro:
        P = METRO_RA_2026_11_18
        res['metro_ra'] = {
            'inputs': {'collection_M': P['collection'], 'collection_sensitivity_A': P['collection_sensitivity'],
                       'net_per_paid_M': P['net_per_paid'], 'new_clients_month_M_held_flat_A': P['new_clients_month'],
                       'due_first_M': P['due_first'], 'due_repeat_M': P['due_repeat']},
            'by_year': metro_ra_summary()}
    with open(os.path.join(out_dir, 'summary.json'), 'w') as f:
        json.dump(res, f, indent=2)
    print(json.dumps(res, indent=2))


if __name__ == '__main__':
    import sys
    if '--pass' in sys.argv and sys.argv[sys.argv.index('--pass') + 1] == '2026-11-18':
        out_dir = sys.argv[sys.argv.index('--out') + 1] if '--out' in sys.argv else OUT_2026_11_18
        main_2026_11_18(metro='--without-metro-ra' not in sys.argv, out_dir=out_dir)
    else:
        main()
