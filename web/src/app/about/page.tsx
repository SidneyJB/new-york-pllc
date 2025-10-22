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
    name: 'Sid',
    title: 'Co-founder',
    headshotSrc: '/founder-1.jpeg', // TODO: replace with real headshot path
    headshotAlt: 'Headshot of Founder Name One',
    bio: [
			"I help licensed professionals turn plans into real New York PLLCs by guiding you through one of the most important early steps: forming your entity the right way.",
			"With an engineering background, I’ve built our systems that streamline every part of the process—reducing errors, speeding up filings, and keeping everything organized from start to finish. My goal is to make something that’s usually stressful feel smooth and predictable.",
			"Clients work with me because I cut through confusing state rules and legal jargon, make sure you’re compliant from day one, save time and avoidable costs, and provide responsive, personal service—no upsells, no runaround.",
			"Whether you’re opening your first practice or formalizing a growing one, my mission is the same: give you a solid legal start so you can focus on your work. I’m NYC-based and always happy to talk things through before you start."
			]
  },
  {
    name: 'Steve',
    title: 'Co-founder',
    headshotSrc: '/founder-2.jpg', // TODO: replace with real headshot path
    headshotAlt: 'Headshot of Founder Name Two',
    bio: [
      'I help entrepreneurs turn their ideas into reality by guiding them through one of the most important first steps: forming their business entity the right way.',
      'With 25+ years of experience and a proven track record of assisting over 25,000 business owners, I specialize in making the LLC and corporation formation process fast, accurate, and stress-free. My expertise is especially deep in New York business law, where many national providers like Legalzoom, Bizee, Northwest, etc. fall short or spread misinformation.',
      'Over the years, I\'ve built a reputation for cutting through confusing state rules and legal jargon, ensuring compliance from day one, and saving clients time, money, and unnecessary headaches. I provide trusted, personal service in an industry often dominated by faceless "big box" formation companies.',
      'Whether you\'re starting a small local business, scaling into new markets, or exploring foreign registration, my mission is the same: make sure your company\'s legal foundation is solid so you can focus on growth.'
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

            <div className="mt-6 relative">
              <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 transform -translate-x-1/2 z-10"></div>
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                {FOUNDERS.map((f) => (
                  <article key={f.name} className="flex flex-col gap-4">
                  <div className="relative h-64 w-full overflow-hidden rounded-xl ">
                    <Image
                      src={f.headshotSrc}
                      alt={f.headshotAlt}
                      fill
                      priority
                      className="object-contain"
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
