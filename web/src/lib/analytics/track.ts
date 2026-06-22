'use client'

import { track } from '@vercel/analytics'
import { getPartnerCodeFromCookie } from '@/lib/referral-attribution/get-partner-code-from-cookie'

/**
 * Extract UTM parameters from URL search params
 */
export function getUTMParams(): { utm_source?: string; utm_campaign?: string } {
  if (typeof window === 'undefined') return {}
  
  const params = new URLSearchParams(window.location.search)
  return {
    utm_source: params.get('utm_source') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
  }
}

function getPartnerCode(): string | undefined {
  return getPartnerCodeFromCookie() || undefined
}

/**
 * Helper to filter out undefined values from tracking properties
 */
function filterUndefined<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined)
  ) as Partial<T>
}

/**
 * Track CTA click events
 */
export function trackCTAClick(options: {
  cta: string
  location?: string
  value?: number
  variant?: string
  /** Also send the same payload to GA4 as event `cta_click` (when gtag is available). */
  reportToGA?: boolean
}) {
  const utm = getUTMParams()
  const payload = filterUndefined({
    cta: options.cta,
    location: options.location,
    value: options.value,
    variant: options.variant,
    ...utm,
  })
  track('cta_click', payload)
  if (options.reportToGA && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'cta_click', payload)
  }
}

/**
 * Track lead start (first keystroke on form)
 */
export function trackLeadStart(options?: {
  form?: string
  step?: string
}) {
  const utm = getUTMParams()
  track('lead_start', filterUndefined({
    form: options?.form,
    step: options?.step,
    ...utm,
  }))
}

/**
 * Track lead submit (form submitted)
 */
export function trackLeadSubmit(options?: {
  form?: string
  step?: string
  value?: number
}) {
  const utm = getUTMParams()
  track('lead_submit', filterUndefined({
    form: options?.form,
    step: options?.step,
    value: options?.value,
    ...utm,
  }))
}

/**
 * Track checkout start
 */
export function trackCheckoutStart(options?: {
  plan?: string
  price?: number
  entityType?: 'PLLC' | 'LLC'
  partnerCode?: string
}) {
  const utm = getUTMParams()
  track('checkout_start', filterUndefined({
    plan: options?.plan,
    price: options?.price,
    entityType: options?.entityType || 'PLLC',
    partner_code: options?.partnerCode || getPartnerCode(),
    ...utm,
  }))
}

/**
 * Track purchase completion with time spent and order details
 * Note: metadata bundles Spiffy URL params to avoid widening the analytics event too much.
 */
export function trackPurchase(options: {
  value: number
  plan?: string
  entityType?: 'PLLC' | 'LLC'
  timeSpentSeconds?: number
  orderId?: string
  engagementTimeSeconds?: number
  metadata?: string
  partnerCode?: string
}) {
  const utm = getUTMParams()
  track('purchase', filterUndefined({
    value: options.value,
    plan: options.plan,
    entityType: options.entityType || 'PLLC',
    time_spent: options.timeSpentSeconds,
    order_id: options.orderId,
    engagement_time: options.engagementTimeSeconds,
    partner_code: options.partnerCode || getPartnerCode(),
    metadata: options.metadata, // All Spiffy URL params as JSON string
    ...utm,
  }))
}

/**
 * Track phone click (tap-to-call)
 */
export function trackPhoneClick(options?: {
  location?: string
}) {
  const utm = getUTMParams()
  track('phone_click', filterUndefined({
    location: options?.location,
    ...utm,
  }))
}

/**
 * Track email click (tap-to-email)
 */
export function trackEmailClick(options?: {
  location?: string
}) {
  const utm = getUTMParams()
  track('email_click', filterUndefined({
    location: options?.location,
    ...utm,
  }))
}

/**
 * Track scroll depth milestones
 */
export function trackScrollDepth(options: {
  page: string
  depth: '25%' | '50%' | '75%' | '100%'
  timeToDepth?: number // seconds to reach this depth
}) {
  const utm = getUTMParams()
  track('scroll_depth', filterUndefined({
    page: options.page,
    depth: options.depth,
    time_to_depth: options.timeToDepth,
    ...utm,
  }))
}

