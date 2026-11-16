import { getClickAttributionFromCookie } from '@/lib/click-attribution/get-click-attribution-from-cookie'
import { mergeClickAttribution } from '@/lib/click-attribution/merge-click-attribution'
import { readClickAttributionFromSearch } from '@/lib/click-attribution/read-click-attribution-from-search'
import { getPartnerCodeFromCookie } from '@/lib/referral-attribution/get-partner-code-from-cookie'
import { readPartnerCodeFromSearch } from '@/lib/referral-attribution/read-partner-code-from-search'
import { buildSpiffyCheckoutUrl } from './build-spiffy-checkout-url'

type ResolveSpiffyCheckoutHrefOptions = {
  baseUrl: string
  search?: string
  cookie?: string
}

/**
 * Direct (non-embedded) Spiffy checkout link carrying the same partner `c` code
 * and click attribution (gclid/gbraid/wbraid/msclkid/UTMs) the embed gets.
 * Read-only: URL wins per key over cookie, nothing is persisted.
 */
export function resolveSpiffyCheckoutHref({
  baseUrl,
  search = typeof window === 'undefined' ? '' : window.location.search,
  cookie = typeof document === 'undefined' ? '' : document.cookie,
}: ResolveSpiffyCheckoutHrefOptions): string {
  const partnerCode = readPartnerCodeFromSearch(search) || getPartnerCodeFromCookie(cookie)
  const clickAttribution = mergeClickAttribution(
    readClickAttributionFromSearch(search),
    getClickAttributionFromCookie(cookie),
  )

  return buildSpiffyCheckoutUrl(baseUrl, partnerCode, clickAttribution)
}
