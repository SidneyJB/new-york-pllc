'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { trackLeadStart, trackLeadSubmit, trackCheckoutStart, trackScrollDepth } from '@/lib/analytics/track'
import { trackGoogleAdsBeginCheckout } from '@/lib/analytics/google-ads'
import { useCheckoutAbandonmentCapture } from '@/lib/checkout-abandonment/use-checkout-abandonment-capture'
import { PRICING } from '@/lib/constants'

export interface CheckoutTrackingOptions {
  plan?: string
  price?: number
  entityType?: 'PLLC' | 'LLC'
}

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
 * Stores timestamp for duration calculation
 */
export function useCheckoutTracking(options?: CheckoutTrackingOptions) {
  const {
    plan = 'PLLC Formation',
    price = PRICING.basePrice,
    entityType = 'PLLC',
  } = options || {}
  const hasTrackedCheckoutStart = useRef(false)

  useEffect(() => {
    // Track checkout start when Spiffy form is detected (once per mount)
    const checkForSpiffy = () => {
      if (hasTrackedCheckoutStart.current) return
      const spiffyForm = document.querySelector('spiffy-checkout')
      if (spiffyForm) {
        hasTrackedCheckoutStart.current = true
        // Store checkout start time for duration calculation
        const checkoutStartTime = Date.now()
        sessionStorage.setItem('checkout_start_time', checkoutStartTime.toString())

        trackCheckoutStart({
          plan,
          price,
          entityType,
        })
        // Secondary Ads observation action — not used for bidding
        void trackGoogleAdsBeginCheckout()
      }
    }

    // Check immediately and also after a delay for async loading
    checkForSpiffy()
    const timeout = setTimeout(checkForSpiffy, 1000)

    return () => clearTimeout(timeout)
  }, [plan, price, entityType])
}

/**
 * Spiffy checkout engagement + abandoned-checkout capture.
 * Uses `window.spiffy` and postMessage (`identify` / legacy field events), not `window.checkout`
 * (that global is the checkout iframe element in Spiffy Elements 1.1).
 */
export function useSpiffyFormEngagementTracking() {
  useCheckoutAbandonmentCapture()
}

/**
 * Hook to track scroll depth milestones (25%, 50%, 75%, 100%)
 * Tracks each milestone only once per page
 */
export function useScrollDepthTracking() {
  const pathname = usePathname()
  const trackedDepths = useRef<Set<string>>(new Set())
  const pageStartTime = useRef<number>(Date.now())

  useEffect(() => {
    // Reset tracking when page changes
    trackedDepths.current.clear()
    pageStartTime.current = Date.now()

    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      
      // Calculate scroll percentage
      const scrollPercentage = (scrollTop + windowHeight) / documentHeight
      
      // Determine which milestone was reached
      let depth: '25%' | '50%' | '75%' | '100%' | null = null
      if (scrollPercentage >= 1.0 && !trackedDepths.current.has('100%')) {
        depth = '100%'
      } else if (scrollPercentage >= 0.75 && !trackedDepths.current.has('75%')) {
        depth = '75%'
      } else if (scrollPercentage >= 0.50 && !trackedDepths.current.has('50%')) {
        depth = '50%'
      } else if (scrollPercentage >= 0.25 && !trackedDepths.current.has('25%')) {
        depth = '25%'
      }

      if (depth) {
        const timeToDepth = Math.round((Date.now() - pageStartTime.current) / 1000)
        trackedDepths.current.add(depth)
        trackScrollDepth({
          page: pathname || '/',
          depth,
          timeToDepth,
        })
      }
    }

    // Throttle scroll events for performance
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [pathname])
}

