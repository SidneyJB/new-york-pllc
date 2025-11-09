'use client'

import { useEffect } from 'react'
import { trackPurchase } from '@/lib/analytics/track'
import { PRICING } from '@/lib/constants'

interface OrderConfirmationClientProps {
  amount?: number
}

export function OrderConfirmationClient({ amount }: OrderConfirmationClientProps) {
  useEffect(() => {
    // Track purchase on confirmation page load
    trackPurchase({
      value: amount || PRICING.basePrice,
      plan: 'PLLC Formation',
      entityType: 'PLLC',
    })
  }, [amount])

  return null
}

