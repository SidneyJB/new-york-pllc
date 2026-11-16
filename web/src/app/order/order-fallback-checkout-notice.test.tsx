import { render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { CLICK_ATTR_COOKIE_NAME } from '@/lib/click-attribution/constants'
import { PARTNER_COOKIE_NAME } from '@/lib/referral-attribution/constants'
import { setLocationSearch } from '@/test/setup'
import { OrderFallbackCheckoutNotice } from './order-fallback-checkout-notice'

vi.mock('@/lib/analytics/track', () => ({ trackCTAClick: vi.fn() }))

const checkoutUrl = 'https://nypllc.spiffy.co/checkout/new-york-pllc-formation'

function clearCookies() {
  document.cookie = `${PARTNER_COOKIE_NAME}=; max-age=0; path=/`
  document.cookie = `${CLICK_ATTR_COOKIE_NAME}=; max-age=0; path=/`
}

describe('OrderFallbackCheckoutNotice', () => {
  afterEach(() => {
    clearCookies()
    setLocationSearch('')
  })

  it('links straight to Spiffy when there is nothing to carry', async () => {
    render(<OrderFallbackCheckoutNotice />)
    const link = screen.getByRole('link', { name: /open the secure checkout directly/i })
    await waitFor(() => expect(link).toHaveAttribute('href', checkoutUrl))
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('carries the partner coupon and click attribution to the direct checkout', async () => {
    setLocationSearch('?gclid=abc123&utm_source=google')
    document.cookie = `${PARTNER_COOKIE_NAME}=PARTNER1; path=/`

    render(<OrderFallbackCheckoutNotice />)
    const link = screen.getByRole('link', { name: /open the secure checkout directly/i })

    await waitFor(() => {
      const url = new URL(link.getAttribute('href') ?? '')
      expect(url.origin + url.pathname).toBe(checkoutUrl)
      expect(url.searchParams.get('c')).toBe('PARTNER1')
      expect(url.searchParams.get('gclid')).toBe('abc123')
      expect(url.searchParams.get('utm_source')).toBe('google')
    })
    // No longer bounces partner visitors back to /order.
    expect(link).toHaveAttribute('target', '_blank')
  })
})
