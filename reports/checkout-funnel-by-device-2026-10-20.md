# Checkout funnel by device (last 60 days)

**Generated:** 2026-10-20  
**Owner:** P1-07 / scorecard funnel rows

## GA4 (site funnel) — blocked this run

`GA4_PROPERTY_ID` is not in repo `.env` and Application Default Credentials are not configured on this machine. The pull script is [pull_checkout_funnel_by_device.py](../scripts/pull_checkout_funnel_by_device.py). Setup: [checkout-funnel-by-device-2026-10-07.md](checkout-funnel-by-device-2026-10-07.md).

**Sid action (one-time):** export numeric property ID + service-account JSON path, then re-run the script so order-page views and GA4 `purchase` by device land in this file.

## Vercel Web Analytics (checkout_start)

`checkout_start` / `lead_start` are **Vercel-only** (not in GA4). Pull the same 60-day window in Vercel → Analytics → Events → `checkout_start`, breakdown by device, for `/order` and key LPs.

## CRM abandoned checkout (since feature live)

Production `CheckoutAbandonment` rows (excludes `@example.com`, `@nypllc.com` probes):

| Metric | Count |
|--------|------:|
| All-time production-like captures | **1** |
| Recovered (paid order) | **1** |
| Still abandoned / interviewable | **0** |

The only production capture (Oct 14) **converted** after 1h/24h emails (`suppressReason: order_success`). There are **no reachable abandoners** for P1-07 interviews from this table yet. Four other rows are smoke/probe (`@example.com`, internal).

## Google Ads proxy (paid search only, not full site funnel)

Live campaigns, click-attributed **account** conversions (all conversion actions in campaign totals — dominated by Spiffy Purchase). Use for mobile/desktop **ads** CVR only.

| Window | Desktop clicks → conv (CVR) | Mobile clicks → conv (CVR) |
|--------|------------------------------|----------------------------|
| 7d (Oct 14–20) | 56 → 10.0 (**17.9%**) | 17 → 0.0 (**0.0%**) |
| 30d (Sep 21–Oct 20) | 201 → 24.0 (**11.9%**) | 88 → 5.0 (**5.7%**) |

**Read:** Mobile ads CVR is weaker; account already uses **−20% mobile bid** (unchanged). This does **not** replace GA4 order-page → purchase on organic/direct traffic.

## CRM orders by source (context, 60d-ish)

`orders-attribution.ts` Jul 9–Oct 20: **182** formation orders; **39%** Google click-id, **55.5%** untagged (organic/direct/referral/AI mixed).

Evidence folder for ads slice: [ads-pull-2026-10-20-p1-09](../ads-pull-2026-10-20-p1-09/).
