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
const PATH = '/pllc-vs-llc'
const OP_DAYS = NYSED_APPROVAL_TIMES.overall.medianCalendarDays
const AS_OF = NYSED_APPROVAL_TIMES.asOf
const PT_DAYS =
  NYSED_APPROVAL_TIMES.byProfession.find((p) => p.professionSlug === 'physical-therapy')
    ?.medianCalendarDays ?? 78
const LCSW_DAYS =
  NYSED_APPROVAL_TIMES.byProfession.find(
    (p) => p.professionSlug === 'licensed-clinical-social-work',
  )?.medianCalendarDays ?? 54

const TITLE = 'PLLC vs LLC in New York for Licensed Professionals | NYPLLC'
const DESCRIPTION = `If you practice a licensed profession in New York, a regular LLC is the wrong entity. A PLLC needs NYSED pre-approval (typical wait ${OP_DAYS} days in our filings) before DOS will take the Articles.`

const FAQS = [
  {
    question: 'Can I practice in New York through a regular LLC?',
    answer:
      'Generally no. The Department of State will file an LLC for almost anyone. That filing does not authorize you to practice a licensed profession through the company. Most Title VIII professions need a PLLC (or PC) and a Certificate of Authority from the Office of the Professions first.',
  },
  {
    question: 'Does a New York LLC skip the newspaper publication?',
    answer:
      'No. Both an LLC and a PLLC publish for six weeks in two newspapers, then file a Certificate of Publication. Forming the cheap LLC first does not dodge that step. You still publish again on the PLLC.',
  },
  {
    question: 'I already have an LLC. Can I convert it to a PLLC?',
    answer: `New York does not treat that as a paperwork swap. The usual path is a new PLLC: OP packet, new Articles, new EIN, new bank, and a new publication run. The old LLC can sit unused or get dissolved. We form the PLLC for $${PRICE}. Cleaning up the LLC is separate.`,
  },
  {
    question: 'What about attorneys?',
    answer:
      'Law is still a professional entity. Attorneys typically form a PLLC (or PC or LLP), not a generic LLC. NYSED does not review law firms. Each attorney owner usually needs a Certificate of Good Standing from the Appellate Division instead.',
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
  robots: { index: false, follow: false },
})

export default function PllcVsLlcPage() {
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
              headline: 'PLLC vs LLC in New York for Licensed Professionals',
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
              { name: 'PLLC vs LLC', item: `${baseUrl}${PATH}` },
            ]),
          ),
        }}
      />

      <div className="border-b bg-background/95 backdrop-filter">
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
              If you see patients or clients under a New York license, you want a PLLC. A regular
              LLC is faster to file and the wrong vehicle for the practice. DOS will take the LLC
              paperwork anyway. That is how people waste a filing fee, an EIN, and then a second
              publication run.
            </p>
          </div>
        </div>
      </section>

      <article className="py-16 lg:py-20">
        <div className="container mx-auto max-w-3xl space-y-12 px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            Not legal advice. We are not a law firm. Profession rules differ; attorneys do not go
            through NYSED.
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">The short version</h2>
            <p className="text-muted-foreground leading-7">
              A New York LLC can be owned by anyone and used for almost any lawful business. A
              PLLC can only practice the profession on its Certificate of Authority, and only
              licensees in that profession may own and manage it. OP has to approve the professional
              entity before the Department of State will file the Articles.
            </p>
            <p className="text-muted-foreground leading-7">
              Both entities still publish in two newspapers for six weeks. The extra time on a PLLC
              is OP, not publication.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">What actually changes</h2>
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
                    <td className="px-4 py-3">Licensees in that profession</td>
                  </tr>
                  <tr className="bg-card">
                    <th scope="row" className="px-4 py-3 text-left font-semibold">
                      Practice a licensed profession through it
                    </th>
                    <td className="px-4 py-3">No</td>
                    <td className="px-4 py-3">Yes, once OP issues the Certificate of Authority</td>
                  </tr>
                  <tr className="bg-card">
                    <th scope="row" className="px-4 py-3 text-left font-semibold">
                      NYSED OP pre-approval
                    </th>
                    <td className="px-4 py-3">None</td>
                    <td className="px-4 py-3">Required for most Title VIII professions</td>
                  </tr>
                  <tr className="bg-card">
                    <th scope="row" className="px-4 py-3 text-left font-semibold">
                      Typical extra wait
                    </th>
                    <td className="px-4 py-3">DOS can file in days</td>
                    <td className="px-4 py-3">
                      {OP_DAYS} days median OP wait in our 2026 filings (as of {AS_OF})
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <th scope="row" className="px-4 py-3 text-left font-semibold">
                      Six-week publication
                    </th>
                    <td className="px-4 py-3">Yes</td>
                    <td className="px-4 py-3">Yes. Same clock.</td>
                  </tr>
                  <tr className="bg-card">
                    <th scope="row" className="px-4 py-3 text-left font-semibold">
                      Name
                    </th>
                    <td className="px-4 py-3">Broad, as long as DOS can distinguish it</td>
                    <td className="px-4 py-3">
                      Profession in OP&apos;s wording. Marketing names bounce.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">The wait you cannot buy your way out of</h2>
            <p className="text-muted-foreground leading-7">
              From our live NYSED mailbox, the typical Office of the Professions wait (OP Submitted
              to OP Approved) is {OP_DAYS} calendar days as of {AS_OF}. That number moves. Physical
              therapy in the same pull sat at {PT_DAYS} days. Licensed clinical social work sat at{' '}
              {LCSW_DAYS}.
            </p>
            <p className="text-muted-foreground leading-7">
              A national formation site can still spit out an LLC in an afternoon because it never
              talks to OP. Banks will sometimes open on the LLC EIN. Credentialing, malpractice, and
              the Education Department will not treat that LLC as your practice.
            </p>
            <p className="text-muted-foreground leading-7">
              Updated monthly on our{' '}
              <Link href="/nysed-approval-times" className="text-primary underline underline-offset-2">
                NYSED approval-time tracker
              </Link>
              . End-to-end calendar:{' '}
              <Link
                href="/how-long-to-form-a-pllc-in-ny"
                className="text-primary underline underline-offset-2"
              >
                how long a NY PLLC actually takes
              </Link>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Publication is not the difference</h2>
            <p className="text-muted-foreground leading-7">
              People shop LLC vs PLLC as if the newspaper run were a PLLC tax. It is not. Limited
              liability companies in New York publish. Professional ones do too. Two papers, six
              weeks, then a Certificate of Publication with DOS.
            </p>
            <p className="text-muted-foreground leading-7">
              File the LLC first and you pay for that run on the LLC. Form the PLLC later and you
              publish again. We run every formation&apos;s publication from our Rockland County
              office address so the package stays one flat ${PRICE} instead of Manhattan newspaper
              rates. Line-item fees:{' '}
              <Link href="/ny-pllc-cost" className="text-primary underline underline-offset-2">
                NY PLLC cost breakdown
              </Link>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">What happens if you file the LLC anyway</h2>
            <p className="text-muted-foreground leading-7">
              DOS is a filing office. It will accept Articles of Organization for &quot;consulting&quot;
              from a licensed social worker. OP is the gate for practicing through an entity. Insurers
              and CAQH want the professional entity on the application. So the LLC sits there with an
              EIN while the real work has not started.
            </p>
            <p className="text-muted-foreground leading-7">
              New York does not offer a clean &quot;turn this LLC into a PLLC&quot; button. You form
              a PLLC. New Articles. New OP packet. Usually a new EIN. New publication. The LLC is
              leftover.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">When a regular LLC is still in the picture</h2>
            <p className="text-muted-foreground leading-7">
              An LLC is the right entity for work that is not the licensed practice: a billing
              company, a real-estate holdco, software, a management company that does not see
              patients. It is not a shortcut around NYSED for the clinic itself.
            </p>
            <p className="text-muted-foreground leading-7">
              A professional corporation (PC) is the other professional form. Different statute,
              different tax conversation. Separate page. If you are choosing an entity so you can
              treat people, the fork is PLLC or PC, not LLC.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Attorneys</h2>
            <p className="text-muted-foreground leading-7">
              Law firms still use a professional entity. NYSED does not review them. Each attorney
              owner typically gives us a Certificate of Good Standing from the Appellate Division,
              and we file with DOS from there. Nonlawyer ownership is off the table. Details on the{' '}
              <Link href="/professions/law" className="text-primary underline underline-offset-2">
                law firm PLLC page
              </Link>
              .
            </p>
          </section>

          <section className="rounded-lg border bg-muted/30 p-6 space-y-4">
            <h2 className="text-2xl font-semibold">If you already know you need the PLLC</h2>
            <p className="text-muted-foreground leading-7">
              ${PRICE} covers the OP packet, DOS Articles (24-hour expedite and certified copy),
              six-week publication, Certificate of Publication, EIN, operating agreement, and
              first-year registered agent. We answer OP deficiency letters at no extra charge.
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
