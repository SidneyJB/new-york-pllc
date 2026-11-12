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
  'Compare Headway, Alma, and getting in-network under your own PLLC. NYPLLC handles NPI, CAQH, and insurer applications for flat fees, starting at $399.'

const FAQS = [
  {
    question: 'What do your credentialing services cost?',
    answer:
      'Foundation is $399: the NPI for your PLLC, an update to your individual NPI, your CAQH profile built or updated, a PLLC W-9, and a check of your practice location. Get in-network is $1,795 and adds applications to three commercial insurers, followed up until each decides; each extra insurer is $350. If you are already in-network in your own name, moving those contracts to your PLLC is $199 plus $99 per insurer. NY Medicaid is $495 and Medicare is $395. Upkeep is $249 a year. Payment plans are available.',
  },
  {
    question: 'Does NYPLLC apply to insurance panels for me?',
    answer:
      'Yes, on the Get in-network and Move my contracts services. We check whether each panel is open, prepare and submit the applications under your PLLC, and follow up every two weeks until the insurer decides. You review and sign every contract and attestation. Each insurer decides on its own, so we cannot guarantee acceptance. If a panel turns out to be closed, we switch that application to another insurer or refund that insurer\'s share.',
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
      'CAQH is free for providers, and you can apply to insurers yourself. It takes time: two NPIs, a CAQH profile, separate applications for each insurer, and months of follow-up calls. We start from the practice information already in your formation file and handle that work for a flat fee. We never hold your portal passwords.',
  },
]

export const metadata = generateMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'insurance credentialing New York',
    'therapist credentialing service',
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
  'Insurance credentialing for my practice'
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
              dateModified: '2026-11-09',
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
                name: 'Insurance credentialing options',
                item: `${baseUrl}${PATH}`,
              },
            ])
          ),
        }}
      />

      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Insurance credentialing options' }]} />
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
                you use the platform. If you want contracts under your own
                practice, NYPLLC can handle the NPI, CAQH, and insurer
                applications for a flat fee, starting from the information
                already in your formation file.
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
                    Pay NYPLLC once to get your PLLC in-network with the
                    insurers you choose. You or your billing company handles
                    claims after enrollment.
                  </p>
                </div>
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild size="lg">
                  <a href={contactHref}>Email us to get started</a>
                </Button>
                <span className="text-sm text-muted-foreground">
                  Flat fees. No share of your sessions. Payment plans available.
                </span>
              </div>
            </div>
            <div className="rounded-xl border bg-background p-6 shadow-sm">
              <p className="font-semibold">NYPLLC credentialing</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Foundation, $399.</strong>{' '}
                  PLLC NPI, CAQH profile, W-9, location check
                </li>
                <li>
                  <strong className="text-foreground">
                    Get in-network, $1,795.
                  </strong>{' '}
                  Foundation plus 3 insurers, followed up to a decision; $350
                  per extra insurer
                </li>
                <li>
                  <strong className="text-foreground">
                    Move my contracts, $199 + $99 per insurer.
                  </strong>{' '}
                  For clinicians already in-network in their own name
                </li>
                <li>
                  <strong className="text-foreground">Add-ons.</strong> NY
                  Medicaid $495, Medicare $395, upkeep $249/yr
                </li>
              </ul>
              <p className="mt-5 border-t pt-4 text-xs leading-5 text-muted-foreground">
                You sign every contract and attestation. Insurers decide on
                their own; acceptance is not guaranteed. Billing and claims are
                not included.
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
              NYPLLC handles the NPI, CAQH, and applications so you do not
              have to start that process from a blank page.
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
                  Where NYPLLC helps
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
              A platform can be the right starting point. NYPLLC credentialing
              is for clinicians who also want contracts under their own
              practice, now or later.
            </p>
          </section>

          <section className="rounded-xl border bg-muted/30 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">
              Compare a one-time fee with ongoing platform costs
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
                  NYPLLC Get in-network
                </p>
                <p className="mt-2 text-3xl font-semibold">$1,795</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  One time, including 3 insurers. Billing is separate.
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
                  Comparison of NYPLLC credentialing, doing it yourself, and Headway or Alma
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
                      <span className="block">NYPLLC credentialing</span>
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
                      Flat fee: $399 Foundation, $1,795 with 3 insurers. No
                      subscription or per-session fee to NYPLLC.
                    </td>
                    <td className="px-4 py-4 align-top text-muted-foreground">
                      CAQH and applications are free. You spend your own time
                      on the forms and follow-up calls.
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
                      NPI, CAQH, and applications
                    </th>
                    <td className="bg-primary/5 px-4 py-4 align-top font-medium">
                      We prepare them, submit under your PLLC, and follow up
                      every two weeks until each insurer decides.
                    </td>
                    <td className="px-4 py-4 align-top text-muted-foreground">
                      You gather documents, fill out each application, and
                      chase each insurer yourself.
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
                      Your PLLC holds its own contracts, under its own tax ID.
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
                      Your CAQH profile and contracts are yours. Nothing is
                      tied to NYPLLC.
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
                      You want contracts under your own practice without doing
                      the paperwork and follow-up yourself.
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
                Credentialing that starts with your practice
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
                  We follow up until a decision
                </strong>
                We check each insurer every two weeks and send you the
                effective date when it is set.
              </li>
              <li className="rounded-lg border p-4">
                <strong className="block text-foreground">
                  Flat fees, payment plans available
                </strong>
                You do not pay NYPLLC a membership fee or a share of future
                sessions.
              </li>
              <li className="rounded-lg border p-4">
                <strong className="block text-foreground">
                  Closed panel? You are not stuck paying
                </strong>
                If an insurer&apos;s panel turns out to be closed, we switch
                that application or refund that insurer&apos;s share.
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
                Insurers decide on their own, so we never promise acceptance.
                Billing, claims, and rate negotiation are not included.
              </li>
            </ul>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border p-6">
              <h2 className="text-xl font-semibold">Use NYPLLC if</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Your professional entity is formed or in progress and you want
                to bill insurance under your own practice, or move contracts you
                already hold into your PLLC.
              </p>
            </div>
            <div className="rounded-xl border p-6">
              <h2 className="text-xl font-semibold">Skip this service if</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                You only plan to see clients through Headway or Alma, or you
                plan to see private-pay clients only.
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
              completed profile does not enroll you with an insurer; each
              insurer needs its own application. Our Get in-network service
              covers both.
            </p>
          </section>

          <section className="rounded-xl border bg-primary/5 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">
              Want help getting in-network?
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
              Email us your practice name and which insurers you want. We will
              ask a few questions, then confirm which service fits and the
              price.
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
