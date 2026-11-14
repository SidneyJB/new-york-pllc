# P2-06 - Migration scope

Draft, Nov 13 2026. Agent. Ops must confirm the steps. Sid must confirm the commercial terms.

## Key fact about our past customers

Every PLLC we formed already names **Business Filing Solutions LLC at 1 Blue Hill Plaza** as its registered agent (CRM `form-1583-cmra.md`, "DOS record" fact). The DOS record has two lines:

1. **Address for service of process** (DOS mails papers here). For non-VM clients this is usually the owner's home or office.
2. **Registered agent.** Already us.

So for a past customer the state change is only line 1. One Certificate of Change does it.

Nearly all of these customers also pay us **$99/year for registered agent** (174 of 179 candidates have a live RA subscription; see prospect-selection.md). VM includes RA. The RA subscription must end when VM starts, or we double-bill (the P1-05 overlap lesson). The CRM already blocks a VM and RA subscription on the same entity at the same time.

For a **partner-introduced** entity with an outside registered agent, the same Certificate of Change can also change the registered agent designation to us. No extra state fee.

## Included work (standard scope)

1. Intake and fit check (customer-definition.md).
2. Service agreement acceptance (the live Mail Forwarding & Registered Agent Service Agreement).
3. USPS Form 1583 prepared from the CRM generator, sent for signature, and checked when returned with two IDs.
4. One NY DOS **Certificate of Change** (form DOS-1359-f, domestic LLC) that:
   - changes the address for service of process to our address, and
   - if needed, designates us as registered agent.
   Filed by us with 24-hour expedited handling.
5. A client-signed **NYSED address-change letter** for the entity, prepared by us (CRM `generate-nysed-address-change-letter.ts`). We tell the client how to send it, or send it on their signed authority.
6. CRM setup: VM flag, forwarding address, VM subscription start, RA subscription ended.
7. Mail activation and a confirmation email when the first forward goes out.
8. A short list of other places the customer should update themselves (below).

## Exclusions (quote separately or decline)

- Foreign entity Certificates of Change, PCs formed elsewhere, law firms.
- Name changes, amendments, member changes, biennial statements, reinstatement.
- IRS (Form 8822-B), bank, payer, NPPES, CAQH, DEA, insurance and board address updates. We list them; the customer does them.
- Ending the customer's old mailbox, old registered agent, or USPS forwarding order.
- Mail scanning, daily handling, pickup.
- Rush filing beyond 24-hour expedite.

## Setup documents

| Document | Who | Source |
|---|---|---|
| Signed service agreement (website acceptance or e-sign) | Customer | nypllc.com/mail-forwarding-agreement |
| USPS Form 1583, signed by an officer/member, notarized (in person or online notary) | Customer | CRM generator `crm/lib/form-1583-ps2024-form/` |
| Two IDs: one government photo ID, plus a separate proof of address. Names and address must match the 1583. | Customer | USPS DMM 508.1.8 |
| Written authority for us to sign and file the Certificate of Change | Customer | Intake form or signed authorization (Ops to confirm which) |
| Certificate of Change (DOS-1359-f) | Us | CRM `certificate-of-change-address.ts` / DOS filing queue |
| NYSED entity address letter | Us prepares, customer signs | CRM `generate-nysed-address-change-letter.ts` |
| Forwarding address and contact email | Customer | Intake |

## Identity and authorization: Form 1583 and the CMRA question

The agreement (1.2-1.3) says no mail is handled until a notarized 1583 and two IDs are verified. USPS rules say the CMRA keeps each 1583 and enters it in its customer database.

**Status:** who the CMRA is remains open. Office Evolution was asked on Nov 6 and has not answered (CRM pin, `form-1583-cmra.md`). PMB numbers are not live. Everyone uses `1509-24` today.

**Effect on the pilot:**

1. **Do not change the public record before the 1583 is in.** For a migration, we collect the signed, notarized 1583 and IDs **before** filing the Certificate of Change. This keeps the pilot inside agreement 1.2 as written, unlike the backfill clients.
2. Use the current corrected generator. Item 2b (PMB) stays blank until PMB numbers exist.
3. Tell the customer, in writing, that we may ask them to re-sign a 1583 once our box numbering is final. Cost of a re-sign falls on us, not them.
4. Do not promise a unique suite number in pilot materials until PMB numbering is live (agreement 1.1 promises one; that wording is a known gap).
5. Pilot size stays small (10 paying migrations) so a CMRA change would mean at most about 10 extra re-signs.
6. If the CMRA answer means our address cannot take new 1583 clients, pause new pilot sales. Already-migrated pilot clients follow the "If the Blue Hill address is lost" plan in the CRM shard.

## Mail activation

1. 1583 and IDs verified and filed in the CRM.
2. Forwarding address entered; VM flag on.
3. Mail station can match the client (VM flag and address set).
4. First Friday forward after any mail arrives. Customer gets the "your mail is on the way" email.
5. Postage goes on the next monthly invoice at cost (agreement 3.3).

## State-record changes (verified sources)

| Change | Rule | Fee | Source |
|---|---|---|---|
| DOS address for service of process and/or registered agent | Certificate of Change can change the service-of-process address, county, and make, revoke or change a registered agent designation | **$30** state filing fee. Optional expedite: $25 (24 hours), $75 (same day), $150 (2 hours) | [NY DOS - Certificate of Change for Domestic LLCs](https://dos.ny.gov/certificate-change-domestic-limited-liability-companies-0) (fetched Nov 13 2026) |
| NYSED entity address (PLLCs) | A DOS Certificate of Change does **not** update NYSED. NYSED's Professional Corporations Unit keeps its own entity address. A signed letter from a member with the entity name, PSC/ID number, old and new address, and date is sent to that unit. | No fee found | CRM `ops-action-clis.md` (Oct 26 2026, used once); NYSED Office of the Professions guidance seen via search summary ([op.nysed.gov corporate entities](https://www.op.nysed.gov/corporate-entities)), not fetched directly (certificate error) |
| Individual licensee address | Each licensee must tell NYSED of an address change within 30 days. This is the owner's own registration, not the entity's. Customer's job. | None | 8 NYCRR 59.8 via [op.nysed.gov](https://www.op.nysed.gov/title8/regulations-commissioner-education/part-59/8) (search summary, not fetched) |

**Not verified, Ops to confirm:**

- How NYSED wants the entity letter: our CRM process uses the NYSED Contact Us form; the NYSED guidance summary says email to the Professional Corporations Unit (`opcorp@nysed.gov`). Pick one and record it.
- Whether NYSED sets a deadline for entity address letters. None found.
- That the DOS online filing used by the CRM worker charges the same $30 + $25 as the mail-in page. The CRM worker defaults to expedited.
- Whether a PC needs a different form (business corporations use a different Certificate of Change). PCs are out of the initial pilot.

## Customer responsibilities

- Give accurate entity, owner, and forwarding information.
- Sign and notarize the 1583 and supply valid IDs.
- Sign the NYSED letter and return it within 7 days.
- Update their own IRS, bank, payer, NPPES, CAQH, board, and insurance records as they choose. Keep a real practice location where those require one.
- Keep their old mailbox or agent active until we confirm the new address is live (below).
- Keep a valid payment method on file; pay postage at cost.
- Not use our address as a clinical location.

## Why three different dates

Tell the customer these may all be different days.

| Date | What it means | Typical timing (estimate) |
|---|---|---|
| **Subscription start** | We are ready to receive mail for them: agreement accepted, 1583 and IDs verified, CRM set up. Billing starts here. | Day 0-7, depends on how fast they notarize |
| **Filing completion** | DOS has filed the Certificate of Change and the public record shows our address. NYSED updates later and sends no confirmation. | DOS: about 1-3 business days after we file with 24-hour expedite (Ops to confirm from past filings). NYSED: weeks, unconfirmed. |
| **Safe end of old service** | The customer can close an old mailbox or release an old agent. Only after DOS shows our address, the NYSED letter is sent, and they have updated senders that matter. | Recommend at least 30 days after filing completion. A USPS forwarding order from the old address for 6-12 months is the customer's choice. |

Senders keep using the old address until they update their records. That is why the old service should not end on the day we file.

## Transition checklist (Ops)

1. Fit confirmed and offer accepted in writing.
2. Setup fee paid.
3. Agreement accepted; 1583 + IDs received and checked.
4. VM subscription started; RA subscription ended in the same session.
5. Certificate of Change filed. Record DOS filing date.
6. DOS record checked; filed copy saved to the CRM.
7. NYSED letter generated, signed, sent. Record the date.
8. Customer told filing is done, with the list of their own updates.
9. First forward confirmed.
10. 30-day check-in (P3-04).
