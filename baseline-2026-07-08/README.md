# Phase 0 baseline snapshot — Jul 8 2026

Frozen “before” exports for the Google Ads operating plan §1.5.

**Account:** 1529880213 (NYPLLC)  
**Window:** 2026-04-10 → 2026-07-08 (90 days) unless marked snapshot  
**Pulled:** via `google_ads_cli.py` + one-off QS/day-of-week/assets queries

## Files

| File | Contents |
|---|---|
| `Ads - search-terms_api_*.csv` | Full search terms (1,797 rows) |
| `Ads - keywords_api_*.csv` | Keyword performance daily |
| `Ads - keyword-quality_baseline_*.csv` | QS + Exp. CTR / Ad relevance / LP experience (aggregated) |
| `Ads - keyword-settings_api_snapshot_*.csv` | Keyword inventory snapshot |
| `Ads - devices_api_*.csv` | Device split |
| `Ads - geo_api_*.csv` | Geo performance |
| `Ads - campaign-hourly_api_*.csv` | Hour-of-day |
| `Ads - day-of-week_baseline_*.csv` | Day-of-week rollup |
| `Ads - campaigns_api_*.csv` | Campaign daily |
| `Ads - campaign-settings_api_snapshot_*.csv` | Campaign settings |
| `Ads - negative-keywords_api_snapshot_*.csv` | Campaign/ad-group negatives (pre–shared-list era also) |
| `Ads - conversion-actions_api_*.csv` | Conversions by action |
| `Ads - assets_baseline_*.csv` | Campaign asset performance (pre–§1.4 rebuild metrics window) |

## Not in this folder (API gap)

**Auction Insights** — not available via this developer token / GAQL path. Export manually from Ads UI → Campaigns → Auction insights and drop the CSV here as `Ads - auction-insights_MANUAL_YYYY-MM-DD.csv` (see also repo-root `Ads - auction-insights_MANUAL_REQUIRED.md`).
