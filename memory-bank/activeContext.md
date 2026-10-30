# Active Context

## Production state

NY PLLC marketing site (**www.nypllc.com**) is **live on Vercel**. Spiffy checkout, analytics funnel, profession pages, DIY guide, virtual-address pages, foreign-into-NY state pages, and B2B partner landing shipped.

## Current sprint

- **Google Ads Phase 0** — **conversion flip done Jul 9.** Tagged Purchase `7678072764` primary; page-load `7353506045` secondary. See [features/google-ads.md](features/google-ads.md) · [operating plan](../nypllc-google-ads-operating-plan.md)
- **Weekly Ads SOP (Oct 18)** — 7d CPA **$85** / 10 Purchase; 30d **$122** / 23; Oct 1–18 **$100** / 19. Sales ISO week Oct 12 eligible **3,640**; self-block **0**; Ads↔CRM 30d **+9.5%**. **Hold $105**; no account changes. `03` 7d budget-lost **5.5%** left alone. Three enabled `01` ads remain DISAPPROVED. [WEEKLY-SOP.md](../ads-pull-2026-10-18-weekly-sop/WEEKLY-SOP.md)
- **Daily Ads SOP (Oct 3)** — superseded by the Oct 18 weekly. 7d CPA **$355** / 2; 30d **$141** / 17.77. [DAILY-SOP.md](../ads-pull-2026-10-03-daily-sop/DAILY-SOP.md)
- **Weekly SOP history** — prior §7.1 **Sep 28**: [WEEKLY-SOP.md](../ads-pull-2026-09-28-weekly-sop/WEEKLY-SOP.md). 7d CPA **$228** / 2; 30d **$115** / 21; Ads↔CRM 30d **+5.0%**; Sales ISO week Sep 21 **3,470**. Self-block **0**. Sep 29–30 pre-register → **hold $105**. tCPA $105 day 26. CA/CO RSAs **APPROVED**.
- **Sep 3 owner calendar** — **supersedes Gate 2/3 hold on `03`.** **Hold $105** (confirmed Sep 28 SOP). **Sep 29–30** $120 pre-register **does not fire** (matured Sep 2–21 0.69/day, eligible ~3.5k). **`03_ForeignQual_US` ENABLED Sep 16** on portfolio; CA + CO RSAs **APPROVED**. **Bing blocked Sep 23**. **$985 Nov** (decision log; not February). Gate 2 Sales exact-neg **filed, not applied**. [expansion-next-steps.md](expansion-next-steps.md) · [operating plan §0.5](../nypllc-google-ads-operating-plan.md)
- **Microsoft Advertising (Sep 23)** — login `contact@nypllc.com` is **suspended** (“unusual activity”). Support (Dayz) authenticated the account. Service request **7109261224**. Identity verification **failed**: business-registration address does not match the address on the ads account. Sid told them the business moved. **Next:** update the NY business registration so it matches the address already on the Microsoft account, then contact support again to submit that document. **Two** verification attempts left. The ads UI is a full block with no upload. Do **not** open a second account. Chat closed with “come back when the new document is ready.”
- **Sep 2 tCPA diagnostic** — portfolio **$90 → $105**. **Hold $105.** Week-1 ~$105 CPA / 5.9 conv; CRM Google 0.52→0.90/day. mCPA ~$183 immature tail.
- **$1M mix** — paid 50–60/mo is **stretch**; current rate ≈ **$400–550K** 2028-type year without B2B/CAQH/RA landing. 📖 [expansion-next-steps.md](expansion-next-steps.md)
- **Sep 1 recovery actions** — Core Exact audit: checkout→purchase leak; **paused** Formation-Core unpinned. Attorneys RSA **v5** later **DISAPPROVED** (Sep 2); AG paused. June drop **closed** (Jun 7 tCPA, not match-type). [CORE-EXACT-FUNNEL-AUDIT.md](../ads-pull-2026-09-01-weekly-sop/CORE-EXACT-FUNNEL-AUDIT.md)
- **🔴 Stop-word negative incident — found + fixed Aug 4.** Root cause of the conversion collapse: Lists A/A-FQ contained two-letter state abbreviations as **phrase** negatives, so `in` (Indiana) blocked every query containing "in" (also `or`, `me`). Self-blocked 14/44 of `01`'s keywords, 21/33 of `03`, 9/40 of Sales. Eligible auction volume on Sales fell 12,030 → 576/week with budget untouched at $500/day. Removed 94 abbreviations; reverted Sales geo to `PRESENCE_OR_INTEREST`; verified 0 self-blocked. See [google_ads_changes.md](../google_ads_changes.md).
- **`02` Attorneys RSA v5 (Sep 2)** — **DISAPPROVED**. Ad group **PAUSED** (`196018838817`). Stop copy churn. See [google_ads_changes.md](../google_ads_changes.md)
- **SEO / content moat** — [nypllc-seo-content-moat-plan.md](../nypllc-seo-content-moat-plan.md). Shipped: `/nysed-approval-times`, `/ny-pllc-cost`, `/how-long-to-form-a-pllc-in-ny` (Jul 22); OP deficiencies `#4` `/nysed-op-deficiencies` and PLLC vs LLC `#5` `/pllc-vs-llc` (**live Sep 4**). MSO page **built unpublished** (not in `app/`; Vercel 404s `/ny-mso`). 20-term tracker: [`seo-rank-tracker.csv`](../seo-rank-tracker.csv). See [features/seo-and-domain.md](features/seo-and-domain.md) · [features/mso-msa.md](features/mso-msa.md)
- **Revenue levers (website surface)** — [nypllc-revenue-levers-plan.md](../nypllc-revenue-levers-plan.md). **Direct-RA Lever 1 LIVE Aug 25** (`DIRECT_RA_NOTICES_LIVE` on CRM Production). **CAQH Sep 16 sends done:** checkout-interest 3 + `FORMATION_COMPLETE` backlist 20, each with a $499 hosted invoice. **CAQH interest checkbox live Aug 26** on Spiffy (no charge; CRM `caqhInterest` + staff badge). **Mercury + Gusto Impact applied Aug 14**; **third ping Sep 1**. Spiffy checkbox live: **S Corp $195**. Sales tax Certificate of Authority **removed from checkout Aug 18** (low take rate). Remaining: DBA, VM copy. **CAQH paid SKU paused** ($0 base). **$985 test Nov** (not February). Expedite SKU **removed Aug 17** (already in $885). See [features/revenue-levers.md](features/revenue-levers.md) · [CRM launch status](../../PLLC-CRM/crm/docs/direct-ra-launch-status.md) · [caqh-pilot-launch.md](../../PLLC-CRM/crm/docs/caqh-pilot-launch.md)
- **Phase 1 live:** `Sales-Search-1` + `01_Core_Exact_NY` + **`02_Professions_NY`** + **`03_ForeignQual_US`** on portfolio tCPA **$105 hold**. `03` has **8 groups / 39 keywords / 16 RSAs**; CA + CO ads **APPROVED**.
- **NY → Colorado FQ (Sep 10 2026)** — Statement of Foreign Entity Authority **$100** SOS; list **$500** ($400 profit). Chart: [`data/ny-outbound-foreign-qualification.json`](../data/ny-outbound-foreign-qualification.json). CRM SoT in PLLC-CRM. See [features/foreign-into-ny.md](features/foreign-into-ny.md)
- **California foreign-into-NY page LIVE Sep 16** ($905; selector, canonical metadata, and sitemap verified in production). State coverage: NJ/PA/FL/TX/CT/CA/CO.
- **Foreign publication copy (HARD — Aug 10 2026):** flat package **includes** end-to-end six-week publication. Never “guidance” / “not included unless quoted.” See [features/foreign-into-ny.md](features/foreign-into-ny.md).
- Ops fulfillment lives in **PLLC-CRM** (sibling repo) — not this codebase
- **MSO path (offer locked Aug 31 2026)** — PLLC + management LLC **$1,770**. Counsel MSA **$945** (unnamed on site). Pair RA **$149/yr**; pair VM **$85/mo**. No medspa. **Ads wait.** Page built under [`web/src/unpublished/ny-mso/`](../web/src/unpublished/ny-mso/) — **not live**; Vercel rewrites `/ny-mso` to 404. Do not move into `app/` until Sid launches. [features/mso-msa.md](features/mso-msa.md)
- **Domestic NY PC (Sep 3 2026)** — off-menu **MSO-ready Practice PC** manual quote **$1,285** flat; no site/Spiffy SKU. Future standard PC list **$885** (PLL parity). SoT: [features/domestic-ny-pc.md](features/domestic-ny-pc.md)

## Expansion priorities (90-day window — Oct 16 2026)

📖 **Operational SoT:** [**nypllc-90-day-execution-checklist.md**](../nypllc-90-day-execution-checklist.md) · [decision-log.md](../decision-log.md) · [scorecards/](../scorecards/) · [ops/90-day-task-board.md](../ops/90-day-task-board.md)  
📖 **Strategy / hurdle:** [**integrated operating plan v3**](../nypllc-integrated-operating-plan.md) §6 ($1.053M / $1.179M, still priced at 125 formations/month). **Oct 21:** levers support **111–115/month** with the 30 partner target and Bing, else **107–111**. [decision-log.md](../decision-log.md). Sprint calendar: [expansion-next-steps.md](expansion-next-steps.md).

**P1-01 closed Oct 20:** [ops/p1-01-ownership.md](../ops/p1-01-ownership.md) (Sidney is Sid and Ops; calendar holds; capacity).

**P1 (Oct 16–29):**

1. **Economics baseline** — CRM `baseline-financial-export.ts` + weekly scorecard template; formation contribution per P1-03. **P1-03 trace Oct 21:** finished $885 PLLC **$514** upfront / **$513** on four payments. [TRACE](../../PLLC-CRM/crm/reports/p1-03-2026-10-21/TRACE.md). Labor, P&L, and the acquisition allowance are still open.
2. **Direct RA** — **Oct 23 first renewal (T & C): no card → invoice voided after 3 attempts; customer canceled Oct 27; RA resignation filing is a CRM task.** Oct 30–Jan 31: 100 subs, **13 with no card** (12 due Nov 3–18), all got T-30; T-7 runs on cron. No manual outreach. `ra-renewal-card-check.ts` fixed Oct 29 (it had overcounted at 89). [Day-14 review](../ops/p1-12-day14-review-2026-10-29.md)
3. **B2B — active** — Wave 3 (16, Oct 19): **0 replies**. The one follow-up was **sent late, Oct 29** (16/16 in-thread; [log](../../PLLC-CRM/crm/reports/b2b-partner-outreach-wave3-followup-send.json)). No more touches to these 16. Next: pick a new segment for the Nov 3 block. Productive partners 2/47, repeat 0. [service sheet](../../PLLC-CRM/crm/reports/p1-10-2026-10-20/service-sheet.md) (**PLLC-CRM** + Sid)
4. **$985 test** — **HOLD (Sid Oct 29)**; re-decide **Nov 9**. Site price is centralized (merged `f9e058b`: one env var `NEXT_PUBLIC_FORMATION_LIST_PRICE`; live is unchanged at $885). P1-11 rules drafted in [price-test-985.md](../docs/price-test-985.md). **Break-even ≈ 12% volume loss** once VM/RA/add-ons are counted (16% formation-only). Open Sid calls: referral $960 vs $860, visitor denominator, Ops 1-day SLA, partner-terms read. Test-day items outside code: OG image, Spiffy price, Ads price assets. [Day-14 review](../ops/p1-12-day14-review-2026-10-29.md)
5. **Nov 1 (Sid-run, in session): finalize ads memo** — Hold $105 adopted Oct 29 ([decision-log](../decision-log.md)). On Nov 1 Sid asks the agent to: re-pull Oct 1–31 (`google_ads_cli.py query` daily + campaign + `01` ad approval) into `ads-pull-2026-11-01-nov1/`; run CRM `orders-attribution.ts --monthly --since 2026-09-01`; add a "Final October" table to [NOV1-DUAL-MEMO.md](../ads-pull-2026-10-21-nov1-memo/NOV1-DUAL-MEMO.md); check the revisit triggers (Oct CPA > $150 or CRM Google orders < 25 → flag only, no account change); check off the P1-09 memo bullet. **No scheduled/unattended run.**
7. **Ads** — **Hold $105 adopted Oct 29** for the Nov 1 gate (October: $3,401 / 33 conv / $103 CPA; 34 CRM Google orders). Three `01` ads still DISAPPROVED; appeals are Sid's UI action. No auto **$10K January**.
6. **Trust copy (P1-08)** — `TRUST_MARKETING` + live GBP on order / order-llc / contact; ads claim **25,000+** where used.
7. **CAQH — paused** — $0 base forecast; comparison page stays; no outreach. EIN attach **OFF**.
8. **Customer interviews + mobile checkout** — script [docs/customer-interview-script.md](../docs/customer-interview-script.md).
9. **P1-12 Day-14 review held Oct 29** — [Day-14 review](../ops/p1-12-day14-review-2026-10-29.md). Still open: Oct 19–25 scorecard (Nov 2 meeting), revised 90-day priorities.

## Ads ops

1. **Sep 28 SOP:** **Hold $105.** Pre-register Sep 29–30 does not meet $120 bars.
2. **Bing:** update the business registration address to match the Microsoft account, then return to support. Do not open a second account.
3. Customer Match **uploaded Sep 5** (`9465911299`; job RUNNING; size 0 until match). Auction Insights **done Sep 5**. Do **not** Targeting-attach.
4. **Oct:** mobile LP + publication-cost calculator on LPs (not publishing-only). **$985 test Nov** (see checklist P1-11)
5. **Weekly SOP done Sep 28**. Attorneys AG paused; no copy churn. **Sep 29–30: hold $105** (do not apply $120).
6. **Nov 1 dual verdict** → freeze **Nov 15–Dec 1**. January spend is conditional (no automatic surge).

## Active decisions

- Canonical domain: **https://www.nypllc.com** only
- Payments: **Spiffy.co** embedded checkout (not Stripe on-site)
- Partner coupons: apply via referral capture + Spiffy ready hooks before/when embed mounts
- GA4 `purchase` fires on confirmation; **not** imported to Google Ads (avoid double-count)
- Google Ads primary: tagged Spiffy Purchase (`7678072764`, real `$` from `total=`); page-load secondary (`7353506045`)
- Ads volume claim: **thousands / 25,000+** NY entities (not “300+”); sitelinks only to real sitemap URLs
- Reviews: NYPLLC **GBP** only (not Trustpilot); live **5.0 / 6 reviews** (Jul 9 2026) — keep `BUSINESS_INFO.googleReviews` in sync
- Profession / foreign pages: formation/qualification scope only — do **not** over-claim board coordination
- **MSO:** print $1,770 only; **do not print a counsel fee** (simple-case MSA stays $945 internally; counsel quotes); **do not name Jonah** on site/ads; intro at DOS only; CheapNewYorkLLC not the public face of the management LLC
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
| $985 price test — **Nov 2–4** after P1-12 | [price-test-985.md](../docs/price-test-985.md) |
| Spiffy checkbox live: S Corp $195; sales tax **off checkout Aug 18**; CAQH paid SKU **paused** | [revenue levers plan](../nypllc-revenue-levers-plan.md) |
| **CAQH paused Oct 14** — 0 paid; EIN attach off; comparison page stays live; **$0** base forecast | [decision-log.md](../decision-log.md) · [caqh-pilot-outcomes-oct-2026.md](../../PLLC-CRM/crm/docs/caqh-pilot-outcomes-oct-2026.md) |
| **Direct-RA notices live (Aug 25)** — checkout disclosure **audited Aug 26**; staff **$99 CoC** + **$249 Compliance Plan** paths confirmed. First T-30s ~Sep 22; Oct charges | [CRM launch status](../../PLLC-CRM/crm/docs/direct-ra-launch-status.md) |
| B2B outreach **active** (first sends Oct 19); include wholesale/OOS; Headway/Alma are a secondary platform segment | [expansion-next-steps.md](expansion-next-steps.md) · [b2b-partners.md](../../PLLC-CRM/memory-bank/features/b2b-partners.md) |
| **MSO path** — offer locked; **page unpublished** (not in `app/`; Vercel 404 `/ny-mso`); **no ads**; do not name Jonah | [features/mso-msa.md](features/mso-msa.md) |

## Recent changes

📖 Full log: [session-history.md](../docs/session-history.md)

Latest (Oct 29 2026): **P1-12 Day-14 review** — [Day-14 review](../ops/p1-12-day14-review-2026-10-29.md). $985 **held to Nov 9**; Nov 1 ads **hold $105**; site price centralized and merged (live $885); B2B follow-up sent (0 replies); P1-11 drafted with break-even ≈12%; **VM has zero overhead** ($50/mo, postage billed through); first RA renewal didn't pay and was canceled.

Latest (Oct 3 2026): **Daily Ads SOP** — 7d CPA **$355** / 2 Purchase; 30d **$141** / 17.77 click-attributed Purchase; October MTD **$94** / 2. Sales eligible **4,168** in 7d; self-block **0**; Ads↔CRM 30d **−6.5%**. **Hold $105**; no account changes. Enabled-ad policy snapshot has 3 DISAPPROVED ads in `01`. [DAILY-SOP.md](../ads-pull-2026-10-03-daily-sop/DAILY-SOP.md).

Latest (Sep 28 2026): **Weekly Ads SOP §7.1** — 7d CPA **$228** / 2 conv; 30d **$115** / 21. Self-block 0. Ads Spiffy 21 vs CRM 20 (+5.0%). No account changes. $105 day 26; Sales ISO week Sep 21 **3,470**. Sep 29–30 pre-register = **hold $105**. [WEEKLY-SOP.md](../ads-pull-2026-09-28-weekly-sop/WEEKLY-SOP.md).

Latest (Sep 23 2026, later): **Microsoft Advertising blocked.** Login `contact@nypllc.com`. Support authenticated the account. Service request **7109261224**. Verification failed because the business-registration address does not match the address on the account. Sid said the business moved. Update the NY registration to match the ads account, then contact support to submit. Two attempts left. UI has no upload. Do not open a second account.

Latest (Sep 23 2026): **Weekly Ads SOP §7.1** — 7d CPA **$152** / 2 conv; 30d **$136** / 18. Self-block 0 except **`03` Colorado ×3** on A-FQ. Ads Spiffy 18 vs CRM 17 (+5.9%). No account changes. $105 day 22; Sales ISO week Sep 14 **3,943**. Sep 2–21 pre-register = **hold $105**. CA/CO RSAs approved. [WEEKLY-SOP.md](../ads-pull-2026-09-23-weekly-sop/WEEKLY-SOP.md).

Latest (Sep 17 2026): **Daily Ads SOP** — 7d CPA **$138** / 4.88 conv; 30d **$128** / 20 conv; Sep MTD **$110** / 15. `01` **6.5** lifetime (0 conv 7d). Ads↔CRM 30d **0%**; 7d −19% (small-n). No account changes. $105 day 16; Sales eligible 7d **3,969**; **`03` ENABLED** (2 impr). [DAILY-SOP.md](../ads-pull-2026-09-17-daily-sop/DAILY-SOP.md).

Latest (Sep 13 2026): **Weekly Ads SOP §7.1** — 7d CPA **$133** / 4.88 conv; 30d **$133** / 18 (week 2 over freeze $130). Self-block 0. Ads Spiffy 18 vs CRM 17 (+5.9%). No account changes. $105 day 12; Sales ISO week **4,062**. `01` **6.50** lifetime. Gate 2 volume fail expected; **`03`+Bing still Sep 15–22**. [WEEKLY-SOP.md](../ads-pull-2026-09-13-weekly-sop/WEEKLY-SOP.md).

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
