import {
  HeroSection,
  FeaturesSection,
  ProcessSection,
  TimelineSection,
  GuaranteeSection,
  DisclaimerSection,
  CTASection
} from '@/components/sections'
import { AboutBlurbSection } from '@/components/sections/blurb'
import { HOME_METADATA } from '@/lib/seo/metadata'
import {
  PLLC_SERVICE_OFFERS,
  PLLC_FAQS,
  generateServiceSchema,
  generateFAQSchema,
  generateBreadcrumbSchema
} from '@/lib/seo/structured-data'

export const metadata = HOME_METADATA

export default function Home() {
  return (
    <>
      {/* Service Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateServiceSchema(PLLC_SERVICE_OFFERS)),
        }}
      />

      {/* FAQ Structured Data (Top 4 FAQs for home page) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(PLLC_FAQS.slice(0, 4))),
        }}
      />

      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: 'Home', item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://newyorkpllc.com'}` }
          ])),
        }}
      />

      <div className="flex flex-col">
        <HeroSection />
        <FeaturesSection />
        <AboutBlurbSection />
        <TimelineSection />
        {/* <ProcessSection /> */}
        <GuaranteeSection />
        {/* <DisclaimerSection /> */}
        <CTASection />
      </div>
    </>
  )
}
