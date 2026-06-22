import { beforeEach, describe, expect, it } from 'vitest'
import { PARTNER_COOKIE_NAME } from './constants'
import { getPartnerCodeFromCookie } from './get-partner-code-from-cookie'
import { setPartnerCodeCookie } from './set-partner-code-cookie'

function clearPartnerCookie() {
  document.cookie = `${PARTNER_COOKIE_NAME}=; max-age=0; path=/`
}

describe('partner code cookie helpers', () => {
  beforeEach(() => {
    clearPartnerCookie()
  })

  it('sets and reads a partner code cookie', () => {
    setPartnerCodeCookie('PARTNER1')
    expect(getPartnerCodeFromCookie()).toBe('PARTNER1')
  })

  it('encodes special characters safely', () => {
    setPartnerCodeCookie('PARTNER 1')
    expect(getPartnerCodeFromCookie()).toBe('PARTNER 1')
  })

  it('returns null when cookie is absent', () => {
    expect(getPartnerCodeFromCookie()).toBeNull()
  })
})
