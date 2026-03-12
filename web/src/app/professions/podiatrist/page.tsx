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
  Activity,
  Users,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'
import { PRICING, APP_CONFIG } from '@/lib/constants'
import { SEO_CONFIG } from '@/lib/seo/config'
import { generateBreadcrumbSchema, generateFAQSchema, generateProfessionServiceSchema } from '@/lib/seo/structured-data'

export const metadata: Metadata = {
  title: `Form a New York Podiatry PLLC | ${APP_CONFIG?.name || 'New York PLLC'}`,
  description: `Podiatry PLLC formation built for New York podiatrists. NYSED pre-approval, specialty-accurate naming, precise filings, six-week publishing, EIN + bank-ready docs — all for $${PRICING.basePrice}.`,
  keywords: [
    'podiatry PLLC formation New York',
    'New York podiatrist PLLC',
    'start a podiatry practice NY',
    'foot and ankle surgery PLLC New York',
    'NYSED State Board for Podiatry pre-approval',
    'podiatric medicine PLLC formation',
    'Medicare credentialing podiatrist NY',
  ],
  alternates: {
    canonical: `${SEO_CONFIG.siteUrl}/professions/podiatrist`,
  },
}

export default function PodiatristPage() {
  const PRICE = PRICING.basePrice
  const siteUrl = SEO_CONFIG.siteUrl
  const breadcrumbJson = [
    { name: 'Home', item: siteUrl },
    { name: 'Podiatry PLLC Formation', item: `${siteUrl}/professions/podiatrist` },
  ]

  const PODIATRIST_FAQ = [
    {
      question: 'Does a podiatry PLLC require NYSED pre-approval before filing?',
      answer:
        'Yes. New York requires review by NYSED\u2019s Office of the Professions (State Board for Podiatry) before the Department of State will accept your filing. We assemble a clean pre-approval package \u2014 name, scope, and professional statements \u2014 so it clears quickly and avoids back-and-forth.',
    },
    {
      question: 'Who may own a New York podiatry PLLC?',
      answer:
        'Only licensed podiatrists (Doctors of Podiatric Medicine) may be members or managers of a podiatry PLLC in New York. Non-podiatrists \u2014 including MDs, PAs, and business investors \u2014 cannot hold ownership interests. We structure your formation documents to comply with these requirements from the start.',
    },
    {
      question: 'Can I use specialty names like "Foot & Ankle Surgery" in my PLLC name?',
      answer:
        'Specialty designations such as \u201cFoot & Ankle Surgery,\u201d \u201cPodiatric Medicine & Surgery,\u201d or \u201cSports Podiatry\u201d may be used, but the name must accurately reflect your licensure and board certifications. NYSED reviews names for accuracy. We help you choose a compliant name that passes pre-approval and positions your practice correctly.',
    },
    {
      question: 'Is the six-week newspaper publication included in the price?',
      answer:
        `Yes. We coordinate publication in two newspapers designated by your county clerk, manage proofs and affidavits, and file the Certificate of Publication. All included in the $${PRICE} flat fee \u2014 no surprise add-ons later.`,
    },
    {
      question: 'How does PLLC formation affect Medicare and Medicaid credentialing?',
      answer:
        'Your PLLC\u2019s EIN, legal name, and formation documents are required for PECOS enrollment and Medicaid provider applications. Credentialing typically adds one to three months after formation. We deliver a bank-ready package with the documents insurers and credentialing agencies need so you can start the process immediately.',
    },
    {
      question: 'What documents will I receive for equipment financing and office leases?',
      answer:
        'You receive a bank-ready package: EIN confirmation, filed Articles, publication affidavits, and Certificate of Publication \u2014 the documents lenders, equipment-financing companies, and landlords typically request before approving podiatric office leases and surgical-suite buildouts.',
    },
    {
      question: 'How long does the podiatry PLLC formation process take?',
      answer:
        'Formation typically takes three-and-a-half to five months, driven by NYSED review timelines and the mandatory six consecutive weeks of publication. If you plan to credential with Medicare or Medicaid, allow an additional one to three months. We start immediately and keep you informed at each milestone.',
    },
    {
      question: 'Can non-podiatrists be members or managers of a podiatry PLLC?',
      answer:
        'No. Under New York\u2019s Education Law, only individuals licensed to practice podiatry in the state may hold ownership or management roles in a podiatry PLLC. Non-licensed staff can be employees but not members. We verify licensure and structure your documents accordingly.',
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
              name: 'New York Podiatry PLLC Formation Service',
              description:
                'PLLC formation for New York podiatrists including NYSED pre-approval coordination, specialty-accurate naming guidance, precise filing, required publication, and bank-ready documents.',
              url: '/professions/podiatrist',
              offers: [
                {
                  name: 'Podiatry PLLC Formation Package',
                  description:
                    'Includes NYSED pre-approval packet coordination, six-week publication, Certificate of Publication, and formation documents for your podiatry practice.',
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
          __html: JSON.stringify(generateFAQSchema(PODIATRIST_FAQ)),
        }}
      />

      <div className="flex flex-col">
        {/* Breadcrumb Navigation */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb
              items={[
                { label: 'Professions' },
                { label: 'Podiatry PLLC', href: '/professions/podiatrist' },
              ]}
            />
          </div>
        </div>

        {/* HERO */}
        <section className="bg-gradient-to-b from-primary/5 via-background to-background py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Form your <span className="text-primary">Podiatry PLLC</span> in New York &mdash; solo practice to multi-doctor group
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Built specifically for podiatrists. We manage{' '}
              <Link href="/faq#nysed-preapproval" className="text-primary underline underline-offset-2">NYSED pre-approval</Link>,
              guide specialty-accurate naming, file precisely with the
              Department of State, complete the six-week publication, and deliver your bank-ready package &mdash; all for <strong>${PRICE}</strong>.
              No hidden fees. No call centers. New York experts who do this every day.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline">NYSED Pre-Approval</Badge>
              <Badge variant="outline">Specialty-Accurate Naming</Badge>
              <Badge variant="outline">Medicare Credentialing Ready</Badge>
              <Badge variant="outline">Legal Publishing Included</Badge>
              <Badge variant="outline">EIN + Bank-Ready Docs</Badge>
            </div>

            <div className="mt-10 flex justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/order">
                  Start your Podiatry PLLC &mdash; ${PRICE}
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
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Built around the realities of launching a podiatry practice</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Opening a podiatry practice means more than hanging a shingle &mdash; it&apos;s securing a surgical suite, credentialing with
                Medicare and Medicaid, financing equipment, and meeting New York&apos;s corporate-practice-of-professions requirements. We handle
                the formation side so you can focus on building your patient base.
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
                  We prepare a clean NYSED pre-approval package &mdash; name, scope, ownership structure, and professional statements aligned to your practice areas (podiatric surgery, diabetic foot care, sports medicine, wound care, and more).
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" /> Specialty-Accurate Naming Guidance
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Designations like &ldquo;Foot &amp; Ankle Surgery&rdquo; or &ldquo;Podiatric Medicine &amp; Surgery&rdquo; must reflect your actual licensure and board certifications. We help you choose a name that clears NYSED review and positions your practice correctly.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck2 className="h-5 w-5 text-primary" /> Precise, Podiatrist-Specific Filings
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Articles crafted for podiatry practice requirements &mdash; including the $10/member fee, PPE affidavit, and Corporate Contact form &mdash; and filed properly with NYSED and the Department of State.
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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to open and grow your podiatry practice</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A complete, bank-ready formation package designed for lenders, landlords, equipment-financing companies, and credentialing agencies.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5 text-primary" /> Complete Formation</CardTitle>
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
                  Podiatry-specific Operating Agreement for solo practitioners or group practices &mdash; ready for partner onboarding, bank review, and Medicare credentialing.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Bank-Ready Package</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  EIN confirmation, filed Articles, publication affidavits, and Certificate of Publication &mdash; what banks, equipment-financing companies, and landlords typically require for surgical-suite leases and podiatric office buildouts.
                </CardContent>
              </Card>
            </div>

            <div className="mt-10">
              <Button size="lg" asChild>
                <Link href="/order">Start your Podiatry PLLC &mdash; ${PRICE}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* PROFESSION-SPECIFIC FAQ */}
        <section className="py-20 lg:py-28 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Podiatry PLLC FAQs</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Clear, podiatrist-specific answers for forming a Professional Limited Liability Company in New York.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {PODIATRIST_FAQ.map((item) => (
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
                <Link href="/order">Start your Podiatry PLLC &mdash; ${PRICE}</Link>
              </Button>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">This information is general and not legal advice.</p>
          </div>
        </section>

        {/* TRUST & CTA */}
        <section className="bg-muted/40 py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">We&apos;re here for New York podiatrists</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From NYSED pre-approval through publication and bank-ready documents, our team understands how podiatrists
              launch and scale practices &mdash; solo foot-care clinics, multi-doctor surgical groups, diabetic wound-care centers,
              and sports-medicine practices expanding to new locations.
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
