'use client'

import { useEffect } from 'react'
import { useCheckoutTracking, useSpiffyFormEngagementTracking } from '@/components/analytics/form-tracking'

export function OrderPageClient() {
  useCheckoutTracking()
  useSpiffyFormEngagementTracking() // Track form engagement via Spiffy API
  return null
}

