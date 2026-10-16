# 90-day task board (execution)

**Source of truth:** [nypllc-90-day-execution-checklist.md](../nypllc-90-day-execution-checklist.md)  
**Decisions:** [decision-log.md](../decision-log.md)  
**Evidence:** [scorecards/](../scorecards/)

| Owner | Role |
|-------|------|
| Sid | Commercial decisions, partner sends, pricing, growth budget |
| Ops | Fulfillment, mail, subscriptions, billing exceptions |
| Agent | Exports, analysis, drafts, small builds |

## Calendar (standing)

- Two **partner-sales** blocks / week (Sid)
- **Scorecard** review 30 min / week (Sid + Agent)
- Daily billing scan ~15 min (Ops)

## Package status

Track checkbox completion in the checklist file. Link evidence paths in the checklist or in weekly scorecards.

| Period | Dates | Exit standard |
|--------|-------|----------------|
| P1 | Oct 16–29 | Economics trustworthy enough; billing owned; partners underway; price test designed |
| P2 | Oct 30–Nov 29 | $985 test live; partner handoffs; VM measured |
| P3 | Nov 30–Jan 13 | Day 90 review + Q1 plan |

## Runbooks

- [Customer interview script](../docs/customer-interview-script.md)
- [Partner first-case playbook](../docs/partner-first-case-playbook.md)
- [$985 price test design](../docs/price-test-985.md)

## CRM export scripts (P1-02 / scorecard)

Run from `PLLC-CRM/crm` with production `DATABASE_URL`:

- `npx tsx scripts/baseline-financial-export.ts`
- `npx tsx scripts/weekly-scorecard-export.ts`
- `npx tsx scripts/report-vm-ra-overlap.ts`
- `npx tsx scripts/report-productive-partners.ts`
- `npx tsx scripts/ra-renewal-card-check.ts`
- `npx tsx scripts/orders-attribution.ts` (attribution rollup; extend for cash linkage per P1-02)

**Analytics (manual):** [funnel-device-report.md](../docs/funnel-device-report.md)
