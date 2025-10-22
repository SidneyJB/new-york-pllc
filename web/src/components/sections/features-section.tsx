import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { DollarSign, Shield, CheckCircle2, Info } from 'lucide-react'
import Link from 'next/link'
import { PRICING, PROFESSIONAL_TYPES } from '@/lib/constants'

export function FeaturesSection() {
  return (
    <section className="py-8 max-w-12xl o" aria-labelledby="features-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <div className="mx-auto max-w-10xl text-center">
          <h2 id="features-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to form your NY PLLC — one flat price
          </h2>

          {/* Trust pills under headline */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
              Publishing included
            </span>
            <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
              No hidden fees
            </span>
            <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
              NY-specific guidance
            </span>
          </div>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We handle filing and New York’s two-newspaper, six-week publication end-to-end.
            Flat <strong className="text-foreground">{'$'}{PRICING.basePrice}</strong> — start to finish.
          </p>
        </div>

        {/* Cards */}
        <div className="mx-auto mt-16 max-w-8xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {/* Pricing Proof + What's Included */}
            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <DollarSign className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <span>All-inclusive pricing</span>
                </CardTitle>
                <CardDescription>
                  {'$'}{PRICING.basePrice} covers formation <em>and</em> publication.
                  Many competitors add $500–$1000 for publishing. And most, like LegalZoom, don't even offer PLLC formation.
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Compact comparison */}
                <div className="space-y-3" aria-label="Price comparison">
                  <div className="flex items-center justify-between rounded-lg border px-3 py-2">
                    <span className="text-sm font-medium">Our service</span>
                    <span className="text-xl font-bold">{'$'}{PRICING.basePrice}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Competitors (incl. publishing)</span>
                    <span className="line-through">$1,385–$1,885</span>
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-muted px-3 py-2">
                    <span className="text-sm font-medium">You save</span>
                    <span className="font-bold">$500–$1,000</span>
                  </div>

                  <p className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Info className="mt-0.5 h-4 w-4" aria-hidden="true" />
                    Savings estimate based on typical NY publishing add-ons. Actual competitor pricing varies.
                  </p>
                </div>

                {/* What's included (NY-accurate language) */}
                {/* <div className="mt-6" id="included">
                  <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">What’s included</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                      <span>Articles of Organization (PLLC) prepared & filed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                      <span>Two newspapers × 6 weeks (publication managed)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                      <span>Certificate of Publication filing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                      <span>State filing receipt & affidavits delivered as PDFs</span>
                    </li>
                  </ul>
                </div> */}
              </CardContent>

              {/* Inline CTA to reduce bounce */}
              <CardFooter className="pt-2">
                <Button asChild className="w-full" data-cta="features-start">
                  <Link href="/order" aria-label={`Start PLLC formation for $${PRICING.basePrice}`}>
                    Get started today
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Who it's for + Confidence to proceed */}
            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <span>Built for licensed professionals</span>
                </CardTitle>
                <CardDescription>
                  Purpose-built for New York PLLCs with guided name & license checks to reduce rejections.
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Top professions as badges */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {PROFESSIONAL_TYPES.slice(0, 8).map((profession) => (
                    <span
                      key={profession}
                      className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                    >
                      {profession}
                    </span>
                  ))}
                </div>

                {/* Professions Accordion for the rest */}
                <div className="mb-4">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="professions">
                      <AccordionTrigger className="text-sm font-medium text-muted-foreground hover:text-foreground">
                        View {PROFESSIONAL_TYPES.length - 8} more professions
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                          {PROFESSIONAL_TYPES.slice(8).map((profession) => (
                            <div
                              key={profession}
                              className="text-xs text-muted-foreground p-2 rounded-md bg-muted/50"
                            >
                              {profession}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* Confidence bullets (distinct from left card) */}
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                    <span>We flag name conflicts & PLLC rules early</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                    <span>Email updates at each milestone—no chasing paperwork</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                    <span>Secure checkout • Humans available if you get stuck</span>
                  </li>
                </ul>

                {/* Micro-FAQ hook */}
                <div className="mt-4 text-xs text-muted-foreground">
                  <Link href="/faq#publication" className="underline underline-offset-2 hover:text-foreground">
                    Questions? See our FAQ
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
