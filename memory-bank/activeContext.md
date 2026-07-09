# Active Context

## Production state

NY PLLC marketing site (**www.nypllc.com**) is **live on Vercel**. Spiffy checkout, analytics funnel, profession pages, DIY guide, virtual-address pages, foreign-into-NY state pages, and B2B partner landing shipped.

## Current sprint

- **Google Ads Phase 0** — mostly done; waiting on real order to verify tagged Purchase, then flip. See [features/google-ads.md](features/google-ads.md) · [operating plan](../nypllc-google-ads-operating-plan.md)
- **Phase 1–2 drafts (Jul 9):** `01_Core_Exact_NY` + `02_Professions_NY` + `03_ForeignQual_US` **PAUSED** (keywords + **42 RSAs**). Portfolio **`NYPLLC Search Portfolio`** ($90) on **`Sales-Search-1` only**. Do not enable 01/02 until conversion flip + portfolio attach; FQ also waits on Gate 1.
- Expand **foreign-into-NY** state page coverage beyond NJ/PA/FL/TX/CT as needed
- Ops fulfillment lives in **PLLC-CRM** (sibling repo) — not this codebase

## Next steps

1. **Blocked on go-live:** wait for Ads-attributed thank-you → confirm `Purchase (Spiffy thank-you value)` `$` under All conversions → **conversion flip** (tagged primary, page-load secondary)
2. After flip: attach `01`/`02` to portfolio; enable `01_Core_Exact_NY` per calendar; then `02`; `03` after Gate 1
3. **Parallel now (not blocked):** Customer Match UI upload (`Ads - customer-match-emails_crm_2026-07-08.csv`); Auction Insights manual export; optional mobile LP (5.1); optional Google-reviews RSA headline (locked claim: **5★ / 6 reviews**)
4. More foreign state landings / partner / SEO when tasked
5. **Later (deferred):** `gclid`/`wbraid`/`gbraid` → Spiffy checkout URL + CRM order storage for offline conversions — see operating plan §1.1.3 note (Jul 9 2026)

## Active decisions

- Canonical domain: **https://www.nypllc.com** only
- Payments: **Spiffy.co** embedded checkout (not Stripe on-site)
- Partner coupons: apply via referral capture + Spiffy ready hooks before/when embed mounts
- GA4 `purchase` fires on confirmation; **not** imported to Google Ads (avoid double-count)
- Google Ads bidding still on codeless page-load Purchase until flip; tagged secondary uses Spiffy `total=` (cents) + `order=`
- Ads volume claim: **thousands / 25,000+** NY entities (not “300+”); sitelinks only to real sitemap URLs
- Reviews: NYPLLC **GBP** only (not Trustpilot); live **5.0 / 6 reviews** (Jul 9 2026) — keep `BUSINESS_INFO.googleReviews` in sync
- Profession / foreign pages: formation/qualification scope only — do **not** over-claim board coordination
- Foreign checklists: customer-provided info only; we obtain standing/certified formation docs
- Publishing-only: no paid acquisition (negative List E)

## Watches

| Item | Link |
|------|------|
| Tagged Ads purchase verify → flip | [operating plan §1.1](../nypllc-google-ads-operating-plan.md) |

## Recent changes

📖 Full log: [session-history.md](../docs/session-history.md)

Latest (Jul 9 2026): Drafts PAUSED (`01`/`02`/`03`) + **42 RSAs**; site Trustpilot → GBP reviews (**5★ / 6**); portfolio on `Sales-Search-1` only. Prior (Jul 8): Phase 0 conversion wiring + settings/negatives/assets + baselines + CRM AdSpend backfill.

## Session start

Read [router.md](router.md) → core files + 1–2 `features/*.md` for the task.

## Patterns (pointers only)

Cross-cutting patterns → [systemPatterns.md](systemPatterns.md). Stack → [techContext.md](techContext.md).
