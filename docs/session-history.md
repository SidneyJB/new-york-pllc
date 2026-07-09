# Session history (new-york-pllc)

Changelog extracted from legacy memory-bank dumps (Mar 2026 and earlier) plus remote June 2026 work folded in during router sharding. Prefer feature shards for current work; append here for session-level detail.

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
- Still waiting: Ads-attributed thank-you → conversion flip; attach 01/02 + enable; FQ after Gate 1

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
