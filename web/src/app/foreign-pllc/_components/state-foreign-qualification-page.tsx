import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { ForeignStateSelector } from './foreign-state-selector'
import { ScrollTracking } from '@/components/analytics/scroll-tracking'
import { PRICING } from '@/lib/constants'
import { SEO_CONFIG } from '@/lib/seo/config'
import { generateBreadcrumbSchema, generateFAQSchema, generateProfessionServiceSchema } from '@/lib/seo/structured-data'
import { ArrowRight, FileCheck2, MapPin, Shield } from 'lucide-react'

export type StateForeignQualificationContent = {
  state: string
  slug: string
  pllcPrice: number
  pcPrice: number
  intro: string
  whoThisIsFor: string[]
  documents: string[]
  eligibilityNuance: string
  whatWeCheck: string
  professions: string[]
  stateCta: string
  faqs: { question: string; answer: string }[]
}

export function StateForeignQualificationPage({ content }: { content: StateForeignQualificationContent }) {
  const pageUrl = `${SEO_CONFIG.siteUrl}/foreign-pllc/${content.slug}`
  const breadcrumbJson = [
    { name: 'Home', item: SEO_CONFIG.siteUrl },
    { name: 'Foreign PLLC Qualification', item: `${SEO_CONFIG.siteUrl}/foreign-pllc` },
    { name: content.state, item: pageUrl },
  ]

  const processSteps = [
    'We review the home-state entity type and formation documents.',
    'We confirm whether the entity should qualify as a foreign PLLC or foreign PC.',
    'We obtain or review home-state good-standing and certified formation documents.',
    'We prepare the NY Application for Authority and professional filings.',
    'If the legal name does not comply in NY, we prepare a Certificate of Assumed Name.',
    'We explain the NY publication step and quote any publication-related costs before filing.',
  ]

  return (
    <>
      <ScrollTracking />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbJson)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(content.faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateProfessionServiceSchema({
              name: `${content.state} Professional Entity Foreign Qualification in New York`,
              description: `Foreign PLLC and foreign PC filing help for licensed professionals with ${content.state} professional entities expanding into New York.`,
              url: `/foreign-pllc/${content.slug}`,
              offers: [
                {
                  name: `${content.state} to New York Foreign PLLC`,
                  description: `For eligible professional LLCs, PLLCs, or restricted professional LLCs formed in ${content.state}.`,
                  price: `${content.pllcPrice}.00`,
                  priceCurrency: 'USD',
                  availability: 'https://schema.org/InStock',
                },
                {
                  name: `${content.state} to New York Foreign PC`,
                  description: `For professional corporations formed in ${content.state}.`,
                  price: `${content.pcPrice}.00`,
                  priceCurrency: 'USD',
                  availability: 'https://schema.org/InStock',
                },
              ],
            })
          ),
        }}
      />

      <div className="flex flex-col">
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb
              items={[
                { label: 'Foreign PLLC Qualification', href: '/foreign-pllc' },
                { label: content.state, href: `/foreign-pllc/${content.slug}` },
              ]}
            />
          </div>
        </div>

        <section className="bg-gradient-to-b from-primary/5 via-background to-background py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              {content.state} Professional Entity Foreign Qualification in New York
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">{content.intro}</p>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              We help licensed professionals foreign-qualify eligible {content.state} professional LLCs, PLLCs,
              restricted professional LLCs, and PCs in New York.
            </p>

            <div className="mt-8 flex flex-col items-center gap-2">
              <p className="text-sm text-muted-foreground">View another home state</p>
              <ForeignStateSelector currentSlug={content.slug} />
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline">Foreign PLLC Review</Badge>
              <Badge variant="outline">Foreign PC Path</Badge>
              <Badge variant="outline">NY Assumed Name Help</Badge>
              <Badge variant="outline">Licensed Professionals</Badge>
            </div>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Check my entity&apos;s eligibility
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/foreign-pllc">Learn about foreign qualification</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Who this is for</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                For licensed professionals who already formed in {content.state} and need New York authority before
                serving NY clients, hiring in NY, contracting in NY, or opening New York operations.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {content.whoThisIsFor.map((item) => (
                <Card key={item}>
                  <CardContent className="pt-6 text-sm text-muted-foreground">{item}</CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{content.state} to New York pricing</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Flat package price for {content.state} to New York — the same for foreign PLLC and foreign PC.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>{content.state} to New York foreign PLLC</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">${content.pllcPrice}</p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    For eligible professional LLCs, PLLCs, or restricted professional LLCs formed in {content.state}.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{content.state} to New York foreign PC</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">${content.pcPrice}</p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    For professional corporations formed in {content.state}.
                  </p>
                </CardContent>
              </Card>
            </div>
            <p className="mt-8 text-sm text-muted-foreground">
              Pricing includes our NY foreign qualification handling and standard home-state document assumptions. If your
              filing requires unusual certified copies, additional owners, publication handling, or a NY assumed name, we
              will quote that before filing.
            </p>
          </div>
        </section>

        <section className="py-20 lg:py-28 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">How the NY foreign qualification process works</h2>
                <div className="mt-8 space-y-4">
                  {processSteps.map((step, index) => (
                    <div key={step} className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        {index + 1}
                      </div>
                      <p className="text-muted-foreground">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" /> Eligibility rules
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-muted-foreground">
                    <p>A home-state PC qualifies into New York as a foreign PC. A home-state PC cannot qualify into New York as a PLLC.</p>
                    <p>
                      A home-state professional LLC, PLLC, or restricted professional LLC may qualify into New York as a
                      foreign PLLC if the original formation documents show a professional or restricted professional purpose.
                    </p>
                    <p>A general-purpose LLC is usually not enough for NY foreign PLLC qualification, even if the owner is licensed.</p>
                    <p>{content.eligibilityNuance}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck2 className="h-5 w-5 text-primary" /> What we need from you
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">
                    We obtain your {content.state} standing certificate and certified formation documents. To get
                    started, we typically need:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {content.documents.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                    <li className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      <span>
                        NY business address or registered agent details, if you are not using your own. We also offer{' '}
                        <Link
                          href="/virtual-address-services"
                          className="text-primary underline underline-offset-2 hover:text-primary/80"
                        >
                          virtual address and registered agent services
                        </Link>{' '}
                        if you need them.
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" /> What we check before filing
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{content.whatWeCheck}</CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <Card>
              <CardHeader>
                <CardTitle>DBA / assumed name note</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Some foreign entities cannot use their exact home-state legal name in New York. NY may require the name
                  to identify the licensed profession, avoid misleading wording, or otherwise comply with NY professional
                  entity naming rules. When needed, we can file a New York Certificate of Assumed Name so the entity can
                  operate under a compliant NY-facing name.
                </p>
                <p>
                  DBA / Certificate of Assumed Name:{' '}
                  <strong className="text-foreground">{`$${PRICING.assumedNamePrice}`}</strong>. This is not
                  included in the foreign qualification price unless specifically quoted.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Common professions served</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We work with licensed professionals whose entity type and ownership need to match New York professional rules.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {content.professions.map((profession) => (
                <Badge key={profession} variant="outline" className="text-sm">
                  {profession}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{content.state} foreign qualification FAQs</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {content.faqs.map((item) => (
                <Card key={item.question}>
                  <CardHeader>
                    <CardTitle className="text-lg">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/40 py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to qualify your {content.state} entity in New York?</h2>
            <p className="mt-4 text-lg text-muted-foreground">{content.stateCta}</p>
            <div className="mt-10 flex justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/contact">Get a NY foreign qualification quote</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">General information only. We are not a law firm and do not provide legal advice.</p>
          </div>
        </section>
      </div>
    </>
  )
}
