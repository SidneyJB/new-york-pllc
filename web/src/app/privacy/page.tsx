import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { ScrollTracking } from '@/components/analytics/scroll-tracking'
import { APP_CONFIG } from '@/lib/constants'
import { PRIVACY_METADATA } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data'

export const metadata = PRIVACY_METADATA
const LAST_UPDATED = 'October 23, 2025'

export default function PrivacyPage() {
  return (
    <>
      <ScrollTracking />
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: 'Privacy Policy', item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.nypllc.com'}/privacy` }
          ])),
        }}
      />

      <div className="flex flex-col">
        {/* Breadcrumb Navigation */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb
              items={[
                { label: 'Privacy Policy', href: '/privacy' }
              ]}
            />
          </div>
        </div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background via-muted/30 to-muted/50 py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Privacy{' '}
              <span className="text-primary">Policy</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              How we collect, use, and protect your personal information when you use our PLLC formation services.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Last updated: {LAST_UPDATED}
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            
            {/* Introduction */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Introduction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  This Privacy Policy describes how we collect, use, and protect your personal information when you use our 
                  PLLC formation services. We are committed to protecting your privacy and ensuring the security of your 
                  personal information.
                </p>
                <p className="text-muted-foreground">
                  By using our services, you agree to the collection and use of information in accordance with this policy. 
                  If you do not agree with our policies and practices, please do not use our services.
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Information We Collect</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Personal Information</h3>
                    <p className="text-muted-foreground mb-3">
                      We collect the following types of personal information:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Name, email address, and phone number</li>
                      <li>Professional license information and verification</li>
                      <li>Business entity details for PLLC formation</li>
                      <li>Billing and payment information (processed securely by our payment partners)</li>
                      <li>Communication preferences and support interactions</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Automatically Collected Information</h3>
                    <p className="text-muted-foreground mb-3">
                      We automatically collect certain information when you visit our website:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>IP address and device information</li>
                      <li>Browser type and version</li>
                      <li>Pages visited and time spent on our site</li>
                      <li>Referring website information</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Service Delivery</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Process your PLLC formation order</li>
                      <li>File required documents with New York State</li>
                      <li>Coordinate newspaper publication requirements</li>
                      <li>Provide customer support and status updates</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Communication</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Send order confirmations and status updates</li>
                      <li>Respond to your inquiries and support requests</li>
                      <li>Send important service-related notifications</li>
                      <li>Provide information about our services (with your consent)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Legal and Compliance</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Comply with legal obligations and regulatory requirements</li>
                      <li>Verify professional license status as required by law</li>
                      <li>Maintain records for audit and compliance purposes</li>
                      <li>Protect against fraud and unauthorized transactions</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Information Sharing */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Information Sharing and Disclosure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    We do not sell, trade, or rent your personal information to third parties. We may share your 
                    information only in the following circumstances:
                  </p>

                  <div>
                    <h3 className="font-semibold mb-2">Service Providers</h3>
                    <p className="text-muted-foreground mb-2">
                      We share information with trusted third-party service providers who assist us in:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Payment processing (Stripe, Spiffy.co)</li>
                      <li>Email communications (SendGrid)</li>
                      <li>State filing services</li>
                      <li>Newspaper publication services</li>
                      <li>Website analytics (Google Analytics)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Legal Requirements</h3>
                    <p className="text-muted-foreground">
                      We may disclose your information if required by law, court order, or to protect our rights, 
                      property, or safety, or that of our customers or the public.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Business Transfers</h3>
                    <p className="text-muted-foreground">
                      In the event of a merger, acquisition, or sale of assets, your information may be transferred 
                      as part of the business transaction.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Data Security</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    We implement appropriate technical and organizational security measures to protect your personal 
                    information against unauthorized access, alteration, disclosure, or destruction.
                  </p>

                  <div>
                    <h3 className="font-semibold mb-2">Security Measures</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>SSL encryption for all data transmission</li>
                      <li>Secure servers and databases</li>
                      <li>Regular security audits and updates</li>
                      <li>Limited access to personal information on a need-to-know basis</li>
                      <li>Secure payment processing through PCI-compliant partners</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800 text-sm">
                      <strong>Important:</strong> While we strive to protect your personal information, no method of 
                      transmission over the internet or electronic storage is 100% secure. We cannot guarantee 
                      absolute security, but we work to use commercially acceptable means to protect your information.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Your Privacy Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Depending on your location, you may have certain rights regarding your personal information:
                  </p>

                  <div>
                    <h3 className="font-semibold mb-2">General Rights</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Access your personal information we hold</li>
                      <li>Correct inaccurate or incomplete information</li>
                      <li>Request deletion of your personal information</li>
                      <li>Object to processing of your personal information</li>
                      <li>Request data portability</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">California Residents (CCPA)</h3>
                    <p className="text-muted-foreground">
                      California residents have additional rights under the California Consumer Privacy Act (CCPA), 
                      including the right to know what personal information we collect and how we use it, the right 
                      to delete personal information, and the right to opt-out of the sale of personal information.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">European Residents (GDPR)</h3>
                    <p className="text-muted-foreground">
                      If you are in the European Union, you have rights under the General Data Protection Regulation (GDPR), 
                      including the right to access, rectify, erase, restrict, or object to processing of your personal data.
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800 text-sm">
                      <strong>To exercise your rights:</strong> Contact us at {APP_CONFIG.supportEmail} with your request. 
                      We will respond to your request within 30 days and may require verification of your identity.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Cookies and Tracking Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    We use cookies and similar tracking technologies to enhance your experience on our website:
                  </p>

                  <div>
                    <h3 className="font-semibold mb-2">Types of Cookies</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li><strong>Essential Cookies:</strong> Required for website functionality</li>
                      <li><strong>Analytics Cookies:</strong> Help us understand website usage (Google Analytics)</li>
                      <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                      <li><strong>Marketing Cookies:</strong> Used for targeted advertising (with your consent)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Managing Cookies</h3>
                    <p className="text-muted-foreground">
                      You can control cookies through your browser settings. However, disabling certain cookies may 
                      affect the functionality of our website.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Retention */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Data Retention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    We retain your personal information for as long as necessary to provide our services and comply 
                    with legal obligations:
                  </p>

                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li><strong>Order Information:</strong> Retained for 7 years for tax and legal compliance</li>
                    <li><strong>Communication Records:</strong> Retained for 3 years for customer service purposes</li>
                    <li><strong>Website Analytics:</strong> Retained for 2 years for business analysis</li>
                    <li><strong>Marketing Data:</strong> Retained until you opt-out or request deletion</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Children's Privacy */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our services are not intended for individuals under the age of 18. We do not knowingly collect 
                  personal information from children under 18. If we become aware that we have collected personal 
                  information from a child under 18, we will take steps to delete such information.
                </p>
              </CardContent>
            </Card>

            {/* Changes to Policy */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Changes to This Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                  the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review 
                  this Privacy Policy periodically for any changes.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    If you have any questions about this Privacy Policy or our privacy practices, please contact us:
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
                    <h3 className="font-semibold mb-2">Data Protection Officer</h3>
                    <p className="text-muted-foreground text-sm">
                      For privacy-related concerns or to exercise your rights, you can also contact our Data Protection 
                      Officer at the email address above.
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
              Questions About Privacy?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We're committed to protecting your privacy. Contact us if you have any questions about how we handle your information.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/terms">
                  Terms of Service
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
