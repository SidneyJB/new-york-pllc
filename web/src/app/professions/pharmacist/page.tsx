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
  Pill,
  Users,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'
import { PRICING, APP_CONFIG } from '@/lib/constants'
import { SEO_CONFIG } from '@/lib/seo/config'
import { generateBreadcrumbSchema, generateFAQSchema, generateProfessionServiceSchema } from '@/lib/seo/structured-data'

export const metadata: Metadata = {
  title: `Form a New York Pharmacy PLLC | ${APP_CONFIG?.name || 'New York PLLC'}`,
  description: `Pharmacy PLLC formation built for New York pharmacists. NYSED pre-approval, practice-specific naming, precise filings, six-week publishing, EIN + bank-ready docs — all for $${PRICING.basePrice}.`,
  keywords: [
    'pharmacy PLLC formation New York',
    'New York pharmacist PLLC',
    'start an independent pharmacy NY',
    'pharmacy establishment registration NY',
    'NYSED State Board of Pharmacy',
    'pharmacist business formation New York',
    'compounding pharmacy PLLC NY',
  ],
  alternates: {
    canonical: `${SEO_CONFIG.siteUrl}/professions/pharmacist`,
  },
}

export default function PharmacistPage() {
  const PRICE = PRICING.basePrice
  const siteUrl = SEO_CONFIG.siteUrl
  const breadcrumbJson = [
    { name: 'Home', item: siteUrl },
    { name: 'Pharmacy PLLC Formation', item: `${siteUrl}/professions/pharmacist` },
  ]

  const PHARMACIST_FAQ = [
    {
      question: 'Do pharmacists need NYSED pre-approval to form a PLLC?',
      answer:
        'Yes. Pharmacy PLLCs require review by NYSED\u2019s Office of the Professions (State Board of Pharmacy) before the Department of State will accept your filing. We assemble a pharmacy-specific pre-approval package \u2014 name, scope, ownership structure, and professional statements \u2014 to clear review quickly and avoid back-and-forth.',
    },
    {
      question: 'Who may own a New York pharmacy PLLC?',
      answer:
        'New York law generally restricts ownership and professional control of a pharmacy PLLC to licensed pharmacists. All members and managers must hold a current New York pharmacist license. We help structure your ownership documents to comply with these requirements from day one.',
    },
    {
      question: 'What is the dual-registration requirement for pharmacies?',
      answer:
        'Forming a PLLC is step one. Before you can dispense medications, you must also complete a separate pharmacy establishment registration with NYSED\u2019s State Board of Pharmacy \u2014 covering your proposed location, facility layout, security systems, operational procedures, and Supervising Pharmacist designation. That registration is handled directly with NYSED and is separate from the PLLC formation we provide.',
    },
    {
      question: 'What naming rules apply to a pharmacy PLLC?',
      answer:
        'NYSED closely reviews pharmacy entity names. Your name must include the required designator (e.g., PLLC), avoid implying services outside your licensed scope, and comply with State Board of Pharmacy guidelines. We provide compliant, brand-ready naming options that clear review faster.',
    },
    {
      question: 'Is the six-week newspaper publication included in the price?',
      answer:
        `Yes. We coordinate publication in two newspapers designated by your county clerk, manage proofs and affidavits, and file the Certificate of Publication. All included in the $${PRICE} flat fee \u2014 no surprise add-ons later.`,
    },
    {
      question: 'Do you help with DEA registration?',
      answer:
        'We don\u2019t file your DEA application (Form 225), but we provide guidance on the process and ensure your PLLC formation documents \u2014 EIN, Articles, and entity structure \u2014 are ready for your DEA submission. Most pharmacies dispensing controlled substances need this registration before opening.',
    },
    {
      question: 'What will I receive to open a bank account and negotiate a lease?',
      answer:
        'You receive a bank-ready package: EIN confirmation, filed Articles, publication affidavits, and the Certificate of Publication \u2014 the documents banks, landlords, and wholesale distributors typically request before extending credit, signing leases, or opening accounts.',
    },
    {
      question: 'How long does the pharmacy PLLC formation process take?',
      answer:
        'Timelines vary with NYSED review volume and the mandatory six consecutive weeks of publication. The separate pharmacy establishment registration adds its own timeline (10\u201314 weeks for standard pharmacies, longer for sterile compounding). We start immediately, keep you informed at each milestone, and move each step forward as quickly as state processes allow.',
    },
  ]

  return (
    <>
      <ScrollTracking />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbJson)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateProfessionServiceSchema({
              name: 'New York Pharmacist PLLC Formation Service',
              description:
                'PLLC formation for New York pharmacists including NYSED pre-approval coordination, compliant naming, precise filing, required publication, and bank-ready documents.',
              url: '/professions/pharmacist',
              offers: [
                {
                  name: 'Pharmacy PLLC Formation Package',
                  description:
                    'Includes NYSED pre-approval packet coordination, six-week publication, Certificate of Publication, and formation documents for your pharmacy practice.',
                  price: `${PRICE}.00`,
                  priceCurrency: 'USD',
                  availability: 'https://schema.org/InStock',
                },
              ],
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(PHARMACIST_FAQ)),
        }}
      />

      <div className="flex flex-col">
        {/* Breadcrumb Navigation */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb
              items={[
                { label: 'Professions' },
                { label: 'Pharmacist PLLC', href: '/professions/pharmacist' },
              ]}
            />
          </div>
        </div>

        {/* HERO */}
        <section className="bg-gradient-to-b from-primary/5 via-background to-background py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Form your <span className="text-primary">Pharmacy PLLC</span> in New York &mdash; independent community to specialty compounding
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Built specifically for licensed pharmacists. We manage{' '}
              <Link href="/faq#nysed-preapproval" className="text-primary underline underline-offset-2">NYSED pre-approval</Link>,
              ensure compliant naming, file precisely with the Department of State, complete the six-week publication, and deliver your
              bank-ready package &mdash; all for <strong>${PRICE}</strong>.
              No hidden fees. No call centers. New York experts who do this every day.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline">NYSED Pre-Approval</Badge>
              <Badge variant="outline">Compliant Naming</Badge>
              <Badge variant="outline">DEA-Ready Structure</Badge>
              <Badge variant="outline">Legal Publishing Included</Badge>
              <Badge variant="outline">EIN + Bank-Ready Docs</Badge>
            </div>

            <div className="mt-10 flex justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/order">
                  Start your Pharmacy PLLC &mdash; ${PRICE}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Talk to us first</Link>
              </Button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Licensed professionals only &bull; Secure checkout &bull; No upsells</p>
          </div>
        </section>

        {/* WHY THIS MATTERS */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Built around the realities of launching a pharmacy practice</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Opening a pharmacy means more than filling prescriptions &mdash; it&apos;s securing a location, building out a dispensing area,
                setting up inventory systems, and joining insurance networks. We handle the PLLC formation so you can focus on
                getting your doors open.
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
                  We prepare a clean NYSED pre-approval package &mdash; name, scope, ownership structure, and professional statements aligned to your practice type (community, compounding, specialty, or clinical pharmacy).
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" /> Pharmacy-Aware Naming Guidance
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Avoid NYSED name objections and rework. We help you choose a compliant name that reflects your practice type (community, compounding, specialty, or clinical) and clears State Board of Pharmacy review.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck2 className="h-5 w-5 text-primary" /> Precise, Pharmacist-Specific Filings
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Articles crafted for pharmacy practice requirements and filed properly with NYSED and the Department of State. Purpose language reflects your dispensing, compounding, or clinical services &mdash; not generic boilerplate.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Newspaper className="h-5 w-5 text-primary" /> Required Publishing &mdash; Included
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  We handle the full six-week newspaper publication, gather affidavits, and file the Certificate of Publication.{' '}
                  <Link href="/faq#publishing-requirements" className="text-primary underline underline-offset-2 text-xs">
                    Learn about publishing requirements
                  </Link>. It&apos;s all included in ${PRICE}.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* WHAT YOU RECEIVE */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to open and grow your pharmacy</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A complete, bank-ready formation package designed for lenders, landlords, wholesale distributors, and insurance network credentialing teams.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Pill className="h-5 w-5 text-primary" /> Complete Formation</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  NYSED pre-approval support, Articles of Organization, EIN, and six-week publication &mdash; end-to-end and handled for you.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Operating Agreement</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Pharmacist-specific Operating Agreement for solo owners or multi-pharmacist partnerships &mdash; ready for bank review, lease negotiations, and wholesale account applications.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Bank-Ready Package</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  EIN confirmation, filed Articles, publication affidavits, and Certificate of Publication &mdash; what banks, landlords, and distributors typically require for inventory financing and lease execution.
                </CardContent>
              </Card>
            </div>

            <div className="mt-10">
              <Button size="lg" asChild>
                <Link href="/order">Start your Pharmacy PLLC &mdash; ${PRICE}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* PROFESSION-SPECIFIC FAQ */}
        <section className="py-20 lg:py-28 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Pharmacy PLLC FAQs</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Practical answers for New York pharmacists &mdash; ownership, naming, dual registration, DEA, publishing, and banking.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {PHARMACIST_FAQ.map((item) => (
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
                <Link href="/order">Start your Pharmacy PLLC &mdash; ${PRICE}</Link>
              </Button>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">This information is general and not legal advice.</p>
          </div>
        </section>

        {/* TRUST & CTA */}
        <section className="bg-muted/40 py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">We&apos;re here for New York pharmacists</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From NYSED pre-approval through publication and bank-ready documents, our team understands how pharmacists launch and
              scale practices &mdash; independent community pharmacies, compounding labs, specialty pharmacies, and clinical pharmacy operations.
            </p>
            <p className="mt-6 text-muted-foreground">
              We&apos;re based in New York and responsive by phone and email. No scripts. No bots. Just experienced help for licensed professionals like you.
            </p>

            <div className="mt-10 flex justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/order">Start now &mdash; ${PRICE}</Link>
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
