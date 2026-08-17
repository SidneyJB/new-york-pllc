# Active Context

## Production state

NY PLLC marketing site (**www.nypllc.com**) is **live on Vercel**. Spiffy checkout, analytics funnel, profession pages, DIY guide, virtual-address pages, foreign-into-NY state pages, and B2B partner landing shipped.

## Current sprint

- **Google Ads Phase 0** — **conversion flip done Jul 9.** Tagged Purchase `7678072764` primary; page-load `7353506045` secondary. See [features/google-ads.md](features/google-ads.md) · [operating plan](../nypllc-google-ads-operating-plan.md)
- **🔴 Stop-word negative incident — found + fixed Aug 4.** Root cause of the conversion collapse: Lists A/A-FQ contained two-letter state abbreviations as **phrase** negatives, so `in` (Indiana) blocked every query containing "in" (also `or`, `me`). Self-blocked 14/44 of `01`'s keywords, 21/33 of `03`, 9/40 of Sales. Eligible auction volume on Sales fell 12,030 → 576/week with budget untouched at $500/day. Removed 94 abbreviations; reverted Sales geo to `PRESENCE_OR_INTEREST`; verified 0 self-blocked. See [google_ads_changes.md](../google_ads_changes.md).
- **Weekly SOP** — latest §7.1 **done Aug 14** (due Aug 10): [WEEKLY-SOP.md](../ads-pull-2026-08-14-weekly-sop/WEEKLY-SOP.md) · [ads-weekly-dashboard.csv](../ads-weekly-dashboard.csv). 7d CPA **$97** / 5 conv; 30d CPA **$112** / 14 conv; **`01` first 2 purchases**; Ads Spiffy 14 vs CRM 19 (+36%); Gate 1 hold.
- **`02` Attorneys RSA rewrite (Aug 14)** — controlled DISAPPROVED (gov-docs). Replaced both RSAs; in review. See [google_ads_changes.md](../google_ads_changes.md)
- **SEO / content moat** — [nypllc-seo-content-moat-plan.md](../nypllc-seo-content-moat-plan.md). Shipped: `/nysed-approval-times`, `/ny-pllc-cost`, `/how-long-to-form-a-pllc-in-ny` (Jul 22). Next editorial: OP deficiencies `#4`. See [features/seo-and-domain.md](features/seo-and-domain.md)
- **Revenue levers (website surface)** — [nypllc-revenue-levers-plan.md](../nypllc-revenue-levers-plan.md). **Mercury + Gusto Impact applied Aug 14** (waiting). Spiffy checkboxes live: **S Corp $195** + **sales tax Certificate of Authority $195** (Aug 14). Remaining: DBA, CAQH, VM copy, $985 prep (late Sep). Expedite SKU **removed Aug 17** (already in $885). RA renewal build is **PLLC-CRM**. See [features/revenue-levers.md](features/revenue-levers.md)
- **Phase 1 live:** `Sales-Search-1` + `01_Core_Exact_NY` (Jul 9) + **`02_Professions_NY` (ENABLED Aug 4)** on portfolio tCPA $90. `03_ForeignQual_US` PAUSED, unattached (Gate 1).
- Expand **foreign-into-NY** state page coverage beyond NJ/PA/FL/TX/CT as needed
- **Foreign publication copy (HARD — Aug 10 2026):** flat package **includes** end-to-end six-week publication. Never “guidance” / “not included unless quoted.” See [features/foreign-into-ny.md](features/foreign-into-ny.md).
- Ops fulfillment lives in **PLLC-CRM** (sibling repo) — not this codebase

## Expansion priorities (next 4 weeks)

📖 Full narrative + Sep–Jan calendar: [expansion-next-steps.md](expansion-next-steps.md) (updated Aug 16, 2026)

1. **CAQH payment + email past healthcare clients** — job #1 (**PLLC-CRM**; customer intake wizard shipped Aug 16, payment still open)
2. **RA auto-renewal build by Sep 15** — T-30 ~Sep 22, charges Oct; only hard calendar risk (**PLLC-CRM**)
3. **Close EXP Credentialing** by email — they're waiting (**PLLC-CRM**)
4. **Two affiliate links** — **Mercury + Gusto Impact applied Aug 14** (awaiting responses) — [affiliate-partners.md](../docs/affiliate-partners.md)
5. **Ads mostly hands-off** — recovery + daily SOP; verdict early Sep
6. **1 SEO piece/week** — next: OP deficiencies `#4`
7. **Big B2B outreach paused** — advocate side keeps running

## Ads ops (maintenance — not expansion sprint)

1. Watch Aug 4 negative-fix recovery; re-baseline Gate 1 after a clean week
2. Daily 10-min on Sales + `01` + `02`; `03` after early-Sep verdict if Gate 1 passes
3. Open: 20-term rank tracker; Customer Match upload; Auction Insights export; June volume mystery (UI change log)
4. **Deferred:** offline conversion upload; mobile LP §5.1 friction cut; `01`/`02` geo test

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
| `02` Attorneys RSAs rewritten Aug 14 — watch review → Eligible (not DISAPPROVED) | [google_ads_changes.md](../google_ads_changes.md) |
| Deferred: exact-neg `[form pllc new york]` on Sales until `01` delivers | [google_ads_changes.md](../google_ads_changes.md) |
| Gate 1 (~Aug 17): need `01` ≥15 conv + account ≥28/30d — currently **2** / **14**. Hold `03`. Re-baseline after Aug 4 stop-word fix | [operating plan](../nypllc-google-ads-operating-plan.md) |
| Recovery after Aug 4 negative fix: eligible volume + clicks on Sales / `01` | [google_ads_changes.md](../google_ads_changes.md) |
| June eligible-volume drop (~12,030 → ~4,000/wk) still unexplained — needs UI change log | [google_ads_changes.md](../google_ads_changes.md) |
| Never phrase-negative a common English word or a <3-char token (Aug 4 incident) | [operating plan §1.3](../nypllc-google-ads-operating-plan.md) |
| **Incrementality partly resolved** — cannibalization measured at **0.38% non-brand**; we rank pos 20–45 on all commercial terms, so paid is additive. Uplift est. **+6 to +14 orders/mo** | [operating plan §0.6](../nypllc-google-ads-operating-plan.md) |
| 20-term rank tracking still not set up — terms now defined (Part 1.5), baseline median position 32; needs a tracker to measure movement | [SEO plan](../nypllc-seo-content-moat-plan.md) |
| Money pages rank 20–45 on every commercial term. Ranking them is 6–18mo vs LegalZoom/Northwest — **do not treat the target list as a paid-search exit plan** | [SEO plan Part 1.5](../nypllc-seo-content-moat-plan.md) |
| `chatgpt.com` emerging as an unmanaged channel (5 of 43 orders since Jul 9) | [operating plan §0.6](../nypllc-google-ads-operating-plan.md) |
| Ads↔CRM ±10% gap (10 vs 13) — offline upload / attribution audit | [WEEKLY-SOP.md](../ads-pull-2026-08-04-weekly-sop/WEEKLY-SOP.md) |
| Auction Insights manual export (1st week of Aug) | [operating plan](../nypllc-google-ads-operating-plan.md) |
| Revenue levers: **Mercury + Gusto Impact applied Aug 14** (awaiting responses); links not live | [affiliate-partners.md](../docs/affiliate-partners.md) |
| $985 price test — late Sep only (ads plan §4.4); never during ladder step or January | [revenue levers plan](../nypllc-revenue-levers-plan.md) · [ads plan §4.4](../nypllc-google-ads-operating-plan.md) |
| Spiffy checkboxes live: S Corp + **sales tax $195**; remaining DBA / CAQH | [revenue levers plan](../nypllc-revenue-levers-plan.md) |
| **Sep 15 RA renewal build** — only hard calendar risk before Oct charges | [expansion-next-steps.md](expansion-next-steps.md) |
| Big B2B professional outreach **paused** until CAQH + RA + EXP + affiliates done | [expansion-next-steps.md](expansion-next-steps.md) |

## Recent changes

📖 Full log: [session-history.md](../docs/session-history.md)

Latest (Aug 14 2026): **`02` Attorneys RSAs rewritten** (gov-docs disapproval; in review). Weekly Ads SOP — `01` first 2 purchases; 30d CPA $112 / 14 conv; +`[create pllc]`. **Sales tax Certificate of Authority $195** live. **Mercury + Gusto Impact applied** — waiting. Earlier (Aug 4): stop-word negative incident found + fixed; `02` ENABLED. Earlier (Jul 28): first weekly SOP. Earlier (Jul 9): `01` ENABLED; conversion flip.

## Session start

Read [router.md](router.md) → core files + 1–2 `features/*.md` for the task.

## Patterns (pointers only)

Cross-cutting patterns → [systemPatterns.md](systemPatterns.md). Stack → [techContext.md](techContext.md).
