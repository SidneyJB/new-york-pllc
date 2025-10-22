// File: web/src/components/sections/hero-section.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PRICING } from '@/lib/constants'
import { ArrowRight, ClipboardList, Newspaper, FileCheck2, BadgeCheck } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative py-8 lg:py-24" aria-labelledby="hero-heading">
      {/* subtle background wash */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2/3 — 1/3 layout */}
        <div className="grid items-start gap-6 lg:grid-cols-3">
          {/* LEFT (2/3): promise + price + CTAs */}
          <div className="lg:col-span-2">
            <div className="flex max-w-2xl flex-col gap-3 sm:gap-4 lg:gap-5">
              {/* Eyebrow */}
              <p className="text-sm font-medium uppercase tracking-wide text-primary/90">
                Metro Corporate Services
              </p>

              <h1 id="hero-heading" className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              The <span className="rounded-lg bg-primary/10 px-2 py-1 text-primary">New York PLLC</span> experts with 20+ years of experience.
              </h1>

              <p className="text-xl leading-8 text-foreground">
                We navigate the complicated New York PLLC formation process. No one sets up more PLLCs in New York than we do.
                Flat{' '}
                <strong className="text-foreground">
                  {'$'}{PRICING.basePrice}
                </strong>{' '}
                all-inclusive. No surprise fees.
              </p>

              {/* NEW: plain-English sales language to match About tone */}
              {/* <p className="text-base leading-7 text-foreground">
                We’re a small New York team offering unnmatched customer service, and we’re happy to talk you through every step.
                We’re real people—no upsells, no runaround. Prefer to chat first?{' '}
                <Link href="/contact" className="underline underline-offset-2">
                  Contact us
                </Link>
                .
              </p> */}

              {/* Includes list with checkmarks */}
              <div className="mt-0">
                <div className="mb-0 flex items-center gap-2">
                  <span className="text-sm font-medium">Includes:</span>
                </div>
                <ul className="grid grid-cols-1 gap-0.5 text-sm text-foreground">
                  <li className="flex items-start gap-2">
                    <BadgeCheck className="mt-0.5 h-3 w-3 text-primary flex-shrink-0" aria-hidden="true" />
                    <span>New York State Education Department (NYSED) pre-approval</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BadgeCheck className="mt-0.5 h-3 w-3 text-primary flex-shrink-0" aria-hidden="true" />
                    <span>Expert guidance for New York's strict naming requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BadgeCheck className="mt-0.5 h-3 w-3 text-primary flex-shrink-0" aria-hidden="true" />
                    <span>Accurate and efficient filing to minimize processing time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BadgeCheck className="mt-0.5 h-3 w-3 text-primary flex-shrink-0" aria-hidden="true" />
                    <span>Everything you need to open your practice (EIN, Operating Agreement, Required Legal Publishing end-to-end)</span>
                  </li>
                </ul>
              </div>

              <div className="mt-0 flex flex-wrap items-center gap-1">
                <Button size="lg" asChild data-cta="start-now">
                  <Link
                    href="/order"
                    aria-label={`Start PLLC formation for $${PRICING.basePrice}`}
                  >
                    Start your PLLC — {'$'}{PRICING.basePrice}
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>

                <Button variant="outline" size="lg" asChild data-cta="learn-more">
                  <Link href="#how-it-works" aria-label="See how it works step by step">
                    How it works
                  </Link>
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                ~5–7 minutes to complete • Licensed professionals only (PLLC) • No hidden fees
              </p>
            </div>
          </div>

          {/* RIGHT (1/3): sticky process + what's included (no price duplication) */}
          <aside className="lg:col-span-1 lg:sticky lg:top-24" id="how-it-works">
            <Card className="border-primary/10 shadow-sm">
              <CardContent className="p-6 sm:p-7">
              <span className="text-xl font-medium mb-3">We've formed <strong>thousands</strong> of PLLCs</span>
              <div className="mt-3 mb-3 flex items-center gap-2">
                
                <ClipboardList className="mt-0.5 h-8 w-7 text-primary flex-shrink-0" aria-hidden="true" />
                <span className="text-lg font-medium">Here's what you get with our expertise:</span>
              </div>
                {/* Divider */}
                <div className="my-6 h-px w-full bg-border/70" />

                {/* What's included */}
                <div>
                  <ul className="grid grid-cols-1 gap-2 text-lg text-foreground">
                    <div className="flex items-center gap-2">
                      <BadgeCheck className="mt-0.5 h-3 w-3 text-primary flex-shrink-0" aria-hidden="true" />
                      <span>Pre-approval of filing package</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BadgeCheck className="mt-0.5 h-3 w-3 text-primary flex-shrink-0" aria-hidden="true" />
                      <span>PLLC Articles of Organization prepared & filed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BadgeCheck className="mt-0.5 h-3 w-3 text-primary flex-shrink-0" aria-hidden="true" />
                      <span>Federal Tax ID Number</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BadgeCheck className="mt-0.5 h-3 w-3 text-primary flex-shrink-0" aria-hidden="true" />
                      <span>Free first year registered agent service</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BadgeCheck className="mt-0.5 h-3 w-3 text-primary flex-shrink-0" aria-hidden="true" />
                      <span>Signature-ready Operating Agreement</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BadgeCheck className="mt-0.5 h-3 w-3 text-primary flex-shrink-0" aria-hidden="true" />
                      <span>Entire legal publishing process, start to finish</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BadgeCheck className="mt-0.5 h-3 w-3 text-primary flex-shrink-0" aria-hidden="true" />
                      <span>Email updates at each milestone</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BadgeCheck className="mt-0.5 h-3 w-3 text-primary flex-shrink-0" aria-hidden="true" />
                      <span>Delivery of all documents required to open a bank account and start doing business</span>
                    </div>
                  </ul>
                </div>

                <div className="mt-6">
                  <Button className="w-full" asChild data-cta="begin-order-secondary">
                    <Link href="/order" aria-label={`Begin your PLLC order for $${PRICING.basePrice}`}>
                      Begin your order
                    </Link>
                  </Button>
                </div>

                <p className="mt-3 text-center text-xs leading-6 text-muted-foreground">
                  We are not a law firm and do not provide legal advice.
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </section>
  )
}
