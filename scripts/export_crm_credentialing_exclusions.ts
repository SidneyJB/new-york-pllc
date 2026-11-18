/**
 * READ-ONLY export of CRM data used to filter the credentialing NPI mailing list.
 * Called by pull_credentialing_npi_list.py; run from PLLC-CRM/crm:
 *   cd ~/dev/pllc-business/PLLC-CRM/crm && npx tsx ../../new-york-pllc/scripts/export_crm_credentialing_exclusions.ts <out.json>
 * Only findMany calls; never writes to the database. Output holds client names: keep it out of git.
 */
const CRM = `${process.env.HOME}/dev/pllc-business/PLLC-CRM/crm`
import fs from 'fs'

async function main() {
  const out = process.argv[2]
  if (!out) throw new Error('usage: export_crm_credentialing_exclusions.ts <out.json>')
  await import(`${CRM}/scripts/load-env`)
  const { prisma: db } = await import(`${CRM}/lib/prisma`)

  const pllcs = await db.pllc.findMany({
    select: {
      id: true, name: true, state: true, entityType: true, formationStatus: true,
      caqhInfo: { select: { intakeStatus: true, type1Npi: true, type2Npi: true } },
      credentialingEngagements: {
        select: { status: true, items: { select: { kind: true, externalId: true } } },
      },
    },
  })

  const rows = pllcs.map((p: any) => {
    const npis = new Set<string>()
    for (const n of [p.caqhInfo?.type1Npi, p.caqhInfo?.type2Npi]) if (n && /^\d{10}$/.test(n.trim())) npis.add(n.trim())
    for (const e of p.credentialingEngagements)
      for (const i of e.items)
        if ((i.kind === 'NPI_TYPE1' || i.kind === 'NPI_TYPE2') && i.externalId && /^\d{10}$/.test(i.externalId.trim())) npis.add(i.externalId.trim())
    const hasEngagement = p.credentialingEngagements.length > 0
    // A CAQH intake past "draft" counts as a credentialing case too.
    const hasCaqhCase = !!p.caqhInfo && p.caqhInfo.intakeStatus !== 'draft'
    return {
      name: p.name,
      state: p.state,
      entityType: p.entityType,
      formationStatus: p.formationStatus,
      npis: [...npis],
      credentialingCase: hasEngagement || hasCaqhCase,
      caseReason: hasEngagement ? 'credentialing engagement' : hasCaqhCase ? `CAQH intake ${p.caqhInfo.intakeStatus}` : '',
    }
  })
  fs.writeFileSync(out, JSON.stringify({ exportedAt: new Date().toISOString(), pllcs: rows }, null, 1))
  console.log(`pllcs ${rows.length}, credentialing cases ${rows.filter((r: any) => r.credentialingCase).length}, with NPI ${rows.filter((r: any) => r.npis.length).length}`)
  await db.$disconnect()
}
main().catch((e) => { console.error(e); process.exit(1) })
