# Active Context

## Production state

NY PLLC marketing site (**www.nypllc.com**) is **live on Vercel**. Spiffy checkout, analytics funnel, profession pages, DIY guide, virtual-address pages, foreign-into-NY state pages, and B2B partner landing shipped.

## Current sprint

- **Google Ads Phase 0** — **conversion flip done Jul 9.** Tagged Purchase `7678072764` primary; page-load `7353506045` secondary. See [features/google-ads.md](features/google-ads.md) · [operating plan](../nypllc-google-ads-operating-plan.md)
- **🔴 Stop-word negative incident — found + fixed Aug 4.** Root cause of the conversion collapse: Lists A/A-FQ contained two-letter state abbreviations as **phrase** negatives, so `in` (Indiana) blocked every query containing "in" (also `or`, `me`). Self-blocked 14/44 of `01`'s keywords, 21/33 of `03`, 9/40 of Sales. Eligible auction volume on Sales fell 12,030 → 576/week with budget untouched at $500/day. Removed 94 abbreviations; reverted Sales geo to `PRESENCE_OR_INTEREST`; verified 0 self-blocked. See [google_ads_changes.md](../google_ads_changes.md).
- **Weekly SOP** — latest §7.1 **done Aug 4**: [WEEKLY-SOP.md](../ads-pull-2026-08-04-weekly-sop/WEEKLY-SOP.md) · [ads-weekly-dashboard.csv](../ads-weekly-dashboard.csv). 7d CPA **$91** / 3 conv; 30d CPA **$118** / 11 conv; `01` IS ~50% / 0 conv; Ads Spiffy 10 vs CRM click-ID 13 (+30%).
- **SEO / content moat** — [nypllc-seo-content-moat-plan.md](../nypllc-seo-content-moat-plan.md). Shipped: `/nysed-approval-times`, `/ny-pllc-cost`, `/how-long-to-form-a-pllc-in-ny` (Jul 22). Next editorial: OP deficiencies `#4`. See [features/seo-and-domain.md](features/seo-and-domain.md)
- **Revenue levers (website surface)** — [nypllc-revenue-levers-plan.md](../nypllc-revenue-levers-plan.md) in repo Aug 10. Site-side backlog: banking affiliate (EIN email), payroll affiliate (S Corp page/email), shelf SKU pages/checkouts, expedite add-on, VM checkout copy, $985 test prep (late Sep). CRM-owned RA renewal build is **PLLC-CRM**, not this repo. See [features/revenue-levers.md](features/revenue-levers.md)
- **Phase 1 live:** `Sales-Search-1` + `01_Core_Exact_NY` (Jul 9) + **`02_Professions_NY` (ENABLED Aug 4)** on portfolio tCPA $90. `03_ForeignQual_US` PAUSED, unattached (Gate 1).
- Expand **foreign-into-NY** state page coverage beyond NJ/PA/FL/TX/CT as needed
- **Foreign publication copy (HARD — Aug 10 2026):** flat package **includes** end-to-end six-week publication. Never “guidance” / “not included unless quoted.” See [features/foreign-into-ny.md](features/foreign-into-ny.md).
- Ops fulfillment lives in **PLLC-CRM** (sibling repo) — not this codebase

## Next steps

1. **Watch recovery from the Aug 4 negative fix** — eligible auction volume, impressions, and clicks on Sales + `01`. Expect `01` to start delivering on the 14 previously-blocked keywords. Re-baseline Gate 1 once a clean week exists.
2. **Close out the June mystery** — eligible volume also fell ~12,030 → ~4,000/week during June, before either Jul 8 change. Needs the **UI change log** (API retains only 30 days).
3. ~~Feed the SEO plan the paid-spend-ranked target list~~ **Done Aug 4** — saved as [`seo-target-list-2026-08-04.md`](../seo-target-list-2026-08-04.md) (regen: `seo_target_list.py`) and wired into SEO plan **Part 1.5** + Part 7. 259 actionable queries collapse onto essentially **one page**: `/` carries 88% of the paid value. **Open decision for the user:** money-page optimisation sits at #11–15 in the Part 2 editorial map while carrying 76% of paid spend — Part 1.5 recommends running it in parallel with the ★ data pieces rather than queued behind them.
   - **Scope rule added:** plain LLC out of scope (sister company). Now in [projectbrief.md](projectbrief.md) § Scope boundary + router, because projectbrief previously called CheapNewYorkLLC a "reference site to replicate," which read as *copy it* rather than *stay out of its market*.
   - **New ads question:** we pay ~$331/yr for plain-LLC clicks. If CheapNewYorkLLC bids the same terms we're bidding against ourselves — check the sister account before deciding on negative keywords.
4. **Set up the 20-term rank tracking** — the terms are now defined (Part 1.5 target list; baseline median position 32, Aug 4). Just needs a tracker wired up to measure movement.
5. Decide whether `01` / `02` should also move to `PRESENCE_OR_INTEREST` (Sales moved Aug 4; `01`/`02` still `PRESENCE`).
6. Daily 10-min on Sales + `01` + `02`. `03` after Gate 1 (~Aug 17 — currently short on account 30d volume + `01` convs).
7. **Parallel:** Customer Match UI upload; Auction Insights manual export (1st week of Aug)
8. **Mobile LP (§5.1) remaining:** first-step friction cut (lead form → Spiffy); optional Ads call-forwarding number on sticky Call (today uses `APP_CONFIG.phone`). **Shipped Jul 12:** LCP speed budget; sticky CTA + Call; mobile trust band; hero CTA alone/full-width. Remove mobile −20% only after mobile CVR ≥80% of desktop (30d) — still ~29% of desktop
9. More foreign state landings / partner / SEO when tasked
10. **Later (deferred):** offline conversion upload from CRM-stored click IDs

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
| Gate 1 (~Aug 17): need `01` ≥15 conv + account ≥28/30d — currently 0 / 11. **Re-baseline** — the 0 on `01` was largely the stop-word block, not demand | [operating plan](../nypllc-google-ads-operating-plan.md) |
| Recovery after Aug 4 negative fix: eligible volume + clicks on Sales / `01` | [google_ads_changes.md](../google_ads_changes.md) |
| June eligible-volume drop (~12,030 → ~4,000/wk) still unexplained — needs UI change log | [google_ads_changes.md](../google_ads_changes.md) |
| Never phrase-negative a common English word or a <3-char token (Aug 4 incident) | [operating plan §1.3](../nypllc-google-ads-operating-plan.md) |
| **Incrementality partly resolved** — cannibalization measured at **0.38% non-brand**; we rank pos 20–45 on all commercial terms, so paid is additive. Uplift est. **+6 to +14 orders/mo** | [operating plan §0.6](../nypllc-google-ads-operating-plan.md) |
| 20-term rank tracking still not set up — terms now defined (Part 1.5), baseline median position 32; needs a tracker to measure movement | [SEO plan](../nypllc-seo-content-moat-plan.md) |
| Money pages rank 20–45 on every commercial term. Ranking them is 6–18mo vs LegalZoom/Northwest — **do not treat the target list as a paid-search exit plan** | [SEO plan Part 1.5](../nypllc-seo-content-moat-plan.md) |
| `chatgpt.com` emerging as an unmanaged channel (5 of 43 orders since Jul 9) | [operating plan §0.6](../nypllc-google-ads-operating-plan.md) |
| Ads↔CRM ±10% gap (10 vs 13) — offline upload / attribution audit | [WEEKLY-SOP.md](../ads-pull-2026-08-04-weekly-sop/WEEKLY-SOP.md) |
| Auction Insights manual export (1st week of Aug) | [operating plan](../nypllc-google-ads-operating-plan.md) |
| Revenue levers week-one slips: banking affiliate + S Corp payroll link (planned Jul 6) | [revenue levers plan](../nypllc-revenue-levers-plan.md) |
| $985 price test — late Sep only (ads plan §4.4); never during ladder step or January | [revenue levers plan](../nypllc-revenue-levers-plan.md) · [ads plan §4.4](../nypllc-google-ads-operating-plan.md) |
| Spiffy bump / post-purchase upsell — verify once (Lever 4C + CAQH) | [revenue levers plan](../nypllc-revenue-levers-plan.md) |

## Recent changes

📖 Full log: [session-history.md](../docs/session-history.md)

Latest (Aug 4 2026): **stop-word negative incident found + fixed** (root cause of the conversion collapse); Weekly SOP §7.1 + enabled `02_Professions_NY`. Earlier (Jul 28): First formal weekly Ads SOP. Earlier (Jul 12): §5.1 mobile UX + LCP. Earlier (Jul 11): foreign qual formula pricing + search-term mining. Earlier (Jul 9): gap fixes; launch hygiene; `01` ENABLED; conversion flip.

## Session start

Read [router.md](router.md) → core files + 1–2 `features/*.md` for the task.

## Patterns (pointers only)

Cross-cutting patterns → [systemPatterns.md](systemPatterns.md). Stack → [techContext.md](techContext.md).
