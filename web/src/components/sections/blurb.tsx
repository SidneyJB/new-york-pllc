// File: web/src/components/sections/blurb.tsx
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { PRICING } from '@/lib/constants'

export function AboutBlurbSection() {
  return (
    <section className="py-12 lg:py-16" aria-labelledby="about-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Card className="border-primary/10 shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <h2 id="about-heading" className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                About us
              </h2>

              <div className="mt-4 space-y-4 text-base leading-7 text-foreground">
                <p>
                  We’re a small New York team that does one thing well: forming PLLCs the right way for licensed
                  professionals. If you’ve seen our 5-star work on{' '}
                  <Link href="https://www.cheapnewyorkllc.com" className="underline underline-offset-4">
                    CheapNewYorkLLC.com
                  </Link>{' '}
                  and{' '}
                  <Link href="https://www.newyorkllcpublishing.com" className="underline underline-offset-4">
                    NewYorkLLCPublishing.com
                  </Link>
                  {' '}(<Link href="https://www.trustpilot.com/review/cheapnewyorkllc.com" className="underline underline-offset-4" target="_blank" rel="noopener noreferrer">
                    see our perfect five star rating on Trustpilot
                  </Link>), this is the same crew—same no-nonsense approach, just focused on PLLCs.
                </p>

                <p>
                  What you can expect from us: clear pricing, clear timelines, and clear communication. The flat fee is{' '}
                  <strong>{'$'}{PRICING.basePrice}</strong> and it includes everything you need to open your practice—NYSED pre-approval,
                  expert naming guidance, accurate and efficient filing, the required legal publishing end-to-end, an EIN,
                  a signature-ready Operating Agreement, and delivery of the documents banks actually ask for.
                </p>

                <p>
                  We know New York’s strict naming rules and PLLC quirks, so we identify issues early and keep the process
                  moving. You won’t need to chase anyone or guess what’s happening—we’ll keep you posted at each
                  milestone and make next steps plain-English.
                </p>

                <p>
                  We offer the best service we can and we’re happy to talk you through every step. We’re real people in
                  New York, not a faceless call center. If you’d rather speak with someone before you pay,{' '}
                  <Link href="/contact" className="underline underline-offset-4">
                    contact us
                  </Link>
                  —we’ll walk you through it.
                </p>

                <p className="text-sm text-muted-foreground">
                  We are not a law firm and do not provide legal or tax advice.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
