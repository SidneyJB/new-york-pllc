# Active Context

## Production state

NY PLLC marketing site (**www.nypllc.com**) is **live on Vercel**. Spiffy checkout, analytics funnel, profession pages, DIY guide, virtual-address pages, foreign-into-NY state pages, and B2B partner landing shipped.

## Current sprint

- **Google Ads Phase 0** (operating plan v2) — mostly done; waiting on real order to verify tagged Purchase, then flip primary/secondary. See [features/google-ads.md](features/google-ads.md) · [operating plan](../nypllc-google-ads-operating-plan.md)
- Expand **foreign-into-NY** state page coverage beyond NJ/PA/FL/TX/CT as needed
- Ops fulfillment lives in **PLLC-CRM** (sibling repo) — not this codebase

## Next steps

1. After next **Ads-attributed** thank-you: confirm Ads **All conversions** for `Purchase (Spiffy thank-you value)` with correct `$` → flip tagged → primary, page-load → secondary
2. Customer Match CSV UI upload (`Ads - customer-match-emails_crm_2026-07-08.csv`) after flip
3. Then Phase 1: portfolio tCPA + `01_Core_Exact_NY` per operating plan calendar/gates
4. More foreign state landings / partner / SEO when tasked
5. **Later (deferred):** `gclid`/`wbraid`/`gbraid` → Spiffy checkout URL + CRM order storage for offline conversions — see operating plan §1.1.3 note (Jul 9 2026)

## Active decisions

- Canonical domain: **https://www.nypllc.com** only
- Payments: **Spiffy.co** embedded checkout (not Stripe on-site)
- Partner coupons: apply via referral capture + Spiffy ready hooks before/when embed mounts
- GA4 `purchase` fires on confirmation; **not** imported to Google Ads (avoid double-count)
- Google Ads bidding still on codeless page-load Purchase until flip; tagged secondary uses Spiffy `total=` (cents) + `order=`
- Ads volume claim: **thousands / 25,000+** NY entities (not “300+”); sitelinks only to real sitemap URLs
- Profession / foreign pages: formation/qualification scope only — do **not** over-claim board coordination
- Foreign checklists: customer-provided info only; we obtain standing/certified formation docs
- Publishing-only: no paid acquisition (negative List E)

## Watches

| Item | Link |
|------|------|
| Tagged Ads purchase verify → flip | [operating plan §1.1](../nypllc-google-ads-operating-plan.md) |

## Recent changes

📖 Full log: [session-history.md](../docs/session-history.md)

Latest (Jul 8 2026): Ads Phase 0 — conversion value wiring + secondary tagged action; settings/negatives/assets; baselines in `baseline-2026-07-08/`; CRM Google AdSpend backfill. Prior: foreign-into-NY + partners + profession pages + GA4 purchase + DIY/VA + domain consolidation.

## Session start

Read [router.md](router.md) → core files + 1–2 `features/*.md` for the task.

## Patterns (pointers only)

Cross-cutting patterns → [systemPatterns.md](systemPatterns.md). Stack → [techContext.md](techContext.md).
