// PROPOSED (P3-09, Nov 18 2026). Not in the app. After Dec 1, copy to
// web/src/app/services/page.tsx and apply nav-footer-constants-sitemap.diff.
// Replace the SPIFFY_CHECKOUT_* slugs once Sid creates the five Spiffy checkouts
// (they must NOT post to the CRM order-success webhook; see services-page.md §3).

import Link from 'next/link'
import { ScrollTracking } from '@/components/analytics/scroll-tracking'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { APP_CONFIG, DOS_FEES, PRICING } from '@/lib/constants'
import { SEO_CONFIG } from '@/lib/seo/config'
import { SERVICES_METADATA } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo/structured-data'

export const metadata = SERVICES_METADATA

const SPIFFY_BASE = 'https://nypllc.spiffy.co/checkout'

type Service = {
  id: string
  name: string
  ourFee: number
  stateFee: number
  body: string[]
  cta: string
  checkoutSlug: string
}

const stateFeeWithExpedite = (filingFee: number) => filingFee + DOS_FEES.expedite24h

const SERVICES: Service[] = [
  {
    id: 'dba',
    name: 'DBA (Certificate of Assumed Name)',
    ourFee: PRICING.assumedNamePrice,
    stateFee: stateFeeWithExpedite(DOS_FEES.assumedName),
    body: [
      "Use a name other than your PLLC's legal name, on a sign, a website or invoices. We check the name, prepare the certificate and file it with the Department of State. You get the filed certificate by email.",
      "New York's fee for a PLLC is $25, with no county fees. We add the $25 24-hour expedite so it doesn't sit in the queue.",
      "The name still has to follow New York's rules for professional entities. If yours won't pass, we'll tell you before we file and refund you if you'd rather not change it.",
    ],
    cta: 'Order a DBA',
    checkoutSlug: 'TODO-dba',
  },
  {
    id: 'address-change',
    name: 'Address change',
    ourFee: PRICING.addressChangePrice,
    stateFee: stateFeeWithExpedite(DOS_FEES.certificateOfChange),
    body: [
      'Changes the address New York uses to send legal papers to your PLLC (the "service of process" address). We prepare the Certificate of Change, file it, and send you the filed copy.',
      "If you're on our virtual mail service, this is the same filing that ends it.",
    ],
    cta: 'Order an address change',
    checkoutSlug: 'TODO-address-change',
  },
  {
    id: 'amendment',
    name: 'Amendment',
    ourFee: PRICING.amendmentPrice,
    stateFee: stateFeeWithExpedite(DOS_FEES.amendment),
    body: [
      "For changing what's in your Articles of Organization: the PLLC's name, the profession, the county, or members. Tell us what's changing and we prepare the Certificate of Amendment and file it.",
      "Some name or profession changes need sign-off from the State Education Department first. If yours does, we'll tell you within one business day of your order, before anything is filed. You can go ahead or cancel for a full refund.",
      "Only changing the address? That's the address change above, not an amendment.",
    ],
    cta: 'Order an amendment',
    checkoutSlug: 'TODO-amendment',
  },
  {
    id: 'good-standing',
    name: 'Certificate of Good Standing',
    ourFee: PRICING.goodStandingPrice,
    stateFee: stateFeeWithExpedite(DOS_FEES.certificateOfStatus),
    body: [
      'Banks, insurers, landlords and other states ask for this. New York calls it a Certificate of Status. We order it from the Department of State and email it to you.',
    ],
    cta: 'Order a certificate',
    checkoutSlug: 'TODO-good-standing',
  },
  {
    id: 'dissolution',
    name: 'Dissolution',
    ourFee: PRICING.dissolutionPrice,
    stateFee: stateFeeWithExpedite(DOS_FEES.dissolution),
    body: [
      'Closing the PLLC. We prepare the Articles of Dissolution and file them. New York expects them within 90 days after you decide to dissolve.',
      "Filing the articles ends the PLLC with the state. It doesn't file your final tax returns or close your bank account or EIN. Your accountant handles the taxes. If you have registered agent or mail service with us, we stop it when the dissolution is filed.",
    ],
    cta: 'Order a dissolution',
    checkoutSlug: 'TODO-dissolution',
  },
]

const FAQS = [
  {
    question: 'Do I need to have formed my PLLC with you?',
    answer: "No. We do these filings for any New York PLLC.",
  },
  {
    question: 'Is the state fee included in your price?',
    answer:
      "No. It's listed separately next to each service and passed through at cost. The state can change its fees; these are current as of November 2026.",
  },
]

export default function ServicesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: SEO_CONFIG.siteUrl },
    { name: 'PLLC Filings', item: `${SEO_CONFIG.siteUrl}/services` },
  ])
  const faqSchema = generateFAQSchema(FAQS)
  const telHref = APP_CONFIG.phone.replace(/[^+\d]/g, '')

  return (
    <div className="flex flex-col">
      <ScrollTracking />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }}
      />

      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <Breadcrumb items={[{ label: 'PLLC filings' }]} />

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Filings for your PLLC after it&apos;s formed
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            You formed the PLLC. Now something has changed: a new name to use, a new address, a
            partner leaving, or you&apos;re closing it. These are the filings we do most. Each one is a
            flat fee plus the state&apos;s fee, and both are listed below.
          </p>
          <p className="mt-2 text-muted-foreground">You don&apos;t have to have formed with us.</p>

          <div className="mt-10 space-y-10">
            {SERVICES.map((s) => (
              <div key={s.id} id={s.id} className="scroll-mt-24 border-t pt-8">
                <h2 className="text-xl font-semibold">{s.name}</h2>
                <p className="mt-1 font-medium text-foreground">
                  ${s.ourFee} <span className="text-muted-foreground">+ ${s.stateFee} state fees</span>
                </p>
                {s.body.map((p) => (
                  <p key={p.slice(0, 24)} className="mt-3 text-muted-foreground">
                    {p}
                  </p>
                ))}
                {s.id === 'address-change' && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    See the{' '}
                    <Link href="/mail-forwarding-agreement" className="text-primary underline">
                      mail forwarding agreement
                    </Link>
                    .
                  </p>
                )}
                <Button asChild className="mt-4">
                  <a href={`${SPIFFY_BASE}/${s.checkoutSlug}`}>{s.cta}</a>
                </Button>
              </div>
            ))}

            <div className="border-t pt-8">
              <h2 className="text-xl font-semibold">How long it takes</h2>
              <p className="mt-3 text-muted-foreground">
                We file within one business day after we have what we need from you. With the
                24-hour expedite, the state usually returns it the next business day. Name issues, or
                a State Education Department step on an amendment, add time, and we&apos;ll tell you
                when that&apos;s the case.
              </p>
            </div>

            <div className="border-t pt-8">
              <h2 className="text-xl font-semibold">About the state fees</h2>
              <p className="mt-3 text-muted-foreground">
                They&apos;re the Department of State&apos;s fees, passed through at cost. We don&apos;t
                mark them up. The state can change them; these are current as of November 2026.
              </p>
            </div>

            <p className="border-t pt-6 text-muted-foreground">
              Not sure which one you need? Text or email us:{' '}
              <a className="text-primary underline" href={`tel:${telHref}`}>
                {APP_CONFIG.phone}
              </a>{' '}
              ·{' '}
              <a className="text-primary underline" href={`mailto:${APP_CONFIG.supportEmail}`}>
                {APP_CONFIG.supportEmail}
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
