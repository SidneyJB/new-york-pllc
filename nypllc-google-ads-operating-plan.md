# NYPLLC Google Ads — Operating Plan v2

**Account:** 1529880213 · Sales-Search-1
**Prepared:** July 5, 2026
**Horizon:** July 2026 → February 2027 (through first full high season), with standing systems that continue after
**Prime directive:** The existing campaign is never deleted and never paused without a gate decision. Everything in this plan is additive and reversible.

---

## Part 0 — Ground truth, corrections, and the economics every decision runs on

### 0.1 Correction from prior draft

The prior plan claimed July/August were "your weakest weeks." That was wrong. The account launched **October 22, 2025**; the business has **never operated in a July or August**. Total July data in existence: 5 days (Jul 1–5, 2026: $223, 2 conversions — noise, not signal).

What the data actually supports on seasonality:

- **January 2026 is the only proven high season.** 46 conversions, $50 CPA, 18.8% IS, 14.5% CVR, rank-lost down to 79.8% — every metric peaked simultaneously.
- **Q1's headline strength is a January artifact.** Feb '26 was $113 CPA (second-worst month ever); Mar was $79. Do not plan around "Q1 is strong" — plan around "January is strong."
- **Summer is unknown.** Jul–Aug 2026 is your first summer. This plan treats it as a baseline-measurement period: log weekly volume, CPC, and CVR now so that in 2027 you have a real seasonal curve instead of an assumption.

The timing argument for restructuring immediately survives on corrected grounds: (1) every structural change carries a 2–6 week stabilization cost, and January is ~25 weeks away — the runway is finite; (2) whatever summer turns out to be, the current run-rate (~$45–70/day) means changes now are cheap to observe; (3) the account must be frozen and stable by Dec 1 to enter January with a confident bidder.

### 0.2 Data ground truth (the numbers this plan is built on)

| Fact | Value | Why it matters |
|---|---|---|
| Search impression share (lifetime) | 13.3% | You appear in ~1 of 7.5 eligible searches |
| Rank-lost IS | 86.5% | The binding constraint — Ad Rank, not budget |
| Budget-lost IS | 0.00% every month ever | Budget has never once been the limiter |
| Lifetime CVR (click→conversion) | 9.5% | High; confirms bottom-funnel intent quality |
| Conversions/month pace | ~26 | Below smart-bidding's comfort zone (30–50+) |
| Broad "pllc" keyword | 56% of spend, 51% of conv, $98 CPA, 8.5% CVR | One keyword is the account; non-broad remainder runs ~$81 CPA / ~10.8% CVR |
| Desktop vs mobile CVR | 11.5% vs 6.6% | Mobile is 28% of spend converting at 57% of desktop rate |
| May '26 tCPA test | +38% spend → +5% impressions | Raising bids bought position, not reach |
| Jun '26 asset test | $67 CPA, 12.7% CVR at $55/day | Ad Rank quality inputs work; priced at ~$23 CPA improvement |
| Jan '26 | 46 conv, $50 CPA, 18.8% IS | Existence proof of the account's ceiling being much higher |

### 0.3 Reconciliation items (updated Jul 5 with owner's answers)

1. **222 conversions vs. 338 orders — RESOLVED.** Confirmed: the 222 are Google-attributed orders; the other ~116 came from organic, referral, and Meta retargeting. Two implications: (a) the conversion action is counting the right thing, so historical CPA figures are trustworthy; (b) **Google Search drives ~66% of lifetime order flow** — this plan operates on the majority channel, and the projection model in Part 11 uses that ratio as a soft cross-check.
2. **CRM AdSpend vs Google — backfilled Jul 8 2026.** CRM `AdSpend` GOOGLE lifetime row updated to **$20,068.24** (`2006824` cents) from Ads API (account 1529880213, 2025-10-22 → 2026-07-08). Was $19,900. FACEBOOK row still $500 stub — update separately. Standing action (monthly SOP, Part 7): re-pull Google spend and update the lifetime row so `calculate-true-net-profit.ts` stays honest. Script: `PLLC-CRM/crm/scripts/backfill-google-adspend.ts`. Note: the $536 contribution-before-ads figure in 0.4 is unaffected (pre-ad-spend).
3. **Conversion window & model:** confirm 30-day click window, data-driven attribution (not last-click), and that the Spiffy webhook and any gtag purchase event aren't double-firing (Ads conversions should track CRM orders within ~±10% on a rolling 30 days — add this check to the weekly SOP).

### 0.4 Unit economics for bidding decisions

- Blended contribution per order **before ads**: $181,249 ÷ 338 ≈ **$536** (includes attach revenue: VM, S Corp, DBA).
- Floor case — a bare standard domestic order: $885 − ($10 OP + $50 notices + $50 cert pub + $235 AoO + ~$27 Stripe) ≈ **$513**.
- Recurring tail not in the above: RA renewals ($99/yr from month 13), VM at 26% attach × $50/mo. Conservatively +$150–350 LTV per order.
- **Decision rules derived from this:**
  - Target blended CPA: **≤$110** through October, **≤$130** acceptable at scale.
  - **Marginal CPA ceiling: $160** (preserves ~3.3:1 on first transaction alone, ignoring the tail).
  - **Never-exceed line: $200 marginal.** Above this, junk-traffic risk historically dominates (your $120 tCPA experiment is the proof).
  - **Publishing-only: no paid acquisition, ever** (owner decision, Jul 5 2026). No campaign, no ad group, no publishing sitelinks or price assets, and negative List E (1.3) fences broad match off those queries account-wide.

### 0.5 The thesis and the honest volume model

**Thesis:** You lose 86.5% of eligible auctions on Ad Rank = bid × Quality Score (expected CTR, ad relevance, landing page experience) — and your two best-ever performance windows (January's CVR spike; June's asset addition) both came from the *quality* side, not the bid side. The plan therefore attacks Ad Rank in this order: (1) structure and message-match to raise QS, (2) conversion-data quality and volume to make the bidder confident, (3) *then* measured bid escalation into auctions you can now win efficiently.

**Volume model (with the broad-match inflation discounted):**

- Received impressions: 33,694 ÷ 256 days ≈ 132/day. At 13.3% IS → eligible pool ≈ **990/day**.
- The broad keyword inflates "eligible" with junk queries (other states, DIY research) you should never win. Discount 30–50% → genuinely addressable pool ≈ **500–700 impressions/day**.
- Scenarios at a restructured account:

| Scenario | IS on addressable pool | Impr/day | CTR | Clicks/day | CVR | Conv/day | Conv/month |
|---|---|---|---|---|---|---|---|
| Conservative | 35% | 500 | 7.0% | 12.3 | 9.5% | 1.2 | ~35 |
| Base | 45% | 600 | 7.5% | 20.3 | 10.5% | 2.1 | ~64 |
| Upside | 55% | 650 | 8.0% | 28.6 | 11.5% | 3.3 | ~100 |

- Expect CPC to rise ($9 → $11–13) as you win marginal auctions; at ~10% CVR that's $95–130 CPA. Every scenario clears the economics in 0.4 comfortably.
- January multiplies whichever scenario you're in. Jan '26 did 46 conversions on a bad structure at ~$75/day.

**Two weekly numbers tell you if the thesis is working:** Core Exact campaign impression share (should climb from ~13% toward 50–70% on the terms that matter) and account conversions per rolling 30 days (26 → 35 → 45 → 60+). Everything else is diagnostics.

---

## Part 1 — Phase 0: Measurement & account foundation (Weeks 1–2)

Zero changes to the live campaign's bidding or keywords during this phase. Everything here either feeds the bidder better data or is account-level hygiene that helps the existing campaign immediately.

### 1.1 Conversion architecture

**1.1.1 Conversion actions**

| Action | Type | Counting | Value | Window | Role |
|---|---|---|---|---|---|
| Purchase (order paid) | Web/import | One per click | Actual order total | 30-day click | **Primary — the only action bidding optimizes on** |
| Begin checkout | Web | One | None | 7-day | Secondary/observation only |
| Phone call ≥60s (call asset) | Call | One | None | 30-day | Secondary until you verify call quality, then consider primary at a fractional value (~$150) |

**Done Jul 9 2026:** Begin checkout `7678925960` (`WEBPAGE`, `send_to` `AW-17672972971/dWKtCIi5zM0cEKvVkOtB`) — site fires on Spiffy embed detect; secondary / not in Conversions. Phone call `7678925963` (`AD_CALL`, ≥60s) — linked as customer `call_conversion_action`; secondary / not in Conversions.

Anything currently marked primary that isn't a paid order gets demoted to secondary this week.

**1.1.2 Revenue values.** Import the real order total from the Spiffy/Stripe webhook: $885 standard, $860 B2B-referral checkouts, $915–995 foreign qual by state (flat PLLC/PC per state), add-ons included in the total. (Publishing-only orders won't carry click IDs once List E is live, so they never enter ad conversion data.) **Payment plans: send the full contracted value on the first successful installment**, not per-installment amounts — otherwise a $885 four-pay order teaches the bidder it's worth $221.

**Verified Jul 8 2026 (Spiffy custom thank-you):** With “Send order details through URL” on, Spiffy appends `order=` (Spiffy order id) and `total=` (**full contracted order value in cents**, not the first installment). Confirmed on a $1 one-time test (`total=100`) and a $2 four-pay plan (`total=200` = four $0.50 installments). Browser-side tagged Ads conversion can therefore use `value = Number(total)/100` and `transaction_id = order`. Prefer thank-you URL `https://www.nypllc.com/order/confirmation` (canonical www). Side note: Spiffy thank-you URLs can include `owner_ssn` / `owner_dob` / contact fields — site purchase metadata now allowlists only safe keys (`order`, `total`, `code`, etc.) via `buildSafePurchaseMetadata`. Prefer turning off “Include contact details” in Spiffy if Meta/Ads warn about PII in the URL itself.

**Conversion cutover (in progress Jul 8 2026):**
- Page-load: `Purchase (Page load www.nypllc.com/order/confirmation)` id `7353506045` — type **`WEBPAGE_CODELESS`** (API **read-only**). $1 default. **Jul 9 2026:** demoted to **secondary** in Ads UI (`primary_for_goal=false`).
- Tagged: `Purchase (Spiffy thank-you value)` id `7678072764` — type `WEBPAGE`; `send_to` `AW-17672972971/w4sBCLyvmM0cEKvVkOtB`. **Jul 9 2026:** verified `$885` → set **primary** via API; page-load demoted in UI. **Flip complete** — bidding/Conversions use tagged real `$` only.

**1.1.3 Click ID capture (you built the CRM — use it).**
1. Append `gclid` (and `wbraid`/`gbraid` for iOS traffic) passthrough on every ad landing page → into the Spiffy checkout URL as metadata. Verify Spiffy supports URL-param passthrough into order metadata; you already use Spiffy metadata for payment-plan tracking, so the rails exist.
2. Webhook writes the click ID onto the order record.
3. Nightly job (or weekly manual sheet upload to start) pushes offline conversions via Google Ads API: click ID + timestamp + value. This makes attribution exact instead of modeled.
4. Fallback if Spiffy can't pass params: **Enhanced Conversions** — hash the customer email (SHA-256) on the thank-you page or server-side via API. Do this *anyway*; it recovers attribution that cookie loss destroys, typically +5–15% measured conversions, which at your volume is 1–4 "found" conversions/month feeding the bidder.

**§1.1.3 status (Jul 9 2026 — capture + Enhanced Conversions shipped; offline upload still deferred):**
1. **Site (done):** `web/src/lib/click-attribution/` cookie `nypllc_click_attr` (90d) + `ClickAttributionCapture` in layout; `buildSpiffyCheckoutUrl` appends click IDs/UTMs; wired on PLLC + LLC embeds.
2. **CRM (done):** `Order.gclid`/`wbraid`/`gbraid`/`utm*` columns; `extractSpiffyOrderAttribution` (preserved_params → fields → querystring → top-level → pageview referrer/url) on both Spiffy webhooks + import upsert. Migration `20260709210000_add_order_click_attribution`.
3. **Enhanced Conversions (done Jul 9):** thank-you hashes Spiffy `email` → `gtag('set','user_data',{sha256_email_address})`; customer data terms accepted; Enhanced Conversions turned on (Google Tag method) in Ads UI.
4. **Still deferred:** nightly offline conversion upload (step 3 above). Optional Spiffy `checkout.set` custom-field hardening not built.

**1.1.4 De-duplication.** One source of truth per conversion action. If the webhook/API import is live, the gtag purchase event must use a shared `transaction_id` (order ID) so Google dedupes, or be removed. The weekly check: Google Ads conversions vs. CRM ad-attributed orders within ±10% on rolling 30 days.

### 1.2 Settings & hygiene checklist (do once, audit monthly)

**Done Jul 8 2026 (Sales-Search-1 via API)** unless noted:

- [x] **Auto-apply recommendations: OFF** — no ENABLED subscriptions; dangerous types created as **PAUSED** (API has no DISABLED; PAUSED = not auto-applying). Especially broad match, RSA adds, Search Partners opt-in, bidding opt-ins. Re-audit monthly in UI too — some auto-apply toggles are UI-only.
- [x] **Location option = "Presence"** — was `PRESENCE_OR_INTEREST`; set to `PRESENCE` (NY State geo unchanged). Foreign Qual later is the deliberate exception (2.3).
- [x] **Search Partners:** already OFF; last 90d had **$0 Partner spend** (Search only). Left unticked.
- [x] **Display Expansion: OFF** (content network false).
- [x] **Ad rotation:** unset / default Optimize on the ad group (no OPTIMIZE_FOR_CLICKS override).
- [x] **Audiences in Observation** (`AUDIENCE` bid_only=true): All visitors, All Converters, in-market Business Services. No separate Legal Services in-market vertical in taxonomy. **Jul 9:** set on Sales + `01`/`02`/`03` (01 was missing `bid_only` after audience copy — fixed).
- [ ] **Customer Match:** CRM export ready — **353** unique `Customer.email` → `Ads - customer-match-emails_crm_2026-07-08.csv`. Empty list shell created via API: `NYPLLC Formation Customers (CRM)` id `9427032745`. **Upload blocked on Google Ads API** for this developer token (`CUSTOMER_NOT_ALLOWLISTED` → use [Data Manager API](https://developers.google.com/data-manager/api/devguides/audiences/google-ads/customer-match) or **Ads UI** Tools → Shared library → Audience manager → upload CSV into that list, then keep Observation).
- [x] **Call reporting on** (already enabled, incl. call conversion reporting).

### 1.3 Negative keyword architecture — five shared lists, applied account-wide

**Built + attached Jul 8 2026 (Sales-Search-1).** Shared sets (phrase match unless noted). A-FQ created for Foreign Qual — **not** attached to Sales-Search-1. **Jul 9 2026:** A–E on paused drafts `01_Core_Exact_NY` / `02_Professions_NY`; **A-FQ + B–E** on paused `03_ForeignQual_US`.

| List | Shared set id | Members | On Sales-Search-1 | On 01 / 02 | On 03_ForeignQual |
|---|---|---|---|---|---|
| Neg A — Other states (excl NY) | `12146898907` | 103 | Yes | Yes (Jul 9) | No |
| Neg A-FQ — Other states (excl NY + FQ origins) | `12146898703` | 89 | No | No | Yes (Jul 9) |
| Neg B — Research DIY education | `12145390194` | 15 | Yes | Yes (Jul 9) | Yes (Jul 9) |
| Neg C — Wrong intent lookup jobs school | `12146898706` | 17 | Yes | Yes (Jul 9) | Yes (Jul 9) |
| Neg D — Freebie price-shopping junk | `12146898991` | 5 | Yes | Yes (Jul 9) | Yes (Jul 9) |
| Neg E — Publishing-only intent | `12146898709` | 7 | Yes | Yes (Jul 9) | Yes (Jul 9) |

**List A — Other states (~110 entries).** Every state name + abbreviation except NY, as phrase match: `texas`, `tx`, `florida`, `fl`, `california`, `ca`, `pennsylvania`* … (*note: PA/NJ/CT/FL/TX/CA terms must be *excluded from this list on the Foreign Qual campaign* — List A-FQ is the copy minus those six origin states).

**List B — Research/DIY/education:** `what is`, `meaning`, `definition`, `vs`, `versus`, `difference between`, `template`, `sample`, `example`, `pdf`, `free download`, `diy`, `yourself`, `wiki`, `pros and cons`.

**List C — Wrong intent (lookup/jobs/school):** `lookup`, `look up`, `search`, `verify`, `verification`, `number`, `login`, `renewal`*, `renew`*, `salary`, `jobs`, `hiring`, `course`, `exam`, `degree`, `school`, `classes`. (*renewal terms are wrong for formation but right for future RA-renewal campaigns — keep them in a list you can detach later.)

**List D — Freebie/price-shopping junk:** `free llc`, `free ein`†, `cheapest`, `$0`, `no cost`. († you *provide* EIN service; `free ein` searchers want the IRS's free process — junk for you.)

**List E — Publishing-only intent (permanent, per the no-publishing-ads decision, Jul 5 2026):** `certificate of publication`, `affidavit of publication`, `newspaper publication`, `publication service`, `publish my llc`, `llc publishing`, `publication only`. Applied to every campaign, forever. Two cautions: (1) do **not** negative the bare word `publication` as phrase — formation buyers search "pllc publication requirement ny" while deciding; List E uses specific publishing-only phrases only. (Account already has campaign-level **exact** negatives `publication` / `publishing` from the Jun experiment — leave those; do not broaden to phrase.) (2) Some of the broad keyword's historical conversions may have been publishing-only orders; a dip of 1–3 conversions/month versus history is possible and accepted.

**The do-NOT-negative list (this is where accounts get quietly strangled):** `cost`, `price`, `fee`, `fees`, `how much`, `how to form`, `how to start`, `requirements`. These read like research but your own funnel proves they're buyers — you sell a flat fee, your best content page is /how-to-form-a-pllc-in-ny, and "pllc cost ny" is a money query. Audit rule: before any new negative goes into a shared list, check 90-day search terms — if the term family has ever converted, it doesn't get negatived, it gets its own ad group.

**Process:** the 8-day negative experiment (Jun 28) campaign/ad-group negatives remain in place; new junk goes **only** into these shared lists. Weekly review: promote converters to exact in structured campaigns later; junk → shared lists.

### 1.4 Asset (extensions) build — account level

**Applied Jul 8 2026 on Sales-Search-1** (measured keep/replace, not full wipe). Kept Get Started / Start Your Order / FAQ / Contact / Call + strong callouts (NYSED, Publishing, $885, etc.). Added sitemap-true sitelinks; replaced About Us → About NYPLLC; Amenities → Services snippet; new 3-offer price (Formation $885, VA $50/mo, Foreign from $910 — API requires ≥3 offerings); unlinked generic callouts + legacy About Us + old price v3. Account/ad-group auto profession sitelinks left for a later pass. **Jul 11 2026:** price asset replaced — Foreign floor **$915** (asset `390521246372`); linked on Sales + 01/02/03. **Later Jul 11:** Foreign floor **$930** (asset `390754746354`); `$915` asset unlinked.

Your June asset test priced this work at roughly a $23 CPA improvement. Build the full set — **only against real sitemap URLs** (`web/src/app/sitemap.ts`). No sitelink to a page that does not exist.

**Volume claim (ads + site):** The business has formed **thousands** of NY entities over years (partners page uses **25,000+**); this marketing site is newer. Do **not** use “300+” in ads — that understates history. Prefer “Thousands of NY Entities” / “25,000+ NY Entities” (fit callout ≤25 chars / headline ≤30).

**Sitelinks (8) — sitemap-true only** (each with two ≤35-char description lines):

| Link text | Final URL | Notes |
|---|---|---|
| Start Your Order — $885 | `https://www.nypllc.com/order` | Replaces fake `/pricing` (nav pricing is disabled) |
| How to Form a PLLC | `/how-to-form-a-pllc-in-ny` | Closest to “NYSED process” — no dedicated NYSED-only page |
| Foreign PLLC Into NY | `/foreign-pllc` | |
| Virtual NY Address | `/virtual-address-services` | |
| FAQ | `/faq` | |
| Talk to a Specialist | `/contact` | |
| About Us | `/about` | Rewrite — drop “25,000+ businesses since 2005” if wrong brand voice; volume claim OK if accurate |
| PLLC for Therapists | `/professions/lcsw` | Stand-in for missing professions hub; swap profession if desired |

**Do not build sitelinks for (no page):** `/pricing`, S Corp add-on, on-site reviews hub, professions index hub. **Reviews (Jul 9 2026):** site links + schema → NYPLLC **Google Business Profile** (not Trustpilot / not cheapnewyorkllc). Live GBP: **5.0 stars, 6 reviews** (`BUSINESS_INFO.googleReviews`). RSAs on `01`/`02` use **`Rated 5 Stars on Google`** (5-star only in ad copy; no review count).

**Callouts (10):** Publication Included · NYSED OP Specialists · Flat $885 — No Hidden Fees · EIN & Operating Agreement · Registered Agent Yr 1 Free · Thousands of NY Entities · Licensed-Professional Focused · 120-Day Deadline Managed · Deficiency Handling Included · NY-Only, All Day Every Day.

**Structured snippets:** Services: PLLC Formation, NYSED Approval, DOS Filing, Publication, EIN, Operating Agreement, S Corp Election, Registered Agent. (Snippet values do not need their own landing pages.) Replace the live wrong **Amenities** snippet.

**Price assets:** Only offers with real final URLs. **Ship:** PLLC Formation $885 → `/order` · Virtual Address $50/mo → `/virtual-address-services`. **Defer** S Corp $195 / DBA $109 / RA $99/yr until those have dedicated (or clearly sectioned) landing URLs — do not invent pages. Current live price asset only restates $885 three ways; replace with the multi-offer set above when ready.

**Call asset:** business hours schedule, call reporting on (already on). **Business name + logo:** verify; drop auto 32×32 if a real logo is linked. **Image assets:** 3–4 office/skyline/document imagery — no stock-photo handshakes; audit existing “group of profs” / BFS logos.

**Cleanup when rebuilding:** Pause/remove weak linked sitelinks (About Us legacy copy), generic callouts (“Trusted since 2005”, “Real human support”), and the Amenities structured snippet. **Keep** converting account/ad-group auto profession sitelinks unless measured otherwise (Jul 8: they assist conversions — not mandatory cleanup).

### 1.5 Baseline snapshot (the before-photo)

**Pulled Jul 8 2026 →** [`baseline-2026-07-08/`](baseline-2026-07-08/) (90d: 2026-04-10 → 2026-07-08): full search terms · keywords · QS components · devices · geo · hour-of-day · day-of-week · campaigns · keyword/campaign settings · negatives · conversion actions · asset performance. See folder `README.md`.

**Still manual:** Auction Insights (API unavailable for this token) — export from UI when convenient and drop into that folder.

---

## Part 2 — Campaign architecture (Phases 1–3, Weeks 2–8)

### 2.0 Design principles

1. **Structure = intent tiers, not one keyword.** Each campaign owns a query family with its own economics, geography, and landing pages.
2. **One ad per account per auction.** Google's serving priority means an exact-match keyword identical to the search query beats a broad keyword elsewhere in the account. New exact campaigns therefore *take* their queries from the old broad campaign automatically — this is intended query migration, not damage. **The old campaign's metrics will drift in weeks 3–8; judge the account, never the campaign.**
3. **One portfolio bid strategy pools all conversion data.** At ~26 conversions/month, per-campaign learning would starve everything. The portfolio is the antidote to fragmentation.
4. **Naming convention:** `01_Core_Exact_NY`, `02_Professions_NY`, `03_ForeignQual_US`, `04_Discovery_Broad`. Numbered so reports sort by priority.
5. **Every campaign inherits Part 1 settings:** Search network only, Display Expansion off, presence targeting (except 03), English, all five shared negative lists (03 uses List A-FQ instead of List A).

### 2.1 Campaign 01_Core_Exact_NY — launches Week 2–3

**Status (Jul 9 2026 evening):** **ENABLED** (`campaigns/24022049179`). Budget $45/day · NY Presence · Search only · shared negatives A–E · 4 ad groups · **41 keywords** · **8 RSAs**. Attached to portfolio **`NYPLLC Search Portfolio`** tCPA $90. Build package: [`google-ads-campaign-build/`](google-ads-campaign-build/).

**Geo:** New York State, Presence. **Budget:** $40–50/day at launch. **Bidding:** portfolio tCPA $90.

**AG1 — Formation-Core** (exact match):
[ny pllc] · [new york pllc] · [pllc ny] · [pllc new york] · [ny pllc formation] · [new york pllc formation] · [pllc formation ny] · [pllc formation new york] · [form a pllc in ny] · [form a pllc in new york] · [forming a pllc in new york] · [forming a pllc in ny] · [start pllc] · [start a pllc] · [start a pllc in new york] · [start a pllc in ny] · [set up a pllc in ny] · [create a pllc in new york] · [file a pllc in ny] · [ny pllc filing] · [pllc application new york] · [pllc application ny] · [open a pllc in new york]

*(Seed list deliberately includes every keyword family that has ever hit QS ≥7 in the account — notably the starved "start pllc" family, which converted at a $5.87 CPA on just 65 lifetime impressions, and "forming a pllc in ny" at $59/$23 CPA across match types. These proven winners get first claim on budget.)*

**AG2 — Service-Intent** (exact + phrase):
[pllc formation service] · [pllc formation service ny] · [pllc formation services new york] · [pllc filing service] · [best pllc formation service] · [pllc formation company] · "pllc formation service near me"

**AG3 — Cost/Price** (exact — these are buyers, per the do-not-negative rule):
[pllc cost ny] · [ny pllc cost] · [how much does a pllc cost in ny] · [cost to form a pllc in new york] · [ny pllc filing fee] · [pllc formation cost new york] · [how much is a pllc in new york]
→ Ads here lead with "$885 Flat" pinned in headline position 1.

**AG4 — Brand** (exact): [nypllc] · [nypllc com] · [ny pllc com] · "business filing solutions". Costs pennies, blocks conquesting, and its high CTR flatters account-level QS signals.

Two RSAs per ad group (see Part 4). Landing pages: homepage or /how-to-form-a-pllc-in-ny variant with checkout CTA; AG3 → pricing-forward page.

### 2.2 Campaign 02_Professions_NY — launches Week 3–5

**Status (Jul 9 2026 evening):** **PAUSED** but attached to portfolio (`campaigns/24017629178`). Budget $25/day · NY Presence · Search only · shared negatives A–E · **11 ad groups** · **34 keywords** · **22 RSAs**. Enable ~Aug 3 per calendar (Core Exact already live). Six health-policy keywords uploaded with API **exemption requests** (`HEALTH_IN_PERSONALIZED_ADS`): `lcsw pllc`, `lcsw pllc new york`, `pllc for lcsw`, `mental health counselor pllc`, `psychiatric nurse practitioner pllc`, `physical therapy pllc new york` — pending Google review.

**Geo:** NY, Presence. **Budget:** $20–30/day. **Bidding:** same portfolio.

One ad group per profession, each pointed at the live profession landing page you already built. Start exact; add phrase per group after 2 weeks if that group gets <10 impressions/day.

| Ad group | Seed keywords (exact) | Landing page |
|---|---|---|
| Therapists/LCSW | [pllc for therapists], [therapist pllc new york], [lcsw pllc], [lcsw pllc new york], [pllc for lcsw], [social worker pllc ny], "private practice pllc new york" | /lcsw page |
| MHC/LMHC | [lmhc pllc], [mental health counselor pllc], [mhc pllc new york] | /mhc page |
| Psychology | [psychologist pllc new york], [psychology pllc ny] | psychologist page |
| Physicians | [medical pllc new york], [physician pllc], [pllc for doctors new york], [md pllc ny], [medical practice pllc new york] | /physician page |
| NPs | [nurse practitioner pllc new york], [np pllc ny], [psychiatric nurse practitioner pllc] | /nurse-practitioner page |
| Dentists | [dental pllc new york], [dentist pllc ny], [dental practice pllc] | /dentist page |
| Physical Therapy | [physical therapy pllc new york], [pt pllc ny] | PT page |
| Architects/Engineers | [architecture pllc new york], [architect pllc ny], [engineering pllc new york], [pe pllc new york] | /architect, /engineer |
| Attorneys | [law firm pllc new york], [attorney pllc ny], [law pllc new york] | /law page |
| CPAs | [cpa pllc new york], [accounting pllc ny] | /cpa page |

*(Upload split Architects/Engineers into two ad groups → `/professions/architect` and `/professions/engineer`.)*

Per-group volume will be small — that's fine. This campaign's job is threefold: capture your highest-CVR segments (Medicine and LCSW are your best customers), raise ad-relevance QS through perfect query→ad→page match, and generate the profession-level data that later feeds Microsoft's LinkedIn targeting (6.1).

One honest flag from the QS baseline: the account's only prior profession test — broad-match "lcsw new york pllc" — spent $265 for zero conversions across 50 clicks. That failure mode (broad match, generic landing) is exactly what this design replaces, but it means the professions thesis is *unproven in-account*: hold each ad group to the 3-week/5-conversion rule (7.4) individually, and pause groups that fail it rather than defending them.

### 2.3 Campaign 03_ForeignQual_US — launches Week 4–6, Gate 1-dependent

**Status (Jul 9 2026):** Created **PAUSED** via API (`campaigns/24012757620`). Budget **$15/day** · **United States** Presence · Search only · shared negatives **A-FQ + B–E** · **6 ad groups** · **33 keywords** · **12 RSAs uploaded** (controlled + unpinned; no `→` — SYMBOLS policy). Still on **inline** Maximize Conversions tCPA $90 (not on portfolio). Do **not** enable until Gate 1 + conversion flip + attach to portfolio. CA exacts → hub (no CA state page yet). Build package: [`google-ads-campaign-build/`](google-ads-campaign-build/).

**Geo:** United States, Presence (this is the deliberate exception to NY-only — foreign-qual buyers by definition search from NJ/PA/FL/TX/CT/CA). **Negatives:** List A-FQ (states list minus the six origin states) instead of List A. **Budget:** $10–15/day.

Keywords: [foreign pllc new york] · [register out of state pllc in new york] · [application for authority new york pllc] · [ny application for authority] · [foreign qualification new york] · [register my pllc in new york] · per-state exacts like [nj pllc doing business in new york], [pennsylvania pllc in new york], [florida pllc new york] → each to its /foreign-pllc/{state} page; generic terms → /foreign-pllc.

Copy is state-specific where possible ("NJ PLLC - NY — $975 Flat"). Order values $915–995 flow to the bidder, so under value-based bidding (3.3) this campaign gets naturally favored. Skip [certificate of authority new york] — it collides with the sales-tax certificate of authority; let Discovery mining tell you if that family is worth touching.

Almost nobody bids these terms with NY-specific messaging. Volume is low; margin and competitive vacuum are the point.

### 2.4 Campaign 04_Discovery_Broad — the demotion, Week 6–8, Gate 2-dependent

This is your current campaign's end state. It is never deleted.

1. Rename `Sales-Search-1` → `04_Discovery_Broad`.
2. **Build the fence:** export every exact keyword from campaigns 01–03 and paste the full set as *campaign-level exact-match negatives* here. Broad can no longer serve on anything the structured campaigns own; it can only reach genuinely new queries.
3. Cap budget at 15–20% of account spend (~$15–20/day initially). Stays on the portfolio strategy.
4. **Weekly mining SOP (15 min, part of 7.1):** search terms → three buckets: (a) converted or clearly high-intent → add as exact to the right structured campaign *and* as exact negative here; (b) junk → the appropriate shared negative list; (c) ambiguous → leave and watch. The campaign you were worried about protecting becomes your permanent R&D department.

### 2.5 Deliberately excluded — and the conditions under which each gets revisited

- **Publishing-only: excluded permanently** (owner decision, Jul 5 2026). Enforced by negative List E on every campaign. Publishing demand flows through organic and wholesale/B2B channels only. Not revisited in this plan.
- **Performance Max: no.** Query and placement opacity plus lead-quality risk is exactly wrong for a 26-conversion/month account. Revisit only after 60+ conv/month sustained — and even then with brand exclusions and account-level negatives applied.
- **Generic "llc formation new york": not now.** That auction is national players with deep pockets and $15–25 CPCs; entering it funds LegalZoom's war chest. Revisit only as a deliberate product expansion with its own landing page and economics memo.
- **Competitor conquesting** ([zenbusiness new york], [legalzoom pllc]): structurally low QS, expensive, usually poor CVR. Optional $10/day test *after* Gate 3, never before.
- **Dynamic Search Ads: a genuine later candidate.** You have 15+ quality profession/state pages — a page-feed DSA (excluding blog/educational URLs) can harvest long-tail cheaply. After Gate 3 only, to protect measurement clarity during the rebuild.
- **Display/YouTube/demand gen: out of scope** until search is captured. Demand capture before demand creation.

---

## Part 3 — Bidding & budget system

### 3.1 Portfolio mechanics and sequencing

Week 2: create **portfolio Target CPA = $90** → attach the *existing* campaign first and let it run 10–14 days. This is technically a bidding change on the live campaign, but to the same effective target — expect a ~1-week wobble, not a reset. Then every new campaign launches *into* the portfolio, inheriting pooled learning instead of cold-starting. Keep everything in one portfolio until the split condition in 3.2 is met.

**Done Jul 9 2026 (API):** Created portfolio **`NYPLLC Search Portfolio`** (`biddingStrategies/12148056412`) — Target CPA **$90**. **Evening Jul 9:** attached **`01_Core_Exact_NY`** (ENABLED) + **`02_Professions_NY`** (PAUSED) alongside **`Sales-Search-1`**. `03_ForeignQual_US` still unattached (Gate 1).

### 3.2 The escalation ladder

**Preconditions to start:** Gate 2 passed · ≥40 pooled conversions/30 days · account CPA ≤$100.

**Steps:** $90 → $100 → $115 → $130 → ($145 maximum in 2026).

**Rules:**
- One step at a time; never more than ~15% per move (20%+ re-triggers learning periods — your era table is the museum of what that costs).
- Hold each step ≥14 days AND ≥15 conversions before judging.
- The ladder applies to the whole portfolio. If you later want to push Core Exact harder than the rest, split it to its own portfolio — but only once Core Exact alone sustains 25+ conv/month, because splitting fragments the data that makes smart bidding work.

**Judgment = marginal CPA, not average CPA:**
> Marginal CPA = (Spend_step − Spend_prior) ÷ (Conv_step − Conv_prior), matched-length windows, excluding the first 7 days after the change.

Worked example: prior 28 days $3,900 / 38 conv ($103 avg). Step 28 days $4,800 / 44 conv ($109 avg — looks fine). Marginal = $900 ÷ 6 = **$150** → under the $160 ceiling → hold, or take the next step. If marginal exceeds $160 → revert one step, wait 3 weeks, and re-attempt only after a CVR improvement ships (Part 5) or January arrives.

**The May-failure detector:** at each step, rank-lost IS should *fall* and impressions should *grow*. If spend rises while impressions stay flat and absolute-top % climbs, you are re-buying position on auctions you already won — the exact May '26 signature. Revert.

### 3.3 Value-based bidding (tROAS) transition

**When:** ≥50 conv/30 days AND accurate order values flowing for ≥30 days. Not before — a correct tCPA beats a garbage tROAS every time.

**Why:** your order values span $860–995+; tROAS makes the bidder chase dollars instead of order-count, naturally favoring foreign-qual and add-on-heavy orders.

**Math:** blended AOV ≈ $910, so the current $90 CPA ≈ 1,011% ROAS. Set initial tROAS = **950%** (≈ $96 effective CPA — a slight loosening, absorbing the switch). The scaling move is then laddering tROAS *down* in ~10% decrements (950 → 855 → 770), each equivalent to a ~10% CPA raise, under the same 14-day/15-conversion judgment rules. Marginal test in value terms: marginal spend per marginal $1.00 of conversion value must stay ≤ $0.30 (mirroring $160/$536).

### 3.4 Budget trajectory (spend follows gates; budget-lost IS stays ~0% throughout)

| Month | $/day | Monthly | What's running |
|---|---|---|---|
| Jul '26 | 90–110 | $2.9–3.3K | Existing + 01 Core Exact |
| Aug | 110–140 | $3.5–4.2K | + 02 Professions; Gate 1 mid-month → + 03 Foreign Qual |
| Sep | 140–170 | $4.3–5.1K | Gate 2 → demotion to Discovery; ladder step 1; Bing build |
| Oct | 170–200 | $5.2–6.2K | Gate 3 → Bing live; ladder step 2 |
| Nov | 180–210 | $5.5–6.3K | Last structural change Nov 14; freeze Nov 15 |
| Dec | 180–210 | $5.5–6.3K | Frozen; Dec 26–28 January pre-load |
| Jan '27 | 280–350 | $9–11K | Surge protocol (3.5) |
| Feb | 200–250 | $5.5–7K | Gradual step-down; season readout |

On any gate failure, hold the prior month's level — the trajectory is permission-based, not calendar-based.

### 3.5 January surge protocol (the one proven season)

- **Dec 1:** total freeze on non-budget changes — keywords, ads, structure, negatives (emergency junk excepted).
- **Dec 20:** verify no campaign can budget-cap at surge levels. Remember Google may spend up to 2× a daily budget on any given day; the true governor is monthly (30.4 × daily).
- **Dec 26–28:** raise budgets to surge level and raise the portfolio target +15% in one move — done during the low-competition holiday week so the learning wobble is absorbed before volume arrives Jan 2.
- **Jan 2–31, daily 10-minute check:** spend pace · 7-day CPA · budget-lost must read 0% · tracking sanity (Ads vs CRM) · search terms every 2–3 days (volume surges bring junk surges). No structural changes. Tripwire compressed for January: CPA >$150 for 10 days → act (against a historical January baseline of $50, sustained $150 means something is broken, not that the season is expensive).
- **Feb 1–10:** step budgets down 20–25% per week — never a cliff; cliffs shock pacing and learning.
- **Deliverable:** the first-ever January on a good structure. This single month's data largely answers the 2027-vs-2028 question from the broader growth plan.

### 3.6 Device strategy

Under tCPA, a device bid adjustment modifies the CPA *target* for that device. Stopgap now: **mobile −20%** (effective target ~$72) while the mobile LP work ships (Part 5). Remove the adjustment once mobile CVR ≥ 80% of desktop over a rolling 30 days. Never set −100%: mobile produced 63 lifetime conversions at an $88 CPA — the traffic is fine; the landing experience is the problem. Tablet: ignore entirely (1% of everything).

**Done Jul 9 2026:** `bid_modifier=0.8` on MOBILE for `Sales-Search-1`, `01_Core_Exact_NY`, `02_Professions_NY`, `03_ForeignQual_US`.

---

## Part 4 — Creative system

### 4.1 RSA construction rules

- **Two RSAs per ad group:** one "controlled" variant (price headline pinned to position 1) and one "unpinned" variant (ML free to combine). Compare over 60 days; keep both unless one is clearly dominant.
- 10–15 headlines, 4 descriptions per RSA. Ad Strength "Good" or better is nice; never sacrifice message accuracy to please the meter.
- **Price appears in at least one headline of every RSA.** At $8–11 CPCs, pre-qualifying away sticker-shock clickers is worth more than the CTR it costs.
- Every ad group's H1 family must echo its query family — this is the ad-relevance component of Quality Score, which is a direct input to the rank-lost problem.
- **Creative change log:** date, ad group, what changed. Ad edits reset ad-level learning; never edit ads and bids in the same window.

**Assembled + uploaded Jul 9 2026:** Full RSA packages for all **21** draft ad groups (**42 RSAs**) in [`google-ads-campaign-build/rsas/`](google-ads-campaign-build/rsas/) — uploaded via `google_ads/upload_rsas.py` into paused campaigns (ads ENABLED inside PAUSED campaigns). Built from §4.1–4.3 (+ §2.3 Foreign Qual prices). Trims: headline #7 → `Thousands of NY Entities` (≤30); desc #1 and therapist descs trimmed to ≤90. **Headline #10:** `Rated 5 Stars on Trustpilot` → **`Rated 5 Stars on Google`** on `01`/`02` (uploaded Jul 9; Core swaps `Built for NY Professionals`; Professions adds 13th headline; 5-star only — no review count in copy). Segment counts only where stated (70+ therapists/counselors; 50+ physicians). Foreign Qual: no `→` (SYMBOLS PROHIBITED). Enable 01/02 after conversion flip; 03 after Gate 1.

### 4.2 Copy library (headlines ≤30 chars, descriptions ≤90 — trim in-editor)

**Headlines:**
1. NY PLLC Formation – $885 Flat
2. Everything Included. One Fee
3. NYSED & DOS Filing Handled
4. Publication Included
5. EIN & Operating Agreement Inc
6. Registered Agent Yr 1 Free
7. Thousands of NY Entities Formed
8. We Handle the NYSED Process
9. Done-For-You OP Packet
10. Rated 5 Stars on Google *(live on `01`/`02`; was Trustpilot in v2 draft — omitted Jul 9 AM, added Jul 9 PM)*
11. Flat Fee — No Hidden Costs
12. Start Your NY PLLC This Week
13. 120-Day Publication Managed
14. NY Professional Entity Pros
15. Licensed Pro? Form Your PLLC
16. Talk to a PLLC Specialist
17. Deficiency Handling Included
18. Built for NY Professionals
19. Your PLLC, Filed Right
20. S Corp Election Available

**Descriptions:**
1. Full-service NY PLLC formation: NYSED approval, DOS filing, publication, EIN & OA. $885 flat.
2. We prepare your NYSED packet, file with the DOS, and manage publication. One flat fee.
3. Specialists who only do New York professional entities. No hourly attorney fees.
4. Includes registered agent year one, EIN, operating agreement & certificate of publication.
5. NYSED deficiencies handled at no extra charge. Track every step, license to formation.
6. Flat $885 covers state fees, publication, EIN and your operating agreement. Start today.

### 4.3 Profession variants (therapist example — pattern for all ten groups)

**Headlines:** PLLC for NY Therapists—$885 · LCSW & LMHC PLLC Experts · NYSED OP Handled for You · Publication & EIN Included · Start Your Private Practice · Built for Private Practice
**Descriptions:** "PLLC formation for NY therapists: NYSED approval, DOS filing, publication & EIN. $885 flat." · "Join 70+ NY therapists and counselors who formed with us. Licensed-professional specialists."
(LCSW 27 + MHC 23 + NP-psych 23 = 73 → "70+" is honest. Pattern: swap the profession noun and cite the real segment count wherever it's ≥10 — physicians get "50+ NY physicians.")

### 4.4 Message-match and price policy

Ad price = landing page price = checkout price, always, same-day. The $985 price test from the broader growth plan **must not overlap a ladder step or a January window** — a mid-flight price change confounds both the CVR read and the marginal-CPA read. When any price test runs: update all price-mentioning headlines and price assets the same day, or pause them for the test duration.

---

## Part 5 — CRO workstream (inside the ads plan on purpose)

CVR feeds the bidder's confidence, confident bidding wins more auctions cheaper, and impression share rises — January 2026 is the proof: 14.5% CVR and 18.8% IS and $50 CPA arrived together. Every point of CVR is ad budget you don't have to spend.

### 5.1 Mobile fix spec (6.6% → target 9%+; 28% of spend converting at 57% of desktop)

- Speed budget: LCP <2.5s and INP <200ms on throttled 4G. Kill render-blocking scripts; compress the hero.
- Sticky bottom CTA bar on mobile: "Start My PLLC — $885" plus a tap-to-call link.
- Cut first-step friction: name / email / profession only, then hand off to Spiffy.
- Tap-to-call wired to the call asset's forwarding number so calls are measured (secondary conversion).
- Trust band above the fold: Google reviews (NYPLLC GBP **5★ / 6**) · "thousands formed" / site’s 25,000+ claim · flat-fee badge.

### 5.2 Test backlog (one at a time, ≥2 weeks or ≥100 conversions-worth of traffic each)

1. **Publication-cost anxiety killer:** a county-based publication cost explainer/calculator with "included in your $885" framing. Publication cost is the scariest unknown in this purchase.
2. **"Book a 15-minute call" secondary CTA** for fence-sitters (tracked as secondary conversion; watch whether call-bookers convert at higher rates and value calls accordingly).
3. **Abandoned-checkout email sequence** — you already have Stripe events and Gmail integration; trigger at 1h / 24h / 72h. Nearly free to build, pure recovery.
4. Profession-matched testimonials on each profession landing page.
5. Live chat or SMS widget, business hours only.

### 5.3 Discipline

The CRO change log and the ads change log are the same document. A landing-page change mid-bid-step destroys the marginal-CPA read — never overlap an LP test with a ladder step in the same two-week window.

---

## Part 6 — Other channels

### 6.1 Microsoft Ads clone (Weeks 6–8)

- Use **Microsoft Import from Google Ads**; import campaigns 01–03 only — *not* Discovery (broad match on Bing without your weekly mining cadence is just a leak). Set weekly auto-sync so keyword and negative changes propagate automatically.
- Install the UET tag; import Google conversions (or fire a duplicate webhook conversion).
- Budget $15–25/day total. Expect roughly 10–15% of Google's volume, frequently at 20–40% lower CPCs, skewing older and more professional.
- **The unique edge: LinkedIn profile targeting.** Bid-boost +10–20% on Industry = Medical Practice, Mental Health Care, Law Practice, Accounting, Architecture & Planning. A search-network feature Google cannot match, purpose-built for a professions business.
- Bidding: manual CPC at ~0.7× Google's CPCs until ≥15 conversions accumulate, then portfolio tCPA $90-equivalent.

### 6.2 Meta (existing retargeting — now on the books)

Confirmed running as of Jul 5. It compounds with this plan: every new Google click grows the retargeting pool. Housekeeping so it stays healthy and honest:

- Exclude purchasers (customer-list + pixel purchase event, 180-day window). Frequency cap ~2/day.
- Refresh creative quarterly: a testimonial cut, a publication-explainer, a "what's included" carousel.
- UTM-tag everything so CRM channel attribution stays clean.
- **Log Meta spend into the CRM AdSpend table monthly** along with the missing Google spend (per 0.3 item 2) so `calculate-true-net-profit.ts` is truthful again.
- Meta *prospecting* stays out of scope until search is fully captured — demand capture before demand creation.

---

## Part 7 — Operating cadence

### 7.1 Weekly SOP (~40 minutes, same day every week)

1. Search terms review — Discovery first, then all campaigns: promote converters/high-intent to exact in the right campaign (and negative them in Discovery); junk → shared lists; check nothing on the do-not-negative list got added.
2. Budget-lost IS = 0% everywhere (any nonzero value is either a raise-the-budget signal or a deliberate cap you can name).
3. 7-day and 28-day CPA vs. target; compute marginal CPA if inside a ladder step.
4. **The two thesis metrics:** Core Exact impression share, and rolling-30-day account conversions.
5. Pacing vs. monthly budget.
6. Tracking sanity: Google Ads conversions vs. CRM ad-attributed orders, ±10% on rolling 30 days.
7. Update the dashboard row and the change log.
8. Confirm Microsoft auto-sync ran (once live).
9. First week of each month: Auction Insights glance — new entrants, overlap shifts.
10. Screenshot IS/rank-lost monthly for the era table you already keep.

### 7.2 Monthly SOP (~60 minutes)

Settings audit against the 1.2 checklist (auto-apply creep check) · negative-list audit (did anything sneak in that could block buyers?) · QS components on the top 20 keywords vs. the July baseline · asset performance (replace "Low" performers) · era table update · **Meta + Google spend logged into the CRM AdSpend table** · seasonality log entry — this year builds the curve you don't yet have.

### 7.3 Dashboard spec

One row per week; given your stack, a nightly Google Ads API pull into the CRM beats a spreadsheet, but a sheet is fine to start:

`week | spend | impressions | clicks | conversions | conv value | CPA | ROAS | CVR | CPC | IS (Core Exact) | rank-lost (Core Exact) | mobile CVR | Bing spend/conv | Meta spend | changes made`

Sixteen columns, one row a week, and every future argument with yourself gets settled by data instead of memory.

### 7.4 Standing decision rules

- Account CPA >$130 for 3 consecutive weeks → freeze the ladder, revert the single most recent change, run a full search-terms audit. (January exception: >$150 for 10 days.)
- Any campaign >1.5× account CPA for 2 weeks (minimum 8 conversions) → surgery on that campaign — keywords, copy, LP — not a bid change.
- A new campaign with <5 conversions after 3 weeks → keyword and landing-page audit; do not raise bids to force it.
- One variable at a time; ≥14 days or ≥15 conversions before judgment.
- **Never delete. Pause.** Deletion is the only unrecoverable mistake in Google Ads, and it is the one thing this plan never does.

---

## Part 8 — Gates

| Gate | When | Pass criteria | On pass | On fail |
|---|---|---|---|---|
| **1** | End of week 4 (~Aug 15) | Core Exact ≥15 conv at ≤$110 **and** account ≥28 conv/30d at ≤$105 | Launch 03_ForeignQual; budgets +20% | Hold budgets; QS + search-term audit; re-check in 2 weeks |
| **2** | End of week 8 (~Sep 12) | Account ≥35 conv/30d at ≤$100 **and** Core Exact IS ≥35% | Demote old campaign → 04_Discovery (2.4); ladder step 1 | Old campaign keeps full budget; diagnose (usually exact-coverage gaps — mine Discovery and expand) before any demotion |
| **3** | Week 12 (~Oct 10) | ≥45 conv/30d · Core Exact IS ≥50% · marginal CPA ≤$160 | Bing clone live; budgets to Oct level; DSA/competitor tests unlocked | Optimize, don't scale |
| **4** | Dec 1 | 3 stable weeks at ≤$110 CPA; tracking sane | Freeze + surge protocol (3.5) | Enter January at whatever level is stable; surge budgets only, not targets |

Gates are permission slips, not deadlines. Missing a gate by two weeks costs almost nothing; scaling through a failed gate costs a learning-period spiral in your one proven season.

---

## Part 9 — Risk register

| Risk | Early signal | Mitigation |
|---|---|---|
| Conversion-data fragmentation across new campaigns | Campaigns stuck "learning" indefinitely | Single portfolio strategy; no splits until Core Exact alone >25 conv/mo |
| Learning-period whiplash (the era-table disease) | CPA spike after every change | One variable / 14-day rule; freeze windows; ≤15% bid moves |
| Cannibalization misread ("the old campaign got worse!") | Old campaign CPA drifts weeks 3–8 | Expected query migration — judge account-level only |
| Broad leak after demotion | Discovery serving on core terms | The exact-match negative fence (2.4); weekly check |
| Negative over-blocking | Converting query families vanish from search terms; eligible impressions collapse with no IS gain | Do-not-negative list; monthly negative audit |
| Double-counted conversions | Ads conversions > CRM ad-attributed orders | `transaction_id` dedup; weekly ±10% check |
| CPC inflation beyond model | CPC >$14 sustained with flat IS | Pause ladder; QS work; wait for January |
| Google auto-apply creep | Settings drift; mystery broad keywords appear | Auto-apply off; monthly settings audit |
| Seasonality surprise (first summer, first real December) | Unknown by definition | Log everything; judge against gates, never against a history you don't have |
| Publishing negatives clipping historical broad conversions | −1–3 conv/month vs. history when List E lands | Accepted cost of the no-publishing decision; noted so it isn't misdiagnosed |
| Channel concentration (Google ≈66% of orders) | — | Bing + Meta retargeting in-plan; SEO/B2B tracks outside this doc are the structural hedge |

---

## Part 10 — Calendar (week by week)

| Week of | Actions |
|---|---|
| Jul 6 | ✅ Phase 0: conversion audit + fixes (1.1) · settings checklist (1.2) · build negative lists A–E (1.3) · backfill CRM AdSpend · baseline exports (1.5) — **done Jul 8** |
| Jul 13 | ✅ Full asset build (1.4) — **done Jul 8** · ✅ draft `01` + `02` + `03` + RSAs — **done Jul 9** · ✅ portfolio tCPA $90 · ✅ conversion flip · ✅ attach 01/02 to portfolio · ✅ **enable `01_Core_Exact_NY`** — **done Jul 9 evening** · `02` stays PAUSED until ~Aug 3 |
| Jul 20 | Daily 10-min monitoring on Core Exact + Sales-Search-1 |
| Jul 27 | First formal weekly SOP · (02 already drafted Jul 9 — polish RSAs / prep enable) |
| Aug 3 | **Launch 02_Professions** |
| Aug 10 | Monitor · ✅ `03_ForeignQual` already drafted Jul 9 (PAUSED) — polish if needed · mobile LP work begins (5.1) |
| Aug 17 | **Gate 1** → launch 03_ForeignQual on pass |
| Aug 24 – Sep 6 | Accumulate data · abandoned-checkout emails ship · Microsoft Ads account created |
| Sep 7 | Gate 2 window opens |
| Sep 14 | On pass: **demote → 04_Discovery_Broad** · ladder step 1 ($100) |
| Sep 21 | Microsoft import + UET live (campaigns 01–03 only) |
| Sep 28 – Oct 5 | Observe step 1 (14d/15conv) · mobile LP ships → remove device modifier when 3.6 criteria met |
| Oct 10 | **Gate 3** → budgets up · ladder step 2 ($115) · optional DSA test |
| Oct 17 – Nov 14 | Step 3 if marginal holds · CRO test #2 · **last structural change Nov 14** |
| Nov 15 – Dec 1 | **FREEZE** (budgets and emergency negatives only) · Gate 4 on Dec 1 |
| Dec 26–28 | Surge budgets + target staged (3.5) |
| Jan 2–31 | Surge protocol, daily cadence |
| Feb 1–10 | Step-down 20–25%/week |
| Feb 15 | Full-season readout vs. this document → write v3 |

---

## Part 11 — Projection model

Google-attributed conversions only. Historical channel mix (0.3) implies total orders ≈ Google conversions ÷ 0.66 *if* the other channels hold share — retargeting scales with traffic, organic is independent — so treat that divisor as a soft cross-check, not physics.

| Month | Spend | Conservative | Base | Upside |
|---|---|---|---|---|
| Jul '26 | $3.0K | 27 | 31 | 35 |
| Aug | $3.9K | 32 | 39 | 46 |
| Sep | $4.7K | 36 | 46 | 56 |
| Oct | $5.7K | 42 | 54 | 68 |
| Nov | $5.9K | 44 | 56 | 72 |
| Dec | $5.9K | 40 | 52 | 68 |
| Jan '27 | $10.0K | 75 | 100 | 135 |
| Feb | $6.2K | 48 | 62 | 80 |
| **Jul–Feb total** | **~$45K** | **~344** | **~440** | **~560** |

Notes on reading this honestly:
- **December is a guess with one data point** (Dec '25: 31 conv, $94 CPA on the old structure). Professional-buyer holiday behavior is unproven; the conservative column reflects that.
- Base case ≈ $103 blended CPA against $536 contribution ≈ **5.2:1 before the recurring tail** (RA renewals, VM attach).
- These are scenario bands, not forecasts. The gates convert uncertainty into decisions; the two thesis metrics (0.5) tell you weekly which column you're living in.
- Lifetime baseline for context: the account has averaged ~26 conv/month. The base case exits 2026 at ~2× that and uses January to test ~4×.

---

## Part 12 — Open items needing your input or verification

1. **Spiffy thank-you `order`/`total` — RESOLVED (Jul 8 2026).** Custom thank-you + “Send order details through URL” passes full contracted value in cents and order id (see 1.1.2). **`gclid` capture + CRM storage (1.1.3) — SHIPPED (Jul 9 2026).** **Conversion flip (1.1.2) — DONE Jul 9** (tagged primary via API; page-load secondary via UI — `WEBPAGE_CODELESS` is API read-only). Enhanced Conversions on. **Offline conversion upload still deferred.**
2. **Per-keyword QS export — RESOLVED (Jul 5, from the API export).** Expected CTR is the drag: BELOW_AVERAGE on 83% of QS-scored spend (77% of impressions). Ad relevance is ABOVE_AVERAGE on 94% of spend; landing page experience is Average-or-better on 99.8%. QS priority therefore goes to Part 4 (copy, assets, tight match types) — Part 5 keeps its full CVR/mobile role but is not a QS emergency. Internal validation of the whole restructure: the account's QS-7+ keywords ran a **$54 CPA on 50 conversions** vs. **$101 on the QS-5/6 cluster**, yet received only ~6% of lifetime impressions. The rebuild's mechanical job is to route spend from the second group to the first.
3. **Auction Insights export** — who actually shows up against you, with overlap and outranking rates, for the baseline file.
4. **GA4 (or equivalent) with funnel events on nypllc.com?** Needed to instrument CVR for Part 5; if absent, installing it is a week-1 task.
5. **Meta retargeting inventory for the record:** monthly spend, audience definitions, creative age — for the 6.2 housekeeping pass and the CRM AdSpend backfill.
6. **$985 price test timing** (from the broader growth plan): schedule it into a window that doesn't overlap a ladder step or January (4.4). Recommended slot: late September, between Gates 2 and 3, or defer to February.
7. **Phase 1 launch — DONE Jul 9 2026 evening.** `01_Core_Exact_NY` **ENABLED** on portfolio; `02_Professions_NY` portfolio-attached **PAUSED** (enable ~Aug 3); `03` still Gate 1. Conversion flip done. **Still open:** Customer Match UI upload (1.2); enable Professions ~Aug 3; Foreign Qual after Gate 1.

---

*Version 2 · Jul 5, 2026 · Supersedes the chat-message plan of the same date. Changes from v1: seasonality claims corrected to data-supported facts only; publishing-only advertising removed everywhere and fenced with negative List E per owner decision; reconciliation items 1–2 resolved per owner (222 = Google-attributed orders; CRM AdSpend stale); Meta retargeting inventoried as an existing channel; full build-out of keyword lists, copy library, SOPs, gates, risk register, calendar, and projections.*

*Execution updates inlined Jul 8–9 2026 (Phase 0 done; Phase 1–2 drafts `01`/`02`/`03` PAUSED with 42 RSAs; portfolio on Sales-Search-1). Keep status notes in-section as work lands — do not rely only on external change logs.*
