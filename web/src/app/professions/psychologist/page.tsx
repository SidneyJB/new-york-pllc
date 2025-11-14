import Link from 'next/link'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { ScrollTracking } from '@/components/analytics/scroll-tracking'
import { Brain, Shield, ClipboardList, FileCheck2, Newspaper, Users, CheckCircle, ArrowRight } from 'lucide-react'
import { PRICING, APP_CONFIG } from '@/lib/constants'
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo/structured-data'

export const metadata: Metadata = {
  title: `Form a New York Psychology PLLC (Psychologist PLLC) | ${APP_CONFIG?.name || 'New York PLLC'}`,
  description: `Psychology PLLC formation for NY psychologists. NYSED State Board for Psychology pre-approval, assessment/testing-aware purpose language, compliant naming, precise filings, six-week publication, EIN + bank-ready docs — flat $${PRICING.basePrice}. Built for psychotherapy, assessment, neuropsych, and telepsychology within NY.`,
  keywords: [
    'Psychology PLLC New York',
    'Psychologist PLLC formation NY',
    'New York psychologist practice',
    'psychological testing PLLC',
    'neuropsychology private practice NY',
    'forensic psychology PLLC',
    'telepsychology NY',
    'psychology practice formation',
    'NYSED State Board for Psychology pre-approval',
    'NY Certificate of Publication psychology'
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL || 'https://newyorkpllc.com'}/professions/psychologist`,
  },
}

export default function PsychologyPage() {
  const PRICE = PRICING.basePrice
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://newyorkpllc.com'
  const breadcrumbJson = [
    { name: 'Home', item: siteUrl },
    { name: 'Psychology PLLC Formation', item: `${siteUrl}/professions/psychologist` },
  ]

  const PSY_FAQ = [
    {
      question: 'Do psychologists need NYSED pre-approval before forming a PLLC?',
      answer:
        'Yes. Psychology PLLCs typically require review by NYSED’s Office of the Professions (State Board for Psychology) before the Department of State will accept the filing. We prepare a profession-specific pre-approval package to reduce objections and delays.',
    },
    {
      question: 'Who may own or manage a Psychology PLLC in New York?',
      answer:
        'Ownership and professional control are generally limited to appropriately licensed professionals who can lawfully provide the PLLC’s services. For psychology practices, that typically means licensed psychologists. We help align members/managers with New York’s professional practice rules.',
    },
    {
      question: 'What naming rules are unique to psychology practices?',
      answer:
        'Names must be professional, include the required designator (e.g., “PLLC”), and avoid restricted or misleading terms (e.g., “clinic,” “center,” or “institute”) without additional approvals. We provide compliant, brand-forward options that clear NYSED faster. ',
    },
    {
      question: 'Can I provide telepsychology under my PLLC?',
      answer:
        'Many psychologists serve NY clients via telepsychology. Formation does not change licensure boundaries — you must follow NY practice rules and payer policies. We craft purpose language appropriate for psychotherapy and assessment that supports in-person and virtual care within NY.',
    },
    {
      question: 'Can I supervise trainees, externs, or post-docs under a PLLC?',
      answer:
        'Supervision and training have their own rules distinct from entity formation. While you may supervise trainees or limited permit holders where permitted, ownership and professional control of the PLLC remain with licensed professionals. For complex supervision models, we suggest consulting legal/regulatory guidance.',
    },
    {
      question: 'Is the six-week newspaper publication included in the price?',
      answer:
        `Yes. We coordinate the two-newspaper publication, manage proofs and affidavits, and file the Certificate of Publication — fully included in the $${PRICE} flat fee.`,
    },
    {
      question: 'What will I receive for banking, credentialing, and leasing?',
      answer:
        'You receive your EIN confirmation, filed Articles of Organization, publication affidavits, and the Certificate of Publication — the standard “bank-ready” set typically requested by banks, credentialing teams, and landlords.',
    },
    {
      question: 'Can a Psychology PLLC operate multiple locations or a testing center?',
      answer:
        'Often yes. Many practices add locations or operate a dedicated assessment/testing site. We set up your formation to support growth and explain county publication implications if offices are added in other counties.',
    },
    {
      question: 'How long does a Psychology PLLC typically take?',
      answer:
        'Timelines vary. NYSED pre-approval can add weeks or months depending on volume; the newspaper publication then requires six consecutive weeks. We begin immediately, provide realistic timelines, and keep you updated at each milestone.',
    },
  ]

  // Add a direct link to naming guidance inside the naming FAQ
  PSY_FAQ[2].answer += ' See <a href="/faq#naming-conventions">naming conventions</a> for common pitfalls.'

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
          __html: JSON.stringify(generateFAQSchema(PSY_FAQ)),
        }}
      />
      <div className="flex flex-col">
        {/* Breadcrumb Navigation */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb
              items={[
                { label: 'Professions' },
                { label: 'Psychology PLLC', href: '/professions/psychologist' }
              ]}
            />
          </div>
        </div>

        {/* HERO */}
        <section className="bg-gradient-to-b from-primary/5 via-background to-background py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Form your <span className="text-primary">Psychology PLLC</span> in New York — purpose-built for psychotherapy & assessment
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Built specifically for licensed psychologists. We manage{' '}
              <Link href="/faq#nysed-preapproval" className="text-primary underline underline-offset-2">NYSED pre-approval</Link>, craft assessment/testing-aware purpose language,
              guide compliant naming, file precisely with the Department of State, complete six-week publication, and deliver a bank-ready package — all for <strong>${PRICE}</strong>.
              No hidden fees. Real New York support.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline">State Board for Psychology Pre-Approval</Badge>
              <Badge variant="outline">Testing/Assessment-Aware Purpose</Badge>
              <Badge variant="outline">Compliant Naming</Badge>
              <Badge variant="outline">Publishing Included</Badge>
              <Badge variant="outline">EIN + Bank-Ready Docs</Badge>
            </div>

            <div className="mt-10 flex justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/order">
                  Start your Psychology PLLC — ${PRICE}
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

        {/* WHY IT’S FOR PSYCHOLOGISTS */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Built for New York psychologists</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Psychology entities face extra scrutiny — from NYSED pre-approval and naming to county publication and bank documentation —
                all while you plan clinical services like psychotherapy, assessment, and consultation. We create PLLCs that reflect your scope,
                support in-person and telepsychology within NY, and scale as you add clinicians or locations.
              </p>
              <p className="mt-4 text-base text-muted-foreground max-w-3xl mx-auto">
                Expect a clear, stepwise process: name vetting → NYSED pre-approval → Articles filing → six-week publication → bank-ready package.
                We provide plain-English updates and realistic timelines so you always know what’s next.
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
                  We package your submission for the State Board for Psychology — including scope-appropriate purpose language and governance aligned to professional practice rules.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" /> Naming That Passes Review
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Avoid restricted or misleading terms (e.g., “clinic,” “center,” “institute,” or claims outside scope). We offer compliant, brand-forward options that clear NYSED more smoothly.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck2 className="h-5 w-5 text-primary" /> Precise Articles & State Filings
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Articles drafted for psychologists — psychotherapy, assessment, consultation — and filed correctly with NYSED and the Department of State, with updates at each milestone.
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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to open and grow your psychology practice</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A complete, bank-ready formation package designed for lenders, landlords, and credentialing teams.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Brain className="h-5 w-5 text-primary" /> Formation & Filing</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  NYSED pre-approval support, Articles of Organization, and scope-appropriate purpose language — end-to-end.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Operating Agreement</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  A psychologist-focused Operating Agreement for solo or group practices — supervision/hiring friendly and ready for lender review.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Bank-Ready Documents</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  EIN confirmation, filed Articles, publication affidavits, and Certificate of Publication — what banks and landlords typically require to proceed.
                </CardContent>
              </Card>
            </div>

            <div className="mt-10">
              <Button size="lg" asChild>
                <Link href="/order">Start your Psychology PLLC — ${PRICE}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* PROFESSION-SPECIFIC FAQ */}
        <section className="py-20 lg:py-28 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Psychology PLLC FAQs</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Practical answers for New York psychologists — ownership, naming, telepsychology, supervision, publishing, and timelines.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {PSY_FAQ.map((item) => (
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
                <Link href="/order">Start your Psychology PLLC — ${PRICE}</Link>
              </Button>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">This page provides general information and is not legal advice.</p>
          </div>
        </section>

        {/* TRUST & CTA */}
        <section className="bg-muted/40 py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">We help New York psychologists go independent — confidently</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From NYSED pre-approval through publication and bank-ready documents, our process is built for psychologists — psychotherapy, assessment, consultation, and telepsychology within NY.
            </p>
            <p className="mt-6 text-muted-foreground">
              We’re based in New York and respond quickly by phone and email. No scripts. No bots. Just experienced help from people who do this every day.
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
