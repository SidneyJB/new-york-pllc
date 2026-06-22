import { describe, expect, it } from 'vitest'
import { normalizePartnerCode } from './normalize-partner-code'

describe('normalizePartnerCode', () => {
  it('trims codes without changing case', () => {
    expect(normalizePartnerCode('  PartnerCode123  ')).toBe('PartnerCode123')
  })

  it('rejects empty values', () => {
    expect(normalizePartnerCode('   ')).toBeNull()
    expect(normalizePartnerCode(null)).toBeNull()
    expect(normalizePartnerCode(undefined)).toBeNull()
  })
})
