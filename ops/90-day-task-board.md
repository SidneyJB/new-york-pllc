# 90-day task board (execution)

**Source of truth:** [nypllc-90-day-execution-checklist.md](../nypllc-90-day-execution-checklist.md)  
**Decisions:** [decision-log.md](../decision-log.md)  
**Evidence:** [scorecards/](../scorecards/)

| Owner | Person | Role |
|-------|--------|------|
| Sid | Sidney Brodsky | Commercial decisions, partner sends, pricing, growth budget |
| Ops | Sidney Brodsky | Fulfillment, mail, subscriptions, billing exceptions |
| Agent | Technical operator (this workspace) | Exports, analysis, drafts, small builds |

Detail and system access: [p1-01-ownership.md](p1-01-ownership.md).

## Calendar (standing, ET)

Recorded October 20, 2026. These holds are the working calendar.

- **Partner sales:** Tuesday 10:00–12:00 and Thursday 10:00–12:00 (Sid). Oct 22 block: zero replies to the Oct 19 sends, so no conversations. Next touch Oct 26.
- **Scorecard:** Monday 9:00–9:30 (Sid + Agent). Next: October 27.
- **Billing scan:** first 15 minutes of each working day (Ops). From `PLLC-CRM/crm`: `npm run billing-scan`. Writes `crm/reports/billing-scan-YYYY-MM-DD/README.md`. Last run October 22: [billing scan](../../PLLC-CRM/crm/reports/billing-scan-2026-10-22/README.md).

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
- `npm run billing-scan` (daily exception scan → `reports/billing-scan-YYYY-MM-DD/`; pass `-- --date YYYY-MM-DD` to backfill)
- `npx tsx scripts/ra-renewal-card-check.ts`
- `npx tsx scripts/p1-04-preflight-export.ts` (P1-04 evidence → `reports/p1-04-YYYY-MM-DD/`)
- `npx tsx scripts/orders-attribution.ts` (attribution rollup; extend for cash linkage per P1-02)

**Analytics (manual):** [funnel-device-report.md](../docs/funnel-device-report.md)
