# RSA assembly — Part 4 of operating plan

Assembled **Jul 9 2026** from [nypllc-google-ads-operating-plan.md](../../nypllc-google-ads-operating-plan.md) §4.1–4.3 (+ §2.3 Foreign Qual state pricing).

**Status:** **Uploaded Jul 9 2026** into paused campaigns via `google_ads/upload_rsas.py`. Ads are ENABLED inside PAUSED campaigns (will serve when campaigns are enabled after conversion flip / Gate 1).

## Files

| File | Purpose |
|------|---------|
| `rsa_assets.csv` | Flat asset rows for upload (headline/description × RSA) |
| `rsa_manifest.json` | Nested RSAs with pin flags |
| `rsa-upload-result.json` | Last live upload result |

## Counts

| | |
|--|--|
| Ad groups | 21 (4 Core Exact + 11 Professions + 6 Foreign Qual) |
| RSAs | **42** (2 per ad group: `controlled` + `unpinned`) |

## Rules applied (§4.1)

- Two RSAs per ad group: **controlled** (price headline pinned to position 1) + **unpinned**
- Core Exact: **15 headlines**, **4 descriptions** from §4.2 library (query-family ordered)
- Professions: **12 headlines** (6 profession-pattern + library fillers), **4 descriptions**
- Foreign Qual: **15 headlines**, **4 descriptions** — state/hub prices ($915–$995), no $885 formation claims
- Price in every RSA (formation $885 or foreign-qual state price)
- Final URLs match `ad_groups.csv` (message-match / §4.4)
- **No `→` in ad text** — Google Ads SYMBOLS policy PROHIBITED; use `-` instead

## Plan trims / omissions (documented)

| Plan text | Action | Why |
|-----------|--------|-----|
| `Thousands of NY Entities Formed` (31) | → `Thousands of NY Entities` | ≤30 chars; matches §1.4 callout form |
| Desc #1 (93 chars) | Shortened | §4.2 “trim in-editor” |
| Therapist descs (91–92) | Shortened | ≤90 |
| `Rated 5 Stars on Trustpilot` | → `Rated 5 Stars on Google` | No NYPLLC Trustpilot; GBP is 5★ — Google only, no review count. Core Exact: **swap** for `Built for NY Professionals` (15H cap). Professions: **add** as 13th headline. |
| Segment counts | Only **70+** therapists/counselors and **50+** physicians | Per §4.3; no invented counts for other professions |

## Cost-Price (§2.1 AG3)

Controlled RSA pins `NY PLLC Formation – $885 Flat` (plan: lead with “$885 Flat” in H1).

## Profession pattern (§4.3)

Therapist/LCSW uses plan example headlines. Other groups follow the same pattern (profession noun swap). Physicians use plan’s **50+** count; LCSW/MHC use **70+** band.
