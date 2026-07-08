# Partner Referral

## One-liner

B2B `/partners` landing + intake form; `?c=` / cookie attribution applies Spiffy partner coupon on checkout ready.

## Status

**Live.** Coupon attach timing: before embed mounts and/or when Spiffy is already ready.

## Key paths

- Page: `web/src/app/partners/page.tsx`
- Form: `web/src/components/forms/partner-intake-form.tsx`
- Attribution: `web/src/components/referral-attribution/partner-referral-capture.tsx`
- Spiffy: `apply-partner-coupon-on-checkout-ready.ts`, `build-spiffy-checkout-url.ts`, `spiffy-pllc-checkout.tsx`
- Email helpers: `web/src/lib/partners/`

## Gotchas

- Partner ops / payouts / CRM `B2bPartner` live in **PLLC-CRM**
- Order links must force document navigation so Spiffy embed loads
- Footer/order CTA href builders must preserve referral params

## Docs

📖 [Session history](../../docs/session-history.md) · CRM B2B shard in sibling repo
