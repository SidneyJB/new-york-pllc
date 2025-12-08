import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { ScrollTracking } from '@/components/analytics/scroll-tracking'
import { ORDER_LLC_METADATA } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data'
import { PRICING } from '@/lib/constants'
import { OrderPageClient } from '../order/order-client'

export const metadata = ORDER_LLC_METADATA

export default function OrderLlcPage() {
  return (
    <>
      <ScrollTracking />
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: 'Order LLC', item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.nypllc.com'}/order-llc` }
          ])),
        }}
      />
      <div className="flex flex-col">
        <OrderPageClient
          trackingOptions={{
            plan: 'LLC Formation',
            price: PRICING.basePrice,
            entityType: 'LLC',
          }}
        />

        {/* Breadcrumb Navigation */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb
              items={[
                { label: 'Order LLC', href: '/order-llc' }
              ]}
            />
          </div>
        </div>

        {/* Order Form Section - Spiffy Integration */}
        <section className="py-4 lg:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <header className="mb-8 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Complete Your New York LLC Formation Order
                </h1>
              </header>

              <div className="mb-6">
                <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                  This order page is for standard New York LLCs. If you need a Professional LLC (PLLC), please use the{' '}
                  <Link href="/order" className="underline font-semibold text-amber-900 hover:text-amber-800">
                    PLLC order page
                  </Link>
                  .
                </div>
              </div>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Complete Your Order</CardTitle>
                  <CardDescription>
                    Fill out the secure form below to start your LLC formation process. All information is encrypted and secure.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `
                        <spiffy-checkout url="https://nypllc.spiffy.co/checkout/new-york-llc-formation"></spiffy-checkout>
                      `,
                    }}
                  />
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
                      <h3 className="font-semibold mb-2">State Filing</h3>
                      <p className="text-sm text-muted-foreground">
                        We file your Articles of Organization with New York State within 24 hours of receiving your details.
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-primary font-bold">2</span>
                      </div>
                      <h3 className="font-semibold mb-2">Publishing Process</h3>
                      <p className="text-sm text-muted-foreground">
                        We manage the 6-week newspaper publication required for New York LLCs and track every notice.
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-primary font-bold">3</span>
                      </div>
                      <h3 className="font-semibold mb-2">Completion</h3>
                      <p className="text-sm text-muted-foreground">
                        We file your Certificate of Publication and deliver all LLC documents digitally for your records.
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
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">2000+</div>
                  <p className="text-sm text-muted-foreground mt-2">Entities Formed</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">4.9/5</div>
                  <p className="text-sm text-muted-foreground mt-2">Customer Rating</p>
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
                We&apos;re here to help. Contact us if you have any questions about forming your New York LLC.
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
    </>
  )
}

