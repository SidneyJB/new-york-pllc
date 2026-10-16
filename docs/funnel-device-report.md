# Funnel by device (P1-07 / P2-11)

Manual-first until GA4 explorations are saved as recurring exports.

## Questions

1. Landing page → `/order` → Spiffy begin checkout → purchase, split **mobile vs desktop**.
2. Where does mobile drop relative to desktop (same date range)?

## GA4 (www.nypllc.com)

1. **Explore → Funnel exploration**
2. Steps: `page_view` (path contains target LP or `/order`) → `begin_checkout` → `purchase`
3. Breakdown: **Device category**
4. Date range: trailing 60 days (align with P1-07 window)
5. Export CSV → link path in [scorecards/](../scorecards/) weekly file

## Vercel Analytics (supplement)

- Compare mobile vs desktop on `/order` and key profession LPs (bounce, duration) for the same window.

## CRM cross-check

- `npx tsx scripts/orders-attribution.ts` (PLLC-CRM) for attributed orders vs untagged; not device-level.
