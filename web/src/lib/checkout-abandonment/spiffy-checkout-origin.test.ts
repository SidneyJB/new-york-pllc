import { describe, expect, it } from 'vitest'
import { SPIFFY_PLLC_CHECKOUT_URL } from '@/components/spiffy/spiffy-pllc-checkout'
import { SPIFFY_LLC_CHECKOUT_URL } from '@/components/spiffy/spiffy-llc-checkout'
import { isTrustedSpiffyOrigin, SPIFFY_CHECKOUT_ORIGINS } from './spiffy-checkout-origin'

describe('isTrustedSpiffyOrigin', () => {
  it('trusts the origin of every checkout URL the site embeds', () => {
    for (const url of [SPIFFY_PLLC_CHECKOUT_URL, SPIFFY_LLC_CHECKOUT_URL]) {
      expect(isTrustedSpiffyOrigin(new URL(url).origin)).toBe(true)
    }
  })

  it('only lists https spiffy.co origins', () => {
    for (const origin of SPIFFY_CHECKOUT_ORIGINS) {
      expect(origin).toMatch(/^https:\/\/[a-z0-9-]+\.spiffy\.co$/)
    }
  })

  it.each([
    'http://nypllc.spiffy.co',
    'https://evil.spiffy.co',
    'https://nypllc.spiffy.co.evil.com',
    'https://nypllc.spiffy.co:8443',
    'https://www.nypllc.com',
    'null',
    '',
  ])('rejects %j', (origin) => {
    expect(isTrustedSpiffyOrigin(origin)).toBe(false)
  })

  it('rejects non-strings', () => {
    expect(isTrustedSpiffyOrigin(undefined)).toBe(false)
    expect(isTrustedSpiffyOrigin(null)).toBe(false)
  })
})
