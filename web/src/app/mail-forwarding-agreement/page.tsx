import { Breadcrumb } from '@/components/ui/breadcrumb'
import { ScrollTracking } from '@/components/analytics/scroll-tracking'
import { MAIL_FORWARDING_AGREEMENT_METADATA } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data'
import { SEO_CONFIG } from '@/lib/seo/config'

export const metadata = MAIL_FORWARDING_AGREEMENT_METADATA

export default function MailForwardingAgreementPage() {
  const siteUrl = SEO_CONFIG.siteUrl

  return (
    <div className="flex flex-col">
      <ScrollTracking />
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: 'Virtual Address Services', item: `${siteUrl}/virtual-address-services` },
            { name: 'Mail Forwarding Agreement', item: `${siteUrl}/mail-forwarding-agreement` }
          ])),
        }}
      />
      {/* Breadcrumb Navigation */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb
            items={[
              { label: 'Virtual Address Services', href: '/virtual-address-services' },
              { label: 'Mail Forwarding Agreement' }
            ]}
          />
        </div>
      </div>
      {/* Agreement Content */}
      <section className="py-12">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-none">
            <div className="space-y-8">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  MAIL FORWARDING & REGISTERED AGENT SERVICE AGREEMENT
                </h1>
              </div>
              {/* Section 1 */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">1. AUTHORIZATION AND COMPLIANCE</h2>
                <div className="space-y-3 text-foreground">
                  <div>
                    <p className="font-medium mb-1">1.1 Service Address.</p>
                    <p className="leading-relaxed">
                      The Customer acknowledges that they will be using the Provider's address at 1 Blue Hill Plaza, 
                      Pearl River, NY 10965 as their business address. Upon signup, the Provider will designate a unique 
                      suite number for the Customer's business. All mail sent to this address (including the designated suite 
                      number) will be received, processed, and forwarded by the Provider in accordance with the terms of this Agreement.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">1.2 USPS Form 1583.</p>
                    <p className="leading-relaxed">
                      Strictly pursuant to United States Postal Service (USPS) regulations, the Customer must submit a fully executed and notarized USPS Form 1583 ("Application for Delivery of Mail Through Agent"), accompanied by two forms of valid identification, prior to service activation.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">1.3 Activation.</p>
                    <p className="leading-relaxed">
                      Business Filing Solutions LLC ("Provider") will not receive, process, or forward any mail until the required compliance documents are verified.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">2. SERVICE SCHEDULE AND SCOPE</h2>
                <div className="space-y-3 text-foreground">
                  <div>
                    <p className="font-medium mb-1">2.1 Forwarding Schedule.</p>
                    <p className="leading-relaxed">
                      Mail is processed and forwarded on a weekly basis, specifically on Fridays.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">2.2 Junk Mail.</p>
                    <p className="leading-relaxed">
                      By default, junk mail and marketing material ("Standard," "Presort") will NOT be forwarded to reduce shipping weight and associated postage costs. The Customer may opt-in to receive Junk Mail forwarding in writing.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">2.3 Packages.</p>
                    <p className="leading-relaxed">
                      The Service accepts physical packages. The Customer agrees to pay all applicable shipping costs required to forward said packages to the designated address.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">2.4 Signature Authority.</p>
                    <p className="leading-relaxed">
                      The Customer authorizes the Provider to sign for receipt of registered, certified, and insured mail, including restricted delivery items, on the Customer's behalf.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">2.5 Registered Agent Service.</p>
                    <p className="leading-relaxed">
                      Unless the Customer explicitly opts out in writing, the Provider shall act as the Customer's Registered Agent for Service of Process. The Provider agrees to accept legal documents and official government notices on behalf of the Customer and forward them according to the standard Forwarding Schedule defined in Section 2.1.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">3. FEES AND BILLING</h2>
                <div className="space-y-3 text-foreground">
                  <div>
                    <p className="font-medium mb-1">3.1 Fixed Subscription Fee.</p>
                    <p className="leading-relaxed">
                      The Customer agrees to pay a recurring subscription fee of $50.00 per month.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">3.2 Variable Postage Costs.</p>
                    <p className="leading-relaxed">
                      The Customer is solely responsible for all postage and shipping costs incurred to forward mail from the Provider's facility to the Customer.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">3.3 Billing Timing.</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>The Fixed Subscription Fee is charged monthly.</li>
                      <li>Variable Postage Costs are charged to the credit card on file at the time of forwarding (weekly on Fridays).</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-1">3.4 Authorization.</p>
                    <p className="leading-relaxed">
                      The Customer authorizes the Provider to automatically charge the payment method on file for all fixed fees and variable postage costs without requiring separate approval for each transaction.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">4. TERMINATION AND POST-CANCELLATION MAIL</h2>
                <div className="space-y-3 text-foreground">
                  <div>
                    <p className="font-medium mb-1">4.1 Cancellation.</p>
                    <p className="leading-relaxed">
                      The Customer may terminate this Agreement at any time via written notice.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">4.2 Post-Termination Mail.</p>
                    <p className="leading-relaxed">
                      Mail received after the termination date will not be immediately Returned to Sender. The Provider will hold such mail for a period of 30 days.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">4.3 Holding Fee.</p>
                    <p className="leading-relaxed">
                      To release and forward mail received after termination, the Customer must pay a Reactivation/Holding Fee of $50.00 plus all applicable postage costs. If the fee is not paid within the 30-day holding period, mail will be discarded or returned to sender at the Provider's discretion.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">5. PRIVACY AND CONFIDENTIALITY</h2>
                <div className="space-y-3 text-foreground">
                  <div>
                    <p className="font-medium mb-1">5.1 Confidentiality.</p>
                    <p className="leading-relaxed">
                      The Provider agrees to treat all mail as confidential. The Provider shall not open, read, or distribute the contents of the Customer's mail unless explicitly authorized by the Customer in writing or required to do so by a court order or law enforcement agency.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">5.2 Third-Party Breach.</p>
                    <p className="leading-relaxed">
                      The Provider shall not be held liable for any breach of privacy or confidentiality caused by third-party carriers (USPS, FedEx, UPS) or unauthorized access to the mail prior to its receipt by the Provider.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">6. LIMITATION OF LIABILITY</h2>
                <div className="space-y-3 text-foreground">
                  <div>
                    <p className="font-medium mb-1">6.1 Carrier Delays.</p>
                    <p className="leading-relaxed">
                      The Provider acts solely as an agent for mail receipt and re-shipment. The Provider is not liable for delays, loss, or damage caused by third-party carriers.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">6.2 Prohibited Items.</p>
                    <p className="leading-relaxed">
                      The Customer agrees not to utilize the Service for the receipt of illegal, hazardous, or prohibited items. The Provider reserves the right to inspect any shipment external packaging and cooperate with law enforcement if illegal activity is suspected.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">6.3 Liability Cap.</p>
                    <p className="leading-relaxed">
                      In no event shall the Provider's liability exceed the total amount of fees paid by the Customer to the Provider during the one (1) month period immediately preceding the event giving rise to the claim.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">7. FORCE MAJEURE</h2>
                <p className="text-foreground leading-relaxed">
                  The Provider shall not be liable for any failure to perform its obligations where such failure is as a result of Acts of Nature (including fire, flood, earthquake, storm, hurricane, or other natural disaster), war, invasion, act of foreign enemies, hostilities (whether war is declared or not), civil war, rebellion, revolution, insurrection, military or usurped power or confiscation, terrorist activities, nationalization, government sanction, blockage, embargo, labor dispute, strike, lockout or interruption or failure of electricity or telephone service.
                </p>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">8. SEVERABILITY</h2>
                <p className="text-foreground leading-relaxed">
                  If any provision of this Agreement is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that this Agreement shall otherwise remain in full force and effect and enforceable.
                </p>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">9. GOVERNING LAW AND VENUE</h2>
                <div className="space-y-3 text-foreground">
                  <div>
                    <p className="font-medium mb-1">9.1 Governing Law.</p>
                    <p className="leading-relaxed">
                      This Agreement shall be governed by and construed in accordance with the laws of the State of New York.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">9.2 Venue.</p>
                    <p className="leading-relaxed">
                      Any legal suit, action, or proceeding arising out of or related to this Agreement shall be instituted exclusively in the federal courts of the United States or the courts of the State of New York in each case located in Rockland County. The Customer waives any and all objections to the exercise of jurisdiction over the Customer by such courts and to venue in such courts.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 10 */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">10. MODIFICATION OF TERMS</h2>
                <p className="text-foreground leading-relaxed">
                  The Provider reserves the right to modify the terms and conditions of this Agreement, including pricing, at any time. The Provider shall provide the Customer with at least thirty (30) days' written notice (via email) of any material changes. Continued use of the Service after the notice period constitutes acceptance of the new terms.
                </p>
              </section>

              {/* Section 11 */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">11. INDEMNIFICATION</h2>
                <p className="text-foreground leading-relaxed">
                  The Customer agrees to indemnify and hold harmless the Provider from any claims, damages, or legal actions arising from the Customer's use of the Service, including but not limited to the receipt of prohibited items or fraudulent use of the provided address.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
