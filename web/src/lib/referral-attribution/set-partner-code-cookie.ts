import { PARTNER_COOKIE_MAX_AGE_DAYS, PARTNER_COOKIE_NAME } from './constants'
import { normalizePartnerCode } from './normalize-partner-code'

function getMaxAgeSeconds(): number {
  return PARTNER_COOKIE_MAX_AGE_DAYS * 24 * 60 * 60
}

export function setPartnerCodeCookie(code: string): void {
  const normalized = normalizePartnerCode(code)
  if (!normalized || typeof document === 'undefined') return

  document.cookie = [
    `${PARTNER_COOKIE_NAME}=${encodeURIComponent(normalized)}`,
    `max-age=${getMaxAgeSeconds()}`,
    'path=/',
    'SameSite=Lax',
  ].join('; ')
}
