// File: web/src/app/services/page.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  CheckCircle,
  Shield,
  Clock,
  FileText,
  Scale,
  Users,
  Award,
  AlertTriangle,
  ArrowRight,
  Newspaper,
  BadgeCheck
} from 'lucide-react'
import { PRICING, PROFESSIONAL_TYPES, APP_CONFIG } from '@/lib/constants'

export const metadata = {
  title: `Services | ${APP_CONFIG.name}`,
  description:
    'Plain-English, all-inclusive NY PLLC formation for licensed professionals. $' +
    PRICING.basePrice +
    ' with required publication included. Real people in New York, happy to talk you through it.',
}

export default function ServicesPage() {
  const PRICE = PRICING.basePrice

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-complementary/5 py-20 lg:py-32" aria-labelledby="services-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 id="services-hero" className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Complete <span className="text-primary">NY PLLC</span> Formation Services
            </h1>
            <p className="mt-6 mx-auto max-w-2xl text-lg leading-8 text-muted-foreground">
              We form your PLLC the right way and handle New York’s two-newspaper, six-week publication for you.
              Flat <strong className="text-foreground">{'$'}{PRICE}</strong>. No hidden fees. Real people in New York, happy to talk you through every step.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-3">
              <Button size="lg" asChild data-cta="services-start-top">
                <Link href="/order" aria-label={`Start PLLC formation for $${PRICE}`}>
                  Start Formation — {'$'}{PRICE}
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild data-cta="services-pricing-top">
                <Link href="/pricing">See pricing details</Link>
              </Button>
              <Button variant="ghost" size="lg" asChild data-cta="services-contact-top">
                <Link href="/contact" className="underline underline-offset-2">
                  Talk to us first
                </Link>
              </Button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              ~5–7 minutes to complete • Publishing included • Licensed professionals only (PLLC)
            </p>
          </div>
        </div>
      </section>

      {/* What is a PLLC */}
      <section className="py-20 lg:py-32" aria-labelledby="what-is-pllc">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <h2 id="what-is-pllc" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  What is a Professional LLC (PLLC)?
                </h2>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  A PLLC is for New York licensed professionals—doctors, lawyers, CPAs, architects, and others—who
                  want the benefits of an LLC while meeting their profession’s rules. It’s a separate business entity
                  with liability protection, tailored to licensed work in NY.
                </p>

                <div className="mt-8">
                  <h3 className="mb-4 text-lg font-semibold text-foreground">Who can form a PLLC?</h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {PROFESSIONAL_TYPES.slice(0, 6).map((profession) => (
                      <div key={profession} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" aria-hidden="true" />
                        <span className="text-sm">{profession}</span>
                      </div>
                    ))}
                    <Link
                      href="/professions"
                      className="flex items-center gap-2 text-sm underline underline-offset-2"
                      aria-label="View all supported professions"
                    >
                      <CheckCircle className="h-4 w-4 text-primary" aria-hidden="true" />
                      Other licensed professionals
                    </Link>
                  </div>
                </div>
              </div>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" aria-hidden="true" />
                    PLLC Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                      <span><strong>Liability protection:</strong> Personal assets separated from business liabilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                      <span><strong>NY compliance:</strong> Structure tailored for licensed work and ethics rules</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                      <span><strong>Tax flexibility:</strong> Choose how you’re taxed with your advisor</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                      <span><strong>Separate entity:</strong> Easier to work with banks, vendors, and clients</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Included */}
      <section className="bg-muted/30 py-20 lg:py-32" aria-labelledby="services-included">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="services-included" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything included for {'$'}{PRICE}
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We handle the filing and the required publication—end to end. Clear deliverables, clear communication.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" aria-hidden="true" />
                    Formation
                  </CardTitle>
                  <CardDescription>State paperwork done correctly</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                      <span>Articles of Organization (PLLC) prepared & filed with NY</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                      <span>PLLC name & rule checks to reduce rejections</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                      <span>State filing receipt delivered digitally</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                      <span>Operating Agreement template included</span>
                    </li>
                    {/* Keep RA as optional to avoid over-promising */}
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                      <span>Registered Agent (optional add-on if you need it)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Newspaper className="h-5 w-5 text-primary" aria-hidden="true" />
                    Publication (included)
                  </CardTitle>
                  <CardDescription>Six weeks in two NY newspapers</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                      <span>Newspaper selection & scheduling handled for you</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                      <span>Publication runs six consecutive weeks in two papers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                      <span>Affidavits gathered; Certificate of Publication filed with NY</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                      <span>All publication costs included in our price</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BadgeCheck className="h-5 w-5 text-primary" aria-hidden="true" />
                    Delivery & updates
                  </CardTitle>
                  <CardDescription>Documents and next steps, clearly explained</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                      <span>Filed Articles, affidavits, and Certificate of Publication as PDFs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                      <span>Email updates at each milestone—no chasing paperwork</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                      <span>Plain-English next steps after completion</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" aria-hidden="true" />
                    Support from real people
                  </CardTitle>
                  <CardDescription>Ask questions anytime—before or after checkout</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                      <span>Fast, helpful email support from a New York team</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                      <span>We’ll talk you through it if you’d rather speak first</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                      <span>No upsells—just the service you need</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Professional requirements */}
      <section className="py-20 lg:py-32" aria-labelledby="requirements">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 text-center">
              <h2 id="requirements" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Professional license requirements
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                PLLCs are limited to licensed professionals in New York. Here’s what that means in practice:
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-primary" aria-hidden="true" />
                    License verification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-muted-foreground">
                    We confirm license details as part of our process, so filings and publication align with NY rules.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                      <span>License must be active and in good standing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                      <span>We’ll need your license number and issuing authority</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" aria-hidden="true" />
                    Professional standards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-muted-foreground">
                    Activities must align with your licensed profession and any ethical rules your board requires.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                      <span>Business activities limited to licensed services</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                      <span>Professional liability coverage may be required</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-muted/30 py-20 lg:py-32" aria-labelledby="timeline">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 text-center">
              <h2 id="timeline" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Complete formation timeline
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Here’s what happens and when—start to finish.
              </p>
            </div>

            <div className="space-y-8" aria-label="Three-step timeline">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</div>
                    <span>Day 0–1: Formation filing</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-muted-foreground">
                    We prepare and file your Articles of Organization with the NY Department of State.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    <span>Filed within 24 hours of payment</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</div>
                    <span>Weeks 1–6: Newspaper publication</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-muted-foreground">
                    Your formation notice runs in two newspapers for six consecutive weeks, as required by NY law.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <Newspaper className="h-4 w-4" aria-hidden="true" />
                    <span>Mandatory 6-week publication period</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</div>
                    <span>Week 7: Final filing & delivery</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-muted-foreground">
                    We file the Certificate of Publication and deliver your final documents (filed Articles, affidavits, certificate) as PDFs.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                    <span>All documents delivered via email</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-20 lg:py-32" aria-labelledby="why-us">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 text-center">
              <h2 id="why-us" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Why choose us?
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                We keep it simple: clear price, clear steps, and real support from people who do NY PLLC formations every day.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <CardTitle className="mt-4">PLLC specialists</CardTitle>
                  <CardDescription>
                    New York PLLCs are our focus. We know the quirks and publication rules so you don’t have to.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <BadgeCheck className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <CardTitle className="mt-4">All-inclusive price</CardTitle>
                  <CardDescription>
                    Formation and the required publication are included for {'$'}{PRICE}. No surprise add-ons later.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <CardTitle className="mt-4">Real human support</CardTitle>
                  <CardDescription>
                    Have questions? We’ll talk you through it—before, during, or after checkout.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="mt-16 text-center">
              <div className="inline-flex items-center gap-8 rounded-lg border bg-card p-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">0</div>
                  <div className="text-sm text-muted-foreground">Hidden fees</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">&lt;24 hrs</div>
                  <div className="text-sm text-muted-foreground">Initial filing</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Clear communication</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal disclaimer */}
      <section className="border-t py-12" aria-labelledby="legal-disclaimer">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-orange-800">
                  <AlertTriangle className="h-5 w-5 text-orange-600" aria-hidden="true" />
                  <span id="legal-disclaimer">Important legal disclaimer</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-700 text-sm leading-relaxed">
                  <strong>This is not legal advice.</strong> We provide administrative filing and publication services for PLLC formation in New York.
                  Requirements vary by profession and situation. For legal advice about structure, liability, or tax treatment, consult a licensed attorney.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-50/50 py-20 lg:py-32" aria-labelledby="services-cta">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="services-cta" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to form your PLLC?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Start now for {'$'}{PRICE}. Publication included. Real people, clear pricing.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle className="h-4 w-4" aria-hidden="true" />
                <span>NY state compliant</span>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle className="h-4 w-4" aria-hidden="true" />
                <span>Licensed professional focus</span>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle className="h-4 w-4" aria-hidden="true" />
                <span>Plain-English updates</span>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-center gap-x-3">
              <Button size="lg" asChild data-cta="services-start-bottom">
                <Link href="/order" aria-label={`Start PLLC formation for $${PRICE}`}>
                  Start Formation — {'$'}{PRICE}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild data-cta="services-contact-bottom">
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
