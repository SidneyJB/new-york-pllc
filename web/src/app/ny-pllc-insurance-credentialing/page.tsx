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

const PATH = '/ny-pllc-insurance-credentialing'
const HEADLINE = 'Insurance Credentialing for Your New York PLLC'
const TITLE = 'Insurance Credentialing for a New York PLLC | NYPLLC'
const DESCRIPTION =
  'Formed a PLLC and want to take insurance under it? The steps in order: PLLC NPI, CAQH, insurer applications, Medicaid and Medicare. What we handle, and what it costs.'

const FAQS = [
  {
    question: 'Can I bill insurance before my PLLC is approved?',
    answer:
      "Not under the PLLC. Until it's formed and has its EIN and NPI, any insurance billing happens under your own name. You can start the steps that don't depend on the PLLC, like fixing your individual NPI, while you wait.",
  },
  {
    question: 'Do I really need a separate NPI for a one-person PLLC?',
    answer:
      "Yes, if you want Medicaid, Medicare or insurers that enroll the practice as a group. Your individual NPI stays the same. You'll use both.",
  },
  {
    question: "I'm already in network. Do I have to start over?",
    answer:
      'Usually not. Most insurers can add your PLLC\'s tax ID to your existing contract. That\'s what our "Move my contracts" service covers.',
  },
  {
    question: 'Do Headway and Alma credential me under my PLLC?',
    answer:
      'No. They credential you under their own group contracts, so the insurer contracts belong to the platform, not your PLLC.',
  },
  {
    question: "What is Headway's new $9.99 fee?",
    answer:
      "Headway deducts $9.99 from your payout for every session with a client it sends you, insurance or private pay, for as long as you keep seeing that client. Clients you bring yourself don't carry it. Headway is rolling it out state by state through late 2026. Contracts you hold with insurers under your own PLLC don't carry a platform fee.",
  },
  {
    question: 'How long does the whole thing take?',
    answer:
      'The NPI and CAQH steps take days to a few weeks. Commercial insurers commonly take 60 to 180 days after they receive the application. Medicaid is usually slower.',
  },
  {
    question: 'What do your credentialing services cost?',
    answer:
      'Foundation is $399. Move my contracts is $199 plus $99 per insurer. Get in network is $1,795 with 3 commercial insurers, plus $350 for each extra insurer. NY Medicaid is $495 and Medicare is $395. Upkeep is $25 a month or $249 a year. Payment plans are available.',
  },
]

const TIERS = [
  {
    name: 'Foundation',
    price: '$399',
    detail:
      'NPI for your PLLC, updates to your individual NPI, CAQH profile built or updated through attestation, W-9, and a written summary of next steps.',
  },
  {
    name: 'Move my contracts',
    price: '$199 + $99 per insurer',
    detail:
      'For clinicians already in network under their own name: PLLC NPI, CAQH update, and linking each existing contract to the PLLC.',
  },
  {
    name: 'Get in network',
    price: '$1,795',
    note: '+$350 per extra insurer',
    detail:
      'Everything in Foundation, plus applications to 3 commercial insurers, followed up until each one decides.',
    featured: true,
  },
  {
    name: 'NY Medicaid (add-on)',
    price: '$495',
    note: '+$350 per extra plan',
    detail:
      'State Medicaid enrollment for you and the PLLC, plus one Medicaid managed care plan.',
  },
  {
    name: 'Medicare (add-on)',
    price: '$395',
    detail:
      'Medicare enrollment for you and the PLLC, plus reassignment to the PLLC.',
  },
  {
    name: 'Upkeep',
    price: '$25/month or $249/year',
    detail:
      'CAQH re-attestation every 120 days, reminders before documents expire, address and roster changes.',
  },
]

export const metadata = generateMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'PLLC insurance credentialing New York',
    'credentialing a PLLC',
    'type 2 NPI for PLLC',
    'CAQH for group practice',
    'move insurance contracts to PLLC',
    'therapist credentialing New York',
    'NY Medicaid enrollment PLLC',
    'Headway vs own insurance panels',
  ],
  canonical: PATH,
  openGraph: { type: 'article' },
})

const contactHref = `mailto:${APP_CONFIG.supportEmail}?subject=${encodeURIComponent(
  'Insurance credentialing for my PLLC'
)}`

function Step({
  number,
  title,
  children,
}: {
  number: number
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="grid gap-4 sm:grid-cols-[3rem_1fr]">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
        {number}
      </div>
      <div className="min-w-0 space-y-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        {children}
      </div>
    </section>
  )
}

export default function NyPllcInsuranceCredentialingPage() {
  const baseUrl = SEO_CONFIG.siteUrl
  const p = 'leading-7 text-muted-foreground'

  return (
    <>
      <ScrollTracking />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateArticleSchema({
              headline: HEADLINE,
              description: DESCRIPTION,
              url: PATH,
              datePublished: '2026-11-11',
              dateModified: '2026-11-13',
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
              { name: 'Insurance credentialing', item: `${baseUrl}${PATH}` },
            ])
          ),
        }}
      />

      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Insurance credentialing' }]} />
        </div>
      </div>

      <section className="border-b bg-muted/30 py-14 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              For New York professional practices
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {HEADLINE}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              You formed a PLLC (or you&apos;re about to) and you want to take
              insurance under it. Here&apos;s what that takes, step by step,
              and roughly how long each step runs. What we handle, and what it
              costs, is at the bottom.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg">
                <a href={contactHref}>Email us about credentialing</a>
              </Button>
              <a
                href="#pricing"
                className="text-sm font-medium underline underline-offset-4"
              >
                See what we handle and prices
              </a>
            </div>
          </div>
        </div>
      </section>

      <article className="py-16 lg:py-20">
        <div className="container mx-auto max-w-3xl space-y-14 px-4 sm:px-6 lg:px-8">
          <section className="rounded-xl border bg-muted/30 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">
              If you only see clients through Headway or Alma
            </h2>
            <p className={`mt-3 ${p}`}>
              You probably don&apos;t need any of this. Headway and Alma bill
              insurers under their own group contracts, so they credential you
              themselves.
            </p>
            <p className={`mt-3 ${p}`}>
              The catch is that those contracts belong to the platform. If you
              leave, your in-network status usually stays behind, and you
              credential your own practice from the beginning. If you plan to
              stay on a platform, that&apos;s fine. If you think you&apos;ll
              want your own contracts someday, read on.
            </p>
            <h3 className="mt-6 font-semibold">
              What changed at Headway this fall
            </h3>
            <p className={`mt-3 ${p}`}>
              Headway now deducts $9.99 from your payout for every session with
              a client it sends you, whether the session is billed to insurance
              or paid privately. The fee lasts as long as you keep seeing that
              client. Clients you bring yourself don&apos;t carry it. Headway is
              rolling the fee out state by state through late 2026 and has moved
              the start dates more than once, so check your account for yours.
            </p>
            <p className={`mt-3 ${p}`}>
              In October, Headway also asked therapists to sign a new provider
              agreement that would have let it use their name, likeness and
              voice. It paused the agreement the next day after therapists
              objected.
            </p>
            <p className={`mt-3 ${p}`}>
              If most of your clients come through Headway, the fee can reach
              several thousand dollars a year. Contracts you hold with insurers
              under your own PLLC don&apos;t carry a platform fee, and they stay
              with you if you leave Headway.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">
              Why forming a PLLC changes things
            </h2>
            <p className={p}>
              Insurers contract with whoever gets paid. If you&apos;re in
              network today under your own name and SSN, those contracts
              don&apos;t move to the PLLC on their own. The PLLC needs its own
              identifiers, and each insurer has to connect your PLLC to your
              contract (or sign a new one with it).
            </p>
          </section>

          <section className="space-y-10">
            <h2 className="text-2xl font-semibold">The steps, in order</h2>

            <Step number={1} title="Get an NPI for the PLLC">
              <p className={p}>
                You already have an individual NPI (Type 1). Your PLLC needs its
                own, called an organization or Type 2 NPI. Even a one-person
                practice needs one, because Medicaid, Medicare and several
                insurers ask for it when they enroll the practice.
              </p>
              <p className={p}>
                The application is free and goes through NPPES, the federal NPI
                system. Filed online, it usually comes back within a day. On
                paper, expect about four weeks.
              </p>
              <p className={p}>
                While you&apos;re in NPPES, check your individual NPI too. If it
                still lists an old license (an LMSW who&apos;s now an LCSW, for
                example) or an old address, insurers may not match your
                records. Fix that before you apply anywhere.
              </p>
            </Step>

            <Step number={2} title="Know which tax ID goes where">
              <p className={p}>
                Your PLLC has an EIN. Which number goes on your W-9 depends on
                how the PLLC is taxed:
              </p>
              <ul className="list-disc space-y-2 pl-5 leading-7 text-muted-foreground">
                <li>
                  <strong className="text-foreground">
                    Single-member PLLC with no S corporation election:
                  </strong>{' '}
                  the IRS treats it as a &quot;disregarded entity.&quot; The
                  W-9 lists you on line 1 and the PLLC on line 2, and in most
                  cases uses your SSN.
                </li>
                <li>
                  <strong className="text-foreground">
                    PLLC taxed as an S corporation:
                  </strong>{' '}
                  the W-9 uses the PLLC&apos;s EIN.
                </li>
              </ul>
              <p className={p}>
                Some enrollments ask for the EIN no matter what. NY Medicaid
                wants the PLLC&apos;s EIN and the IRS letter that assigned it,
                not a W-9. Getting this wrong is a common reason applications
                stall. If you&apos;re not sure how your PLLC is taxed, your
                accountant can tell you.
              </p>
            </Step>

            <Step number={3} title="Set up or update your CAQH profile">
              <p className={p}>
                Most commercial insurers pull your information from CAQH (now
                branded DataSpring, powered by CAQH) instead of asking for it
                again. Your profile needs your PLLC as a practice location, with
                its address and tax ID.
              </p>
              <p className={p}>
                Two things only you can do: authorize insurers to view your
                profile, and attest that it&apos;s accurate. You re-attest every
                120 days, even if nothing has changed. If you miss it, insurers
                can&apos;t use the profile until you attest again.
              </p>
            </Step>

            <Step
              number={4}
              title="Apply to insurers, or move your existing contracts"
            >
              <p className={p}>
                <strong className="text-foreground">
                  If you&apos;re already in network under your own name:
                </strong>{' '}
                each insurer has its own process for linking your contract to
                the PLLC&apos;s tax ID. Some take a form, some take a full new
                application.
              </p>
              <p className={p}>
                <strong className="text-foreground">
                  If you&apos;re new to an insurer:
                </strong>{' '}
                you apply to join its network, usually after your CAQH profile
                is attested. Some insurers close their panels in certain areas
                or specialties and turn away new providers. It isn&apos;t
                personal, but it&apos;s worth checking before you pick which
                insurers to apply to.
              </p>
              <p className={p}>
                Commercial applications commonly take 60 to 180 days from
                submission to an effective date, depending on the insurer.
              </p>
            </Step>

            <Step number={5} title="NY Medicaid, if you want Medicaid clients">
              <p className={p}>
                NY Medicaid enrollment is its own process, through the
                state&apos;s Provider Services Portal. Paper applications ended
                after August 31, 2026. A few New York details:
              </p>
              <ul className="list-disc space-y-2 pl-5 leading-7 text-muted-foreground">
                <li>
                  You enroll as an individual first. Your PLLC then enrolls as a
                  group, which needs the PLLC&apos;s NPI.
                </li>
                <li>
                  If you want Medicaid managed care plans (Fidelis, Healthfirst
                  and others), you generally need your state Medicaid enrollment
                  first. Those plans won&apos;t add you to their Medicaid
                  products without a Medicaid ID.
                </li>
                <li>LMSWs can&apos;t enroll in Medicaid on their own. LCSWs can.</li>
                <li>
                  New York publishes a public list of enrolled providers that
                  includes the service address. If you see clients by telehealth
                  from home, that&apos;s your home address. Decide how you feel
                  about that before you file.
                </li>
              </ul>
              <p className={p}>
                Medicaid usually takes longer than commercial insurers.
              </p>
            </Step>

            <Step number={6} title="Medicare, if you want Medicare clients">
              <p className={p}>
                Licensed clinical social workers can enroll in Medicare, and
                since January 1, 2024, so can licensed mental health counselors
                and marriage and family therapists. You enroll yourself and then
                reassign your payments to the PLLC, so Medicare pays the
                practice.
              </p>
              <p className={p}>
                If you work from home by telehealth, Medicare lets you list your
                home as an administrative or telehealth-only location so it
                doesn&apos;t show up in public listings.
              </p>
            </Step>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">
              Common reasons applications stall
            </h2>
            <ul className="list-disc space-y-2 pl-5 leading-7 text-muted-foreground">
              <li>The wrong tax ID on the W-9 or the application.</li>
              <li>Applying before the PLLC has its EIN or its NPI.</li>
              <li>
                A CAQH profile that isn&apos;t attested, or has lapsed past 120
                days.
              </li>
              <li>
                An individual NPI that still shows an old license, address or
                specialty.
              </li>
              <li>
                No follow-up. Applications often sit until someone calls about
                them.
              </li>
            </ul>
          </section>

          <section id="pricing" className="scroll-mt-24 space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">What we do</h2>
              <p className={p}>
                You sign; we handle the rest. That means we fill out the forms,
                file the applications and follow up with each insurer every two
                weeks until there&apos;s a decision. The only things you do
                yourself are the steps the programs require from you
                personally: signing, attesting in CAQH, and the final submit in
                Medicaid&apos;s portal.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {TIERS.map(tier => (
                <div
                  key={tier.name}
                  className={
                    tier.featured
                      ? 'rounded-xl border border-primary/40 bg-primary/5 p-5'
                      : 'rounded-xl border p-5'
                  }
                >
                  <p className="font-semibold">{tier.name}</p>
                  <p className="mt-2 text-2xl font-semibold">{tier.price}</p>
                  {tier.note ? (
                    <p className="text-sm text-muted-foreground">{tier.note}</p>
                  ) : null}
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {tier.detail}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Payment plans are available.
            </p>
            <div className="rounded-xl border p-6">
              <h3 className="font-semibold">A few ground rules</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
                <li>
                  Insurers decide who they accept. We can&apos;t guarantee
                  acceptance or a start date.
                </li>
                <li>
                  If an insurer&apos;s panel turns out to be closed, you get
                  that insurer&apos;s portion back, or we switch it to another
                  insurer.
                </li>
                <li>
                  We don&apos;t do billing, claims, coding or rate negotiation,
                  and we don&apos;t give legal or tax advice.
                </li>
                <li>We never ask for your passwords.</li>
              </ul>
            </div>
          </section>

          <section className="rounded-xl border bg-primary/5 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">To get started</h2>
            <p className={`mt-3 ${p}`}>
              Email us at{' '}
              <a
                href={contactHref}
                className="font-medium text-foreground underline underline-offset-2"
              >
                {APP_CONFIG.supportEmail}
              </a>{' '}
              with the insurers you have in mind and whether you&apos;re already
              in network with any of them. We&apos;ll reply with what&apos;s
              involved and a price.
            </p>
            <Button asChild className="mt-6">
              <a href={contactHref}>Email us about credentialing</a>
            </Button>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-semibold">Questions people ask</h2>
            <div className="divide-y rounded-xl border">
              {FAQS.map(faq => (
                <div key={faq.question} className="space-y-2 p-5">
                  <h3 className="font-semibold">{faq.question}</h3>
                  <p className={p}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <p className="text-sm leading-6 text-muted-foreground">
            This page is general business information, not legal or tax advice.
            Program rules and insurer policies change; check with each program
            or your own advisers about your practice.
          </p>

          <p className="text-sm text-muted-foreground">
            Still forming your practice? See{' '}
            <Link href="/order" className="underline underline-offset-2">
              how to order your PLLC
            </Link>{' '}
            or read our{' '}
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
