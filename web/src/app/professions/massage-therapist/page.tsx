import Link from 'next/link'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Shield, ClipboardList, FileCheck2, Newspaper, Heart, Users, CheckCircle, ArrowRight } from 'lucide-react'
import { PRICING, APP_CONFIG } from '@/lib/constants'
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo/structured-data'

export const metadata: Metadata = {
  title: `Form a New York Massage Therapy PLLC (LMT PLLC) | ${APP_CONFIG?.name || 'New York PLLC'}`,
  description: `Massage Therapy PLLC formation for New York LMTs. NYSED State Board for Massage Therapy pre-approval, mobile/on-site friendly purpose language, compliant naming, precise filings, six-week publication, EIN + bank-ready docs — flat $${PRICING.basePrice}.`,
  keywords: [
    'Massage Therapy PLLC New York',
    'LMT PLLC NY',
    'licensed massage therapist PLLC',
    'mobile massage practice NY',
    'sports massage PLLC',
    'prenatal massage PLLC NY',
    'medical massage New York',
    'corporate chair massage NY',
    'NYSED State Board for Massage Therapy pre-approval',
    'NY Certificate of Publication massage therapy'
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL || 'https://newyorkpllc.com'}/professions/massage-therapist`,
  },
}

export default function MassageTherapyPage() {
  const PRICE = PRICING.basePrice
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://newyorkpllc.com'
  const breadcrumbJson = [
    { name: 'Home', item: siteUrl },
    { name: 'Massage Therapy PLLC Formation', item: `${siteUrl}/professions/massage-therapist` },
  ]

  const LMT_FAQ = [
    {
      question: 'Do LMTs need NYSED pre-approval before forming a PLLC?',
      answer:
        'Yes. Massage Therapy entities are reviewed by NYSED’s Office of the Professions (State Board for Massage Therapy) before the Department of State accepts formation. We package your pre-approval (name, scope/purpose, ownership) to reduce objections and delays.',
    },
    {
      question: 'Who may own or manage a Massage Therapy PLLC in New York?',
      answer:
        'Ownership and professional control are generally limited to appropriately licensed professionals who can lawfully provide the PLLC’s services. For massage therapy, that typically means LMTs. We help align members/managers with New York’s professional practice rules.',
    },
    {
      question: 'What naming rules should Massage Therapy practices watch for?',
      answer:
        'Names must include the professional designator (e.g., “PLLC”), be professional, and avoid restricted or misleading terms (e.g., “clinic,” “medical,” or claims outside massage therapy scope) without additional approvals. ',
    },
    {
      question: 'Can I run a mobile or home-based massage business under a PLLC?',
      answer:
        'Many LMTs operate mobile, on-site corporate/event, or home-based services. Formation supports these models; you must still follow local permits, facility rules, insurance requirements, and NY scope of practice. We craft purpose language that supports in-studio and mobile/on-site care within NY.',
    },
    {
      question: 'Can my PLLC contract with spas, gyms, or chiropractors/clinics?',
      answer:
        'Yes, many LMTs contract with third-party locations. Contracting terms are separate from formation. We provide a bank-ready document set and governance that works with common independent contractor or space-use arrangements; for complex employment/contract issues, consult legal counsel.',
    },
    {
      question: 'Is the six-week, two-newspaper publication included?',
      answer:
        `Yes. We coordinate county-designated publication, manage proofs and affidavits, and file the Certificate of Publication — fully included in the $${PRICE} flat fee.`,
    },
    {
      question: 'What documents do I receive for banking, leasing, and vendor onboarding?',
      answer:
        'You receive EIN confirmation, filed Articles of Organization, publication affidavits, and the Certificate of Publication — the standard bank-ready set typically requested by banks, landlords, and vendors.',
    },
    {
      question: 'How long does a Massage Therapy PLLC typically take?',
      answer:
        'Timelines vary. NYSED pre-approval can add weeks or months depending on review volume; publication then requires six consecutive weeks. We begin immediately, set realistic timelines, and keep you updated at each milestone.',
    },
  ]

  // Inline link to naming guidance
  LMT_FAQ[2].answer += ' See <a href="/faq#naming-conventions">naming conventions</a> for common pitfalls.'

  return (
    <>
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbJson)) }}
      />
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(LMT_FAQ)) }}
      />
      <div className="flex flex-col">
        {/* Breadcrumb Navigation */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb
              items={[
                { label: 'Professions' },
                { label: 'Massage Therapy PLLC', href: '/professions/massage-therapist' },
              ]}
            />
          </div>
        </div>

        {/* HERO */}
        <section className="bg-gradient-to-b from-primary/5 via-background to-background py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Form your <span className="text-primary">Massage Therapy PLLC</span> in New York — studio, mobile & on-site ready
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Built for New York LMTs — sports, medical, prenatal, relaxation, corporate chair, and event massage. We manage{' '}
              <Link href="/faq#nysed-preapproval" className="text-primary underline underline-offset-2">NYSED pre-approval</Link>, craft mobile/on-site-friendly purpose language,
              guide compliant naming, file precisely with the Department of State, complete the six-week publication, and deliver a bank-ready package — all for <strong>${PRICE}</strong>. No hidden fees.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline">State Board for Massage Therapy</Badge>
              <Badge variant="outline">Mobile & On-Site Friendly</Badge>
              <Badge variant="outline">Spa/Gym Contract Ready</Badge>
              <Badge variant="outline">Publishing Included</Badge>
              <Badge variant="outline">EIN + Bank-Ready Docs</Badge>
            </div>

            <div className="mt-10 flex justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/order">
                  Start your LMT PLLC — ${PRICE}
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

        {/* WHY IT’S SPECIFIC FOR LMTs */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Purpose-built for New York massage therapy</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                LMT entities face extra scrutiny — State Board pre-approval, strict naming, county publication, and the documents banks, landlords, and venues expect.
                We form PLLCs that reflect massage therapy scope, support studio and mobile/on-site models, and scale as you add therapists or locations.
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
                  We package your submission for the State Board for Massage Therapy — scope-appropriate purpose language and governance aligned to professional practice rules.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" /> Naming That Passes Review
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Avoid restricted or misleading terms (e.g., “clinic,” “medical,” or claims beyond scope). We propose compliant, brand-forward options that clear NYSED faster. See{' '}
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
                  Articles tailored to massage therapy — studio and mobile/on-site — filed correctly with NYSED and the Department of State, with milestone updates throughout.
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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to open and grow your massage therapy practice</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A complete, bank-ready formation package designed for lenders, landlords, venues, and vendors.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Heart className="h-5 w-5 text-primary" /> Formation</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  NYSED pre-approval support, Articles of Organization, mobile/on-site-friendly purpose language, and state filing — end-to-end.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Operating Agreement</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  An LMT-focused Operating Agreement for solo or group practices — ready for lender/landlord review and common spa/gym contracting.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Bank-Ready Package</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  EIN confirmation, filed Articles, publication affidavits, and Certificate of Publication — what banks and landlords typically require.
                </CardContent>
              </Card>
            </div>

            <div className="mt-10">
              <Button size="lg" asChild>
                <Link href="/order">Start your LMT PLLC — ${PRICE}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* PROFESSION-SPECIFIC FAQ */}
        <section className="py-20 lg:py-28 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Massage Therapy PLLC FAQs</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Practical answers for New York LMTs — ownership, naming, mobile/on-site service, spa/gym contracting, publishing, and timelines.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {LMT_FAQ.map((item) => (
                <Card key={item.question}>
                  <CardHeader>
                    <CardTitle className="text-lg">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {item.question.toLowerCase().includes('naming') ? (
                      <p className="text-muted-foreground text-sm" dangerouslySetInnerHTML={{ __html: item.answer }} />
                    ) : (
                      <p className="text-muted-foreground text-sm">{item.answer}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button size="lg" asChild>
                <Link href="/order">Start your LMT PLLC — ${PRICE}</Link>
              </Button>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">This page provides general information and is not legal advice.</p>
          </div>
        </section>

        {/* TRUST & CTA */}
        <section className="bg-muted/40 py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">We help New York LMTs go independent — confidently</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From State Board pre-approval through publication and a bank-ready document set, our process is built for modern massage therapy — studio, mobile, and on-site services within NY.
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
