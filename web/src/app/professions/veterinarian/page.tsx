import Link from 'next/link'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { ScrollTracking } from '@/components/analytics/scroll-tracking'
import { Shield, ClipboardList, FileCheck2, Newspaper, Heart, Users, CheckCircle, ArrowRight } from 'lucide-react'
import { PRICING, APP_CONFIG } from '@/lib/constants'
import { SEO_CONFIG } from '@/lib/seo/config'
import { generateBreadcrumbSchema, generateFAQSchema, generateProfessionServiceSchema } from '@/lib/seo/structured-data'

export const metadata: Metadata = {
  title: `Form a New York Veterinary PLLC | ${APP_CONFIG?.name || 'New York PLLC'}`,
  description: `Veterinary PLLC formation built for New York veterinarians. NYSED pre-approval, practice-specific naming, precise filings, six-week publishing, EIN + bank-ready docs — all for $${PRICING.basePrice}.`,
  keywords: [
    'veterinary PLLC formation New York',
    'New York veterinarian PLLC',
    'start a veterinary practice NY',
    'animal hospital PLLC New York',
    'NYSED State Board for Veterinary Medicine pre-approval',
    'veterinary practice ownership rules NY',
    'DVM PLLC formation',
  ],
  alternates: {
    canonical: `${SEO_CONFIG.siteUrl}/professions/veterinarian`,
  },
}

export default function VeterinarianPage() {
  const PRICE = PRICING.basePrice
  const siteUrl = SEO_CONFIG.siteUrl
  const breadcrumbJson = [
    { name: 'Home', item: siteUrl },
    { name: 'Veterinary PLLC Formation', item: `${siteUrl}/professions/veterinarian` },
  ]

  const VET_FAQ = [
    {
      question: 'Do veterinarians need NYSED pre-approval before filing a PLLC?',
      answer:
        'Yes. New York requires review by NYSED\u2019s Office of the Professions (State Board for Veterinary Medicine) before the Department of State will accept your filing. We assemble a clean pre-approval package \u2014 name, purpose/scope, and professional statements \u2014 so it clears quickly and avoids back-and-forth.',
    },
    {
      question: 'Who may own a New York Veterinary PLLC?',
      answer:
        'Under NY Education Law \u00A7 6706, only licensed veterinarians (DVMs) may own a veterinary PLLC. New York enforces a corporate practice of veterinary medicine (CPVM) ban \u2014 non-veterinarian investors, management companies, and private-equity firms cannot hold ownership interests. Non-DVM management services organizations (MSOs) may provide administrative and operational support under contract, but clinical control and ownership must remain with licensed DVMs.',
    },
    {
      question: 'Can a veterinary PLLC be part of a multi-disciplinary entity?',
      answer:
        'No. Veterinary medicine is one of the professions New York explicitly excludes from multi-disciplinary PLLCs, alongside medicine, dentistry, land surveying, landscape architecture, engineering, and architecture. Your veterinary PLLC must be a standalone entity limited to veterinary practice.',
    },
    {
      question: 'What naming rules apply to a Veterinary PLLC?',
      answer:
        'Your name must include a professional designator (e.g., \u201cPLLC\u201d) and meet strict NYSED standards. Terms like \u201cAnimal Hospital,\u201d \u201cEmergency,\u201d or \u201cSpecialty\u201d should accurately reflect the services you provide and may trigger additional review. We provide compliant name options for general practices, specialty clinics, emergency hospitals, and mobile veterinary services \u2014 and handle NYSED name screening to prevent delays.',
    },
    {
      question: 'Is the six-week newspaper publication included in the price?',
      answer:
        `Yes. We coordinate publication in two newspapers designated by your county clerk, manage proofs and affidavits, and file the Certificate of Publication. All included in the $${PRICE} flat fee \u2014 no surprise add-ons later.`,
    },
    {
      question: 'What will I receive to open a bank account and finance equipment?',
      answer:
        'You receive a bank-ready package: EIN confirmation, filed Articles, publication affidavits, and the Certificate of Publication \u2014 the documents banks and lenders typically request for equipment financing, real estate leases, and vendor onboarding. Whether you\u2019re purchasing diagnostic imaging equipment or signing a commercial lease, your formation package is built for lender review.',
    },
    {
      question: 'How long does the Veterinary PLLC formation process take?',
      answer:
        'The full process \u2014 NYSED pre-approval, Department of State filing, and six consecutive weeks of publication \u2014 typically takes 3.5 to 5 months. We start immediately, keep you informed at each milestone, and move each step forward as quickly as state processes allow.',
    },
    {
      question: 'Can veterinary technicians or non-DVMs be members or managers?',
      answer:
        'No. New York\u2019s CPVM rules require that all members and managers of a veterinary PLLC be licensed DVMs. Veterinary technicians, regulated under NY Education Law Article 135, work under DVM supervision but cannot hold ownership or management authority in the PLLC. For practices that need operational support from non-veterinarians, an MSO structure can provide administrative services under a separate contract.',
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
              name: 'New York Veterinary PLLC Formation Service',
              description:
                'PLLC formation for New York veterinarians including NYSED pre-approval coordination, practice-specific naming, precise filing, required publication, and bank-ready documents.',
              url: '/professions/veterinarian',
              offers: [
                {
                  name: 'Veterinary PLLC Formation Package',
                  description:
                    'Includes NYSED pre-approval packet coordination, six-week publication, Certificate of Publication, and formation documents for your veterinary practice.',
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
          __html: JSON.stringify(generateFAQSchema(VET_FAQ)),
        }}
      />

      <div className="flex flex-col">
        {/* Breadcrumb Navigation */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb
              items={[
                { label: 'Professions' },
                { label: 'Veterinary PLLC', href: '/professions/veterinarian' },
              ]}
            />
          </div>
        </div>

        {/* HERO */}
        <section className="bg-gradient-to-b from-primary/5 via-background to-background py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Form your <span className="text-primary">Veterinary PLLC</span> in New York &mdash; solo practice to multi-location hospital
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Built specifically for veterinarians. We manage{' '}
              <Link href="/faq#nysed-preapproval" className="text-primary underline underline-offset-2">NYSED pre-approval</Link>,
              provide practice-specific naming guidance, file precisely with the Department of State, complete the six-week publication,
              and deliver your bank-ready package &mdash; all for <strong>${PRICE}</strong>.
              No hidden fees. No call centers. New York experts who do this every day.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline">NYSED Pre-Approval</Badge>
              <Badge variant="outline">Practice-Specific Naming</Badge>
              <Badge variant="outline">DVM-Ownership Compliant</Badge>
              <Badge variant="outline">Legal Publishing Included</Badge>
              <Badge variant="outline">EIN + Bank-Ready Docs</Badge>
            </div>

            <div className="mt-10 flex justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/order">
                  Start your Veterinary PLLC &mdash; ${PRICE}
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
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Built around the realities of veterinary practice ownership</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Launching a practice isn&apos;t just paperwork &mdash; it&apos;s financing diagnostic equipment, negotiating a commercial lease,
                hiring technicians, credentialing with pet insurers, and navigating New York&apos;s strict DVM-only ownership rules. We form
                Veterinary PLLCs that pass NYSED scrutiny and support growth &mdash; first clinic to multi-location hospital group.
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
                  We prepare a clean NYSED pre-approval package &mdash; name, scope, and professional statements aligned to your practice (general, emergency, specialty, mobile, and more).
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" /> Practice-Specific Naming Guidance
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Avoid NYSED name objections and rework. We help you choose a compliant name &mdash; whether you&apos;re opening a general practice, specialty referral center, emergency hospital, or mobile veterinary service &mdash; that reflects your brand and clears review.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck2 className="h-5 w-5 text-primary" /> Precise, Veterinarian-Specific Filings
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Articles crafted for veterinary practice requirements and filed properly with NYSED and the Department of State &mdash; with plain-English updates at each milestone.
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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to open and grow your veterinary practice</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A complete, bank-ready formation package designed for lenders, landlords, and credentialing teams.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Heart className="h-5 w-5 text-primary" /> Complete Formation</CardTitle>
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
                  Veterinarian-specific Operating Agreement for solo owners or multi-DVM hospital groups &mdash; ready for partner onboarding and lender review.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Bank-Ready Package</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  EIN confirmation, filed Articles, publication affidavits, and Certificate of Publication &mdash; what banks and lenders typically require for equipment financing, real estate, and vendor onboarding.
                </CardContent>
              </Card>
            </div>

            <div className="mt-10">
              <Button size="lg" asChild>
                <Link href="/order">Start your Veterinary PLLC &mdash; ${PRICE}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* PROFESSION-SPECIFIC FAQ */}
        <section className="py-20 lg:py-28 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Veterinary PLLC FAQs</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Clear, veterinarian-specific answers for forming a Professional Limited Liability Company in New York.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {VET_FAQ.map((item) => (
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
                <Link href="/order">Start your Veterinary PLLC &mdash; ${PRICE}</Link>
              </Button>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">This information is general and not legal advice.</p>
          </div>
        </section>

        {/* TRUST & CTA */}
        <section className="bg-muted/40 py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">We&apos;re here for New York veterinarians</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From NYSED pre-approval through publication and bank-ready documents, our team understands how veterinarians launch and scale
              practices &mdash; solo clinics, emergency hospitals, specialty referral centers, and multi-location hospital groups.
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
