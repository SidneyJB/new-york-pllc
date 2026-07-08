# Spiffy Checkout

## One-liner

Embedded Spiffy.co checkout for $885 PLLC formation; Zapier emails on completion; engagement via Spiffy JS API.

## Status

**Live.** Account `nypllc`; checkout URL `https://nypllc.spiffy.co/checkout/new-york-pllc-formation`.

## Key paths

- Script: root `layout.tsx` (afterInteractive)
- Embed: order page `<spiffy-checkout>` via `dangerouslySetInnerHTML`
- Tracking: `useCheckoutTracking`, Spiffy `checkout.ready()` / `checkout.on()`
- Confirmation: URL params → order id / purchase events

## Flow

Payment → Spiffy webhook → Zapier (customer + admin email) → confirmation page

## Gotchas

- Partner coupons / `?c=CODE`: see [partner-referral.md](partner-referral.md); CRM owns partner ops
- Apply coupon before embed mounts and when Spiffy is already ready
- Engagement metrics in `sessionStorage` feed purchase event (`engagement_time`, `field_changes`)
- Thank-you URL: `total=` is full contract **cents** (payment plans included); `order=` = Spiffy order id — used for Ads conversion value
- Prefer www thank-you URL; analytics metadata allowlists safe params only (no SSN/DOB dump)

## Docs

📖 [Spiffy checkout](../../docs/spiffy-checkout.md)
