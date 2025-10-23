/* eslint-disable react/no-unescaped-entities */
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
  title: `Form a New York LCSW PLLC | ${APP_CONFIG?.name || 'New York PLLC'}`,
  description: `Form your LCSW PLLC in New York for a flat $${PRICING.basePrice}. We help Licensed Clinical Social Workers get NYSED pre-approval, choose compliant names, file correctly, complete publishing, and get every document needed to open a therapy practice.`,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL || 'https://newyorkpllc.com'}/professions/lcsw`,
  },
}

export default function LCSWPage() {
  const PRICE = PRICING.basePrice

  return (
    <>
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: 'LCSW', item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://newyorkpllc.com'}/professions/lcsw` }
          ])),
        }}
      />
      <div className="flex flex-col">
        {/* Breadcrumb Navigation */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb
              items={[
                { label: 'LCSW', href: '/professions/lcsw' }
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
            Built specifically for Licensed Clinical Social Workers. We help you navigate NYSED pre-approval, choose a compliant
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
                We’ll help you pick a name that fits NYSED’s strict standards (for example, avoiding words like “center” or “clinic” without approval).  
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
                We coordinate the full six-week publication, collect affidavits, and file the Certificate of Publication.  
                It’s all included in the ${PRICE} — no surprises later.
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
