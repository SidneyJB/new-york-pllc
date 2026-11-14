# Credentialing alone: the path to $350–500K net a year by December 2028 (v2)

**Written:** Nov 14 2026, for Sid. **v2** replaces v1 (same day) after Sid's pushback.
- Research and analysis only. Nothing was sent, filed, signed up for, bought or changed.
- CRM figures come from read-only scripts. I read each script's header and checked it for write calls first: `credentialing-status.ts --all` and `query-virtual-mail-churn.ts`.
- Public data comes from the CMS NPI Registry API and published pages.
- Organic paths only. **Buying a credentialing firm or book is excluded (Sid, Nov 14 2026).** Claims billing / revenue-cycle work is excluded too.

**Tags:**
- **[M]** measured: our CRM, or a primary source such as NPPES, a state agency or a broker's own listing.
- **[S]** secondary: trade press, vendor pages, third-party keyword tools.
- **[E]** our estimate, built from measured inputs.
- **[A]** assumption with no direct evidence.
- **[U]** looked for, could not verify.

**Definitions:**
- **Net:** revenue minus credentialing's cash costs (ads, mail, hired staff, offshore help, tools, refunds, card fees). Sid's own time is not a cost.
- **Run-rate:** December 2028 × 12.

---

## 0. What changed from v1

| | v1 | v2 | Why |
|---|---|---|---|
| Frame | NY first, other states as add-ons | **National from the start; NY is one market (4.5% of new behavioral-health practices)** | Sid's point 2. The 51-state NPPES pull (§2) shows ~26,800 new practices a year nationally |
| Recurring revenue | Groups only; solo upkeep a $249/yr add-on | **Individual maintenance is a core product** at $69/month (therapist) and $119/month (prescriber), attached by default to every setup and sold on its own | Sid's point 1. Market maintenance runs $45–150 per provider per month [S] |
| Edge outside NY | "None" | **Designed and tested (§6).** Speed to submission, under 45 minutes of the client's time, never invoiced for a closed panel, a published panel-status lookup. Price undercutting is not a real edge | Sid's point 3 |
| References | Treated as a blocker until mid-2027 | A 20% conversion haircut for 6 months, 10% for the next 6, a founding-client discount, and written terms as the substitute for proof | Sid's point 4. The sensitivity shows this costs only ~2 points of probability |
| Acquisition | Out-of-state reach near zero | **Modeled from analogs:** national keyword volumes and CPCs, our formation Ads numbers, direct-mail response benchmarks | Sid's point 5 |
| P(net ≥ $350K by Dec 2028), best plan | ~20% model; I said 15–18% | **~47–49% model; my judgment ~35–40%** | Mostly the national paid channels and the maintenance book |
| P(net ≥ $500K) | ~11% model; I said 8–10% | **~34–37% model; my judgment ~22–25%** | Same |
| Revenue needed for $350K net | $520–650K | **$750–850K** | National clients cost ad and mail money; NY funnel clients were nearly free |

**Where I still disagree with Sid after checking** (detail in §11):
1. Maintenance mostly attaches to our own setups. Selling it standalone to already-credentialed DIY clinicians is weak.
2. Price undercutting isn't an edge against $79-a-payer shops.
3. Credentialing search clicks cost 2–7× formation's, so paid acquisition is expensive, though not near zero.

---

## 1. The answer on one page

**$350K net from credentialing alone by December 2028 is a real possibility if we sell nationally: about a 35–40% chance on the best plan, and about 22–25% for $500K.** That's my judgment, a few points below the model (§9). The best plan has three parts:
- Done-for-you setups for therapists and prescribers in every state.
- Monthly individual maintenance attached to every setup and sold on its own.
- Group roster retainers.

Two things decide it, and both can be measured in Q1 2027 for about $15–20K:
1. **Cost per paid client from national direct mail to new practices.**
2. **Cost per paid client from national paid search.**

If both come in above about $1,600, the chance falls back to roughly 12–15%, which is the NY-only case.

**What the target takes, mechanically (§3):**
- For $350K net: about $750–850K revenue run-rate, for example 18–20 setups a month, 280–300 maintenance subscribers and ~10 groups.
- For $500K net: about $1.05–1.15M, for example 24–28 setups a month, 400–420 subscribers and ~15 groups.
- That's about 0.8–1.1% of the ~26,800 new behavioral-health practices a year nationally [M], or roughly 3–11% of those that pay someone [E].

**Most likely outcome on the recommended plan:**
- **Model:** median December 2028 net ~$320K, mean ~$500K, 80% range ~$40K–1.2M.
- **My judgment:** median ~$230–300K. About 15–20% chance of under $75K, if neither paid channel works and maintenance stays small.

**Recommended:** combination 2 (national individuals + maintenance-first + groups), with telehealth companies only after the 2028 gates.

---

## 2. The national market, by segment

### 2.1 Measured flow of new practices (NPPES, all 50 states + DC)

**Method:**
- Type 2 organization NPIs with any listed taxonomy among social worker, counselor, MFT, psychologist, psychiatry, or psych/mental health NP.
- Counted where the practice location is in that state.
- 2026 annualized from Nov 14 (×365/318).
- Pulled Nov 14 2026 from the [NPI Registry API](https://npiregistry.cms.hhs.gov/api/?version=2.1), split by ZIP prefix wherever results hit the API's 1,200 cap; no cell was left capped.

| | 2023 | 2024 | 2025 | 2026 (annualized) |
|---|---:|---:|---:|---:|
| New BH organization NPIs, US [M] | 14,969 | 17,341 | 20,397 | **26,756** |
| of which prescriber orgs (psychiatry or psych NP) [M] | 3,264 | 4,041 | 4,830 | **6,242** |
| of which psych NP orgs [M] | 2,111 | 2,636 | 3,266 | **4,435** |
| Active BH organization NPIs, US [M] | | | | **205,761** |

**Cross-checks and caveats:**
- **Cross-check:** NPs registered 5,097 new practices Jan 1–Sep 26 2026, over half psychiatric ([Medical Economics, Oct 13 2026](https://www.medicaleconomics.com/view/nps-are-registering-new-practices-at-nearly-6-times-the-2019-rate)) [S]. That's ~3,500 psych NP practices a year against our 4,435. Our taxonomy match is wider, so the two agree on order of magnitude.
- **Caveats:**
  - The API returns active NPIs only, so growth is partly survivorship.
  - The match includes agencies and multi-specialty organizations.
  - Many solo clinicians in other states bill under a Type 1 NPI and never appear here. This undercounts solos outside NY [A].

**Where the flow is (2026 annualized) [M]:**

| State | New BH orgs | Prescriber orgs |
|---|---:|---:|
| CA | 2,377 | 558 |
| TX | 1,993 | 543 |
| FL | 1,603 | 619 |
| IL | 1,250 | 186 |
| **NY** | **1,202** | **340** |
| CO | 1,143 | 201 |
| NC | 1,087 | 182 |
| MD | 1,078 | 385 |
| MI | 946 | 99 |
| NJ | 896 | 265 |
| PA | 882 | 157 |
| MA | 838 | 242 |
| WA | 825 | 202 |
| VA | 822 | 211 |
| OH | 759 | 145 |

- The top 15 states hold ~66% of the flow. NY is 4.5% of it.
- Raw files: [npi2/](file:///private/tmp/claude-501/-Users-sidb-dev-pllc-business/8a087395-ccff-4c7f-ae1f-21e6eb28b61d/scratchpad/npi2/) (scratchpad, not committed).

### 2.2 Reachable market per segment, national

| Segment | Size | Paying share | Reachable buyers / yr | Value / yr | Basis |
|---|---:|---:|---:|---:|---|
| **New practices needing setup** (therapists and prescribers) | 26,756 new orgs/yr [M] + Type 1-only solos [U] | 10–25% pay someone [A] | **~2,700–6,700** | **~$5–13M** at ~$1,950 | Our psych NPs self-file the first step 48% of the time and therapists 23% [M], so many DIY |
| **Already-credentialed clinicians needing maintenance** | ~60K own-contract solo BH clinicians nationally [A: ~612K BH specialists (Becker's, via the standalone note) × 30% private practice × 65% take insurance × ~50% not platform-only] | 3–10% pay for upkeep [A] | **~2,000–6,000 subscribers** | **~$2–6M** at ~$85/month | CAQH is free and re-attestation takes ~10 minutes [M, our docs]. Platform users are excluded |
| **Group practices (3–30 clinicians)** | 205,761 active BH orgs [M]; group share **[U]** (the CMS clinician file refused our automated request, HTTP 403); 10–20% → ~20–40K [A] | 2–5% outsource to a firm like us [A] | ~400–2,000 groups | ~$4–20M at ~$10K/group/yr | In-house admins and Headway's free group credentialing ([Headway](https://headway.co/for-providers/group-practices)) [S] |
| **Medicare enrollment for counselors and MFTs** | 72,590 MHCs + 15,532 MFTs enrolled by Jun 30 2026; ~4,500 added in Q2 2026 ([NBCC](https://www.nbcc.org/governmentaffairs/grassroots/newsroom/Behavioral-Health-Expansion)) [S] | low (PECOS is free) | ~200–900 | <$0.4M | Small add-on |
| **Multi-state telehealth companies** | [U] | — | — | — | Funded vendors (Medallion $130M raised, Assured $19M Series A) sell exactly this [M, first study] |

**Read:** the national pool is about 20× NY's. The target needs roughly 1% of new practices plus a few hundred subscribers. Market size is not the constraint. Cost per client, conversion and execution are.

---

## 3. What $350–500K net requires

### 3.1 Cost structure at national scale (annual, Dec 2028 level) [E/A]

| Cost | At ~$750–850K revenue | At ~$1.1M | Basis |
|---|---:|---:|---|
| US credentialing coordinators | $62K + $58K | + a third at $58K | NY credentialing specialist ~$24–28/h ([Payscale](https://www.payscale.com/research/US/Job=Credentialing_Specialist/Salary/a276da63/New-York-NY)) [S]; they cover phone queues, tax-ID entry, client support |
| Offshore assistants (status calls, no SSN access) | $28–42K | $56K | $5–9/h postings [S] |
| Share of the 2027 ops coordinator | $7K | $7K | Mostly charged to formation [A] |
| Acquisition (mail + search) | ~$165K | ~$250K | Blended ~$700–750 per setup including the free channels (funnel, SEO, referrals) [E, §5] |
| Card fees, tools/AI, E&O/cyber, refunds and credits | ~10% of revenue + $12K | same | Refunds/credits assumed at 5% [A] |
| Filing fees | ~$0 | ~$0 | Medicare's application fee applies to institutional providers, not individual practitioners or their groups [S]; CAQH is free for providers [M] |

### 3.2 Mixes that reach the target (deterministic) [E]

| December 2028 mix | Revenue/yr | Net/yr |
|---|---:|---:|
| 20 setups/month at $1,950 + 280 maintenance subscribers at $80 | $737K | **$328K** (just short) |
| **18 setups/month + 300 subscribers + 10 groups × 7 clinicians at $105** | $836K | **$406K** |
| 28 setups/month + 420 subscribers | $1,068K | **$471K** |
| **24 setups/month + 400 subscribers + 15 groups** | $1,151K | **$542K** |

**Net margin runs ~45–50%**, lower than v1's NY-funnel 55–70%, because national clients are bought with mail and ads.

---

## 4. Individual maintenance as a core product (Sid's point 1)

**Market prices [S, vendor pages and guides; most unaudited]:**

| Source | Price |
|---|---|
| Therapist-focused vendors | $50–100 per month |
| Retainers | "from $99 a month" |
| Pricing guide (last reviewed Jul 23 2026) ([Compare Practice Tools](https://comparepracticetools.com/credentialing/pricing-cost-guide)) | $75–150 per provider per month for re-attestation, roster upkeep and expirables tracking. CAQH re-attestation priced separately at $50–100; new payer adds $150–400 each |
| MGMA, 2021 ([MGMA](https://www.mgma.com/articles/navigating-the-credentialing-gauntlet-key-actions-for-revenue-cycle-management)) | $66–129 per provider per month |
| One vendor's published example | $45–60 per provider per month |

**Proposed offer, "Credentialing Care" (needs Sid's approval; replaces the $249/yr and the unapproved $39/month):**

| | Therapist | Prescriber / multi-state |
|---|---:|---:|
| Monthly | **$69** | **$119** |
| Annual prepay | 2 months free | 2 months free |
| Payers included | up to 6 | up to 10, plus DEA, Medicare, Medicaid |

**What it includes:**
- CAQH update every 120 days, plus a one-click attest prompt. The provider must attest personally, so say that.
- Medicare and Medicaid revalidation.
- Payer re-credentialing packets.
- Expiry tracking and uploads: license, malpractice, DEA, board certification.
- Address, phone and roster changes at every payer.
- A quarterly directory check. Plans must verify directory data at least every 90 days under the No Surprises Act [S].
- One new payer a year included; further payers $299.

**How it's sold:**
- The first 3 months come inside every setup, on by default and cancel-anytime. This copies the "first month free" pattern on our VM upsell [M].
- Sold standalone to already-credentialed clinicians by mail and search.
- Offered as a one-click add-on to our own VM and RA clients who are clinicians, since Stripe already holds their card.

**Attach and churn, from our own analogs:**
- **Virtual mail:**
  - Checkout attach ~27–30% [M, P2-11 model].
  - Observed churn: 9 cancellations among 129 customers, Jan 20 – Nov 15 2026, annualized 17.9%, about 1.6%/month [M, `query-virtual-mail-churn.ts`].
  - The model plans at 2.4%/month [M, P2-11].
- **Maintenance is more skippable than VM.** VM is a legal address with switching costs; CAQH is free. I model churn at 1.8–3.5%/month [A].
- **Attach:** I model 45–70% for default-on attach to setups [A], against VM's 27–30% for a pure opt-in.
- **Retainer benchmark:** the 2026 Synergy sale reported 89%+ client retention on annual retainers ([listing](https://synergybb.com/listings/high-margin-credentialing-and-compliance-services-firm-with-built-in-saas-upside/)) [M, seller claim].

**What the book does by Dec 2028 (model, §9) [E]:**
- **Size:** median ~275 subscribers, about $22K a month, roughly a quarter to a third of revenue.
- **Churn doesn't matter much yet:** 1.6% vs 4–5% a month moves P(≥$350K) by only ~5 points, because the book is young.
- **Price matters a lot:** at $35–45 a month instead of $65–95, median net falls ~$90K and P(≥$350K) drops ~11 points. Maintenance is worth pricing as a real service.
- **By 2030 it compounds:** at ~20 net new subscribers a month it becomes the largest line.

---

## 5. Acquisition from analogs (Sid's point 5)

### 5.1 Paid search

**Our formation account [M, Ads shard and operating plan]:**
- $9.51 CPC, 10.4% of clicks become an order.
- 30-day CPA about $91–140.
- ~$536 contribution per order.

**National credentialing keywords, US monthly searches and CPC** [S, [seodata.dev](https://www.seodata.dev/keyword/credentialing-services) citing Google Ads API data, pages updated Jun–Nov 2026]:

| Keyword | Searches/month | CPC |
|---|---:|---:|
| credentialing services | 880 | $67.98 |
| medical credentialing services | 590 | — |
| credentialing companies | 480 | — |
| physician credentialing services | 390 | — |
| credentialing services for providers | 320 | — |
| provider credentialing | 1,600 | $26.53 |
| medical credentialing | 1,600 | $18.01 |
| therapist credentialing | 590 | — |
| insurance credentialing for therapists | 260 | $46.66 |
| how to get credentialed (mental health / as a therapist) | 140 + 110 | — |
| therapy credentialing services | 90 | — |
| caqh credentialing | 6,600 | — |

**Estimate:** ~6–9K commercial-intent searches a month nationally, including long-tail state and profession terms [E]; NY ~6–8% of that [E]. CPCs run **2–7× formation's**.

**Cost per paid client:** CPC $20–45 [S/E] ÷ 2–5% of clicks becoming a paid setup [A] (formation's 10.4% × 0.2–0.5 for a considered $2K purchase) gives **$600–2,400, central ~$1,100** [E]. Marginal cost rises with budget. The model raises CAC by (budget/$5K)^0.35.
**Volume:** $20K a month buys ~450–1,000 clicks, about 10–20 setups a month at central rates [E].

### 5.2 Direct mail to new practices from NPPES

- **Flow:** ~2,230 new BH practices a month nationally, with public mailing addresses [M].
- **Response benchmark:** B2B direct mail averages ~4.4% response, prospect lists 2–5% (ANA report, via secondaries, e.g. [Demand Metric](https://www.demandmetric.com/content/the-state-of-response-rates-benchmark-report)) [S].
- **Response is not a sale.** I assume **0.1–0.8% of practices mailed (2–3 touches) become a paid setup**, median 0.3% [A], at $2.00–4.50 per practice [A]. CAC is **$375–3,000, central ~$1,000** [E].
- **At national scale:** ~$80K a year of mail, about 7 setups a month at the median [E].
- **For maintenance-only offers to existing practices:** I assume 0.15% (p90 0.4%) per piece at $1.25 [A]. A ~$3,000+ lifetime value at $80/month and 2.5% churn clears that if conversion is ≥0.1% [E].

### 5.3 Free and owned channels

| Channel | Volume | Basis |
|---|---|---|
| NY formation funnel + NPI watch | 1.5–3 setups/month [E] | ~157 BH formations a year; 18 of 56 formed BH PLLCs already have a Type 2 NPI [M] |
| SEO / AI answers, including a public "is this panel open?" lookup | median ~3 setups/month by Dec 2028 [A] | ChatGPT is our one rising formation source [M] |
| Referrals | ~2% of past clients a year refer someone [A] | Small but compounding |
| Associations, schools, EHR marketplaces, billing firms that don't credential | Small [A] | Cold partner outreach got 1 reply in 38 [M] |

---

## 6. The edge outside NY: designed and tested (Sid's point 3)

**Buyer evidence first.** Public complaint evidence is thin.
- **Reddit:** blocked our requests (HTTP 403) and isn't indexed by the search tool [U].
- **Trustpilot:** GetPaneled has 5 reviews, all 5-star, praising responsiveness and regular updates ([Trustpilot](https://www.trustpilot.com/review/getpaneled.com)) [M]. Medwave has 1 review [M]. A billing/credentialing firm's 1-star review says credentialing work never started after onboarding [S].
- **Platforms:** therapists report slow refunds and no live person at Alma ([ClearHealthCosts, Nov 2025](https://clearhealthcosts.com/blog/2025/11/therapists-have-misgivings-on-the-platforms-alma-headway-etc-and-the-business-of-therapy/)) [S].
- **Payer side:** guides note minimal status updates from payers during 90–120-day reviews [S].
- **Our strongest buyer evidence is our own:** in the 2026 CAQH pilot (0 paid of 23), people passed because they already had CAQH (8), used platforms, were cash-only, or relied on an EHR ([pilot outcomes](../../PLLC-CRM/crm/docs/caqh-pilot-outcomes-oct-2026.md)) [M]. **The barrier was perceived need, not distrust of vendors.**

| Candidate edge | Real? | Defensible? | Evidence and verdict |
|---|---|---|---|
| Undercut on price, because agents work at ~$0 | **Partly** | No | Offshore shops already sell at $79–150 a payer (GetPaneled $79/insurer with a 6-month refund) ([Crown Counseling](https://crowncounseling.com/reviews/best-credentialing-services-for-therapists)) [S]. Their labor costs ~$100–300 a job at $5–9/h [E], so our cash edge over them is small. Against US full-service firms ($1,500–5,000 packages, $75–400/month maintenance) [S] we can be 20–40% cheaper and keep ~50% margins. **Use cost to fund guarantees and fair maintenance prices, not a price war** |
| Speed: submitted within 5 business days of complete documents, weekly written status | **Yes** | Partly (copyable) | Payer clocks dominate (60–150 days), but time-to-submission and update frequency are what clients see and what reviews praise [M, GetPaneled reviews]. **Publish it as a promise; refund that payer's fee if missed** |
| "About 45 minutes of your time" (done-for-you vs DIY or portal tools) | **Yes**, for busy prescribers and new practices | Partly (agent automation is hard to copy cheaply) | Sid's ~30 minutes on Danielle [M]; the client still attests CAQH, signs and visits a notary [M, ops manual]. Quantify it honestly; don't promise "you only sign" |
| Written panel check before invoicing; never pay for a closed panel | **Yes** | Moderately | Closures are the main way buyers lose money (Healthfirst declined our first client; Anthem Medicaid closed to Apr 2027; MetroPlus closed to therapists in NYC) [M]. Few vendors publish such a term; GetPaneled's refund is the nearest [S]. **Lead with it** |
| Multi-state panel-status tracker as a data asset, with a free public lookup | **Yes, with scale** | **Yes: the only edge that compounds** | No commercial tool or public dataset publishes open/closed status by payer × profession × county [M, our research]. Every inquiry adds data; it decays after 60 days, so volume keeps it fresh. Doubles as SEO and a lead magnet |
| Flat, published prices | Yes | No | Many vendors publish nothing [S]. Cheap to do |
| Fast, friendly, polished replies (the formation playbook) | Yes | No | Formation reached ~50 orders a month with Google CPA ~$91–140 and few reviews [M]. Same discipline, same agents |
| Entity enrollment know-how (group NPI, reassignment, Medicaid group) | Yes | Partly | Strongest in NY; generalizes to "practice entity" enrollment everywhere [A] |

**Bottom line on the edge:** the defensible package is **speed + minimal client time + no charge for closed panels + transparent prices + the tracker**. The agent cost edge pays for the guarantees. It doesn't win a price war.

---

## 7. Proof and references (Sid's point 4)

I agree for individuals, with one caveat. Formation's outcome is guaranteed by the state; credentialing's is decided by payers. So proof is replaced by terms, not dropped:
- **Before anything is charged:** a written network check for every insurer, showing their answer.
- **Expectations up front:**
  - Time ranges by payer.
  - "Medicaid can take longer."
  - The client's ~45 minutes, listed step by step.
- **Refunds:**
  - Any payer not submitted within 5 business days of complete documents is refunded.
  - If no payer is open, the setup fee is credited toward maintenance or refunded.
- **Launch discounts:** 10% founding-client discount for the first 25 individual clients; 15% off group setup for the first 5 groups.

**Model treatment:** conversion haircut of 20% for Jan–Jun 2027 and 10% for Jul–Dec 2027. A heavier 50%/30% haircut changes P(≥$350K) by only ~2 points.

---

## 8. Every lever (national)

Contributions are by Dec 2028 and come from the model (§9) [E].

| Lever | Dec 2028 effect if it works | P(works) | Cash to start | Verdict |
|---|---|---:|---:|---|
| **National direct mail to new practices** (NPPES) | 3–20 setups/month; median ~7 | ~65% that CAC ≤ $1,600 [A] | ~$5K Q1 test | **Core; test in Q1 in NY, NJ, FL, TX, MD** |
| **National paid search** (exact match: credentialing services, therapist credentialing, NP credentialing, state terms) | 5–20 setups/month | ~55% [A] | ~$9K Q1 test | **Core; scale only if CAC ≤ $1,200** |
| **Individual maintenance** (attached + standalone + VM/RA cross-sell) | ~200–400 subscribers, $15–35K a month | ~80% attach works; ~40% standalone works [A] | $0 | **Core product** |
| **Prescriber package** ($2,995 approved), nationally | Raises the blended ticket to ~$1,950 | ~75% | $0 | Core |
| NY formation funnel + NPI watch | 1.5–3 setups/month | ~85% | $0 | Keep |
| **Group roster retainers, national** ($99–129/clinician/month, $450 minimum; approved) | median ~12 groups × 7 clinicians if it works | ~50% | $0–3K | Core, gated |
| SEO, AI answers, public panel lookup | median ~3 setups/month | ~60% | $0–3K | Build in 2027 |
| State Medicaid enrollment outside NY | +$495 per client where offered | per state | $0 | Add state by state as agents finish payer files and a first case clears |
| National Medicare enrollment for counselors and MFTs | +$10–25K | ~50% | ~$1K | Small add-on |
| Multi-state telehealth companies | median ~3 accounts × 20 clinicians if it works | ~25% | $20–40K (SOC 2) after a signed letter of intent | Combination 3, from 2028 |
| Other professions (PT/OT/SLP, chiro, dental, ABA) | small | ~30% | $0 | Take inbound; ABA groups join retainers |
| Enterprise (health systems, delegated credentialing, DSOs) | ~$0 by 2028 | <5% | high | Drop |
| ~~Acquisition~~, ~~claims billing~~ | — | — | — | Excluded |

**State rollout order for mail, search and Medicaid add-ons:**

| Step | When | States | New BH practices/yr | Why |
|---|---|---|---:|---|
| Test | Q1 2027 | **NY, NJ, FL, TX, MD** | ~6,900 | Largest prescriber flows (FL 619, TX 543, MD 385, NY 340, NJ 265 [M]); our out-of-state owners live there (NJ 12, FL 9, TX 4 [M]); NJ's five Medicaid MCOs took over outpatient BH on Jan 1 2025 and four of the five are siblings of NY payers ([NJ DMAHS](https://nj.gov/humanservices/dmhas/documents/pdf/events-meetings/2026/NJ-FamilyCare-Behavioral-Health-Integration-Updates-SM.pdf)) [M] |
| Expand | Q2 2027 | Add CA, IL, CO, NC, MI, PA, MA, WA, VA, OH | top 15 ≈ 66% of the flow [M] | Biggest remaining flows |
| National | Q3 2027 | Every state | ~26,800 [M] | Full flow |

- **Medicaid:** NJ, CT and PA first (sibling payers, nearby). Large states only on demand.
- **Compacts:** NY is in none of PSYPACT, the Counseling Compact or the Social Work Compact [S]. NJ is in PSYPACT [S]. About 10–11 states issue Counseling Compact privileges ([Counseling Compact](https://counselingcompact.gov/news/)) [M]. Compacts help licensing; payer enrollment is still per payer, often per state.

---

## 9. Combinations and probabilities

**Model:** monthly ramp Jan 2027 – Dec 2028, 15,000 runs per combination (inputs in §13.3) [E].
- A shared demand factor ties the channels together.
- Mail scales nationally only if the Q1 test clears 0.15%. Search scales only if the test CAC is at or below $1,200.
- 15% of runs cap setups at 12 a month, for quality or capacity failure at multi-state scale [A].

| Combination | Median net (p10–p90) | Mean | Model P(≥$350K) | Model P(≥$500K) | **My P(≥$350K)** | **My P(≥$500K)** | P(<$75K) |
|---|---|---:|---:|---:|---:|---:|---:|
| Reference: NY-only individuals | $153K ($45–385K) | $196K | 12% | 5% | 10% | 4% | 27% |
| **1. National individuals:** setups + attached maintenance, mail + search + funnel + SEO | $228K ($22–906K) | $370K | 35% | 24% | **25%** | **15%** | 23% |
| **2. Combination 1 + standalone maintenance + national group retainers** (recommended) | $321K ($38K–1.18M) | $500K | 47% | 34% | **35–40%** | **22%** | 14% |
| **3. Combination 2 + multi-state telehealth companies** | $344K ($43K–1.22M) | $531K | 49% | 37% | **37–42%** | **25%** | 14% |

**Why my numbers sit below the model:**
1. No paid channel has a single measured conversion yet.
2. If the offer itself doesn't convert, every channel fails at once. The model's shared factor only partly captures that.
3. One owner plus agents running 20+ new clients a month across many states within two years has no base rate here.
4. The model's right tail ($1M+) needs everything at once.

**What must be true (combination 2 sensitivity grid, model P(≥$350K)):**

| Mail conversion median ↓ / search CAC median → | $800 | $1,100 | $1,600 | $2,200 |
|---|---:|---:|---:|---:|
| 0.15% | 46% | 38% | 32% | 29% |
| **0.30%** | 53% | **47%** | 42% | 40% |
| 0.50% | 60% | 56% | 53% | 51% |

Single-factor stresses on combination 2:
- Search never scales: 38%.
- National mail never scales: 36%.
- **Both fail:** roughly back to the NY-only reference, ~12–15% [E].
- Maintenance at $35–45/month: 36%.
- Attach only 25–35%: 41%.

**Probability-weighted most likely outcome (combination 2):**
- **Revenue run-rate:** ~$860K (model median); my judgment ~$650–800K.
- **Net:** ~$230–300K, my judgment.
- About a 1 in 3 chance of reaching $350K, and about 1 in 5 of $500K.

---

## 10. Quarter-by-quarter plan (combination 2; combination 3's telehealth piece is marked)

| Quarter | Do | Gate and leading indicators | Hiring trigger | Kill criteria |
|---|---|---|---|---|
| **Q4 2026** | Close open quotes and record every no. Price Credentialing Care ($69/$119; Sid decides). Write the guarantee terms (§7) and a national landing page: flat prices, public process, network check. NPI watch. Data-access policy; E&O/cyber. CRM: clients without a PLLC and multi-clinician engagements (`CredentialingEngagement.pllcId` is required today [M]). Pre-approved message templates so Sid isn't the bottleneck | ≥ 5 quotes resolved | — | — |
| **Q1 2027** | **Mail test:** ~1,700 new practices in NY, NJ, FL, TX, MD, 2–3 touches (~$5K). **Search test:** ~$9K national exact-match. Maintenance offered to VM/RA clinician clients. 2 group pilots. Founding-client discount | **Mar 31:** CAC ≤ $1,200 in at least one paid channel, with ≥ 5 paid from it; quote → paid ≥ 30%; maintenance attach ≥ 45% | Ops coordinator hired (formation) | Both channels > $1,600 CAC → stay NY-focused (reference case, ~10% for $350K) and stop paid national acquisition |
| **Q2 2027** | Mail to the top 15 states (~1,000 a month). Search to ~$10K a month if it passed. Start the public panel lookup. Medicaid files for NJ | 10+ setups a month by June; days to submission ≤ 5 | **US coordinator #1** when revenue > $10K/month for 2 months or ≥ 40 open applications | — |
| **Q3 2027** | National mail (~2,230 a month). Standalone maintenance mail to existing practices (~3,000 a month, $1.25 each) | **Sep 30:** ≥ 12 setups a month; ≥ 80 subscribers; churn ≤ 3%/month; ≥ 3 groups / 20 clinicians | Offshore #1 above $15K/month revenue | Standalone maintenance < 0.08% per piece → stop that mail. No group by Sep 30 → drop groups |
| **Q4 2027** | Referrals; prescriber and state guides; directory-audit feature | **Dec 31:** net run-rate ≥ $150K; ≥ 120 subscribers | — | Net run-rate < $100K → $350K by Dec 2028 is under 10%; plan for 2030 |
| **Q1 2028** | Search to $20K a month if marginal CAC ≤ $1,400. Medicaid add-ons in CT and PA. *(Combination 3: telehealth-company offer if ≥ 30 retainer clinicians and ≥ 15 effective dates)* | ≥ 16 setups a month; ≥ 180 subscribers | **US coordinator #2** above ~$45K/month revenue | — |
| **Q2 2028** | Price review (maintenance up for prescribers if churn is low) | ≥ 220 subscribers; refunds ≤ 5% | — | *(Telehealth: no signed account of ≥ 15 clinicians by Jun 30 → stop)* |
| **Q3–Q4 2028** | Compounding | **On track for $350K:** ≥ 18 setups a month, ≥ 280 subscribers, ≥ 8 groups by December | US coordinator #3 above ~$80K/month | — |

**Monthly indicators:**
- CAC by channel (mail, search).
- Quote → paid.
- Setups a month.
- Blended ticket (target ≥ $1,900).
- Maintenance attach (≥ 45%) and churn (≤ 3%).
- Net new subscribers.
- Days to submission (≤ 5).
- Client minutes per job (≤ 45).
- Refunds (≤ 5% of revenue).
- Groups in conversation.
- Sid's hours (week ≤ 38).

---

## 11. Where I still disagree with Sid, and why

1. **Standalone maintenance for already-credentialed clinicians will be modest.** In the CAQH pilot, "I already have CAQH" was the top reason for passing (8 replies) [M], and CAQH re-attestation is free. I model standalone conversion at 0.15% per piece. Most of the book will come from setups (attach) and our own VM/RA clinicians. Maintenance is core because of attach, not because DIY clinicians will flock to it.
2. **VM churn is an optimistic analog.** VM is a legal address with switching costs; maintenance is skippable. I use 1.8–3.5%/month against VM's observed ~1.6%. By 2028 this matters little; by 2030 it matters a lot.
3. **"Undercut on price" isn't an edge.** Offshore shops are already at $79–150 a payer [S]. The agent cost edge should fund guarantees and fair maintenance prices.
4. **Paid search is expensive, not cheap.** Credentialing CPCs are $18–68 against formation's $9.51 [S/M]. Expect $600–2,400 per paid client, not formation's ~$100.
5. **References:** agreed for individuals, with terms as the substitute. Credentialing outcomes depend on payers, so the network-check-before-invoice rule is the trust device, not a formality.
6. **Telehealth companies** remain the weakest lever. Funded competitors already have references and SOC 2 reports.

---

## 12. Self-critique and early warnings

**Strongest case against v2:**
- Every national number rests on analog conversion rates with zero measurements. 1 paid client [M].
- A new national vendor at ~20 setups a month within two years has no base rate we could find.
- The model's tails are wide: p10 ~$40K, p90 ~$1.2M.
- Execution across many states (Blue plans, Medicaid, address rules) will surface case-level surprises. Danielle's case had about 10 open questions in 9 days [M].
- Sid's approval loop and the human-only steps scale with volume.

**What has to go right:**
1. At least one paid channel at ≤ $1,200 CAC by Mar 31 2027.
2. Maintenance attach ≥ 45% at $69/$119.
3. Days to submission ≤ 5 at volume.
4. Refunds ≤ 5%.
5. Hires on time.
6. No data incident.

**Early warnings:**
- Q1 test CAC > $1,600 in both channels.
- Quote → paid < 20%.
- Attach < 30%.
- Churn > 4%/month.
- Refunds > 8%.
- Reviews mentioning slowness.
- Sid's week > 38 h.

**Knock-on traces [E]:**
- **Ticket $1,600, not $1,950:** about −$80K net at 20 setups a month.
- **Maintenance at $39/month:** about −$90K. P(≥$350K) −11 points.
- **Groups fail:** about −$60–100K.
- **The capacity cap binds more often (30% of runs):** P(≥$350K) about −5 points.

---

## 13. Sources and assumptions

### 13.1 Measured

- **CRM (read-only, Nov 14 2026):**
  - 1 paid engagement ($2,210, Green Sparrow; applications promised Nov 26; effective dates from Mar 5 2027) [`credentialing-status.ts --all`].
  - VM churn: 129 customers, 9 cancellations, 17.9% annualized [`query-virtual-mail-churn.ts`].
  - Formation and checkbox figures from the [upside study](credentialing-upside-paths-2027-2028.md) §7.1.
- **Formation Ads:** [Google Ads shard](../memory-bank/features/google-ads.md) · [operating plan](../nypllc-google-ads-operating-plan.md) · [2028 path plan](../nypllc-2028-path-to-1m-plan.md) · [P2-11 model](p2-11-model-2026-11-11/README.md).
- **NPPES:** 51-jurisdiction pull (§2.1). Scripts: [states.py](file:///private/tmp/claude-501/-Users-sidb-dev-pllc-business/8a087395-ccff-4c7f-ae1f-21e6eb28b61d/scratchpad/npi2/states.py), [rest.py](file:///private/tmp/claude-501/-Users-sidb-dev-pllc-business/8a087395-ccff-4c7f-ae1f-21e6eb28b61d/scratchpad/npi2/rest.py), [national.py](file:///private/tmp/claude-501/-Users-sidb-dev-pllc-business/8a087395-ccff-4c7f-ae1f-21e6eb28b61d/scratchpad/npi2/national.py) (scratchpad, not committed).
- **Primary pages:**
  - State: [NJ DMAHS deck](https://nj.gov/humanservices/dmhas/documents/pdf/events-meetings/2026/NJ-FamilyCare-Behavioral-Health-Integration-Updates-SM.pdf) · [NJ P.L.2026 c.6](https://www.nj.gov/governor/news/2026/approved/20260330b.shtml) · [PA DHS BH-MCOs](https://www.pa.gov/agencies/dhs/resources/medicaid/bhc/bhc-mcos) · [Counseling Compact](https://counselingcompact.gov/news/).
  - Businesses and reviews: [Synergy BB sold listing](https://synergybb.com/listings/high-margin-credentialing-and-compliance-services-firm-with-built-in-saas-upside/) · [GetPaneled on Trustpilot](https://www.trustpilot.com/review/getpaneled.com) · [Medwave on Trustpilot](https://www.trustpilot.com/review/medwave.io).
  - Our own: [CAQH pilot outcomes](../../PLLC-CRM/crm/docs/caqh-pilot-outcomes-oct-2026.md) · [VM shard](../../PLLC-CRM/memory-bank/features/virtual-mail.md) · [financial projections shard](../../PLLC-CRM/memory-bank/features/financial-projections.md).

### 13.2 Secondary

- **Keyword volumes and CPCs:** seodata.dev pages ([credentialing services](https://www.seodata.dev/keyword/credentialing-services), [provider credentialing](https://www.seodata.dev/keyword/provider-credentialing), [medical credentialing](https://www.seodata.dev/keyword/medical-credentialing), [insurance credentialing for therapists](https://www.seodata.dev/keyword/insurance-credentialing-for-therapists), [caqh](https://www.seodata.dev/keyword/caqh)). They say "from the Google Ads API"; not checked in Keyword Planner [S].
- **Maintenance and setup pricing:** [Compare Practice Tools](https://comparepracticetools.com/credentialing/pricing-cost-guide) · [MGMA 2021](https://www.mgma.com/articles/navigating-the-credentialing-gauntlet-key-actions-for-revenue-cycle-management) · [Medwave](https://medwave.io/2026/03/how-much-does-medical-credentialing-cost/) · [Carepatron](https://www.carepatron.com/blog/medical-credentialing-services) · [Crown Counseling](https://crowncounseling.com/reviews/best-credentialing-services-for-therapists).
- **Direct mail:** ANA response-rate figures via [Demand Metric](https://www.demandmetric.com/content/the-state-of-response-rates-benchmark-report) and others (primary members-only).
- **Market:**
  - [Medical Economics](https://www.medicaleconomics.com/view/nps-are-registering-new-practices-at-nearly-6-times-the-2019-rate) · [NBCC](https://www.nbcc.org/governmentaffairs/grassroots/newsroom/Behavioral-Health-Expansion) · [Headway groups](https://headway.co/for-providers/group-practices) · [ClearHealthCosts](https://clearhealthcosts.com/blog/2025/11/therapists-have-misgivings-on-the-platforms-alma-headway-etc-and-the-business-of-therapy/).
  - Compacts: [Triad compacts](https://b2b.triadhq.com/blog/behavioral-health-licensure-compacts-2026) · [PSYPACT guide](https://www.psychology.org/resources/psypact-states).
  - Wages: [Payscale](https://www.payscale.com/research/US/Job=Credentialing_Specialist/Salary/a276da63/New-York-NY).
- **Not verified [U]:** Reddit buyer threads (blocked); group counts (CMS file blocked); telehealth-company counts; Medicaid structures outside NJ, PA and CT, which come from general knowledge.

### 13.3 Model inputs (all [A]/[E])

Script: [sim8/sim3.py](file:///private/tmp/claude-501/-Users-sidb-dev-pllc-business/8a087395-ccff-4c7f-ae1f-21e6eb28b61d/scratchpad/sim8/sim3.py) (scratchpad). "Median, p90" are lognormal.

| Input | Value |
|---|---|
| Shared demand factor | lognormal σ 0.40 (multiplies conversions, divides CAC) |
| Mail | paid setups per practice mailed: median 0.30%, p90 0.81%; $2.00–4.50 per practice; 175/month (Q1 2027) → 1,000 (Q2) → 2,230 (Q3 on), held at 175 if the test is under 0.15% |
| Search | CAC median $1,100, p90 $2,420; $3K/month test; then $10K (2027) / $20K (2028) if CAC ≤ $1,200, $2K if ≤ $1,600, else $0; CAC × (budget/$5K)^0.35 |
| Funnel | 1.5 → 3 setups/month |
| SEO | median 3 setups/month by Dec 2028 (quadratic ramp) |
| Referrals | 2% of cumulative clients a year |
| Trust haircut | 0.8 (H1 2027), 0.9 (H2 2027), 1.0 (2028) |
| Ticket | $1,700–2,200 |
| Maintenance | attach 45–70%; $65–95/month blended; churn 1.8–3.5%/month |
| Standalone maintenance (from Q3 2027) | 3,000 existing practices mailed a month at $1.25, 0.15% (p90 0.4%), + 1.5 a month from VM/RA clients |
| Groups | works 50%; median 12 (p90 30) by Dec 2028, ramp from Q2 2027; 7 clinicians (p90 13); $90–120; setup $1,500 + $350/clinician (15% founding discount in 2027); roster adds 25%/yr at $595; $2,000 CAC per group |
| Telehealth companies (combination 3) | works 25%; median 3 accounts × 20 clinicians at $120–180 from 2028; $5,000 CAC; $25K/yr security |
| Capacity/quality cap | 15% of runs cap setups at 12/month |
| Staff | $7K ops share; US #1 $62K above $10K/month revenue, #2 $58K above $45K, #3 $58K above $80K; offshore $14K above $15K plus one per extra $25K |
| Other | card 3% + tools/AI 2% + refunds 5% + $1K/month |
