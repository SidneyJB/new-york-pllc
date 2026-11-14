#!/usr/bin/env node
/**
 * P1-03 rebuild (Nov 13 2026). READ-ONLY. Prints aggregates only: no names, emails, order ids.
 *
 *   node new-york-pllc/reports/evidence/p1-03-unit-economics-2026-11-13/p1-03-rebuild.cjs [--since 2026-04-01] [--until 2026-11-01] [--trace [--trace-month 2026-06] [--trace-profession "Marriage and Family Therapy"] [--trace-plan upfront|four]]
 *
 * - Uses the CRM's node_modules and crm/.env (DATABASE_URL, STRIPE_SECRET_KEY = restricted rk_live_ read key).
 * - Postgres session runs with default_transaction_read_only=on, so writes are refused by the server.
 * - Stripe: charges.retrieve / balanceTransactions.retrieve only (with --trace).
 * - Order population matches the Finances tab: no VM-only, total > 0, no test customer (Sidney Brodsky),
 *   no CANCELLED_AND_REFUNDED PLLC, no FINANCES_EXCLUDED_PLLC_IDS, no e2e test orderKind.
 * - Card fee estimate = round(2.9% x payment) + $0.30 per collected payment (Stripe's standard rate; Oct 30
 *   check showed actual = estimate). Filing cost = Order.serviceCogsCents (null -> live schedule, flagged).
 * - Labor is $0 by definition (decision log Nov 9).
 */
const path = require('path')
const CRM = path.resolve(__dirname, '../../../../PLLC-CRM/crm')
const req = require('module').createRequire(path.join(CRM, 'package.json'))
req('dotenv').config({ path: path.join(CRM, '.env'), quiet: true })
const pg = req('pg')
const fs = require('fs')

const arg = (n, d) => (process.argv.includes(n) ? process.argv[process.argv.indexOf(n) + 1] : d)
const SINCE = arg('--since', '2026-04-01')
const UNTIL = arg('--until', '2026-11-01')
const TRACE = process.argv.includes('--trace')

// Excluded PLLC ids, read from the CRM source so this stays in sync.
const exclSrc = fs.readFileSync(path.join(CRM, 'lib/finances/finances-excluded-pllc-ids.ts'), 'utf8')
const EXCLUDED = [...exclSrc.matchAll(/'([a-z0-9]{20,})'/g)].map((m) => m[1])

const fee = (c) => Math.round(c * 0.029) + 30
const $ = (c) => (c / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
const avg = (a) => (a.length ? a.reduce((s, x) => s + x, 0) / a.length : 0)
const med = (a) => {
  if (!a.length) return 0
  const s = [...a].sort((x, y) => x - y)
  return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2
}

async function main() {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    options: '-c default_transaction_read_only=on',
  })
  const q = async (sql, p = []) => (await pool.query(sql, p)).rows
  const ro = (await q('show default_transaction_read_only'))[0].default_transaction_read_only
  console.log(`DB session read-only: ${ro}. Window ${SINCE} to ${UNTIL} (orderCreatedAt, ET midnight).`)
  if (ro !== 'on') throw new Error('refusing to run without read-only session')

  const orders = await q(
    `select o.id, (o."orderCreatedAt" at time zone 'UTC') at time zone 'America/New_York' as created, o."totalCents" total,
            o."formationRefundedCents" frefund, o."serviceCogsCents" cogs, o."entityType" et, o."isPaymentPlan" plan,
            o."paymentPlanTotalPayments" nplan, o."b2bPartnerId" b2b, o."b2bReferralFeeCents" reffee,
            o."couponCode" coupon, o."gclid" gclid, o."offerName" offer,
            p.id pllc, p."formationStatus" fs, p."isForeign" foreign, p.county, p."completedAt" completed,
            p."formationJurisdiction" juris
       from "Order" o
       left join "Pllc" p on p.id = o."pllcsId"
       left join "Customer" c on c.id = o."customerId"
      where o."isVmOnly" = false and o."totalCents" > 0
        and ((o."orderCreatedAt" at time zone 'UTC') at time zone 'America/New_York') >= $1::date
        and ((o."orderCreatedAt" at time zone 'UTC') at time zone 'America/New_York') <  $2::date
        and (o."orderKind" is null or o."orderKind" not ilike '%test%')
        and not (coalesce(c."firstName",'') ilike 'sidney' and coalesce(c."lastName",'') ilike 'brodsky')
        and coalesce(c.email,'') not ilike '%sidney brodsky law%'
        and (p.id is null or (coalesce(p."formationStatus",'') <> 'CANCELLED_AND_REFUNDED' and not (p.id = any($3))))
        and not (o."offerName" ilike '%registered agent%' or o."offerName" ilike '%subscription%')`,
    [SINCE, UNTIL, EXCLUDED],
  )
  const ids = orders.map((o) => o.id)
  const pays = await q(
    `select "orderId", "amountPaidCents" paid, "amountRefundedCents" ref, ("createdAt" at time zone 'UTC') at time zone 'America/New_York' as at,
            "stripeChargeId" ch
       from "Payment" where status = 'succeeded' and "orderId" = any($1)`,
    [ids],
  )
  const dbas = await q(
    `select "pllcId", sum("filingCostCents")::int cost, count(*)::int n from "PllcDba" where "pllcId" = any($1) group by 1`,
    [orders.map((o) => o.pllc).filter(Boolean)],
  )
  const dbaBy = new Map(dbas.map((d) => [d.pllcId, d]))
  const payBy = new Map()
  for (const p of pays) (payBy.get(p.orderId) ?? payBy.set(p.orderId, []).get(p.orderId)).push(p)

  let nullCogs = 0
  const rows = orders.map((o) => {
    const ps = payBy.get(o.id) ?? []
    const collected = ps.reduce((s, p) => s + p.paid, 0)
    const refunded = ps.reduce((s, p) => s + p.ref, 0) + (o.frefund || 0)
    const fees = ps.reduce((s, p) => s + (p.paid > 0 ? fee(p.paid) : 0), 0)
    if (o.cogs == null) nullCogs++
    const cogs = o.cogs ?? (o.foreign ? null : 34500)
    const dba = dbaBy.get(o.pllc)?.cost ?? 0
    const finished = ['FORMATION_COMPLETE', 'COMPLETED'].includes(o.fs)
    // Contract view: full price, fees as if every scheduled payment clears.
    const n = o.plan ? o.nplan || ps.length || 1 : 1
    const per = Math.round(o.total / n)
    const contractFees = o.plan ? n * fee(per) : fee(o.total)
    return {
      ...o, ps, collected, refunded, fees, cogs: cogs ?? 0, cogsMissing: cogs == null, dba, finished,
      referral: o.reffee || 0,
      cashContrib: collected - refunded - fees - (cogs ?? 0) - dba - (o.reffee || 0),
      contractContrib: o.total - (o.frefund || 0) - contractFees - (cogs ?? 0) - dba - (o.reffee || 0),
      month: o.created.toISOString().slice(0, 7),
      kind: o.b2b ? 'partner' : o.foreign ? 'foreign-into-NY' : o.et === 'LLC' ? 'LLC' : o.et === 'PC' ? 'PC'
        : o.total === 88500 ? 'PLLC $885 base' : o.total > 88500 ? 'PLLC $885 + add-ons' : 'PLLC other price',
    }
  })
  console.log(`Orders in window: ${rows.length}. Finished (FORMATION_COMPLETE/COMPLETED): ${rows.filter((r) => r.finished).length}. ` +
    `Null serviceCogsCents (live schedule used): ${nullCogs}.`)

  // §1 standard finished $885 domestic PLLC
  const std = rows.filter((r) => r.finished && r.kind === 'PLLC $885 base' && !r.coupon && r.refunded === 0)
  const up = std.filter((r) => !r.plan), plan4 = std.filter((r) => r.plan && r.ps.length === 4 && r.collected === 88500)
  console.log('\n§1 Finished $885 domestic PLLC, no coupon, no refund, no partner')
  for (const [label, set] of [['upfront', up], ['four collected payments', plan4]]) {
    console.log(`  ${label}: n=${set.length}; COGS values ${[...new Set(set.map((r) => r.cogs))].map($).join(', ')}; ` +
      `fees median ${$(med(set.map((r) => r.fees)))}; contribution median ${$(med(set.map((r) => r.cashContrib)))}, ` +
      `mean ${$(avg(set.map((r) => r.cashContrib)))}, DBA cost on ${set.filter((r) => r.dba).length}`)
  }
  console.log(`  arithmetic: upfront 885 - 345 - ${$(fee(88500))} = ${$(88500 - 34500 - fee(88500))}; ` +
    `four payments 885 - 345 - 4x${$(fee(22125))} = ${$(88500 - 34500 - 4 * fee(22125))}; ` +
    `CRM PRICING 3%+0.30 = ${$(88500 - 34500 - (Math.round(88500 * 0.03) + 30))}`)

  // Refunds / bad debt across the whole window
  const totContract = rows.reduce((s, r) => s + r.total, 0)
  const totRefund = rows.reduce((s, r) => s + r.refunded, 0)
  console.log(`\nRefunds: ${$(totRefund)} on ${rows.filter((r) => r.refunded).length} kept orders = ` +
    `${((totRefund / totContract) * 100).toFixed(2)}% of contract (${$(totContract)}). Cancelled+refunded PLLCs are excluded upstream.`)

  // Installment maturity by cohort month
  console.log('\nInstallment plans by order month: n | contract | collected net | open | % collected')
  const byM = {}
  for (const r of rows.filter((r) => r.plan)) {
    const b = (byM[r.month] ??= { n: 0, c: 0, k: 0 })
    b.n++; b.c += r.total; b.k += r.collected - r.refunded
  }
  for (const [m, b] of Object.entries(byM).sort())
    console.log(`  ${m} | ${b.n} | ${$(b.c)} | ${$(b.k)} | ${$(b.c - b.k)} | ${((b.k / b.c) * 100).toFixed(1)}%`)

  // §2 by product (all orders in window, contract basis; finished-only counts alongside)
  console.log('\n§2 By product (contract basis, all orders in window): n (finished) | avg price | avg COGS | avg contribution')
  const kinds = {}
  for (const r of rows) (kinds[r.kind] ??= []).push(r)
  for (const [k, set] of Object.entries(kinds).sort((a, b) => b[1].length - a[1].length))
    console.log(`  ${k}: ${set.length} (${set.filter((r) => r.finished).length}) | ${$(avg(set.map((r) => r.total)))} | ` +
      `${$(avg(set.map((r) => r.cogs + r.dba)))} | ${$(avg(set.map((r) => r.contractContrib)))}` +
      (set.some((r) => r.cogsMissing) ? ` | ${set.filter((r) => r.cogsMissing).length} with no stored COGS (counted $0)` : ''))

  // §3 accrual by order month: contract revenue, refunds, COGS, est fees, referral fees
  console.log('\n§3 Formation accrual by order month: orders | contract | refunds | filing COGS+DBA | est card fees | referral | contribution')
  const acc = {}
  for (const r of rows) {
    const b = (acc[r.month] ??= { n: 0, rev: 0, ref: 0, cogs: 0, fee: 0, rf: 0 })
    b.n++; b.rev += r.total; b.ref += r.refunded; b.cogs += r.cogs + r.dba; b.fee += r.plan ? r.nplan * fee(Math.round(r.total / (r.nplan || 1))) : fee(r.total); b.rf += r.referral
  }
  const T = { n: 0, rev: 0, ref: 0, cogs: 0, fee: 0, rf: 0 }
  for (const [m, b] of Object.entries(acc).sort()) {
    for (const k in T) T[k] += b[k]
    console.log(`  ${m} | ${b.n} | ${$(b.rev)} | ${$(b.ref)} | ${$(b.cogs)} | ${$(b.fee)} | ${$(b.rf)} | ${$(b.rev - b.ref - b.cogs - b.fee - b.rf)}`)
  }
  console.log(`  total | ${T.n} | ${$(T.rev)} | ${$(T.ref)} | ${$(T.cogs)} | ${$(T.fee)} | ${$(T.rf)} | ${$(T.rev - T.ref - T.cogs - T.fee - T.rf)}`)

  // Recurring income recorded in CRM
  const pra = await q(
    `select to_char(("paidAt" at time zone 'UTC') at time zone 'America/New_York','YYYY-MM') m, sum("platformFeeCents")::int ours, count(*)::int n
       from "PartnerClientPayment" where (("paidAt" at time zone 'UTC') at time zone 'America/New_York') >= $1::date and (("paidAt" at time zone 'UTC') at time zone 'America/New_York') < $2::date group by 1 order by 1`, [SINCE, UNTIL])
  console.log('\nPartner RA (Metro) platform fee by month: ' + pra.map((r) => `${r.m} ${$(r.ours)} (${r.n})`).join('; '))
  const payouts = await q(
    `select to_char(("paidAt" at time zone 'UTC') at time zone 'America/New_York','YYYY-MM') m, sum("amountCents")::int c, count(*)::int n
       from b2b_partner_payouts where (("paidAt" at time zone 'UTC') at time zone 'America/New_York') >= $1::date and (("paidAt" at time zone 'UTC') at time zone 'America/New_York') < $2::date and "voidedAt" is null group by 1 order by 1`, [SINCE, UNTIL])
  console.log('B2B partner payouts paid by month: ' + (payouts.map((r) => `${r.m} ${$(r.c)} (${r.n})`).join('; ') || 'none'))
  const subs = await q(
    `select to_char((sp."paidAt" at time zone 'UTC') at time zone 'America/New_York','YYYY-MM') m, s."subscriptionType" t, sum(sp."amountCents")::int c, count(*)::int n
       from "SubscriptionPayment" sp join "Subscription" s on s.id = sp."unifiedSubscriptionId"
      where ((sp."paidAt" at time zone 'UTC') at time zone 'America/New_York') >= $1::date and ((sp."paidAt" at time zone 'UTC') at time zone 'America/New_York') < $2::date group by 1,2 order by 1,2`, [SINCE, UNTIL])
  console.log('Direct VM / RA subscription payments (inside Stripe gross): ' + subs.map((r) => `${r.m} ${r.t} ${$(r.c)}`).join('; '))

  // Cash-timing estimate of filing costs: each $345 leg is booked on the date its stage was stamped,
  // for every live formation order (any order date). Legs: OP $10 at OP_SUBMITTED; articles/authority
  // (COGS - $110, plus DBA cost) at FORMATION_DOCUMENT_FILED; notices $50 at PUBLICATION_IN_PROGRESS;
  // cert pub $50 at CERT_OF_PUBLICATION_FILED. An estimate of when the money left, not a bank record.
  const legs = await q(
    `select o."serviceCogsCents" cogs, p."statusTimestamps" ts,
            coalesce((select sum(d."filingCostCents") from "PllcDba" d where d."pllcId" = p.id), 0)::int dba
       from "Order" o join "Pllc" p on p.id = o."pllcsId"
      where o."isVmOnly" = false and o."totalCents" > 0 and coalesce(o."serviceCogsCents", 34500) >= 11000
        and (o."orderKind" is null or o."orderKind" not ilike '%test%')
        and coalesce(p."formationStatus",'') <> 'CANCELLED_AND_REFUNDED' and not (p.id = any($1))`, [EXCLUDED])
  const cash = {}
  const book = (d, c) => {
    if (!d) return
    const et = new Date(new Date(d).toLocaleString('en-US', { timeZone: 'America/New_York' }))
    const m = `${et.getFullYear()}-${String(et.getMonth() + 1).padStart(2, '0')}`
    if (m >= SINCE.slice(0, 7) && m < UNTIL.slice(0, 7)) cash[m] = (cash[m] ?? 0) + c
  }
  for (const l of legs) {
    const ts = l.ts || {}, cogs = l.cogs ?? 34500
    book(ts.OP_SUBMITTED ?? ts.FORMATION_DOCUMENT_FILED, 1000)
    book(ts.FORMATION_DOCUMENT_FILED, cogs - 11000 + l.dba)
    book(ts.PUBLICATION_IN_PROGRESS, 5000)
    book(ts.CERT_OF_PUBLICATION_FILED, 5000)
  }
  const cashTot = Object.values(cash).reduce((a, b) => a + b, 0)
  console.log('\nFiling costs on stage dates (cash-timing estimate): ' +
    Object.entries(cash).sort().map(([m, c]) => `${m} ${$(c)}`).join('; ') + `; total ${$(cashTot)}`)

  if (TRACE) await trace(rows)
  await pool.end()
}

/**
 * De-identified trace of one finished $885 order. Picks, among finished $885 domestic PLLCs with no coupon,
 * no refund and no partner, the middle-dated candidate matching --trace-month / --trace-profession / --trace-plan.
 * Prints only month, profession, owner count, day offsets and money. Stripe: charges.list (read) to match the
 * Spiffy charge by amount and time (+/- 10 min) when the CRM payment row has no Stripe id.
 */
async function trace(rows) {
  const Stripe = req('stripe')
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const db = await pgOne()
  const month = arg('--trace-month', '2026-06')
  const prof = arg('--trace-profession', 'Marriage and Family Therapy')
  const planMode = arg('--trace-plan', 'upfront') // upfront | four
  const set = []
  for (const r of rows) {
    if (!(r.finished && r.kind === 'PLLC $885 base' && !r.coupon && !r.refunded && r.month === month)) continue
    if (planMode === 'upfront' ? r.plan : !(r.plan && r.ps.length === 4 && r.collected === 88500)) continue
    const lic = (await db.query(`select coalesce(profession, "licenseType") p from "ProfessionalLicense" where "pllcId" = $1`, [r.pllc])).rows
    if (!lic.some((l) => (l.p || '').toLowerCase().startsWith(prof.toLowerCase()))) continue
    set.push(r)
  }
  set.sort((a, b) => a.created - b.created)
  const r = set[Math.floor((set.length - 1) / 2)]
  console.log(`\nTRACE ${planMode} ${prof} ${month}: ${set.length} candidate(s)`)
  if (!r) return
  const meta = (await db.query(
    `select p."statusTimestamps" ts, (select count(*)::int from "PllcOwner" w where w."pllcId" = p.id) owners,
            n."dailyStartDate" ds, n."dailyEndDate" de, n."weeklyStartDate" ws, n."weeklyEndDate" we, p.state
       from "Pllc" p left join newspaper_run_dates n on n."pllcId" = p.id where p.id = $1`, [r.pllc])).rows[0]
  const off = (d) => (d ? `day ${Math.round((new Date(d) - r.created) / 864e5)}` : 'n/a')
  const profs = (await db.query(`select coalesce(profession, "licenseType") p from "ProfessionalLicense" where "pllcId" = $1`, [r.pllc])).rows.map((l) => l.p)
  console.log(`  profession ${[...new Set(profs)].join('/') || 'n/a'}; owners ${meta.owners}; office state ${meta.state ?? 'n/a'}; attribution ${r.gclid ? 'Google click' : 'untagged/other'}`)
  const ts = meta.ts || {}
  for (const [k, v] of Object.entries(ts).sort((a, b) => new Date(a[1]) - new Date(b[1]))) console.log(`  ${k}: ${off(v)}`)
  console.log(`  newspaper daily ${off(meta.ds)}-${off(meta.de)}, weekly ${off(meta.ws)}-${off(meta.we)}`)
  console.log(`  price ${$(r.total)}; stored COGS ${$(r.cogs)}; DBA ${$(r.dba)}; referral ${$(r.referral)}; refunds ${$(r.refunded)}`)
  for (const p of r.ps.sort((a, b) => a.at - b.at)) {
    let actual = 'n/a'
    try {
      let bt
      if (p.ch) bt = (await stripe.charges.retrieve(p.ch, { expand: ['balance_transaction'] })).balance_transaction
      else {
        // p.at is ET wall time; recover the UTC instant from the raw payment row
        const raw = (await db.query(`select extract(epoch from ("createdAt" at time zone 'UTC'))::bigint t from "Payment" where "orderId" = $1 and "amountPaidCents" = $2`, [r.id, p.paid])).rows[0].t
        const hits = []
        for await (const c of stripe.charges.list({ created: { gte: Number(raw) - 600, lte: Number(raw) + 600 }, limit: 100, expand: ['data.balance_transaction'] }))
          if (c.amount === p.paid && c.paid) hits.push(c)
        bt = hits.length === 1 ? hits[0].balance_transaction : undefined
        if (hits.length !== 1) actual = `${hits.length} Stripe matches`
      }
      if (bt && typeof bt === 'object') actual = `${$(bt.fee)} (net ${$(bt.net)})`
    } catch (e) { actual = `lookup failed (${e.code ?? e.type})` }
    console.log(`  payment ${p.at.toISOString().slice(0, 10).slice(0, 7)}: ${$(p.paid)} | est fee ${$(fee(p.paid))} | Stripe actual ${actual}`)
  }
  console.log(`  contribution (cash, est fees) ${$(r.cashContrib)}`)
  await _one.end()
}
let _one
async function pgOne() {
  if (!_one) _one = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false }, options: '-c default_transaction_read_only=on', max: 1 })
  return _one
}

main().catch((e) => { console.error(e.message); process.exit(1) })
