'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { trackLeadStart, trackLeadSubmit, trackCheckoutStart, trackScrollDepth } from '@/lib/analytics/track'
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

  useEffect(() => {
    // Track checkout start when Spiffy form is detected
    const checkForSpiffy = () => {
      const spiffyForm = document.querySelector('spiffy-checkout')
      if (spiffyForm) {
        // Store checkout start time for duration calculation
        const checkoutStartTime = Date.now()
        sessionStorage.setItem('checkout_start_time', checkoutStartTime.toString())
        
        trackCheckoutStart({
          plan,
          price,
          entityType,
        })
      }
    }

    // Check immediately and also after a delay for async loading
    checkForSpiffy()
    const timeout = setTimeout(checkForSpiffy, 1000)

    return () => clearTimeout(timeout)
  }, [plan, price, entityType])
}

/**
 * Track Spiffy checkout form engagement using Spiffy JavaScript API
 * Tracks first field interaction, field changes, and engagement time
 */
export function useSpiffyFormEngagementTracking() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Wait for Spiffy checkout API to be available
    const checkForSpiffyAPI = () => {
      const checkout = (window as any).checkout
      
      if (checkout && typeof checkout.ready === 'function') {
        checkout.ready(() => {
          let firstFieldInteractionTime: number | null = null
          let fieldChangeCount = 0
          let lastFieldChangeTime: number | null = null
          
          // Track when user first interacts with form
          checkout.on('change:field', (ev: any) => {
            const now = Date.now()
            
            if (!firstFieldInteractionTime) {
              // First field interaction - track lead start
              firstFieldInteractionTime = now
              sessionStorage.setItem('form_first_interaction_time', now.toString())
              
              // Track lead start for analytics
              trackLeadStart({ form: 'checkout', step: 'field_interaction' })
            }
            
            // Track field changes
            fieldChangeCount++
            lastFieldChangeTime = now
            
            // Store engagement metrics
            sessionStorage.setItem('form_field_change_count', fieldChangeCount.toString())
            sessionStorage.setItem('form_last_interaction_time', now.toString())
          })
          
          // Track order changes (progress through checkout)
          checkout.on('change:order', (ev: any) => {
            const now = Date.now()
            sessionStorage.setItem('form_order_change_time', now.toString())
          })
          
          // Track payment method selection
          checkout.on('change:paymethod', (ev: any) => {
            const now = Date.now()
            sessionStorage.setItem('form_payment_method_selected_time', now.toString())
          })
        })
      } else {
        // Retry if Spiffy API not ready yet
        setTimeout(checkForSpiffyAPI, 500)
      }
    }

    // Start checking for Spiffy API
    checkForSpiffyAPI()
  }, [])
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

