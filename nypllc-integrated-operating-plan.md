# NYPLLC Integrated Operating Plan — Path to ~$1M Net

**Prepared:** October 7, 2026 (v2, same day: rebuilt bottom-up from levers)
**Horizon:** Oct 2026 → Dec 2028 (2028 is the target year)
**Owner:** Sid
**Roles used below:** **Sid** (decisions, relationships, sends) · **Ops** (CRM fulfillment, RA/VM ops) · **Agent** (Cursor agents for pulls, research, drafting, builds)

**How to read this plan:**
- Section 3 lists every lever: what we do, why it should work, the evidence, the steps, the expected effect, and how we know within 30–60 days whether it works.
- The 2028 numbers in Section 6 are the **sum of those levers**, not goals set from the top.
- When a lever's check fails, its number comes out of the model and the plan is re-cut at the next quarterly review.

---

## 0. Which document wins when they disagree

1. **This plan wins** on targets, levers, sequence, and gates.
2. **The channel plans win** on how each channel is run:
   - [Google Ads plan v2](nypllc-google-ads-operating-plan.md)
   - [SEO / content moat plan v1](nypllc-seo-content-moat-plan.md)
   - [Revenue levers plan v1](nypllc-revenue-levers-plan.md)
   - [B2B pilot plan](../PLLC-CRM/crm/reports/b2b-partner-program-pilot-plan.md)
   - [CAQH pilot launch](../PLLC-CRM/crm/docs/caqh-pilot-launch.md)
3. **The June 2026 growth plan** no longer sets ads policy or targets. Its "hold ~$92 tCPA" rule was replaced by the Sep 2026 $105 diagnostic and the Nov 1 verdict. Its data tables and B2B build checklist are still valid reference.
4. **The ~$1M table in [expansion-next-steps.md](memory-bank/expansion-next-steps.md)** (≈1,600 formations × ~$500) is replaced by Section 6.

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

- **Abandoned-checkout capture is not working.** `CheckoutAbandonment` has **zero rows** in production. The site beacon (`/api/checkout-abandonment`), the CRM ingest, and the cron all exist in code. The recovery emails built in September have never sent.
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
- **Bug:** the Compliance Plan confirmation email fails to send. Its subject contains an em dash (`direct-ra-notices.ts` line 211), and the ASCII subject guard rejects it. The first real upgrader would get no confirmation.

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

To reach ~$1M net in 2028, three things have to happen together:

1. **Formations double:** 50 → ~100/month average in 2028.
2. **VM grows:** from 95 subs to ~400 average in 2028.
3. **RA renewals land near 65%**, with some Compliance Plan upgrades.

The $985 price (Feb 2027 test) adds ~$90K if it holds. Section 6 shows the total.

**Formation volume moves the plan most:** each +10 orders/month ≈ +$62K/yr. VM is second. So most of this plan is about formations.

---

## 3. Formation levers: how we go from 50 to 100 a month

### Contribution by lever

| Lever | +orders/mo by Q4 2027 | +orders/mo, 2028 average | Confidence |
|---|---:|---:|---|
| F1 Abandoned-checkout recovery | +5 | +6 | Medium. Depends on the true count of started checkouts. |
| F2 Checkout and landing-page conversion | +4 | +6 | Medium |
| F3 Reviews | +1 | +2 | Low–medium |
| F4 Google Ads volume (bid, January, `03`, ad fixes) | +5 | +7 | Medium. The Nov 1 verdict decides it. |
| F5 Microsoft Ads | +3 | +4 | Low–medium. Account currently suspended. |
| F6 Organic search and AI answers | +5 | +9 | Medium–low. Slow. |
| F7 B2B and platforms | +11 | +14 | Medium–low. Largest and slowest. |
| F8 Second entities and MSO pairs | +1 | +2 | Low |
| **Total** (base 50) | **~85** | **~100** | |

Conversion gains from F1 and F2 raise every channel. They are counted **only** in F1/F2 so nothing is counted twice.

---

### F1. Abandoned-checkout recovery

**Why it works:** About 4 of 5 people who start checkout don't finish (Sep 1 audit). They have already chosen the service; most stall on price, timing, or a question. A short email sequence recovers a steady share, and the system for it is already built.

**Steps:**

1. **Get capture working (Agent + Sid, days 1–2).**
   - Check that `CHECKOUT_ABANDONMENT_SECRET` is set in **both** the site's and the CRM's Vercel Production environments, with the same value.
   - Check `CHECKOUT_ABANDONMENT_INGEST_URL`. If unset, the default is `billing.nypllc.com/api/public/checkout-abandonment`; confirm that host is right.
   - The send cron is already scheduled in CRM `vercel.json` (`/api/cron/checkout-abandonment`), so the break is on the capture side: either the shared secret or the site beacon in `form-tracking.tsx` never firing on the Spiffy embed.
   - Run one test checkout with an email you control. Confirm a row appears and the 1h email arrives.
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

**Steps:**

1. **Oct:** fix or pause the three disapproved enabled `01` ads. Hold $105. Weekly SOP continues.
2. **Nov 1 verdict** (ads plan):
   - **≥30** October Google orders → ladder per ads plan; plan Google at ~33/month in 2028.
   - **20–25** → cap spend at ~$3K/month outside January; Google planned at ~25/month; move the gap to F6/F7 (B2B list grows from 300 to 400).
   - **26–29** → hold and re-read Dec 1.
3. **January 2027:** budgets preloaded in December; full force up to ~$10K.
4. **`03` foreign:** read Jan 31 (≥3 foreign orders/month → add two states per quarter).
5. **Feb 2027:** the $985 price test per the revenue levers plan, with ad price assets updated the same day.

**Expected effect:** about **+5 by Q4 2027, +7 average in 2028.** That is Google at ~27–33/month including the lift from F1/F2.

**Check:** the weekly SOP, which tracks eligible auctions, CPA, and Ads↔CRM within ±10%.

---

### F5. Microsoft Ads

**Why it works:** Microsoft Ads reaches searchers Google doesn't, especially on desktop (Windows/Edge default search), and our buyers convert mostly on desktop. Campaigns can be imported from Google, so setup is small.

**Steps:**

1. **Sid:** update the NY business registration address to match the Microsoft account, then reopen support case 7109261224. There are two verification attempts left; do not open a second account.
2. **Agent, before reinstatement:** add `msclkid` capture on the site and in the CRM webhook and `Order` table. It is not captured anywhere today, so Microsoft orders would show up as untagged.
3. **On reinstatement:** import `01`, `02`, and `Sales` with the same negatives (Lists A–E). Use manual or enhanced CPC until 15 conversions, then tCPA.
4. **Deadline:** not reinstated by **Dec 15 2026** → drop F5 and move its 4/month into F6/F7.

**Expected effect:** about 10–15% of Google volume → **+3–4/month.**

**Check:** 60 days after reinstatement, ≥5 Microsoft orders.

---

### F6. Organic search and AI answers

**Why it works:** We rank on page 3–5 (positions 20–45) for every commercial term. Google ranks commercial pages on relevance and authority. Our content and data are the relevance; what's missing is **authority: links and mentions from credible NY professional sources.** AI assistants (ChatGPT has sent 9 orders) draw on the same signals, plus plain factual pages they can quote.

**Steps:**

1. **One content piece per week** (SEO plan editorial map). Each one contains at least one CRM-only fact.
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

### F7. B2B and platforms: +14/month

Full campaign detail is in **Section 4**. The summary:

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

**Starts Nov 9 2026.** The pause was waiting on CAQH copy/page (done) and the EXP close-out (done). Affiliates no longer hold it up.

### Prospect volume needed

Activation assumptions from Aug–Sep: cold professional email gets ~10% replies, and ~40% of replies agree to be provisioned. **Plan for 4% of contacted → active.**

| Segment | Active needed | Contacts needed | Have today |
|---|---:|---:|---:|
| Professional referrers | 12 | ~300 | ~30 in tracker |
| Platforms and associations | 3 | 25–40 named targets | Headway, Alma named |
| Wholesale / MSO operators | 2 | 15–20 named targets | 0 |

### A. Past-client advocates (Ops + Agent; ~1 hr/month of Sid)

- **Change from today:** invites go out automatically instead of in manual batches.
- **Build (1 day):** a CRM cron sends the advocate invite 30 days after `FORMATION_COMPLETE`. One send per customer; respects do-not-send.
- **Offer:** unchanged ($25 off for the friend, $75 to the advocate at DOS filed).
- **Check:** active advocates and orders/month in the scorecard. Target 0.1 orders per active advocate per month.

### B. Professional referrers (Sid sends; Agent researches and drafts)

- **List building (Agent, by Nov 9 for the first 150; Nov 30 for 300).** Five sub-segments:
  1. NY credentialing and billing firms
  2. Healthcare practice consultants and coaches
  3. CPAs serving medical and therapy practices
  4. Healthcare and transactional attorneys who don't form entities themselves
  5. Malpractice brokers
- **Excluded:** anyone who sells formations. Each prospect is scored and logged in the existing tracker.
- **Waves:** 25/week from Nov 9 to Mar 2027. One follow-up at day 7; stop after two touches.
- **Message:** what their client gets (NY specialist, all-in $885, NYSED handled), what they get ($75 per formation at DOS filed, a co-branded link), and one ask (reply "yes" for a link). No dollar amounts in cold email (existing rule).
- **Build (1 day): `/partners/[slug]`.** A co-branded page that preloads `?c=CODE` and shows "Recommended by [Partner]."
- **On "yes":** provision within 1 business day (script exists), attach the Spiffy promo the same day, and send the link plus a two-line blurb they can paste to clients.
- **Keeping partners active:** a quarterly partner email with the NYSED wait-time update (something useful to forward) and their referral count.
- **Stop rule:** fewer than 3 active from the first 150 sends by **Jan 15** → change the message and sub-segment before sending more.

### C. Platforms and associations (Sid, one-to-one, 3–4 targets/month from Nov)

- **Targets to validate:**
  - Therapy networks with NY clinicians (Headway, Alma, Grow, Rula, SonderMind, and similar)
  - Private-practice communities, podcasts, and newsletters for therapists and NPs
  - NY professional associations: social work, mental health counseling, psych NP, PT, dental society components
- **Pitch:** "Your NY clinicians starting their own practice need a PLLC first."
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

1. **Fix the Compliance Plan confirmation email subject** (em dash in `direct-ra-notices.ts` line 211). **Do this now, before the Nov 3 renewal.**
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

## 6. 2028 model = sum of the levers

| Line (2028 net) | If only today's trajectory continues | With the levers above |
|---|---:|---:|
| Formations | 700 × $520 − $40K = $324K | 1,200 × $520 − $80K = **$544K** |
| $985 price (if the Feb 2027 test passes) | — | +$100 × ~1,000 direct orders × 90% retention = **+$90K** |
| VM (§5) | ~250 avg → $120K | ~400 avg → **$192K** |
| RA + Compliance Plan (§5) | $64K | **$100K** |
| Services (§7) | $40K | **$90K** |
| **Total** | **~$550K** | **~$1.02M** (~$930K without the price change) |

### Sensitivity

| If this lever fails | 2028 net changes by |
|---|---:|
| F7 B2B delivers 5/month instead of 14 | −$56K |
| F1 + F2 deliver half | −$37K |
| Nov 1 paid verdict fails (F4 → +2) | −$31K plus lower ad spend (net about −$15K) |
| $985 rejected | −$90K |
| VM average 300 | −$48K |
| RA first renewal 45% | −$30K |
| CAQH dropped | −$25 to −40K |

**If several levers fail, the plan comes in around $800–900K.** The quarterly reviews (Section 9) re-cut the plan when that happens.

---

## 7. Services: CAQH, affiliates, shelf, MSO

| Item | How | Owner | When | Gate |
|---|---|---|---|---|
| CAQH follow-up | One email to the 22 launch invoices, the EIN-attach cohort, Rabinowitz, and AL-Basir. Opens with two questions: do you bill insurance directly, and do you already have CAQH? | Sid | Before Oct 15 | — |
| CAQH verdict | — | Sid | **Oct 31** | **3–5 paid** → paid Spiffy SKU and release the held backlist with cohort copy (~$35K plan). **1–2 paid** → keep the EIN-attach rail running; re-read Jan 31. **0 paid** → passive only (page + checkbox); hours move to B2B builds. |
| Payroll and banking affiliates | Gusto and Mercury are pending. If not approved by Oct 31, apply to OnPay or ADP and to Relay's referral program. Place links in the EIN-obtained email, the S-Corp-docs email, and the S Corp page. | Sid | Oct 31 | — |
| 1120-S tax partners | Recruit from the CPA sub-segment of B2B segment B: rev-share or two-way referrals | Sid | Nov–Dec | — |
| Shelf SKUs | Good Standing $99, Amendment $249, Dissolution $299, DBA $199. One every 2 weeks, each with its own page and checkout. Pitch in lifecycle emails at the matching moments (CAQH, address change, VM). | Agent; Sid approves | Nov–Feb | — |
| Practice Launch bundle | $1,485 | Agent + Sid | Mar 2027, after the price test | — |
| MSO public launch | — | Sid | Decide by Jan 31 2027 | — |

**Services 2028:** CAQH ~$35K + affiliates ~$25K + shelf ~$20K + MSO ~$10K ≈ **$90K.**

---

## 8. First 30 days, in order

| # | Day | Action | Owner | Lever |
|---|---|---|---|---|
| 1 | Oct 7–8 | Fix the Compliance Plan email subject (em dash) | Agent | RA |
| 2 | Oct 7–9 | Get abandoned-checkout capture working: env vars on both projects, cron, test checkout, first row confirmed | Agent + Sid | F1 |
| 3 | Oct 8–10 | Pull the funnel by device, 60 days (landing → order page → checkout → purchase) | Agent | F2 |
| 4 | Oct 8–14 | Stripe card check for the 97 Nov–Jan renewals; confirm retries, card updater, and invoice fallback are on | Agent + Ops | RA |
| 5 | By Oct 14 | Send the CAQH follow-up | Sid | Services |
| 6 | Oct 12–16 | Rewrite the abandoned-checkout emails (1h/24h/72h) | Agent drafts, Sid approves | F1 |
| 7 | Oct 12–16 | Rewrite the OP-approved VM upsell and add the second touch; send once to the 67 placeholders | Agent drafts, Sid approves | V2 |
| 8 | Oct 12–16 | Move the review ask to the DOS-approval email, with a direct GBP link and a 7-day reminder | Agent | F3 |
| 9 | Oct 14–22 | Rewrite the T-30 email (value + switching cost) before the first Nov notices (~Oct 24) | Agent drafts, Sid approves | RA |
| 10 | Oct 15 | SEO Gate S1 scorecard; `03` first read | Agent, Sid reviews | F6/F4 |
| 11 | Oct 15–31 | Checkout "how did you hear" field + `msclkid` capture | Agent | Measurement / F5 |
| 12 | Oct 15–31 | Fix or pause the 3 disapproved `01` ads; mobile pass on the top 5 landing pages | Sid / Agent | F4/F2 |
| 13 | Oct 19–Nov 10 | Order page above the embed: total, payment plan line, reviews, timeline; VM checkbox copy (logged in the ads change log) | Agent builds, Sid approves | F2/V1 |
| 14 | Oct 20–Nov 9 | Build the B2B list (150 scored), `/partners/[slug]`, and the advocate auto-invite cron | Agent | F7 |
| 15 | Oct 31 | CAQH verdict; affiliate decision; VM unit cost measured | Sid / Ops | Services / VM |
| 16 | Nov 1 | Paid verdict, then the F4 branch | Sid | F4 |
| 17 | Any time | Microsoft registration address fix, then support | Sid | F5 |
| 18 | Oct 31 | Monthly scorecard script and first scorecard | Agent | All |

---

## 9. Gates and reviews

| Date | Check | Pass | Fail |
|---|---|---|---|
| Oct 9 | Abandoned-checkout rows appearing | — | Escalate. Nothing else in F1 works until this does. |
| Oct 31 | CAQH; affiliates; VM unit cost | §7 | §7 |
| Nov 1 | Paid verdict | F4 ladder | F4 cap; move the gap to F6/F7 |
| Nov 15 | F1 first 30 days: ≥3 recovered orders | Keep | Rewrite copy |
| Dec 15 | Microsoft reinstated | Keep F5 | Drop F5 |
| Dec 20 | F2: 45-day conversion read vs baseline | Keep | Next-largest drop-off |
| Jan 15 2027 | B2B ≥3 active from 150 sends; RA red flag | Continue | Change message / pause upgrade |
| Jan 31 | SEO Gate S2; `03` read; MSO decision | — | — |
| Feb | $985 test | Adopt | Revert |
| **Mar 31** | **Q1 review:** formations ≥65/month excluding January; VM ≥200; RA measured rate; MSO/wholesale operator live | On plan | Re-cut §6 |
| Jun 30 | SEO Gate S3; platform gate | — | Fold segment C into B |
| Sep 30 | Q3 review: ≥80/month | Set 2028 at 100/month | Reset target |

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

### Monthly scorecard

Produced by Agent on the 1st business day; Sid reviews in about 30 minutes. Saved to `scorecards/YYYY-MM.md`. Contents:

- Formations by lever and source vs Section 3
- Checkout funnel and recovery
- Reviews
- VM adds, attach, and churn
- RA cohort results
- B2B sends, active partners, and orders by segment
- SEO output and positions
- Services revenue
- Net vs Section 6

**Build:** one `monthly-scorecard.ts` in PLLC-CRM.

---

## 11. Resources

### Sid's growth hours: assumed 10–12/week (confirm)

| Workstream | Hrs/week |
|---|---:|
| B2B sends and replies | 4–5 |
| SEO editing | 2 |
| Email copy approvals (F1/F3/V2/RA) | 1–2 (Oct–Nov only) |
| Ads decisions | 1 |
| Reviews and recurring | 1 |
| Scorecard | 0.5 |

**If fewer hours are available, cut in this order:** shelf → segment C → SEO to one piece every 2 weeks. Do not cut F1, F2, B2B segment B, or the scorecard.

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

*v2 · Oct 7 2026. Next revision is due at the Mar 31 2027 review or after any failed gate. Update Section 1 when the Oct 9 (checkout capture), Oct 20 (card check), and Oct 31 (VM cost) inputs come in.*
