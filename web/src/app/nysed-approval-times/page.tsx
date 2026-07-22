import { TrackerContent } from '@/components/nysed-approval-times/tracker-content'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { NYSED_APPROVAL_TIMES } from '@/lib/nysed-approval-times/data'
import { generateApprovalTimesDatasetSchema } from '@/lib/nysed-approval-times/generate-dataset-schema'
import { SEO_CONFIG } from '@/lib/seo/config'
import { generateMetadata as buildMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data'

export const metadata = buildMetadata({
  title: 'How Long Does NYSED Take to Approve a PLLC? | NYPLLC',
  description:
    'As of July 2026, the typical NYSED Office of the Professions wait for PLLC pre-approval is about 56 days, based on real filings we handle. Updated monthly.',
  canonical: '/nysed-approval-times',
})

export default function NysedApprovalTimesPage() {
  const data = NYSED_APPROVAL_TIMES
  const datasetSchema = generateApprovalTimesDatasetSchema(data)
  const baseUrl = SEO_CONFIG.siteUrl
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: baseUrl },
    { name: 'NYSED Approval Times', item: `${baseUrl}/nysed-approval-times` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={[{ label: 'NYSED Approval Times' }]} />
        </div>
      </div>
      <TrackerContent data={data} />
    </>
  )
}
