'use client'

import { useScrollDepthTracking } from './form-tracking'

/**
 * Client component to track scroll depth on pages
 * Add this component to any page where you want to track scroll depth
 */
export function ScrollTracking() {
  useScrollDepthTracking()
  return null
}

