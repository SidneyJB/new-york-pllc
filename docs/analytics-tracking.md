# Analytics tracking (reference)

Depth extracted from legacy `systemPatterns.md` / `progress.md`. Memory-bank shard: `memory-bank/features/analytics-tracking.md`.

## Stack

- Vercel Analytics custom events (≤8 properties)
- GA4 base tag in layout; `gtag('event', 'purchase', …)` on confirmation
- Bing Ads UET component (`BingAdsTracking`), ID `187221859`, `afterInteractive`, SPA auto-track
- Meta Pixel + **tagged Google Ads conversion** fire from confirmation `useEffect` (same gate as Vercel purchase)

## Google Ads purchase (Jul 2026)

- Action: `Purchase (Spiffy thank-you value)` — secondary until flip; then primary
- `send_to`: `AW-17672972971/w4sBCLyvmM0cEKvVkOtB` in `web/src/lib/analytics/google-ads.ts`
- Value: Spiffy URL `total=` (cents → dollars); `transaction_id` = `order=`
- Codeless page-load Purchase remains primary until verified flip (avoid double-count in Conversions)
- Do **not** import GA4 purchase into Google Ads

## Implementation notes

- UTM auto-capture on track helpers
- Checkout start time in `sessionStorage`; purchase includes `time_spent`, optional `order_id`, `engagement_time`
- Purchase `metadata` JSON is **allowlisted** Spiffy params only (`buildSafePurchaseMetadata`) — never SSN/DOB/email/address
- Scroll: `requestAnimationFrame` throttle; once per milestone per page; reset on navigation
- Filter undefined event properties before send

## Key files

- `web/src/lib/analytics/track.ts`
- `web/src/lib/analytics/google-ads.ts`
- `web/src/lib/analytics/spiffy-confirmation.ts`
- `web/src/components/analytics/*`
- `web/src/app/order/confirmation/confirmation-client.tsx`
