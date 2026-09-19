import Link from 'next/link'
import { ScrollTracking } from '@/components/analytics/scroll-tracking'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { APP_CONFIG } from '@/lib/constants'
import { SEO_CONFIG } from '@/lib/seo/config'
import { generateMetadata } from '@/lib/seo/metadata'
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/lib/seo/structured-data'

const PATH = '/headway-alma-vs-own-panels'
const TITLE = 'Headway vs Alma vs Your Own Insurance Panels | NYPLLC'
const DESCRIPTION =
  'Compare Headway, Alma, and building your own insurance panels. NYPLLC prepares your CAQH profile for a one-time $499 fee using your formation file.'

const FAQS = [
  {
    question: 'What does the $499 CAQH setup include?',
    answer:
      'We prepare a new CAQH profile or update an existing one. We organize your documents and fix one round of errors. You review the finished profile and confirm in CAQH that the information is correct.',
  },
  {
    question: 'Does NYPLLC apply to insurance panels?',
    answer:
      'No. We set up your CAQH profile. You must apply to each insurance company separately.',
  },
  {
    question: 'Can I use this service if my PLLC is already formed?',
    answer:
      'Yes. The service is available to NYPLLC customers whose professional entity is already formed or still in progress.',
  },
  {
    question: 'Do I still need CAQH if I use Headway or Alma?',
    answer:
      'Ask the platform whether it will create and maintain your CAQH profile. The answer may depend on the platform and insurance plan.',
  },
  {
    question: 'Do Headway and Alma take a cut of my practice revenue?',
    answer:
      "Headway says it keeps a variable portion of eligible insurance session payments. Alma charges a membership fee instead of a per-session percentage. Alma credentials participating clinicians under Alma's Tax ID.",
  },
  {
    question: 'Can I use Headway or Alma now and still build my own panels?',
    answer:
      'Yes. Some clinicians use a platform while they apply separately to insurance companies under their own practice. The contracts, effective dates, billing rules, and transfer options differ by payer and platform, so review each agreement before choosing a hybrid approach.',
  },
  {
    question: 'Why use NYPLLC instead of doing CAQH myself?',
    answer:
      'CAQH is free for providers, but you must gather the documents, enter the information, and resolve errors yourself. We reuse the practice information in your formation file, prepare the profile, organize the documents, and handle one round of corrections for a fixed $499 fee.',
  },
]

export const metadata = generateMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'CAQH setup service',
    'CAQH profile help',
    'Headway vs Alma',
    'Headway vs private practice insurance',
    'Alma vs direct credentialing',
    'CAQH setup therapist',
    'join insurance panels directly',
  ],
  canonical: PATH,
  openGraph: { type: 'article' },
})

const contactHref = `mailto:${APP_CONFIG.supportEmail}?subject=${encodeURIComponent(
  'CAQH setup for my practice'
)}`

export default function HeadwayAlmaVsOwnPanelsPage() {
  const baseUrl = SEO_CONFIG.siteUrl

  return (
    <>
      <ScrollTracking />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateArticleSchema({
              headline: 'Headway vs Alma vs Your Own Insurance Panels',
              description: DESCRIPTION,
              url: PATH,
              datePublished: '2026-09-17',
              dateModified: '2026-09-19',
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(FAQS)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: 'Home', item: baseUrl },
              {
                name: 'CAQH setup options',
                item: `${baseUrl}${PATH}`,
              },
            ])
          ),
        }}
      />

      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'CAQH setup options' }]} />
        </div>
      </div>

      <section className="border-b bg-muted/30 py-14 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                A decision guide for New York private practices
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Headway, Alma, or your own insurance panels?
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Headway and Alma can get you started with less billing work, but
                you use their insurance arrangements and keep paying as long as
                you use the platform. If you want to apply to insurers under
                your own practice, NYPLLC can prepare your CAQH profile once for
                $499 using information already in your formation file.
              </p>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border bg-background p-4">
                  <p className="font-semibold">Use a platform</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Headway or Alma handles credentialing and billing through
                    its system. The tradeoff is an ongoing payment share or
                    membership fee, plus the platform&apos;s contracts and
                    rates.
                  </p>
                </div>
                <div className="rounded-lg border border-primary/40 bg-primary/5 p-4">
                  <p className="font-semibold">Build your own panels</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Pay NYPLLC $499 once for CAQH setup, then choose which
                    insurers to apply to under your practice. You or your
                    billing company handles claims after enrollment.
                  </p>
                </div>
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild size="lg">
                  <a href={contactHref}>Email us to get started</a>
                </Button>
                <span className="text-sm text-muted-foreground">
                  One-time fee. No subscription or per-session fee to us.
                </span>
              </div>
            </div>
            <div className="rounded-xl border bg-background p-6 shadow-sm">
              <p className="font-semibold">Your $499 CAQH setup</p>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-6 text-muted-foreground">
                <li>Prepare a new profile or update your current one</li>
                <li>Collect and organize the required documents</li>
                <li>Fix one round of errors</li>
                <li>Send you the finished profile to review and confirm</li>
              </ul>
              <p className="mt-5 border-t pt-4 text-xs leading-5 text-muted-foreground">
                You review and attest to the profile. Insurance company
                applications and billing are not included.
              </p>
            </div>
          </div>
        </div>
      </section>

      <article className="py-16 lg:py-20">
        <div className="container mx-auto max-w-5xl space-y-14 px-4 sm:px-6 lg:px-8">
          <section className="max-w-3xl space-y-4">
            <h2 className="text-2xl font-semibold">
              The choice is convenience now or more control later
            </h2>
            <p className="leading-7 text-muted-foreground">
              Headway and Alma are practical choices for clinicians who want one
              company to handle credentialing, claims, and payments. They can
              save time when you are opening a practice. In return, you use the
              platform&apos;s insurance arrangements, rates, and billing system.
            </p>
            <p className="leading-7 text-muted-foreground">
              Direct enrollment takes more work. You need a current CAQH
              profile, separate payer applications, and a way to bill claims.
              The benefit is that your practice applies under its own
              information and chooses which payer relationships to pursue.
              NYPLLC handles the CAQH setup so you do not have to start that
              process from a blank profile.
            </p>
          </section>

          <section>
            <h2 className="mb-5 text-2xl font-semibold">
              Which path fits your practice?
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
              <div className="rounded-xl border p-6">
                <h3 className="text-lg font-semibold">
                  Choose Headway or Alma
                </h3>
                <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-6 text-muted-foreground">
                  <li>
                    You want the platform to handle credentialing and claims.
                  </li>
                  <li>
                    You accept its available plans, rates, and contract terms.
                  </li>
                  <li>
                    You prefer less administration, even with an ongoing cost.
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-primary/40 bg-primary/5 p-6">
                <p className="text-xs font-medium uppercase tracking-wide text-primary">
                  Best fit for our $499 service
                </p>
                <h3 className="mt-2 text-lg font-semibold">
                  Build your own panels
                </h3>
                <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-6 text-muted-foreground">
                  <li>
                    You want to apply under your own practice information.
                  </li>
                  <li>You want to choose which insurers to approach.</li>
                  <li>You can handle billing or hire a billing company.</li>
                </ul>
              </div>
              <div className="rounded-xl border p-6">
                <h3 className="text-lg font-semibold">Use a hybrid approach</h3>
                <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-6 text-muted-foreground">
                  <li>
                    You use a platform while direct applications are pending.
                  </li>
                  <li>
                    You keep a current CAQH profile for future applications.
                  </li>
                  <li>
                    You review both agreements before moving patient billing.
                  </li>
                </ul>
              </div>
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">
              A platform can be the right starting point. The $499 NYPLLC
              service is for clinicians who also want a complete CAQH profile
              for their own direct applications.
            </p>
          </section>

          <section className="rounded-xl border bg-muted/30 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">
              Compare a one-time setup with ongoing platform costs
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
              Alma lists membership at $1,140 when billed annually or $125 month
              to month, plus tax. That is $1,500 over twelve months on the
              monthly plan. Headway has no membership fee, but says it keeps a
              variable portion of eligible insurance session payments. Headway
              does not publish one fixed percentage for every plan and billing
              code.
            </p>
            <div className="mt-6 rounded-lg border bg-background p-5">
              <p className="font-semibold">A simple volume example</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                At 20 insurance sessions per week, a $150 allowed amount, and 48
                working weeks, the practice bills $144,000 in allowed charges
                for the year. Each percentage point retained from that amount
                equals $1,440. Five percent would equal $7,200, and ten percent
                would equal $14,400.
              </p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                This is arithmetic, not a statement of Headway&apos;s rate.
                Headway says its retained portion varies by plan and billing
                code and does not publish one fixed percentage.
              </p>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border bg-background p-5">
                <p className="text-sm text-muted-foreground">
                  NYPLLC CAQH setup
                </p>
                <p className="mt-2 text-3xl font-semibold">$499</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  One time. Payer applications and billing are separate.
                </p>
              </div>
              <div className="rounded-lg border bg-background p-5">
                <p className="text-sm text-muted-foreground">Alma membership</p>
                <p className="mt-2 text-3xl font-semibold">$1,140 to $1,500</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Per year at the listed annual or monthly membership prices,
                  plus tax.
                </p>
              </div>
              <div className="rounded-lg border bg-background p-5">
                <p className="text-sm text-muted-foreground">Headway</p>
                <p className="mt-2 text-3xl font-semibold">Variable</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  A portion of eligible session payments, depending on the plan
                  and billing code.
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              These figures compare the shape of the costs, not equivalent
              services. Headway and Alma include platform services that NYPLLC
              does not provide. Prices and terms can change.
            </p>
          </section>

          <section>
            <h2 className="mb-5 text-2xl font-semibold">
              Compare your options
            </h2>
            <p className="mb-3 text-xs text-muted-foreground sm:hidden">
              Swipe the table to see all three options.
            </p>
            <div className="overflow-x-auto rounded-xl border bg-card">
              <table className="min-w-[760px] w-full text-left text-sm">
                <caption className="sr-only">
                  Comparison of NYPLLC CAQH setup, DIY CAQH, and Headway or Alma
                </caption>
                <thead className="bg-muted/50">
                  <tr>
                    <th scope="col" className="w-40 px-4 py-3 font-semibold">
                      Question
                    </th>
                    <th
                      scope="col"
                      className="bg-primary/5 px-4 py-3 font-semibold"
                    >
                      <span className="block">NYPLLC CAQH setup</span>
                      <span className="mt-1 block text-xs font-normal text-muted-foreground">
                        For practices building direct panels
                      </span>
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Do it yourself
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Headway or Alma
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <th
                      scope="row"
                      className="px-4 py-4 align-top font-semibold"
                    >
                      Cost structure
                    </th>
                    <td className="bg-primary/5 px-4 py-4 align-top font-medium">
                      $499 one-time fee. No subscription or per-session fee to
                      NYPLLC.
                    </td>
                    <td className="px-4 py-4 align-top text-muted-foreground">
                      CAQH is free. You spend your own time on the profile,
                      documents, and corrections.
                    </td>
                    <td className="px-4 py-4 align-top text-muted-foreground">
                      Headway retains a variable portion of eligible session
                      payments. Alma lists $1,140 annually or $125 month to
                      month, plus tax.
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="px-4 py-4 align-top font-semibold"
                    >
                      CAQH work
                    </th>
                    <td className="bg-primary/5 px-4 py-4 align-top font-medium">
                      We prepare the profile and handle one correction round.
                    </td>
                    <td className="px-4 py-4 align-top text-muted-foreground">
                      You gather documents, enter the information, and fix any
                      issues.
                    </td>
                    <td className="px-4 py-4 align-top text-muted-foreground">
                      The platform handles its credentialing process. Ask what
                      CAQH work you must still do yourself.
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="px-4 py-4 align-top font-semibold"
                    >
                      Who holds the payer relationship
                    </th>
                    <td className="bg-primary/5 px-4 py-4 align-top font-medium">
                      Your practice applies to insurance companies separately
                      under its own information.
                    </td>
                    <td className="px-4 py-4 align-top text-muted-foreground">
                      Your practice applies to insurance companies separately
                      under its own information.
                    </td>
                    <td className="px-4 py-4 align-top text-muted-foreground">
                      You use the platform&apos;s insurance contracts, rates,
                      and billing rules. Alma says it credentials participating
                      clinicians under Alma&apos;s Tax ID.
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="px-4 py-4 align-top font-semibold"
                    >
                      If you leave
                    </th>
                    <td className="bg-primary/5 px-4 py-4 align-top font-medium">
                      Your CAQH profile remains yours. Direct payer contracts
                      are separate from NYPLLC.
                    </td>
                    <td className="px-4 py-4 align-top text-muted-foreground">
                      Your CAQH profile and direct payer contracts remain yours.
                    </td>
                    <td className="px-4 py-4 align-top text-muted-foreground">
                      Do not assume platform participation transfers to your
                      practice. Check the contract and each payer&apos;s rules.
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="px-4 py-4 align-top font-semibold"
                    >
                      Starting information
                    </th>
                    <td className="bg-primary/5 px-4 py-4 align-top font-medium">
                      We reuse the practice details already in your NYPLLC
                      formation file.
                    </td>
                    <td className="px-4 py-4 align-top text-muted-foreground">
                      You collect and enter every required detail yourself.
                    </td>
                    <td className="px-4 py-4 align-top text-muted-foreground">
                      The platform collects the information required for its
                      credentialing process.
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="px-4 py-4 align-top font-semibold"
                    >
                      Billing work
                    </th>
                    <td className="bg-primary/5 px-4 py-4 align-top font-medium">
                      You or your billing company handles claims and follow-up.
                    </td>
                    <td className="px-4 py-4 align-top text-muted-foreground">
                      You or your billing company handles claims and follow-up.
                    </td>
                    <td className="px-4 py-4 align-top text-muted-foreground">
                      The platform handles billing through its system.
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="px-4 py-4 align-top font-semibold"
                    >
                      Best fit
                    </th>
                    <td className="bg-primary/5 px-4 py-4 align-top font-medium">
                      You want us to handle CAQH while your practice chooses
                      which insurance companies to approach directly.
                    </td>
                    <td className="px-4 py-4 align-top text-muted-foreground">
                      You have time to build and maintain the profile yourself.
                    </td>
                    <td className="px-4 py-4 align-top text-muted-foreground">
                      You want one platform to handle credentialing and billing
                      and accept its ongoing terms.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Available insurance plans and rates depend on your license, state,
              and specialty. Read the current platform agreement before you sign
              up.
            </p>
          </section>

          <section className="grid gap-8 border-y py-12 md:grid-cols-[0.8fr_1.2fr]">
            <div className="max-w-sm">
              <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Why use NYPLLC
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                CAQH setup that starts with your practice
              </h2>
            </div>
            <ul className="grid gap-4 text-sm leading-6 text-muted-foreground sm:grid-cols-2">
              <li className="rounded-lg border p-4">
                <strong className="block text-foreground">
                  We reuse your formation file
                </strong>
                Your practice name, entity details, and other formation
                information are already in our system.
              </li>
              <li className="rounded-lg border p-4">
                <strong className="block text-foreground">
                  One correction round is included
                </strong>
                We resolve one round of profile errors before you review and
                attest.
              </li>
              <li className="rounded-lg border p-4">
                <strong className="block text-foreground">
                  The price is fixed at $499
                </strong>
                You do not pay NYPLLC a membership fee or a share of future
                sessions.
              </li>
              <li className="rounded-lg border p-4">
                <strong className="block text-foreground">
                  Your CAQH profile remains yours
                </strong>
                You can authorize participating organizations and use it for
                separate direct payer applications.
              </li>
              <li className="rounded-lg border p-4">
                <strong className="block text-foreground">
                  Start before you choose a platform
                </strong>
                The best time is after formation or EIN issuance, while you are
                still deciding how to take insurance.
              </li>
              <li className="rounded-lg border p-4">
                <strong className="block text-foreground">
                  The scope is clear
                </strong>
                We prepare CAQH. We do not claim that the service enrolls you
                with an insurance company.
              </li>
            </ul>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border p-6">
              <h2 className="text-xl font-semibold">Use NYPLLC if</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Your professional entity is formed or in progress, your CAQH
                profile is incomplete, and you want help preparing it for direct
                payer applications.
              </p>
            </div>
            <div className="rounded-xl border p-6">
              <h2 className="text-xl font-semibold">Skip this service if</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Your CAQH profile is already complete and current, or your
                chosen platform confirms that it will handle the profile and you
                do not plan to apply directly.
              </p>
            </div>
          </section>

          <section className="max-w-3xl space-y-4">
            <h2 className="text-2xl font-semibold">
              A platform and your own CAQH profile can work together
            </h2>
            <p className="leading-7 text-muted-foreground">
              Some clinicians use Headway or Alma for current cash flow while
              separate payer applications are pending. A current CAQH profile
              keeps the direct path open. Before combining the two, review each
              agreement and ask how patient billing, effective dates, and payer
              participation work if you later leave the platform.
            </p>
            <p className="leading-7 text-muted-foreground">
              CAQH itself is free. It stores professional and practice
              information that you can share with authorized organizations. A
              completed profile does not enroll you with an insurer. Our $499
              service prepares the profile; payer applications remain separate.
            </p>
          </section>

          <section className="rounded-xl border bg-primary/5 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">
              Want us to set up your CAQH profile?
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
              Email us your practice name. We will confirm the $499 price and
              send you the list of information and documents we need.
            </p>
            <Button asChild className="mt-6">
              <a href={contactHref}>Email us to get started</a>
            </Button>
          </section>

          <section className="max-w-3xl space-y-5">
            <h2 className="text-2xl font-semibold">Common questions</h2>
            <div className="divide-y rounded-xl border">
              {FAQS.map(faq => (
                <div key={faq.question} className="space-y-2 p-5">
                  <h3 className="font-semibold">{faq.question}</h3>
                  <p className="leading-7 text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
            This page provides general business information. It does not
            recommend a particular payer, platform, or contract. Review current
            agreements and ask qualified legal, accounting, or credentialing
            professionals about your practice.
          </p>

          <p className="max-w-3xl text-sm text-muted-foreground">
            Still forming your practice? Read our{' '}
            <Link
              href="/professions/lcsw"
              className="underline underline-offset-2"
            >
              New York LCSW PLLC guide
            </Link>
            .
          </p>
        </div>
      </article>
    </>
  )
}
