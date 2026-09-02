# SEO & Domain

## One-liner

Canonical **www.nypllc.com** with Next metadata API, JSON-LD, sitemap, and Vercel 301s from old domains.

## Status

**Live.** PROJ-016 SEO complete; domain consolidation done.

## Operating plan

📖 [NYPLLC SEO / Content Moat — Operating Plan v1](../../nypllc-seo-content-moat-plan.md) — organic growth engine: five content pillars, first-90-days editorial map, technical foundation, links/PR, AI-search positioning, gates S1–S3 (Jul 2026 → mid-2027). Companion to [Ads Plan v2](../../nypllc-google-ads-operating-plan.md) and [Revenue levers](../../nypllc-revenue-levers-plan.md) (shelf SKU pages, S Corp calculator). Coordinate profession-page edits with the ads change log; no publishing-only CTAs. **No publication-cost-by-county page/tool** — all formations publish in Rockland only (that's the cheap statewide package). AI-assisted ship-fast posture; no hour/day build estimates. Shipped moat pages: `/nysed-approval-times`, `/ny-pllc-cost`, `/how-long-to-form-a-pllc-in-ny`. OP deficiencies `#4` and PLLC vs LLC `#5` **built unpublished** (`web/src/unpublished/nysed-op-deficiencies/`, `web/src/unpublished/pllc-vs-llc/`; Vercel 404s both URLs). Do not add sitemap/footer until Sid launches.

## Commercial target set (measured Aug 4 2026)

GSC queries joined against paid search terms (2025-10-27 → 2026-08-02): **we rank position 20–45 on every commercial term.** 76% of paid spend ($6,032) goes to queries at **median organic position 32** — `pllc formation new york` #26.5 (~$1,686/yr), `ny pllc formation` #28.9 (~$1,507/yr), `pllc ny` #44.8. Organic = ~63 clicks/mo vs ~275 paid; 4,123 impressions/mo at 1.53% CTR. Only page-one organic presence is the brand name.

- Ranked work queue: [`seo-target-list-2026-08-04.md`](../../seo-target-list-2026-08-04.md) — regenerate with `seo_target_list.py`. **259 actionable** queries / 10,878 impr / ~$9,109yr, collapsing onto a few pages: `/` (113q, $7,984/yr — **88% of the value**, all near-identical intent variants), `/how-to-form-a-pllc-in-ny` (27q), `/virtual-address-services` (30q), `/foreign-pllc` (24q), profession pages (45q). Only 14 true content gaps, top one `ny pllc checklist`.
- **Plain LLC is out of scope — see [projectbrief.md](../projectbrief.md) § Scope boundary.** 74 queries / 1,720 impr / $331yr parked in a standing "Out of scope" section; `/order-llc` takes orders but is never ranked (sister company CheapNewYorkLLC owns that market). Includes the LLC-publication cluster. `seo_target_list.py` enforces this — don't "fix" it.
- **Two spend figures, different questions:** $6,032 = window cost of queries where we rank but rank badly (pos 11+, 76% of $7,897). $9,109/yr = annualised actionable target set, incl. queries with no organic presence at all. Neither is a savings estimate.
- This is the "20 tracked terms" that plan Part 7 / Gate S1 referenced but never defined. Baseline: median position 32. **Tracker file:** [`seo-rank-tracker.csv`](../../seo-rank-tracker.csv) · fill with [`seo_rank_tracker.py`](../../seo_rank_tracker.py) from a GSC Queries export.
- Open sequencing question: money-page optimisation sits at #11–15 in the Part 2 editorial map while carrying 76% of paid spend. Plan Part 1.5 recommends running it in parallel with the ★ data pieces, not queued behind them.
- **Caveat:** position 26→3 on commercial terms is 6–18 months against LegalZoom/Northwest and may not fully land. This is a prioritisation input, **not a paid-search exit plan** — do not cut ad spend on the strength of it.

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
