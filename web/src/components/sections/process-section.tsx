import Link from 'next/link'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ClipboardList, Newspaper, FileCheck2, CalendarDays, ArrowRight } from 'lucide-react'
import { PRICING } from '@/lib/constants'

export function ProcessSection() {
  return (
    <section className="py-20 lg:py-32" aria-labelledby="process-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="process-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Simple, compliant 3-step process
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Typical timeline: <strong>File today</strong> • <strong>Publish weeks 1–6</strong> • <strong>Final filing week 7</strong>
          </p>

          {/* Visual timeline */}
          <div className="mx-auto mt-6 max-w-xl" aria-label="Approximate 7-week timeline">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="h-4 w-4" aria-hidden="true" /> Day 0
              </span>
              <span>Weeks 1–6</span>
              <span>Week 7</span>
            </div>
            <div className="mt-2 flex h-2 w-full overflow-hidden rounded-full bg-muted">
              <span className="h-full w-[8.5%] bg-primary/70" aria-hidden="true" /> {/* ~1/12 */}
              <span className="h-full w-[83%] bg-primary/30" aria-hidden="true" />
              <span className="h-full w-[8.5%] bg-primary/70" aria-hidden="true" />
            </div>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Publication length is set by NY law.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="mx-auto mt-16 max-w-5xl">
          <ol className="grid grid-cols-1 gap-8 md:grid-cols-3" aria-label="Three steps to form your NY PLLC">
            <li>
              <Card className="h-full text-center">
                <CardHeader>
                  <div
                    className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"
                    aria-label="Step 1"
                  >
                    1
                  </div>
                  <CardTitle className="mt-4">Submit your details</CardTitle>
                  <CardDescription className="mt-2">
                    Tell us about your practice, confirm license info, and choose a PLLC name.
                    We flag name conflicts & PLLC-specific rules early.
                  </CardDescription>
                  <div className="mt-4 inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                    <ClipboardList className="mr-1 h-3.5 w-3.5" aria-hidden="true" /> ~5–7 minutes
                  </div>
                </CardHeader>
              </Card>
            </li>

            <li>
              <Card className="h-full text-center">
                <CardHeader>
                  <div
                    className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"
                    aria-label="Step 2"
                  >
                    2
                  </div>
                  <CardTitle className="mt-4">We file & publish</CardTitle>
                  <CardDescription className="mt-2">
                    We prepare and file your <strong>Articles of Organization (PLLC)</strong>,
                    then manage the <strong>two-newspaper, six-week publication</strong> end-to-end.
                  </CardDescription>
                  <div className="mt-4 inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                    <Newspaper className="mr-1 h-3.5 w-3.5" aria-hidden="true" /> Weeks 1–6
                  </div>
                </CardHeader>
              </Card>
            </li>

            <li>
              <Card className="h-full text-center">
                <CardHeader>
                  <div
                    className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"
                    aria-label="Step 3"
                  >
                    3
                  </div>
                  <CardTitle className="mt-4">Receive your documents</CardTitle>
                  <CardDescription className="mt-2">
                    We file the <strong>Certificate of Publication</strong> with the state and deliver
                    your filing receipt & publication affidavits digitally with clear next steps.
                  </CardDescription>
                  <div className="mt-4 inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                    <FileCheck2 className="mr-1 h-3.5 w-3.5" aria-hidden="true" /> Week 7
                  </div>
                </CardHeader>
              </Card>
            </li>
          </ol>

          {/* Inline CTA + objection handler */}
          <div className="mt-12 text-center">
            <Button size="lg" asChild data-cta="process-start">
              <Link href="/order" aria-label={`Start PLLC formation for $${PRICING.basePrice}`}>
                Start Formation — {'$'}{PRICING.basePrice}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">
              No hidden fees • Secure checkout • Humans available if you need help ·{' '}
              <Link href="/faq#publication" className="underline underline-offset-2 hover:text-foreground">
                Why does NY require publication?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
