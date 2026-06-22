import { describe, expect, it } from 'vitest'
import { buildSpiffyCheckoutUrl } from './build-spiffy-checkout-url'

describe('buildSpiffyCheckoutUrl', () => {
  const checkoutUrl = 'https://nypllc.spiffy.co/checkout/new-york-pllc-formation'

  it('adds coupon code as a c query parameter', () => {
    expect(buildSpiffyCheckoutUrl(checkoutUrl, 'TESTREFERRALUI')).toBe(
      'https://nypllc.spiffy.co/checkout/new-york-pllc-formation?c=TESTREFERRALUI',
    )
  })

  it('trims coupon codes', () => {
    expect(buildSpiffyCheckoutUrl(checkoutUrl, ' TESTREFERRALUI ')).toBe(
      'https://nypllc.spiffy.co/checkout/new-york-pllc-formation?c=TESTREFERRALUI',
    )
  })

  it('returns the base checkout url when coupon is missing', () => {
    expect(buildSpiffyCheckoutUrl(checkoutUrl, null)).toBe(checkoutUrl)
  })
})
