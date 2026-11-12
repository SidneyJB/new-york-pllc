# P2-11: 2028 model, first pass (Nov 11 2026)

**Prepared by:** Agent. **Decision owner:** Sid. **Due:** Nov 24 (P2-11). This is a first pass for review, not the final model.

**Files:** [model script](../../scripts/model_2028.py) (every assumption is in it, with its source) · monthly output per case: [downside](monthly-downside.csv), [target](monthly-target.csv), [strong](monthly-strong.csv) · [summary.json](summary.json). Re-run with `python3 scripts/model_2028.py`.

## 1. Result

Operating profit is before owner pay and before business taxes, the same definition as the P1-03 P&L.

| 2028 | Downside | Target | Strong |
|---|---:|---:|---:|
| Formations (year) | 709 | 1,264 | 1,496 |
| Formations per month by Dec 2028 | 60 | 114 | 138 |
| Formation contribution (incl. S-corp add-on) | $384.7K | $667.7K | $785.4K |
| Virtual mail (net of card fees) | $140.4K | $225.2K | $276.2K |
| Registered agent renewals | $50.2K | $64.6K | $75.0K |
| Ads (Google + Bing) | −$37.8K | −$56.8K | −$62.3K |
| Overhead (incl. staff help above 90 orders/mo) | −$17.6K | −$77.6K | −$77.6K |
| **Operating profit** | **$520K** | **$823K** | **$997K** |
| After Sid's pay ($10.8K/mo) | $390K | $693K | $867K |
| VM subscribers, Dec 2028 | 268 | 473 | 600 |

2027 operating profit: downside $438K, target $575K, strong $624K.

**Check against today:** Apr–Oct 2026 actual operating profit was $423K annualized on cash (P1-03 §3a). The downside 2027 ($438K) is roughly "today, held flat, with recurring revenue still building," so the starting point reconciles.

**Read:** the $1M goal needs the **strong** case: about 138 formations a month by the end of 2028, with 35 a month from partners and a VM book near 600. The target case, which uses the integrated plan's own lever estimates, lands around **$820K**.

## 2. What drives the difference

Downside to strong is $477K in 2028:

| Piece | Share of the gap |
|---|---:|
| Formation volume (787 more orders) | ~$400K |
| VM book (attach, churn, more formations feeding it) | ~$136K |
| RA renewals | ~$25K |
| More ads and staff help | −$85K |

**The two assumptions that matter most:**
1. **Formation volume from channels we don't have yet.** Partners (0 today → 25–35 a month) plus organic/AI growth make up most of the gap. Today partners are at zero conversations.
2. **Contribution per order and the funnel fix.** −$50 per order costs about $51K in 2028. Leaving abandoned-checkout capture broken (F1 = 0) costs about the same ($51K).

One-at-a-time changes to the target case (2028 operating profit):

| Change | Effect |
|---|---:|
| Retail contribution −$50/order | −$51K |
| Abandoned-checkout recovery never fixed | −$51K |
| Partners end at 15/mo instead of 25 | −$46K |
| Organic/AI ends 8/mo lower | −$44K |
| Google ends at 30/mo instead of 37 | −$43K |
| VM attach 22% instead of 27% | −$31K |
| Bing stays blocked | −$27K |
| VM churn 3.0% instead of 2.4% | −$13K |
| RA first renewal 55% instead of 65% | −$10K |

## 3. Assumptions (all in the script)

- **Contribution:** $514 per retail order at $885 (P1-03, no labor line per Sid, Nov 9), plus the S-corp add-on (17.3% × $195). Partner orders $420 (referral: client pays $860 and we pay a $75 fee; wholesale near $800).
- **Price:** $885 held (decision log Nov 9). No $985 effect is modeled.
- **Channels** (orders/month at Nov 2026 → Dec 2027 → Dec 2028, target): Google 30 → 36 → 37; organic/AI/other 25 → 30 → 36; abandoned-checkout recovery 0 → 6; checkout/mobile fixes 0 → 4 → 6; Bing 0 → 4; partners 0 → 15 → 25. Each order counts once, under one channel. These are the integrated plan's Section 2 central lever estimates, not new forecasts.
- **Ads:** the first 30 Google orders at the current ~$105 CPA; anything above that at the $150 allowance (decision log Nov 9). Bing at $150.
- **VM:** opening book of 96 active + 80% of 23 trialing; 27% attach; first paid month 2 months after formation; 2.4%/mo churn; $50/mo net of card fee. Partner orders attach at half the rate [I]. Metro VM: 14 subscribers at $23.47 to us.
- **RA:** $99/yr, first billed 12 months after formation, only for retail formations without VM (VM includes RA). First renewal 65% (plan target), later years 85% [I]. Nov 2025–Mar 2026 formations assumed at 45/mo [U]; Apr–Oct 2026 are actuals.
- **Overhead:** $1,464/mo (Relay actuals + Spiffy), plus $5K/mo for part-time help once formations pass 90/mo [I].
- **Not in the base (P2-11 rule):** credentialing, PC formations, CAQH, affiliate income, Compliance Plan upgrades, $985 pricing. Each is upside if it proves out.

## 4. Market size check (time-boxed)

Source: NY DOS "Active Corporations: Beginning 1800" ([data.ny.gov n9v6-gdp6](https://data.ny.gov/resource/n9v6-gdp6.json)), counted by year of initial filing, pulled Nov 11.

| Year filed | Domestic PLLCs still active | Domestic PCs still active |
|---|---:|---:|
| 2021 | 2,971 | 1,850 |
| 2022 | 3,045 | 1,731 |
| 2023 | 3,874 | 1,895 |
| 2024 | 4,292 | 1,874 |
| 2025 | 4,626 | 1,705 |
| 2026 (to about Nov 11) | 4,410 | 1,354 |

- **These are active entities only**, so every year is a floor. Dissolved ones are missing, more so for older years, so the growth rate is overstated. A full-filings count would need DOS's filing data, which this dataset doesn't include.
- **Rough share:** about 500 of our formations in 2026 so far against at least 4,410 domestic PLLCs is about **11%** (our count also includes some LLCs and foreign entities).
- **What 2028 implies:** if PLLC formations keep growing about 5–8% a year, 2028 is roughly 5,200–5,800. The target case (1,264) is about 22–24% of that, and the strong case (1,496) about 26–29%. That's more than double today's share. It is only reachable if partners and AI search add volume competitors don't capture.
- A count of licensed professionals is not the formation market, so it isn't used here.

## 5. Not done yet (for the Nov 24 version)

- **Cash view.** This pass is operating profit. Cash timing (installments over about 6 weeks, publication and certificate costs paid months after the order, 0.5% bad debt) isn't modeled month by month yet.
- **Product mix.** Only retail vs partner is split. PLLC vs LLC vs foreign qualification each carry a different contribution, and there's no per-product split yet.
- **Nov 2025–Mar 2026 actual formations** (assumed 45/mo) should be pulled from the CRM, since they drive 2027 RA renewals.
- **Sid's review** of the channel paths, especially partners (0 conversations today vs 25 a month in the target case).
