import Link from 'next/link'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Shield, ClipboardList, FileCheck2, Newspaper, Heart, Users, MessageSquare, CheckCircle, ArrowRight } from 'lucide-react'
import { PRICING, APP_CONFIG } from '@/lib/constants'
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo/structured-data'

export const metadata: Metadata = {
  title: `Form a New York Speech-Language Pathology PLLC (SLP PLLC) | ${APP_CONFIG?.name || 'New York PLLC'}`,
  description: `SLP PLLC formation for New York speech-language pathologists. NYSED State Board for Speech-Language Pathology & Audiology pre-approval, telepractice-friendly purpose language, compliant naming, precise filings, six-week publication, EIN + bank-ready docs — flat $${PRICING.basePrice}.`,
  keywords: [
    'SLP PLLC New York',
    'Speech-Language Pathology PLLC NY',
    'speech therapy private practice NY',
    'telepractice speech therapy NY',
    'pediatric speech therapy PLLC',
    'feeding therapy dysphagia PLLC',
    'AAC speech therapy NY',
    'school contract SLP NY',
    'NYSED State Board Speech Language Pathology pre-approval',
    'NY Certificate of Publication speech therapy'
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL || 'https://newyorkpllc.com'}/professions/speech-language-pathologist`,
  },
}

export default function SLPPage() {
  const PRICE = PRICING.basePrice
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://newyorkpllc.com'
  const breadcrumbJson = [
    { name: 'Home', item: siteUrl },
    { name: 'Speech-Language Pathology PLLC Formation', item: `${siteUrl}/professions/speech-language-pathologist` },
  ]

  const SLP_FAQ = [
    {
      question: 'Do Speech-Language Pathologists need NYSED pre-approval before forming a PLLC?',
      answer:
        'Yes. SLP entities are reviewed by NYSED’s Office of the Professions (State Board for Speech-Language Pathology & Audiology) before the Department of State accepts formation. We package your pre-approval (name, scope/purpose, and ownership) to minimize objections and delays.',
    },
    {
      question: 'Who may own or manage an SLP PLLC in New York?',
      answer:
        'Ownership and professional control are generally limited to appropriately licensed professionals authorized to provide the PLLC’s services. For SLP entities, that typically means licensed speech-language pathologists. We help you structure members/managers in line with New York’s professional practice rules.',
    },
    {
      question: 'Can I provide telepractice under my SLP PLLC?',
      answer:
        'Many New York SLPs serve clients via telepractice. Formation does not change licensure boundaries or payer policies — you must follow NY practice standards and platform/payer rules. We craft purpose language that supports in-person and virtual care within NY.',
    },
    {
      question: 'Can I contract with schools or early intervention programs as an SLP PLLC?',
      answer:
        'Yes, many SLPs contract with districts, preschools, or EI programs. Contracting requirements are separate from entity formation. We provide a bank-ready document set and purpose language appropriate for school-based services; program enrollment and credentials are handled with the relevant agencies.',
    },
    {
      question: 'What naming issues commonly delay SLP approvals?',
      answer:
        'Names must include the proper professional designator (e.g., “PLLC”), be professional, and avoid restricted or misleading terms (e.g., “clinic,” “center,” or claims beyond SLP scope) without additional approvals. ',
    },
    {
      question: 'Can an SLP PLLC operate multiple locations or mobile/home-based services?',
      answer:
        'Often yes. Many practices expand to additional sites or deliver mobile/home-based services. We set up your formation to support growth and explain county publication implications if you add offices in other counties later.',
    },
    {
      question: 'Is the six-week, two-newspaper publication included?',
      answer:
        `Yes. We coordinate county-designated publication, manage proofs and affidavits, and file the Certificate of Publication — fully included in the $${PRICE} flat fee.`,
    },
    {
      question: 'What documents will I receive for banking, credentialing, and leasing?',
      answer:
        'You receive EIN confirmation, filed Articles of Organization, publication affidavits, and the Certificate of Publication — the standard bank-ready set requested by banks, credentialing teams, and landlords.',
    },
    {
      question: 'How long does SLP PLLC formation usually take?',
      answer:
        'Timelines vary. NYSED pre-approval can add weeks or months depending on review volume; publication then takes six consecutive weeks. We begin quickly, provide realistic timelines, and keep you updated at each milestone.',
    },
    {
      question: 'Can I supervise CFs, limited permit holders, or assistants under a PLLC?',
      answer:
        'Supervision rules (CF/limited permit/assistant) are separate from entity formation. Many SLPs supervise under NYSED guidelines; ownership and professional control of the PLLC remain with licensed professionals. We draft governance to reflect your supervision model and recommend legal/regulatory guidance for complex scenarios.',
    },
  ]

  // Add inline link to naming guidance in the naming FAQ
  SLP_FAQ[4].answer += ' See <a href="/faq#naming-conventions">naming conventions</a> for common pitfalls.'

  return (
    <>
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
          __html: JSON.stringify(generateFAQSchema(SLP_FAQ)),
        }}
      />
      <div className="flex flex-col">
        {/* Breadcrumb Navigation */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb
              items={[
                { label: 'Professions' },
                { label: 'Speech-Language Pathology PLLC', href: '/professions/speech-language-pathologist' },
              ]}
            />
          </div>
        </div>

        {/* HERO */}
        <section className="bg-gradient-to-b from-primary/5 via-background to-background py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Form your <span className="text-primary">Speech-Language Pathology PLLC</span> in New York — built for clinic, school & telepractice
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Designed for New York SLPs across pediatric and adult care — articulation, language, fluency, voice, AAC, and feeding/dysphagia.
              We manage <Link href="/faq#nysed-preapproval" className="text-primary underline underline-offset-2">NYSED pre-approval</Link>,
              craft telepractice-friendly purpose language, guide compliant naming, file precisely with the Department of State,
              complete the six-week publication, and deliver a bank-ready package — all for <strong>${PRICE}</strong>. No hidden fees.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline">State Board for SLP/Audiology</Badge>
              <Badge variant="outline">Telepractice-Friendly Purpose</Badge>
              <Badge variant="outline">School/EI Contract Ready</Badge>
              <Badge variant="outline">Publishing Included</Badge>
              <Badge variant="outline">EIN + Bank-Ready Docs</Badge>
            </div>

            <div className="mt-10 flex justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/order">
                  Start your SLP PLLC — ${PRICE}
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

        {/* WHY IT’S SPECIFIC FOR SLPS */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Purpose-built for New York SLP practice</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                SLP entities face extra scrutiny — NYSED pre-approval, strict naming, county publication, and the documents banks,
                districts, and landlords expect. We form PLLCs that reflect SLP scope (clinic, school, home, telepractice), support CF supervision,
                and scale as you add clinicians or locations.
              </p>
              <p className="mt-4 text-base text-muted-foreground max-w-3xl mx-auto">
                You’ll follow a clear path: name vetting → NYSED pre-approval → Articles filing → six-week publication → bank-ready package.
                We communicate in plain English and set realistic timelines at every milestone.
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
                  We package your submission for the State Board for Speech-Language Pathology & Audiology — scope-appropriate purpose and governance aligned with professional practice rules.
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
                  Articles tailored to SLP services — articulation, language, fluency, voice, AAC, feeding/dysphagia — and filed correctly with NYSED and the Department of State, with plain-English updates throughout.
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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to open and grow your SLP practice</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A complete, bank-ready formation package designed for lenders, districts, landlords, and credentialing teams.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5 text-primary" /> Formation</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  NYSED pre-approval support, Articles of Organization, telepractice-friendly purpose language, and state filing — end-to-end.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Operating Agreement</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  An SLP-focused Operating Agreement for solo or group practices — supervision-aware and ready for lender/district review.
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
                <Link href="/order">Start your SLP PLLC — ${PRICE}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* PROFESSION-SPECIFIC FAQ */}
        <section className="py-20 lg:py-28 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Speech-Language Pathology PLLC FAQs</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Practical answers for New York SLPs — ownership, naming, telepractice, school contracts, publishing, and timelines.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {SLP_FAQ.map((item) => (
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
                <Link href="/order">Start your SLP PLLC — ${PRICE}</Link>
              </Button>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">This page provides general information and is not legal advice.</p>
          </div>
        </section>

        {/* TRUST & CTA */}
        <section className="bg-muted/40 py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">We help New York SLPs go independent — confidently</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From NYSED pre-approval through publication and bank-ready documents, our process is built for speech-language pathology — clinic, school, home, and telepractice within NY.
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
