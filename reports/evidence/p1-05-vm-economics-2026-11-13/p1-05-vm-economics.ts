/**
 * P1-05 rebuild (Nov 13 2026): VM book, churn, attach, overlap and unit economics. READ-ONLY.
 *
 *   cd /Users/sidb/dev/pllc-business/PLLC-CRM/crm && \
 *     npx tsx --tsconfig tsconfig.json \
 *     ../../new-york-pllc/reports/evidence/p1-05-vm-economics-2026-11-13/p1-05-vm-economics.ts [--asof 2026-11-13]
 *
 * Postgres: createReadOnlyScriptPrisma (session default_transaction_read_only=on).
 * Stripe: createReadOnlyStripe (restricted CRM key); list/retrieve calls only.
 * Writes ONE file next to this script: p1-05-output.json (aggregates only, no names, emails or ids).
 * No emails, no DB writes, no Stripe writes.
 */
import * as fs from 'fs'
import * as path from 'path'
import '@/scripts/load-env'
import { createReadOnlyScriptPrisma } from '@/lib/recurring-cohort/create-read-only-script-prisma'
import { createReadOnlyStripe } from '@/lib/recurring-cohort/create-read-only-stripe'
import { loadCrmSubscriptions, type CrmSubscription } from '@/lib/recurring-cohort/load-crm-subscriptions'
import { groupVmSubsByPllc, isFinanceExcludedSub, isTestSub } from '@/lib/recurring-cohort/crm-subscription-facts'
import { buildCancellationRows, type CancellationRow } from '@/lib/recurring-cohort/build-cancellation-rows'
import { computeVirtualMailChurn } from '@/lib/virtual-mail/compute-virtual-mail-churn'
import {
  hasVirtualMailReinstateAfterCancel,
  isVirtualMailChurnPendingOnly,
  pllcWasVirtualMailAtRiskAt,
} from '@/lib/virtual-mail/virtual-mail-churn-subscription'
import { listVmStarts } from '@/lib/recurring-cohort/vm-start-events'
import { etMidnight, etDay, addDaysIso } from '@/lib/recurring-cohort/et-midnight'
import { isFinancesExcludedPllcId } from '@/lib/finances/finances-excluded-pllc-ids'

const DAY = 86_400_000
const SERIES_START = '2026-04-01'
const MONTHS = ['2026-04', '2026-05', '2026-06', '2026-07', '2026-08', '2026-09', '2026-10', '2026-11']

function arg(flag: string): string | null {
  const i = process.argv.indexOf(flag)
  return i >= 0 ? process.argv[i + 1] : null
}
const countBy = <T,>(xs: T[], f: (x: T) => string) => xs.reduce<Record<string, number>>((a, x) => ((a[f(x)] = (a[f(x)] ?? 0) + 1), a), {})
const r1 = (n: number) => Math.round(n * 10) / 10
const pct = (a: number, b: number) => (b > 0 ? Math.round((1000 * a) / b) / 10 : null)

function monthBounds(m: string, endCap: Date): { start: Date; end: Date } {
  const [y, mo] = m.split('-').map(Number)
  const next = mo === 12 ? `${y + 1}-01-01` : `${y}-${String(mo + 1).padStart(2, '0')}-01`
  const end = etMidnight(next)
  return { start: etMidnight(`${m}-01`), end: end > endCap ? endCap : end }
}

async function main() {
  const asOf = arg('--asof') ?? etDay(new Date())
  const endCap = etMidnight(addDaysIso(asOf, 1)) // exclusive: end of asOf day ET
  const { prisma, disconnect } = createReadOnlyScriptPrisma()
  const stripe = createReadOnlyStripe()
  const out: Record<string, unknown> = { asOf, generatedAt: new Date().toISOString() }
  try {
    // ---------- Load ----------
    const subs = await loadCrmSubscriptions(prisma)
    const vmAll = groupVmSubsByPllc(subs)
    const bookSubs = subs.filter((s) => !isTestSub(s) && !isFinanceExcludedSub(s))
    const vmBook = groupVmSubsByPllc(bookSubs)
    const vmBookFlat = [...vmBook.values()].flat()

    const vmCancelSubs = subs.filter((s) => s.subscriptionType === 'VIRTUAL_MAIL' && s.cancelledAt)
    const raCancelSubs = subs.filter((s) => s.subscriptionType === 'REGISTERED_AGENT' && s.cancelledAt && s.cancelledAt >= etMidnight(SERIES_START))
    const cancelRows: CancellationRow[] = await buildCancellationRows([...vmCancelSubs, ...raCancelSubs], { stripe, vmByPllc: vmAll })
    const vmCancels = cancelRows.filter((c) => c.product === 'VM')
    const subById = new Map(subs.map((s) => [s.id, s]))

    // ---------- §1 current book ----------
    const bestStatus = (list: CrmSubscription[]) => {
      const st = list.map((s) => (s.cancelledAt || s.status === 'cancelled' || s.stripeStatus === 'canceled' ? 'cancelled' : s.stripeStatus ?? (s.status === 'pending' && s.pllc.isVirtualMailClient ? 'pending_paid_checkout' : 'pending_offer_only')))
      return ['active', 'past_due', 'unpaid', 'trialing', 'pending_paid_checkout', 'cancelled'].find((x) => st.includes(x)) ?? st[0] ?? 'pending_offer_only'
    }
    out.bookNow = countBy([...vmBook.values()], bestStatus)

    // ---------- §1 by month ----------
    const starts = listVmStarts(vmBook)
    const monthly = MONTHS.map((m) => {
      const b = monthBounds(m, endCap)
      const inM = (d: Date) => d >= b.start && d < b.end
      const eng = computeVirtualMailChurn(vmBookFlat, b.start, new Date(b.end.getTime() - 1))
      const gross = vmCancels.filter((c) => inM(c.cancelledAt))
      return {
        month: m,
        through: b.end.getTime() === endCap.getTime() ? asOf : `${m}-end`,
        liveAtMonthEnd: [...vmBook.values()].filter((l) => pllcWasVirtualMailAtRiskAt(l, new Date(b.end.getTime() - 1))).length,
        newStarts: starts.filter((s) => s.kind === 'new' && inM(s.sub.startDate)).length,
        reinstates: starts.filter((s) => s.kind === 'reinstate' && inM(s.sub.startDate)).length,
        grossCancelsByClass: countBy(gross, (c) => c.kind),
        grossCancelsExMetroTest: gross.filter((c) => !['migration_metro', 'test'].includes(c.kind)).length,
        netCancelsEngine: eng.cancellationsInPeriod,
        exposureMonths: r1(eng.exposureMonths),
        monthlyChurnNetPct: pct(eng.cancellationsInPeriod, eng.exposureMonths),
      }
    })
    out.monthly = monthly

    // ---------- §4 churn bases ----------
    const churnBases = (endIso: string) => {
      const end = etMidnight(addDaysIso(endIso, 1))
      const start = etMidnight(SERIES_START)
      const eng = computeVirtualMailChurn(vmBookFlat, start, new Date(end.getTime() - 1))
      const gross = vmCancels.filter((c) => c.cancelledAt >= start && c.cancelledAt < end && !['migration_metro', 'test'].includes(c.kind))
      const why = gross.map((c) => {
        const sub = subById.get(c.subscriptionId)!
        const list = vmAll.get(c.pllcId) ?? []
        if (c.kind === 'formation_refunded') return 'formation_refunded (entity dropped by engine)'
        if (hasVirtualMailReinstateAfterCancel(list, c.cancelledAt)) return 'reinstated later (not net churn)'
        const later = gross.filter((g) => g.pllcId === c.pllcId && g.cancelledAt > c.cancelledAt)
        if (later.length) return 'second cancel row, same entity'
        if (isVirtualMailChurnPendingOnly(sub)) return 'pending-only row'
        return 'counted in net'
      })
      return {
        through: endIso,
        exposureMonths: r1(eng.exposureMonths),
        netCancels: eng.cancellationsInPeriod,
        netMonthlyPct: pct(eng.cancellationsInPeriod, eng.exposureMonths),
        netAnnualizedPct: eng.annualizedChurnRate == null ? null : r1(eng.annualizedChurnRate * 100),
        grossCancels: gross.length,
        grossMonthlyPct: pct(gross.length, eng.exposureMonths),
        grossByClass: countBy(gross, (c) => c.kind),
        grossByStripeReason: countBy(gross, (c) => c.stripeReason ?? 'none'),
        grossVsNetReconciliation: countBy(why, (w) => w),
      }
    }
    const t30 = (endIso: string) => {
      const end = etMidnight(addDaysIso(endIso, 1))
      const eng = computeVirtualMailChurn(vmBookFlat, new Date(end.getTime() - 30 * DAY), new Date(end.getTime() - 1))
      return { through: endIso, netCancels: eng.cancellationsInPeriod, exposureMonths: r1(eng.exposureMonths), monthlyPct: pct(eng.cancellationsInPeriod, eng.exposureMonths) }
    }
    out.churn = { sinceApr1_toNov8: churnBases('2026-11-08'), sinceApr1_toAsOf: churnBases(asOf), trailing30_Nov8: t30('2026-11-08'), trailing30_asOf: t30(asOf) }
    out.allTimeVmCancelsByClass = countBy(vmCancels, (c) => c.kind)
    out.allTimeVmCancelsByStripeReason = countBy(vmCancels.filter((c) => !['migration_metro', 'test'].includes(c.kind)), (c) => c.stripeReason ?? 'none')

    // ---------- §2 overlap ----------
    const liveRa = (s: CrmSubscription) => ['active', 'trialing', 'past_due'].includes(s.stripeStatus ?? '') || (['active', 'trialing'].includes(s.status) && !s.cancelledAt)
    const liveVmPllcs = new Set([...vmBook].filter(([, l]) => l.some((s) => !s.cancelledAt && (['active', 'trialing', 'past_due'].includes(s.stripeStatus ?? '') || s.status === 'active'))).map(([id]) => id))
    const raSubs = subs.filter((s) => s.subscriptionType === 'REGISTERED_AGENT' && !isTestSub(s))
    const overlapNow = raSubs.filter((s) => liveVmPllcs.has(s.pllcId) && liveRa(s))
    const legacyRa = await prisma.registeredAgentSubscription.findMany({ where: { pllcId: { in: [...liveVmPllcs] }, status: 'ACTIVE' }, select: { pllcId: true } })
    const optOut = await prisma.pllc.count({ where: { id: { in: [...liveVmPllcs] }, registeredAgentOptOut: true } })
    const raAdmin = cancelRows.filter((c) => c.product !== 'VM' && c.kind === 'administrative_vm_includes_ra')
    out.overlap = {
      liveVmEntities: liveVmPllcs.size,
      liveRaSubsOnLiveVmEntities: overlapNow.length,
      ofWhichCancelAtPeriodEnd: overlapNow.filter((s) => s.cancelAtPeriodEnd).length,
      ofWhichStripeStatus: countBy(overlapNow, (s) => s.stripeStatus ?? s.status),
      legacyActiveRaRowsOnLiveVmEntities: new Set(legacyRa.map((l) => l.pllcId)).size,
      liveVmEntitiesWithRaOptOut: optOut,
      raCancelsSinceApr1ClassVmIncludesRa: raAdmin.length,
      raCancelsSinceApr1ByMonth: countBy(raAdmin, (c) => etDay(c.cancelledAt).slice(0, 7)),
      raSubsEverOnVmEntities: raSubs.filter((s) => vmBook.has(s.pllcId) && (vmBook.get(s.pllcId) ?? []).some((v) => !isVirtualMailChurnPendingOnly(v))).length,
    }

    // ---------- §3 attach ----------
    const pllcs = await prisma.pllc.findMany({
      where: { orders: { some: { isVmOnly: false, totalCents: { gt: 0 } } } },
      select: {
        id: true, name: true, formationStatus: true, isVirtualMailClient: true, opApprovedVaUpsellSentAt: true, opApprovedVaUpsellCheckoutCompletedAt: true,
        orders: { select: { orderCreatedAt: true, isVmOnly: true, totalCents: true, entityType: true, spiffyOrderId: true } },
        subscriptions: { where: { subscriptionType: 'VIRTUAL_MAIL' }, select: { startDate: true, createdAt: true, status: true, stripeStatus: true, stripeSubscriptionId: true, spiffyOrderId: true, cancelledAt: true } },
      },
    })
    type Variant = { label: string; excludeRefunded: boolean; excludeTestExcluded: boolean; numerator: 'p205' | 'engine'; excludeCancelledNumerator: boolean; pllcOnly: boolean }
    const variants: Variant[] = [
      { label: 'A. P2-05 rule (all PLLC entities, real sub started <=90d)', excludeRefunded: false, excludeTestExcluded: false, numerator: 'p205', excludeCancelledNumerator: false, pllcOnly: true },
      { label: 'B. A minus cancelled-and-refunded formations', excludeRefunded: true, excludeTestExcluded: true, numerator: 'p205', excludeCancelledNumerator: false, pllcOnly: true },
      { label: 'C. B with engine start rule (non-pending row)', excludeRefunded: true, excludeTestExcluded: true, numerator: 'engine', excludeCancelledNumerator: false, pllcOnly: true },
      { label: 'D. B, numerator only subs not cancelled today', excludeRefunded: true, excludeTestExcluded: true, numerator: 'p205', excludeCancelledNumerator: true, pllcOnly: true },
      { label: 'E. A, all entity types (PLLC + LLC)', excludeRefunded: false, excludeTestExcluded: false, numerator: 'p205', excludeCancelledNumerator: false, pllcOnly: false },
      { label: 'F. E minus cancelled-and-refunded', excludeRefunded: true, excludeTestExcluded: true, numerator: 'p205', excludeCancelledNumerator: false, pllcOnly: false },
    ]
    const attach = variants.map((v) => {
      const rows = new Map<string, { n: number; vm: number; checkout: number; op: number; other: number; ever: number; everCheckout: number; everLater: number; open: number }>()
      for (const p of pllcs) {
        if (v.excludeTestExcluded && (isFinancesExcludedPllcId(p.id) || /\bE2E\s+TEST\b/i.test(p.name ?? ''))) continue
        if (v.excludeRefunded && p.formationStatus === 'CANCELLED_AND_REFUNDED') continue
        const forms = p.orders.filter((o) => !o.isVmOnly && o.totalCents > 0 && (!v.pllcOnly || o.entityType === 'PLLC')).sort((a, b) => a.orderCreatedAt.getTime() - b.orderCreatedAt.getTime())
        if (!forms.length) continue
        const first = forms[0]
        const month = etDay(first.orderCreatedAt).slice(0, 7)
        if (month < '2026-04' || month > '2026-11') continue
        const real = p.subscriptions
          .filter((s) => (v.numerator === 'engine' ? !isVirtualMailChurnPendingOnly({ ...s, id: '', pllcId: p.id }) : Boolean(s.stripeSubscriptionId) || !['pending', 'cancelled'].includes(s.status)))
          .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
        const firstVm = real[0]
        const row = rows.get(month) ?? { n: 0, vm: 0, checkout: 0, op: 0, other: 0, ever: 0, everCheckout: 0, everLater: 0, open: 0 }
        row.n++
        const orderT = first.orderCreatedAt.getTime()
        if (orderT + 90 * DAY > endCap.getTime()) row.open++
        if (firstVm) {
          const isCheckout = (firstVm.spiffyOrderId != null && firstVm.spiffyOrderId === first.spiffyOrderId) || firstVm.createdAt.getTime() - orderT <= 3 * DAY
          const isOp = !isCheckout && p.opApprovedVaUpsellCheckoutCompletedAt != null
          row.ever++
          if (isCheckout) row.everCheckout++
          else row.everLater++
          const within = firstVm.startDate.getTime() - orderT <= 90 * DAY
          const countIt = within && !(v.excludeCancelledNumerator && firstVm.cancelledAt)
          if (countIt) {
            row.vm++
            if (isCheckout) row.checkout++
            else if (isOp) row.op++
            else row.other++
          }
        }
        rows.set(month, row)
      }
      const table = [...rows].sort(([a], [b]) => a.localeCompare(b)).map(([month, r]) => {
        const [y, mo] = month.split('-').map(Number)
        const lastDay = new Date(Date.UTC(y, mo, 0)).toISOString().slice(0, 10)
        const mature = etMidnight(addDaysIso(lastDay, 91)) <= endCap
        return { month, entities: r.n, vmWithin90d: r.vm, attachPct: pct(r.vm, r.n), checkout: r.checkout, opStage: r.op, otherLater: r.other, everAttachedToDate: r.ever, everCheckout: r.everCheckout, everLater: r.everLater, windowStillOpen: r.open, mature }
      })
      const mat = table.filter((t) => t.mature)
      const sum = (k: 'entities' | 'vmWithin90d') => mat.reduce((a, t) => a + t[k], 0)
      return { label: v.label, table, pooledMature: { entities: sum('entities'), vm: sum('vmWithin90d'), pct: pct(sum('vmWithin90d'), sum('entities')) } }
    })
    out.attach = attach
    const opSent = pllcs.filter((p) => p.opApprovedVaUpsellSentAt).length
    const opBought = pllcs.filter((p) => p.opApprovedVaUpsellCheckoutCompletedAt).length
    out.opUpsell = { sentEver: opSent, checkoutCompletedEver: opBought }

    // ---------- §5 Stripe economics ----------
    const vmStripeIds = new Set(subs.filter((s) => s.subscriptionType === 'VIRTUAL_MAIL' && s.stripeSubscriptionId && !isTestSub(s) && !isFinancesExcludedPllcId(s.pllcId)).map((s) => s.stripeSubscriptionId as string))
    const created = { gte: Math.floor(etMidnight(SERIES_START).getTime() / 1000), lt: Math.floor(endCap.getTime() / 1000) }
    type Inv = { id: string; status: string | null; amount_paid: number; amount_due: number; attempt_count: number; created: number; subLineCents: number; otherLineCents: number; otherLines: number; charge: string | null; interval: string | null; unitAmount: number | null }
    const invoices: Inv[] = []
    for await (const inv of stripe.invoices.list({ created, limit: 100 })) {
      const subId = typeof (inv as any).subscription === 'string' ? (inv as any).subscription : (inv as any).subscription?.id
      if (!subId || !vmStripeIds.has(subId)) continue
      let subLine = 0, other = 0, otherN = 0, interval: string | null = null, unit: number | null = null
      const lines = inv.lines.has_more ? await stripe.invoices.listLineItems(inv.id, { limit: 100 }).autoPagingToArray({ limit: 1000 }) : inv.lines.data
      for (const l of lines) {
        if ((l as any).type === 'subscription') { subLine += l.amount; interval = (l as any).price?.recurring?.interval ?? interval; unit = (l as any).price?.unit_amount ?? unit }
        else { other += l.amount; otherN++ }
      }
      invoices.push({ id: inv.id, status: inv.status, amount_paid: inv.amount_paid, amount_due: inv.amount_due, attempt_count: inv.attempt_count, created: inv.created, subLineCents: subLine, otherLineCents: other, otherLines: otherN, charge: typeof (inv as any).charge === 'string' ? (inv as any).charge : (inv as any).charge?.id ?? null, interval, unitAmount: unit })
    }
    const chargeIds = new Set(invoices.map((i) => i.charge).filter(Boolean) as string[])
    let feeCents = 0, feeCharges = 0, grossCharged = 0, refunded = 0, disputed = 0
    const feeByAmount: Record<string, { n: number; fee: number }> = {}
    for await (const ch of stripe.charges.list({ created, limit: 100, expand: ['data.balance_transaction'] })) {
      if (!chargeIds.has(ch.id)) continue
      const bt = ch.balance_transaction as any
      if (ch.status !== 'succeeded') continue
      feeCharges++
      grossCharged += ch.amount
      refunded += ch.amount_refunded
      if (ch.disputed) disputed++
      if (bt && typeof bt === 'object') {
        feeCents += bt.fee
        const k = String(ch.amount)
        feeByAmount[k] = { n: (feeByAmount[k]?.n ?? 0) + 1, fee: (feeByAmount[k]?.fee ?? 0) + bt.fee }
      }
    }
    const paid = invoices.filter((i) => i.status === 'paid' && i.amount_paid > 0)
    const zeroPaid = invoices.filter((i) => i.status === 'paid' && i.amount_paid === 0)
    const unpaidAttempted = invoices.filter((i) => ['open', 'uncollectible', 'void'].includes(i.status ?? '') && i.attempt_count > 0 && i.amount_due > 0)
    const byMonth = (xs: Inv[]) => countBy(xs, (i) => etDay(new Date(i.created * 1000)).slice(0, 7))
    out.stripeVm = {
      window: `${SERIES_START}..${asOf} (invoice created, ET)`,
      invoicesSeen: invoices.length,
      paidInvoices: paid.length,
      paidZeroInvoices: zeroPaid.length,
      paidCents: paid.reduce((a, i) => a + i.amount_paid, 0),
      subscriptionLineCentsOnPaid: paid.reduce((a, i) => a + i.subLineCents, 0),
      otherLineCentsOnPaid: paid.reduce((a, i) => a + i.otherLineCents, 0),
      otherLinesOnPaid: paid.reduce((a, i) => a + i.otherLines, 0),
      invoicesWithOtherLines: invoices.filter((i) => i.otherLines > 0).map((i) => ({ month: etDay(new Date(i.created * 1000)).slice(0, 7), status: i.status, otherLineCents: i.otherLineCents, otherLines: i.otherLines })),
      paidByMonth: byMonth(paid),
      paidCentsByMonth: paid.reduce<Record<string, number>>((a, i) => { const k = etDay(new Date(i.created * 1000)).slice(0, 7); a[k] = (a[k] ?? 0) + i.amount_paid; return a }, {}),
      zeroPaidByMonth: byMonth(zeroPaid),
      unitAmountsOnPaid: countBy(paid, (i) => `${i.interval ?? '?'}:${i.unitAmount ?? '?'}`),
      chargesMatched: feeCharges,
      chargesGrossCents: grossCharged,
      feeCents,
      feePerChargeCents: feeCharges ? Math.round(feeCents / feeCharges) : null,
      effectiveFeePct: grossCharged ? Math.round((10000 * feeCents) / grossCharged) / 100 : null,
      feeByChargeAmount: feeByAmount,
      refundedCents: refunded,
      disputedCharges: disputed,
      unpaidAttemptedInvoices: unpaidAttempted.length,
      unpaidAttemptedCents: unpaidAttempted.reduce((a, i) => a + i.amount_due, 0),
      unpaidAttemptedByStatus: countBy(unpaidAttempted, (i) => i.status ?? '?'),
      badDebtPctOfBilled: pct(unpaidAttempted.reduce((a, i) => a + i.amount_due, 0), paid.reduce((a, i) => a + i.amount_paid, 0) + unpaidAttempted.reduce((a, i) => a + i.amount_due, 0)),
    }
    // Live VM prices in use (annual vs monthly)
    const priceIds = countBy(subs.filter((s) => s.subscriptionType === 'VIRTUAL_MAIL' && !s.cancelledAt && s.stripeSubscriptionId && !isTestSub(s)), (s) => s.stripePriceId ?? 'none')
    const prices: Record<string, unknown>[] = []
    for (const [id, n] of Object.entries(priceIds)) {
      if (id === 'none') { prices.push({ price: 'none on CRM row', subs: n }); continue }
      try {
        const p = await stripe.prices.retrieve(id)
        prices.push({ unitAmount: p.unit_amount, interval: p.recurring?.interval, intervalCount: p.recurring?.interval_count, active: p.active, subs: n })
      } catch (e) { prices.push({ price: 'retrieve failed', subs: n, err: (e as Error).message.slice(0, 80) }) }
    }
    out.liveVmPrices = prices
    out.crmAmountsLiveVm = countBy(subs.filter((s) => s.subscriptionType === 'VIRTUAL_MAIL' && !s.cancelledAt && !isTestSub(s) && !isFinancesExcludedPllcId(s.pllcId) && !isVirtualMailChurnPendingOnly(s)), (s) => String(s.amountCents))

    // ---------- §5 postage from mail station ----------
    const ship = await prisma.mailShipment.findMany({ select: { billable: true, postageCents: true, postageBilledAt: true, status: true, kind: true, createdAt: true } })
    const bill = ship.filter((s) => s.billable && (s.postageCents ?? 0) > 0)
    out.postage = {
      shipmentsAll: ship.length,
      byStatus: countBy(ship, (s) => String(s.status)),
      firstShipment: ship.length ? etDay(new Date(Math.min(...ship.map((s) => s.createdAt.getTime())))) : null,
      billableWithPostage: bill.length,
      billablePostageCents: bill.reduce((a, s) => a + (s.postageCents ?? 0), 0),
      billedCount: bill.filter((s) => s.postageBilledAt).length,
      billedCents: bill.filter((s) => s.postageBilledAt).reduce((a, s) => a + (s.postageCents ?? 0), 0),
      unbilledCount: bill.filter((s) => !s.postageBilledAt).length,
      unbilledCents: bill.filter((s) => !s.postageBilledAt).reduce((a, s) => a + (s.postageCents ?? 0), 0),
      nonBillable: ship.filter((s) => !s.billable).length,
      nonBillablePostageCents: ship.filter((s) => !s.billable).reduce((a, s) => a + (s.postageCents ?? 0), 0),
      byKind: countBy(bill, (s) => String(s.kind)),
    }

    const file = path.join(__dirname, 'p1-05-output.json')
    fs.writeFileSync(file, JSON.stringify(out, null, 2) + '\n')
    console.log(`Wrote ${file}`)
  } finally {
    await disconnect()
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
