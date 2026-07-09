import {
  CLICK_ATTR_COOKIE_NAME,
  CLICK_ATTR_PARAM_KEYS,
  type ClickAttribution,
} from './constants'
import { normalizeClickAttrValue } from './normalize-click-attr-value'

function readCookieValue(cookie: string, name: string): string | null {
  const prefix = `${name}=`
  const match = cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix))

  return match ? match.slice(prefix.length) : null
}

export function getClickAttributionFromCookie(
  cookie = typeof document === 'undefined' ? '' : document.cookie,
): ClickAttribution {
  const raw = readCookieValue(cookie, CLICK_ATTR_COOKIE_NAME)
  if (!raw) return {}

  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as unknown
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {}

    const result: ClickAttribution = {}
    for (const key of CLICK_ATTR_PARAM_KEYS) {
      const value = normalizeClickAttrValue(
        typeof (parsed as Record<string, unknown>)[key] === 'string'
          ? ((parsed as Record<string, unknown>)[key] as string)
          : null,
      )
      if (value) result[key] = value
    }
    return result
  } catch {
    return {}
  }
}
