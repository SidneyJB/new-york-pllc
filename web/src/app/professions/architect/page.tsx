import Link from 'next/link'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { ScrollTracking } from '@/components/analytics/scroll-tracking'
import {
  Shield,
  ClipboardList,
  FileCheck2,
  Newspaper,
  Building2,
  Ruler,
  Layers,
  Users,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'
import { PRICING, APP_CONFIG } from '@/lib/constants'
import { SEO_CONFIG } from '@/lib/seo/config'
import { generateBreadcrumbSchema, generateFAQSchema, generateProfessionServiceSchema } from '@/lib/seo/structured-data'

export const metadata: Metadata = {
  title: `Form a New York Architecture PLLC (Architecture & Landscape Architecture) | ${APP_CONFIG?.name || 'New York PLLC'}`,
  description: `Architecture PLLC formation for New York firms and sole practitioners — including Landscape Architecture. NYSED pre-approval (State Board for Architecture & Landscape Architecture), compliant naming, precise Articles, required six-week publication, EIN + bank-ready docs — flat $${PRICING.basePrice}.`,
  keywords: [
    'Architecture PLLC New York',
    'Architect PLLC formation NY',
    'Landscape Architecture PLLC NY',
    'design professional PLLC New York',
    'start an architecture firm NY',
    'architect business formation',
    'NYSED State Board for Architecture pre-approval',
    'NYCED landscape architecture practice',
    'New York Certificate of Publication PLLC',
  ],
  alternates: {
    canonical: `${SEO_CONFIG.siteUrl}/professions/architect`,
  },
}

export default function ArchitecturePage() {
  const PRICE = PRICING.basePrice
  const siteUrl = SEO_CONFIG.siteUrl
  const breadcrumbJson = [
    { name: 'Home', item: siteUrl },
    { name: 'Architecture PLLC Formation', item: `${siteUrl}/professions/architect` },
  ]

  const ARCH_FAQ = [
    {
      question: 'Do Architecture and Landscape Architecture PLLCs need NYSED pre-approval?',
      answer:
        'Yes. Most New York professional entities — including Architecture and Landscape Architecture — require review by NYSED’s Office of the Professions before the Department of State will accept formation. We build a profession-specific package (name, purpose/scope, ownership) to minimize objections and delays.',
    },
    {
      question: 'Who may own or manage an Architecture PLLC in New York?',
      answer:
        'Ownership and professional control are generally limited to appropriately licensed professionals who can lawfully provide the PLLC’s services. For Architecture entities, that typically means licensed architects; for Landscape Architecture, licensed landscape architects. We help you structure members/managers in line with NY rules.',
    },
    {
      question: 'Can one PLLC cover both Architecture and Landscape Architecture services?',
      answer:
        'Often yes, if appropriately licensed professionals are members/managers and the purpose language reflects the authorized scopes. We draft purpose statements that account for both disciplines and align with NYSED expectations.',
    },
    {
      question: 'Are there special naming rules for architecture firms?',
      answer:
        'Yes. NYSED closely reviews the use of words such as “architect,” “architecture,” “architects,” “landscape architecture,” and terms implying broader professional services. Names must include the proper professional designator (e.g., “PLLC”) and avoid restricted or misleading terms without additional approvals.',
    },
    {
      question: 'Is the six-week, two-newspaper publication included?',
      answer:
        `Yes. We coordinate county-designated publication, manage proofs and affidavits, and file the Certificate of Publication — fully included in the $${PRICE} flat fee.`,
    },
    {
      question: 'What will I receive for banking, landlords, and vendor onboarding?',
      answer:
        'You receive a bank-ready package: EIN confirmation, filed Articles, publication affidavits, and the Certificate of Publication — the documents commonly requested by banks, landlords, and procurement teams.',
    },
    {
      question: 'How long does an Architecture PLLC take from start to finish?',
      answer:
        'Timelines vary. NYSED pre-approval can add weeks or months depending on review volume. After formation, newspaper publication requires six consecutive weeks. We begin quickly, give realistic timelines, and update you at each milestone.',
    },
    {
      question: 'What if I am considering a D.P.C. or P.C. instead of a PLLC?',
      answer:
        'Some New York design firms use alternative professional structures (e.g., professional corporations). Our service focuses on PLLCs; we can discuss trade-offs and point you to resources if you are evaluating other entity types.',
    },
    {
      question: 'Can the PLLC operate multiple offices or work statewide?',
      answer:
        'Many firms operate multiple locations and take projects across New York. We form your entity to support growth and explain county publication implications if additional offices are opened in other counties.',
    },
  ]

  // Inline link for naming rules
  ARCH_FAQ[3].answer += ' See <a href="/faq#naming-conventions">naming conventions</a> for common pitfalls.'

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
      {/* Service Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateProfessionServiceSchema({
              name: 'New York Architect PLLC Formation Service',
              description:
                'PLLC formation for New York architects including NYSED pre-approval coordination, compliant naming, precise filing, required publication, and bank-ready documents.',
              url: '/professions/architect',
              offers: [
                {
                  name: 'Architect PLLC Formation Package',
                  description:
                    'Includes NYSED pre-approval packet coordination, six-week publication, Certificate of Publication, and formation documents for your architecture practice.',
                  price: `${PRICE}.00`,
                  priceCurrency: 'USD',
                  availability: 'https://schema.org/InStock',
                },
              ],
            })
          ),
        }}
      />
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(ARCH_FAQ)),
        }}
      />

      <div className="flex flex-col">
        {/* Breadcrumb Navigation */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb
              items={[
                { label: 'Professions' },
                { label: 'Architecture PLLC', href: '/professions/architect' },
              ]}
            />
          </div>
        </div>

        {/* HERO */}
        <section className="bg-gradient-to-b from-primary/5 via-background to-background py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Form your <span className="text-primary">Architecture PLLC</span> in New York — including Landscape Architecture
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Built for sole practitioners and growing design studios. We manage{' '}
              <Link href="/faq#nysed-preapproval" className="text-primary underline underline-offset-2">NYSED pre-approval</Link>,
              craft scope-accurate purpose language (Architecture and/or Landscape Architecture), guide compliant naming, file precisely with
              the Department of State, complete the six-week publication, and deliver a bank-ready package — all for <strong>${PRICE}</strong>.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline">State Board for Architecture</Badge>
              <Badge variant="outline">Landscape Architecture Supported</Badge>
              <Badge variant="outline">Compliant Naming</Badge>
              <Badge variant="outline">Publishing Included</Badge>
              <Badge variant="outline">EIN + Bank-Ready Docs</Badge>
            </div>

            <div className="mt-10 flex justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/order">
                  Start your Architecture PLLC — ${PRICE}
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

        {/* WHY IT’S SPECIFIC FOR ARCHITECTURE */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Purpose-built for New York design practice</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Architecture and Landscape Architecture firms face extra scrutiny — NYSED pre-approval, strict naming, county publication, and bank/vendor documentation.
                We form PLLCs that reflect your discipline(s), support multi-office growth, and keep compliance in focus as your project load scales.
              </p>
              <p className="mt-4 text-base text-muted-foreground max-w-3xl mx-auto">
                The path is clear: name vetting → NYSED pre-approval → Articles filing → six-week publication → bank-ready package.
                Expect plain-English updates and realistic timelines at each milestone.
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
                  Submission prepared for the State Board(s) for Architecture and Landscape Architecture — scope-accurate purpose language and governance aligned with professional practice rules.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" /> Naming That Passes Review
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Avoid restricted or misleading terms (e.g., uses of “architect(s),” “architecture,” “landscape architecture,” or medical claims) without approvals. See{' '}
                  <Link href="/faq#naming-conventions" className="text-primary underline underline-offset-2">naming conventions</Link>.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck2 className="h-5 w-5 text-primary" /> Precise Articles & Filings
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Articles tailored to Architecture and/or Landscape Architecture services and filed correctly with NYSED and the Department of State — with milestone updates throughout.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Newspaper className="h-5 w-5 text-primary" /> Required Publishing — Included
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Two-newspaper, six-week publication handled end-to-end — scheduling, affidavits, and Certificate of Publication filing — fully included in ${PRICE}.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* WHAT YOU RECEIVE */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to open and grow your design firm</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A complete, bank-ready formation package designed for lenders, landlords, and vendor/procurement teams.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" /> Formation
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  NYSED pre-approval support, Articles of Organization, and scope-accurate purpose language (Architecture and/or Landscape Architecture) — end-to-end.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" /> Operating Agreement
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  A profession-focused Operating Agreement for solo principals or multi-member studios — ready for lender and landlord review.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" /> Bank-Ready Package
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  EIN confirmation, filed Articles, publication affidavits, and the Certificate of Publication — what most banks and vendors require to proceed.
                </CardContent>
              </Card>
            </div>

            <div className="mt-10">
              <Button size="lg" asChild>
                <Link href="/order">Start your Architecture PLLC — ${PRICE}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* PROFESSION-SPECIFIC FAQ */}
        <section className="py-20 lg:py-28 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Architecture & Landscape Architecture PLLC FAQs</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Ownership, naming, multi-discipline scope, publishing, banking, and timelines — answered for New York design professionals.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {ARCH_FAQ.map((item) => (
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
                <Link href="/order">Start your Architecture PLLC — ${PRICE}</Link>
              </Button>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">This page provides general information and is not legal advice.</p>
          </div>
        </section>

        {/* TRUST & CTA */}
        <section className="bg-muted/40 py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">We help New York design professionals go independent — confidently</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From NYSED pre-approval through publication and bank-ready documents, our process is built for Architecture and Landscape Architecture — solo principals, studios, and multi-office firms.
            </p>
            <p className="mt-6 text-muted-foreground">
              We’re based in New York and respond quickly by phone and email. No scripts. No bots. Clear steps, accurate filings.
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