'use client'

import { useEffect } from 'react'
import { type CheckoutTrackingOptions, useCheckoutTracking, useSpiffyFormEngagementTracking } from '@/components/analytics/form-tracking'

export function OrderPageClient({ trackingOptions }: { trackingOptions?: CheckoutTrackingOptions }) {
  useCheckoutTracking(trackingOptions)
  useSpiffyFormEngagementTracking() // Track form engagement via Spiffy API
  return null
}

