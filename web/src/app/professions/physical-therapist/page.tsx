import Link from 'next/link'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { ScrollTracking } from '@/components/analytics/scroll-tracking'
import { Shield, ClipboardList, FileCheck2, Newspaper, Activity, Users, CheckCircle, ArrowRight } from 'lucide-react'
import { PRICING, APP_CONFIG } from '@/lib/constants'
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo/structured-data'

export const metadata: Metadata = {
  title: `Form a New York Physical Therapy PLLC (PT PLLC) | ${APP_CONFIG?.name || 'New York PLLC'}`,
  description: `Physical Therapy PLLC formation for NY PTs. NYSED State Board for Physical Therapy pre-approval, direct-access-aware purpose language, compliant naming, precise filings, six-week publication, EIN + bank-ready docs — flat $${PRICING.basePrice}. Built for clinic, mobile/home health, or performance settings.`,
  keywords: [
    'Physical Therapy PLLC New York',
    'PT PLLC formation NY',
    'New York Physical Therapist PLLC',
    'start a physical therapy practice NY',
    'direct access physical therapy NY',
    'sports rehab PLLC New York',
    'mobile physical therapy NY',
    'home health PT PLLC',
    'cash-based physical therapy NY',
    'NYSED State Board for Physical Therapy pre-approval'
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.nypllc.com'}/professions/physical-therapist`,
  },
}

export default function PTPage() {
  const PRICE = PRICING.basePrice
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.nypllc.com'
  const breadcrumbJson = [
    { name: 'Home', item: siteUrl },
    { name: 'Physical Therapist PLLC Formation', item: `${siteUrl}/professions/physical-therapist` },
  ]

  const PT_FAQ = [
    {
      question: 'Do Physical Therapists need NYSED pre-approval to form a PLLC?',
      answer:
        'Yes. Physical Therapy PLLCs generally require review by NYSED’s Office of the Professions (State Board for Physical Therapy) before the Department of State will accept the filing. We assemble a PT-specific pre-approval package — purpose language, name, and ownership — to minimize objections and delays.',
    },
    {
      question: 'Can a PT PLLC include non-PT owners or managers?',
      answer:
        'Ownership and professional control are generally limited to appropriately licensed professionals who can lawfully provide the PLLC’s services. For PT entities, that typically means licensed Physical Therapists. We help you structure members/managers to align with New York’s professional practice rules.',
    },
    {
      question: 'How should a PT PLLC handle direct access and referrals?',
      answer:
        'Entity formation does not change scope of practice or payer rules. Many NY practices operate with a mix of direct-access patients and referred patients. We craft purpose language that reflects Physical Therapy services while reminding owners to follow NYSED practice standards and payer policies.',
    },
    {
      question: 'What naming pitfalls should PTs avoid?',
      answer:
        'NYSED closely reviews terms such as “rehabilitation,” “clinic,” “wellness,” or “sports medicine.” Your name must be professional, include the required designator (e.g., PLLC), and avoid implying services outside PT without approvals. We provide compliant options that clear review faster.',
    },
    {
      question: 'Can a PT PLLC operate multiple or mobile/home-based locations?',
      answer:
        'Many practices expand to additional sites or deliver services in mobile/home-based settings. We structure your initial formation to support growth and explain county publication implications if you add offices in other counties later.',
    },
    {
      question: 'Is the six-week newspaper publication included?',
      answer:
        'Yes. Publication in two county-designated newspapers is included in the $' + PRICE + ' flat fee. We coordinate scheduling, manage affidavits, and file the Certificate of Publication on your behalf.',
    },
    {
      question: 'What do I receive for banking, landlords, and vendors?',
      answer:
        'You receive a bank-ready package: EIN confirmation, filed Articles, publication affidavits, and the Certificate of Publication. These are typically requested by banks, landlords, vendors, and credentialing teams.',
    },
    {
      question: 'How long does a PT PLLC typically take?',
      answer:
        'Timelines vary. NYSED pre-approval can add weeks or months depending on volume, and publication requires six consecutive weeks. We start immediately, give realistic timelines, and keep you updated at each milestone.',
    },
    {
      question: 'Can a PT PLLC employ PTAs or aides?',
      answer:
        'Employment is distinct from ownership. Many PT practices employ PTAs and support staff subject to supervision and other professional rules. We help align governance documents with your staffing model; for complex supervision questions, we recommend consulting legal or regulatory guidance.',
    },
    {
      question: 'Can I run a cash-based PT practice under a PLLC?',
      answer:
        'Yes. Many New York PT practices operate cash-based, credentialed, or hybrid models. Formation does not guarantee payer participation; it provides the compliant legal structure and documentation your bank and partners require.',
    },
  ]

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
          __html: JSON.stringify(generateFAQSchema(PT_FAQ)),
        }}
      />
      <div className="flex flex-col">
        {/* Breadcrumb Navigation */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb
              items={[
                { label: 'Professions' },
                { label: 'Physical Therapist PLLC', href: '/professions/physical-therapist' }
              ]}
            />
          </div>
        </div>

        {/* HERO */}
        <section className="bg-gradient-to-b from-primary/5 via-background to-background py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Form your <span className="text-primary">Physical Therapy PLLC</span> in New York — built for modern PT practice
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              From associate to owner — clinic, mobile/home health, or performance studio. We manage{' '}
              <Link href="/faq#nysed-preapproval" className="text-primary underline underline-offset-2">NYSED pre-approval</Link>,
              direct-access-aware purpose language, compliant naming, precise state filings, six-week publication, and a bank-ready document set — all for <strong>${PRICE}</strong>.
              No hidden fees. Real New York support.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline">State Board for PT Pre-Approval</Badge>
              <Badge variant="outline">Direct-Access Aware Purpose</Badge>
              <Badge variant="outline">Compliant Naming</Badge>
              <Badge variant="outline">Publishing Included</Badge>
              <Badge variant="outline">EIN + Bank-Ready Docs</Badge>
            </div>

            <div className="mt-10 flex justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/order">
                  Start your PT PLLC — ${PRICE}
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

        {/* WHY IT’S SPECIFIC FOR PTs */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Purpose-fit for New York Physical Therapists</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                PT entities face extra scrutiny: NYSED pre-approval, naming restrictions, and county publication — all while you plan equipment, space, and staffing.
                We build PLLCs that reflect PT scope and modalities, support growth to multiple sites, and work for cash-based or credentialed models.
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
                  We package your submission for the State Board for Physical Therapy — clear scope statements and ownership that align with professional practice rules.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" /> Naming That Passes Review
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Avoid restricted or misleading terms (e.g., “rehabilitation,” “clinic,” “sports medicine,” “wellness”) unless permitted. We provide compliant, brand-ready options that clear NYSED faster.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck2 className="h-5 w-5 text-primary" /> Precise Articles & State Filings
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Articles tailored to PT scope (including direct-access awareness and typical modalities) and filed correctly with NYSED and the Department of State — with plain-English updates throughout.
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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to open and grow your PT practice</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A complete, bank-ready formation package designed for lenders, landlords, vendors, and payer enrollment teams.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5 text-primary" /> Formation</CardTitle>
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
                  A PT-focused Operating Agreement for solo owners or group practices — ready for associate onboarding and lender review.
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
                <Link href="/order">Start your PT PLLC — ${PRICE}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* TRUST SECTION */}
        <section className="bg-muted/40 py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">We help New York PTs go independent — confidently</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Whether you’re launching a sports rehab studio, a home-based/mobile service, or a traditional outpatient clinic,
              we handle the formation work so you can focus on patient outcomes — not paperwork.
            </p>
            <p className="mt-6 text-muted-foreground">
              We’re New Yorkers. We answer the phone. We explain every step in plain language — before and after you file.
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
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Physical Therapy PLLC FAQs</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Practical answers for New York PTs — ownership, naming, direct access, mobile/home-based services, publishing, and banking.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {PT_FAQ.map((item) => (
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
                <Link href="/order">Start your PT PLLC — ${PRICE}</Link>
              </Button>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">This page provides general information, not legal advice.</p>
          </div>
        </section>
      </div>
    </>
  )
}
