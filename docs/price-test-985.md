# $985 retail formation price test (design)

**Status:** P1-11 draft, Oct 29 2026. Agent drafted it; items marked **[Sid]** need a decision before launch. Launch is on hold until the **Nov 9** re-decision ([decision log](../decision-log.md) Oct 29). This design feeds P2-01.

## 1. What changes, and for whom

- **In scope:** domestic NY PLLC **retail** formation only, i.e. the Spiffy offer that is $885 today and comes through nypllc.com (organic, paid, direct, chatgpt.com).
- **Out of scope** (stays at today's price):
  - Foreign qualification (`/foreign-pllc/*`)
  - LLC, MSO pair ($1,770), and NY → CO
  - S-corp / DBA add-ons
  - VM and RA
- **Protected:**
  - Written quotes and manual invoices already issued at $885 are honored until **Dec 31 2026**. Ops issues the quoted amount and logs it as an exception.
  - Wholesale partner rates ($800 / $775 / $750) are unchanged. They're contract prices, not list-relative.
  - **[Sid] Referral coupon.** Today a referral is $25 off list ($860) plus a $75 fee. Choose one:
    - **(a) Recommended:** keep the discount list-relative, so referral becomes **$960**. This keeps the partner offer a real discount off the public price.
    - **(b)** Freeze referral at $860. This widens the gap to $125 and makes partner orders look artificially cheap during the test.
- **No stacking.** No referral fee on wholesale orders (unchanged). One coupon per order. A referral coupon can't combine with any other discount.

## 2. Design: staged switch, not a randomized split

- **Recommended: a staged switch.** All retail traffic moves to $985 on launch day, and the result is compared with a fixed baseline.
- **Why not randomize:** a randomized split would need two Spiffy offers, cookie assignment on the site, matching ad assets and a quote policy for each arm. That's substantial engineering for about 15 retail orders a week, and P1-11 says not to build it.
- **Mechanics, all on one day, in one deploy:**
  - Vercel: `NEXT_PUBLIC_FORMATION_LIST_PRICE=985` (one env var since `f9e058b`)
  - Spiffy offer price and installment amounts
  - CRM: `FORMATION_RETAIL_LIST_PRICE_CENTS=98500`
  - `public/og-image.svg`
  - Google Ads price assets and the `Start Your Order — $885` sitelink
- **Order tagging:** every order stores `Order.retailListPriceCents`, which is the cohort id. Test orders are excluded.

## 3. Comparison windows

- **Baseline:** the 6 full weeks before launch (e.g. **Sep 28 – Nov 8** for a Nov 10 launch). For a seasonal reference, also report the same weeks of 2025.
- **Test:** a minimum of **6 full weeks** from launch. Checkpoints:
  - **P2-12, Nov 29:** safety check only
  - **Dec 21:** first real read
  - **Jan 8 2027:** decision
- **Limitations, stated up front:**
  - **Before/after only.** Any change in demand over the period (holidays, Ads auction changes, competitor pricing) is mixed in with the price effect.
  - **The holidays are in the window.** Thanksgiving week and Dec 22 – Jan 1 are historically slow. Report them separately rather than dropping them.
  - **The sample is small.** About 60 orders/month means a ±15% swing in orders can happen from noise alone. The read is directional and won't be statistically certain.
  - **January is a known peak (n=1).** A January lift can't be credited to price.

## 4. Metrics

**Primary: expected collected contribution per eligible visitor**

- Contribution = cash collected + expected collection of open installments at the matured rate (Apr–Jun: 99.7%) − refunds − filing cost ($345) − card fees − cash referral fees **+ expected 12-month VM/RA/add-on contribution from that order** (rates in the break-even table).
- **Eligible visitor:** **[Sid]** choose the source.
  - **Option 1:** GA4 sessions on the PLLC landing and order pages. Needs `GA4_PROPERTY_ID`.
  - **Option 2:** Vercel Analytics unique visitors on the same pages.
  - **Either way, also report contribution per paid Google click.** The Ads API counts those reliably, so it's the cleanest paid-traffic denominator we have.

**Break-even, including what a lost customer takes with them** (added Oct 29)

A kept order gains about **+$97**: $100 of price less about $3 of extra card fee. A lost order loses the formation contribution **plus** its add-ons and subscriptions.

Source: Apr–Sep 2026 NY PLLC cohort, 281 orders ([P1-02 export](../../PLLC-CRM/crm/reports/p1-2026-10-18/)).

| Per lost order | Basis | 12-month | 24-month |
|---|---|---:|---:|
| Formation contribution | $885 − $345 filing − card fee | $513 | $513 |
| S-corp add-on | 35/281 = 12.5% × $195 | $24 | $24 |
| Virtual mail | **27% paid attach** (75/281) × $50/mo, **no overhead** (postage is billed through to the customer), less Stripe fee ≈ $48.25/mo | $156 | $313 |
| RA renewal | 72% enrolled (201/281) × $99/yr × **60% pay rate (assumed)** × 90% margin | $38 | $77 |
| **Total** | | **$732** | **$927** |

**Break-even volume loss:** about **12%** on a 12-month view (11.7%) and about **9.5%** on a 24-month view. That's tighter than the formation-only **16%**.

Two caveats:
- **VM churn and the RA pay rate aren't measured yet** (P1-05 / P1-04; the first RA renewal didn't pay). VM has no overhead (Sid, Oct 29): it's $50/mo plus postage billed at cost. When those numbers land, replace the assumptions.
- This assumes $985 doesn't change attach rates. **Track VM and S-corp attach separately during the test.** If attach falls, the break-even tightens further.

**Rules below use 12%** as the decision line.

**Monitored but not deciding:**
- first-payment conversion
- orders by source
- installment share and first-payment failures
- refunds and price complaints
- VM/RA attach rate
- partner order mix
- quote-mismatch exceptions
- fulfillment touch time

## 5. Continue / hold / revert rules (provisional, set before launch)

Compare **source-mix-adjusted** results with the baseline: paid and non-paid are compared separately and weighted by baseline mix. **Raw results are always shown alongside the adjusted ones.**

| Outcome | Rule | Action |
|---|---|---|
| **Revert now** | Price or checkout malfunction not fixed within 2 business days; or quote mismatches > 3 in a week; or a refund/complaint pattern tied to price | Go back to $885 the same day. Treat the period as void. |
| **Safety stop (Nov 29)** | Orders per eligible visitor down **> 35%** for 3 straight non-holiday weeks | Revert. A drop that size can't be offset by +$97 per order. |
| **Continue (Dec 21 / Jan 8)** | Contribution per eligible visitor **≥ baseline** (adjusted), and order volume down **< 12%** | Keep $985 as the list price; consider $1085 only per P3-01 |
| **Hold / extend** | Contribution per visitor within **−10% to 0%** of baseline, or volume down 12–20% | Keep $985 through Jan 31, then decide again with January data |
| **Revert** | Contribution per visitor **< −10%** of baseline (adjusted), or volume down **> 20%** | Return to $885 and record the result as evidence against $985 |

- **Don't change anything else** on the offer or checkout during the test. Necessary fixes go in the exception log with dates.
- **This doesn't use the retired +$90K assumption.** The upside example is +$45.6K/yr, formation-only ([integrated plan](../nypllc-integrated-operating-plan.md)), and it only counts once P1-03 costs are audited.

## 6. Partner terms and fulfillment

**Contribution floor:** no partner order below **$400** contribution. Today's referral (with the $75 fee) is about $415–439, and wholesale at $800 is about $431, so both clear it. Under option (a), referral at $960 is about $512.

**Partner handling:**
- **Intake:** the partner sends the client our `?c=` link (referral), or uses the wholesale coupon and gives us client details (wholesale). See the [service sheet](../../PLLC-CRM/crm/reports/p1-10-2026-10-20/service-sheet.md).
- **Who pays:** on referral, the client pays at checkout. On wholesale, the firm pays at checkout and bills its own client.
- **Status updates:** partners get milestone updates at OP approval, DOS filing, and publication complete, by email from contact@nypllc.com.
- **Exceptions:**
  - A wrong coupon or price at checkout is corrected by invoice or refund within 1 business day.
  - Disputes go to Sid.
- **Response commitment:** Ops replies to partner emails within **one business day** on weekdays. **[Sid]** Confirm Ops can meet that.

**[Sid] Review of partner terms:** confirm the referral-fee and wholesale terms in the [white-label info sheet](../../marketing/b2b-white-label-partner/white-label-partner-info-sheet.md) still read correctly at $985 before launch.

## 7. Launch checklist (P2-01)

1. Archive the baseline export, with order rows and contribution, as of launch morning.
2. Make all the switches from §2 in one window. Then verify by fetching the 46 sitemap pages and checking for $985 and no $885 (the method used Oct 29).
3. Run a Spiffy test-mode checkout, both full payment and installment. Confirm the installment amounts add up to the total, then exclude the test order.
4. Run the CRM webhook check that `retailListPriceCents` = 98500 on the first live order.
5. Check errors, complaints and quote mismatches daily for the first 3 business days.

## $1085

Only after P3-01. It's a separate test and must not overlap other funnel experiments.
