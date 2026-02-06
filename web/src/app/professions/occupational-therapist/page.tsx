import Link from 'next/link'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { ScrollTracking } from '@/components/analytics/scroll-tracking'
import { Shield, ClipboardList, FileCheck2, Newspaper, Activity, Users, CheckCircle, ArrowRight, Heart } from 'lucide-react'
import { PRICING, APP_CONFIG } from '@/lib/constants'
import { generateBreadcrumbSchema, generateFAQSchema, generateProfessionServiceSchema } from '@/lib/seo/structured-data'

export const metadata: Metadata = {
  title: `Form a New York Occupational Therapy PLLC (OT PLLC) | ${APP_CONFIG?.name || 'New York PLLC'}`,
  description: `Occupational Therapy PLLC formation for New York OTs. NYSED State Board for Occupational Therapy pre-approval, OTA supervision-aware governance, telepractice/home-based friendly purpose language, compliant naming, precise filings, six-week publication, EIN + bank-ready docs — flat $${PRICING.basePrice}.`,
  keywords: [
    'Occupational Therapy PLLC New York',
    'OT PLLC NY',
    'New York occupational therapist PLLC',
    'COTA supervision NY',
    'pediatric OT private practice',
    'hand therapy PLLC NY',
    'sensory integration clinic NY',
    'home modifications occupational therapy',
    'assistive technology OT NY',
    'school contract occupational therapy NY',
    'NYSED State Board for Occupational Therapy pre-approval',
    'NY Certificate of Publication PLLC'
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.nypllc.com'}/professions/occupational-therapist`,
  },
}

export default function OTPage() {
  const PRICE = PRICING.basePrice
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.nypllc.com'
  const breadcrumbJson = [
    { name: 'Home', item: siteUrl },
    { name: 'Occupational Therapy PLLC Formation', item: `${siteUrl}/professions/occupational-therapist` },
  ]

  const OT_FAQ = [
    {
      question: 'Do Occupational Therapists need NYSED pre-approval before forming a PLLC?',
      answer:
        'Yes. OT entities are reviewed by NYSED’s Office of the Professions (State Board for Occupational Therapy) before the Department of State accepts formation. We package your pre-approval — proposed name, scope/purpose, and ownership — to minimize objections and delays.',
    },
    {
      question: 'Who may own or manage an OT PLLC in New York?',
      answer:
        'Ownership and professional control are generally limited to appropriately licensed professionals authorized to provide the PLLC’s services. For OT practices, that typically means licensed Occupational Therapists. We help structure members/managers to comply with New York rules.',
    },
    {
      question: 'Can my PLLC employ or supervise OTAs (COTAs) or limited-permit holders?',
      answer:
        'Supervision and collaboration rules are separate from entity formation. Many OT practices employ or supervise OTAs and limited-permit holders under NYSED requirements. We align operating documents with your staffing model and recommend regulatory guidance for detailed supervision questions.',
    },
    {
      question: 'Can I provide telepractice or home-based OT under my PLLC?',
      answer:
        'Many New York OTs serve clients via telepractice and in-home visits. Formation does not change licensure boundaries or payer rules — you must follow NY practice standards and platform/payer policies. We use purpose language appropriate for clinic, school, home-based, and virtual services within NY.',
    },
    {
      question: 'What naming issues commonly delay OT approvals?',
      answer:
        'Names must be professional, include the required designator (e.g., “PLLC”), and avoid restricted or misleading terms (e.g., “clinic,” “center,” or claims outside OT scope) without additional approvals. ',
    },
    {
      question: 'Can my OT PLLC contract with schools, EI programs, SNFs, or home-care agencies?',
      answer:
        'Yes. Many OTs contract with districts, early intervention programs, skilled nursing facilities, or home-care agencies. Contracting requirements are separate from formation. We deliver a bank-ready document set suitable for vendor enrollment and credentialing.',
    },
    {
      question: 'Is the six-week, two-newspaper publication included?',
      answer:
        `Yes. We coordinate county-designated publication, manage proofs and affidavits, and file the Certificate of Publication — fully included in the $${PRICE} flat fee.`,
    },
    {
      question: 'What documents will I receive for banking, credentialing, and leasing?',
      answer:
        'You receive EIN confirmation, filed Articles of Organization, publication affidavits, and the Certificate of Publication — the standard bank-ready set requested by banks, credentialing teams, and landlords.',
    },
    {
      question: 'Can an OT PLLC operate multiple locations or mobile services?',
      answer:
        'Often yes. Many practices expand to additional sites or operate mobile/home-based services. We structure formation to support growth and explain county publication implications if you add offices in other counties later.',
    },
    {
      question: 'How long does an OT PLLC typically take?',
      answer:
        'Timelines vary. NYSED pre-approval can add weeks or months depending on review volume; publication then requires six consecutive weeks. We begin immediately, set realistic timelines, and keep you updated at each milestone.',
    },
  ]

  // Inline link to naming guidance
  OT_FAQ[4].answer += ' See <a href="/faq#naming-conventions">naming conventions</a> for common pitfalls.'

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
              name: 'New York Occupational Therapist (OT) PLLC Formation Service',
              description:
                'PLLC formation for New York occupational therapists (OT) including NYSED pre-approval coordination, compliant naming, precise filing, required publication, and bank-ready documents.',
              url: '/professions/occupational-therapist',
              offers: [
                {
                  name: 'OT PLLC Formation Package',
                  description:
                    'Includes NYSED pre-approval packet coordination, six-week publication, Certificate of Publication, and formation documents for your occupational therapy practice.',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(OT_FAQ)) }}
      />
      <div className="flex flex-col">
        {/* Breadcrumb Navigation */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb
              items={[
                { label: 'Professions' },
                { label: 'Occupational Therapy PLLC', href: '/professions/occupational-therapist' },
              ]}
            />
          </div>
        </div>

        {/* HERO */}
        <section className="bg-gradient-to-b from-primary/5 via-background to-background py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Form your <span className="text-primary">Occupational Therapy PLLC</span> in New York — clinic, school & home-based ready
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Built for New York OTs across pediatrics and adult rehab — ADLs, upper-extremity/hand therapy, sensory integration, ergonomics, driving rehab, assistive technology, and home modifications.
              We manage <Link href="/faq#nysed-preapproval" className="text-primary underline underline-offset-2">NYSED pre-approval</Link>, craft supervision-aware purpose language, guide compliant naming, file precisely with the Department of State, complete the six-week publication, and deliver a bank-ready package — all for <strong>${PRICE}</strong>.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline">State Board for Occupational Therapy</Badge>
              <Badge variant="outline">OTA Supervision-Aware</Badge>
              <Badge variant="outline">Telepractice/Home-Based Ready</Badge>
              <Badge variant="outline">Publishing Included</Badge>
              <Badge variant="outline">EIN + Bank-Ready Docs</Badge>
            </div>

            <div className="mt-10 flex justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/order">
                  Start your OT PLLC — ${PRICE}
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

        {/* WHY IT’S SPECIFIC FOR OTs */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Purpose-built for New York occupational therapy</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                OT entities face extra scrutiny — State Board pre-approval, strict naming, county publication, and the documentation banks, districts, agencies, and landlords expect. We form PLLCs that reflect OT scope across clinic, school, home-based, and telepractice settings, support OTA supervision, and scale as you add clinicians or locations.
              </p>
              <p className="mt-4 text-base text-muted-foreground max-w-3xl mx-auto">
                Clear path: name vetting → NYSED pre-approval → Articles filing → six-week publication → bank-ready package. Plain-English updates and realistic timelines at every milestone.
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
                  Submission packaged for the State Board for Occupational Therapy — scope-appropriate purpose language and governance aligned to professional practice rules.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" /> Naming That Passes Review
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Avoid restricted or misleading terms (e.g., “clinic,” “center,” or medical claims beyond OT scope). We propose compliant, brand-forward options that clear NYSED faster. See{' '}
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
                  Articles tailored to OT services — ADL training, upper-extremity rehab, sensory integration, assistive tech, home mods, ergonomics — filed correctly with NYSED and the Department of State, with milestone updates throughout.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Newspaper className="h-5 w-5 text-primary" /> Required Publishing — Included
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Two-newspaper, six-week publication managed end-to-end — scheduling, affidavits, and Certificate of Publication — fully included in ${PRICE}.{' '}
                  <Link href="/faq#publishing-requirements" className="text-primary underline underline-offset-2 text-xs">Learn about publishing requirements</Link>.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* WHAT YOU RECEIVE */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to open and grow your OT practice</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A complete, bank-ready formation package designed for lenders, districts, agencies, landlords, and vendors.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5 text-primary" /> Formation</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  NYSED pre-approval support, Articles of Organization, supervision-aware purpose language, and state filing — end-to-end.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Operating Agreement</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  An OT-focused Operating Agreement for solo or group practices — aligned with OTA supervision and ready for lender/district/agency review.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Bank-Ready Package</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  EIN confirmation, filed Articles, publication affidavits, and Certificate of Publication — what banks, landlords, and credentialing teams typically require.
                </CardContent>
              </Card>
            </div>

            <div className="mt-10">
              <Button size="lg" asChild>
                <Link href="/order">Start your OT PLLC — ${PRICE}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* PROFESSION-SPECIFIC FAQ */}
        <section className="py-20 lg:py-28 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Occupational Therapy PLLC FAQs</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Practical answers for New York OTs — ownership, OTA supervision, telepractice, school/SNF contracting, publishing, and timelines.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {OT_FAQ.map((item) => (
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
                <Link href="/order">Start your OT PLLC — ${PRICE}</Link>
              </Button>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">This page provides general information and is not legal advice.</p>
          </div>
        </section>

        {/* TRUST & CTA */}
        <section className="bg-muted/40 py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">We help New York OTs go independent — confidently</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From State Board pre-approval through publication and a bank-ready document set, our process is built for modern occupational therapy — clinic, school, home-based, and telepractice within NY.
            </p>
            <p className="mt-6 text-muted-foreground">
              We’re based in New York and answer fast. No scripts. No bots. Experienced help from people who do this every day.
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
