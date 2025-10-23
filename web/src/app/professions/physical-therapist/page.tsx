/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Shield, ClipboardList, FileCheck2, Newspaper, Activity, Users, CheckCircle, ArrowRight } from 'lucide-react'
import { PRICING, APP_CONFIG } from '@/lib/constants'
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data'

export const metadata: Metadata = {
  title: `Form a New York PT PLLC | ${APP_CONFIG?.name || 'New York PLLC'}`,
  description: `Form your Physical Therapist PLLC in New York for a flat $${PRICING.basePrice}. We help licensed PTs with NYSED pre-approval, compliant naming, accurate filing, legal publishing, EIN setup, and delivery of all bank-ready documents.`,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL || 'https://newyorkpllc.com'}/professions/physical-therapist`,
  },
}

export default function PTPage() {
  const PRICE = PRICING.basePrice

  return (
    <>
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: 'Physical Therapist', item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://newyorkpllc.com'}/professions/physical-therapist` }
          ])),
        }}
      />
      <div className="flex flex-col">
        {/* Breadcrumb Navigation */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb
              items={[
                { label: 'Physical Therapist', href: '/professions/physical-therapist' }
              ]}
            />
          </div>
        </div>

      {/* HERO */}
      <section className="bg-gradient-to-b from-primary/5 via-background to-background py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Form your <span className="text-primary">PT PLLC</span> in New York — built for Physical Therapists
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            For licensed Physical Therapists ready to open their own practice.  
            We handle NYSED pre-approval, naming compliance, state filing, required publishing, EIN registration, and
            deliver all your bank-ready documents — all for <strong>${PRICE}</strong>.  
            Real help, no hidden fees, and no call centers.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <Badge variant="outline">NYSED Pre-Approval</Badge>
            <Badge variant="outline">Naming Compliance</Badge>
            <Badge variant="outline">Accurate Filing</Badge>
            <Badge variant="outline">Publishing Included</Badge>
            <Badge variant="outline">EIN + Operating Agreement</Badge>
          </div>

          <div className="mt-10 flex justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/order">
                Start your PT PLLC — ${PRICE}
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

      {/* WHY IT’S SPECIFIC FOR PTs */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Made for Physical Therapists in New York</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Physical Therapists face unique challenges when forming a professional entity in New York —  
              from NYSED pre-approval to naming restrictions and publication rules.  
              We handle it all, so you can stay focused on your patients, not your paperwork.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" /> NYSED Pre-Approval Support
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                We assemble and guide your submission for NYSED’s Office of the Professions — ensuring your name, ownership, and purpose language meet Physical Therapy-specific standards.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-primary" /> Profession-Specific Naming Guidance
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                New York limits how “rehabilitation,” “wellness,” or “clinic” can be used in PT entity names.  
                We help you choose a compliant name that passes NYSED review the first time.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck2 className="h-5 w-5 text-primary" /> Accurate & Efficient Filing
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                We prepare and file PLLC Articles that meet both Department of State and NYSED standards — with milestone updates and plain-English explanations.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="h-5 w-5 text-primary" /> Legal Publishing Included
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                The six-week publication process in two newspapers is included.  
                We handle scheduling, affidavits, and final filing of the Certificate of Publication — no add-ons later.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* WHAT YOU RECEIVE */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to open your PT practice</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From NYSED pre-approval to the documents your bank and insurers require — we deliver the complete package, for one flat price.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5 text-primary" /> Formation</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                NYSED pre-approval, Articles of Organization, and compliant purpose drafting handled start to finish.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Operating Agreement</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                A signature-ready Operating Agreement tailored for physical therapy practices — solo or multi-member.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Bank-Ready Package</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                EIN confirmation, state filings, affidavits, and your filed Certificate of Publication — everything you need to open a business bank account.
              </CardContent>
            </Card>
          </div>

          <div className="mt-10">
            <Button size="lg" asChild>
              <Link href="/order">Start your PT PLLC — ${PRICE}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="bg-muted/40 py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">We help New York’s Physical Therapists go independent — confidently</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our process was built specifically for licensed professionals like you — those who want to open a compliant practice without drowning in paperwork or risking NYSED rejection.
          </p>
          <p className="mt-6 text-muted-foreground">
            You’ll work with real people who understand New York’s professional formation process inside and out.  
            We explain every step in plain language, and we’re available before and after you file.
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
