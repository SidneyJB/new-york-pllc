import { describe, expect, it, vi } from 'vitest'
import { applyPartnerCouponOnCheckoutReady } from './apply-partner-coupon-on-checkout-ready'

describe('applyPartnerCouponOnCheckoutReady', () => {
  it('registers a ready callback and applies the coupon', () => {
    const checkout = vi.fn()
    const spiffy = {
      on: vi.fn((_event: 'ready', callback: () => void) => callback()),
      checkout,
    }

    const registered = applyPartnerCouponOnCheckoutReady({
      checkoutUrl: 'https://nypllc.spiffy.co/checkout/new-york-pllc-formation',
      coupon: 'PARTNER1',
      spiffy,
    })

    expect(registered).toBe(true)
    expect(spiffy.on).toHaveBeenCalledWith('ready', expect.any(Function))
    expect(checkout).toHaveBeenCalledWith('https://nypllc.spiffy.co/checkout/new-york-pllc-formation', {
      coupon: 'PARTNER1',
    })
  })

  it('does not register when coupon is missing', () => {
    const spiffy = {
      on: vi.fn(),
      checkout: vi.fn(),
    }

    const registered = applyPartnerCouponOnCheckoutReady({
      checkoutUrl: 'https://nypllc.spiffy.co/checkout/new-york-pllc-formation',
      coupon: null,
      spiffy,
    })

    expect(registered).toBe(false)
    expect(spiffy.on).not.toHaveBeenCalled()
  })
})
