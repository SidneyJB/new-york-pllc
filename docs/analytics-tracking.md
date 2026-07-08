# Analytics tracking (reference)

Depth extracted from legacy `systemPatterns.md` / `progress.md`. Memory-bank shard: `memory-bank/features/analytics-tracking.md`.

## Stack

- Vercel Analytics custom events (≤8 properties)
- GA4 base tag in layout; `gtag('event', 'purchase', …)` on confirmation
- Bing Ads UET component (`BingAdsTracking`), ID `187221859`, `afterInteractive`, SPA auto-track
- Meta Pixel / Google Ads conversion also fire from confirmation `useEffect` (same gate as Vercel purchase)

## Implementation notes

- UTM auto-capture on track helpers
- Checkout start time in `sessionStorage`; purchase includes `time_spent`, optional `order_id`, `engagement_time`, `field_changes`
- Scroll: `requestAnimationFrame` throttle; once per milestone per page; reset on navigation
- Filter undefined event properties before send

## Key files

- `web/src/lib/analytics/track`
- `web/src/components/analytics/*`
- Confirmation client component for purchase fan-out
