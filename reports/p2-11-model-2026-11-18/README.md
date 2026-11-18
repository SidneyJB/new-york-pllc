# P2-11: 2028 model, second pass (Nov 18 2026)

**Prepared by:** Agent. **Decision owner:** Sid. **Due:** Nov 24 (P2-11). This pass closes the two open P2-11 items: (1) a monthly forecast that separates product mix from acquisition channel, and (2) costs deducted once, with a cash view shown next to operating profit. It builds on the [Nov 11 first pass](../p2-11-model-2026-11-11/README.md), which it leaves unchanged.

Tags: **[M]** measured · **[E]** estimate built on measured counts · **[A]** assumption nothing has measured yet.

**Files:**
- [model script](../../scripts/model_2028.py). The new parts are opt-in; the Nov 11 outputs and the Nov 13 `model_checks.py` regenerate byte-for-byte.
- Monthly output for each case: [working](monthly-working.csv) · [downside](monthly-downside.csv) · [target](monthly-target.csv) · [strong](monthly-strong.csv). Each file has channel columns, product columns, each cost line and the cash lines. The `metro_ra_*` and `*_with_metro_ra*` columns at the end are the Metro RA line (§7); every column before them is unchanged.
- [summary.json](summary.json)
- CRM evidence: [crm_product_mix.cjs](crm_product_mix.cjs) → [crm-product-mix-output.txt](crm-product-mix-output.txt). The script uses a read-only Postgres session and stops if the session isn't read-only. It prints counts only and names no client.

Operating profit means the same here as in P1-03 and the Nov 11 pass: before owner pay and before business taxes. Labor isn't a cost line (decision log, Nov 9). Only paid help is deducted: the staffing step and credentialing labor above Sid's three jobs a month.

## 1. Result

**Working case** = the program adopted Nov 13, with every input at its expected value. It's the same inputs as the pressure test's `model_checks.py` §7 and the Day-45 on-track table. Price stays at $885 and there's no partner target. Credentialing follows the Day-45 targets: under 1 job a month now, 7 a month by Dec 2027, then held at 7 through 2028 [A].

| 2028 | Downside | **Working** | Target | Strong |
|---|---:|---:|---:|---:|
| Formations (year) | 709 | **841** | 1,264 | 1,496 |
| Formations per month, Dec 2028 | 60 | **72** | 114 | 138 |
| **Operating profit** (formations, VM, RA) | **$513K** | **$649K** | **$814K** | **$986K** |
| **Cash** (formations, VM, RA) | **$515K** | **$653K** | **$833K** | **$1,014K** |
| Operating profit with credentialing | $534K | $769K | $905K | $1,122K |
| Cash with credentialing | $537K | $777K | $927K | $1,155K |
| Operating profit after Sid's pay ($10.8K/mo) | $384K | $519K | $684K | $856K |
| Cash after Sid's pay | $385K | $523K | $703K | $885K |

2027 operating profit / cash (formations, VM, RA): downside $432K / $431K · working $489K / $496K · target $567K / $596K · strong $615K / $655K.

**With the Metro RA line (§7, added Nov 18):** +$14.9K in 2028 in every case. Working case 2028: operating profit **$664K**, cash **$668K**; with credentialing $784K / $791K.

**Read:**
- **The product mix barely moves the model.** NY PLLCs are 95% of formation orders [M]. Splitting out the other products takes $5–9K off 2028 in each case, because NY LLCs and out-of-state formations earn far less per order. Foreign PLLCs earn more, but there are very few of them.
- **Cash runs a little ahead of operating profit while volume grows.** Customers pay within 6 weeks. The state fee and publication are paid about 3–5 months after the order. In the working case, cumulative cash is about **$23K above** cumulative operating profit by Dec 2028. That difference is money held for state fees not yet paid, so it isn't spare. In the target and strong cases the gap is $19–28K in 2028, because volume grows faster.
- **No month has negative cash in any case.** Every case starts above $30K a month.

## 2. Product mix, separate from channel

**Measured mix [M]:** formation orders Apr 1–Nov 18 2026 (400 orders, Eastern time; shares are rounded and renormalized in the model). Net revenue includes add-ons bought on the order (S-corp, DBA, expedite). Contribution = net revenue − stored COGS snapshot − 3% − $0.30 − 0.5% bad debt. Output §B.

| Product | Orders | Share | Net revenue / order | COGS | Contribution / order | On a payment plan | Needs our NY RA |
|---|---:|---:|---:|---:|---:|---:|---|
| NY PLLC (domestic) | 379 | 94.8% | $924 | $344 | **$547** | 42% | yes |
| NY LLC | 8 | 2.0% | $609 | $320 | $268 | 13% | yes |
| Foreign PLLC qualifying into NY | 7 | 1.8% | $1,033 | $335 | $662 | 0% | yes |
| Foreign LLC / PC qualifying into NY | 3 | 0.8% | $834 | $338 | $466 | 0% | yes |
| Out-of-state formation (NJ, IL, FL) | 3 | 0.8% | $525 | $330 | $176 | 0% | no [A] |
| *Non-formation services (RA change, counsel consent)* | *2* | — | — | — | — | — | *excluded* |

- No domestic NY PC was ordered in the period (PCs remain shelved). The data has one multi-entity group and no MSO pairs, so there's no MSO bundle line [M].
- **Reconciliation [M]:** retail NY PLLC orders Apr–Oct (340, partners excluded) average $550 contribution. The model uses $514 + the S-corp add-on = $547. NY PLLCs keep the model's own figure, so the Nov 11 sensitivity tests still apply.
- **Blended retail contribution:** $540 per order with the mix, against $547 before.
- **How it's modeled:** product shares are held at the measured mix in every channel and every month [A]. Product and channel are independent: channel sets how many orders come in, and the mix sets what each order earns. Partner orders are all NY PLLC (6 of 6 since April) [M]. Out-of-state formations are kept out of NY RA renewals [A]. VM attach is the same for every product [A], since the non-PLLC samples are too small to measure.

**2028 orders and contribution by product:**

| 2028 | Downside | Working | Target | Strong |
|---|---:|---:|---:|---:|
| NY PLLC orders (incl. partner) | 672 | 796 | 1,209 | 1,435 |
| NY LLC | 13 | 17 | 20 | 23 |
| Foreign PLLC into NY | 12 | 15 | 18 | 21 |
| Foreign LLC/PC into NY | 6 | 7 | 8 | 9 |
| Out-of-state formations | 6 | 7 | 8 | 9 |
| Contribution: NY PLLC retail | $350.7K | $435.2K | $527.0K | $594.0K |
| Contribution: NY PLLC partner, after the $75 fee | $13.8K | $0 | $110.9K | $157.8K |
| Contribution: all other products | $15.3K | $19.0K | $22.4K | $25.8K |

## 3. Each cost once, and the cash view

### 3a. Operating-profit lines, 2028

Each cost appears on one line only. Partner referral fees used to sit inside the $420 partner contribution. They now have their own line, and the total is unchanged ($420 = $495 gross − $75 fee). Every case passes the check that the lines add back to operating profit, with a difference of $3 or less from rounding.

| 2028 | Downside | Working | Target | Strong |
|---|---:|---:|---:|---:|
| Formation contribution before referral fees | $382.2K | $454.1K | $678.9K | $803.4K |
| Partner referral fees (cash payments) | −$2.3K | $0 | −$18.4K | −$26.1K |
| Virtual mail, net of card fees | $140.4K | $199.9K | $225.2K | $276.2K |
| RA renewals | $48.5K | $60.8K | $62.5K | $72.6K |
| Advertising (Google + Bing) | −$37.8K | −$48.5K | −$56.8K | −$62.3K |
| Shared overhead (Relay actuals + Spiffy) | −$17.6K | −$17.6K | −$17.6K | −$17.6K |
| Paid staffing (above 90 orders/month) | $0 | $0 | −$60.0K | −$60.0K |
| **Operating profit** | **$513.4K** | **$648.7K** | **$813.9K** | **$986.2K** |
| Credentialing jobs, net of card fee and cash cost | $19.0K | $133.1K | $96.7K | $155.3K |
| Credentialing paid labor (jobs above 3/month) | $0 | −$21.6K | −$11.3K | −$27.9K |
| Credentialing upkeep | $1.6K | $8.4K | $6.0K | $8.7K |

### 3b. Cash timing rules

| Line | Operating-profit view | Cash view | Source |
|---|---|---|---|
| Formation price + add-ons | Month of order | Pay in full: month 0. Payment plan (4 payments at days 0, 14, 28, 42): 40% / 50% / 10% in months 0 / 1 / 2. Plan share by product as in §2 | Timing and 99.3% collected [M] (output §C2). Monthly split [E] |
| NYSED review ($10) | Month of order | Month 0 | [A] |
| State filing fee + $50 legal notice | Month of order | 25% / 50% / 25% in months 2 / 3 / 4 | DOS filed a median 63–93 days after the order (§D) [M]. Spread [E] |
| $50 certificate of publication | Month of order | Months 4 / 5 | Completion a median 118–128 days after the order [M], but most entities aren't complete yet [E] |
| Partner referral fee | Month of order | Month 2 | Median 51 days from accrual to paid, 7 payouts (§E) [M] |
| Virtual mail | Monthly | Monthly | Billed monthly [M] |
| RA | Billing month (12, 24, 36) | Same | Billed a year in advance [M] |
| Ads, overhead, staffing, credentialing labor | Monthly | Monthly | [A] |
| Credentialing job | Job month | Job month | Invoiced up front once the client confirms insurers (Sid, Nov 14) [M rule], [A] that it's paid that month |
| Credentialing upkeep ($249/yr) | Monthly, 1/12 | Full year billed at start and on each anniversary | [A] |

Orders placed before the forecast start (Nov 2025–Oct 2026) still produce cash after Oct 2026: late installments, and state fees not yet paid. Those flows are included, so November 2026 opens with Oct 2026's installments coming in and Aug–Oct 2026's DOS fees going out.

**Memo:** RA is booked when billed in both views. An accrual P&L would defer the unearned part: about $16K at Dec 2027 and $30K at Dec 2028 in the working case [E], which would lower accrual operating profit by about $14K in 2028. P1-03 already found accrual below cash ($360K vs $418K). This model follows the cash-basis P1-03 definition.

### 3c. Working case by quarter: operating profit vs cash

Formations, VM and RA, then with credentialing. Cumulative gap = cash − operating profit with credentialing, running total.

| Period | Orders | Operating profit | Cash | Credentialing (OP / cash) | OP with cred | Cash with cred | Cumulative gap |
|---|---:|---:|---:|---:|---:|---:|---:|
| Nov–Dec 2026 | 111 | $64.5K | $70.1K | $3.9K / $4.1K | $68.5K | $74.2K | +$5.7K |
| Q1 2027 | 174 | $105.8K | $104.9K | $11.5K / $12.0K | $117.3K | $117.0K | +$5.4K |
| Q2 2027 | 183 | $117.0K | $119.5K | $17.3K / $18.0K | $134.2K | $137.4K | +$8.6K |
| Q3 2027 | 192 | $126.4K | $128.9K | $22.3K / $23.1K | $148.7K | $152.0K | +$11.9K |
| Q4 2027 | 201 | $140.0K | $142.5K | $27.4K / $28.4K | $167.4K | $170.9K | +$15.4K |
| Q1 2028 | 206 | $150.3K | $151.9K | $29.4K / $30.5K | $179.7K | $182.4K | +$18.1K |
| Q2 2028 | 209 | $158.5K | $159.3K | $29.8K / $30.8K | $188.3K | $190.1K | +$19.9K |
| Q3 2028 | 212 | $165.1K | $165.8K | $30.2K / $31.1K | $195.3K | $196.9K | +$21.5K |
| Q4 2028 | 214 | $174.9K | $175.7K | $30.6K / $31.5K | $205.4K | $207.2K | +$23.3K |

Monthly detail is in [monthly-working.csv](monthly-working.csv), in the `cash_*` columns next to `operating_profit`.

## 4. What changed vs the Nov 11 pass

2028 operating profit (formations, VM, RA), step by step:

| Case | Nov 11 basis | Actual Nov 2025–Mar 2026 orders | Product mix | Nov 18 |
|---|---:|---:|---:|---:|
| Downside | $519.9K | −$1.3K | −$5.2K | **$513.4K** |
| Working | $656.8K | −$1.6K | −$6.5K | **$648.7K** |
| Target | $823.2K | −$1.5K | −$7.7K | **$813.9K** |
| Strong | $996.7K | −$1.8K | −$8.7K | **$986.2K** |

The working case's Nov 11 basis matches the $655K in `model_checks.py` §7 once that script's history correction is applied.

- **Added:** product split; cash view; separate lines for referral fees, staffing and shared overhead; the working case.
- **Unchanged:** every channel path, unit price, VM, RA and credentialing assumption. The Nov 11 folder isn't rewritten.

**Day-45 proposal §7 corrections and the model:**

| §7 item | Effect on the model | Applied? |
|---|---|---|
| 8. Nov 2025–Mar 2026 orders were 24, 32, 51, 34, 39, not 45 a month | Fewer RA renewals in 2027–28 (−$1.3K to −$1.8K in 2028) | **Yes, in this pass only**, as `CORRECTIONS_2026_11_18`. The CRM count here (output §A, formations only) is 23, 33, 51, 33, 40: the same 180 total, with small month-boundary differences. |
| 1. 49–68 orders a month since April, pace 55 in November | None: the model's Nov 2026 is 55. Actual Nov 1–18 is 37 formation orders [M] | No change |
| 6. Metro RA renewals, about $30K a year [E] | Its own line, §7: $14.4K in 2027 and $14.9K in 2028 at 17% | **Yes, Nov 18** (Sid's decision), as a separate line. At the measured 17% it's about half the $30K estimate |
| 6. Payment-plan buyers take VM and S-corp more often | Already inside the measured mix and contribution; VM attach unchanged | No change |
| 2–5, 7 (odds, ceiling, behavioral-health share, price by profession, 90-day table) | Plan text, not model inputs | n/a |

Not changed, but worth knowing: RA first renewal is 4 paid of 9 due so far [M]. The working case uses 67.5%; at 50%, 2028 drops about $14K (pressure test §2).

## 5. Limits

- The non-PLLC products have 3–8 orders each, so their shares and contributions are directional [M, small n].
- Filing-fee timing rests on medians from entities that have already filed. Q3 2026 orders are filing slowly (66 of 144 filed), so actual fees may land later than modeled. If so, cash runs further ahead of operating profit for a while; the totals don't change.
- Business taxes and owner distributions are below both views, as before.

## 6. Re-run

From `new-york-pllc/`:

```bash
python3 scripts/model_2028.py --pass 2026-11-18      # this folder: 4 monthly CSVs + summary.json, with the Metro RA line
python3 scripts/model_2028.py --pass 2026-11-18 --without-metro-ra --out DIR   # this pass before the Metro line, byte-identical
python3 scripts/model_2028.py                        # Nov 11 folder, unchanged output
# CRM evidence (read-only session), run from the workspace root pllc-business/:
node new-york-pllc/reports/p2-11-model-2026-11-18/crm_product_mix.cjs --out crm-product-mix-output.txt
```

The CRM figures in the model (`A['products']`, the timing inputs) are typed in from the Nov 18 output. A fresh CRM pull doesn't change the model until those values are updated by hand.

## 7. Metro RA line (Nov 18)

Sid's decision, Nov 18: add Metro registered-agent renewals as their own line at today's measured 17% collection rate, and raise it only if Metro puts cards on file. In the script it is `METRO_RA_2026_11_18` and `metro_ra()`, switched on by the scenario key `metro_ra` in this pass only.

**What it is.** Metro Corporate Services sells NY registered agent to its own formation and publishing clients at $99 a year. We run the invoicing and dunning, and Stripe Connect splits each payment 50/50 ([partner-ra.md](../../../PLLC-CRM/memory-bank/features/partner-ra.md)). Unpaid invoices are voided and the client is cancelled.

**Counted once.** The RA line in §3a covers our own retail formations only. Metro clients are Metro's customers, not our orders, and Metro mail-service orders never get an RA record. CRM check [M]: of 1,730 live Metro RA clients, 9 share a company name with one of our PLLCs, and none of those 9 has our own live RA subscription. The Metro mail line (`metro_vm_*`) is separate and unchanged.

### Method

Each month, invoices = (a) live Metro clients whose renewal date falls in the month, from the CRM, plus (b) new Metro clients from 12 months earlier, plus (c) clients who paid 12 months earlier. Every invoice, whether first or repeat, is paid at the same rate. Paid × our share = the line. The line is the same in every case, because it doesn't depend on our own order volume. It is booked in the renewal month in both views: invoices go out about 30 days before the renewal date, and paid ones are paid a median 21–24 days after sending [M].

### Inputs

| Input | Value | Tag | Source |
|---|---|---|---|
| Collection, paid ÷ invoiced | **17%**: 377 paid of 2,271 invoices sent Apr–Jul 2026 (16.6%). Every one of those invoices has since been paid or voided | [M] | CRM `PartnerClientInvoiceCycle`, by send month |
| Later months, for context | Aug 15 of 58 paid · Sep 6 of 47 (12 still open) · Oct 1 of 49 (44 open) · Nov 1 of 24 (23 open) | [M] | Same. Too few closed to be a rate |
| Sensitivity: collection if Metro puts cards on file | **40%** | [A] | Day-45 re-cut §6, the pass bar for cards on file |
| Our cash per paid renewal | **$47.92** = 50% of $99 after Stripe's fee ($3.17). 422 of 423 payments; total to date $20.3K | [M] | `PartnerClientPayment.platformFeeCents` |
| Renewals due, live clients, Nov 2026–Nov 2027 | 1,665 (table below). 2027 alone: **1,589** (Nov 13 count: 1,566; new clients since then account for the difference) | [M] | `PartnerClient.renewalDate`, Eastern time |
| New Metro RA clients a month | **127**: Aug–Oct 2026 average (108, 120, 152). Held flat through 2028 | [M] rate, [A] held flat | `PartnerClient.startDate` |
| Rest of November 2026 | 43 more clients (127 − 84 so far) | [E] | — |
| Repeat invoices | Paid at the same 17% as first invoices. No Metro client has reached a second renewal yet, so a repeat rate can't be measured | [A] | — |
| Left out | 65 renewals dated Jul–Oct 2026 whose invoices are still open | — | Small; they would add under $600 at 17% |

**Renewals due by month, live clients [M]** (first = trialing, first invoice after the free year; repeat = active, paid before):

| | Nov 26 | Dec 26 | Jan 27 | Feb | Mar | Apr | May | Jun | Jul | Aug | Sep | Oct | Nov 27 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| First | 38 | 38 | 50 | 45 | 86 | 157 | 164 | 104 | 111 | 108 | 118 | 152 | 84 |
| Repeat | 0 | 0 | 0 | 0 | 1 | 31 | 87 | 121 | 119 | 34 | 10 | 5 | 2 |

No live client has a renewal date after Nov 2027. Everything after that comes from (b) and (c).

### Result

| Metro RA line | 2027 | 2028 |
|---|---:|---:|
| Invoices | 1,772 | 1,825 |
| Paid renewals at 17% | 301 | 310 |
| **At 17% collection [M]: operating profit and cash** | **$14.4K** | **$14.9K** |
| Sensitivity at 40% [A]: every invoice | $34.3K | $42.9K |
| Memo [A]: 40% for clients who start from Nov 19 only (cards on new orders), 17% for the existing book | $16.3K | $32.7K |
| Memo [A]: past payers renew at 85% (the model's later-renewal rate for our own RA), first invoices at 17% | $28.2K | $36.4K |

- **About half the earlier estimate.** The pressure test and the Day-45 re-cut put Metro at about $30K a year [E]. At 17% on every invoice, the line is about $15K. Reaching $30K takes either cards on file (40% gives $34–43K) or past payers renewing at a high rate (85% gives $28–36K). Neither has been measured.
- **The 40% row only becomes real if Metro puts cards on file.** Cards would apply to new Metro orders, so the narrower memo ($32.7K in 2028) is the more likely reading if Metro says yes in early 2027.

### New case totals, with the Metro line

| 2028 | Downside | **Working** | Target | Strong |
|---|---:|---:|---:|---:|
| Operating profit (formations, VM, RA), §1 | $513.4K | $648.7K | $813.9K | $986.2K |
| Metro RA at 17% | +$14.9K | +$14.9K | +$14.9K | +$14.9K |
| **Operating profit with Metro** | **$528.3K** | **$663.6K** | **$828.8K** | **$1,001.0K** |
| **Cash with Metro** | **$530.2K** | **$667.6K** | **$847.9K** | **$1,029.2K** |
| Operating profit with Metro and credentialing | $548.9K | $783.5K | $920.2K | $1,137.2K |
| Cash with Metro and credentialing | $551.4K | $791.4K | $942.4K | $1,170.3K |
| Operating profit with Metro, after Sid's pay | $398.5K | $533.7K | $698.9K | $871.2K |
| Cash with Metro, after Sid's pay | $400.3K | $537.7K | $718.1K | $899.4K |
| If Metro collects 40%: operating profit with Metro | $556.4K | $691.6K | $856.8K | $1,029.1K |

2027 operating profit / cash with Metro: downside $446.1K / $445.7K · working $503.6K / $510.3K · target $581.9K / $609.9K · strong $629.9K / $669.0K.

Each total equals the §1 figure plus the Metro line, within $5 of rounding (`check_op_plus_metro_minus_total` and `check_cash_plus_metro_minus_total` in [summary.json](summary.json)). The by-year Metro figures and all four readings are under `metro_ra` in summary.json.

**Reproduced byte-for-byte after this change:** the Nov 11 folder; this pass without the Metro line (all four CSVs and summary.json, with `--without-metro-ra`); the pressure test's `model-checks.txt` and `sim-output.txt`. In the refreshed CSVs every column before the Metro columns is unchanged.

**CRM pull:** read-only Postgres session (`default_transaction_read_only=on`; the script stops otherwise), counts and sums only, no client names. Run Nov 18 2026 from a scratch script, not kept in the repo. The counts above are typed into the model by hand, as with §2.

## Sid's decisions (Nov 18)

- Credentialing volume in the working case: not settled. Revisit after a few months of real jobs (Mar 31 gate).
- Add Metro RA renewals as a separate labeled line at today's 17% collection rate. **Done Nov 18** (§7): $14.9K in 2028 at 17%, $42.9K at 40% if Metro puts cards on file. Raise the rate only if Metro does.
