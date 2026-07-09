import { CLICK_ATTR_PARAM_KEYS, type ClickAttribution } from './constants'
import { normalizeClickAttrValue } from './normalize-click-attr-value'

/**
 * Per-key merge: primary wins when non-empty; never clears a stored key with empty.
 */
export function mergeClickAttribution(
  primary: ClickAttribution,
  fallback: ClickAttribution,
): ClickAttribution {
  const result: ClickAttribution = {}

  for (const key of CLICK_ATTR_PARAM_KEYS) {
    const fromPrimary = normalizeClickAttrValue(primary[key])
    const fromFallback = normalizeClickAttrValue(fallback[key])
    const value = fromPrimary ?? fromFallback
    if (value) result[key] = value
  }

  return result
}

export function hasClickAttribution(attr: ClickAttribution): boolean {
  return CLICK_ATTR_PARAM_KEYS.some((key) => Boolean(attr[key]))
}
