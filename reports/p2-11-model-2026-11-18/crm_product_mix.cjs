#!/usr/bin/env node
/**
 * Read-only CRM aggregates behind the P2-11 second pass (Nov 18 2026): product mix, contribution per
 * product, payment-plan timing and order-to-filing lags (for the cash view).
 *
 * Run from the workspace root (pllc-business/):
 *   node new-york-pllc/reports/p2-11-model-2026-11-18/crm_product_mix.cjs [--out crm-product-mix-output.txt]
 *
 * Uses PLLC-CRM/crm/node_modules and PLLC-CRM/crm/.env(.local), like the Nov 13 crm_queries.cjs.
 * The Postgres session is opened with default_transaction_read_only=on and the script stops if that is not set.
 * Prints counts, sums and averages only: no client, order or entity names.
 *
 * Product rules (same as crm/lib/pricing): a formation order is any non-VM-only order with total > 0 and no
 * orderKind (orderKind marks non-formation services such as ra_change_coc). COGS is the order's stored
 * serviceCogsCents snapshot; card fee 3% + $0.30 (PRICING.STRIPE_FEES); bad debt 0.5% (P1-03).
 */
const path = require('path')
const fs = require('fs')

const crm = path.resolve(__dirname, '../../../PLLC-CRM/crm')
const req = require('module').createRequire(path.join(crm, 'package.json'))
const dotenv = req('dotenv')
const pg = req('pg')
dotenv.config({ path: path.join(crm, '.env'), quiet: true })
dotenv.config({ path: path.join(crm, '.env.local'), override: true, quiet: true })

const cs = process.env.DATABASE_URL
const pool = new pg.Pool({
  connectionString: cs,
  ssl: /render\.com|neon|supabase|amazonaws/.test(cs || '') ? { rejectUnauthorized: false } : undefined,
  options: '-c default_transaction_read_only=on',
})

const OUT = []
const say = (s = '') => { OUT.push(s); console.log(s) }

const PROD = `CASE
  WHEN o."orderKind" IS NOT NULL THEN 'z non-formation service'
  WHEN coalesce(p."formationJurisdiction"::text,'NY') <> 'NY' THEN '5 out-of-state formation'
  WHEN p."isForeign" AND o."entityType"='PLLC' THEN '3 foreign PLLC into NY'
  WHEN p."isForeign" THEN '4 foreign LLC/PC into NY'
  WHEN o."entityType"='LLC' THEN '2 NY LLC'
  WHEN o."entityType"='PC' THEN '2b NY PC'
  ELSE '1 NY PLLC' END`
const BASE = `FROM "Order" o LEFT JOIN "Pllc" p ON p.id=o."pllcsId"
  WHERE o."isVmOnly"=false AND o."totalCents">0`
const ET = `(o."orderCreatedAt" AT TIME ZONE 'America/New_York')`

function table(rows) {
  if (!rows.length) { say('  (none)'); return }
  const cols = Object.keys(rows[0])
  const w = cols.map(c => Math.max(c.length, ...rows.map(r => String(r[c] ?? '').length)))
  say('  ' + cols.map((c, i) => c.padEnd(w[i])).join('  '))
  for (const r of rows) say('  ' + cols.map((c, i) => String(r[c] ?? '').padEnd(w[i])).join('  '))
}

async function main() {
  const c = await pool.connect()
  const ro = (await c.query('SHOW default_transaction_read_only')).rows[0].default_transaction_read_only
  if (ro !== 'on') throw new Error('session is not read-only; stopping')
  const q = async (sql) => (await c.query(sql)).rows

  say(`Pulled ${new Date().toISOString()} (read-only session)`)
  say()
  say('A. Orders by product and Eastern-time month, Nov 2025 onward (partner = b2bPartnerId set)')
  table(await q(`SELECT to_char(${ET},'YYYY-MM') m,
    count(*) FILTER (WHERE ${PROD}='1 NY PLLC') ny_pllc,
    count(*) FILTER (WHERE ${PROD}='2 NY LLC') ny_llc,
    count(*) FILTER (WHERE ${PROD}='2b NY PC') ny_pc,
    count(*) FILTER (WHERE ${PROD}='3 foreign PLLC into NY') foreign_pllc,
    count(*) FILTER (WHERE ${PROD}='4 foreign LLC/PC into NY') foreign_llc_pc,
    count(*) FILTER (WHERE ${PROD}='5 out-of-state formation') out_of_state,
    count(*) FILTER (WHERE ${PROD} LIKE 'z%') non_formation,
    count(*) FILTER (WHERE ${PROD} NOT LIKE 'z%') formations,
    count(*) FILTER (WHERE ${PROD} NOT LIKE 'z%' AND o."b2bPartnerId" IS NOT NULL) partner,
    count(*) FILTER (WHERE ${PROD} NOT LIKE 'z%' AND o."isPaymentPlan") on_plan
    ${BASE} AND o."orderCreatedAt" >= '2025-11-01T04:00:00Z' GROUP BY 1 ORDER BY 1`))

  say()
  say('B. Mix and contribution per product, orders Apr 1 - Nov 18 2026 (Eastern). Net revenue includes add-ons')
  say('   (S-corp, DBA, expedite) bought on the order. Contribution = net revenue - COGS - 3% - $0.30 - 0.5% bad debt.')
  table(await q(`WITH x AS (SELECT ${PROD} prod, o.*, (o."totalCents"-o."formationRefundedCents") net ${BASE}
      AND o."orderCreatedAt" >= '2026-04-01T04:00:00Z' AND o."orderCreatedAt" < '2026-11-19T05:00:00Z')
    SELECT prod, count(*) n,
      round(100.0*count(*)/sum(count(*)) FILTER (WHERE prod NOT LIKE 'z%') OVER (), 1) share_pct,
      count(*) FILTER (WHERE "b2bPartnerId" IS NOT NULL) partner,
      round(avg(net)/100.0) net_rev, round(avg("serviceCogsCents")/100.0) cogs,
      count("serviceCogsCents") cogs_snapshots,
      round(avg(net*(1-0.03-0.005) - 30 - coalesce("serviceCogsCents",0))/100.0) contribution,
      round(100.0*avg(CASE WHEN "isPaymentPlan" THEN 1 ELSE 0 END)) plan_pct
    FROM x GROUP BY 1 ORDER BY 1`))

  say()
  say('B2. Same, retail NY PLLC only (no partner), Apr 1 - Oct 31 2026: reconciliation to the model ($514 + S-corp add-on = $547)')
  table(await q(`SELECT count(*) n, round(avg(o."totalCents"-o."formationRefundedCents")/100.0) net_rev,
      round(avg(o."serviceCogsCents")/100.0) cogs,
      round(avg((o."totalCents"-o."formationRefundedCents")*(1-0.035) - 30 - coalesce(o."serviceCogsCents",0))/100.0) contribution
    ${BASE} AND ${PROD}='1 NY PLLC' AND o."b2bPartnerId" IS NULL
      AND o."orderCreatedAt" >= '2026-04-01T04:00:00Z' AND o."orderCreatedAt" < '2026-11-01T04:00:00Z'`))

  say()
  say('C. Payment plans, formation orders Apr 1 - Oct 31 2026: plan length and share')
  table(await q(`SELECT coalesce(o."paymentPlanTotalPayments"::text,'pay in full') payments, count(*) n,
      round(avg(o."totalCents")/100.0) avg_total
    ${BASE} AND o."orderKind" IS NULL
      AND o."orderCreatedAt" >= '2026-04-01T04:00:00Z' AND o."orderCreatedAt" < '2026-11-01T04:00:00Z'
    GROUP BY 1 ORDER BY 1`))

  say()
  say('C2. Installment timing, plan orders Apr 1 - Jul 31 2026 (all four due dates have passed): payment n, days after order')
  table(await q(`WITH pp AS (SELECT o.id, o."orderCreatedAt" t0, p."amountPaidCents" a, p."createdAt" pt,
        row_number() OVER (PARTITION BY o.id ORDER BY p."createdAt") rn
      FROM "Order" o JOIN "Payment" p ON p."orderId"=o.id
      WHERE o."isPaymentPlan" AND o."isVmOnly"=false AND o."orderKind" IS NULL
        AND o."orderCreatedAt" >= '2026-04-01T04:00:00Z' AND o."orderCreatedAt" < '2026-08-01T04:00:00Z')
    SELECT rn payment_n, count(*) n, count(*) FILTER (WHERE a>0) paid, round(avg(a)/100.0) avg_paid,
      round(percentile_cont(0.5) WITHIN GROUP (ORDER BY extract(epoch FROM pt-t0)/86400)::numeric,1) median_days,
      round(sum(a)/100.0) sum_paid
    FROM pp GROUP BY 1 ORDER BY 1`))
  table(await q(`SELECT count(*) plan_orders, round(sum(o."totalCents")/100.0) billed,
      round((SELECT sum(p."amountPaidCents") FROM "Payment" p JOIN "Order" o2 ON o2.id=p."orderId"
        WHERE o2."isPaymentPlan" AND o2."isVmOnly"=false AND o2."orderKind" IS NULL
        AND o2."orderCreatedAt" >= '2026-04-01T04:00:00Z' AND o2."orderCreatedAt" < '2026-08-01T04:00:00Z')/100.0) collected
    FROM "Order" o WHERE o."isPaymentPlan" AND o."isVmOnly"=false AND o."orderKind" IS NULL
      AND o."orderCreatedAt" >= '2026-04-01T04:00:00Z' AND o."orderCreatedAt" < '2026-08-01T04:00:00Z'`))

  say()
  say('D. Order to filing (when the state fees and publication are paid), formation orders by order quarter')
  table(await q(`SELECT to_char(date_trunc('quarter', ${ET}),'YYYY-"Q"Q') q, count(*) n,
      count(p."formationDocumentFiledAt") dos_filed,
      round(percentile_cont(0.5) WITHIN GROUP (ORDER BY extract(epoch FROM p."formationDocumentFiledAt"-o."orderCreatedAt")/86400)::numeric) dos_median_days,
      count(p."legalNoticeSentAt") notice_sent,
      round(percentile_cont(0.5) WITHIN GROUP (ORDER BY extract(epoch FROM p."legalNoticeSentAt"-o."orderCreatedAt")/86400)::numeric) notice_median_days,
      count(p."completedAt") completed,
      round(percentile_cont(0.5) WITHIN GROUP (ORDER BY extract(epoch FROM p."completedAt"-o."orderCreatedAt")/86400)::numeric) completed_median_days
    ${BASE} AND o."orderKind" IS NULL AND o."orderCreatedAt" >= '2025-10-01T04:00:00Z'
    GROUP BY 1 ORDER BY 1`))
  say('   Medians are over filed entities only, so recent quarters (still filing) read short.')

  say()
  say('E. Partner payouts by status (timing from accrual to paid)')
  table(await q(`SELECT status::text, count(*) n, round(sum("amountCents")/100.0) total,
      round(percentile_cont(0.5) WITHIN GROUP (ORDER BY extract(epoch FROM "paidAt"-"triggerAt")/86400)::numeric) median_days_to_paid
    FROM b2b_partner_payouts GROUP BY 1 ORDER BY 1`))

  say()
  say('F. Formation groups (multi-entity orders, MSO pairs)')
  table(await q(`SELECT g.kind::text, count(DISTINCT g.id) groups, count(p.id) entities
    FROM "FormationGroup" g LEFT JOIN "Pllc" p ON p."formationGroupId"=g.id GROUP BY 1`))

  c.release()
  await pool.end()
}

main().then(() => {
  const i = process.argv.indexOf('--out')
  if (i >= 0) fs.writeFileSync(path.join(__dirname, path.basename(process.argv[i + 1])), OUT.join('\n') + '\n')
}).catch(e => { console.error(e.message); process.exit(1) })
