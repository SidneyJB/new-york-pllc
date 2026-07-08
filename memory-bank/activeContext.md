# Active Context

## Production state

NY PLLC marketing site (**www.nypllc.com**) is **live on Vercel**. Spiffy checkout, analytics funnel, profession pages, DIY guide, virtual-address pages, foreign-into-NY state pages, and B2B partner landing shipped.

## Current sprint

- Expand **foreign-into-NY** state page coverage beyond NJ/PA/FL/TX/CT as needed
- Monitor conversion/SEO on `/foreign-pllc/{state}`
- Ops fulfillment lives in **PLLC-CRM** (sibling repo) — not this codebase

## Next steps

1. More foreign state landings when demand warrants — [features/foreign-into-ny.md](features/foreign-into-ny.md)
2. Partner referral / coupon checkout changes — [features/partner-referral.md](features/partner-referral.md) + [features/spiffy-checkout.md](features/spiffy-checkout.md)
3. Growth SEO/backlinks (`seo-backlink-strategy.md` at repo root) if tasked

## Active decisions

- Canonical domain: **https://www.nypllc.com** only
- Payments: **Spiffy.co** embedded checkout (not Stripe on-site)
- Partner coupons: apply via referral capture + Spiffy ready hooks before/when embed mounts
- GA4 `purchase` fires on confirmation; **not** imported to Google Ads (avoid double-count)
- Profession / foreign pages: formation/qualification scope only — do **not** over-claim board coordination
- Foreign checklists: customer-provided info only; we obtain standing/certified formation docs

## Watches

| Item | Link |
|------|------|
| (none yet) | — |

## Recent changes

📖 Full log: [session-history.md](../docs/session-history.md)

Latest (through June 2026): foreign-into-NY state pages + selector; VA/RA cross-sell on foreign pages; B2B `/partners` + intake; partner coupon attribution on checkout; five profession pages; GA4 purchase; DIY + VA pages; domain consolidation.

## Session start

Read [router.md](router.md) → core files + 1–2 `features/*.md` for the task.

## Patterns (pointers only)

Cross-cutting patterns → [systemPatterns.md](systemPatterns.md). Stack → [techContext.md](techContext.md).
