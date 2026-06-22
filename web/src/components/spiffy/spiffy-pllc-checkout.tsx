'use client'

import { createElement, useEffect, useState } from 'react'
import { getPartnerCodeFromCookie } from '@/lib/referral-attribution/get-partner-code-from-cookie'
import { applyPartnerCouponOnCheckoutReady } from './apply-partner-coupon-on-checkout-ready'

export const SPIFFY_PLLC_CHECKOUT_URL =
  'https://nypllc.spiffy.co/checkout/new-york-pllc-formation'

export function SpiffyPllcCheckout() {
  const [partnerCode, setPartnerCode] = useState<string | null>(null)

  useEffect(() => {
    const code = getPartnerCodeFromCookie()
    setPartnerCode(code)

    applyPartnerCouponOnCheckoutReady({
      checkoutUrl: SPIFFY_PLLC_CHECKOUT_URL,
      coupon: code,
    })
  }, [])

  return (
    <>
      {partnerCode && (
        <div className="mb-4 rounded-md border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary">
          Partner discount detected. The discount will be applied to the checkout below.
        </div>
      )}
      {createElement('spiffy-checkout', { url: SPIFFY_PLLC_CHECKOUT_URL })}
    </>
  )
}
