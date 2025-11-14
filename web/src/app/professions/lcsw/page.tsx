import Link from 'next/link'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { ScrollTracking } from '@/components/analytics/scroll-tracking'
import { Shield, ClipboardList, FileCheck2, Newspaper, Heart, Users, MessageSquare, CheckCircle, ArrowRight } from 'lucide-react'
import { PRICING, APP_CONFIG } from '@/lib/constants'
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo/structured-data'

export const metadata: Metadata = {
  title: `Form a New York LCSW PLLC (Clinical Social Work PLLC) | ${APP_CONFIG?.name || 'New York PLLC'}`,
  description: `LCSW PLLC formation for New York therapists. NYSED State Board for Social Work pre-approval, teletherapy-friendly purpose language, supervision-ready governance, compliant naming, precise filings, six-week publication, EIN + bank-ready docs — flat $${PRICING.basePrice}.`,
  keywords: [
    'LCSW PLLC New York',
    'LCSW PLLC formation NY',
    'Licensed Clinical Social Worker PLLC',
    'NY social work private practice',
    'teletherapy NY LCSW',
    'LCSW supervision LMSW New York',
    'group practice social work NY',
    'NYSED State Board for Social Work pre-approval',
    'NY Certificate of Publication PLLC',
    'counseling psychotherapy PLLC NY'
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL || 'https://newyorkpllc.com'}/professions/lcsw`,
  },
}

export default function LCSWPage() {
  const PRICE = PRICING.basePrice
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://newyorkpllc.com'
  const breadcrumbJson = [
    { name: 'Home', item: siteUrl },
    { name: 'LCSW PLLC Formation', item: `${siteUrl}/professions/lcsw` },
  ]

  const LCSW_FAQ = [
    {
      question: 'Do I need NYSED pre-approval before filing an LCSW PLLC?',
      answer:
        'Yes. Most professional entities require review by NYSED (State Board for Social Work) before the Department of State accepts formation. We assemble a clean pre-approval package — name, purpose/scope, and professional statements — to reduce objections and delays.',
    },
    {
      question: 'Who can own or manage an LCSW PLLC in New York?',
      answer:
        'Ownership and professional control are generally limited to appropriately licensed professionals who can lawfully provide the PLLC’s services. For clinical social work entities, that typically means LCSWs. We help you structure members/managers to align with New York rules.',
    },
    {
      question: 'Can I supervise LMSWs, limited permit holders, or interns under my PLLC?',
      answer:
        'Supervision rules are separate from entity formation. Many LCSWs supervise LMSWs or trainees under NYSED guidelines; however, ownership and professional control remain with licensed professionals. We craft governance that reflects supervision realities and recommend legal/regulatory guidance for complex models.',
    },
    {
      question: 'Can I provide teletherapy under an LCSW PLLC?',
      answer:
        'Many LCSWs deliver services via teletherapy to NY clients. Formation does not change licensure boundaries or payer rules — you must follow NY practice standards and platform/payer policies. We use purpose language appropriate for psychotherapy and counseling that supports in-person and virtual care within NY.',
    },
    {
      question: 'What LCSW-specific naming rules should I know?',
      answer:
        'NYSED enforces precise naming standards. Names must include the required designator (e.g., “PLLC”), be professional, and avoid restricted or misleading terms (like “clinic,” “center,” or services outside scope) without additional approvals. ',
    },
    {
      question: 'Is the six-week, two-newspaper publication included?',
      answer:
        `Yes. We coordinate publication in two county-designated newspapers, manage proofs and affidavits, and file the Certificate of Publication — fully included in the $${PRICE} flat fee.`,
    },
    {
      question: 'What documents do I receive for banking, credentialing, and leasing?',
      answer:
        'You receive your EIN confirmation, filed Articles, publication affidavits, and the Certificate of Publication — the standard bank-ready set typically requested by banks, credentialing teams, and landlords.',
    },
    {
      question: 'Can one LCSW PLLC operate multiple locations in New York?',
      answer:
        'Often yes. Many practices add locations as they grow. We structure your initial formation to support multi-location operations and explain county publication implications if you later open offices in other counties.',
    },
    {
      question: 'How long does the entire LCSW PLLC process take?',
      answer:
        'Timelines vary. NYSED pre-approval can add weeks or months depending on volume, and newspaper publication requires six consecutive weeks. We start immediately, give realistic timelines, and keep you updated at each milestone.',
    },
  ]

  // Add inline link to naming guidance in the naming FAQ
  LCSW_FAQ[4].answer += ' See <a href="/faq#naming-conventions">naming conventions</a> for common pitfalls.'

  return (
    <>
      <ScrollTracking />
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbJson)),
        }}
      />
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(LCSW_FAQ)),
        }}
      />
      <div className="flex flex-col">
        {/* Breadcrumb Navigation */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb
              items={[
                { label: 'Professions' },
                { label: 'LCSW PLLC', href: '/professions/lcsw' }
              ]}
            />
          </div>
        </div>

        {/* HERO */}
        <section className="bg-gradient-to-b from-primary/5 via-background to-background py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Form your <span className="text-primary">LCSW PLLC</span> in New York — compliant, clear, and supervision-ready
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Built for licensed clinical social workers moving from agency work to private practice — including teletherapy within NY.
              We manage{' '}
              <Link href="/faq#nysed-preapproval" className="text-primary underline underline-offset-2">NYSED pre-approval</Link>,
              craft teletherapy-friendly purpose language, guide compliant naming, file precisely with the Department of State,
              complete the six-week publication, and deliver a bank-ready package — all for <strong>${PRICE}</strong>. No hidden fees.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline">State Board for Social Work</Badge>
              <Badge variant="outline">Teletherapy-Friendly Purpose</Badge>
              <Badge variant="outline">Supervision-Ready Governance</Badge>
              <Badge variant="outline">Publishing Included</Badge>
              <Badge variant="outline">EIN + Bank-Ready Docs</Badge>
            </div>

            <div className="mt-10 flex justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/order">
                  Start your LCSW PLLC — ${PRICE}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Talk to us first</Link>
              </Button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Licensed professionals only • Secure checkout • No upsells</p>
          </div>
        </section>

        {/* WHY THIS MATTERS */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Purpose-built for New York LCSWs</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                LCSW entities face extra scrutiny: NYSED pre-approval, strict naming, county publication, and documentation for banks, credentialing, and landlords.
                We create PLLCs that reflect clinical social work scope, support supervision models, and scale as you add clinicians or locations.
              </p>
              <p className="mt-4 text-base text-muted-foreground max-w-3xl mx-auto">
                Expect a transparent process: name vetting → NYSED pre-approval → Articles filing → six-week publication → bank-ready package.
                We communicate in plain English and set realistic timelines at every step.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" /> NYSED Pre-Approval, Done Right
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  We package your submission for the State Board for Social Work — scope-appropriate purpose language and ownership aligned with professional practice rules.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" /> Naming That Passes Review
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Avoid restricted or misleading terms (e.g., “clinic,” “center,” or medical claims). We provide compliant, brand-forward options that clear NYSED faster. See{' '}
                  <Link href="/faq#naming-conventions" className="text-primary underline underline-offset-2">naming conventions</Link>.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck2 className="h-5 w-5 text-primary" /> Precise Articles & State Filings
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Articles tailored to clinical social work — psychotherapy, counseling, and related services — filed correctly with NYSED and the Department of State, with milestone updates throughout.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Newspaper className="h-5 w-5 text-primary" /> Required Publishing — Included
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  We manage the two-newspaper, six-week publication, collect affidavits, and file the Certificate of Publication — fully included in ${PRICE}.{' '}
                  <Link href="/faq#publishing-requirements" className="text-primary underline underline-offset-2 text-xs">
                    Learn about publishing requirements
                  </Link>.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* WHAT YOU RECEIVE */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to open and grow your LCSW practice</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A complete, bank-ready formation package designed for lenders, landlords, and credentialing teams.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Heart className="h-5 w-5 text-primary" /> Complete Formation</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  NYSED pre-approval support, Articles of Organization, compliant purpose language, and state filing — end-to-end.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Operating Agreement</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  An LCSW-focused Operating Agreement for solo or group practices — supervision-aware and ready for lender review.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Bank-Ready Package</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  EIN confirmation, filed Articles, publication affidavits, and Certificate of Publication — what banks and landlords typically require to proceed.
                </CardContent>
              </Card>
            </div>

            <div className="mt-10">
              <Button size="lg" asChild>
                <Link href="/order">Start your LCSW PLLC — ${PRICE}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* PROFESSION-SPECIFIC FAQ */}
        <section className="py-20 lg:py-28 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">LCSW PLLC FAQs</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {LCSW_FAQ.map((item) => (
                <Card key={item.question}>
                  <CardHeader>
                    <CardTitle className="text-lg">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {item.question.toLowerCase().includes('naming') ? (
                      <p
                        className="text-muted-foreground text-sm"
                        dangerouslySetInnerHTML={{ __html: item.answer }}
                      />
                    ) : (
                      <p className="text-muted-foreground text-sm">{item.answer}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button size="lg" asChild>
                <Link href="/order">Start your LCSW PLLC — ${PRICE}</Link>
              </Button>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">This information is general and not legal advice.</p>
          </div>
        </section>

        {/* TRUST & CTA */}
        <section className="bg-muted/40 py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">We’re here for New York therapists</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From NYSED pre-approval through publication and bank-ready documents, our process is built for LCSWs — solo practice, group practice, supervision, and teletherapy within NY.
            </p>
            <p className="mt-6 text-muted-foreground">
              We’re based in New York and actually answer the phone. No scripts. No bots. Just experienced help from people who do this every day.
            </p>

            <div className="mt-10 flex justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/order">Start now — ${PRICE}</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Talk to us first</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">We are not a law firm and do not provide legal advice.</p>
          </div>
        </section>
      </div>
    </>
  )
}
