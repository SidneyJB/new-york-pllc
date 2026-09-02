'use client'

import { createElement, useEffect, useState } from 'react'
import { resolveAndPersistClickAttribution } from '@/lib/click-attribution/resolve-click-attribution'
import { getPartnerCodeFromCookie } from '@/lib/referral-attribution/get-partner-code-from-cookie'
import { readPartnerCodeFromSearch } from '@/lib/referral-attribution/read-partner-code-from-search'
import { setPartnerCodeCookie } from '@/lib/referral-attribution/set-partner-code-cookie'
import { applyPartnerCouponOnCheckoutReady } from '@/components/spiffy/apply-partner-coupon-on-checkout-ready'
import { buildSpiffyCheckoutUrl } from '@/components/spiffy/build-spiffy-checkout-url'

/** Sid creates this Spiffy product. Invoice if the customer asks. */
export const SPIFFY_MSO_CHECKOUT_URL =
  'https://nypllc.spiffy.co/checkout/ny-pllc-and-management-llc'

export function SpiffyMsoCheckout() {
  const [partnerCode, setPartnerCode] = useState<string | null>(null)
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null)

  useEffect(() => {
    const code = readPartnerCodeFromSearch(window.location.search) || getPartnerCodeFromCookie()
    setPartnerCode(code)

    if (code) setPartnerCodeCookie(code)

    const clickAttribution = resolveAndPersistClickAttribution(window.location.search)
    const resolvedCheckoutUrl = buildSpiffyCheckoutUrl(
      SPIFFY_MSO_CHECKOUT_URL,
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
