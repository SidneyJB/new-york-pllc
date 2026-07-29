# Active Context

## Production state

NY PLLC marketing site (**www.nypllc.com**) is **live on Vercel**. Spiffy checkout, analytics funnel, profession pages, DIY guide, virtual-address pages, foreign-into-NY state pages, and B2B partner landing shipped.

## Current sprint

- **Google Ads Phase 0** — **conversion flip done Jul 9.** Tagged Purchase `7678072764` primary; page-load `7353506045` secondary. See [features/google-ads.md](features/google-ads.md) · [operating plan](../nypllc-google-ads-operating-plan.md)
- **Weekly SOP** — first formal §7.1 **done Jul 28** (due Jul 27): [WEEKLY-SOP.md](../ads-pull-2026-07-28-weekly-sop/WEEKLY-SOP.md) · [ads-weekly-dashboard.csv](../ads-weekly-dashboard.csv). 30d CPA **$96** / 16 conv; `01` IS ~53% / 0 conv; Ads↔CRM primary 9=9.
- **SEO / content moat** — [nypllc-seo-content-moat-plan.md](../nypllc-seo-content-moat-plan.md). Shipped: `/nysed-approval-times`, `/ny-pllc-cost`, `/how-long-to-form-a-pllc-in-ny` (Jul 22). Next editorial: OP deficiencies `#4`. See [features/seo-and-domain.md](features/seo-and-domain.md)
- **Phase 1 live (Jul 9):** `01_Core_Exact_NY` **ENABLED** on portfolio tCPA $90. `02_Professions_NY` on portfolio but **PAUSED** (enable ~Aug 3). `03_ForeignQual_US` PAUSED, unattached (Gate 1). `Sales-Search-1` still ENABLED on same portfolio.
- Expand **foreign-into-NY** state page coverage beyond NJ/PA/FL/TX/CT as needed
- Ops fulfillment lives in **PLLC-CRM** (sibling repo) — not this codebase

## Next steps

1. **Aug 3:** enable `02_Professions_NY` (RSA policy OK; Attorneys `APPROVED_LIMITED` accepted). Keep daily 10-min on `01` + Sales. `03` after Gate 1 (~Aug 17 — currently short on account 30d volume + `01` convs).
2. **Parallel:** Customer Match UI upload; Auction Insights manual export (1st week of Aug)
3. **Mobile LP (§5.1) remaining:** first-step friction cut (lead form → Spiffy); optional Ads call-forwarding number on sticky Call (today uses `APP_CONFIG.phone`). **Shipped Jul 12:** LCP speed budget; sticky CTA + Call; mobile trust band; hero CTA alone/full-width. Remove mobile −20% only after mobile CVR ≥80% of desktop (30d) — still ~29% of desktop
4. More foreign state landings / partner / SEO when tasked
5. **Later (deferred):** offline conversion upload from CRM-stored click IDs

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
| `01` Formation-Core RSAs `APPROVED_LIMITED` (gov docs policy) | [google-ads.md](features/google-ads.md) |
| Deferred: exact-neg `[form pllc new york]` on Sales until `01` delivers | [google_ads_changes.md](../google_ads_changes.md) |
| Gate 1 (~Aug 17): need `01` ≥15 conv + account ≥28/30d — currently 0 / 16 | [operating plan](../nypllc-google-ads-operating-plan.md) |

## Recent changes

📖 Full log: [session-history.md](../docs/session-history.md)

Latest (Jul 28 2026): First formal weekly Ads SOP (§7.1). Earlier (Jul 12): §5.1 mobile UX — sticky bottom CTA + Call, hero trust band, full-width hero CTA (dropped broken How-it-works). Same day: LCP speed budget (lab &lt;2.5s). Earlier (Jul 11): foreign qual formula pricing + search-term mining. Earlier (Jul 9): gap fixes; launch hygiene; `01` ENABLED; conversion flip.

## Session start

Read [router.md](router.md) → core files + 1–2 `features/*.md` for the task.

## Patterns (pointers only)

Cross-cutting patterns → [systemPatterns.md](systemPatterns.md). Stack → [techContext.md](techContext.md).
