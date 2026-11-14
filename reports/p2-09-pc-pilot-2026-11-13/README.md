# P2-09 PC pilot preparation (Nov 13 2026, due Nov 20)

This covers the PC half of [checklist P2-09](../../nypllc-90-day-execution-checklist.md). The S-corp audit half was done Nov 11 and is waiting on Sid. **Everything here is a draft.** Nothing was sent, filed, invoiced, written to a database or committed, and no code was changed. This is not legal advice; items marked "counsel" or "confirm live" are unverified.

## Summary

- **Demand is real but rare.** 4 people asked for a domestic NY PC in about 13 months (under 1% of ~580 orders). 1 paid (a dentist, Dec 2025, at $785 through the PLLC checkout). 0 have paid since the Sep 3 $1,285 / $885-floor pricing. No B2B partner has surfaced a PC case. The foreign PC product is separate and already has 2 paid cases. → [demand-evidence.md](demand-evidence.md); names are in the gitignored [CRM detail file](../../../PLLC-CRM/crm/reports/p2-09-pc-pilot-2026-11-13/demand-detail.md).
- **Official steps were checked against official sources:** NYSED consent **$90**, then DOS Certificate of Incorporation **$125** (+$25 for 24 h), then a DOS certified copy **$10**, then the **certified copy to NYSED within 30 days, $20** (BCL §1503(c)). **No publication.** Ongoing: DOS biennial $9 and an NYSED **triennial statement** (BCL §1514, $105). **The $10 organization tax in our $1,285 quote was repealed** (TSB-M-15(1)C). → [official-steps-and-fees.md](official-steps-and-fees.md)
- **The CRM is not PC-ready:** the domestic NYSED check comes out as $10 x owners (should be $90); PCs get the PLLC Articles generator and an operating agreement; the auto-filer only handles professional LLCs; the `ny-pc` workflow has no step for the 30-day NYSED certified copy (Case A filed it 52 days late); there is no domestic-PC intake path; the completion email is PLLC-only. All of this can be handled by hand for ≤5 cases with [pc-checklist.md](pc-checklist.md).
- **Costing:** standard PC cash cost **$280** vs PLLC $345. About **+110 labor minutes** per case while manual (capacity only, not costed). **Recommended test price: $985**, which gives $675 contribution per case steady-state, or $475 while the one-time ~$1,000 counsel template review is spread over 5 cases, vs $514 for a PLLC. Parity at $885 would give $578 steady-state but only $378 during the pilot. Keep **$1,285 MSO-ready** ($891). → [costing.md](costing.md)
- Scope: [pilot-scope.md](pilot-scope.md). Quote, invoice and partner ask: [quote-invoice-and-partner-ask.md](quote-invoice-and-partner-ask.md).

## Decisions for Sid

1. **Pilot price for a standard PC:** $985 (recommended), $885 parity, or $1,085. MSO-ready stays $1,285.
2. **Scope:** medicine and dentistry first; other single-license health professions case by case? Ownership limited to 1–3 same-profession licensees?
3. **Partner terms on a PC:** the same $75 referral fee as a PLLC (proposed), with no wholesale PC price in the pilot.
4. **Professional review:** (a) get counsel to quote a flat fee for reviewing the bylaws, consent and stock-certificate templates (needed before case 1). (b) Should counsel also review the first live Certificate of Incorporation?
5. **Intake and recording:** create domestic PC cases by hand in the CRM, or approve a small build (a domestic-PC manual intake, the $90 check, a Certificate of Incorporation generator, a NYSED certified-copy step with a 21-day task, a PC completion email). The build can wait until a paid case exists.
6. **Edit the $1,285 quote block** in [domestic-ny-pc.md](../../memory-bank/features/domestic-ny-pc.md): drop the "organization tax ($10)" line. Total unchanged. Before editing, check Case A's DOS receipt to confirm no tax was charged.
7. **Retire coupon `PC100`** and the "same price as a PLLC" answer (both used before Sep 3).
8. **Which 3–5 partners get the ask**, and send it (draft in the quote file).

## P2-09 PC bullets: status

| Bullet | Status | Where |
|---|---|---|
| Review historical inquiries and partner feedback for real PC demand | **Drafted (done pending Sid's read).** 4 domestic asks, 1 paid; 0 partner-surfaced. | [demand-evidence.md](demand-evidence.md) |
| Define supported professions, ownership patterns, standard scope; route exceptions to counsel | **Drafted, needs Sid** (decision 2) | [pilot-scope.md](pilot-scope.md) |
| Verify current NYSED/DOS steps, fees, post-filing registration and ongoing requirements from official sources | **Drafted.** DOS figures and the statutes are verified. **NYSED $90 / $20 / $105 need a live check** (op.nysed.gov would not load in our tool; figures come from indexed NYSED pages and a Rev. 5/23 fee chart). Publication "none" can be confirmed in one line by counsel. | [official-steps-and-fees.md](official-steps-and-fees.md) |
| PC-specific checklist and completion definition | **Drafted** (not the PLLC publication flow) | [pc-checklist.md](pc-checklist.md) |
| Cost filing, document handling, support and professional review; choose a test price after the math | **Drafted, needs Sid** (decision 1). **Needs counsel** for the actual template-review fee (assumed $1,000). | [costing.md](costing.md) |
| Manual quote and checkout/invoice process; case owner and packet reviewer | **Drafted, needs Sid** (decisions 4–5). Owner: Sid. Invoice: Stripe hosted invoice via the ops payment-link CLI. Intake path is a gap. | [quote-invoice-and-partner-ask.md](quote-invoice-and-partner-ask.md) |
| Ask 3–5 qualified partners for a live PC case; a paid order is required for validation | **Drafted, needs Sid to pick and send** (decision 8). Blocked on that send. | same file §3 |

**P2-09 "done when" (PC half):** the workflow is narrow, costed and drafted. A **real prospect pipeline does not exist yet**: there are 0 live partner-surfaced cases. That gate stays open until the partner asks go out and come back.

## Unverified / for counsel

- Live NYSED fee amounts ($90 consent, $20 certified copy, $105 triennial) and the current NYSED submission route for the certified copy (mail vs the new contact-us form).
- Whether DOS accepts a domestic PC certificate through eCorp online. Case A shows a 1-day DOS turnaround with eCorp-style emails, but our worker does not file PCs.
- Corporate-record templates: bylaws, consent and the stock legend under BCL §§1507–1511 (counsel review before the first case).
- Whether demand case D's service (healthcare navigation advisory) is a licensed profession that can form a PC at all.
- The physical corporate-kit cost (~$75 assumed).
- The P1-03 folder `PLLC-CRM/crm/reports/p1-03-2026-11-08/` was not in this checkout. The $514 PLLC benchmark comes from the P2-11 README and the decision log.

## Method

Read-only SQL (`BEGIN READ ONLY`) against the CRM Postgres database. Official pages: dos.ny.gov, nysenate.gov (BCL §§1503, 1514; LLC Law §1203), tax.ny.gov TSB-M-15(1)C, and NYSED pages via search index. CRM code read (no edits): `crm/lib/workflows/definitions/ny.ts`, `crm/lib/check-template/*`, `crm/lib/articles-of-organization/generate-articles-for-pllc.ts`, `crm/lib/pricing/index.ts`.
