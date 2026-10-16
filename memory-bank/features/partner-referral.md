# Partner Referral

## One-liner

B2B `/partners` landing + intake form; `?c=` / cookie attribution applies Spiffy partner coupon on checkout ready.

## Status

**Live.** Coupon attach timing: before embed mounts and/or when Spiffy is already ready.

**90-day (Oct 16 2026):** B2B outreach **active** — first sends Oct 19; include OOS/wholesale formation firms. Playbook: [partner-first-case-playbook.md](../../docs/partner-first-case-playbook.md) · checklist P1-10. Productive partner = ≥1 paid order in trailing 90d ([decision-log.md](../../decision-log.md)).

## Key paths

- Page: `web/src/app/partners/page.tsx`
- Form: `web/src/components/forms/partner-intake-form.tsx`
- Attribution: `web/src/components/referral-attribution/partner-referral-capture.tsx`
- Spiffy: `apply-partner-coupon-on-checkout-ready.ts`, `build-spiffy-checkout-url.ts`, `spiffy-pllc-checkout.tsx`
- Email helpers: `web/src/lib/partners/`

## Gotchas

- Partner applications: public `/partners` page promises a reply in **3–5 business days** (checklist **1-business-day** SLA applies only after Ops commits — do not change site copy until then; see `build-e12` in 90-day plan)
- White-label is wholesale fulfillment; checkout/emails/docs may identify NY PLLC Formation
- Partner ops / payouts / CRM `B2bPartner` live in **PLLC-CRM**
- Order links must force document navigation so Spiffy embed loads
- Footer/order CTA href builders must preserve referral params

## Docs

📖 [Session history](../../docs/session-history.md) · CRM B2B shard in sibling repo
