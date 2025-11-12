'use client'

import { useEffect } from 'react'
import { trackPurchase } from '@/lib/analytics/track'
import { PRICING } from '@/lib/constants'

interface OrderConfirmationClientProps {
  amount?: number
}

export function OrderConfirmationClient({ amount }: OrderConfirmationClientProps) {
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
    const fieldChangeCount = sessionStorage.getItem('form_field_change_count')
    
    let engagementTimeSeconds: number | undefined
    if (firstInteractionTime && lastInteractionTime) {
      const engagementStart = parseInt(firstInteractionTime, 10)
      const engagementEnd = parseInt(lastInteractionTime, 10)
      engagementTimeSeconds = Math.round((engagementEnd - engagementStart) / 1000)
    }
    
    // Extract order ID from URL if available (Spiffy may pass this)
    const urlParams = new URLSearchParams(window.location.search)
    const orderId = urlParams.get('order_id') || urlParams.get('id') || urlParams.get('orderId') || undefined
    
    // Track purchase on confirmation page load with engagement metrics
    trackPurchase({
      value: amount || PRICING.basePrice,
      plan: 'PLLC Formation',
      entityType: 'PLLC',
      timeSpentSeconds,
      orderId,
      engagementTimeSeconds,
      fieldChangeCount: fieldChangeCount ? parseInt(fieldChangeCount, 10) : undefined,
    })
    
    // Clean up engagement tracking session storage
    sessionStorage.removeItem('form_first_interaction_time')
    sessionStorage.removeItem('form_last_interaction_time')
    sessionStorage.removeItem('form_field_change_count')
    sessionStorage.removeItem('form_order_change_time')
    sessionStorage.removeItem('form_payment_method_selected_time')
  }, [amount])

  return null
}

