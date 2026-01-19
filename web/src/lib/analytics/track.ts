'use client'

import { track } from '@vercel/analytics'

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
}) {
  const utm = getUTMParams()
  track('cta_click', filterUndefined({
    cta: options.cta,
    location: options.location,
    value: options.value,
    variant: options.variant,
    ...utm,
  }))
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
}) {
  const utm = getUTMParams()
  track('checkout_start', filterUndefined({
    plan: options?.plan,
    price: options?.price,
    entityType: options?.entityType || 'PLLC',
    ...utm,
  }))
}

/**
 * Track purchase completion with time spent and order details
 * Note: Limited to 8 properties max for Vercel Analytics Pro plan compatibility
 * Properties: value, plan, entityType, time_spent, order_id, engagement_time, metadata (JSON), utm_source, utm_campaign
 */
export function trackPurchase(options: {
  value: number
  plan?: string
  entityType?: 'PLLC' | 'LLC'
  timeSpentSeconds?: number
  orderId?: string
  engagementTimeSeconds?: number
  metadata?: string
}) {
  const utm = getUTMParams()
  track('purchase', filterUndefined({
    value: options.value,
    plan: options.plan,
    entityType: options.entityType || 'PLLC',
    time_spent: options.timeSpentSeconds,
    order_id: options.orderId,
    engagement_time: options.engagementTimeSeconds,
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

