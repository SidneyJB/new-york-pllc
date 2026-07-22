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
const PATH = '/ny-pllc-cost'
const TITLE = `NY PLLC Cost: Complete 2026 Breakdown ($${PRICE} Flat Fee Explained) | NYPLLC`
const DESCRIPTION =
  'Every fee behind New York PLLC formation in 2026: NYSED, DOS filing, publication, and Certificate of Publication, plus why our $885 flat price never changes by county.'

/** FAQ only for questions not already answered in the body sections above. */
const COST_FAQS = [
  {
    question: 'Are there any hidden fees?',
    answer: `No. The $${PRICE} covers state filing fees (including 24-hour DOS expedite on Articles and Certificate of Publication and a DOS certified copy of your Articles), both newspaper publication runs, and our service fee. Extras like a DBA or virtual address are optional and quoted only if you ask for them.`,
  },
  {
    question: "Do fees ever change after I've paid?",
    answer: `No. Unless you request and approve a specific optional add-on, $${PRICE} is the final price.`,
  },
  {
    question: 'Does this cost cover LLC formation too, or only PLLCs?',
    answer:
      'This page is for PLLC formation only. We also form standard New York LLCs at a separate price.',
  },
  {
    question: 'What if I already have a PLLC formed in another state?',
    answer:
      "Foreign qualification into New York is a different process and price. This breakdown is for new NY PLLC formation only.",
  },
]

export const metadata = generateMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'NY PLLC cost',
    'New York PLLC formation cost',
    'PLLC filing fees New York',
    'NYSED Certificate of Authority fee',
    'PLLC publication cost',
    '$885 PLLC',
  ],
  canonical: PATH,
})

export default function NyPllcCostPage() {
  const baseUrl = SEO_CONFIG.siteUrl
  const published = '2026-07-22'

  return (
    <>
      <ScrollTracking />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateArticleSchema({
              headline: 'NY PLLC Cost: Complete 2026 Breakdown',
              description: DESCRIPTION,
              url: PATH,
              datePublished: published,
              dateModified: published,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(COST_FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: 'Home', item: baseUrl },
              { name: 'NY PLLC Cost 2026', item: `${baseUrl}${PATH}` },
            ]),
          ),
        }}
      />

      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={[{ label: 'NY PLLC Cost 2026' }]} />
        </div>
      </div>

      <section className="bg-gradient-to-br from-background via-muted/30 to-muted/50 py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              NY PLLC Cost: Complete 2026 Breakdown
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              As of July 2026, a new New York PLLC through NYPLLC.com is a flat{' '}
              <span className="font-semibold text-foreground">${PRICE}</span>, including NYSED
              pre-approval, expedited DOS filing with certified copy, both newspaper publications,
              expedited Certificate of Publication, EIN, Operating Agreement, and first-year registered
              agent. No later publishing invoice. No per-county surcharge.
            </p>
          </div>
        </div>
      </section>

      <article className="py-16 lg:py-20">
        <div className="container mx-auto max-w-3xl space-y-14 px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            This page explains costs and process. It is not legal or tax advice. We are not a law
            firm.
          </p>

          <section>
            <h2 className="mb-4 text-2xl font-bold tracking-tight">What&apos;s included</h2>
            <ul className="list-disc space-y-2 pl-6 text-base leading-7 text-foreground">
              <li>NYSED Office of the Professions pre-approval through Certificate of Authority</li>
              <li>
                PLLC Articles of Organization filed with the Department of State (24-hour expedited
                processing and certified copy included)
              </li>
              <li>EIN from the IRS</li>
              <li>Operating Agreement</li>
              <li>First-year registered agent ($99/year value)</li>
              <li>
                Six-week, two-newspaper publication and Certificate of Publication filing (24-hour
                expedited processing included)
              </li>
              <li>Status updates and bank-ready documents</li>
            </ul>
            <p className="mt-4">
              <Link href="/order" className="font-medium text-primary underline underline-offset-2">
                Start your PLLC: ${PRICE} →
              </Link>
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold tracking-tight">Government and third-party fees</h2>
            <p className="mb-4 text-base leading-7 text-muted-foreground">
              These are the line items underneath the flat price. All are included in the ${PRICE}{' '}
              unless noted as optional.
            </p>
            <div className="overflow-x-auto rounded-xl border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left font-semibold">
                      Fee
                    </th>
                    <th scope="col" className="px-4 py-3 text-left font-semibold">
                      Amount
                    </th>
                    <th scope="col" className="px-4 py-3 text-left font-semibold">
                      Included?
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="bg-card">
                    <td className="px-4 py-3">NYSED Certificate of Authority</td>
                    <td className="px-4 py-3">$50 + $10 per member (e.g. $60 single-member)</td>
                    <td className="px-4 py-3">Yes</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="px-4 py-3">
                      DOS Articles of Organization (incl. 24-hour expedite)
                    </td>
                    <td className="px-4 py-3">$225 ($200 filing + $25 expedite)</td>
                    <td className="px-4 py-3">Yes</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="px-4 py-3">Two-newspaper publication (6 weeks)</td>
                    <td className="px-4 py-3">
                      Varies by county; often a few hundred, $1,000+ in Manhattan/Bronx
                    </td>
                    <td className="px-4 py-3">Yes</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="px-4 py-3">
                      DOS Certificate of Publication (incl. 24-hour expedite)
                    </td>
                    <td className="px-4 py-3">$75 ($50 filing + $25 expedite)</td>
                    <td className="px-4 py-3">Yes</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="px-4 py-3">EIN</td>
                    <td className="px-4 py-3">$0</td>
                    <td className="px-4 py-3">Yes</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="px-4 py-3">DOS certified copy of Articles</td>
                    <td className="px-4 py-3">$10</td>
                    <td className="px-4 py-3">Yes</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="px-4 py-3">Assumed name / DBA (optional)</td>
                    <td className="px-4 py-3">{`$${PRICING.assumedNamePrice}`}</td>
                    <td className="px-4 py-3">No</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="px-4 py-3">
                      <Link
                        href="/virtual-address-services"
                        className="text-primary underline underline-offset-2"
                      >
                        Virtual address
                      </Link>{' '}
                      (optional)
                    </td>
                    <td className="px-4 py-3">$50/month</td>
                    <td className="px-4 py-3">No</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="px-4 py-3">NY Biennial Statement (after formation)</td>
                    <td className="px-4 py-3">Small DOS fee every two years</td>
                    <td className="px-4 py-3">No</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              State fees as of July 2026; the state can change them.
            </p>
          </section>

          <section className="space-y-4 text-base leading-7 text-foreground">
            <h2 className="text-2xl font-bold tracking-tight">Why Rockland County</h2>
            <p>
              Publication runs in the county listed as your PLLC&apos;s office location on the
              Articles, not necessarily where you live or see clients. High-cost counties like
              Manhattan or the Bronx can run $1,000+ for the same six-week, two-paper requirement.
            </p>
            <p>
              We list our Rockland County registered address as the office location for every
              formation we handle. That keeps publication cost consistent and is why one flat ${PRICE}{' '}
              works statewide. It does not change where you&apos;re licensed to practice, and we
              don&apos;t sell publication as a standalone service.
            </p>
            <p>
              DIY newspaper rules:{' '}
              <Link
                href="/how-to-form-a-pllc-in-ny"
                className="text-primary underline underline-offset-2"
              >
                how to form a PLLC in NY
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold tracking-tight">DIY vs. flat fee</h2>
            <p className="mb-4 text-base leading-7 text-muted-foreground">
              You can do it yourself with our{' '}
              <Link
                href="/how-to-form-a-pllc-in-ny"
                className="text-primary underline underline-offset-2"
              >
                DIY guide
              </Link>
              . Raw state fees alone can undercut ${PRICE} if publication in your county is cheap and
              nothing gets rejected. What you&apos;re trading is time, agency coordination, and the
              cost of redoing a failed step.
            </p>
            <div className="overflow-x-auto rounded-xl border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left font-semibold" />
                    <th scope="col" className="px-4 py-3 text-left font-semibold">
                      DIY
                    </th>
                    <th scope="col" className="px-4 py-3 text-left font-semibold">
                      Us (${PRICE})
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="bg-card">
                    <th scope="row" className="px-4 py-3 text-left font-semibold">
                      State filing fees
                    </th>
                    <td className="px-4 py-3">≈$370+ with expedite + certified copy</td>
                    <td className="px-4 py-3">Included</td>
                  </tr>
                  <tr className="bg-card">
                    <th scope="row" className="px-4 py-3 text-left font-semibold">
                      Publication
                    </th>
                    <td className="px-4 py-3">Your county&apos;s rates</td>
                    <td className="px-4 py-3">Included (Rockland)</td>
                  </tr>
                  <tr className="bg-card">
                    <th scope="row" className="px-4 py-3 text-left font-semibold">
                      Time / rework risk
                    </th>
                    <td className="px-4 py-3">On you</td>
                    <td className="px-4 py-3">On us</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-base leading-7 text-foreground">
              National &quot;$99 filing&quot; ads usually leave publication, EIN, registered agent, and
              the Operating Agreement out until checkout. Once those are added, those packages typically
              run into the thousands. Our flat ${PRICE} is about $200 cheaper than the next-cheapest
              complete options, with one price up front instead of a second invoice later.
            </p>
          </section>

          <section className="space-y-4 text-base leading-7 text-foreground">
            <h2 className="text-2xl font-bold tracking-tight">Timeline note</h2>
            <p>
              NYSED pre-approval is usually the long wait (see our{' '}
              <Link
                href="/nysed-approval-times"
                className="text-primary underline underline-offset-2"
              >
                live typical waits
              </Link>
              ), then six weeks of publication. Full stage-by-stage calendar:{' '}
              <Link
                href="/how-long-to-form-a-pllc-in-ny"
                className="text-primary underline underline-offset-2"
              >
                how long to form a PLLC in NY
              </Link>
              . Starting early is the main lever if you have a practice open date. Delays from defects
              usually mean paying a fee again.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold tracking-tight">Other questions</h2>
            <div className="space-y-6">
              {COST_FAQS.map((faq) => (
                <div key={faq.question}>
                  <h3 className="text-lg font-semibold text-foreground">{faq.question}</h3>
                  <p className="mt-2 text-base leading-7 text-muted-foreground">
                    {faq.question.includes('LLC formation') ? (
                      <>
                        This page is for PLLC formation only. We also form standard New York LLCs; see
                        the{' '}
                        <Link href="/order-llc" className="text-primary underline underline-offset-2">
                          LLC formation page
                        </Link>
                        .
                      </>
                    ) : faq.question.includes('another state') ? (
                      <>
                        Foreign qualification is a different process and price. See the{' '}
                        <Link
                          href="/foreign-pllc"
                          className="text-primary underline underline-offset-2"
                        >
                          foreign PLLC guide
                        </Link>
                        . This page is for new NY PLLC formation only.
                      </>
                    ) : (
                      faq.answer
                    )}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border bg-muted/30 p-8 text-center">
            <p className="text-lg font-semibold text-foreground">
              ${PRICE} flat. Rockland publication. No surprise invoices.
            </p>
            <Button asChild size="lg" className="mt-6">
              <Link href="/order">Start your PLLC: ${PRICE} →</Link>
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              We are not a law firm and do not provide legal advice.
            </p>
          </section>
        </div>
      </article>
    </>
  )
}
