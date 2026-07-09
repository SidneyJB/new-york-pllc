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

  it('appends click IDs and UTMs without dropping coupon', () => {
    const url = buildSpiffyCheckoutUrl(checkoutUrl, 'PARTNER1', {
      gclid: 'gclid-test',
      wbraid: 'wb-1',
      utm_source: 'google',
      utm_campaign: 'brand',
    })
    const params = new URL(url).searchParams
    expect(params.get('c')).toBe('PARTNER1')
    expect(params.get('gclid')).toBe('gclid-test')
    expect(params.get('wbraid')).toBe('wb-1')
    expect(params.get('utm_source')).toBe('google')
    expect(params.get('utm_campaign')).toBe('brand')
  })

  it('appends attribution alone when coupon is missing', () => {
    const url = buildSpiffyCheckoutUrl(checkoutUrl, null, { gclid: 'only-gclid' })
    expect(url).toBe('https://nypllc.spiffy.co/checkout/new-york-pllc-formation?gclid=only-gclid')
  })
})
