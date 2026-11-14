# P2-05 Improve VM attachment on new formations: draft package (Nov 13 2026)

Draft only. Nothing was sent. No live system, site code, CRM record, Stripe or checkout setting was changed. DB and Stripe reads were read-only.

## Files

- [checkout-offer-copy.md](checkout-offer-copy.md): current vs proposed checkout VM text, plus 6 accuracy fixes for `/virtual-address-services`
- [op-approved-message.md](op-approved-message.md): current vs proposed OP-approved email, second touch, eligibility rules, build list
- [pending-checkouts-review.md](pending-checkouts-review.md): review of every pending VM row, segment counts, draft follow-up (counts only)
- [tracking-plan.md](tracking-plan.md): what's measurable, path rule, deduplicated cohort attach, first read
- Per-person list with emails (gitignored): [pending-vm-review.csv](../../../PLLC-CRM/crm/reports/p2-05-pending-vm-2026-11-13/pending-vm-review.csv) · [notes](../../../PLLC-CRM/crm/reports/p2-05-pending-vm-2026-11-13/README.md)

## Summary

- **Checkout:** the VM box is already optional and **not pre-selected** (live config `is_default: false`). The text doesn't say when the monthly charge starts, which is at order + 1 month, months before the address is used. It also leaves out setup, cancellation and the practice-location limit, and says "permanently searchable". The proposed text fixes those and avoids selling hard.
- **OP-approved email:** 97 sent, **2 bought (2.1%)**, but 62 replied. It works as an address confirmation step, not a sale. The rewrite centres it on that: here's your address, it will be public, three choices, decide by a date. It also corrects "within one business day" (the actual median is 72 hours to filing).
- **Pending checkouts:** there are **97** now, not 67. All 96 Stripe sessions have expired unpaid. 95 are already DOS-filed. The clean follow-up segment is **17 now + 19 after publication = 36**, plus 1 personal note. 42 already gave an address decision, and 8 don't have a home address.
- **Tracking:** sends, replies, checkout completion and first payment are measurable today. Clicks and delivery aren't (skip clicks). **The OP email goes out a median of 104 days after the order**, so under the current 90-day definition OP-stage starts almost never count toward attach. The window needs a decision.

## What Sid needs to decide

1. **Checkout copy:** approve the text in [checkout-offer-copy.md](checkout-offer-copy.md). Ship by Nov 14 or wait until Dec 1 (freeze). Keep "Billing starts now, not when we file", or move the first VM charge to DOS filing (a separate billing decision).
2. **OP email hold and second touch:** approve the rewrite, and change the DOS hold from 24 hours to **2 business days** with a second touch at about 24 hours. With a 24-hour hold, there's no second touch.
3. **Switch-in fee for already-filed customers:** waive the Certificate of Change, charge $129, or set another price. Then decide whether to send the one-time note to the 36 (17 now, 19 after publication), and whether partner-referred clients (1) can be contacted.
4. **Attach window:** keep 90 days from order, or use "90 days from order or 14 days after DOS filing, whichever is later" (recommended) so OP-stage starts can count.
5. **Wording limits:** confirm the "mailing address, not a practice location" line (P1-05 permitted uses). Decide whether a buyer who changes their mind **before filing** can simply keep their own address with no fee.
6. **Site accuracy fixes** S1–S6 (unique suite number, "once verified, activated", "complete privacy", practice-location line): ship now under the freeze's accuracy rule, or Dec 1.

## Checklist mapping (P2-05)

| Bullet | State | Notes |
|---|---|---|
| Verified definition and full recurring price at checkout; optional, unselected | **Drafted / needs Sid** | Unselected is already true (verified). Text drafted. Someone with checkout admin pastes it after approval. It's checkout copy, so Nov 14 or Dec 1. |
| Explain uses, RA inclusion, postage, setup, cancellation | **Drafted / needs Sid** | In both checkout and OP copy. Permitted-use wording and the cancel-before-filing policy need Sid. Agreement 1.1–1.3 conflicts go to the attorney (form-1583 shard). |
| Rewrite OP-approved message around the address decision and deadline | **Drafted / needs Sid + small build** | Needs `[Current PLLC Address]` and `[Deadline]` placeholders in the CRM builder. CRM email, so no freeze. |
| Second touch for eligible non-responders; suppress buyers, cancels, opt-outs, poor fit | **Drafted / needs Sid + build** | Rules written. Needs the hold change, a cron, and an opt-out field (none exists). |
| Review the 67 pending checkouts individually; build a clean segment | **Done (review) / needs Sid to send** | 97 rows reviewed one by one. Segment of 36 + 1. Not sent. Send waits on decision 3. |
| Track sent, delivered, clicked, setup started/completed, first payment, time to activation | **Plan drafted / needs build** | Sent, replies, checkout, first payment: yes. Delivered: bounce match (small build). Clicked: not reliable, skip. 1583 steps: wait on the 1583 tracking build. |
| Review support questions from the first ten starts | **Blocked** | No starts under the new copy yet. Ops run it (method in tracking plan). |
| Report checkout and OP starts separately, then deduplicate into combined 90-day attach | **Drafted / needs Sid** | Path rule works today. First read Apr–Oct is in the tracking plan. Window decision (4) is needed. `acquisitionSource` field is a small build. |
| Keep 30% as a cohort target; don't call it early | **Ongoing** | Mature Apr–Jul baseline is 20–36%. Judge on two mature post-change cohorts. |

## Key numbers (read-only, Nov 13)

| | |
|---|---:|
| Pending VM rows (placeholders) | 97 (62 by Sep 29, 73 by Oct 14) |
| Stripe sessions for them | 96 expired/unpaid, 1 row with no session |
| Already DOS-filed | 95 |
| Decided / not home / check address | 42 / 8 / 7 |
| Partner / support hold / live window / personal | 1 / 1 / 1 / 1 |
| Eligible now / after publication | 17 / 19 |
| OP emails sent / bought | 97 / 2 |
| Median hours OP email → DOS filing | 72 |
| Median days order → OP email | 104 (77 of 98 > 90 days) |
| PLLCs pre-DOS without VM, not yet emailed | 130 (future recipients of the new message) |

## Not verified

- `../evidence/p1-05-vm-economics-2026-11-13/README.md` **doesn't exist on disk** (searched Nov 13). The checklist links to it. P1-05 figures here come from the checklist text, scorecards and integrated plan, so the §6 permitted-use draft wasn't read.
- Whether a Certificate of Change during publication causes a problem (assumed: wait).
- Whether "weekly, Fridays" forwarding is followed every week. The Friday pack list isn't built.
- Checkout page text was read from the public checkout config, not the admin. The CRM code shows the $50 is charged at checkout and monthly billing starts at order + 1 month. I didn't check that against a real invoice.
- Address classification (home vs business) is by eye from street lines. 7 are flagged for Ops to check.
