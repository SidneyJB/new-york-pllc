import { describe, expect, it } from 'vitest'
import {
  hashEmailForEnhancedConversions,
  normalizeEmailForEnhancedConversions,
  readSpiffyThankYouEmail,
} from './enhanced-conversions'

describe('enhanced-conversions', () => {
  it('normalizes email with trim + lowercase', () => {
    expect(normalizeEmailForEnhancedConversions('  Sid@Example.COM ')).toBe('sid@example.com')
  })

  it('hashes normalized email with SHA-256 hex', async () => {
    const hash = await hashEmailForEnhancedConversions('  Sid@Example.COM ')
    expect(hash).toBe('eafea9bdbab53398d676c3b726a09150599e720e56eaa038799c69b2de823cdc')
  })

  it('returns undefined for missing email', async () => {
    expect(await hashEmailForEnhancedConversions(null)).toBeUndefined()
    expect(await hashEmailForEnhancedConversions('   ')).toBeUndefined()
  })

  it('reads email from Spiffy thank-you params', () => {
    expect(readSpiffyThankYouEmail(new URLSearchParams('email=a%40b.com'))).toBe('a@b.com')
    expect(readSpiffyThankYouEmail(new URLSearchParams('order=1'))).toBeUndefined()
  })
})
