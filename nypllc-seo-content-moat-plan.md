# NYPLLC SEO / Content Moat — Operating Plan v1

**Prepared:** July 6, 2026 · **Revised:** July 22, 2026
**Companion documents:** [Ads Plan v2](nypllc-google-ads-operating-plan.md) · CAQH Plan v1 · B2B Plan v1 · [Revenue Levers v1](nypllc-revenue-levers-plan.md) · financial base case
**Standing constraints:** publication content is educational-only, CTAs to full formation — no publishing-only offer, page, or CTA anywhere (standing directive). Edits to profession pages coordinate with the ads change log (they're live ad landing pages). No outbound calls (podcast/PR outreach is email).
**Base-case promise this plan must beat:** organic/referral holding ~34% channel share passively. Attack target: organic as an independently growing engine — 0.3 orders/day by mid-2027, 200–350 orders in 2028.
**Build posture:** AI-drafted + founder-edited; ship fast. Do not gate on legacy hour/day estimates — velocity is the default.

### Progress (as of Aug 4, 2026)

> **Aug 4 2026 — commercial target set measured and saved.** Search Console joined against paid search terms: we rank **position 20–45 on every commercial term** while **76% of paid spend ($6,032) goes to those same queries at median position 32**. This defines the "20 tracked terms" Part 7 and Gate S1 had left unspecified, and raises a sequencing question about money pages sitting at #11–15 in the editorial map. See **Part 1.5** and [`seo-target-list-2026-08-04.md`](seo-target-list-2026-08-04.md).

### Earlier progress (as of Jul 22, 2026)

| Item | Status | Notes |
|---|---|---|
| Title/meta pass (~25 money/foreign pages) | **Shipped** | Profession + foreign titles/descriptions; `metadata.ts` + layout title.template double-suffix fix; logged in ads change log. |
| ★ #1 NYSED Approval Time Tracker (`/nysed-approval-times`) | **Shipped** | Manual CRM refresh via `PLLC-CRM/crm/scripts/report-nysed-approval-times.ts` → `web/src/lib/nysed-approval-times/data.ts`. Overall typical wait ~56 days (2026). Dataset + Breadcrumb schema; sitemap/footer/DIY/FAQ/cost links. No public formation counts. Monthly static regen (not live API). |
| #3 NY PLLC Cost: Complete 2026 Breakdown (`/ny-pllc-cost`) | **Shipped** | Fee table (DOS Articles/Cert Pub **with 24-hour expedite**, certified copy **included**, DBA **$199**); Rockland cost story; competitor framing (national packages → thousands; we ~$200 cheaper). Article + FAQ + Breadcrumb schema; sitemap/footer/DIY/FAQ/NYSED links. |
| ★ #2 How Long Does It Take to Form a PLLC in NY? (`/how-long-to-form-a-pllc-in-ny`) | **Shipped** | Pulls live NYSED days from tracker data; stage table; end-to-end ~3.5–5 months; Article + FAQ schema; footer/sitemap/DIY/FAQ/cost/tracker links. |
| Open items closed this ship | — | Tracker refresh = monthly static (item 3). Site pages ship via Next app router (item 2 confirmed in practice). |

---

## Part 0 — Thesis and position

**Why this is the co-lead engine, not a side project.** The QS export settled the strategic question: demand exists (990 eligible impressions/day), the auction is winnable, and the pool is finite. The ads plan captures the paid share of that pool; SEO captures the *same finite demand with no auction, no CPC inflation, and no ceiling reset every time Google raises prices.* Every ranking earned is a permanent bid of $0. And it is the primary hedge against the one wildcard in the 2030 model — search-channel disruption: if discovery shifts toward AI assistants by 2028–2030, the sources those systems cite are exactly what this plan builds — the structured, factual, data-rich authority on one narrow topic.

**The moat nobody can copy: your pipeline data.** You possess the only live dataset of actual NYSED OP approval durations, real formation economics (including Rockland-only publication — how the flat package stays cheap for every county), and ranked deficiency reasons — 338 formations of ground truth, growing daily. LegalZoom cannot publish "real NYSED processing times, updated monthly from live filings." A law-firm blog cannot cite anonymized OP deficiency patterns from hundreds of live filings. **Original data is the entire strategy**: it earns rankings (uniqueness), links (citability), and AI-answer inclusion (quotable specificity) simultaneously. Every piece shipped under this plan must contain at least one thing only you can say — a number from the CRM, a real deficiency example, an exact fee, a screenshot of a real (anonymized) approval.

**Starting assets:** exact-match domain, 15+ profession pages, /how-to-form-a-pllc-in-ny, five foreign-state pages, Trustpilot integration, and a competitor set (national filers) whose NY content is demonstrably thin.

---

## Part 1 — The five content pillars

1. **Money pages (bottom-funnel, mostly exists — optimize don't create):** homepage, profession pages, foreign-qual pages, service/shelf pages. These double as ads landing pages, so improvements pay twice (organic rankings + LP-experience QS). Coordination rule: log every edit in the shared change log; never overlap a rewrite with an ads ladder step.
2. **Data & authority pages (the moat — the plan's center of gravity):**
   - **NYSED Approval Time Tracker** — **live at `/nysed-approval-times`**. Updated monthly from CRM pipeline timestamps (manual paste into `data.ts` via report script): typical days OP Submitted → Approved, trend chart, by profession. Every applicant googles this obsessively mid-wait.
   - **The OP Deficiency Report** — top 10 deficiency reasons, ranked from real cases, with fixes.
   - Annual "State of NY Professional Entities" data study (the link-earning flagship — Part 4).
3. **Decision content:** PLLC vs LLC vs PC by profession · S Corp election math (+ the calculator from Revenue Levers Phase 2) · foreign qualification vs. forming new · Headway/Alma vs. own panels (exists via CAQH plan) · "do I need to publish?" (educational; CTA → full formation only). Explain Rockland-only publication as *why* the all-in package is cheap statewide — never as a county shopping guide or publishing-only offer.
4. **Journey content:** one piece per pipeline stage's natural anxiety — PPE affidavit explained, what OP Submitted means, the 120-day publication clock, SS-4 walkthrough, biennial statement guide (feeds the compliance plan). You have perfect knowledge of what customers ask at each stage; the Gmail archive is a content-ideas database.
5. **Tools (ungated, with soft email capture — "email me my results"):** PLLC name-availability checker (DOS search wrapper — no official API, so build with a cached/rate-limited scrape and a manual-verify disclaimer), NYSED license-lookup helper, S Corp savings calculator. Tools earn links and rank for "checker/calculator" queries that content can't. *(No publication-cost-by-county tool — we publish only in Rockland County for every formation.)*

---

## Part 1.5 — The commercial target set (measured Aug 4 2026)

Until now this plan asserted that money pages "mostly exist — optimize don't create," and Part 7 / Gate S1 referenced "20 tracked terms" that were never actually chosen. Both gaps are now closed with real data.

**What we measured.** Search Console queries (2025-10-27 → 2026-08-02) joined against Google Ads paid search terms over the identical window — see ads plan §0.6 and [`ads_incrementality.py`](ads_incrementality.py).

**We rank nowhere on commercial intent.** Every term that drives revenue sits on page 3–5:

| Query | Organic position | Organic clicks | Annual paid cost |
|---|---:|---:|---:|
| `pllc formation new york` | **26.5** | 1 | ~$1,686 |
| `ny pllc formation` | **28.9** | 6 | ~$1,507 |
| `pllc new york` | **35.9** | 1 | ~$901 |
| `ny pllc` | **20.4** | 1 | ~$495 |
| `new york pllc formation` | **25.1** | 3 | ~$281 |
| `pllc ny` | **44.8** | 1 | ~$210 |

**76% of all paid search spend ($6,032 in the window) goes to queries where our median organic position is 32.** Organic delivers ~63 clicks/month against ~275 from paid; we earn 4,123 organic impressions/month and convert them at **1.53%**, because page 3 doesn't get clicked. Our only page-one organic presence is the brand name.

> **Two spend figures appear in this section; they answer different questions.** **$6,032** is the window cost of queries where we *already rank but rank badly* (organic position 11+) — the cannibalisation-exposure number, 76% of the $7,897 total. **$9,440/yr** is the annualised cost of the full commercially-filtered target set, which also includes queries we pay for and have **no** organic presence on at all. The first sizes what bad rankings cost us; the second sizes the whole prize. Neither is a savings estimate — see the timeline caveat below.

**This is the thesis, priced.** Part 0 argues "every ranking earned is a permanent bid of $0." That was an argument; this is the invoice. The full ranked work queue lives in [`seo-target-list-2026-08-04.md`](seo-target-list-2026-08-04.md) (regenerate with `seo_target_list.py`), prioritised by organic impressions × current paid cost × winnability. **These are the 20 tracked terms** Part 7 and Gate S1 depend on.

### The work is a handful of pages, not 259 queries

259 actionable commercial queries survive filtering — 10,878 organic impressions and ~$9,109/yr of annualised paid spend. They collapse onto a few URLs, and the concentration is extreme:

| Target page | Queries | Organic impr | Annual paid $ | State |
|---|---:|---:|---:|---|
| `/` (homepage) | 113 | 5,997 | **$7,984** | Exists; ranks 20–45 |
| `/how-to-form-a-pllc-in-ny` | 27 | 1,572 | $760 | Exists |
| `/virtual-address-services` | 30 | 892 | $57 | Exists |
| `/foreign-pllc` | 24 | — | — | Exists |
| profession pages | 45 | — | — | Exist |
| `GAP — no page` | 14 | 317 | $99 | Content commissions |

**The homepage alone carries 88% of the paid value.** Its 113 queries are near-identical intent variants (`pllc formation new york`, `ny pllc formation`, `pllc new york`, `ny pllc`, `pllc ny`), so this is one ranking problem wearing many costumes — not 113 pieces of work.

### Plain LLC is out of scope — permanently

A further **74 queries (1,720 impressions, $331/yr paid)** are plain-LLC formation. **These are deliberately not pursued: plain LLC is ceded to the sister company (cheapnewyorkllc), and `/order-llc` exists to take orders, not to rank.** They are excluded from every number above and listed in a standing "Out of scope" section of the target list so a future refresh doesn't re-derive them as an opportunity. Any tooling that regenerates this list must preserve that exclusion.

This also covers the LLC-publication cluster (15 queries): not a content gap, not a new publication page — out of scope, and Part 1's standing directive against publishing-only offers still holds regardless.

**Open question for the ads side, not the SEO side:** we are paying ~$331/yr for plain-LLC clicks. That may be intentional (capture the searcher, sell them the LLC product), but if cheapnewyorkllc also bids on those terms we are bidding against ourselves and inflating both CPCs. Worth checking against the sister account before deciding whether these become negative keywords.

### The sequencing question this raises

Part 2's editorial map puts money-page work (items 11–15, the profession refreshes) *after* ten pieces of new informational content — while money pages are where 76% of paid spend rides. That ordering deserves to be a deliberate choice rather than a default.

The case for keeping the current order: commercial head terms are the hardest thing to rank, we are competing with LegalZoom and Northwest on them, and the data/authority pillar is what builds the domain authority that makes money-page ranking possible at all. Optimising a page with no authority behind it moves position 32 to position 28 and nothing happens.

The case for moving money pages up: they already exist, they already earn 4,123 impressions/month, and they are the only pages with revenue attached.

**Recommended split:** keep the ★ data pieces as the authority engine, but pull the money-page work forward to run *in parallel* rather than queued behind it. The batch table above is why this is cheap to say yes to — with plain LLC out of scope it is essentially **one page (homepage depth, schema, internal linking) plus a title/meta sweep across the profession and foreign pages**, not a content programme. It doesn't compete with drafting the ★ pieces for the same hours.

### Timeline realism — read this before treating the annual costs as savings

Moving from position 26–45 to top 3 on commercial formation terms is a **6–18 month** effort against well-funded incumbents, and on the head terms it may never fully land. The target list is a **prioritisation input, not a paid-search exit plan**. Paid stays on these terms until organic actually holds page 1, and the ads plan's §0.6 measurement decides when that trade becomes real. Nothing here justifies cutting ad spend on the strength of a ranking we do not yet have.

---

## Part 2 — The first-90-days editorial map (~19 pieces + name checker)

Priority order; ★ = contains proprietary data (non-negotiable for these):

1. ★ NYSED PLLC Approval Times: Live Tracker — **SHIPPED Jul 22** → `/nysed-approval-times` (manual monthly data refresh; not auto-query)
2. How Long Does It Take to Form a PLLC in NY? ★ — **SHIPPED Jul 22** → `/how-long-to-form-a-pllc-in-ny` (real 2026 NYSED numbers + stage calendar)
3. NY PLLC Cost: Complete 2026 Breakdown — **SHIPPED Jul 22** → `/ny-pllc-cost` (every fee, exact — include Rockland publication as the reason the flat fee works statewide)
4. ★ The 10 Most Common NYSED OP Deficiencies (and fixes)
5. PLLC vs LLC in New York for Licensed Professionals
6. PLLC vs PC in New York
7. S Corp Election for NY PLLCs: The Actual Math (+ calculator)
8. The PPE Affidavit, Explained
9. Do I Have to Publish My New York PLLC? (educational; formation CTA)
10. Foreign PLLC Into New York: The Complete Guide (hub for state pages)
11–15. Profession deep-dive refreshes: LCSW, physician, NP-psych, dentist, attorney (ads-LP coordination applies)
16. NY Biennial Statement: What It Is and When It's Due (feeds compliance plan)
17. Certificate of Good Standing in NY: How to Get One (shelf SKU page)
18. How to Amend Your NY PLLC's Articles (shelf SKU page)
19. Getting Paneled in NY (webinar recording + transcript page — CAQH plan asset, republished)

Tool shipped in-window: name checker.

**Production standard:** AI-drafted, founder-edited is fine and expected — but the uniqueness rule is absolute: no piece ships without a CRM number, a real example, or an exact-fee table. Thin AI content is the one way this plan produces *negative* value (Part 9).

**Cadence:** 2 pieces/week. Batch-produce skeletons, then finish and ship. Batching is the consistency mechanism (Part 9's biggest risk is not quality — it's stopping). AI keeps drafting/finishing fast; the gate is founder edit + uniqueness, not calendar hours.

---

## Part 3 — Technical foundation (early window)

- **GA4 + Search Console** verified, funnel events instrumented — this is the same prerequisite as ads plan open item 4; one setup serves both documents.
- Indexation audit (site: search + GSC coverage), XML sitemap, robots sanity.
- **Title/meta pass on all existing ~25 pages** — **done Jul 22** (profession + foreign + shared metadata helpers; ads change log noted).
- Schema: Organization, Service, FAQPage on money pages, Dataset markup on the tracker pages (AI-answer relevance), HowTo where honest. **Tracker:** Dataset + Breadcrumb. **Cost:** Article + FAQ + Breadcrumb.
- Internal-link architecture: /how-to-form-a-pllc-in-ny as the pillar; every new piece links up to it and sideways to 2–3 siblings; profession pages link to their profession's journey content. **Jul 22:** both moat pages linked from footer, DIY, FAQ, and each other.
- Site speed: inherits the ads plan's mobile LP work (5.1) — same fix, third payoff.

---

## Part 4 — Links & digital PR (email-only, per directive)

1. **The data-study engine (primary):** quarterly, package a CRM finding — "NYSED approval times hit X days in Q3 2026" / "What NY PLLC publication actually costs when you publish in Rockland" — and pitch 20–30 relevant outlets (legal-industry blogs, practice-management publications, therapist-business newsletters, NY business press). Original numbers get covered; opinions don't. Target: 3–5 referring domains per study. Do **not** pitch a county-comparison shopping guide.
2. **Podcast circuit:** the B2B plan's segment-1 coach/podcast list is *the same list* — every partner-recruitment email can carry a guest-appearance offer. One outreach, two plans served. Each appearance = a link + an audience + a partner lead.
3. **Resource-page and association outreach:** NASW-NY-type chapters, dental/PT societies, university career offices for clinical programs — "free NY PLLC guide for your members" placements.
4. **HARO/Qwoted:** a few founder quotes/week on entity-formation queries; compounding citations.
5. **Community participation (value-first, no dropping links cold):** the therapist-business subreddits and FB groups where your buyers already ask formation questions. Answer genuinely; the profile link does the work. Light weekly touch — never more.

---

## Part 5 — AI-search positioning (the honest version)

No tricks exist; what works is being the citable source: exact numbers with dates ("as of July 2026, DOS Articles with 24-hour expedite is $225"), visible update stamps, Dataset/FAQ schema, one-sentence quotable claims near the top of data pages, and consistent entity naming. **Monitoring:** quarterly, manually run the 15 core queries ("form a PLLC in New York," "NYSED approval time," etc.) through ChatGPT, Perplexity, and Google AI Overviews; log whether nypllc.com is cited. That log is the early-warning system for the channel-shift wildcard — and if citations grow, it's a leading indicator the moat is working before GSC clicks show it.

---

## Part 6 — Cadence (standing operating rhythm)

| Standing block | Focus |
|---|---|
| Content finishing | Ship 2 pieces/week (AI draft → founder uniqueness edit) |
| Site hygiene | Internal linking + technical tidy as pages land |
| PR/outreach | Studies, podcasts, HARO |
| Community | Value-first answers in buyer communities |
| **Recurring:** | Batch-draft skeletons · tracker-page data refresh (automated after first build) · GSC review |

Ship tools (tracker automation, name checker, S Corp calculator) with the same AI-assisted velocity — no separate "engineering slack" calendar. This is the only plan in the portfolio with **no end date** — treat the weekly cadence as immovable ahead of everything except pipeline exceptions.

---

## Part 7 — Measurement: leading before lagging

The honest curve, so nobody panics in October: months 1–3 ≈ nothing visible; months 4–6, first long-tail impressions and clicks; months 6–12, 0.1–0.3 orders/day attributable; months 12–18, 0.5–1.0/day. **2028 target: 200–350 organic orders** (the number already in the financial base case's channel mix).

Track weekly in the shared dashboard: GSC impressions and clicks by pillar · average position on the **20 tracked terms — now defined in Part 1.5** ([`seo-target-list-2026-08-04.md`](seo-target-list-2026-08-04.md)) · indexed-page count · referring domains · tool usage · "how did you hear" attribution + last-touch organic orders. Leading indicators (impressions, positions, domains) govern decisions for the first 9 months; order attribution takes over after.

**Aug 4 2026 baseline for those 20 terms:** median organic position **32**, ~63 organic clicks/month total, 1.53% CTR on 4,123 monthly impressions. Every future position reading is measured against that.

Incrementality honesty: some organic orders would have arrived via ads anyway. Judge the channel on *blended CAC trending down* and *total orders trending up*, not on a pure-incremental fantasy.

---

## Part 8 — Gates

| Gate | When | Pass | On pass | On fail |
|---|---|---|---|---|
| S1 | Oct 15 | ~19 pieces + name checker live · GSC impressions up ≥3x from July baseline · 20-term rank tracking running | Continue cadence; commission first data-study PR push | The problem is production, not strategy — fix the batching system |
| S2 | Jan 31 | ≥500 organic clicks/mo to money + moat pages · ≥3 referring domains from PR · ≥2 AI-answer citations logged | Scale to 3 pieces/wk through formation season | Content audit: are the ★ pieces actually unique? Rework before adding volume |
| S3 | Jun 30, 2027 | Organic-attributed ≥0.3 orders/day | Confirms the 2028 model line; consider dedicated content help | Strategy audit (keyword targets, intent match) — audit the aim, don't abandon the engine |

## Part 9 — Risk register

| Risk | Mitigation |
|---|---|
| **Founder consistency lapse (the actual #1 killer of SEO programs)** | Batch production; the immovable weekly slot; gates measure output before outcomes |
| Thin AI-drafted content (rankings *and* reputation damage) | The uniqueness rule is absolute — no CRM data point, no publish |
| Publication content drifts toward a publishing-only offer or county shopping guide | Standing directive restated at top; Rockland-only is the *cost advantage story*, never a by-county picker; quarterly CTA audit of all publication pages |
| Profession-page edits confound ads measurement | Shared change log; never during ladder steps (ads plan 5.3) |
| Google volatility / algorithm updates | Diversification is built in: tools, PR links, podcasts, communities, email capture — rankings are one output, not the only one |
| Name-checker scrape breaks or misleads users | Cached results + "verify with DOS" disclaimer + monitoring alert |
| Data pages leak competitively useful intel (volumes, margins) | Publish medians, ranges, and counts — never revenue or unit economics |

## Part 10 — Calendar

| Window | Actions |
|---|---|
| Wk of Jul 6 | GA4 + GSC verified (shared with ads plan) · indexation audit · title/meta pass begins · rank tracking on 20 terms |
| Wk of Jul 13–22 | **Done:** title/meta pass · ★ tracker `#1` · cost `#3` · how-long `#2` · post-deploy: GSC URL inspect |
| Jul 23 – Aug 31 | 2/wk cadence starting with piece `#4` (OP deficiencies) then `#5`+ · name checker ships · first podcast pitches ride along with B2B outreach |
| Sep | Pieces 15–19 · S Corp calculator (shared with Revenue Levers) · first quarterly data study drafted |
| Oct 15 | **Gate S1** · data-study PR push (20–30 pitches) |
| Nov–Dec | Cadence continues (SEO has no freeze window — content ships right through the ads freeze) · December: formation-season content refresh ("start your practice in 2027" angles) |
| Jan 31 | **Gate S2** · scale decision |
| Feb – Jun 2027 | Sustained cadence · quarterly studies · Jun 30 **Gate S3** |

## Part 11 — Open items

1. Confirm GA4 status (shared with ads plan open item 4) — if absent, do it first.
2. ~~Site stack check~~ — confirmed: Next.js app-router pages ship in-repo; Jul 22 moat pages are the proof.
3. ~~Tracker data-refresh mechanism~~ — **monthly static** (`report-nysed-approval-times.ts` → paste into `data.ts`). Not live API.
4. Legal-tone review pass: content explains processes and publishes data; it never gives individualized legal advice. One standing disclaimer component, applied everywhere. *(Cost + tracker pages already carry short disclaimers.)*
5. Choose the rank-tracking tool (anything cheap; 20 terms).
6. Post-deploy: request indexing in GSC for `/nysed-approval-times`, `/ny-pllc-cost`, and `/how-long-to-form-a-pllc-in-ny`; spot-check rich results.