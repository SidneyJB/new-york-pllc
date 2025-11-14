import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { ScrollTracking } from '@/components/analytics/scroll-tracking'
import { APP_CONFIG, BUSINESS_INFO } from '@/lib/constants'
import { CONTACT_METADATA } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data'
import { ContactForm } from '@/components/forms/contact-form'
import { TrackedPhoneLink, TrackedEmailLink } from '@/components/analytics/tracked-cta'
import { TrackedCTAButton } from '@/components/analytics/tracked-cta'

export const metadata = CONTACT_METADATA

const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/9929146/urpjund/'

async function handleContactSubmit(formData: FormData) {
  'use server'

  const payload = {
    firstName: formData.get('firstName')?.toString() ?? '',
    lastName: formData.get('lastName')?.toString() ?? '',
    email: formData.get('email')?.toString() ?? '',
    phone: formData.get('phone')?.toString() ?? '',
    professionalType: formData.get('professionalType')?.toString() ?? '',
    subject: formData.get('subject')?.toString() ?? '',
    message: formData.get('message')?.toString() ?? '',
    submittedAt: new Date().toISOString(),
  }

  try {
    const response = await fetch(ZAPIER_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      console.error('Failed to deliver contact form to Zapier', await response.text())
      redirect('/contact?error=1')
    }
  } catch (error) {
    console.error('Error sending contact form to Zapier', error)
    redirect('/contact?error=1')
  }

  redirect('/contact?submitted=1')
}

export default function ContactPage({
  searchParams,
}: {
  searchParams?: { submitted?: string; error?: string }
}) {
  const submitted = searchParams?.submitted === '1'
  const submissionError = searchParams?.error === '1'

  return (
    <>
      <ScrollTracking />
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: 'Contact', item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://newyorkpllc.com'}/contact` }
          ])),
        }}
      />
      <div className="flex flex-col">
      {/* Breadcrumb Navigation */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb
            items={[
              { label: 'Contact', href: '/contact' }
            ]}
          />
        </div>
      </div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background via-muted/30 to-muted/50 py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Contact{' '}
              <span className="text-primary">Us</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Have questions about PLLC formation? We're here to help you navigate the process and get your professional practice started.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">

              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">
                  Get in Touch
                </h2>

                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Email Support
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <TrackedEmailLink
                        email={APP_CONFIG.supportEmail}
                        location="contact-page"
                        className="text-lg font-medium text-primary mb-2 block"
                      >
                        {APP_CONFIG.supportEmail}
                      </TrackedEmailLink>
                      <p className="text-muted-foreground">
                        Send us an email anytime. We typically respond within 18 minutes during business hours.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Phone Support
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <TrackedPhoneLink
                        phone={APP_CONFIG.phone}
                        location="contact-page"
                        className="text-lg font-medium text-primary mb-2 block"
                      >
                        {APP_CONFIG.phone}
                      </TrackedPhoneLink>
                      <p className="text-muted-foreground">
                        Speak directly with our formation specialists. Perfect for urgent questions.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Business Address
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-medium mb-2">{BUSINESS_INFO.legalName}</p>
                      <p className="text-muted-foreground mb-1">{BUSINESS_INFO.address.street}</p>
                      <p className="text-muted-foreground">
                        {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state} {BUSINESS_INFO.address.zipCode}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Business Hours</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Monday - Friday</span>
                          <span className="font-medium">10:00 AM - 5:00 PM EST</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Saturday - Sunday</span>
                          <span className="font-medium">Closed</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">
                        *Emergency support available outside hours for existing customers
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">
                  Send Us a Message
                </h2>

                {submitted && (
                  <Card className="mb-6 border-green-200 bg-green-50">
                    <CardContent className="py-4 text-sm text-green-900">
                      Thanks—your message is on its way. We&apos;ll get back to you within 2-4 business hours.
                    </CardContent>
                  </Card>
                )}

                {submissionError && (
                  <Card className="mb-6 border-destructive bg-destructive/10">
                    <CardContent className="py-4 text-sm text-destructive">
                      Something went wrong sending your message. Please try again or email us directly at{' '}
                      <a className="underline" href={`mailto:${APP_CONFIG.supportEmail}`}>
                        {APP_CONFIG.supportEmail}
                      </a>
                      .
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle>Contact Form</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you within 2-4 hours during business hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ContactForm action={handleContactSubmit} />
                  </CardContent>
                </Card>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="bg-muted/50 py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why Choose Us?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We're committed to providing transparent, reliable service for licensed professionals.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">2,000+</div>
                <p className="text-sm text-muted-foreground mt-2">PLLCs Formed</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">4.9/5</div>
                <p className="text-sm text-muted-foreground mt-2">Customer Rating</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">24-48hr</div>
                <p className="text-sm text-muted-foreground mt-2">Response Time</p>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Licensed Professionals Only</h3>
                <p className="text-sm text-muted-foreground">Exclusively serving licensed professionals who require PLLC structure</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Secure & Private</h3>
                <p className="text-sm text-muted-foreground">Your information is protected with industry-standard security measures</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Fast Processing</h3>
                <p className="text-sm text-muted-foreground">Quick turnaround times to get your PLLC formed efficiently</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Lifetime Support</h3>
                <p className="text-sm text-muted-foreground">Free ongoing support throughout your PLLC journey</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Links Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Legal Information
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Important legal information and policies for our services.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Privacy Policy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    How we collect, use, and protect your personal information.
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/privacy">Read Policy</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Terms of Service
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Terms and conditions for using our PLLC formation services.
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/terms">Read Terms</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Legal Disclaimer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Important information about our services and limitations.
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/disclaimer">Read Disclaimer</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Ready to Form Your PLLC?
            </h2>
            <p className="mt-6 text-lg leading-8 text-primary-foreground/90">
              Contact us if you have questions, or get started with our streamlined formation process.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <TrackedCTAButton
                href="/order"
                cta="start-formation-contact"
                location="contact-cta"
                size="lg"
                variant="secondary"
              >
                Start Formation - $885
              </TrackedCTAButton>
              <TrackedPhoneLink phone={APP_CONFIG.phone} location="contact-cta">
                <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Call: {APP_CONFIG.phone}
                </Button>
              </TrackedPhoneLink>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  )
}
