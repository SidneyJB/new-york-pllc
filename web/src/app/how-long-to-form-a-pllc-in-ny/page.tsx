import Link from 'next/link'
import { ScrollTracking } from '@/components/analytics/scroll-tracking'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { PRICING } from '@/lib/constants'
import { NYSED_APPROVAL_TIMES } from '@/lib/nysed-approval-times/data'
import { SEO_CONFIG } from '@/lib/seo/config'
import { generateMetadata } from '@/lib/seo/metadata'
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/lib/seo/structured-data'

const PRICE = PRICING.basePrice
const PATH = '/how-long-to-form-a-pllc-in-ny'
const NYSED_DAYS = NYSED_APPROVAL_TIMES.overall.medianCalendarDays
const TITLE = `How Long to Form a PLLC in NY (2026 Timeline) | NYPLLC`
const DESCRIPTION = `A New York PLLC typically takes several months to complete. Current NYSED pre-approval data from filings we handle shows a typical wait of ${NYSED_DAYS} days, followed by six weeks of required publication.`

const TIMELINE_FAQS = [
  {
    question: 'When can I start operating?',
    answer:
      'When Articles of Organization are filed and effective, the PLLC exists. You still have 120 days to finish publication and file the Certificate of Publication, or the state can suspend authority until you fix it. Your license rules still apply.',
  },
  {
    question: 'Can I expedite NYSED?',
    answer:
      'No. The Office of the Professions does not offer expedited PLLC pre-approval. A complete, accurate packet helps avoid a deficiency letter and another round of review.',
  },
  {
    question: `Does the $${PRICE} fee speed anything up?`,
    answer: `It includes 24-hour Department of State processing for the Articles of Organization and the Certificate of Publication. It does not shorten NYSED review or the six-week publication requirement.`,
  },
]

export const metadata = generateMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'how long to form a PLLC in NY',
    'New York PLLC formation timeline',
    'NYSED approval time',
    'PLLC publication 6 weeks',
    'how long does PLLC take New York',
  ],
  canonical: PATH,
})

export default function HowLongToFormPllcPage() {
  const baseUrl = SEO_CONFIG.siteUrl
  const published = '2026-07-22'
  const updatedLabel = new Date(NYSED_APPROVAL_TIMES.updatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/New_York',
  })

  return (
    <>
      <ScrollTracking />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateArticleSchema({
              headline: 'How Long Does It Take to Form a PLLC in New York?',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(TIMELINE_FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: 'Home', item: baseUrl },
              { name: 'How Long to Form a PLLC in NY', item: `${baseUrl}${PATH}` },
            ]),
          ),
        }}
      />

      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={[{ label: 'How Long to Form a PLLC in NY' }]} />
        </div>
      </div>

      <section className="bg-gradient-to-br from-background via-muted/30 to-muted/50 py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              How Long Does It Take to Form a PLLC in New York?
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              A New York PLLC usually takes several months from the first NYSED submission through the
              Certificate of Publication. The longest stage is NYSED review. Our current filings show a
              typical wait of <span className="font-semibold text-foreground">{NYSED_DAYS} days</span>.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              NYSED number updated <time dateTime={NYSED_APPROVAL_TIMES.updatedAt}>{updatedLabel}</time>
            </p>
          </div>
        </div>
      </section>

      <article className="py-16 lg:py-20">
        <div className="container mx-auto max-w-3xl space-y-12 px-4 sm:px-6 lg:px-8 text-base leading-7 text-foreground">
          <p className="text-sm text-muted-foreground">
            Timing overview only. Not legal advice. We are not a law firm. Your file can run longer.
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">The formation timeline</h2>
            <ul className="list-disc space-y-3 pl-6">
              <li>
                <strong>NYSED pre-approval:</strong> The Office of the Professions must approve the
                PLLC before the Department of State can accept the Articles. The typical wait is about{' '}
                {NYSED_DAYS} days after submission. NYSED does not offer an expedited option. Review
                times by profession and month are on our{' '}
                <Link
                  href="/nysed-approval-times"
                  className="text-primary underline underline-offset-2"
                >
                  NYSED approval times
                </Link>
                .
              </li>
              <li>
                <strong>Articles of Organization:</strong> After NYSED approval, the Articles go to the
                Department of State. We include 24-hour processing. Once filed, the PLLC is formed.
              </li>
              <li>
                <strong>Publication:</strong> The formation notice must run for six consecutive weeks
                in two county-designated newspapers.
              </li>
              <li>
                <strong>Certificate of Publication:</strong> After both newspapers issue affidavits,
                the Certificate of Publication is filed with the Department of State. We include
                24-hour processing for this filing as well.
              </li>
            </ul>
            <p>
              With a complete packet and no deficiency letter, the process commonly takes about{' '}
              <strong>3.5 to 5 months</strong>. A name issue, a deficiency letter, or a publication
              notice that does not match the DOS record can add time.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">When the PLLC actually exists</h2>
            <p>
              Your PLLC exists when the Articles of Organization become effective. At that point, you
              can obtain an EIN and open a bank account, subject to your professional licensing rules.
              Publication must still be completed and the Certificate of Publication filed within 120
              days. If that deadline is missed, the state can suspend the PLLC's authority to conduct
              business until the requirement is completed.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Common sources of delay</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>A proposed name that does not meet NYSED or DOS requirements</li>
              <li>A deficiency letter from NYSED</li>
              <li>Different spelling, punctuation, or dates across the NYSED packet, Articles, and publication notice</li>
              <li>Routine rather than expedited DOS processing</li>
              <li>Starting the process after a lease, loan, payer enrollment, or opening date is already fixed</li>
            </ul>
            <p>
              DIY walkthrough:{' '}
              <Link
                href="/how-to-form-a-pllc-in-ny"
                className="text-primary underline underline-offset-2"
              >
                how to form a PLLC in NY
              </Link>
              . Costs:{' '}
              <Link href="/ny-pllc-cost" className="text-primary underline underline-offset-2">
                NY PLLC cost 2026
              </Link>
              .
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Quick answers</h2>
            {TIMELINE_FAQS.map((faq) => (
              <div key={faq.question}>
                <h3 className="text-lg font-semibold text-foreground">{faq.question}</h3>
                <p className="mt-2 text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </section>

          <section className="rounded-xl border bg-muted/30 p-8 text-center">
            <p className="text-lg font-semibold text-foreground">
              ${PRICE} includes NYSED pre-approval, expedited DOS filings, publication, and the
              Certificate of Publication.
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
