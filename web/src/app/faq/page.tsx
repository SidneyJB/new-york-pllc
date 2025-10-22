import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function FAQPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background via-muted/30 to-muted/50 py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Frequently Asked{' '}
              <span className="text-primary">Questions</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about forming your New York PLLC, including publishing requirements, professional licenses, and our streamlined process.
            </p>
            <div className="mt-10">
              <Button size="lg" asChild>
                <Link href="/order">
                  Ready to Get Started?
                </Link>
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
                      A Professional Limited Liability Company (PLLC) is a business structure designed specifically for licensed professionals in New York. It provides personal liability protection while allowing professionals to practice their licensed services. PLLCs are restricted to licensed professionals like doctors, lawyers, accountants, architects, and engineers.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Who can form a PLLC in New York?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">
                      PLLCs are limited to licensed professionals including:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Physicians (MD/DO)</li>
                      <li>Dentists (DDS/DMD)</li>
                      <li>Attorneys/Lawyers</li>
                      <li>Certified Public Accountants (CPAs)</li>
                      <li>Architects</li>
                      <li>Engineers</li>
                      <li>Veterinarians</li>
                      <li>Other licensed professionals as defined by NY law</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What's the difference between an LLC and PLLC?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      While both provide liability protection, PLLCs are specifically for licensed professionals and have additional regulatory requirements. Regular LLCs can be formed by anyone for any business purpose, while PLLCs require professional licenses and are subject to oversight by state licensing boards.
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
                    <CardTitle className="text-lg">What is the publishing requirement for NY PLLCs?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      New York law requires all PLLCs to publish their formation notice in two newspapers (one daily and one weekly) for six consecutive weeks. This publication must run in newspapers designated by the county where the PLLC's office is located. After publication, an affidavit of publication must be filed with the New York Department of State.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Why is publishing required?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      The publishing requirement provides public notice of new professional practices and helps maintain transparency in professional services. It's a legal requirement that helps protect consumers by making PLLC formations publicly known.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How long does the publishing process take?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      The publication process takes exactly 6 weeks as required by law. We coordinate with newspapers in your county to ensure the notices run consecutively. The total timeline from filing to completion is typically 7-8 weeks, including processing time.
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
                    <CardTitle className="text-lg">Do I need a professional license to form a PLLC?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes, all PLLC members must hold valid professional licenses in their respective fields. We verify your license status as part of our formation service to ensure compliance with New York regulations.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What if I'm licensed in another state?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      You must be licensed to practice in New York to form a NY PLLC. If you're licensed in another state but plan to practice in New York, you'll need to obtain New York licensure first. We can guide you on this process but cannot complete formation without valid NY licenses.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Can multiple professionals from different fields form one PLLC?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Generally, no. PLLCs are typically limited to professionals in the same field due to licensing board regulations. If you have multiple professionals from different fields, you may need separate PLLCs or consider a different business structure.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Pricing & Payment */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">
                Pricing & Payment
              </h2>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Why is your service $885?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Our $885 price includes everything: Articles of Organization filing, 6-week newspaper publication in two newspapers, Certificate of Publication filing, and all required affidavits. Many competitors charge $99 for filing but then add $500-1000+ for publishing, making their total cost much higher.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Are there any hidden fees?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      No hidden fees whatsoever. The $885 includes all state filing fees, publication costs, and our service fees. The only additional cost would be if you need expedited processing from the state, which is optional and rarely necessary.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Do you offer payment plans?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Currently, we require full payment upfront to initiate the formation process. This ensures we can begin work immediately and maintain our streamlined timeline. All payments are processed securely through our payment partner.
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
                    <p className="text-muted-foreground mb-3">
                      The complete process typically takes 7-8 weeks:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li><strong>Weeks 1-2:</strong> Articles of Organization filing and processing</li>
                      <li><strong>Weeks 3-8:</strong> 6-week newspaper publication period</li>
                      <li><strong>Week 9:</strong> Final Certificate of Publication filing</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">When can I start operating as a PLLC?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      You can begin operating once your Articles of Organization are filed with the state, which typically takes 1-2 weeks. However, you must complete the publishing requirement and file the Certificate of Publication before your PLLC formation is fully complete.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What documents will I receive?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">
                      You'll receive digital copies of all formation documents:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Filed Articles of Organization</li>
                      <li>Certificate of Publication</li>
                      <li>Affidavits of Publication from newspapers</li>
                      <li>Operating Agreement template</li>
                      <li>Formation completion certificate</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Legal & Compliance */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">
                Legal & Compliance
              </h2>

              <div className="space-y-6">
                <Card className="border-orange-200 bg-orange-50">
                  <CardHeader>
                    <CardTitle className="text-lg text-orange-800">Important Legal Disclaimer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-orange-700">
                      <strong>This is not legal advice.</strong> PLLC formation involves complex legal and regulatory requirements. We provide administrative filing services only. We recommend consulting with a licensed attorney for legal advice regarding your specific situation, professional licensing requirements, and business structure decisions.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Do you provide legal advice?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      No, we are not a law firm and do not provide legal advice. We provide administrative filing services to help you complete the required state filings and publishing. For legal questions about your specific situation, we recommend consulting with a qualified attorney licensed in New York.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What if there are issues with my filing?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      If there are any issues with your state filing (such as name conflicts or documentation problems), we'll work with you to resolve them at no additional charge. Our satisfaction guarantee ensures we'll make it right or provide a full refund if you're not satisfied with our service.
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
                    <p className="text-muted-foreground mb-3">
                      We're here to help! You can reach us through:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li><strong>Email:</strong> contact@newyorkpllc.com</li>
                      <li><strong>Phone:</strong> 646-444-2102</li>
                      <li><strong>Hours:</strong> Monday-Friday, 9 AM - 6 PM EST</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Do you provide ongoing support?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes! Our service includes email and phone support throughout the formation process and for 30 days after completion. We can answer questions about your filing status, provide guidance on next steps, and help with any issues that arise during the process.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Can you help with other business filings?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Currently, we specialize exclusively in NY PLLC formation. For other business structures (LLCs, corporations) or business filings in other states, we recommend consulting with a service that specializes in those areas or a licensed attorney.
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
              We're here to help you navigate the PLLC formation process. Contact us if you need clarification on any aspect of forming your professional practice.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Contact Support
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
