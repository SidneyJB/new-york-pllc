# Core Exact (`01_Core_Exact_NY`) funnel audit — Sep 1 2026

**Window:** keywords/search terms/ads Jul 9–Sep 1; devices + conversion actions Aug 3–Sep 1.  
**Sources:** this pull folder. **Do not raise bids.** Impression share is not the problem.

## Verdict

The campaign is **winning auctions and starting checkout**. It is **not closing purchases**.

| Stage (30d, `01` only) | Count | Read |
|------------------------|------:|------|
| Clicks | 65 | Enough to learn |
| Begin checkout (all conversions) | **17.02** | Funnel is reaching Spiffy |
| Spiffy Purchase (primary) | **3.50** | ~20% checkout→purchase |
| Search IS | ~47% (30d) | Gate 2 IS already clears |

Bottleneck is **post-click / RSA mix / mobile**, not eligible volume.

## RSA split (Jul 9–Sep 1) — largest controllable leak

| Ad | Impr | Clicks | Spend | Purchases |
|----|-----:|-------:|------:|----------:|
| Formation-Core — **controlled** | 160 | 27 | $174 | **3.50** |
| Formation-Core — **unpinned** | 437 | 50 | $306 | **0** |
| All other `01` RSAs | — | 20 | $146 | 0 |

Google is serving the unpinned RSA more than the converting controlled RSA. **Paused Sep 1** (`Formation-Core — unpinned`, ad `816286133015`). Do not raise tCPA.

## Keywords that convert vs spend

Converters (Jul 9–Sep 1):

| Keyword | Clicks | Spend | Purchases | CPA |
|---------|-------:|------:|----------:|----:|
| `[pllc new york]` | 8 | $77 | 2.00 | $38 |
| `[ny pllc formation]` | 19 | $124 | 1.50 | $83 |

Spend without purchases (same window):

| Keyword | Clicks | Spend |
|---------|-------:|------:|
| `[pllc formation ny]` | 18 | $95 |
| `[ny pllc]` | 15 | $70 |
| `[pllc formation service ny]` | 7 | $56 |
| `[nypllc]` brand | 7 | $47 |
| `[new york pllc formation]` | 2 | $39 |

`[pllc formation ny]` and `[ny pllc formation]` are near-duplicates; only the latter converts. Leave both until sample grows — do **not** exact-negative Sales yet (deferred fence).

Several Formation-Core exacts have impressions and **zero clicks** (`[pllc application ny]` 22, `[form pllc new york]` 17) — ad-copy/QS, not bid.

## Device (30d)

| Device | Clicks | Spend | Purchases | CVR |
|--------|-------:|------:|----------:|----:|
| Desktop | 44 | $326 | 3.50 | 8.0% |
| Mobile | 21 | $78 | **0** | 0% |

Keep the **−20% mobile bid**. Do not treat this as a landing-page rewrite sprint unless checkout observation stays high and purchases stay zero after the unpinned pause.

## Search terms

No junk leak worth a List C add. Near-exact DIY (`how to form…`) is almost all impressions, not spend. Brand `nypllc` still does not convert on `01` (Sales still carries brand purchases).

## What not to do

- Do not launch `03`.
- Do not raise portfolio tCPA.
- Do not pause `[pllc formation ny]` after 18 clicks — watch one more week after unpinned pause.
- Do not treat Core IS as the Gate 2 blocker (volume is).
