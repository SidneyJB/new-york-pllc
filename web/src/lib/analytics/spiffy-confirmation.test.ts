import { describe, expect, it } from 'vitest'
import {
  buildSafePurchaseMetadata,
  parseSpiffyOrderId,
  parseSpiffyOrderTotalDollars,
  resolvePurchaseAmountDollars,
} from './spiffy-confirmation'

describe('spiffy-confirmation', () => {
  it('parses order id from order=', () => {
    const params = new URLSearchParams('order=2445951&total=100')
    expect(parseSpiffyOrderId(params)).toBe('2445951')
  })

  it('falls back to order_id', () => {
    const params = new URLSearchParams('order_id=spiffy-123')
    expect(parseSpiffyOrderId(params)).toBe('spiffy-123')
  })

  it('parses total cents to dollars', () => {
    expect(parseSpiffyOrderTotalDollars(new URLSearchParams('total=88500'))).toBe(885)
    expect(parseSpiffyOrderTotalDollars(new URLSearchParams('total=100'))).toBe(1)
    expect(parseSpiffyOrderTotalDollars(new URLSearchParams('total=200'))).toBe(2)
  })

  it('returns undefined for missing/invalid total', () => {
    expect(parseSpiffyOrderTotalDollars(new URLSearchParams(''))).toBeUndefined()
    expect(parseSpiffyOrderTotalDollars(new URLSearchParams('total=abc'))).toBeUndefined()
  })

  it('resolves amount preferring Spiffy total over fallback', () => {
    const params = new URLSearchParams('total=100')
    expect(resolvePurchaseAmountDollars(params, 885)).toBe(1)
    expect(resolvePurchaseAmountDollars(new URLSearchParams(''), 885)).toBe(885)
  })

  it('strips SSN, DOB, and contact PII from purchase metadata', () => {
    const params = new URLSearchParams(
      'order=2445951&total=100&code=TEST&owner_ssn=555555555&owner_dob=10111994&email=a%40b.com&phone_number=9735182872&name_first=Sidney&shipping_street1=19+Crestwood&practice_type=therapy&pllc_name=Test+PLLC&add=false&ups=false',
    )
    const meta = JSON.parse(buildSafePurchaseMetadata(params)) as Record<string, string>
    expect(meta).toEqual({
      order: '2445951',
      total: '100',
      code: 'TEST',
      practice_type: 'therapy',
      pllc_name: 'Test PLLC',
      add: 'false',
      ups: 'false',
    })
    expect(meta).not.toHaveProperty('owner_ssn')
    expect(meta).not.toHaveProperty('owner_dob')
    expect(meta).not.toHaveProperty('email')
  })
})
