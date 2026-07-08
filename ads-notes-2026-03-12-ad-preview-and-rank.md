# Ads Notes — 2026-03-12 (Ad Preview, Rank, “Wait vs Fix”)

## Scope of Today’s Discussion

- You asked for **efficiency improvements (ad/LP quality) to win more auctions at the same CPA**.
- Constraint: **no changes**; inspect current setup and give opinions only.
- We used **Ad Preview & Diagnosis** to get an explicit, real-time reason for “not showing” (vs guessing from aggregate metrics).

## Reports Exported to CSV (Data Sources)

These are the exported reports we’ve been using for diagnosis and trend checks:

- `report.csv`
  - **Type**: Keyword daily report
  - **Grain**: keyword x day
  - **Columns (exact)**: `Search keyword`, `Day`, `Impr.`, `Clicks`, `Currency code`, `Cost`, `Conversions`
  - **Use**: keyword-level volume, CPC/CPA/CVR changes by time; validate match-type impact and `pllc` contribution

- `search-terms-daily.csv`
  - **Type**: Search terms daily report
  - **Grain**: search term x day
  - **Columns (exact)**: `Search term`, `Day`, `Impr.`, `Clicks`, `Currency code`, `Cost`, `Conversions`
  - **Use**: query mix shifts, “junk vs qualified” traffic, and whether converting terms are still present/covered

- `new report.csv`
  - **Type**: Campaign daily report with impression share
  - **Grain**: campaign x day
  - **Columns (exact)**: `Campaign`, `Day`, `Impr.`, `Clicks`, `Currency code`, `Cost`, `Conversions`, `Search impr. share`, `Search lost IS (rank)`, `Search lost IS (budget)`
  - **Use**: distinguish **rank limitation vs budget limitation** over time

- `top of page report.csv`
  - **Type**: Campaign daily top-of-page report
  - **Grain**: campaign x day
  - **Columns (exact)**: `Display URL domain`, `Campaign`, `Day`, `Top of page rate`, `Abs. Top of page rate`
  - **Use**: sanity-check whether “not showing” is primarily **not entering auctions** vs **showing but low on page**

## Important Clarification (Ad Preview & Diagnosis)

- The **Location control is the simulated searcher location**, not “where the campaign is targeted.”
- So running diagnoses with Location set to New Jersey was effectively asking: *would you show to a searcher in NJ?*
- Since the campaign is NY-only, the correct simulation is a **New York** location.

## Ad Preview & Diagnosis — What We Tested

We tested high-intent queries:

- `pllc`
- `pllc formation new york`
- `ny pllc formation`
- `pllc new york`

We ran them with:

- **Location initially**: West Orange, New Jersey (incorrect for NY-only targeting)
- **Then corrected**: New York, United States
- **Device**: Mobile, then you noted it’s the same on Desktop

## Key Finding

Across the tests, the tool did **not** indicate negative keyword blocking.

Instead, the dominant diagnosis was **Ad Rank**.

### With Location = New Jersey (initial / not the right simulation)

- `pllc`: **Your ad has a low Ad Rank for this search.**
- `pllc formation new york`: **Your ad has a low Ad Rank for this search.**
- `ny pllc formation`: **Your ad is probably being shown at times, but was not shown for this particular diagnosis.**
- `pllc new york`: **Your ad has a low Ad Rank for this search.**

### With Location = New York (correct simulation for your campaign)

- `pllc`: **Your ad has a low Ad Rank for this search.**
- `pllc formation new york`: **Your ad has a low Ad Rank for this search.**
- `ny pllc formation`: **Your ad is probably being shown at times, but was not shown for this particular diagnosis.**
- `pllc new york`: **Your ad is probably being shown at times, but was not shown for this particular diagnosis.**

Interpretation:

- The tool is consistently pointing to **rank / auction competitiveness** rather than “you’re blocked” (negatives) or “you’re ineligible” (targeting).
- The “probably being shown at times” message is *not* a pass/fail; it’s basically “you can show, but didn’t in this single simulated check.”

## Connecting This to the Data We’ve Been Watching

- Our earlier exports showed **Search IS low** and **Lost IS (rank) high**, with **Lost IS (budget) ~0**.
- Ad Preview & Diagnosis is a second, independent signal that the constraint is **auction access / rank**, not budget or negative conflicts.

## Waiting for `pllc` Broad to “Bounce Back” (What’s True / Not True)

### What waiting *could* fix

Broad changes + smart bidding can take time to stabilize.

Waiting can help if, over the next few days:

- Google’s predicted conversion performance improves as it re-learns traffic, and/or
- The query mix shifts into auctions where you can win, and/or
- Auction pressure eases.

### What waiting *does not guarantee*

Seeing **“low Ad Rank”** in diagnosis does not prove waiting can’t help, but it does mean:

- Right now, you are **often not clearing the ad rank threshold** on core queries.
- If that remains true, volume won’t rebound much even if CPA looks fine on the limited auctions you win.

## The tCPA Change (82 → 90) and Why It Matters

- You raised tCPA from **$82 → $90**.
- In principle, that loosening should give the bidding system more headroom to bid into auctions (helping rank).
- If, after loosening, the tool still says **low Ad Rank** on core queries, it suggests:
  - The additional headroom may be **too small vs what’s needed** in those auctions, and/or
  - The system is still constrained by **quality / predicted performance** and isn’t willing to bid enough (or can’t without overshooting CPA).

## What We’ll Use as “Is Waiting Working?” Criteria (Next Export)

In ~72 hours, re-export the same daily reports (extend to “today”) and check whether, at the campaign level:

- **Search Impression Share increases**, and/or
- **Search lost IS (rank) decreases**, and
- Clicks / impressions recover **without CPA blowing up**.

If those don’t move meaningfully, “just waiting” is less likely to restore volume on its own, and the next lever becomes:

- **More bid headroom** (raise tCPA further), and/or
- **Efficiency improvements** (ad specificity + landing page quality / clarity) so the system can win more auctions at the same CPA.

