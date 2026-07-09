# Google Ads

## One-liner

Google Ads API CLI, CSV exports, and analysis scripts for NYPLLC acquisition (lives in this website repo).

## Status

**Active.** Tooling + dumps at repo root; Cursor skill `.cursor/skills/google-ads-cli/`.

## Operating plan

📖 [NYPLLC Google Ads Operating Plan v2](../../nypllc-google-ads-operating-plan.md) — account strategy, Phase 0 conversion architecture, campaign rebuild, gates, SOPs (Jul 2026 → Feb 2027). **Keep execution status inlined in the plan** as work lands (same pattern as Phase 0 “Done Jul 8” notes).

## Key paths

- Package: `google_ads/` (`client.py`, `reports.py`, `pull.py`, `export.py`, `upload_campaigns.py`, `upload_rsas.py`, `check_keyword_policy.py`)
- CLI: `google_ads_cli.py`, `google_ads_pull.py`, `google_ads_auth.py`
- Analysis: `ads_analysis.py`, `apr23_*.py`
- Data: `Ads - *.csv`, `ads-notes-*.md`, `google_ads_changes*.md`, `apr 23 ads reports/`, `baseline-2026-07-08/`
- Phase 1–2 drafts: `google-ads-campaign-build/` (`manifest.json`, CSVs, `policy-check.json`, `upload-result.json`, `rsas/`)
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
- **§1.1.3 capture live (Jul 9 2026):** site `click-attribution/` cookie (90d) → `buildSpiffyCheckoutUrl` appends `gclid`/`wbraid`/`gbraid`/UTMs (PLLC + LLC embeds); thank-you Enhanced Conversions via hashed email in `google-ads.ts`. CRM `Order` columns + `extractSpiffyOrderAttribution` on both Spiffy webhooks (also parses pageview referrer). **Still deferred:** offline conversion upload. **Ads UI:** accept customer data terms + enable Enhanced Conversions on `7678072764` (API shows terms not yet accepted)
- Phase 0 §1.2 applied Jul 8 2026 on Sales-Search-1: Presence geo, Partners/Display off, observation audiences, auto-apply subs PAUSED — see operating plan
- Phase 0 §1.3 shared negatives A–E attached to Sales-Search-1 Jul 8 2026; A-FQ ready for Foreign Qual — see operating plan §1.3 table
- §1.4 assets: sitelinks must use real sitemap URLs only; volume claim is **thousands / 25,000+**, not 300+ — see operating plan §1.4
- §1.4 applied Jul 8 2026 on Sales-Search-1 (add sitelinks, fix About/snippet/price, trim generic callouts; kept strong performers)
- §1.5 baseline exports in `baseline-2026-07-08/` (Auction Insights still manual)
- Phase 1–2 drafts (Jul 9 2026, **PAUSED**): `01_Core_Exact_NY` + `02_Professions_NY` + `03_ForeignQual_US` — keywords + **42 RSAs**; enable still open (FQ also Gate 1)
- `03_ForeignQual_US`: US Presence · $15/day · negatives **A-FQ + B–E** · 6 AGs / 33 kws / 12 RSAs (`campaigns/24012757620`)
- Portfolio **`NYPLLC Search Portfolio`** (`12148056412`) Target CPA $90 — attached to **`Sales-Search-1` only** (Jul 9); drafts not attached yet
- Health-policy keywords (`lcsw`, mental health, psychiatric NP, physical therapy): create via API with `exempt_policy_violation_keys` (validate with `check_keyword_policy.py`)
- RSA gotcha: Unicode `→` is SYMBOLS **PROHIBITED** — use ASCII `-`
- Reviews: site uses NYPLLC GBP (`BUSINESS_INFO.googleBusinessProfileUrl`); AggregateRating from `BUSINESS_INFO.googleReviews` = **5.0 / 6** (live GBP Jul 9 2026). RSAs use **`Rated 5 Stars on Google`** on `01`/`02` (5-star only — no review count in ad copy); keep schema in sync when GBP changes

## Docs

Cursor skill: `.cursor/skills/google-ads-cli/SKILL.md`
