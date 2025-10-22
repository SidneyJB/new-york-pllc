export const SEO_CONFIG = {
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://newyorkpllc.com',
  siteName: 'New York PLLC Formation Service',
  defaultTitle: 'NY PLLC Formation | Professional LLC Services New York',
  defaultDescription: 'Form your New York Professional Limited Liability Company (PLLC) for $885 including all publishing requirements. Fast, simple, and compliant PLLC formation for licensed professionals.',
  twitterHandle: '@nypllc',
  companyInfo: {
    name: 'New York PLLC Formation Service',
    address: 'New York, NY',
    phone: '646-444-2102',
    email: 'contact@newyorkpllc.com',
    description: 'Professional PLLC formation services for licensed professionals in New York. Complete formation including mandatory newspaper publishing.',
  },
  socialImage: '/og-image.svg',
  keywords: [
    'NY PLLC formation',
    'New York PLLC',
    'PLLC publishing',
    'professional LLC New York',
    'New York professional LLC',
    'PLLC formation service',
    'licensed professional LLC',
    'NY professional corporation',
    'PLLC filing New York',
    'professional practice formation'
  ]
} as const

export type SEOConfig = typeof SEO_CONFIG
