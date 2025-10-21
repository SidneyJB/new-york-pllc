// File: web/src/components/sections/hero-section.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PRICING } from '@/lib/constants'
import { ArrowRight, ClipboardList, Newspaper, FileCheck2, BadgeCheck } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative py-16 lg:py-24" aria-labelledby="hero-heading">
      {/* subtle background wash */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2/3 — 1/3 layout */}
        <div className="grid items-start gap-10 lg:grid-cols-3">
          {/* LEFT (2/3): promise + price + CTAs */}
          <div className="lg:col-span-2">
            <div className="flex max-w-2xl flex-col gap-6 sm:gap-8 lg:gap-12">
              {/* Eyebrow */}
              <p className="text-sm font-medium uppercase tracking-wide text-primary/90">
                New York PLLC Formation
              </p>

              <h1 id="hero-heading" className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                Form your <span className="rounded-lg bg-primary/10 px-2 py-1 text-primary">NY PLLC</span>—we handle the required publication
              </h1>

              <p className="text-lg leading-8 text-muted-foreground">
                We prepare and file your Professional LLC and manage New York’s two-newspaper, six-week publication—end to end.
                Flat{' '}
                <strong className="text-foreground">
                  {'$'}{PRICING.basePrice}
                </strong>{' '}
                all-inclusive. No surprise fees.
              </p>

              {/* NEW: plain-English sales language to match About tone */}
              <p className="text-base leading-7 text-muted-foreground">
                We’re a small New York team offering unnmatched customer service, and we’re happy to talk you through every step.
                We’re real people—no upsells, no runaround. Prefer to chat first?{' '}
                <Link href="/contact" className="underline underline-offset-2">
                  Contact us
                </Link>
                .
              </p>

              {/* Trust cues */}
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-primary" aria-hidden="true" />
                  Publishing included
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-primary" aria-hidden="true" />
                  Secure checkout
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-primary" aria-hidden="true" />
                  Real people in New York
                </li>
              </ul>

              <div className="flex flex-wrap items-center gap-3">
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
                {/* Simple process */}
                <div>
                  <div className="text-sm uppercase tracking-wide text-muted-foreground">Simple 3-step process</div>
                  <ol className="mt-3 space-y-4">
                    <li className="flex gap-3">
                      <ClipboardList className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                      <div>
                        <div className="font-medium">Tell us about your practice</div>
                        <p className="text-sm text-muted-foreground">
                          Choose your profession, confirm license details, and your PLLC name.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <Newspaper className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                      <div>
                        <div className="font-medium">We file & publish for you</div>
                        <p className="text-sm text-muted-foreground">
                          Articles of Organization and two-newspaper, six-week publication—managed end-to-end.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <FileCheck2 className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                      <div>
                        <div className="font-medium">Receive your final documents</div>
                        <p className="text-sm text-muted-foreground">
                          State filing receipt and publication affidavits, plus clear next steps.
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>

                {/* Divider */}
                <div className="my-6 h-px w-full bg-border/70" />

                {/* What's included */}
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <BadgeCheck className="h-5 w-5 text-primary" aria-hidden="true" />
                    <span className="text-sm font-medium">What you get</span>
                  </div>
                  <ul className="grid grid-cols-1 gap-2 text-sm text-foreground">
                    <li>PLLC Articles of Organization prepared & filed</li>
                    <li>Two-newspaper, six-week publication managed</li>
                    <li>Affidavits filed; state receipt delivered</li>
                    <li>Email updates at each milestone</li>
                    <li>Guidance tailored to NY PLLCs</li>
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
