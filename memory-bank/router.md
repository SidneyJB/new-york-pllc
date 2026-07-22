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
| SEO, metadata, sitemap, canonical, domain, www.nypllc.com, content moat, organic, GSC, Search Console | [features/seo-and-domain.md](features/seo-and-domain.md) → [SEO content moat plan](../nypllc-seo-content-moat-plan.md) |
| Profession page, dentist, CPA, veterinarian, NYSED profession | [features/profession-pages.md](features/profession-pages.md) |
| Foreign, foreign-into-NY, qualify into NY, /foreign-pllc | [features/foreign-into-ny.md](features/foreign-into-ny.md) |
| Partner, B2B, referral, coupon, /partners, ?c= | [features/partner-referral.md](features/partner-referral.md) |
| Virtual address, mail forwarding, 1583, VA services page | [features/virtual-address-pages.md](features/virtual-address-pages.md) |
| DIY guide, how-to-form-a-pllc | [features/diy-guide.md](features/diy-guide.md) |
| Tailwind, CSS variables, dark mode, globals.css, design system | [features/tailwind-v4.md](features/tailwind-v4.md) |
| Google Ads, campaigns, keywords, auction insights, ad spend, GAQL, operating plan, tCPA, Phase 0 | [features/google-ads.md](features/google-ads.md) → [operating plan](../nypllc-google-ads-operating-plan.md) |

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

📖 [Session history](../docs/session-history.md) · [Analytics reference](../docs/analytics-tracking.md) · [Spiffy checkout](../docs/spiffy-checkout.md) · [SEO & domain](../docs/seo-and-domain.md) · [Tailwind v4](../docs/tailwind-v4.md) · [Google Ads operating plan](../nypllc-google-ads-operating-plan.md) · [SEO / content moat plan](../nypllc-seo-content-moat-plan.md)
