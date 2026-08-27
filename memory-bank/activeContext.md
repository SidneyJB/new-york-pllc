# Active Context

## Production state

NY PLLC marketing site (**www.nypllc.com**) is **live on Vercel**. Spiffy checkout, analytics funnel, profession pages, DIY guide, virtual-address pages, foreign-into-NY state pages, and B2B partner landing shipped.

## Current sprint

- **Google Ads Phase 0** — **conversion flip done Jul 9.** Tagged Purchase `7678072764` primary; page-load `7353506045` secondary. See [features/google-ads.md](features/google-ads.md) · [operating plan](../nypllc-google-ads-operating-plan.md)
- **🔴 Stop-word negative incident — found + fixed Aug 4.** Root cause of the conversion collapse: Lists A/A-FQ contained two-letter state abbreviations as **phrase** negatives, so `in` (Indiana) blocked every query containing "in" (also `or`, `me`). Self-blocked 14/44 of `01`'s keywords, 21/33 of `03`, 9/40 of Sales. Eligible auction volume on Sales fell 12,030 → 576/week with budget untouched at $500/day. Removed 94 abbreviations; reverted Sales geo to `PRESENCE_OR_INTEREST`; verified 0 self-blocked. See [google_ads_changes.md](../google_ads_changes.md).
- **Weekly SOP** — latest §7.1 **done Aug 26** (due Aug 24): [WEEKLY-SOP.md](../ads-pull-2026-08-26-weekly-sop/WEEKLY-SOP.md) · [ads-weekly-dashboard.csv](../ads-weekly-dashboard.csv). 7d CPA **$240** / 2 conv; 30d CPA **$111** / 17 conv; `01` still **2** purchases; Ads Spiffy 17 vs CRM 17 (**0%**); **Gate 1 fail / hold**. Attorneys RSA **v4** in review.
- **`02` Attorneys RSA rewrite v4 (Aug 26)** — v3 still DISAPPROVED (gov-docs). Uploaded no-law-practice copy (`822412227500` / `822340024756`). See [google_ads_changes.md](../google_ads_changes.md)
- **SEO / content moat** — [nypllc-seo-content-moat-plan.md](../nypllc-seo-content-moat-plan.md). Shipped: `/nysed-approval-times`, `/ny-pllc-cost`, `/how-long-to-form-a-pllc-in-ny` (Jul 22). Next editorial: OP deficiencies `#4`. See [features/seo-and-domain.md](features/seo-and-domain.md)
- **Revenue levers (website surface)** — [nypllc-revenue-levers-plan.md](../nypllc-revenue-levers-plan.md). **Direct-RA Lever 1 LIVE Aug 25** (`DIRECT_RA_NOTICES_LIVE` on CRM Production). **CAQH pilot** — Aaron declined (has CAQH); outreach Aug 25–26 to Esther, Jonathan, Shanel (no price in email; invoice on interest). **Mercury + Gusto Impact applied Aug 14** (waiting). Spiffy checkbox live: **S Corp $195**. Sales tax Certificate of Authority **removed from checkout Aug 18** (low take rate). Remaining: DBA, CAQH Spiffy SKU, VM copy, $985 prep (late Sep). Expedite SKU **removed Aug 17** (already in $885). See [features/revenue-levers.md](features/revenue-levers.md) · [CRM launch status](../../PLLC-CRM/crm/docs/direct-ra-launch-status.md) · [caqh-pilot-launch.md](../../PLLC-CRM/crm/docs/caqh-pilot-launch.md)
- **Phase 1 live:** `Sales-Search-1` + `01_Core_Exact_NY` (Jul 9) + **`02_Professions_NY` (ENABLED Aug 4)** on portfolio tCPA $90. `03_ForeignQual_US` PAUSED, unattached (Gate 1).
- Expand **foreign-into-NY** state page coverage beyond NJ/PA/FL/TX/CT as needed
- **Foreign publication copy (HARD — Aug 10 2026):** flat package **includes** end-to-end six-week publication. Never “guidance” / “not included unless quoted.” See [features/foreign-into-ny.md](features/foreign-into-ny.md).
- Ops fulfillment lives in **PLLC-CRM** (sibling repo) — not this codebase

## Expansion priorities (next 4 weeks)

📖 Full narrative + Sep–Jan calendar: [expansion-next-steps.md](expansion-next-steps.md) (updated Aug 26, 2026)

1. **CAQH pilots** — Aaron declined; awaiting Esther / Jonathan / Shanel; on interest → Stripe invoice $499 → intake → fulfill; Spiffy SKU after 2–3 deliveries (**PLLC-CRM**) · [caqh-pilot-launch.md](../../PLLC-CRM/crm/docs/caqh-pilot-launch.md)
2. **Direct-RA Lever 1 — LIVE (Aug 25)** — checkout disclosure **audited**; staff **$99 CoC** + Compliance Plan **$249** support paths confirmed. First T-30 ~Sep 22; first charges Oct ([CRM launch status](../../PLLC-CRM/crm/docs/direct-ra-launch-status.md))
3. **Close EXP Credentialing** by email — they're waiting (**PLLC-CRM**)
4. **Two affiliate links** — **Mercury + Gusto Impact applied Aug 14** (awaiting responses) — [affiliate-partners.md](../docs/affiliate-partners.md)
5. **Ads mostly hands-off** — recovery + daily SOP; verdict early Sep
6. **1 SEO piece/week** — next: OP deficiencies `#4`
7. **Big B2B outreach paused** — advocate side keeps running until CAQH + EXP + affiliates done

## Ads ops (maintenance — not expansion sprint)

1. Watch Aug 4 negative-fix recovery; re-baseline Gate 1 after a clean week
2. Daily 10-min on Sales + `01` + `02`; `03` after early-Sep verdict if Gate 1 passes
3. Open: 20-term rank tracker; Customer Match upload; Auction Insights export; June volume mystery (UI change log)
4. **Deferred:** offline conversion upload; mobile LP §5.1 friction cut; `01`/`02` geo test
5. **Weekly SOP Aug 26 done** — next due ~Sep 2

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
| `02` Attorneys RSAs — commercial v4 in review (Aug 26); v3 DISAPPROVED | [google_ads_changes.md](../google_ads_changes.md) |
| Deferred: exact-neg `[form pllc new york]` on Sales until `01` delivers | [google_ads_changes.md](../google_ads_changes.md) |
| Gate 1 (~Aug 17, checked Aug 19): need `01` ≥15 conv + account ≥28/30d — currently **2** / **13**. **Fail / hold `03`.** Re-baseline after Aug 4 stop-word fix | [operating plan](../nypllc-google-ads-operating-plan.md) |
| Recovery after Aug 4 negative fix: eligible volume + clicks on Sales / `01` | [google_ads_changes.md](../google_ads_changes.md) |
| June eligible-volume drop (~12,030 → ~4,000/wk) still unexplained — needs UI change log | [google_ads_changes.md](../google_ads_changes.md) |
| Never phrase-negative a common English word or a <3-char token (Aug 4 incident) | [operating plan §1.3](../nypllc-google-ads-operating-plan.md) |
| **Incrementality partly resolved** — cannibalization measured at **0.38% non-brand**; we rank pos 20–45 on all commercial terms, so paid is additive. Uplift est. **+6 to +14 orders/mo** | [operating plan §0.6](../nypllc-google-ads-operating-plan.md) |
| 20-term rank tracking still not set up — terms now defined (Part 1.5), baseline median position 32; needs a tracker to measure movement | [SEO plan](../nypllc-seo-content-moat-plan.md) |
| Money pages rank 20–45 on every commercial term. Ranking them is 6–18mo vs LegalZoom/Northwest — **do not treat the target list as a paid-search exit plan** | [SEO plan Part 1.5](../nypllc-seo-content-moat-plan.md) |
| `chatgpt.com` emerging as an unmanaged channel (5 of 43 orders since Jul 9) | [operating plan §0.6](../nypllc-google-ads-operating-plan.md) |
| Ads↔CRM ±10% gap — **closed Aug 26 weekly** (17 vs 17 / 0%) | [WEEKLY-SOP.md](../ads-pull-2026-08-26-weekly-sop/WEEKLY-SOP.md) |
| Auction Insights manual export (1st week of Aug) | [operating plan](../nypllc-google-ads-operating-plan.md) |
| Revenue levers: **Mercury + Gusto Impact applied Aug 14** (awaiting responses); links not live | [affiliate-partners.md](../docs/affiliate-partners.md) |
| $985 price test — late Sep only (ads plan §4.4); never during ladder step or January | [revenue levers plan](../nypllc-revenue-levers-plan.md) · [ads plan §4.4](../nypllc-google-ads-operating-plan.md) |
| Spiffy checkbox live: S Corp $195; sales tax **off checkout Aug 18**; CAQH Spiffy SKU after pilots | [revenue levers plan](../nypllc-revenue-levers-plan.md) |
| **CAQH pilot** — Aaron declined; Esther / Jonathan / Shanel outreach Aug 25–26 | [caqh-pilot-launch.md](../../PLLC-CRM/crm/docs/caqh-pilot-launch.md) |
| **Direct-RA notices live (Aug 25)** — checkout disclosure **audited Aug 26**; staff **$99 CoC** + **$249 Compliance Plan** paths confirmed. First T-30s ~Sep 22; Oct charges | [CRM launch status](../../PLLC-CRM/crm/docs/direct-ra-launch-status.md) |
| Big B2B professional outreach **paused** until CAQH + EXP + affiliates done | [expansion-next-steps.md](expansion-next-steps.md) |

## Recent changes

📖 Full log: [session-history.md](../docs/session-history.md)

Latest (Aug 26 2026): Weekly Ads SOP — 30d CPA $111 / 17 conv; Ads↔CRM 0%; Attorneys RSA v4 uploaded. Direct-RA checkout disclosure audited; staff $99 CoC + $249 Compliance Plan paths confirmed. CAQH outreach templates in repo; Jonathan Shedlo + Shanel Boyce pilot emails sent. Aaron declined. Memory bank synced with CRM. Earlier (Aug 25): CAQH pilot outreach to Aaron + Esther; Direct-RA `DIRECT_RA_NOTICES_LIVE=true`; `02` Attorneys RSA v3 uploaded. Earlier (Aug 19): Weekly Ads SOP — Gate 1 fail/hold. Earlier (Aug 18): sales tax **off checkout**. Earlier (Aug 14): Mercury + Gusto applied. Earlier (Aug 4): stop-word negative fix; `02` ENABLED. Earlier (Jul 9): `01` ENABLED; conversion flip.

## Session start

Read [router.md](router.md) → core files + 1–2 `features/*.md` for the task.

## Patterns (pointers only)

Cross-cutting patterns → [systemPatterns.md](systemPatterns.md). Stack → [techContext.md](techContext.md).
