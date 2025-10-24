import Link from 'next/link'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Brain, Shield, ClipboardList, FileCheck2, Newspaper, Users, CheckCircle, ArrowRight } from 'lucide-react'
import { PRICING, APP_CONFIG } from '@/lib/constants'
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo/structured-data'

export const metadata: Metadata = {
  title: `Form a New York Psychology PLLC | ${APP_CONFIG?.name || 'New York PLLC'}`,
  description: `Psychology PLLC formation done right in NY. NYSED pre‑approval support, professional naming, accurate filings, required publishing, EIN + bank‑ready packet — $${PRICING.basePrice}.`,
  keywords: [
    'Psychology PLLC formation',
    'New York Psychologist LLC',
    'Licensed Psychologist PLLC',
    'NY psychology practice formation',
    'Psychologist business formation',
    'New York psychology PLLC'
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
      question: 'Do psychologists need NYSED pre‑approval before forming a PLLC?',
      answer:
        'Yes. Psychology practices require NYSED pre‑approval prior to Department of State filing. We prepare a profession‑specific submission so your proposed name, purpose language, and ownership align with state standards.',
    },
    {
      question: 'Who may own or manage a Psychology PLLC in New York?',
      answer:
        'Ownership is generally limited to licensees who can lawfully provide the professional services of the entity. For psychology practices, this typically means licensed psychologists. We help you structure ownership in compliance with New York rules.',
    },
    {
      question: 'What naming rules are unique to psychology practices?',
      answer:
        'Names must be professional, include the proper designator (e.g., “PLLC”), and avoid restricted words without additional approvals (for example, terms implying a hospital or multi‑disciplinary clinic). We review your options and help select a name that passes NYSED review.',
    },
    {
      question: 'Is the six‑week publication included in the price?',
      answer:
        'Yes. We coordinate the two‑newspaper publication in your county, handle affidavits, and file the Certificate of Publication. It is included in the $' + PRICE + ' price.',
    },
    {
      question: 'Which documents do I receive for banking and onboarding?',
      answer:
        'You receive EIN confirmation, filed Articles of Organization, publication affidavits, and your Certificate of Publication — a bank‑ready package accepted by most institutions.',
    },
    {
      question: 'How long does a Psychology PLLC typically take?',
      answer:
        'NYSED pre‑approval often adds several months, followed by the six‑week publication period. We initiate steps quickly, set clear expectations, and keep you informed throughout.',
    },
  ]

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
            Form your <span className="text-primary">Psychology PLLC</span> in New York — professionally and precisely
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Designed specifically for licensed psychologists in New York.  
            We handle <Link href="/faq#nysed-preapproval" className="text-primary underline underline-offset-2">NYSED pre-approval</Link>, naming compliance, professional filings, required publishing, EIN registration,
            and deliver every document you need to open your practice — all for <strong>${PRICE}</strong>.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <Badge variant="outline">NYSED Pre-Approval</Badge>
            <Badge variant="outline">Naming Compliance</Badge>
            <Badge variant="outline">Accurate Filing</Badge>
            <Badge variant="outline">Publishing Included</Badge>
            <Badge variant="outline">EIN + Operating Agreement</Badge>
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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Built for New York Psychologists</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              As a licensed psychologist in New York, your professional entity must comply with NYSED and Department of State
              requirements that are more complex than standard businesses.  
              We make it seamless, compliant, and stress-free — so you can focus on your clients, not your filings.
            </p>
            <p className="mt-4 text-base text-muted-foreground max-w-3xl mx-auto">
              Our process is transparent: we review your proposed name, assemble NYSED pre‑approval materials, prepare precise purpose language for your Articles, and coordinate the six‑week publication. You’ll get clear checkpoints and a bank‑ready document package at the end.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" /> NYSED Pre-Approval Guidance
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                We help assemble your NYSED pre-approval submission and ensure your proposed name and purpose
                align with Psychology Board standards — preventing rejections and delays.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-primary" /> Professionally Compliant Naming
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                NYSED enforces strict <Link href="/faq#naming-conventions" className="text-primary underline underline-offset-2">naming rules</Link> for psychology practices.  
                We’ll help you choose a compliant name that maintains professionalism and aligns with your scope of practice.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck2 className="h-5 w-5 text-primary" /> Accurate & Transparent Filing
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                We prepare and file your PLLC Articles of Organization, ensuring the purpose language and ownership
                details meet NYSED and DOS standards. You’ll receive plain-English updates at every milestone.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="h-5 w-5 text-primary" /> Legal Publishing Included
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                We manage the six-week newspaper publication, collect affidavits, and file the Certificate of Publication.  
                It’s included in the ${PRICE} — no add-ons, no hidden charges.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* WHAT YOU RECEIVE */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to open your psychology practice</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From NYSED approval to your final Certificate of Publication — we deliver every document you need to operate and open a business account.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Brain className="h-5 w-5 text-primary" /> Formation & Filing</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                NYSED pre-approval, Articles of Organization, and compliant purpose language — handled from start to finish.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Operating Agreement</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                A signature-ready Operating Agreement crafted for psychologists — suitable for solo or group practices.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Bank-Ready Documents</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                EIN confirmation, affidavits, and filed Certificates — everything required to open your business bank account and onboard clients.
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

      {/* TRUST SECTION */}
      <section className="bg-muted/40 py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">We help New York psychologists go independent with confidence</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We’ve worked with hundreds of licensed professionals across New York — including psychologists, LCSWs, and MHCs — to form compliant PLLCs
            that pass NYSED review the first time.
          </p>
          <p className="mt-6 text-muted-foreground">
            You’ll never deal with a call center or be left guessing about next steps.  
            We’re a small New York team that answers fast, explains clearly, and gets it right.
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
      {/* PROFESSION-SPECIFIC FAQ */}
      <section className="py-20 lg:py-28 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Psychology PLLC FAQs</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Practical answers for New York psychologists forming a PLLC — on ownership, naming, publishing, and timelines.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {PSY_FAQ.map((item) => (
              <Card key={item.question}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button size="lg" asChild>
              <Link href="/order">Start your Psychology PLLC — ${PRICE}</Link>
            </Button>
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">For general guidance only — not legal advice.</p>
        </div>
      </section>
      </div>
    </>
  )
}
