import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { APP_CONFIG, PRICING } from '@/lib/constants'
import { TERMS_METADATA } from '@/lib/seo/metadata'

export const metadata = TERMS_METADATA

export default function TermsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background via-muted/30 to-muted/50 py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Terms of{' '}
              <span className="text-primary">Service</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Terms and conditions for using our PLLC formation services in New York.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            
            {/* Introduction */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Agreement to Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  These Terms of Service ("Terms") govern your use of our PLLC formation services. By using our services, 
                  you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
                </p>
                <p className="text-muted-foreground">
                  We reserve the right to modify these Terms at any time. We will notify you of any material changes 
                  by posting the updated Terms on our website. Your continued use of our services after such changes 
                  constitutes acceptance of the new Terms.
                </p>
              </CardContent>
            </Card>

            {/* Service Description */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Service Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    We provide administrative filing services for New York Professional Limited Liability Company (PLLC) 
                    formation. Our services include:
                  </p>

                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Articles of Organization filing with New York State</li>
                    <li>Professional license verification</li>
                    <li>Free first year registered agent service</li>
                    <li>6-week newspaper publication in two designated newspapers</li>
                    <li>Certificate of Publication filing with New York State</li>
                    <li>Digital delivery of all formation documents</li>
                    <li>Customer support throughout the process</li>
                  </ul>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-orange-800 text-sm">
                      <strong>Important:</strong> We are not a law firm and do not provide legal advice. Our services 
                      are limited to administrative filing tasks as permitted by law. We recommend consulting with a 
                      licensed attorney for legal advice regarding your specific situation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Eligibility */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Eligibility Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    To use our services, you must meet the following requirements:
                  </p>

                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Be a licensed professional in New York State</li>
                    <li>Hold a valid professional license in your field of practice</li>
                    <li>Be at least 18 years of age</li>
                    <li>Have the legal capacity to enter into contracts</li>
                    <li>Provide accurate and complete information</li>
                    <li>Comply with all applicable laws and regulations</li>
                  </ul>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800 text-sm">
                      <strong>Professional License Verification:</strong> We will verify your professional license 
                      status as part of our service. You must provide accurate license information and maintain 
                      an active, valid license throughout the formation process.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing and Payment */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Pricing and Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Service Fee</h3>
                    <p className="text-muted-foreground">
                      Our service fee is ${PRICING.basePrice} (all-inclusive). This includes all state filing fees, 
                      publication costs, and administrative services. No hidden fees or additional charges.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Payment Terms</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Full payment is required before we begin processing your order</li>
                      <li>Payment is processed securely through our payment partners</li>
                      <li>We accept major credit cards and other secure payment methods</li>
                      <li>All prices are in US dollars and include applicable taxes</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Refund Policy</h3>
                    <p className="text-muted-foreground">
                      We offer a 30-day satisfaction guarantee. If you are not satisfied with our service, 
                      contact us within 30 days of your order date for a full refund. Refunds are processed 
                      within 5-10 business days.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Timeline */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Service Timeline and Process</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    The complete PLLC formation process typically takes 7-8 weeks:
                  </p>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-primary font-bold">1-2</span>
                      </div>
                      <h3 className="font-semibold mb-2">Weeks 1-2</h3>
                      <p className="text-sm text-muted-foreground">
                        Articles of Organization filing and state processing
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-primary font-bold">3-8</span>
                      </div>
                      <h3 className="font-semibold mb-2">Weeks 3-8</h3>
                      <p className="text-sm text-muted-foreground">
                        6-week newspaper publication period (required by law
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-primary font-bold">9</span>
                      </div>
                      <h3 className="font-semibold mb-2">Week 9</h3>
                      <p className="text-sm text-muted-foreground">
                        Final Certificate of Publication filing and document delivery
                      </p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800 text-sm">
                      <strong>Timeline Disclaimer:</strong> While we strive to meet our estimated timelines, 
                      processing times may vary due to state agency delays, newspaper publication schedules, 
                      or other factors beyond our control. We will keep you informed of any delays.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Responsibilities */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Customer Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    To ensure successful PLLC formation, you are responsible for:
                  </p>

                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Providing accurate and complete information</li>
                    <li>Maintaining a valid professional license throughout the process</li>
                    <li>Responding promptly to requests for additional information</li>
                    <li>Reviewing and approving all documents before filing</li>
                    <li>Complying with all applicable laws and regulations</li>
                    <li>Paying all required fees and charges</li>
                  </ul>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 text-sm">
                      <strong>Important:</strong> Providing false or inaccurate information may result in 
                      rejection of your filing, additional fees, or legal consequences. You are solely 
                      responsible for the accuracy of all information provided.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Limitations and Disclaimers */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Service Limitations and Disclaimers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Not Legal Advice</h3>
                    <p className="text-muted-foreground">
                      We are not a law firm and do not provide legal advice. Our services are limited to 
                      administrative filing tasks. We recommend consulting with a licensed attorney for 
                      legal advice regarding your specific situation.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">No Guarantee of Approval</h3>
                    <p className="text-muted-foreground">
                      While we strive for accuracy, we cannot guarantee that your PLLC formation will be 
                      approved by the state. Approval depends on various factors including name availability, 
                      compliance with state requirements, and other factors beyond our control.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Professional License Requirements</h3>
                    <p className="text-muted-foreground">
                      You are responsible for ensuring you meet all professional licensing requirements 
                      for your field. We verify license status but cannot guarantee ongoing compliance 
                      with professional licensing boards.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Third-Party Services</h3>
                    <p className="text-muted-foreground">
                      Our service relies on third-party services including state agencies, newspapers, 
                      and payment processors. We are not responsible for delays or issues caused by 
                      these third parties.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    To the maximum extent permitted by law, our liability is limited as follows:
                  </p>

                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Our total liability shall not exceed the amount you paid for our services</li>
                    <li>We are not liable for indirect, incidental, or consequential damages</li>
                    <li>We are not liable for delays caused by third parties or circumstances beyond our control</li>
                    <li>We are not liable for any legal or tax consequences of your PLLC formation</li>
                    <li>We are not liable for any business decisions you make based on our services</li>
                  </ul>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-orange-800 text-sm">
                      <strong>Important:</strong> This limitation of liability does not apply to damages 
                      caused by our gross negligence or willful misconduct. Some jurisdictions do not 
                      allow limitation of liability, so these limitations may not apply to you.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    All content on our website, including text, graphics, logos, and software, is our 
                    property or the property of our licensors and is protected by copyright and other 
                    intellectual property laws.
                  </p>

                  <p className="text-muted-foreground">
                    You may not reproduce, distribute, or create derivative works from our content without 
                    our express written permission. You may use our website for lawful purposes only.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Privacy */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your privacy is important to us. Our collection and use of your personal information 
                  is governed by our Privacy Policy, which is incorporated into these Terms by reference. 
                  By using our services, you consent to the collection and use of your information as 
                  described in our Privacy Policy.
                </p>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Termination</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    We may terminate or suspend your access to our services at any time, with or without 
                    cause, with or without notice, for any reason.
                  </p>

                  <p className="text-muted-foreground">
                    You may terminate your use of our services at any time by contacting us. However, 
                    termination does not affect any obligations that have already been incurred.
                  </p>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 text-sm">
                      <strong>Important:</strong> If we terminate your service due to a violation of these 
                      Terms, you may not be eligible for a refund. We will provide a prorated refund for 
                      services not yet performed if termination is not due to your violation of these Terms.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Governing Law and Disputes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    These Terms are governed by the laws of New York State, without regard to conflict of 
                    law principles. Any disputes arising from these Terms or our services will be resolved 
                    in the state or federal courts located in New York.
                  </p>

                  <p className="text-muted-foreground">
                    Before filing any legal action, we encourage you to contact us to resolve any disputes 
                    informally. We are committed to working with you to resolve any issues.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    If you have any questions about these Terms or our services, please contact us:
                  </p>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <h3 className="font-semibold mb-2">Email</h3>
                      <p className="text-primary">{APP_CONFIG.supportEmail}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Phone</h3>
                      <p className="text-primary">{APP_CONFIG.phone}</p>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Business Hours</h3>
                    <p className="text-muted-foreground text-sm">
                      Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                      Saturday: 10:00 AM - 2:00 PM EST<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/50 py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Questions About Our Terms?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We're here to help clarify any questions about our terms of service or PLLC formation process.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/privacy">
                  Privacy Policy
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
