# System Patterns: NY PLLC Formation Service

## Architecture

Static-first Next.js App Router site + Spiffy checkout + analytics. Fulfillment/CRM is a sibling app (PLLC-CRM).

```
Next.js (SSG/ISR)  →  Spiffy.co checkout  →  Zapier emails
       ↓
 Vercel / GA4 / Bing analytics
       ↓
 Partner referral cookie → coupon apply on checkout ready
```

## Stack decisions

- Next.js 14+ App Router · TypeScript · Tailwind v4 · shadcn/ui
- Payments: Spiffy (not on-site Stripe)
- Email: Zapier from Spiffy; partner intake email helpers under `web/src/lib/partners/`
- Hosting: Vercel · Analytics: Vercel + GA4 + Bing UET · Errors: Sentry

## Page map

- Public: `/`, `/about`, `/faq`, `/contact`, `/order`, confirmation
- DIY: `/how-to-form-a-pllc-in-ny`
- VA: `/virtual-address-services`, `/mail-forwarding-agreement`
- Professions: 19 landing pages (see [features/profession-pages.md](features/profession-pages.md))
- Foreign: `/foreign-pllc` + `/foreign-pllc/{state}` (see [features/foreign-into-ny.md](features/foreign-into-ny.md))
- Partners: `/partners` (see [features/partner-referral.md](features/partner-referral.md))
- Legal: privacy, terms, disclaimer

## Shared components

Layout (Navbar/Footer) · forms (ContactForm, PartnerIntakeForm) · analytics tracked CTAs/links · `ScrollTracking` · `BingAdsTracking` · `ForeignStateSelector` · `StateForeignQualificationPage` · Spiffy checkout helpers

## Patterns (pointers)

- Checkout embed + engagement + partner coupon → [features/spiffy-checkout.md](features/spiffy-checkout.md) · [features/partner-referral.md](features/partner-referral.md)
- Event funnel → [features/analytics-tracking.md](features/analytics-tracking.md)
- Canonical domain / metadata → [features/seo-and-domain.md](features/seo-and-domain.md)
- Foreign state modules → [features/foreign-into-ny.md](features/foreign-into-ny.md)
- Tailwind v4 config → [features/tailwind-v4.md](features/tailwind-v4.md)

## Security / compliance (high level)

HTTPS · Spiffy PCI surface · legal disclaimers on key pages · GDPR/CCPA privacy policy · license eligibility messaging (verification in CRM)

📖 Depth: [docs/](../docs/)
