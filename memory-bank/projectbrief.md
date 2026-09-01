# Project Brief: NY PLLC Formation Service

## Core Mission
Build a customer-facing website that enables licensed professionals to form New York Professional Limited Liability Companies (PLLCs) for a flat fee of $885, including all required publishing obligations.

## Target Market
Licensed professionals in New York who need to establish a PLLC:
- Doctors, dentists, physicians
- Attorneys and lawyers
- Certified Public Accountants (CPAs)
- Architects and engineers
- Other licensed professionals requiring PLLC structure

## Business Model
- **Service**: Complete PLLC formation + publishing package
- **Price Point**: $885 flat fee (all-inclusive)
- **Differentiation**: Includes mandatory NY publishing requirement that competitors often charge extra for
- **Sister company**: CheapNewYorkLLC.com (plain LLC formation) — the model this site replicates for the PLLC market, **and a company we deliberately do not compete with.**

## Scope boundary — plain LLC is out of scope

**Plain (non-professional) LLC formation belongs to the sister company. We never pursue it.**

- `/order-llc` exists **only to take orders** from people who arrive already wanting an LLC. It is **never an SEO target** and gets no ranking work, content, or internal-link equity.
- Plain-LLC queries are excluded by name from the SEO target list ([`seo-target-list-2026-08-04.md`](../seo-target-list-2026-08-04.md) keeps them in a standing "Out of scope" section, and `seo_target_list.py` enforces it) so a future refresh can't re-derive them as an opportunity. 74 queries / 1,720 impressions / $331yr are parked there on purpose.
- The same applies to LLC **publication** queries — not a content gap, not a new page.
- **Unresolved:** we currently pay ~$331/yr for plain-LLC clicks in Google Ads. If CheapNewYorkLLC bids on the same terms we are bidding against ourselves. Check the sister account before treating this as either fine or as negative-keyword candidates.

If an analysis surfaces plain-LLC terms as an opportunity, the analysis is wrong about scope, not right about strategy.

**MSO pair is in scope (Aug 31 2026):** a licensed professional who needs a **practice PLLC + management LLC** is an NYPLLC customer. That management LLC is **not** a CheapNewYorkLLC SEO/ads product and must not rank `/order-llc`. Sell it only on the MSO path (or as an already-formed PLLC add-on). SoT: [features/mso-msa.md](features/mso-msa.md).

## Success Criteria
1. **Conversion**: Achieve 5% visitor-to-customer conversion rate
2. **Volume**: Convert 300+ customers in first year
3. **Satisfaction**: Maintain >4.5/5 star customer satisfaction rating
4. **Efficiency**: Same-day or <24 hour turnaround from payment to completion
5. **Profitability**: Maintain healthy margins with CPA below target threshold

## Legal Compliance
- Must comply with NY PLLC formation laws
- Handle mandatory newspaper publication requirement (2 newspapers for 6 weeks)
- File Certificate of Publication with NYS when complete
- Professional license verification for PLLC eligibility
- Clear disclaimers that this is not legal advice

## Technical Foundation
- Modern web stack (Next.js + React + Tailwind CSS)
- Secure payment processing (Stripe)
- Automated workflow management
- Professional admin dashboard for order fulfillment
