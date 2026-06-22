import { normalizePartnerCode } from '@/lib/referral-attribution/normalize-partner-code'

export function buildSpiffyCheckoutUrl(baseUrl: string, coupon: string | null): string {
  const code = normalizePartnerCode(coupon)
  if (!code) return baseUrl

  const url = new URL(baseUrl)
  url.searchParams.set('c', code)
  return url.toString()
}
