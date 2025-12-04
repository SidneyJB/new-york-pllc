import Link from 'next/link'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { ScrollTracking } from '@/components/analytics/scroll-tracking'
import { Shield, ClipboardList, FileCheck2, Newspaper, Stethoscope, Users, CheckCircle, ArrowRight, HeartPulse } from 'lucide-react'
import { PRICING, APP_CONFIG } from '@/lib/constants'
import { SEO_CONFIG } from '@/lib/seo/config'
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo/structured-data'

export const metadata: Metadata = {
  title: `Form a New York Nurse Practitioner PLLC (NP PLLC) | ${APP_CONFIG?.name || 'New York PLLC'}`,
  description: `NP PLLC formation for New York Nurse Practitioners — Family Health, Psychiatry/Mental Health, Adult-Gerontology, Pediatrics, Women’s Health, Acute Care, and more. NYSED pre-approval, compliant naming, precise filings, six-week publication, EIN + bank-ready docs — flat $${PRICING.basePrice}.`,
  keywords: [
    'Nurse Practitioner PLLC New York',
    'NP PLLC NY',
    'FNP PLLC New York',
    'PMHNP PLLC New York',
    'Adult-Gerontology NP PLLC',
    'Pediatric NP PLLC NY',
    'Women’s Health NP PLLC NY',
    'Acute Care NP PLLC',
    'NYSED nurse practitioner specialties',
    'NY Certificate of Publication nurse practitioner'
  ],
  alternates: {
    canonical: `${SEO_CONFIG.siteUrl}/professions/nurse-practitioner`,
  },
}

export default function NursePractitionerPage() {
  const PRICE = PRICING.basePrice
  const siteUrl = SEO_CONFIG.siteUrl
  const breadcrumbJson = [
    { name: 'Home', item: siteUrl },
    { name: 'Nurse Practitioner PLLC Formation', item: `${siteUrl}/professions/nurse-practitioner` },
  ]

  // NYSED-recognized NP specialty areas (used in content and SEO)
  const NP_SPECIALTIES = [
    'Acute Care',
    'Adult Health',
    'College Health',
    'Community Health',
    'Family Health',
    'Gerontology',
    'Holistic Care',
    'Neonatology',
    'Obstetrics/Gynecology',
    'Oncology',
    'Palliative Care',
    'Pediatrics',
    'Perinatology',
    'Psychiatry/Mental Health',
    'School Health',
    'Women’s Health',
  ]

  const NP_FAQ = [
    {
      question: 'Which Nurse Practitioner specialty areas does New York recognize?',
      answer:
        'New York certifies NPs in the following specialty practice areas: Acute Care, Adult Health, College Health, Community Health, Family Health, Gerontology, Holistic Care, Neonatology, Obstetrics/Gynecology, Oncology, Palliative Care, Pediatrics, Perinatology, Psychiatry/Mental Health, School Health, and Women’s Health.',
    },
    {
      question: 'Do NPs need a collaborating physician in New York?',
      answer:
        'NPs diagnose and treat within their certified specialty and are independently responsible for patient care. However, written practice protocols and a written collaborative agreement with a physician are required until the NP completes 3,600 hours of qualifying NP experience. After completing those hours, the NP may practice independently while still following applicable laws and standards.',
    },
    {
      question: 'Do Nurse Practitioners need NYSED pre-approval before forming a PLLC?',
      answer:
        'Yes. Professional entities for NPs are reviewed by NYSED’s Office of the Professions prior to filing with the Department of State. We assemble a profession-specific pre-approval package with compliant purpose language, ownership, and naming that reflects your NP specialty.',
    },
    {
      question: 'Who may own or manage an NP PLLC in New York?',
      answer:
        'Ownership is generally limited to appropriately licensed professionals authorized to provide the entity’s services. For an NP PLLC, that typically means licensed Nurse Practitioners (and in some cases other closely related licensed professions, where permitted). We align governance with New York’s professional practice rules.',
    },
    {
      question: 'What naming pitfalls delay NP approvals?',
      answer:
        'Names must include the required professional designator (e.g., “PLLC”), be professional, and avoid restricted or misleading terms (e.g., “clinic,” “hospital,” or claims outside NP scope) without additional approvals. We vet options so your name passes review on the first submission.',
    },
    {
      question: 'Is the six-week, two-newspaper publication included?',
      answer:
        `Yes. We coordinate county-assigned publication in two newspapers, manage proofs and affidavits, and file the Certificate of Publication — fully included in the $${PRICE} flat price.`,
    },
    {
      question: 'What documents will I receive for banking, payer enrollment, and leasing?',
      answer:
        'You receive EIN confirmation, filed Articles of Organization, publication affidavits, and the Certificate of Publication — a bank-ready packet commonly requested by banks, payers/credentialing teams, and landlords.',
    },
    {
      question: 'How long does an NP PLLC typically take?',
      answer:
        'NYSED pre-approval can add weeks or months depending on review volume. Publication then requires six consecutive weeks. We begin immediately, set realistic timelines, and keep you updated at each milestone.',
    },
  ]

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(NP_FAQ)) }}
      />

      <div className="flex flex-col">
        {/* Breadcrumb */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb
              items={[
                { label: 'Professions' },
                { label: 'Nurse Practitioner PLLC', href: '/professions/nurse-practitioner' },
              ]}
            />
          </div>
        </div>

        {/* HERO */}
        <section className="bg-gradient-to-b from-primary/5 via-background to-background py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Form your <span className="text-primary">Nurse Practitioner PLLC</span> in New York — built for your specialty
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              For Family Health NPs (FNP), Psychiatric/Mental Health NPs (PMHNP), Adult-Gerontology, Pediatrics, Women’s Health, Acute Care, and more.
              We manage <Link href="/faq#nysed-preapproval" className="text-primary underline underline-offset-2">NYSED pre-approval</Link>, compliant naming, precise filings with the Department of State, the six-week publication, and deliver a bank-ready package — all for <strong>${PRICE}</strong>.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline">Family Health (FNP)</Badge>
              <Badge variant="outline">Psychiatry/Mental Health (PMHNP)</Badge>
              <Badge variant="outline">Adult-Gerontology</Badge>
              <Badge variant="outline">Pediatrics</Badge>
              <Badge variant="outline">Women’s Health</Badge>
              <Badge variant="outline">Acute Care</Badge>
            </div>

            <div className="mt-10 flex justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/order">
                  Start your NP PLLC — ${PRICE}
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

        {/* WHY IT’S SPECIFIC FOR NPs */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Purpose-built for New York Nurse Practitioners</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                New York certifies NPs in defined specialty areas and applies profession-specific formation rules. We translate NYSED requirements into a clean, compliant filing flow that reflects your practice model — primary care, mental health, pediatrics, women’s health, acute care, school/community health, and more.
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
                  Profession-specific submission with specialty-appropriate purpose language and governance aligned to NP practice standards and ownership rules.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" /> Naming That Passes Review
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Avoid restricted or misleading terms (e.g., “clinic,” “hospital,” or claims outside NP scope). We propose compliant, brand-forward options that clear NYSED faster. See{' '}
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
                  Articles tailored to NP services across primary care, mental health, pediatrics, women’s health, and acute care — filed correctly with NYSED and the Department of State, with milestone updates throughout.
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

        {/* NYSED-RECOGNIZED SPECIALTIES */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Recognized NP specialty areas in New York</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Your entity purpose and naming should reflect your certified specialty. We align your filing with NYSED’s list below.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {NP_SPECIALTIES.map((s) => (
                <div key={s} className="flex items-center gap-2 rounded-xl border bg-card p-3 text-sm">
                  <Stethoscope className="h-4 w-4 text-primary" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT YOU RECEIVE */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to open and grow your NP practice</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A complete, bank-ready formation package designed for lenders, payers, landlords, and vendors.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><HeartPulse className="h-5 w-5 text-primary" /> Formation</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  NYSED pre-approval support, Articles of Organization with specialty-appropriate purpose language, and precise state filings.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Operating Agreement</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  An NP-focused Operating Agreement for solo or multi-member practices — aligned with New York professional practice rules.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Bank-Ready Package</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  EIN confirmation, filed Articles, publication affidavits, and Certificate of Publication — what banks, payers, and landlords typically require.
                </CardContent>
              </Card>
            </div>

            <div className="mt-10">
              <Button size="lg" asChild>
                <Link href="/order">Start your NP PLLC — ${PRICE}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* PROFESSION-SPECIFIC FAQ */}
        <section className="py-20 lg:py-28 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Nurse Practitioner PLLC FAQs</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Practical answers for New York NPs — specialties, collaboration, ownership, naming, publishing, and timelines.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {NP_FAQ.map((item) => (
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
                <Link href="/order">Start your NP PLLC — ${PRICE}</Link>
              </Button>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">General information only — not legal advice.</p>
          </div>
        </section>

        {/* TRUST & CTA */}
        <section className="bg-muted/40 py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Built for Family Health, Psychiatry, Pediatrics, Women’s Health — and beyond</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From NYSED pre-approval through publication and a bank-ready document set, our process is tuned for modern NP practice across specialties and care settings in New York.
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
