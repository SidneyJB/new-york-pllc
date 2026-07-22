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
  title: 'NY PLLC Formation — $885 Flat, Publishing Included | NYPLLC',
  description: 'Form your New York PLLC for $885 flat — DOS filing, required 6-week publication, and EIN included. Fast, compliant formation for licensed professionals.',
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
  title: 'New York PLLC Formation FAQ | NYPLLC',
  description: 'Answers to the most common New York PLLC questions: publishing requirements, professional licensing, timelines, and the $885 flat cost.',
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
  title: 'Contact NYPLLC | NY PLLC Formation Support',
  description: 'Questions about NY PLLC formation, NYSED approval, publishing, or your order? Contact our support team — we reply fast and know the process cold.',
  keywords: [
    'PLLC formation contact',
    'NY PLLC support',
    'professional LLC help',
    'PLLC formation questions'
  ],
  canonical: '/contact',
})

export const ORDER_METADATA = generateMetadata({
  title: 'Order Your NY PLLC — $885 Flat | NYPLLC',
  description: 'Start your New York PLLC formation for $885 flat — DOS filing, required publication, and EIN included. Secure order form, no hidden fees.',
  keywords: [
    'order PLLC formation',
    'buy NY PLLC',
    'start PLLC formation',
    'PLLC formation service'
  ],
  canonical: '/order',
})

export const ORDER_LLC_METADATA = generateMetadata({
  title: 'Order Your NY LLC Formation | NYPLLC',
  description: 'Start your New York LLC formation online. Secure order form covers state filing and the mandatory 6-week publication requirement.',
  keywords: [
    'order LLC formation',
    'buy NY LLC',
    'start LLC formation',
    'New York LLC service',
  ],
  canonical: '/order-llc',
})

export const ABOUT_METADATA = generateMetadata({
  title: 'About NYPLLC | NY PLLC Formation Experts',
  description: 'NYPLLC specializes in New York professional LLC (PLLC) formation for doctors, lawyers, CPAs, architects, and other licensed professionals statewide.',
  keywords: [
    'about PLLC formation',
    'NY PLLC service',
    'professional LLC experts',
    'PLLC formation company'
  ],
  canonical: '/about',
})

export const PRIVACY_METADATA = generateMetadata({
  title: 'Privacy Policy | NYPLLC',
  description: 'How NYPLLC collects, uses, and protects your personal information during New York PLLC formation. Read our full privacy policy.',
  canonical: '/privacy',
})

export const TERMS_METADATA = generateMetadata({
  title: 'Terms of Service | NYPLLC',
  description: 'Terms of service for NYPLLC formation orders: service scope, guarantees, refunds, and conditions for New York PLLC formation.',
  canonical: '/terms',
})

export const DISCLAIMER_METADATA = generateMetadata({
  title: 'Legal Disclaimer | NYPLLC',
  description: 'NYPLLC provides administrative filing services, not legal advice. Read our full legal disclaimer before ordering PLLC formation.',
  canonical: '/disclaimer',
})

export const VIRTUAL_ADDRESS_SERVICES_METADATA = generateMetadata({
  title: 'NY Virtual Address & Registered Agent — $50/mo | NYPLLC',
  description: 'Get a New York business address, weekly mail forwarding, and registered agent service for $50/month. Built for PLLC and LLC owners statewide.',
  keywords: [
    'virtual address service',
    'business address New York',
    'mail forwarding service',
    'registered agent New York',
    'virtual mailbox',
    'business mail forwarding',
    'NY registered agent',
    'mail forwarding service NY',
    'virtual business address'
  ],
  canonical: '/virtual-address-services',
})

export const MAIL_FORWARDING_AGREEMENT_METADATA = generateMetadata({
  title: 'Mail Forwarding & Registered Agent Agreement | NYPLLC',
  description: 'Terms and conditions for NYPLLC mail forwarding and registered agent services, including fees, billing, and forwarding schedule.',
  canonical: '/mail-forwarding-agreement',
})

export const PARTNERS_METADATA = generateMetadata({
  title: 'Partner Program | Referral & White-Label Desk | NYPLLC',
  description:
    'Refer licensed professionals to our NY PLLC formation, foreign qualification, and virtual address desk. B2B referral and white-label partnerships.',
  keywords: [
    'PLLC formation partner program',
    'white label PLLC formation',
    'NY foreign qualification partner',
    'professional entity formation referral',
    'B2B PLLC formation New York',
  ],
  canonical: '/partners',
})
