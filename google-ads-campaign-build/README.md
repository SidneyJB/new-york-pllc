# Google Ads campaign build — Phase 1–2 drafts

Structured upload package for **`01_Core_Exact_NY`**, **`02_Professions_NY`**, and **`03_ForeignQual_US`**, from [nypllc-google-ads-operating-plan.md](../nypllc-google-ads-operating-plan.md) §2.1–2.3.

**State (Jul 9 2026):** All three campaigns created in account **PAUSED**. Keywords + RSAs uploaded. Portfolio `$90` exists and is on **`Sales-Search-1` only** — do **not** enable drafts until conversion flip + attach to that portfolio. Foreign Qual also waits on **Gate 1**.

## Files

| File | Purpose |
|------|---------|
| `campaigns.csv` | Campaign-level settings (budget, geo, negatives, portfolio tCPA) |
| `ad_groups.csv` | Ad groups + final URLs for RSA message-match |
| `keywords.csv` | Keywords across all draft ad groups |
| `manifest.json` | Nested JSON consumed by `google_ads/upload_campaigns.py` |
| `policy-check.json` | Validate-only policy scan (`check_keyword_policy.py`) |
| `upload-result.json` | Last live upload/resume result |

## Counts

| Campaign | Ad groups | Keywords | RSAs |
|----------|-----------|----------|------|
| `01_Core_Exact_NY` | 4 | 41 | 8 |
| `02_Professions_NY` | 11 | 34 | 22 |
| `03_ForeignQual_US` | 6 | 33 | 12 |

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

### Foreign Qual

| Ad group | Final URL |
|----------|-----------|
| Generic-ForeignQual | `https://www.nypllc.com/foreign-pllc` |
| New-Jersey | `…/foreign-pllc/new-jersey` |
| Pennsylvania | `…/foreign-pllc/pennsylvania` |
| Florida | `…/foreign-pllc/florida` |
| Texas | `…/foreign-pllc/texas` |
| Connecticut | `…/foreign-pllc/connecticut` |

CA exacts live in Generic (no CA state page yet). Skipped `certificate of authority new york` per §2.3 (sales-tax collision).

## Campaign defaults (from operating plan)

| | Core / Professions | Foreign Qual |
|--|--------------------|--------------|
| **Geo** | New York State, Presence | **United States**, Presence |
| **Budget** | $45 / $25/day | **$15/day** |
| **Bidding** | Inline Max Conv tCPA $90 until portfolio attach | Same |
| **Networks** | Search only | Search only |
| **Negatives** | Shared A–E | **A-FQ** + B–E (not List A) |

## Upload commands

```bash
# Validate-only policy scan (no writes)
.venv/bin/python -m google_ads.check_keyword_policy

# Create or resume PAUSED campaigns/keywords
.venv/bin/python -m google_ads.upload_campaigns
.venv/bin/python -m google_ads.upload_campaigns --only 03_ForeignQual_US

# RSAs
.venv/bin/python -m google_ads.upload_rsas
```

## Progress (Jul 9 2026)

| Item | Status |
|------|--------|
| `01_Core_Exact_NY` PAUSED + keywords + RSAs | Done |
| `02_Professions_NY` PAUSED + keywords + RSAs | Done |
| `03_ForeignQual_US` PAUSED + 6 AGs + 33 keywords + 12 RSAs | Done |
| Portfolio `NYPLLC Search Portfolio` $90 on `Sales-Search-1` | Done |
| Attach drafts to portfolio + enable | Blocked on conversion flip (FQ also Gate 1) |

## Remaining API upload order

1. After conversion flip → attach 01/02 to portfolio → enable Core Exact, then Professions per calendar
2. After Gate 1 → attach `03_ForeignQual_US` to portfolio → enable

## Not included (next pass)

- Campaign enable / budget ramp
- Discovery fence negatives on `Sales-Search-1` (§2.4 — Gate 2)
- CA state landing page (CA keywords → hub for now)
