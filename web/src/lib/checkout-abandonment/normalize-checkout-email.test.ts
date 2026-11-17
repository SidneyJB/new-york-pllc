import { describe, expect, it } from 'vitest'
import { normalizeCheckoutEmail } from './normalize-checkout-email'

describe('normalizeCheckoutEmail', () => {
  it.each([
    ['sid@nypllc.com', 'sid@nypllc.com'],
    ['  Sid.Brodsky+test@Example.co.uk ', 'Sid.Brodsky+test@Example.co.uk'],
    ['a_b-c@sub.domain.io', 'a_b-c@sub.domain.io'],
  ])('accepts %s', (input, expected) => {
    expect(normalizeCheckoutEmail(input)).toBe(expected)
  })

  it.each([
    '',
    '   ',
    'sid',
    'sid@',
    'sid@gmail',
    'sid@gmail.c',
    'sid@gmail.',
    '@gmail.com',
    'sid @gmail.com',
    'sid@@gmail.com',
    'sid@-gmail.com',
    '<script>@x.com',
    'a,b@x.com',
  ])('rejects %j', (input) => {
    expect(normalizeCheckoutEmail(input)).toBeNull()
  })

  it('rejects non-strings', () => {
    expect(normalizeCheckoutEmail(undefined)).toBeNull()
    expect(normalizeCheckoutEmail(null)).toBeNull()
    expect(normalizeCheckoutEmail(42)).toBeNull()
    expect(normalizeCheckoutEmail({ email: 'sid@nypllc.com' })).toBeNull()
  })

  it('rejects over-long addresses', () => {
    expect(normalizeCheckoutEmail(`${'a'.repeat(250)}@x.com`)).toBeNull()
  })
})
