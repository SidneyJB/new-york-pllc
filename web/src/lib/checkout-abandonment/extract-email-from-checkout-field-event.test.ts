import { describe, it, expect } from 'vitest'
import { extractEmailFromCheckoutFieldEvent } from './extract-email-from-checkout-field-event'

describe('extractEmailFromCheckoutFieldEvent', () => {
  it('reads named email fields', () => {
    expect(
      extractEmailFromCheckoutFieldEvent({ name: 'email', value: 'sid@nypllc.com' }),
    ).toBe('sid@nypllc.com')
  })

  it('ignores non-email values', () => {
    expect(extractEmailFromCheckoutFieldEvent({ name: 'pllc_name', value: 'Test PLLC' })).toBeNull()
  })

  it('ignores email-shaped values on non-email fields', () => {
    expect(
      extractEmailFromCheckoutFieldEvent({ name: 'notes', value: 'reach me at sid@nypllc.com' }),
    ).toBeNull()
  })
})
