# Weekly SOP §7.1 — week ending 2026-08-04

**Due:** Aug 3 (calendar week after Jul 27) · **Ran:** Aug 4  
**Account:** 1529880213 · Pull folder: this directory  
**Live campaigns:** `Sales-Search-1` + `01_Core_Exact_NY` + `02_Professions_NY` (enabled today) · `03` PAUSED unattached

---

## Checklist

| # | Check | Result |
|---|---|---|
| 1 | Search terms (Discovery/Sales first, then all) | See mining below — 1 promote; no new List C; checklist still watch |
| 2 | Budget-lost IS = 0% | **Pass** — Sales 0%, `01` 0% (7d + 30d) |
| 3 | 7d / 28d CPA vs target (≤$110 blended; ≤$130 OK) | 7d: **$91** (3 click-attr / $272). Aug MTD: **$74**. 30d: **$118** — over ≤$110, under ≤$130 |
| 4 | Thesis: Core Exact IS · rolling-30d account conv | `01` IS **~50%** (30d). Account **11** click-attr / **14** by-date in 30d — Gate 1 needs ≥28/30d |
| 5 | Pacing vs monthly | Jul full **$1,389** (~$45/day) under Jul $3k band. Aug MTD **$148** / 4d (~$37/day) vs Aug ~$3.9k band — rank-lost constrained, not budget |
| 6 | Tracking sanity Ads vs CRM ±10% (30d) | Primary Spiffy Purchase **10** · CRM click-ID orders **13** — **+30%** (outside ±10%). See note |
| 7 | Dashboard + change log | `ads-weekly-dashboard.csv` + `google_ads_changes.md` |
| 8 | Microsoft auto-sync | N/A (Bing not live) |
| 9 | Auction Insights (1st week of month) | **Due** — manual UI export still required (API not used this pass) |
| 10 | Screenshot IS/rank-lost for era table | Logged numerically below (no UI screenshot this pass) |

---

## Performance windows

### 7d (Jul 29–Aug 4)

| Campaign | Impr | Clicks | Spend | Conv (click) | Conv (date) | CPA | Search IS | Rank-lost | Budg-lost |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Sales-Search-1 | 305 | 24 | $205.93 | 3.0 | 3.0 | $69 | 20.2% | 79.8% | 0% |
| 01_Core_Exact_NY | 70 | 11 | $65.88 | 0 | 0 | — | 43.9% | 56.1% | 0% |
| 02_Professions_NY | 0 | 0 | $0 | 0 | 0 | — | — | — | — |
| **Account** | **375** | **35** | **$271.81** | **3.0** | **3.0** | **$91** | — | — | — |

Recovery week after last week's soft 0-click-attr 7d. `02` enabled Aug 4 — no delivery yet in this window (expected).

### 30d (Jul 6–Aug 4) — thesis window

| Campaign | Impr | Clicks | Spend | Conv (click) | CPA | Search IS | Rank-lost | Budg-lost |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Sales-Search-1 | 1710 | 122 | $1,068.26 | 11.0 | $97 | 15.8% | 84.2% | 0% |
| 01_Core_Exact_NY | 250 | 35 | $230.92 | 0 | — | 50.0% | 50.0% | 0% |
| **Account** | **1960** | **157** | **$1,299.18** | **11.0** | **$118** | — | — | — |

Primary conversion actions (30d): Spiffy Purchase **10** / value **$8,855** · page-load secondary **1** · Begin checkout observation-only (all_conversions 35).

### Since `01` enable (Jul 9–Aug 4)

Account: $1,151 / 10 click-attr conv / CPA **$115**. `01`: $231 / 35 clicks / **0** conv — still learning; brand `nypllc` remains the only converting search term that also touches `01`.

### Devices (Jul 9–Aug 4)

| Device | Clicks | Spend | Conv | CVR |
|---|---:|---:|---:|---:|
| Desktop | 84 | $898 | 8.0 | 9.5% |
| Mobile | 49 | $231 | 2.0 | 4.1% |
| Tablet | 2 | $22 | 0 | 0% |

Mobile CVR is **43% of desktop** on the since-enable window — keep −20% device bid; do **not** remove until ≥80% of desktop over 30d (§3.6). (7d alone looked better at 7.7% vs 9.1% — too thin to act on.)

---

## Search-term mining

### Converters (Jul 9–Aug 4) → promote / keep

| Term | Conv | Spend | Campaigns | Action |
|---|---:|---:|---|---|
| `nypllc` | 3.0 | $133 | Sales + 01 Brand | Already exact on both — keep |
| `pllc formation new york` | 1.0 | $152 | Sales | Already exact on `01`; defer Sales fence until `01` delivers |
| `nys pllc formation` | 1.0 | $24 | Sales | Already added to `01` last SOP — keep; Sales still winning for now |

### Near-converters / coverage gaps

| Term | Spend | Notes | Action |
|---|---:|---|---|
| `pllc new york formation` | $17 | Word-order of converting family; Sales only | **Added** `[pllc new york formation]` exact → `01` / Formation-Core |
| `ny pllc formation` | $52 | Already exact on `01` — spending, 0 conv | Leave; QS/LP learning |
| `convert llc to pllc new york` | $12 | Real intent; niche | **Watch** — no add this week |

### Junk / wrong intent

| Term | Spend | Notes | Action |
|---|---:|---|---|
| `check llc availability` | $23 | Pre–Jul 28 List C add (historical in window) | Already on List C — no change |
| `ny pllc checklist` | $10 | Ambiguous buyer research | **Watch** (2nd week) — still no negative |
| availability / blumberg / usa corp / corporate book·seal | $0 | Impressions only | List C holding — good |

Do-not-negative list (`cost` / `price` / `how to form` / `requirements` families): how-to terms appear as $0 impr on `01` only — **none wrongly negatived**.

List C member_count: **27** (unchanged).

**Deferred (unchanged):** exact-neg `[form pllc new york]` / `[pllc formation new york]` on Sales until `01` proves delivery.

---

## Tracking sanity (Ads ↔ CRM)

| Window | Ads Spiffy Purchase (primary) | CRM orders w/ gclid/wbraid/gbraid | Δ |
|---|---:|---:|---|
| 30d | 10 | 13 | **+30%** ⚠ |
| 7d | 3 | 4 | +33% |

Notes:
- Outside ±10% SOP gate for the first time since flip. CRM > Ads is the safer direction (under-attribution in Ads, not over-count).
- Known hybrid still in window: Jul 26 CRM order has **gclid + `utm_source=fb`**.
- Offline conversion upload still deferred — likely part of the gap; do not “fix” with bid changes.
- Page-load secondary still fires — correctly not biddable.
- Re-check next SOP; if still >±10%, prioritize offline upload / attribution audit before Gate 1.

---

## `02_Professions_NY` (enabled Aug 4)

- **ENABLED** today (`24017629178`) on portfolio tCPA $90 · $25/day · NY Presence · A–E.
- RSA: 20 APPROVED · 2 APPROVED_LIMITED (Attorneys).
- No impressions yet in the Jul 29–Aug 4 pull (enabled mid-day Aug 4) — start daily 10-min monitoring with Sales + `01`.

---

## Standing rules / Gate 1 trajectory

- Account CPA tripwire (>$130 × 3 weeks): **not tripped** — 30d $118; prior week soft/n/a; this 7d $91.
- Gate 1 (~Aug 17): needs Core Exact ≥15 conv ≤$110 **and** account ≥28 conv/30d ≤$105. Today: `01` **0** conv · account **11**/30d · 30d CPA **$118**. Path is **hold / accumulate** — do **not** launch `03`.
- Microsoft Ads: not started (Sep).
- Auction Insights: first week of Aug — **manual export still open**.

---

## Changes made this SOP

1. Exact keyword `[pllc new york formation]` → `01_Core_Exact_NY` / Formation-Core  
2. (Earlier today, same session) Enabled `02_Professions_NY`  
3. Created weekly dashboard row + this writeup
