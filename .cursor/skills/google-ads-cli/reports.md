# Google Ads CLI — Report Catalog

## Presets

| Preset | Reports |
|--------|---------|
| `core` | keywords, search-terms |
| `performance` | keywords, search-terms, campaigns, ad-groups, ads, campaign-hourly, devices, geo, landing-pages |
| `structure` | keyword-settings, negative-keywords, campaign-settings |
| `all` | Every report below |

## Reports

| Slug | Type | Replaces / complements |
|------|------|------------------------|
| `keywords` | dated | Manual "Search keyword" export; primary input for CPA/match-type analysis |
| `search-terms` | dated | Manual "Search terms" export |
| `campaigns` | dated | Manual "Campaign performance" (includes search IS metrics) |
| `ad-groups` | dated | Ad group daily stats |
| `ads` | dated | Ad-level daily stats + final URLs |
| `campaign-hourly` | dated | "When your ads showed" granularity (hour × day) |
| `devices` | dated | Performance by device |
| `geo` | dated | Geographic breakdown |
| `landing-pages` | dated | Landing page performance |
| `conversion-actions` | dated | Conversions split by conversion action |
| `keyword-settings` | snapshot | Current keyword inventory (text, match type, bids, status) |
| `negative-keywords` | snapshot | All campaign/ad-group negatives |
| `campaign-settings` | snapshot | Budget, bidding strategy, channel type |
| `change-history` | dated | Account change audit log (limit 10k rows) |

## Key fields by report

### keywords

`segments.date`, campaign/ad group names and status, criterion id, keyword text/match type, bid micros, impressions/clicks/cost/conversions (+ `conversions_by_conversion_date`).

### search-terms

`segments.date`, campaign/ad group, search term, status, match type, basic metrics (no `conversions_by_conversion_date` — API limitation).

### campaigns

Daily campaign metrics plus `search_impression_share`, `search_rank_lost_impression_share`, `search_budget_lost_impression_share`, top/abs-top impression %.

## Tags (for `list --tag`)

- `search` — keywords, search-terms, keyword-settings, negative-keywords
- `performance` — all dated performance views
- `structure` — snapshots of account config
- `conversions` — conversion-actions
- `audit` — change-history
- `timing` — campaign-hourly
- `segmentation` — devices, geo

## GAQL notes

- Date filter: `segments.date BETWEEN '{start}' AND '{end}'` (except snapshots and change-history).
- Change history uses `change_event.change_date_time` with datetime bounds.
- Enum values export as names (e.g. `BROAD`, `ENABLED`).
- Repeated fields (e.g. `final_urls`) join with `"; "`.
