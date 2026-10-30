# November 1 dual memo (skeleton Oct 21; October read Oct 29, 2026)

**Status:** October read through **Oct 28** is filled in below. Oct 29–31 add about 3 days. Re-run the two pulls on Nov 1 and change a figure only if it moves the verdict. **Sid decides.** This file does not change the bid.

## October read, Oct 29 (Agent)

Pull: [ads-pull-2026-10-29-nov1/](../ads-pull-2026-10-29-nov1/) (`daily.csv`, `campaigns-oct.csv`), plus CRM `orders-attribution.ts --monthly` (uses `orderCreatedAt`, excludes VM-only and tests). Portfolio tCPA is confirmed at **$105** via the API.

| Window | Spend | Ads conv | Ads CPA | CRM orders (Google click id) | CRM orders (all) |
|---|---:|---:|---:|---:|---:|
| September | $2,657 | 22.0 | $121 | 20 | 52 |
| **Oct 1–28** | **$3,401** | **33.0** | **$103** | **34** (through Oct 29) | **62** |
| Last 14d (Oct 15–28) | $1,862 | 14.0 | $133 | — | — |
| Last 7d (Oct 22–28) | $1,059 | 5.0 | $212 | — | — |

By campaign, Oct 1–28:
- Sales-Search-1: $2,737 and 29 conversions.
- `01_Core_Exact_NY`: $464 and 3 conversions.
- `03_ForeignQual_US`: $200 and 1 conversion.

Notes:
- **CRM-side Google CPA ≈ $100** ($3,401 ÷ 34), within about 3% of Ads. That's the best Google month since click-id capture went live. Total October orders, **62**, already beat September's 52.
- **The last-7-day CPA of $212 is mostly lag.** Conversions take days to land and the window is still open. Treat it as a watch item, not a signal. If the Nov 1 re-pull still shows CPA above $150 for Oct 22–31, flag it at the Nov 9 review.

### Verdict by branch

- **Order count:** about 34 Google orders a month, against the legacy 50–60 stretch. That's **not a scale case**. It's a big improvement on Aug–Sep (16 and 20), though, so **hold, not cap**.
- **Profit:** about $519 before ads minus about $100 CPA leaves **about $419 per Google order before labor**. That's a wide margin. The acquisition allowance is still unset, so this branch **can't justify a bid increase**. Holding is supported.
- **Policy:** the three `01` ads (`816213581518`, `816213581680`, `816286167770`) are **still DISAPPROVED as of Oct 29**. No appeal is recorded. Formation-Core `816286133015` is APPROVED_LIMITED.

**Decision (Sid, Oct 29): hold portfolio tCPA at $105.** Logged in [decision-log.md](../decision-log.md). Make no structural change before the Nov 15–Dec 1 freeze. Don't run a bounded experiment until P1-03 sets the allowance. Filing the three `01` appeals is the only account action, and it's a UI action for Sid.

---

*Original Oct 21 skeleton follows.*

**Rule:** [decision log, October 16](../decision-log.md). Legacy Google **order-count** branch and a **profit / marginal CPA** branch, side by side. A $200–$220 acquisition allowance is a candidate, not an approved ceiling.

**Hold going in:** portfolio tCPA **$105**.

## 1. Order-count branch

Source: [P1-09 policy memo](../ads-pull-2026-10-20-p1-09/P1-09-policy-memo.md), pull through October 20. Not a full October.

| Window | Spend | Click-attributed conv | CPA |
|---|---:|---:|---:|
| 7d (Oct 14–20) | $797 | 10.0 | $80 |
| 30d (Sep 21–Oct 20) | $3,062 | 29.0 | $106 |
| 60d (Aug 22–Oct 20) | $3,078 | 30.0 | $103 |

30-day Spiffy Purchase **29** vs CRM orders with `gclid` **28** (+3.6%). Inside the ±10% band. Do not import a second primary conversion.

The legacy “50–60 Google orders a month” path is **not** what this 30-day read shows (29 primary conversions). `03` is immature ($190 / 0 conversions in that 30 days). Final October order count is **blank until the month closes**.

**Skeleton verdict:** no tCPA change on this branch until the October window is complete. The current read is closer to a cap conversation than to a scale conversation. Sid confirms after October 31.

## 2. Profit branch

Source: [P1-03 trace](../../PLLC-CRM/crm/reports/p1-03-2026-10-21/TRACE.md), October 21.

| Case | Contribution before ads and labor |
|---|---:|
| Finished $885 domestic PLLC, paid upfront | **$514** |
| Same order, four installments, all collected | **$513** |
| $885 referral order plus a $75 payout | **$439** |
| $860 referral order (discount already in the price) plus a $75 payout | **$415** |
| Finished-order average (57 orders, includes lower-priced LLCs) | **$489** |
| April 1–October 15 book average, from the October 18 scorecard | **$519** before ads, about **$468** after Google spend spread across every order |

30-day CPA **$106** against a **$514** retail PLLC leaves about **$408** before labor, overhead, and any cash the business must keep. Labor is not on the order, so this is not an audited margin.

The checklist’s **$200–$220** acquisition allowance is still a candidate. P1-03 has not set it. Do not raise tCPA to spend into that range from this skeleton.

**Skeleton verdict:** $106 CPA is inside a $514 contribution by a wide gap **before labor**. That supports holding $105. It does not support a bid increase, and it does not by itself require a cut. The profit verdict waits on the closed October spend and on whether Sid treats $514 or a lower labor-loaded number as the floor.

## 3. Policy branch

Source: P1-09 memo, plus [self-block check](../ads-pull-2026-10-21-self-block/SELF-BLOCK.md) on October 21.

| Item | State on October 21 |
|---|---|
| Disapproved enabled `01` ads `816213581518`, `816213581680`, `816286167770` | Still the appeal path in the P1-09 memo. Appeals are a Sid UI action. Not recorded as submitted here. |
| Attorneys ad group | Stays paused. Do not churn copy. |
| Self-block | **Pass.** 0 of 48 / 31 / 39 / 39. Short phrase leftovers `vs` and `$0` did not hit an enabled keyword. August 4 abbreviations are not back. |
| `03` | Immature. Not a demand test. |
| Microsoft Advertising | Still blocked. Address mismatch, case 7109261224. Two attempts left. No second account. `msclkid` is not a live spend source. |

**Skeleton verdict:** policy is unresolved until the three `01` appeals are filed and Google answers. Self-block is not the blocker. Hold $105 while appeals are outstanding. Formation-Core RSA `816286133015` was unpaused October 21 and is ENABLED, still APPROVED_LIMITED.

## What November 1 still needs

1. October 1–31 spend, conversions, and CRM orders with a click id.
2. Sid’s call on the order-count branch (scale, hold, or cap) next to the profit branch.
3. Appeal confirmation ids, if filed, in [google_ads_changes.md](../google_ads_changes.md).
4. Whether the acquisition allowance stays unset. If it is still unset, the profit branch can only say “CPA is far under $514 before labor,” not “CPA cleared the allowance.”
