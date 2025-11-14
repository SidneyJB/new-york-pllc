import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollTracking } from '@/components/analytics/scroll-tracking'
import { generateMetadata } from '@/lib/seo/metadata'
import { BadgeCheck } from 'lucide-react'
import { OrderConfirmationClient } from './confirmation-client'

export const metadata = generateMetadata({
  title: 'Order Confirmation | NY PLLC Formation Complete',
  description: 'Your New York PLLC formation order has been confirmed. Track your order status and next steps for completing your professional LLC formation.',
  keywords: [
    'PLLC order confirmation',
    'NY PLLC status',
    'professional LLC order',
    'PLLC formation tracking'
  ],
  canonical: '/order/confirmation',
  robots: {
    index: false,
    follow: false,
  },
})

// This page shows order confirmation and can work with or without URL parameters
// Example: /order/confirmation?name_first=John&name_last=Doe
export default async function OrderConfirmationPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  // TODO: Connect to Spiffy webhook/order API to get real order data
  const params = await searchParams

  const nameFirst = params.name_first as string
  const nameLast = params.name_last as string

  const orderDetails = {
    customerName: (nameFirst && nameLast) ? `${nameFirst} ${nameLast}` : "Valued Customer",
    service: "PLLC Formation Package",
    amount: 885, // Standard package price
    paymentDate: new Date().toLocaleDateString(),
    estimatedCompletion: "7-8 weeks"
  }

  return (
    <div className="flex flex-col">
      <ScrollTracking />
      <OrderConfirmationClient amount={orderDetails.amount} />
      {/* Success Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-background to-green-50 py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Payment{' '}
              <span className="text-green-600">Confirmed!</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Thank you for choosing our PLLC formation service. Your payment has been processed successfully and we're beginning your formation process.
            </p>
          </div>
        </div>
      </section>

      {/* Order Summary Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">

            {/* Order Details */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Order Summary
                </CardTitle>
                <CardDescription>
                  Your order details and confirmation information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="font-semibold mb-3">Order Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Customer:</span>
                        <span className="font-medium">{orderDetails.customerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Service:</span>
                        <span className="font-medium">{orderDetails.service}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Payment Date:</span>
                        <span className="font-medium">{orderDetails.paymentDate}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Payment Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount Paid:</span>
                        <span className="font-medium text-green-600">${orderDetails.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Payment Method:</span>
                        <span className="font-medium">Credit Card</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className="font-medium text-green-600">Confirmed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What's Included */}
            <Card className="mb-8">
              <CardHeader className="pb-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Included with your formation
                </p>
                <CardTitle className="text-2xl">
                  The same concierge service you saw before checkout
                </CardTitle>
                <CardDescription>
                  We handle every New York PLLC requirement end-to-end—no surprise follow-up work on your side.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      Formation & compliance
                    </h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <BadgeCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                        <span>NYSED pre-approval of your PLLC name and professional license</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <BadgeCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                        <span>PLLC Articles of Organization prepared, filed, and tracked for you</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <BadgeCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                        <span>Federal Tax ID (EIN) obtained and delivered securely</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <BadgeCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                        <span>Free first-year registered agent service with automatic renewals available</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <BadgeCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                        <span>Signature-ready operating agreement tailored to your member structure</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      Publishing & delivery
                    </h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <BadgeCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                        <span>Two New York newspaper placements for the full six-week publishing requirement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <BadgeCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                        <span>Affidavits collected and Certificate of Publication filed with the state</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <BadgeCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                        <span>Status updates at every milestone, so you never wonder where things stand</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <BadgeCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                        <span>Digital delivery of every filing receipt, affidavit, and final certificate</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Next Steps Timeline */}
            {/* 

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
                <CardDescription>
                  Here's what happens next in your PLLC formation process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-primary font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Today - Filing Initiation</h4>
                      <p className="text-sm text-muted-foreground">
                        We begin processing your Articles of Organization filing with New York State. You'll receive email confirmation within 24 hours.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-primary font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Week 1-2 - State Processing</h4>
                      <p className="text-sm text-muted-foreground">
                        New York State processes your filing. Once approved, we coordinate newspaper publication in your county.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-primary font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Weeks 3-8 - Publishing Period</h4>
                      <p className="text-sm text-muted-foreground">
                        6-week publication period in two newspapers as required by NY law. We'll handle all coordination.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-green-600 font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-600">Week 9 - Completion</h4>
                      <p className="text-sm text-muted-foreground">
                        Final Certificate of Publication filed. All documents delivered digitally via secure email.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card> 
            */}

            {/* Support Information */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help or Have Questions?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-3">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>contact@nypllc.com</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>646-444-2102</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Mon-Fri: 10 AM - 5 PM EST</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Document Access</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Once your PLLC formation is complete, you'll receive all documents via secure email.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Email Confirmation Notice */}
      <section className="bg-muted/50 py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Email Confirmation Sent
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We've sent a confirmation email to your registered email address with all your order details and tracking information.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              What's Next?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Your PLLC formation process has begun! We'll keep you updated via email throughout the process.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <Link href="/">
                  Return to Home
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
