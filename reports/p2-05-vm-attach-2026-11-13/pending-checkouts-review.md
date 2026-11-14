# P2-05 pending VM checkouts: individual review (Nov 13 2026)

Read-only. Nothing was sent and no record was changed. The per-person list (with emails) is in the gitignored CRM folder: [pending-vm-review.csv](../../../PLLC-CRM/crm/reports/p2-05-pending-vm-2026-11-13/pending-vm-review.csv) · [notes](../../../PLLC-CRM/crm/reports/p2-05-pending-vm-2026-11-13/README.md). This file has counts only.

## What a "pending checkout" is

A CRM `Subscription` row with `subscriptionType = VIRTUAL_MAIL`, `status = pending` and no `stripeSubscriptionId`. The OP-approved email creates it as a placeholder for its Stripe Checkout link. These rows are not subscribers (integrated plan §Virtual mail; virtual-mail shard).

## Why 97 and not 67

The 67 was an earlier snapshot. The email keeps creating rows: 62 existed by Sep 29, 73 by Oct 14, and 97 by Nov 12. This review covers all **97** current rows. 96 came from the OP-approved email. One came from a staff signup email sent in July.

## Checks on every row

- **Stripe (read-only):** all 96 checkout sessions are `expired / unpaid`. None was paid without being linked in the CRM. Every old link is dead.
- **No row has a real VM subscription** on the same PLLC, and no owner has VM on another PLLC.
- **DOS filed:** 95 of 97. The address decision these emails asked about has passed for all but two.
- **Cancelled formations:** 0.
- **Replies:** 62 of 97 wrote back within 10 days of the email. Replies and staff notes were read one at a time.

## Segments

| Segment | Count | Follow up? |
|---|---:|---|
| **Decided**: replied (or a staff note says) they keep their own address, use an office or other address, bought a PO box, or already have another virtual address | 42 | No. They answered. |
| **Address isn't a home address**: office suite, business park, PO box, mailbox number, or a third-party registered-agent suite | 8 | No. The service doesn't fit. |
| **Check address**: could be home or business. Ops look it up before deciding. | 7 | Only if Ops confirm it's a home address |
| **Partner-referred order** | 1 | Sid decides whether we contact partner clients directly |
| **Support hold**: recent complaint about formation timing | 1 | No sales email until that's resolved |
| **Live window**: OP-approved Nov 12, not filed yet | 1 | Handled by the live flow (and the new second touch if approved) |
| **Personal follow-up**: staff sent the full signup pack in July; it was never finished | 1 | One personal note from Ops |
| **Eligible now**: home-looking address on the public record, no reply about it, publication done or formation complete | 17 | Yes, after Sid's decisions below |
| **Eligible after publication**: same, but publication is still in progress | 19 | Yes, once the Certificate of Publication is filed |
| **Total** | **97** | |

The clean segment is **17 now + 19 later = 36**, plus 1 personal note. That's 37% of the 97. Among the 17 "eligible now", 2 are in `S_CORP_DOCS_FAXED`; Ops should confirm their publication is done. Two eligible entities share an owner household address; send them one combined note.

## Why wait for publication

A Certificate of Change during publication would put a different address on the record from the one in the published notice. I haven't confirmed whether that causes a problem. Waiting is the safer default. Ops/Sid can lift this.

## What these 36 can be offered

They're all filed, so moving to our address now takes a **Certificate of Change** plus the subscription. Two gaps:

1. **Price of the switch-in filing isn't set.** The CRM FAQ tells existing clients "We file the Certificate of Change" when they switch to our address, with no fee. The $129 in the agreement is for leaving. The integrated plan (V3) has a VM-plus-CoC bundle for Q1 2027, with no price yet. **Sid decides:** waive it for this group, $129, or another price.
2. **No checkout path after filing.** The OP-approved checkout and refresh code refuse PLLCs already filed (`DOS_ALREADY_FILED`). So the follow-up should ask for a **reply**. Staff then use "Start Virtual Mail" and queue the CoC. That works for up to 36 people and needs no build.

## Draft follow-up (reply-based, one send, not sent)

Subject (plain ASCII):

```
The address on the public record for [PLLC Name]
```

Body:

```
Hi [First Name],

When we filed [PLLC Name] with the Department of State, we used this address:

[PLLC Address on file]

That address is public on the Department of State website.

If you'd rather replace it with our address in Pearl River, NY, reply "switch" and we'll handle it. We file the change with the state [CoC fee line - Sid to set]. The service is $50 a month plus postage at cost, and it includes registered agent service. It's a mailing address, not a practice location.

If you're happy with the address you have, you don't need to do anything. We won't send this again.

[signature]
```

Rules for this send: one email per entity, ever. Re-check each row the day it goes out (no VM, no reply on this topic, not cancelled, no complaint). If integrated plan V3 (Q1 2027 existing-customer campaign) runs later, leave these 36 out of it.

## Expectation

The OP-stage email converted 2 of 97. A one-time note to 36 people who already ignored the offer once will likely produce **0 to 2** starts. It's cheap, but it won't move the 30% cohort target. The checkout copy and the new OP-approved message matter more.
