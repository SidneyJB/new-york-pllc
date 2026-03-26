'use client'

import { trackCTAClick } from '@/lib/analytics/track'
import { PRICING } from '@/lib/constants'

const SPIFFY_PLLC_CHECKOUT_URL =
  'https://nypllc.spiffy.co/checkout/new-york-pllc-formation'

export function OrderFallbackCheckoutNotice() {
  return (
    <div className="mb-6 rounded-md bg-muted/50 px-4 py-2.5 text-center">
      <p className="text-sm leading-relaxed text-muted-foreground">
        If you&apos;re having trouble accessing the order form on this page, you can{' '}
        <a
          href={SPIFFY_PLLC_CHECKOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
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
