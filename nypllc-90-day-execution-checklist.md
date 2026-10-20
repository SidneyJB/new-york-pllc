# NYPLLC: 90-day execution checklist

Prepared October 15, 2026. Day 1 is October 16, 2026. All dates use America/New_York.

This checklist translates the preceding strategic assessment into work for Sid, Ops, and an agent or technical operator. It is a proposed execution plan. A checked task should mean the work has actually been completed and the evidence saved. The October 15 status document supplies the baseline; live data must replace those snapshots before decisions.

The objective is to establish a credible path to approximately $1 million of annual net business profit in calendar 2028. These 90 days should demonstrate better unit economics, repeatable partner acquisition, and reliable recurring revenue. They do not guarantee the 2028 result.

| Period | Dates, inclusive | Required outcome |
|---|---|---|
| Days 1–14 | October 16–29, 2026 | Reliable economics and billing; a measured purchasing funnel; partner conversations underway |
| Days 15–45 | October 30–November 29, 2026 | A disciplined $985 test; paid partner handoffs; measured VM acquisition and service cost |
| Days 46–90 | November 30, 2026–January 13, 2027 | Evidence of repeat referrals; paid adjacent-product pilots; a revised forecast and Q1 operating decision |

**Owners and working rules**

- Sid owns commercial decisions, partner relationships, pricing decisions, and the growth budget.
- Ops owns fulfillment, mail operations, subscription reconciliation, customer-service follow-through, and actual work-time measurement.
- Agent means an analyst/technical operator working through the business's authorized systems. It owns exports, analysis, draft copy, instrumentation, and small implementation changes. It does not substitute for Sid in partner conversations.
- Accountant/counsel means a targeted review where accounting treatment, professional structure, billing terms, or partner arrangements require that expertise. Do not turn every routine operational task into a professional-review project.
- Required tasks come before conditional experiments. Start with existing CRM, checkout, reporting, and invoicing capabilities. A new portal, full checkout rebuild, or broad product platform is outside this 90-day plan.
- Record one accountable owner, due date, status, dependency, and evidence link for each work package below. Task statuses: Not started, In progress, Waiting, Done, or Stopped.
- Sid's weekly growth allowance remains 10–12 hours. Suggested allocation: partners 4–5 hours; customer/pricing decisions 2 hours; recurring services 1 hour; scorecard 1 hour; implementation decisions and contingency 2–3 hours. Ops and technical work need separate capacity.
- If capacity is short, defer the conditional products, broad SEO cadence, and large-platform outreach. Protect billing, economic measurement, the core buying journey, and partner selling.
- Dates falling on weekends are reporting boundaries. Prepare the review on the preceding business day unless a scheduled billing event requires monitoring.

**Capacity allowances to confirm on Day 1**

These are provisional additional project hours, not measured estimates or a promise that existing staff have spare capacity. Routine fulfillment remains separate. Re-estimate after the first week.

| Period | Sid | Ops | Agent/technical operator |
|---|---:|---:|---:|
| Days 1–14 | 20–24 hours | 12–20 hours | 24–40 hours |
| Days 15–45 | 40–48 hours | 16–24 hours | 20–32 hours |
| Days 46–90 | 60–72 hours | 24–40 hours | 24–40 hours |

Within Period 1, the first priorities are imminent RA billing, collecting enough financial evidence to trust the margin, beginning partner conversations, and repairing confirmed checkout problems. Complete a simple scorecard before automating it. Time-box the market-size research and optional content; they must not block sales.

**Decisions that change the older operating plan**

These calendar changes are **adopted** in [decision-log.md](decision-log.md) (October 16, 2026): targeted professional-partner outreach starts now (not November 9); the $985 test moves to November 2–4 (not February); the November 1 ads review is a dual memo (order count plus profit and data quality).

Preserve the existing November 15–December 1 structural ads/landing-page freeze unless Sid deliberately changes it. Run an already-launched price experiment with a stable configuration during that period. Fix broken tracking, payment failures, inaccurate claims, or policy problems promptly; document the exception. Avoid an automatic January budget surge.

## Period 1: Days 1–14 — October 16–29

### P1-01. Establish ownership, capacity, and a decision log

Owner: Sid. Support: Ops and Agent. Due: October 16. Required. Dependency: none.

- [x] Name the actual person responsible for each owner role; verify which systems each person can access. Evidence: [P1-01 ownership](ops/p1-01-ownership.md). Sidney Brodsky is Sid and Ops. Agent is the technical operator. CRM, Stripe, Ads API, and Gmail confirmed Oct 16–20. Microsoft Advertising remains blocked.
- [x] Reserve two recurring partner-sales blocks and one 30-minute scorecard meeting on the team's working calendar. Evidence: [P1-01 ownership](ops/p1-01-ownership.md). Tue/Thu 10:00–12:00 ET partner sales; Monday 9:00–9:30 ET scorecard.
- [x] Assign capacity for exports, billing checks, and a small checkout-fix sprint. If staffing cannot support the list, mark lower-priority packages Waiting rather than silently assigning everything to Sid. Evidence: [P1-01 ownership](ops/p1-01-ownership.md). Agent owns exports and P1-09; Ops owns the Oct 23 charge; CAQH, MSO ads, Bing second account, and advocate cron are Waiting.
- [x] Write the goal's accounting definition: operating profit, treatment of owner compensation, shared expenses, financing costs, and business taxes. Keep personal taxes and owner distributions clearly distinguished. Evidence: [decision log § Net profit](decision-log.md).
- [x] Create a decision log with date, issue, options, evidence, chosen action, owner, next review, and rollback condition. Evidence: [decision-log.md](decision-log.md).
- [x] Record the proposed changes to B2B timing, the price-test calendar, and the advertising decision rule. Make the adopted version explicit. Evidence: [decision-log.md](decision-log.md) (October 16 rows).
- [x] Create one task board or shared checklist from this document. Add evidence links as work is completed. Evidence: [90-day task board](ops/90-day-task-board.md) · this checklist.

Done when: every required work package has an owner, urgent work has capacity, and the revised sequence is explicit.

### P1-02. Assemble the financial and operational baseline

Owner: Agent. Support: Ops. Due: October 20. Required. Dependency: P1-01 and authorized system access.

- [x] Export formation orders from April 1 through October 15, plus prior records needed to understand recurring cohorts. Include order ID, customer/entity ID, order date, SKU, profession, price, discount, partner, acquisition fields, payment method, and fulfillment stage. Evidence: [orders.csv](../PLLC-CRM/crm/reports/p1-2026-10-18/orders.csv) · [extraction](../PLLC-CRM/crm/reports/p1-2026-10-18/extraction.md).
- [x] Link invoices, installments, payments, refunds, disputes, and outstanding balances to orders. Retain order value and collected cash as separate fields. Evidence: [order-payments.csv](../PLLC-CRM/crm/reports/p1-2026-10-18/order-payments.csv). Disputes are not stored in the CRM.
- [x] Export advertising cost by date and campaign, using a fresh pull rather than the October 3 snapshot. Evidence: [P1 readout](../PLLC-CRM/crm/reports/p1-2026-10-18/README.md) · [weekly SOP](ads-pull-2026-10-18-weekly-sop/WEEKLY-SOP.md).
- [x] Export newspaper/state costs and payment-processing fees. Identify whether each cost is actual, estimated, or missing. Evidence: [order-costs.csv](../PLLC-CRM/crm/reports/p1-2026-10-18/order-costs.csv). Newspaper and cert-pub lines are flat estimates. Actual Stripe fees and paid newspaper invoices are missing.
- [x] Export VM and direct-RA subscriptions with product, customer/entity ID, start date, trial end, billing interval, amount, cancellation status, last successful charge, and next due date. Evidence: [subscriptions-vm-ra.csv](../PLLC-CRM/crm/reports/p1-2026-10-18/subscriptions-vm-ra.csv).
- [x] Export partner records, referral codes, attributed orders, payout amounts, payout events, and the last real relationship activity. Evidence: [partners.csv](../PLLC-CRM/crm/reports/p1-2026-10-18/partners.csv) · [partner-payouts.csv](../PLLC-CRM/crm/reports/p1-2026-10-18/partner-payouts.csv).
- [x] Deduplicate by stable IDs; distinguish multiple entities owned by one person from duplicate orders. Explain the 51-versus-52 September order discrepancy. Evidence: [extraction](../PLLC-CRM/crm/reports/p1-2026-10-18/extraction.md). September paid formations: 51.
- [x] Record extraction time, timezone, filters, exclusions, and row counts. Keep sensitive payment and identity data in the authorized systems; use redacted IDs in the analysis. Evidence: [extraction](../PLLC-CRM/crm/reports/p1-2026-10-18/extraction.md).

Done when: the files reconcile sufficiently to produce the first scorecard, with every unresolved discrepancy listed rather than hidden.

### P1-03. Reconcile true formation economics

Owner: Agent. Decision owner: Sid. Review: accountant as needed. Due: October 23. Required. Dependency: P1-02.

- [ ] Select at least 20 completed orders spanning the main professions, retail/partner sales, paid/unpaid acquisition, and installment/upfront payments. Trace those cases manually to validate the larger analysis.
- [ ] Calculate customer receipts, discounts, refunds, bad-debt allowance, government fees, publication cost, processing fees, and fulfillment labor for each order.
- [x] Explain precisely how the historical $476 figure differs from the current $520. Do not average them without reconciling their definitions. Evidence: [scorecard](scorecards/2026-10-18-weekly.md).
- [x] Separate costs that vary with another order from current fixed payroll and overhead. Show where allocated labor sits so it is not subtracted twice. Evidence: [scorecard](scorecards/2026-10-18-weekly.md). Payroll stays out of the unit figure.
- [x] Compare retail, referral, and wholesale contribution. Treat a wholesale discount as reduced revenue; separately record any additional cash referral payment. Evidence: [scorecard](scorecards/2026-10-18-weekly.md).
- [ ] Measure installment completion by sufficiently mature cohort. Separate receivables not yet due from failed collections and write-offs.
- [ ] Calculate contribution by major profession and product where sample size allows. Include sample counts and a caution on small groups.
- [ ] Reconstruct a monthly operating P&L that reconciles with the unit model. Allocate shared expenses consistently and identify costs absent from the current forecast.
- [ ] Set a provisional acquisition allowance from audited contribution less the contribution the business needs to retain. Treat $200–$220 as a candidate experiment range, not an automatically approved ceiling.

Done when: Sid can explain the contribution on a normal retail order, a wholesale order, and an installment order, and can reconcile the total to business profit.

### P1-04. Complete the direct-RA billing preflight

Owner: Ops. Support: Agent. Decision owner: Sid. Card check due: October 20. First-charge check: October 23. Required. Dependency: subscription access; do not wait for the entire baseline project.

- [x] Identify the actual first October 23 renewal and the 97 renewals listed for November–January. Refresh the list rather than assuming the counts are unchanged. Evidence: [P1-04 preflight Oct 20](../PLLC-CRM/crm/reports/p1-04-2026-10-20/README.md). One Oct 23 renewal (T & C Family Dentistry); Nov–Jan `billingStartsAt` **98** (82 ok PM, 14 missing PM, 1 expiring card, 1 stopped).
- [x] Confirm customer/entity matching, agreed product, renewal amount, due date, recorded consent, and notices already sent. Evidence: [preflight.json](../PLLC-CRM/crm/reports/p1-04-2026-10-20/preflight.json). $99 RA, trial end 2026-10-23, formation order 2025-10-23; T-30/T-7 `sent` in `DirectRaNoticeLog`; checkout disclosure audited Aug 26.
- [x] Verify that the October 16 T-7 notice for the first renewal follows the existing approved workflow. Evidence: [P1 readout](../PLLC-CRM/crm/reports/p1-2026-10-18/README.md) · [launch status](../PLLC-CRM/crm/docs/direct-ra-launch-status.md). Sent Oct 15, add-a-card subject.
- [x] Check payment-method availability, failed prior charges, invoice settings, Smart Retries/card-update settings where available, and the customer-facing statement descriptor. Evidence: [P1-04 preflight](../PLLC-CRM/crm/reports/p1-04-2026-10-20/README.md). Oct 23 sub: **no PM** (charge will fail without card). RA product descriptor **REG AGENT** on `prod_TcKQ9C8jkfcIsA`; live descriptor verify on first paid invoice Oct 23. Smart Retries: Dashboard checklist in [nov-jan-card-health.json](../PLLC-CRM/crm/reports/p1-04-2026-10-20/nov-jan-card-health.json).
- [x] Find customers with active VM. Check whether RA is included under their agreement and whether a separate RA renewal has been suppressed or otherwise correctly handled. Evidence: [preflight](../PLLC-CRM/crm/reports/p1-04-2026-10-20/README.md). One overlap entity; RA stop-at-period-end + opt-out, VM-only billing path.
- [x] Verify that cancellation/stop-charge choices remain honored. Distinguish stopping billing from changing the state's agent or mailing-address record. Evidence: [preflight.json](../PLLC-CRM/crm/reports/p1-04-2026-10-20/preflight.json) stop-charge sample + Sep 16 E2E in [launch status](../PLLC-CRM/crm/docs/direct-ra-launch-status.md).
- [x] Test notice links, customer identity matching, suppression logic, and receipt generation using test data. Do not create an unnecessary live charge for testing. Evidence: HMAC URLs valid in preflight; `npx tsx --test lib/direct-ra/direct-ra.test.ts` 17/17 Oct 20; Sep 16 prod-signed stop-charge E2E (throwaway).
- [ ] On October 23, inspect the actual invoice and payment outcome. Confirm the amount, descriptor, receipt, and absence of duplicate billing. **Scheduled:** Ops Oct 23 — steps in [P1-04 preflight § Oct 23](../PLLC-CRM/crm/reports/p1-04-2026-10-20/README.md).
- [x] Assign an exception owner for failed payment, incorrect amount, unclear consent, duplicate subscription, or customer dispute. Follow the existing correction/refund process. Evidence: [preflight.json](../PLLC-CRM/crm/reports/p1-04-2026-10-20/preflight.json) `exceptionOwners` + [dispute evidence](../PLLC-CRM/crm/docs/direct-ra-dispute-evidence.md).

Done when: the due population is reconciled, the first renewal outcome is documented, and every billing exception has an owner. One successful charge is operational evidence, not proof of 65% retention.

### P1-05. Reconcile VM economics and the customer promise

Owner: Ops. Support: Agent. Decision owner: Sid. Due: October 27, ahead of the October 31 gate. Required. Dependency: P1-02.

- [x] Separate paid-active, unpaid-trial, past-due, canceled, and incomplete-checkout records. Do not count the 67 pending checkouts as subscribers. Evidence: [scorecard](scorecards/2026-10-18-weekly.md). 89 active; 16 trialing; pending checkouts excluded.
- [ ] Match VM and RA by entity and agreement. Document which services are included and eliminate forecast overlap.
- [ ] For at least one normal operating week, record mail volume, receiving/sorting/scanning/forwarding time, customer support, supplies, software, and payment costs.
- [ ] Separate customer-reimbursed postage from service revenue and unreimbursed costs. Review low-volume and high-volume accounts separately.
- [ ] Recalculate monthly customer churn using active-customer exposure. Separate voluntary cancellation, failed-payment churn, closure, and migration to another arrangement.
- [ ] Compare checkout attach and later OP-approved attach within a single 90-day formation cohort. Count each entity once.
- [ ] Reconcile the advertised service with actual operations: scanning, weekly forwarding, package handling, RA inclusion, postage, cancellation, and filing-change assistance.
- [ ] Confirm the permitted uses of the address and the limits of privacy claims. A mailing address is not automatically an acceptable clinical location or a replacement for all required residential information.
- [ ] Estimate margin under $50 monthly versus $540 annually. Include the revenue discount, processing savings, servicing cost, and evidence needed to justify retention assumptions.

Done when: there is one product definition, one actual paying-subscriber count, a defensible monthly contribution estimate, and a billing-overlap reconciliation.

### P1-06. Build the smallest useful scorecard

Owner: Agent. Decision owner: Sid. First version: October 23. Required. Dependency: enough of P1-02/P1-03 to expose gaps.

- [x] Produce a simple weekly table before building reporting automation. The first report may be a manual export and calculation. Evidence: [scorecard](scorecards/2026-10-18-weekly.md).
- [x] Show formation orders, contracted sales, collected cash, refunds, unpaid installments, contribution before acquisition, acquisition cost, and contribution after acquisition. Evidence: [scorecard](scorecards/2026-10-18-weekly.md).
- [ ] Show orders by one primary source, with unknown kept as unknown. Retain partner involvement and assisted touches in separate fields.
- [ ] Show eligible visitors, checkout starts, successful first payments, payment errors, captured abandoners, emails sent, and subsequent purchases.
- [ ] Show productive partners, first partner orders, repeat partner orders, and outreach/conversation counts by segment.
- [ ] Show paying VM customers, new starts, churn, attach rate, contribution, RA renewals due, matured paid-renewal rate, and billing exceptions.
- [ ] Show fulfillment touch time, avoidable rework, customer-action backlog, and government-wait backlog separately.
- [x] Mark every assumed or immature figure. Add a three-line weekly decision note: what changed, what is uncertain, and what action follows. Evidence: [scorecard](scorecards/2026-10-18-weekly.md).

Done when: a 30-minute review can identify the most important growth bottleneck and the most important operational exception.

### P1-07. Inspect the buying journey and speak to customers

Owner: Agent for inspection; Sid/Ops for conversations. Due: October 26. Required. Dependency: access to analytics and reachable customers.

- [ ] Pull the last 60 days of the funnel by device, main landing page, campaign/source, and new versus existing customer where reliably available.
- [ ] Check whether checkout-start events represent unique starts, repeated opens, or page views. Reconcile fractional ad attribution with actual CRM purchases.
- [ ] Inspect the five most-used landing pages and the order flow on real mobile layouts and desktop. Verify price, installment visibility, keyboard behavior, scrolling, loading, and error messages.
- [ ] Check whether embedded-checkout failure has a working direct-checkout fallback, and whether source/partner attribution survives that route.
- [ ] Ask approximately ten recent buyers and ten reachable abandoners for brief feedback. If fewer respond, record the actual number and do not manufacture a complete sample.
- [ ] Ask buyers what triggered the purchase, what nearly stopped it, what alternatives they considered, and what convinced them to trust the service.
- [ ] Ask abandoners whether the obstacle was readiness, price, structure/eligibility uncertainty, missing documents, trust, timeline, or payment friction. Record their own words before categorizing.
- [ ] Rank the findings by frequency, commercial impact, and effort. Separate a confirmed malfunction from a hypothesis based on a small sample.

Done when: the top three purchasing obstacles have evidence, and proposed fixes correspond to those obstacles.

### P1-08. Ship a limited conversion and trust-improvement sprint

Owner: Agent. Content decision: Sid. Fulfillment validation: Ops. Due: October 28. Required. Dependency: P1-07; urgent bugs can be fixed earlier.

- [ ] Put the complete formation price, publication inclusion, and actual installment terms immediately next to the buying action. Show total price as well as installment amount.
- [ ] Explain the sequence from completed intake to professional approval, DOS filing, and publication. Separate internal turnaround from government waiting time.
- [ ] Make the next step after payment explicit, including information the customer can supply later if the workflow permits it.
- [ ] Add a clear route to brief administrative help. Route legal/tax structure decisions to the customer's adviser.
- [ ] Reconcile formation-count and review-rating claims with records. If a claim includes legacy or sister-company work, label that scope accurately.
- [ ] Fix confirmed mobile/payment problems. Use sandbox or test modes where possible; exclude test orders from reporting.
- [ ] Verify abandonment capture and purchase suppression. Keep the 1-hour and 24-hour sequence useful and factual; add a 72-hour personal-help touch only if early feedback supports it.
- [ ] Prepare a review request tied to a genuine successful milestone. Ask for an honest review without conditioning it on a positive response.
- [ ] Record deployment date, affected pages, expected metric, and rollback steps. Avoid a full redesign.

Done when: the limited fixes work end to end and subsequent price testing has a documented, stable buying journey.

### P1-09. Refresh paid-search evidence and resolve account-policy work

Owner: Agent/ads operator. Decision owner: Sid. Initial review: October 21. Required. Dependency: current account access.

- [ ] Pull current 7-, 30-, and 60-day spend, conversions, CRM-attributed orders, conversion lag, and campaign/search-term data.
- [ ] Reconcile Google purchases with CRM orders without importing duplicate primary conversions. Explain discrepancies rather than forcing the numbers to match.
- [ ] Inspect each current disapproval and limitation, including the paused attorney group. Record the exact policy reason and the status of any existing verification/certification.
- [ ] Review the current government-documents policy, including the October 5 update, against the actual service and account facts. Determine whether certification, a valid exclusion request, or an appeal is appropriate.
- [ ] Assemble accurate supporting information and submit only the applicable process through the existing account. Do not imply government authorization the business does not have.
- [ ] Confirm that the prior negative-keyword failure has not recurred. Check short tokens, cross-campaign negatives, and active keyword coverage.
- [ ] Review foreign-qualification traffic with its small sample clearly labeled. Do not interpret $53 of historical spend as a meaningful demand test.
- [ ] Document the Microsoft address mismatch, the evidence required to correct it, and the remaining attempts. Continue through the existing case.
- [ ] Prepare a November 1 decision memo with order volume, lag, actual economics, policy status, and data limitations. Retain the current $105 setting unless the adopted SOP calls for a change.

Done when: Sid has fresh evidence and a specific policy-resolution path. “Write another ad” is not a resolution if the underlying eligibility issue remains.

### P1-10. Reactivate useful partner relationships and begin a targeted pilot

Owner: Sid. Support: Agent for preparation; Ops for handoffs. Due: first sends October 19; review October 29. Required. Dependency: P1-01's adopted timing decision.

- [x] Review the 47 partner records. Identify who has produced an order, who has a real relationship, who only received a code, and who has never responded. Evidence: [partner review](../PLLC-CRM/crm/reports/p1-10-2026-10-20/partner-review.md). 9 advocates produced a paid order; 37 advocates and 1 professional referrer (EXP) are code-only. CRM does not store invite replies, so "never responded" is not a separate count.
- [x] Separate advocates, professional referrers, and wholesale firms so their performance is not mixed. Evidence: [partner review](../PLLC-CRM/crm/reports/p1-10-2026-10-20/partner-review.md). 46 advocates, 1 professional referrer, 0 wholesale rows in CRM. Wholesale pitches are prospects, not CRM partners yet.
- [x] Build a first list of 20–25 firms across clinician-focused accountants, small law firms, billing/practice consultants, and out-of-state formation providers. Mix warm reactivation with new prospects, but label each. Evidence: [first 25](../PLLC-CRM/crm/reports/p1-10-2026-10-20/first-25-firms.md). 10 warm, 15 new. No law firm and no out-of-state formation company had a verified inbox.
- [x] Verify the relevant contact and the reason the firm may encounter New York professional-entity work. Do not fill the list with generic businesses that lack that demand. Evidence: [first 25](../PLLC-CRM/crm/reports/p1-10-2026-10-20/first-25-firms.md). Contacts are the addresses already sent. Clarity and Empire Risk stay off the list (no public email).
- [x] Prepare a short service sheet: scope, all-in pricing, controlled turnaround commitments, status reporting, handoff process, client relationship, and escalation contact. Evidence: [service sheet](../PLLC-CRM/crm/reports/p1-10-2026-10-20/service-sheet.md).
- [x] Prepare two concise outreach approaches for different segments. Lead with administrative work removed and client reliability; discuss economics after fit is established. Evidence: [Wave 3](../PLLC-CRM/crm/reports/b2b-partner-outreach-wave3-2026-10-19.md).
- [x] Sid sends the initial messages. Schedule no more than one unsolicited follow-up around day 7, consistent with the existing two-touch plan. Respect opt-outs. Evidence: [send log](../PLLC-CRM/crm/reports/b2b-partner-outreach-wave3-2026-10-19-send.json). 16 sent Oct 19 from `contact@nypllc.com` (13 referral, Pact CPA, Sheldon Richards, and Glenn Kempa wholesale). Clarity and Empire Risk have no public email. Day-7 follow-up is still Oct 26.
- [ ] Seek 3–5 substantive conversations. Ask how many relevant cases the firm handled in the last 90 days and how it handles them now.
- [ ] Ask suitable prospects for one live case. Record objections and next steps even when the prospect declines.

Done when: the pipeline contains actual conversations and potential cases, not merely issued codes.

### P1-11. Prepare the early price test and partner fulfillment terms

Owner: Agent for design; Sid for decisions; Ops for fulfillment. Due: October 29. Required. Dependency: P1-03 and P1-08.

- [ ] Define the $985 test's eligible product and audience. Exclude existing quotes and contractual partner pricing from unintended changes.
- [ ] Select a practical design: a staged price change with source-adjusted comparisons by default; a contemporaneous randomized test only if existing tools can keep assignment, quotes, checkout, and ads consistent without substantial engineering.
- [ ] Document the limitations of a before/after comparison, especially the holiday calendar. Do not promise statistical certainty from 50 monthly orders.
- [ ] Set the primary metric to expected collected contribution per eligible visitor. Monitor first-payment conversion, contribution per order, refunds, payment failures, and fulfillment quality.
- [ ] Define a full, honest price display across site, checkout, ad assets, installments, and coupons. Honor prior quotes and saved offers under a written policy.
- [ ] Write provisional continue/hold/revert rules before launch. Use the audited contribution model; do not copy the old +$90,000 assumption.
- [ ] Confirm wholesale prices and whether discounts and referral payouts can stack. Set a contribution floor and obtain targeted review of partner terms where required.
- [ ] Define partner intake, status updates, payment responsibility, exception handling, and a one-business-day response commitment that Ops can meet.

Done when: the test is ready for a controlled launch and the first partner order can be fulfilled without creating a new portal.

### P1-12. Hold the Day 14 review

Owner: Sid. Support: Ops and Agent. Date: October 29. Required. Dependency: preceding packages; unresolved items remain visible.

- [ ] Review the corrected economics and list every material unknown.
- [ ] Review the first RA renewal and unresolved billing exceptions.
- [ ] Confirm that the checkout changes work and the proposed $985 rollout has a consistent customer-facing price.
- [ ] Review conversations, first-case opportunities, and why prospects accepted or declined.
- [ ] Choose whether to launch the price test in Period 2, keep gathering evidence, or fix a blocking issue first.
- [ ] Assign a next action and due date to every blocker. Limit active engineering work to the most consequential unresolved item.
- [ ] Publish the first scorecard and the revised 90-day priorities.

Done when: the review records the next decisions, named owners, and unresolved blockers.

Period 1 exit standard: trustworthy enough economics to run bounded experiments; no unowned imminent billing issue; a working purchase path; and partner selling underway. Missing data does not justify stopping all commercial work.

## Period 2: Days 15–45 — October 30–November 29

### P2-01. Launch and monitor the $985 formation-price test

Owner: Agent for implementation; Sid for launch/decision; Ops for support. Target launch: November 2–4. Required if P1-11 passes. Dependencies: stable purchase flow, reconciled economics, and the adopted early-test decision.

- [ ] Archive the baseline: eligible visitors, source mix, orders, collected cash, expected collectible balance, refunds, discounts, and contribution. Use the most recent stable comparison weeks, not an arbitrary tiny seven-day sample.
- [ ] Confirm the test applies only to the intended retail formation SKU. Preserve existing quotes, contractual wholesale rates, and agreed offers.
- [ ] Update all customer-facing price references together: relevant landing pages, order page, hosted checkout, installment amounts, ad price assets, confirmation text, and relevant partner materials.
- [ ] Verify that installment amounts and the disclosed total agree. Check whether any financing or processing fee changes the promised total.
- [ ] Store the actual offered price and experiment/cohort identifier with the order. Retain acquisition and partner fields.
- [ ] Run the applicable test-mode purchase checks and confirm that live reporting excludes those tests.
- [ ] Monitor errors, complaints, and quote mismatches daily for the first three working days. Correct malfunctions promptly.
- [ ] Keep the substantive offer and checkout design stable after launch. Log necessary exceptions so their impact can be interpreted.
- [ ] Compare contribution per eligible visitor by comparable source/device groups. Show raw results and a source-mix-adjusted comparison; do not hide an unfavorable raw result.
- [ ] Use matured historical collection experience to estimate unpaid installments, while showing actual cash separately. Do not count every newly booked installment as collected profit.

Done when: the test has a trustworthy exposure/order record, consistent pricing, a documented baseline, and a scheduled decision. Launching it is not evidence that $985 won.

### P2-02. Run a weekly commercial review without changing everything

Owner: Sid. Preparation: Agent. Cadence: weekly, approximately 30 minutes. Required. Dependency: P1-06.

- [ ] Review the scorecard before the meeting; flag only material changes and exceptions.
- [ ] Identify whether the current constraint is qualified traffic, checkout completion, partner handoff, collection, or fulfillment capacity.
- [ ] Review the price test using both margin and conversion. Check for differences in profession, source, payment-plan mix, and purchase lag.
- [ ] Classify each conclusion as observed, inferred, or unknown. Record sample size and period.
- [ ] Make at most one new major funnel/pricing change at a time. Keep operational repairs distinct from optional growth experiments.
- [ ] Assign one owner and one next review date to each commercial decision. Close or stop tasks that no longer address the constraint.
- [ ] Keep year-end and holiday effects visible; avoid interpreting a short low-response week as a definitive pricing or partner failure.

Done when: each weekly review produces a small number of decisions and the evidence needed for the next one.

### P2-03. Expand the targeted partner pipeline

Owner: Sid. Support: Agent. Due: ongoing through November 25, with reporting through November 29. Required. Dependency: P1-10.

- [ ] Add roughly 40–50 qualified firms to the initial 20–25. Aim for approximately 60–75 distinct firms contacted cumulatively by the period end, with warm and cold activity separated.
- [ ] Prioritize segments that have demonstrated actual relevant volume. Do not broaden simply because a list is easy to build.
- [ ] Set a normal-week cadence of approximately 12–15 new firms, adjusted for holidays and actual capacity.
- [ ] Personalize the reason for contact using the firm's client base or current service. Avoid unsupported claims about its needs.
- [ ] Continue the one-follow-up rule for unanswered cold outreach. Move interested conversations into a mutually agreed next step instead of an automated cold cadence.
- [ ] Ask about cases handled, current provider, operational pain, decision maker, who pays, expected volume, and requirements for a first handoff.
- [ ] Keep 8–10 substantive conversations as a cumulative learning target by period end, not a quota that justifies low-quality meetings.
- [ ] Select 2–3 firms for a first paid case or a clearly scheduled live opportunity. Do not count a verbal expression of interest as revenue.
- [ ] Record why each declined prospect declined: no volume, already satisfied, price, scope, trust, timing, or terms.

Done when: there is enough segmented evidence to choose where the next 50 contacts should come from.

### P2-04. Fulfill the first partner orders and remove handoff friction

Owner: Ops. Relationship owner: Sid. Support: Agent. Due: within one business day of each qualified handoff. Required when an order arises. Dependency: P1-11 partner terms.

- [ ] Confirm whether the transaction is a referral or wholesale order, and who is responsible for customer payment and communication.
- [ ] Confirm scope, entity type, profession, price, discount, any referral payment, and the agreed legal/advisory boundary.
- [ ] Provision the existing code/link or manual order route. Verify attribution at the CRM order level; do not rely solely on a 30-day cookie.
- [ ] Collect the required client authorization and intake through the established secure workflow.
- [ ] Tell the partner exactly what happens next, who will contact the client, and when to expect a status update.
- [ ] Send meaningful milestone updates under the agreed arrangement. Separate waiting on the customer, waiting on government, and internal work.
- [ ] Log actual staff time, avoidable rework, and all extra requests. Compare contribution against the assumed wholesale economics.
- [ ] Settle referral payouts only at the agreed qualifying milestone. Reconcile refunds/cancellations before treating a payout as earned.
- [ ] After a successful early milestone, ask the partner what was difficult and identify the next relevant client.
- [ ] Update the short partner procedure from real feedback. Do not build a custom portal unless repeated paid demand demonstrates the need.

Done when: the first case works end to end and the partner understands how to send the next one.

### P2-05. Improve VM attachment on new formations

Owner: Agent for implementation; Ops for setup; Sid for copy. Target: before November 14. Required. Dependency: P1-05.

- [ ] Put the verified VM service definition and full recurring price at the relevant checkout decision. Keep the choice optional and unselected by default.
- [ ] Explain supported mailing/address uses, RA inclusion, postage, setup requirements, and cancellation accurately.
- [ ] Rewrite the OP-approved message around the actual address decision before filing. Explain what the customer must decide and by when.
- [ ] Add the planned second touch only for eligible customers who have not responded or purchased. Suppress buyers, cancellations, opt-outs, and customers for whom the service does not fit.
- [ ] Review the 67 pending checkouts individually by status. Build a clean eligible follow-up segment; do not send every historical record the same message.
- [ ] Track message sent, delivered where available, clicked where reliable, setup started, setup completed, first successful payment, and time to activation.
- [ ] Review support questions from the first ten starts. Fix repeated confusion in the offer before increasing promotion.
- [ ] Report checkout starts and later OP starts separately, then deduplicate into the combined 90-day attach rate.
- [ ] Keep the 30% attach objective as a cohort target. Do not declare success from an immature cohort or a handful of starts.

Done when: the revised offer is accurate, setup completes reliably, and new paid subscribers can be traced to the relevant formation cohort.

### P2-06. Prepare the existing-practice VM migration pilot

Owner: Ops for service design; Sid for commercial scope; Agent for materials. Due: November 13. Required preparation; paid rollout is conditional on readiness.

- [ ] Define a narrow initial customer: an existing professional entity with a genuine business-mail need and no unresolved question about the address's permitted use.
- [ ] Define included work, exclusions, setup documents, identity/authorization requirements, mail activation, relevant state-record changes, and customer responsibilities.
- [ ] Check applicable mail-receiving and professional-entity requirements before promising the service. Quote unusual filings separately.
- [ ] Cost the migration work. Set a transparent setup/change fee and determine whether that fee includes any government fee.
- [ ] Explain that subscription start, completion of a filing change, and safe termination of an old service may be different dates.
- [ ] Prepare one concise offer page or service sheet and an existing checkout/invoice route. Use a manual intake for the pilot.
- [ ] Select 10–15 suitable prospects from permitted past-customer contacts and partner introductions. Do not treat all former formation buyers as suitable mail customers.
- [ ] Ask for a paid pilot purchase after confirming fit. Do not issue an unsolicited invoice as if the customer already ordered.

Done when: a customer can understand the offer, pay for a defined scope, and migrate without gaps in important mail handling.

### P2-07. Measure recurring cohorts and improve collection operations

Owner: Ops. Analysis: Agent. Decision owner: Sid. Due: weekly; first October renewal matures around November 22. Required. Dependency: P1-04/P1-05.

- [ ] Review successful and failed recurring charges weekly. Keep voluntary cancellation distinct from payment failure and billing errors.
- [ ] Use the established retry/reminder process. Confirm the customer has a clear way to update payment information and stop a future charge.
- [ ] Check support response time for billing questions. Resolve inconsistent product descriptions or duplicate records promptly.
- [ ] Report RA first renewal only after the chosen 30-day post-due window. Mark later-due cohorts as immature.
- [ ] Report both the eligible due population and exclusions such as RA included with VM. Show exclusions explicitly rather than quietly improving the denominator.
- [ ] Inspect any dispute immediately. Retain raw counts alongside rates because the early cohorts are small.
- [ ] Keep the current Compliance Plan experiment's assignment consistent. Do not silently replace its offer and then combine the results as one experiment.
- [ ] If the existing red-flag rule is triggered, follow the agreed pause/review process for the upgrade offer; preserve correct base-service handling.
- [ ] Update the VM cohort model using observed starts, lag to activation, churn, and unit contribution. Keep any annual discount out of the base case until justified.

Done when: the recurring forecast is grounded in actual billing and the limitations of the early renewal sample are visible.

### P2-08. Complete the November ads decision and prepare bounded expansion

Owner: Agent/ads operator. Decision owner: Sid. Prepare: October 30; finalize after October closes, ordinarily November 2. Required. Dependencies: P1-03/P1-09.

- [ ] Complete the original November 1 verdict using the full October window, then explain conversion lag and attribution limitations.
- [ ] Present the original order-count branch and the additional profit-based evidence side by side. Record any adopted change to the operating rule.
- [ ] Resolve or advance the applicable ad-policy process. Keep a log of submissions and decisions; do not repeatedly submit unsupported claims.
- [ ] Before November 14, complete necessary tracking, price-asset consistency, and policy corrections.
- [ ] Define a later budget experiment: campaign, baseline, incremental spend cap, duration, expected collectible contribution, operational capacity, and stop condition.
- [ ] Distinguish an experimentally estimated incremental result from a before/after estimate. A tracked ad purchase is not automatically an incremental purchase.
- [ ] Keep discretionary structural ads and landing-page changes frozen November 15–December 1 under the adopted plan.
- [ ] Advance Microsoft verification with the correct business evidence. Build and verify msclkid capture before any reinstated spending.
- [ ] Do not allocate an automatic January surge. Prepare a demand- and profit-based budget decision for Period 3.
- [ ] At the October 31 affiliate gate, time-box the pending-program decision to one hour: verify approval/link status and choose whether one suitable backup application is worth completing. Keep unapproved programs at zero and avoid an open-ended follow-up project.

Done when: the account is managed under an explicit rule, the freeze is respected, and any future spend increase is a bounded experiment.

### P2-09. Prepare the PC pilot and audit the existing S-corp add-on

Owner: Ops for process; Agent for costing/materials; Sid for scope. Review: counsel/accountant where needed. Due: November 20. Required preparation; paid pilot conditional on a ready workflow.

- [ ] Review historical inquiries and partner feedback for customers who actually wanted a PC. Do not infer demand only from search volume or the existence of the entity type.
- [ ] Define the pilot's supported professions, ownership patterns, and standard scope. Route unusual ownership, governance, and structural questions to counsel.
- [ ] Verify current NYSED/DOS steps, fees, post-filing registration, and ongoing requirements for that scope using official sources.
- [ ] Create a PC-specific checklist and completion definition. Do not copy the PLLC publication workflow unchanged.
- [ ] Cost actual filing work, document handling, customer support, and any professional review. Choose a test price only after that calculation; $985–$1085 is a hypothesis.
- [ ] Prepare a manual quote and checkout/invoice process using current tools. Identify who owns the case and who reviews the filing packet.
- [ ] Ask 3–5 qualified partners whether they have a live suitable PC case. Require a paid order before treating the product as validated.
- [ ] Audit the existing $195 S-corp add-on: what is filed, which jurisdiction(s) it covers, proof of submission, acceptance follow-up, and handoff to the client's tax adviser.
- [ ] Correct any gap between the S-corp offer and actual fulfillment. A larger package or higher add-on price remains a separate later test.

Done when: the PC pilot has a narrow, costed workflow and a real prospect pipeline; the existing add-on's scope is accurate.

### P2-10. Publish one useful resource and improve proof

Owner: Agent. Review: Sid/Ops. Due: November 13. Required but time-boxed; do not displace billing or partner fulfillment.

- [ ] Choose one resource repeatedly requested in customer or partner conversations, such as a profession-specific administrative checklist or an explanation of filing milestones.
- [ ] Use verified operational facts. For processing-time observations, report sample size, dates, profession, and whether still-open cases are excluded; do not imply the result is an official statewide guarantee.
- [ ] Remove identifiable customer details and obtain permission before publishing a named testimonial or case study.
- [ ] Give the resource a clear next step to the appropriate formation or partner service.
- [ ] Ask engaged partners whether they want to share or reference it. Track resulting visits and inquiries.
- [ ] Run the honest-review request workflow at the chosen milestone. Verify that it reaches real customers once and respects communication preferences.
- [ ] Review current site claims, prices, links, and service descriptions for consistency with the live offer.

Done when: one useful, accurate asset is available to support selling and real customer proof is accumulating.

### P2-11. Rebuild the 2028 model and check market size

Owner: Agent. Decision owner: Sid. Due: November 24. Required. Dependency: audited baseline and early test evidence.

- [ ] Build the forecast by month through December 2028, separating product mix from acquisition channel.
- [ ] Count each formation once under a primary channel. Apply checkout/recovery improvements within that channel's conversion model.
- [ ] Model VM subscribers as opening balance less churn plus unique paid activations, with an explicit lag from formation to VM start.
- [ ] Model RA by actual renewal eligibility dates. Formations sold in 2028 do not automatically create year-two RA revenue in 2028.
- [ ] Remove RA charges included with VM and other bundled products. For Compliance Plan upgrades, model the full replacement price and costs rather than adding an entire plan price on top of an included base.
- [ ] Deduct advertising, cash referral payments, incremental staffing, and shared overhead exactly once. Show a cash view separately from annual operating profit.
- [ ] Keep CAQH and unapproved/non-earning affiliate programs at zero in the base case. Put unproven PC/other service volume in an explicitly labeled scenario.
- [ ] Time-box an official-data market check: count distinct initial NY professional-entity formations/qualifications by type and year; exclude amendments and distinguish active-only data from all filings.
- [ ] Record missing or inaccessible data and avoid inventing a market-share estimate. A count of existing licensed professionals is not the annual formation market.
- [ ] Show downside, target, and stronger-performance cases, and identify the two assumptions that drive most of the difference.

Done when: there is a monthly model whose assumptions reconcile to the scorecard and whose unknowns are explicit.

### P2-12. Hold the Day 45 review

Owner: Sid. Support: Ops and Agent. Prepare meeting November 25; reporting boundary November 29. Required.

- [ ] Decide whether the price test supports keeping $985 provisionally, reverting, or extending observation. State whether the evidence is directional or strong.
- [ ] Select the one or two partner segments with the best combination of demand, responsiveness, repeat potential, and contribution.
- [ ] Review paid handoffs and what prevented prospects from sending a case.
- [ ] Review VM paid starts, setup completion, cost, churn, and the readiness of the existing-practice pilot.
- [ ] Review PC readiness and actual opportunities. Do not launch a broad campaign just because the checklist is complete.
- [ ] Approve only the next bounded ad experiment whose tracking, policy status, and economics support it; otherwise keep spend stable.
- [ ] List the specific products and projects that remain paused. Carry forward only necessary unresolved work.

Done when: the price, partner-segment, VM, pilot, and advertising decisions are documented with evidence and a next review date.

Period 2 exit standard: a functioning commercial experiment, real partner handoffs or clearly diagnosed objections, measured VM operations, and a costed adjacent-product pilot. Ambiguous price evidence is a reason to continue measuring, not to fabricate a winner.

## Period 3: Days 46–90 — November 30–January 13

### P3-01. Decide the next pricing action

Owner: Sid. Analysis/implementation: Agent. Support: Ops. First decision: December 2; reassess as evidence matures. Required.

- [ ] Summarize the $985 period against the documented baseline: eligible traffic, source mix, first-payment conversion, actual/expected collection, refunds, contribution per order, and contribution per visitor.
- [ ] Check that any gain survives reasonable bad-debt and cost assumptions. Identify whether a few unusual orders explain the result.
- [ ] Examine lower volume's effect on VM and future RA customer cohorts; do not treat a higher formation margin as the entire customer economics.
- [ ] Choose one of four actions: keep $985 provisionally; revert; continue measuring at $985; or prepare a subsequent $1085 test.
- [ ] If $1085 is considered, calculate its break-even conversion retention using audited costs and a conservative recurring-value allowance.
- [ ] Launch a subsequent price test only after the existing freeze ends and the earlier result is usable. Keep other optional acquisition changes stable during the comparison.
- [ ] If holiday demand or thin data makes the next step unclear, retain the defensible price and set a dated follow-up. Do not force a second test merely to complete a checklist.
- [ ] Update customer-facing pricing, partner expectations, customer-support guidance, and the forecast only after the decision.

Done when: the business has an explicit price position, the evidence supporting it, and a scheduled next decision. “Provisional” is acceptable; unsupported certainty is not.

### P3-02. Turn partner acquisition into a repeatable weekly process

Owner: Sid. Support: Agent for research and tracking; Ops for fulfillment. Due: weekly through January 13. Required.

- [ ] Reach approximately 100–150 distinct qualified firms contacted cumulatively by Day 90, including separately labeled warm/reactivated and cold prospects.
- [ ] Concentrate the additional contacts in the one or two segments with the strongest observed demand and economics.
- [ ] Maintain outreach and follow-up records even when contact volume slows during holidays. Do not compensate with a rushed bulk blast.
- [ ] Reach approximately 10–15 substantive conversations cumulatively, or record the bottleneck if the actual number is lower.
- [ ] Track each opportunity through Conversation, Suitable live case, Paid first order, Successful milestone, and Repeat order.
- [ ] Seek 3–5 firms producing paid orders and at least two producing a second order. Use these as management targets, not assumed forecast inputs.
- [ ] Ask first-order partners for the next appropriate case and a specific review of the handoff. Find whether lack of repeat volume reflects timing, no demand, or service friction.
- [ ] Estimate each productive firm's realistic quarterly volume from actual cases and its business model. Avoid treating every partner as capable of one order per month.
- [ ] Build a Q1 list of the next 50 qualified firms using what was learned. Identify who Sid needs to meet personally.
- [ ] Make large platforms a secondary effort until smaller partnerships produce repeat orders. Limit exploratory platform time rather than allowing one long sales cycle to dominate the calendar.

Done when: partner growth has a known funnel, repeat behavior, and a credible next segment to pursue.

### P3-03. Tighten partner economics and service standards

Owner: Ops and Agent. Decision owner: Sid. Due: December 18 and January 8. Required when partner cases exist.

- [ ] Calculate contribution on every pilot partner order after discounts, referral cash, processing, fulfillment time, and rework.
- [ ] Compare pricing tiers with demonstrated volume. Do not grant a high-volume tier solely for a nonbinding forecast.
- [ ] Check whether discount and payout combinations violate the chosen contribution floor. Fix terms for future orders while honoring existing commitments.
- [ ] Measure time to first response, time to complete intake, internal filing turnaround, partner status-update reliability, and missing-information loops.
- [ ] Record which tasks partners can accurately complete themselves and which Ops should retain to avoid errors.
- [ ] Standardize the proven intake and update format. Use a named account contact and existing CRM records before considering software development.
- [ ] Reconcile earned and paid referral amounts at the agreed milestone.
- [ ] Ask each productive partner for one concrete improvement and, where appropriate, a permissioned testimonial or introduction to a similar firm.
- [ ] Estimate the staff capacity required for 10, 20, and 30 partner orders monthly. Include support and exception handling.

Done when: more partner volume would improve profit without creating an unpriced service burden.

### P3-04. Run the existing-practice VM migration pilot

Owner: Ops. Commercial owner: Sid. Support: Agent. Start: when P2-06 is ready; any discretionary landing-page rollout after December 1. Required pilot if fit and capacity are established.

- [ ] Confirm each prospect's real mail problem, current arrangement, entity details, desired address use, and transition deadline.
- [ ] Expand the suitable prospect pool through partners and permitted past-customer contacts as needed. Ten paying migrations is the 90-day test target, not an assumed close rate from the initial 10–15 prospects.
- [ ] Present the subscription price, setup/change fee, included work, postage, cancellation, and expected transition steps before purchase.
- [ ] Secure the required service agreement and authorizations using the existing workflow. Verify applicable mail-receiving requirements.
- [ ] Record the customer-authorized plan for address/agent changes and coordinate the transition to avoid a gap in important mail.
- [ ] Confirm activation with the customer and verify the first successful subscription payment.
- [ ] Track setup minutes, filing/change costs, mail volume, support requests, gross contribution, and any unexpected service demands.
- [ ] Review each of the first three cases before expanding further. Repair the process if the same problem recurs.
- [ ] Contact the customer after initial use to verify that the service solves the original problem and that the customer understands its limits.
- [ ] Decide whether to standardize, revise, or pause the offer based on actual paying demand and contribution. Separate one-time migration profit from recurring contribution.

Done when: paid migrations demonstrate a repeatable, accurately described service with measured economics.

### P3-05. Fulfill 3–5 paid PC pilot cases

Owner: Ops. Commercial owner: Sid. Support: Agent. Professional review: as required by the chosen scope. Conditional on P2-09 readiness and suitable buyers.

- [ ] Confirm that each customer's entity choice has been resolved by the customer and their adviser where needed. Do not sell a PC on an unverified tax or liability promise.
- [ ] Verify the case fits the supported profession/ownership scope. Quote or refer exceptions instead of forcing them into the standard package.
- [ ] Give a clear written scope, total price, government-fee treatment, document responsibilities, and timeline explanation.
- [ ] Collect payment and required authorization through existing systems, then follow the PC-specific checklist.
- [ ] Complete quality review before filing and retain submission/acceptance evidence.
- [ ] Complete applicable post-filing registration and document delivery; do not stop at the first state acceptance.
- [ ] Measure work time by stage, rework, customer questions, elapsed waiting time, and full contribution.
- [ ] At completion or a meaningful milestone, ask the client/partner whether the offer met the original need.
- [ ] Decide whether the pilot supports a public standard SKU, a partner-only product, revised pricing/scope, or a pause. If fewer than three suitable paid cases arrive, report demand as unproven.

Done when: there are paid cases with measured outcomes, or a clear decision that the demand/operating case remains insufficient.

### P3-06. Run one bounded paid-acquisition experiment if the prerequisites pass

Owner: Ads operator/Agent. Decision owner: Sid. Earliest discretionary change: December 2. Conditional on reliable tracking, applicable policy eligibility, stable pricing, and available fulfillment capacity.

- [ ] Select one campaign or tightly defined acquisition opportunity. Do not simultaneously change targeting, landing page, offer, bidding strategy, and budget.
- [ ] Record the baseline, comparison method, incremental budget limit, review date, and contribution floor.
- [ ] Calculate the allowable acquisition cost from audited collectible contribution for that product/channel. Do not spend against speculative multi-year recurring value.
- [ ] Prefer a valid account experiment when practical. Otherwise label the before/after incrementality estimate provisional and explain confounders.
- [ ] Monitor actual spending, qualified traffic, payment outcomes, conversion lag, and search terms. Investigate billing/tracking problems immediately.
- [ ] Judge performance after a reasonable observation window, using lag-adjusted collected/collectible contribution. A single expensive day is a signal to inspect, not proof of failure.
- [ ] Increase spending only if additional demand remains profitable and operations can absorb it. Stop at the pre-agreed budget or downside limit.
- [ ] At the December 15 Microsoft gate, decide whether the verification path is viable. If unresolved, remove its assumed growth from the forecast and stop allocating substantial growth time to it.
- [ ] Before January, approve only a measured, conditional budget plan. Enter January with monitoring and capacity, not an unconditional spend commitment.

Done when: one experiment yields a usable marginal-profit estimate or a documented reason not to scale.

### P3-07. Update retention, billing quality, and the annual-service decision

Owner: Ops. Analysis: Agent. Decision owner: Sid. Due: weekly; formal review January 8–13. Required.

- [ ] Reconcile all recurring billing exceptions and the VM/RA inclusion rules.
- [ ] Recalculate RA first-renewal outcomes for cohorts with a full 30-day post-due window. As of January 13, that generally means due dates on or before December 14, subject to the actual due-time convention.
- [ ] Keep later December and January renewals out of the matured-retention denominator. Report them separately as pending.
- [ ] Show paid, voluntarily canceled, failed-payment, disputed, and excluded/included-in-VM counts. Investigate each adverse outcome.
- [ ] Review the existing Compliance Plan experiment under its original cohort assignment and red-flag rules.
- [ ] Define a more substantive annual-service offer only if customer needs and delivery cost justify it: applicable filings when due, entity-record maintenance, bounded administrative review, and clearly stated additional fees.
- [ ] Pilot a materially revised annual plan only with a distinct, clearly described cohort and appropriate customer agreement. Do not mix it into the earlier experiment's results.
- [ ] Reassess the annual VM discount using actual servicing and retention evidence. Keep a provisional lifetime-value calculation conservative.
- [ ] Prepare the January 15 recurring-services review from this evidence, even though that gate falls two days after this plan ends.

Done when: the recurring forecast uses matured cohorts and a defined service, not auto-renewal assumptions or incomplete trials.

### P3-08. Verify capacity and remove the highest-cost operational bottleneck

Owner: Ops. Analysis/support: Agent. Decision owner: Sid. Due: December 18; refresh January 8. Required.

- [ ] Use actual stage-level touch time from retail, partner, PC, and VM pilot cases.
- [ ] Estimate workload at 65, 90, 110, and 125 formations per month, plus the associated VM/RA service load.
- [ ] Separate elapsed government wait from staff work; distinguish one-time cleanup from recurring work.
- [ ] Identify the largest sources of rework: incomplete intake, inconsistent addresses, naming issues, missing signatures, publication handoff, status inquiries, or billing exceptions.
- [ ] Choose one process improvement that reduces a demonstrated bottleneck. Define the expected minutes/errors saved and the person responsible.
- [ ] Compare automation with a checklist, a clearer intake field, or a trained part-time operator. Select the smallest reliable fix.
- [ ] If additional staffing is needed, define role, hours, fully loaded cost, training, quality review, and the incremental order volume needed to fund it.
- [ ] Add the staffing cost to the forecast before treating higher volume as profit.
- [ ] Verify that partner response promises and customer updates remain achievable at the proposed volume.

Done when: the Q1 volume plan has a staffing/capacity explanation and a funded response to its principal bottleneck.

### P3-09. Decide which additional products remain on the shelf

Owner: Sid. Support: Ops/Agent. Due: January 8. Required prioritization; additional launches conditional.

- [ ] Keep CAQH at zero in the base forecast unless a genuinely different, narrowly defined offer attracts paid pilot commitments.
- [ ] Review filing-rescue inquiries. If recurring demand exists, define an administrative scope and quote 3–5 cases manually before building a public funnel.
- [ ] Distinguish document/filing rescue from legal restructuring, a disputed ownership issue, or advice on converting an unsuitable entity. Route the latter to appropriate counsel.
- [ ] Keep MSO work selective, within the existing reviewed scope, and dependent on suitable clients and counsel. Do not launch a broad campaign because the CRM workflow exists.
- [ ] Review actual affiliate approvals and earnings. Keep unapproved or non-earning programs out of the base case.
- [ ] Choose at most one additional commercial experiment beyond the two primary pilots if those pilots are operating well and capacity remains.
- [ ] Write a stop/defer list with a reason and a revisit trigger. Remove projects that lack a buyer, an owner, a margin estimate, or a distribution path.

Done when: the next-quarter roadmap fits available capacity and has a customer-demand rationale for every active product.

### P3-10. Finish the Day 90 review and set the Q1 operating plan

Owner: Sid. Preparation: Agent and Ops. Date: January 13, 2027. Required.

- [ ] Reconcile the 90-day results to actual orders, collections, acquisition costs, recurring charges, and fulfillment cost.
- [ ] Compare the price decision with the original hypothesis. Record retained conversion, contribution per visitor, refund/collection behavior, and remaining uncertainty.
- [ ] Count distinct contacted firms, substantive conversations, first-order partners, repeat-order partners, paid partner orders, and their contribution.
- [ ] Summarize VM paid starts and migrations, actual contribution, churn, and billing quality.
- [ ] Summarize PC paid cases and whether the product is ready for standard sale.
- [ ] Update the monthly 2027–2028 model with observed results, keeping unproven upside separate.
- [ ] Set Q1 targets: at least 65 formations per month outside a January spike, approximately five partner orders per month, measured RA renewal economics, and a VM target derived from the updated cohort model.
- [ ] Evaluate the older March 31 target of 200 VM subscribers against actual starting balance, paid additions, activation lag, and churn. Keep or revise it explicitly; do not assume it follows automatically from 65 formations monthly.
- [ ] Identify the three biggest gaps to the 2028 goal and assign one concrete initiative to each. Do not reopen every deferred project.
- [ ] Set the next structural checkpoint for June 2027: approximately 80–90 monthly formations, 10–15 partner orders, and evidence of sustainable improved margins.
- [ ] Define the action if that checkpoint misses: a larger distribution agreement, carefully underwritten acquisition opportunity, a different cost/price model, or a revised target date.
- [ ] Update the canonical status document through its normal owner/version process only after decisions are settled, preserving the dated history.

Done when: the results, revised forecast, Q1 responsibilities, and June contingency decision are explicit.

Period 3 exit standard: a defensible price decision; a real partner funnel with repeat behavior or a diagnosed failure; measured recurring economics; paid evidence for adjacent products; and a costed Q1 plan.

## Weekly operating routine

These are recurring checklist items within the 90-day plan. Assign them to the actual team calendar; this document does not itself create reminders or send messages.

| Cadence | Owner | Action | Time allowance |
|---|---|---|---|
| Each working day | Ops | Review imminent charges, failed payments, filing/customer exceptions, and partner handoffs | Approximately 15–20 minutes, more only for exceptions |
| Twice weekly | Sid | Protected partner outreach, conversations, and live-case follow-through | Approximately 2 hours per block |
| Weekly | Agent | Refresh scorecard and a short decision memo | Time-box the first manual version; automate only repeated useful work |
| Weekly | Sid + Ops | Review price evidence, margin, recurring issues, and capacity | Approximately 30 minutes |
| Weekly | Ads operator | Current SOP, tracking, policy status, terms, and spend | Approximately 30–60 minutes |
| Weekly | Ops | Review missing intake, rework, and stuck internal cases | Approximately 30 minutes |
| Every two weeks | Sid + Agent | Continue/change/stop decisions on active experiments | Approximately 30 minutes |

- [ ] Keep partner inquiries within the promised one-business-day response standard.
- [ ] Use exception-based billing checks; do not manually inspect every healthy subscription every day.
- [ ] Ensure every growth change appears in the change log with date, owner, reason, and affected metrics.
- [ ] Keep one major retail pricing/funnel experiment active at a time.
- [ ] Distinguish prospects contacted from conversations, and conversations from paid orders.
- [ ] Update each waiting task with the blocker and next action.
- [ ] Stop obsolete work promptly and release its capacity.

## Minimum scorecard definitions

Use stable definitions through the experiment. If a definition changes, preserve the old series or clearly annotate the break.

| Metric | Working definition | Common error to avoid |
|---|---|---|
| Formation order | One valid paid formation order per the CRM definition, deduplicated and excluding tests/VM-only purchases | Treating first installment as full cash collection |
| Collected revenue | Actual receipts less refunds, reconciled to the payment system | Mixing future installments with receipts |
| Expected collectible sales | Collected cash plus a documented estimate of collectible remaining balances | Assuming no payment-plan losses |
| Formation contribution | Sales on the chosen accounting basis less consistently defined fulfillment costs, fees, discounts, refunds/loss allowance, and labor | Double-counting allocated labor or ignoring cash referral costs |
| Primary source | One source per order under a written attribution hierarchy, including Unknown | Assigning the same order to multiple channels |
| Partner involvement | Separate flag/ID retained even when another source is primary | Erasing partner assistance to make channel totals add up |
| Eligible visitor | Deduplicated visitor/session under a fixed reporting definition for the tested retail flow, excluding known staff/test/bot traffic | Changing denominators when results are inconvenient |
| Contribution per eligible visitor | Expected collectible formation contribution divided by eligible visitors for the same exposure window, allowing purchase lag | Comparing revenue per purchase with profit per visitor |
| Productive partner | A firm with at least one qualifying paid order in the previous 90 days | Calling an issued code an active commercial relationship |
| Repeat-producing partner | A firm with a second distinct qualifying paid order | Counting repeated payments on the same order |
| VM paying active | A genuine active service subscription with a valid paid status under the agreed definition | Including incomplete checkouts |
| VM cohort attach | Unique VM activations within the defined 90-day window divided by eligible formation entities in that cohort | Adding OP upsells on top of an attach rate that already includes them |
| VM churn | Cancellations over the relevant active-subscriber exposure, with voluntary and failed-payment churn separated | Dividing all cancellations by cumulative starts and calling it monthly churn |
| RA matured renewal rate | Paid renewals within 30 days after due date divided by the explicitly defined eligible due cohort | Counting customers whose renewal is not due or not yet matured |
| Recurring contribution | Earned service revenue less actual service and collection costs | Counting annual prepayments entirely as one month's earned profit |
| Internal fulfillment time | Actual staff touch time and internal waiting attributable to the business | Treating NYSED elapsed review time as staff effort |
| Annual target | Profit over the whole calendar year | Substituting December run rate for a year's average |

## Experiment decision rules to adopt before launching

The thresholds below are proposed management rules. Sid should confirm them against audited economics and acceptable downside. They are not claims of statistical significance.

| Workstream | Continue or expand when | Hold, change, or stop when |
|---|---|---|
| Retail price | Expected contribution per visitor improves; collection/refund behavior is acceptable; source mix and lag do not plausibly explain the whole result | Malfunction/inconsistent quoted price requires repair; economically worse results require review; thin evidence means extend rather than declare a winner |
| Partner segment | Firms have relevant cases, send a paid case, and the handoff produces acceptable contribution | Contacts lack relevant volume; conversations reveal an unsuitable offer; first cases require excessive unpriced work |
| Partner activation | The firm sends a first case and can identify the next appropriate case | It only accepts a link/code with no actual case or realistic volume |
| VM attachment | Eligible customers activate and pay, the service solves their need, and contribution holds | Trials/pending checkouts rise without activation; setup confusion, unsuitable use, or service cost erodes the case |
| Existing-practice VM | Paid migrations work with clear terms and acceptable setup/ongoing contribution | Address use is unsuitable, transition creates unresolved mail risk, or costs exceed the quoted scope |
| PC formation | Suitable paid cases complete accurately at a defensible margin | No paid demand, repeated exceptions outside standard scope, or professional-review/fulfillment cost makes the offer unattractive |
| Paid acquisition | Additional spend produces sufficiently profitable additional demand within the agreed budget and capacity | Policy/tracking is unresolved, marginal economics deteriorate, or the spending cap is reached without adequate evidence |
| Compliance Plan | Customers understand and use concrete deliverables and service cost supports the price | The offer relies on vague reminders, billing ambiguity, disputes, or work that cannot be delivered profitably |

For pricing, an illustrative 10% improvement in contribution per visitor can be a worthwhile commercial signal, but it is not a universal pass threshold. For advertising, contribution less a retained-profit requirement is the relevant starting point; $220 is not valid if audited margin changes. For every test, report counts, time window, and uncertainty.

## Financial model checks

- [x] Reconcile the prior $476 and $520 formation economics before using either in a forecast. Evidence: [scorecard](scorecards/2026-10-18-weekly.md) · [extraction](../PLLC-CRM/crm/reports/p1-2026-10-18/extraction.md). Apr 1–Oct 15 book is $519 per order before ads and about $468 after Google spend is spread across all orders.
- [ ] Hold volume loss and recurring-customer loss together in price scenarios.
- [ ] Use actual average subscribers during the year, not only December subscribers.
- [ ] Recognize a discounted annual VM plan at its actual revenue and cost. At $10 monthly servicing cost, $540 annual revenue yields $420 annual contribution, versus $480 at $50 monthly.
- [ ] Exclude separate RA revenue where the service is included in VM.
- [ ] Model renewal dates and retention by cohort; distinguish first and subsequent renewals.
- [ ] Deduct each wholesale discount, referral payout, acquisition expense, and labor cost once.
- [ ] Remove CAQH and non-earning affiliate assumptions from the base case.
- [ ] Include incremental operating capacity, shared overhead, and the agreed treatment of owner compensation.
- [ ] Keep cash collected, earned profit, and owner distributions as separate views.

Illustrative pricing arithmetic from the strategic assessment, before extra processing fees, cost changes, or lost recurring value:

| Scenario | Annual orders | Contribution/order | Total before advertising |
|---|---:|---:|---:|
| $885 baseline | 1,200 | $520 | $624,000 |
| $985 with 90% volume retention | 1,080 | $620 | $669,600 |
| $1085 with 90% volume retention | 1,080 | $720 | $777,600 |

Thus the first higher-price example adds $45,600, not $90,000. Do not carry the earlier price assumption unchanged into the new model.

The previously proposed target case is a hurdle to validate:

| Annual component | Illustrative amount |
|---|---:|
| 1,500 formations × $650 contribution | $975,000 |
| Advertising and cash referral costs | −$130,000 |
| Additional overhead not already in unit costs | −$60,000 |
| VM: 350 average paid accounts × $40/month × 12 | $168,000 |
| RA/compliance contribution after overlap removal | $75,000 |
| Other service contribution | $25,000 |
| Illustrative annual operating profit | $1,053,000 |

Every line requires validation. The $650 blended formation contribution depends on pricing and mix; the recurring lines require actual paid cohorts; all residual operating costs must be deducted. The 2028 volume is an average of 125 formations per month, not a year-end milestone.

## Evidence to retain for each work package

Use one short completion note:

| Field | What to record |
|---|---|
| Task ID | For example, P2-04 |
| Owner and completion date | Actual person and date |
| What changed | Concrete action, deployment, meeting, or analysis |
| Evidence | Report, case IDs, approved offer, deployment record, or source links |
| Result | Counts, dollars, time saved, customer outcome, or unresolved issue |
| Decision | Continue, revise, stop, or wait |
| Next action | Named owner, due date, and dependency |

An email draft is not a sent outreach wave. A meeting is not a paid order. A checkout is not an activated subscription. A product page is not proof of demand. Preserve these distinctions in the scorecard.

## First working day's order of operations

1. Confirm owners, capacity, and the decisions that change the older sequence.
2. Check the October 16 RA notice and begin the October 20 billing preflight.
3. Start the baseline exports and the VM/RA overlap review.
4. Book the recurring partner-sales blocks and prepare the first 20–25 firms.
5. Arrange the customer-feedback conversations and inspect the mobile checkout.
6. Assign the fresh ads/policy review.
7. Schedule the October 29 review and identify the evidence each owner must bring.

## Reference basis

Internal baseline: [decision-log.md](decision-log.md), [nypllc-integrated-operating-plan.md](nypllc-integrated-operating-plan.md) v3, and the October 15–16 strategic assessment. Historical counts in older snapshots are not substitutes for current account reads.

Public references were reviewed for the preceding assessment on October 15, 2026. Recheck the current requirements before implementation.

- [NYPLLC order page](https://www.nypllc.com/order) — customer-facing claims and order-flow context.
- [NYPLLC virtual-address service](https://www.nypllc.com/virtual-address-services) — advertised scope, price, RA inclusion, and cancellation language.
- [NYPLLC partner program](https://www.nypllc.com/partners) — current partner proposition and response commitment.
- [Google government-documents advertising policy](https://support.google.com/adspolicy/answer/13156083?hl=en) — applicable certification/exclusion framework.
- [Google October 2026 policy update](https://support.google.com/adspolicy/answer/17260489?hl=en) — update effective October 5.
- [NYSED professional-entity structures](https://www.op.nysed.gov/corporate/disclaimer/how-to-file) — entity-choice context.
- [NYSED domestic PC filing instructions](https://www.op.nysed.gov/corporate/disclaimer/section-iii) — PC pilot workflow basis.
- [NY LLC Law §1203](https://www.nysenate.gov/legislation/laws/LLC/1203) — PLLC formation requirements, including address information.
- [NY LLC Law §302](https://www.nysenate.gov/legislation/laws/LLC/302) — additional registered-agent designation.
- [NY DOS biennial statements](https://dos.ny.gov/biennial-statements-business-corporations-and-limited-liability-companies) — filing scope and current state fee.
- [IRS Form 2553](https://www.irs.gov/forms-pubs/about-form-2553) and [New York S-corporation guidance](https://www.tax.ny.gov/bus/ct/s_corporations_post.htm) — scope check for the existing S-corp add-on.
- [NY all-filings dataset catalog](https://catalog.data.gov/dataset/corporations-and-other-entities-all-filings) — source for the proposed market-denominator analysis.


