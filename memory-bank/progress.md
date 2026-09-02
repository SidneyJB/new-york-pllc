# Progress

## Current status

**Overall**: Marketing site + checkout **deployed** (Vercel). Last major waves: foreign-into-NY + partners (June 2026); professions/GA4 (Mar 2026).

## What works

- Public pages: home, pricing, about, FAQ, contact, order, confirmation, legal
- DIY guide (`/how-to-form-a-pllc-in-ny`)
- Virtual address + mail-forwarding agreement pages
- Profession pages (19) with SEO + nav
- Foreign-into-NY hub + state pages (NJ, PA, FL, TX, CT) with selector, SEO, VA/RA cross-sell
- B2B `/partners` landing + intake form; partner coupon attribution on Spiffy checkout
- Spiffy checkout + Zapier email notifications
- Analytics: Vercel custom events, GA4 purchase, Bing UET, scroll depth
- Canonical domain enforcement (`www.nypllc.com`)

## What's left / backlog

- More foreign state landings as needed
- Static admin dashboard (orders still via Spiffy + CRM)
- Optional headless CMS for content
- Growth: backlinks / SEO campaigns (see repo-root strategy docs)
- **Expansion priorities (Sep 1):** CAQH follow-up sent; EXP close-out sent; affiliate third ping sent; ads recovery; 1 SEO/wk (OP deficiencies `#4`); MSO **unpublished**; B2B outreach paused — 📖 [expansion-next-steps.md](expansion-next-steps.md) · [mso-msa.md](features/mso-msa.md)
- **MSO path:** offer locked **$1,770** + counsel **$945** — [mso-msa.md](features/mso-msa.md). Packet/research — [synthesis](../docs/business-ideas-ny-mso-msa-synthesis.md). NYSED license filing + credentialing packet research still in [PLLC-CRM catalog](../../PLLC-CRM/business%20ideas.md)
- **Revenue levers (site):** Direct-RA live Aug 25; CAQH follow-up **Sep 1**; **Mercury + Gusto third ping Sep 1** (links not live); Spiffy checkbox live: **S Corp $195** (sales tax **off checkout Aug 18**); remaining DBA / CAQH Spiffy SKU, VM copy; **$985 deferred to Feb** — 📖 [revenue levers plan](../nypllc-revenue-levers-plan.md) · [caqh-pilot-launch.md](../../PLLC-CRM/crm/docs/caqh-pilot-launch.md)

## Known issues & risks

- License verification still operational (CRM), not automated on-site
- Static-site limits for any future on-site admin
- Legal/compliance complexity owned with counsel + CRM ops

## Success metrics (targets)

- Conversion 5% · satisfaction >4.5 · volume 25+/mo · turnaround ops-side

## Decisions log (summary)

Next.js App Router · Spiffy · SSG · Tailwind v4 · Vercel Analytics · Vitest · Vercel hosting · partner referral cookie/coupon rail · shared foreign state page module.

Open: CMS vs static content; when/if site needs more backend (fulfillment is CRM).

📖 Detail: [session-history.md](../docs/session-history.md) · feature shards under `features/`
