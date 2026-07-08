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

## Post-payment

- Spiffy → Zapier → customer confirmation + admin notification
- Confirmation page reads order params from URL
