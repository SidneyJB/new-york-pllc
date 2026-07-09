'use client'

import { createElement, useEffect, useState } from 'react'
import { resolveAndPersistClickAttribution } from '@/lib/click-attribution/resolve-click-attribution'
import { buildSpiffyCheckoutUrl } from './build-spiffy-checkout-url'

export const SPIFFY_LLC_CHECKOUT_URL =
  'https://nypllc.spiffy.co/checkout/new-york-llc-formation'

export function SpiffyLlcCheckout() {
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null)

  useEffect(() => {
    const clickAttribution = resolveAndPersistClickAttribution(window.location.search)
    setCheckoutUrl(buildSpiffyCheckoutUrl(SPIFFY_LLC_CHECKOUT_URL, null, clickAttribution))
  }, [])

  if (!checkoutUrl) return null

  return createElement('spiffy-checkout', { key: checkoutUrl, url: checkoutUrl })
}
