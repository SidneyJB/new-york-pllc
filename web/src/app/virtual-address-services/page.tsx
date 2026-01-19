import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { ScrollTracking } from '@/components/analytics/scroll-tracking'
import { VIRTUAL_ADDRESS_SERVICES_METADATA } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data'
import { SEO_CONFIG } from '@/lib/seo/config'

export const metadata = VIRTUAL_ADDRESS_SERVICES_METADATA

export default function VirtualAddressServicesPage() {
  const siteUrl = SEO_CONFIG.siteUrl

  return (
    <div className="flex flex-col">
      <ScrollTracking />
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: 'Virtual Address Services', item: `${siteUrl}/virtual-address-services` }
          ])),
        }}
      />
      {/* Breadcrumb Navigation */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb
            items={[
              { label: 'Virtual Address Services' }
            ]}
          />
        </div>
      </div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background via-muted/30 to-muted/50 py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Virtual Address &{' '}
              <span className="text-primary">Registered Agent Services</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Professional mail forwarding and registered agent services for your business
            </p>
          </div>
        </div>
      </section>

      {/* Hero CTA */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4 text-foreground">Your Business Address, Simplified</h2>
                <p className="text-lg text-muted-foreground max-w-3xl">
                  Get a professional business address without the overhead. You'll use our address at 
                  1 Blue Hill Plaza, Pearl River, NY 10965 as your business address. When you sign up, we'll designate 
                  you a unique suite number for your business. We receive your mail, handle important documents, and 
                  forward everything to you on a convenient weekly schedule.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* Mail Forwarding */}
            <Card>
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 rounded-full p-3 mr-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <CardTitle>Weekly Mail Forwarding</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your mail is collected throughout the week and forwarded to you every Friday. 
                  No more missed deliveries or trips to check a mailbox. Everything arrives in one convenient weekly shipment.
                </p>
              </CardContent>
            </Card>

            {/* Registered Agent */}
            <Card>
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="bg-green-500/10 rounded-full p-3 mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <CardTitle>Registered Agent Service</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We act as your registered agent, accepting legal documents and official government notices on your behalf. 
                  Important documents are forwarded promptly, ensuring you never miss critical deadlines.
                </p>
              </CardContent>
            </Card>

            {/* Signature Authority */}
            <Card>
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="bg-purple-500/10 rounded-full p-3 mr-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <CardTitle>Signature Authority</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We can sign for registered, certified, and insured mail on your behalf. 
                  No more missed deliveries because you weren't available to sign. We handle it all.
                </p>
              </CardContent>
            </Card>

            {/* Package Forwarding */}
            <Card>
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="bg-orange-500/10 rounded-full p-3 mr-4">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <CardTitle>Package Forwarding</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Physical packages are accepted and forwarded to your designated address. 
                  You only pay for the actual shipping costs—no markup, no hidden fees.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Complete Setup</h3>
                    <p className="text-muted-foreground">
                      Complete the required setup forms. 
                      Once verified, your service is activated and ready to receive mail.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">We Receive Your Mail</h3>
                    <p className="text-muted-foreground">
                      All mail and packages sent to your business address (our address at 1 Blue Hill Plaza, Pearl River, 
                      NY 10965, with your designated suite number) are received at our secure facility. We handle registered 
                      mail, certified mail, and packages—everything is kept safe and confidential.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Weekly Forwarding</h3>
                    <p className="text-muted-foreground">
                      Every Friday, we process and forward all mail received during the week to your designated address. 
                      You'll receive everything in one convenient shipment, saving you time and trips to the mailbox.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    4
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Automatic Billing</h3>
                    <p className="text-muted-foreground">
                      Your monthly subscription fee is charged automatically. Postage costs are charged only when mail is forwarded, 
                      so you only pay for what you use. Simple and transparent.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Simple, Transparent Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Subscription</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-primary mb-2">$50<span className="text-lg text-muted-foreground">/month</span></p>
                      <p className="text-muted-foreground">
                        Fixed monthly fee covers mail receipt, storage, and processing. 
                        Includes registered agent service at no additional cost.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Postage Costs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-primary mb-2">At Cost</p>
                      <p className="text-muted-foreground">
                        You only pay the actual shipping costs to forward your mail. 
                        Charged automatically when mail is forwarded—no markup, no surprises.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Why Choose Our Service?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-muted-foreground">Professional business address at 1 Blue Hill Plaza, Pearl River, NY 10965 (with your designated suite number) without office overhead</p>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-muted-foreground">Never miss important mail or legal documents</p>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-muted-foreground">Convenient weekly forwarding schedule</p>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-muted-foreground">Complete privacy and confidentiality</p>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-muted-foreground">Automatic billing—no manual payments needed</p>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-muted-foreground">Cancel anytime with written notice</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Privacy Note */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle>Your Privacy Matters</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All mail is treated with complete confidentiality. We never open, read, or distribute your mail 
                  unless you explicitly authorize us to do so or we're required by law. Your privacy is our priority.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl text-center">Ready to Get Started?</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Set up your virtual address service today. Complete the required setup forms to activate your service. Questions? We're here to help.
                </p>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>
                    <strong>Note:</strong> By default, all mail including marketing materials will be forwarded. 
                    You can opt-out of junk mail forwarding in writing to reduce shipping costs.
                  </p>
                  <p>
                    For complete terms and conditions, please review our{' '}
                    <Link href="/mail-forwarding-agreement" className="text-primary hover:underline">
                      Mail Forwarding & Registered Agent Service Agreement
                    </Link>.
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-center gap-x-6">
                  <Button size="lg" asChild>
                    <Link href="/contact">
                      Contact Us
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/mail-forwarding-agreement">
                      View Agreement
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
