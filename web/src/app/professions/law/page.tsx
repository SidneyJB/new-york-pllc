import Link from 'next/link'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { ScrollTracking } from '@/components/analytics/scroll-tracking'
import { Shield, ClipboardList, FileCheck2, Newspaper, Users, CheckCircle, ArrowRight } from 'lucide-react'
import { PRICING, APP_CONFIG } from '@/lib/constants'
import { SEO_CONFIG } from '@/lib/seo/config'
import { generateBreadcrumbSchema, generateFAQSchema, generateProfessionServiceSchema } from '@/lib/seo/structured-data'

export const metadata: Metadata = {
  title: `Form a New York Law Firm PLLC | ${APP_CONFIG?.name || 'New York PLLC'}`,
  description: `Attorney PLLC formation in NY. No NYSED pre-approval — we coordinate Appellate Division Certificates of Good Standing, Rule 7.5-compliant naming, precise filings, six-week publishing, EIN + bank-ready docs — flat $${PRICING.basePrice}.`,
  keywords: [
    'New York law firm PLLC',
    'attorney PLLC formation NY',
    'NY law firm LLP vs PLLC',
    'law firm trade name Rule 7.5',
    'certificate of good standing Appellate Division',
    'New York attorney business formation'
  ],
  alternates: {
    canonical: `${SEO_CONFIG.siteUrl}/professions/law`,
  },
}

export default function LawFirmPage() {
  const PRICE = PRICING.basePrice
  const siteUrl = SEO_CONFIG.siteUrl
  const breadcrumbJson = [
    { name: 'Home', item: siteUrl },
    { name: 'Law Firm PLLC Formation', item: `${siteUrl}/professions/law` },
  ]

  const LAW_FAQ = [
    {
      question: 'Do New York attorneys need NYSED pre-approval to form a PLLC?',
      answer:
        'No. Law practices are not reviewed by NYSED. Instead, each attorney owner typically provides a Certificate of Good Standing from the Appellate Division, and we include those with your filing package. We assemble the required attorney credentials so your submission is accepted without back-and-forth.',
    },
    {
      question: 'PLLC vs LLP vs PC — which entity makes sense for a NY law firm?',
      answer:
        'All three are common in New York. PLLC: allows solo or multi-member practices with limited liability and is eligible for the LLC publication requirement. LLP: partnership model (two or more partners) with limited liability for partners and also subject to the LLC publication framework. PC: corporate form for professionals; some firms prefer it for stock structure or tax planning. We’ll outline tradeoffs based on ownership and growth plans.',
    },
    {
      question: 'Can nonlawyers own part of my firm?',
      answer:
        'No. New York prohibits nonlawyer ownership of law firms and fee-sharing with nonlawyers. Our documents and ownership statements reflect attorney-only ownership and management to comply with ethics rules.',
    },
    {
      question: 'What are New York’s law firm naming rules?',
      answer:
        'New York permits trade names if not false, deceptive, or misleading. We review your proposed name for ethics compliance, required professional designators (e.g., “PLLC”), and DOS distinguishability, and we prepare alternatives that clear both ethics and filing standards.',
    },
    {
      question: 'Is the six-week, two-newspaper publication included?',
      answer:
        'Yes. Publication is required for PLLCs and LLPs. We coordinate county-designated newspapers, manage proofs and affidavits, and file your Certificate of Publication. It’s included in the $' + PRICE + ' flat price.',
    },
    {
      question: 'What do I receive to open banking (incl. IOLA/IOLTA operating logistics)?',
      answer:
        'You receive your EIN confirmation, filed Articles, publication affidavits, and the Certificate of Publication — a standard bank-ready packet. We also provide a simple checklist for opening your operating and client trust accounts with your bank’s IOLA program, if applicable.',
    },
    {
      question: 'How long does a law firm PLLC take in New York?',
      answer:
        'Certificates of Good Standing are usually fast to request online. After formation, the publication runs for six consecutive weeks. We begin immediately, set realistic expectations, and keep you updated at each milestone.',
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
              name: 'New York Law Firm PLLC Formation Service',
              description:
                'PLLC formation for New York attorneys including credential coordination, compliant naming, precise filing, required publication, and bank-ready documents.',
              url: '/professions/law',
              offers: [
                {
                  name: 'Law Firm PLLC Formation Package',
                  description:
                    'Includes filing coordination, six-week publication, Certificate of Publication, EIN guidance, and bank-ready formation documents.',
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
          __html: JSON.stringify(generateFAQSchema(LAW_FAQ)),
        }}
      />

      <div className="flex flex-col">
        {/* Breadcrumb Navigation */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb
              items={[
                { label: 'Professions' },
                { label: 'Law Firm PLLC', href: '/professions/law' },
              ]}
            />
          </div>
        </div>

        {/* HERO */}
        <section className="bg-gradient-to-b from-primary/5 via-background to-background py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Form your <span className="text-primary">Law Firm PLLC</span> in New York — compliant from day one
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Built for New York attorneys. We coordinate Appellate Division Certificates of Good Standing,
              review Rule&nbsp;7.5-compliant trade names, prepare precise filings, manage the six-week publication,
              obtain your EIN, and deliver a bank-ready packet — all for <strong>${PRICE}</strong>.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline">Certificates of Good Standing</Badge>
              <Badge variant="outline">Rule 7.5 Name Compliance</Badge>
              <Badge variant="outline">Accurate Formation Filing</Badge>
              <Badge variant="outline">Publishing Included</Badge>
              <Badge variant="outline">EIN + Operating Agreement</Badge>
            </div>

            <div className="mt-10 flex justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/order">
                  Start your Law Firm PLLC — ${PRICE}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Talk to us first</Link>
              </Button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Attorneys only • Secure checkout • No upsells
            </p>
          </div>
        </section>

        {/* WHY IT’S DIFFERENT FOR LAW PRACTICES */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Purpose-built for New York law firms</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Law practices aren’t reviewed by NYSED, have ethics-based naming rules, and still must complete
                New York’s publication requirement for PLLCs/LLPs. Our workflow handles the lawyer-specific steps
                and keeps your formation clean, compliant, and predictable.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" /> Good-Standing + Eligibility Package
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  We guide you through requesting Appellate Division Certificates of Good Standing, compile ownership
                  attestations, and assemble a bar-compliant entity packet so your filing clears the first time.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" /> Rule-Compliant Naming (Trade Names Allowed)
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  We screen proposed names against Rule&nbsp;7.5, DOS distinguishability, and restricted terms, and
                  supply alternates. If you prefer a brand/trade name, we ensure it isn’t misleading and fits ethics guidance.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck2 className="h-5 w-5 text-primary" /> Precise Filing & Ownership Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  We prepare Articles with accurate purpose language and attorney-only ownership. Plain-English updates
                  at each milestone reduce questions and avoid avoidable delays.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Newspaper className="h-5 w-5 text-primary" /> Six-Week Publication — Included
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  We coordinate county-designated newspapers, monitor six consecutive weeks, collect affidavits,
                  and file the Certificate of Publication — fully included in the ${PRICE}.
                </CardContent>
              </Card>
            </div>

            {/* ENTITY CHOOSER */}
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">PLLC</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Works for solos or groups; attorney-only ownership; subject to publication; flexible governance;
                  widely used by boutique firms and solos.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">LLP</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Partnership (2+ partners); limits partner liability for others’ acts; subject to publication;
                  familiar structure for larger partnerships.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">PC</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Corporate form for professionals; different tax/equity mechanics; no LLC publication;
                  preferred by some multi-office firms. We can discuss tradeoffs.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* WHAT YOU RECEIVE */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to open your firm</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We deliver a complete, bank-ready package and practical next steps for client trust accounting setup.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" /> Complete Formation
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Certificates of Good Standing, Articles, filing receipts, and naming compliance — prepared and tracked for you.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" /> Operating Agreement / Partnership Docs
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Attorney-focused Operating Agreement (PLLC) or partnership documentation (LLP) tailored to solos or multi-member firms.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" /> Bank-Ready Packet
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  EIN confirmation, state filings, publication affidavits, Certificate of Publication, and a banking checklist (incl. IOLA setup guidance).
                </CardContent>
              </Card>
            </div>

            <div className="mt-10">
              <Button size="lg" asChild>
                <Link href="/order">Start your Law Firm PLLC — ${PRICE}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* PROFESSION-SPECIFIC FAQ */}
        <section className="py-20 lg:py-28 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Law Firm PLLC FAQs</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Practical answers for New York attorneys forming a PLLC — on eligibility, naming, publication, and banking.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {LAW_FAQ.map((item) => (
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
                <Link href="/order">Start your Law Firm PLLC — ${PRICE}</Link>
              </Button>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">General information only — not legal advice.</p>
          </div>
        </section>

        {/* TRUST & CTA */}
        <section className="bg-muted/40 py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">We help New York lawyers launch — the compliant way</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A New York-based team that understands the nuances of attorney formation — ethics-compliant naming,
              attorney-only ownership, and publication — with clear communication from start to finish.
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