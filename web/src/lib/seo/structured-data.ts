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
      // Add social media URLs here when available
    ],
    foundingDate: '2024',
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
    answer: 'The publication process takes exactly 6 weeks as required by law. We coordinate with newspapers in your county to ensure the notices run consecutively. The total timeline from filing to completion is typically 7-8 weeks, including processing time.',
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
    answer: 'The complete process typically takes 7-8 weeks: Weeks 1-2 for Articles of Organization filing and processing, Weeks 3-8 for the 6-week newspaper publication period, and Week 9 for final Certificate of Publication filing.',
  },
]
