 
import Link from 'next/link'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Shield, ClipboardList, FileCheck2, Newspaper, Heart, Users, MessageSquare, CheckCircle, ArrowRight } from 'lucide-react'
import { PRICING, APP_CONFIG } from '@/lib/constants'
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data'

export const metadata: Metadata = {
  title: `Form a New York MHC PLLC | ${APP_CONFIG?.name || 'New York PLLC'}`,
  description: `Form your MHC PLLC in New York for a flat $${PRICING.basePrice}. We help Licensed Mental Health Counselors get NYSED pre-approval, meet naming requirements, file correctly, complete legal publishing, and receive every document needed to open their counseling practice.`,
  keywords: [
    'MHC PLLC formation',
    'New York Mental Health Counselor LLC',
    'Licensed Mental Health Counselor PLLC',
    'NY counselor business formation',
    'MHC practice formation',
    'New York therapist PLLC'
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL || 'https://newyorkpllc.com'}/professions/mhc`,
  },
}

export default function MHCPage() {
  const PRICE = PRICING.basePrice

  return (
    <>
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: 'MHC', item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://newyorkpllc.com'}/professions/mhc` }
          ])),
        }}
      />
      <div className="flex flex-col">
        {/* Breadcrumb Navigation */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb
              items={[
                { label: 'MHC', href: '/professions/mhc' }
              ]}
            />
          </div>
        </div>

      {/* HERO */}
      <section className="bg-gradient-to-b from-primary/5 via-background to-background py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Start your <span className="text-primary">Mental Health Counselor PLLC</span> in New York — the compliant way
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            For Licensed Mental Health Counselors ready to open their own practice.  
            We handle NYSED pre-approval, naming compliance, filing, publishing, and deliver every document you need to start seeing clients — all for{' '}
            <strong>${PRICE}</strong>. No confusion, no hidden fees, and no call centers.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <Badge variant="outline">NYSED Pre-Approval</Badge>
            <Badge variant="outline">Naming Guidance</Badge>
            <Badge variant="outline">Accurate Filing</Badge>
            <Badge variant="outline">Publishing Included</Badge>
            <Badge variant="outline">EIN + Operating Agreement</Badge>
          </div>

          <div className="mt-10 flex justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/order">
                Start your MHC PLLC — ${PRICE}
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

      {/* WHY IT’S DIFFERENT FOR MHCs */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Made for New York MHCs</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Mental Health Counselors in New York have some of the strictest professional formation requirements in the country.
              We’ve helped MHCs across the state set up clean, compliant PLLCs that meet every NYSED and Department of State rule —  
              without the paperwork overwhelm.
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
                We guide you through the pre-approval stage with NYSED’s Office of the Professions, ensuring your
                proposed name, purpose, and ownership meet the state’s exacting standards.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-primary" /> Naming Guidance that Prevents Rejections
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                NYSED enforces very specific naming conventions for MHC PLLCs.  
                We help you avoid restricted terms and ensure your name passes state review on the first try.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck2 className="h-5 w-5 text-primary" /> Clean, Compliant Filing
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                Your Articles of Organization are drafted specifically for MHC practice — with correct purpose language,
                ownership details, and professional designations that meet all NYSED and DOS rules.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="h-5 w-5 text-primary" /> Legal Publishing Included
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                We manage the required six-week, two-newspaper publication process in your county and file your
                Certificate of Publication when done — fully included in the ${PRICE}.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* WHAT YOU RECEIVE */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to open your counseling practice</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From state filings to the paperwork your bank requires — we deliver the complete, compliant package.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Heart className="h-5 w-5 text-primary" /> Full Formation</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                NYSED pre-approval, Articles of Organization, and state filing handled start to finish — no templates or guesswork.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Operating Agreement</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                A signature-ready Operating Agreement tailored for mental health professionals — designed for simplicity and compliance.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Bank-Ready Package</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                EIN confirmation, publication affidavits, filed certificate, and all documents required to open a business bank account.
              </CardContent>
            </Card>
          </div>

          <div className="mt-10">
            <Button size="lg" asChild>
              <Link href="/order">Start your MHC PLLC — ${PRICE}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="bg-muted/40 py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">We understand what it takes to start a counseling practice in NY</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We’ve helped hundreds of mental health professionals form compliant PLLCs — therapists, LCSWs, LMFTs, and MHCs.
            Our job is to make this process simple, predictable, and 100% compliant so you can focus on helping clients, not paperwork.
          </p>
          <p className="mt-6 text-muted-foreground">
            We’re local, responsive, and genuinely care about getting it right.  
            You can email or call anytime — we’ll walk you through the details before you ever pay a dime.
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
