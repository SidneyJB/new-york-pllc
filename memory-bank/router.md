# Memory Bank Router

## When the user says "read memory bank"

Read **only** these three files — then stop and summarize:

1. [router.md](router.md) (this file)
2. [projectbrief.md](projectbrief.md)
3. [activeContext.md](activeContext.md)

Do **not** read `productContext.md`, `systemPatterns.md`, `techContext.md`, or `progress.md` unless the user's next message needs them.

Do **not** read any `features/`, `watches/`, or `ops-checklists/` files unless a **specific task** matches the tables below.

Listing shard filenames (e.g. via glob) is optional; reading their contents is not.

## Always read (every session / task)

| File | Why |
|------|-----|
| [projectbrief.md](projectbrief.md) | Scope, pricing, constraints |
| [activeContext.md](activeContext.md) | Current sprint, next steps, watches |

## Read when relevant

| Task keywords | Read |
|---------------|------|
| Analytics, Vercel track, GA4, purchase, scroll depth, UTM, Bing UET | [features/analytics-tracking.md](features/analytics-tracking.md) |
| Spiffy, checkout, order page, payment form, engagement | [features/spiffy-checkout.md](features/spiffy-checkout.md) |
| SEO, metadata, sitemap, canonical, domain, www.nypllc.com, content moat, organic, GSC, Search Console, rank tracking, target list, cannibalization | [features/seo-and-domain.md](features/seo-and-domain.md) → [SEO content moat plan](../nypllc-seo-content-moat-plan.md) + [target list](../seo-target-list-2026-08-04.md) |
| Plain LLC, `/order-llc`, CheapNewYorkLLC, sister company, LLC publication | **[projectbrief.md](projectbrief.md) § Scope boundary — out of scope, do not pursue** |
| MSO, MSA, management LLC, management services, PLLC + LLC pair, Jonah, $1770 bundle | [features/mso-msa.md](features/mso-msa.md) → [CRM ops](../../PLLC-CRM/memory-bank/features/mso-msa.md) · [expansion-next-steps.md](expansion-next-steps.md) |
| Profession page, dentist, CPA, veterinarian, NYSED profession | [features/profession-pages.md](features/profession-pages.md) |
| Foreign, foreign-into-NY, qualify into NY, /foreign-pllc | [features/foreign-into-ny.md](features/foreign-into-ny.md) |
| Partner, B2B, referral, coupon, /partners, ?c= | [features/partner-referral.md](features/partner-referral.md) |
| Virtual address, mail forwarding, 1583, VA services page | [features/virtual-address-pages.md](features/virtual-address-pages.md) |
| DIY guide, how-to-form-a-pllc | [features/diy-guide.md](features/diy-guide.md) |
| Tailwind, CSS variables, dark mode, globals.css, design system | [features/tailwind-v4.md](features/tailwind-v4.md) |
| Google Ads, campaigns, keywords, auction insights, ad spend, GAQL, operating plan, tCPA, Phase 0 | [features/google-ads.md](features/google-ads.md) → [operating plan](../nypllc-google-ads-operating-plan.md) |
| Revenue levers, shelf SKU, banking affiliate, payroll affiliate, Mercury, Relay, Gusto, ADP, S Corp calculator, $985 price test, RA renewal disclosure, Compliance Plan, AOV, checkout bump, Practice Launch bundle | [features/revenue-levers.md](features/revenue-levers.md) → [revenue levers plan](../nypllc-revenue-levers-plan.md) + [affiliate partners](../docs/affiliate-partners.md) |
| CAQH pilot, credentialing intake, Spiffy CAQH SKU | [caqh-pilot-launch.md](../../PLLC-CRM/crm/docs/caqh-pilot-launch.md) · outreach [formed-along](../../PLLC-CRM/crm/docs/credentialing-caqh-pilot-outreach-formed-along.md) · [already-formed](../../PLLC-CRM/crm/docs/credentialing-caqh-pilot-outreach-already-formed.md) · [CRM caqh shard](../../PLLC-CRM/memory-bank/features/caqh-credentialing.md) |
| Expansion priorities, next expansion steps, growth calendar, what's next after Jul 6, Sep–Jan roadmap, B2B paused, CAQH #1, MSO page | [expansion-next-steps.md](expansion-next-steps.md) |

## Optional context

| When | Read |
|------|------|
| UX goals, ICP, journey | [productContext.md](productContext.md) |
| Architecture, page map, patterns | [systemPatterns.md](systemPatterns.md) |
| Stack, env, deployment | [techContext.md](techContext.md) |
| Backlog, production status | [progress.md](progress.md) |

## Watches & ops

| Topic | Read |
|-------|------|
| (none yet) | — |

## Deep reference (not memory bank)

📖 [Session history](../docs/session-history.md) · [Analytics reference](../docs/analytics-tracking.md) · [Spiffy checkout](../docs/spiffy-checkout.md) · [SEO & domain](../docs/seo-and-domain.md) · [Tailwind v4](../docs/tailwind-v4.md) · [Google Ads operating plan](../nypllc-google-ads-operating-plan.md) · [SEO / content moat plan](../nypllc-seo-content-moat-plan.md) · [Revenue levers plan](../nypllc-revenue-levers-plan.md) · [Affiliate partners](../docs/affiliate-partners.md) · [Expansion next steps](expansion-next-steps.md) · [MSO path](features/mso-msa.md) · [MSO packet](../docs/business-ideas-ny-mso-msa-synthesis.md)

## Measurement tooling (repo root)

| Tool | What it does |
|------|--------------|
| [`seo_target_list.py`](../seo_target_list.py) → [`seo-target-list-2026-08-04.md`](../seo-target-list-2026-08-04.md) | Ranked SEO work queue from GSC + paid terms. **Enforces the plain-LLC scope exclusion.** |
| [`ads_incrementality.py`](../ads_incrementality.py) | `cannibalization` (GSC × paid overlap) and `recovery` (weekly delivery vs CRM attribution) |
| `PLLC-CRM/crm/scripts/orders-attribution.ts` | CRM orders by attribution channel, weekly/monthly |

GSC exports live in `gsc/`. Both tools take a manual Search Console Queries export — see the [google-ads-cli skill](../.cursor/skills/google-ads-cli/SKILL.md).
