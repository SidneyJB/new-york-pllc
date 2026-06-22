import { ORDER_PAGE_PATH } from './constants'
import { normalizePartnerCode } from './normalize-partner-code'

export function buildOrderPageHref(code: string | null | undefined): string {
  const normalized = normalizePartnerCode(code)
  if (!normalized) return ORDER_PAGE_PATH

  const params = new URLSearchParams({ c: normalized })
  return `${ORDER_PAGE_PATH}?${params.toString()}`
}
