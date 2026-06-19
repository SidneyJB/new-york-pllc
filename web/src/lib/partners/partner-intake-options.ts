export const PARTNER_ORGANIZATION_TYPES = [
  { value: 'credentialing', label: 'Credentialing firm' },
  { value: 'billing', label: 'Medical billing / RCM' },
  { value: 'practice-coach', label: 'Practice coach / consultant' },
  { value: 'insurance-broker', label: 'Insurance broker' },
  { value: 'cpa', label: 'CPA / accounting firm' },
  { value: 'law-firm', label: 'Law firm' },
  { value: 'other', label: 'Other professional services' },
] as const

export const PARTNER_CLIENT_TYPES = [
  { value: 'healthcare', label: 'Healthcare (physicians, NP, mental health)' },
  { value: 'legal', label: 'Legal' },
  { value: 'dental', label: 'Dental' },
  { value: 'accounting', label: 'Accounting / finance' },
  { value: 'design-engineering', label: 'Architecture / engineering' },
  { value: 'mixed', label: 'Mixed licensed professionals' },
  { value: 'other', label: 'Other' },
] as const

export const PARTNER_SERVICES = [
  { value: 'pllc-formation', label: 'NY PLLC formation ($885 all-inclusive)' },
  { value: 'foreign-qualification', label: 'Foreign qualification into NY' },
  { value: 'virtual-address', label: 'Virtual address ($50/mo)' },
  { value: 'registered-agent', label: 'Registered agent ($99/yr)' },
] as const

export const PARTNER_MODELS = [
  { value: 'referral', label: 'Referral partner' },
  { value: 'white-label', label: 'White-label (your brand to clients)' },
  { value: 'unsure', label: 'Not sure yet, help me choose' },
] as const

export const PARTNER_REFERRAL_VOLUME = [
  { value: '1-2', label: '1–2 per month' },
  { value: '3-5', label: '3–5 per month' },
  { value: '6-10', label: '6–10 per month' },
  { value: '10-plus', label: '10+ per month' },
  { value: 'unsure', label: 'Not sure yet' },
] as const

export const PARTNER_FAQ = [
  {
    question: 'Who is this program for?',
    answer:
      'Firms whose clients are licensed professionals forming or expanding into New York, including credentialing, billing, coaching, insurance, accounting, and small law firms. You refer the client, and we handle PLLC formation, foreign qualification, registered agent, and virtual address fulfillment.',
  },
  {
    question: 'Do you offer white-label fulfillment?',
    answer:
      'Yes. We can operate as your backend filing desk under your client relationship, with status updates you can forward. Partnership structure depends on volume and compliance requirements.',
  },
  {
    question: 'What does a typical referral look like?',
    answer:
      'A licensed professional needs a New York PLLC, foreign qualification of an existing entity, a NY business address, or registered agent service. You send the client to us or submit their details, and we run intake, payment, and fulfillment.',
  },
  {
    question: 'How fast do you respond to partner inquiries?',
    answer:
      'We reply to partner applications in about 20 minutes during business hours and schedule a short intro call to confirm fit and referral workflow.',
  },
  {
    question: 'Is there a referral fee?',
    answer:
      'Referral economics depend on partnership type and volume. We discuss terms after reviewing your application, with no obligation from this form.',
  },
] as const
