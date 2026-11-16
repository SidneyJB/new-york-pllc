'use client'

import { useEffect, useState } from 'react'
import { resolveSpiffyCheckoutHref } from '@/components/spiffy/resolve-spiffy-checkout-href'
import { SPIFFY_PLLC_CHECKOUT_URL } from '@/components/spiffy/spiffy-pllc-checkout'
import { trackCTAClick } from '@/lib/analytics/track'
import { PRICING } from '@/lib/constants'

export function OrderFallbackCheckoutNotice() {
  const [href, setHref] = useState(SPIFFY_PLLC_CHECKOUT_URL)

  useEffect(() => {
    // Same partner `c` code + click ids/UTMs the embedded checkout gets.
    setHref(resolveSpiffyCheckoutHref({ baseUrl: SPIFFY_PLLC_CHECKOUT_URL }))
  }, [])

  return (
    <div className="mb-6 rounded-md bg-muted/50 px-4 py-2.5 text-center">
      <p className="text-sm leading-relaxed text-muted-foreground">
        If you&apos;re having trouble accessing the order form on this page, you can{' '}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary underline underline-offset-2 hover:text-primary/90"
          onClick={(event) => {
            // Re-resolve at click time so attribution persisted after mount is included.
            const latestHref = resolveSpiffyCheckoutHref({ baseUrl: SPIFFY_PLLC_CHECKOUT_URL })
            event.currentTarget.href = latestHref
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
