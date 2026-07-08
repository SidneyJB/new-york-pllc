# Session history (new-york-pllc)

Changelog extracted from legacy memory-bank dumps (Mar 2026 and earlier) plus remote June 2026 work folded in during router sharding. Prefer feature shards for current work; append here for session-level detail.

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
