import { describe, it, expect } from 'vitest'
import { extractEmailFromSpiffyMessage } from './extract-email-from-spiffy-message'

describe('extractEmailFromSpiffyMessage', () => {
  it('decodes identify em (base64)', () => {
    const em = btoa('sid@nypllc.com')
    expect(extractEmailFromSpiffyMessage({ event: 'identify', em })).toBe('sid@nypllc.com')
  })

  it('reads nested data.em', () => {
    const em = btoa('billing@nypllc.com')
    expect(extractEmailFromSpiffyMessage({ data: { em } })).toBe('billing@nypllc.com')
  })

  it('falls back to checkout field extractor', () => {
    expect(
      extractEmailFromSpiffyMessage({ name: 'email', value: 'sid@nypllc.com' }),
    ).toBe('sid@nypllc.com')
  })
})
