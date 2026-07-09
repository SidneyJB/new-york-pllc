# Google Ads Change Log

**Last updated:** 2026-07-09

## Account

- Customer: NYPLLC (`1529880213`)
- Live: `Sales-Search-1` + `01_Core_Exact_NY` (ENABLED)
- Portfolio-attached PAUSED: `02_Professions_NY`
- Unattached PAUSED: `03_ForeignQual_US`

---

## Changes on 2026-07-09 (evening) — Gap fixes (post-audit)

Ignored Sales $500/day budget (soft ceiling). Skipped cosmetic callout rewording (intent covered).

| Fix | Detail |
|---|---|
| Observation on 01/02/03 | `AUDIENCE` `bid_only=True` (was empty on drafts — 01 was live Targeting risk) |
| Audiences on 02/03 | Same 3 Observation audiences as Sales/01 |
| Campaign assets on 02/03 | Linked full 01 set (8 sitelinks, 12 callouts, call, price, snippet, logo) |
| Sales RSA www | All 4 Sales RSAs → `https://www.nypllc.com…` |
| Sitelink label | `Start Your Order — $885`; unlinked duplicate `Get Started` from Sales |
| §1.1.1 secondaries | Created `Begin checkout (Spiffy embed)` `7678925960` (7d, secondary) + `Phone call 60s+ (call asset)` `7678925963` (AD_CALL ≥60s, linked to call reporting). Site fires Begin checkout on Spiffy embed detect. |

---

## Changes on 2026-07-09 (evening) — Launch hygiene

Left Sales $500/day budget alone (soft ceiling under tCPA).

| Fix | Scope | Detail |
|---|---|---|
| Mobile bid −20% | Sales + 01 + 02 + 03 | `bid_modifier=0.8` on DEVICE MOBILE |
| www sitelinks | Shared assets (Sales + now 01) | Start Your Order / FAQ / Contact → `https://www.nypllc.com/...` |
| Observation audiences | `01_Core_Exact_NY` | Same 2 user lists + 1 user interest as Sales (no bid adj) |
| Campaign assets | `01_Core_Exact_NY` | Linked 24 from Sales: 8 sitelinks, 12 callouts, call, price, snippet, logo (skipped legacy Get Started) |

---

## Changes on 2026-07-09 — Phase 1–2 draft campaigns (PAUSED)

Source: operating plan §2.1–2.3 · package `google-ads-campaign-build/` · scripts `upload_campaigns.py` / `upload_rsas.py`

### Created (PAUSED)

| Campaign | Budget | Geo | Bidding | Negatives |
|---|---|---|---|---|
| `01_Core_Exact_NY` | $45/day | NY Presence | Maximize Conversions tCPA $90 (campaign-level) | Shared A–E |
| `02_Professions_NY` | $25/day | NY Presence | Maximize Conversions tCPA $90 (campaign-level) | Shared A–E |
| `03_ForeignQual_US` (`24012757620`) | $15/day | **US** Presence | Maximize Conversions tCPA $90 (campaign-level) | **A-FQ** + B–E |

**`01_Core_Exact_NY` ad groups:** Formation-Core · Service-Intent · Cost-Price · Brand — **41 keywords** uploaded.

**`02_Professions_NY`:** 11 ad groups · **34 keywords** (6 created with health-policy exemption request).

**`03_ForeignQual_US`:** Generic-ForeignQual · New-Jersey · Pennsylvania · Florida · Texas · Connecticut — **33 keywords** · state LPs for NJ/PA/FL/TX/CT; CA exacts → hub. Skipped `certificate of authority new york` per §2.3.

### Policy / exemption

Validate-only scan (`check_keyword_policy.py`): **6 exemptible** keywords under “Health in personalized advertising” — `lcsw pllc`, `lcsw pllc new york`, `pllc for lcsw`, `mental health counselor pllc`, `psychiatric nurse practitioner pllc`, `physical therapy pllc new york`. Uploaded with `exempt_policy_violation_keys` (pending Google review; may not serve until approved).

### Portfolio (same day)

- Created **`NYPLLC Search Portfolio`** (`biddingStrategies/12148056412`) — Target CPA **$90**
- Attached **`Sales-Search-1` only** (ENABLED) — bidding type now `TARGET_CPA` via portfolio
- Drafts still **inline** Maximize Conversions tCPA $90 — **not** attached yet

### RSA packages (same day)

- Assembled + **uploaded** **42 RSAs** (2×21 ad groups) via `google_ads/upload_rsas.py` into paused campaigns
- Ads **ENABLED** inside **PAUSED** campaigns (ready when campaigns are enabled)
- Controlled RSAs pin price headline to H1; unpinned variants have no pins
- Trustpilot headline omitted initially (no NYPLLC Trustpilot; site uses GBP **5★ / 6 reviews**)
- Foreign Qual: replaced `→` with `-` after SYMBOLS PROHIBITED rejection
- Result: `google-ads-campaign-build/rsas/rsa-upload-result.json`

### API verify (same day)

- Confirmed live: PAUSED · $15 · US Presence · Search only · inline tCPA $90 · unattached · A-FQ+B–E · 6 AGs · 33 EXACT keywords · 12 RSAs · no `→` · final URLs match state/hub pages · manifest keyword parity

### Not done yet (as of morning Jul 9)

- Attach 01/02 to portfolio + enable (wait for conversion flip) — **done evening Jul 9** (see below)
- Enable `03_ForeignQual_US` after Gate 1
- Customer Match UI upload · Auction Insights export

---

## Changes on 2026-07-09 (evening) — Portfolio attach + Core Exact launch

- Attached `01_Core_Exact_NY` + `02_Professions_NY` to **`NYPLLC Search Portfolio`** (`12148056412`)
- Enabled **`01_Core_Exact_NY`** (`24022049179`) — now ENABLED / TARGET_CPA via portfolio
- Left **`02_Professions_NY`** PAUSED on portfolio (enable ~Aug 3 per calendar)
- `Sales-Search-1` unchanged (ENABLED on same portfolio)
- `03_ForeignQual_US` still PAUSED / unattached (Gate 1)

---

## Changes on 2026-07-09 (later) — Google-reviews RSA headline

Source: operating plan §4.2 headline #10 (Trustpilot → Google) · `google-ads-campaign-build/rsas/` · `upload_rsas.py --replace`

### Headline

- **`Rated 5 Stars on Google`** (24 chars) — 5-star claim only; **no review count** in ad copy (GBP verified 5.0)

### `01_Core_Exact_NY` (8 RSAs re-uploaded)

- Swapped for `Built for NY Professionals` (15-headline API cap)
- All 4 ad groups: Formation-Core · Service-Intent · Cost-Price · Brand (controlled + unpinned)
- Result: `google-ads-campaign-build/rsas/rsa-upload-result.json`

### `02_Professions_NY` (22 RSAs re-uploaded)

- Added as 13th headline (before `Deficiency Handling Included`)
- All 11 profession ad groups (controlled + unpinned)

### Tooling

- `upload_rsas.py`: `--replace` (remove + recreate by ad name) · `--campaigns` filter

### Unchanged

- `03_ForeignQual_US` — foreign-qual copy only; no Google-reviews headline

---

## Changes on 2026-06-07

Main RSA was not changed on this date.

### Strategic context (pre-change analysis)

- Full account export covered `2025-10-22` through `2026-06-06`.
- Account is not budget constrained:
  - Search impression share ~11–12%.
  - Lost impression share overwhelmingly due to Ad Rank, not budget.
  - Budget-lost impression share effectively 0%.
- Raising tCPA from `$90` to `$110` increased spend and CPC without increasing conversion volume.
- Price transparency is a competitive advantage (flat `$885` vs competitors with hidden add-ons).

### Bidding

- Reverted `Sales-Search-1` from `$110` target CPA to `$90`.
- Verified live API value: `campaign.maximize_conversions.target_cpa_micros = 90000000`

### Keyword additions

Added exact/phrase coverage for high-CVR search terms that were missing or under-covered in `NY PLLC Formation`:

- `pllc formation new york` — `EXACT`, `PHRASE`
- `nys pllc formation` — `EXACT` (PHRASE already enabled)
- `pllc application ny` — `EXACT`, `PHRASE` (existing `BROAD` paused)
- `forming a pllc in ny` — `EXACT` (PHRASE already enabled)
- `nypllc` — `EXACT`, `PHRASE`

### Campaign assets

**Sitelinks added:** Start Your Order (`/order`), FAQ (`/faq`), Contact Us (`/contact`)

**Callouts added:** NYSED Included, Publishing Included, Flat $885 Price, No Hidden Fees, EIN Included, Operating Agreement

**Call asset attached:** (646) 444-2102

**Price asset added** (ID `370372848903`) — three `$885` rows (formation, publishing, EIN/operating agreement), all linking to `/order`

### Not changed on 2026-06-07

- Main RSA, ad group structure, final URLs
- Negative keywords *(added 2026-06-28)*
- Desktop/mobile bid adjustments
- Lead form asset

### Original monitoring targets (Jun 7 changes)

Review after 2–4 weeks: conv/week, CPA, `pllc` broad CPC, impression share, rank-lost IS, QS components, new keyword performance, asset performance.

Projected impact: +1–2 conv/month (conservative), +3–5 (base), +6–9 (upside).

---

## Changes on 2026-06-28

### Negative keywords (LLC publication noise)

Added to `NY PLLC Formation` to stop `pllc` broad from matching LLC newspaper-publication queries:

| Negative | Match type |
|---|---|
| `llc publication` | BROAD |
| `llc publishing` | BROAD |
| `publish llc` | BROAD |
| `publication requirement` | BROAD |
| `certificate of publication` | BROAD |
| `llc newspaper` | BROAD |
| `publish my llc` | EXACT |
| `publishmyllc` | EXACT |

**Data basis (Mar 1 – Jun 28):** LLC-publication terms (no `pllc` in query) — ~417 impressions, 17 clicks, 1 conversion, ~$148 spend.

**Not blocked:** PLLC formation queries (`pllc`, `pllc formation`, etc.).

Verified live via API: all 8 negatives `ENABLED`.

### Post-change review (Jun 7 – Jun 28)

| Metric | Pre-change (May 15 – Jun 6) | Post-change (Jun 7 – Jun 28) |
|---|---|---|
| Spend/day | $129 | $53 |
| Conv/month | ~24.4 | ~23.2 |
| CPA | $159 | $69 |
| CVR | 7.4% | 12.5% |
| Impression share | 12.4% | 13.6% |

**Verdict:** tCPA revert and new keywords improved efficiency. New keywords: 9 of 17 conv at $48 CPA. Volume flat vs $110 era; +23% vs March $90 baseline at similar spend. `pllc` broad throttled ($98/day → $23/day).

**Next review:** ~mid-July (see IS/QS tracking below).

### Early snapshot (Jul 1, 4 days post-negatives)

| Metric | Jun 7–27 | Jun 28–Jul 1 |
|---|---|---|
| Spend/day | $55 | $96 |
| Conv/month (pace) | ~24 | ~38* |
| CPA | $67 | $76 |
| CVR | 12.7% | 15.6% |
| LLC publication terms | 52 imp, $49 | **0 imp, $0** |

\*4-day sample — not reliable for forecasting.

`pllc` broad QS still **5**, expected CTR still **Below Average** (too early to move). Negatives blocking LLC publication traffic as intended; spend ramping. Second RSA still deferred.

---

## Mid-July review: IS / QS tracking

**Review window:** ~2026-07-12 – 2026-07-14 (2+ full weeks after LLC publication negatives).

**Why this matters:** ~88% of lost impression share is **Ad Rank**, not budget. Scaling means winning more auctions via higher expected CTR and query match — not raising budget or tCPA first.

### Baselines (as of 2026-07-01)

| Metric | Value |
|---|---|
| Campaign search impression share | ~13% |
| Rank-lost impression share | ~87% |
| Budget-lost impression share | ~0% |
| `pllc` broad QS | 5 |
| `pllc` broad expected CTR | Below Average |
| `pllc` broad ad relevance | Above Average |
| `pllc` broad landing page | Average |
| tCPA | $90 |

### Targets (if negatives + Jun 7 changes are working)

| Metric | Now | Target (2–3 months) | Red flag |
|---|---|---|---|
| `pllc` broad QS | 5 | **6–7** | Stays 5 after 4+ weeks |
| `pllc` broad expected CTR | Below Average | **Average** | Still Below Average mid-July |
| Campaign search IS | ~13% | **15–17%** | Flat while CPA rises |
| Rank-lost IS | ~87% | **82–85%** | — |
| CPA | ~$76 (early post-neg) | **$75–90** | Sustained **>$100** |
| LLC publication impressions | 0 (4d) | **0** | Any recurrence |
| Daily spend | ~$96 (4d) | **$75–100** | Collapse to <$50/day |

### API pulls for review

```bash
cd /Users/sidneybrodsky/Dev/financial-planner

# Performance since negatives
.venv/bin/python google_ads_cli.py pull campaigns keywords search-terms devices \
  --start 2026-06-28 --end $(date +%Y-%m-%d)

# pllc broad QS components
.venv/bin/python google_ads_cli.py query --sql \
  "SELECT ad_group_criterion.keyword.text, ad_group_criterion.quality_info.quality_score, ad_group_criterion.quality_info.search_predicted_ctr, ad_group_criterion.quality_info.creative_quality_score, ad_group_criterion.quality_info.post_click_quality_score FROM keyword_view WHERE ad_group_criterion.keyword.text = 'pllc' AND ad_group_criterion.keyword.match_type = 'BROAD' AND segments.date BETWEEN '2026-06-28' AND '$(date +%Y-%m-%d)'"
```

### Decision gates (mid-July)

**Proceed to second RSA if:**
- LLC publication terms stay at zero
- CPA under ~$90 for 2+ full weeks
- Spend holding ~$75–100/day
- Conversions on pace for ~26+/month

**Hold / investigate if:**
- CPA sustained above $100 with no IS gain
- `pllc` broad QS still 5 and expected CTR still Below Average after 3+ weeks
- Spend drops back below ~$60/day

**Do not do yet:**
- tCPA above $95 (May proved $110 adds cost, not rank)
- Budget increases (0% budget-lost IS)
- Ad group splits (insufficient volume)

### If targets are met — next scaling steps (priority order)

1. **Second RSA** — query-matched headlines; pin one H1 only; main RSA untouched
2. **Search term mining** — add exact/phrase for any term converting under ~$70 CPA
3. **Lead form asset** — mobile CVR / checkout hesitation
4. **tCPA $95** — only if actual CPA under ~$80 for 4+ weeks
5. **Desktop bid +15%** — only if mobile CVR regresses or desktop surplus justifies it

### What “impression share push” means (concrete)

Not vague — for this account it is specifically:

1. **Stop losing auctions on bad queries** — LLC publication negatives (done)
2. **Win more auctions on good queries** — second RSA + more exact/phrase keywords
3. **Wait for Google to re-score expected CTR** on `pllc` broad (4–8 week lag)
4. **Then** consider a small tCPA nudge ($95) if CPA has headroom

Each +2–3 pts impression share ≈ **+4–6 conv/month** at current CVR (rough estimate). Budget is not the bottleneck.

---

## Open opportunities (not implemented)

- Second RSA with query-matched copy — **deferred** (wait for negative-keyword impact)
- Desktop bid bias (+15–20%) — **deferred** (mobile CPA $66 vs desktop $76 post-change)
- Lead form asset for mobile
- Ad group split — **deferred** (insufficient volume)
