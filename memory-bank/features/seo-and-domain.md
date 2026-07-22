# SEO & Domain

## One-liner

Canonical **www.nypllc.com** with Next metadata API, JSON-LD, sitemap, and Vercel 301s from old domains.

## Status

**Live.** PROJ-016 SEO complete; domain consolidation done.

## Operating plan

📖 [NYPLLC SEO / Content Moat — Operating Plan v1](../../nypllc-seo-content-moat-plan.md) — organic growth engine: five content pillars, first-90-days editorial map, technical foundation, links/PR, AI-search positioning, gates S1–S3 (Jul 2026 → mid-2027). Companion to [Ads Plan v2](../../nypllc-google-ads-operating-plan.md). Coordinate profession-page edits with the ads change log; no publishing-only CTAs. **No publication-cost-by-county page/tool** — all formations publish in Rockland only (that's the cheap statewide package). AI-assisted ship-fast posture; no hour/day build estimates. Shipped moat pages: `/nysed-approval-times`, `/ny-pllc-cost`, `/how-long-to-form-a-pllc-in-ny`.

## Key paths

- `web/src/lib/seo/config.ts` — hardcoded `siteUrl: 'https://www.nypllc.com'`
- `web/src/app/layout.tsx` — `metadataBase`, `alternates.canonical`
- Repo-root `vercel.json` — 301 redirects (`newyorkpllc.com` → www)
- Sitemap / robots / structured data under `web/`

## Gotchas

- Do not reintroduce env-var fallback for site URL
- Old domains must stay redirect-only in Vercel dashboard
- Reviews: link + schema use NYPLLC **Google Business Profile** (`BUSINESS_INFO.googleBusinessProfileUrl`) — not Trustpilot / not cheapnewyorkllc. Keep `googleReviews` (rating/count) in sync with live GBP (**5.0 / 6** as of Jul 9 2026)

## Docs

📖 [SEO & domain](../../docs/seo-and-domain.md) · [SEO / content moat plan](../../nypllc-seo-content-moat-plan.md) · [seo-backlink-strategy.md](../../seo-backlink-strategy.md)
