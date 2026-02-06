import { SEO_CONFIG } from './config'

export interface BreadcrumbItem {
  name: string
  item: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface ServiceOffer {
  name: string
  description: string
  price: string
  priceCurrency: string
  availability: string
}

export interface HowToStepItem {
  name: string
  text: string
  url?: string
}

// Organization Schema (for root layout)
export function generateOrganizationSchema() {
  const address = SEO_CONFIG.companyInfo.address

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SEO_CONFIG.siteUrl}#organization`,
    name: SEO_CONFIG.companyInfo.name,
    url: SEO_CONFIG.siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${SEO_CONFIG.siteUrl}/logo.png`,
      width: 400,
      height: 400,
    },
    description: SEO_CONFIG.companyInfo.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.postalCode,
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SEO_CONFIG.companyInfo.phone,
      email: SEO_CONFIG.companyInfo.email,
      contactType: 'customer service',
      availableLanguage: 'English',
    },
    sameAs: [
			"https://cheapnewyorkllc.com",
      "https://www.trustpilot.com/review/cheapnewyorkllc.com"
    ],
    foundingDate: '2005',
    areaServed: {
      '@type': 'State',
      name: 'New York',
    },
    serviceType: 'Professional LLC Formation',
    knowsAbout: [
      'PLLC Formation',
      'Professional Limited Liability Company',
      'New York State Filing',
      'Newspaper Publishing',
      'Certificate of Publication'
    ],
  }
}

// LocalBusiness Schema (NY-specific)
export function generateLocalBusinessSchema() {
  const address = SEO_CONFIG.companyInfo.address

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SEO_CONFIG.siteUrl}#localbusiness`,
    name: SEO_CONFIG.companyInfo.name,
    url: SEO_CONFIG.siteUrl,
    telephone: SEO_CONFIG.companyInfo.phone,
    email: SEO_CONFIG.companyInfo.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.postalCode,
      addressCountry: 'US',
    },
    openingHours: 'Mo-Fr 09:00-18:00',
    priceRange: '$$',
    description: SEO_CONFIG.companyInfo.description,
    serviceArea: {
      '@type': 'State',
      name: 'New York',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 5,
      bestRating: 5,
      ratingCount: 100,
    },
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: 5,
        bestRating: 5,
      },
      author: {
        '@type': 'Organization',
        name: 'Trustpilot',
      },
      url: 'https://www.trustpilot.com/review/cheapnewyorkllc.com',
    },
  }
}

// Service Schema (for home/pricing pages)
export function generateServiceSchema(offers: ServiceOffer[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SEO_CONFIG.siteUrl}#service`,
    name: 'NY PLLC Formation Service',
    description: 'Professional Limited Liability Company formation service for licensed professionals in New York, including mandatory newspaper publishing requirements.',
    provider: {
      '@id': `${SEO_CONFIG.siteUrl}#organization`,
    },
    areaServed: {
      '@type': 'State',
      name: 'New York',
    },
    serviceType: 'Business Formation',
    category: 'Legal Services',
    offers: offers.map(offer => ({
      '@type': 'Offer',
      name: offer.name,
      description: offer.description,
      price: offer.price,
      priceCurrency: offer.priceCurrency,
      availability: offer.availability,
      seller: {
        '@id': `${SEO_CONFIG.siteUrl}#organization`,
      },
    })),
  }
}

// Service Schema (for profession-specific pages)
export function generateProfessionServiceSchema({
  name,
  description,
  url,
  offers,
}: {
  name: string
  description: string
  url: string
  offers: ServiceOffer[]
}) {
  const absoluteUrl = url.startsWith('http') ? url : `${SEO_CONFIG.siteUrl}${url}`

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl}#service`,
    name,
    description,
    url: absoluteUrl,
    provider: {
      '@id': `${SEO_CONFIG.siteUrl}#organization`,
    },
    areaServed: {
      '@type': 'State',
      name: 'New York',
    },
    serviceType: 'Professional LLC Formation',
    category: 'Legal Services',
    offers: offers.map((offer) => ({
      '@type': 'Offer',
      name: offer.name,
      description: offer.description,
      price: offer.price,
      priceCurrency: offer.priceCurrency,
      availability: offer.availability,
      url: absoluteUrl,
      seller: {
        '@id': `${SEO_CONFIG.siteUrl}#organization`,
      },
    })),
  }
}

// FAQPage Schema (for FAQ page)
export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    publisher: {
      '@id': `${SEO_CONFIG.siteUrl}#organization`,
    },
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// BreadcrumbList Schema (for navigation)
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  }
}

// HowTo Schema (for step-by-step guides)
export function generateHowToSchema({
  name,
  description,
  url,
  steps,
}: {
  name: string
  description: string
  url: string
  steps: HowToStepItem[]
}) {
  const absoluteUrl = url.startsWith('http') ? url : `${SEO_CONFIG.siteUrl}${url}`

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    url: absoluteUrl,
    inLanguage: 'en-US',
    publisher: {
      '@id': `${SEO_CONFIG.siteUrl}#organization`,
    },
    step: steps.map((s, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: s.name,
      text: s.text,
      url: s.url
        ? s.url.startsWith('http')
          ? s.url
          : `${SEO_CONFIG.siteUrl}${s.url}`
        : undefined,
    })),
  }
}

// Article Schema (for blog posts, guides, articles)
export function generateArticleSchema({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  author,
  image,
}: {
  headline: string
  description: string
  url: string
  datePublished: string
  dateModified?: string
  author?: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url: url.startsWith('http') ? url : `${SEO_CONFIG.siteUrl}${url}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: author || SEO_CONFIG.companyInfo.name,
      '@id': `${SEO_CONFIG.siteUrl}#organization`,
    },
    publisher: {
      '@id': `${SEO_CONFIG.siteUrl}#organization`,
    },
    image: image || `${SEO_CONFIG.siteUrl}/og-image.png`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url.startsWith('http') ? url : `${SEO_CONFIG.siteUrl}${url}`,
    },
  }
}

// WebSite Schema (for root layout)
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SEO_CONFIG.siteUrl}#website`,
    url: SEO_CONFIG.siteUrl,
    name: SEO_CONFIG.siteName,
    description: SEO_CONFIG.defaultDescription,
    publisher: {
      '@id': `${SEO_CONFIG.siteUrl}#organization`,
    },
    inLanguage: 'en-US',
  }
}

// Combined schema for root layout
export function generateRootSchemas() {
  return [
    generateOrganizationSchema(),
    generateLocalBusinessSchema(),
    generateWebSiteSchema(),
  ]
}

// HowTo data for the DIY PLLC guide
export const DIY_PLLC_HOWTO = generateHowToSchema({
  name: 'How to Form a New York PLLC',
  description:
    'Step-by-step guide to forming a New York PLLC: Office of the Professions approval, Department of State filing, and the 6-week publication requirement.',
  url: '/how-to-form-a-pllc-in-ny',
  steps: [
    {
      name: 'Choose a compliant PLLC name and confirm eligibility',
      text: 'Pick 3–5 name options ending in “PLLC”, check distinguishability, and confirm all owners/managers are properly licensed in New York for the services you will provide.',
    },
    {
      name: 'Prepare the Office of the Professions (OP) application packet',
      text: 'Assemble the OP forms, roster/addendum, supporting documents, and a cover letter. Ensure your PLLC name and license details match everywhere to avoid deficiency letters.',
    },
    {
      name: 'Track OP review and respond to any deficiencies',
      text: 'Follow up after delivery, respond precisely to deficiency requests, and preserve the Certificate of Authority once issued (scan and store copies).',
    },
    {
      name: 'Prepare Professional Service Articles of Organization for DOS',
      text: 'Use the Professional Service Articles form (not the standard LLC form), include profession-accurate purpose language, and ensure county and service-of-process details are consistent.',
    },
    {
      name: 'File with the Department of State (DOS)',
      text: 'Submit your formation packet to DOS (often with expedite). Save your filing receipt and keep a complete copy of what you sent.',
    },
    {
      name: 'Complete the 6-week, two-newspaper publication requirement',
      text: 'Identify county-designated newspapers, approve proofs that match your DOS record exactly, monitor six consecutive weeks in both papers, and collect affidavits.',
    },
    {
      name: 'File the Certificate of Publication with DOS',
      text: 'Assemble the certificate and affidavits in the expected order, submit to DOS, and retain proof of acceptance and receipts.',
    },
    {
      name: 'Obtain an EIN and open a business bank account',
      text: 'Apply for an EIN, then open a business bank account using your formation documents and operating agreement.',
    },
    {
      name: 'Adopt an Operating Agreement',
      text: 'New York requires an operating agreement. Draft and execute one that matches your professional requirements and ownership/management structure.',
    },
    {
      name: 'Stay compliant (biennial statements and ongoing updates)',
      text: 'Calendar biennial statement deadlines, keep records organized, and keep OP/DOS information consistent when ownership or addresses change.',
    },
  ],
})

// Service offers for PLLC formation
export const PLLC_SERVICE_OFFERS: ServiceOffer[] = [
  {
    name: 'Complete PLLC Formation Package',
    description: 'Articles of Organization filing, free first year registered agent service, 6-week newspaper publishing in two newspapers, Certificate of Publication filing, and all required affidavits.',
    price: '885.00',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
]

// FAQ data for structured data
export const PLLC_FAQS: FAQItem[] = [
  {
    question: 'What is a PLLC?',
    answer: 'A Professional Limited Liability Company (PLLC) is a business structure designed specifically for licensed professionals in New York. It provides personal liability protection while allowing professionals to practice their licensed services. PLLCs are restricted to licensed professionals like doctors, lawyers, accountants, architects, and engineers.',
  },
  {
    question: 'Who can form a PLLC in New York?',
    answer: 'PLLCs are limited to licensed professionals including physicians (MD/DO), dentists (DDS/DMD), attorneys/lawyers, certified public accountants (CPAs), architects, engineers, veterinarians, and other licensed professionals as defined by NY law.',
  },
  {
    question: 'What is the publishing requirement for NY PLLCs?',
    answer: 'New York law requires all PLLCs to publish their formation notice in two newspapers (one daily and one weekly) for six consecutive weeks. This publication must run in newspapers designated by the county where the PLLC\'s office is located. After publication, an affidavit of publication must be filed with the New York Department of State.',
  },
  {
    question: 'Why is publishing required?',
    answer: 'The publishing requirement provides public notice of new professional practices and helps maintain transparency in professional services. It\'s a legal requirement that helps protect consumers by making PLLC formations publicly known.',
  },
  {
    question: 'How long does the publishing process take?',
    answer: 'The publication process takes exactly 6 weeks as required by law. We coordinate with newspapers in your county to ensure the notices run consecutively. The total timeline from filing to completion is typically 14-19 weeks, including NYSED approval (8-12 weeks) and the 6-week publication period.',
  },
  {
    question: 'Why is your service $885?',
    answer: 'Our $885 price includes everything: Articles of Organization filing, free first year registered agent service, 6-week newspaper publication in two newspapers, Certificate of Publication filing, and all required affidavits. Many competitors charge $99 for filing but then add $500-1000+ for publishing, making their total cost much higher.',
  },
  {
    question: 'Are there any hidden fees?',
    answer: 'No hidden fees whatsoever. The $885 includes all state filing fees, publication costs, and our service fees. The only additional cost would be if you need expedited processing from the state, which is optional and rarely necessary.',
  },
  {
    question: 'How long does PLLC formation take?',
    answer: 'The complete process typically takes 14-19 weeks: Weeks 1-12 for NYSED approval (typically 8-12 weeks), Weeks 13-18 for the 6-week newspaper publication period, and Week 19 for final Certificate of Publication filing.',
  },
]
