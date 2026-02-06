import Link from 'next/link'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { ScrollTracking } from '@/components/analytics/scroll-tracking'
import { Shield, ClipboardList, FileCheck2, Newspaper, Heart, Users, MessageSquare, CheckCircle, ArrowRight } from 'lucide-react'
import { PRICING, APP_CONFIG } from '@/lib/constants'
import { generateBreadcrumbSchema, generateFAQSchema, generateProfessionServiceSchema } from '@/lib/seo/structured-data'

export const metadata: Metadata = {
  title: `Form a New York LMHC PLLC (Mental Health Counselor PLLC) | ${APP_CONFIG?.name || 'New York PLLC'}`,
  description: `LMHC PLLC formation in New York for Licensed Mental Health Counselors. NYSED pre-approval (Mental Health Practitioners), compliant naming, precise Articles, six-week publication, EIN + operating agreement — flat $${PRICING.basePrice}. Built for private practice and teletherapy in NY.`,
  keywords: [
    'LMHC PLLC formation New York',
    'MHC PLLC formation NY',
    'Licensed Mental Health Counselor PLLC',
    'New York counselor PLLC',
    'NYSED Mental Health Practitioners pre-approval',
    'teletherapy NY PLLC',
    'private practice counseling NY',
    'LMHC business formation',
    'NY Certificate of Publication counseling',
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.nypllc.com'}/professions/mhc`,
  },
}

export default function MHCPage() {
  const PRICE = PRICING.basePrice
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.nypllc.com'
  const breadcrumbJson = [
    { name: 'Home', item: siteUrl },
    { name: 'Mental Health Counselor PLLC Formation', item: `${siteUrl}/professions/mhc` },
  ]

  const MHC_FAQ = [
    {
      question: 'Do LMHCs need NYSED pre-approval before forming a PLLC?',
      answer:
        'Yes. Mental Health Counselors fall under NYSED’s Mental Health Practitioners group and typically require NYSED pre-approval before the Department of State accepts formation. We package your application (name, purpose/scope, and professional statements) so it clears review with minimal back-and-forth.',
    },
    {
      question: 'Who can own or manage an LMHC PLLC in New York?',
      answer:
        'Ownership and control of a New York PLLC are generally limited to appropriately licensed professionals who can lawfully provide the services of the entity. For counseling practices, that typically means LMHCs (and, when permitted, closely related licensed professions). We help you organize members/managers to align with NY rules.',
    },
    {
      question: 'Can I offer teletherapy under my LMHC PLLC?',
      answer:
        'Many LMHCs deliver services via teletherapy to NY clients. Entity formation does not expand your licensure — you must follow NY practice rules and payer policies. We ensure your purpose language and name are appropriate for counseling services, including virtual care, and point you to policy resources in our FAQ.',
    },
    {
      question: 'Can my PLLC include pre-licensed clinicians or interns?',
      answer:
        'Limited permit holders and trainees have their own supervision rules. While support staff and trainees may work with your practice, PLLC ownership and professional control are generally restricted to licensed professionals. We structure your documents to reflect compliant governance and advise when to seek legal guidance.',
    },
    {
      question: 'What naming issues commonly delay LMHC approvals?',
      answer:
        'Names must include a professional designator (e.g., “PLLC”), avoid restricted terms (like “clinic” or claims outside counseling), and reflect your actual scope. We provide compliant options and conduct name screening to avoid NYSED objections. See our guidance on ',
    },
    {
      question: 'Is the six-week, two-newspaper publication included in the price?',
      answer:
        `Yes. We coordinate county-assigned publication, manage proofs and affidavits, and file the Certificate of Publication. It’s fully included in the $${PRICE} flat fee — no surprise add-ons.`,
    },
    {
      question: 'What documents will I get for banking, credentialing, and leasing?',
      answer:
        'You receive EIN confirmation, filed Articles, publication affidavits, and the Certificate of Publication — the standard bank-ready set. These are also commonly requested by credentialing teams and landlords.',
    },
    {
      question: 'Can one LMHC PLLC operate multiple locations in New York?',
      answer:
        'Often yes. Many counseling practices add locations as they grow. We set up your formation to support expansion and explain county publication implications if you later add offices in different counties.',
    },
    {
      question: 'How long does LMHC PLLC formation usually take?',
      answer:
        'NYSED pre-approval can add weeks or months depending on review volume. After formation, publication requires six consecutive weeks. We start quickly, give realistic timelines, and keep you updated at each milestone.',
    },
  ]

  // Fix the inline link in the naming FAQ answer with a JSX fragment:
  MHC_FAQ[4].answer += '<a href="/faq#naming-conventions">naming conventions</a>.'

  return (
    <>
      <ScrollTracking />
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbJson)),
        }}
      />
      {/* Service Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateProfessionServiceSchema({
              name: 'New York Mental Health Counselor (MHC) PLLC Formation Service',
              description:
                'PLLC formation for New York Mental Health Counselors (MHC) including NYSED pre-approval coordination, compliant naming, precise filing, required publication, and bank-ready documents.',
              url: '/professions/mhc',
              offers: [
                {
                  name: 'MHC PLLC Formation Package',
                  description:
                    'Includes NYSED pre-approval packet coordination, six-week publication, Certificate of Publication, and formation documents for your counseling practice.',
                  price: `${PRICE}.00`,
                  priceCurrency: 'USD',
                  availability: 'https://schema.org/InStock',
                },
              ],
            })
          ),
        }}
      />
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(MHC_FAQ)),
        }}
      />
      <div className="flex flex-col">
        {/* Breadcrumb Navigation */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb
              items={[
                { label: 'Professions' },
                { label: 'MHC PLLC', href: '/professions/mhc' }
              ]}
            />
          </div>
        </div>

        {/* HERO */}
        <section className="bg-gradient-to-b from-primary/5 via-background to-background py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Form your <span className="text-primary">LMHC PLLC</span> in New York — compliant, clear, and built for private practice
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Designed for Licensed Mental Health Counselors launching or leveling up a private practice (including teletherapy within NY).
              We handle <Link href="/faq#nysed-preapproval" className="text-primary underline underline-offset-2">NYSED pre-approval</Link>,
              counseling-appropriate naming, precise Articles, county publication, and a bank-ready document set — all for <strong>${PRICE}</strong>.
              No hidden fees. Real help from a New York team.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline">NYSED Mental Health Practitioners</Badge>
              <Badge variant="outline">Teletherapy-Friendly Purpose</Badge>
              <Badge variant="outline">Accurate Articles & Filings</Badge>
              <Badge variant="outline">Six-Week Publishing Included</Badge>
              <Badge variant="outline">EIN + Operating Agreement</Badge>
            </div>

            <div className="mt-10 flex justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/order">
                  Start your MHC PLLC — ${PRICE}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Talk to us first</Link>
              </Button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Licensed professionals only • Secure checkout • No upsells</p>
          </div>
        </section>

        {/* WHY IT’S DIFFERENT FOR LMHCs */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Built for New York Mental Health Counselors</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                New York’s rules for counseling entities are strict — from NYSED pre-approval to publishing and bank documentation.
                We form LMHC PLLCs that pass review, support teletherapy and in-person care, and scale with you as you add clinicians or locations.
              </p>
              <p className="mt-4 text-base text-muted-foreground max-w-3xl mx-auto">
                Expect a structured, transparent process: name vetting → NYSED pre-approval → Articles filing → six-week publication → bank-ready package.
                We explain each step in plain English and send timely updates so you always know what’s next.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" /> NYSED Pre-Approval, Done Right
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  We prepare your NYSED submission for Mental Health Practitioners — scope-accurate purpose language and ownership that aligns with counseling practice rules.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" /> Naming That Clears Review
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  We help you avoid restricted terms, misleading claims, and designator mistakes. See{' '}
                  <Link href="/faq#naming-conventions" className="text-primary underline underline-offset-2">naming conventions</Link>{' '}
                  for examples that commonly trigger objections.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck2 className="h-5 w-5 text-primary" /> Precise Articles & Filings
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Articles written specifically for LMHCs and filed correctly with both NYSED and the Department of State — with plain-English updates at each milestone.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Newspaper className="h-5 w-5 text-primary" /> Legal Publishing — Included
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  We manage your county’s two-newspaper, six-week publication, collect affidavits, and file the Certificate of Publication — all included in ${PRICE}.{' '}
                  <Link href="/faq#publishing-requirements" className="text-primary underline underline-offset-2 text-xs">
                    Learn about publishing requirements
                  </Link>.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* WHAT YOU RECEIVE */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to open and grow your counseling practice</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A complete, bank-ready formation package designed for credentialing, leasing, and payer enrollment.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" /> Full Formation
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  NYSED pre-approval support, Articles of Organization, and state filing — end-to-end, without templates or guesswork.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" /> Operating Agreement
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  A profession-specific Operating Agreement for solo or group counseling practices — ready for lender and landlord review.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" /> Bank-Ready Package
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  EIN confirmation, filed Articles, publication affidavits, and Certificate of Publication — exactly what most banks request.
                </CardContent>
              </Card>
            </div>

            <div className="mt-10">
              <Button size="lg" asChild>
                <Link href="/order">Start your MHC PLLC — ${PRICE}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* PROFESSION-SPECIFIC FAQ */}
        <section className="py-20 lg:py-28 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">LMHC PLLC FAQs</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Clear answers to common questions LMHCs ask about forming a Professional Limited Liability Company in New York.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {MHC_FAQ.map((item) => (
                <Card key={item.question}>
                  <CardHeader>
                    <CardTitle className="text-lg">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Render simple HTML link from the naming FAQ safely */}
                    {item.question.includes('naming issues') ? (
                      <p
                        className="text-muted-foreground text-sm"
                        dangerouslySetInnerHTML={{ __html: item.answer }}
                      />
                    ) : (
                      <p className="text-muted-foreground text-sm">{item.answer}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button size="lg" asChild>
                <Link href="/order">Start your MHC PLLC — ${PRICE}</Link>
              </Button>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">This is general information, not legal advice.</p>
          </div>
        </section>

        {/* TRUST & CTA */}
        <section className="bg-muted/40 py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">We understand New York counseling practices</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From NYSED pre-approval to publication and bank-ready documents, our process is built for LMHCs — solo practice, group practice,
              or multi-location growth with teletherapy and in-person care.
            </p>
            <p className="mt-6 text-muted-foreground">
              We’re based in New York and actually answer the phone. No scripts. No bots. Just experienced help for licensed professionals.
            </p>

            <div className="mt-10 flex justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/order">Start now — ${PRICE}</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Talk to us first</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">We are not a law firm and do not provide legal advice.</p>
          </div>
        </section>
      </div>
    </>
  )
}
