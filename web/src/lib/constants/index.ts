// Application constants
export const APP_CONFIG = {
  name: 'NY PLLC Formation',
  tagline: 'Professional LLC Formation for Licensed Professionals',
  description: 'Complete PLLC formation service including mandatory publishing for licensed professionals in New York.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  supportEmail: 'support@nypllc.com',
  phone: '(555) 123-4567',
} as const

export const PRICING = {
  basePrice: 885,
  currency: 'USD',
  includesPublishing: true,
  features: [
    'Certificate of Formation Filing',
    '6-Week Newspaper Publication',
    'Certificate of Publication Filing',
    'Digital Document Delivery',
    'Professional License Verification',
  ],
} as const

export const BUSINESS_INFO = {
  legalName: 'NY Professional Formation Services LLC',
  address: {
    street: '123 Business Ave',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
  },
  license: 'Licensed NY Formation Service Provider',
} as const

export const NAVIGATION = {
  main: [
    { name: 'Home', href: '/' },
    // Temporarily disabled: { name: 'Services', href: '/services' },
    // Temporarily disabled: { name: 'Pricing', href: '/pricing' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ],
  footer: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Disclaimer', href: '/disclaimer' },
  ],
} as const

export const STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
] as const

export const PROFESSIONAL_TYPES = [
  'Physician (MD/DO)',
  'Dentist (DDS/DMD)',
  'Attorney/Lawyer',
  'Certified Public Accountant (CPA)',
  'Architect',
  'Engineer',
  'Veterinarian',
  'Optometrist',
  'Pharmacist',
  'Other Licensed Professional',
] as const
