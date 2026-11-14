# P2-06 - Existing-practice VM migration pilot (prep)

Nov 13 2026. Agent draft. Owner: Ops (service design), Sid (commercial scope). Prepares [P3-04](../../nypllc-90-day-execution-checklist.md).

Nothing was sent, filed, queued, invoiced, or changed. One read-only CRM query was run.

## Summary

- **Customer:** an existing NY PLLC whose public DOS address is the owner's home, with a real business-mail need, that will use our address only for mail and the public record. Best first fit: telehealth or office-light practices. [customer-definition.md](customer-definition.md)
- **Scope:** agreement, notarized Form 1583 with two IDs, one DOS Certificate of Change, a signed NYSED entity letter, CRM setup, first forward. We file only after the 1583 is in. [scope.md](scope.md)
- **Key finding:** every PLLC we formed already names us as registered agent, and 174 of the 179 candidates pay us $99/year for it. A migration changes only the service-of-process address line. The RA subscription must end when VM starts. Net added revenue is about **$501/year** per migration, not $600.
- **Fee:** **$129 one-time, state fee included.** $129 - $30 state fee - $25 expedite - ~$4 card fee = **~$70 for ~65 minutes (estimate)**. Same as the existing $129 address-change price. [costing.md](costing.md)
- **Service sheet and route:** [service-sheet.md](service-sheet.md) (client-facing, no vendor names). Checkout: CRM hosted invoice for the setup fee, then CRM "Start Virtual Mail" and end RA. Manual intake checklist and a draft first email. [checkout-and-intake.md](checkout-and-intake.md)
- **Prospects:** 179 formed NY professional entities without VM and 90+ days old. 85 have an owner's home address on the DOS record. **Tier 1: 20** (home address, office-light profession, not a law firm). Tier 2: 52. Per-entity list only in the gitignored CRM reports folder. [prospect-selection.md](prospect-selection.md)

## Decisions for Sid

1. **Setup fee:** $129 including state fees (recommended), $149, or $99 + $55 state fees. [costing.md](costing.md)
2. **Prepaid RA credit:** if a customer already paid an RA year, pro-rated credit or none? Most candidates are still in the free first year, so it rarely matters.
3. **Permission to contact:** may Sid (or Ops) email Tier 1 past customers one-to-one with this offer? Sid named "no emails" for the postage notice on Nov 6; confirm this is different.
4. **Pilot while the CMRA question is open:** go ahead with up to 10 migrations, collecting the 1583 before filing, and telling customers they may need to re-sign once box numbers are final? Or wait for Office Evolution's answer? Recommendation: go ahead, small.
5. **Law firms:** keep out of the pilot (recommended)?
6. **Sheet wording:** approve "not a practice location" and "not a full privacy service" lines, and the omission of a unique suite number until PMB numbers exist.
7. **First-touch email:** approve or edit the draft in [checkout-and-intake.md](checkout-and-intake.md).

## Checklist mapping (P2-06)

| Bullet | State | Where |
|---|---|---|
| Define a narrow initial customer | **Drafted**, needs Sid sign-off | [customer-definition.md](customer-definition.md) |
| Define included work, exclusions, setup documents, identity/authorization, mail activation, state-record changes, customer responsibilities | **Drafted**, needs Ops to confirm steps | [scope.md](scope.md) |
| Check mail-receiving and professional-entity requirements; quote unusual filings separately | **Partly drafted.** DOS fee and powers verified on dos.ny.gov. NYSED entity letter from CRM practice and a NYSED search summary; the NYSED page could not be fetched directly. **Blocked in part** on the CMRA decision (Office Evolution has not replied since Nov 6). Unusual filings are excluded and quoted separately. | [scope.md](scope.md) |
| Cost the migration; set a transparent fee; say whether it includes the government fee | **Drafted.** Needs Sid (fee). Labor minutes are estimates; needs Ops timing. | [costing.md](costing.md) |
| Explain that subscription start, filing completion, and old-service termination may be different dates | **Drafted** | [scope.md](scope.md), [service-sheet.md](service-sheet.md) |
| One concise offer page or service sheet and an existing checkout/invoice route; manual intake | **Drafted.** Needs Sid (wording) and Ops (dry-run of the route). | [service-sheet.md](service-sheet.md), [checkout-and-intake.md](checkout-and-intake.md) |
| Select 10-15 suitable prospects from permitted contacts and partner intros | **Method and counts drafted** (Tier 1 = 20). **Needs Ops** hand review and **Sid** permission. Partner intros not yet sought. | [prospect-selection.md](prospect-selection.md) |
| Ask for a paid pilot purchase after confirming fit; no unsolicited invoice | **Not started** (by design). Needs Sid to send. | Draft email in [checkout-and-intake.md](checkout-and-intake.md) |

No bullet is complete yet. Each needs Sid or Ops sign-off before it is checked.

## Not verified

- NYSED channel for the entity letter: CRM uses the NYSED Contact Us form; the NYSED guidance summary says email to the Professional Corporations Unit. No entity deadline found.
- DOS online-filing fee equals the $30 + $25 on the mail-in page.
- DOS turnaround with 24-hour expedite in practice.
- Labor minutes (no CRM timing exists).
- Whether CRM "Start Virtual Mail" needs a current card first.
- Address type is a heuristic; the 85 home-address matches rely on the owner's personal address in the CRM.
- The P1-05 Nov 8 evidence file (`PLLC-CRM/crm/reports/p1-05-2026-11-08/README.md`) is not on disk. Churn (2.4%/month) and the address-use draft were taken from the checklist's summary of it.
- Mail scanning: the request mentioned scanned mail, but the live page and agreement promise only weekly forwarding. The service sheet does not offer scanning.

## Sources

- [NY DOS - Certificate of Change for Domestic LLCs](https://dos.ny.gov/certificate-change-domestic-limited-liability-companies-0) ($30 fee; expedite $25/$75/$150; changes service-of-process address and registered agent designation)
- [NYSED Office of the Professions - corporate entities](https://www.op.nysed.gov/corporate-entities) (search summary only)
- [8 NYCRR 59.8](https://www.op.nysed.gov/title8/regulations-commissioner-education/part-59/8) (licensee 30-day address notice; search summary only)
- USPS DMM 508.1.8 and PS Form 1583 (June 2024), as summarized in CRM `memory-bank/features/form-1583-cmra.md`

## Completion note (for the checklist)

| Field | Value |
|---|---|
| Task ID | P2-06 |
| Owner and date | Agent draft, Nov 13 2026 |
| What changed | Customer definition, scope, costing, service sheet, route, intake, prospect method drafted |
| Evidence | This folder; CRM read-only query in `PLLC-CRM/crm/reports/p2-06-vm-migration-2026-11-13/` |
| Result | 179 candidates; 85 home-address; Tier 1 = 20; proposed $129 all-in fee, ~$70 left after outside costs |
| Decision | Wait: Sid decisions 1-7 |
| Next action | Sid decides; Ops reviews Tier 1 and dry-runs the route; P3-04 after |
