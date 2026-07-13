// File: web/src/components/sections/hero-section.tsx
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { BUSINESS_INFO, PRICING } from '@/lib/constants'
import { ArrowRight, ClipboardList, BadgeCheck, ShieldCheck, Star } from 'lucide-react'
import { TrackedCTAButton } from '@/components/analytics/tracked-cta'

export function HeroSection() {
  return (
    <section className="relative py-8 lg:py-16" aria-labelledby="hero-heading">
      {/* subtle background wash */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2/3 — 1/3 layout */}
        <div className="grid items-start gap-6 lg:grid-cols-3">
          {/* LEFT (2/3): promise + price + CTAs */}
          <div className="lg:col-span-2">
            {/* Flex order: on mobile, trust + CTA sit above the long Includes list */}
            <div className="flex max-w-2xl flex-col gap-3 sm:gap-4 lg:gap-5">
              <p className="order-1 text-sm font-medium uppercase tracking-wide text-primary/90">
                One service. Everything included.
              </p>

              <h1
                id="hero-heading"
                className="order-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-6xl"
              >
                The{' '}
                <span className="rounded-lg bg-primary/10 px-2 py-1 text-primary">New York PLLC</span>{' '}
                experts with 20+ years of experience.
              </h1>

              <p className="order-3 text-base leading-7 text-foreground sm:text-xl sm:leading-8">
                We navigate the complicated New York PLLC formation process. No one sets up more PLLCs
                in New York than we do. Flat{' '}
                <strong className="text-foreground">${PRICING.basePrice}</strong> all-inclusive. No
                surprise fees.
              </p>

              {/* Mobile trust band (§5.1) — first viewport, before Includes */}
              <ul
                className="order-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-foreground md:hidden"
                aria-label="Trust signals"
                data-testid="mobile-hero-trust-band"
              >
                <li>
                  <Link
                    href={BUSINESS_INFO.googleBusinessProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-foreground underline-offset-2 hover:underline"
                  >
                    <Star className="size-3.5 fill-primary text-primary" aria-hidden="true" />
                    {BUSINESS_INFO.googleReviews.ratingValue.toFixed(1)} on Google
                  </Link>
                </li>
                <li className="text-muted-foreground" aria-hidden="true">
                  ·
                </li>
                <li className="font-medium">Thousands formed</li>
                <li className="text-muted-foreground" aria-hidden="true">
                  ·
                </li>
                <li className="font-medium">${PRICING.basePrice} flat</li>
              </ul>

              <div className="order-5 w-full sm:w-auto">
                <TrackedCTAButton
                  href="/order"
                  cta="start-now"
                  location="hero"
                  size="lg"
                  className="h-12 w-full px-8 text-base font-semibold sm:w-auto sm:min-w-[18rem]"
                >
                  Start your PLLC — ${PRICING.basePrice}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </TrackedCTAButton>
              </div>

              {/* Includes — after CTA on mobile; before CTA on desktop */}
              <div className="order-6 md:order-4">
                <div className="mb-0 flex items-center gap-2">
                  <span className="text-sm font-medium">Includes:</span>
                </div>
                <ul className="grid grid-cols-1 gap-0.5 text-sm text-foreground">
                  <li className="flex items-start gap-2">
                    <BadgeCheck className="mt-0.5 h-3 w-3 flex-shrink-0 text-primary" aria-hidden="true" />
                    <span>New York State Education Department (NYSED) pre-approval</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BadgeCheck className="mt-0.5 h-3 w-3 flex-shrink-0 text-primary" aria-hidden="true" />
                    <span>Expert guidance for New York&apos;s strict naming requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BadgeCheck className="mt-0.5 h-3 w-3 flex-shrink-0 text-primary" aria-hidden="true" />
                    <span>Accurate and efficient filing to minimize processing time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BadgeCheck className="mt-0.5 h-3 w-3 flex-shrink-0 text-primary" aria-hidden="true" />
                    <span>
                      Everything you need to open your practice (EIN, Operating Agreement, Required
                      Legal Publishing end-to-end)
                    </span>
                  </li>
                  <li className="mt-2 flex items-center gap-2 rounded-md border border-primary/20 bg-primary/5 px-2 py-1">
                    <ShieldCheck className="h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                    <span className="text-base font-semibold">
                      Every single state filing fee, publishing fee, and processing cost is fully
                      included in our flat price. Absolutely no hidden charges
                    </span>
                  </li>
                </ul>
              </div>

              <p className="order-7 text-sm text-muted-foreground md:order-6">
                ~3–5 minutes to complete • Licensed professionals only (PLLC) • No hidden fees
              </p>
              <p className="order-8 mt-2 text-sm text-muted-foreground md:order-7">
                Already have a PLLC?{' '}
                <Link
                  href="/foreign-pllc"
                  className="text-primary underline underline-offset-2 hover:text-primary/80"
                >
                  We can help qualify it for New York →
                </Link>
              </p>
            </div>
          </div>

          {/* RIGHT (1/3): sticky process + what's included (no price duplication) */}
          <aside className="lg:sticky lg:top-24 lg:col-span-1">
            <Card className="border-primary/10 shadow-sm">
              <CardContent className="p-6 sm:p-7">
                <span className="mb-3 text-xl font-medium">
                  We&apos;ve formed <strong>thousands</strong> of PLLCs since 2005
                </span>
                <div className="mb-3 mt-3 flex items-center gap-2">
                  <ClipboardList className="mt-0.5 h-8 w-7 flex-shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-lg font-medium">Here&apos;s what you get with our expertise:</span>
                </div>
                <div className="my-6 h-px w-full bg-border/70" />

                <div>
                  <ul className="grid grid-cols-1 gap-2 text-lg text-foreground">
                    <li className="flex items-center gap-2">
                      <BadgeCheck className="mt-0.5 h-3 w-3 flex-shrink-0 text-primary" aria-hidden="true" />
                      <span>Pre-approval of filing package</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <BadgeCheck className="mt-0.5 h-3 w-3 flex-shrink-0 text-primary" aria-hidden="true" />
                      <span>PLLC Articles of Organization prepared & filed</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <BadgeCheck className="mt-0.5 h-3 w-3 flex-shrink-0 text-primary" aria-hidden="true" />
                      <span>Federal Tax ID Number</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <BadgeCheck className="mt-0.5 h-3 w-3 flex-shrink-0 text-primary" aria-hidden="true" />
                      <span>Free first year registered agent service</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <BadgeCheck className="mt-0.5 h-3 w-3 flex-shrink-0 text-primary" aria-hidden="true" />
                      <span>Signature-ready Operating Agreement</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <BadgeCheck className="mt-0.5 h-3 w-3 flex-shrink-0 text-primary" aria-hidden="true" />
                      <span>Entire legal publishing process, start to finish</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <BadgeCheck className="mt-0.5 h-3 w-3 flex-shrink-0 text-primary" aria-hidden="true" />
                      <span>Email updates at each milestone</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <BadgeCheck className="mt-0.5 h-3 w-3 flex-shrink-0 text-primary" aria-hidden="true" />
                      <span>
                        Delivery of all documents required to open a bank account and start doing
                        business
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6">
                  <TrackedCTAButton
                    href="/order"
                    cta="begin-order-secondary"
                    location="hero-sidebar"
                    className="w-full"
                  >
                    Begin your order
                  </TrackedCTAButton>
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
