import Link from 'next/link'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { ScrollTracking } from '@/components/analytics/scroll-tracking'
import { Shield, ClipboardList, FileCheck2, Newspaper, Users, CheckCircle, ArrowRight } from 'lucide-react'
import { APP_CONFIG } from '@/lib/constants'
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo/structured-data'

export const metadata: Metadata = {
  title: `Foreign-Qualify Your PLLC in New York | ${APP_CONFIG?.name || 'New York PLLC'}`,
  description:
    'Already have a PLLC? We foreign-qualify it for New York. NYSED Certificate of Authority, DOS Application for Authority (§1306), six-week publication, and compliant naming/ownership — handled end-to-end.',
  keywords: [
    'foreign qualification PLLC New York',
    'qualify out-of-state PLLC in NY',
    'Application for Authority §1306',
    'NYSED Certificate of Authority',
    'professional limited liability company NY',
    'New York publication requirement foreign PLLC',
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.nypllc.com'}/foreign-pllc`,
  },
}

export default function ForeignQualificationPage() {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.nypllc.com'
  const breadcrumbJson = [
    { name: 'Home', item: siteUrl },
    { name: 'Foreign PLLC Qualification', item: `${siteUrl}/foreign-pllc` },
  ]

  const FAQ = [
    {
      question: 'Does my entity have to be a PLLC already?',
      answer:
        'Yes. To qualify in New York as a foreign professional entity, your company must already be organized as a PLLC (or equivalent professional LLC) in its home jurisdiction. New York first issues a Certificate of Authority through NYSED before DOS will grant authority.',
    },
    {
      question: 'Do all members/managers need New York licenses?',
      answer:
        'For health-services PLLCs and certain design professions, New York requires that each member/manager hold the appropriate New York license in addition to home-state licensing. We verify eligibility and surface fixes early.',
    },
    {
      question: 'Will I need to change my name for New York?',
      answer:
        'Your New York name must match the home-state PLLC name and satisfy NY professional naming rules. If your home-state name lacks the profession or PLLC/LLC designator or includes restricted words, we handle an Assumed Name so you remain compliant in New York.',
    },
    {
      question: 'Is publication required for foreign PLLCs?',
      answer:
        'Yes. After DOS files your Application for Authority, New York requires publication once a week for six consecutive weeks in two county-designated newspapers and a subsequent Certificate of Publication filing. We coordinate the newspapers, affidavits, and filing.',
    },
    {
      question: 'Do I need a physical New York office?',
      answer:
        'Your Application for Authority must designate a New York office location (city/town/village and county). We advise on correct designation and ensure consistency across filings and publication.',
    },
    {
      question: 'What do I receive at the end?',
      answer:
        'A complete compliance packet: NYSED Certificate of Authority copy, DOS Application for Authority filing receipt, certified copy (for NYSED return), and your Certificate of Publication with affidavits — bank- and credentialing-ready.',
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
          __html: JSON.stringify(generateFAQSchema(FAQ)),
        }}
      />
      <div className="flex flex-col">
        {/* Breadcrumb Navigation */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb
              items={[
                { label: 'Foreign PLLC Qualification', href: '/foreign-pllc' },
              ]}
            />
          </div>
        </div>

        {/* HERO */}
        <section className="bg-gradient-to-b from-primary/5 via-background to-background py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Foreign-qualify your <span className="text-primary">existing PLLC</span> to practice in New York
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Expand into New York without guesswork. We secure your NYSED Certificate of Authority, file your DOS
              Application for Authority, complete the required six-week publication, and deliver a bank-ready compliance
              packet — end-to-end, with clear status updates and no hidden add-ons.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline">NYSED Certificate of Authority</Badge>
              <Badge variant="outline">Application for Authority (§1306)</Badge>
              <Badge variant="outline">Six-Week Publication Included</Badge>
              <Badge variant="outline">Naming & Ownership Compliance</Badge>
              <Badge variant="outline">Bank-Ready Documentation</Badge>
            </div>

            <div className="mt-10 flex justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Talk with us about foreign qualification
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Pricing depends on your home state and required documents (like Certificates of Good Standing). We’ll scope
              your file and send an invoice. No hidden fees or upsells.
            </p>
          </div>
        </section>

        {/* WHY THIS SERVICE */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Purpose-built for out-of-state PLLCs</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Foreign qualification is not formation. It’s permission for your existing professional LLC to practice a
                New York-regulated profession. Our workflow aligns with NYSED and Department of State rules so your practice
                can hire, bill, lease, and bank in New York without compliance surprises.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" /> NYSED Certificate of Authority
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  We package your profession-specific submission, confirm member/manager licensing, and align naming and
                  purpose language with Title VIII standards, minimizing back-and-forth and rejections.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" /> DOS Application for Authority
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  We file your Application for Authority under LLC Law §1306 with the required NYSED certificate and
                  supporting documents, including county designation for publication.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Newspaper className="h-5 w-5 text-primary" /> Required Publication, handled
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  We coordinate the county-designated newspapers, run six consecutive weeks, obtain affidavits, and file
                  your Certificate of Publication, then track the record through to confirmation.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck2 className="h-5 w-5 text-primary" /> Final NYSED registration
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  After DOS returns the certified copy of your filing, we deliver it to NYSED to complete registration
                  so your entity appears properly on the Office of the Professions site.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* WHAT YOU RECEIVE */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">A single, bank-ready compliance package</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Delivered documentation supports banking, leasing, payor credentialing, and vendor onboarding in New York.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" /> Licensing & Naming Alignment
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Verified member/manager licensing and profession-appropriate naming consistent with NY rules, including
                  assumed-name solutions when needed.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" /> Filed Authority & Certified Copy
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  DOS filing receipt, certified copy for NYSED, and confirmations organized for your records and other third
                  parties.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck2 className="h-5 w-5 text-primary" /> Publication Proofs
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Affidavits and Certificate of Publication compiled and archived to avoid administrative suspension.
                </CardContent>
              </Card>
            </div>

            <div className="mt-10">
              <Button size="lg" asChild>
                <Link href="/contact">Talk with us about foreign qualification</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 lg:py-28 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">    
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Foreign Qualification FAQs</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Clear answers for out-of-state professional LLCs expanding into New York.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {FAQ.map((item) => (
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
                <Link href="/contact">Discuss your foreign qualification with us</Link>
              </Button>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              General information only. Not legal advice. We’ll review your home-state entity and required documents before
              quoting and invoicing.
            </p>
          </div>
        </section>

        {/* TRUST & CTA */}
        <section className="bg-muted/40 py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">New York experts for professional entities</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We work directly with NYSED’s professional-entity standards and DOS’s filing and publication rules so you
              can open accounts, sign leases, hire clinicians, and bill payors in New York — with confidence.
            </p>

            <div className="mt-10 flex justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/contact">Talk with us about your NY foreign qualification</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">We are not a law firm and do not provide legal advice.</p>
          </div>
        </section>
      </div>
    </>
  )
}
