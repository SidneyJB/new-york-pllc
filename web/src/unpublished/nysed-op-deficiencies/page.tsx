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
const PATH = '/nysed-op-deficiencies'
const TITLE = '10 Most Common NYSED OP PLLC Deficiencies (and How to Fix Them) | NYPLLC'
const DESCRIPTION =
  'Ranked NYSED Office of the Professions deficiency patterns from hundreds of real New York PLLC filings: names, Articles paragraphs, PPE, and board documents, with the fix for each.'

const FAQS = [
  {
    question: 'What is an NYSED OP deficiency letter?',
    answer:
      'A processor at the Office of the Professions emails (or mails) a specific ask: change the name, fix an Articles paragraph, replace the PPE, or send a board certificate. Until that item is answered, the Certificate of Authority stays pending.',
  },
  {
    question: 'Do you publish client names from deficiency letters?',
    answer:
      'No. Counts below are de-identified thread totals from our inbound NYSED mailbox. We cite patterns, not people.',
  },
  {
    question: 'Will answering a deficiency restart the clock?',
    answer:
      'Usually the file stays with the same processor. Extra changes beyond what they asked can create a new deficiency and more weeks.',
  },
]

export const metadata = generateMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'NYSED deficiency',
    'OP PLLC correction',
    'Certificate of Authority delay',
    'NYSED name rejection',
    'PPE notarized NYSED',
  ],
  canonical: PATH,
})

export default function NysedOpDeficienciesPage() {
  const baseUrl = SEO_CONFIG.siteUrl
  const published = '2026-09-02'

  return (
    <>
      <ScrollTracking />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateArticleSchema({
              headline: 'The 10 Most Common NYSED OP Deficiencies',
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
              { name: 'Home', item: baseUrl },
              { name: 'NYSED OP Deficiencies', item: `${baseUrl}${PATH}` },
            ]),
          ),
        }}
      />

      <div className="border-b bg-background/95 backdrop-filter">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={[{ label: 'NYSED OP Deficiencies' }]} />
        </div>
      </div>

      <section className="bg-gradient-to-br from-background via-muted/30 to-muted/50 py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Original data from live filings
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              The 10 most common NYSED OP deficiencies
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We clustered every NYSED.gov message in our CRM inbox from December 2025 through August
              2026: 654 messages, 478 threads. After dropping queue mail (certified-copy receipts,
              &quot;added to our queue,&quot; not-under-review holds), name and paperwork corrections
              dominate. This page ranks what processors actually ask for, with the fix we use on{' '}
              ${PRICE} formations.
            </p>
          </div>
        </div>
      </section>

      <article className="py-16 lg:py-20">
        <div className="container mx-auto max-w-3xl space-y-12 px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            Not legal advice. Thread counts are classifier primaries on de-identified mail. A
            certified-copy queue notice is not a deficiency.
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">What the mailbox actually contains</h2>
            <p className="text-muted-foreground leading-7">
              211 threads were certified-copy / &quot;added to our queue.&quot; 63 were unmatched
              operational mail. 18 were consent-mailed notices. Those are not filing mistakes. The
              ranked list below is the remainder: names, Articles, PPE, profession, and board
              documents.
            </p>
          </section>

          <ol className="space-y-10">
            <li className="space-y-2">
              <h2 className="text-2xl font-semibold">1. Name does not match OP&apos;s profession title</h2>
              <p className="text-muted-foreground leading-7">
                60 threads in the &quot;name (other)&quot; bucket, plus 35 reserved / misleading /
                promissory. Processors want the profession in OP phrasing, not a credential alphabet:
                drop PMHNP; use NP in Psychiatry. Articles paragraph 2 and the PPE profession line
                must match that title, not a marketing label.
              </p>
            </li>
            <li className="space-y-2">
              <h2 className="text-2xl font-semibold">2. Reserved or promissory words</h2>
              <p className="text-muted-foreground leading-7">
                Behavioral / behavior is reserved for Licensed Behavior Analysts. Superiority and
                coined boasts (longevity, holistic / wholistic, Next Level, &quot;is not a word&quot;)
                come back as promissory. Fix: remove the token; do not invent a replacement name in
                the reply.
              </p>
            </li>
            <li className="space-y-2">
              <h2 className="text-2xl font-semibold">3. Legal name vs OP record</h2>
              <p className="text-muted-foreground leading-7">
                Hyphenated surnames, extra apostrophes, nicknames, and fused spacing (ClearGuide vs
                Clear Guide) must match the OP license record everywhere: Articles paragraph 5 and
                PPE. MD in the name must be preceded by the person&apos;s name, not a brand + MD.
              </p>
            </li>
            <li className="space-y-2">
              <h2 className="text-2xl font-semibold">4. Profession missing from the entity name</h2>
              <p className="text-muted-foreground leading-7">
                9 threads. Podiatry / Podiatrist must appear if that is the profession. Specialty
                words (Family Medicine, Radiology) often need ABMS or residency proof, not just the
                word in the name.
              </p>
            </li>
            <li className="space-y-2">
              <h2 className="text-2xl font-semibold">5. Articles-only bounce (paragraphs 2, 5, 6, 7)</h2>
              <p className="text-muted-foreground leading-7">
                14 threads. Paragraph 5 needs one residence address and the licensee name exactly as
                OP lists it. Paragraphs 6 and 7 are often requested together. Profession listed more
                than once in paragraph 2 is a bounce.
              </p>
            </li>
            <li className="space-y-2">
              <h2 className="text-2xl font-semibold">6. Articles + PPE together</h2>
              <p className="text-muted-foreground leading-7">
                14 threads. Default resubmit is revised Articles and a notarized PPE as separate
                PDFs on the same thread, Attn: the processor. After a name change they still want
                both unless the latest letter is PPE-only.
              </p>
            </li>
            <li className="space-y-2">
              <h2 className="text-2xl font-semibold">7. PPE only: dates, DOB line, notarization</h2>
              <p className="text-muted-foreground leading-7">
                9 threads. Licensure date must match OP. DOB goes on the numbered PPE line when
                asked. Unsigned PPE is rejected; they then ask for PPE-only. License issue dates must
                match each license number.
              </p>
            </li>
            <li className="space-y-2">
              <h2 className="text-2xl font-semibold">8. Foreign Application for Authority</h2>
              <p className="text-muted-foreground leading-7">
                6 threads. Paragraph 2 needs the date of formation. Paragraph 5 needs city or town
                or incorporated village and a county (not county-only). Paragraph 7 needs the NYS
                license number. A second review can still reject a &quot;fixed&quot; PDF.
              </p>
            </li>
            <li className="space-y-2">
              <h2 className="text-2xl font-semibold">9. Board, residency, or lapsed registration</h2>
              <p className="text-muted-foreground leading-7">
                5 board / residency / ABMS threads; 5 license / ID / 6R / unregistered. A certified
                copy sitting in queue while NY license registration is lapsed stays pending until
                Registration Unit renews. Design / CPA path needs Form 6R plus fee.
              </p>
            </li>
            <li className="space-y-2">
              <h2 className="text-2xl font-semibold">10. Group / plural or incompatible professions</h2>
              <p className="text-muted-foreground leading-7">
                Group or plural in the name for a single member still gets flagged. Incompatible
                professions cannot share one PLLC (example in this corpus: LCSW + LMSW). See OP
                Section I.
              </p>
            </li>
          </ol>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">How we answer a letter</h2>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground leading-7">
              <li>Answer only what the processor asked. Extra changes create new issues.</li>
              <li>Do not email corrections before a processor asks. Queue mail is not a deficiency.</li>
              <li>Do not invent replacement names in the client reply.</li>
              <li>Assumed names: they will not pre-clear DBAs by email. Mail $20 plus the Certificate of Assumed Name per name.</li>
            </ul>
          </section>

          <section className="rounded-lg border bg-muted/30 p-6 space-y-4">
            <h2 className="text-2xl font-semibold">We prepare the OP packet so this list stays a list</h2>
            <p className="text-muted-foreground leading-7">
              The ${PRICE} package includes OP packet prep, deficiency responses at no extra charge,
              and tracking through Certificate of Authority. See also our{' '}
              <Link href="/nysed-approval-times" className="text-primary underline">
                live NYSED approval-time tracker
              </Link>{' '}
              and{' '}
              <Link href="/ny-pllc-cost" className="text-primary underline">
                cost breakdown
              </Link>
              .
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
