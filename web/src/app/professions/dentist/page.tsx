import Link from 'next/link'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { ScrollTracking } from '@/components/analytics/scroll-tracking'
import { Shield, ClipboardList, FileCheck2, Newspaper, Heart, Users, CheckCircle, ArrowRight } from 'lucide-react'
import { PRICING, APP_CONFIG } from '@/lib/constants'
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo/structured-data'

export const metadata: Metadata = {
  title: `Form a New York Dental PLLC | ${APP_CONFIG?.name || 'New York PLLC'}`,
  description: `Dental PLLC formation built for dentists. NYSED pre-approval, specialty-accurate naming, precise filings, six-week publishing, EIN + bank-ready docs — all for $${PRICING.basePrice}.`,
  keywords: [
    'dental PLLC formation',
    'New York dentist PLLC',
    'start a dental practice NY',
    'orthodontics PLLC New York',
    'pediatric dentistry PLLC NY',
    'NYSED State Board for Dentistry pre-approval'
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.nypllc.com'}/professions/dentist`,
  },
}

export default function DentistPage() {
  const PRICE = PRICING.basePrice
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.nypllc.com'
  const breadcrumbJson = [
    { name: 'Home', item: siteUrl },
    { name: 'Dental PLLC Formation', item: `${siteUrl}/professions/dentist` },
  ]

  const DENTIST_FAQ = [
    {
      question: 'Do dentists need NYSED pre-approval before filing a PLLC?',
      answer:
        'Yes. New York requires review by NYSED’s Office of the Professions (State Board for Dentistry) before the Department of State will accept your filing. We assemble a clean pre-approval package — name, purpose/scope, and professional statements — so it clears quickly and avoids back-and-forth.',
    },
    {
      question: 'Who may own a New York Dental PLLC?',
      answer:
        'Ownership is generally limited to appropriately licensed professionals authorized to provide the PLLC’s services. For a Dental PLLC, that typically means dentists (including specialists who are licensed as dentists). Administrative or management companies may provide support services under contract, but ownership and control of professional services must remain with licensed professionals.',
    },
    {
      question: 'Can my Dental PLLC operate multiple offices under one entity?',
      answer:
        'Often yes. Many practices open additional locations under the same Dental PLLC with county-by-county publication and proper state filings as required. We set up your initial formation to support growth and guide you on how to add locations later.',
    },
    {
      question: 'What naming rules apply to a Dental PLLC?',
      answer:
        'Your name must include the professional designator (e.g., “PLLC”) and meet strict NYSED standards. Terms implying a specialty (e.g., “Orthodontics,” “Pediatric Dentistry”) should reflect your licensure and may trigger additional review. We provide compliant name options and handle NYSED name screening to prevent delays.',
    },
    {
      question: 'Is the six-week newspaper publication included in the price?',
      answer:
        `Yes. We coordinate publication in two newspapers designated by your county clerk, manage proofs/affidavits, and file the Certificate of Publication. All included in the $${PRICE} flat fee — no surprise add-ons later.`,
    },
    {
      question: 'What will I receive to open a bank account and sign a lease?',
      answer:
        'You receive a bank-ready package: EIN confirmation, filed Articles, publication affidavits, and the Certificate of Publication — the documents banks and landlords typically request for dental build-outs and equipment financing.',
    },
    {
      question: 'How long does the Dental PLLC process take?',
      answer:
        'Timelines vary with NYSED review and the mandatory six consecutive weeks of publication. We start immediately, keep you informed at each milestone, and move each step forward as quickly as state processes allow.',
    },
    {
      question: 'Can hygienists or non-dentist clinicians be members or managers?',
      answer:
        'Membership rules are profession-specific. In general, owners and those exercising control must be appropriately licensed to render the PLLC’s professional services. We help you structure governance so it aligns with NY rules and your practice model; for complex scenarios, we recommend legal counsel.',
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
          __html: JSON.stringify(generateFAQSchema(DENTIST_FAQ)),
        }}
      />
      <div className="flex flex-col">
        {/* Breadcrumb Navigation */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb
              items={[
                { label: 'Professions' },
                { label: 'Dental PLLC', href: '/professions/dentist' },
              ]}
            />
          </div>
        </div>

        {/* HERO */}
        <section className="bg-gradient-to-b from-primary/5 via-background to-background py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Form your <span className="text-primary">Dental PLLC</span> in New York — from associate to owner
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Built specifically for dentists. We manage{' '}
              <Link href="/faq#nysed-preapproval" className="text-primary underline underline-offset-2">NYSED pre-approval</Link>,
              provide specialty-aware naming guidance, file precisely with the Department of State, complete the six-week publication,
              and deliver your bank-ready package — all for <strong>${PRICE}</strong>. No hidden fees. No call centers. New York experts who do this every day.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline">State Board for Dentistry Pre-Approval</Badge>
              <Badge variant="outline">Specialty-Accurate Naming</Badge>
              <Badge variant="outline">Multi-Location Friendly</Badge>
              <Badge variant="outline">Legal Publishing Included</Badge>
              <Badge variant="outline">EIN + Bank-Ready Docs</Badge>
            </div>

            <div className="mt-10 flex justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/order">
                  Start your Dental PLLC — ${PRICE}
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
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Built around the realities of dental practice ownership</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Opening a practice isn’t just paperwork — it’s financing equipment, negotiating a medical/dental lease, onboarding associates,
                and meeting insurer credentialing timelines. We form Dental PLLCs that pass NYSED scrutiny and support growth — first office to multi-location.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" /> NYSED Pre-Approval Done Right
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  We prepare your pre-approval for the State Board for Dentistry — name, scope, and professional statements aligned to your practice (general, pediatric, ortho, perio, endo, and more).
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" /> Specialty-Aware Naming Guidance
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Avoid NYSED name objections and rework. We help you choose a compliant name (including specialty descriptors where appropriate) that reflects your brand and clears review.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck2 className="h-5 w-5 text-primary" /> Precise, Dentist-Specific Filings
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Articles crafted for dental practice requirements and filed properly with NYSED and the Department of State — with plain-English updates at each milestone.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Newspaper className="h-5 w-5 text-primary" /> Required Publishing — Included
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  We handle the full six-week newspaper publication, gather affidavits, and file the Certificate of Publication.{' '}
                  <Link href="/faq#publishing-requirements" className="text-primary underline underline-offset-2 text-xs">
                    Learn about publishing requirements
                  </Link>. It’s all included in ${PRICE}.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* WHAT YOU RECEIVE */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to open and grow your dental practice</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A complete, bank-ready formation package designed for lenders, landlords, and credentialing teams.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Heart className="h-5 w-5 text-primary" /> Complete Formation</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  NYSED pre-approval support, Articles of Organization, EIN, and six-week publication — end-to-end and handled for you.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Operating Agreement</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Dentist-specific Operating Agreement for solo owners or group practices — ready for associate onboarding and lender review.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Bank-Ready Package</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  EIN confirmation, filed Articles, publication affidavits, and Certificate of Publication — what banks and landlords typically require to move forward.
                </CardContent>
              </Card>
            </div>

            <div className="mt-10">
              <Button size="lg" asChild>
                <Link href="/order">Start your Dental PLLC — ${PRICE}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* PROFESSION-SPECIFIC FAQ */}
        <section className="py-20 lg:py-28 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Dental PLLC FAQs</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Clear, dentist-specific answers for forming a Professional Limited Liability Company in New York.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {DENTIST_FAQ.map((item) => (
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
                <Link href="/order">Start your Dental PLLC — ${PRICE}</Link>
              </Button>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">This information is general and not legal advice.</p>
          </div>
        </section>

        {/* TRUST & CTA */}
        <section className="bg-muted/40 py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">We’re here for New York dentists</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From NYSED pre-approval through publication and bank-ready documents, our team understands how dentists launch and scale practices — associate buy-ins, adding specialists, and opening second locations.
            </p>
            <p className="mt-6 text-muted-foreground">
              We’re based in New York and responsive by phone and email. No scripts. No bots. Just experienced help for licensed professionals like you.
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
