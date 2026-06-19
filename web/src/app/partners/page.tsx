import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { ScrollTracking } from '@/components/analytics/scroll-tracking'
import { PartnerIntakeForm } from '@/components/forms/partner-intake-form'
import { TrackedEmailLink, TrackedPhoneLink } from '@/components/analytics/tracked-cta'
import { APP_CONFIG, PRICING } from '@/lib/constants'
import { PARTNER_FAQ } from '@/lib/partners/partner-intake-options'
import { postPartnerIntakeEmail } from '@/lib/partners/post-partner-intake-email'
import { PARTNERS_METADATA } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo/structured-data'
import { parsePartnerIntakeFormData } from '@/lib/validations/partner-intake'
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Clock,
  FileCheck2,
  Globe2,
  Handshake,
  Mail,
  MapPin,
  Shield,
  TrendingUp,
} from 'lucide-react'

export const metadata = PARTNERS_METADATA

async function handlePartnerIntakeSubmit(formData: FormData) {
  'use server'

  let data
  try {
    data = parsePartnerIntakeFormData(formData)
  } catch (error) {
    console.error('Partner intake validation failed', error)
    redirect('/partners?error=1')
  }

  try {
    const ok = await postPartnerIntakeEmail(data)
    if (!ok) {
      console.error('Failed to deliver partner intake email')
      redirect('/partners?error=1')
    }
  } catch (error) {
    console.error('Error sending partner intake email', error)
    redirect('/partners?error=1')
  }

  redirect('/partners?submitted=1')
}

const OFFERINGS = [
  {
    icon: Building2,
    title: 'NY PLLC formation',
    description: `$${PRICING.basePrice} all-inclusive. We handle filing, the NYSED workflow, and six-week publication end to end.`,
  },
  {
    icon: Globe2,
    title: 'Foreign qualification into NY',
    description:
      'Foreign qualification of out-of-state PLLCs entering New York, from Certificate of Authority through publication.',
  },
  {
    icon: MapPin,
    title: 'Virtual address',
    description: 'Professional NY business address with mail scanning and forwarding from $50/month.',
  },
  {
    icon: Shield,
    title: 'Registered agent',
    description: 'Reliable New York registered agent at $99/year, included free the first year with every formation.',
  },
]

const IDEAL_PARTNERS = [
  'Credentialing firms',
  'Medical billing & RCM companies',
  'Practice coaches & consultants',
  'Insurance brokers',
  'CPA & accounting firms',
  'Small law firms serving licensed professionals',
]

const PARTNER_STATS = [
  { value: '25,000+', label: 'NY entities formed' },
  { value: '5/5', label: 'Client rating' },
  { value: 'Same-day', label: 'Filing on NYSED approval' },
  { value: '20 min', label: 'Average partner response' },
]

const WHY_PARTNER = [
  {
    icon: BadgeCheck,
    title: 'PLLC specialists, not generic filers',
    description:
      'We form professional entities in New York exclusively. The naming, licensing, and publication rules that trip up generic LLC services are routine for us.',
  },
  {
    icon: FileCheck2,
    title: 'All-inclusive, publishing included',
    description: `Flat $${PRICING.basePrice} covers formation and New York's six-week, two-newspaper publication. No surprise add-ons for you to explain.`,
  },
  {
    icon: Clock,
    title: 'Fast, hands-off fulfillment',
    description:
      'We file same-day once NYSED approves and run intake, payment, and document delivery, so it stays off your plate.',
  },
  {
    icon: TrendingUp,
    title: 'You keep the client and the credit',
    description:
      'Refer or white-label. Your clients stay yours, and you add a revenue stream without new operational load.',
  },
]

export default async function PartnersPage({
  searchParams,
}: {
  searchParams: Promise<{ submitted?: string; error?: string }>
}) {
  const params = await searchParams
  const submitted = params?.submitted === '1'
  const submissionError = params?.error === '1'
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.nypllc.com'

  return (
    <>
      <ScrollTracking />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: 'Home', item: siteUrl },
              { name: 'Partner Program', item: `${siteUrl}/partners` },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema([...PARTNER_FAQ])),
        }}
      />

      <div className="flex flex-col">
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb items={[{ label: 'Partner Program', href: '/partners' }]} />
          </div>
        </div>

        <section className="bg-gradient-to-br from-background via-muted/30 to-muted/50 py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <Badge variant="outline" className="mb-4">
                B2B referral & white-label
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                The NY professional-entity desk{' '}
                <span className="text-primary">behind your firm</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
                When your licensed-professional clients need a New York PLLC, foreign qualification,
                registered agent, or business address, we handle the filing end-to-end. You keep the
                relationship and add a revenue stream without the operational load.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                <Badge variant="outline">Referral partners</Badge>
                <Badge variant="outline">White-label fulfillment</Badge>
                <Badge variant="outline">Status updates for your team</Badge>
              </div>
              <div className="mt-10">
                <Button size="lg" asChild>
                  <a href="#partner-application">
                    Become a partner
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="mx-auto mt-16 max-w-4xl">
              <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                {PARTNER_STATS.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <dt className="text-2xl font-bold text-primary sm:text-3xl">{stat.value}</dt>
                    <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why firms partner with us</h2>
                <p className="mt-4 text-muted-foreground">
                  A specialist filing desk your clients won&apos;t get from a generic LLC service.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {WHY_PARTNER.map((item) => (
                  <Card key={item.title}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                        </div>
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted/50 py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What you can refer</h2>
                <p className="mt-4 text-muted-foreground">
                  One partner relationship covers the full NY entity stack your clients need.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {OFFERINGS.map((item) => (
                  <Card key={item.title}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                        </div>
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Built for firms like yours</h2>
                <p className="mt-4 text-muted-foreground">
                  If your clients are licensed professionals expanding into New York, we remove the
                  filing complexity from your workflow.
                </p>
                <ul className="mt-8 space-y-3">
                  {IDEAL_PARTNERS.map((partner) => (
                    <li key={partner} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{partner}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Handshake className="h-5 w-5 text-primary" aria-hidden="true" />
                    How partnerships work
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Referral:</strong> Send clients to our
                    checkout or submit leads, and we fulfill and keep you updated.
                  </p>
                  <p>
                    <strong className="text-foreground">White-label:</strong> We operate as your
                    backend filing desk under your client relationship, with status updates you can
                    forward.
                  </p>
                  <p className="text-xs">
                    Referral terms depend on volume and partnership type. Applying does not create
                    any obligation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="partner-application" className="py-16 lg:py-24 scroll-mt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl grid grid-cols-1 gap-12 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold tracking-tight">Partner application</h2>
                <p className="mt-4 text-muted-foreground">
                  Tell us about your firm and referral volume. We reply in about 20 minutes during
                  business hours to confirm fit and next steps.
                </p>

                <div className="mt-8 space-y-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
                    <TrackedEmailLink
                      email={APP_CONFIG.supportEmail}
                      location="partners-page"
                      className="text-primary hover:underline"
                    >
                      {APP_CONFIG.supportEmail}
                    </TrackedEmailLink>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrackedPhoneLink
                      phone={APP_CONFIG.phone}
                      location="partners-page"
                      className="text-primary hover:underline"
                    >
                      {APP_CONFIG.phone}
                    </TrackedPhoneLink>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                {submitted && (
                  <Card className="mb-6 border-green-200 bg-green-50">
                    <CardContent className="py-4 text-sm text-green-900">
                      Thanks, your application is in. We&apos;ll review it and reach out in about 20
                      minutes during business hours.
                    </CardContent>
                  </Card>
                )}

                {submissionError && (
                  <Card className="mb-6 border-destructive bg-destructive/10">
                    <CardContent className="py-4 text-sm text-destructive">
                      Something went wrong submitting your application. Please try again or email{' '}
                      <a className="underline" href={`mailto:${APP_CONFIG.supportEmail}`}>
                        {APP_CONFIG.supportEmail}
                      </a>
                      .
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle>Tell us about your firm</CardTitle>
                    <CardDescription>
                      Takes about 2 minutes, and no client data is required at this stage.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PartnerIntakeForm action={handlePartnerIntakeSubmit} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted/50 py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight text-center mb-10">Partner FAQ</h2>
              <div className="space-y-6">
                {PARTNER_FAQ.map((item) => (
                  <div key={item.question}>
                    <h3 className="font-semibold text-foreground">{item.question}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t bg-orange-50 py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm text-orange-800 max-w-3xl mx-auto text-center">
              <strong>Important:</strong> We provide administrative filing services for professional
              entity formation in New York. This is not legal advice. Partner programs are subject
              to separate agreement and applicable referral-fee rules.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-muted-foreground">
              Serving your own client directly?{' '}
              <Link href="/contact" className="text-primary underline underline-offset-2">
                Contact us
              </Link>{' '}
              or{' '}
              <Link href="/order" className="text-primary underline underline-offset-2">
                start a formation
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
