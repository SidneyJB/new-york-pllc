import { describe, expect, it } from 'vitest'
import { readPartnerCodeFromSearch } from './read-partner-code-from-search'

describe('readPartnerCodeFromSearch', () => {
  it('reads c before other partner coupon aliases', () => {
    expect(readPartnerCodeFromSearch('?c=PARTNER1&code=PARTNER2&coupon=PARTNER3')).toBe('PARTNER1')
  })

  it('falls back to code and coupon aliases', () => {
    expect(readPartnerCodeFromSearch('?code=PARTNER2')).toBe('PARTNER2')
    expect(readPartnerCodeFromSearch('?coupon=PARTNER3')).toBe('PARTNER3')
  })

  it('trims partner codes and ignores blank values', () => {
    expect(readPartnerCodeFromSearch('?c=%20PARTNER1%20')).toBe('PARTNER1')
    expect(readPartnerCodeFromSearch('?c=%20%20&code=PARTNER2')).toBe('PARTNER2')
  })

  it('returns null when no partner code exists', () => {
    expect(readPartnerCodeFromSearch('?utm_source=google')).toBeNull()
  })
})
