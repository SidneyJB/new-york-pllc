# Analytics Tracking

## One-liner

Lean conversion funnel: Vercel custom events + GA4 purchase + Bing UET + scroll depth, with UTM auto-capture.

## Status

**Live.** ~101 Vitest tests covering tracking instances including scroll depth.

## Key paths

- Utils: `web/src/lib/analytics/track`
- Components: `TrackedCTAButton`, `TrackedPhoneLink`, `TrackedEmailLink`, `ScrollTracking`, `BingAdsTracking`
- Hooks: `useFormTracking`, `useCheckoutTracking`, `useScrollDepthTracking`
- Purchase fire: `OrderConfirmationClient` (single `useEffect` for Vercel + Meta + Google Ads + GA4)

## Events

`cta_click`, `lead_start`, `lead_submit`, `checkout_start`, `purchase`, `phone_click`, `email_click`, `scroll_depth` (25/50/75/100)

## Gotchas

- Keep event properties **≤8** (Vercel Pro limits)
- GA4 `purchase` is a key event; **do not** import to Google Ads (duplicate conversions)
- Google Ads tagged purchase fires separately on confirmation (`web/src/lib/analytics/google-ads.ts`); value from Spiffy `total=` cents — see [google-ads.md](google-ads.md) / operating plan §1.1.2
- Filter undefined props before `track`

## Docs

📖 [Analytics reference](../../docs/analytics-tracking.md)
