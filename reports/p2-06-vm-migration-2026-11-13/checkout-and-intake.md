# P2-06 - Checkout route and manual intake

Draft, Nov 13 2026. Agent. Ops must dry-run this before the first sale. Nothing here was executed.

## Route using existing tools (no new code)

The site has no standalone VM checkout today. VM is sold in the formation checkout and through the OP-approved upsell. For the pilot use the CRM's existing tools:

| Step | Tool | Who | Notes |
|---|---|---|---|
| 1. Setup fee | `crm/scripts/create-ops-payment-link.ts --pllc-id <id> --amount-cents 12900 --label "VM migration setup and Certificate of Change"` (dry-run by default; `--confirm` creates a hosted invoice) | Ops | Only **after** the customer says yes in writing. Never send an invoice first (checklist P2-06 last bullet). |
| 2. Card for the subscription | Per-subscription card link (`/api/stripe/update-card?subscriptionId=`, setup mode, one entity) | Ops | Ops to confirm the right order: start the VM subscription first, then send the card link, or collect the card first. |
| 3. Start VM | CRM PLLC page, Subscriptions tab, "Start Virtual Mail" | Ops | Billing start must be at least 24 hours out (CRM rule). Set it to the expected activation date. |
| 4. End RA | CRM Subscriptions tab, cancel the RA subscription (no client email) | Ops | Same session as step 3. The CRM blocks VM and RA on one entity at once. Add a note "RA included with VM, P2-06 migration". |
| 5. Certificate of Change | CRM CoC CLI / DOS filing queue, address from our VM address | Ops | Only after the 1583 is in. Agents must not run the queue script. |
| 6. NYSED letter | `crm/scripts/generate-nysed-address-change-letter.ts --pllc-id <id> --old "..."` | Ops | `--old` is the NYSED application address, not the DOS address. |

Unverified (Ops): whether "Start Virtual Mail" needs a valid card on file first, and whether the formation-time card still works for each prospect.

**Option for Sid:** one hosted invoice of $179 (setup $129 + first month $50), with the subscription starting a month later. One payment for the customer, but the first month is then outside the subscription record. Recommendation: keep them separate for the pilot so recurring and one-time revenue stay apart (P3-04 asks for that split).

## Tracking (for P3-04)

Add a CRM note on each pilot entity with tag `P2-06 migration pilot` and record:

- offer sent date, yes date, setup fee paid date
- 1583 received date, ID check result
- VM start date, RA end date
- DOS filing date, DOS filed date
- NYSED letter sent date
- first forward date, first subscription payment date
- staff minutes per step (estimate in the moment)
- support questions

## Manual intake checklist (one per prospect)

**Fit (before any price is sent as an order)**

- [ ] Entity name, DOS ID, county. Formed in NY. Active with DOS.
- [ ] Current DOS service-of-process address. Is it the owner's home?
- [ ] Current registered agent (us, someone else, none).
- [ ] What mail is the problem? (state, tax, payer, legal, bank)
- [ ] How do they practice? (telehealth, office, home office, mixed)
- [ ] Will they use our address only for mail and the public record? Confirmed in writing.
- [ ] Any permitted-use question open? If yes, stop and route to Sid.
- [ ] Any exclusion in customer-definition.md? If yes, stop or quote separately.
- [ ] Forwarding address (US).
- [ ] Deadline (lease ending, mailbox closing, privacy concern, move).

**Offer**

- [ ] Sent the service sheet with price, postage, cancellation, and the three dates.
- [ ] Customer said yes in writing.

**Setup**

- [ ] Setup fee paid.
- [ ] Agreement accepted.
- [ ] 1583 signed, notarized, two IDs, names and address match.
- [ ] Written filing authority on file.
- [ ] VM started; RA ended; forwarding address in CRM.

**Filings**

- [ ] Certificate of Change filed; DOS filed copy saved.
- [ ] NYSED letter signed and sent.
- [ ] Customer told filing is done, with their own update list.

**Activation**

- [ ] First forward sent.
- [ ] First subscription payment succeeded.
- [ ] 30-day check-in booked.

## Draft first-touch email (for Sid to edit; do not send)

Subject: Your PLLC's public address

Hi {first name},

Your PLLC's public address with the NY Department of State is {home street}. Anyone can look it up.

We now offer existing clients a move to our business address in Pearl River. We file the state change, receive your entity's mail, and forward it weekly. Registered agent stays included.

It is $129 once, including the state fee, then $50 a month. Registered agent is included, so your $99 yearly renewal would stop.

It is not a practice location, so it will not work for NPPES or payer enrollment.

Would this help? Reply and I will check it fits before you pay anything.

Sid
