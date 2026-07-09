# RSA assembly — Part 4 of operating plan

Assembled **Jul 9 2026** strictly from [nypllc-google-ads-operating-plan.md](../../nypllc-google-ads-operating-plan.md) §4.1–4.3.

**Status:** **Uploaded Jul 9 2026** into paused campaigns via `google_ads/upload_rsas.py`. Ads are ENABLED inside PAUSED campaigns (will serve when campaigns are enabled after conversion flip).

## Files

| File | Purpose |
|------|---------|
| `rsa_assets.csv` | Flat asset rows for upload (headline/description × RSA) |
| `rsa_manifest.json` | Nested RSAs with pin flags |
| `rsa-upload-result.json` | Last live upload result |

## Counts

| | |
|--|--|
| Ad groups | 15 (4 Core Exact + 11 Professions) |
| RSAs | **30** (2 per ad group: `controlled` + `unpinned`) |
| Asset rows | 504 |

## Rules applied (§4.1)

- Two RSAs per ad group: **controlled** (price headline pinned to position 1) + **unpinned**
- Core Exact: **15 headlines**, **4 descriptions** from §4.2 library (query-family ordered)
- Professions: **12 headlines** (6 profession-pattern + library fillers), **4 descriptions**
- Price (`$885` / Flat Fee) in every RSA
- Final URLs match `ad_groups.csv` (message-match / §4.4)

## Plan trims / omissions (documented)

| Plan text | Action | Why |
|-----------|--------|-----|
| `Thousands of NY Entities Formed` (31) | → `Thousands of NY Entities` | ≤30 chars; matches §1.4 callout form |
| Desc #1 (93 chars) | Shortened | §4.2 “trim in-editor” |
| Therapist descs (91–92) | Shortened | ≤90 |
| `Rated 5 Stars on Trustpilot` | **Omitted** | §1.4: Trustpilot still points at cheapnewyorkllc.com — do not advertise until fixed |
| Segment counts | Only **70+** therapists/counselors and **50+** physicians | Per §4.3; no invented counts for other professions |

## Cost-Price (§2.1 AG3)

Controlled RSA pins `NY PLLC Formation – $885 Flat` (plan: lead with “$885 Flat” in H1).

## Profession pattern (§4.3)

Therapist/LCSW uses plan example headlines. Other groups follow the same pattern (profession noun swap). Physicians use plan’s **50+** count; LCSW/MHC use **70+** band.
