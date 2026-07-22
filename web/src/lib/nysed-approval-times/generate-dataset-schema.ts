import { SEO_CONFIG } from '@/lib/seo/config'
import type { ApprovalTimesPublicPayload } from './types'

/** Dataset JSON-LD. Wait times only — no sample sizes or formation counts. */
export function generateApprovalTimesDatasetSchema(data: ApprovalTimesPublicPayload) {
  const distribution = data.byProfession.map((row) => ({
    '@type': 'DataDownload',
    name: row.professionLabel,
    description: `Typical NYSED pre-approval wait for ${row.professionLabel}: ${row.medianCalendarDays} days`,
    encodingFormat: 'text/plain',
  }))

  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'NYSED PLLC Pre-Approval Wait Times',
    description:
      'Typical wait from Office of the Professions packet send to pre-approval for New York PLLC formations, based on filings handled by NYPLLC.',
    url: `${SEO_CONFIG.siteUrl}/nysed-approval-times`,
    creator: {
      '@type': 'Organization',
      name: SEO_CONFIG.companyInfo.name,
      url: SEO_CONFIG.siteUrl,
    },
    temporalCoverage: data.asOf,
    dateModified: data.updatedAt,
    variableMeasured: [
      {
        '@type': 'PropertyValue',
        name: 'Typical calendar days to NYSED pre-approval',
        value: data.overall.medianCalendarDays,
        unitText: 'day',
      },
    ],
    distribution,
  }
}
