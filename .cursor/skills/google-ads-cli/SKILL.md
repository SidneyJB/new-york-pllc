---
name: google-ads-cli
description: Pull NYPLLC Google Ads data via google_ads_cli.py (GAQL reports, presets, custom queries). Use when the user asks to export, pull, or analyze Google Ads data, refresh ad CSVs, run ads_analysis.py inputs, or work with keywords, search terms, campaigns, or Google Ads API credentials in this repo.
---

# Google Ads CLI (NYPLLC)

## When to use

Use this skill for **read-only Google Ads exports** in `new-york-pllc` (website / acquisition repo). Prefer the CLI over manual CSV downloads from the Google Ads UI.

Do **not** re-implement API calls ad hoc — extend `google_ads/reports.py` if a new report type is needed.

## Prerequisites

1. **Virtualenv**: run from repo root with `.venv/bin/python`.
2. **`.env`** (gitignored) must contain:
   - `GOOGLE_ADS_DEVELOPER_TOKEN`
   - `GOOGLE_ADS_CLIENT_ID` / `GOOGLE_ADS_CLIENT_SECRET`
   - `GOOGLE_ADS_REFRESH_TOKEN` (one-time via `google_ads_auth.py`)
   - `GOOGLE_ADS_LOGIN_CUSTOMER_ID=8236908129` (manager: NYP API Manager)
   - `GOOGLE_ADS_CUSTOMER_ID=1529880213` (NYPLLC ads account)
3. **OAuth account**: authorize as `contact@nypllc.com` (not personal Gmail).

If `GOOGLE_ADS_REFRESH_TOKEN` is empty, run:

```bash
cd /Users/sidneybrodsky/Dev/pllc-business/new-york-pllc
.venv/bin/python google_ads_auth.py
```

Paste the full `http://localhost:8080/?code=...` redirect URL when prompted.

## Entry points

| Script | Purpose |
|--------|---------|
| `google_ads_cli.py` | **Primary** — list, account, pull, custom query |
| `google_ads_pull.py` | Shortcut: `core` preset, 30 days, `--compat` |
| `google_ads_auth.py` | One-time OAuth refresh token |
| `ads_analysis.py` | Analyze deduped keyword/search-term CSVs |

Package layout: `google_ads/` (`client.py`, `reports.py`, `pull.py`, `export.py`).

## Commands

Always prefix with `.venv/bin/python google_ads_cli.py`.

```bash
# Discover reports and presets
.venv/bin/python google_ads_cli.py list
.venv/bin/python google_ads_cli.py list --tag search

# Verify account connectivity
.venv/bin/python google_ads_cli.py account

# Most common: keyword + search term exports for analysis
.venv/bin/python google_ads_cli.py pull core --days 30 --compat

# Date range (matches old manual export windows)
.venv/bin/python google_ads_cli.py pull core --start 2025-10-22 --end 2026-04-23 --compat

# Presets: core | performance | structure | all
.venv/bin/python google_ads_cli.py pull performance --days 14

# Individual reports
.venv/bin/python google_ads_cli.py pull campaigns campaign-hourly devices geo

# Inspect GAQL without API call
.venv/bin/python google_ads_cli.py pull keywords --dry-run

# Custom GAQL
.venv/bin/python google_ads_cli.py query --sql "SELECT campaign.name, metrics.clicks FROM campaign WHERE segments.date DURING LAST_7_DAYS"
```

### `pull` flags

| Flag | Default | Notes |
|------|---------|-------|
| `--days N` | 30 | Rolling window ending today |
| `--start` / `--end` | — | Use both together; overrides `--days` |
| `--output-dir` | repo root | CSV/JSON destination |
| `--format csv\|json` | csv | |
| `--compat` | off | Also writes stable names for `ads_analysis.py` |
| `--customer-id` | from `.env` | Rarely needed |
| `--dry-run` | off | Print GAQL only |
| `--stdout` | off | Single report to stdout (csv/json) |

## Output naming

**Dated reports:** `Ads - {slug}_api_{start}_to_{end}.csv`

**Snapshots** (no date segments): `Ads - {slug}_api_snapshot_{today}.csv`

**Compat copies** (with `--compat`):

- `Ads - kw_daily (api).csv`
- `Ads - search_terms_daily (api).csv`

Cost is in **micros** (`metrics.cost_micros`); divide by 1,000,000 for dollars. `ads_analysis.py` handles this automatically.

## Typical workflows

### Refresh data for ads analysis

```bash
.venv/bin/python google_ads_cli.py pull core --days 90 --compat
.venv/bin/python ads_analysis.py
```

Note: `ads_analysis.py` currently looks for `Ads - kw_daily (1).csv` / `(2).csv`. Either symlink/copy compat files to those names, or update `ads_analysis.py` to prefer `(api).csv` names.

### Full export before a strategy review

```bash
.venv/bin/python google_ads_cli.py pull all --start 2025-10-22 --end $(date +%Y-%m-%d)
```

### Audit recent account changes

```bash
.venv/bin/python google_ads_cli.py pull change-history --days 14
```

## Adding a new report

1. Add a `Report(...)` entry in `google_ads/reports.py` with valid GAQL fields for the resource.
2. Test: `.venv/bin/python google_ads_cli.py pull {slug} --days 3 --dry-run` then without `--dry-run`.
3. Some metrics are resource-specific (e.g. impression share fails on `keyword_view`; `cost_micros` fails with `segments.conversion_action`).

Full report catalog: [reports.md](reports.md)

## Troubleshooting

| Error | Fix |
|-------|-----|
| Missing `.env` keys | Run `google_ads_auth.py` or fill from `.env.example` |
| `redirect_uri` OAuth error | `google_ads_auth.py` sets `flow.redirect_uri`; sign in as `contact@nypllc.com` |
| `Cannot select... metric incompatible` | Remove metric from that report in `reports.py` |
| `Unrecognized fields` | Field renamed in API v24; update `reports.py` |
| Empty `change-history` | Normal if no changes in range; max 10k rows |

## Security

- Never commit `.env`, refresh tokens, or `client_secret*.json`.
- `.gitignore` already excludes these.
