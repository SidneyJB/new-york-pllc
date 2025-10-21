import Link from 'next/link'
import Image from 'next/image'

type Founder = {
  name: string
  title: string
  headshotSrc: string
  headshotAlt: string
  bio: string[] // 2–4 short paragraphs per founder
}

const FOUNDERS: Founder[] = [
  {
    name: 'Founder Name One',
    title: 'Co-founder',
    headshotSrc: '/images/founders/founder-1.jpg', // TODO: replace with real headshot path
    headshotAlt: 'Headshot of Founder Name One',
    bio: [
      // TODO: replace with real copy
      'Short bio placeholder. Share a quick backstory—how you began helping New York professionals with entity filings and why the publication step caught your attention.',
      'Explain what you focus on today (e.g., guiding customers, keeping communication plain-English, setting the bar for service).',
      'Add one human detail—a belief, habit, or origin story that makes the work feel personal and local to New York.'
    ],
  },
  {
    name: 'Founder Name Two',
    title: 'Co-founder',
    headshotSrc: '/images/founders/founder-2.jpg', // TODO: replace with real headshot path
    headshotAlt: 'Headshot of Founder Name Two',
    bio: [
      // TODO: replace with real copy
      'Short bio placeholder. Mention practical experience (operations, customer support, or publication logistics) and why details matter.',
      'Describe how you keep things moving for customers—quick replies, clear timelines, zero upsells—and what “doing it right” means to you.',
      'Close with a friendly line that signals approachability and that you’re a real person in New York.'
    ],
  },
]

export default function AboutExtendedSection() {
  return (
    <section className="py-16 lg:py-24 max-w-7xl mx-auto" aria-labelledby="about-extended-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <h1 id="about-extended-heading" className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Our story
          </h1>

          {/* Story */}
          <div className="mt-6 space-y-5 text-base leading-7 text-foreground max-w-none">
            <p>
              We’re a small New York team that built this service after seeing how confusing the PLLC process can feel—
              especially the publication requirement. Too many people ran into half-answers, surprise add-ons, or just
              silence when they needed a simple update. We wanted another path: plain English, predictable steps, and
              real people you can reach.
            </p>
            <p>
              From day one, the idea was simple: do one thing well and do it with care. That means answering questions
              honestly, setting expectations we can keep, and finishing without drama. We don’t try to be everything;
              we focus on the part we’re great at and make it easy for you to get on with your work.
            </p>
            <p>
              We’re New Yorkers. We respect your time, we say what we mean, and we follow through. If you prefer to talk
              to a human before you start, we’ll make time. If you’d rather keep it over email, we’ll keep messages short
              and clear. Either way, you won’t have to chase us.
            </p>
          </div>

          {/* Values (kept focused on story & ethos, not process) */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">What guides us</h2>
            <div className="mt-4 space-y-3 text-base leading-7 text-foreground max-w-none">
              <p><strong>Clarity over complexity.</strong> We communicate like people, not policy manuals.</p>
              <p><strong>Promises we can keep.</strong> We'd rather under-promise than disappoint.</p>
              <p><strong>Kindness and speed.</strong> Quick replies matter when your work depends on paperwork.</p>
              <p><strong>No upsells.</strong> Our job is to help you finish, not to pad a shopping cart.</p>
            </div>
          </div>

          {/* Why we built it (deeper context without repeating product details) */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Why we built this</h2>
            <div className="mt-4 space-y-4 text-base leading-7 text-foreground max-w-none">
              <p>
                We kept meeting licensed professionals who were excellent at their craft and frustrated by the paperwork
                that stood in the way. The sticking point wasn't just forms—it was not knowing what was happening, what
                was required, or when they'd be done. We decided to build the kind of help we wished existed: steady,
                transparent, and human.
              </p>
              <p>
                If you work in a licensed field, you already carry a heavy load of standards and responsibility. Our role
                is to handle a small but stubborn hurdle with care so you can stay focused on your practice.
              </p>
            </div>
          </div>

          {/* Meet the founders */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Meet the founders</h2>

            <div className="mt-6 grid grid-cols-1 gap-10 sm:grid-cols-2 max-w-none">
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
                    {f.bio.map((para, i) => <p key={i}>{para}</p>)}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Our promise */}
          <div className="mt-12 space-y-4 text-base leading-7 text-foreground max-w-none">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Our promise to you</h2>
            <p>
              We'll be straight with you, we'll move quickly, and we'll keep you informed. If something unexpected pops
              up, we'll explain it clearly and work with you on a simple plan. And if you'd rather talk it through
              before you start, we're a message away—no scripts, no runaround.
            </p>
            <p>
              Prefer to speak with someone first?{' '}
              <Link href="/contact" className="underline underline-offset-2">
                Contact us
              </Link>
              .
            </p>
            <p className="text-sm text-muted-foreground">
              We are not a law firm and do not provide legal or tax advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
