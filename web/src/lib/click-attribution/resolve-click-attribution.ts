import type { ClickAttribution } from './constants'
import { getClickAttributionFromCookie } from './get-click-attribution-from-cookie'
import { hasClickAttribution, mergeClickAttribution } from './merge-click-attribution'
import { readClickAttributionFromSearch } from './read-click-attribution-from-search'
import { setClickAttributionCookie } from './set-click-attribution-cookie'

/**
 * URL wins per key over cookie; persists merged result when non-empty.
 */
export function resolveAndPersistClickAttribution(
  search: string | URLSearchParams = typeof window === 'undefined' ? '' : window.location.search,
): ClickAttribution {
  const fromUrl = readClickAttributionFromSearch(search)
  const fromCookie = getClickAttributionFromCookie()
  const merged = mergeClickAttribution(fromUrl, fromCookie)

  if (hasClickAttribution(merged)) {
    setClickAttributionCookie(merged)
  }

  return merged
}
