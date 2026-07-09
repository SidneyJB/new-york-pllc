# Active Context

## Production state

NY PLLC marketing site (**www.nypllc.com**) is **live on Vercel**. Spiffy checkout, analytics funnel, profession pages, DIY guide, virtual-address pages, foreign-into-NY state pages, and B2B partner landing shipped.

## Current sprint

- **Google Ads Phase 0** — mostly done; waiting on real order to verify tagged Purchase, then flip. See [features/google-ads.md](features/google-ads.md) · [operating plan](../nypllc-google-ads-operating-plan.md)
- **Phase 1 draft (Jul 9):** `01_Core_Exact_NY` + `02_Professions_NY` **PAUSED** (keywords + **30 RSAs**). Portfolio **`NYPLLC Search Portfolio`** ($90) on **`Sales-Search-1` only**. Do not enable drafts until conversion flip + attach to portfolio.
- Expand **foreign-into-NY** state page coverage beyond NJ/PA/FL/TX/CT as needed
- Ops fulfillment lives in **PLLC-CRM** (sibling repo) — not this codebase

## Next steps

1. Phase 1 drafts **PAUSED** with keywords + **30 RSAs**; portfolio on `Sales-Search-1` — next: wait for Ads-attributed thank-you → **conversion flip**
2. After next **Ads-attributed** thank-you: confirm Ads **All conversions** for `Purchase (Spiffy thank-you value)` with correct `$` → flip tagged → primary, page-load → secondary
3. Customer Match CSV UI upload (`Ads - customer-match-emails_crm_2026-07-08.csv`) after flip
4. Then: attach drafts to portfolio; enable `01_Core_Exact_NY` per calendar
5. More foreign state landings / partner / SEO when tasked
6. **Later (deferred):** `gclid`/`wbraid`/`gbraid` → Spiffy checkout URL + CRM order storage for offline conversions — see operating plan §1.1.3 note (Jul 9 2026)

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

Latest (Jul 9 2026): Phase 1 drafts PAUSED (`01_Core_Exact_NY`, `02_Professions_NY`) with keywords + **30 RSAs uploaded**; health-keyword API exemptions; portfolio `NYPLLC Search Portfolio` ($90) on `Sales-Search-1` only; build package in `google-ads-campaign-build/`. Prior (Jul 8): Phase 0 conversion wiring + settings/negatives/assets + baselines + CRM AdSpend backfill.

## Session start

Read [router.md](router.md) → core files + 1–2 `features/*.md` for the task.

## Patterns (pointers only)

Cross-cutting patterns → [systemPatterns.md](systemPatterns.md). Stack → [techContext.md](techContext.md).
