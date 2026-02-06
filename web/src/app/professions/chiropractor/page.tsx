import Link from 'next/link'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { ScrollTracking } from '@/components/analytics/scroll-tracking'
import { Shield, ClipboardList, FileCheck2, Newspaper, Bone, Users, CheckCircle, ArrowRight } from 'lucide-react'
import { PRICING, APP_CONFIG } from '@/lib/constants'
import { generateBreadcrumbSchema, generateFAQSchema, generateProfessionServiceSchema } from '@/lib/seo/structured-data'

export const metadata: Metadata = {
  title: `Form a New York Chiropractic PLLC (DC PLLC) | ${APP_CONFIG?.name || 'New York PLLC'}`,
  description: `Chiropractic PLLC formation for New York DCs. NYSED State Board for Chiropractic pre-approval, compliant naming, precise filings, six-week publication, telehealth/ergonomics-aware purpose language, EIN + bank-ready docs — flat $${PRICING.basePrice}.`,
  keywords: [
    'Chiropractic PLLC New York',
    'DC PLLC NY',
    'New York chiropractor PLLC',
    'chiropractic practice formation NY',
    'sports chiropractic PLLC',
    'prenatal chiropractic PLLC',
    'rehab exercise therapy NY chiropractor',
    'corporate wellness chiropractor NY',
    'NYSED State Board for Chiropractic pre-approval',
    'NY Certificate of Publication PLLC'
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.nypllc.com'}/professions/chiropractor`,
  },
}

export default function ChiropractorPage() {
  const PRICE = PRICING.basePrice
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.nypllc.com'
  const breadcrumbJson = [
    { name: 'Home', item: siteUrl },
    { name: 'Chiropractic PLLC Formation', item: `${siteUrl}/professions/chiropractor` },
  ]

  const DC_FAQ = [
    {
      question: 'Do chiropractors need NYSED pre-approval before forming a PLLC?',
      answer:
        'Yes. Chiropractic entities are reviewed by NYSED’s Office of the Professions (State Board for Chiropractic) before the Department of State accepts formation. We assemble a profession-specific pre-approval package — proposed name, purpose/scope, ownership — to reduce objections and delays.',
    },
    {
      question: 'Who may own or manage a Chiropractic PLLC in New York?',
      answer:
        'Ownership and professional control are generally limited to appropriately licensed professionals who can lawfully provide the PLLC’s services. For chiropractic practices, that typically means licensed chiropractors (DCs). We help structure members/managers to align with New York rules.',
    },
    {
      question: 'What naming rules commonly affect chiropractic approvals?',
      answer:
        'Names must be professional, include the required designator (e.g., “PLLC”), and avoid restricted or misleading terms (such as “hospital,” “clinic,” or claims outside chiropractic scope) without additional approvals. ',
    },
    {
      question: 'Can I provide telehealth or ergonomics consults under my PLLC?',
      answer:
        'Some chiropractors offer patient education or ergonomics/posture consultations via telehealth. Formation itself does not change licensure boundaries or payer policies — you must follow NY practice standards and platform/payer rules. We use purpose language appropriate for in-person care with optional patient education delivered virtually within New York.',
    },
    {
      question: 'Is the six-week, two-newspaper publication included?',
      answer:
        `Yes. We coordinate county-assigned publication in two newspapers, manage proofs and affidavits, and file the Certificate of Publication — fully included in the $${PRICE} flat fee.`,
    },
    {
      question: 'What documents will I receive for banking, credentialing, and leasing?',
      answer:
        'You receive your EIN confirmation, filed Articles of Organization, publication affidavits, and the Certificate of Publication — the bank-ready set commonly requested by banks, payers/credentialing teams, and landlords.',
    },
    {
      question: 'Can a Chiropractic PLLC operate multiple locations or add providers?',
      answer:
        'Often yes. Many practices expand to additional locations or add clinicians (e.g., other DCs). We structure formation to support growth and explain county publication implications if you open offices in other counties later.',
    },
    {
      question: 'How long does a Chiropractic PLLC typically take?',
      answer:
        'Timelines vary. NYSED pre-approval can add weeks or months depending on review volume; publication then requires six consecutive weeks. We begin quickly, set realistic expectations, and keep you updated at each milestone.',
    },
  ]

  // Inline link to naming guidance
  DC_FAQ[2].answer += ' See <a href="/faq#naming-conventions">naming conventions</a> for common pitfalls.'

  return (
    <>
      <ScrollTracking />
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbJson)) }}
      />
      {/* Service Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateProfessionServiceSchema({
              name: 'New York Chiropractic PLLC Formation Service',
              description:
                'PLLC formation for New York chiropractors including NYSED pre-approval coordination, compliant naming, precise filing, required publication, and bank-ready documents.',
              url: '/professions/chiropractor',
              offers: [
                {
                  name: 'Chiropractic PLLC Formation Package',
                  description:
                    'Includes NYSED pre-approval packet coordination, six-week publication, Certificate of Publication, and formation documents for your chiropractic practice.',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(DC_FAQ)) }}
      />
      <div className="flex flex-col">
        {/* Breadcrumb Navigation */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb
              items={[
                { label: 'Professions' },
                { label: 'Chiropractic PLLC', href: '/professions/chiropractor' },
              ]}
            />
          </div>
        </div>

        {/* HERO */}
        <section className="bg-gradient-to-b from-primary/5 via-background to-background py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Form your <span className="text-primary">Chiropractic PLLC</span> in New York — compliant, growth-ready, patient-focused
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Built for New York DCs across sports, family, prenatal/postnatal, rehab, and wellness care. We manage{' '}
              <Link href="/faq#nysed-preapproval" className="text-primary underline underline-offset-2">NYSED pre-approval</Link>, craft scope-appropriate purpose language,
              guide compliant naming, file precisely with the Department of State, complete the six-week publication, and deliver a bank-ready package —
              all for <strong>${PRICE}</strong>. No hidden fees.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline">State Board for Chiropractic</Badge>
              <Badge variant="outline">Scope-Appropriate Purpose</Badge>
              <Badge variant="outline">Naming Guidance</Badge>
              <Badge variant="outline">Publishing Included</Badge>
              <Badge variant="outline">EIN + Bank-Ready Docs</Badge>
            </div>

            <div className="mt-10 flex justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/order">
                  Start your Chiropractic PLLC — ${PRICE}
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

        {/* WHY IT’S SPECIFIC FOR DCs */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Purpose-built for New York chiropractors</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                DC entities face extra scrutiny — State Board pre-approval, strict naming standards, county publication, and a documentation set banks,
                payers, and landlords expect. We form PLLCs that reflect chiropractic scope, support rehab/exercise programs, and scale as you add clinicians or locations.
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
                  We package your submission for the State Board for Chiropractic — purpose language that aligns with chiropractic practice and governance that reflects professional control.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" /> Naming That Passes Review
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Avoid restricted or misleading terms (e.g., “hospital,” “clinic,” “center,” or medical claims). We propose compliant, brand-forward options that clear NYSED faster. See{' '}
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
                  Articles tailored to chiropractic services — in-office care with optional virtual education — filed correctly with NYSED and the Department of State, with milestone updates throughout.
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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to open and grow your chiropractic practice</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A complete, bank-ready formation package designed for lenders, payers, landlords, and vendors.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Bone className="h-5 w-5 text-primary" /> Formation</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  NYSED pre-approval support, Articles of Organization, scope-appropriate purpose language, and state filing — end-to-end.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Operating Agreement</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  A chiropractor-focused Operating Agreement for solo or group practices — ready for lender and payer review.
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
                <Link href="/order">Start your Chiropractic PLLC — ${PRICE}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* PROFESSION-SPECIFIC FAQ */}
        <section className="py-20 lg:py-28 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Chiropractic PLLC FAQs</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Practical answers for New York DCs — ownership, naming, telehealth/education, publishing, multi-site growth, and timelines.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {DC_FAQ.map((item) => (
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
                <Link href="/order">Start your Chiropractic PLLC — ${PRICE}</Link>
              </Button>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">This page provides general information and is not legal advice.</p>
          </div>
        </section>

        {/* TRUST & CTA */}
        <section className="bg-muted/40 py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">We help New York chiropractors go independent — confidently</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From State Board pre-approval through publication and a bank-ready document set, our process is built for modern chiropractic — in-office care with optional virtual education within NY.
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
