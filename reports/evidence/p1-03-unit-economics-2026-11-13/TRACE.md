# P1-03 cost trace: one finished $885 PLLC (rebuilt Nov 13 2026)

This replaces the lost `PLLC-CRM/crm/reports/p1-03-2026-10-21/TRACE.md`. It is de-identified: no client, PLLC name, email or order number. Day numbers count from the order date.

Re-run: see [README.md](README.md) §5 step 2. The script picks the middle-dated order that matches the filters and prints only what is below.

## Trace A: paid upfront

**The order:** a finished single-member marriage and family therapy PLLC, New York office, ordered June 2026, paid in full at Spiffy checkout. No coupon, no partner, no add-on, no refund. Untagged attribution (not a Google click).

**Timeline**

| Stage | Day |
|---|---:|
| Order, intake, license received, affidavit signed | 0 |
| NYSED OP packet submitted | 1 |
| OP approved | 91 |
| EIN, articles filed with DOS | 93 |
| Articles approved; publication starts | 96 |
| Newspaper runs: daily days 99–134, weekly days 104–139 | |
| Publication complete | 141 |
| Certificate of publication filed | 151 |
| Certificate approved; formation complete | 153 |

Most of the wait is NYSED's OP review (90 days). Our own steps took a day or two each.

**Money**

| Line | Amount | When paid | Source |
|---|---:|---|---|
| Customer payment | +$885.00 | Day 0 | CRM Payment row |
| Stripe fee | −$25.97 | Day 0 | **Stripe balance transaction: $25.97, net $859.03.** Matches the 2.9% + $0.30 estimate exactly |
| NYSED OP submission | −$10.00 | Day 1 | $10 check |
| NY DOS articles | −$235.00 | Day 93 | Stored schedule |
| Newspaper notices | −$50.00 | About day 96–99 | $25 daily + $25 weekly, Relay |
| DOS certificate of publication | −$50.00 | Day 151 | Prepaid DOS account |
| Certified copies, postage, labor | $0 | | Not costed (see README §1) |
| **Contribution** | **$514.03** | | |

The cash goes out slowly. The business holds about $859 for three months before most of the $345 leaves. That is why the cash P&L runs ahead of accrual (README §3a).

## Trace B: four payments

**The order:** a finished single-member PLLC in a licensed health profession, New York office, ordered June 2026, on the four-payment plan. No coupon, no partner, no add-on, no refund. Untagged attribution.

**Timeline:** OP submitted day 2, OP approved day 72, articles filed and approved day 75, newspaper runs days 77–114, publication complete day 125, certificate filed day 152, formation complete day 153.

**Money**

| Line | Amount | Source |
|---|---:|---|
| Four payments of $221.25 (one in July, three in June) | +$885.00 | CRM Payment rows |
| Stripe fees, 4 × $6.72 | −$26.88 | **Stripe: $6.72 on each charge, net $214.53.** Matches the estimate |
| Filing costs (same schedule as Trace A) | −$345.00 | Stored schedule |
| **Contribution** | **$513.12** | |

All four payments cleared well before formation finished (day 153). The plan cost $0.91 more in fees than paying upfront.

## The wider set

These two are typical. In Apr–Oct orders that are finished, with no coupon, refund, partner or add-on:
- 27 paid upfront. All carry $345 filing cost. Median contribution $514.03.
- 19 paid in four payments, all collected. Every one is $513.12.

Traced Stripe fees matched the 2.9% + $0.30 estimate on all five charges checked. That agrees with the Oct 30 fee check ([P1-03 Stripe fees](../../../../PLLC-CRM/crm/reports/p1-03-stripe-fees-2026-10-30/README.md); gitignored, local only).
