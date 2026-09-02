# Google Ads Change Log

**Last updated:** 2026-09-02

## Account

- Customer: NYPLLC (`1529880213`)
- Live: `Sales-Search-1` + `01_Core_Exact_NY` + `02_Professions_NY` (ENABLED)
- Unattached PAUSED: `03_ForeignQual_US`

---

## Changes on 2026-09-02 — Diagnostic tCPA $90 → $105 (Sid amendment)

| Action | Detail |
|---|---|
| Portfolio **NYPLLC Search Portfolio** `12148056412` | Target CPA **$90 → $105** (`target_cpa_micros = 105000000`). Script: `google_ads/set_portfolio_tcpa.py`. One variable; no budget/keyword/LP change in this window. |
| Why | $90 caps eligible ~3.3–3.7k/wk on Sales (~16–25 conv/30d). Ladder needing 40/month before a raise is a deadlock. May $110 ≈ ~29/mo at ~$130 CPA is the near-term ceiling. |
| Judgment | ≥14 days. Success = Sales eligible toward **4,500–5,000+/week**. Expected CPA **$130–140**. Failure = eligible still ~3.3–3.7k → **revert to $90**. ~17% step is a one-time diagnostic, not a new ladder habit. |
| Attorneys v5 | **DISAPPROVED**; **paused** Attorneys AG `196018838817`. Stop copy churn. Script: `google_ads/set_ad_group_status.py`. |

---

## Changes on 2026-09-01 — Core Exact audit + Attorneys v5 + June drop closed

Funnel audit: [`ads-pull-2026-09-01-weekly-sop/CORE-EXACT-FUNNEL-AUDIT.md`](ads-pull-2026-09-01-weekly-sop/CORE-EXACT-FUNNEL-AUDIT.md)

| Action | Detail |
|---|---|
| `01` Formation-Core unpinned | **PAUSED** (`816286133015`) — 50 clicks / $306 / 0 purchases vs controlled 27 / $174 / 3.50. Do not raise bids. |
| Attorneys RSA **v5** | **DISAPPROVED** (Sep 2). **Paused** Attorneys ad group `196018838817`. Stop copy churn. |
| June eligible-volume drop | **Closed.** Not a broad→exact change. Bare `pllc` stayed BROAD (`48929560`) all June. Cliff is **Jun 7 tCPA $110→$90** (spend $129→$55/day; `pllc` broad throttled $98→$23/day). Jun 28 publication negatives are a later, smaller effect. |
| Gate 2 (~Sep 12) | Treat as **permission slip only** — volume cannot hit 35/30d (need ~2.45 purchases/day vs ~0.3–0.4 recent). Re-evaluate after Aug 3–13 conversions age out. |
| Holds | `03` paused; no Microsoft scale; no MSO ads; **$985 deferred to February** unless a clean ladder-free window appears before Nov 14. |
| Auction Insights | Still **manual UI** — API token cannot pull insights. Next weekly SOP: export Sales last 90d. |

---

## Changes on 2026-09-01 — Weekly SOP §7.1 (week ending Sep 1; due Aug 31)

Pull: [`ads-pull-2026-09-01-weekly-sop/`](ads-pull-2026-09-01-weekly-sop/) · writeup [`WEEKLY-SOP.md`](ads-pull-2026-09-01-weekly-sop/WEEKLY-SOP.md) · dashboard [`ads-weekly-dashboard.csv`](ads-weekly-dashboard.csv)

| Metric (window) | Result |
|---|---|
| Self-block | **0** of 48 / 34 / 40. Lists A 53 · A-FQ 45 · C 27 unchanged |
| Budget-lost IS | **0%** Sales + `01` + `02` |
| 7d (Aug 26–Sep 1) | $474 / **2** click-attr / CPA **$237** (both conv Sep 1) |
| 28d CPA | **$128** (15 / $1,926) |
| 30d CPA | **$128** (16 / $2,052) — over ≤$110, under ≤$130 |
| `01` | **~3.5** lifetime purchases (fractional DDA). 7d IS **~33%** · 30d IS **~47%** · $404 / 65 clicks |
| Ads↔CRM 30d | Spiffy Purchase **16** vs CRM click-ID **16** (**0%**) |
| Eligible (Sales) | Week Aug 24 **3,213** · Aug 31 **3,521** — stable vs incident ~576 |
| Gate 1 | **Fail / hold** — `01` ~3.5 conv · account 16/30d. Do not launch `03` |

| Action | Detail |
|---|---|
| Account changes | **None** — no new promotes; List C unchanged |
| Attorneys RSA v4 | `822412227500` / `822340024756` still **DISAPPROVED** (gov-docs). **v5 copy strategy needed** |
| Deferred | Sales exact-neg fence; `nysed pllc` / `pllc filing` watch; Auction Insights manual export overdue |

---

## Changes on 2026-08-26 — Weekly SOP §7.1 (week ending Aug 26; due Aug 24)

Pull: [`ads-pull-2026-08-26-weekly-sop/`](ads-pull-2026-08-26-weekly-sop/) · writeup [`WEEKLY-SOP.md`](ads-pull-2026-08-26-weekly-sop/WEEKLY-SOP.md) · dashboard [`ads-weekly-dashboard.csv`](ads-weekly-dashboard.csv)

| Metric (window) | Result |
|---|---|
| Self-block | **0** of 46 / 34 / 33 / 40. Lists A 53 · C 27 unchanged |
| Budget-lost IS | **0%** Sales + `01` + `02` |
| 7d (Aug 20–26) | $479 / **2** click-attr / CPA **$240** |
| 28d CPA | **$106** (17 / $1,794) |
| 30d CPA | **$111** (17 / $1,884) — over ≤$110 by a hair, under ≤$130 |
| `01` | Still **2** lifetime purchases. 7d IS **~57%** · 30d IS **~52%** · $378 / 62 clicks |
| Ads↔CRM 30d | Spiffy Purchase **17** vs CRM click-ID **17** (**0%**) |
| Eligible (Sales) | Week Aug 17 **3,327** · Aug 24 **1,747** (partial week) vs incident ~576 |
| Gate 1 | **Fail / hold** — `01` 2 conv · account 17/30d. Do not launch `03` |

| Action | Detail |
|---|---|
| Exact keywords | `[pllc in new york]` (`201832402041~908998121433`) · `[pllc nys]` (`201832402041~850614785999`) → `01` / Formation-Core |
| Attorneys RSA v4 | v3 `822145210776` / `822189177055` still DISAPPROVED (gov-docs). Replaced with no “law practice” / “filed” / “six-week” copy: controlled `822412227500` · unpinned `822340024756` (in review) |
| Deferred | Sales exact-neg fence; `nysed pllc` / `pllc filing` watch; Auction Insights manual export overdue |

Same-day daily SOP: [`ads-pull-2026-08-26-daily-sop/DAILY-SOP.md`](ads-pull-2026-08-26-daily-sop/DAILY-SOP.md)

---

## Changes on 2026-08-25 — Attorneys RSA rewrite v3 (commercial-only)

Aug 14 Rule 7.5 / attorney-only rewrite (`820969348495` / `820969348510`) **DISAPPROVED** on both RSAs (`GOVERNMENT_DOCUMENTS_AND_OFFICIAL_SERVICES`). Original NYSED copy had unpinned `APPROVED_LIMITED` only.

Third rewrite: **commercial-only** — no NYSED, Rule 7.5, naming-screening, attorney-only ownership, or filing-prep lines. Keeps price-pinned skeleton + publication/EIN/OA/RA/5-star; regulatory slots → `Six-Week Publication Done`, `Operating Agreement Included`, `Your PLLC, Filed Right`.

| Action | Detail |
|---|---|
| Removed | `820969348495` (controlled) · `820969348510` (unpinned) — both DISAPPROVED |
| Uploaded | controlled `822145210776` · unpinned `822189177055` — both ENABLED, `REVIEW_IN_PROGRESS` |
| Final URL | `https://www.nypllc.com/professions/law` |
| Source | [`rsa_manifest.json`](google-ads-campaign-build/rsas/rsa_manifest.json) · `upload_rsas.py --campaigns 02_Professions_NY --ad-groups Attorneys --replace` |

---

## Changes on 2026-08-19 — Weekly SOP §7.1 (week ending Aug 19; due Aug 17)

Pull: [`ads-pull-2026-08-19-weekly-sop/`](ads-pull-2026-08-19-weekly-sop/) · writeup [`WEEKLY-SOP.md`](ads-pull-2026-08-19-weekly-sop/WEEKLY-SOP.md) · dashboard [`ads-weekly-dashboard.csv`](ads-weekly-dashboard.csv)

| Metric (window) | Result |
|---|---|
| Self-block | **0** of 45 / 34 / 33 / 40. Lists A 53 · C 27 unchanged |
| Budget-lost IS | **0%** Sales + `01` + `02` |
| 7d (Aug 13–19) | $373 / **1** click-attr / CPA **$373** (small-n; Aug 14 purchase only) |
| 28d CPA | **$126** (12 / $1,510) |
| 30d CPA | **$123** (13 / $1,595) — over ≤$110, under ≤$130 |
| `01` | Still **2** lifetime purchases. 7d IS **~50%** · 30d IS **~48%** · $324 / 56 clicks |
| Ads↔CRM 30d | Spiffy Purchase **13** vs CRM click-ID **18** (**+38%** — still outside ±10%; offline upload deferred) |
| Eligible (Sales) | Week Aug 10 **3,710** · Aug 17 **1,748** (partial week; ~4.1k pace) vs incident ~576 |
| Gate 1 | **Fail / hold** — `01` 2 conv · account 13/30d. Do not launch `03` |

| Action | Detail |
|---|---|
| Exact keyword | `[form a pllc]` → `01_Core_Exact_NY` / Formation-Core (`201832402041~860592117526`) |
| Deferred | Sales exact-neg fence; `ny pllc checklist` watch (4th week); `nysed pllc` / convert-LLC watch; Auction Insights manual export overdue |

Same-day daily SOP: [`ads-pull-2026-08-19-daily-sop/DAILY-SOP.md`](ads-pull-2026-08-19-daily-sop/DAILY-SOP.md)

---

## Changes on 2026-08-14 — Attorneys RSA rewrite (gov-docs disapproval)

Google emailed **1 disapproved ad** in `02_Professions_NY` (`campaigns/24017629178`): **Attorneys — controlled** (`816177572142`) → `GOVERNMENT_DOCUMENTS_AND_OFFICIAL_SERVICES`. Twin **Attorneys — unpinned** was `APPROVED_LIMITED` with the same copy. NYSED/OP lines are approved on other `02` RSAs; the Attorneys ads were claiming an NYSED OP packet on `/professions/law`, which is **not** an NYSED flow (Appellate Division CGS + Rule 7.5).

Replaced **both** Attorneys RSAs (controlled + unpinned). New copy keeps the profession RSA skeleton (price pinned H1, publication/EIN/RA/5-star) and swaps NYSED/OP/deficiency lines for Rule 7.5 naming + attorney-only ownership. No CGS / certificate-of-publication claims in the ad.

| Action | Detail |
|---|---|
| Removed | `816177572142` (controlled, DISAPPROVED) · `816177690675` (unpinned, APPROVED_LIMITED) |
| Uploaded | controlled `820969348495` · unpinned `820969348510` — both ENABLED, `REVIEW_IN_PROGRESS` |
| Final URL | `https://www.nypllc.com/professions/law` |
| Source | [`rsa_manifest.json`](google-ads-campaign-build/rsas/rsa_manifest.json) · `upload_rsas.py --campaigns 02_Professions_NY --ad-groups Attorneys --replace` |

Attorneys may not serve until review clears (usually ≤1 business day). Rest of `02` unchanged.

---

## Changes on 2026-08-14 — Weekly SOP §7.1 (week ending Aug 14; due Aug 10)

Pull: [`ads-pull-2026-08-14-weekly-sop/`](ads-pull-2026-08-14-weekly-sop/) · writeup [`WEEKLY-SOP.md`](ads-pull-2026-08-14-weekly-sop/WEEKLY-SOP.md) · dashboard [`ads-weekly-dashboard.csv`](ads-weekly-dashboard.csv)

| Metric (window) | Result |
|---|---|
| Self-block | **0** of 44 / 34 / 33 / 39. Lists A 53 · C 27 unchanged |
| Budget-lost IS | **0%** Sales + `01` + `02` |
| 7d (Aug 8–14) | $487 / **5** click-attr / CPA **$97** |
| 28d CPA | **$111** (13 / $1,444) |
| 30d CPA | **$112** (14 / $1,565) — over ≤$110, under ≤$130 |
| `01` | **First 2 purchases** (Aug 11 `ny pllc formation` · Aug 14 `pllc new york`). 30d IS **~46%** · $294 / 49 clicks |
| Ads↔CRM 30d | Spiffy Purchase **14** vs CRM click-ID **19** (**+36%** — still outside ±10%; offline upload deferred) |
| Eligible (Sales) | Week Aug 3 **3,480** · Aug 10 **2,798** vs incident ~576 |

| Action | Detail |
|---|---|
| Exact keyword | `[create pllc]` → `01_Core_Exact_NY` / Formation-Core (`201832402041~623413122122`) |
| Deferred | Sales exact-neg fence; `ny pllc checklist` watch (3rd week); `nysed pllc` / convert-LLC watch; Auction Insights manual export overdue; **Gate 1 hold** (`01` 2 conv · account 14/30d) |

Same-day daily SOP: [`ads-pull-2026-08-14-daily-sop/DAILY-SOP.md`](ads-pull-2026-08-14-daily-sop/DAILY-SOP.md)

---

## Changes on 2026-08-04 — INCIDENT: stop-word negatives strangling the account

**Root cause of the conversion collapse.** Investigating why conversions fell while CRM order volume held flat (47 in June, 47 in July), the eligible auction pool — `impressions ÷ search impression share` — turned out to have collapsed ~90% on `Sales-Search-1` while budget sat untouched at $500/day and budget-lost IS at 0%. Impression share *rose* (10% → 21%) because we were winning a larger share of a pool we had shrunk ourselves.

Lists **A** and **A-FQ** had been built per plan §1.3 as "every state name + abbreviation, phrase match." The two-letter abbreviations include ordinary English words. A one-word phrase negative blocks **any query containing that word**:

| Negative | State | Blocks |
|---|---|---|
| `in` | Indiana | every query containing "in" — `form a pllc in new york`, `start a pllc in ny`, `how much does a pllc cost in ny` |
| `or` | Oregon | every query containing "or" |
| `me` | Maine | `pllc formation service near me` |
| `ok` `la` `ca` `pa` `co` `de` `hi` `id` `ma` `mo` `ne` `va` `wa` … | various | assorted common tokens |

Self-blocked enabled keywords before the fix:

| Campaign | Blocked | Notes |
|---|---|---|
| `01_Core_Exact_NY` | **14 of 44** | why it had 0 conversions in a month at ~50% IS |
| `03_ForeignQual_US` | **21 of 33** | whole thesis is "*X* pllc doing business **in** new york" |
| `Sales-Search-1` | **9 of 40** | incl. `[pllc in ny]`, `[pllc in new york]` |
| `02_Professions_NY` | 1 of 34 | `[md pllc ny]` |

Eligible auction volume, `Sales-Search-1` (budget $500/day, budget-lost 0% throughout):

| Week | Eligible impressions |
|---|---:|
| May 4 | 12,030 |
| Jul 6 | 5,072 |
| Jul 13 (first full week after Lists A/A-FQ attached Jul 8–9) | 2,748 |
| Jul 27 | 1,602 |
| Aug 3 | 576 |

| Action | Detail |
|---|---|
| Neg A (`12146898907`) | Removed **50** two-letter abbreviations → 103 → **53** members |
| Neg A-FQ (`12146898703`) | Removed **44** two-letter abbreviations → 89 → **45** members |
| `Sales-Search-1` geo | `PRESENCE` → **`PRESENCE_OR_INTEREST`** (the other Jul 8 change; out-of-state professionals forming NY PLLCs are real demand) |
| Verified | Self-block check re-run per campaign against actual attachments + campaign-level negatives: **0 of 44 / 0 of 34 / 0 of 33 / 0 of 40** |
| Plan §1.3 | Spec corrected — full state names only, with an explicit prohibition on two-letter abbreviations |
| Plan §7.1 | Added weekly self-block check and eligible-auction-volume tracking |
| `google_ads/client.py` | `run_query` now holds its service reference; the gRPC channel was being collected mid-stream (`CANCELLED "Channel deallocated!"`), which aborted a mutation halfway through |

Wrong-state traffic is still fenced by the full state names, so the exclusion intent is preserved.

**June drop closed Sep 1:** eligible volume ~12,030 → ~4,000/week was **Jun 7 tCPA $110→$90**, not a `pllc` match-type change (stayed BROAD `48929560`) and not the Jun 28 publication negatives.

**Open:** `01` and `02` are still on `PRESENCE` geo. Decide after a week of Sales data.

---

## Changes on 2026-08-04 — Incrementality read + measurement tooling

Question: with the bug fixed, should we expect a large uplift in purchases? **No — expect attributed conversions to jump and total purchases to rise modestly.**

| Evidence | Reading |
|---|---|
| Apr 320 clicks → **49** orders; Jul 169 clicks → **47** orders (clicks **−47%**, orders **−4%**) | Paid is not driving purchases one-for-one |
| Monthly clicks vs orders across 9 months: **r = 0.06** | Effectively no relationship (weak on its own — n=9 with a time trend) |
| Orders per 100 paid clicks: **8.1** (Nov) → **27.8** (Jul) | Growth is coming from non-paid sources |
| 42 orders since Jul 9: **31%** Google click ID · **12%** other UTM (all `chatgpt.com`) · **57%** untagged | Most orders arrive without a paid click; untagged ≠ organic (also direct/WOM/referral/lost click IDs) |
| Brand (`nypllc`): **$529 of ~$21k lifetime**, conv flat 3–4/mo | Brand cannibalization is immaterial — **corrects an earlier overstatement** |
| No rank tracking on the 20 commercial terms | Cannibalization exposure is currently unmeasurable |
| Formation purchase lag | July orders partly from May/June clicks — damage may not have fully landed |

**Correction logged.** An earlier read in this session claimed brand search accounted for ~50% of ad conversions. That was an artifact of a collapsing denominator (generic fell 12.0 → 3.0 while brand held at 3–4). Brand CVR (18.2%) is only modestly above generic (12–15%), which is not what pre-decided traffic looks like. The proposal to split brand into its own campaign is withdrawn — it isn't worth the structure at 2.5% of spend.

| Built | Detail |
|---|---|
| [`ads_incrementality.py`](ads_incrementality.py) | `cannibalization --gsc <Queries.csv>` buckets paid spend by organic rank (needs a manual Search Console export; steps in `--help`). `recovery --weeks N [--orders csv]` tracks weekly eligible auction volume against the CRM attribution split |
| `PLLC-CRM/crm/scripts/orders-attribution.ts` | Read-only CRM orders by attribution bucket, weekly/monthly, emits the CSV the `recovery` command consumes |
| Plan **§0.6 Incrementality** | States the assumption the whole projection model rests on, the structural tension with the SEO plan (both chase the same finite pool, so cannibalization grows as SEO wins), and the decision rule |

**Data correction.** Order counts above use `Order.orderCreatedAt` (Spiffy checkout timestamp) excluding `isVmOnly` and `[TEST]` records. An earlier pass in this session used `createdAt` unfiltered and reported Apr 48 / May 65; corrected to **Apr 49 / May 57**. The direction of the finding is unchanged — slightly strengthened. All 8 VM-only orders fall in Feb–May 2026; there were no `[TEST]` orders in the window.

**Decision rule going forward:** total orders rise **and** untagged holds → paid is incremental, scale it. Google-attributed rises **while** untagged falls → we're re-attributing demand we already had, and dashboard ROAS is fiction.

### Cannibalization measured (same day, after GSC export)

GSC queries 2025-10-27 → 2026-08-02 (954 queries) joined to paid search terms over the identical window:

| Bucket | Queries | Spend | % |
|---|---:|---:|---:|
| Rank 1–3 | 6 | $534 | 6.8% |
| Rank 4–10 | 14 | $557 | 7.1% |
| **Rank 11+** | **90** | **$6,032** | **76.4%** |
| No organic presence | 930 | $774 | 9.8% |

**Non-brand cannibalization: $30 of $7,897 = 0.38%.** Of the $534 top-3 overlap, **$504 is the single brand term `nypllc`**.

We rank nowhere on commercial terms — `pllc formation new york` **26.5** · `ny pllc formation` **28.9** · `pllc new york` **35.9** · `new york pllc formation` **25.1** · `pllc ny` **44.8**. Organic delivers ~63 clicks/month vs ~275 paid; 4,123 organic impressions/month at **1.53% CTR**.

**Conclusions:** (1) "Ads cannibalize organic" is disproven — paid is additive on commercial queries. (2) Uplift estimate revised **up to +6 to +14 orders/month**, wide because April's clicks were 80% low-intent broad `pllc` while the Aug 4 fix restored *exact-match* commercial inventory. (3) The rank-11+ table is the **SEO target list ranked by current paid spend**.

**Open:** 20-term rank tracking still not set up; `chatgpt.com` is an unmanaged channel worth watching (5 orders since Jul 9).

---

## Changes on 2026-08-04 — Weekly SOP §7.1 (week ending Aug 4)

Pull: [`ads-pull-2026-08-04-weekly-sop/`](ads-pull-2026-08-04-weekly-sop/) · writeup [`WEEKLY-SOP.md`](ads-pull-2026-08-04-weekly-sop/WEEKLY-SOP.md) · dashboard [`ads-weekly-dashboard.csv`](ads-weekly-dashboard.csv)

| Metric (window) | Result |
|---|---|
| Budget-lost IS | **0%** Sales + `01` |
| 7d (Jul 29–Aug 4) | $272 / **3** click-attr / CPA **$91** |
| 30d CPA | **$118** (11 click-attr / $1,299) — over ≤$110, under ≤$130 |
| `01` IS (30d) | **~50%** · $231 / 35 clicks / **0** conv |
| Ads↔CRM 30d | Spiffy Purchase **10** vs CRM click-ID **13** (**+30%** — outside ±10%; offline upload still deferred) |
| Mobile CVR (Jul 9–Aug 4) | 4.1% vs desktop 9.5% — keep −20% |

| Action | Detail |
|---|---|
| Exact keyword | `[pllc new york formation]` → `01_Core_Exact_NY` / Formation-Core (Sales word-order of converting family) |
| `02` | Enabled earlier same day (see below) |
| Deferred | Sales exact-neg fence; `ny pllc checklist` watch (2nd week); Auction Insights manual export (1st week of Aug) |
| Gate 1 | Hold — `01` 0 conv · account 11/30d (need ≥28) |

---

## Changes on 2026-08-04 — Enable `02_Professions_NY` (calendar Aug 3)

| Action | Detail |
|---|---|
| Campaign status | `02_Professions_NY` (`24017629178`) **PAUSED → ENABLED** via API |
| Bidding | Already on portfolio **`NYPLLC Search Portfolio`** (`12148056412`) Target CPA $90 — unchanged |
| Budget / geo | $25/day · NY Presence · Search only · shared negatives A–E — unchanged |
| RSA policy (pre-enable) | 20 **APPROVED** · 2 **APPROVED_LIMITED** (Attorneys — gov docs; accepted) |
| Still PAUSED | `03_ForeignQual_US` until Gate 1 (~Aug 17) |

---

## Changes on 2026-07-28 — First formal weekly SOP (§7.1; due Jul 27)

Pull: [`ads-pull-2026-07-28-weekly-sop/`](ads-pull-2026-07-28-weekly-sop/) · writeup [`WEEKLY-SOP.md`](ads-pull-2026-07-28-weekly-sop/WEEKLY-SOP.md) · dashboard [`ads-weekly-dashboard.csv`](ads-weekly-dashboard.csv)

| Metric (window) | Result |
|---|---|
| Budget-lost IS | **0%** Sales + `01` |
| 7d (Jul 22–28) | $277 / 0 click-attr conv (1 by-date) — soft week |
| 30d CPA | **$96** (16 click-attr / $1,540) — under ≤$110 |
| `01` IS (since enable) | **~53%** · $165 / 24 clicks / **0** conv |
| Ads↔CRM 30d | Spiffy Purchase **9** = CRM click-ID orders **9** |
| Mobile CVR (Jul 9–28) | 2.8% vs desktop 9.8% — keep −20% |

| Action | Detail |
|---|---|
| Exact keyword | `[nys pllc formation]` → `01_Core_Exact_NY` / Formation-Core (Sales converter) |
| Shared negatives | `"pllc name availability"`, `"check llc availability"` (phrase) → List C `12146898706` (now 27 members) |
| `02` prep | RSAs mostly APPROVED; Attorneys `APPROVED_LIMITED` (gov docs) — **ready to enable ~Aug 3** |
| Deferred | Sales exact-neg fence for terms `01` should own; offline conversion upload; Auction Insights (not 1st-of-month) |

---

## Changes on 2026-07-22 — Site title/meta pass (SEO/content-moat plan, no ad copy changes)

Source: [nypllc-seo-title-meta-pass-proposals.md](../nypllc-seo-title-meta-pass-proposals.md) audit + implementation. **Metadata-only** — `<title>` and meta description tags. **No on-page body copy, headlines, CTAs, or ad creative changed.** Logged here because the profession pages and `/foreign-pllc` (hub + 5 states) are live ad-group landing pages (`02_Professions_NY`, `03_ForeignQual_US`).

| Change | Detail |
|---|---|
| Bug fix | Root layout `title.template` was silently appending `"\| NY PLLC Formation"` a **second time** to every non-home page's rendered `<title>` (e.g. LCSW page rendered `...\| NY PLLC Formation \| NY PLLC Formation`). Removed the template; each page's own title now renders as authored. |
| Brand suffix standardized | `"\| NY PLLC Formation"` / no-suffix → `"\| NYPLLC"` site-wide (shorter, matches plan's stated house style, leaves more character budget before SERP truncation). |
| Descriptions shortened | Nearly every page's meta description was well past Google's ~155–160 char snippet limit (home 215, DIY guide 224, profession pages avg. ~230, some 250–283) — meaning `$885` was being truncated out of the visible snippet on most profession pages. All rewritten to ~130–160 chars with the price preserved near the front. |
| Profession pages (19) | `web/src/app/professions/*/page.tsx` — new titles pattern `"{Profession} PLLC — $885 [Flat] \| NYPLLC"`; new descriptions keep NYSED pre-approval / naming / publication / EIN language, all $885 pulled from `PRICING.basePrice` (no hardcoded price literals added). Removed now-unused `APP_CONFIG` import (was only used for the old title suffix). |
| Foreign-qual pages (6) | `web/src/app/foreign-pllc/{page.tsx,connecticut,florida,new-jersey,pennsylvania,texas}/page.tsx` — added missing `\| NYPLLC` brand suffix; descriptions tightened. **Per-state prices unchanged and verified**: CT $1000, NJ $995, PA $995, FL $930, TX $930 — hub and state pages do **not** mention $885 (that's the NY-formation price, not foreign-qualification pricing). |
| Other pages | `web/src/lib/seo/metadata.ts` (home, about, FAQ, contact, order, order-llc, virtual-address-services, mail-forwarding-agreement, partners, privacy, terms, disclaimer) and `web/src/app/how-to-form-a-pllc-in-ny/page.tsx` — titles/descriptions updated per the same proposals file. `web/src/app/layout.tsx` root `openGraph`/`twitter` defaults updated to match new home title/description. |
| Verified | `tsc --noEmit` clean; `next lint` clean (no new warnings); dev-server curl check confirmed rendered `<title>`/`<meta name="description">` on home, FAQ, LCSW, architect, Texas foreign-qual, and foreign-pllc hub match proposals with no double-suffix and no $885 leakage onto foreign-qual pages. |
| Not changed | Page body copy, on-page headlines, CTAs, ad RSAs/assets in the Google Ads account, `/nysed-approval-times` draft, `drafts/ny-pllc-cost-complete-2026-breakdown.md`. |

---

## Changes on 2026-07-22 — Daily check junk → List C

Pulled `ads-pull-2026-07-22/`. Account ~22 conv / $1.7k / 30d; 7d CPA soft ($144); `01` still $107 / 0 purchases. Budget-lost 0%.

| Action | Detail |
|---|---|
| Shared negatives (phrase) → List C `12146898706` | `llc availability`, `llc name availability`, `check llc`, `blumberg`, `usa corp`, `corporate book`, `corporate seal` — covers Sales broad burn on `check llc availability` (~$23) + zero-cost LLC/competitor/kit junk |

Phrase `llc …` does not match token `pllc`. Did **not** negative bare `llc formation` (leave for weekly SOP if it keeps leaking).

---

## Changes on 2026-07-11 — Formula list prices ($895 + docs)

Aligned live site + ads to `round_to_5(895 + unified_doc_cogs)`:

| Change | Detail |
|---|---|
| Site flats | NJ **$995** · PA **$995** · FL **$930** · TX **$930** · CT **$1000** |
| `03_ForeignQual_US` RSAs | Replaced all 12 — hub/FL/TX from **$930**, NJ **$995**, CT **$1000** |
| Shared price asset | New asset `390754746354` (Foreign from **$930**); linked on Sales + 01/02/03; old `$915` asset `390521246372` unlinked |

---

## Changes on 2026-07-11 — Foreign qual flat prices

Site unified PLLC/PC list prices per state (max of former path prices). Ads copy aligned:

| Change | Detail |
|---|---|
| `03_ForeignQual_US` RSAs | Replaced all 12 via `upload_rsas.py --replace` — hub/FL from **$915**, TX **$930**, NJ desc “either path” |
| Shared price asset | New asset `390521246372` (Foreign from **$915**); linked on Sales + 01/02/03; old `$910` asset unlinked |

---

## Changes on 2026-07-11 — Search-term mining (14d pull)

Pulled `ads-pull-2026-07-11/` (campaigns / keywords / search-terms / keyword-settings). Account ~22 conv / $1.7k / 30d. `01` still cold (8 impr, $0 since Jul 9 enable).

| Action | Detail |
|---|---|
| Exact keyword | `[form pllc new york]` → `01_Core_Exact_NY` / Formation-Core (converted via Sales broad at ~$8.40) |
| Shared negative | `"windsor corporate services"` (phrase) → List C `12146898706` (competitor leak, ~$21) |

**Deferred:** exact negative `[form pllc new york]` on `Sales-Search-1` — wait until `01` proves delivery (Formation-Core RSAs still `APPROVED_LIMITED`; cold start). Revisit at Gate 2 fence or after `01` wins that query.

**Also noted (no change):** Sales LCSW/PT/MHC ads `REVIEW_IN_PROGRESS`; Formation-Core + Attorneys RSAs `APPROVED_LIMITED` (`GOVERNMENT_DOCUMENTS_AND_OFFICIAL_SERVICES`).

### Same day — conversion goal fix

UI warning on `01`: “targeted goal missing a primary conversion action.” Cause: account goal **Begin checkout** was `biddable=True` while action `7678925960` is secondary-only (plan §1.1.1: observation only).

| Fix | Detail |
|---|---|
| Customer goal | `BEGIN_CHECKOUT` / `WEBSITE` → `biddable=False` |
| Campaigns | Inherited — Sales / 01 / 02 / 03 all now `biddable=False` for Begin checkout |
| Unchanged | Purchase goal biddable; Spiffy Purchase `7678072764` still primary + in Conversions |

---

## Changes on 2026-07-09 (evening) — Gap fixes (post-audit)

Ignored Sales $500/day budget (soft ceiling). Skipped cosmetic callout rewording (intent covered).

| Fix | Detail |
|---|---|
| Observation on 01/02/03 | `AUDIENCE` `bid_only=True` (was empty on drafts — 01 was live Targeting risk) |
| Audiences on 02/03 | Same 3 Observation audiences as Sales/01 |
| Campaign assets on 02/03 | Linked full 01 set (8 sitelinks, 12 callouts, call, price, snippet, logo) |
| Sales RSA www | All 4 Sales RSAs → `https://www.nypllc.com…` |
| Sitelink label | `Start Your Order — $885`; unlinked duplicate `Get Started` from Sales |
| §1.1.1 secondaries | Created `Begin checkout (Spiffy embed)` `7678925960` (7d, secondary) + `Phone call 60s+ (call asset)` `7678925963` (AD_CALL ≥60s, linked to call reporting). Site fires Begin checkout on Spiffy embed detect. |

---

## Changes on 2026-07-09 (evening) — Launch hygiene

Left Sales $500/day budget alone (soft ceiling under tCPA).

| Fix | Scope | Detail |
|---|---|---|
| Mobile bid −20% | Sales + 01 + 02 + 03 | `bid_modifier=0.8` on DEVICE MOBILE |
| www sitelinks | Shared assets (Sales + now 01) | Start Your Order / FAQ / Contact → `https://www.nypllc.com/...` |
| Observation audiences | `01_Core_Exact_NY` | Same 2 user lists + 1 user interest as Sales (no bid adj) |
| Campaign assets | `01_Core_Exact_NY` | Linked 24 from Sales: 8 sitelinks, 12 callouts, call, price, snippet, logo (skipped legacy Get Started) |

---

## Changes on 2026-07-09 — Phase 1–2 draft campaigns (PAUSED)

Source: operating plan §2.1–2.3 · package `google-ads-campaign-build/` · scripts `upload_campaigns.py` / `upload_rsas.py`

### Created (PAUSED)

| Campaign | Budget | Geo | Bidding | Negatives |
|---|---|---|---|---|
| `01_Core_Exact_NY` | $45/day | NY Presence | Maximize Conversions tCPA $90 (campaign-level) | Shared A–E |
| `02_Professions_NY` | $25/day | NY Presence | Maximize Conversions tCPA $90 (campaign-level) | Shared A–E |
| `03_ForeignQual_US` (`24012757620`) | $15/day | **US** Presence | Maximize Conversions tCPA $90 (campaign-level) | **A-FQ** + B–E |

**`01_Core_Exact_NY` ad groups:** Formation-Core · Service-Intent · Cost-Price · Brand — **41 keywords** uploaded.

**`02_Professions_NY`:** 11 ad groups · **34 keywords** (6 created with health-policy exemption request).

**`03_ForeignQual_US`:** Generic-ForeignQual · New-Jersey · Pennsylvania · Florida · Texas · Connecticut — **33 keywords** · state LPs for NJ/PA/FL/TX/CT; CA exacts → hub. Skipped `certificate of authority new york` per §2.3.

### Policy / exemption

Validate-only scan (`check_keyword_policy.py`): **6 exemptible** keywords under “Health in personalized advertising” — `lcsw pllc`, `lcsw pllc new york`, `pllc for lcsw`, `mental health counselor pllc`, `psychiatric nurse practitioner pllc`, `physical therapy pllc new york`. Uploaded with `exempt_policy_violation_keys` (pending Google review; may not serve until approved).

### Portfolio (same day)

- Created **`NYPLLC Search Portfolio`** (`biddingStrategies/12148056412`) — Target CPA **$90**
- Attached **`Sales-Search-1` only** (ENABLED) — bidding type now `TARGET_CPA` via portfolio
- Drafts still **inline** Maximize Conversions tCPA $90 — **not** attached yet

### RSA packages (same day)

- Assembled + **uploaded** **42 RSAs** (2×21 ad groups) via `google_ads/upload_rsas.py` into paused campaigns
- Ads **ENABLED** inside **PAUSED** campaigns (ready when campaigns are enabled)
- Controlled RSAs pin price headline to H1; unpinned variants have no pins
- Trustpilot headline omitted initially (no NYPLLC Trustpilot; site uses GBP **5★ / 6 reviews**)
- Foreign Qual: replaced `→` with `-` after SYMBOLS PROHIBITED rejection
- Result: `google-ads-campaign-build/rsas/rsa-upload-result.json`

### API verify (same day)

- Confirmed live: PAUSED · $15 · US Presence · Search only · inline tCPA $90 · unattached · A-FQ+B–E · 6 AGs · 33 EXACT keywords · 12 RSAs · no `→` · final URLs match state/hub pages · manifest keyword parity

### Not done yet (as of morning Jul 9)

- Attach 01/02 to portfolio + enable (wait for conversion flip) — **done evening Jul 9** (see below)
- Enable `03_ForeignQual_US` after Gate 1
- Customer Match UI upload · Auction Insights export

---

## Changes on 2026-07-09 (evening) — Portfolio attach + Core Exact launch

- Attached `01_Core_Exact_NY` + `02_Professions_NY` to **`NYPLLC Search Portfolio`** (`12148056412`)
- Enabled **`01_Core_Exact_NY`** (`24022049179`) — now ENABLED / TARGET_CPA via portfolio
- Left **`02_Professions_NY`** PAUSED on portfolio (enable ~Aug 3 per calendar)
- `Sales-Search-1` unchanged (ENABLED on same portfolio)
- `03_ForeignQual_US` still PAUSED / unattached (Gate 1)

---

## Changes on 2026-07-09 (later) — Google-reviews RSA headline

Source: operating plan §4.2 headline #10 (Trustpilot → Google) · `google-ads-campaign-build/rsas/` · `upload_rsas.py --replace`

### Headline

- **`Rated 5 Stars on Google`** (24 chars) — 5-star claim only; **no review count** in ad copy (GBP verified 5.0)

### `01_Core_Exact_NY` (8 RSAs re-uploaded)

- Swapped for `Built for NY Professionals` (15-headline API cap)
- All 4 ad groups: Formation-Core · Service-Intent · Cost-Price · Brand (controlled + unpinned)
- Result: `google-ads-campaign-build/rsas/rsa-upload-result.json`

### `02_Professions_NY` (22 RSAs re-uploaded)

- Added as 13th headline (before `Deficiency Handling Included`)
- All 11 profession ad groups (controlled + unpinned)

### Tooling

- `upload_rsas.py`: `--replace` (remove + recreate by ad name) · `--campaigns` filter

### Unchanged

- `03_ForeignQual_US` — foreign-qual copy only; no Google-reviews headline

---

## Changes on 2026-06-07

Main RSA was not changed on this date.

### Strategic context (pre-change analysis)

- Full account export covered `2025-10-22` through `2026-06-06`.
- Account is not budget constrained:
  - Search impression share ~11–12%.
  - Lost impression share overwhelmingly due to Ad Rank, not budget.
  - Budget-lost impression share effectively 0%.
- Raising tCPA from `$90` to `$110` increased spend and CPC without increasing conversion volume.
- Price transparency is a competitive advantage (flat `$885` vs competitors with hidden add-ons).

### Bidding

- Reverted `Sales-Search-1` from `$110` target CPA to `$90`.
- Verified live API value: `campaign.maximize_conversions.target_cpa_micros = 90000000`

### Keyword additions

Added exact/phrase coverage for high-CVR search terms that were missing or under-covered in `NY PLLC Formation`:

- `pllc formation new york` — `EXACT`, `PHRASE`
- `nys pllc formation` — `EXACT` (PHRASE already enabled)
- `pllc application ny` — `EXACT`, `PHRASE` (existing `BROAD` paused)
- `forming a pllc in ny` — `EXACT` (PHRASE already enabled)
- `nypllc` — `EXACT`, `PHRASE`

### Campaign assets

**Sitelinks added:** Start Your Order (`/order`), FAQ (`/faq`), Contact Us (`/contact`)

**Callouts added:** NYSED Included, Publishing Included, Flat $885 Price, No Hidden Fees, EIN Included, Operating Agreement

**Call asset attached:** (646) 444-2102

**Price asset added** (ID `370372848903`) — three `$885` rows (formation, publishing, EIN/operating agreement), all linking to `/order`

### Not changed on 2026-06-07

- Main RSA, ad group structure, final URLs
- Negative keywords *(added 2026-06-28)*
- Desktop/mobile bid adjustments
- Lead form asset

### Original monitoring targets (Jun 7 changes)

Review after 2–4 weeks: conv/week, CPA, `pllc` broad CPC, impression share, rank-lost IS, QS components, new keyword performance, asset performance.

Projected impact: +1–2 conv/month (conservative), +3–5 (base), +6–9 (upside).

---

## Changes on 2026-06-28

### Negative keywords (LLC publication noise)

Added to `NY PLLC Formation` to stop `pllc` broad from matching LLC newspaper-publication queries:

| Negative | Match type |
|---|---|
| `llc publication` | BROAD |
| `llc publishing` | BROAD |
| `publish llc` | BROAD |
| `publication requirement` | BROAD |
| `certificate of publication` | BROAD |
| `llc newspaper` | BROAD |
| `publish my llc` | EXACT |
| `publishmyllc` | EXACT |

**Data basis (Mar 1 – Jun 28):** LLC-publication terms (no `pllc` in query) — ~417 impressions, 17 clicks, 1 conversion, ~$148 spend.

**Not blocked:** PLLC formation queries (`pllc`, `pllc formation`, etc.).

Verified live via API: all 8 negatives `ENABLED`.

### Post-change review (Jun 7 – Jun 28)

| Metric | Pre-change (May 15 – Jun 6) | Post-change (Jun 7 – Jun 28) |
|---|---|---|
| Spend/day | $129 | $53 |
| Conv/month | ~24.4 | ~23.2 |
| CPA | $159 | $69 |
| CVR | 7.4% | 12.5% |
| Impression share | 12.4% | 13.6% |

**Verdict:** tCPA revert and new keywords improved efficiency. New keywords: 9 of 17 conv at $48 CPA. Volume flat vs $110 era; +23% vs March $90 baseline at similar spend. `pllc` broad throttled ($98/day → $23/day).

**Next review:** ~mid-July (see IS/QS tracking below).

### Early snapshot (Jul 1, 4 days post-negatives)

| Metric | Jun 7–27 | Jun 28–Jul 1 |
|---|---|---|
| Spend/day | $55 | $96 |
| Conv/month (pace) | ~24 | ~38* |
| CPA | $67 | $76 |
| CVR | 12.7% | 15.6% |
| LLC publication terms | 52 imp, $49 | **0 imp, $0** |

\*4-day sample — not reliable for forecasting.

`pllc` broad QS still **5**, expected CTR still **Below Average** (too early to move). Negatives blocking LLC publication traffic as intended; spend ramping. Second RSA still deferred.

---

## Mid-July review: IS / QS tracking

**Review window:** ~2026-07-12 – 2026-07-14 (2+ full weeks after LLC publication negatives).

**Why this matters:** ~88% of lost impression share is **Ad Rank**, not budget. Scaling means winning more auctions via higher expected CTR and query match — not raising budget or tCPA first.

### Baselines (as of 2026-07-01)

| Metric | Value |
|---|---|
| Campaign search impression share | ~13% |
| Rank-lost impression share | ~87% |
| Budget-lost impression share | ~0% |
| `pllc` broad QS | 5 |
| `pllc` broad expected CTR | Below Average |
| `pllc` broad ad relevance | Above Average |
| `pllc` broad landing page | Average |
| tCPA | $90 |

### Targets (if negatives + Jun 7 changes are working)

| Metric | Now | Target (2–3 months) | Red flag |
|---|---|---|---|
| `pllc` broad QS | 5 | **6–7** | Stays 5 after 4+ weeks |
| `pllc` broad expected CTR | Below Average | **Average** | Still Below Average mid-July |
| Campaign search IS | ~13% | **15–17%** | Flat while CPA rises |
| Rank-lost IS | ~87% | **82–85%** | — |
| CPA | ~$76 (early post-neg) | **$75–90** | Sustained **>$100** |
| LLC publication impressions | 0 (4d) | **0** | Any recurrence |
| Daily spend | ~$96 (4d) | **$75–100** | Collapse to <$50/day |

### API pulls for review

```bash
cd /Users/sidneybrodsky/Dev/financial-planner

# Performance since negatives
.venv/bin/python google_ads_cli.py pull campaigns keywords search-terms devices \
  --start 2026-06-28 --end $(date +%Y-%m-%d)

# pllc broad QS components
.venv/bin/python google_ads_cli.py query --sql \
  "SELECT ad_group_criterion.keyword.text, ad_group_criterion.quality_info.quality_score, ad_group_criterion.quality_info.search_predicted_ctr, ad_group_criterion.quality_info.creative_quality_score, ad_group_criterion.quality_info.post_click_quality_score FROM keyword_view WHERE ad_group_criterion.keyword.text = 'pllc' AND ad_group_criterion.keyword.match_type = 'BROAD' AND segments.date BETWEEN '2026-06-28' AND '$(date +%Y-%m-%d)'"
```

### Decision gates (mid-July)

**Proceed to second RSA if:**
- LLC publication terms stay at zero
- CPA under ~$90 for 2+ full weeks
- Spend holding ~$75–100/day
- Conversions on pace for ~26+/month

**Hold / investigate if:**
- CPA sustained above $100 with no IS gain
- `pllc` broad QS still 5 and expected CTR still Below Average after 3+ weeks
- Spend drops back below ~$60/day

**Do not do yet:**
- tCPA above $95 (May proved $110 adds cost, not rank)
- Budget increases (0% budget-lost IS)
- Ad group splits (insufficient volume)

### If targets are met — next scaling steps (priority order)

1. **Second RSA** — query-matched headlines; pin one H1 only; main RSA untouched
2. **Search term mining** — add exact/phrase for any term converting under ~$70 CPA
3. **Lead form asset** — mobile CVR / checkout hesitation
4. **tCPA $95** — only if actual CPA under ~$80 for 4+ weeks
5. **Desktop bid +15%** — only if mobile CVR regresses or desktop surplus justifies it

### What “impression share push” means (concrete)

Not vague — for this account it is specifically:

1. **Stop losing auctions on bad queries** — LLC publication negatives (done)
2. **Win more auctions on good queries** — second RSA + more exact/phrase keywords
3. **Wait for Google to re-score expected CTR** on `pllc` broad (4–8 week lag)
4. **Then** consider a small tCPA nudge ($95) if CPA has headroom

Each +2–3 pts impression share ≈ **+4–6 conv/month** at current CVR (rough estimate). Budget is not the bottleneck.

---

## Open opportunities (not implemented)

- Second RSA with query-matched copy — **deferred** (wait for negative-keyword impact)
- Desktop bid bias (+15–20%) — **deferred** (mobile CPA $66 vs desktop $76 post-change)
- Lead form asset for mobile
- Ad group split — **deferred** (insufficient volume)
