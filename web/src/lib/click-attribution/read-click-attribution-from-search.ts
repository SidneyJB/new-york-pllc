import { CLICK_ATTR_PARAM_KEYS, type ClickAttribution } from './constants'
import { normalizeClickAttrValue } from './normalize-click-attr-value'

export function readClickAttributionFromSearch(
  search: string | URLSearchParams,
): ClickAttribution {
  const params = typeof search === 'string' ? new URLSearchParams(search) : search
  const result: ClickAttribution = {}

  for (const key of CLICK_ATTR_PARAM_KEYS) {
    const value = normalizeClickAttrValue(params.get(key))
    if (value) result[key] = value
  }

  return result
}
