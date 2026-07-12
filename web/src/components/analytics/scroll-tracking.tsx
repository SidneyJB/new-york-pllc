'use client'

import { useEffect, useState } from 'react'
import { deferUntilIdle } from '@/lib/defer-until-idle'
import { useScrollDepthTracking } from './form-tracking'

function ScrollTrackingActive() {
  useScrollDepthTracking()
  return null
}

/**
 * Client component to track scroll depth on pages.
 * Mount is deferred until idle so scroll listeners stay off the LCP path.
 */
export function ScrollTracking() {
  const [ready, setReady] = useState(false)

  useEffect(() => deferUntilIdle(() => setReady(true)), [])

  if (!ready) return null
  return <ScrollTrackingActive />
}
