# P2-05 tracking plan (Nov 13 2026)

## Funnel steps: what we can measure today

| Step | Today | Source | Build needed |
|---|---|---|---|
| Message sent | **Yes** | `OpApprovedVaUpsellEmailLog.sentAt`, `status` | Second touch needs its own timestamp |
| Delivered | **No** | Gmail API send succeeds; there's no delivery receipt | Match mailer-daemon bounces in `InboundEmail` to the send. Small. |
| Opened / clicked | **No, and not reliable** | The link goes straight to Stripe Checkout. Stripe only reports `open/expired/complete`. | A redirect through billing.nypllc.com could log clicks, but mail scanners pre-fetch links. **Skip clicks.** Use replies and checkout completion instead. |
| Replied | **Yes** | `InboundEmail.customerId` after `sentAt` (62 of 97 within 10 days) | Optional: staff tag the address choice (`own / other / ours`) when moving to `SS4_SIGNED` |
| Checkout completed (setup started, OP path) | **Yes** | `OpApprovedVaUpsellEmailLog.checkoutCompletedAt`, `Pllc.opApprovedVaUpsellCheckoutCompletedAt`, Stripe metadata `source: op-approved-va-upsell` | none |
| Checkout VM bought (formation checkout path) | **Yes** | Spiffy webhook sets `isVirtualMailClient` and creates the VM `Subscription` with `spiffyOrderId` = the formation order | none |
| Form 1583 sent | **No (unreliable)** | `FORM_1583_SENT` timestamps aren't trustworthy (form-1583 shard) | Already planned: 1583 and ID tracking in the 1583 build |
| Setup completed (1583 + IDs) | **Partly** | Document records; the Nov 5 baseline needed hand counting | Same 1583 build: `form1583SignedAt`, `idsReceivedAt` |
| First successful payment | **Yes** | `SubscriptionPayment` / Stripe `invoice.paid` on the VM sub | none |
| Time to activation | **Computable** | First paid VM invoice minus formation order date (checkout path) or minus `sentAt` (OP path) | none. Define "activated" = first successful VM payment, matching "VM paying active" |

## Path rule (works today, no build)

Each entity's **first real VM subscription**: `stripeSubscriptionId` set, or status not `pending`/`cancelled`. Pending placeholders never count.

1. **OP-stage**: `opApprovedVaUpsellCheckoutCompletedAt` is set. Later this also includes the second touch and staff starts made in reply to the OP email.
2. **Checkout**: the VM sub's `spiffyOrderId` equals the formation order's, or the sub was created within 3 days of the order.
3. **Other later**: anything else. Staff-started (often a reply to the OP email), reinstated, historical follow-up. Report it on its own line. Don't fold it into checkout.

**Build (small):** add `Subscription.acquisitionSource` (`checkout | op_email | op_second_touch | historical_followup | staff | reinstate`), set when the sub is created. That removes the 3-day guess. It also catches staff starts made in reply to the OP email, which today land in "other later".

## Combined cohort attach (deduplicated)

- **Cohort:** PLLC entities by the month of their first paid formation order (`isVmOnly = false`, `totalCents > 0`, `entityType = PLLC`). One row per entity.
- **Numerator:** entities whose first real VM sub started inside the window. Each entity counts once, whatever path it came through. Report the path split beside it: checkout / OP-stage / other later. The split adds up to the total and is never added on top of it.
- **Mature:** only when the whole window has passed for every entity in the cohort.

### The window problem (Sid decides)

The scorecard defines attach as starts **within 90 days of the formation order**. But the OP-approved email goes out a **median of 104 days** after the order, and 77 of 98 went out after day 90. Under the current definition, almost every OP-stage start falls outside the window. Improving that email couldn't show up in the attach rate.

Options:

- **A. Keep 90 days from order.** OP-stage starts get reported only as a separate count. Simple, but it hides V2.
- **B. 90 days from order, or 14 days after DOS filing, whichever is later** (recommended). This covers both decision points, and every entity still counts once. Cohorts mature later, about 4–5 months after the order month.
- **C. 150 days from order.** Simple, but still misses slow NYSED approvals.

If Sid picks B or C, annotate the definition change in the scorecard and keep the old 90-day series alongside, per checklist rules.

### First read (90 days from order, today's rule, read-only, Nov 13)

| Order month | Entities | VM within 90 d | Attach | Checkout | OP-stage checkout | Other later | Mature? |
|---|---:|---:|---:|---:|---:|---:|---|
| Apr | 47 | 17 | 36% | 15 | 0 | 2 | yes |
| May | 56 | 18 | 32% | 17 | 0 | 1 | yes |
| Jun | 44 | 10 | 23% | 10 | 0 | 0 | yes |
| Jul | 44 | 9 | 20% | 9 | 0 | 0 | yes |
| Aug | 44 | 10 | 23% | 8 | 0 | 2 | no (20 open) |
| Sep | 51 | 16 | 31% | 15 | 0 | 1 | no |
| Oct | 67 | 19 | 28% | 19 | 0 | 0 | no |

This counts subs that started, including ones later cancelled. The Nov 8 P1-05 figures (Apr 35, May 31, Jun 21, Jul 19) were close but used a slightly different numerator. That README wasn't on disk on Nov 13, so I couldn't reconcile them. Fix one definition before the Nov 16 scorecard. There have only been 2 OP-stage purchases (Jul 23 and Nov 4). Neither falls inside a 90-day window from an April-or-later order, which is why the OP column is 0.

## Weekly scorecard lines to add

1. Checkout VM starts (week), by formation order date
2. OP-approved emails sent / second touches sent / replies / checkout completions (week)
3. Address choices at OP stage, from the staff tag once built: own / other / ours
4. Paid activations (first VM invoice paid) and median days to activation, by path
5. Combined cohort attach by month, marked mature or immature, with the path split

## First ten starts (checklist bullet 7)

After the new copy ships, Ops list the first ten VM starts (any path) and read their emails in their first 30 days (`InboundEmail` by `customerId`). Record each question in the customer's own words, then group them. Fix repeated confusion in the copy before promoting it more. At ~25 checkout starts a month, ten starts take about 2 weeks.

## Judging the 30% target

Don't call it from an immature cohort or a handful of starts. With ~45–65 entities a cohort, one start moves attach by about 2 points. Compare at least two mature post-change cohorts with the mature Apr–Jul baseline (20–36%, which is wide). Record the ship date of each copy change so cohorts can be split before and after.
