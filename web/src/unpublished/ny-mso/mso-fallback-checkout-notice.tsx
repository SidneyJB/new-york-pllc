'use client'

import { useEffect, useState } from 'react'
import { trackCTAClick } from '@/lib/analytics/track'
import { PRICING } from '@/lib/constants'
import { SPIFFY_MSO_CHECKOUT_URL } from './spiffy-mso-checkout'
import { getPartnerCodeFromCookie } from '@/lib/referral-attribution/get-partner-code-from-cookie'
import { buildSpiffyCheckoutUrl } from '@/components/spiffy/build-spiffy-checkout-url'
import { resolveAndPersistClickAttribution } from '@/lib/click-attribution/resolve-click-attribution'

export function MsoFallbackCheckoutNotice() {
  const [href, setHref] = useState(SPIFFY_MSO_CHECKOUT_URL)

  useEffect(() => {
    const partnerCode = getPartnerCodeFromCookie()
    const clickAttribution = resolveAndPersistClickAttribution(window.location.search)
    setHref(buildSpiffyCheckoutUrl(SPIFFY_MSO_CHECKOUT_URL, partnerCode, clickAttribution))
  }, [])

  return (
    <div className="mb-6 rounded-md bg-muted/50 px-4 py-2.5 text-center">
      <p className="text-sm leading-relaxed text-muted-foreground">
        If the order form does not load,{' '}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary underline underline-offset-2 hover:text-primary/90"
          onClick={() => {
            trackCTAClick({
              cta: 'spiffy-direct-checkout',
              location: 'mso-embed-fallback',
              value: PRICING.msoPairPrice,
              reportToGA: true,
            })
          }}
        >
          open the secure checkout directly
        </a>
        , or email contact@nypllc.com for an invoice.
      </p>
    </div>
  )
}
