# NYPLLC Revenue Levers — Consolidated Plan v1

**Prepared:** July 6, 2026
**Contains:** (1) Compliance-plan upgrade of RA renewal · (2) Long-tail shelf · (3) S Corp monetization · (4) AOV & pricing suite
**Companion documents:** Ads Plan v2, CAQH Plan v1, B2B Plan v1, SEO/Content Moat Plan v1
**Standing constraints honored throughout:** Direct-client RA renewals auto-charge on card-on-file (the original design, corrected Jul 6); only Metro partner-client renewals remain invoice-based (that cohort's dispute history). No outbound calls. No publishing-only offers anywhere. Ads-account changes governed by the ads plan's calendar and freeze windows.

---

# Lever 1 — RA Auto-Renewal (Direct Clients) + Compliance-Plan Upgrade

## Scope correction (Jul 6)
Direct-client renewals **auto-charge on card-on-file** per the original design — `computeBillingStartsAt` already anchors billing at month 13. The invoice-only constraint and the 11.6% collection history belong to the **Metro partner cohort** and stay there. This lever is now two jobs: (a) make direct auto-renewal dispute-proof, (b) use the renewal moment to sell the Compliance Plan.

## Why Metro's dispute storm shouldn't repeat — and the system that makes sure
Metro's anatomy: cardholders who never chose you, an unfamiliar descriptor, a surprise $99 twelve months later — disputing was the rational cardholder move. Direct clients chose you, received a year of branded service, and you control every disclosure. The structural causes don't transfer. But annual auto-renewals are inherently the highest-dispute billing pattern in existence, so prevention is the product:

1. **Checkout disclosure (new orders):** "$99/yr auto-renews on [date]; cancel anytime" at checkout, restated in the order-confirmation email. This tracks NY's auto-renewal statute pattern (GBL §527-a: clear disclosure, consent, acknowledgment, easy cancel) and card-network subscription rules — not legal advice; worth a one-time counsel glance.
2. **Pre-renewal notices — the single biggest dispute preventer:** **T-30 email** with renewal date, amount, card last-4, and three buttons: [Upgrade to Compliance Plan — $249] [Update card] [Cancel]. **T-7 reminder** (network-compliant window). Charge-day receipt. Surprise is the dispute engine; these remove it.
3. **Statement descriptor:** `NYPLLC.COM* REG AGENT`-style — recognizable and googleable, routing a confused cardholder to your support page instead of their bank.
4. **One-click cancel, no login wall.** Counterintuitive, correct: a cancel costs $99; a dispute costs $99 + $15 + ratio damage — and easy cancellation is what the statutes want anyway.
5. **Card health machinery:** Stripe account updater + smart retries (3–4 over ~2 weeks) + decline emails. On final failure, **fall back to an invoice/pay-link** — the Metro dunning machinery, reused as the safety net — before lapsing with a factual service-end notice. Auto-charge primary, invoice fallback: both systems you've already built, each in its right place.
6. **Evidence pack:** a pre-built Stripe dispute-response template (checkout terms, the year's service emails, both notices). A quarterly "what your RA service handled this quarter" touchpoint creates perceived value *and* dispute evidence.
7. **Tripwires:** renewal-cohort dispute rate >0.5% rolling 90 days → pause auto-charges, diagnose, strengthen notices. >0.75% (Stripe early-warning territory) → flip that cohort to invoice-first while fixing. The Metro lesson, encoded as a circuit breaker.

## The Compliance Plan, redesigned for auto-charge
Product unchanged — **$249/yr:** RA + biennial statement prepared and filed when due ($9 fee included; triennial for PCs, which the CRM already tracks) + quarterly DOS good-standing check + 20% off shelf SKUs (Lever 2) + compliance-calendar email. Base $99 renewal never forced. What changes is the job: under invoices this was a collection play; under auto-charge it's a **churn-and-dispute play** — a renewal with named, visible deliverables is harder to cancel and much harder to dispute than "registered agent $99." Sale moment: the T-30 email's upgrade button (one click adjusts the subscription). Later: test it as a checkout add-on (AOV suite tie-in).

## The pilot (same calendar, new metrics)
Oct–Dec 2025 cohort ≈ 56 renewals landing Oct–Dec 2026. A/B: half get plain T-30/T-7 notices, half get notices + the upgrade offer. Measure: upgrade rate, **cancel rate** (does the upsell email itself increase cancels? — the key risk), dispute rate, payment success, and net revenue per eligible renewal. Mid-January: set defaults for the 2027 wave (~573 renewals). This cohort now does double duty — compliance-plan test *and* calibration of the financial model's brand-new renewal assumptions.

## Economics (auto-charge basis; assumptions until the pilot reports)
~25% voluntary cancel before first renewal · ~90% payment success after retries/updater · disputes <0.5% · 85% payer retention thereafter → effective first-renewal ≈ **65%**, roughly double the old invoice assumption. RA line: 2027 ~$35K → 2028 ~$105K → 2029 ~$185K → 2030 ~$265K at ~92% margin — before Compliance-Plan uplift (25% upgrade adds ~$15K in 2027, growing toward $100K+ by 2030). If the pilot shows 40% voluntary cancels instead of 25%, roughly half the delta evaporates; October tells you which world this is.

## Build (August, ~20–25 hrs; hard deadline Sep 15 — the first T-30 notices must go out ~Sep 22)
Notice emails + buttons · descriptor verification · one-click cancel flow · retry/dunning config · invoice-fallback wiring · dispute template · checkout + confirmation disclosure copy · biennial-due-date data check across all entities · counsel glance at renewal terms · decide coupon-coded vs. honor-system shelf discount (coupon — it's measurable).

---

# Lever 2 — Long-Tail Shelf

## Thesis
Post-formation life events (amendments, dissolutions, certificates, banking) are small, high-margin, near-zero-CAC transactions that also generate SEO surface area (each SKU gets a page that ranks — see SEO plan Part 2). Individually trivial; collectively $30–60K/yr at maturity, and they deepen the "everything NY-entity" positioning.

## The shelf, in build order

| SKU | Price | State fee (COGS) | Build effort | Notes |
|---|---|---|---|---|
| Banking affiliate (**Mercury** — applied Aug 14, awaiting response; Relay product-led only, do not sign Partner exclusivity) | $50–100/funded acct to you (negotiate; Mercury CPA unpublished) | — | Wait for terms + link, then EIN email. 📖 [affiliate-partners.md](docs/affiliate-partners.md) | Zero-risk, pure margin |
| Certificate of Good Standing (Status) | $99 | ~$25 | Days | Cross-sell inside CAQH flow — payers and banks request it |
| Certified copies | $99 | ~$10–25 | Days | Same retrieval pipeline |
| Articles of Amendment (name/address/purpose) | $249 | $60 | ~1 wk | Reuses DOS filing automation; compliance-plan members get 20% off |
| Standalone DBA / Assumed Name | $199 | $45 | Trivial | Just needs its own checkout + page |
| Dissolution | $299 | ~$60 + NYSED consent handling | ~1 wk | Professional-entity dissolutions have extra steps — price reflects it |
| Foreign-qual origin-state expansion (add ~8–10 states beyond NJ/PA/FL/TX/CT/CA) | Per formula | Per state | Rolling | Feeds SEO programmatic pages + the ads FQ campaign keyword list |
| Trademark filing | $499–650 + USPTO fees | — | **Parked** | Non-attorney filing-service UPL considerations: needs counsel review or an attorney-partner rev-share (a B2B plan segment-5 reciprocity play). Do not ship without one of those. |

## Distribution
Self-serve Spiffy checkouts + a /services index page; each SKU's page doubles as an SEO target ("certificate of good standing NY," "amend NY PLLC articles"); lifecycle emails at natural moments (good standing pitched inside CAQH; amendments pitched on address-change signals from VM). Malpractice-broker referrals stay in the B2B plan where they live.

## Cadence & measurement
One SKU per week or two through Aug–Oct inside engineering slack; no gates — ship-when-slack. A one-line SKU revenue dashboard row; kill nothing, these have no carrying cost.

---

# Lever 3 — S Corp Monetization

## Thesis
Every S Corp election you sell ($195, 17.3% attach, 34+ clients) creates two mandatory downstream purchases you currently monetize at $0: payroll (reasonable-salary compliance) and the 1120-S return. Capture both via partners — and hold the line on identity: **default is partner, don't build.** In-house payroll/tax would be the first un-automatable product in the company; the burden of proof sits entirely on the in-house option.

## Phase 1 — this week (~4 hours)
1. Join **Gusto Impact Affiliate** (not Gusto Pro, not ADP as default) — **applied Aug 14**, awaiting approval. 📖 [affiliate-partners.md](docs/affiliate-partners.md). Expect ~$200+ on first paid payroll; 120-day cookie.
2. Insert the recommendation into the S-Corp-Docs-Faxed pipeline email (reasonable-salary / first W-2 — do not promise a literal 20-minute first payroll) and the S Corp product page.
3. One backlist email to the 34+ existing S Corp clients. Even 8–12 activations is $1–3K found money and validates the flow.

## Phase 2 — attach lift (Aug–Sep)
S Corp education at the post-EIN moment: "should you elect? the math" — an interactive savings calculator (built once, also an SEO plan tool) plus a reasonable-salary explainer. Target attach 17% → 25%; each point at 2027 volume ≈ 12–13 elections ≈ $2.4K in fees plus the downstream referral tail.

## Phase 3 — tax-prep partner (Sep–Oct)
Recruit 2–3 CPA firms **from the B2B pipeline** (they're already in the outreach list) as designated 1120-S partners: rev-share $100–250/return or pure reciprocity (they refer formations back). This makes the B2B and S Corp plans feed each other.

## Decision gate (2027)
Revisit in-house "S Corp compliance MRR" only if: referral volume proves demand (≥150 activations/yr) AND an embedded/white-label platform exists that keeps delivery fully automated. Otherwise the answer stays partner.

## Economics
2026 H2: $2–5K. 2027: ~250 S Corp clients × 50–60% payroll conversion × $150–250 ≈ **$20–35K** affiliate + election-fee lift from Phase 2 — for effectively zero marginal ops.

---

# Lever 4 — AOV & Pricing Suite

## Component A — the $985 price test (the calendar-constrained one)
**Slot:** late September, between ads Gates 2 and 3, per ads plan 4.4 — or defer to February. Never during a ladder step or January.
**Design:** sequential, not split — 3 weeks sitewide at $985 with every price-mentioning ad asset updated the same day (concurrent A/B breaks the ad↔page price-match rule). Judge revenue-per-visitor and CVR against the trailing 6-week baseline.
**The pre-registered math:** standard-order contribution goes $513 → $613 (+19.5%), so the contribution-basis breakeven is CVR retention of 83.7%. Decision rule: retention ≥90% → adopt $985; 84–90% → extend 2 weeks; <84% → revert same-day. Even a 15% CVR drop is roughly profit-neutral — the test is heavily asymmetric in your favor.
**Rollout list if adopted:** ads assets, partner materials (B2B referral checkout moves $860 → $960 or the discount deepens — decide before launch), site, bundle math below.

## Removed — expedited filing SKU (Aug 17 2026)

24-hour DOS expedite on Articles and Certificate of Publication is **already included** in the $885 flat fee (see `/ny-pllc-cost`, `/how-long-to-form-a-pllc-in-ny`). A checkout upsell would double-charge for something every customer already gets. Do not re-add.

## Component B — order bumps (ship anytime)
**Live:** S Corp election — **$195** checkbox on Spiffy checkout.

**Removed Aug 18 2026:** NY Sales Tax Certificate of Authority — **$195** was live Aug 14–18; pulled from Spiffy checkout (insanely low take rate; order-form friction). CRM staff add-on in PLLC-CRM remains; possible **post-formation upsell** later. Still to add on checkout: DBA ($199), CAQH. After-pay upsell not required.

## Component C — Practice Launch bundle
**$1,485:** formation + S Corp election + 6 months VM + $100 CAQH credit (stated value ~$1,480). Presented as the right column of a two-option pricing block; its second job is anchoring $885 as the reasonable choice. Target take-rate 8–12% → +$50–70 blended AOV. Healthcare professions see the CAQH credit emphasized.

## Component D — VM checkout copy
Move the "get your NY business address *before* the DOS filing" framing earlier and more prominently in checkout. Target attach 27% → 32%; each point ≈ 12–13 subs/yr at 2027 volume ≈ ~$7K lifetime value per point. One copy change; measure over 60 days.

## Suite economics
At 2027 base volume, fully landed: price test +$60–80K (direct orders only), bumps +$10–20K, bundle +$40–60K, VM copy +$15–35K LTV — a **$85–155K/yr aggregate** for a few weeks of build and one carefully-slotted test. Every component except A ships on no particular calendar.

---

# Consolidated timeline & founder-time fit

| Window | Lever work |
|---|---|
| Wk of Jul 6 | S Corp Phase 1 (afternoon) · banking affiliate (afternoon) · Spiffy bump-capability check (**done Aug 14** — checkbox SKUs) |
| Jul–Aug | Shelf SKUs 2–4 in engineering slack · VM checkout copy · S Corp calculator |
| August | RA auto-renewal system + Compliance-plan build (20–25 hrs) — **hard deadline Sep 15**, first T-30 notices go ~Sep 22, first auto-renewals fire in October |
| Sep | Bundle live · price-test prep · CPA tax-partner recruitment via B2B pipeline |
| Late Sep | **$985 test window** (3 weeks, ads-calendar permitting) |
| Oct–Dec | Compliance/notice A/B runs on the ~56-renewal cohort (also calibrates the model's renewal assumptions) · shelf continues |
| Mid-Jan | Renewal defaults set for the ~573-renewal 2027 wave · price-test retro if deferred to Feb |

Added load: ~8–12 hrs/wk for six weeks, then ~2–3 hrs/wk maintenance — fits inside the engineering line of the existing budget, with B2B outreach as the designated flex if a week overloads.

# Cross-plan dependencies
- Price test ↔ ads plan 4.4 (slotting) — the one hard calendar constraint in this document.
- Compliance 20% discount ↔ shelf SKU coupons.
- S Corp calculator + shelf pages ↔ SEO plan content map.
- Good-standing SKU ↔ CAQH flow cross-sell.
- CPA tax partners ↔ B2B plan segment 3 outreach list.
- Spiffy checkbox SKUs (S Corp live; sales tax removed Aug 18) ↔ CAQH / DBA merchandising.
