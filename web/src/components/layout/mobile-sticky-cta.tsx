'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Phone } from 'lucide-react'
import { TrackedCTAButton, TrackedPhoneLink } from '@/components/analytics/tracked-cta'
import { APP_CONFIG, PRICING } from '@/lib/constants'

/** Mobile sticky bar height (matches pb reservation + Tawk yOffset). */
export const MOBILE_STICKY_CTA_HEIGHT_PX = 72

function shouldHideStickyCta(pathname: string | null): boolean {
  if (!pathname) return false
  return (
    pathname === '/order' ||
    pathname.startsWith('/order/') ||
    pathname === '/order-llc' ||
    pathname.startsWith('/order-llc/')
  )
}

/**
 * Mobile-only sticky CTA: primary order button + tap-to-call.
 * Hidden on checkout routes. Tawk bubble is offset above this bar (see TawkOnGesture).
 */
export function MobileStickyCta() {
  const pathname = usePathname()
  const hidden = shouldHideStickyCta(pathname)

  useEffect(() => {
    if (hidden) {
      document.documentElement.style.removeProperty('--mobile-sticky-cta-h')
      return
    }
    document.documentElement.style.setProperty(
      '--mobile-sticky-cta-h',
      `${MOBILE_STICKY_CTA_HEIGHT_PX}px`,
    )
    return () => {
      document.documentElement.style.removeProperty('--mobile-sticky-cta-h')
    }
  }, [hidden])

  if (hidden) return null

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      data-testid="mobile-sticky-cta"
    >
      <div className="flex items-center gap-2 px-3 py-2.5">
        <TrackedCTAButton
          href="/order"
          cta="Start your PLLC — $885"
          location="mobile_sticky"
          size="lg"
          className="h-11 min-w-0 flex-1 text-sm sm:text-base"
        >
          Start your PLLC — ${PRICING.basePrice}
        </TrackedCTAButton>
        <TrackedPhoneLink
          phone={APP_CONFIG.phone}
          location="mobile_sticky"
          className="inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground shadow-xs hover:bg-muted"
          aria-label={`Call ${APP_CONFIG.phone}`}
        >
          <Phone className="size-4" aria-hidden />
          Call
        </TrackedPhoneLink>
      </div>
    </div>
  )
}
