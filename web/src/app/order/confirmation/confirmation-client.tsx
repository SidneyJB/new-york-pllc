'use client'

import { useEffect } from 'react'
import { trackPurchase } from '@/lib/analytics/track'
import { PRICING } from '@/lib/constants'
import * as fbq from '@/lib/fbpixel'

interface OrderConfirmationClientProps {
  amount?: number
  plan?: string
  entityType?: 'PLLC' | 'LLC'
  fbContentId?: string
}

export function OrderConfirmationClient({
  amount,
  plan = 'PLLC Formation',
  entityType = 'PLLC',
  fbContentId = 'pllc-formation',
}: OrderConfirmationClientProps) {
  useEffect(() => {
    // Calculate time spent on order form
    const checkoutStartTime = sessionStorage.getItem('checkout_start_time')
    let timeSpentSeconds: number | undefined
    
    if (checkoutStartTime) {
      const startTime = parseInt(checkoutStartTime, 10)
      const endTime = Date.now()
      timeSpentSeconds = Math.round((endTime - startTime) / 1000) // Convert to seconds
      
      // Clean up session storage
      sessionStorage.removeItem('checkout_start_time')
    }
    
    // Calculate engagement metrics from Spiffy API tracking
    const firstInteractionTime = sessionStorage.getItem('form_first_interaction_time')
    const lastInteractionTime = sessionStorage.getItem('form_last_interaction_time')
    
    let engagementTimeSeconds: number | undefined
    if (firstInteractionTime && lastInteractionTime) {
      const engagementStart = parseInt(firstInteractionTime, 10)
      const engagementEnd = parseInt(lastInteractionTime, 10)
      engagementTimeSeconds = Math.round((engagementEnd - engagementStart) / 1000)
    }
    
    // Extract all parameters from URL to ensure full tracking coverage
    const urlParams = new URLSearchParams(window.location.search)
    const orderId = urlParams.get('order') || urlParams.get('order_id') || urlParams.get('id') || urlParams.get('orderId') || undefined
    
    // Bundle all parameters into a single JSON string to bypass Vercel property limits
    const paramsObj: Record<string, string> = {}
    urlParams.forEach((value, key) => {
      paramsObj[key] = value
    })
    const metadata = JSON.stringify(paramsObj)
    
    // Track purchase on confirmation page load with engagement metrics
    trackPurchase({
      value: amount || PRICING.basePrice,
      plan,
      entityType,
      timeSpentSeconds,
      orderId,
      engagementTimeSeconds,
      metadata,
    })
    
    // Track Facebook Pixel Purchase event
    const purchaseAmount = amount || PRICING.basePrice
    fbq.event('Purchase', {
      value: purchaseAmount,
      currency: 'USD',
      content_ids: [fbContentId],
      content_type: 'product',
    })
    
    // Clean up engagement tracking session storage
    sessionStorage.removeItem('form_first_interaction_time')
    sessionStorage.removeItem('form_last_interaction_time')
    sessionStorage.removeItem('form_field_change_count')
    sessionStorage.removeItem('form_order_change_time')
    sessionStorage.removeItem('form_payment_method_selected_time')
  }, [amount, plan, entityType, fbContentId])

  return null
}

