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

  describe('Spiffy custom JS identify message (Nov 2026)', () => {
    const exampleString = JSON.stringify({ event: 'identify', data: { email: 'sid@nypllc.com' } })

    it('reads the JSON string exactly as Spiffy example posts it', () => {
      expect(extractEmailFromSpiffyMessage(exampleString)).toBe('sid@nypllc.com')
    })

    it('reads the same message as an object', () => {
      expect(
        extractEmailFromSpiffyMessage({ event: 'identify', data: { email: 'sid@nypllc.com' } }),
      ).toBe('sid@nypllc.com')
    })

    it('trims whitespace', () => {
      expect(
        extractEmailFromSpiffyMessage({ event: 'identify', data: { email: '  sid@nypllc.com ' } }),
      ).toBe('sid@nypllc.com')
    })

    it('reads the spiffy.js bus shape (data keys copied onto the event)', () => {
      expect(
        extractEmailFromSpiffyMessage({
          event: 'identify',
          email: 'sid@nypllc.com',
          data: { email: 'sid@nypllc.com' },
        }),
      ).toBe('sid@nypllc.com')
    })

    it.each([
      'not json',
      '{"event":"identify","data":{"email":"sid@nypllc.com"}',
      '',
      'null',
      '42',
      '[]',
    ])('returns null for invalid JSON / non-object string %j', (raw) => {
      expect(extractEmailFromSpiffyMessage(raw)).toBeNull()
    })

    it.each(['sid', 'sid@gmail', 'sid@gmail.c', '', ' ', 'a b@c.com'])(
      'rejects bad email %j',
      (email) => {
        expect(extractEmailFromSpiffyMessage({ event: 'identify', data: { email } })).toBeNull()
        expect(
          extractEmailFromSpiffyMessage(JSON.stringify({ event: 'identify', data: { email } })),
        ).toBeNull()
      },
    )

    it('rejects non-string email values', () => {
      expect(
        extractEmailFromSpiffyMessage({ event: 'identify', data: { email: ['sid@nypllc.com'] } }),
      ).toBeNull()
      expect(extractEmailFromSpiffyMessage({ event: 'identify', data: { email: 1 } })).toBeNull()
      expect(extractEmailFromSpiffyMessage({ event: 'identify', data: null })).toBeNull()
    })

    it('ignores Spiffy UI events with no email', () => {
      expect(extractEmailFromSpiffyMessage(JSON.stringify({ event: 'form:size', data: { height: 900 } }))).toBeNull()
      expect(extractEmailFromSpiffyMessage({ event: 'form:ready', data: {} })).toBeNull()
    })

    it('ignores oversized strings', () => {
      const big = JSON.stringify({ event: 'identify', data: { email: 'sid@nypllc.com', pad: 'x'.repeat(30_000) } })
      expect(extractEmailFromSpiffyMessage(big)).toBeNull()
    })

    it('rejects base64 em that decodes to a non-email', () => {
      expect(extractEmailFromSpiffyMessage({ event: 'identify', em: btoa('sid@gmail') })).toBeNull()
      expect(extractEmailFromSpiffyMessage({ event: 'identify', em: '%%%not-base64' })).toBeNull()
    })

    it('handles non-object inputs', () => {
      expect(extractEmailFromSpiffyMessage(undefined)).toBeNull()
      expect(extractEmailFromSpiffyMessage(null)).toBeNull()
      expect(extractEmailFromSpiffyMessage(123)).toBeNull()
      expect(extractEmailFromSpiffyMessage(['sid@nypllc.com'])).toBeNull()
    })
  })
})
