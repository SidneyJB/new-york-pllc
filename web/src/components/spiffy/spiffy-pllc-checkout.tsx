'use client'

import { createElement, useEffect, useState } from 'react'
import { resolveAndPersistClickAttribution } from '@/lib/click-attribution/resolve-click-attribution'
import { getPartnerCodeFromCookie } from '@/lib/referral-attribution/get-partner-code-from-cookie'
import { readPartnerCodeFromSearch } from '@/lib/referral-attribution/read-partner-code-from-search'
import { setPartnerCodeCookie } from '@/lib/referral-attribution/set-partner-code-cookie'
import { applyPartnerCouponOnCheckoutReady } from './apply-partner-coupon-on-checkout-ready'
import { buildSpiffyCheckoutUrl } from './build-spiffy-checkout-url'

export const SPIFFY_PLLC_CHECKOUT_URL =
  'https://nypllc.spiffy.co/checkout/new-york-pllc-formation'

export function SpiffyPllcCheckout() {
  const [partnerCode, setPartnerCode] = useState<string | null>(null)
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null)

  useEffect(() => {
    const code = readPartnerCodeFromSearch(window.location.search) || getPartnerCodeFromCookie()
    setPartnerCode(code)

    if (code) setPartnerCodeCookie(code)

    const clickAttribution = resolveAndPersistClickAttribution(window.location.search)
    const resolvedCheckoutUrl = buildSpiffyCheckoutUrl(
      SPIFFY_PLLC_CHECKOUT_URL,
      code,
      clickAttribution,
    )
    setCheckoutUrl(resolvedCheckoutUrl)

    applyPartnerCouponOnCheckoutReady({
      checkoutUrl: resolvedCheckoutUrl,
      coupon: code,
    })
  }, [])

  if (!checkoutUrl) return null

  return (
    <>
      {partnerCode && (
        <div className="mb-4 rounded-md border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary">
          Partner discount detected. The discount will be applied to the checkout below.
        </div>
      )}
      {createElement('spiffy-checkout', { key: checkoutUrl, url: checkoutUrl })}
    </>
  )
}
