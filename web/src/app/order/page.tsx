import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { ScrollTracking } from '@/components/analytics/scroll-tracking'
import { ORDER_METADATA } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data'
import { OrderFallbackCheckoutNotice } from './order-fallback-checkout-notice'
import { OrderPageClient } from './order-client'
import { OrderPriceSummary } from './order-price-summary'
import { OrderTimeline } from './order-timeline'
import { SpiffyPllcCheckout } from '@/components/spiffy/spiffy-pllc-checkout'
import { SpiffyScript } from '@/components/spiffy/spiffy-script'
import { BUSINESS_INFO, TRUST_MARKETING } from '@/lib/constants'

export const metadata = ORDER_METADATA

export default function OrderPage() {
  return (
    <>
      <SpiffyScript />
      <ScrollTracking />
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: 'Order', item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.nypllc.com'}/order` }
          ])),
        }}
      />
      <div className="flex flex-col">
      <OrderPageClient />
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
            <OrderFallbackCheckoutNotice />
            <header className="mb-8 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Complete Your New York PLLC Formation Order
              </h1>
            </header>

            <OrderPriceSummary />

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Complete Your Order</CardTitle>
                <CardDescription>
                  Fill out the secure form below to start your PLLC formation process. All information is encrypted and secure.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SpiffyPllcCheckout />
              </CardContent>
            </Card>

            {/* What Happens Next */}
            <Card>
              <CardHeader>
                <CardTitle>What Happens After You Order?</CardTitle>
                <CardDescription>
                  Steps marked State are government review time. We can&apos;t speed those up, but we tell you
                  where your filing is.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <OrderTimeline />
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
                <div className="text-3xl font-bold text-primary">{TRUST_MARKETING.formationsHeadline}</div>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
                  {TRUST_MARKETING.formationsSubline}
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {BUSINESS_INFO.googleReviews.ratingValue}/5
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Google rating ({BUSINESS_INFO.googleReviews.reviewCount} reviews)
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">6 weeks</div>
                <p className="text-sm text-muted-foreground mt-2">Newspaper publication included</p>
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
