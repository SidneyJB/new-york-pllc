# P1-03 rebuilt: true formation economics (Nov 13 2026)

**Why this exists.** The original P1-03 files were in gitignored `PLLC-CRM/crm/reports/` and were lost in a folder move: `p1-03-2026-11-08/README.md` and `p1-03-2026-10-21/TRACE.md`. This folder rebuilds them from live data. All pulls were read-only. Nothing here names a client, an order, or a PLLC.

**Pulled:** Nov 13 2026, evening ET. **Window:** orders and cash from Apr 1 to Oct 31 2026 (ET).

**Short version**

| Figure | Original | Rebuilt today | Match? |
|---|---:|---:|---|
| Finished $885 PLLC, paid upfront | $514 | **$514.03** | Exact |
| Finished $885 PLLC, four payments collected | $513 | **$513.12** | Exact |
| Operating profit before owner pay, cash, annualized | $423K ($246.6K in 7 months) | **$418K** ($243.5K) | Within 1.3% |
| Same, accrual ($345 per order) | $371K | **$360K** ($210.0K) | 3% lower |
| After Sid's Gusto pay ($11K/month) | $290K | **$286K** | Within 1.6% |
| Overhead | $1,365/month, 74% Amazon | **Not rebuilt.** Carried from the original. | No Relay export on disk |
| Metro partner income | About $3K/month and falling | **$2.9K/month** average; $5.9K in Jun–Jul, **$240** in Oct | Yes |
| Acquisition allowance | $150, keeps $364 | **$150, keeps $364.03** | Exact |

The per-order figures are exact. The P&L is close but rebuilt a different way. The Apr–Oct Relay export that the Nov 9 version used is not on this Mac. So §3 uses Stripe, the CRM and Google Ads for revenue and variable costs, and carries overhead and Spiffy from the original. See §3 and §6.

Labor is $0 in every figure here. Sid is the only staff, and his Gusto pay is owner compensation below operating profit (decision log, Nov 9).

---

## §1 Contribution on a finished $885 domestic PLLC

Population: 362 live formation orders placed Apr–Oct 2026 (Finances-tab rules: no VM-only, no test customer, no cancelled-and-refunded PLLC, no excluded IDs). 76 are finished. Of those, the "standard" order is a $885 domestic PLLC with no coupon, no refund, no partner and no add-on:

- **27 paid upfront.** Every one has stored COGS of $345. Median contribution **$514.03**. Mean $512.36, because one bought a DBA later.
- **19 paid in four collected payments.** Every one is **$513.12**.

| Line | Upfront | Four payments | Source |
|---|---:|---:|---|
| Customer pays | $885.00 | $885.00 (4 × $221.25) | Order total, Payment rows |
| Discount | $0 | $0 | Standard order has none |
| Card fee (Spiffy checkout runs on our Stripe) | −$25.97 | −$26.88 (4 × $6.72) | 2.9% + $0.30 per charge. Matches Stripe to the cent on the traced orders (see TRACE.md) |
| NY DOS articles of organization | −$235.00 | −$235.00 | Stored `serviceCogsCents` schedule |
| NYSED Office of the Professions submission | −$10.00 | −$10.00 | Paid by $10 check; CRM `Check` rows |
| Newspaper notices ($25 daily + $25 weekly) | −$50.00 | −$50.00 | Fixed per entity, paid in Relay (Sid, Oct 30) |
| DOS certificate of publication | −$50.00 | −$50.00 | Prepaid DOS account (Sid, Oct 30) |
| Certified copies | $0 | $0 | No separate cost in the schedule |
| Postage | $0 | $0 | Not costed per order; any postage sits in overhead |
| Refunds | $0 | $0 | Standard order has none (see below) |
| Labor | $0 | $0 | Decision log, Nov 9 |
| **Contribution** | **$514.03** | **$513.12** | |

The four-payment plan costs **$0.91 more** in card fees. It earns the same once paid.

**Refunds and bad debt.**
- Refunds on kept orders: **$885 on 6 orders, 0.27%** of $331,466 contract value. Fully refunded cancellations are outside this population. Their cash shows in §3 as Stripe refunds.
- Installment plans by order month (contract vs collected, net of refunds, as of today):

| Order month | Plans | Contract | Collected | Open | Collected % |
|---|---:|---:|---:|---:|---:|
| Apr | 26 | $24,544 | $24,435 | $109 | 99.6% |
| May | 25 | $23,060 | $23,060 | $0 | 100.0% |
| Jun | 17 | $16,229 | $15,930 | $299 | 98.2% |
| Jul | 18 | $16,520 | $16,325 | $195 | 98.8% |
| Aug | 14 | $12,785 | $12,785 | $0 | 100.0% |
| Sep | 22 | $20,355 | $20,380 | −$25 | 100.1% |
| Oct | 26 | $24,630 | $23,944 | $686 | 97.2% (still paying) |

- Apr–Sep: 122 plans, **$578 open of $113,493 (0.51%)**. That matches the original "about 0.5%".
- The $514 headline does not deduct a bad-debt allowance. It is the contribution on an order that was paid. A 0.5% allowance would be about $4.43 per order. Leave it out of the headline, as the original did.

**The CRM's own fee rate is a little high.** `PRICING.calculateStripeFees` uses 3% + $0.30. That gives $513.15 upfront. Stripe actually charges 2.9% + $0.30. This is the source of the "$513 ads-plan floor" in the Oct 18 scorecard.

## §2 Other products

Contract basis (full price, fees as if every payment clears), all 362 orders in the window. Finished count in brackets.

| Product | Orders (finished) | Avg price | Avg filing cost (incl. DBA) | Avg contribution |
|---|---:|---:|---:|---:|
| PLLC $885, no add-on | 203 (46) | $885 | $345 | **$513** |
| PLLC $885 + add-ons (S-corp, DBA, etc.) | 128 (19) | $1,001 | $347 | **$625** |
| LLC | 11 (7) | $575 | $293 | **$264** |
| Foreign-into-NY | 7 (0) | $942 | $389 | **$526** |
| PLLC at another price | 7 (4) | $766 | $351 | **$381** |
| Partner-attributed | 6 (0) | $898 | $353 | **$443** |

Caution: everything below the first two rows is a small group. Foreign and partner have no finished order yet, so their filing costs are the stored schedule, not actuals. Partner contribution deducts the stored referral fee. The Oct 18 scorecard's one partner order was $414.76 at $860 with a $75 fee.

Add-ons are worth about **$112 per add-on order** over the base. Add-ons include the S-corp election ($195) and DBA ($199 with a $45 filing cost). The mix wasn't split here.

## §3 Business P&L, Apr–Oct 2026

### §3a Cash and accrual

**How this differs from the original.** Nov 9 used Sid's Apr–Oct Relay export. That export is not on this Mac. The only Relay files on disk run through early April 2026. So this rebuild takes:
- Card revenue, refunds, disputes and fees from **Stripe balance transactions** (every charge on the main account: Spiffy formation, VM, RA).
- Metro partner income and B2B payouts from the **CRM**.
- Google Ads spend from the **Google Ads API**.
- Filing costs from the **CRM**: on accrual, $345 per order in its order month; on cash, each leg on the date its stage was stamped (OP $10, articles $235, notices $50, cert pub $50). That is an estimate of when the money left, not a bank line.
- **Overhead ($1,365/month) and Spiffy ($99/month) carried from the original.** They cannot be checked without Relay.

| Month | Card gross | Refunds + disputes | Stripe fees | Metro partner | Google Ads | B2B paid | Overhead + Spiffy | Filing (cash) | **Cash profit** | Filing (accrual) | **Accrual profit** |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Apr | 41,042 | 0 | 1,237 | 1,722 | 2,931 | 0 | 1,464 | 16,900 | **20,232** | 16,325 | **20,807** |
| May | 57,172 | 1,658 | 1,732 | 4,313 | 4,032 | 0 | 1,464 | 12,995 | **39,604** | 19,750 | **32,849** |
| Jun | 52,610 | 1,962 | 1,604 | 5,894 | 2,053 | 0 | 1,464 | 11,020 | **40,401** | 15,970 | **35,451** |
| Jul | 46,685 | 1,285 | 1,437 | 5,894 | 1,389 | 300 | 1,464 | 12,510 | **34,193** | 16,300 | **30,403** |
| Aug | 50,688 | 245 | 1,591 | 1,581 | 2,028 | 0 | 1,464 | 9,250 | **37,692** | 15,885 | **31,057** |
| Sep | 47,673 | 1,255 | 1,479 | 479 | 2,656 | 75 | 1,464 | 14,780 | **26,442** | 17,665 | **23,557** |
| Oct | 69,684 | 3,471 | 2,186 | 240 | 3,698 | 150 | 1,464 | 13,970 | **44,984** | 23,125 | **35,829** |
| **7 months** | **365,552** | **9,876** | **11,266** | **20,123** | **18,788** | **525** | **10,248** | **91,425** | **243,548** | **125,020** | **209,953** |

- **Cash: $243.5K in 7 months, $418K annualized.** Original: $246.6K, $423K.
- **Accrual: $210.0K, $360K annualized.** Original: $371K.
- Cash is higher than accrual because accrual books **$33.6K more filing cost**. Recent orders' costs were not yet paid by Oct 31, and that outweighs older orders' late costs paid inside the window.
- Stripe fees include $234 of Billing/invoicing fees and the $30 of October dispute fees. Disputes are the two October chargebacks ($442.50).
- Check: Stripe paid out $336,046 to the bank in the window. That's $8.4K below card net ($344,410), which is normal payout lag and balance holds.

### §3b Overhead

Not rebuilt. The original said about **$1,365/month, 74% Amazon**, against $400 in the old forecast. That split came from Relay vendor lines. It needs the Apr–Oct Relay export to check. Spiffy's $99/month is also a Relay line.

Overhead is 4% of the cash profit. A 25% error in it would move the annualized figure by about $4K.

### §3c Owner pay (below the line)

Sid's Gusto pay is about **$11K/month** ($10K gross on the $120K profile, plus about 7.65% employer FICA and admin; financial-planner `s-corp-payroll` shard). It is all Sid's (Nov 9). It sits below operating profit.

- Cash: $418K − $132K = **$286K annualized** after owner pay. Original: $290K.
- Accrual: $360K − $132K = $228K.

Business income tax is below this too and is not shown.

### §3d Partner (Metro) income

Our platform fee on Metro's Partner RA: Apr $1,722, May $4,313, Jun $5,894, Jul $5,894, Aug $1,581, Sep $479, Oct $240. Average $2.9K/month. It is falling fast. Oct is 4% of the June peak.

## §4 Acquisition allowance

- Contribution on a finished retail $885 order: **$514** (§1).
- Adopted allowance (Sid, Nov 9): **$150 per incremental order.**
- Kept per order: $514.03 − $150 = **$364.03**.
- For reference, October's Google read was $103 Ads CPA (decision log, Oct 29). At that CPA an order keeps about $411.
- On a four-payment order the allowance leaves $363.12. The difference is the $0.91 in extra card fees.
- The allowance is for judging a bounded test only. Nothing runs until Sid approves the specific test (decision log).

## §5 How to re-run

All commands are read-only. The script opens Postgres with `default_transaction_read_only=on` and stops if that isn't set. Stripe calls are list/retrieve only, with the CRM's restricted `rk_live_` key.

1. **Per-order economics, installments, products, accrual filing costs, cash-timing filing costs, Metro income, B2B payouts, VM payments (§1–§3):**
   ```
   cd /Users/sidb/dev/pllc-business
   node new-york-pllc/reports/evidence/p1-03-unit-economics-2026-11-13/p1-03-rebuild.cjs --since 2026-04-01 --until 2026-11-01
   ```
   It uses `PLLC-CRM/crm/node_modules` and `PLLC-CRM/crm/.env`. It prints aggregates only.
2. **De-identified traces (TRACE.md):**
   ```
   node new-york-pllc/reports/evidence/p1-03-unit-economics-2026-11-13/p1-03-rebuild.cjs --trace --trace-month 2026-06 --trace-profession "Marriage and Family Therapy" --trace-plan upfront
   node new-york-pllc/reports/evidence/p1-03-unit-economics-2026-11-13/p1-03-rebuild.cjs --trace --trace-month 2026-06 --trace-profession "" --trace-plan four
   ```
3. **Stripe card gross, refunds, disputes, fees by month (§3a):**
   ```
   cd /Users/sidb/dev/pllc-business/PLLC-CRM/crm
   npx tsx scripts/stripe-fee-actuals.ts --since 2026-04-01 --until 2026-11-01
   ```
   Card gross = `charge` + `payment` rows. Refunds = `refund` + `payment_refund`. Disputes = `adjustment`. Fees = all fee columns plus `stripe_fee` amounts.
4. **Google Ads spend by month (§3a):**
   ```
   cd /Users/sidb/dev/pllc-business/new-york-pllc
   .venv/bin/python google_ads_cli.py query --sql "SELECT segments.month, metrics.cost_micros, metrics.conversions FROM customer WHERE segments.date BETWEEN '2026-04-01' AND '2026-10-31'"
   ```
   Result: Apr $2,931, May $4,032, Jun $2,053, Jul $1,389, Aug $2,028, Sep $2,657, Oct $3,698. Total $18,788. The CRM `AdSpend` table only holds a lifetime total, so it can't be split by month.
5. **Overhead, Spiffy, and the Relay cash view:** needs Sid's Apr–Oct Relay statements ZIP. Then, in `financial-planner`: `python relay_pick_zip.py` (or `relay_statements_analysis.py --xlsx`) builds the P&L workbook. Not run here: no export on disk.

The monthly table in §3a is plain arithmetic on the outputs of steps 1, 3 and 4, plus overhead and Spiffy at $1,464/month.

## §6 Differences from the lost originals

| Original | Rebuilt | Why |
|---|---|---|
| $514 / $513 | $514.03 / $513.12 | Same. Same $345 schedule and 2.9% + $0.30 fee. |
| "39 of 57 formation-complete orders since April 1" (Oct 21) | 76 finished of 362 Apr–Oct orders; 27 + 19 standard | More orders have finished since Oct 21. The Oct 21 note said dentistry had no finished order; one four-payment dentistry order is now finished. |
| Apr–Sep plans: 128, $1,050 open | 122, $578 open (0.51%) | More has been collected since Nov 8. The plan count differs because this rebuild uses ET order dates and the Finances-tab exclusions. The original's rule isn't known. |
| Cash $246.6K / $423K | $243.5K / $418K | Revenue here is Stripe plus CRM, not Relay deposits. Cash filing cost here is estimated from stage dates, not bank lines. Relay may also hold inflows that Stripe and the CRM don't (for example, a client paying by check or wire). |
| Accrual $371K | $360K | Same $345-per-order method, different revenue base. The $10.5K gap over 7 months (about $1.5K/month) can't be placed without Relay. Most likely revenue outside Stripe and the CRM. |
| $290K after Gusto | $286K | Follows the cash gap. Same $11K/month. |
| Overhead $1,365/month, 74% Amazon | Not reproduced | Needs the Relay export. |
| Metro about $3K/month, falling | $2.9K/month; $240 in Oct | Same finding, now with the monthly series. |
| §4 $150 keeps $364 | $364.03 | Same. |

**Not verified in this rebuild:**
- Overhead, the Amazon share, and Spiffy's $99/month. All are Relay lines.
- When filing costs actually left the bank. The cash view uses stage dates.
- Postage and certified copies as per-order costs. They are not in the schedule and were not costed in the original either.

**To close the gap:** have Sid export Apr–Oct 2026 Relay statements (ZIP) and run step 5. Then compare the Relay deposit total with the $336,046 Stripe payouts plus Metro income.
