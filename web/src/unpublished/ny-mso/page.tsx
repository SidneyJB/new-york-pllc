import Link from 'next/link'
import { ScrollTracking } from '@/components/analytics/scroll-tracking'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SpiffyScript } from '@/components/spiffy/spiffy-script'
import { PRICING } from '@/lib/constants'
import { SEO_CONFIG } from '@/lib/seo/config'
import { generateMetadata } from '@/lib/seo/metadata'
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/lib/seo/structured-data'
import { MsoFallbackCheckoutNotice } from './mso-fallback-checkout-notice'
import { SpiffyMsoCheckout } from './spiffy-mso-checkout'

const PATH = '/ny-mso'
const PAIR = PRICING.msoPairPrice
const COUNSEL = PRICING.msoCounselPrice
const RA = PRICING.msoPairRaYearTwo
const VM = PRICING.msoPairVmMonthly

const TITLE = `NY PLLC + Management LLC — $${PAIR} | NYPLLC`
const DESCRIPTION = `Form a New York practice PLLC and a management LLC together for $${PAIR}. Publication included on both. Independent NY counsel drafts the management agreement ($${COUNSEL}, billed separately) after DOS filing.`

const FAQS = [
  {
    question: 'What is in the $1,770 pair?',
    answer: `A practice PLLC and a management LLC: Articles, six-week publication, Certificate of Publication, year-one registered agent, and EIN support on both. It does not include a management services agreement, S Corp, DBA, CAQH, or virtual mail.`,
  },
  {
    question: 'Who writes the management services agreement?',
    answer: `Independent New York counsel. They bill you $${COUNSEL} directly. We introduce you after the professional entity is filed with the Department of State — not from this page. We do not draft MSAs and do not take a referral fee.`,
  },
  {
    question: 'I already have a PLLC. Can I add only the management LLC?',
    answer: `Yes. Form the LLC through our standard LLC order ($${PRICING.basePrice}) and use counsel for the agreement ($${COUNSEL}). Email contact@nypllc.com if you want that path invoiced.`,
  },
  {
    question: 'Is this legal advice or a CPOM opinion?',
    answer:
      'No. This is a formation package for two entities. Whether a two-entity setup is appropriate for your practice is between you and counsel.',
  },
]

export const metadata = generateMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['NY MSO', 'PLLC and management LLC', 'New York management LLC', 'practice PLLC MSO'],
  canonical: PATH,
  robots: { index: false, follow: false },
})

export default function NyMsoPage() {
  const published = '2026-09-01'

  return (
    <>
      <SpiffyScript />
      <ScrollTracking />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateArticleSchema({
              headline: 'NY PLLC + Management LLC',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: 'Home', item: SEO_CONFIG.siteUrl },
              { name: 'PLLC + management LLC', item: `${SEO_CONFIG.siteUrl}${PATH}` },
            ]),
          ),
        }}
      />

      <div className="flex flex-col">
        <div className="border-b bg-background/95">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb items={[{ label: 'PLLC + management LLC' }]} />
          </div>
        </div>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-medium text-primary">Two-entity formation</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
              Practice PLLC + management LLC — ${PAIR}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              For licensed professionals who need a practice entity and a separate management company.
              We form both New York entities, including publication on each. A management services
              agreement is <strong>${COUNSEL}</strong>, billed by independent NY counsel after the
              professional entity is filed with DOS. We do not name counsel on this site.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Not legal advice. Not a corporate-practice opinion. Medspa, aesthetics, IV therapy,
              ketamine, and medical-director wellness models are out of scope.
            </p>
          </div>
        </section>

        <section className="border-y bg-muted/30 py-12">
          <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-4 text-sm">
            <p>
              <strong>${PAIR}</strong> covers both formations, publication, year-one registered agent
              on both, and EIN support. After year one, registered agent is <strong>${RA}/year for
              both entities</strong> (not two $99 Direct-RA plans). Optional virtual mail is{' '}
              <strong>${VM}/month for both</strong> (one mailbox).
            </p>
            <p>
              Not included: MSA, S Corp (${PRICING.sCorpPrice} per entity if you elect), DBA ($
              {PRICING.assumedNamePrice}), CAQH, HIPAA packs, fair-market-value opinions.
            </p>
            <p>
              Already have a PLLC? Use{' '}
              <Link href="/order-llc" className="text-primary underline underline-offset-2">
                LLC formation (${PRICING.basePrice})
              </Link>{' '}
              plus counsel at ${COUNSEL}. Only need a PLLC?{' '}
              <Link href="/order" className="text-primary underline underline-offset-2">
                Standard formation (${PRICING.basePrice})
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <MsoFallbackCheckoutNotice />
            <Card>
              <CardHeader>
                <CardTitle>Order the ${PAIR} pair</CardTitle>
                <CardDescription>
                  Same thank-you / <code>total=</code> pattern as PLLC checkout. Ask for an invoice
                  if you prefer not to use the form.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SpiffyMsoCheckout />
              </CardContent>
            </Card>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Questions before you order?{' '}
              <Link href="/contact" className="text-primary underline underline-offset-2">
                Contact us
              </Link>
              .
            </p>
            <div className="mt-8 flex justify-center">
              <Button variant="outline" asChild>
                <Link href="/order">I only need a PLLC — ${PRICING.basePrice}</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
