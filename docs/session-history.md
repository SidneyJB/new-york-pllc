# Session history (new-york-pllc)

Changelog extracted from legacy memory-bank dumps (Mar 2026 and earlier) plus remote June 2026 work folded in during router sharding. Prefer feature shards for current work; append here for session-level detail.

## 2026-08-12 — Affiliate partner picks: Mercury + Gusto Impact

Research (not applied, links not live). **Banking: Mercury** incorporator/affiliate; Relay is the stronger practice *product* but Partner exclusivity likely blocks a dual paid partnership; neither is IOLTA. **Payroll: Gusto via Impact** (~$200+ on first paid payroll, 120-day cookie); Gusto Pro is CPA-only; ADP PartnerStack’s 3-payrolls-in-45-days bar is a poor fit for owner-only S Corps.

Saved: [`docs/affiliate-partners.md`](affiliate-partners.md). Linked from [features/revenue-levers.md](../memory-bank/features/revenue-levers.md), [expansion-next-steps.md](../memory-bank/expansion-next-steps.md), [activeContext.md](../memory-bank/activeContext.md), [router.md](../memory-bank/router.md), and the revenue levers plan.

## 2026-08-04 — INCIDENT: stop-word negatives; root cause of the conversion collapse

Investigated why Google Ads conversions fell hard while CRM order volume stayed flat (47 in June, 47 in July — demand was never the problem).

- **Diagnosis.** Eligible auction volume (`impressions ÷ search impression share`) on `Sales-Search-1` collapsed from **12,030/week** (May 4) to **576/week** (Aug 3) while the budget sat untouched at **$500/day** and budget-lost IS stayed at **0%**. Impression share *rose* 10% → 21% — we were winning more of a pool we had shrunk ourselves. Bid strategy was `TARGET_CPA` throughout; nothing about bidding changed.
- **Cause.** Negative lists **A** (`12146898907`) and **A-FQ** (`12146898703`) were built per operating plan §1.3 as "every state name + abbreviation, phrase match." Two-letter state abbreviations are ordinary English words, and a one-word phrase negative blocks any query containing that word. `in` (Indiana) blocked **every query containing "in"**; also `or` (Oregon), `me` (Maine), plus `ok` `la` `ca` `pa` `co` `de` `hi` `id` `ma` `mo` `ne` `va` `wa` and more.
- **Blast radius.** Self-blocked enabled keywords: **14 of 44** on `01_Core_Exact_NY` (explains its 0 conversions in a month at ~50% IS), **21 of 33** on `03_ForeignQual_US`, **9 of 40** on `Sales-Search-1`, 1 of 34 on `02`. Casualties included `[form a pllc in new york]`, `[start a pllc in ny]`, `[cost to form a pllc in new york]`, `[pllc in ny]`, `[pllc formation service near me]`.
- **Fix.** Removed 50 abbreviations from List A (103 → 53) and 44 from A-FQ (89 → 45); full state names retained, so wrong-state fencing is intact. Reverted `Sales-Search-1` geo `PRESENCE` → `PRESENCE_OR_INTEREST` (the other Jul 8 change, which compounded it — out-of-state professionals forming NY PLLCs are real demand). Verified per-campaign against actual attachments + campaign-level negatives: **0 self-blocked keywords across all four campaigns**.
- **Docs.** Plan §1.3 spec corrected with an explicit prohibition on two-letter abbreviations; §7.1 weekly SOP gained a self-block check and eligible-auction-volume tracking, plus a note that budget-lost IS is near-useless under Target CPA.
- **Code.** `google_ads/client.py` — `run_query` returned a stream while dropping its service reference, so the gRPC channel was collected mid-iteration (`CANCELLED "Channel deallocated!"`) and aborted a mutation halfway. Now a generator that keeps the service alive; CLI smoke-tested.
- **Still open.** Eligible volume *also* fell ~12,030 → ~4,000/week during **June**, before either Jul 8 change and before the Jun 28 negative experiment. The API retains only 30 days of change history, so this needs the UI change log. Also undecided: whether `01` / `02` should follow Sales to `PRESENCE_OR_INTEREST`.

## 2026-08-04 — SEO target list saved + committed to in the plan

The cannibalization join produced a ranked SEO target list as a by-product. Saved it as a durable artifact and wired it into the SEO plan rather than leaving it in a session-scoped CSV.

- **Saved:** [`seo-target-list-2026-08-04.md`](../seo-target-list-2026-08-04.md) + `.csv`, regenerable via `seo_target_list.py` (joins the GSC Queries export with the paid-term data; prioritises by organic impressions × current paid cost × winnability, so the queue can be refreshed rather than rebuilt).
- **Plan gained Part 1.5 — "The commercial target set."** Records the measurement (median organic position **32** on the terms carrying **76% of paid spend**), and closes a hole that had been open since v1: Part 7 and Gate S1 both referenced "20 tracked terms" that were **never actually chosen**. They are now these terms, with an Aug 4 baseline of median position 32 / 63 organic clicks per month / 1.53% CTR.
- **Sequencing gap surfaced, not silently fixed.** Part 1 calls money pages "mostly exists — optimize don't create," but Part 2's editorial map then queues the money-page work at **items 11–15 of 19**, behind ten new informational pieces — while those same money pages carry 76% of paid spend. Part 1.5 states both sides honestly (the authority pillar is genuinely what makes commercial ranking possible; optimising a page with no domain authority behind it moves 32 → 28 and nothing happens) and **recommends running the money-page pass in parallel** rather than reordering, since it's different work that doesn't compete for drafting hours. Left as an explicit decision for the owner.
- **Three corrections to the generated list before accepting it.** (1) `registered business address service` and `professional business address & virtual mail service` were classed as content gaps — `/virtual-address-services` already exists; the URL-matching pattern only caught "virtual address"/"mail forwarding" and missed "business address"/"virtual mail". (2) All 15 LLC-publication queries were flagged as gaps and proposed as **negative-keyword candidates on the grounds that we don't offer LLC publication — we do**: `/order-llc` sells LLC formation with the six-week publication and Certificate of Publication included. They now route there, framed as "publication included," which also keeps Part 1's standing no-publishing-only-offer directive intact. (3) `foreign qualification service` and `certificate of authority new york state` fell through to gaps because the foreign matcher required an explicit state token and didn't know "certificate of authority". Fixes cut the gap list **30 → 14**.
- **Owner correction: plain LLC is out of scope entirely.** I had flagged `/order-llc` as "the structural find" — 74 commercial queries pointing at a naked Spiffy checkout with no rankable content. Wrong framing. **`/order-llc` is deliberately never ranked: plain LLC belongs to the sister company CheapNewYorkLLC, and we don't compete with it.** It exists only to take orders from people who already arrived wanting an LLC. Those 74 queries (1,720 impr, $331/yr) now sit in a standing **"Out of scope"** section of the target list, excluded from every headline number, and `seo_target_list.py` enforces the exclusion so a future refresh can't re-derive them as an opportunity. Same for the 15 LLC-publication queries.
- **Root cause of that mistake, and the fix.** `memory-bank/projectbrief.md` — the always-read scope document — described CheapNewYorkLLC only as a **"Reference Site … replicate for PLLC market."** Read cold, that says *copy this*, not *stay out of its market*. Added a **§ Scope boundary — plain LLC is out of scope** to projectbrief with the rule stated plainly, plus a router entry, ending with the line that matters: *if an analysis surfaces plain-LLC terms as an opportunity, the analysis is wrong about scope, not right about strategy.*
- **The real shape of the work: essentially one page.** After both corrections, 259 actionable queries / 10,878 impr / $9,109yr collapse onto `/` (113 queries, 5,997 impr, **$7,984/yr — 88% of all paid value**), `/how-to-form-a-pllc-in-ny` (27q), `/virtual-address-services` (30q), `/foreign-pllc` (24q), profession pages (45q), plus 14 genuine gaps led by `ny pllc checklist`. The homepage's 113 queries are near-identical intent variants — one ranking problem wearing many costumes. This strengthened the parallel-track recommendation further: money-page work is **one page plus a title/meta sweep**, not a content programme competing with the ★ pieces.
- **New open question for the ads side.** We pay ~$331/yr for plain-LLC clicks. Might be intentional (capture the searcher, sell the LLC product), but **if CheapNewYorkLLC bids the same terms we are bidding against ourselves and inflating both CPCs.** Needs a look at the sister account before deciding whether these become negative keywords.
- **Reconciled two spend figures that look contradictory.** $6,032 = window cost of queries where we rank but rank badly (position 11+, 76% of the $7,897 total) — the cannibalisation-exposure number. $9,440/yr = annualised full commercial target set, which also includes queries we pay for with no organic presence at all. Both correct, different denominators; noted inline so the next reader doesn't treat one as an error.
- **Guardrail written into the plan and the memory bank.** The annualised paid costs in the list are *not* savings. Position 26–45 → top 3 on commercial formation terms is a **6–18 month** effort against LegalZoom and Northwest and may never fully land on the head terms. The list is a prioritisation input, **not a paid-search exit plan**; paid stays until organic actually holds page 1.

## 2026-08-04 — Incrementality read + measurement tooling

Follow-on question: with the bug fixed, should we expect a large uplift in purchases? The evidence says **no — expect attributed conversions to jump and total purchases to rise modestly.**

- **The core observation.** Apr: 320 clicks → 49 orders. Jul: 169 clicks → 47 orders. Clicks **−47%**, orders **−4%**. Across nine months, monthly clicks vs orders correlate at **r = 0.06** (weak evidence alone — n=9 with a time trend — but same direction), and orders per 100 paid clicks climbed from **8.1** (Nov) to **27.8** (Jul).
- **Attribution.** Of 42 orders since click-ID capture went live Jul 9: **31% Google click ID · 12% other UTM (all five `chatgpt.com`) · 57% untagged.** Untagged is a residual, not organic — it also holds direct, word of mouth, referrals, and click IDs lost to cross-device or cookie expiry.
- **Data correction within the session.** First pass queried CRM orders on `createdAt` with no filtering, giving Apr 48 / May 65. Correct field is `orderCreatedAt` (Spiffy checkout timestamp), excluding `isVmOnly` and `[TEST]` records → **Apr 49 / May 57**. Finding unchanged, slightly strengthened. Also found a Prisma trap worth remembering: `NOT: [{ referral: { startsWith: 'TEST' } }]` silently excludes every NULL-referral row (~94% of orders).
- **Correction to an earlier claim in this session.** I asserted brand search was cannibalising ~50% of ad conversions. Wrong. The brand bucket is a single query, `nypllc` — **$529 of ~$21,000 lifetime spend (2.5%)** — with conversions flat at 3–4/month (May 3.0 · Jun 4.0 · Jul 3.0). Its share rose to 50% only because generic conversions collapsed from 12.0 to 3.0 during the incident. CVR 18.2% vs 12–15% generic is not the signature of pre-decided traffic. The recommendation to split brand into its own campaign was withdrawn.
- **Cannibalization MEASURED later the same day — it is essentially zero.** Owner exported Search Console queries (last 12 months, 954 queries); joined against paid search terms over the identical window. **Non-brand cannibalization is $30 of $7,897 — 0.38%.** The only meaningful overlap is the brand term `nypllc` ($504, 6.4%). We rank **position 20–45 for every commercial term** (`pllc formation new york` 26.5 · `ny pllc formation` 28.9 · `pllc new york` 35.9 · `pllc ny` 44.8), and **76% of paid spend ($6,032) goes to queries sitting at median organic position 32**. Organic delivers ~63 clicks/month against ~275 from paid, with 4,123 organic impressions/month converting at just 1.53% CTR because page 3–4 doesn't get clicked. The "ads will cannibalize our organic" hypothesis is dead — there is no organic on commercial terms to cannibalize.
- **Two consequences.** Paid is doing genuinely additive work on commercial queries, which revises the uplift estimate *up* to **+6 to +14 orders/month** (wide, because April's clicks were 80% low-intent broad `pllc` while the Aug 4 fix unblocked exact-match commercial keywords — restoring volume ≠ restoring economics). And the overlap table doubles as a **ranked SEO target list**, ordered by what we currently pay Google for traffic we could hold for free.
- Artifacts: `gsc/Queries_2025-10-27_to_2026-08-02.csv`, `cannibalization-2026-08-04.csv`.
- **Caveat that cuts the other way.** Formation purchases lag; July's orders were partly driven by May/June clicks, so the incident's damage may not have fully landed. Aug/Sep could still drop, which would mean more upside from the fix than estimated.
- **Built:** [`ads_incrementality.py`](../ads_incrementality.py) with `cannibalization` (joins a manual Search Console Queries export against paid search terms, bucketing spend by organic rank) and `recovery` (weekly eligible auction volume vs CRM attribution split). CRM side: `PLLC-CRM/crm/scripts/orders-attribution.ts`. Plan gained **§0.6 Incrementality** stating the assumption the projection model rests on, plus the decision rule: if Google-attributed orders rise while untagged falls, we're re-attributing rather than growing.

## 2026-08-04 — Weekly SOP §7.1 + enable `02`

- Pull + writeup: `ads-pull-2026-08-04-weekly-sop/` · dashboard row: `ads-weekly-dashboard.csv`
- 7d: $272 / 3 conv / CPA **$91**; 30d: $1,299 / 11 conv / CPA **$118**; budget-lost **0%**; `01` IS ~50% / 0 conv
- Ads Spiffy Purchase **10** vs CRM click-ID **13** (+30% — outside ±10%; offline upload still deferred)
- Actions: `[pllc new york formation]` exact → `01`/Formation-Core; `02_Professions_NY` ENABLED; Gate 1 hold; Auction Insights manual still open

## 2026-07-28 — Google Ads first formal weekly SOP (§7.1)

- Due Jul 27; ran Jul 28. Pull + writeup: `ads-pull-2026-07-28-weekly-sop/` · dashboard row: `ads-weekly-dashboard.csv`
- 30d: $1,540 / 16 conv / CPA **$96**; budget-lost IS **0%**; `01` IS ~53% / 0 conv; Ads Spiffy Purchase **9** = CRM click-ID **9**
- Actions: `[nys pllc formation]` exact → `01`/Formation-Core; List C +`pllc name availability` +`check llc availability`; `02` confirmed ready for Aug 3 enable

## 2026-07-22 — Daily Ads check + List C junk

- Pulled `ads-pull-2026-07-22/` — budget-lost 0%; 30d ~22 conv / $76 CPA; spend ~$45/day (behind Jul $90–110 trajectory; rank-lost constrained); `01` $107 / 0 purchases, IS ~47%
- Shared List C `12146898706` +7 phrases: `llc availability`, `llc name availability`, `check llc`, `blumberg`, `usa corp`, `corporate book`, `corporate seal` (Sales broad `check llc availability` ~$23)

## 2026-07-12 — Mobile LP §5.1 UX (sticky CTA / trust / hero)

- Sticky bottom CTA (mobile-only): “Start your PLLC — $885” + Call; hidden on `/order` + `/order-llc`; body `--mobile-sticky-cta-h`; Tawk mobile `yOffset: 72`
- Home hero: mobile trust band (5.0 on Google · Thousands formed · $885 flat); trust + CTA above Includes via flex order; removed broken “How it works” `#how-it-works` button; primary CTA full-width / taller on mobile
- §5.1 still open: first-step friction cut (name/email/profession → Spiffy); Ads call-asset forwarding number if different from site phone; remove mobile −20% after CVR gate (§3.6)

## 2026-07-12 — Mobile LP speed budget (Ads §5.1 LCP)

- Lab baseline (mobile Slow 4G): `/` LCP ~10.6s, `/order` ~11.3s, how-to ~10.9s — ~94% render delay from third-party JS (Tawk / dual gtag / Meta / global Spiffy)
- Shipped: Tawk on first gesture; Meta + Bing `lazyOnload`; Spiffy script only on `/order` + `/order-llc`; idle-defer scroll/referral/click capture; drop unused JetBrains + Playfair `next/font`
- Shipped: merge Ads+GA4 into one gtag load (`lazyOnload`); `waitForGtag` before Purchase / Begin checkout / GA4 purchase
- Post-deploy lab (Slow 4G): `/` **2.4s**, `/order` **2.2s**, how-to **2.2s** (how-to 6.3s run was noise; re-run confirmed)
- Commits: `347a4d4` (defer third parties) · `94ab32e` (merge/lazy gtag) · docs `d6560d8`

## 2026-07-11 — Google Ads search-term mining

- Pulled 14d stats → `ads-pull-2026-07-11/` (~22 conv / $1.7k / 30d; `01` still 8 impr / $0)
- Added `[form pllc new york]` exact → `01_Core_Exact_NY` / Formation-Core (Sales broad converter)
- Added `"windsor corporate services"` phrase → shared List C `12146898706`
- Deferred exact-neg of that term on `Sales-Search-1` until `01` delivery is proven
- Noted: Formation-Core RSAs `APPROVED_LIMITED`; Sales profession ads still in review
- Fixed conversion goals: `BEGIN_CHECKOUT`/`WEBSITE` → `biddable=False` (plan observation-only; cleared “missing primary” warning cause). Purchase primary unchanged.

## 2026-07-09 — Google Ads Phase 1–2 draft campaigns (PAUSED)

- Built upload package `google-ads-campaign-build/` from operating plan §2.1–2.3 (`manifest.json`, CSVs)
- API upload scripts: `google_ads/upload_campaigns.py` (resume + policy-exemption; geo from manifest) · `upload_rsas.py`
- Policy check: `google_ads/check_keyword_policy.py` → `policy-check.json`
- **Live (PAUSED):** `01_Core_Exact_NY` (4 AGs, 41 kws, 8 RSAs) · `02_Professions_NY` (11 AGs, 34 kws, 22 RSAs; 6 health exemptions) · `03_ForeignQual_US` (6 AGs, 33 kws, 12 RSAs; US Presence; A-FQ + B–E; $15/day)
- Portfolio **`NYPLLC Search Portfolio`** ($90) created; attached to **`Sales-Search-1` only**
- RSA note: `→` rejected as SYMBOLS PROHIBITED — Foreign Qual copy uses `-`
- API verify Jul 9: `03` PAUSED, US geo, A-FQ+B–E, 6 AGs / 33 kws / 12 RSAs, manifest parity OK
- Site: Trustpilot/cheapnewyorkllc review links → NYPLLC Google Business Profile (`BUSINESS_INFO.googleBusinessProfileUrl`); schema AggregateRating = **5.0 / 6 reviews** (owner-confirmed live GBP Jul 9)
- RSA refresh: **`Rated 5 Stars on Google`** on `01_Core_Exact_NY` (8 RSAs; swapped for `Built for NY Professionals`) + `02_Professions_NY` (22 RSAs; added as 13th headline). `upload_rsas.py` gained `--replace` / `--campaigns`. Not on `03_ForeignQual_US`.
- Conversion flip + `01` enable + portfolio attach done evening Jul 9
- Launch hygiene: mobile −20% (Sales/01/02/03); 3 sitelinks → www; observation audiences + 24 assets on `01`
- Gap fixes: Observation on 01/02/03; audiences+assets on 02/03; Sales RSA www; `Start Your Order — $885`; Begin checkout + phone ≥60s secondaries (+ site tag)
- Still waiting: enable `02` ~Aug 3; `03` after Gate 1; Customer Match UI; Auction Insights export

## 2026-07-08 — Google Ads Phase 0 (conversion + hygiene)

- Operating plan v2 linked from memory bank (`nypllc-google-ads-operating-plan.md`)
- Spiffy thank-you verified: `order=` + `total=` (full contract cents, incl. payment plans)
- Site: confirmation reads `total`/`order`; fires tagged Ads conversion (`web/src/lib/analytics/google-ads.ts`); purchase metadata allowlisted (no SSN/DOB/PII dump)
- Ads API: secondary Purchase action `7678072764` (`AW-17672972971/w4sBCLyvmM0cEKvVkOtB`); page-load remains primary until flip
- §1.2 settings (Presence, Partners/Display off, observation audiences, auto-apply PAUSED); §1.3 shared negatives A–E (+ A-FQ); §1.4 asset refresh (sitemap-true sitelinks, Services snippet, Formation/VA/Foreign price); §1.5 baselines in `baseline-2026-07-08/`
- CRM: Google `AdSpend` lifetime → $20,068.24 (`backfill-google-adspend.ts`); Customer Match CSV ready (API upload blocked)

## 2026-06 — Foreign-into-NY + partners

- Foreign state landings: NJ, PA, FL, TX, CT under `/foreign-pllc/{state}` with shared module + hero selector
- Foreign UX: customer-only checklist; VA/RA cross-sell; no duplicate document cards
- B2B `/partners` landing + intake form + email helpers
- Partner referral attribution / Spiffy coupon apply on checkout ready
- Footer and order-link fixes for Spiffy embed + referral params

## 2026-03 — Profession pages + GA4 purchase

- Five profession pages: CPA, Veterinarian, Optometrist, Pharmacist, Podiatrist (NYSED-backed content, SEO, nav)
- GA4 `purchase` on order confirmation for source attribution; not imported to Google Ads
- Profession content boundary: formation only — no board coordination / firm registration claims

## 2026-02 / 2026-03 — Virtual address + DIY + domain

- `/virtual-address-services`, `/mail-forwarding-agreement`
- DIY guide `/how-to-form-a-pllc-in-ny`
- Canonical domain `www.nypllc.com` via `vercel.json` + hardcoded `siteUrl`
- Navbar logo reverted to NY circular icon

## Earlier — Analytics & checkout

- Vercel Analytics lean funnel; Spiffy engagement via JS API
- Bing Ads UET (`187221859`); scroll depth 25/50/75/100 on all pages
- ~101 Vitest tracking tests
- Spiffy checkout live; Zapier customer/admin emails

## Foundation

- Next.js App Router, Tailwind v4, shadcn/ui, Vercel deploy
- PROJ-016 SEO; PROJ-018 legal/content
- Profession pages wave 1: Dentist, SLP, Physician, Massage Therapist, Chiropractor (+ earlier set → 19 total)
