# Weekly SOP §7.1 — week ending 2026-07-28

**Due:** Jul 27 (calendar) · **Ran:** Jul 28 (one day late)  
**Account:** 1529880213 · Pull folder: this directory  
**Live campaigns:** `Sales-Search-1` + `01_Core_Exact_NY` · `02` PAUSED · `03` PAUSED unattached

---

## Checklist

| # | Check | Result |
|---|---|---|
| 1 | Search terms (Discovery/Sales first, then all) | See mining below — 1 promote + 2 List C adds |
| 2 | Budget-lost IS = 0% | **Pass** — Sales 0%, `01` 0% (7d + 30d) |
| 3 | 7d / 28d CPA vs target (≤$110 blended; ≤$130 OK) | 7d: **n/a** (0 click-attr conv / $277). 28d MTD: **$109**. 30d: **$96** — under target |
| 4 | Thesis: Core Exact IS · rolling-30d account conv | `01` IS **~53%** (impr-weighted since enable). Account **16** click-attr / **17** by-date conv in 30d — Gate 1 needs ≥28/30d |
| 5 | Pacing vs monthly | Jul MTD **$1,258** (~**$45/day**) — under Jul plan band; not budget-capped (rank-lost dominates) |
| 6 | Tracking sanity Ads vs CRM ±10% (30d) | Primary Spiffy Purchase **9** · CRM click-ID orders **9** — **match**. See note |
| 7 | Dashboard + change log | `ads-weekly-dashboard.csv` + `google_ads_changes.md` |
| 8 | Microsoft auto-sync | N/A (Bing not live) |
| 9 | Auction Insights (1st week of month) | Skip — not first week of Aug |
| 10 | Screenshot IS/rank-lost for era table | Logged numerically below (no UI screenshot this pass) |

---

## Performance windows

### 7d (Jul 22–28)

| Campaign | Impr | Clicks | Spend | Conv (click) | Conv (date) | CPA | Search IS | Rank-lost | Budg-lost |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Sales-Search-1 | 357 | 31 | $218.61 | 0 | 1 | — | 20.2% | 79.8% | 0% |
| 01_Core_Exact_NY | 58 | 12 | $57.92 | 0 | 0 | — | 50.6% | 49.4% | 0% |
| **Account** | **415** | **43** | **$276.52** | **0** | **1** | — | — | — | — |

Soft week (n=0 click-attr). Do **not** trip the 3-week CPA rule on a zero-conversion week.

### 30d (Jun 29–Jul 28) — thesis window

| Campaign | Impr | Clicks | Spend | Conv (click) | CPA | Search IS | Rank-lost | Budg-lost |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Sales-Search-1 | 2077 | 147 | $1,375.29 | 16.0 | $86 | 13.9% | 86.1% | 0% |
| 01_Core_Exact_NY | 179 | 24 | $165.04 | 0 | — | 52.8% | 47.2% | 0% |
| **Account** | **2256** | **171** | **$1,540.33** | **16.0** | **$96** | — | — | — |

Primary conversion actions (30d): Spiffy Purchase **9** / value **$7,725** · page-load secondary **7** · Begin checkout observation-only (all_conversions 25).

### Since `01` enable (Jul 9–28)

Account: $872 / 7 click-attr conv / CPA **$125**. `01`: $165 / 24 clicks / **0** conv — still learning; brand `nypllc` is the only converting search term that also touched `01`.

### Devices (Jul 9–28)

| Device | Clicks | Spend | Conv | CVR |
|---|---:|---:|---:|---:|
| Desktop | 61 | $684 | 6.0 | 9.8% |
| Mobile | 36 | $166 | 1.0 | 2.8% |
| Tablet | 2 | $22 | 0 | 0% |

Mobile CVR is **29% of desktop** — keep −20% device bid; do **not** remove until ≥80% of desktop over 30d (§3.6).

---

## Search-term mining

### Converters (Jul 9–28) → promote / keep

| Term | Conv | Spend | Campaigns | Action |
|---|---:|---:|---|---|
| `nypllc` | 2.0 | $71 | Sales + 01 Brand | Already exact on both — keep |
| `nys pllc formation` | 1.0 | $24 | Sales only | **Added** `[nys pllc formation]` exact → `01` / Formation-Core |
| `pllc formation new york` | 0.5 | $117 | Sales | Already exact on Sales; on `01` inventory at $0 — leave; defer Sales fence until `01` delivers |

### Junk / wrong intent

| Term | Spend | Notes | Action |
|---|---:|---|---|
| `check llc availability` | $23 (Jul 20) | LLC name-tool intent | Parent phrases already on List C; **added** full phrase `check llc availability` |
| `pllc name availability` | $0 (impr) | Same family | **Added** phrase → List C |
| `ny pllc checklist` | $10 / 2 clk | Ambiguous buyer research | **Watch** — not on do-not-negative list; no add this week |
| `business filing solutions` | $14 | Intentional competitor conquest on `01` Brand | Keep |

Do-not-negative list (`cost` / `price` / `how to form` / `requirements` families): present only as zero-spend impressions — **none wrongly negatived**.

List C member_count after adds: **27** (was 25).

**Deferred (unchanged):** exact-neg `[form pllc new york]` on Sales until `01` proves delivery.

---

## Tracking sanity (Ads ↔ CRM)

| Window | Ads Spiffy Purchase (primary) | CRM orders w/ gclid/wbraid/gbraid | Δ |
|---|---:|---:|---|
| 30d | 9 | 9 | **0%** ✓ |
| 7d | 0 click / 1 by-date | 3 | Gap — see notes |

Notes:
- Jul 26 CRM order has **gclid + `utm_source=fb`** — Meta landing with leftover Google click ID; channel labels can disagree even when Ads count is sane.
- Offline conversion upload still deferred — 7d noise expected; 30d primary match is the SOP gate.
- Page-load secondary still fires ($1 defaults) — correctly not biddable.

---

## `02_Professions_NY` prep (calendar: polish / enable ~Aug 3)

- Still **PAUSED**, on portfolio tCPA $90, $25/day budget.
- RSA policy: nearly all **APPROVED**; Attorneys **APPROVED_LIMITED** (gov-docs — same class as `01` Formation-Core). No copy rewrite this week.
- **Ready to enable Aug 3** as planned. No structural polish blocker.

---

## Standing rules / Gate 1 trajectory

- Account CPA tripwire (>$130 × 3 weeks): **not tripped** — 30d $96; soft 7d ignored.
- Gate 1 (~Aug 17): needs Core Exact ≥15 conv ≤$110 **and** account ≥28 conv/30d ≤$105. Today: `01` **0** conv · account **16**/30d · 30d CPA **$96**. Path is **hold / accumulate** — do not launch `03` early.
- Microsoft Ads: not started (Sep).

---

## Changes made this SOP

1. Exact keyword `[nys pllc formation]` → `01_Core_Exact_NY` / Formation-Core  
2. Shared List C phrase negatives: `pllc name availability`, `check llc availability`  
3. Created weekly dashboard row + this writeup; marked calendar Jul 27 done
