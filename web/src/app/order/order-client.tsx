'use client'

import { useEffect } from 'react'
import { useCheckoutTracking } from '@/components/analytics/form-tracking'

export function OrderPageClient() {
  useCheckoutTracking()
  return null
}

