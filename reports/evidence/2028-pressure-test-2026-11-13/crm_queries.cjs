#!/usr/bin/env node
/**
 * Read-only CRM aggregates behind the Nov 13 2026 pressure test of the path-to-$1M plan.
 *
 * Run from the workspace root (pllc-business/):
 *   node new-york-pllc/reports/evidence/2028-pressure-test-2026-11-13/crm_queries.cjs [--out crm-queries-output.txt]
 *
 * It uses PLLC-CRM/crm/node_modules and PLLC-CRM/crm/.env(.local), like the P1-03 rebuild script.
 * The Postgres session is opened with default_transaction_read_only=on and the script stops if that is not set.
 * It prints counts and averages only: no client, order or entity names. The email-theme query reads
 * message text to count keyword matches and prints nothing but the counts.
 */
const path = require('path')
const fs = require('fs')

const crm = path.resolve(__dirname, '../../../../PLLC-CRM/crm')
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

// One profession per entity (its first license row), grouped the way the pressure test used.
const LIC = `lic AS (SELECT DISTINCT ON (l."pllcId") l."pllcId", lower(coalesce(l.profession,'')) AS p
  FROM "ProfessionalLicense" l WHERE l."pllcId" IS NOT NULL ORDER BY l."pllcId", l."createdAt")`
const GRP = `CASE
  WHEN lic.p IS NULL OR lic.p='' THEN 'unknown'
  WHEN lic.p ~ 'psychiatr' THEN '1 psych NP'
  WHEN lic.p ~ 'social work|mental health|counsel|marriage|family therap|creative arts|psycholog|psychoanal|behavior anal' THEN '1 core BH'
  WHEN lic.p ~ 'nurse|physician assist' THEN '2 NP/PA/RN other'
  WHEN lic.p ~ 'medicine|physician|medical' AND lic.p !~ 'veterin' THEN '3 medicine'
  WHEN lic.p ~ 'dent' THEN '3 dentistry'
  WHEN lic.p ~ 'physical therap|occupational|speech|chiro|acupunct|massage|podiat|optom|diet|nutrition|pharm|midwi|audiol' THEN '2 other health'
  WHEN lic.p ~ 'law|legal' THEN '4 law'
  ELSE '4 other non-health' END`
// Order timestamps are stored in UTC. Months and weeks below are Eastern time, like the scorecards.
const PAID = `o."isVmOnly"=false AND o."totalCents">0`
const REGION = `CASE
  WHEN z IS NULL OR z='' THEN 'unknown'
  WHEN state IS NOT NULL AND upper(state) NOT IN ('NY','NEW YORK') THEN 'out of state'
  WHEN left(z,3) IN ('100','101','102') THEN 'Manhattan'
  WHEN left(z,3) = '112' THEN 'Brooklyn'
  WHEN left(z,3) = '104' THEN 'Bronx'
  WHEN left(z,3) = '103' THEN 'Staten Island'
  WHEN left(z,3) IN ('110','111','113','114','116') THEN 'Queens / Nassau border'
  WHEN left(z,3) IN ('115','117','118','119') THEN 'Long Island'
  WHEN left(z,3) IN ('105','106','107','108') THEN 'Westchester'
  WHEN left(z,3) = '109' THEN 'Rockland / Orange'
  WHEN left(z,2) IN ('12','13','14') THEN 'Upstate'
  ELSE 'other' END`

// Keyword themes in customer email (subject + first 700 characters, to stay out of quoted replies). Rough counts.
const THEMES = {
  'credentialing / insurance panels / NPI / CAQH': String.raw`credential|caqh|in[- ]network|insurance panel|paneled|\mnpi\M|medicaid|medicare|headway|\malma\M`,
  'bank account': String.raw`bank account|business account|open an? account`,
  'tax / accountant / bookkeeping / payroll': String.raw`tax return|accountant|\mcpa\M|bookkeep|payroll|quarterly tax|1120|\mk-1\M|it-204`,
  's-corp': String.raw`s[- ]corp|2553|ct-6`,
  'address change / moved': String.raw`chang\w* (my|the|our) (business |mailing |pllc )?address|address change|new address|\mmoved\M|\mmoving\M`,
  'name change / amendment': String.raw`\mamend|name change|chang\w* (the|my|our) (pllc |business |company )?name|rename`,
  'good standing / certified copy': String.raw`good standing|certificate of status|certified cop`,
  'add member / partner / owner': String.raw`add\w* an? (new )?(member|partner|owner)|new partner|second owner|bring\w* on a partner`,
  'dissolve / close': String.raw`dissol|clos\w* (the|my|our) (pllc|business|practice|company)|shut\w* down`,
  'second entity / LLC / MSO': String.raw`second (pllc|entity|llc)|another (pllc|entity|llc)|additional (pllc|entity)|management company|\mmso\M`,
  'other states': String.raw`another state|other states|new jersey|connecticut|florida|multi[- ]state|out[- ]of[- ]state|foreign qualif`,
  'DBA / assumed name': String.raw`\mdba\M|assumed name|doing business as`,
  'operating agreement': String.raw`operating agreement`,
  'EIN letter / 147c': String.raw`ein letter|147c|cp ?575|ein confirmation`,
  'malpractice / liability insurance': String.raw`malpractice|liability insurance|professional liability`,
  'sales tax': String.raw`sales tax|certificate of authority`,
  'mail scan': String.raw`\mscan(ned|ning)?\M.{0,40}mail|mail.{0,40}\mscan`,
  'HIPAA / EHR': String.raw`hipaa|simple ?practice|therapynotes|\mehr\M`,
  'payment plan / cost concern': String.raw`payment plan|installment|afford|too expensive|discount|cheaper`,
}
const themeCols = Object.entries(THEMES)
  .map(([k, p]) => `count(DISTINCT cid) FILTER (WHERE t ~* '${p}') AS "${k}"`)
  .join(',\n  ')

const QUERIES = [
  ['A1. Credentialing engagements (no names)', `
    SELECT status, tier, "amountCents"/100 AS amount, ("paidAt" IS NOT NULL) AS paid, "createdAt"::date AS created
    FROM "CredentialingEngagement" ORDER BY "createdAt"`],
  ['A2. Credentialing events by type, and how many carry minutes', `
    SELECT type, count(*) AS events, count("minutesSpent") AS with_minutes, coalesce(sum("minutesSpent"),0) AS minutes
    FROM "CredentialingEvent" GROUP BY 1 ORDER BY 2 DESC`],
  ['A3. Credentialing payments', `SELECT count(*) AS payments, sum("amountCents")/100 AS total FROM "CredentialingPayment"`],
  ['A4. Checkout interest box since it went live (Aug 27 2026)', `
    SELECT count(*) AS orders, count(*) FILTER (WHERE o."caqhInterest") AS ticked
    FROM "Order" o WHERE ${PAID} AND o."orderCreatedAt">='2026-08-27'`],

  ['B1. Paid formation orders by month and profession group', `
    WITH ${LIC}, g AS (
      SELECT date_trunc('month', (o."orderCreatedAt" AT TIME ZONE 'UTC') AT TIME ZONE 'America/New_York') m, o."caqhInterest" ci, ${GRP} grp
      FROM "Order" o LEFT JOIN lic ON lic."pllcId"=o."pllcsId" WHERE ${PAID} AND o."orderCreatedAt">='2025-11-01')
    SELECT to_char(m,'YYYY-MM') AS month, count(*) AS orders,
      count(*) FILTER (WHERE grp='1 core BH') AS core_bh, count(*) FILTER (WHERE grp='1 psych NP') AS psych_np,
      count(*) FILTER (WHERE grp='2 NP/PA/RN other') AS np_pa_rn, count(*) FILTER (WHERE grp='3 medicine') AS medicine,
      count(*) FILTER (WHERE grp='3 dentistry') AS dentistry, count(*) FILTER (WHERE grp='2 other health') AS other_health,
      count(*) FILTER (WHERE grp LIKE '4%') AS non_health, count(*) FILTER (WHERE grp='unknown') AS unknown,
      count(*) FILTER (WHERE ci) AS interest_box
    FROM g GROUP BY 1 ORDER BY 1`],
  ['B2. Paid formation orders by week (ET, Monday start), since Sep 2026', `
    SELECT to_char(date_trunc('week', (o."orderCreatedAt" AT TIME ZONE 'UTC') AT TIME ZONE 'America/New_York'),'YYYY-MM-DD') AS week, count(*) AS orders
    FROM "Order" o WHERE ${PAID} AND o."orderCreatedAt">='2026-09-01' GROUP BY 1 ORDER BY 1`],
  ['B3. Entities by profession group and stage', `
    WITH ${LIC}
    SELECT ${GRP} AS grp, count(*) AS total,
      count(*) FILTER (WHERE p."formationDocumentApprovedAt" IS NOT NULL OR p."formationStatus" IN
        ('FORMATION_COMPLETE','PUBLICATION_IN_PROGRESS','PUBLICATION_COMPLETE','CERT_OF_PUBLICATION_FILED','CERT_OF_PUBLICATION_APPROVED','S_CORP_DOCS_FAXED','S_CORP_DOCS_SENT_FOR_SIGNATURE')) AS past_dos,
      count(*) FILTER (WHERE p.ein IS NOT NULL AND p.ein<>'') AS has_ein,
      count(*) FILTER (WHERE p."formationStatus"='FORMATION_COMPLETE') AS complete
    FROM "Pllc" p LEFT JOIN lic ON lic."pllcId"=p.id
    WHERE p.name NOT ILIKE '%E2E TEST%' AND coalesce(p."formationStatus",'')<>'CANCELLED_AND_REFUNDED'
    GROUP BY 1 ORDER BY 1`],
  ['B4. Entities by pipeline status', `
    SELECT "formationStatus" AS status, count(*) AS entities FROM "Pllc" WHERE name NOT ILIKE '%E2E TEST%' GROUP BY 1 ORDER BY 2 DESC`],
  ['B5. Days from order to DOS filing and to completion, by order month (medians)', `
    SELECT to_char(date_trunc('month', p."orderDate"),'YYYY-MM') AS month, count(*) AS entities, count(p."formationDocumentFiledAt") AS filed,
      round(percentile_cont(0.5) WITHIN GROUP (ORDER BY extract(epoch from (p."formationDocumentFiledAt"-p."orderDate"))/86400)::numeric,0) AS med_days_to_dos_filed,
      count(p."completedAt") AS completed,
      round(percentile_cont(0.5) WITHIN GROUP (ORDER BY extract(epoch from (p."completedAt"-p."orderDate"))/86400)::numeric,0) AS med_days_to_complete
    FROM "Pllc" p WHERE p."orderDate">='2025-11-01' AND p.name NOT ILIKE '%E2E TEST%' GROUP BY 1 ORDER BY 1`],
  ['B6. Owners per entity, orders since Apr 2026', `
    WITH p AS (SELECT (SELECT count(*) FROM "PllcOwner" w WHERE w."pllcId"=p.id) AS owners FROM "Pllc" p
      WHERE p."orderDate">='2026-04-01' AND p.name NOT ILIKE '%E2E TEST%' AND coalesce(p."formationStatus",'')<>'CANCELLED_AND_REFUNDED')
    SELECT least(owners,4) AS owners_capped_at_4, count(*) AS entities, round(100.0*count(*)/sum(count(*)) over (),1) AS pct FROM p GROUP BY 1 ORDER BY 1`],
  ['B7. Customers with two or more formation orders', `
    SELECT count(*) FILTER (WHERE n>=2) AS repeat_customers, count(*) AS customers
    FROM (SELECT o."customerId", count(*) n FROM "Order" o WHERE ${PAID} AND o."customerId" IS NOT NULL GROUP BY 1) t`],

  ['C1. Where customers live, paid formation orders since Apr 2026', `
    WITH o AS (SELECT o."isPaymentPlan" pp, o."totalCents" t, c.state, left(regexp_replace(coalesce(c.zip,''),'[^0-9]','','g'),5) z
      FROM "Order" o LEFT JOIN "Customer" c ON c.id=o."customerId" WHERE ${PAID} AND o."orderCreatedAt">='2026-04-01')
    SELECT ${REGION} AS region, count(*) AS orders, round(100.0*count(*)/sum(count(*)) over (),1) AS pct,
      round(100.0*count(*) FILTER (WHERE pp)/count(*)) AS plan_pct, round(avg(t)/100) AS avg_total
    FROM o GROUP BY 1 ORDER BY 2 DESC`],
  ['C2. PLLC order size and payment-plan share by month', `
    SELECT to_char(date_trunc('month', (o."orderCreatedAt" AT TIME ZONE 'UTC') AT TIME ZONE 'America/New_York'),'YYYY-MM') AS month, count(*) AS orders,
      round(avg(o."totalCents")/100) AS avg_total, round(100.0*count(*) FILTER (WHERE o."isPaymentPlan")/count(*)) AS plan_pct,
      count(*) FILTER (WHERE o."totalCents">=100000) AS over_1000
    FROM "Order" o WHERE ${PAID} AND o."entityType"='PLLC' GROUP BY 1 ORDER BY 1`],
  ['C3. PLLC order totals since Apr 2026, in bands', `
    SELECT width_bucket(o."totalCents"/100.0, 700, 1500, 8) AS band, min(o."totalCents")/100 AS low, max(o."totalCents")/100 AS high, count(*) AS orders
    FROM "Order" o WHERE ${PAID} AND o."entityType"='PLLC' AND o."orderCreatedAt">='2026-04-01' GROUP BY 1 ORDER BY 1`],
  ['C4. Orders since Apr 2026 by offer (client-specific manual offers collapsed to their type)', `
    SELECT coalesce(o."orderKind",'-') AS kind, split_part(o."offerName",' — ',1) AS offer, count(*) AS orders, round(avg(o."totalCents")/100) AS avg_total
    FROM "Order" o WHERE o."orderCreatedAt">='2026-04-01' AND o."totalCents">0 GROUP BY 1,2 ORDER BY 3 DESC LIMIT 25`],
  ['C5. PLLC orders Mar-Oct 2026 by profession group: payment-plan share, order size, attach rates (percent)', `
    WITH ${LIC}, o AS (
      SELECT o."pllcsId" pid, o."isPaymentPlan" pp, o."totalCents" t, o."orderCreatedAt" d, o."caqhInterest" ci, ${GRP} grp
      FROM "Order" o LEFT JOIN lic ON lic."pllcId"=o."pllcsId"
      WHERE ${PAID} AND o."entityType"='PLLC' AND o."orderCreatedAt">='2026-03-01' AND o."orderCreatedAt"<'2026-11-01')
    SELECT grp, count(*) AS orders, round(100.0*count(*) FILTER (WHERE pp)/count(*)) AS plan_pct, round(avg(t)/100) AS avg_total,
      round(100.0*count(*) FILTER (WHERE EXISTS (SELECT 1 FROM "Subscription" s WHERE s."pllcId"=o.pid AND s."subscriptionType"='VIRTUAL_MAIL' AND s."stripeSubscriptionId" IS NOT NULL))/count(*)) AS mail_pct,
      round(100.0*count(*) FILTER (WHERE EXISTS (SELECT 1 FROM "PllcSCorpDesignation" x WHERE x."pllcId"=o.pid))/count(*)) AS scorp_pct,
      round(100.0*count(*) FILTER (WHERE EXISTS (SELECT 1 FROM "PllcDba" x WHERE x."pllcId"=o.pid))/count(*)) AS dba_pct,
      round(100.0*count(*) FILTER (WHERE ci AND d>='2026-08-27')/nullif(count(*) FILTER (WHERE d>='2026-08-27'),0)) AS interest_box_pct
    FROM o GROUP BY 1 ORDER BY 1`],
  ['C6. Same orders by how they paid', `
    WITH o AS (SELECT o."pllcsId" pid, o."isPaymentPlan" pp FROM "Order" o
      WHERE ${PAID} AND o."entityType"='PLLC' AND o."orderCreatedAt">='2026-03-01' AND o."orderCreatedAt"<'2026-11-01')
    SELECT CASE WHEN pp THEN 'payment plan' ELSE 'paid in full' END AS how, count(*) AS orders,
      round(100.0*count(*) FILTER (WHERE EXISTS (SELECT 1 FROM "Subscription" s WHERE s."pllcId"=o.pid AND s."subscriptionType"='VIRTUAL_MAIL' AND s."stripeSubscriptionId" IS NOT NULL))/count(*)) AS mail_pct,
      round(100.0*count(*) FILTER (WHERE EXISTS (SELECT 1 FROM "PllcSCorpDesignation" x WHERE x."pllcId"=o.pid))/count(*)) AS scorp_pct
    FROM o GROUP BY 1`],

  ['D1. Add-ons sold by month', `
    SELECT m AS month, sum(sc) AS scorp, sum(dba) AS dba FROM (
      SELECT to_char(date_trunc('month',"soldAt"),'YYYY-MM') m, 1 sc, 0 dba FROM "PllcSCorpDesignation"
      UNION ALL SELECT to_char(date_trunc('month',"soldAt"),'YYYY-MM'), 0, 1 FROM "PllcDba") t WHERE m>='2026-04' GROUP BY 1 ORDER BY 1`],
  ['D2. Certificate of Change and amendment filings queued (live, not dry runs)', `
    SELECT to_char(date_trunc('month',"submittedAt"),'YYYY-MM') AS month, 'change' AS kind, count(*) AS filings FROM "CertChangeFilingQueue" WHERE "dryRun"=false GROUP BY 1
    UNION ALL SELECT to_char(date_trunc('month',"submittedAt"),'YYYY-MM'), 'amendment', count(*) FROM "CertAmendmentFilingQueue" WHERE "dryRun"=false GROUP BY 1 ORDER BY 1,2`],
  ['D3. Subscriptions by type and status', `
    SELECT "subscriptionType" AS type, coalesce("stripeStatus",status) AS status, count(*) AS subs, round(avg("amountCents")/100) AS avg_amount
    FROM "Subscription" GROUP BY 1,2 ORDER BY 1,3 DESC`],
  ['D4. Direct RA: first billing date by quarter (trialing or active)', `
    SELECT to_char(date_trunc('quarter',"billingStartsAt"),'YYYY-"Q"Q') AS quarter, count(*) AS subs
    FROM "Subscription" WHERE "subscriptionType"::text ILIKE '%REGISTERED%' AND coalesce("stripeStatus",status) IN ('trialing','active') GROUP BY 1 ORDER BY 1`],

  ['E1. Metro partner RA clients by status', `SELECT status, count(*) AS clients FROM "PartnerClient" GROUP BY 1 ORDER BY 2 DESC`],
  ['E2. Metro partner RA clients by start month', `
    SELECT to_char(date_trunc('month',"startDate"),'YYYY-MM') AS month, count(*) AS clients, count(*) FILTER (WHERE status::text IN ('ACTIVE','TRIALING')) AS live
    FROM "PartnerClient" WHERE "startDate">='2025-07-01' GROUP BY 1 ORDER BY 1`],
  ['E3. Metro RA renewals due, by quarter (live clients)', `
    SELECT to_char(date_trunc('quarter',"renewalDate"),'YYYY-"Q"Q') AS quarter, count(*) AS clients
    FROM "PartnerClient" WHERE status::text IN ('ACTIVE','TRIALING') AND "renewalDate" IS NOT NULL GROUP BY 1 ORDER BY 1`],
  ['E4. Metro RA payments by month, and our share', `
    SELECT to_char(date_trunc('month',"paidAt"),'YYYY-MM') AS month, count(*) AS payments, round(sum("amountCents")/100.0) AS gross, round(sum("platformFeeCents")/100.0) AS our_share
    FROM "PartnerClientPayment" WHERE "paidAt">='2026-01-01' GROUP BY 1 ORDER BY 1`],
  ['E5. Metro RA invoices sent and paid, by send month', `
    SELECT to_char(date_trunc('month',"sentAt"),'YYYY-MM') AS month, count(*) AS sent, count(*) FILTER (WHERE "paidAt" IS NOT NULL) AS paid,
      count(*) FILTER (WHERE status::text='VOID' OR "voidedAt" IS NOT NULL) AS voided
    FROM "PartnerClientInvoiceCycle" WHERE "sentAt">='2026-01-01' GROUP BY 1 ORDER BY 1`],
  ['E6. Metro mail clients by status', `SELECT status, count(*) AS clients FROM "MetroVmClient" GROUP BY 1`],

  ['F1. What customers ask about by email, last 12 months (distinct customers; keyword match on subject + first 700 characters)', `
    WITH e AS (
      SELECT "customerId" cid, lower(subject || ' ' || left(coalesce("bodyPlain",snippet,''),700)) t
      FROM "InboundEmail" WHERE "customerId" IS NOT NULL AND "receivedAt" >= now() - interval '12 months')
    SELECT count(*) AS emails, count(DISTINCT cid) AS customers_emailing,
  ${themeCols}
    FROM e`, 'vertical'],
]

;(async () => {
  const out = []
  const say = (s) => { out.push(s); console.log(s) }
  const ro = await pool.query('SHOW default_transaction_read_only')
  if (ro.rows[0].default_transaction_read_only !== 'on') { console.error('Session is not read-only. Stopping.'); process.exit(1) }
  say(`CRM read-only aggregates, pulled ${new Date().toISOString()} (session default_transaction_read_only=on)`)
  for (const [label, sql, mode] of QUERIES) {
    say('\n## ' + label)
    try {
      const r = await pool.query(sql)
      if (mode === 'vertical') {
        for (const row of r.rows) for (const [k, v] of Object.entries(row)) say(String(v).padStart(7) + '  ' + k)
      } else if (r.rows.length) {
        const cols = Object.keys(r.rows[0])
        const cell = (v) => (v === null ? '-' : v instanceof Date ? v.toISOString().slice(0, 10) : String(v))
        const w = cols.map((c) => Math.max(c.length, ...r.rows.map((x) => cell(x[c]).length)))
        say(cols.map((c, i) => c.padEnd(w[i])).join('  '))
        for (const row of r.rows) say(cols.map((c, i) => cell(row[c]).padEnd(w[i])).join('  '))
      } else say('(no rows)')
    } catch (e) { say('ERROR: ' + e.message) }
  }
  await pool.end()
  const i = process.argv.indexOf('--out')
  if (i > 0 && process.argv[i + 1]) fs.writeFileSync(path.join(__dirname, path.basename(process.argv[i + 1])), out.join('\n') + '\n')
})()
