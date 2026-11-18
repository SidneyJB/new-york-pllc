# P3-09 Services page and practice NPI add-on: draft package (Nov 18 2026)

Draft only, written early for the Jan 8 P3-09 package. The site is under the landing-page freeze until Dec 1. Nothing deployed, nothing committed, `main` untouched, no Spiffy change, nothing written in PLLC-CRM (read only). The checklist, decision log and memory bank were not edited.

## Files

- [services-page.md](services-page.md): prices, DOS fees with sources, ordering route, page copy, SEO title/meta, nav changes, how to get to 5 orders
- [npi-addon.md](npi-addon.md): what the Type 2 NPI service includes, who signs, market price check, checkout box copy, Spiffy setup steps, the CRM change needed, lead flow and measures
- [proposed-code/services-page.tsx](proposed-code/services-page.tsx): `/services` page, for `web/src/app/services/page.tsx`
- [proposed-code/nav-footer-constants-sitemap.diff](proposed-code/nav-footer-constants-sitemap.diff): navbar (desktop + mobile), footer, `NAVIGATION.main`, `PRICING` + new `DOS_FEES`, sitemap, `SERVICES_METADATA`

The page and diff typecheck clean (`tsc --noEmit`) in a scratch copy of `web/`. Not linted or rendered. Checkout slugs are `TODO-*` placeholders.

## Summary

| Service | Our fee | DOS fee | + 24h expedite | Total |
|---|---:|---:|---:|---:|
| DBA | $199 | $25 (no county fee for LLCs) | $25 | $249 |
| Address change (Certificate of Change) | $99 | $30 | $25 | $154 |
| Amendment | $249 | $60 | $25 | $334 |
| Good standing (Certificate of Status) | $99 | $25 | $25 | $149 |
| Dissolution | $299 | $60 | $25 | $384 |

- Ordering: one hosted Spiffy checkout per service, linked from `/services`. **They must not post to the CRM `order-success` webhook**: it would treat the order as a new formation (PLLC upsert by name, `INTAKE_RECEIVED`, auto-started RA/VM subscription). Order email only at launch, entered by hand.
- NPI add-on: **$129, credited toward Foundation ($399) or Move my contracts.** Market for Type 2 help is $99–$120. Unchecked box, no new fields, fulfilled after the EIN. CRM needs a small webhook change (engagement `SOLD`, item `NPI_TYPE2`, `caqhInterest` true) before the box goes live.

## Decisions for Sid

1. **Ordering route:** one Spiffy checkout per service, linked, with email-only notification (recommended), or contact form then a pay link for amendment and dissolution.
2. **Expedite:** include the $25 24-hour expedite in every shelf filing (recommended; matches formation, lets the page promise next-day state turnaround), or file standard. Without it, the address change is $129, which matches the price already in the mail forwarding agreement; with it, $154. If you want $129 everywhere, drop expedite on address change only.
3. **Certified copies** ($99 + $10) as a sixth item, or leave the page at five.
4. **Two checkout boxes:** keep the free "insurance credentialing interest" box next to the paid NPI box, or replace the free box with the NPI box. Two boxes is more friction; the free box has been the only credentialing signal since Aug 26.
5. **NPI price and credit:** $129 with full credit toward a paid tier within 90 days (recommended), $129 without credit, or $99.
6. **NPI fallback:** if the take rate is under 5% after 30 days, test $99 for 30 days, or pull the box.
7. **First-month traffic for `/services`:** a new page won't rank inside 30 days. Approve one email to past formation customers, or a line in the existing lifecycle emails, or accept that the 5-order test mostly measures organic. Nothing is drafted to send.
8. **Revenue levers plan COGS:** the DBA state fee there says $45; DOS says $25 for a PLLC with no county fee. Update the plan when convenient.

## Not verified

- Current non-expedited DOS processing time (DOS doesn't publish one that I found).
- Whether NYSED sign-off is needed for each kind of PLLC amendment; the copy says "some need it" and offers a refund.
- Whether dissolution of a PLLC needs NY Tax Department consent (secondary sources conflict; tax.ny.gov not checked). The copy makes no claim.
- Whether Spiffy can show an add-on only for certain `practice_type` values.
- The 2026 NPPES P.O. box change for home or telehealth providers (from an OMB supporting statement, not the live form).

## Sid's decisions (Nov 18)

1. **Ordering: custom Stripe checkout forms** for the new services (not Spiffy). Current Spiffy forms migrate to Stripe later. The Stripe orders must not create formation records in the CRM.
2. **Expedite** ($25, 24-hour) on every service except the address change, which stays **$129** ($99 + $30 DOS fee, standard processing). Page prices: DBA $249, address change $129, amendment $334, good standing $149, dissolution $384.
3. **Five services**; no certified copies line (quote on request).
4. **Traffic:** a short /services link line in existing lifecycle emails (formation-complete / Cert of Publication). No blast.
5. **NPI add-on: $129**, credited in full toward Foundation ($399) or Move my contracts if bought within 90 days.
6. **Keep both checkout boxes:** the free credentialing-interest box stays next to the paid NPI box.
7. **Fallback:** under 5% take rate after 30 days -> test $99 for 30 days.
8. DBA fee in the revenue levers plan corrected to $25.

Build after the Dec 1 freeze, each piece deployed only on Sid's go: Stripe forms + /services page + nav; email link line; NPI box (Spiffy formation checkout until the migration) + CRM webhook change.
