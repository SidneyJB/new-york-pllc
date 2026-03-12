import Link from 'next/link'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { ScrollTracking } from '@/components/analytics/scroll-tracking'
import { Shield, ClipboardList, FileCheck2, Newspaper, Eye, Users, CheckCircle, ArrowRight } from 'lucide-react'
import { PRICING, APP_CONFIG } from '@/lib/constants'
import { SEO_CONFIG } from '@/lib/seo/config'
import { generateBreadcrumbSchema, generateFAQSchema, generateProfessionServiceSchema } from '@/lib/seo/structured-data'

export const metadata: Metadata = {
  title: `Form a New York Optometry PLLC | ${APP_CONFIG?.name || 'New York PLLC'}`,
  description: `Optometry PLLC formation built for New York optometrists. NYSED pre-approval, practice-specific naming, precise filings, six-week publishing, EIN + bank-ready docs — all for $${PRICING.basePrice}.`,
  keywords: [
    'optometry PLLC formation New York',
    'New York optometrist PLLC',
    'start an optometry practice NY',
    'eye care PLLC New York',
    'NYSED State Board for Optometry pre-approval',
    'optometrist private practice formation',
  ],
  alternates: {
    canonical: `${SEO_CONFIG.siteUrl}/professions/optometrist`,
  },
}

export default function OptometristPage() {
  const PRICE = PRICING.basePrice
  const siteUrl = SEO_CONFIG.siteUrl
  const breadcrumbJson = [
    { name: 'Home', item: siteUrl },
    { name: 'Optometry PLLC Formation', item: `${siteUrl}/professions/optometrist` },
  ]

  const OPTOMETRIST_FAQ = [
    {
      question: 'Do optometrists need NYSED pre-approval before filing a PLLC?',
      answer:
        'Yes. New York requires review by NYSED\u2019s Office of the Professions (State Board for Optometry) before the Department of State will accept your filing. We assemble a clean pre-approval package \u2014 name, purpose/scope, and professional statements \u2014 so it clears quickly and avoids back-and-forth.',
    },
    {
      question: 'Who may own a New York Optometry PLLC?',
      answer:
        'Ownership is generally limited to appropriately licensed professionals authorized to provide the PLLC\u2019s services. For an Optometry PLLC, that typically means licensed optometrists. Unlike some professions, optometry is not on New York\u2019s exclusion list for multi-disciplinary PLLCs, so there may be additional structuring options depending on your practice model. We help you set up a compliant ownership structure.',
    },
    {
      question: 'What naming rules apply to an Optometry PLLC?',
      answer:
        'Your name must include the professional designator (e.g., \u201cPLLC\u201d) and meet strict NYSED standards. If your proposed name includes initials, foreign words, surnames, abbreviations, or uncommon words, you must submit a written explanation of how they relate to the practice of optometry. We provide compliant name options and handle NYSED name screening to prevent delays.',
    },
    {
      question: 'Can my Optometry PLLC include optical dispensing services?',
      answer:
        'Yes. Licensed optometrists can dispense eyeglasses and contact lenses through their PLLC. Contact lens fitting must occur under the supervision of an optometrist or physician. We draft your Articles with purpose language that covers both clinical optometry and optical dispensing so your entity supports the full scope of your practice.',
    },
    {
      question: 'Is the six-week newspaper publication included in the price?',
      answer:
        `Yes. We coordinate publication in two newspapers designated by your county clerk, manage proofs/affidavits, and file the Certificate of Publication. All included in the $${PRICE} flat fee \u2014 no surprise add-ons later.`,
    },
    {
      question: 'What will I receive to open a bank account and secure financing?',
      answer:
        'You receive a bank-ready package: EIN confirmation, filed Articles, publication affidavits, and the Certificate of Publication \u2014 the documents banks, equipment lenders, and insurance credentialing teams typically request when you\u2019re opening or acquiring an optometry practice.',
    },
    {
      question: 'How long does the Optometry PLLC process take?',
      answer:
        'Timelines vary with NYSED review and the mandatory six consecutive weeks of publication. We start immediately, keep you informed at each milestone, and move each step forward as quickly as state processes allow.',
    },
    {
      question: 'Can my Optometry PLLC operate multiple locations?',
      answer:
        'Often yes. Many practices open additional locations \u2014 satellite offices, vision therapy centers, or pediatric optometry clinics \u2014 under the same PLLC with county-by-county publication and proper state filings as required. We set up your initial formation to support growth and guide you on how to add locations later.',
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
      {/* Service Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateProfessionServiceSchema({
              name: 'New York Optometry PLLC Formation Service',
              description:
                'PLLC formation for New York optometrists including NYSED pre-approval coordination, compliant naming, precise filing, required publication, and bank-ready documents.',
              url: '/professions/optometrist',
              offers: [
                {
                  name: 'Optometry PLLC Formation Package',
                  description:
                    'Includes NYSED pre-approval packet coordination, six-week publication, Certificate of Publication, and formation documents for your optometry practice.',
                  price: `${PRICE}.00`,
                  priceCurrency: 'USD',
                  availability: 'https://schema.org/InStock',
                },
              ],
            })
          ),
        }}
      />
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(OPTOMETRIST_FAQ)),
        }}
      />
      <div className="flex flex-col">
        {/* Breadcrumb Navigation */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb
              items={[
                { label: 'Professions' },
                { label: 'Optometry PLLC', href: '/professions/optometrist' },
              ]}
            />
          </div>
        </div>

        {/* HERO */}
        <section className="bg-gradient-to-b from-primary/5 via-background to-background py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Form your <span className="text-primary">Optometry PLLC</span> in New York &mdash; built for eye care professionals
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Built specifically for optometrists. We manage{' '}
              <Link href="/faq#nysed-preapproval" className="text-primary underline underline-offset-2">NYSED pre-approval</Link>,
              provide practice-specific naming guidance, file precisely with the Department of State, complete the six-week publication,
              and deliver your bank-ready package &mdash; all for <strong>${PRICE}</strong>. No hidden fees. No call centers. New York experts who do this every day.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline">NYSED Pre-Approval</Badge>
              <Badge variant="outline">Practice-Specific Naming</Badge>
              <Badge variant="outline">Optical Dispensing Covered</Badge>
              <Badge variant="outline">Legal Publishing Included</Badge>
              <Badge variant="outline">EIN + Bank-Ready Docs</Badge>
            </div>

            <div className="mt-10 flex justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/order">
                  Start your Optometry PLLC &mdash; ${PRICE}
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
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Built around the realities of optometry practice ownership</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Opening an optometry practice isn&apos;t just paperwork &mdash; it&apos;s securing equipment financing, negotiating an office lease, credentialing with vision
                and medical insurance panels, and meeting HIPAA requirements from day one. We form Optometry PLLCs that pass NYSED scrutiny and support growth &mdash; private office to multi-location.
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
                  We prepare a clean NYSED pre-approval package &mdash; name, scope, and professional statements aligned to your practice type (private optometry, vision therapy, pediatric, contact lens specialty, and more).
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" /> Practice-Specific Naming Guidance
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Avoid NYSED name objections and rework. If your name uses initials, foreign words, surnames, or abbreviations, NYSED requires an explanation of how they relate to optometry. We provide compliant name options and handle screening to prevent delays.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck2 className="h-5 w-5 text-primary" /> Precise, Optometrist-Specific Filings
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Articles crafted for optometry practice requirements &mdash; including purpose language that covers clinical care and optical dispensing &mdash; filed properly with NYSED and the Department of State, with plain-English updates at each milestone.
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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to open and grow your optometry practice</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A complete, bank-ready formation package designed for equipment lenders, landlords, and insurance credentialing teams.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Eye className="h-5 w-5 text-primary" /> Complete Formation</CardTitle>
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
                  Optometrist-specific Operating Agreement for solo owners or group practices &mdash; ready for partner onboarding and lender review.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Bank-Ready Package</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  EIN confirmation, filed Articles, publication affidavits, and Certificate of Publication &mdash; what banks, equipment lenders, and insurance credentialing teams typically require to move forward.
                </CardContent>
              </Card>
            </div>

            <div className="mt-10">
              <Button size="lg" asChild>
                <Link href="/order">Start your Optometry PLLC &mdash; ${PRICE}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* PROFESSION-SPECIFIC FAQ */}
        <section className="py-20 lg:py-28 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Optometry PLLC FAQs</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Clear, optometrist-specific answers for forming a Professional Limited Liability Company in New York.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {OPTOMETRIST_FAQ.map((item) => (
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
                <Link href="/order">Start your Optometry PLLC &mdash; ${PRICE}</Link>
              </Button>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">This information is general and not legal advice.</p>
          </div>
        </section>

        {/* TRUST & CTA */}
        <section className="bg-muted/40 py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">We&apos;re here for New York optometrists</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From NYSED pre-approval through publication and bank-ready documents, our team understands how optometrists launch and scale practices &mdash; solo offices, practice acquisitions, vision therapy centers, and multi-location expansion.
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
