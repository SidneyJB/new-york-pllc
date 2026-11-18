/**
 * READ-ONLY CRM export for the credentialing postcard mail file (build_credentialing_mail_batch.py).
 * Wider than export_crm_credentialing_exclusions.ts: besides credentialing cases it collects every
 * credentialing touch (open leads, quotes, checkout CAQH interest, CAQH backlist, credentialing
 * notes/tasks/emails), the do-not-send list, owner names, DBA names, and MBS tenant PLLC names.
 *
 * Run from PLLC-CRM/crm (so its node_modules resolve):
 *   cd ~/dev/pllc-business/PLLC-CRM/crm && npx tsx ../../new-york-pllc/scripts/export_crm_credentialing_mail_checks.ts <out.json>
 * Only findMany/count calls on the main DB and one SELECT on the MBS tenant in a READ ONLY session.
 * Writes only <out.json>, which holds client names and emails: keep it outside every repo.
 */
const CRM = `${process.env.HOME}/dev/pllc-business/PLLC-CRM/crm`
import fs from 'fs'

const QUOTE_RE = /\$1,795|\$1,095|\$2,995|Get in-network|Get in network|Move my contracts|per insurer|per payer|(credentialing|CDPHP|paneling|insurers?)\b.{0,120}\$\d/i
const CRED_RE = /credential|in-network|in network|insurance panel|paneling|caqh/i

async function main() {
  const out = process.argv[2]
  if (!out) throw new Error('usage: export_crm_credentialing_mail_checks.ts <out.json>')
  await import(`${CRM}/scripts/load-env`)
  const { prisma: db } = await import(`${CRM}/lib/prisma`)
  const { CAQH_BACKLIST_SKIP_PLLC_IDS } = await import(`${CRM}/lib/outreach/caqh-healthcare-backlist`)
  const dns = await import(`${CRM}/lib/outreach/do-not-send`)

  const pllcs = await db.pllc.findMany({
    select: {
      id: true, name: true, state: true,
      dbas: { select: { name: true } },
      caqhInfo: { select: { intakeStatus: true, type1Npi: true, type2Npi: true } },
      credentialingEngagements: { select: { status: true, items: { select: { kind: true, externalId: true } } } },
      orders: { select: { caqhInterest: true, customer: { select: { firstName: true, lastName: true, email: true } } } },
      owners: { select: { customer: { select: { firstName: true, lastName: true, email: true, alternateEmails: true } }, person: { select: { firstName: true, lastName: true, email: true } } } },
      notes: { select: { body: true, category: true } },
      tasks: { select: { title: true, status: true } },
    },
  })

  const rows = []
  for (const p of pllcs as any[]) {
    const npis = new Set<string>()
    for (const n of [p.caqhInfo?.type1Npi, p.caqhInfo?.type2Npi]) if (n && /^\d{10}$/.test(n.trim())) npis.add(n.trim())
    for (const e of p.credentialingEngagements)
      for (const i of e.items)
        if ((i.kind === 'NPI_TYPE1' || i.kind === 'NPI_TYPE2') && i.externalId && /^\d{10}$/.test(i.externalId.trim())) npis.add(i.externalId.trim())
    const people = new Map<string, any>()
    for (const c of [...p.owners.map((o: any) => o.customer ?? o.person), ...p.orders.map((o: any) => o.customer)].filter(Boolean)) {
      const emails = [c.email, ...(c.alternateEmails ?? [])].filter(Boolean).map((e: string) => e.trim().toLowerCase())
      people.set(`${c.firstName}|${c.lastName}`.toLowerCase(), { first: c.firstName ?? '', last: c.lastName ?? '', emails })
    }
    const emails = [...new Set([...people.values()].flatMap((x: any) => x.emails))]
    const outbound = emails.length
      ? await db.outboundEmail.findMany({ where: { toEmail: { in: emails, mode: 'insensitive' } }, select: { subject: true, bodyPlain: true } })
      : []
    const fresh = (b: string | null) => (b ?? '').split(/\nOn .{5,80}wrote:|\n>/)[0]

    // Credentialing touch, first match is the reason.
    let touch = ''
    if (p.credentialingEngagements.length) touch = `credentialing engagement (${p.credentialingEngagements.map((e: any) => e.status).join('/')})`
    else if (p.caqhInfo) touch = `CAQH intake (${p.caqhInfo.intakeStatus})`
    else if (p.orders.some((o: any) => o.caqhInterest)) touch = 'checkout credentialing/CAQH interest (lead)'
    else if (outbound.some((o: any) => QUOTE_RE.test(fresh(o.bodyPlain)))) touch = 'credentialing quote sent by email'
    else if (CAQH_BACKLIST_SKIP_PLLC_IDS.has(p.id)) touch = 'CAQH backlist skip'
    else if (p.notes.some((n: any) => n.category === 'CAQH_PILOT' || /credentialing|caqh/i.test(n.category ?? ''))) touch = 'credentialing note'
    else if (p.tasks.some((t: any) => t.status !== 'DONE' && CRED_RE.test(t.title))) touch = 'open credentialing task'
    else if (outbound.some((o: any) => CRED_RE.test(o.subject ?? ''))) touch = 'credentialing/CAQH email sent'

    const doNotSend = dns.isDoNotSendPllcId(p.id) || dns.DO_NOT_SEND_NAME.test(p.name) || emails.some((e) => dns.isDoNotSendEmail(e))
    rows.push({
      name: p.name, state: p.state, dbas: p.dbas.map((d: any) => d.name), npis: [...npis],
      people: [...people.values()].map((x: any) => ({ first: x.first, last: x.last })),
      credentialingTouch: touch, doNotSend,
    })
  }

  // Inbound credentialing inquiries from senders who are not linked to any customer (possible outside leads).
  const since = new Date(Date.now() - 180 * 864e5)
  const inbound = await db.inboundEmail.findMany({
    where: { customerId: null, enterpriseCustomerId: null, receivedAt: { gte: since } },
    select: { fromEmail: true, fromName: true, subject: true, bodyPlain: true, receivedAt: true },
  })
  const outsideLeads = (inbound as any[])
    .filter((i) => CRED_RE.test(i.subject ?? '') || CRED_RE.test((i.bodyPlain ?? '').split(/\nOn .{5,80}wrote:|\n>/)[0].slice(0, 3000)))
    .filter((i) => !/nypllc\.com|google\.com|caqh\.org|zapier|noreply|no-reply/i.test(i.fromEmail))
    .map((i) => ({ fromEmail: i.fromEmail.toLowerCase(), fromName: i.fromName ?? '', subject: i.subject, receivedAt: i.receivedAt.toISOString().slice(0, 10) }))

  // MBS tenant PLLC names (separate DB), READ ONLY session, one SELECT.
  let mbs: string[] | null = null
  const envLocal = fs.readFileSync(`${CRM}/.env.local`, 'utf8')
  const m = envLocal.match(/^MBS_DATABASE_URL=(.*)$/m)
  const url = m ? m[1].trim().replace(/^["']|["']$/g, '') : ''
  if (url) {
    const pg: any = await import(`${CRM}/node_modules/pg/lib/index.js`)
    const Client = pg.Client ?? pg.default?.Client
    const c = new Client({ connectionString: url, ssl: { rejectUnauthorized: false } })
    await c.connect()
    await c.query('SET SESSION CHARACTERISTICS AS TRANSACTION READ ONLY')
    const r = await c.query('SELECT name FROM "Pllc"')
    mbs = r.rows.map((x: any) => x.name)
    await c.end()
  }

  fs.writeFileSync(out, JSON.stringify({
    exportedAt: new Date().toISOString(),
    pllcs: rows,
    outsideInboundCredLeads: outsideLeads,
    doNotSend: { nameRegex: dns.DO_NOT_SEND_NAME.source, emails: [...dns.DO_NOT_SEND_EMAILS] },
    mbsPllcNames: mbs,
  }, null, 1))
  console.log(`pllcs ${rows.length}, credentialing touches ${rows.filter((r) => r.credentialingTouch).length}, do-not-send ${rows.filter((r) => r.doNotSend).length}, outside inbound cred leads ${outsideLeads.length}, MBS pllcs ${mbs ? mbs.length : 'n/a'}`)
  await db.$disconnect()
}
main().catch((e) => { console.error(e); process.exit(1) })
