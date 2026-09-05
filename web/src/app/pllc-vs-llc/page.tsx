import Link from 'next/link'
import { ScrollTracking } from '@/components/analytics/scroll-tracking'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { PRICING } from '@/lib/constants'
import { SEO_CONFIG } from '@/lib/seo/config'
import { generateMetadata } from '@/lib/seo/metadata'
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/lib/seo/structured-data'

const PRICE = PRICING.basePrice
const PATH = '/pllc-vs-llc'

const TITLE = 'PLLC vs LLC in New York for Licensed Professionals | NYPLLC'
const DESCRIPTION =
  'Do licensed professionals in New York need a PLLC or a regular LLC? Compare the rules, timing, ownership, and publication requirements.'

const FAQS = [
  {
    question: 'Can I practice in New York through a regular LLC?',
    answer:
      'Usually not. If clients or patients will pay the company for work that requires your professional license, you generally need a PLLC or professional corporation. Registering a regular LLC does not authorize it to provide licensed services.',
  },
  {
    question: 'Does a New York LLC skip the newspaper publication?',
    answer:
      'No. Both LLCs and PLLCs must publish notices in two newspapers for six weeks and then file a Certificate of Publication. If you form an LLC first and later form a PLLC, the PLLC has its own publication requirement.',
  },
  {
    question: 'I already have an LLC. Can I convert it to a PLLC?',
    answer:
      'New York generally requires you to form a new PLLC rather than change the LLC into one. The PLLC will need its own approval, state filing, tax ID, and newspaper publication. Ask an attorney or accountant what to do with the old LLC.',
  },
  {
    question: 'What about attorneys?',
    answer:
      'Attorneys can form PLLCs, but their approval does not come from NYSED. Each attorney owner generally provides a Certificate of Good Standing from the appropriate Appellate Division.',
  },
]

export const metadata = generateMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'PLLC vs LLC New York',
    'PLLC versus LLC licensed professional',
    'do I need a PLLC in NY',
    'New York professional LLC vs LLC',
  ],
  canonical: PATH,
  openGraph: { type: 'article' },
})

export default function PllcVsLlcPage() {
  const baseUrl = SEO_CONFIG.siteUrl
  const published = '2026-09-02'
  const dateModified = '2026-09-04'

  return (
    <>
      <ScrollTracking />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateArticleSchema({
              headline: 'PLLC vs LLC in New York for Licensed Professionals',
              description: DESCRIPTION,
              url: PATH,
              datePublished: published,
              dateModified: dateModified,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: 'Home', item: baseUrl },
              { name: 'PLLC vs LLC', item: `${baseUrl}${PATH}` },
            ]),
          ),
        }}
      />

      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={[{ label: 'PLLC vs LLC' }]} />
        </div>
      </div>

      <section className="bg-muted/30 py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              For licensed professionals in New York
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              PLLC vs LLC in New York
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              If patients or clients will pay your business for work that requires your New York
              license, a regular LLC is usually not the right company. Most licensed practices need
              a PLLC or professional corporation.
            </p>
          </div>
        </div>
      </section>

      <article className="py-16 lg:py-20">
        <div className="container mx-auto max-w-3xl space-y-12 px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            This is general information, not legal advice. The rules vary by profession.
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Which one do you need?</h2>
            <p className="text-muted-foreground leading-7">
              A regular LLC works for a business that does not provide licensed professional
              services. Examples include a retail shop, software company, or real estate business.
            </p>
            <p className="text-muted-foreground leading-7">
              A PLLC is for a licensed practice. This includes many medical, dental, mental health,
              design, and accounting practices. New York checks the owners&apos; licenses and
              approves the company before it can be registered with the state.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">LLC and PLLC compared</h2>
            <div className="overflow-x-auto rounded-xl border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left font-semibold" />
                    <th scope="col" className="px-4 py-3 text-left font-semibold">
                      Regular LLC
                    </th>
                    <th scope="col" className="px-4 py-3 text-left font-semibold">
                      PLLC
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="bg-card">
                    <th scope="row" className="px-4 py-3 text-left font-semibold">
                      Who can own it
                    </th>
                    <td className="px-4 py-3">Anyone</td>
                    <td className="px-4 py-3">
                      Generally, people licensed in the company&apos;s profession
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <th scope="row" className="px-4 py-3 text-left font-semibold">
                      Best suited for
                    </th>
                    <td className="px-4 py-3">A business that does not provide licensed services</td>
                    <td className="px-4 py-3">A licensed professional practice</td>
                  </tr>
                  <tr className="bg-card">
                    <th scope="row" className="px-4 py-3 text-left font-semibold">
                      Professional approval
                    </th>
                    <td className="px-4 py-3">Not required</td>
                    <td className="px-4 py-3">Required for most licensed professions</td>
                  </tr>
                  <tr className="bg-card">
                    <th scope="row" className="px-4 py-3 text-left font-semibold">
                      Formation time
                    </th>
                    <td className="px-4 py-3">Usually faster</td>
                    <td className="px-4 py-3">Longer because professional approval comes first</td>
                  </tr>
                  <tr className="bg-card">
                    <th scope="row" className="px-4 py-3 text-left font-semibold">
                      Newspaper publication
                    </th>
                    <td className="px-4 py-3">Yes</td>
                    <td className="px-4 py-3">Yes</td>
                  </tr>
                  <tr className="bg-card">
                    <th scope="row" className="px-4 py-3 text-left font-semibold">
                      Name
                    </th>
                    <td className="px-4 py-3">Standard business naming rules</td>
                    <td className="px-4 py-3">Must follow the profession&apos;s naming rules</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Why a PLLC takes longer</h2>
            <p className="text-muted-foreground leading-7">
              New York must approve the professional side of the business before the company can be
              formed. The state checks the owners&apos; licenses, the proposed name, and the
              profession the company will provide.
            </p>
            <p className="text-muted-foreground leading-7">
              The wait varies by profession and by the time of year. Filing a regular LLC does not
              bypass this step. It only creates a different company that may not be allowed to
              provide your professional services.
            </p>
            <p className="text-muted-foreground leading-7">
              <Link href="/nysed-approval-times" className="text-primary underline underline-offset-2">
                See current NYSED approval times
              </Link>
              {' '}or read our guide to{' '}
              <Link
                href="/how-long-to-form-a-pllc-in-ny"
                className="text-primary underline underline-offset-2"
              >
                how long it takes to form a New York PLLC
              </Link>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Both entities must publish</h2>
            <p className="text-muted-foreground leading-7">
              New York requires both an LLC and a PLLC to run notices in two newspapers for six
              weeks. The publication requirement is not a reason to choose one over the other.
            </p>
            <p className="text-muted-foreground leading-7">
              If you publish an LLC and later learn that you need a PLLC, the PLLC must publish
              again under its own name. Publication is included in our ${PRICE} PLLC package. See
              the{' '}
              <Link href="/ny-pllc-cost" className="text-primary underline underline-offset-2">
                complete price breakdown
              </Link>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">If you already formed an LLC</h2>
            <p className="text-muted-foreground leading-7">
              Registering an LLC does not give it permission to provide services that require your
              license. If you needed a PLLC from the start, New York will generally require you to
              form a new one.
            </p>
            <p className="text-muted-foreground leading-7">
              The new PLLC will have its own state filing, tax ID, bank account, and publication.
              Ask an attorney or accountant whether to close the LLC or keep it for a separate
              purpose.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">When a regular LLC may make sense</h2>
            <p className="text-muted-foreground leading-7">
              You may still use an LLC for a separate business that does not provide licensed
              services. A therapist might use a PLLC for the practice and a separate LLC for
              unrelated software or real estate. The LLC cannot take the place of the practice
              itself.
            </p>
            <p className="text-muted-foreground leading-7">
              A professional corporation is another possible structure for the practice. An
              attorney or accountant can help you compare that option with a PLLC.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">A note for attorneys</h2>
            <p className="text-muted-foreground leading-7">
              Law firm PLLCs follow a different route. NYSED does not approve them. Each attorney
              owner generally needs a Certificate of Good Standing from the appropriate Appellate
              Division. Read more on our{' '}
              <Link href="/professions/law" className="text-primary underline underline-offset-2">
                law firm PLLC page
              </Link>
              .
            </p>
          </section>

          <section className="rounded-lg border bg-muted/30 p-6 space-y-4">
            <h2 className="text-2xl font-semibold">We form New York PLLCs for ${PRICE}</h2>
            <p className="text-muted-foreground leading-7">
              The flat fee covers professional approval, formation with New York State, required
              newspaper publication, a tax ID, an operating agreement, and registered agent service
              for the first year. There are no extra charges if NYSED asks for a correction.
            </p>
            <Button asChild>
              <Link href="/order">Start your PLLC</Link>
            </Button>
          </section>
        </div>
      </article>
    </>
  )
}
