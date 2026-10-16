# $985 retail formation price test (design)

**Status:** Design for P1-11 / P2-01. **Decision log:** [decision-log.md](../decision-log.md).

## Scope

- **SKU:** Domestic NY PLLC retail formation only (Spiffy offer tied to $885 today).
- **Exclude:** Existing written quotes, active partner wholesale rates, and manual invoices at prior price.

## Implementation

| Surface | Mechanism |
|---------|-----------|
| Marketing site | `NEXT_PUBLIC_FORMATION_LIST_PRICE=985` → `PRICING.basePrice` in [web/src/lib/constants/index.ts](../web/src/lib/constants/index.ts) |
| Spiffy | Update offer/list price and installment amounts **same deploy** |
| CRM | `FORMATION_RETAIL_LIST_PRICE_CENTS=98500` on webhook → `Order.retailListPriceCents` |
| Ads | Update price assets same day; respect Nov 15–Dec 1 structural freeze except policy/tracking fixes |

## Primary metric

**Expected collected contribution per eligible visitor** (checklist definition), not conversion rate alone.

## Quote and partner rate protection (build-e05)

- **Written quotes / manual invoices** at $885 (or partner-specific wholesale) stay honored; do not auto-raise Spiffy list price on those checkouts.
- **B2B wholesale** rates in signed agreements override retail test pricing for attributed partner orders (`B2bPartner` + coupon).
- **Ops rule:** If a customer shows a prior email quote at $885 during the test window, issue checkout or invoice at the quoted amount; log in scorecard exceptions.
- **Ads:** Do not run $985 RSAs to audiences with open $885 quote campaigns without asset separation.

## Revert rules (draft)

- Malfunction or inconsistent quoted price → fix before interpreting results.
- Materially worse contribution per visitor after source-mix adjustment → hold and review at P2-12.
- Thin sample / holiday → extend observation; do not force a winner.

## $1085

Only after P3-01; separate test; do not stack with other funnel experiments.
