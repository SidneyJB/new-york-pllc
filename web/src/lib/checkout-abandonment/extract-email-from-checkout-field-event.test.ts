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

  it('reads customer[email] field names', () => {
    expect(
      extractEmailFromCheckoutFieldEvent({ name: 'customer[email]', value: 'sid@nypllc.com' }),
    ).toBe('sid@nypllc.com')
  })

  it('reads nested customer.email on order payloads', () => {
    expect(
      extractEmailFromCheckoutFieldEvent({
        customer: { email: 'sid@nypllc.com' },
      }),
    ).toBe('sid@nypllc.com')
  })

  it('reads billing.email', () => {
    expect(
      extractEmailFromCheckoutFieldEvent({
        billing: { email: 'billing@nypllc.com' },
      }),
    ).toBe('billing@nypllc.com')
  })
})
