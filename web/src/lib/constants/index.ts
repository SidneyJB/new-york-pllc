// Application constants
export const APP_CONFIG = {
  name: 'NY PLLC Formation',
  tagline: 'Professional LLC Formation for Licensed Professionals',
  description: 'Complete PLLC formation service for licensed professionals in New York.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  supportEmail: 'contact@nypllc.com',
  phone: '646-444-2102',
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
  legalName: 'Business Filing Solutions LLC',
  address: {
    street: '1 Blue Hill Plaza Ste 1509-43',
    city: 'Pearl River',
    state: 'NY',
    zipCode: '10965',
  },
  license: 'New York\'s most experienced PLLC formation service provider',
} as const

export const NAVIGATION = {
  main: [
    { name: 'Home', href: '/' },
    // Temporarily disabled: { name: 'Services', href: '/services' },
    // Temporarily disabled: { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ],
  professions: [
    { name: 'Dentist', href: '/professions/dentist', shortName: 'Dentist' },
    { name: 'LCSW (Licensed Clinical Social Worker)', href: '/professions/lcsw', shortName: 'LCSW' },
    { name: 'MHC (Mental Health Counselor)', href: '/professions/mhc', shortName: 'MHC' },
    { name: 'Physical Therapist', href: '/professions/physical-therapist', shortName: 'Physical Therapist' },
    { name: 'Psychologist', href: '/professions/psychologist', shortName: 'Psychologist' },
    { name: 'Speech-Language Pathologist', href: '/professions/speech-language-pathologist', shortName: 'Speech-Language Pathologist' },
    { name: 'Physician', href: '/professions/physician', shortName: 'Physician' },
    { name: 'Massage Therapist', href: '/professions/massage-therapist', shortName: 'Massage Therapist' },
    { name: 'Nurse Practitioner', href: '/professions/nurse-practitioner', shortName: 'Nurse Practitioner' },
    { name: 'Chiropractor', href: '/professions/chiropractor', shortName: 'Chiropractor' },
    { name: 'Occupational Therapist', href: '/professions/occupational-therapist', shortName: 'Occupational Therapist' },
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
  'Acupuncture',
  'Applied Behavior Analysis',
  'Architecture',
  'Athletic Training',
  'Audiology',
  'Certified Shorthand Reporting',
  'Chiropractic',
  'Clinical Laboratory Technology',
  'Dentistry',
  'Dietetics-Nutrition',
  'Engineering',
  'Geology',
  'Interior Design',
  'Land Surveying',
  'Landscape Architecture',
  'Massage Therapy',
  'Medical Physics',
  'Medicine',
  'Mental Health Practitioners',
  'Midwifery',
  'Nursing',
  'Occupational Therapy',
  'Ophthalmic Dispensing',
  'Optometry',
  'Pathologists\' Assistant',
  'Perfusion',
  'Pharmacy',
  'Physical Therapy',
  'Podiatry',
  'Polysomnographic Technology',
  'Psychology',
  'Public Accountancy',
  'Respiratory Therapy',
  'Social Work',
  'Speech-Language Pathology',
  'Veterinary Medicine',
] as const
