# Combined audit — Ads + money launches + August pulse

**As of:** Tuesday 1 September 2026 (evening Eastern), account `1529880213` (NYPLLC).  
**What this is:** a cited snapshot of the ten questions below, using a **fresh Google Ads API pull** (same CLI as the Aug 10 weekly SOP) plus live CRM reads. It is not a strategy rewrite.

**Pull folder:** [ads-pull-2026-09-01-combined-audit/](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-combined-audit/)  
**Same-day morning weekly SOP (due Aug 31, ran Sep 1):** [WEEKLY-SOP.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-weekly-sop/WEEKLY-SOP.md)

Spend on the evening pull is a few tens of dollars higher than the morning SOP on the overlapping 30-day window (Ads is still accruing on Sep 1). Where they disagree, **this evening pull is the number**.

---

## Scorecard (read this first)

| # | Question | Verdict | Gate / target |
|---|----------|---------|----------------|
| 1 | Rolling-30d account conv + CPA | **16 conv · $130 CPA** (Aug 3–Sep 1) | Need ≥28 at ≤$105 — **FAIL** |
| 1b | Calendar August (Aug 1–31) | **16 conv · $127 CPA · $2,028 spend** | Same gate — **FAIL** |
| 1c | Honest post-fix window (Aug 4–Sep 1) | **16 conv · $127 CPA · $2,026 spend** | Same gate — **FAIL** |
| 2 | Core Exact (`01`) since Aug 4 | **3.5 conv · $402 · CPA $115 · IS 47% · rank-lost 53%** | Need ≥15 at ≤$110 — **FAIL** (first honest test still too thin) |
| 3 | Sales eligible volume | Recovered from incident (~576–1,602/wk) to **~3.3–3.7k/wk**. Not back to Jul 6 **5,072**. June tCPA drop still the ceiling. | Pre-incident ~5k/wk |
| 4 | Previously blocked keywords | **Unblocked (ELIGIBLE).** A few are serving. **Almost none converting.** `[form a pllc in new york]` has **0 impressions**. | Serving + converting |
| 5 | `02` + leftover negatives + Ads↔CRM | `02`: **$46 / 4 clicks / 0 conv.** Leftover-negatives: **0 self-blocked**. Ads↔CRM **closed to 0%** (was +30% on Aug 4). | ±10% tracking |
| 6 | CAQH | **Not taking payment.** Launch emails **sent** (Aug 25–26 + Sep 1 follow-up). **0 paid setups.** | Paid pilots |
| 7 | RA build (7 CRM items) | **All 7 shipped.** Cron live. **No cohort T-30 has gone out yet** — flare date **~Sep 22**. | First notices ~Sep 22 |
| 8 | EXP Credentialing | **Still pending** — Sep 1 close-out sent; waiting on referral vs wholesale. | Not closed, not dead |
| 9 | Affiliate links | **Not live.** Mercury + Gusto applied Aug 14; **third ping Sep 1**. | Links in EIN / S-Corp email |
| 10 | August pulse | **49 orders · $41,478.** Google click-ID **32.7%** (not 66%). VM **70 active / ~$3,460 MRR**. ChatGPT **9 tagged** (was 5 on Aug 4). SEO: **3 moat pages, none new in August.** | Google share → 66% |

**Gate 1 (launch `03` / scale):** Core Exact ≥15 conv at ≤$110 **and** account ≥28 conv / 30d at ≤$105 ([operating plan §7 / Gate 1](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/nypllc-google-ads-operating-plan.md)). **Fail / hold.** Do not launch `03`, Discovery, ladder, or Bing.

---

## How the Ads numbers were produced

Same stack as the Aug 10 weekly SOP (that SOP was **due Aug 10, ran Aug 14** — [WEEKLY-SOP.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-08-14-weekly-sop/WEEKLY-SOP.md); CLI skill: [google-ads-cli](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/.cursor/skills/google-ads-cli/SKILL.md)):

```text
.venv/bin/python google_ads_cli.py pull campaigns conversion-actions devices
  --start 2026-08-01 --end 2026-08-31
.venv/bin/python google_ads_cli.py pull campaigns conversion-actions devices keywords
  --start 2026-08-04 --end 2026-09-01
.venv/bin/python google_ads_cli.py pull campaigns conversion-actions
  --start 2026-08-03 --end 2026-09-01
.venv/bin/python ads_incrementality.py recovery --weeks 20
```

Account ping tonight: Customer ID `1529880213`, name NYPLLC, USD, `America/New_York`, not a test account.

Cost in the CSVs is `metrics.cost_micros` ÷ 1,000,000. Conversions are Google **click-time** `metrics.conversions` (data-driven attribution, so fractions like 3.5 are real). Impression share is **impression-weighted** across days. Eligible auction volume = `impressions ÷ search_impression_share`, **per campaign only** ([google-ads shard](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/memory-bank/features/google-ads.md); operating plan §1.3 diagnostic rule).

CRM orders use `Order.orderCreatedAt` (Spiffy checkout time), exclude `isVmOnly` and `[TEST]`, and treat Google as any of `gclid` / `wbraid` / `gbraid` ([orders-attribution.ts](file:///Users/sidneybrodsky/Dev/pllc-business/PLLC-CRM/crm/scripts/orders-attribution.ts); shard gotcha in [google-ads.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/memory-bank/features/google-ads.md)).

---

# Part A — Ads (the main event)

## 1. Rolling-30-day account conversions and CPA

**Gate:** account ≥28 conversions / 30 days at ≤$105 ([operating plan Gate 1](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/nypllc-google-ads-operating-plan.md)).

### 1.1 Three windows (live API tonight)

Primary conversion action in all three windows: **Purchase (Spiffy thank-you value)** `7678072764` — 16 click-attributed, 16 by conversion date. Page-load Purchase `7353506045` is secondary (all_conversions 16, **0** biddable conversions). Begin checkout `7678925960` is observation-only.

Sources: [aug-calendar conversion-actions](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-combined-audit/aug-calendar/Ads%20-%20conversion-actions_api_2026-08-01_to_2026-08-31.csv) · [post-fix conversion-actions](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-combined-audit/post-fix/Ads%20-%20conversion-actions_api_2026-08-04_to_2026-09-01.csv) · [rolling-30d conversion-actions](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-combined-audit/rolling-30d/Ads%20-%20conversion-actions_api_2026-08-03_to_2026-09-01.csv)

| Window | Why this window | Impr | Clicks | Spend | Conv (click) | CPA | vs gate |
|--------|-----------------|-----:|-------:|------:|-------------:|----:|---------|
| **Aug 1–31** (calendar) | Clean month | 2,859 | 232 | **$2,027.94** | **16.0** | **$127** | 16≪28; $127>$105 **FAIL** |
| **Aug 4–Sep 1** (post-fix) | First honest 29 days after stop-word fix | 2,857 | 229 | **$2,025.56** | **16.0** | **$127** | **FAIL** |
| **Aug 3–Sep 1** (rolling 30d) | SOP thesis window | 2,937 | 235 | **$2,073.91** | **16.0** | **$130** | **FAIL** |

Campaign splits (impression-weighted IS / rank-lost / budget-lost). Budget-lost is **0%** on every live campaign in every window — rank-lost is still the constraint, not budget ([operating plan §0.2](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/nypllc-google-ads-operating-plan.md); confirmed in [WEEKLY-SOP.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-weekly-sop/WEEKLY-SOP.md) checklist row 4).

**Calendar August (Aug 1–31)** — [campaigns CSV](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-combined-audit/aug-calendar/Ads%20-%20campaigns_api_2026-08-01_to_2026-08-31.csv):

| Campaign | Impr | Clicks | Spend | Conv | CPA | IS | Rank-lost | Budg-lost |
|----------|-----:|-------:|------:|-----:|----:|---:|----------:|----------:|
| Sales-Search-1 | 2,322 | 165 | $1,589.59 | 14.0 | $114 | 16.3% | 83.7% | 0% |
| 01_Core_Exact_NY | 503 | 64 | $400.76 | 2.0 | $200 | 48.8% | 51.2% | 0% |
| 02_Professions_NY | 34 | 3 | $37.58 | 0 | — | 47.1% | 52.9% | 0% |
| **Account** | **2,859** | **232** | **$2,027.94** | **16.0** | **$127** | — | — | — |

**Post-fix (Aug 4–Sep 1)** — [campaigns CSV](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-combined-audit/post-fix/Ads%20-%20campaigns_api_2026-08-04_to_2026-09-01.csv):

| Campaign | Impr | Clicks | Spend | Conv | CPA | IS | Rank-lost | Budg-lost |
|----------|-----:|-------:|------:|-----:|----:|---:|----------:|----------:|
| Sales-Search-1 | 2,317 | 161 | $1,576.91 | 12.5 | $126 | 16.0% | 84.0% | 0% |
| 01_Core_Exact_NY | 500 | 64 | $402.23 | **3.5** | **$115** | 47.1% | 52.9% | 0% |
| 02_Professions_NY | 40 | 4 | $46.41 | 0 | — | 40.0% | 45.0% | 0% |
| **Account** | **2,857** | **229** | **$2,025.56** | **16.0** | **$127** | — | — | — |

`01` picked up **+1.5** DDA credit on **Sep 1** (morning SOP 7d: both account conversions landed Sep 1 — [WEEKLY-SOP.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-weekly-sop/WEEKLY-SOP.md)). That is why calendar August shows `01` at 2.0 conv / $200 CPA and the post-fix window shows 3.5 / $115.

**Rolling 30d (Aug 3–Sep 1)** — [campaigns CSV](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-combined-audit/rolling-30d/Ads%20-%20campaigns_api_2026-08-03_to_2026-09-01.csv):

| Campaign | Impr | Clicks | Spend | Conv | CPA | IS | Rank-lost | Budg-lost |
|----------|-----:|-------:|------:|-----:|----:|---:|----------:|----------:|
| Sales-Search-1 | 2,380 | 166 | $1,623.53 | 12.5 | $130 | 16.0% | 84.0% | 0% |
| 01_Core_Exact_NY | 517 | 65 | $403.96 | 3.5 | $115 | 46.8% | 53.2% | 0% |
| 02_Professions_NY | 40 | 4 | $46.41 | 0 | — | 40.0% | 45.0% | 0% |
| **Account** | **2,937** | **235** | **$2,073.91** | **16.0** | **$130** | — | — | — |

Morning SOP on the same 30d window: spend **$2,051.60** / CPA **$128** / 16 conv ([WEEKLY-SOP.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-weekly-sop/WEEKLY-SOP.md)). Evening drift is **+$22** of Sep 1 Sales spend. Freeze band is ≤$130 ([operating plan §0.4](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/nypllc-google-ads-operating-plan.md)); tonight’s 30d CPA is **on the freeze line**, over the ≤$110 blended target, and nowhere near the Gate 1 ≤$105-at-28-conv test.

Pacing: August calendar **~$65/day** vs the plan’s Aug band **~$3.5–4.2k/month (~$113–135/day)** ([operating plan volume table](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/nypllc-google-ads-operating-plan.md)). Under-pacing is rank-lost, not budget (budget $500/day on Sales, budget-lost 0%).

**Gate 1 account half: FAIL.** 16 vs 28 conversions; CPA $127–$130 vs ≤$105.

---

## 2. Core Exact (`01`) — first honest test since Aug 4

**Gate:** ≥15 conversions at ≤$110 ([operating plan Gate 1](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/nypllc-google-ads-operating-plan.md)). Before Aug 4 this campaign could not be judged: 14/44 of its keywords were self-blocked by phrase-negative `in` (Indiana) and friends ([google_ads_changes.md Aug 4](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/google_ads_changes.md); [session-history](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/docs/session-history.md)).

### 2.1 Campaign totals, Aug 4–Sep 1

From [post-fix campaigns](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-combined-audit/post-fix/Ads%20-%20campaigns_api_2026-08-04_to_2026-09-01.csv) + [post-fix keywords](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-combined-audit/post-fix/Ads%20-%20keywords_api_2026-08-04_to_2026-09-01.csv):

| Metric | Value | vs gate |
|--------|------:|---------|
| Conversions (click, DDA) | **3.5** | Need 15 — **23% of gate** |
| Spend | **$402.23** | — |
| CPA | **$115** | Need ≤$110 — **just over** |
| Clicks | 64 | — |
| Search IS (impr-weighted) | **47.1%** | Thesis wanted 50–70% ([plan §0.5](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/nypllc-google-ads-operating-plan.md)) — **IS is not the blocker** |
| Rank-lost IS | **52.9%** | Binding constraint |
| Budget-lost IS | **0%** | Pass |
| Eligible (impr÷IS) | ~1,061 over 29 days ≈ **37/day** | Thin vs Sales |

Morning SOP called `01` lifetime purchases **~3.5** (fractional DDA; +1.5 since Aug 14) — [WEEKLY-SOP.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-weekly-sop/WEEKLY-SOP.md). The post-fix keyword roll tonight matches that **3.50** on the nose.

**Gate 1 Core Exact half: FAIL** on volume (3.5 vs 15). CPA $115 is a hair over $110; that would be a footnote if volume were there. Volume is not there.

### 2.2 Which exacts actually convert

Aug 4–Sep 1 keyword report, `01` only ([keywords CSV](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-combined-audit/post-fix/Ads%20-%20keywords_api_2026-08-04_to_2026-09-01.csv)):

**Converters (the entire 3.5):**

| Keyword | Clicks | Spend | Purchases | CPA |
|---------|-------:|------:|----------:|----:|
| `[pllc new york]` | 6 | $52.15 | **2.00** | $26 |
| `[ny pllc formation]` | 9 | $72.09 | **1.50** | $48 |

**Spend without purchases (top):**

| Keyword | Impr | Clicks | Spend |
|---------|-----:|-------:|------:|
| `[pllc formation ny]` | 128 | 18 | **$94.87** |
| `[ny pllc]` | 69 | 11 | $54.68 |
| `[pllc formation service ny]` | 31 | 5 | $41.81 |
| `[pllc formation services new york]` | 4 | 3 | $23.82 |
| `[start pllc]` | 20 | 2 | $14.43 |

`[pllc formation ny]` vs `[ny pllc formation]` are near-duplicates; only the latter converts. Same finding as this morning’s funnel audit ([CORE-EXACT-FUNNEL-AUDIT.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-weekly-sop/CORE-EXACT-FUNNEL-AUDIT.md)) — do not exact-negative Sales yet; sample is still tiny.

### 2.3 Funnel (why 3.5 is not an IS problem)

Morning audit, 30d `01` only ([CORE-EXACT-FUNNEL-AUDIT.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-weekly-sop/CORE-EXACT-FUNNEL-AUDIT.md)):

| Stage | Count |
|-------|------:|
| Clicks | 65 |
| Begin checkout (all_conversions) | **17.02** |
| Spiffy Purchase | **3.50** (~20% checkout→purchase) |

RSA split Jul 9–Sep 1: Formation-Core **controlled** 27 clicks / $174 / **3.50 purchases**; Formation-Core **unpinned** 50 clicks / $306 / **0 purchases**. Unpinned **paused Sep 1** (`816286133015`) ([google_ads_changes.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/google_ads_changes.md)). Mobile 30d on `01`: 21 clicks / **0 purchases**. Keep −20% mobile bid.

Sep 2 diagnostic: portfolio tCPA **$90 → $105**. Judge Sales eligible toward 4.5–5k/wk in ≥14 days; revert if stuck ~3.3–3.7k. Gate 2 (~Sep 12) is a permission slip — volume cannot hit 35/30d ([google_ads_changes.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/google_ads_changes.md); [expansion-next-steps.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/memory-bank/expansion-next-steps.md)).

---

## 3. Eligible auction volume on Sales — recovered toward ~5k/wk, or still June-suppressed?

**Method:** `eligible = impressions ÷ search_impression_share`, Sales-Search-1 only. Live pull: `.venv/bin/python ads_incrementality.py recovery --weeks 20` (weeks are **Monday-start**, same as Google `segments.week`). Fix date marked `>>>` is **2026-08-04** ([ads_incrementality.py `FIX_DATE`](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads_incrementality.py)).

### 3.1 The three eras on Sales-Search-1

| Era | Week (Mon) | Eligible / week | What happened |
|-----|------------|----------------:|---------------|
| Pre-tCPA peak | May 4 | **12,030** | Last ~12k week ([google_ads_changes.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/google_ads_changes.md)) |
| June drop | Jun 1 → Jun 8 | 7,638 → **3,753** | **Closed Sep 1:** Jun 7 tCPA **$110→$90**, spend $129→$55/day; bare `pllc` stayed BROAD `48929560`. Not a match-type change. ([google_ads_changes.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/google_ads_changes.md); [google-ads.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/memory-bank/features/google-ads.md)) |
| Last full week before stop-word attach | Jul 6 | **5,072** | The “~5k pre-incident” number in the question ([operating plan §1.3](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/nypllc-google-ads-operating-plan.md)) |
| Stop-word incident | Jul 13 → Jul 27 → week of Aug 3 pre-recovery | 2,748 → 1,602 → **576** (Aug 3 week in the change log’s incident table) | Phrase-negative `in`/`or`/`me` ([google_ads_changes.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/google_ads_changes.md)) |
| Post-fix full weeks | Aug 3, 10, 17, 24 | **3,480 · 3,710 · 3,327 · 3,283** | Recovered from the incident, **plateaued at the June-tCPA level** |
| Partial week | Aug 31 (Mon–Tue only, as of tonight) | 1,545 | Not a collapse — **2 days** |

Live recovery table (Sales-Search-1 only):

```text
week          eligible    impr  clicks     cost  adsConv
2026-04-13     12072
2026-05-04     12030
2026-06-01      7638
2026-06-08      3753     ← June tCPA cliff
2026-07-06      5072     ← last ~5k week (pre-incident)
2026-07-13      2748     ← first full week after Lists A/A-FQ
2026-07-27      1602
>>>2026-08-03      3480     ← fix mid-week Aug 4
>>>2026-08-10      3710
>>>2026-08-17      3327
>>>2026-08-24      3283
>>>2026-08-31      1545     ← partial (Aug 31 + Sep 1)
```

Morning SOP used **week-ending** labels and reported Sales week Aug 24 **3,213** → Aug 31 **3,521** ([WEEKLY-SOP.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-weekly-sop/WEEKLY-SOP.md)). Those are the same recovery, different week boundaries. The Monday-start series above is the one the incrementality tool uses.

### 3.2 Direct answer

- **Stop-word damage: reversed.** Eligible is no longer 576/week. Four full post-fix weeks sit at **3.3–3.7k**.
- **Jul 6 ~5,072: not recovered.** Post-fix plateau is about **65–73%** of that week.
- **June “mystery”: diagnosed, still suppressing (as of the Sep 1 pull).** The May 12k → June ~4k cliff is **Jun 7 tCPA $110→$90**, not match type, not leftover negatives. The Sep 1 plateau at 3.3–3.7k **was** that June-tCPA world. **Sep 2:** portfolio tCPA raised to **$105** as a reversible diagnostic. Judge Sales eligible toward 4.5–5k/wk in two weeks; revert to $90 if flat ([expansion-next-steps.md freeze scorecard](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/memory-bank/expansion-next-steps.md)).

`01` eligible on the same recovery pull (full post-fix weeks): 215 → 218 → 260 → 292. Tiny next to Sales; Core Exact is not where account volume lives.

---

## 4. Previously blocked keywords — serving? converting?

**Blast radius before the Aug 4 fix** ([google_ads_changes.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/google_ads_changes.md); [session-history](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/docs/session-history.md)):

| Campaign | Self-blocked | Named casualties |
|----------|-------------:|------------------|
| `01_Core_Exact_NY` | **14 of 44** | `[form a pllc in new york]`, `[start a pllc in ny]`, `[cost to form a pllc in new york]`, `[pllc formation service near me]` (`me`) |
| Sales-Search-1 | **9 of 40** | `[pllc in ny]`, `[pllc in new york]` |
| `02_Professions_NY` | **1 of 34** | `[md pllc ny]` (`md` = Maryland) |
| `03_ForeignQual_US` | **21 of 33** | whole “doing business **in** new york” thesis |

**Inventory tonight** (enabled, not negative) — [keyword-settings snapshot](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-weekly-sop/Ads%20-%20keyword-settings_api_snapshot_2026-09-01.csv):

| Keyword | Campaign | Serving status | Approval |
|---------|----------|----------------|----------|
| `form a pllc in new york` | `01` exact | **ELIGIBLE** | APPROVED |
| `form a pllc in new york` | Sales phrase | **ELIGIBLE** | APPROVED |
| `start a pllc in ny` | `01` exact | **ELIGIBLE** | APPROVED |
| `cost to form a pllc in new york` | `01` exact | **RARELY_SERVED** | APPROVED |
| `pllc formation service near me` | `01` phrase | **RARELY_SERVED** | APPROVED |
| `md pllc ny` | `02` exact | **ELIGIBLE** | APPROVED |

So they are **unblocked**. Eligible ≠ serving.

**Delivery Aug 4–Sep 1** ([post-fix keywords](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-combined-audit/post-fix/Ads%20-%20keywords_api_2026-08-04_to_2026-09-01.csv)):

| Keyword | Campaign | Impr | Clicks | Spend | Conv | Serving in report |
|---------|----------|-----:|-------:|------:|-----:|-------------------|
| `forming a pllc in ny` | Sales exact | 12 | 1 | $11.38 | 0 | ELIGIBLE |
| `pllc in ny` | Sales phrase | 6 | 1 | $7.42 | 0 | ELIGIBLE |
| `pllc in new york` | `01` exact | 4 | 1 | $4.54 | 0 | ELIGIBLE |
| `form a pllc in ny` | Sales phrase | 3 | 1 | $15.45 | 0 | ELIGIBLE |
| **`pllc in new york`** | **Sales phrase** | **3** | **1** | **$21.95** | **1.0** | ELIGIBLE |
| `form a pllc in ny` | `01` exact | 1 | 0 | $0 | 0 | ELIGIBLE |
| `forming a pllc in ny` | `01` exact | 1 | 0 | $0 | 0 | ELIGIBLE |
| `start a pllc in ny` | `01` exact | 1 | 1 | $9.31 | 0 | ELIGIBLE |

**Zero-impression (unblocked but not winning auctions) in this window:** `[form a pllc in new york]` (the example in the question), `[cost to form a pllc in new york]`, `[pllc formation service near me]`, `[start a pllc in new york]`, `[how much does a pllc cost in ny]`, `[forming a pllc in new york]`, `[set up a pllc in ny]`, `[create a pllc in new york]`, `[file a pllc in ny]`, `[open a pllc in new york]`, `[md pllc ny]`, `[how much is a pllc in new york]`.

**Answer:** unblocked, **mostly not serving**, **almost not converting**. The one conversion on this casualty list is Sales phrase `pllc in new york` (1.0 purchase, $21.95). The poster child `[form a pllc in new york]` is ELIGIBLE with **zero impressions** in 29 days — Ad Rank / query volume, not a leftover negative.

---

## 5. Professions (`02`), leftover-negatives audit, Ads↔CRM variance

### 5.1 `02_Professions_NY` (ENABLED Aug 4)

Enabled Aug 4 on portfolio tCPA $90, $25/day ([google-ads.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/memory-bank/features/google-ads.md); [activeContext](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/memory-bank/activeContext.md)).

| Window | Impr | Clicks | Spend | Conv | IS | Rank-lost |
|--------|-----:|-------:|------:|-----:|---:|----------:|
| Aug 1–31 | 34 | 3 | $37.58 | **0** | 47.1% | 52.9% |
| Aug 4–Sep 1 | 40 | 4 | **$46.41** | **0** | 40.0% | 45.0% |
| Morning SOP 7d (Aug 26–Sep 1) | 7 | 1 | $8.83 | 0 | 17.9% | 25.0% |

Keywords that actually showed (Aug 4–Sep 1): `psychology pllc ny` (2 clicks / $22.25), `pllc for therapists` (1 / $12.38), `law pllc new york` (1 / $11.78), plus impression-only `lcsw pllc` (11), `pllc for therapists` already counted, `physician pllc`, `dental practice pllc`, `physical therapy pllc new york`, `nurse practitioner pllc new york`. **Zero conversions.**

Standing rule: new campaign with <5 conv after 3 weeks → **audit, do not raise bids** ([WEEKLY-SOP.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-weekly-sop/WEEKLY-SOP.md)). `02` is 28 days in, 0 conv.

**Attorneys RSA (the serving problem):** v4 `822412227500` / `822340024756` were **DISAPPROVED** (gov-docs) on the morning snapshot ([02-rsa-policy](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-weekly-sop/Ads%20-%2002-rsa-policy_api_snapshot_2026-09-01.csv)). **v5 uploaded later Sep 1** (`823134166556` controlled / `823134166682` unpinned). Live query tonight:

| Ad | ID | Status | Approval | Review |
|----|----|--------|----------|--------|
| Attorneys — controlled | 823134166556 | ENABLED | UNKNOWN | **REVIEW_IN_PROGRESS** |
| Attorneys — unpinned | 823134166682 | ENABLED | UNKNOWN | **REVIEW_IN_PROGRESS** |

Source: [02-attorneys-rsa-policy.csv](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-combined-audit/02-attorneys-rsa-policy.csv) · [google_ads_changes.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/google_ads_changes.md). If v5 DISAPPROVED at next weekly SOP (~Sep 8), **pause the Attorneys ad group** and stop copy churn.

### 5.2 Leftover-negatives audit (re-run tonight)

This is the weekly SOP self-block check: every enabled keyword vs the shared lists actually attached to that campaign **plus** campaign/ad-group negatives. After Aug 4, Lists A/A-FQ dropped 94 two-letter abbreviations (A 103→53, A-FQ 89→45) ([google_ads_changes.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/google_ads_changes.md)).

**Shared-list leftover scan** ([shared-negatives.csv](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-weekly-sop/shared-negatives.csv); member counts from [campaign-shared-sets](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-weekly-sop/Ads%20-%20campaign-shared-sets_api_snapshot_2026-09-01.csv)):

| List | Members | <3-char / stop-word leftovers |
|------|--------:|-------------------------------|
| Neg A — Other states | **53** | **none** |
| Neg A-FQ | **45** | **none** |
| Neg B — Research DIY | 15 | `vs` (phrase) — **intentional**, flagged in Aug 14 SOP as not a stop-word incident |
| Neg C — Wrong intent | **27** | none |
| Neg D — Freebie | 5 | `$0` (intentional) |
| Neg E — Publishing | 7 | none |

Campaign/ad-group leftover phrase negatives of `in`/`or`/`me`/`ok`/`md` or any token <3 chars: **none** ([negative-keywords snapshot](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-weekly-sop/Ads%20-%20negative-keywords_api_snapshot_2026-09-01.csv)).

**Self-block tonight** (analyzer vs Sep 1 snapshots):

| Campaign | Enabled keywords | Self-blocked |
|----------|-----------------:|-------------:|
| `01_Core_Exact_NY` | 48 | **0** |
| `02_Professions_NY` | 34 | **0** (includes `[md pllc ny]`, now ELIGIBLE) |
| `03_ForeignQual_US` (paused) | 33 | **0** |
| Sales-Search-1 | 39 | **0** |

Matches morning SOP “Pass — 0 of 48 / 34 / 40” ([WEEKLY-SOP.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-weekly-sop/WEEKLY-SOP.md); SOP omitted paused `03`). **Leftover two-letter state abbreviations are gone. They are not what is holding `02` or `[form a pllc in new york]`.**

### 5.3 Ads vs CRM tracking variance (was +30%)

**History of the gap** (primary Spiffy Purchase vs CRM orders with gclid/wbraid/gbraid, rolling 30d):

| SOP date | Ads Spiffy | CRM click-ID | Gap | Source |
|----------|----------:|-------------:|-----|--------|
| Aug 4 | 10 | 13 | **+30%** | [Aug 4 WEEKLY-SOP](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-08-04-weekly-sop/WEEKLY-SOP.md) — this is the “was +30%” |
| Aug 14 (due Aug 10) | 14 | 19 | **+36%** | [Aug 14 WEEKLY-SOP](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-08-14-weekly-sop/WEEKLY-SOP.md) |
| Aug 19 | 13 | 18 | **+38%** | [Aug 19 WEEKLY-SOP](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-08-19-weekly-sop/WEEKLY-SOP.md) |
| Aug 26 | 17 | 17 | **0%** | [Aug 26 WEEKLY-SOP](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-08-26-weekly-sop/WEEKLY-SOP.md) |
| Sep 1 morning | 16 | 16 | **0%** | [Sep 1 WEEKLY-SOP](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-weekly-sop/WEEKLY-SOP.md) |

**Tonight (live):**

| Window | Ads Spiffy Purchase | CRM click-ID | Gap |
|--------|--------------------:|-------------:|-----|
| Aug 3–Sep 1 (30d) | **16** | **16** (of 51 orders) | **0%** |
| Aug 4–Sep 1 | **16** | **15** (of 49 orders) | Ads +1 (~6%), inside ±10% |
| Calendar Aug 1–31 | **16** | **16** (of 49 August orders) | **0%** |

CRM: `npx tsx scripts/orders-attribution.ts --weekly --since 2026-08-03 --until 2026-09-01` and `--monthly --since 2025-09-01 --until 2026-09-01`.

**Answer:** the +30% gap **closed**. Offline conversion upload stays deferred; there is no ±10% fire ([activeContext watch](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/memory-bank/activeContext.md)).

---

# Part B — Money launches (one section each, not one vague line)

## 6. CAQH — taking payment? Launch email sent? Paid setups?

| Question | Answer | Source |
|----------|--------|--------|
| Taking payment (Spiffy SKU)? | **No.** Paid $499 SKU waits until 2–3 successful pilots. Interest checkbox on Spiffy is **live Aug 26** (no charge; `Order.caqhInterest`). | [caqh-pilot-launch.md](file:///Users/sidneybrodsky/Dev/pllc-business/PLLC-CRM/crm/docs/caqh-pilot-launch.md); [caqh-credentialing.md](file:///Users/sidneybrodsky/Dev/pllc-business/PLLC-CRM/memory-bank/features/caqh-credentialing.md); [expansion-next-steps.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/memory-bank/expansion-next-steps.md) |
| Launch email sent? | **Yes.** Aug 25–26 outreach to 9 LCSW pilots. **Sep 1 follow-up sent** on original threads to 8 awaiting (skip Aaron). No price in email. | Launch log in [caqh-pilot-launch.md](file:///Users/sidneybrodsky/Dev/pllc-business/PLLC-CRM/crm/docs/caqh-pilot-launch.md) |
| Paid setups? | **Zero.** Aaron **declined Aug 26** (already has CAQH). CRM `Order.caqhInterest=true` count tonight: **0**. | Same launch doc (“No paid pilots yet”); live `query-db order --where caqhInterest=true --count` → 0 |

Pilot roster (all follow-ups Sep 1 except Aaron): Esther Olajide, Jonathan Shedlo, Shanel Boyce, Shyavia Brown, Zamzam Noor, Shoshana Tawil, Kemba Bloodworth-Bhattacharya, Civita Vitiello Alvarado. Next on interest: **manual Stripe invoice $499** → kickoff → intake wizard. If no replies by **Oct 15** → LCSW wave 3 ([caqh-pilot-launch.md](file:///Users/sidneybrodsky/Dev/pllc-business/PLLC-CRM/crm/docs/caqh-pilot-launch.md)).

---

## 7. RA build — which of the 7 checklist items are live?

Two “sevens” exist. The **build** seven is the CRM-owned Lever 1 table ([CRM revenue-levers.md](file:///Users/sidneybrodsky/Dev/pllc-business/PLLC-CRM/memory-bank/features/revenue-levers.md)). The **flare date** seven is the pre–Sep 22 T-30 checklist ([direct-ra-launch-status.md](file:///Users/sidneybrodsky/Dev/pllc-business/PLLC-CRM/crm/docs/direct-ra-launch-status.md)).

### 7.1 Build checklist (CRM-owned Lever 1) — all 7 shipped

| # | Item | Live? | Evidence |
|---|------|-------|----------|
| 1 | Coverage audit (Oct–Dec 2025 cohort) | **Yes** | “0 missing Stripe RA trials” ([direct-ra-launch-status.md](file:///Users/sidneybrodsky/Dev/pllc-business/PLLC-CRM/crm/docs/direct-ra-launch-status.md)) |
| 2 | Cancel gate + Stripe cancel | **Yes** | CRM Cancel requires DOS verify or staff override; cancels Stripe. Policy is **no 1-click cancel** (plan originally wanted one-click; launch policy reversed — CoC or self-file only). |
| 3 | $99 RA CoC → Order (never auto-queue) | **Yes** | E2E Aug 12: Order `#2480011`, `paid_coc_pending`, filing queue empty |
| 4 | Verify DOS → cancel | **Yes** | Same E2E: CRM `cancelled`, Stripe `canceled`, `dos_verified` |
| 5 | T-30 / T-7 / receipt cron | **Code live Aug 25** (`DIRECT_RA_NOTICES_LIVE=true` on Vercel Production) | **No cohort email has sent yet.** First T-30s **~Sep 22** for October renewals. Test T-30 to Sid approved. |
| 6 | Update-card portal | **Yes** | `STRIPE_BILLING_PORTAL_CONFIGURATION_UPDATE_ONLY=bpc_1U3jJB…`; durable CRM URL, not a 5-minute Stripe session ([direct-ra-stripe-setup.md](file:///Users/sidneybrodsky/Dev/pllc-business/PLLC-CRM/crm/docs/direct-ra-stripe-setup.md)) |
| 7 | Compliance Plan $249 | **Yes** | Price `price_1U3jJCKGsQmzBSf3tCnS4QGf`; Sid verified upgrade path. Staff $99 CoC + $249 paths **confirmed Aug 26**. |

Checkout disclosure **audited Aug 26**. Counsel glance **Aug 12**. Statement descriptor `REG AGENT` / `NYPLLC.COM* REG AGENT`. Aug 31 fix: $0 trial invoices must not send charge receipts ([direct-ra-launch-status.md](file:///Users/sidneybrodsky/Dev/pllc-business/PLLC-CRM/crm/docs/direct-ra-launch-status.md); [CRM activeContext](file:///Users/sidneybrodsky/Dev/pllc-business/PLLC-CRM/memory-bank/activeContext.md)).

**Flare date:** first real customer T-30s **~Sep 22**. That is not an ads scale date ([expansion-next-steps.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/memory-bank/expansion-next-steps.md)). First auto-charges **October**.

### 7.2 Pre–Sep 22 ops checklist (also 7 rows)

From [direct-ra-launch-status.md](file:///Users/sidneybrodsky/Dev/pllc-business/PLLC-CRM/crm/docs/direct-ra-launch-status.md):

| # | Item | Status |
|---|------|--------|
| 1 | `DIRECT_RA_NOTICES_LIVE=true` on Production | **Done** Aug 25 |
| 2 | Test T-30 to Sid approved | **Done** |
| 3 | Checkout disclosure audited | **Done** Aug 26 |
| 4 | Staff $99 CoC + $249 paths confirmed | **Done** Aug 26 |
| 5 | `spot-check-direct-ra-notices.ts` against Production before Sep 22 | **Open** |
| 6 | Sample one live T-30 after first sends | **Blocked on Sep 22** |
| 7 | Oct dispute-rate tripwire (>0.5% / 90d) | **Not yet in force** (first charges October) |

Evidence pack exists as a doc ([direct-ra-dispute-evidence.md](file:///Users/sidneybrodsky/Dev/pllc-business/PLLC-CRM/crm/docs/direct-ra-dispute-evidence.md)); it has not been used on a live dispute.

**One-line:** build is live; **the flare is Sep 22**, when the first cohort actually gets mail. Spot-check script is the only build-adjacent item still open before that date.

---

## 8. EXP Credentialing — closed, dead, or still pending?

**Still pending.** Not closed, not dead.

| Date | Event | Source |
|------|-------|--------|
| Aug 5 | Wave 1 cold email to `info@expcredentialingservices.com` | [b2b-partners.md](file:///Users/sidneybrodsky/Dev/pllc-business/PLLC-CRM/memory-bank/features/b2b-partners.md) |
| Aug 5 | EXP replied asking pricing, referral/wholesale, turnaround | same |
| Aug 5 / Aug 17 | Sid sent both options, then a referral nudge | same |
| **Sep 1** | **Close-out sent** Gmail `1a05fcd4282dcc5f`, thread `19fd2c38f89979fa` | [CRM activeContext](file:///Users/sidneybrodsky/Dev/pllc-business/PLLC-CRM/memory-bank/activeContext.md); [expansion-next-steps.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/memory-bank/expansion-next-steps.md) |

Waiting on their **model choice** (referral vs wholesale). On selection → provision `B2bPartner`. Do not start a new B2B wave until CAQH pilots + this EXP close + affiliates land ([b2b-partners.md](file:///Users/sidneybrodsky/Dev/pllc-business/PLLC-CRM/memory-bank/features/b2b-partners.md)).

---

## 9. Affiliate links — live?

**No.**

| Partner | Applied | Follow-ups | Links on site / EIN email? |
|---------|---------|------------|----------------------------|
| Mercury (banking) | **Aug 14** | Aug 26 + **third ping Sep 1** (`1a05fcd4ba4ab36d`, thread `1a040a5008bef8c8`) | **Not live** |
| Gusto Impact (payroll) | **Aug 14** | Aug 26 + **third ping Sep 1** (`1a05fcd53998a8e8`, thread `1a001419a24fd66a`) | **Not live** |

Source: [affiliate-partners.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/docs/affiliate-partners.md); [website revenue-levers.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/memory-bank/features/revenue-levers.md); [expansion-next-steps.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/memory-bank/expansion-next-steps.md). Do not sign Relay Partner while Mercury is the pick (exclusivity risk).

---

# Part C — Business pulse

## 10. August orders, channel split, VM, ChatGPT, SEO

### 10.1 August orders + revenue

Live CRM (`orders-attribution.ts --monthly --since 2025-09-01 --until 2026-09-01`):

| Month | Orders | Revenue | Google click-ID | Other UTM | Untagged |
|-------|-------:|--------:|----------------:|----------:|---------:|
| May 2026 | 57 | $52,289 | n/a (pre-capture) | — | — |
| Jun 2026 | 47 | $43,213 | n/a | — | — |
| Jul 2026 | 47 | $42,269 | 10 (21.3%) | 4 (8.5%) | 33 (70.2%) |
| **Aug 2026** | **49** | **$41,478** | **16 (32.7%)** | **3 (6.1%)** | **30 (61.2%)** |
| Sep 1 (partial) | 4 | $3,565 | 2 (50%) | 0 | 2 |

Jul click-ID % is depressed by Jul 1–8 (capture started **Jul 9**). August is a full click-ID month.

Business “held 47–49 orders/mo even with ads down” ([expansion-next-steps.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/memory-bank/expansion-next-steps.md)) is still true: August **49** / **$41,478**. AOV ≈ **$846** ($41,478 / 49). Below the $885 headline because of partner/discount mix; not a new finding.

### 10.2 Did Google share recover from ~25% toward 66%?

**Lifetime Ads-attributed share was ~66%** of orders (222 Ads conversions vs 338 orders — [operating plan §0.3](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/nypllc-google-ads-operating-plan.md)). That is **not** the same metric as click-ID share after Jul 9.

Click-ID share (the honest post-Jul-9 metric):

| Window | Google click-ID | Notes |
|--------|----------------:|-------|
| Jul 9–Aug 4 (42 orders) | **31%** | [operating plan §0.6](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/nypllc-google-ads-operating-plan.md); [google-ads.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/memory-bank/features/google-ads.md) |
| Calendar **August** | **32.7%** (16/49) | Live attribution |
| Week of Aug 3 (first post-fix week) | **66.7%** (6/9) | One-week spike, then fade |
| Week of Aug 10 | 28.6% (4/14) | |
| Week of Aug 17 | 25.0% (3/12) | |
| Week of Aug 24 | **12.5%** (1/8) | |
| Week of Aug 31 (partial) | 25.0% (2/8) | |
| Aug 3–Sep 1 (51 orders) | **31.4%** (16/51) | |

**Answer: no sustained recovery toward 66%.** August landed at **~33%** click-ID, essentially the same as the Jul 9–Aug 4 31% snapshot. One week (Aug 3) printed 66.7% and did not stick. Untagged is still the majority (~61% in August). Untagged ≠ organic ([plan §0.6](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/nypllc-google-ads-operating-plan.md)).

### 10.3 Virtual mail subs / MRR

Live `query-db subscription --where subscriptionType=VIRTUAL_MAIL` (CRM `Subscription` model, tonight):

| CRM status | Count | Amount mix | Notes |
|------------|------:|------------|-------|
| **active** | **70** | 68 × $50 + 1 × $35 + 1 × $25 | All 70 have `stripeStatus=active` |
| trialing | 11 | 11 × $50 | Not yet in cash MRR |
| pending | 41 | — | Checkout/created, not billing |
| past_due | 1 | 1 × $50 | At risk |
| cancelled | 10 | — | |

**Cash MRR (active only):** (68 × $50) + $35 + $25 = **$3,460 / month**.  
If you count trialing as booked: +$550 → **$4,010**. Do not count pending 41 as MRR.

List price is $50/mo ([schema comment](file:///Users/sidneybrodsky/Dev/pllc-business/PLLC-CRM/crm/prisma/schema.prisma); [subscription-system.md](file:///Users/sidneybrodsky/Dev/pllc-business/PLLC-CRM/crm/docs/subscription-system.md)). The $25 / $35 actives are exceptions (grandfather / discount) — do not average them into the offer.

### 10.4 ChatGPT-tagged orders (was 5 — growing?)

The “was 5” snapshot is **5 of 43 orders since Jul 9 as of Aug 4** ([operating plan §0.6](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/nypllc-google-ads-operating-plan.md); [activeContext watch](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/memory-bank/activeContext.md)).

Live `query-db order --where utmSource=chatgpt.com,isVmOnly=false` → **9 rows**:

| Checkout date (UTC) | Amount | Also has gclid? |
|---------------------|-------:|-----------------|
| 2026-07-13 | $885 | no |
| 2026-07-20 | $885 | no |
| 2026-07-20 | $885 | no |
| 2026-07-29 | $885 | no |
| 2026-08-04 | $885 | no ← this is the 5th, the Aug 4 snapshot |
| 2026-08-12 | $885 | **yes** (attribution script buckets this as Google) |
| 2026-08-19 | $885 | no |
| 2026-08-19 | $885 | **yes** |
| 2026-08-22 | $1,080 | no |

**Yes, it grew:** 5 → **9** tagged `chatgpt.com` (4 more in August after the snapshot). Attribution “other UTM / chatgpt.com” is **7** lifetime because two also carry a Google click ID. Morning SOP 30d window had 3 of 51 as chatgpt other-UTM ([WEEKLY-SOP.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-weekly-sop/WEEKLY-SOP.md)). Still unmanaged, still unbid.

### 10.5 SEO pieces published

Shipped moat pages (all **Jul 22 2026** — none in August):

| Piece | URL | Status |
|-------|-----|--------|
| ★ #1 NYSED Approval Time Tracker | `/nysed-approval-times` | **Live** |
| ★ #2 How long to form a PLLC in NY | `/how-long-to-form-a-pllc-in-ny` | **Live** |
| #3 NY PLLC cost breakdown | `/ny-pllc-cost` | **Live** |

Sources: [seo-and-domain.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/memory-bank/features/seo-and-domain.md); [SEO plan progress table](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/nypllc-seo-content-moat-plan.md); routes exist under `web/src/app/`.

**Not published:** editorial `#4` OP deficiencies is **built unpublished** (`web/src/unpublished/nysed-op-deficiencies/`; Vercel 404s `/nysed-op-deficiencies`). Do not move into `app/` until Sid launches ([activeContext](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/memory-bank/activeContext.md); [expansion-next-steps.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/memory-bank/expansion-next-steps.md)). Plan cadence was 2/wk Jul 23–Aug 31 starting at `#4` ([SEO plan calendar](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/nypllc-seo-content-moat-plan.md)) — **that cadence did not happen**. MSO page is **built unpublished** (`web/src/unpublished/ny-mso/`; Vercel 404s `/ny-mso`) — [mso-msa.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/memory-bank/features/mso-msa.md). 20-term rank tracker file exists ([seo-rank-tracker.csv](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/seo-rank-tracker.csv)); Sep GSC column not filled tonight.

---

## What this does *not* change

- Do **not** launch `03_ForeignQual_US`, Discovery, Bing, or MSO ads ([expansion-next-steps.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/memory-bank/expansion-next-steps.md)).
- **Amended Sep 2:** raise portfolio tCPA **$90 → $105** as a reversible diagnostic. Judge **Sales eligible auctions** (target 4.5–5k/wk in two weeks); revert if flat. Gate 2 (~Sep 12) is still a permission check that will fail on volume — no `03` / Discovery / Bing.
- Auction Insights manual UI export is **still overdue** (API cannot pull it) ([WEEKLY-SOP.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-weekly-sop/WEEKLY-SOP.md)).
- Next Ads watch: Attorneys v5 **DISAPPROVED Sep 2**; ad group **paused**. Stop copy churn.

---

## Source index

**Live pulls (this file’s folder):** [aug-calendar/](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-combined-audit/aug-calendar/) · [post-fix/](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-combined-audit/post-fix/) · [rolling-30d/](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-combined-audit/rolling-30d/) · [analyze.py](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-combined-audit/analyze.py) · [02-attorneys-rsa-policy.csv](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-combined-audit/02-attorneys-rsa-policy.csv)

**Same-day SOP:** [ads-pull-2026-09-01-weekly-sop/](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-weekly-sop/) · [CORE-EXACT-FUNNEL-AUDIT.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-pull-2026-09-01-weekly-sop/CORE-EXACT-FUNNEL-AUDIT.md) · [ads-weekly-dashboard.csv](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/ads-weekly-dashboard.csv) · [google_ads_changes.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/google_ads_changes.md)

**Memory banks / plans:** [website activeContext](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/memory-bank/activeContext.md) · [CRM activeContext](file:///Users/sidneybrodsky/Dev/pllc-business/PLLC-CRM/memory-bank/activeContext.md) · [expansion-next-steps.md](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/memory-bank/expansion-next-steps.md) · [operating plan](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/nypllc-google-ads-operating-plan.md) · [revenue levers plan](file:///Users/sidneybrodsky/Dev/pllc-business/new-york-pllc/nypllc-revenue-levers-plan.md)

**CRM live:** `orders-attribution.ts` (Aug 2026: 49 / $41,478 / 16 Google) · `query-db` VM + CAQH interest + ChatGPT orders.
