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
  Ruler,
  Wrench,
  CircuitBoard,
  Building2,
  Users,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'
import { PRICING, APP_CONFIG } from '@/lib/constants'
import { SEO_CONFIG } from '@/lib/seo/config'
import { generateBreadcrumbSchema, generateFAQSchema, generateProfessionServiceSchema } from '@/lib/seo/structured-data'

export const metadata: Metadata = {
  title: `Form a New York Engineering PLLC (Professional Engineer PLLC) | ${APP_CONFIG?.name || 'New York PLLC'}`,
  description: `Engineering PLLC formation for New York Professional Engineers (PE). NYSED State Board for Engineering & Land Surveying pre-approval, discipline-accurate purpose language, compliant naming, precise Articles, required six-week publication, EIN + bank-ready documents — flat $${PRICING.basePrice}.`,
  keywords: [
    'Engineering PLLC New York',
    'Professional Engineer PLLC NY',
    'PE PLLC formation',
    'start an engineering firm NY',
    'civil engineering PLLC NY',
    'mechanical engineering PLLC NY',
    'electrical engineering PLLC NY',
    'structural engineering PLLC NY',
    'environmental engineering PLLC NY',
    'NYSED State Board for Engineering pre-approval',
    'NY Certificate of Publication engineering',
  ],
  alternates: {
    canonical: `${SEO_CONFIG.siteUrl}/professions/engineer`,
  },
}

export default function EngineeringPage() {
  const PRICE = PRICING.basePrice
  const siteUrl = SEO_CONFIG.siteUrl
  const breadcrumbJson = [
    { name: 'Home', item: siteUrl },
    { name: 'Engineering PLLC Formation', item: `${siteUrl}/professions/engineer` },
  ]

  const ENG_FAQ = [
    {
      question: 'Do Engineering PLLCs need NYSED pre-approval before filing?',
      answer:
        'Yes. Engineering entities are typically reviewed by NYSED’s Office of the Professions (State Board for Engineering & Land Surveying) before the Department of State will accept formation. We assemble a PE-specific pre-approval package — name, scope/purpose, and ownership — to reduce objections and delays.',
    },
    {
      question: 'Who may own or manage an Engineering PLLC in New York?',
      answer:
        'Ownership and professional control are generally limited to appropriately licensed professionals who can lawfully provide the entity’s services. For an Engineering PLLC, that typically means licensed Professional Engineers (PEs). We help align members/managers with New York’s professional practice rules.',
    },
    {
      question: 'Can non-licensees hold equity in an Engineering PLLC?',
      answer:
        'PLLC ownership is generally restricted to licensees. Some New York firms consider alternative professional structures (e.g., D.P.C. or P.C.) with different ownership rules. Our service focuses on PLLCs; we can outline high-level trade-offs and suggest resources if you’re evaluating other entity types.',
    },
    {
      question: 'What naming pitfalls delay Engineering PLLC approvals?',
      answer:
        'NYSED closely reviews uses of “engineer,” “engineering,” “consulting engineers,” and terms implying other licensed professions. Names must include the required designator (e.g., “PLLC”), be professional, and avoid restricted or misleading terms without approvals. ',
    },
    {
      question: 'How should purpose language address engineering disciplines?',
      answer:
        'Purpose language should reflect authorized services and typical disciplines (e.g., civil, structural, mechanical, electrical, environmental, geotechnical) without over-reaching into other licensed scopes. We draft discipline-accurate statements that align with NYSED expectations.',
    },
    {
      question: 'Is the six-week, two-newspaper publication included in the price?',
      answer:
        `Yes. We coordinate county-designated publication, manage proofs and affidavits, and file the Certificate of Publication — fully included in the $${PRICE} flat fee.`,
    },
    {
      question: 'What documents will I receive for banking, vendors, and RFPs?',
      answer:
        'You receive EIN confirmation, filed Articles of Organization, publication affidavits, and the Certificate of Publication — the standard bank-ready set commonly requested by banks, landlords, vendors, and procurement teams.',
    },
    {
      question: 'Can one Engineering PLLC operate multiple offices or statewide?',
      answer:
        'Many firms add locations and serve clients across New York. We structure your formation to support growth and explain county publication implications if you open offices in additional counties later.',
    },
    {
      question: 'Does formation affect sealing, “responsible charge,” or QA/QC?',
      answer:
        'Entity formation does not change professional responsibilities. Sealing, responsible charge, supervision, and QA/QC remain governed by professional rules. We align governance with how your firm assigns project responsibility.',
    },
    {
      question: 'How long does an Engineering PLLC typically take?',
      answer:
        'Timelines vary. NYSED pre-approval can add weeks or months depending on volume; newspaper publication requires six consecutive weeks. We start quickly, provide realistic timelines, and keep you updated at each milestone.',
    },
  ]

  // Add inline link to naming guidance
  ENG_FAQ[3].answer += ' See <a href="/faq#naming-conventions">naming conventions</a> for common pitfalls.'

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
              name: 'New York Engineering PLLC Formation Service',
              description:
                'PLLC formation for New York Professional Engineers (PE) including NYSED pre-approval coordination, compliant naming, precise filing, required publication, and bank-ready documents.',
              url: '/professions/engineer',
              offers: [
                {
                  name: 'Engineering PLLC Formation Package',
                  description:
                    'Includes NYSED pre-approval packet coordination, six-week publication, Certificate of Publication, and formation documents for your engineering practice.',
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
          __html: JSON.stringify(generateFAQSchema(ENG_FAQ)),
        }}
      />

      <div className="flex flex-col">
        {/* Breadcrumb Navigation */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb
              items={[
                { label: 'Professions' },
                { label: 'Engineering PLLC', href: '/professions/engineer' },
              ]}
            />
          </div>
        </div>

        {/* HERO */}
        <section className="bg-gradient-to-b from-primary/5 via-background to-background py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Form your <span className="text-primary">Engineering PLLC</span> in New York — built for modern PE practice
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              For Professional Engineers launching or formalizing a New York practice — civil, structural, mechanical, electrical, environmental, geotech, and more.
              We manage <Link href="/faq#nysed-preapproval" className="text-primary underline underline-offset-2">NYSED pre-approval</Link>,
              draft discipline-accurate purpose language, guide compliant naming, file precisely with the Department of State, complete the six-week publication,
              and deliver a bank-ready package — all for <strong>${PRICE}</strong>.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline">State Board for Engineering</Badge>
              <Badge variant="outline">Discipline-Accurate Purpose</Badge>
              <Badge variant="outline">Compliant Naming</Badge>
              <Badge variant="outline">Publishing Included</Badge>
              <Badge variant="outline">EIN + Bank-Ready Docs</Badge>
            </div>

            <div className="mt-10 flex justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/order">
                  Start your Engineering PLLC — ${PRICE}
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

        {/* WHY IT’S SPECIFIC FOR ENGINEERS */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Purpose-built for New York engineering firms</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                PE entities face extra scrutiny — NYSED pre-approval, strict naming, county publication, and the documentation banks, landlords, and procurement teams expect.
                We form PLLCs that mirror your disciplines, support statewide project work and multi-office growth, and keep compliance in focus as you scale.
              </p>
              <p className="mt-4 text-base text-muted-foreground max-w-3xl mx-auto">
                Your path: name vetting → NYSED pre-approval → Articles filing → six-week publication → bank-ready package.
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
                  Submission prepared for the State Board for Engineering & Land Surveying — scope-accurate purpose and governance aligned with professional practice rules.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" /> Naming That Passes Review
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Avoid restricted or misleading terms (uses of “engineer/engineering,” “consulting engineers,” or claims outside scope) without approvals. See{' '}
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
                  Articles tailored to civil/structural/mechanical/electrical/environmental/geotech services and filed correctly with NYSED and the Department of State — with milestone updates throughout.
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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to open and grow your PE firm</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A complete, bank-ready formation package designed for lenders, landlords, and public/private procurement teams.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Ruler className="h-5 w-5 text-primary" /> Formation</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  NYSED pre-approval support, Articles of Organization, and discipline-accurate purpose language — end-to-end.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Operating Agreement</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  A PE-focused Operating Agreement for solo principals or multi-member firms — ready for lender and landlord review.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Bank-Ready Package</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  EIN confirmation, filed Articles, publication affidavits, and Certificate of Publication — what most banks and vendors require to proceed.
                </CardContent>
              </Card>
            </div>

            <div className="mt-10">
              <Button size="lg" asChild>
                <Link href="/order">Start your Engineering PLLC — ${PRICE}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* PROFESSION-SPECIFIC FAQ */}
        <section className="py-20 lg:py-28 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Engineering PLLC FAQs</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Ownership, naming, discipline scope, publishing, banking, and timelines — answered for New York Professional Engineers.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {ENG_FAQ.map((item) => (
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
                <Link href="/order">Start your Engineering PLLC — ${PRICE}</Link>
              </Button>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">This page provides general information and is not legal advice.</p>
          </div>
        </section>

        {/* TRUST & CTA */}
        <section className="bg-muted/40 py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">We help New York engineers go independent — confidently</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From NYSED pre-approval through publication and bank-ready documents, our process is built for Professional Engineers — solo principals, specialty boutiques, and growing multi-discipline firms.
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