import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { PRICING } from '@/lib/constants'
import { ORDER_METADATA } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data'

export const metadata = ORDER_METADATA

export default function OrderPage() {
  return (
    <>
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: 'Order', item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://newyorkpllc.com'}/order` }
          ])),
        }}
      />
      <div className="flex flex-col">
      {/* Breadcrumb Navigation */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb
            items={[
              { label: 'Order', href: '/order' }
            ]}
          />
        </div>
      </div>

      {/* Order Form Section - Spiffy Integration Placeholder */}
      <section className="py-4 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <header className="mb-8 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Complete Your New York PLLC Formation Order
              </h1>
              <p className="mt-3 text-base text-muted-foreground">
                Secure checkout powered by Spiffy. Licensed professionals only — no hidden fees, ever.
              </p>
            </header>

            {/* Spiffy Form Placeholder */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Complete Your Order</CardTitle>
                <CardDescription>
                  Fill out the secure form below to start your PLLC formation process. All information is encrypted and secure.
                </CardDescription>
              </CardHeader>
              <CardContent>
             <div dangerouslySetInnerHTML={{
              __html: `
               <spiffy-checkout url="https://nypllc.spiffy.co/checkout/new-york-pllc-formation" ></spiffy-checkout>
              `
             }}/>
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
                <div className="text-3xl font-bold text-primary">2000+</div>
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
    </>
  )
}
