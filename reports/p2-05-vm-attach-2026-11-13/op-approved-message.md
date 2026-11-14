# P2-05 OP-approved address message and second touch (draft, Nov 13 2026)

Draft only. Nothing has been sent and no code has changed. These are CRM emails, so the site freeze doesn't apply to them.

## How it works today (code read Nov 13)

- Template: `PLLC-CRM/crm/lib/email-templates/op-approved-va-upsell.ts` (`opApprovedVaUpsell`), filled by `lib/op-approved-va-upsell/build-op-approved-va-upsell-email.ts` with only `customerName`, `pllcName`, `checkoutUrl`.
- Auto-sends on the first move to `OP_APPROVED` before DOS (`OP_APPROVED_VA_UPSELL_AUTO_SEND_ENABLED=true`). Goes to PLLCs only. Skips law firms, VM clients, VM-only orders, cancelled formations, DOS-filed PLLCs. Sends once per PLLC.
- DOS filing is held 24 hours after the send (`VA_UPSELL_DOS_FILING_WAIT_MS`). The Stripe Checkout link expires in about 24 hours (Stripe default). A refresh script exists for pre-DOS PLLCs.
- Checkout: 30-day free trial, then $50/month.

## What the record shows (97 sends, Jun 19–Nov 12, read-only DB)

| | Count |
|---|---:|
| Emails sent | 97 |
| Checkout completed | **2** (2.1%) |
| Customer replied within 10 days (any topic) | 62 |
| Replied (or staff note) with an address decision other than our address | ~42 |
| Hours from send to DOS filing, median | **72** (only 2 of 96 filed inside 24 h; 24 within 48 h) |
| Days from formation order to this email, median | **104** (77 of 98 more than 90 days after the order) |

In practice the email works as an **address confirmation** step. Most people reply and confirm an address. Almost nobody buys. The replies show four repeated confusions:

1. People don't know which address is on file. Many asked "which address did I list?"
2. "First month free" reads like a term commitment. One asked how many months they'd have to pay.
3. People don't connect the address with the public record. One asked why a virtual address is needed, then whether their home address would now be public.
4. People want to know if they can change it later.

The current text also says "within one business day", but the median is 3 days.

## Current text (subject and body summary)

Subject: `NYSED Approved: First Month Free, Optional Business Address Before DOS Filing`

The body opens with "Great news". It says we plan to file "within one business day", offers our address as "Optional", explains the price and that the Articles address becomes public, links checkout, and lists four notes. It doesn't show the customer's current address. It doesn't give a date. It doesn't mention setup, postage, RA inclusion, or what it costs to leave.

## Proposed first message

Subject (plain ASCII):

```
NYSED approved [PLLC Name]: confirm the address for your state filing
```

Body (text; HTML version is the same words with the button for option 3):

```
Hi [First Name],

NYSED approved [PLLC Name]. Next, we file your Articles of Organization with the New York Department of State.

Before we file, please confirm which address goes on the filing. The address we have is:

[Current PLLC Address]

This address will be public. Anyone can look it up on the Department of State website. Changing it later takes a Certificate of Change.

You have three choices:

1. Keep the address above. You don't need to do anything.

2. Use a different address, such as your office. Reply with it exactly as it should read, including any suite number.

3. Use our address instead: 1 Blue Hill Plaza, Pearl River, NY 10965. We receive your mail and forward it to you weekly. Registered agent service is included. The first month is free, then $50 a month plus postage at cost. Start here: [Checkout URL]

Please decide by [Deadline]. We file on or after that date with the address we have then.

About choice 3:
- It's a mailing address, not a practice location. Payers, NPPES and banks usually need the address where you practice.
- We'll email you USPS Form 1583. You sign it in front of a notary, in person or online, and send it back with two forms of ID.
- To cancel later, our address has to come off your state record first. You can file that change yourself, or we file it for $129.
- Full terms: https://www.nypllc.com/mail-forwarding-agreement

Questions? Just reply.

[signature]
```

Notes:

- `[Current PLLC Address]` and `[Deadline]` are new placeholders. Small build: pass `pllc.street1/street2/city/state/zip` and `sentAt + hold` (formatted like "Tuesday, November 17") into `buildOpApprovedVaUpsellEmail`. If a PLLC has no address on file, show "We don't have an address on file yet. Please reply with one." and skip choice 1.
- No "Great news" opener. The subject already says NYSED approved it.
- The checkout button label changes from "Add virtual address, first month free" to "Use the Pearl River address".
- The "if you already purchased, disregard" line comes out. Eligibility already excludes VM clients.

## Second touch

### Timing (needs Sid)

The second touch has to land **before** filing, while the address can still change. With today's 24-hour hold, there's no room for it. Proposal:

- Hold DOS filing for **2 business days** after the first email, instead of 24 hours. The median send-to-filing gap is already 72 hours, so most filings wouldn't move.
- Send the second touch at the **start of business day 2** (about 24 hours after the first) with a fresh checkout link. The first link will have expired. The refresh code exists (`refresh-op-approved-va-upsell-checkout-for-pllc.ts`).
- `[Deadline]` in both emails = end of business day 2.

If Sid keeps 24 hours: no second touch. Put the effort into the first message only.

### Who gets it (all must be true at send time)

| Rule | How to check in the CRM |
|---|---|
| Still before DOS filing | `formationDocumentFiledAt` is null |
| Still waiting on the address | `formationStatus = OP_APPROVED`. Staff move it to `SS4_SIGNED` once the address is confirmed. |
| First email went out | `OpApprovedVaUpsellEmailLog.status = sent` and no second touch logged |
| Hasn't bought | `checkoutCompletedAt` null. No VM `Subscription` with a `stripeSubscriptionId`. `isVirtualMailClient` false. |
| Hasn't replied | No `InboundEmail` from any owner's customer record since `sentAt`. Any reply means they're engaged, and staff take it from there. |
| Not cancelled | `formationStatus != CANCELLED_AND_REFUNDED` |
| Fits the service | PLLC, not a law firm, not a VM-only order (same as today) |
| Not a partner client, unless Sid allows it | No `b2bPartnerId` on the formation order, and not an enterprise or white-label customer |
| Hasn't opted out | **New field needed** (for example `Pllc.vaUpsellOptOutAt`, set by staff when someone says "stop"). Nothing like it exists today. |
| First email didn't bounce | No mailer-daemon `InboundEmail` naming that address since `sentAt` (small build) |

There are only ever two touches, and nothing goes out after filing.

### Second-touch copy

Subject (plain ASCII):

```
Reminder: address for the [PLLC Name] state filing
```

Body:

```
Hi [First Name],

A quick reminder. We file [PLLC Name] with the Department of State after [Deadline]. Unless you tell us otherwise, we'll use this address:

[Current PLLC Address]

It will be public. If that's fine, you don't need to do anything.

To use a different address, reply with it.

To use our Pearl River address instead ($50 a month after a free first month, registered agent included, postage at cost), start here: [Checkout URL]

[signature]
```

## Build list (CRM, small)

1. Add the address and deadline placeholders to the template and builder. Update the 46 unit tests where they snapshot text.
2. Business-day hold (`VA_UPSELL_DOS_FILING_WAIT_MS` → a business-day calculation) and the badge in `VaUpsellDosFilingWaitBadge`.
3. A second-touch cron with the rules above. Log to a new `secondTouchSentAt` (or a second log row). Refresh the checkout session before sending.
4. A `vaUpsellOptOutAt` field and a staff toggle.
5. Optional: tag replies. Staff set an `addressDecision` (own / other / ours) when they move the PLLC to `SS4_SIGNED`, so we can report choices and not just purchases.
