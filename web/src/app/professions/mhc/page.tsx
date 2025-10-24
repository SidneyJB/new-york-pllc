 
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
  title: `Form a New York MHC PLLC | ${APP_CONFIG?.name || 'New York PLLC'}`,
  description: `LMHC PLLC formation in NY. Counseling‑specific NYSED pre‑approval, compliant naming, precise filings, publishing included, EIN + operating agreement — flat $${PRICING.basePrice}.`,
  keywords: [
    'MHC PLLC formation',
    'New York Mental Health Counselor LLC',
    'Licensed Mental Health Counselor PLLC',
    'NY counselor business formation',
    'MHC practice formation',
    'New York therapist PLLC'
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL || 'https://newyorkpllc.com'}/professions/mhc`,
  },
}

export default function MHCPage() {
  const PRICE = PRICING.basePrice
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://newyorkpllc.com'
  const breadcrumbJson = [
    { name: 'Home', item: siteUrl },
    { name: 'Mental Health Counselor PLLC Formation', item: `${siteUrl}/professions/mhc` },
  ]

  const MHC_FAQ = [
    {
      question: 'Do LMHCs need NYSED pre‑approval before forming a PLLC?',
      answer:
        'Yes. Mental Health Counselors fall under the Mental Health Practitioners group reviewed by the Office of the Professions. We assemble a thorough pre‑approval request so your name, purpose, and ownership meet the state’s standards.',
    },
    {
      question: 'Who can own or manage an MHC PLLC in New York?',
      answer:
        'Ownership and management are generally limited to appropriately licensed professionals who can lawfully provide the services of the entity. For counseling practices, that typically means LMHCs (and in some cases other closely related licensed professions, where permitted).',
    },
    {
      question: 'What naming issues commonly delay LMHC approvals?',
      answer:
        'Names must be professional, include the correct designator (e.g., “PLLC”), and avoid restricted terms like “clinic” or references to services outside counseling without approvals. We help you choose a compliant name that passes review.',
    },
    {
      question: 'Is the six‑week, two‑newspaper publication included in the price?',
      answer:
        'Yes. We manage the county‑assigned publication schedule, handle proofs and affidavits, and file the Certificate of Publication when complete. It is included in the $' + PRICE + ' flat price.',
    },
    {
      question: 'What documents will I get for banking and credentialing?',
      answer:
        'You receive EIN confirmation, filed Articles, publication affidavits, and the Certificate of Publication. These are commonly requested for opening a bank account and practice onboarding.',
    },
    {
      question: 'How long does an LMHC PLLC usually take?',
      answer:
        'NYSED pre‑approval can add several months. After formation, publication takes six consecutive weeks. We begin quickly, set clear expectations, and keep you updated at each step.',
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
          __html: JSON.stringify(generateFAQSchema(MHC_FAQ)),
        }}
      />
      <div className="flex flex-col">
        {/* Breadcrumb Navigation */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb
              items={[
                { label: 'Professions' },
                { label: 'MHC PLLC', href: '/professions/mhc' }
              ]}
            />
          </div>
        </div>

      {/* HERO */}
      <section className="bg-gradient-to-b from-primary/5 via-background to-background py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Start your <span className="text-primary">Mental Health Counselor PLLC</span> in New York — the compliant way
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            For Licensed Mental Health Counselors ready to open their own practice.  
            We handle <Link href="/faq#nysed-preapproval" className="text-primary underline underline-offset-2">NYSED pre-approval</Link>, naming compliance, filing, publishing, and deliver every document you need to start seeing clients — all for{' '}
            <strong>${PRICE}</strong>. No confusion, no hidden fees, and no call centers.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <Badge variant="outline">NYSED Pre-Approval</Badge>
            <Badge variant="outline">Naming Guidance</Badge>
            <Badge variant="outline">Accurate Filing</Badge>
            <Badge variant="outline">Publishing Included</Badge>
            <Badge variant="outline">EIN + Operating Agreement</Badge>
          </div>

          <div className="mt-10 flex justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/order">
                Start your MHC PLLC — ${PRICE}
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

      {/* WHY IT’S DIFFERENT FOR MHCs */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Made for New York MHCs</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Mental Health Counselors in New York have some of the strictest professional formation requirements in the country.
              We’ve helped MHCs across the state set up clean, compliant PLLCs that meet every NYSED and Department of State rule —  
              without the paperwork overwhelm.
            </p>
            <p className="mt-4 text-base text-muted-foreground max-w-3xl mx-auto">
              Expect a step‑by‑step process: name review, NYSED pre‑approval packaging, Articles filing, and county publication. We keep you informed with plain‑English updates and realistic timelines, so you always know what’s next and why it matters for your counseling practice.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" /> NYSED Pre-Approval Help
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                We guide you through the pre-approval stage with NYSED’s Office of the Professions, ensuring your
                proposed name, purpose, and ownership meet the state’s exacting standards.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-primary" /> Naming Guidance that Prevents Rejections
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                NYSED enforces very specific <Link href="/faq#naming-conventions" className="text-primary underline underline-offset-2">naming conventions</Link> for MHC PLLCs.  
                We help you avoid restricted terms and ensure your name passes state review on the first try.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck2 className="h-5 w-5 text-primary" /> Clean, Compliant Filing
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                Your Articles of Organization are drafted specifically for MHC practice — with correct purpose language,
                ownership details, and professional designations that meet all NYSED and DOS rules.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="h-5 w-5 text-primary" /> Legal Publishing Included
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                We manage the required six-week, two-newspaper publication process in your county and file your
                Certificate of Publication when done — fully included in the ${PRICE}.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* WHAT YOU RECEIVE */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to open your counseling practice</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From state filings to the paperwork your bank requires — we deliver the complete, compliant package.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Heart className="h-5 w-5 text-primary" /> Full Formation</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                NYSED pre-approval, Articles of Organization, and state filing handled start to finish — no templates or guesswork.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Operating Agreement</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                A signature-ready Operating Agreement tailored for mental health professionals — designed for simplicity and compliance.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Bank-Ready Package</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                EIN confirmation, publication affidavits, filed certificate, and all documents required to open a business bank account.
              </CardContent>
            </Card>
          </div>

          <div className="mt-10">
            <Button size="lg" asChild>
              <Link href="/order">Start your MHC PLLC — ${PRICE}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      {/* PROFESSION-SPECIFIC FAQ */}
      <section className="py-20 lg:py-28 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">LMHC PLLC FAQs</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Answers to the most common questions Licensed Mental Health Counselors ask about PLLC formation in New York.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {MHC_FAQ.map((item) => (
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
              <Link href="/order">Start your MHC PLLC — ${PRICE}</Link>
            </Button>
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">General information only — not legal advice.</p>
        </div>
      </section>
      <section className="bg-muted/40 py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">We understand what it takes to start a counseling practice in NY</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We’ve helped hundreds of mental health professionals form compliant PLLCs — therapists, LCSWs, LMFTs, and MHCs.
            Our job is to make this process simple, predictable, and 100% compliant so you can focus on helping clients, not paperwork.
          </p>
          <p className="mt-6 text-muted-foreground">
            We’re local, responsive, and genuinely care about getting it right.  
            You can email or call anytime — we’ll walk you through the details before you ever pay a dime.
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
