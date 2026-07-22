# NYSED Approval Time Tracker

Public page at `/nysed-approval-times`. Indexed; linked from footer, DIY guide, and FAQ.

## How to update numbers

From `PLLC-CRM/crm`:

```bash
npx tsx scripts/report-nysed-approval-times.ts --year 2026
```

Paste the **PUBLIC** JSON into [`data.ts`](./data.ts) (wait days only). Do not put sample sizes on the website.
