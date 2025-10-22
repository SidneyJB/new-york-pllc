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
              We’re a small New York team that does one thing well: forming PLLCs the right way and handling the
              state’s publication requirement from start to finish. If you’ve seen our 5-star-rated work on{' '}
              <Link href="https://www.cheapnewyorkllc.com" className="underline underline-offset-4">
                CheapNewYorkLLC.com
              </Link>{' '}
              and{' '}
              <Link href="https://www.newyorkllcpublishing.com" className="underline underline-offset-4">
                NewYorkLLCPublishing.com
              </Link>
              , this is the same crew—same no-nonsense approach, just focused on PLLCs.
            </p>

            <p>
              What you can expect from us: clear pricing, clear timelines, and clear communication. The flat fee is{' '}
              <strong>{'$'}{PRICING.basePrice}</strong> and it includes the two-newspaper, six-week publication, plus free first year registered agent service. We’ll
              prepare and file your Articles of Organization, manage the publication, file the Certificate of
              Publication, and send your final documents with simple next steps. You won’t need to chase anyone or guess
              what’s happening—we’ll keep you posted.
            </p>

            <p>
              We offer the absolute best service we can and we’re happy to talk you through every step. We’re real
              people in New York, not a faceless call center. If you have questions at any point, reach out and we’ll
              walk you through it. You can{' '}
              <Link href="/contact" className="underline underline-offset-4">
                contact us here
              </Link>
              .
            </p>

            <p>
              We’re not a law firm, and we don’t upsell. We answer emails quickly, we know New York’s quirks, and we
              care about getting it done right the first time. If you’re a licensed professional and ready to set up
              your PLLC, we’ll make it uncomplicated.
            </p>

              <p className="text-sm text-muted-foreground">
                We are not a law firm and do not provide legal advice.
              </p>
            </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
