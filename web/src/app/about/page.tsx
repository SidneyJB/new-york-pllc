import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { ScrollTracking } from '@/components/analytics/scroll-tracking'
import { ABOUT_METADATA } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data'

export const metadata = ABOUT_METADATA

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
    headshotAlt: 'Photo of Sid, Co-founder of New York PLLC Formation Service',
    bio: [
      "I started this service after watching licensed professionals get stuck dealing with the complicated steps of New York PLLC formation. I handle the nuts and bolts, making sure every detail is right so your business gets off to a clean start.",
      "I designed and built our entire process from scratch, creating systems that handle document creation, government filings, and legal requirement checks. This cuts out the mistakes and delays that usually happen with manual work.",
      "I keep things accurate and clear: every form gets filled out correctly, every deadline gets tracked, and every requirement gets met without any surprises. No shortcuts, no hidden issues, just consistent, dependable results.",
      "I get what professional life demands because I've created systems specifically for licensed professionals like you. My engineering background means I solve problems efficiently, not with piles of paperwork. Get in touch if you want to understand exactly how it all works before you start."
    ]
  },
  {
    name: 'Steve',
    title: 'Co-founder',
    headshotSrc: '/founder-2.jpg', // TODO: replace with real headshot path
    headshotAlt: 'Photo of Steve, Co-founder of New York PLLC Formation Service',
    bio: [
      "I help entrepreneurs turn their ideas into reality by guiding them through one of the most important first steps: forming their business entity the right way.", 
      "With 25+ years of experience and a proven track record of assisting over 25,000 business owners, I specialize in making the LLC and corporation formation process fast, accurate, and stress-free. My expertise is especially deep in New York business law, where many national providers like Legalzoom, Bizee, Northwest, etc. fall short or spread misinformation.",
      "Since 2005 I've built a reputation for cutting through confusing state rules and legal jargon, ensuring compliance from day one, and saving clients time, money, and unnecessary headaches. I provide trusted, personal, and friendly service in an industry often dominated by faceless \"big box\" formation companies.",
      "Whether you're starting a small local business, scaling into new markets, or exploring foreign registration, my mission is the same: make sure your company's legal foundation is solid so you can focus on growth.",
      ],
  },
]

export default function AboutExtendedSection() {
  return (
    <>
      <ScrollTracking />
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: 'About', item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://newyorkpllc.com'}/about` }
          ])),
        }}
      />
      {/* Breadcrumb Navigation */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb
            items={[
              { label: 'About', href: '/about' }
            ]}
          />
        </div>
      </div>

      <section className="py-16 lg:py-24 max-w-7xl mx-auto" aria-labelledby="about-extended-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <h1 id="about-extended-heading" className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Our story
          </h1>

          {/* Story */}
          <div className="mt-6 space-y-5 text-base leading-7 text-foreground max-w-none">
            <p>
            We’re a small New York team that built this service after seeing how confusing the PLLC process can be for busy New York professionals. Too many people ran into half-answers, surprise add-ons, or just silence when they needed a simple update. We wanted another path: plain English, predictable steps, and real people you can reach.

            </p>
            <p>
            From day one, the idea was simple: do one thing well and do it with care. That means answering questions honestly, setting expectations we can keep, and finishing without drama. We don’t try to be everything; we focus on the part we’re great at and make it easy for you to get on with your work.
            </p>
            <p>
            We respect your time, we say what we mean, and we follow through. If you prefer to talk to a human before you start, we’ll make time. If you’d rather keep it over email, we’ll keep messages short and clear. Either way, you won’t have to chase us.
            </p>
          </div>

          {/* Values (kept focused on story & ethos, not process) */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">What guides us</h2>
            <div className="mt-4 space-y-3 text-base leading-7 text-foreground max-w-none">
              <p><strong>Clarity over complexity.</strong> We communicate like people, not policy manuals. No AI or chatbot shortcuts.</p>
              <p><strong>Promises we can keep.</strong> We'd rather under-promise than disappoint.</p>
              <p><strong>Kindness and speed.</strong> Quick replies matter when your work depends on paperwork.</p>
            </div>
          </div>

          {/* Why we built it (deeper context without repeating product details) */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Why we built this</h2>
            <div className="mt-4 space-y-4 text-base leading-7 text-foreground max-w-none">
              <p>
              We kept meeting licensed professionals who were excellent at their craft and frustrated by the paperwork that stood in the way. The sticking point wasn't just forms, it was not knowing what was happening, what was required, or when they'd be done. We decided to build the kind of help we wished existed: steady, transparent, and human.
              </p>
              <p>
              If you work in a licensed field, you already carry a heavy load of standards and responsibility. Our role is to handle a small but stubborn hurdle with care so you can stay focused on your practice.
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
            We'll be straight with you, we'll move quickly, and we'll keep you informed. If something unexpected pops up, we'll explain it clearly and work with you on a simple plan. And if you'd rather talk it through before you start, we're a message away—no scripts, no runaround.

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
    </>
  )
}
