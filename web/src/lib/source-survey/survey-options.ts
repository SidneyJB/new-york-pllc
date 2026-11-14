/** Answer keys for the post-payment source survey. Keep in sync with PLLC-CRM crm/lib/order-source-survey/survey-options.ts. */
export const HEARD_FROM_OPTIONS = [
  { key: 'google_search', label: 'Google search' },
  { key: 'google_ad', label: 'Google ad' },
  { key: 'ai_assistant', label: 'ChatGPT or another AI assistant' },
  { key: 'referral', label: 'Referral from a colleague or friend' },
  { key: 'advisor', label: 'Accountant, lawyer, or consultant' },
  { key: 'association', label: 'Professional association or school' },
  { key: 'other', label: 'Other' },
] as const

export const OTHER_SERVICE_OPTIONS = [
  { key: 'legalzoom', label: 'LegalZoom' },
  { key: 'zenbusiness', label: 'ZenBusiness' },
  { key: 'northwest', label: 'Northwest' },
  { key: 'lawyer', label: 'A lawyer' },
  { key: 'other', label: 'Other' },
] as const

export type HeardFromKey = (typeof HEARD_FROM_OPTIONS)[number]['key']
export type OtherServiceKey = (typeof OTHER_SERVICE_OPTIONS)[number]['key']

export const SURVEY_SHORT_TEXT_MAX = 200
export const SURVEY_LONG_TEXT_MAX = 500
