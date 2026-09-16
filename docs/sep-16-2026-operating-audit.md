# Operating audit — Sep 16, 2026

**Pulled:** Sep 16, 2026 (UTC-4).  
**Ads API pull:** [ads-pull-2026-09-16-audit/](../ads-pull-2026-09-16-audit/) (post-raise Sep 2–16, rolling 30d, pre-raise Aug 26–Sep 1, snapshot Sep 16).  
**Prior SOPs cited where Sep 16 pull does not duplicate weekly ISO eligible math.**

---

## A. Ads — the $105 raise verdict

### 1. Confirm the raise happened

**Yes.** Portfolio **NYPLLC Search Portfolio** target CPA **$90 → $105** on **2026-09-02** (Sid amendment).

| Field | Value |
|-------|--------|
| Date | **2026-09-02** |
| Old tCPA | **$90** |
| New tCPA | **$105** (`target_cpa_micros = 105000000`) |
| Script | `google_ads/set_portfolio_tcpa.py` |

📖 [google_ads_changes.md § Changes on 2026-09-02](../google_ads_changes.md) (lines 134–141).

Judgment window: ≥14 days. **Sid reading (Sep 16):** hold **$105**. Week-1 **~$105 CPA / ~5.9 conv**; week-2 lag; Sep 14 eligible **~7k/wk pace** (partial ISO week). CRM Google **0.52 → 0.90/day**. Account mCPA **~$183** is **biased by an immature tail**. Do **not** raise to $120 on today's data. **Pre-register Sep 29–30** (see operating plan §0.5).

Success bar remains Sales eligible **4,500–5,000+/week** on a **full** ISO week; failure = eligible still ~3.3–3.7k with spend up / auctions flat → revert $90.

---

### 2. `ads_incrementality.py recovery --weeks 8` — Sales eligible volume

Command run Sep 16: `.venv/bin/python ads_incrementality.py recovery --weeks 8`

**Sales-Search-1 eligible (impressions ÷ impression share):**

| ISO week ending | Eligible | Impr | Clicks | Cost | Ads conv |
|---------------|----------|------|--------|------|----------|
| **2026-08-24** | **3,283** | 530 | 35 | $330 | 1.0 |
| **2026-08-31** | **3,512** | 543 | 44 | $559 | 5.6 |
| **2026-09-07** | **4,099** | 677 | 50 | $505 | 2.9 |
| **2026-09-14** | **2,033** | 385 | 25 | $293 | 1.0 |

**Verdict:** Post-raise weeks **climbed** from the ~3.3k floor (Aug 24 **3,283**) through Aug 31 **3,512** to Sep 7 **4,099** — directionally toward the **4,500+** success bar. Sep 14 **2,033** is a **partial ISO week** (Mon–Tue only through pull date); do not treat it as a collapse.

Cross-check (weekly SOP ISO labels): Aug 24 **3,140**, Aug 31 **3,477**, Sep 7 **4,062** — same story. 📖 [google_ads_changes.md § 2026-09-13](../google_ads_changes.md) (line 26).

---

### 3. Same series — `01_Core_Exact_NY`

| ISO week ending | Eligible | Impr | Clicks | Cost | Ads conv |
|---------------|----------|------|--------|------|----------|
| 2026-08-24 | 292 | 123 | 14 | $106 | 0.0 |
| 2026-08-31 | 543 | 171 | 20 | $206 | 2.5 |
| 2026-09-07 | 366 | 197 | 17 | $147 | 2.0 |
| 2026-09-14 | 172 | 44 | 3 | $27 | 0.0 |

`01` eligible **nearly doubled** Aug 24 → Aug 31 post-raise, then eased; Sep 14 again partial week.

---

### 4. Standard pull — campaigns + keywords + conversion actions

**Post-raise window:** 2026-09-02 → 2026-09-16 (15 days)  
**Rolling 30d:** 2026-08-17 → 2026-09-16 (31 days)

Sources:  
- [post-raise campaigns](../ads-pull-2026-09-16-audit/post-raise/Ads%20-%20campaigns_api_2026-09-02_to_2026-09-16.csv)  
- [rolling-30d campaigns](../ads-pull-2026-09-16-audit/rolling-30d/Ads%20-%20campaigns_api_2026-08-17_to_2026-09-16.csv)  
- [post-raise keywords](../ads-pull-2026-09-16-audit/post-raise/Ads%20-%20keywords_api_2026-09-02_to_2026-09-16.csv)  
- [post-raise conversion actions](../ads-pull-2026-09-16-audit/post-raise/Ads%20-%20conversion-actions_api_2026-09-02_to_2026-09-16.csv)

#### Post-raise (Sep 2–16) — by campaign

| Campaign | Spend | Conv (click-attr) | CPA | Clicks | Impr | Budget-lost IS |
|----------|-------|-------------------|-----|--------|------|----------------|
| Sales-Search-1 | $1,156 | 6.77 | $171 | 102 | 1,405 | **0.0%** |
| 01_Core_Exact_NY | $325 | 3.00 | $108 | 32 | 347 | **0.0%** |
| 02_Professions_NY | $9 | 0.00 | — | 2 | 20 | **0.0%** |
| **Account** | **$1,489** | **9.77** | **$152** | 136 | 1,772 | **0.0%** |

Impression share / rank-lost (API daily rollup — use weekly SOP for stable IS): 📖 [WEEKLY-SOP Sep 13](../ads-pull-2026-09-13-weekly-sop/WEEKLY-SOP.md): `01` 7d IS **~61%**, 30d **~49%**; Sales budget-lost **0%**.

#### Rolling 30d (Aug 17–Sep 16)

| Campaign | Spend | Conv | CPA | Clicks | Impr | Budget-lost IS |
|----------|-------|------|-----|--------|------|----------------|
| Sales-Search-1 | $2,071 | 13.50 | $153 | 193 | 2,680 | **0.0%** |
| 01_Core_Exact_NY | $588 | 4.50 | $131 | 72 | 659 | **0.0%** |
| 02_Professions_NY | $18 | 0.00 | — | 3 | 37 | **0.0%** |
| **Account** | **$2,677** | **18.00** | **$149** | 268 | 3,376 | **0.0%** |

Primary conversion action (Spiffy Purchase `7678072764`): **9.77** conv / **~$9,400** value in post-raise window (sum of daily rows in conversion-actions CSV).

---

### 5. May-failure detector (impressions/day, avg CPC)

| Window | Days | Impr/day | CPC | Spend/day |
|--------|------|----------|-----|-----------|
| **Pre-raise** Aug 26–Sep 1 | 7 | **94** | **$9.31** | $72 |
| **Post-raise** Sep 2–16 | 15 | **118** | **$10.95** | $99 |

**Call:** **Partial May pattern** — spend up (+38%/day) and CPC up (+18%), but impressions/day also up (+26%), not flat. Not a clean “buying rank again with zero volume” signature; more “paying more per click with modest volume lift.” Rank-lost IS remains dominant (~88–90% on Sales/`01` in post-raise rollup).

---

### 6. Budget-lost at higher target?

**Yes — still 0%** on Sales, `01`, and `02` in post-raise and rolling-30d pulls. **No campaign budget-capped** at portfolio tCPA $105.

---

### 7. `01` zero-impression exacts post-raise

Post-raise keyword report (Sep 2–16), Formation-Core exacts:

| Keyword | Impr | Clicks | Cost |
|---------|------|--------|------|
| **`form a pllc in new york`** | **0** | 0 | $0 |
| **`start a pllc in new york`** | **0** | 0 | $0 |
| `form a pllc in ny` | 7 | 0 | $0 |
| `start a pllc in ny` | 1 | 0 | $0 |

Snapshot Sep 16: both long-form exacts **ENABLED / ELIGIBLE** (not RARELY_SERVED). 📖 [keyword-settings snapshot](../ads-pull-2026-09-16-audit/snapshot/Ads%20-%20keyword-settings_api_snapshot_2026-09-16.csv) (lines 29, 38).

**Verdict:** Still **zero impressions** on `[form a pllc in new york]` and `[start a pllc in new york]` despite ELIGIBLE status — not “finally serving.” Shorter variants get trace volume.

---

### 8. Search terms since Sep 2 — top ~20 by spend

Source: [search-terms Sep 2–16](../ads-pull-2026-09-16-audit/post-raise/Ads%20-%20search-terms_api_2026-09-02_to_2026-09-16.csv)

| Spend | Clicks | Conv | Term |
|-------|--------|------|------|
| $165.33 | 20 | 1.1 | nypllc |
| $100.24 | 9 | 1.0 | ny pllc formation |
| $62.87 | 6 | 1.0 | pllc new york |
| $54.97 | 4 | 1.0 | pllc formation new york |
| $53.00 | 2 | 0 | new york pllc formation |
| $44.36 | 4 | 1.0 | pllc |
| $27.67 | 1 | 0 | starting a pllc in ny |
| $24.58 | 3 | 0 | ny pllc |
| $20.16 | 1 | 0 | ny pllc checklist |
| $18.13 | 1 | 0 | form pllc new york |
| $17.65 | 1 | 0 | mss pllc |
| $17.61 | 1 | 0 | creating a pllc |
| $16.10 | 1 | 0 | how to create a pllc in ny |
| $13.58 | 1 | 0 | business filing solutions |
| $13.22 | 1 | 0 | apply for pllc |
| $11.44 | 1 | 0 | register pllc |
| $11.25 | 1 | 0 | pllc application |
| $8.25 | 1 | 0 | pllc formation in new york |
| $4.17 | 1 | 0 | pllc ny |
| $4.00 | 1 | 0 | pllc formation |

**Junk watch:** `mss pllc`, `business filing solutions`, `ny pllc checklist` — small spend, zero conv. Core commercial terms still dominate; no broad junk flood.

---

### 9. Attorneys RSA v5 — approval status (~Sep 8 check)

**Still DISAPPROVED.** Ad group **PAUSED** 2026-09-02.

| Ad ID | Name | Ad status | Policy |
|-------|------|-----------|--------|
| 823134166556 | Attorneys — controlled | ENABLED | **DISAPPROVED** |
| 823134166682 | Attorneys — unpinned | ENABLED | **DISAPPROVED** |

AG `196018838817` **PAUSED** (Sep 2). 📖 Sep 13 snapshot: [02-rsa-policy](../ads-pull-2026-09-13-weekly-sop/Ads%20-%2002-rsa-policy_api_snapshot_2026-09-13.csv) (lines 8–9). 📖 [google_ads_changes.md § 2026-09-02](../google_ads_changes.md) (lines 141–142).

**`02` conversions post-raise (Sep 2–16):** **0.0** (20 impr / 2 clk / $8.86). Same as pre-pause era — Attorneys not serving; other profession AGs can serve.

---

### 10. `03_ForeignQual_US` — Sep 15–22 launch window

**Not launched as of Sep 16.**

| Field | Status |
|-------|--------|
| Campaign status | **PAUSED** |
| Bidding | Inline **MAXIMIZE_CONVERSIONS** (not portfolio-attached) |
| Budget | **$15/day** |
| Geo | US Presence (draft config unchanged) |
| List **A-FQ** | **Attached on draft** (shared set `12146898703`, 45 terms) — ready when enabled |
| Impressions post-Sep 15 | **None** (campaign paused) |

📖 [campaign-settings Sep 16](../ads-pull-2026-09-16-audit/snapshot/Ads%20-%20campaign-settings_api_snapshot_2026-09-16.csv)  
📖 [campaign-shared-sets Sep 13](../ads-pull-2026-09-13-weekly-sop/Ads%20-%20campaign-shared-sets_api_snapshot_2026-09-13.csv) (lines 7–11)  
📖 [google_ads_changes.md](../google_ads_changes.md) line 9: “Unattached PAUSED: `03_ForeignQual_US`”

Calendar still says enable **Sep 15–22**; today Sep 16 = **inside window, not executed**.

---

### 11. Bing — account / import / UET

**Not live.**

- Weekly SOP Sep 13: “Microsoft Ads: **not started**; enable Sep 15–22.” 📖 [WEEKLY-SOP.md §10](../ads-pull-2026-09-13-weekly-sop/WEEKLY-SOP.md) (line 145).
- Site: Bing UET tag **`187221859`** on `lazyOnload` (measurement only). 📖 [session-history.md § Jul 12](../docs/session-history.md).
- **Blocker:** Microsoft Import + scale deliberately gated to Sep 15–22 alongside `03`; not executed by Sep 16.

---

### 12. Auction Insights UI export

**Done — no longer overdue.**

| Field | Value |
|-------|--------|
| Export date | **2026-09-05** |
| Window | Sales-Search-1, **90d** Jun 8–Sep 5 |
| You IS | **13.81%** |
| File | [Ads - auction-insights_ui_Sales-Search-1_2026-06-08_to_2026-09-05.csv](../ads-pull-2026-09-05-weekly-sop/Ads%20-%20auction-insights_ui_Sales-Search-1_2026-06-08_to_2026-09-05.csv) |

📖 [google_ads_changes.md § 2026-09-05](../google_ads_changes.md) (lines 117–118).

**Next refresh:** manual UI export (API still cannot pull auction insights).

---

## B. Checkout leak

### 13. Abandoned-checkout email

| Item | Status |
|------|--------|
| **Shipped** | **Yes** — CRM `CheckoutAbandonment` + cron 1h/24h Gmail (Sep 2) |
| **Site beacon** | `POST /api/checkout-abandonment` → CRM public ingest; Spiffy field hook via `useSpiffyFormEngagementTracking` |
| **Live date** | Code + cron **Sep 2, 2026** 📖 [PLLC-CRM activeContext.md](../../PLLC-CRM/memory-bank/activeContext.md) |
| **Trigger** | 1h after `beginCheckoutAt`; 24h second touch; suppress on Spiffy order-success |
| **Production rows** | **`CheckoutAbandonment` count = 0** (Sep 16) — cron runs hourly with `processed: 0` |
| **Sends / opens / recoveries** | **0 / 0 / 0** — no events ingested yet |
| **Recovery tagging** | No `recoveredAt` column; recovery = suppress on order (`suppressCheckoutAbandonmentForEmail`, reason `order_success` / `order_exists`). Attribution would be untagged CRM order after resume, not a dedicated flag. |

📖 [analytics-tracking shard](../memory-bank/features/analytics-tracking.md) · [process-checkout-abandonment-sends.ts](../../PLLC-CRM/crm/lib/checkout-abandonment/process-checkout-abandonment-sends.ts)

**Gap:** Pipeline live but **zero abandonments recorded** — likely ingest volume (checkout email capture) not firing in prod yet, not cron failure.

---

### 14. Sitewide September funnel (begin checkout vs purchase)

**Google Ads all_conversions (Spiffy embed begin checkout vs Spiffy purchase), Sep 2–16 post-raise:**

| Action | All conv |
|--------|----------|
| Begin checkout (Spiffy embed) | **44.82** |
| Purchase (Spiffy thank-you value) | **9.77** |
| Purchase (page-load confirmation) | **9.88** |

Rough sitewide leak ratio: **~45 begins → ~10 purchases ≈ 22%** (Ads-attributed; not full GA4 sitewide).

Sep 1–13 MTD (prior pull): Begin **38.0** vs Purchase Spiffy **12.0** ≈ **32%**.  
Source: [conversion-actions Sep 2–16](../ads-pull-2026-09-16-audit/post-raise/Ads%20-%20conversion-actions_api_2026-09-02_to_2026-09-16.csv), [Sep MTD](../ads-pull-2026-09-13-weekly-sop/sep-mtd/Ads%20-%20conversion-actions_api_2026-09-01_to_2026-09-13.csv).

**CRM Sep orders:** 32 formation orders (excl VM-only); 14 with `gclid` (43.8% of 32).

---

## C. RA — pre-flight for Sep 22 (go/no-go)

### 15. `spot-check-direct-ra-notices.ts` (Production DB, Sep 16)

```
DIRECT_RA_NOTICES_LIVE (local env): false

=== T-30 window (29-31 days out) ===
Window: 2026-10-15 to 2026-10-17
Candidates now: 0

=== Oct 2026 billing cohort (first 5) ===
 - T & C Family Dentistry PLLC | billingStartsAt: 2026-10-23 | t30Sent: null | stripe: sub_1StvnCKGsQmz

=== Recent CRON_DIRECT_RA_NOTICES runs ===
 - 2026-09-16T15:00:02.990Z statusCode: 200 {"ok":true,"noticesLive":true,"t30Sent":0,"t7Sent":0,"failed":0}
 … (daily failed=0 through Sep 10)
```

**Note:** Local `.env` shows `DIRECT_RA_NOTICES_LIVE=false`; **Production cron payload `noticesLive: true`** confirms live on Vercel. 📖 [direct-ra-launch-status.md](../../PLLC-CRM/crm/docs/direct-ra-launch-status.md) (line 60).

---

### 16. Sep 22 cohort — T-30 count and October charges

| Cohort | Count | Detail |
|--------|-------|--------|
| Billing date **2026-09-22** (T-30 target that day) | **0** | No RA subs billing that day |
| **First Oct 2026 charge** | **1** entity | T & C Family Dentistry PLLC — `billingStartsAt` **2026-10-23** |
| **T-30 for first charge** | **~2026-09-23** (not Sep 22) | Spot-check Sep 16: T-30 window empty until ~Oct 15 for Oct 23 billing |
| **Oct 2026** `billingStartsAt` cohort | **1** | |
| **Nov 2026** cohort | **23** | |
| **Dec 2026** cohort | **31** | |
| **Oct–Dec 2026** total | **55** | First bulk charges Nov–Dec; Oct is a **single early bird** |

📖 [direct-ra-launch-status.md](../../PLLC-CRM/crm/docs/direct-ra-launch-status.md) — “first T-30s ~Sep 22” was approximate; **data says first billing Oct 23 → T-30 ~Sep 23**.

---

### 17. Five A/B confirmations (Compliance Plan pilot)

| # | Check | Status |
|---|--------|--------|
| **(a)** Arm persists T-30 → T-7 | **Yes** — sticky `compliancePlanOfferInPilot` on subscription; `pickCompliancePlanOfferForCohort` copies sibling arm 📖 [direct-ra-launch-status.md § Compliance Plan A/B](../../PLLC-CRM/crm/docs/direct-ra-launch-status.md) (line 9) · [assign-compliance-plan-offer-in-pilot.ts](../../PLLC-CRM/crm/lib/direct-ra/assign-compliance-plan-offer-in-pilot.ts) |
| **(b)** Amounts live from subscription | **Yes** — `amountCents` on subscription; upgrade → **$249/yr** Compliance price `price_1U3jJCKGsQmzBSf3tCnS4QGf` |
| **(c)** Both email templates / stop-charge prominence | **Templates exist** — `directRaT30Notice` / `directRaT7Notice` with primary **“Stop the renewal charge”** button before update-card 📖 [direct-ra-notices.ts](../../PLLC-CRM/crm/lib/email-templates/direct-ra-notices.ts) (lines 93–103). **No live cohort sends yet to eyeball in Gmail.** |
| **(d)** Per-customer log fields | **Partial** — `DirectRaNoticeLog` (sent/status per notice type); subscription fields: `compliancePlanOfferInPilot`, `complianceUpgradeClickedAt`, `raRenewalChargeOutcome`, `raRenewalDisputedAt`, `cancelAtPeriodEnd`, `t30NoticeSentAt`, `t7NoticeSentAt` 📖 [schema Subscription + DirectRaNoticeLog](../../PLLC-CRM/crm/prisma/schema.prisma) |
| **(e)** Customer-level assignment (multi-entity owners) | **Yes** — advisory lock on Stripe customer id ∪ billing email; siblings reconciled 📖 [assign-compliance-plan-offer-in-pilot.ts](../../PLLC-CRM/crm/lib/direct-ra/assign-compliance-plan-offer-in-pilot.ts) (lines 40–48) |

Export script for outcomes: `npx tsx scripts/export-direct-ra-pilot-outcomes.ts` (per launch-status doc).

---

### 18. Stop-charge link — tokenized no-login; confirmation; grace window

| Item | Status |
|------|--------|
| **Tokenized HMAC URL** | **Yes** — `buildDirectRaStopChargeUrl` → `GET /api/direct-ra/stop-charge?subscriptionId=&sig=` 📖 [compliance-upgrade-signature.ts](../../PLLC-CRM/crm/lib/direct-ra/compliance-upgrade-signature.ts) |
| **No-login confirm page** | **Yes** — GET shows confirm HTML; POST applies `cancel_at_period_end` 📖 [stop-charge/route.ts](../../PLLC-CRM/crm/app/api/direct-ra/stop-charge/route.ts) |
| **Stop confirmation** | **Redirect** to `https://www.nypllc.com/change-registered-agent?stopped=renewal` with banner — **not a separate email** 📖 [stopped-renewal-banner.tsx](../../new-york-pllc/web/src/app/change-registered-agent/stopped-renewal-banner.tsx) |
| **Grace window 60 vs 90** | **Neither** — stop sets Stripe **`cancel_at_period_end`** at **current period end** (trial year). Copy: “billing ends at the current period; we remain agent of record until DOS is updated.” No 60- or 90-day post-stop grace coded. |
| **E2E tested** | Sid approved test T-30 Aug 12 📖 [direct-ra-launch-status.md](../../PLLC-CRM/crm/docs/direct-ra-launch-status.md) |

---

### 19. Statement descriptor on live charge

**Documented:** Stripe RA product `statement_descriptor=REG AGENT`; dispute pack cites **`NYPLLC.COM* REG AGENT`**. 📖 [direct-ra-launch-status.md](../../PLLC-CRM/crm/docs/direct-ra-launch-status.md) (line 26) · [direct-ra-dispute-evidence.md](../../PLLC-CRM/crm/docs/direct-ra-dispute-evidence.md) (line 12).

**Live-mode test charge on RA renewal:** No Oct cohort charge has run yet (first billing Oct 23). E2E used throwaway PLLC Aug 12 — not a renewal descriptor proof.

---

## D. CAQH — did the real launch happen?

### 20. Full backlist (~125 healthcare, $499 + payment link)

**Not sent.**

| Wave | Status |
|------|--------|
| **Sep 4 backlist** | **7 sent** ($499 + hosted invoice) 📖 [caqh-pilot-launch.md](../../PLLC-CRM/crm/docs/caqh-pilot-launch.md) (lines 45–57) |
| **Sep 9 next 20** (FORMATION_COMPLETE) | **Queued, not emailed** — Gmail OAuth `invalid_client` on this machine |
| **Remaining list** | **~125** eligible before Sep 9 wave; **118+ still unsent** after 7 + 20 queued |
| **Paid setups** | **0** paid CAQH pilot invoices in notes |
| **Sep orders `caqhInterest=true`** | **7** (checkbox interest, not paid SKU) |

---

### 21. Eight pilot threads since Sep 1 follow-up

**No movement to paid.**

| Pilot | Status (Sep 16) |
|-------|-----------------|
| Aaron Zitouni | **Declined** (has CAQH) |
| Esther, Jonathan, Shanel, Shyavia, Zamzam, Shoshana, Kemba, Civita | Follow-up **sent Sep 1** — still awaiting |

📖 [caqh-pilot-launch.md § Outreach table](../../PLLC-CRM/crm/docs/caqh-pilot-launch.md) (lines 25–35, 41–43).

---

### 22. Blocker if not sent

**Sep 9 wave:** `send-caqh-healthcare-backlist.ts --confirm` failed — **Gmail OAuth `invalid_client`** on this clone. Must run on machine with valid OAuth for `contact@nypllc.com`. Also check Stripe for orphan `source=caqh-healthcare-backlist` invoices before re-run. 📖 [caqh-pilot-launch.md](../../PLLC-CRM/crm/docs/caqh-pilot-launch.md) (lines 70–71).

---

## E. B2B + affiliates (one line each)

### 23. EXP — defaulted to referral?

**No.** Sep 1 close-out sent (`1a05fcd4282dcc5f`); **Sep 8 rule was “default to referral if silent.”** `provision-exp-referral-partner.ts` **not run with `--confirm`** (no `B2bPartner` row for EXP in script path). **No reply** logged after Sep 1 close-out. 📖 [b2b-partners.md](../../PLLC-CRM/memory-bank/features/b2b-partners.md) (line 17).

### 24. Mercury / Gusto

**Both applied Aug 14, 2026.** Third ping **sent Sep 1** to `partnerships@mercury.com` and `affiliates@gusto.com`. **Links not live** (~4.5 weeks). **No OnPay/ADP backup application** documented or sent. 📖 [affiliate-partners.md](../docs/affiliate-partners.md) (lines 4, 71–72, 74–78).

### 25. Advocate orders / payouts since Sep 1

| Metric | Count |
|--------|-------|
| Formation orders with `referral` code (Sep 1+) | **4** |
| Stripe `charge.dispute.created` webhook logs | **0** |
| Stripe `charge.refunded` webhook logs (all time search) | **30** (not Sep-scoped) |

Advocate **payout settlement** last clean cycle **Jul 30** (4 PAID); no new payout batch queried in Sep window.

---

## F. Organic

### 26. Pieces published since Sep 1

| URL | Live date |
|-----|-----------|
| [/nysed-op-deficiencies](https://www.nypllc.com/nysed-op-deficiencies) | **Sep 4, 2026** |
| [/pllc-vs-llc](https://www.nypllc.com/pllc-vs-llc) | **Sep 4, 2026** |

**Floor 1/week:** **Met** for first week of September (2 pieces Sep 4). **No third piece** published Sep 8–16. 📖 [activeContext.md § Sep 4](../memory-bank/activeContext.md) (line 102).

---

### 27. Rank tracker Sept column + GSC Aug vs Sep

| Source | Status |
|--------|--------|
| [seo-rank-tracker.csv](../seo-rank-tracker.csv) | **Sep 2026 columns empty** — baseline Aug 4 only |
| GSC export on disk | Latest [Queries_2025-10-27_to_2026-08-02.csv](../gsc/Queries_2025-10-27_to_2026-08-02.csv) — **ends Aug 2, 2026** |
| Sep GSC trend | **Not available** without fresh Search Console export + `seo_rank_tracker.py` run |

Jul 22 pages now **~8 weeks** indexed; no automated Sep trend read in repo.

---

### 28. ChatGPT-tagged order count

**9** formation orders since **Jul 9, 2026** with `utmSource` containing `chatgpt` (CRM query Sep 16).  
Prior operating plan cited **5 of 43** with UTM from chatgpt.com at Aug 4 — now **9** with expanded window/count method.

📖 [nypllc-google-ads-operating-plan.md §0.6](../nypllc-google-ads-operating-plan.md) (line 127).

---

## G. Pulse

### 29. `orders-attribution.ts --since 2026-09-01`

```
Orders in report: 31 (VM-only excluded)
TOTAL: 31 orders | $27,889 revenue
  Google (gclid/wbraid/gbraid): 14 (45.2%)
  UTM: 0 (0.0%)
  Untagged: 17 (54.8%)

Weekly:
  2026-08-31 week: 11 orders, 54.5% Google
  2026-09-07 week: 16 orders, 43.8% Google
  2026-09-14 week:  4 orders, 25.0% Google (partial week)
```

**Vs summer floor (47–49/mo ≈ 11–12/wk):** Sep pace **~11 orders/week** in full weeks — **in line with floor**, not a step-up. Google click-ID share **not rising with tCPA** (54% → 44% → 25% by week; small-n on latest week).

---

### 30. VM subscriptions

| Status | Count |
|--------|-------|
| **active** | 73 |
| **trialing** | 15 |
| **pending** | **52** |
| past_due | 1 |
| cancelled | 10 |
| unpaid | 1 |

**MRR proxy (active + trialing):** sum `amountCents` = **$4,400/mo** (88 subs × mostly $50/mo list from samples).

**What “pending” (52) is:** Legacy **pre-Stripe VM placeholder rows** — e.g. batch `createdAt` **2026-05-20**, `amountCents` **5000**, **`stripeSubscriptionId: null`**, **`stripeCheckoutSessionId: null`**. **52/52 pending lack Stripe sub IDs.** Not active checkout sessions; historical/import stubs awaiting cleanup or activation path.

---

### 31. Disputes / refunds (baseline before RA charges)

| Type | WebhookLog count (`payload~=` search) |
|------|----------------------------------------|
| **`charge.dispute.created`** | **0** |
| **`charge.refunded`** | **30** (lifetime in log index) |

Clean dispute baseline **today**. Refunds exist historically (advocate payouts, ops, etc.) — not RA renewal disputes.

---

## Executive summary

| Area | Headline |
|------|----------|
| **$105 raise** | **Hold $105.** Week-1 ~$105 CPA / ~5.9 conv; week-2 lag; Sep 14 eligible ~7k/wk pace; CRM Google 0.52→0.90/day. mCPA ~$183 immature-tail biased. **Do not raise Oct 1 on this pull.** Pre-register **Sep 29–30** for $120. |
| **May detector** | Spend + CPC up; impressions up modestly — **not** classic capped-volume May failure. |
| **`03` + Bing** | **Still paused / not started** mid-window Sep 16. |
| **Checkout abandon** | **Shipped, zero events** — fix ingest before blaming funnel. |
| **RA Sep 22** | **First T-30 ~Sep 23** for **one** Oct 23 billing; bulk Nov–Dec (**55** subs). Prod cron healthy. |
| **CAQH** | **7 sent Sep 4**; **20 queued unsent**; **0 paid**. |
| **September orders** | **31** / **$27.9k** — on summer floor, Google share flat/down. |

---

## Pull artifacts (Sep 16)

| Artifact | Path |
|----------|------|
| Post-raise campaigns | [Ads - campaigns_api_2026-09-02_to_2026-09-16.csv](../ads-pull-2026-09-16-audit/post-raise/Ads%20-%20campaigns_api_2026-09-02_to_2026-09-16.csv) |
| Rolling 30d campaigns | [Ads - campaigns_api_2026-08-17_to_2026-09-16.csv](../ads-pull-2026-09-16-audit/rolling-30d/Ads%20-%20campaigns_api_2026-08-17_to_2026-09-16.csv) |
| Pre-raise campaigns | [Ads - campaigns_api_2026-08-26_to_2026-09-01.csv](../ads-pull-2026-09-16-audit/pre-raise/Ads%20-%20campaigns_api_2026-08-26_to_2026-09-01.csv) |
| Search terms | [Ads - search-terms_api_2026-09-02_to_2026-09-16.csv](../ads-pull-2026-09-16-audit/post-raise/Ads%20-%20search-terms_api_2026-09-02_to_2026-09-16.csv) |
| Snapshot settings | [Ads - campaign-settings_api_snapshot_2026-09-16.csv](../ads-pull-2026-09-16-audit/snapshot/Ads%20-%20campaign-settings_api_snapshot_2026-09-16.csv) |
