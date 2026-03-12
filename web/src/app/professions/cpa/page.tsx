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
  Calculator,
  Users,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'
import { PRICING, APP_CONFIG } from '@/lib/constants'
import { SEO_CONFIG } from '@/lib/seo/config'
import { generateBreadcrumbSchema, generateFAQSchema, generateProfessionServiceSchema } from '@/lib/seo/structured-data'

export const metadata: Metadata = {
  title: `Form a New York CPA PLLC | ${APP_CONFIG?.name || 'New York PLLC'}`,
  description: `CPA PLLC formation built for New York accountants. NYSED pre-approval, compliant naming, precise filings, six-week publishing, EIN + bank-ready docs — all for $${PRICING.basePrice}.`,
  keywords: [
    'CPA PLLC formation New York',
    'New York accounting firm PLLC',
    'certified public accountant PLLC NY',
    'start an accounting firm New York',
    'public accountancy PLLC formation',
    'NYSED State Board for Public Accountancy pre-approval',
    'CPA firm registration New York',
    'non-CPA ownership PLLC NY',
  ],
  alternates: {
    canonical: `${SEO_CONFIG.siteUrl}/professions/cpa`,
  },
}

export default function CPAPage() {
  const PRICE = PRICING.basePrice
  const siteUrl = SEO_CONFIG.siteUrl
  const breadcrumbJson = [
    { name: 'Home', item: siteUrl },
    { name: 'CPA PLLC Formation', item: `${siteUrl}/professions/cpa` },
  ]

  const CPA_FAQ = [
    {
      question: 'Do CPA firms need NYSED pre-approval before filing a PLLC?',
      answer:
        'Yes. New York requires review by NYSED\u2019s Office of the Professions (State Board for Public Accountancy) before the Department of State will accept your filing. We assemble a clean pre-approval package \u2014 name, scope, and professional statements \u2014 so it clears quickly and avoids back-and-forth.',
    },
    {
      question: 'Who may own a New York CPA PLLC?',
      answer:
        'Licensed CPAs must hold a simple majority of both ownership interest and voting rights. Since June 2024, New York allows non-CPA minority owners \u2014 but they must be actively working in the firm (no passive investors), and the president, board chair, and CEO must all be licensed CPAs. We help structure ownership to comply with these rules.',
    },
    {
      question: 'What is the CPA firm registration requirement?',
      answer:
        'After your PLLC is formed, you must separately register with NYSED\u2019s Professional Corporations Unit using Form 6R. This is required for any firm that uses \u201cCPA\u201d in its name, provides attest services, or offers public accountancy services to New York clients. This registration is handled directly with NYSED and is separate from the PLLC formation process.',
    },
    {
      question: 'Can I use "CPA" or "Certified Public Accountant" in my firm name?',
      answer:
        'Yes, but only if all owners are licensed CPAs. If your firm adds non-licensee owners, the \u201cCPA\u201d or \u201cCertified Public Accountant\u201d designation must be removed from the name. We help you choose a compliant name that clears NYSED review and reflects your brand.',
    },
    {
      question: 'Is the six-week newspaper publication included in the price?',
      answer:
        `Yes. We coordinate publication in two newspapers designated by your county clerk, manage proofs and affidavits, and file the Certificate of Publication. All included in the $${PRICE} flat fee \u2014 no surprise add-ons later.`,
    },
    {
      question: 'What ongoing compliance does a CPA PLLC require?',
      answer:
        'CPA firms must file annual updates (Form 6PR) and renew their firm registration every three years (Form 6T) with NYSED. We make sure your PLLC formation documents are structured to support smooth renewals down the road.',
    },
    {
      question: 'What will I receive to open a bank account and sign a lease?',
      answer:
        'You receive a bank-ready package: EIN confirmation, filed Articles, publication affidavits, and the Certificate of Publication \u2014 the documents banks and landlords typically request for office leases and credit applications.',
    },
    {
      question: 'How long does the CPA PLLC formation process take?',
      answer:
        'Timelines vary with NYSED review volume and the mandatory six consecutive weeks of publication. We start immediately, keep you informed at each milestone, and move each step forward as quickly as state processes allow.',
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
              name: 'New York CPA PLLC Formation Service',
              description:
                'PLLC formation for New York certified public accountants including NYSED pre-approval coordination, compliant naming, precise filing, required publication, and bank-ready documents.',
              url: '/professions/cpa',
              offers: [
                {
                  name: 'CPA PLLC Formation Package',
                  description:
                    'Includes NYSED pre-approval packet coordination, six-week publication, Certificate of Publication, and formation documents for your accounting firm.',
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
          __html: JSON.stringify(generateFAQSchema(CPA_FAQ)),
        }}
      />

      <div className="flex flex-col">
        {/* Breadcrumb Navigation */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb
              items={[
                { label: 'Professions' },
                { label: 'CPA PLLC', href: '/professions/cpa' },
              ]}
            />
          </div>
        </div>

        {/* HERO */}
        <section className="bg-gradient-to-b from-primary/5 via-background to-background py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Form your <span className="text-primary">CPA PLLC</span> in New York &mdash; solo practitioner to multi-partner firm
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Built specifically for certified public accountants. We manage{' '}
              <Link href="/faq#nysed-preapproval" className="text-primary underline underline-offset-2">NYSED pre-approval</Link>,
              guide compliant naming, file precisely with the Department of State, complete the six-week publication, and deliver your
              bank-ready package &mdash; all for <strong>${PRICE}</strong>.
              No hidden fees. No call centers. New York experts who do this every day.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline">NYSED Pre-Approval</Badge>
              <Badge variant="outline">Compliant Naming</Badge>
              <Badge variant="outline">Non-CPA Ownership Compliant</Badge>
              <Badge variant="outline">Legal Publishing Included</Badge>
              <Badge variant="outline">EIN + Bank-Ready Docs</Badge>
            </div>

            <div className="mt-10 flex justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/order">
                  Start your CPA PLLC &mdash; ${PRICE}
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
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Built around the realities of launching an accounting practice</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Starting a CPA firm means more than a business card &mdash; it&apos;s securing office space, onboarding clients, and meeting
                peer-review timelines. We handle the PLLC formation so you can focus on building your book of business.
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
                  We prepare a clean NYSED pre-approval package &mdash; name, scope, ownership structure, and professional statements aligned to your practice areas (audit, tax, advisory, and more).
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" /> Naming &amp; Ownership Guidance
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Navigate New York&apos;s strict rules around using &ldquo;CPA&rdquo; in your firm name and the 2024 non-CPA ownership law. We help you pick a compliant name and structure ownership to pass NYSED review the first time.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck2 className="h-5 w-5 text-primary" /> Precise, CPA-Specific Filings
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Articles crafted for accounting firm requirements and filed properly with NYSED and the Department of State &mdash; with plain-English updates at each milestone.
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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to open and grow your accounting firm</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A complete, bank-ready formation package designed for lenders, landlords, and peer-review boards.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Calculator className="h-5 w-5 text-primary" /> Complete Formation</CardTitle>
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
                  CPA-specific Operating Agreement for solo practitioners or multi-partner firms &mdash; ready for partner onboarding, bank review, and peer-review requirements.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Bank-Ready Package</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  EIN confirmation, filed Articles, publication affidavits, and Certificate of Publication &mdash; what banks and landlords typically require to move forward.
                </CardContent>
              </Card>
            </div>

            <div className="mt-10">
              <Button size="lg" asChild>
                <Link href="/order">Start your CPA PLLC &mdash; ${PRICE}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* PROFESSION-SPECIFIC FAQ */}
        <section className="py-20 lg:py-28 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">CPA PLLC FAQs</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Clear, accountant-specific answers for forming a Professional Limited Liability Company in New York.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {CPA_FAQ.map((item) => (
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
                <Link href="/order">Start your CPA PLLC &mdash; ${PRICE}</Link>
              </Button>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">This information is general and not legal advice.</p>
          </div>
        </section>

        {/* TRUST & CTA */}
        <section className="bg-muted/40 py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">We&apos;re here for New York CPAs</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From NYSED pre-approval through publication and bank-ready documents, our team understands how accountants
              launch and scale practices &mdash; solo tax shops, advisory firms, multi-partner attest practices, and firms with non-CPA owners.
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
