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
  'The most common reasons NYSED returns a PLLC application, including name problems, errors in the Articles, and missing professional documents.'

const FAQS = [
  {
    question: 'What is an NYSED OP deficiency letter?',
    answer:
      'It is a request from the Office of the Professions to correct or provide something in your PLLC application. NYSED will not issue the Certificate of Authority until the request is resolved.',
  },
  {
    question: 'Does a deficiency mean my application was denied?',
    answer:
      'Usually, no. Most deficiency letters ask for a specific correction or supporting document. The application remains pending while NYSED waits for the response.',
  },
  {
    question: 'How should I respond to a deficiency letter?',
    answer:
      'Send exactly what NYSED requests and make sure every corrected document uses the same name, profession, and license information. Unrelated changes can cause more questions.',
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
  openGraph: { type: 'article' },
})

export default function NysedOpDeficienciesPage() {
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
              headline: '10 Common NYSED OP Deficiencies and How to Fix Them',
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
              { name: 'NYSED OP Deficiencies', item: `${baseUrl}${PATH}` },
            ]),
          ),
        }}
      />

      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={[{ label: 'NYSED OP Deficiencies' }]} />
        </div>
      </div>

      <section className="bg-gradient-to-br from-background via-muted/30 to-muted/50 py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              NYSED deficiency guide
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              10 common reasons NYSED returns a PLLC application
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              A deficiency letter usually asks for a correction, not a new application. The problem
              may be as small as a name mismatch or a missing signature. Here are ten issues that
              commonly hold up approval and how to avoid them.
            </p>
          </div>
        </div>
      </section>

      <article className="py-16 lg:py-20">
        <div className="container mx-auto max-w-3xl space-y-12 px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            This is general information, not legal advice. Requirements vary by profession and by
            application.
          </p>

          <ol className="space-y-10">
            <li className="space-y-2">
              <h2 className="text-2xl font-semibold">
                1. The name does not use NYSED&apos;s title for the profession
              </h2>
              <p className="text-muted-foreground leading-7">
                NYSED expects the business name and formation documents to describe the profession
                in terms it recognizes. A credential or specialty abbreviation may not be enough.
                For example, NYSED may ask for &quot;NP in Psychiatry&quot; instead of
                &quot;PMHNP.&quot; The wording should be consistent throughout the application.
              </p>
            </li>
            <li className="space-y-2">
              <h2 className="text-2xl font-semibold">2. The proposed name includes a restricted word</h2>
              <p className="text-muted-foreground leading-7">
                Some words imply a profession or make a claim NYSED will not approve. For example,
                &quot;behavioral&quot; and &quot;behavior&quot; may be restricted to Licensed
                Behavior Analysts. Names that promise a result or claim superiority can also be
                rejected. The usual solution is to remove the problem word and confirm the revised
                name before preparing new documents.
              </p>
            </li>
            <li className="space-y-2">
              <h2 className="text-2xl font-semibold">
                3. The owner&apos;s name does not match the license record
              </h2>
              <p className="text-muted-foreground leading-7">
                Small differences matter. A missing hyphen, an extra apostrophe, a nickname, or
                different spacing can cause a return. The owner&apos;s name should appear exactly as
                it does in NYSED&apos;s records wherever the application asks for it.
              </p>
            </li>
            <li className="space-y-2">
              <h2 className="text-2xl font-semibold">
                4. The entity name does not identify the profession
              </h2>
              <p className="text-muted-foreground leading-7">
                NYSED may require the name itself to state the profession. A podiatry practice, for
                example, may need &quot;Podiatry&quot; or &quot;Podiatrist&quot; in its name. A
                medical specialty such as Family Medicine or Radiology may require proof of board
                certification or residency.
              </p>
            </li>
            <li className="space-y-2">
              <h2 className="text-2xl font-semibold">
                5. Details in the Articles do not match
              </h2>
              <p className="text-muted-foreground leading-7">
                The profession, owner&apos;s name, and address must be consistent throughout the
                Articles and the rest of the application. Repeating the profession, listing more
                than one residence address, or spelling a name differently can hold up approval.
              </p>
            </li>
            <li className="space-y-2">
              <h2 className="text-2xl font-semibold">
                6. The Articles and professional form no longer match
              </h2>
              <p className="text-muted-foreground leading-7">
                A change to the business name or profession wording usually affects more than one
                document. NYSED may ask for both revised Articles and a newly notarized
                Professional Practice Entity form. Sending only one can leave the application
                incomplete.
              </p>
            </li>
            <li className="space-y-2">
              <h2 className="text-2xl font-semibold">
                7. The Professional Practice Entity form has a missing detail
              </h2>
              <p className="text-muted-foreground leading-7">
                The license number and original licensure date must match NYSED&apos;s records. If
                NYSED asks for a date of birth, it belongs on the specified line. The form must also
                be signed and notarized. An unsigned form will be returned even when everything
                else is correct.
              </p>
            </li>
            <li className="space-y-2">
              <h2 className="text-2xl font-semibold">
                8. A foreign professional entity application is missing New York details
              </h2>
              <p className="text-muted-foreground leading-7">
                An out-of-state professional entity applying to do business in New York must include
                its formation date, a complete New York location, and the New York license number.
                Listing only a county is not enough. NYSED can return a revised application again if
                one of those details is still missing.
              </p>
            </li>
            <li className="space-y-2">
              <h2 className="text-2xl font-semibold">
                9. NYSED needs proof of a specialty or current registration
              </h2>
              <p className="text-muted-foreground leading-7">
                A specialty in the business name may require a board certificate or residency
                record. An expired New York registration can also stop the application until the
                licensee renews it. Design professions and CPAs may need Form 6R and the related fee.
              </p>
            </li>
            <li className="space-y-2">
              <h2 className="text-2xl font-semibold">
                10. The name or ownership suggests a different practice structure
              </h2>
              <p className="text-muted-foreground leading-7">
                Words such as &quot;Group&quot; or a plural profession can draw a question when the
                PLLC has only one member. NYSED also limits which professions can own one entity
                together. For example, an LCSW and an LMSW cannot simply be combined in the same
                PLLC.
              </p>
            </li>
          </ol>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">What to do if NYSED contacts you</h2>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground leading-7">
              <li>Make a list of every correction and document NYSED requests.</li>
              <li>Check that names, dates, addresses, and profession titles match across the packet.</li>
              <li>Leave unrelated parts of the application alone.</li>
              <li>
                If the business name must change, settle on the new name before signing and
                notarizing replacement forms.
              </li>
            </ul>
          </section>

          <section className="rounded-lg border bg-muted/30 p-6 space-y-4">
            <h2 className="text-2xl font-semibold">PLLC formation for ${PRICE}</h2>
            <p className="text-muted-foreground leading-7">
              We prepare the NYSED application, respond to deficiency letters, and follow the
              application through the Certificate of Authority. The flat fee also includes the
              Department of State filing and required newspaper publication. You can check current
              review times in our{' '}
              <Link href="/nysed-approval-times" className="text-primary underline">
                NYSED approval time tracker
              </Link>{' '}
              or see the full{' '}
              <Link href="/ny-pllc-cost" className="text-primary underline">
                PLLC cost breakdown
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
