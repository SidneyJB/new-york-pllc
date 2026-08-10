# Spiffy Checkout

## One-liner

Embedded Spiffy.co checkout for $885 PLLC formation; Zapier emails on completion; engagement via Spiffy JS API.

## Status

**Live.** Account `nypllc`; checkout URL `https://nypllc.spiffy.co/checkout/new-york-pllc-formation`.

## Key paths

- Script: `SpiffyScript` on `/order` + `/order-llc` only (not root layout — LCP, Jul 12 2026)
- Embed: order page `<spiffy-checkout>` via `createElement` in `spiffy-pllc-checkout.tsx` / `spiffy-llc-checkout.tsx`
- Tracking: `useCheckoutTracking`, Spiffy `checkout.ready()` / `checkout.on()`
- Confirmation: URL params → order id / purchase events (no Spiffy script required)

## Flow

Payment → Spiffy webhook → Zapier (customer + admin email) → confirmation page

## Gotchas

- Partner coupons / `?c=CODE`: see [partner-referral.md](partner-referral.md); CRM owns partner ops
- Apply coupon before embed mounts and when Spiffy is already ready
- Engagement metrics in `sessionStorage` feed purchase event (`engagement_time`, `field_changes`)
- Thank-you URL: `total=` is full contract **cents** (payment plans included); `order=` = Spiffy order id — used for Ads conversion value
- Prefer www thank-you URL; analytics metadata allowlists safe params only (no SSN/DOB dump)

## Revenue levers (open)

- **Checkout bumps** (sales-tax authority, DBA) and **Practice Launch bundle** depend on Spiffy bump/post-purchase-upsell support — verify once per [revenue levers plan](../../nypllc-revenue-levers-plan.md) Lever 4C (shared open item with CAQH plan).
- **$985 price test** (late Sep): sitewide price + all ad assets same day — ads plan §4.4.

## Docs

📖 [Spiffy checkout](../../docs/spiffy-checkout.md) · [Revenue levers plan](../../nypllc-revenue-levers-plan.md)
