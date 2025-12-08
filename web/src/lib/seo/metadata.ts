import type { Metadata } from 'next'
import { SEO_CONFIG } from './config'

export interface PageMetadata {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  robots?: {
    index?: boolean
    follow?: boolean
    googleBot?: {
      index?: boolean
      follow?: boolean
      'max-video-preview'?: number
      'max-image-preview'?: 'none' | 'standard' | 'large'
      'max-snippet'?: number
    }
  }
  openGraph?: {
    title?: string
    description?: string
    type?: 'website' | 'article'
    images?: Array<{
      url: string
      width?: number
      height?: number
      alt?: string
    }>
  }
  twitter?: {
    card?: 'summary' | 'summary_large_image'
    title?: string
    description?: string
    images?: string[]
  }
}

export function generateMetadata({
  title,
  description,
  keywords = [...SEO_CONFIG.keywords],
  canonical,
  robots,
  openGraph,
  twitter
}: PageMetadata): Metadata {
  const fullTitle = title.includes('|') ? title : `${title} | ${SEO_CONFIG.siteName}`
  const canonicalUrl = canonical ? `${SEO_CONFIG.siteUrl}${canonical}` : undefined
  const defaultOgImage = new URL(SEO_CONFIG.socialImage, SEO_CONFIG.siteUrl).toString()

  return {
    title: fullTitle,
    description,
    keywords,
    authors: [{ name: SEO_CONFIG.companyInfo.name }],
    creator: SEO_CONFIG.companyInfo.name,
    publisher: SEO_CONFIG.companyInfo.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(SEO_CONFIG.siteUrl),
    alternates: canonicalUrl ? {
      canonical: canonicalUrl,
    } : undefined,
    openGraph: {
      type: openGraph?.type || 'website',
      locale: 'en_US',
      url: canonicalUrl,
      siteName: SEO_CONFIG.siteName,
      title: openGraph?.title || fullTitle,
      description: openGraph?.description || description,
      images: openGraph?.images || [{
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: 'New York PLLC Formation Service - Professional LLC Services',
      }],
    },
    twitter: {
      card: twitter?.card || 'summary_large_image',
      title: twitter?.title || fullTitle,
      description: twitter?.description || description,
      images: twitter?.images || [defaultOgImage],
      creator: SEO_CONFIG.twitterHandle,
    },
    robots: robots || {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

// Page-specific metadata configurations
export const HOME_METADATA = generateMetadata({
  title: 'NY PLLC Formation | Professional LLC Services New York',
  description: 'Form your New York Professional Limited Liability Company (PLLC) for $885 including all publishing requirements. Fast, simple, and compliant PLLC formation for licensed professionals like doctors, lawyers, and CPAs.',
  keywords: [
    'NY PLLC formation',
    'New York PLLC',
    'PLLC publishing',
    'professional LLC New York',
    'licensed professional LLC',
    'PLLC formation service',
    'NY professional corporation'
  ],
  canonical: '/',
})


export const FAQ_METADATA = generateMetadata({
  title: 'PLLC Formation FAQ | New York Professional LLC Questions',
  description: 'Complete guide to New York PLLC formation questions. Learn about publishing requirements, professional licenses, timelines, and costs for forming your professional LLC in NY.',
  keywords: [
    'PLLC formation FAQ',
    'New York PLLC questions',
    'PLLC publishing FAQ',
    'professional LLC requirements',
    'NY PLLC process'
  ],
  canonical: '/faq',
})

export const CONTACT_METADATA = generateMetadata({
  title: 'Contact NY PLLC Formation | Professional LLC Support',
  description: 'Get help with your New York PLLC formation. Contact our professional support team for questions about PLLC requirements, publishing, and professional licensing in New York.',
  keywords: [
    'PLLC formation contact',
    'NY PLLC support',
    'professional LLC help',
    'PLLC formation questions'
  ],
  canonical: '/contact',
})

export const ORDER_METADATA = generateMetadata({
  title: 'Order NY PLLC Formation | Start Your Professional LLC',
  description: 'Order your New York PLLC formation service for $885. Complete the secure form to start your professional LLC formation including all required publishing and state filings.',
  keywords: [
    'order PLLC formation',
    'buy NY PLLC',
    'start PLLC formation',
    'PLLC formation service'
  ],
  canonical: '/order',
})

export const ORDER_LLC_METADATA = generateMetadata({
  title: 'Order NY LLC Formation | Start Your New York LLC',
  description: 'Order your New York LLC formation service. Complete the secure form to start your LLC formation including state filing and the mandatory publication requirement.',
  keywords: [
    'order LLC formation',
    'buy NY LLC',
    'start LLC formation',
    'New York LLC service',
  ],
  canonical: '/order-llc',
})

export const ABOUT_METADATA = generateMetadata({
  title: 'About NY PLLC Formation | Professional LLC Experts',
  description: 'Learn about our New York PLLC formation service. We specialize in professional LLC formation for licensed professionals including doctors, lawyers, CPAs, and architects in New York.',
  keywords: [
    'about PLLC formation',
    'NY PLLC service',
    'professional LLC experts',
    'PLLC formation company'
  ],
  canonical: '/about',
})

export const PRIVACY_METADATA = generateMetadata({
  title: 'Privacy Policy | NY PLLC Formation Service',
  description: 'Privacy policy for New York PLLC Formation Service. Learn how we protect your personal information during the PLLC formation process.',
  canonical: '/privacy',
})

export const TERMS_METADATA = generateMetadata({
  title: 'Terms of Service | NY PLLC Formation',
  description: 'Terms of service for New York PLLC Formation Service. Read our service terms, guarantees, and conditions for professional LLC formation in New York.',
  canonical: '/terms',
})

export const DISCLAIMER_METADATA = generateMetadata({
  title: 'Legal Disclaimer | NY PLLC Formation Service',
  description: 'Important legal disclaimer for New York PLLC Formation Service. We provide administrative filing services, not legal advice.',
  canonical: '/disclaimer',
})
