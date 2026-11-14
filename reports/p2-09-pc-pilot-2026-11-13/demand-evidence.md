# P2-09 PC demand evidence (de-identified)

Read-only pull, Nov 13 2026. Names, emails and per-case timelines are only in the gitignored CRM file [demand-detail.md](../../../PLLC-CRM/crm/reports/p2-09-pc-pilot-2026-11-13/demand-detail.md). This count uses written asks only, not search volume.

## Sources searched

| Source | Coverage |
|---|---|
| CRM `Order.comments`, `Pllc.entityType`, staff `Note`s | Full history (~584 orders, 3 PC entities) |
| CRM `InboundEmail` (Gmail mirror of contact@) | 10,381 messages, Oct 23 2025 to Nov 14 2026 |
| Website contact form (notification copies in `OutboundEmail`) | 87 submissions, Oct 30 2025 to Nov 12 2026 |
| Our quotes (`OutboundEmail`) | Same window as inbound |
| B2B partner replies and tracker | Wave 1–4 replies in the mailbox; `b2b-partner-prospect-tracker.md` |

Search terms: "professional corporation", "professional service corporation", "PC", "P.C.". Every hit was read. NYSED and DOS mail (929 messages) matches only because NYSED's unit is called "Professional Corporations" or because a name conflicted with an existing P.C. It is excluded.

## Result

| Bucket | People | Paid | Notes |
|---|---|---|---|
| **Domestic NY PC, explicit ask** | **4** | **1** | A: dentist (specialist), Dec 2025. Paid $785 through the PLLC checkout, formed as a PC. B: dentist starting a second solo office, May 2026, "interested in moving forward"; quoted $785, no order. C: attorney (a past customer) asking for a medical practice, Jul 2026; told "same price as a PLLC", no order. D: CFO intermediary for an MSO structure (DE C Corp + NY PC), Sep 2026; quoted $1,285, no reply after "will take to my team". |
| Foreign PC into NY (separate product) | 6 | 2 | 2 paid ($795 NJ anesthesia; $994 CA hospital medicine). 4 more asked; 2 of those bought PLLCs instead. |
| Counter-signal | 1 | — | An attorney wants to close a PC and open a PLLC. |
| Partner-surfaced live domestic PC case | **0** | — | Two of the 4 domestic asks came through intermediaries (C, D). No B2B partner in Waves 1–4 has named a PC case. |

**Rate:** 4 domestic PC asks in about 13 months, against about 580 PLLC/LLC orders: **under 1%** of volume. Only 1 converted, and it paid below today's $885 floor. Nothing has been paid since the Sep 3 $1,285 / $885-floor pricing.

**What it says:** demand is real but rare. The two dentists both had a PC-specific reason: one already owned PCs, and one had a partnership agreement that forced a new entity. The MSO ask is the higher-value pattern, but it stalled on the customer side. The data supports a manual, partner-surfaced pilot, which is what the Nov 8 revised priorities already say. It does not support a public SKU or ad spend.

## Pricing inconsistency found while searching

Before the Sep 3 lock, two quotes went out below the current rule ("do not quote below $885 for any domestic PC"): $785 via coupon `PC100` (May) and "same price as a PLLC" (Jul; PLLC was $885 then). Neither converted. Sid should confirm that `PC100` is retired. No orders in the CRM carry it.
