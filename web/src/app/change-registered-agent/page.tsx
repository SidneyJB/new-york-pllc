import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { ScrollTracking } from '@/components/analytics/scroll-tracking'
import { CHANGE_REGISTERED_AGENT_METADATA } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data'
import { SEO_CONFIG } from '@/lib/seo/config'

export const metadata = CHANGE_REGISTERED_AGENT_METADATA

/**
 * Draft page for RA offboarding (CoC cancel). Linked from renewal emails.
 * Do not treat as live marketing until Sid approves the test T-30 email.
 */
export default function ChangeRegisteredAgentPage() {
  const siteUrl = SEO_CONFIG.siteUrl

  return (
    <div className="flex flex-col">
      <ScrollTracking />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: 'Home', item: siteUrl },
              {
                name: 'Change Registered Agent',
                item: `${siteUrl}/change-registered-agent`,
              },
            ]),
          ),
        }}
      />
      <div className="border-b bg-background/95">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={[{ label: 'Change Registered Agent' }]} />
        </div>
      </div>

      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Change your registered agent
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            To end Registered Agent service, New York must no longer list NYPLLC as your registered
            agent on file with the Department of State.
          </p>

          <div className="mt-10 space-y-8">
            <div>
              <h2 className="text-xl font-semibold">Option 1 — We file for you ($99 all-in)</h2>
              <p className="mt-2 text-muted-foreground">
                Pay a one-time $99 fee (includes the state filing fee). We prepare and file a NY DOS
                Certificate of Change (form 1359) to your address on file. When DOS confirms the
                change, Registered Agent billing stops.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Use the payment link in your renewal email, or contact{' '}
                <a className="text-primary underline" href="mailto:contact@nypllc.com">
                  contact@nypllc.com
                </a>{' '}
                and we will send one. Virtual mail clients use the separate $199 address-change
                path in the{' '}
                <Link href="/mail-forwarding-agreement" className="text-primary underline">
                  mail forwarding agreement
                </Link>
                .
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">Option 2 — Self-file with NY DOS</h2>
              <ol className="mt-2 list-decimal list-inside space-y-2 text-muted-foreground">
                <li>
                  Complete a New York DOS Certificate of Change (1359-f) changing the process
                  address / registered agent away from NYPLLC.
                </li>
                <li>File with the Department of State and pay the state fee.</li>
                <li>
                  Email the filing receipt to{' '}
                  <a className="text-primary underline" href="mailto:contact@nypllc.com">
                    contact@nypllc.com
                  </a>
                  . We verify DOS and then stop Registered Agent billing. We do not honor
                  &quot;I filed&quot; without verification.
                </li>
              </ol>
            </div>

            <div>
              <h2 className="text-xl font-semibold">Compliance Plan ($249/yr)</h2>
              <p className="mt-2 text-muted-foreground">
                Prefer to stay: upgrade from your renewal email to the Compliance Plan — registered
                agent, biennial statement prepared and filed when due, quarterly good-standing
                check, 20% off shelf filings (our fee), and a compliance calendar email.
              </p>
            </div>

            <p className="text-sm text-muted-foreground border-t pt-6">
              See also our{' '}
              <Link href="/terms" className="text-primary underline">
                Terms of Service
              </Link>
              . This page is administrative guidance, not legal advice.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
