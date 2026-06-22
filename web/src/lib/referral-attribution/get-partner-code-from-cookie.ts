import { PARTNER_COOKIE_NAME } from './constants'
import { normalizePartnerCode } from './normalize-partner-code'

function readCookieValue(cookie: string, name: string): string | null {
  const prefix = `${name}=`
  const match = cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix))

  return match ? match.slice(prefix.length) : null
}

export function getPartnerCodeFromCookie(cookie = typeof document === 'undefined' ? '' : document.cookie): string | null {
  const value = readCookieValue(cookie, PARTNER_COOKIE_NAME)
  if (!value) return null

  return normalizePartnerCode(decodeURIComponent(value))
}
