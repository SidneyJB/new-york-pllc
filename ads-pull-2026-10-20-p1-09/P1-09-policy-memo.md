# P1-09 — Paid search evidence & policy (Oct 20, 2026)

**Account:** 1529880213 · **Portfolio tCPA:** $105 · **Decision:** hold $105 (no change this pass)  
**Pull:** this folder (`google_ads_cli.py` Sep 19–Oct 20 + 60d devices/campaigns)

## Performance (live campaigns only)

| Window | Spend | Clicks | Click-attributed conv | CPA |
|--------|------:|-------:|----------------------:|----:|
| 7d (Oct 14–20) | $797 | 73 | 10.0 | **$80** |
| 30d (Sep 21–Oct 20) | $3,062 | 289 | 29.0 | **$106** |
| 60d (Aug 22–Oct 20) | $3,078 | 292 | 30.0 | **$103** |

| Campaign (30d) | Spend | Conv | CPA |
|----------------|------:|-----:|----:|
| Sales-Search-1 | $2,640 | 27.0 | $98 |
| 01_Core_Exact_NY | $231 | 2.0 | $116 |
| 03_ForeignQual_US | $190 | 0 | — |
| 02_Professions_NY | $0 | 0 | — (Attorneys AG paused) |

Oct 1–20 MTD (from campaign daily): ~$2.0k+ spend; pace consistent with prior SOP (~$100 CPA).

## Ads ↔ CRM (30d, Sep 21–Oct 20 ET)

| Source | Orders |
|--------|-------:|
| Google Ads primary — Spiffy Purchase (click-attributed, action `7678072764`) | **~29** (sum of daily `metrics.conversions` on that action) |
| CRM formation orders with `gclid` (same window) | **28** |

Gap **+3.6%** — inside ±10% rule. Residual lag / fractional attribution expected; do not import GA4 purchase into Google Ads.

## Policy — disapproved **ENABLED** ads (API Oct 20)

| Campaign | Ad group | Ad ID | Approval | Review |
|----------|----------|------:|----------|--------|
| 01_Core_Exact_NY | Formation-Core | 816213581518 | DISAPPROVED | REVIEWED |
| 01_Core_Exact_NY | Service-Intent | 816213581680 | DISAPPROVED | REVIEWED |
| 01_Core_Exact_NY | Service-Intent | 816286167770 | DISAPPROVED | REVIEWED |
| 02_Professions_NY | Attorneys | 823134166556 | DISAPPROVED | REVIEWED |
| 02_Professions_NY | Attorneys | 823134166682 | DISAPPROVED | REVIEWED |

Historical topic (from change log and UI emails): **`GOVERNMENT_DOCUMENTS_AND_OFFICIAL_SERVICES`**. Many other RSAs in the same account are **`APPROVED_LIMITED`** on the same topic — they serve with restrictions. These five **do not serve**.

**Attorneys:** ad group remains **paused**; the two disapproved ENABLED rows are legacy — do not unpause or churn copy.

### Service facts (for certification / appeal)

- NYPLLC is a **private** PLLC formation and publication service (flat fee); not a government agency, not selling blank government forms as the product.
- Customer pays NYPLLC; we file with NYSED/DOS on the customer’s behalf. Site disclaimers: not legal advice.
- Oct 5, 2026 [policy update](https://support.google.com/adspolicy/answer/17260489) — re-read against [government documents policy](https://support.google.com/adspolicy/answer/13156083).

### Recommended path (appeal + structural fix)

1. **Appeal each disapproved `01` ad** in Google Ads → Ads → Policy details → **Appeal** (one submission per ad or batched per Google UI).  
   **Message (adapt per ad):**  
   - Advertiser is a licensed filing **service**, not a government entity.  
   - Ad promotes paid preparation/filing assistance for NY professional LLC formation.  
   - Landing URLs are `https://www.nypllc.com/order` (or the ad’s final URL) with clear pricing and private-business identity.  
   - We do not claim to be NYSED, DOS, or a government portal.  
   - Attach: screenshot of homepage/footer business identity, order page price, and Terms/disclaimer if the form allows files.

2. **If appeal offers “request certificate” / advertiser program:** apply under **Government documents and official services** only if the program matches a **third-party filing service** (not impersonation). If the program is only for government agencies, use appeal + **exclusion** path stating we are not in scope.

3. **Operational unblock while appeals pend (`01` only):**  
   - **Pause** the three DISAPPROVED ENABLED ads (they contribute zero impressions).  
   - **Unpause** Formation-Core RSA `816286133015` (**APPROVED_LIMITED**, currently PAUSED per Oct 18 SOP) so Formation-Core has a serving limited ad alongside approved Cost-Price/Brand limited ads.  
   - Do **not** upload new copy until appeal outcomes (stop churn — see Aug–Sep attorney incident).

4. **Self-block / negatives:** re-run October 21. **Pass, 0 self-blocked** (48 / 31 / 39 / 39). [SELF-BLOCK.md](../ads-pull-2026-10-21-self-block/SELF-BLOCK.md).

5. **Foreign `03`:** $190 / 24 clicks / 0 conv in 30d — label **immature**; do not treat as demand proof.

6. **Bing:** unchanged — blocked; no spend.

## Nov 1 dual memo (prep)

Hold **$105** unless SOP tripwires fire. For the decision memo, combine:

- **Order branch:** 30d **29** primary conv vs ~50/mo formation pace.  
- **Profit branch:** use scorecard **~$519** contribution/order before ads; 30d CPA **$106** vs provisional allowance (P1-03 still open).  
- **Policy branch:** appeals submitted + Formation-Core limited RSA serving.

## Sid actions

- [ ] Submit appeals for ads `816213581518`, `816213581680`, `816286167770` (UI; use text above).  
- [ ] Approve pause of the three disapproved ads. Unpause of `816286133015` **done Oct 21** (ENABLED, still APPROVED_LIMITED). See [google_ads_changes.md](../google_ads_changes.md).  
- [ ] Log appeal confirmation IDs in [google_ads_changes.md](../google_ads_changes.md).
