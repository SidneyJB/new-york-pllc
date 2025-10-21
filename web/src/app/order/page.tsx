import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PRICING } from '@/lib/constants'

export default function OrderPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background via-muted/30 to-muted/50 py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Start Your{' '}
              <span className="text-primary">PLLC Formation</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Complete your PLLC formation in minutes. Our streamlined process handles everything from filing to publishing.
            </p>
            <div className="mt-8">
              <div className="text-6xl font-bold text-primary sm:text-7xl">
                ${PRICING.basePrice}
              </div>
              <p className="mt-4 text-xl text-muted-foreground">
                All-Inclusive • No Hidden Fees
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Order Form Section - Spiffy Integration Placeholder */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">

            {/* Spiffy Form Placeholder */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Complete Your Order</CardTitle>
                <CardDescription>
                  Fill out the secure form below to start your PLLC formation process. All information is encrypted and secure.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Spiffy Form Integration Placeholder */}
                <div className="min-h-[600px] bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Spiffy Form Integration</h3>
                    <p className="text-muted-foreground mb-4">
                      The complete order form and payment processing will be embedded here via Spiffy.co
                    </p>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>• Customer information collection</p>
                      <p>• Professional license verification</p>
                      <p>• Business entity details</p>
                      <p>• Secure payment processing ($885)</p>
                      <p>• Order confirmation and next steps</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Legal Disclaimer */}
            <Card className="border-orange-200 bg-orange-50 mb-8">
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
                  By proceeding with this order, you acknowledge that we are not a law firm and do not provide legal advice. 
                  PLLC formation involves complex legal and regulatory requirements that vary by profession. We recommend 
                  consulting with a licensed attorney for legal advice regarding your specific situation, professional 
                  licensing requirements, and business structure decisions. Our service is limited to filing and administrative 
                  tasks as permitted by law.
                </p>
              </CardContent>
            </Card>

            {/* What Happens Next */}
            <Card>
              <CardHeader>
                <CardTitle>What Happens After You Order?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <h3 className="font-semibold mb-2">Instant Filing</h3>
                    <p className="text-sm text-muted-foreground">
                      We file your Articles of Organization with New York State within 24 hours
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <h3 className="font-semibold mb-2">Publishing Process</h3>
                    <p className="text-sm text-muted-foreground">
                      6-week newspaper publication in two NY newspapers as required by law
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <h3 className="font-semibold mb-2">Completion</h3>
                    <p className="text-sm text-muted-foreground">
                      Final Certificate of Publication filed and all documents delivered digitally
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-muted/50 py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why Choose Our Service?
            </h2>
          </div>

          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <p className="text-sm text-muted-foreground mt-2">PLLCs Formed</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">4.9/5</div>
                <p className="text-sm text-muted-foreground mt-2">Customer Rating</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">7-8</div>
                <p className="text-sm text-muted-foreground mt-2">Week Process</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">$0</div>
                <p className="text-sm text-muted-foreground mt-2">Hidden Fees</p>
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
              Questions Before Ordering?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We&apos;re here to help. Contact us if you have any questions about the PLLC formation process.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button variant="outline" size="lg" asChild>
                <Link href="/faq">
                  View FAQ
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">
                  Contact Support
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
