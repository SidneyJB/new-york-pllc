# Active Context

## Production state

NY PLLC marketing site (**www.nypllc.com**) is **live on Vercel**. Spiffy checkout, analytics funnel, profession pages, DIY guide, virtual-address pages, foreign-into-NY state pages, and B2B partner landing shipped.

## Current sprint

- **Google Ads Phase 0** — **conversion flip done Jul 9.** Tagged Purchase `7678072764` primary; page-load `7353506045` secondary. See [features/google-ads.md](features/google-ads.md) · [operating plan](../nypllc-google-ads-operating-plan.md)
- **Weekly SOP** — latest §7.1 **done Sep 1** (due Aug 31): [WEEKLY-SOP.md](../ads-pull-2026-09-01-weekly-sop/WEEKLY-SOP.md) · [ads-weekly-dashboard.csv](../ads-weekly-dashboard.csv). 7d CPA **$237** / 2 conv (both Sep 1); 30d CPA **$128** / 16 conv; `01` **~3.5** lifetime purchases; Ads Spiffy 16 vs CRM 16 (**0%**); **Gate 1 fail / hold**. **Gate 2 (~Sep 12) expected fail on volume** — permission slip only (**no `03` / Discovery / Bing**).
- **Sep 2 tCPA diagnostic** — portfolio **$90 → $105**. Judge Sales eligible toward 4.5–5k/wk in ≥14 days; revert if flat. $90 deadlock: volume follows the bid target.
- **Sep 1 recovery actions** — Core Exact audit: checkout→purchase leak; **paused** Formation-Core unpinned. Attorneys RSA **v5** later **DISAPPROVED** (Sep 2); AG paused. June drop **closed** (Jun 7 tCPA, not match-type). [CORE-EXACT-FUNNEL-AUDIT.md](../ads-pull-2026-09-01-weekly-sop/CORE-EXACT-FUNNEL-AUDIT.md)
- **🔴 Stop-word negative incident — found + fixed Aug 4.** Root cause of the conversion collapse: Lists A/A-FQ contained two-letter state abbreviations as **phrase** negatives, so `in` (Indiana) blocked every query containing "in" (also `or`, `me`). Self-blocked 14/44 of `01`'s keywords, 21/33 of `03`, 9/40 of Sales. Eligible auction volume on Sales fell 12,030 → 576/week with budget untouched at $500/day. Removed 94 abbreviations; reverted Sales geo to `PRESENCE_OR_INTEREST`; verified 0 self-blocked. See [google_ads_changes.md](../google_ads_changes.md).
- **`02` Attorneys RSA v5 (Sep 2)** — **DISAPPROVED**. Ad group **PAUSED** (`196018838817`). Stop copy churn. See [google_ads_changes.md](../google_ads_changes.md)
- **SEO / content moat** — [nypllc-seo-content-moat-plan.md](../nypllc-seo-content-moat-plan.md). Shipped: `/nysed-approval-times`, `/ny-pllc-cost`, `/how-long-to-form-a-pllc-in-ny` (Jul 22). OP deficiencies `#4` and PLLC vs LLC `#5` **built unpublished** (Vercel 404s `/nysed-op-deficiencies`, `/pllc-vs-llc`). MSO page **built unpublished** (not in `app/`; Vercel 404s `/ny-mso`). 20-term tracker: [`seo-rank-tracker.csv`](../seo-rank-tracker.csv). See [features/seo-and-domain.md](features/seo-and-domain.md) · [features/mso-msa.md](features/mso-msa.md)
- **Revenue levers (website surface)** — [nypllc-revenue-levers-plan.md](../nypllc-revenue-levers-plan.md). **Direct-RA Lever 1 LIVE Aug 25** (`DIRECT_RA_NOTICES_LIVE` on CRM Production). **CAQH pilot** — Aaron declined (has CAQH); outreach Aug 25–26; **follow-up sent Sep 1** (8 awaiting). **CAQH interest checkbox live Aug 26** on Spiffy (no charge; CRM `caqhInterest` + staff badge). **Mercury + Gusto Impact applied Aug 14**; **third ping Sep 1**. Spiffy checkbox live: **S Corp $195**. Sales tax Certificate of Authority **removed from checkout Aug 18** (low take rate). Remaining: DBA, CAQH **paid** SKU, VM copy. **$985 deferred to February.** Expedite SKU **removed Aug 17** (already in $885). See [features/revenue-levers.md](features/revenue-levers.md) · [CRM launch status](../../PLLC-CRM/crm/docs/direct-ra-launch-status.md) · [caqh-pilot-launch.md](../../PLLC-CRM/crm/docs/caqh-pilot-launch.md)
- **Phase 1 live:** `Sales-Search-1` + `01_Core_Exact_NY` (Jul 9) + **`02_Professions_NY` (ENABLED Aug 4)** on portfolio tCPA **$105** (Sep 2 diagnostic). `03_ForeignQual_US` PAUSED, unattached (Gate 1).
- Expand **foreign-into-NY** state page coverage beyond NJ/PA/FL/TX/CT as needed
- **Foreign publication copy (HARD — Aug 10 2026):** flat package **includes** end-to-end six-week publication. Never “guidance” / “not included unless quoted.” See [features/foreign-into-ny.md](features/foreign-into-ny.md).
- Ops fulfillment lives in **PLLC-CRM** (sibling repo) — not this codebase
- **MSO path (offer locked Aug 31 2026)** — PLLC + management LLC **$1,770**. Counsel MSA **$945** (unnamed on site). Pair RA **$149/yr**; pair VM **$85/mo**. No medspa. **Ads wait.** Page built under [`web/src/unpublished/ny-mso/`](../web/src/unpublished/ny-mso/) — **not live**; Vercel rewrites `/ny-mso` to 404. Do not move into `app/` until Sid launches. [features/mso-msa.md](features/mso-msa.md)
- **Domestic NY PC (Sep 3 2026)** — off-menu **MSO-ready Practice PC** manual quote **$1,285** flat; no site/Spiffy SKU. Future standard PC list **$885** (PLL parity). SoT: [features/domestic-ny-pc.md](features/domestic-ny-pc.md)

## Expansion priorities (next 4 weeks)

📖 Full narrative + Sep–Jan calendar: [expansion-next-steps.md](expansion-next-steps.md) (updated Sep 2, 2026). **MSO path** (offer locked, page unpublished): [features/mso-msa.md](features/mso-msa.md) · packet [synthesis](../docs/business-ideas-ny-mso-msa-synthesis.md).

1. **CAQH pilots** — interest checkbox **live Aug 26**. **Follow-up sent Sep 1** (8 awaiting, skip Aaron). If still silent ~Sep 8: healthcare backlist with **$499 + pay link** (**PLLC-CRM**)
2. **Direct-RA Lever 1 — LIVE** — first T-30 ~Sep 22; Oct charges. Pre-send checklist in [CRM launch status](../../PLLC-CRM/crm/docs/direct-ra-launch-status.md)
3. **EXP Credentialing** — Sep 1 close-out **sent**; waiting on their model choice (**PLLC-CRM**)
4. **Affiliate follow-ups** — **third ping sent Sep 1** (Mercury + Gusto). Links not live. [affiliate-partners.md](../docs/affiliate-partners.md)
5. **Ads** — **$105 diagnostic**; Gate 2 expected fail; do not launch `03` / Discovery / Bing. Attorneys AG **paused** (v5 DISAPPROVED). Unpinned RSA stays paused.
6. **SEO** — OP deficiencies `#4` and PLLC vs LLC `#5` **built unpublished**; 20-term tracker file live; **do not publish MSO, deficiencies, or `/pllc-vs-llc`**
7. **Big B2B outreach paused**
8. **MSO** — unpublished draft only; **no Vercel public route**; no ads

## Ads ops (maintenance — not expansion sprint)

1. Watch **$105 eligible-volume test** (Sales toward 4.5–5k/wk). **Do not treat Sep 12 as a scale date.**
2. Daily 10-min on Sales + `01` + `02`; `03` only if Gate 1 actually passes
3. Open: Customer Match upload; Auction Insights **manual UI export** (still overdue)
4. **Deferred:** offline conversion upload; mobile LP §5.1 friction cut; `01`/`02` geo test; **$985 until February**
5. **Weekly SOP next ~Sep 8** — Attorneys AG already paused (v5 DISAPPROVED); do not churn copy
6. **Last structural ads change Nov 14 → freeze Nov 15–Dec 1**

## Active decisions

- Canonical domain: **https://www.nypllc.com** only
- Payments: **Spiffy.co** embedded checkout (not Stripe on-site)
- Partner coupons: apply via referral capture + Spiffy ready hooks before/when embed mounts
- GA4 `purchase` fires on confirmation; **not** imported to Google Ads (avoid double-count)
- Google Ads primary: tagged Spiffy Purchase (`7678072764`, real `$` from `total=`); page-load secondary (`7353506045`)
- Ads volume claim: **thousands / 25,000+** NY entities (not “300+”); sitelinks only to real sitemap URLs
- Reviews: NYPLLC **GBP** only (not Trustpilot); live **5.0 / 6 reviews** (Jul 9 2026) — keep `BUSINESS_INFO.googleReviews` in sync
- Profession / foreign pages: formation/qualification scope only — do **not** over-claim board coordination
- **MSO:** print $1,770 + $945; **do not name Jonah** on site/ads; intro at DOS only; CheapNewYorkLLC not the public face of the management LLC
- Foreign checklists: customer-provided info only; we obtain standing/certified formation docs
- Publishing-only: no paid acquisition (negative List E)

## Watches

| Item | Link |
|------|------|
| `01` Formation-Core RSAs `APPROVED_LIMITED` (gov docs policy) | [google-ads.md](features/google-ads.md) |
| `02` Attorneys RSAs — **v5 DISAPPROVED Sep 2**; **ad group PAUSED** (`196018838817`); stop copy churn | [google_ads_changes.md](../google_ads_changes.md) |
| Deferred: exact-neg `[form pllc new york]` on Sales until `01` delivers | [google_ads_changes.md](../google_ads_changes.md) |
| Gate 1 (~Aug 17, checked Sep 1): need `01` ≥15 conv + account ≥28/30d — currently **~3.5** / **16**. **Fail / hold `03`.** Re-baseline after Aug 4 stop-word fix | [operating plan](../nypllc-google-ads-operating-plan.md) |
| Recovery after Aug 4 negative fix: eligible volume + clicks on Sales / `01` | [google_ads_changes.md](../google_ads_changes.md) |
| June eligible-volume drop — **closed Sep 1** (Jun 7 tCPA, not match-type) | [google_ads_changes.md](../google_ads_changes.md) |
| Never phrase-negative a common English word or a <3-char token (Aug 4 incident) | [operating plan §1.3](../nypllc-google-ads-operating-plan.md) |
| **Incrementality partly resolved** — cannibalization measured at **0.38% non-brand**; we rank pos 20–45 on all commercial terms, so paid is additive. Uplift est. **+6 to +14 orders/mo** | [operating plan §0.6](../nypllc-google-ads-operating-plan.md) |
| 20-term rank tracker file live — fill Sep column from next GSC Queries export (`seo_rank_tracker.py`) | [seo-rank-tracker.csv](../seo-rank-tracker.csv) |
| Money pages rank 20–45 on every commercial term. Ranking them is 6–18mo vs LegalZoom/Northwest — **do not treat the target list as a paid-search exit plan** | [SEO plan Part 1.5](../nypllc-seo-content-moat-plan.md) |
| `chatgpt.com` emerging as an unmanaged channel (5 of 43 orders since Jul 9) | [operating plan §0.6](../nypllc-google-ads-operating-plan.md) |
| Ads↔CRM ±10% gap — **closed Sep 1 weekly** (16 vs 16 / 0%) | [WEEKLY-SOP.md](../ads-pull-2026-09-01-weekly-sop/WEEKLY-SOP.md) |
| Auction Insights manual export (1st week of Aug) | [operating plan](../nypllc-google-ads-operating-plan.md) |
| Revenue levers: **Mercury + Gusto Impact applied Aug 14**; **third ping Sep 1**; links not live | [affiliate-partners.md](../docs/affiliate-partners.md) |
| $985 price test — **deferred to February** | [revenue levers plan](../nypllc-revenue-levers-plan.md) |
| Spiffy checkbox live: S Corp $195; sales tax **off checkout Aug 18**; CAQH Spiffy SKU after pilots | [revenue levers plan](../nypllc-revenue-levers-plan.md) |
| **CAQH pilot** — Aaron declined; **Sep 1 follow-up sent** to 8 awaiting | [caqh-pilot-launch.md](../../PLLC-CRM/crm/docs/caqh-pilot-launch.md) |
| **Direct-RA notices live (Aug 25)** — checkout disclosure **audited Aug 26**; staff **$99 CoC** + **$249 Compliance Plan** paths confirmed. First T-30s ~Sep 22; Oct charges | [CRM launch status](../../PLLC-CRM/crm/docs/direct-ra-launch-status.md) |
| Big B2B professional outreach **paused** until CAQH + EXP + affiliates done | [expansion-next-steps.md](expansion-next-steps.md) |
| **MSO path** — offer locked; **page unpublished** (not in `app/`; Vercel 404 `/ny-mso`); **no ads**; do not name Jonah | [features/mso-msa.md](features/mso-msa.md) |

## Recent changes

📖 Full log: [session-history.md](../docs/session-history.md)

Latest (Sep 2 2026, later): PLLC vs LLC `#5` **built unpublished** (`web/src/unpublished/pllc-vs-llc/`; Vercel 404s `/pllc-vs-llc`; noindex; no `/order-llc` CTA). Next editorial `#6` PLLC vs PC.

Latest (Sep 2 2026): **Sid amendment** — portfolio tCPA **$105** diagnostic; abandoned-checkout emails; RA stop-charge vs CoC split; OP deficiencies `#4` **unpublished**; CAQH $499+link pulled to mid-Sep. [operating plan §0.5](../nypllc-google-ads-operating-plan.md).

Latest (Sep 1 2026, later): **Follow-ups sent** — CAQH (8, skip Aaron), EXP close-out, Mercury + Gusto third ping. **Recovery plan** — Core Exact unpinned paused; Attorneys v5 uploaded; June tCPA diagnosis; Gate 2 treated as permission slip; $985→Feb; MSO page built **unpublished**. [CORE-EXACT-FUNNEL-AUDIT.md](../ads-pull-2026-09-01-weekly-sop/CORE-EXACT-FUNNEL-AUDIT.md). Earlier same day: **Weekly Ads SOP** — 7d CPA $237 / 2 conv; 30d CPA $128 / 16 conv; Ads↔CRM 0%; Gate 1 fail/hold. [WEEKLY-SOP.md](../ads-pull-2026-09-01-weekly-sop/WEEKLY-SOP.md).

## Session start

Read [router.md](router.md) → core files + 1–2 `features/*.md` for the task.

## Patterns (pointers only)

Cross-cutting patterns → [systemPatterns.md](systemPatterns.md). Stack → [techContext.md](techContext.md).
