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
    
    // Extract order ID from URL if available (Spiffy may pass this)
    const urlParams = new URLSearchParams(window.location.search)
    const orderId = urlParams.get('order_id') || urlParams.get('id') || urlParams.get('orderId') || undefined
    
    // Track purchase on confirmation page load
    trackPurchase({
      value: amount || PRICING.basePrice,
      plan: 'PLLC Formation',
      entityType: 'PLLC',
      timeSpentSeconds,
      orderId,
    })
  }, [amount])

  return null
}

