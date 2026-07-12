# Session history (new-york-pllc)

Changelog extracted from legacy memory-bank dumps (Mar 2026 and earlier) plus remote June 2026 work folded in during router sharding. Prefer feature shards for current work; append here for session-level detail.

## 2026-07-12 — Mobile LP speed budget (Ads §5.1 LCP)

- Lab baseline (mobile Slow 4G): `/` LCP ~10.6s, `/order` ~11.3s, how-to ~10.9s — ~94% render delay from third-party JS (Tawk / dual gtag / Meta / global Spiffy)
- Shipped: Tawk on first gesture; Meta + Bing `lazyOnload`; Spiffy script only on `/order` + `/order-llc`; idle-defer scroll/referral/click capture; drop unused JetBrains + Playfair `next/font`
- Shipped: merge Ads+GA4 into one gtag load (`lazyOnload`); `waitForGtag` before Purchase / Begin checkout / GA4 purchase
- Post-deploy lab (Slow 4G): `/` **2.4s**, `/order` **2.2s**, how-to **2.2s** (how-to 6.3s run was noise; re-run confirmed)
- §5.1 still open: sticky mobile CTA, first-step friction cut, tap-to-call, trust band; keep mobile −20% until CVR gate (§3.6)
- Commits: `347a4d4` (defer third parties) · `94ab32e` (merge/lazy gtag)

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
