# Auction Insights — Manual Export Required

**Date:** 2026-07-05  
**Account:** NYPLLC (`1529880213`)  
**Campaign:** `Sales-Search-1`

## API status

Auction Insights metrics are **not available** via the current Google Ads API developer token:

```
METRIC_ACCESS_DENIED: auction_insight_search_overlap_rate,
auction_insight_search_outranking_share, auction_insight_search_impression_share,
auction_insight_search_position_above_rate, ...
```

This requires **Standard API access** or a token with auction insights metric permissions. Basic/Explorer tokens typically cannot pull these fields.

## Manual export (baseline file)

1. Google Ads UI → **Campaigns** → `Sales-Search-1`
2. **Insights & reports** → **Auction insights**
3. Date range: **Oct 22, 2025 – Jul 5, 2026** (or last 90 days for cleaner competitor set)
4. Download CSV
5. Save as: `Ads - auction-insights_ui_2025-10-22_to_2026-07-05.csv`

## Columns to capture

| Column | Use |
|---|---|
| Display URL domain | Competitor identity |
| Impression share | Their auction presence vs you |
| Overlap rate | How often you compete |
| Position above rate | How often they rank above you |
| Top of page rate | Above-the-fold presence |
| Outranking share | How often they beat you in rank |

## After export

Drop the CSV in repo root and re-run analysis to populate competitor baseline.
