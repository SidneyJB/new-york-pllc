import { describe, expect, it, vi } from 'vitest'
import { applyPartnerCouponOnCheckoutReady } from './apply-partner-coupon-on-checkout-ready'

describe('applyPartnerCouponOnCheckoutReady', () => {
  it('applies immediately when checkout is already available', () => {
    const checkout = vi.fn()
    const spiffy = {
      on: vi.fn(),
      checkout,
    }

    const applied = applyPartnerCouponOnCheckoutReady({
      checkoutUrl: 'https://nypllc.spiffy.co/checkout/new-york-pllc-formation',
      coupon: 'PARTNER1',
      spiffy,
    })

    expect(applied).toBe(true)
    expect(spiffy.on).not.toHaveBeenCalled()
    expect(checkout).toHaveBeenCalledWith('https://nypllc.spiffy.co/checkout/new-york-pllc-formation', {
      coupon: 'PARTNER1',
    })
  })

  it('registers a ready callback when checkout is not available yet', () => {
    const spiffy = {
      on: vi.fn(),
    }

    const applied = applyPartnerCouponOnCheckoutReady({
      checkoutUrl: 'https://nypllc.spiffy.co/checkout/new-york-pllc-formation',
      coupon: 'PARTNER1',
      spiffy,
    })

    expect(applied).toBe(false)
    expect(spiffy.on).toHaveBeenCalledWith('ready', expect.any(Function))
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
