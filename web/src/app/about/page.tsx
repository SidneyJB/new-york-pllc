import Link from 'next/link'
import Image from 'next/image'
import { PRICING } from '@/lib/constants'

type Founder = {
  name: string
  title: string
  headshotSrc: string
  headshotAlt: string
  bio: string[]
}

const FOUNDERS: Founder[] = [
  {
    name: 'Founder Name One',
    title: 'Co-founder',
    headshotSrc: '/images/founders/founder-1.jpg', // TODO: replace with real headshot path
    headshotAlt: 'Headshot of Founder Name One',
    bio: [
      // TODO: replace with a real bio (2–4 short sentences recommended)
      'Short bio placeholder. Add a couple of sentences about background (e.g., years helping NY professionals form entities) and a line about what they handle day-to-day.',
      'Add one sentence that feels human—why they care about doing this work well for licensed professionals in New York.'
    ],
  },
  {
    name: 'Founder Name Two',
    title: 'Co-founder',
    headshotSrc: '/images/founders/founder-2.jpg', // TODO: replace with real headshot path
    headshotAlt: 'Headshot of Founder Name Two',
    bio: [
      // TODO: replace with a real bio (2–4 short sentences recommended)
      'Short bio placeholder. Mention prior experience (operations, publishing logistics, filings) and the part they personally own in the process.',
      'Include a sentence about responsiveness, plain-English communication, or taking pride in getting details right.'
    ],
  },
]

export function AboutExtendedSection() {
  return (
    <section className="py-16 lg:py-24" aria-labelledby="about-extended-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 id="about-extended-heading" className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            About us
          </h1>

          <div className="mt-6 space-y-5 text-base leading-7 text-foreground">
            <p>
              We’re a small New York team that does one thing well: forming PLLCs the right way and handling the
              state’s publication requirement from start to finish. If you’ve used our other sites, this is the same
              crew—same no-nonsense approach, just focused on PLLCs.
            </p>

            <p>
              What you can expect from us is simple: clear pricing, clear timelines, and clear communication. The flat
              fee is <strong>{'$'}{PRICING.basePrice}</strong> and it includes the two-newspaper, six-week publication. We’ll prepare and
              file your Articles of Organization, manage publication, file the Certificate of Publication, and send your
              final documents with next steps you can actually follow.
            </p>

            <p>
              We offer the best service we can and we’re happy to talk you through every step. We’re real people in New
              York—no upsells, no runaround. If you’d rather speak with someone before you pay,{' '}
              <Link href="/contact" className="underline underline-offset-2">
                contact us
              </Link>{' '}
              and we’ll walk you through it.
            </p>
          </div>

          {/* How we work */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              How we work
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-foreground">
              <li>Plain-English updates at each milestone so you’re never guessing.</li>
              <li>Publication is included up front—no “gotcha” fees later.</li>
              <li>We check for common PLLC name and rule issues early to avoid delays.</li>
              <li>Email us anytime. If it’s easier to talk, we’ll hop on the phone.</li>
            </ul>
          </div>

          {/* Founders */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Meet the founders
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-10 sm:grid-cols-2">
              {FOUNDERS.map((f) => (
                <article key={f.name} className="flex flex-col gap-4">
                  <div className="relative h-64 w-full overflow-hidden rounded-xl bg-muted">
                    <Image
                      src={f.headshotSrc}
                      alt={f.headshotAlt}
                      fill
                      priority
                      className="object-cover"
                      sizes="(min-width: 640px) 50vw, 100vw"
                    />
                  </div>

                  <header>
                    <h3 className="text-xl font-semibold text-foreground">{f.name}</h3>
                    <p className="text-sm text-muted-foreground">{f.title}</p>
                  </header>

                  <div className="space-y-3 text-base leading-7 text-foreground">
                    {f.bio.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Friendly close + disclaimer */}
          <div className="mt-12 space-y-4 text-base leading-7 text-foreground">
            <p>
              If you’re a licensed professional and ready to set up your PLLC, we’ll make it uncomplicated. Start when
              you’re ready, and if you want to talk first, we’re here.
            </p>
            <p className="text-sm text-muted-foreground">
              We are not a law firm and do not provide legal advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutExtendedSection
