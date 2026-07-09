import type { ClickAttribution } from '@/lib/click-attribution/constants'
import { CLICK_ATTR_PARAM_KEYS } from '@/lib/click-attribution/constants'
import { hasClickAttribution } from '@/lib/click-attribution/merge-click-attribution'
import { normalizePartnerCode } from '@/lib/referral-attribution/normalize-partner-code'

export function buildSpiffyCheckoutUrl(
  baseUrl: string,
  coupon: string | null,
  clickAttribution: ClickAttribution = {},
): string {
  const code = normalizePartnerCode(coupon)
  const hasAttr = hasClickAttribution(clickAttribution)
  if (!code && !hasAttr) return baseUrl

  const url = new URL(baseUrl)
  if (code) url.searchParams.set('c', code)

  for (const key of CLICK_ATTR_PARAM_KEYS) {
    const value = clickAttribution[key]
    if (value) url.searchParams.set(key, value)
  }

  return url.toString()
}
