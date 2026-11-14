# P2-05 checkout offer copy (draft, Nov 13 2026)

Draft only. Nothing here is live. Sid approves; whoever has checkout admin pastes it.

## What the checkout says today (read Nov 13 from the live checkout page config)

Location: hosted checkout `new-york-pllc-formation`, product id 9878 "Virtual Address Service", block 326068 (option block) and 326069 (forwarding-address note). Not in site code. Edited in the checkout admin.

| Piece | Current text |
|---|---|
| Block title | Professional Business Address — Keep Your Home Address Off Public Records |
| Option label | Virtual Address Service ($50/mo) $50 |
| Description | When you file in New York, your PLLC address becomes permanently searchable on the Department of State website. A virtual address keeps your home address private. / What's included: / Business address at our Pearl River, NY office / Registered agent service included (saves $99/year) / Mail forwarding / $50/month + postage for items forwarded / See details here: https://nypllc.com/virtual-address-services |
| Address note | Or, if you select virtual address services, please enter the address to which your mail should be forwarded. |
| Default state | `is_default: false`. The box is **not** pre-selected. This already meets "optional and unselected by default". |

**How billing works today (CRM code, verified):**

- The $50 shown is charged at checkout, with the formation.
- The CRM then starts a Stripe subscription with **billing from order date + 1 month** (`maybe-start-subscription-from-order-intake.ts`). So a checkout buyer pays $50 a month from the order. The address only goes on the record at DOS filing, a median of about 3.5 months later.
- A checkout VM buyer gets **no** registered agent subscription (`resolve-intake-subscription-type.ts` returns `VIRTUAL_MAIL` only). "RA included" is true in the system.
- Customers who take the offer at the OP-approved email get **30 days free** instead (Stripe trial). The two paths are priced differently in month one.

**Problems with the current text:**

1. "$50/mo $50" doesn't say when the monthly charge starts, or that it starts before the filing.
2. "Permanently searchable" overstates it. The current address can be changed by a Certificate of Change. The old filing stays in the record.
3. No setup requirement (Form 1583, notary, two IDs).
4. No cancellation rule. The agreement (4.1) says cancellation isn't complete until our address is off the DOS record ($129 if we file).
5. Nothing on what the address can't be used for. The CRM post-formation FAQ already tells clients payers, NPPES and banks need a physical practice location.
6. The required RA consent box elsewhere on the page says "$99 per year... beginning one year after my order date". A VM buyer reads both. They conflict on the page, but not in billing.

## Proposed text

Keep the block where it is (before payment, next to the other add-ons). Keep `is_default: false`.

**Block title**

> Business address for your state filing (optional)

**Option label**

> Add virtual address service: $50 today, then $50 a month

**Description**

> Your PLLC's address is public on the New York Department of State website. If you don't want your home address there, we can file with our address instead: 1 Blue Hill Plaza, Pearl River, NY 10965.
>
> What's included:
> - Our Pearl River address on your state filing
> - Registered agent service. The $99 a year registered agent fee doesn't apply while you have this service.
> - We receive your mail and forward it to you weekly
> - Postage is billed at cost on your monthly invoice. No markup.
>
> Cost: $50 today, then $50 a month starting one month after your order. Billing starts now, not when we file.
>
> Setup: we'll email you USPS Form 1583. You sign it in front of a notary, in person or online, and send it back with two forms of ID.
>
> This is a mailing address, not a practice location. Payers, NPPES and banks usually need the address where you practice.
>
> To cancel later, our address has to come off your state record first. You can file that change yourself, or we file it for $129.
>
> Full terms: https://www.nypllc.com/mail-forwarding-agreement

**Forwarding-address note**

> If you add the virtual address, enter the address where we should forward your mail. We don't put this address on your state filing.

**Optional: RA consent box**

Add one sentence to the end of the existing RA consent text:

> Not charged while you have virtual address service.

The RA disclosure went through review in August (revenue-levers shard). Sid should OK any edit to it. If he doesn't, leave it and rely on the VM description line.

### Lines that need Sid before pasting

| Line | Why |
|---|---|
| "Billing starts now, not when we file." | True today. Sid might prefer to move the first VM charge to DOS filing. That would change revenue timing and is a separate decision. If he changes billing, change this line too. |
| "not a practice location" | Same idea as P1-05 checklist item "Confirm the permitted uses". The CRM FAQ already says this to existing VM clients. The P1-05 §6 draft for Sid is not confirmed (the Nov 8 P1-05 README was not found on disk Nov 13). |
| "sign it in front of a notary ... two forms of ID" | Matches agreement 1.2 and the current 1583 email. Sid's Nov 6 decision is that mail continues while 1583s are backfilled, so the copy doesn't say "before activation". |
| Cancel before filing | Not included. A buyer who changes their mind before DOS filing could just keep their own address. There is no written policy for this. If Sid wants it, add: "If you change your mind before we file, tell us and we'll use your own address." |

### Words left out on purpose

- "Keep your home address private." The forwarding address isn't public, but the owner's home address can still appear on other records (NYSED, NPPES, IRS). "Off the state filing" is what we can promise.
- "Unique suite number". Everyone is on `1509-24` until PMB numbers exist (form-1583 shard).
- "Same-day legal mail". This is an internal practice (mail-station decision, Nov 6) and isn't in the agreement.

## Site copy: `/virtual-address-services`

File: `new-york-pllc/web/src/app/virtual-address-services/page.tsx`. These fix inaccurate claims and are not new selling. The checklist's freeze rule lets accuracy fixes ship during Nov 15–Dec 1. Sid should still OK each one. Otherwise merge by Nov 14 or wait until Dec 1.

| # | Location (JSX text) | Current | Proposed | Reason |
|---|---|---|---|---|
| S1 | "Your Business Address, Simplified" card | "When you sign up, we'll designate you a unique suite number for your business." | "Your mail comes to our suite at that address, and we route it to you." | No per-client numbers exist yet. Restore the old line when PMBs ship. |
| S2 | How It Works, step 1 "Complete Setup" | "Complete the required setup forms. Once verified, your service is activated and ready to receive mail." | "We email you USPS Form 1583. Sign it in front of a notary, in person or online, and send it back with two forms of ID." | Mail isn't held back until verification (Sid, Nov 6). |
| S3 | How It Works, step 2 | "...with your designated suite number) are received at our secure facility." | "...) are received at our Pearl River address." | No per-client suite numbers. "Secure facility" isn't something we've verified. |
| S4 | Benefits list | "Professional business address at 1 Blue Hill Plaza, Pearl River, NY 10965 (with your designated suite number) without office overhead" | "Business address at 1 Blue Hill Plaza, Pearl River, NY 10965 for your state filing and mail" | Same as S1 |
| S5 | Benefits list | "Complete privacy and confidentiality" | "We don't open your mail unless you ask us in writing or the law requires it" | Matches agreement 5.1. |
| S6 | Pricing, Monthly Subscription card, after "Includes registered agent service at no additional cost." | (none) | Add: "This is a mailing and registered agent address, not a practice location. Payers, NPPES and banks usually need the address where you practice." | Permitted-use limit (P1-05) |

Leave as is: the $50/month price, postage at cost (matches agreement 3.3 and the Nov 6 decision), weekly Friday forwarding, package forwarding (first parcel label bought Nov 13), the $129 cancel line.

**Agreement** (`/mail-forwarding-agreement`): 1.1 (unique suite number) and 1.2–1.3 (no mail before verification) conflict with how we operate. The form-1583 shard sends these to the attorney with the relocation clause. They aren't in this package.
