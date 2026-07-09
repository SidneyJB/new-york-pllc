# Google Ads campaign build — Phase 1 draft

Structured upload package for **`01_Core_Exact_NY`** and **`02_Professions_NY`**, extracted from [nypllc-google-ads-operating-plan.md](../nypllc-google-ads-operating-plan.md) §2.1–2.2.

**State (Jul 9 2026):** Campaigns created in account **PAUSED**. Keywords/structure uploaded via API. Portfolio `$90` exists and is on **`Sales-Search-1` only** — do **not** enable drafts until conversion flip + attach drafts to that portfolio. RSAs still missing.

## Files

| File | Purpose |
|------|---------|
| `campaigns.csv` | Campaign-level settings (budget, geo, negatives, portfolio tCPA) |
| `ad_groups.csv` | Ad groups + final URLs for RSA message-match |
| `keywords.csv` | 75 keywords across 15 ad groups |
| `manifest.json` | Nested JSON consumed by `google_ads/upload_campaigns.py` |
| `policy-check.json` | Validate-only policy scan (`check_keyword_policy.py`) |
| `upload-result.json` | Last live upload/resume result |

## Counts

| Campaign | Ad groups | Keywords |
|----------|-----------|----------|
| `01_Core_Exact_NY` | 4 | 41 |
| `02_Professions_NY` | 11 | 34 |

## Landing page mapping

### Core Exact

| Ad group | Final URL |
|----------|-----------|
| Formation-Core | `https://www.nypllc.com/how-to-form-a-pllc-in-ny` |
| Service-Intent | `https://www.nypllc.com/how-to-form-a-pllc-in-ny` |
| Cost-Price | `https://www.nypllc.com/order` |
| Brand | `https://www.nypllc.com/` |

### Professions

Each ad group → `https://www.nypllc.com/professions/{slug}` (see `ad_groups.csv`).

**Note:** Operating plan groups Architects + Engineers in one row with two landing pages. Split here into **Architects** and **Engineers** ad groups for clean query→page match.

## Campaign defaults (from operating plan)

- **Geo:** New York State, Presence
- **Budget:** Core $45/day · Professions $25/day
- **Bidding:** Portfolio Target CPA $90 (attach both campaigns + existing `Sales-Search-1`)
- **Networks:** Search only (Partners off, Display Expansion off)
- **Negatives:** Shared lists A–E (`12146898907,12145390194,12146898706,12146898991,12146898709`)

## Upload commands

```bash
# Validate-only policy scan (no writes)
.venv/bin/python -m google_ads.check_keyword_policy

# Create or resume PAUSED campaigns/keywords (auto-exemption on exemptible health policies)
.venv/bin/python -m google_ads.upload_campaigns
.venv/bin/python -m google_ads.upload_campaigns --only 02_Professions_NY
```

## Progress (Jul 9 2026)

| Item | Status |
|------|--------|
| `01_Core_Exact_NY` PAUSED + 4 AGs + 41 keywords | Done |
| `02_Professions_NY` PAUSED + 11 AGs + 34 keywords | Done |
| 6 health-policy keywords (API exemption requested) | Done — pending Google review |
| Portfolio `NYPLLC Search Portfolio` $90 on `Sales-Search-1` | Done |
| RSA packages assembled (`rsas/`) | Done |
| Upload RSAs to paused campaigns | **Done** (30 RSAs) |
| Attach drafts to portfolio + enable | Blocked on conversion flip |

## Remaining API upload order

1. After conversion flip verified → attach drafts to portfolio → enable `01_Core_Exact_NY`, then `02_Professions_NY` per calendar

## Not included (next pass)

- `03_ForeignQual_US` keywords (§2.3 — Gate 1)
- Campaign enable / budget ramp
- Discovery fence negatives on `Sales-Search-1` (§2.4 — Gate 2)
- Trustpilot headline (blocked until §1.4 URL fix)
