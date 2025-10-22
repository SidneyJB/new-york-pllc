import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  AlertTriangle,
  Scale,
  FileText,
  Users,
  Shield,
  Clock,
  Phone,
  Mail,
  MapPin,
  Building2
} from 'lucide-react'
import { APP_CONFIG, BUSINESS_INFO } from '@/lib/constants'
import { DISCLAIMER_METADATA } from '@/lib/seo/metadata'

export const metadata = DISCLAIMER_METADATA

export default function DisclaimerPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 via-background to-orange-50/30 py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 mb-6">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Important Legal{' '}
              <span className="text-orange-600">Disclaimers</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Please read these important legal disclaimers carefully before using our services.
              This page contains crucial information about the limitations and scope of our services.
            </p>
          </div>
        </div>
      </section>

      {/* Primary Disclaimer */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Card className="border-orange-200 bg-orange-50 mb-12">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-orange-800 text-2xl">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                  <span>Not Legal Advice</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-700 text-lg leading-relaxed">
                  <strong>Important:</strong> The information provided on this website and through our services is for general informational purposes only and does not constitute legal advice, legal opinion, or the creation of an attorney-client relationship.
                </p>
              </CardContent>
            </Card>

            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>
                We are not a law firm and do not provide legal advice. Our services are limited to administrative filing and document preparation for Professional Limited Liability Company (PLLC) formation in New York State. The formation of a PLLC involves complex legal and regulatory requirements that vary by profession and individual circumstances.
              </p>

              <p>
                <strong>You should consult with a licensed attorney</strong> for legal advice regarding your specific situation, professional licensing requirements, business structure decisions, and any other legal matters related to your PLLC formation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Limitations */}
      <section className="bg-muted/30 py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-12">
              Service Limitations & Scope
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Administrative Services Only
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Our services are strictly limited to administrative tasks and do not include:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-0.5">•</span>
                      <span>Legal advice or legal opinions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-0.5">•</span>
                      <span>Tax advice or tax planning services</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-0.5">•</span>
                      <span>Business strategy or operational consulting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-0.5">•</span>
                      <span>Professional licensing advice or guidance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-0.5">•</span>
                      <span>Insurance recommendations or coverage analysis</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-primary" />
                    Professional Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    PLLC formation services are only available to licensed professionals who:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">•</span>
                      <span>Hold a valid professional license in New York State</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">•</span>
                      <span>Are in good standing with their licensing authority</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">•</span>
                      <span>Practice in a profession eligible for PLLC formation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">•</span>
                      <span>Maintain required professional liability insurance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">•</span>
                      <span>Comply with all professional codes of conduct</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory Compliance */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-12">
              Regulatory Compliance & Requirements
            </h2>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    New York State Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    PLLC formation in New York is governed by specific state laws and regulations:
                  </p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span><strong>New York Limited Liability Company Law</strong> - Governs PLLC formation and operation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span><strong>Professional Licensing Requirements</strong> - Must comply with individual profession licensing boards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span><strong>Publication Requirements</strong> - Mandatory 6-week newspaper publication in two NY newspapers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span><strong>Certificate of Publication</strong> - Must be filed with NY Department of State</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Professional Standards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    PLLCs must maintain the highest professional standards and ethical requirements:
                  </p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span><strong>Professional Liability Insurance</strong> - May be required by licensing boards or clients</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span><strong>Continuing Education</strong> - Must maintain required professional development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span><strong>Ethical Standards</strong> - Must comply with professional codes of conduct</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span><strong>Client Relationships</strong> - Must maintain professional standards in all client interactions</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Ongoing Compliance Obligations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    PLLC owners have ongoing compliance responsibilities:
                  </p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span><strong>Annual Filings</strong> - Biennial statements must be filed with NY Department of State</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span><strong>License Maintenance</strong> - Professional licenses must remain active and in good standing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span><strong>Record Keeping</strong> - Must maintain proper business and professional records</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span><strong>Tax Compliance</strong> - Must comply with federal, state, and local tax requirements</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Liability & Limitations */}
      <section className="bg-muted/30 py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-12">
              Liability Limitations & Warranties
            </h2>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-800">
                    <Shield className="h-5 w-5 text-orange-600" />
                    No Warranties
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-orange-700 text-sm leading-relaxed">
                    We make no warranties, express or implied, regarding the accuracy, completeness, or reliability of information provided on this website or through our services. The formation of a PLLC does not guarantee business success or protection from all liabilities.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-800">
                    <Scale className="h-5 w-5 text-orange-600" />
                    Limitation of Liability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-orange-700 text-sm leading-relaxed">
                    In no event shall we be liable for any direct, indirect, incidental, special, or consequential damages arising from the use of our services or information provided on this website, even if we have been advised of the possibility of such damages.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8 border-orange-200 bg-orange-50">
              <CardContent className="pt-6">
                <p className="text-orange-700 text-sm leading-relaxed">
                  <strong>Important Note:</strong> The liability protection provided by a PLLC structure depends on proper formation, maintenance, and compliance with applicable laws and regulations. We cannot guarantee that a PLLC will provide liability protection in all circumstances or against all claims.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* State-Specific Information */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-12">
              State-Specific Information
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    New York-Specific Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Our services are specifically designed for New York PLLC formation and may not be applicable to other states:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Formation documents filed with NY Department of State</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Publication in NY-designated newspapers only</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Compliance with NY Limited Liability Company Law</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>NY professional licensing requirements apply</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Governing Law
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    These terms and our services are governed by New York law:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Disputes resolved under New York law</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Venue in New York courts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Compliance with NY Department of State regulations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Adherence to NY professional licensing standards</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Advice Required */}
      <section className="bg-muted/30 py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
              When Professional Legal Advice is Required
            </h2>
            <p className="text-lg leading-8 text-muted-foreground mb-12">
              While we handle the administrative aspects of PLLC formation, certain situations require consultation with licensed legal professionals:
            </p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">Complex Business Structures</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Multiple owners, complex ownership arrangements, or unique business relationships
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">Regulatory Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Industry-specific regulations, licensing requirements, or compliance obligations
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">Tax Planning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Tax implications, entity classification, or complex financial arrangements
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">Contract Review</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Client contracts, partnership agreements, or other legal documents
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">Liability Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Risk assessment, insurance requirements, or liability protection strategies
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">Dispute Resolution</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Existing disputes, litigation, or potential legal conflicts
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Questions About Legal Matters?
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                For legal advice or questions about your specific situation, please consult with qualified legal professionals.
              </p>
            </div>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Recommended Professional Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                      <Scale className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Business Attorney</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      For legal advice about PLLC formation, contracts, and business structure
                    </p>
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <p>New York State Bar Association</p>
                      <p>Lawyer Referral Service</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Tax Professional</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      For tax planning, entity classification, and tax compliance guidance
                    </p>
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <p>Certified Public Accountant (CPA)</p>
                      <p>Enrolled Agent (EA)</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Insurance Agent</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      For professional liability insurance and business insurance needs
                    </p>
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <p>Professional Liability Insurance</p>
                      <p>Business Owner's Policy</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final Notice */}
      <section className="border-t py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="pt-6">
                <p className="text-orange-700 text-sm leading-relaxed">
                  <strong>By using our services, you acknowledge that you have read, understood, and agree to these disclaimers and limitations.</strong> If you do not agree with any part of these disclaimers, please do not use our services. These disclaimers are subject to change without notice.
                </p>
                <p className="text-orange-600 text-xs mt-4">
                  Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
