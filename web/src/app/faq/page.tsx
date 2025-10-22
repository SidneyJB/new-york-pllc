/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { FAQ_METADATA } from '@/lib/seo/metadata'
import { PLLC_FAQS, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo/structured-data'

export const metadata = FAQ_METADATA

export default function FAQPage() {
  return (
    <>
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(PLLC_FAQS)),
        }}
      />
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              {
                name: 'FAQ',
                item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://newyorkpllc.com'}/faq`,
              },
            ])
          ),
        }}
      />

      <div className="flex flex-col">
        {/* Breadcrumb Navigation */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb items={[{ label: 'FAQ', href: '/faq' }]} />
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-background via-muted/30 to-muted/50 py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Frequently Asked <span className="text-primary">Questions</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
                Straight answers about forming a New York PLLC — what’s required, how long it takes, and what’s changing.
              </p>
              <div className="mt-10">
                <Button size="lg" asChild>
                  <Link href="/order">Ready to Get Started?</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              {/* PLLC Formation Basics */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">
                  PLLC Formation Basics
                </h2>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">What is a PLLC?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        A Professional Limited Liability Company (PLLC) is a New York LLC formed to provide
                        services that can only be performed by licensed professionals (for example, doctors,
                        lawyers, CPAs, architects, and other Title VIII professions). It offers limited liability
                        protection and is subject to professional licensing oversight in addition to LLC rules.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Who can form a PLLC in New York?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Only licensed professionals may be members/managers of a New York PLLC, and the scope of
                        practice must match the licenses. New York’s Office of the Professions (OP) reviews and
                        issues a Certificate of Authority before you file with the Department of State.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">How is a PLLC different from a regular LLC?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        A regular LLC can be formed for almost any lawful business by any person. A PLLC is limited
                        to licensed professional services, requires OP pre-clearance, has naming/purpose restrictions,
                        and ownership is generally limited to licensees (with specific rules for certain design
                        professions).
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Publishing Requirements */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">
                  Publishing Requirements
                </h2>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Do New York PLLCs still need to publish in newspapers?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Yes. New York’s LLC Law §206 requires newly formed LLCs and PLLCs to publish a notice in
                        two newspapers (one daily, one weekly) designated by the county clerk for six consecutive
                        weeks, then file a Certificate of Publication with the Department of State. A bill has been
                        introduced to eliminate the requirement, but as of now it remains in effect.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">How long does publishing take and what’s the deadline?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        The notices must run for six straight weeks. By law, you must complete publication and file
                        the Certificate of Publication within 120 days after your Articles of Organization become
                        effective. Processing of the certificate by the state can add additional time after filing.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">What happens if I don’t publish?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        If you miss the 120-day deadline, the PLLC’s authority to carry on business in New York is
                        suspended until you cure by publishing and filing the certificate. You can usually fix it
                        later, but it can create issues (e.g., with banking or litigation) until corrected.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Professional License Requirements */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">
                  Professional License Requirements
                </h2>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Do I need a New York license to form a New York PLLC?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Yes. All members/managers must be appropriately licensed for the professional services the
                        PLLC will offer, and OP must issue a Certificate of Authority before filing with the state.
                        If you’re licensed only in another state, you generally must obtain New York licensure first.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Can one PLLC include multiple professions?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        In limited cases. Certain design professions (architecture, engineering, land surveying,
                        geology, landscape architecture) may be combined if you have a licensee for each discipline.
                        Many other professions (e.g., medicine, dentistry, certain mental health professions) may not
                        be combined within a single PLLC.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Pricing & Payment (business policy) */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">
                  Pricing & Payment
                </h2>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">What does your $885 price include?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        NYSED pre approval, Formation filing, EIN, Operating Agreement, the required six-week publication in two newspapers, the Certificate of
                        Publication filing, and status updates. It’s a single, all-inclusive price for New York PLLCs.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Any hidden fees or upsells?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        No. If you ask for optional extras (for example, special expedited state services), we’ll
                        spell out the cost before you decide. Otherwise, the price you see is the price you pay.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Do you offer payment plans?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        We currently collect the full amount up front so we can file immediately and keep timelines
                        tight. If you have questions about budgeting, reach out and we’ll talk it through.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Timeline & Process */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">
                  Timeline & Process
                </h2>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">How long does PLLC formation take?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        The publication itself is six consecutive weeks. Depending on scheduling, affidavits, and state
                        processing for the Certificate of Publication, expect the overall process to span multiple
                        weeks beyond filing. We’ll keep you updated at each milestone.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">When can I start operating as a PLLC?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Once your Articles of Organization are filed and effective, your PLLC exists and you can
                        generally begin operating—subject to professional licensure rules. You must still complete
                        publication within 120 days to avoid a suspension of authority until cured.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">What documents will I receive?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-3">We deliver digital copies of:</p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Filed Articles of Organization</li>
                        <li>Affidavits of Publication (two newspapers)</li>
                        <li>Filed Certificate of Publication</li>
                        <li>Plain-English next steps</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Legal & Compliance (updated items) */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">
                  Legal & Compliance
                </h2>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        New: Does the NY LLC Transparency Act apply to PLLCs?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Yes. Beginning January 1, 2026, New York requires LLCs (including PLLCs) formed or authorized
                        in NY to file beneficial ownership information (or an attestation of exemption) with the NY
                        Department of State. New entities have 30 days after formation/authorization; existing entities
                        have until January 1, 2027. This state requirement is separate from any federal CTA rules.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200 bg-orange-50">
                    <CardHeader>
                      <CardTitle className="text-lg text-orange-800">Important Legal Disclaimer</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-orange-700">
                        <strong>This is not legal or tax advice.</strong> We provide filing and publication services.
                        For advice about your specific situation, consult a New York-licensed attorney or CPA.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Do you provide legal advice?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        No. We’re a filing service. We’ll flag common issues and keep you compliant with process
                        requirements, but we don’t provide legal or tax advice.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Support & Contact */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">
                  Support & Contact
                </h2>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">How do I contact you?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Email us anytime via <Link className="underline underline-offset-2" href="/contact">our contact page</Link>.
                        If you prefer to talk it through, we’re happy to schedule a quick call.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Do you provide ongoing support?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Yes—throughout the process and for 30 days after completion. If you need help later, reach out;
                        we’ll point you in the right direction.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-muted/50 py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Still Have Questions?
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                We’re here to help you navigate New York’s PLLC rules—clearly and without surprises.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button size="lg" asChild>
                  <Link href="/contact">Contact Support</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
