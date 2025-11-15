import Link from 'next/link'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { ScrollTracking } from '@/components/analytics/scroll-tracking'
import { Shield, ClipboardList, FileCheck2, Newspaper, Stethoscope, Users, CheckCircle, ArrowRight } from 'lucide-react'
import { PRICING, APP_CONFIG } from '@/lib/constants'
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo/structured-data'

export const metadata: Metadata = {
  title: `Form a New York Physician PLLC (Medicine PLLC) | ${APP_CONFIG?.name || 'New York PLLC'}`,
  description: `Physician PLLC formation for New York MD/DOs. NYSED State Board for Medicine pre-approval, telehealth-aware purpose language, MSO-friendly governance, compliant naming, precise filings, six-week publication, EIN + bank-ready docs — flat $${PRICING.basePrice}.`,
  keywords: [
    'Physician PLLC New York',
    'Medicine PLLC NY',
    'medical practice PLLC NY',
    'MD DO PLLC formation',
    'telemedicine New York physician',
    'corporate practice of medicine NY',
    'MSO management services agreement NY',
    'multispecialty group PLLC New York',
    'NYSED State Board for Medicine pre-approval',
    'NY Certificate of Publication medical practice'
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.nypllc.com'}/professions/physician`,
  },
}

export default function PhysicianPage() {
  const PRICE = PRICING.basePrice
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.nypllc.com'
  const breadcrumbJson = [
    { name: 'Home', item: siteUrl },
    { name: 'Physician PLLC Formation', item: `${siteUrl}/professions/physician` },
  ]

  const MD_FAQ = [
    {
      question: 'Do physicians need NYSED pre-approval before forming a PLLC?',
      answer:
        'Yes. Physician PLLCs typically require review by NYSED’s Office of the Professions (State Board for Medicine) before the Department of State will accept the filing. We prepare a medicine-specific pre-approval package — purpose language, name, and ownership — to reduce objections and delays.',
    },
    {
      question: 'Who may own or manage a Physician PLLC in New York?',
      answer:
        'Ownership and professional control are generally limited to appropriately licensed physicians (MD or DO). Cross-profession ownership is tightly restricted. We help structure members/managers to align with New York’s professional practice rules.',
    },
    {
      question: 'Can I use an MSO to handle non-clinical operations?',
      answer:
        'Many New York medical groups contract with a Management Services Organization (MSO) for non-clinical services (admin, billing, HR, space). MSO contracts are separate from ownership — non-physicians do not own the PLLC. We craft governance that plays nicely with MSO agreements; for complex models, consult legal counsel.',
    },
    {
      question: 'What naming issues commonly delay physician approvals?',
      answer:
        'Names must be professional, include the required designator (e.g., “PLLC”), and avoid restricted or misleading terms (e.g., “hospital,” “clinic,” “center,” or claims outside scope) without additional approvals. ',
    },
    {
      question: 'Can I provide telemedicine under my PLLC?',
      answer:
        'Yes, many physicians serve New York patients via telemedicine. Formation does not change licensure boundaries or payer rules — you must follow NY clinical, privacy, and platform/payer policies. We craft purpose language appropriate for in-person and telehealth care within NY.',
    },
    {
      question: 'Can my PLLC employ PAs, NPs, or other staff?',
      answer:
        'Employment and supervision/collaboration rules are separate from entity ownership. Many physician practices employ PAs, NPs, and support staff under applicable professional rules. We align your operating documents with your staffing model; for detailed supervision/collaboration requirements, consult regulatory guidance.',
    },
    {
      question: 'Is the six-week, two-newspaper publication included?',
      answer:
        `Yes. We coordinate county-assigned publication, manage proofs and affidavits, and file the Certificate of Publication — fully included in the $${PRICE} flat fee.`,
    },
    {
      question: 'What will I receive for banking, credentialing, and leasing?',
      answer:
        'You receive EIN confirmation, filed Articles, publication affidavits, and the Certificate of Publication — the “bank-ready” set typically requested by banks, hospital credentialing, payers, and landlords.',
    },
    {
      question: 'Can a Physician PLLC operate multiple locations or service lines?',
      answer:
        'Often yes. Many practices add locations or service lines (e.g., primary care + urgent care). We structure formation to support growth and explain county publication implications if you add offices in other counties.',
    },
    {
      question: 'How long does a Physician PLLC typically take?',
      answer:
        'Timelines vary. NYSED pre-approval can add weeks or months based on volume; publication then requires six consecutive weeks. We begin immediately, set realistic timelines, and keep you updated at each milestone.',
    },
  ]

  // Inline link to naming guidance
  MD_FAQ[3].answer += ' See <a href="/faq#naming-conventions">naming conventions</a> for common pitfalls.'

  return (
    <>
      <ScrollTracking />
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbJson)) }}
      />
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(MD_FAQ)) }}
      />
      <div className="flex flex-col">
        {/* Breadcrumb Navigation */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb
              items={[
                { label: 'Professions' },
                { label: 'Physician PLLC', href: '/professions/physician' },
              ]}
            />
          </div>
        </div>

        {/* HERO */}
        <section className="bg-gradient-to-b from-primary/5 via-background to-background py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Form your <span className="text-primary">Physician PLLC</span> in New York — compliant, telehealth-ready & MSO-friendly
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Built for New York MDs and DOs — solo, group, multispecialty, in-person and telemedicine. We manage{' '}
              <Link href="/faq#nysed-preapproval" className="text-primary underline underline-offset-2">NYSED pre-approval</Link>, craft telehealth-aware purpose language,
              guide compliant naming, file precisely with the Department of State, complete six-week publication, and deliver a bank-ready package —
              all for <strong>${PRICE}</strong>. No hidden fees.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline">State Board for Medicine</Badge>
              <Badge variant="outline">Telehealth-Aware Purpose</Badge>
              <Badge variant="outline">MSO-Friendly Governance</Badge>
              <Badge variant="outline">Publishing Included</Badge>
              <Badge variant="outline">EIN + Bank-Ready Docs</Badge>
            </div>

            <div className="mt-10 flex justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/order">
                  Start your Physician PLLC — ${PRICE}
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

        {/* WHY IT’S SPECIFIC FOR PHYSICIANS */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Purpose-built for New York physicians</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Physician entities face heightened scrutiny: State Board pre-approval, strict naming, county publication, bank/credentialing documentation,
                and careful alignment with corporate practice of medicine principles — especially when using MSOs. We form PLLCs that reflect medical scope,
                support telemedicine within NY, and scale as you add clinicians, services, or locations.
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
                  We package your submission for the State Board for Medicine — scope-appropriate purpose language and governance aligned to professional practice rules.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" /> Naming That Passes Review
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Avoid restricted or misleading terms (e.g., “hospital,” “clinic,” “center,” or claims beyond scope). We propose compliant, brand-forward options that clear NYSED faster. See{' '}
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
                  Articles drafted for medical practice — in-person and telehealth — filed correctly with NYSED and the Department of State, with milestone updates throughout.
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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to open and grow your medical practice</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A complete, bank-ready formation package designed for lenders, hospitals, payers, landlords, and vendors.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Stethoscope className="h-5 w-5 text-primary" /> Formation</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  NYSED pre-approval support, Articles of Organization, telehealth-aware purpose language, and state filing — end-to-end.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Operating Agreement</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  A physician-focused Operating Agreement for solo, group, or multispecialty practices — MSO-friendly and ready for lender/hospital review.
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
                <Link href="/order">Start your Physician PLLC — ${PRICE}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* PROFESSION-SPECIFIC FAQ */}
        <section className="py-20 lg:py-28 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Physician PLLC FAQs</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Practical answers for New York physicians — ownership, MSOs, telehealth, naming, publishing, staffing, and timelines.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {MD_FAQ.map((item) => (
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
                <Link href="/order">Start your Physician PLLC — ${PRICE}</Link>
              </Button>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">This page provides general information and is not legal advice.</p>
          </div>
        </section>

        {/* TRUST & CTA */}
        <section className="bg-muted/40 py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">We help New York physicians go independent — confidently</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From State Board pre-approval through publication and a bank-ready document set, our process is built for modern medical groups — clinic, telemedicine, and multi-site growth within NY.
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
