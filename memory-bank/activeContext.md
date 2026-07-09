# Active Context

## Production state

NY PLLC marketing site (**www.nypllc.com**) is **live on Vercel**. Spiffy checkout, analytics funnel, profession pages, DIY guide, virtual-address pages, foreign-into-NY state pages, and B2B partner landing shipped.

## Current sprint

- **Google Ads Phase 0** — **conversion flip done Jul 9.** Tagged Purchase `7678072764` primary; page-load `7353506045` secondary. See [features/google-ads.md](features/google-ads.md) · [operating plan](../nypllc-google-ads-operating-plan.md)
- **Phase 1 live (Jul 9):** `01_Core_Exact_NY` **ENABLED** on portfolio tCPA $90. `02_Professions_NY` on portfolio but **PAUSED** (enable ~Aug 3). `03_ForeignQual_US` PAUSED, unattached (Gate 1). `Sales-Search-1` still ENABLED on same portfolio.
- Expand **foreign-into-NY** state page coverage beyond NJ/PA/FL/TX/CT as needed
- Ops fulfillment lives in **PLLC-CRM** (sibling repo) — not this codebase

## Next steps

1. Daily 10-min monitor on `01_Core_Exact_NY` + `Sales-Search-1`. Enable `02_Professions_NY` ~Aug 3 (already on portfolio). `03` after Gate 1.
2. **Parallel:** Customer Match UI upload; Auction Insights manual export; optional mobile LP (5.1)
3. More foreign state landings / partner / SEO when tasked
4. **Later (deferred):** offline conversion upload from CRM-stored click IDs

## Active decisions

- Canonical domain: **https://www.nypllc.com** only
- Payments: **Spiffy.co** embedded checkout (not Stripe on-site)
- Partner coupons: apply via referral capture + Spiffy ready hooks before/when embed mounts
- GA4 `purchase` fires on confirmation; **not** imported to Google Ads (avoid double-count)
- Google Ads primary: tagged Spiffy Purchase (`7678072764`, real `$` from `total=`); page-load secondary (`7353506045`)
- Ads volume claim: **thousands / 25,000+** NY entities (not “300+”); sitelinks only to real sitemap URLs
- Reviews: NYPLLC **GBP** only (not Trustpilot); live **5.0 / 6 reviews** (Jul 9 2026) — keep `BUSINESS_INFO.googleReviews` in sync
- Profession / foreign pages: formation/qualification scope only — do **not** over-claim board coordination
- Foreign checklists: customer-provided info only; we obtain standing/certified formation docs
- Publishing-only: no paid acquisition (negative List E)

## Watches

| Item | Link |
|------|------|
| (none active for Phase 0 flip) | — |

## Recent changes

📖 Full log: [session-history.md](../docs/session-history.md)

Latest (Jul 9 2026): **`01_Core_Exact_NY` ENABLED** + `01`/`02` attached to portfolio; `02` stays PAUSED; conversion flip done; §1.1.3 + Enhanced Conversions shipped. Earlier Jul 9: RSA Google-reviews headline; drafts + 42 RSAs; GBP 5★/6. Prior (Jul 8): Phase 0 settings/negatives/assets + baselines + CRM AdSpend backfill.

## Session start

Read [router.md](router.md) → core files + 1–2 `features/*.md` for the task.

## Patterns (pointers only)

Cross-cutting patterns → [systemPatterns.md](systemPatterns.md). Stack → [techContext.md](techContext.md).
