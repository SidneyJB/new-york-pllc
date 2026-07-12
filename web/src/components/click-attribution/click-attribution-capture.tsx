'use client'

import { useEffect } from 'react'
import { deferUntilIdle } from '@/lib/defer-until-idle'
import { resolveAndPersistClickAttribution } from '@/lib/click-attribution/resolve-click-attribution'

export function ClickAttributionCapture() {
  useEffect(() => {
    return deferUntilIdle(() => {
      resolveAndPersistClickAttribution(window.location.search)
    })
  }, [])

  return null
}
