import { describe, expect, it } from 'vitest'
import { CLICK_ATTR_COOKIE_NAME } from '@/lib/click-attribution/constants'
import { PARTNER_COOKIE_NAME } from '@/lib/referral-attribution/constants'
import { resolveSpiffyCheckoutHref } from './resolve-spiffy-checkout-href'

const baseUrl = 'https://nypllc.spiffy.co/checkout/new-york-pllc-formation'

function clickCookie(value: Record<string, string>): string {
  return `${CLICK_ATTR_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(value))}`
}

describe('resolveSpiffyCheckoutHref', () => {
  it('returns the bare checkout url with no attribution or partner code', () => {
    expect(resolveSpiffyCheckoutHref({ baseUrl, search: '', cookie: '' })).toBe(baseUrl)
  })

  it('carries click ids, UTMs and the partner code from the page URL', () => {
    const href = resolveSpiffyCheckoutHref({
      baseUrl,
      search: '?gclid=g-1&gbraid=gb-1&wbraid=wb-1&msclkid=ms-1&utm_source=google&utm_campaign=brand&c=PARTNER1',
      cookie: '',
    })
    const url = new URL(href)
    expect(url.origin + url.pathname).toBe(baseUrl)
    expect(url.searchParams.get('c')).toBe('PARTNER1')
    expect(url.searchParams.get('gclid')).toBe('g-1')
    expect(url.searchParams.get('gbraid')).toBe('gb-1')
    expect(url.searchParams.get('wbraid')).toBe('wb-1')
    expect(url.searchParams.get('msclkid')).toBe('ms-1')
    expect(url.searchParams.get('utm_source')).toBe('google')
    expect(url.searchParams.get('utm_campaign')).toBe('brand')
  })

  it('falls back to cookies when the order page URL has no query string', () => {
    const cookie = [
      `${PARTNER_COOKIE_NAME}=${encodeURIComponent('PARTNER2')}`,
      clickCookie({ gclid: 'cookie-gclid', utm_source: 'google' }),
    ].join('; ')
    const url = new URL(resolveSpiffyCheckoutHref({ baseUrl, search: '', cookie }))
    expect(url.searchParams.get('c')).toBe('PARTNER2')
    expect(url.searchParams.get('gclid')).toBe('cookie-gclid')
    expect(url.searchParams.get('utm_source')).toBe('google')
  })

  it('lets the page URL win per key over cookies, like the embed', () => {
    const cookie = [
      `${PARTNER_COOKIE_NAME}=OLDPARTNER`,
      clickCookie({ gclid: 'old-gclid', utm_source: 'bing' }),
    ].join('; ')
    const url = new URL(
      resolveSpiffyCheckoutHref({ baseUrl, search: '?gclid=new-gclid&code=NEWPARTNER', cookie }),
    )
    expect(url.searchParams.get('c')).toBe('NEWPARTNER')
    expect(url.searchParams.get('gclid')).toBe('new-gclid')
    expect(url.searchParams.get('utm_source')).toBe('bing')
  })

  it('ignores unrelated query params', () => {
    const href = resolveSpiffyCheckoutHref({ baseUrl, search: '?fbclid=x&foo=bar', cookie: '' })
    expect(href).toBe(baseUrl)
  })
})
