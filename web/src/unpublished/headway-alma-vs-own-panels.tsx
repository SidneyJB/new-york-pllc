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
const TITLE = 'CAQH Setup vs Headway, Alma, or DIY | NYPLLC'
const DESCRIPTION =
  "NYPLLC sets up your CAQH profile for a one-time $499 fee. See how that compares with Headway's share of insurance payments and Alma's membership fee."
const CHECKED_DATE = 'September 17, 2026'

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
              headline:
                'CAQH Setup Service vs Headway, Alma, or Doing It Yourself',
              description: DESCRIPTION,
              url: PATH,
              datePublished: '2026-09-17',
              dateModified: '2026-09-17',
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
                CAQH setup for New York healthcare practices
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Get your CAQH profile set up for $499
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                We use the information from your NYPLLC formation file. You send
                us the remaining details and documents. We enter everything, fix
                one round of errors, and give you the finished profile to review
                and confirm.
              </p>
              <div className="mt-6 border-l-4 border-primary bg-background px-4 py-3">
                <p className="font-semibold">
                  Headway takes part of eligible insurance payments. Alma
                  charges a monthly fee.
                </p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Headway keeps a variable portion of eligible insurance session
                  payments. Alma costs $1,140 per year or $125 month to month,
                  plus tax. Alma credentials participating clinicians under its
                  Tax ID. Both platforms use their insurance contracts, rates,
                  and billing systems.
                </p>
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild size="lg">
                  <a href={contactHref}>Email us to get started</a>
                </Button>
                <span className="text-sm text-muted-foreground">
                  One-time fee. No subscription.
                </span>
              </div>
            </div>
            <div className="rounded-xl border bg-background p-6 shadow-sm">
              <p className="font-semibold">What we do for $499</p>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-6 text-muted-foreground">
                <li>Prepare a new profile or update your current one</li>
                <li>Collect and organize the required documents</li>
                <li>Fix one round of errors</li>
                <li>Send you the finished profile to review and confirm</li>
              </ul>
              <p className="mt-5 border-t pt-4 text-xs leading-5 text-muted-foreground">
                Insurance company applications are not included.
              </p>
            </div>
          </div>
        </div>
      </section>

      <article className="py-16 lg:py-20">
        <div className="container mx-auto max-w-5xl space-y-14 px-4 sm:px-6 lg:px-8">
          <section className="max-w-3xl space-y-4">
            <h2 className="text-2xl font-semibold">
              Why not just use Headway or Alma?
            </h2>
            <p className="leading-7 text-muted-foreground">
              Headway and Alma handle credentialing and billing. That saves
              work, but the cost continues after credentialing. Headway keeps a
              variable portion of eligible insurance session payments.
              Alma&apos;s membership fee continues for as long as you remain a
              member.
            </p>
            <p className="leading-7 text-muted-foreground">
              You also use the platform&apos;s insurance contracts, rates, and
              billing system. If you want your practice to contract directly
              with insurance companies, you must apply to those companies
              separately. We can set up the CAQH profile they may use to review
              your credentials.
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
                    <th scope="col" className="px-4 py-3 font-semibold">
                      NYPLLC CAQH setup
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
                      Ongoing cost
                    </th>
                    <td className="bg-primary/5 px-4 py-4 align-top font-medium">
                      $499 one-time fee
                    </td>
                    <td className="px-4 py-4 align-top text-muted-foreground">
                      CAQH is free. You do all the work yourself.
                    </td>
                    <td className="px-4 py-4 align-top text-muted-foreground">
                      Headway has no membership fee and retains a variable
                      portion of eligible session payments. Alma lists $95/month
                      billed annually or $125 month to month, plus tax.
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
                      Payer relationship
                    </th>
                    <td className="bg-primary/5 px-4 py-4 align-top font-medium">
                      You apply to insurance companies separately.
                    </td>
                    <td className="px-4 py-4 align-top text-muted-foreground">
                      You apply to insurance companies separately.
                    </td>
                    <td className="px-4 py-4 align-top text-muted-foreground">
                      You use the platform&apos;s insurance contracts and rates.
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
                      You want us to handle CAQH while you choose which
                      insurance companies to apply to.
                    </td>
                    <td className="px-4 py-4 align-top text-muted-foreground">
                      You have time to build and maintain the profile yourself.
                    </td>
                    <td className="px-4 py-4 align-top text-muted-foreground">
                      You want one platform to handle credentialing and billing.
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
                We already have your formation details
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-7">
                We use the practice information from your formation file. You
                provide the missing personal and professional details, your
                malpractice certificate, CV, signed W-9, and any other required
                documents.
              </p>
              <p className="leading-7">
                We enter the information and fix one round of errors. You review
                the profile and confirm in CAQH that it is correct.
              </p>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border p-6">
              <h2 className="text-xl font-semibold">This service may fit if</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Your New York professional entity is formed or in progress and
                you need help setting up its CAQH profile.
              </p>
            </div>
            <div className="rounded-xl border p-6">
              <h2 className="text-xl font-semibold">You may not need it if</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Your CAQH profile is already complete and current. You also may
                not need us if your platform confirms that it will handle your
                profile and keep it current.
              </p>
            </div>
          </section>

          <section className="max-w-3xl space-y-4">
            <h2 className="text-2xl font-semibold">
              The cost of a platform does not end after setup
            </h2>
            <p className="leading-7 text-muted-foreground">
              Headway keeps a variable portion of eligible insurance session
              payments. The total cost grows as you bill more sessions. Alma
              charges its membership fee for as long as you remain a member.
            </p>
            <p className="leading-7 text-muted-foreground">
              The platform chooses which insurance plans are available through
              its system and sets the contract terms and rates it offers you.
              Ask what happens to your insurance participation and patient
              billing if you leave.
            </p>
            <p className="leading-7 text-muted-foreground">
              A platform may still be worth the cost if you want it to handle
              billing and administration. If you want direct insurance contracts
              for your own practice, start with your own CAQH profile and apply
              to each insurance company.
            </p>
          </section>

          <section className="max-w-3xl space-y-5">
            <h2 className="text-2xl font-semibold">What CAQH does</h2>
            <p className="leading-7 text-muted-foreground">
              CAQH is a free online profile that stores your professional and
              practice information. You can allow participating insurance
              companies and healthcare organizations to review it.
            </p>
            <p className="leading-7 text-muted-foreground">
              A completed CAQH profile does not put you in an insurance network.
              You still apply to each insurance company. Our $499 service sets
              up the CAQH profile. It does not include those applications.
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

          <section className="max-w-3xl space-y-4 text-sm text-muted-foreground">
            <h2 className="text-xl font-semibold text-foreground">Sources</h2>
            <p>
              Official provider materials checked {CHECKED_DATE}. Prices and
              terms can change.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <a
                  href="https://headway.co/for-providers"
                  className="underline underline-offset-2 hover:text-foreground"
                  rel="noreferrer"
                  target="_blank"
                >
                  Headway provider overview
                </a>
                {' and '}
                <a
                  href="https://headway.co/resources/how-does-headway-make-money"
                  className="underline underline-offset-2 hover:text-foreground"
                  rel="noreferrer"
                  target="_blank"
                >
                  Headway&apos;s explanation of provider rates and its retained
                  portion
                </a>
              </li>
              <li>
                <a
                  href="https://helloalma.com/for-providers/"
                  className="underline underline-offset-2 hover:text-foreground"
                  rel="noreferrer"
                  target="_blank"
                >
                  Alma provider membership
                </a>
                {' and '}
                <a
                  href="https://helloalma.com/for-providers/insurance/"
                  className="underline underline-offset-2 hover:text-foreground"
                  rel="noreferrer"
                  target="_blank"
                >
                  Alma insurance program
                </a>
              </li>
              <li>
                <a
                  href="https://www.caqh.org/hubfs/43908627/drupal/solutions/proview/guide/provider-user-guide.pdf"
                  className="underline underline-offset-2 hover:text-foreground"
                  rel="noreferrer"
                  target="_blank"
                >
                  CAQH Provider Data Portal user guide
                </a>
              </li>
            </ul>
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
