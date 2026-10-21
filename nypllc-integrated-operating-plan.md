# NYPLLC Integrated Operating Plan — Path to ~$1M Net

**Prepared:** October 7, 2026 (v2) · **v3:** October 16, 2026 (expert assessment + 90-day execution checklist)
**Horizon:** Oct 2026 → Dec 2028 (2028 is the target year)
**Owner:** Sid
**Roles used below:** **Sid** (decisions, relationships, sends) · **Ops** (CRM fulfillment, RA/VM ops) · **Agent** (Cursor agents for pulls, research, drafting, builds)

### v3 change log (Oct 16, 2026)

- **Operational SoT through Jan 13, 2027:** [nypllc-90-day-execution-checklist.md](nypllc-90-day-execution-checklist.md) (packages P1–P3, scorecard defs, experiment rules).
- **Supersessions recorded in:** [decision-log.md](decision-log.md).
- **§6:** Replaced additive ~$1.02M lever sum with **hurdle cases** ($1,053K / $1,179K) to validate; $650/formation and 125/mo are unproven.
- **Volume:** Oct 16 mix was 30 / 40 / 55 at 125/mo. **Oct 21:** that 40 / 55 split was a target, not a lever result. Written levers support **111–115** formations/month with the 30 partner target, or **107–111** if Bing stays blocked. **125** is 10–14 orders/month above that. See [decision-log.md](decision-log.md).
- **B2B:** Outreach starts Oct 2026 (not Nov 9); include OOS formation wholesale; 2028 hurdle **25–30 partner orders/mo**.
- **Pricing:** $985 test Nov 2026 (not Feb); $1085 conditional on P3-01.
- **CAQH:** $0 in base forecast; product paused Oct 14.

**How to read this plan (v3):**
- Sections 3–5 still describe **levers and mechanics**. Add a distinct order gain once to the baseline. Do not add it again on top of a channel total that already includes it. Section 6 is a **dollar hurdle to validate**. Its 125 formations/month is not the lever-supported volume (Section 2).
- When evidence fails a gate, re-cut the hurdle at the next review (Section 9).

---

## 0. Which document wins when they disagree

1. **Through Jan 13, 2027:** [90-day execution checklist](nypllc-90-day-execution-checklist.md) wins on **dates, sequencing, evidence standards**, and weekly scorecard definitions.
2. **Expert assessment + decision log** win on **economics definitions**, channel double-counting, CAQH/MSO posture, and superseded calendar items ([decision-log.md](decision-log.md)).
3. **This plan (v3)** wins on stable narrative: baseline §1, recurring §5 mechanics, lever playbooks §3–4, and merged gates §9 — except where v3 change log or decision log says otherwise.
4. **2028 hurdle (Section 6)** is a **planning case to validate** ($1,053,000 target / $1,179,000 stretch), not proof of forecast accuracy.
5. **Channel plans** win on how each channel is run:
   - [Google Ads plan v2](nypllc-google-ads-operating-plan.md)
   - [SEO / content moat plan v1](nypllc-seo-content-moat-plan.md)
   - [Revenue levers plan v1](nypllc-revenue-levers-plan.md)
   - [B2B pilot plan](../PLLC-CRM/crm/reports/b2b-partner-program-pilot-plan.md)
   - [CAQH pilot launch](../PLLC-CRM/crm/docs/caqh-pilot-launch.md)
6. **The June 2026 growth plan** no longer sets ads policy or targets. Its "hold ~$92 tCPA" rule was replaced by the Sep 2026 $105 diagnostic and the Nov 1 **dual** verdict (order count + profit evidence). Its data tables are still valid reference.
7. **The ~$1M table in [expansion-next-steps.md](memory-bank/expansion-next-steps.md)** (≈1,600 formations × ~$500) is **historical**; Section 6 hurdle replaces it.

---

## 1. Baseline (CRM production pull, read-only, Oct 7 2026)

### Formations

| | Apr | May | Jun | Jul | Aug | Sep |
|---|---:|---:|---:|---:|---:|---:|
| Formation orders | 49 | 57 | 47 | 47 | 49 | 52 |
| With Google click ID | — | — | — | 10 | 16 | 20 |
| Untagged | — | — | — | 33 | 30 | 32 |

- **About 50 orders/month (~600/yr).** Average order $908 since April.
- **42% of orders use a payment plan** (129 of 308 since Apr 1). Price and cash flow matter to this buyer.
- **~60% untagged:** no click ID or UTM. ChatGPT has sent 9 orders in total.
- **B2B partner-attributed orders:** about 1/month.
- **Repeat customers** (2+ formations): 7.
- **Mix (last 6 months):** about 75% healthcare. Medicine 44, MHC 30, LCSW 25, Law 25, psych NP 23, Dentistry 13.

### Checkout funnel

- **Abandoned-checkout capture — live (Oct 14 2026).** Site `POST /api/checkout-abandonment` → CRM ingest on `billing.nypllc.com`; Spiffy 1.1 beacon in `form-tracking.tsx`. Production rows flowing (first real customer capture same day); cron sends **1h** and **24h** Gmail. **No 72h touch yet.** Volume still tiny vs traffic — judge F1 on row count + `recoveredAt`, not “pipe broken.” Smoke: `PLLC-CRM/crm/scripts/probe-checkout-abandonment-ingest.ts`.
- **The only funnel read** is the Sep 1 audit on campaign `01`: 17 begin-checkouts → 3.5 purchases (~20% close). Mobile: 21 clicks, 0 purchases. That sample is small.

### Virtual mail (corrected from v1)

- **Real subscribers:** 95 active or trialing, at $50/mo.
- **The 67 `pending` rows are not subscribers.** They are placeholder Stripe checkouts created by the OP-approved upsell email that were never paid. v1 counted them as possible subscribers; that was wrong.
- **Real new subscribers by month:** Apr 15 · May 20 · Jun 12 · Jul 13 · Aug 10 · Sep 15.
- **Attach** (formations with a real VM sub on the same entity): Jul 19% · Aug 21% · Sep 29%.
- **The OP-approved upsell email converts 1 of 61** (1.6%). Nearly all VM comes from the checkout checkbox.
- **Churn:** 13 cancels across ~107 starts, with an average sub age of ~4–5 months. That is about **3%/month**.

### Direct RA

- **370 trialing.** Every renewal due through Jun 2027 has a Stripe customer and subscription.
- **Due:** Oct 1 · Nov 23 · Dec 31 · Jan 43 · Feb 28 · Mar 28 · Apr 31 · May 39.
- **Real notices sent so far:** T-30 to T & C Family Dentistry (Oct 23) and Flores MHC (Nov 3). All stop-charges to date were E2E test entities.
- **Compliance Plan confirmation email:** fixed (ASCII subject in `direct-ra-notices.ts`; test `direct-ra.test.ts`).

### Unit economics

| Item | Value |
|---|---|
| Formation contribution before ads | ~$520 (ads plan §0.4 floor $513 + small attach) |
| Ads spend run rate | ~$2.5K/mo |
| VM | $600/yr; margin **not measured** (80% assumed) |
| RA | $99/yr, ~92% margin |

**Current run-rate net ≈ $330K/yr.**

---

## 2. The shape of the problem

To reach ~$1M+ net operating profit in calendar 2028, the business needs **stronger economics per formation**, **repeatable partner distribution**, and **recurring services (VM/RA)** — not a stack of optimistic ancillary lines.

**Volume the written levers support (planner correction, Oct 21, 2026).** Start from about **49** non-partner orders a month. Central estimates: abandoned checkout **+6**, order page and mobile **+6**, Google acquisition **+7** excluding those conversion gains, Bing **+4** if reinstated, organic and AI **+9**. That is **81**. Reviews **+2** and second entities **+2** make **85**. Those last four can overlap conversion already counted, or they belong to whatever channel actually produced the order. The partner line is still a **30/month target**. Totals: **111** or **115** formations a month. If Bing stays blocked, subtract **4**.

The old mix, **40** paid search and **55** organic / direct / referral / AI, was a target allocation. It is not a reconciled forecast and not a pass/fail by channel. Another mix can support the same total if acquisition cost and contribution work. The levers sit **10–14** orders a month under a 95 non-partner target (**81** or **85** versus **95**). Those orders have no source. Section 6 still prices **125/month**. That figure is this unreconciled shape, not the lever total.

**Counting rule:** add a distinct gain once to the baseline. Google at **27–33** orders a month already includes that channel’s share of recovery and the order page, so that endpoint is not added on top of the **+6** and **+6**.

Contribution per order in this section remains the unproven **~$650**, with VM and RA after overlap is verified (Section 6).

**Pricing:** $985 retail test **Nov 2026** (checklist P2-01). Formation-only upside example is **+$45,600**/yr at 90% volume (1,080 × $620 vs 1,200 × $520), **before** lost VM/RA customers and extra fees — not +$90K.

---

## 3. Formation levers (playbooks)

Section 3 describes **what to execute** and how to read early signal. Add each distinct gain once, on top of the ~49 non-partner baseline in Section 2. Do not add the same gain again on top of a Google or paid-search total that already includes it. The old 40 / 55 channel rows are not the volume forecast.

### Lever reference (execution priority, not additive math)

| Lever | Role | Confidence |
|---|---|---|
| F1 Abandoned-checkout recovery | In-funnel; capture live Oct 14 | Medium |
| F2 Checkout / LP conversion | In-funnel | Medium |
| F3 Reviews | In-funnel / CTR | Low–medium |
| F4 Google Ads volume | Paid-search row; Nov 1 dual gate | Medium |
| F5 Microsoft Ads | Paid-search row; suspended | Low–medium |
| F6 Organic / AI | Organic row; slow | Medium–low |
| F7 B2B / platforms | Partner row; **largest Sid time** | Medium–low |
| F8 Second entities / MSO | Partner + lifecycle | Low |

---

### F1. Abandoned-checkout recovery

**Why it works:** About 4 of 5 people who start checkout don't finish (Sep 1 audit). They have already chosen the service; most stall on price, timing, or a question. A short email sequence recovers a steady share, and the system for it is already built.

**Steps:**

1. **Capture (done Oct 14 2026).** Vercel secrets aligned; site proxy returns 200; `CheckoutAbandonment` rows + 1h cron sends confirmed. Re-smoke: `probe-checkout-abandonment-ingest.ts` or `POST https://www.nypllc.com/api/checkout-abandonment`.
2. **Measure the funnel for 14 days.** Count started checkouts with a captured email, then purchases. That gives the real abandonment count. Expected: ~150–200/month if the close rate is ~20–25%.
3. **Fix the sequence (Agent drafts, Sid approves, week 2).**
   - **1h email:** "Your order is saved." Link back to checkout. Answer the top three questions: total cost including publication, timeline, payment plan.
   - **24h email:** make the payment plan the main message ("4 payments"), since 42% of buyers use one. Name the one-time NYSED and publication facts plainly.
   - **Add a 72h email from Sid**, written personally: "Anything I can answer?" Replies go to `contact@`. Questions that would stop a purchase get answered the same day.
   - Never name Spiffy. Subjects in ASCII only (existing guards).
4. **Suppress correctly:** stop the sequence if they buy (`recoveredAt`) or are already a customer.

**Expected effect:** 150–200 abandoners/month × 3–4% recovered ≈ **+5–7 orders/month**, starting the month capture works. Recovery emails for considered purchases usually recover 3–10%; this plan uses the low end.

**Check:**
- Day 3: rows are appearing.
- Day 30: recovered orders ≥3. If 0 recoveries from ≥100 emails, rewrite the copy before blaming the channel.

---

### F2. Checkout and landing-page conversion

**Why it works:** Ad spend and SEO work only pay off if visitors buy. The data points to three fixable things:

- **Mobile converts far worse.** Ads plan: mobile CVR 6.6% vs desktop 11.5% lifetime; `01` mobile went 0 for 21.
- **Payment plans are used by 42% of buyers** but are not the first thing visitors see.
- **Proof is thin:** 6 Google reviews.

**Steps:**

1. **Measure the funnel by device (Agent, week 1).** From Vercel Analytics/GA4 events already on the site (see `features/analytics-tracking.md`), pull: landing view → order page view → checkout started → purchase. Split by device, for the last 60 days. Find the single largest drop on mobile.
2. **Order page, above the Spiffy embed (Agent builds, Sid approves, week 2–3):**
   - One-line total: "$885 all-in, including NY publication."
   - **"Or 4 payments"** stated plainly.
   - Google review stars and count.
   - Three-step timeline (NYSED → DOS → publication) with live NYSED wait-time numbers from the tracker data.
3. **Mobile pass:** the embed loads without layout jump, the tap path to checkout is ≤2 taps from each landing page, and no element blocks the form. Test on a real phone on the five highest-spend landing pages.
4. **Landing pages:** add the publication-cost explainer (already planned in the ads plan) and the same payment-plan line.
5. **Changes to profession and landing pages are logged in the shared ads change log.** No edits Nov 15–Dec 1 (ads freeze). Ship by Nov 10.

**Expected effect:** a 10–15% relative conversion lift across all traffic ≈ **+5–7 orders/month** at today's volume. More as volume grows.

**Check:** 45 days after shipping, purchase ÷ order-page sessions, split by device, vs the 60-day baseline from step 1. Mobile purchases above zero on `01`.

---

### F3. Reviews

**Why it works:** 6 Google reviews after ~490 orders is very few. Reviews lift ad click-through rate (seller ratings need volume), map and brand search results, AI-answer trust, and on-page conversion (F2).

**Steps:**

1. **Move the ask to the moment of highest relief: DOS approval email** ("Your PLLC is officially formed"). Today it sits in the formation-complete thanks, which comes months later after publication.
2. **Use a direct Google review link** (GBP short link). One sentence; no incentive (Google policy).
3. **One reminder** 7 days later, only if no review exists yet. Ops can check by name.
4. **Sid replies to every review** within 48h.

**Expected effect:** ~40–50 DOS approvals/month × 10% ≈ **4–5 reviews/month** → 40+ by Jun 2027. Order effect is indirect: about **+2/month** by 2028, mostly through F2 and ad CTR.

**Check:** reviews/month at day 60 ≥3. If below, test SMS (Quo) for the ask instead of email.

---

### F4. Google Ads volume

**Why it works:** Google is capped by how much search demand exists at our bid level (eligible auctions ~3.5–4.2k/week at $105). There are four ways to get more orders from it:

- **(a) Higher conversion rate from F1/F2.** Smart bidding buys more clicks at the same tCPA when each click converts better. This is the main way volume grows without spending more per order. It is counted in F1/F2.
- **(b) The tCPA ladder,** if the Nov 1 verdict passes.
- **(c) January season.**
- **(d) Coverage:** foreign campaign `03`, and fixing the disapproved ads.

**Steps (dates follow the 90-day checklist, not the Feb/$10K calendar):**

1. **Oct:** fix or pause the three disapproved enabled `01` ads. Hold $105. Weekly SOP continues. **Oct 5** government-documents policy review (checklist P1-09).
2. **Nov 1 dual verdict** ([decision-log.md](decision-log.md)):
   - Legacy **order-count** branch (ads plan: ≥30 vs 20–25 October Google orders) **and** a **profit / marginal collected-contribution** memo.
   - Optional bounded experiment (~$200–220 candidate) is **not** an automatic tCPA change.
3. **January 2027:** spend is **conditional** on demand, marginal profit, tracking, policy, and fulfillment capacity (P3-06). **No automatic ~$10K** January budget.
4. **`03` foreign:** read Jan 31 (≥3 foreign orders/month → add two states per quarter).
5. **$985 retail test:** **Nov 2–4** after P1-12 go (not February), with ad price assets updated the same day.

**Expected effect:** about **+5 by Q4 2027, +7 average in 2028.** That is Google at ~27–33/month including the lift from F1/F2.

**Check:** the weekly SOP, which tracks eligible auctions, CPA, and Ads↔CRM within ±10%.

---

### F5. Microsoft Ads

**Why it works:** Microsoft Ads reaches searchers Google doesn't, especially on desktop (Windows/Edge default search), and our buyers convert mostly on desktop. Campaigns can be imported from Google, so setup is small.

**Steps:**

1. **Sid:** update the NY business registration address to match the Microsoft account, then reopen support case 7109261224. There are two verification attempts left; do not open a second account.
2. **`msclkid`:** site click-attribution persists it; CRM `Order.msclkid` + webhook extract shipped Oct 16 (migration still needs deploy). Do not spend on Microsoft until reinstatement **and** production capture is live.
3. **On reinstatement:** import `01`, `02`, and `Sales` with the same negatives (Lists A–E). Use manual or enhanced CPC until 15 conversions, then tCPA.
4. **Deadline:** not reinstated by **Dec 15 2026** → drop F5 and move its 4/month into F6/F7.

**Expected effect:** about 10–15% of Google volume → **+3–4/month.**

**Check:** 60 days after reinstatement, ≥5 Microsoft orders.

---

### F6. Organic search and AI answers

**Why it works:** We rank on page 3–5 (positions 20–45) for every commercial term. Google ranks commercial pages on relevance and authority. Our content and data are the relevance; what's missing is **authority: links and mentions from credible NY professional sources.** AI assistants (ChatGPT has sent 9 orders) draw on the same signals, plus plain factual pages they can quote.

**Steps:**

1. **One partner-usable content asset per 90-day period** (checklist P2-10), not one piece every week. Each asset contains at least one CRM-only fact. Data study is time-boxed in P2-11.
   - Next: `#6` PLLC vs PC.
   - Then one page per pipeline stage: PPE affidavit, OP Submitted, the 120-day publication clock, SS-4/EIN rejects, biennial statement.
   - Agent drafts; Sid edits in a fixed weekly slot.
2. **Links: the missing piece. Two sources, both email-only:**
   - **Association and partner listings** from B2B segment C (Section 4). Every association or platform that lists us is a link from a relevant NY professional site. **One outreach effort serves both B2B and SEO.**
   - **Data study, Nov–Dec:** "NY professional entities 2026." Medians only: NYSED wait times by profession, formation timing, top deficiency reasons. Pitch to 20–30 NY trade publications, association newsletters, and practice-building blogs.
3. **Homepage:** this is the target for 113 commercial queries. Add a short facts block (price, what's included, timeline, NYSED wait) and FAQ schema. Make the internal links from the moat pages point to the homepage with exact-match anchor text.
4. **AI answers:**
   - Monthly check of ChatGPT, Perplexity, and Google AI Overviews for the 20 tracked terms. Log whether we're cited.
   - When a competitor is cited instead, note the source page AI used, and get listed there or publish a better factual page.
5. **Name checker and S Corp calculator** (Nov). Tools earn links and rank for "checker" and "calculator" searches.

**Expected effect** (SEO plan curve): +0.1–0.3 orders/day attributable by months 6–12, and 0.5/day later. That is about **+5/month by Q4 2027 and +9/month in 2028.**

**Check:**
- Gate S1 (Oct 15): pieces shipped and impressions.
- Gate S2 (Jan 31): ≥3 referring domains from PR and listings.
- Gate S3 (Jun 30 2027): ≥0.3 organic orders/day, using the checkout "how did you hear" field (Section 8).

---

### F7. B2B and platforms

Full campaign detail is in **Section 4**. **2028 hurdle:** **25–30 partner-attributed orders/month** (validate via 90-day funnel). **Productive partner** = paid order in trailing 90 days; **repeat-producing** = second distinct paid order.

Legacy sensitivity table (Oct 7 v2, **not** the active target):

| Segment | Active partners | Orders/partner/mo | Orders/mo |
|---|---:|---:|---:|
| Past-client advocates | 40 | 0.1 | 4 |
| Professional referrers | 12 | 0.4 | 5 |
| Platforms and associations | 3 | 1.0 | 3 |
| Wholesale / MSO operators | 2 | 1.5 | 3 |

---

### F8. Second entities and MSO pairs

**Why it works:** Owners add entities when they add a profession, a partner, or a management company. Today only 7 customers have formed twice, and we never ask.

**Steps:**
1. Add one paragraph to the formation-complete email: "Adding a partner, a second license, or a management company? Reply and we'll quote it."
2. **MSO public launch decision by Jan 31 2027.** The CRM pair workflow already exists.

**Expected effect:** **+1–2/month.**

---

## 4. B2B campaign detail (F7)

**Starts Oct 2026** (first targeted sends Oct 19 per checklist P1-10). Retire the **Nov 9** start date. CAQH copy/page and EXP close-out are done; affiliates no longer block outreach.

### Prospect volume needed

Activation assumptions from Aug–Sep: cold professional email gets ~10% replies, and ~40% of replies agree to be provisioned. **Plan for 4% of contacted → active.**

| Segment | Active needed | Contacts needed | Have today |
|---|---:|---:|---:|
| Professional referrers | 12 | ~300 | ~30 in tracker |
| Platforms and associations | 3 | 25–40 named targets | Headway, Alma named |
| Wholesale / MSO operators | 2 | 15–20 named targets | 0 |

### A. Past-client advocates (Ops + Agent; ~1 hr/month of Sid)

- **Advocate auto-invite cron:** optional post–90-day build; **not** required for partner pilot. Do not delay Sid outbound on cron work.
- **Offer:** unchanged ($25 off for the friend, $75 to the advocate at DOS filed).
- **Check:** active advocates and orders/month in the scorecard. Target 0.1 orders per active advocate per month.

### B. Professional referrers (Sid sends; Agent researches and drafts)

- **List building (Agent; 100–150 firms in first 90 days).** Segments include: clinician-focused accountants, small law firms (filing fulfillment), **out-of-state formation providers** (NY professional fulfillment), billing/practice consultants, credentialing firms, coaches, malpractice brokers.
- **Not excluded:** firms that sell formations elsewhere — many are **wholesale** customers. Score each prospect; do not mix advocates with wholesale in one KPI.
- **Waves:** ~12–15 new firms/week when capacity allows. One follow-up at day 7; stop after two touches on cold outreach.
- **Message:** NY specialist, NYSED handled, co-branded link, reply “yes” for the link. **No dollar amounts in cold email.** Retail list price is $885 until the November test; do not lock $885 into partner copy that will still be in market after Nov 2–4.
- **`/partners/[slug]`:** optional after the first paid partner handoff (P2-04), not a prerequisite for October sends.
- **On "yes":** provision within 1 business day (script exists), attach the Spiffy promo the same day, and send the link plus a two-line blurb they can paste to clients.
- **Keeping partners active:** a quarterly partner email with the NYSED wait-time update (something useful to forward) and their referral count.
- **Stop rule:** fewer than 3 **productive** partners (a paid order within 90 days) from the first 150 sends by **Jan 15** → change the message and sub-segment before sending more.

### C. Platforms and associations (Sid, one-to-one, 3–4 targets/month from Nov)

- **Targets to validate:**
  - Therapy networks with NY clinicians (Headway, Alma, Grow, Rula, SonderMind, and similar)
  - Private-practice communities, podcasts, and newsletters for therapists and NPs
  - NY professional associations: social work, mental health counseling, psych NP, PT, dental society components
- **Pitch:** For clinicians who **have decided** to establish a professional entity (with their adviser on structure). Do not claim every panel clinician must form a PLLC first (NYSED recognizes individual practice).
- **What we offer:** a member resource page, a discount code, a 3-email sequence they can send, and a guest data piece on NYSED wait times.
- **Ask:** a resource or partner-directory listing, or one newsletter feature per quarter.
- **Do not pitch CAQH** to networks that credential their own providers.
- Email-first; meetings only when they ask.
- **Gate (Jun 30 2027):** ≥2 live with ≥1 order/month combined. Otherwise fold into segment B.

### D. Wholesale / MSO operators (Sid)

- **Targets:** healthcare roll-ups, MSOs, and multi-site behavioral health, dental, and PT groups that keep needing clinician-owned NY entities.
- **Offer:** wholesale tiers ($800/$775/$750) and priority handling. MSO pairs ($1,770) and the MSO-ready PC ($1,285) quoted per engagement.
- **Gate (Mar 31 2027):** one operator live with ≥2 orders.

---

## 5. Recurring levers

### VM: 95 → ~400 average subs in 2028

**Why it works:** A NY PLLC's address goes on public DOS filings. Most customers would otherwise list their home address. The checkbox at checkout already sells this to 20–30% of buyers. The later email channel barely works (1.6%), and nobody sells it to the existing customer base.

**V1. Checkout attach, 25% → 32% (Agent + Sid, Nov).**
- Rewrite the VM checkbox line around the actual reason: "Keep your home address off New York's public record. Your PLLC's address appears on state filings."
- Show the price per month and "cancel anytime."
- **Do not pre-check the box** (NY auto-renewal law).

**V2. Fix the OP-approved upsell (Agent drafts, Sid approves, week 2).**
- **Why it isn't working:** customers get it while waiting on NYSED, so it reads like a generic upsell, and it requires a Stripe checkout.
- **Rewrite:**
  - **Subject:** "Which address should go on your PLLC's state filing?"
  - **Body:** we are about to file the Articles with the state; the address becomes public; here are the two options; one-click link.
  - **Send a second touch 3 days later.**
- **Also send it once to the 67 placeholder checkouts.**
- **Target:** 8–10% of recipients.

**V3. Existing-customer privacy campaign (Agent drafts, Sid sends, Q1 2027).**
- Target: ~400 past customers without VM. Exclude anyone whose filing already uses a business address.
- **Offer:** VM plus a Certificate of Change to replace the home address on file, priced as one bundle (shelf SKU from revenue levers Lever 2).
- **Target:** 4% → ~15 subs, plus the CoC revenue.

**V4. Churn, 3% → 2%/month (Q1 2027).**
- Annual prepay option ($540/yr, the equivalent of 1.2 months free).
- Win-back email 30 days after a cancel.
- Dunning is already live.

**V5. Formation growth (Section 3)** feeds V1 automatically.

**The math:**
- **Inputs:** monthly adds = formations × 30% (V1) + ~3 (V2) + ~1 (V3, averaged). At 2027's ~72 formations/month that is ~26 adds/month. Churn 2.5%.
- **Result:** ~375 subs at end of 2027, ~520 at end of 2028, **~450 average in 2028.** The model in Section 6 uses 400 to leave room for error.
- **Measure VM unit cost by Oct 31** (mail provider + scanning + staff time) to replace the 80% margin assumption.

**Check:**
- 60 days after V1 copy ships: attach ≥30%.
- 30 days after V2: ≥5 checkouts completed from the upsell email.
- Mar 31 2027: active subs ≥200.

### RA: first-renewal rate near 65%, and Compliance Plan upgrades

**Why it works:** The rate depends on two things: whether the card on file can be charged, and whether the customer decides to cancel.
- Failed charges are fixed mechanically (valid cards, retries, fallback invoice).
- Voluntary cancels go down when the customer sees what the RA does and knows what switching costs (finding a new agent plus a $30 Certificate of Change filing).

**Steps:**

1. **Compliance Plan confirmation email** — subject is ASCII-safe (shipped; see `directRaComplianceUpgraded` in `direct-ra-notices.ts`).
2. **Card check (Agent, before Oct 20):**
   - For the 97 renewals due Nov–Jan, use Stripe to confirm each customer has a default payment method that expires after the billing date.
   - Spiffy payment-plan buyers are the most likely gap: their card may not be saved on the Stripe subscription.
   - For any without a usable card, the T-30 email leads with "update card." Ops follows up at T-14 if it still isn't fixed.
3. **Confirm Stripe settings:** Smart Retries on, card account updater on, invoice fallback after the final retry. All three were planned in August; confirm they're actually configured in the dashboard.
4. **Rewrite the T-30 email (Agent drafts, Sid approves, before the first Nov notices go out ~Oct 24):**
   - Lead with what the RA did this year (documents received, DOS notices forwarded; take the counts from the CRM where possible).
   - Then the plain switching cost: if the customer leaves, they need a new agent and a $30 state Certificate of Change filing.
   - Then the three buttons (upgrade, update card, cancel). Keep cancel easy (the plan's dispute rules).
5. **Quarterly RA value email** from Q1 2027: "What your registered agent handled this quarter." Short, factual. It cuts cancels and builds dispute evidence (revenue levers Lever 1, item 6).
6. **Compliance Plan pitch** (T-30 upgrade button, $249): biennial statement filed for them, good-standing checks, compliance calendar. Run the 50/50 test as planned.

**Expected effect:**
- Card health keeps failed charges to ≤10% of renewals due.
- The switching-cost and value messaging aims to keep voluntary cancels at ≤25%.
- Together that gives the ~65% first renewal.
- Compliance Plan upgrades: 15–25% of the test arm.

**Check:**
- **Per-cohort log:** Nov 23 renewals, Dec 31.
- **Jan 15 red flag:** disputes >0.5% or the test arm clearly worse → pause the upgrade offer.
- **Jan:** replace the 65% assumption with the measured rate in Section 6.

---

## 6. 2028 hurdle (validate — not a forecast)

### Superseded Oct 15, 2026 (v2 additive model)

The Oct 7 **~$1.02M** stack (1,200 × $520 formations + **+$90K** $985 assumption + **~$35K** CAQH in services) is **retired**. Patching price to +$45.6K formation-only and dropping CAQH lands near **~$937K** before other fixes — not the same as the hurdle below.

### Target and stretch cases (expert hurdle)

| Annual component | Target case | Stretch case |
|---|---:|---:|
| Formations | 1,500/yr (**125/mo**) | 1,680/yr (**140/mo**) |
| Blended formation contribution | $650/order (**unproven**) | $650 (**unproven**) |
| Formation contribution | $975,000 | $1,092,000 |
| Advertising + cash referral | −$130,000 | −$150,000 |
| Additional overhead (not in unit COGS) | −$60,000 | −$75,000 |
| VM: avg paying accounts × $40/mo × 12 | 350 → **$168,000** | 400 → **$192,000** |
| RA / compliance (overlap-adjusted) | **$75,000** | **$85,000** |
| Other services (**CAQH $0** base) | **$25,000** | **$35,000** |
| **Illustrative operating profit** | **$1,053,000** | **$1,179,000** |

The **125/month** and **140/month** rows are the shape this dollar table was built on. They are not the lever-supported volume. Section 2 puts that volume at **111–115/month** with the 30 partner target and Bing, or **107–111** if Bing stays blocked. The **10–14** order gap up to 125 has no source, and this table is not restated at 111–115. **$650**, the **$40** VM contribution, and the account counts stay as written.

**$985 formation-only example (before lost recurring):** 1,080 orders × $620 contribution vs 1,200 × $520 = **+$45,600**/yr — use only after P1-03 audited costs.

### Trajectory without hurdle (baseline)

**~$330K/yr** run-rate net (Section 1) ≈ **$400–550K** in a 2028-type year if partner/pricing/recurring engines do not land ([expansion-next-steps.md](memory-bank/expansion-next-steps.md)).

### Sensitivity (directional)

| If this fails | Effect |
|---|---|
| Partner row stays ~1/mo vs 25–30/mo hurdle | Largest volume gap |
| Bing stays blocked | Lever-supported total falls by **4**/month |
| No source is named for the **10–14** orders above the lever case | **125/month** in the dollar table stays unexplained |
| $650 blend not achieved | Hurdle formation line drops proportionally |
| VM/RA double-count not removed | Overstates recurring |
| $985 with >16% volume loss | May erase formation-only gain |
| RA first renewal ≪ 65% | RA line drops |

Re-cut Section 6 at **P2-11**, **P3-10**, and Mar 31 / Jun 30 gates (Section 9).

---

## 7. Services (90-day priority order)

| Priority | Item | Owner | When | Notes |
|---:|---|---|---|---|
| 1 | **NY PC formation pilot** | Ops + Sid | P2-09 / P3-05 | Manual 3–5 paid cases; $985–$1085 test band |
| 2 | **Existing-practice VM migration** | Ops + Sid | P2-06 / P3-04 | Ten paying migrations in 90 days |
| 3 | **Compliance Plan substance** | Ops + Agent | P3-07 | Deliverables beyond reminders; biennial filing when due |
| 4 | **S-corp add-on audit** | Ops | P2-09 | Scope vs CT-6 / handoff to accountant |
| — | **CAQH** | — | **Paused Oct 14** | **$0** base forecast; passive page + checkbox unless new pilot (P3-09) |
| — | **Affiliates** | Sid | Oct 31 time-box | Gusto/Mercury; $0 if not earning |
| Defer | Shelf SKUs / Practice Launch | Agent | After pilots | P3-09 stop/defer list |
| Selective | **MSO** | Sid + counsel | Jan 31 decision | No broad ads; CRM pair workflow exists |

**Services 2028 hurdle (base):** ~**$25K–$35K** other (affiliates + selective SKUs); **no CAQH** in base.

---

## 8. Execution calendar (Oct 16, 2026 – Jan 13, 2027)

**Authoritative task list:** [nypllc-90-day-execution-checklist.md](nypllc-90-day-execution-checklist.md) (packages P1-01 … P3-10).

**Already done (carry forward):**

| Item | Date |
|---|---|
| Compliance Plan email subject (ASCII) | Oct 2026 |
| Abandoned-checkout capture + 1h/24h cron | **Oct 14** |
| CAQH product pause + EIN-attach off | **Oct 14** |

**Period summaries:**

| Period | Dates | Outcome |
|---|---|---|
| P1 | Oct 16–29 | Economics, RA Oct 23, funnel truth, partner sends, $985 test design |
| P2 | Oct 30–Nov 29 | $985 live, partner handoffs, VM ops, PC/S-corp prep, model rebuild P2-11 |
| P3 | Nov 30–Jan 13 | Price decision, 100–150 firms, VM migration + PC pilots, Day 90 Q1 plan |

Weekly scorecards: [scorecards/](scorecards/). Decisions: [decision-log.md](decision-log.md).

---

## 9. Gates and reviews

| Date | Check | Pass | Fail |
|---|---|---|---|
| Oct 9 | Abandoned-checkout rows | **Pass Oct 14** | Debug if no volume 30d |
| **Oct 29** | **P1-12 Day-14 review** | Economics + billing + partner pipeline + price-test go | Blockers assigned |
| Oct 31 | VM unit cost; affiliates (1h time-box) | Measured VM $/sub | — |
| Nov 1 | **Paid verdict (dual)** | Order branch + profit/marginal CPA memo | Cap / experiment only |
| **Nov 29** | **P2-12 Day-45 review** | Price, partners, VM, PC readiness | Document hold/continue |
| Nov 15–Dec 1 | Ads/LP structural freeze | Stable price test OK | Exception log only |
| Nov 15 | F1: ≥3 recovered (30d) | Keep sequence | Rewrite copy |
| Dec 15 | Microsoft | Keep F5 | Drop F5 from forecast |
| Dec 20 | F2: 45-day conversion read | Keep | Next drop-off |
| **Jan 13** | **P3-10 Day-90 review** | Q1 plan + Jun contingency | Re-cut §6 |
| Jan 15 2027 | B2B productive partners; RA red flag | Continue | Change message / pause upgrade |
| Jan 31 | SEO Gate S2; `03` read; MSO decision | — | — |
| **Mar 31** | Formations ≥65/mo ex-Jan; VM cohort vs old “200” target | On plan | Re-cut §6 |
| **Jun 30 2027** | **Structural checkpoint:** ~80–90 formations/mo; 10–15 partner orders; margin holds | Continue hurdle | Distribution / acquisition / date revision |
| Sep 30 | Q3: ≥80/mo trend | — | Reset target |

---

## 10. Measurement

### Metric definitions

| Metric | Definition |
|---|---|
| Formation order | CRM `Order`, `isVmOnly=false`, `totalCents>0`, dated by `orderCreatedAt` |
| Google / Microsoft order | Has `gclid`/`wbraid`/`gbraid` / `msclkid` (`msclkid` is the new build) |
| B2B order | Has `b2bPartnerId`; reported by segment |
| AI order | Referrer or UTM is chatgpt, perplexity, gemini, or copilot |
| Self-reported source | New required checkout field: Google search · ChatGPT/AI · colleague · partner/organization · association · social · other |
| Abandonment recovery | `CheckoutAbandonment.recoveredAt` within 14 days ÷ abandonments emailed |
| VM attach | Real VM sub ≤90 days after formation ÷ formations in that cohort (placeholders excluded) |
| RA first-renewal rate | Paid ÷ due, counted 30 days after the due date |

### Scorecard (weekly first)

**Weekly (P1-06):** Manual table first — templates in [scorecards/TEMPLATE-WEEKLY.md](scorecards/TEMPLATE-WEEKLY.md). Sid reviews ~30 minutes.

**Monthly:** [scorecards/TEMPLATE-YYYY-MM.md](scorecards/TEMPLATE-YYYY-MM.md) after weekly format is stable.

**Automation:** `PLLC-CRM/crm/scripts/weekly-scorecard-export.ts` exports baseline inputs; do not replace manual judgment until definitions freeze.

### Minimum metric definitions

Import from [90-day checklist § Minimum scorecard definitions](nypllc-90-day-execution-checklist.md) (productive partner, VM churn on exposure, RA matured renewal, contribution per eligible visitor, etc.).

---

## 11. Resources

### Sid's growth hours: assumed 10–12/week (confirm)

| Workstream | Hrs/week |
|---|---:|
| B2B sends and replies | 4–5 |
| SEO editing | 0–1 (one partner-usable asset per period; weekly cadence is deferred) |
| Email copy approvals (F1/F3/V2/RA) | 1–2 (Oct–Nov only) |
| Ads decisions | 1 |
| Reviews and recurring | 1 |
| Scorecard | 0.5 |

**If fewer hours are available, cut in this order:** shelf → segment C → extra SEO. Do not cut F1, F2, B2B segment B, or the scorecard.

**Out of 90-day scope:** automated advocate-invite cron (relationships ≠ coupon codes). Do not block Sid partner outreach on that build — [decision-log.md](decision-log.md).

### Spend

| Item | Q4 2026 | 2027 | 2028 |
|---|---:|---:|---:|
| Ads | ~$8K | $60–75K (depends on the Nov 1 branch) | ~$80K |
| B2B referral fees ($75/order) | — | ~$7K | ~$12K |
| Tools | <$100/mo | <$100/mo | <$100/mo |

### Legal review triggers

One-time counsel review before each:

- T-30 rewrite and renewal terms
- White-label agreement (before the first signs)
- Platform co-marketing terms
- MSO launch
- Dissolution SKU

---

## 12. Open inputs for Sid

1. Target = net profit in calendar 2028 (assumed).
2. Weekly growth hours (assumed 10–12).
3. Partner-requested meetings are allowed under the no-outbound-calls rule (assumed yes).
4. 2027 ads ceiling (assumed $60–75K).
5. MSO public launch in 2027: yes or no.

---

*v3 · Oct 16 2026. Operational detail through Jan 13, 2027: [nypllc-90-day-execution-checklist.md](nypllc-90-day-execution-checklist.md). Next revision at P3-10 (Jan 13), Mar 31, or Jun 30 structural checkpoint. Refresh Section 1 baseline after P1-02/P1-05 recounts.*
