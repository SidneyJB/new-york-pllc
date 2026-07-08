# Google Ads

## One-liner

Google Ads API CLI, CSV exports, and analysis scripts for NYPLLC acquisition (lives in this website repo).

## Status

**Active.** Tooling + dumps at repo root; Cursor skill `.cursor/skills/google-ads-cli/`.

## Operating plan

📖 [NYPLLC Google Ads Operating Plan v2](../../nypllc-google-ads-operating-plan.md) — account strategy, Phase 0 conversion architecture, campaign rebuild, gates, SOPs (Jul 2026 → Feb 2027).

## Key paths

- Package: `google_ads/` (`client.py`, `reports.py`, `pull.py`, `export.py`)
- CLI: `google_ads_cli.py`, `google_ads_pull.py`, `google_ads_auth.py`
- Analysis: `ads_analysis.py`, `apr23_*.py`
- Data: `Ads - *.csv`, `ads-notes-*.md`, `google_ads_changes*.md`, `apr 23 ads reports/`
- Deps: `requirements-ads.txt` (separate from Next.js `web/` package)

## Setup

```bash
cd new-york-pllc
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements-ads.txt
# .env with GOOGLE_ADS_* (see .env.example); OAuth as contact@nypllc.com
.venv/bin/python google_ads_cli.py account
```

## Gotchas

- Secrets: never commit `.env` or `client_secret*.json`
- Auction insights may need manual export (`Ads - auction-insights_MANUAL_REQUIRED.md`)
- CRM Finances “ad spend” projections are separate (PLLC-CRM) — this repo owns campaign/keyword ops data
- Spiffy thank-you URL `total=` is **full contracted order value in cents** (including payment plans) — see operating plan §1.1.2
- Tagged Ads purchase (secondary until flip): action id `7678072764`, `send_to` in `web/src/lib/analytics/google-ads.ts`

## Docs

Cursor skill: `.cursor/skills/google-ads-cli/SKILL.md`
