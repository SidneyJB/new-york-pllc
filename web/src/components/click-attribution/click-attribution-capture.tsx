'use client'

import { useEffect } from 'react'
import { resolveAndPersistClickAttribution } from '@/lib/click-attribution/resolve-click-attribution'

export function ClickAttributionCapture() {
  useEffect(() => {
    resolveAndPersistClickAttribution(window.location.search)
  }, [])

  return null
}
