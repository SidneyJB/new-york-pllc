# Spiffy checkout (reference)

Depth extracted from legacy memory bank. Shard: `memory-bank/features/spiffy-checkout.md`.

## Embed

- Account: `nypllc`
- Checkout URL: `https://nypllc.spiffy.co/checkout/new-york-pllc-formation`
- Script in root layout; `<spiffy-checkout>` on order page via `dangerouslySetInnerHTML`

## Engagement API

- `checkout.ready()` / `checkout.on()`
- Events: `change:field` (lead_start), `change:order`, `change:paymethod`
- Metrics stored in `sessionStorage` for purchase event

## Post-payment / thank-you

- Spiffy → Zapier → customer confirmation + admin notification
- Custom thank-you: `https://www.nypllc.com/order/confirmation` with **Send order details through URL**
- Key params (verified Jul 2026): `order=` (Spiffy id), `total=` (**full contracted value in cents**, including payment plans), `email=`, `code=`, etc.
- Site purchase tracking reads `total`/`order` — see `web/src/lib/analytics/spiffy-confirmation.ts`
- Prefer turning off sensitive checkout fields on the thank-you URL when possible; analytics already allowlists safe keys only
