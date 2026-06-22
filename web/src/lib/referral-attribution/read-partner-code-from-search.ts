import { PARTNER_QUERY_PARAM_KEYS } from './constants'
import { normalizePartnerCode } from './normalize-partner-code'

export function readPartnerCodeFromSearch(search: string | URLSearchParams): string | null {
  const params = typeof search === 'string' ? new URLSearchParams(search) : search

  for (const key of PARTNER_QUERY_PARAM_KEYS) {
    const code = normalizePartnerCode(params.get(key))
    if (code) return code
  }

  return null
}
