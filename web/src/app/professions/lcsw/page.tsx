import Link from 'next/link'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Shield, ClipboardList, FileCheck2, Newspaper, Heart, Users, MessageSquare, CheckCircle, ArrowRight } from 'lucide-react'
import { PRICING, APP_CONFIG } from '@/lib/constants'
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo/structured-data'

export const metadata: Metadata = {
  title: `Form a New York LCSW PLLC | ${APP_CONFIG?.name || 'New York PLLC'}`,
  description: `LCSW PLLC formation built for therapists. NYSED pre‑approval guidance, scope‑appropriate naming, precise filings, six‑week publishing, EIN + bank‑ready docs — all for $${PRICING.basePrice}.`,
  keywords: [
    'LCSW PLLC formation',
    'New York LCSW LLC',
    'Licensed Clinical Social Worker PLLC',
    'NY therapist business formation',
    'LCSW practice formation',
    'New York social worker PLLC'
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL || 'https://newyorkpllc.com'}/professions/lcsw`,
  },
}

export default function LCSWPage() {
  const PRICE = PRICING.basePrice
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://newyorkpllc.com'
  const breadcrumbJson = [
    { name: 'Home', item: siteUrl },
    { name: 'LCSW PLLC Formation', item: `${siteUrl}/professions/lcsw` },
  ]

  const LCSW_FAQ = [
    {
      question: 'Do I need NYSED pre-approval before filing an LCSW PLLC?',
      answer:
        'Yes. Most New York professional entities require review by the Office of the Professions (NYSED) before filing with the Department of State. We help assemble a clean, complete pre-approval request tailored to LCSW practice so you avoid back-and-forth and delays.',
    },
    {
      question: 'Can my PLLC include non‑LCSW owners or managers?',
      answer:
        'Ownership of a New York PLLC is generally limited to appropriately licensed professionals who can lawfully provide the services of the entity. For an LCSW PLLC, that typically means LCSWs (and in some cases certain closely related licensed professions, where permitted). We help you structure ownership in line with NY rules.',
    },
    {
      question: 'What LCSW‑specific naming rules should I know?',
      answer:
        'NYSED enforces precise naming standards. Names must be professional, must include the required professional designator (e.g., “PLLC”), and cannot include restricted terms (like “clinic,” “center,” or terms implying broader medical services) without additional approvals. We review your options and help you choose a name that passes state review.',
    },
    {
      question: 'Where does the six‑week publication happen and is it included?',
      answer:
        'Publication occurs in two newspapers designated by the county clerk in your PLLC’s county. We manage scheduling, proofing, affidavits, and the Certificate of Publication filing. It is included in our $' + PRICE + ' flat price—no add‑ons later.',
    },
    {
      question: 'What do I receive to open a bank account for my practice?',
      answer:
        'You receive a bank‑ready package: your EIN confirmation, filed Articles, publication affidavits, and the Certificate of Publication. Banks typically accept this documentation to open your business account.',
    },
    {
      question: 'How long does the entire LCSW PLLC process take?',
      answer:
        'Timelines vary. NYSED pre‑approval often adds several months to the process, and publication requires six consecutive weeks. We start filings quickly, communicate realistic timelines, and keep you updated at each milestone.',
    },
  ]

  return (
    <>
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbJson)),
        }}
      />
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(LCSW_FAQ)),
        }}
      />
      <div className="flex flex-col">
        {/* Breadcrumb Navigation */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb
              items={[
                { label: 'Professions' },
                { label: 'LCSW PLLC', href: '/professions/lcsw' }
              ]}
            />
          </div>
        </div>

      {/* HERO */}
      <section className="bg-gradient-to-b from-primary/5 via-background to-background py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Form your <span className="text-primary">LCSW PLLC</span> in New York — the right way, start to finish
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Built specifically for Licensed Clinical Social Workers. We help you navigate <Link href="/faq#nysed-preapproval" className="text-primary underline underline-offset-2">NYSED pre-approval</Link>, choose a compliant
            name, file everything accurately, handle the legal publishing, and deliver your bank-ready documents — all for{' '}
            <strong>${PRICE}</strong>. No hidden fees. No confusion. Real help from real people in New York.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <Badge variant="outline">NYSED Pre-Approval Support</Badge>
            <Badge variant="outline">Naming Guidance</Badge>
            <Badge variant="outline">Accurate Filing</Badge>
            <Badge variant="outline">Legal Publishing Included</Badge>
            <Badge variant="outline">EIN + Operating Agreement</Badge>
          </div>

          <div className="mt-10 flex justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/order">
                Start your LCSW PLLC — ${PRICE}
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

      {/* WHY THIS MATTERS */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Built around the realities of LCSW practice</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Starting a private practice isn’t just paperwork — it’s a professional milestone.  
              We’ve helped hundreds of New York therapists form their PLLCs smoothly, without wasting weeks trying to decode NYSED rules or county publication requirements.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" /> NYSED Pre-Approval Help
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                We prepare everything NYSED’s Office of the Professions needs for LCSW pre-approval.  
                You’ll know exactly what to submit and when — no guesswork, no rejections.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-primary" /> Naming Guidance that Prevents Delays
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                We’ll help you pick a name that fits NYSED’s strict standards (for example, avoiding words like “center” or “clinic” without approval). See <Link href="/faq#naming-conventions" className="text-primary underline underline-offset-2">naming conventions</Link>.  
                It saves weeks of back-and-forth and lets your filing go through cleanly.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck2 className="h-5 w-5 text-primary" /> Filing Done Right
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                Your PLLC Articles are drafted precisely for LCSWs, compliant with both NYSED and Department of State requirements.  
                You’ll get plain-English updates from start to finish.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="h-5 w-5 text-primary" /> Required Legal Publishing — Included
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                We coordinate the full six-week publication, collect affidavits, and file the Certificate of Publication.{' '}
                <Link href="/faq#publishing-requirements" className="text-primary underline underline-offset-2 text-xs">
                  Learn about publishing requirements
                </Link>
                . It’s all included in the ${PRICE} — no surprises later.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* WHAT YOU RECEIVE */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to open your LCSW practice</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We deliver a full, ready-to-use set of documents accepted by banks, landlords, and credentialing systems.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Heart className="h-5 w-5 text-primary" /> Complete Formation</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                NYSED pre-approval support, Articles of Organization, EIN, and naming compliance guidance — all handled for you.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Operating Agreement</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Profession-ready Operating Agreement drafted for solo or group LCSW practices — signature-ready for your records.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Bank-Ready Package</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                You’ll receive your EIN confirmation, state filings, publication affidavits, and certificate — everything your bank requires to open an account.
              </CardContent>
            </Card>
          </div>

          <div className="mt-10">
            <Button size="lg" asChild>
              <Link href="/order">Start your LCSW PLLC — ${PRICE}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* PROFESSION-SPECIFIC FAQ */}
      <section className="py-20 lg:py-28 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">LCSW PLLC FAQs</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Clear answers to the most common questions Licensed Clinical Social Workers have when forming a PLLC in New York.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {LCSW_FAQ.map((item) => (
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
              <Link href="/order">Start your LCSW PLLC — ${PRICE}</Link>
            </Button>
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">This information is general and not legal advice.</p>
        </div>
      </section>

      {/* TRUST & CTA */}
      <section className="bg-muted/40 py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">We’re here for therapists</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our founders built this service after seeing how confusing New York’s process is for licensed professionals.  
            Every step — from NYSED pre-approval to publication — is explained, tracked, and handled by people who understand what social workers actually need.
          </p>
          <p className="mt-6 text-muted-foreground">
            We’re based in New York. We answer the phone. We’ll talk you through it.  
            No call centers, no bots — just experienced help from people who’ve done this hundreds of times for professionals just like you.
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
