# Google Ads

## One-liner

Google Ads API CLI, CSV exports, and analysis scripts for NYPLLC acquisition (lives in this website repo).

## Status

**Active.** Tooling + dumps at repo root; Cursor skill `.cursor/skills/google-ads-cli/`.

## Operating plan

📖 [NYPLLC Google Ads Operating Plan v2](../../nypllc-google-ads-operating-plan.md) — account strategy, Phase 0 conversion architecture, campaign rebuild, gates, SOPs (Jul 2026 → Feb 2027). **Keep execution status inlined in the plan** as work lands (same pattern as Phase 0 “Done Jul 8” notes). Companion plans: [SEO / content moat](../../nypllc-seo-content-moat-plan.md) · [Revenue levers](../../nypllc-revenue-levers-plan.md) ($985 test slotting §4.4).

## Key paths

- Package: `google_ads/` (`client.py`, `reports.py`, `pull.py`, `export.py`, `upload_campaigns.py`, `upload_rsas.py`, `check_keyword_policy.py`)
- CLI: `google_ads_cli.py`, `google_ads_pull.py`, `google_ads_auth.py`
- Analysis: `ads_analysis.py`, `apr23_*.py`
- Data: `Ads - *.csv`, `ads-notes-*.md`, `google_ads_changes*.md`, `apr 23 ads reports/`, `baseline-2026-07-08/`
- Phase 1–2 drafts: `google-ads-campaign-build/` (`manifest.json`, CSVs, `policy-check.json`, `upload-result.json`, `rsas/`)
- Deps: `requirements-ads.txt` (separate from Next.js `web/` package)

## Setup

```bash
cd new-york-pllc
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements-ads.txt
# .env with GOOGLE_ADS_* (see .env.example); OAuth as contact@nypllc.com
.venv/bin/python google_ads_cli.py account
```

## Gotchas

- Secrets: never commit `.env` or `client_secret*.json`
- Auction insights may need manual export (`Ads - auction-insights_MANUAL_REQUIRED.md`)
- CRM Finances “ad spend” projections are separate (PLLC-CRM) — this repo owns campaign/keyword ops data
- Spiffy thank-you URL `total=` is **full contracted order value in cents** (including payment plans) — see operating plan §1.1.2
- **Conversion flip done Jul 9 2026:** tagged Purchase `7678072764` (`WEBPAGE`) **primary**; page-load `7353506045` (`WEBPAGE_CODELESS`) **secondary**. Codeless actions are API read-only — demote page-load in UI only ([read-only types](https://developers.google.com/google-ads/api/docs/conversions/categories)).
- **§1.1.3 capture live (Jul 9 2026):** site `click-attribution/` cookie (90d) → `buildSpiffyCheckoutUrl` appends `gclid`/`wbraid`/`gbraid`/UTMs (PLLC + LLC embeds); thank-you Enhanced Conversions via hashed email in `google-ads.ts`. CRM `Order` columns + `extractSpiffyOrderAttribution` on both Spiffy webhooks. **Still deferred:** offline conversion upload. Customer data terms accepted + Enhanced Conversions on (Jul 9).
- Phase 0 §1.2 applied Jul 8 2026 on Sales-Search-1: Presence geo, Partners/Display off, observation audiences, auto-apply subs PAUSED — see operating plan
- Phase 0 §1.3 shared negatives A–E attached to Sales-Search-1 Jul 8 2026; A-FQ ready for Foreign Qual — see operating plan §1.3 table
- **🔴 Stop-word negative incident (Aug 4 2026) — the root cause of the conversion collapse.** Lists A/A-FQ were built per spec as "state name + abbreviation, phrase match." Two-letter abbreviations are English words: phrase-negative `in` (Indiana) blocked *every query containing "in"*, plus `or` (Oregon) and `me` (Maine). Self-blocked our own keywords — 14/44 on `01` (why it had 0 conversions), 21/33 on `03`, 9/40 on Sales. Eligible auction volume (`impressions ÷ IS`) on Sales fell 12,030 → 576 per week while budget stayed $500/day and budget-lost IS stayed 0%; IS *rose* to 21% because the pool shrank. **Fixed:** 50 removed from A (→53), 44 from A-FQ (→45); Sales geo reverted `PRESENCE` → `PRESENCE_OR_INTEREST`; verified 0 self-blocked across all 4 campaigns. **Never phrase-negative a common English word or a token under 3 chars.** June's separate eligible-volume drop is still unexplained (needs UI change log; API keeps only 30d).
- **Diagnostic rule:** impression share hides exclusion damage — shrinking the eligible pool makes IS go *up*. Track `impressions ÷ search_impression_share` weekly, **per campaign only** (each campaign's IS is over a different auction set, so cross-campaign sums are approximations; the Aug 4 incident was diagnosed on `Sales-Search-1` alone). Under Target CPA, budget-lost IS is near-useless as a constraint signal (throttling shows as rank-lost).
- **Incrementality is unproven (§0.6, Aug 4 2026).** Ads clicks −47% Apr→Jul (320→169) with orders −4% (49→47); monthly clicks-vs-orders **r = 0.06**; orders per 100 clicks rose 8.1 (Nov) → 27.8 (Jul). Of 42 orders since click-ID capture went live Jul 9: **31% Google click ID · 12% other UTM (all `chatgpt.com`) · 57% untagged**. Untagged ≠ organic — it also holds direct, WOM, referrals, and lost click IDs. **Correction:** an earlier claim that brand search cannibalised ~50% of ad conversions was wrong — brand is one query (`nypllc`), **$529 of ~$21k lifetime spend**, flat at 3–4 conv/mo; its share only rose because generic collapsed. Don't build a brand campaign for $529. Caveats: n is small, no attribution before Jul 9, purchase lag means the incident's damage may not have landed yet.
- **Cannibalization MEASURED Aug 4 2026 — it's ~zero.** GSC (2025-10-27→2026-08-02, 954 queries) joined to paid terms over the same window: **non-brand cannibalization = $30 of $7,897 (0.38%)**. Only real overlap is the brand term `nypllc` ($504, 6.4%). **We rank position 20–45 for every commercial term** (`pllc formation new york` 26.5 · `ny pllc formation` 28.9 · `pllc new york` 35.9 · `pllc ny` 44.8), and **76% of paid spend ($6,032) goes to queries at median organic position 32**. Organic delivers only ~63 clicks/month vs ~275 paid; 4,123 organic impr/month at 1.53% CTR. → "ads eat organic" is dead; paid is additive on commercial terms. Data: `gsc/Queries_2025-10-27_to_2026-08-02.csv`, output `cannibalization-2026-08-04.csv`.
- **That same table is the SEO target list** — ranked by what we currently pay Google for traffic we could rank for free. Validates the SEO plan's premise with real spend numbers.
- **Tools:** `ads_incrementality.py` — `cannibalization` (joins a manual GSC Queries export vs paid search terms; `--gsc-start/--gsc-end` warn on window mismatch) and `recovery` (**per-campaign** eligible volume + CRM attribution split; `--account-only` for the rollup). CRM side: `PLLC-CRM/crm/scripts/orders-attribution.ts`.
- **CRM order-count gotchas** (cost us a wrong number once): use `Order.orderCreatedAt` (Spiffy checkout time), **not** `createdAt` (CRM record creation) — they shift orders across month boundaries. Exclude `isVmOnly` and `[TEST]` records. And beware the Prisma null trap: `NOT: [{ referral: { startsWith: 'TEST' } }]` silently drops every row where `referral` is NULL (~94% of orders) — use `OR: [{ referral: null }, { referral: { not: { startsWith: 'TEST' } } }]`.
- **`chatgpt.com` is an emerging channel** — 5 of 43 orders since Jul 9, unbid and unmanaged. Worth watching.
- §1.4 assets: sitelinks must use real sitemap URLs only; volume claim is **thousands / 25,000+**, not 300+ — see operating plan §1.4
- §1.4 applied Jul 8 2026 on Sales-Search-1 (add sitelinks, fix About/snippet/price, trim generic callouts; kept strong performers)
- §1.5 baseline exports in `baseline-2026-07-08/` (Auction Insights still manual)
- Phase 1–2: `01_Core_Exact_NY` **ENABLED** Jul 9; **`02_Professions_NY` ENABLED Aug 4** (portfolio tCPA $90, $25/day); `03_ForeignQual_US` PAUSED unattached (Gate 1)
- Launch hygiene (Jul 9): mobile −20% on Sales/01/02/03; Start Your Order / FAQ / Contact sitelinks → `www.nypllc.com`; observation audiences + 24 campaign assets linked onto `01` (from Sales)
- Gap fixes (Jul 9): Observation `bid_only` on 01/02/03; audiences+full assets on 02/03; Sales RSA final URLs → www; sitelink `Start Your Order — $885` + unlinked Get Started; secondary `Begin checkout` `7678925960` + `Phone call 60s+` `7678925963` (call reporting linked); site fires Begin checkout on Spiffy detect
- Search-term mining (Jul 11): `[form pllc new york]` exact → `01` Formation-Core; `"windsor corporate services"` phrase → List C (`12146898706`). **Deferred:** exact-neg that term on `Sales-Search-1` until `01` proves delivery. Pull: `ads-pull-2026-07-11/`
- Daily junk (Jul 22): List C +7 phrases (`llc availability`, `llc name availability`, `check llc`, `blumberg`, `usa corp`, `corporate book`, `corporate seal`). Pull: `ads-pull-2026-07-22/`
- First weekly SOP (Jul 28, due Jul 27): `[nys pllc formation]` exact → `01` Formation-Core; List C +`pllc name availability` +`check llc availability` (27 members). Writeup: `ads-pull-2026-07-28-weekly-sop/WEEKLY-SOP.md`
- Weekly SOP (Aug 4): `[pllc new york formation]` exact → `01` Formation-Core; `02` ENABLED. 7d CPA $91 / 30d CPA $118 / 11 conv; Ads Spiffy 10 vs CRM 13 (+30%). Writeup: `ads-pull-2026-08-04-weekly-sop/WEEKLY-SOP.md` · `ads-weekly-dashboard.csv`
- Weekly SOP (Aug 14, due Aug 10): `[create pllc]` exact → `01` Formation-Core. **`01` first 2 purchases.** 7d CPA $97 / 5 conv; 30d CPA $112 / 14 conv; Ads Spiffy 14 vs CRM 19 (+36%); self-block 0; Gate 1 hold. Writeup: `ads-pull-2026-08-14-weekly-sop/WEEKLY-SOP.md`
- Weekly SOP (Aug 19, due Aug 17): `[form a pllc]` exact → `01` Formation-Core. 7d CPA $373 / 1 conv; 30d CPA $123 / 13 conv; Ads Spiffy 13 vs CRM 18 (+38%); self-block 0; **Gate 1 fail / hold**. `02` Attorneys RSAs DISAPPROVED. Writeup: `ads-pull-2026-08-19-weekly-sop/WEEKLY-SOP.md`
- `run_query` gotcha (fixed Aug 4): it returned a stream while dropping the service reference, so the gRPC channel got collected mid-iteration → `CANCELLED "Channel deallocated!"`. It aborted a mutation halfway. Now a generator that holds the service.
- Policy note (Jul 11): Formation-Core + Attorneys RSAs `APPROVED_LIMITED` (`GOVERNMENT_DOCUMENTS_AND_OFFICIAL_SERVICES`); Sales LCSW/PT/MHC ads still `REVIEW_IN_PROGRESS`
- **Attorneys RSA rewrite (Aug 14):** controlled DISAPPROVED (same gov-docs policy). NYSED/OP copy was wrong for `/professions/law`. Replaced both Attorneys RSAs with Rule 7.5 / attorney-only ownership (`820969348495` / `820969348510`). **Aug 17 daily:** still DISAPPROVED (`GOVERNMENT_DOCUMENTS_AND_OFFICIAL_SERVICES` / `FULLY_LIMITED`). `upload_rsas.py` gained `--ad-groups`.
- Daily SOP (Aug 17): 7d CPA $119 / 4 conv; 30d CPA $123 / 13 conv; Aug MTD $94 / 11; Sales eligible ~3.4k; no List C adds. Writeup: `ads-pull-2026-08-17-daily-sop/DAILY-SOP.md`
- Conversion goals (Jul 11): account `BEGIN_CHECKOUT`/`WEBSITE` → `biddable=False` (was true; caused “missing primary” UI warning). Matches §1.1.1 observation-only. Purchase still sole biddable website goal.
- `03_ForeignQual_US`: US Presence · $15/day · negatives **A-FQ + B–E** · 6 AGs / 33 kws / 12 RSAs (`campaigns/24012757620`)
- Portfolio **`NYPLLC Search Portfolio`** (`12148056412`) Target CPA $90 — on **`Sales-Search-1`** + **`01`** + **`02`** (all ENABLED)
- Health-policy keywords (`lcsw`, mental health, psychiatric NP, physical therapy): create via API with `exempt_policy_violation_keys` (validate with `check_keyword_policy.py`)
- RSA gotcha: Unicode `→` is SYMBOLS **PROHIBITED** — use ASCII `-`
- Reviews: site uses NYPLLC GBP (`BUSINESS_INFO.googleBusinessProfileUrl`); AggregateRating from `BUSINESS_INFO.googleReviews` = **5.0 / 6** (live GBP Jul 9 2026). RSAs use **`Rated 5 Stars on Google`** on `01`/`02` (5-star only — no review count in ad copy); keep schema in sync when GBP changes

## Docs

Cursor skill: `.cursor/skills/google-ads-cli/SKILL.md`
