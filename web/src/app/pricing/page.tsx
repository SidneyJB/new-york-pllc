 
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PRICING, PROFESSIONAL_TYPES } from '@/lib/constants'

export default function PricingPage() {
  const PRICE = PRICING.basePrice

  return (
    <div className="flex flex-col">
      {/* Top: Transparent headline + price lock bar */}
      <section className="py-16 lg:py-24" aria-labelledby="pricing-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 id="pricing-hero" className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Transparent, all-in pricing for New York PLLCs
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              The price is <strong>{'$'}{PRICE}</strong>. It includes the required two-newspaper, six-week publication and our filing work.
              No add-ons, no surprises. We’re real people in New York—happy to talk you through anything before you pay.
            </p>

            <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full border px-3 py-1">Publishing included</span>
              <span className="rounded-full border px-3 py-1">Licensed professionals only (PLLC)</span>
              <span className="rounded-full border px-3 py-1">Secure checkout</span>
            </div>

            <div className="mt-10 flex items-center justify-center gap-3">
              <Button size="lg" asChild data-cta="pricing-start">
                <Link href="/order" aria-label={`Start PLLC formation for $${PRICE}`}>
                  Start Formation — {'$'}{PRICE}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild data-cta="pricing-contact">
                <Link href="/contact">Have questions? Talk to us</Link>
              </Button>
            </div>

            <p className="mt-3 text-sm text-muted-foreground">
              ~5–7 minutes to complete • We’ll keep you updated at each step • No hidden fees
            </p>
          </div>
        </div>
      </section>

      {/* What’s Included */}
      <section className="py-16 lg:py-24" aria-labelledby="included-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="included-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Exactly what you get for {'$'}{PRICE}
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We handle the paperwork and the publication end-to-end. Clear deliverables, clear timeline.
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-4xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Formation</CardTitle>
                  <CardDescription>We file the core state paperwork</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Articles of Organization (PLLC) prepared & filed</li>
                    <li>• Basic name check and PLLC-specific rule review</li>
                    <li>• State filing receipt delivered digitally</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Publication (included)</CardTitle>
                  <CardDescription>Six weeks in two NY newspapers, per law</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Newspaper selection & scheduling</li>
                    <li>• Six-week run across two required publications</li>
                    <li>• Affidavits obtained; Certificate of Publication filed</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Updates & delivery</CardTitle>
                  <CardDescription>Real people, clear communication</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Email updates at each milestone</li>
                    <li>• Final documents delivered as PDFs</li>
                    <li>• Straightforward next-step guidance</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Who it’s for</CardTitle>
                  <CardDescription>New York licensed professionals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {PROFESSIONAL_TYPES.slice(0, 6).map((type) => (
                      <span
                        key={type}
                        className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        {type}
                      </span>
                    ))}
                    {PROFESSIONAL_TYPES.length > 6 && (
                      <Link
                        href="/professions"
                        className="inline-flex items-center rounded-md border px-2 py-1 text-xs underline underline-offset-2"
                        aria-label="View all supported professions"
                      >
                        +{PROFESSIONAL_TYPES.length - 6} more
                      </Link>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    PLLCs are restricted to licensed professionals. We’ll confirm your license details as part of the process.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Clear comparison (no gimmicks) */}
      <section className="bg-muted/50 py-16 lg:py-24" aria-labelledby="comparison-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="comparison-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How our pricing compares
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Many services show a low “formation” price, then add hundreds for the legally required publication.
              We include publication up front.
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <Card className="opacity-70">
                <CardHeader>
                  <CardTitle>“Low fee” sites</CardTitle>
                  <CardDescription>Looks cheap until publishing</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Formation: $0–$199</li>
                    <li>• Publishing add-on: $500–$1,000+</li>
                    <li>• Extras & service fees vary</li>
                  </ul>
                  <div className="mt-4 text-sm text-muted-foreground">Typical total: $599–$1,199+</div>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary">
                <CardHeader>
                  <CardTitle>Us</CardTitle>
                  <CardDescription>Complete, all-in price</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 text-3xl font-bold text-primary">{'$'}{PRICE}</div>
                  <ul className="space-y-2 text-sm">
                    <li>• Formation filing included</li>
                    <li>• Six-week, two-paper publication included</li>
                    <li>• Certificate of Publication filing included</li>
                    <li className="font-medium">• Total due today: {'$'}{PRICE}</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="opacity-70">
                <CardHeader>
                  <CardTitle>Attorney/CPA</CardTitle>
                  <CardDescription>Great for custom legal advice</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Customized legal guidance</li>
                    <li>• Bespoke documents</li>
                  </ul>
                  <div className="mt-4 text-sm text-muted-foreground">Typical total: $1,500+</div>
                </CardContent>
              </Card>
            </div>

            <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-muted-foreground">
              Pricing ranges are illustrative and depend on the provider and county/newspapers. We keep it simple with one price that includes publication.
            </p>
          </div>
        </div>
      </section>

      {/* Plain-English notes (what’s optional / not included) */}
      <section className="py-16 lg:py-24" aria-labelledby="notes-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 id="notes-heading" className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              A few plain-English notes
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-foreground">
              <p>
                We focus on PLLC formation and the legally required publication. If you need an EIN, registered agent, or amendments later,
                we can point you in the right direction or help as an add-on. None of those are required for us to complete the publication step.
              </p>
              <p>
                Timelines vary by county and paper schedules. Expect filing to start right away, publication to run weeks 1–6, and final
                Certificate of Publication in week 7 in most cases.
              </p>
              <p>
                Prefer to talk to a human before you check out? We’re happy to walk you through the process.{' '}
                <Link href="/contact" className="underline underline-offset-2">Contact us</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing FAQ (focused on objections) */}
      <section className="bg-muted/50 py-16 lg:py-24" aria-labelledby="faq-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="faq-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Pricing FAQ
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Straight answers to the most common questions.
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-3xl space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is {'$'}{PRICE} really the final price?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes. Formation filing + the full six-week, two-paper publication + Certificate of Publication filing are included.
                  There are no publishing add-ons later.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How long does it take?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We start filing right away. Publication runs for six weeks by law. Most customers see their Certificate of Publication in week 7,
                  depending on county and newspaper schedules.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you offer payment plans?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We currently charge in full at checkout so we can begin immediately and cover publication. If you need a different arrangement,
                  reach out and we’ll see what we can do.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What if my name is taken or the PLLC rules block it?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We flag common conflicts early and work with you on alternatives before we publish. If something unexpected comes up,
                  we’ll talk it through and make a plan together.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24" aria-labelledby="cta-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="cta-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to form your PLLC?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Start now for {'$'}{PRICE}. Real people, clear pricing, publication included.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Button size="lg" asChild data-cta="pricing-start-bottom">
                <Link href="/order" aria-label={`Start PLLC formation for $${PRICE}`}>
                  Start Formation — {'$'}{PRICE}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild data-cta="pricing-contact-bottom">
                <Link href="/contact">Talk to us first</Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              We are not a law firm and do not provide legal advice.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
