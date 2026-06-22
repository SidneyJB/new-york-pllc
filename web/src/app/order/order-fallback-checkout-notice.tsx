'use client'

import { useEffect, useState } from 'react'
import { trackCTAClick } from '@/lib/analytics/track'
import { PRICING } from '@/lib/constants'
import { buildOrderPageHref } from '@/lib/referral-attribution/build-order-page-href'
import { getPartnerCodeFromCookie } from '@/lib/referral-attribution/get-partner-code-from-cookie'

const SPIFFY_PLLC_CHECKOUT_URL =
  'https://nypllc.spiffy.co/checkout/new-york-pllc-formation'

export function OrderFallbackCheckoutNotice() {
  const [href, setHref] = useState(SPIFFY_PLLC_CHECKOUT_URL)

  useEffect(() => {
    const partnerCode = getPartnerCodeFromCookie()
    if (partnerCode) setHref(buildOrderPageHref(partnerCode))
  }, [])

  const isExternalCheckout = href === SPIFFY_PLLC_CHECKOUT_URL

  return (
    <div className="mb-6 rounded-md bg-muted/50 px-4 py-2.5 text-center">
      <p className="text-sm leading-relaxed text-muted-foreground">
        If you&apos;re having trouble accessing the order form on this page, you can{' '}
        <a
          href={href}
          target={isExternalCheckout ? '_blank' : undefined}
          rel={isExternalCheckout ? 'noopener noreferrer' : undefined}
          className="font-medium text-primary underline underline-offset-2 hover:text-primary/90"
          onClick={() => {
            trackCTAClick({
              cta: 'spiffy-direct-checkout',
              location: 'order-embed-fallback',
              value: PRICING.basePrice,
              reportToGA: true,
            })
          }}
        >
          open the secure checkout directly
        </a>
        .
      </p>
    </div>
  )
}
