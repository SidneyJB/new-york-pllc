'use client'

import { useEffect, useRef } from 'react'
import { trackLeadStart, trackLeadSubmit, trackCheckoutStart } from '@/lib/analytics/track'
import { PRICING } from '@/lib/constants'

/**
 * Hook to track first keystroke on a form (lead_start)
 */
export function useFormTracking(formName: string) {
  const hasTrackedStart = useRef(false)

  const handleFirstInput = () => {
    if (!hasTrackedStart.current) {
      trackLeadStart({ form: formName })
      hasTrackedStart.current = true
    }
  }

  return { handleFirstInput }
}

/**
 * Track form submission
 */
export function trackFormSubmit(formName: string, step?: string) {
  trackLeadSubmit({
    form: formName,
    step,
    value: formName === 'checkout' ? PRICING.basePrice : undefined,
  })
}

/**
 * Track checkout start (when Spiffy form loads)
 */
export function useCheckoutTracking() {
  useEffect(() => {
    // Track checkout start when Spiffy form is detected
    const checkForSpiffy = () => {
      const spiffyForm = document.querySelector('spiffy-checkout')
      if (spiffyForm) {
        trackCheckoutStart({
          plan: 'PLLC Formation',
          price: PRICING.basePrice,
          entityType: 'PLLC',
        })
      }
    }

    // Check immediately and also after a delay for async loading
    checkForSpiffy()
    const timeout = setTimeout(checkForSpiffy, 1000)

    return () => clearTimeout(timeout)
  }, [])
}

