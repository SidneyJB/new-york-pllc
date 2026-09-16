# Active Context

## Production state

NY PLLC marketing site (**www.nypllc.com**) is **live on Vercel**. Spiffy checkout, analytics funnel, profession pages, DIY guide, virtual-address pages, foreign-into-NY state pages, and B2B partner landing shipped.

## Current sprint

- **Google Ads Phase 0** — **conversion flip done Jul 9.** Tagged Purchase `7678072764` primary; page-load `7353506045` secondary. See [features/google-ads.md](features/google-ads.md) · [operating plan](../nypllc-google-ads-operating-plan.md)
- **Weekly SOP** — latest §7.1 **done Sep 13**: [WEEKLY-SOP.md](../ads-pull-2026-09-13-weekly-sop/WEEKLY-SOP.md). 7d CPA **$133** / 4.88; 30d **$133** / 18; Ads↔CRM 30d **+5.9%**; Sales ISO week **4,062**. **Daily Sep 12:** [DAILY-SOP.md](../ads-pull-2026-09-12-daily-sop/DAILY-SOP.md) — 7d **$92** / 5.9; 30d **$124** / 19; `01` **6.5** lifetime.
- **Sep 3 owner calendar** — **supersedes Gate 2/3 hold on `03`.** **Hold $105** (Sep 16). **Sep 29–30** pre-register $120 (matured Sep 2–21 ≥0.7/day ≤$135, eligible ≥4,300/wk). **`03_ForeignQual_US` ENABLED Sep 16** on portfolio; CA + CO RSAs pending review, five original state groups already approved. **Bing slip-item.** **$985 February.** Gate 2 Sales exact-neg **filed, not applied**. [expansion-next-steps.md](expansion-next-steps.md) · [operating plan §0.5](../nypllc-google-ads-operating-plan.md)
- **Sep 2 tCPA diagnostic** — portfolio **$90 → $105**. **Hold $105.** Week-1 ~$105 CPA / 5.9 conv; CRM Google 0.52→0.90/day. mCPA ~$183 immature tail.
- **$1M mix** — paid 50–60/mo is **stretch**; current rate ≈ **$400–550K** 2028-type year without B2B/CAQH/RA landing. 📖 [expansion-next-steps.md](expansion-next-steps.md)
- **Sep 1 recovery actions** — Core Exact audit: checkout→purchase leak; **paused** Formation-Core unpinned. Attorneys RSA **v5** later **DISAPPROVED** (Sep 2); AG paused. June drop **closed** (Jun 7 tCPA, not match-type). [CORE-EXACT-FUNNEL-AUDIT.md](../ads-pull-2026-09-01-weekly-sop/CORE-EXACT-FUNNEL-AUDIT.md)
- **🔴 Stop-word negative incident — found + fixed Aug 4.** Root cause of the conversion collapse: Lists A/A-FQ contained two-letter state abbreviations as **phrase** negatives, so `in` (Indiana) blocked every query containing "in" (also `or`, `me`). Self-blocked 14/44 of `01`'s keywords, 21/33 of `03`, 9/40 of Sales. Eligible auction volume on Sales fell 12,030 → 576/week with budget untouched at $500/day. Removed 94 abbreviations; reverted Sales geo to `PRESENCE_OR_INTEREST`; verified 0 self-blocked. See [google_ads_changes.md](../google_ads_changes.md).
- **`02` Attorneys RSA v5 (Sep 2)** — **DISAPPROVED**. Ad group **PAUSED** (`196018838817`). Stop copy churn. See [google_ads_changes.md](../google_ads_changes.md)
- **SEO / content moat** — [nypllc-seo-content-moat-plan.md](../nypllc-seo-content-moat-plan.md). Shipped: `/nysed-approval-times`, `/ny-pllc-cost`, `/how-long-to-form-a-pllc-in-ny` (Jul 22); OP deficiencies `#4` `/nysed-op-deficiencies` and PLLC vs LLC `#5` `/pllc-vs-llc` (**live Sep 4**). MSO page **built unpublished** (not in `app/`; Vercel 404s `/ny-mso`). 20-term tracker: [`seo-rank-tracker.csv`](../seo-rank-tracker.csv). See [features/seo-and-domain.md](features/seo-and-domain.md) · [features/mso-msa.md](features/mso-msa.md)
- **Revenue levers (website surface)** — [nypllc-revenue-levers-plan.md](../nypllc-revenue-levers-plan.md). **Direct-RA Lever 1 LIVE Aug 25** (`DIRECT_RA_NOTICES_LIVE` on CRM Production). **CAQH Sep 16 sends done:** checkout-interest 3 + `FORMATION_COMPLETE` backlist 20, each with a $499 hosted invoice. **CAQH interest checkbox live Aug 26** on Spiffy (no charge; CRM `caqhInterest` + staff badge). **Mercury + Gusto Impact applied Aug 14**; **third ping Sep 1**. Spiffy checkbox live: **S Corp $195**. Sales tax Certificate of Authority **removed from checkout Aug 18** (low take rate). Remaining: DBA, CAQH **paid** SKU, VM copy. **$985 deferred to February.** Expedite SKU **removed Aug 17** (already in $885). See [features/revenue-levers.md](features/revenue-levers.md) · [CRM launch status](../../PLLC-CRM/crm/docs/direct-ra-launch-status.md) · [caqh-pilot-launch.md](../../PLLC-CRM/crm/docs/caqh-pilot-launch.md)
- **Phase 1 live:** `Sales-Search-1` + `01_Core_Exact_NY` + **`02_Professions_NY`** + **`03_ForeignQual_US`** on portfolio tCPA **$105 hold**. `03` has **8 groups / 39 keywords / 16 RSAs**; CA + CO ads pending review.
- **NY → Colorado FQ (Sep 10 2026)** — Statement of Foreign Entity Authority **$100** SOS; list **$500** ($400 profit). Chart: [`data/ny-outbound-foreign-qualification.json`](../data/ny-outbound-foreign-qualification.json). CRM SoT in PLLC-CRM. See [features/foreign-into-ny.md](features/foreign-into-ny.md)
- **California foreign-into-NY page LIVE Sep 16** ($905; selector, canonical metadata, and sitemap verified in production). State coverage: NJ/PA/FL/TX/CT/CA/CO.
- **Foreign publication copy (HARD — Aug 10 2026):** flat package **includes** end-to-end six-week publication. Never “guidance” / “not included unless quoted.” See [features/foreign-into-ny.md](features/foreign-into-ny.md).
- Ops fulfillment lives in **PLLC-CRM** (sibling repo) — not this codebase
- **MSO path (offer locked Aug 31 2026)** — PLLC + management LLC **$1,770**. Counsel MSA **$945** (unnamed on site). Pair RA **$149/yr**; pair VM **$85/mo**. No medspa. **Ads wait.** Page built under [`web/src/unpublished/ny-mso/`](../web/src/unpublished/ny-mso/) — **not live**; Vercel rewrites `/ny-mso` to 404. Do not move into `app/` until Sid launches. [features/mso-msa.md](features/mso-msa.md)
- **Domestic NY PC (Sep 3 2026)** — off-menu **MSO-ready Practice PC** manual quote **$1,285** flat; no site/Spiffy SKU. Future standard PC list **$885** (PLL parity). SoT: [features/domestic-ny-pc.md](features/domestic-ny-pc.md)

## Expansion priorities (next 4 weeks)

📖 Full narrative + Sep–Jan calendar: [expansion-next-steps.md](expansion-next-steps.md) (updated **Sep 16, 2026** evening). **MSO path** (offer locked, page unpublished): [features/mso-msa.md](features/mso-msa.md) · packet [synthesis](../docs/business-ideas-ny-mso-msa-synthesis.md).

1. **CAQH** — remaining ~118 **held**. Copy (3 versions) + Headway/Alma page this week; verify EIN-trigger attach emails. Oct bar **3–5 paid any motion**. (**Site + PLLC-CRM**)
2. **Direct-RA Lever 1 — LIVE** — first T-30 ~Sep 22; Oct charges. Pre-send checklist in [CRM launch status](../../PLLC-CRM/crm/docs/direct-ra-launch-status.md)
3. **EXP Credentialing** — referral link **sent Sep 16** (`EXP9Z8S`). (**PLLC-CRM**)
4. **Affiliate follow-ups** — **third ping sent Sep 1** (Mercury + Gusto). Links not live. [affiliate-partners.md](../docs/affiliate-partners.md)
5. **Ads** — **Hold $105.** Sep 29–30 $120 pre-register. **`03` ENABLED Sep 16** (five state groups approved; CA/CO RSAs pending). **Bing slip-item.** Attorneys AG **paused**. Unpinned RSA stays paused.
6. **SEO** — Headway/Alma comparison **this week**; `#4`/`#5` live Sep 4; 20-term tracker file live; **do not publish MSO**
7. **Big B2B outreach paused**; Headway/Alma → **platform** segment (formation partners)
8. **MSO** — CRM manual pairs **done Sep 16**; page still unpublished; **no Vercel public route**; no ads

## Ads ops

1. **Sep 16:** **Hold $105.** Pre-register Sep 29–30 for $120.
2. **This week:** `03` attach + enable **done Sep 16**. Bing later. Watch CA/CO RSA policy status.
3. Customer Match **uploaded Sep 5** (`9465911299`; job RUNNING; size 0 until match). Auction Insights **done Sep 5**. Do **not** Targeting-attach.
4. **Oct:** mobile LP + publication-cost calculator on LPs (not publishing-only). **$985 until February**
5. **Weekly SOP done Sep 13**. Daily **done Sep 12**. Attorneys AG paused; no copy churn.
6. **Nov 1 verdict** → freeze **Nov 15–Dec 1** → January full force

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
| Gate 1 volume — `01` ~3.5 / account ~15–16 per 30d. **`03` launches anyway Sep 15–22** (Sep 3: small ≠ broken) | [operating plan §0.5](../nypllc-google-ads-operating-plan.md) |
| Recovery after Aug 4 negative fix: eligible volume + clicks on Sales / `01` | [google_ads_changes.md](../google_ads_changes.md) |
| June eligible-volume drop — **closed Sep 1** (Jun 7 tCPA, not match-type) | [google_ads_changes.md](../google_ads_changes.md) |
| Never phrase-negative a common English word or a <3-char token (Aug 4 incident) | [operating plan §1.3](../nypllc-google-ads-operating-plan.md) |
| **Incrementality partly resolved** — cannibalization measured at **0.38% non-brand**; we rank pos 20–45 on all commercial terms, so paid is additive. Uplift est. **+6 to +14 orders/mo** | [operating plan §0.6](../nypllc-google-ads-operating-plan.md) |
| 20-term rank tracker file live — fill Sep column from next GSC Queries export (`seo_rank_tracker.py`) | [seo-rank-tracker.csv](../seo-rank-tracker.csv) |
| Money pages rank 20–45 on every commercial term. Ranking them is 6–18mo vs LegalZoom/Northwest — **do not treat the target list as a paid-search exit plan** | [SEO plan Part 1.5](../nypllc-seo-content-moat-plan.md) |
| `chatgpt.com` emerging as an unmanaged channel (5 of 43 orders since Jul 9) | [operating plan §0.6](../nypllc-google-ads-operating-plan.md) |
| Ads↔CRM ±10% gap — **closed Sep 1 weekly** (16 vs 16 / 0%) | [WEEKLY-SOP.md](../ads-pull-2026-09-01-weekly-sop/WEEKLY-SOP.md) |
| Auction Insights — **filed Sep 5** (Sales 90d, You IS 13.81%) | [CSV](../ads-pull-2026-09-05-weekly-sop/Ads%20-%20auction-insights_ui_Sales-Search-1_2026-06-08_to_2026-09-05.csv) |
| Revenue levers: **Mercury + Gusto Impact applied Aug 14**; **third ping Sep 1**; links not live | [affiliate-partners.md](../docs/affiliate-partners.md) |
| $985 price test — **deferred to February** | [revenue levers plan](../nypllc-revenue-levers-plan.md) |
| Spiffy checkbox live: S Corp $195; sales tax **off checkout Aug 18**; CAQH Spiffy SKU after pilots | [revenue levers plan](../nypllc-revenue-levers-plan.md) |
| **CAQH** — Sep 16 replies: 0 paid (Alma/Headway, already paneled, already has CAQH). Remaining ~118 held until copy + comparison page. Oct: 3–5 paid any motion or drop to passive | [expansion-next-steps.md](expansion-next-steps.md) · [caqh-pilot-launch.md](../../PLLC-CRM/crm/docs/caqh-pilot-launch.md) |
| **Direct-RA notices live (Aug 25)** — checkout disclosure **audited Aug 26**; staff **$99 CoC** + **$249 Compliance Plan** paths confirmed. First T-30s ~Sep 22; Oct charges | [CRM launch status](../../PLLC-CRM/crm/docs/direct-ra-launch-status.md) |
| Big B2B professional outreach **paused** until CAQH copy/page + EXP + affiliates; **Headway/Alma = platform segment** (formation partners) | [expansion-next-steps.md](expansion-next-steps.md) · [b2b-partners.md](../../PLLC-CRM/memory-bank/features/b2b-partners.md) |
| **MSO path** — offer locked; **page unpublished** (not in `app/`; Vercel 404 `/ny-mso`); **no ads**; do not name Jonah | [features/mso-msa.md](features/mso-msa.md) |

## Recent changes

📖 Full log: [session-history.md](../docs/session-history.md)

Latest (Sep 13 2026): **Weekly Ads SOP §7.1** — 7d CPA **$133** / 4.88 conv; 30d **$133** / 18 (week 2 over freeze $130). Self-block 0. Ads Spiffy 18 vs CRM 17 (+5.9%). No account changes. $105 day 12; Sales ISO week **4,062**. `01` **6.50** lifetime. Gate 2 volume fail expected; **`03`+Bing still Sep 15–22**. [WEEKLY-SOP.md](../ads-pull-2026-09-13-weekly-sop/WEEKLY-SOP.md).

Latest (Sep 12 2026): **Daily Ads SOP** — 7d CPA **$92** / 5.9 conv; 30d **$124** / 19 conv; Sep MTD **$96** / 12. `01` **6.5** lifetime. No account changes. $105 day 11; Sales eligible 7d **3,946**. [DAILY-SOP.md](../ads-pull-2026-09-12-daily-sop/DAILY-SOP.md).

Latest (Sep 9 2026): **Daily Ads SOP** — 7d CPA **$163** / 3.8 conv; 30d **$133** / 17 conv; Sep MTD **$114** / 7. `01` **5.5** lifetime. No account changes. $105 day 8; Sales eligible 7d **3,338**. [DAILY-SOP.md](../ads-pull-2026-09-09-daily-sop/DAILY-SOP.md).

Latest (Sep 8 2026): **Daily Ads SOP** — 7d CPA **$214** / 2.8 conv; 30d **$136** / 17 conv; Sep MTD **$120** / 6. `01` **~4.5** lifetime. No account changes. $105 day 7; Sales eligible 7d **3,106**. [DAILY-SOP.md](../ads-pull-2026-09-08-daily-sop/DAILY-SOP.md).

Latest (Sep 5 2026): **Weekly Ads SOP §7.1** — 7d CPA **$122** / 6 conv; 30d **$144** / 16 (week 1 over freeze $130). Self-block 0. Ads Spiffy 16 vs CRM 15 (+6.7%). No account changes. $105 day 4; Sales eligible **3,431**. [WEEKLY-SOP.md](../ads-pull-2026-09-05-weekly-sop/WEEKLY-SOP.md).

Latest (Sep 4 2026): OP deficiencies `#4` (`/nysed-op-deficiencies`) and PLLC vs LLC `#5` (`/pllc-vs-llc`) **launched**. Sitemap, footer, article/FAQ/breadcrumb schema, indexable. No `/order-llc` CTA. Next editorial `#6` PLLC vs PC. MSO stays unpublished.

Latest (Sep 3 2026, later): **Owner ads calendar + $1M mix.** `03`+Bing **Sep 15–22**; Nov 1 paid verdict; January n=1 hedge. [expansion-next-steps.md](expansion-next-steps.md). Daily SOP earlier same day.

Latest (Sep 2 2026, later): PLLC vs LLC `#5` drafted (later launched Sep 4).

Latest (Sep 2 2026): **Sid amendment** — portfolio tCPA **$105** diagnostic; abandoned-checkout emails; RA stop-charge vs CoC split; OP deficiencies `#4` **unpublished**; CAQH $499+link pulled to mid-Sep. [operating plan §0.5](../nypllc-google-ads-operating-plan.md).

Latest (Sep 1 2026, later): **Follow-ups sent** — CAQH (8, skip Aaron), EXP close-out, Mercury + Gusto third ping. **Recovery plan** — Core Exact unpinned paused; Attorneys v5 uploaded; June tCPA diagnosis; Gate 2 treated as permission slip; $985→Feb; MSO page built **unpublished**. [CORE-EXACT-FUNNEL-AUDIT.md](../ads-pull-2026-09-01-weekly-sop/CORE-EXACT-FUNNEL-AUDIT.md). Earlier same day: **Weekly Ads SOP** — 7d CPA $237 / 2 conv; 30d CPA $128 / 16 conv; Ads↔CRM 0%; Gate 1 fail/hold. [WEEKLY-SOP.md](../ads-pull-2026-09-01-weekly-sop/WEEKLY-SOP.md).

## Session start

Read [router.md](router.md) → core files + 1–2 `features/*.md` for the task.

## Patterns (pointers only)

Cross-cutting patterns → [systemPatterns.md](systemPatterns.md). Stack → [techContext.md](techContext.md).
