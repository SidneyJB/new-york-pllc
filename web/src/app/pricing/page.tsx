import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PRICING, PROFESSIONAL_TYPES } from '@/lib/constants'

export default function PricingPage() {
  return (
    <div className="flex flex-col">
      {/* What's Included Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything You Need, Included
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our $885 package includes everything required for NY PLLC formation — no surprises, no add-ons.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-primary">Formation Services</CardTitle>
                  <CardDescription>
                    Complete state filing and document preparation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      Articles of Organization Filing
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      Professional License Verification
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      Registered Agent Service
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-primary">Publishing Services</CardTitle>
                  <CardDescription>
                    Mandatory 6-week newspaper publication included
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      Publication in 2 NY Newspapers
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      6-Week Publication Period
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      Affidavit of Publication
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      Certificate of Publication Filing
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-primary">Support & Delivery</CardTitle>
                  <CardDescription>
                    Professional service and fast delivery
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      Digital Document Delivery
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      Email Status Updates
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      Phone & Email Support
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      24-48 Hour Processing
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-primary">For Licensed Professionals</CardTitle>
                  <CardDescription>
                    Specifically designed for licensed professionals only
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {PROFESSIONAL_TYPES.slice(0, 6).map((type) => (
                      <span key={type} className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
                        {type}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    PLLCs are restricted to licensed professionals. We verify your credentials as part of our service.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Value Comparison Section */}
      <section className="bg-muted/50 py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              The Real Value: All-Inclusive Pricing
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Many competitors advertise low formation fees but charge extra for mandatory publishing.
              We include everything upfront.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <Card className="opacity-60">
                <CardHeader>
                  <CardTitle className="text-muted-foreground">Typical Competitor</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Hidden fees and surprises
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-muted-foreground mb-4">$99</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Basic Formation Filing</li>
                    <li className="text-red-500">✗ Publishing (Extra $500-1000)</li>
                    <li className="text-red-500">✗ Support (Extra charges)</li>
                    <li className="text-muted-foreground">Total: $599-1099+</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                    Best Value
                  </span>
                </div>
                <CardHeader>
                  <CardTitle className="text-primary">Our Service</CardTitle>
                  <CardDescription>
                    Complete, transparent pricing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-4">${PRICING.basePrice}</div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      Complete Formation Filing
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      6-Week Publishing Included
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      Full Support Included
                    </li>
                    <li className="flex items-start text-green-600 font-medium">
                      <span className="mr-2">✓</span>
                      Total: ${PRICING.basePrice} (All-Inclusive)
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="opacity-60">
                <CardHeader>
                  <CardTitle className="text-muted-foreground">Lawyer/CPA Service</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Premium professional services
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-muted-foreground mb-4">$1500+</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Professional Legal Advice</li>
                    <li>• Custom Document Preparation</li>
                    <li>• Ongoing Consultation</li>
                    <li className="text-muted-foreground">Total: $1500+</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Pricing FAQ
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Common questions about our pricing and services.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Why $885? Is that the final price?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes, $885 is the complete, final price. Unlike competitors who charge $99 for formation and then $500-1000+ for mandatory publishing, we include everything. No hidden fees, no surprises.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What's included in the publishing service?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    New York law requires PLLCs to publish formation notices in two newspapers for six weeks. We handle the entire process: selecting appropriate newspapers, managing publication schedules, obtaining affidavits, and filing the Certificate of Publication with the state.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Do you offer payment plans?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Currently, we require full payment upfront to initiate the formation process. This ensures we can begin work immediately and maintain our fast turnaround times. Payment is processed securely through our partner payment processor.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What if I need to make changes after filing?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Amendments to your PLLC after formation typically cost $500-1000+ through traditional services. We offer amendment services at a reduced rate of $395 for existing customers. Contact us for details.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Is there a money-back guarantee?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We stand behind our service with a satisfaction guarantee. If you're not satisfied with our formation service, contact us within 30 days and we'll work to make it right or provide a full refund.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="bg-muted/50 py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Trusted by Licensed Professionals
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Join hundreds of doctors, lawyers, CPAs, and other licensed professionals who have successfully formed their PLLC with us.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <p className="text-sm text-muted-foreground mt-2">PLLCs Formed</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">4.9/5</div>
                <p className="text-sm text-muted-foreground mt-2">Customer Rating</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">24-48hr</div>
                <p className="text-sm text-muted-foreground mt-2">Processing Time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to Form Your PLLC?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Get started today with our all-inclusive $885 package. No hidden fees, no surprises — just complete PLLC formation.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <Link href="/order">
                  Start Formation - ${PRICING.basePrice}
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">
                  Have Questions?
                </Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              ✓ Licensed Professional Verification Included<br />
              ✓ 6-Week Publishing Included<br />
              ✓ Digital Document Delivery<br />
              ✓ 30-Day Satisfaction Guarantee
            </p>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer Section */}
      <section className="bg-orange-50 border-t border-orange-200 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-800 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  Important Legal Disclaimer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-700 text-sm leading-relaxed">
                  <strong>This is not legal advice.</strong> We provide administrative filing services for PLLC formation in New York. 
                  Our $885 service fee includes state filing fees, publication costs, and administrative services only. 
                  We do not provide legal advice, tax advice, or professional consultation. PLLC formation involves complex 
                  legal requirements that vary by profession. We recommend consulting with a licensed attorney for legal 
                  advice regarding your specific situation and business structure decisions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
