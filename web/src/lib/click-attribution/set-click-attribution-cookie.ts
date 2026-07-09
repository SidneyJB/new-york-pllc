import {
  CLICK_ATTR_COOKIE_MAX_AGE_DAYS,
  CLICK_ATTR_COOKIE_NAME,
  type ClickAttribution,
} from './constants'
import { hasClickAttribution } from './merge-click-attribution'

function getMaxAgeSeconds(): number {
  return CLICK_ATTR_COOKIE_MAX_AGE_DAYS * 24 * 60 * 60
}

export function setClickAttributionCookie(attr: ClickAttribution): void {
  if (!hasClickAttribution(attr) || typeof document === 'undefined') return

  document.cookie = [
    `${CLICK_ATTR_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(attr))}`,
    `max-age=${getMaxAgeSeconds()}`,
    'path=/',
    'SameSite=Lax',
  ].join('; ')
}
