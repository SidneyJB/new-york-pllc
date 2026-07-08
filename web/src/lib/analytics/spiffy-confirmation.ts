/**
 * Spiffy custom thank-you URL params (Send order details through URL).
 * `total` is full contracted order value in cents (including payment plans).
 * @see nypllc-google-ads-operating-plan.md §1.1.2
 */

/** Safe keys only — never log SSN, DOB, email, address, phone, etc. */
const PURCHASE_METADATA_ALLOWLIST = new Set([
  'order',
  'order_id',
  'total',
  'code',
  'c',
  'add',
  'ups',
  'practice_type',
  'pllc_name',
])

const SENSITIVE_PARAM_PATTERN =
  /(^|_)(ssn|dob|date_of_birth|birth_?date|email|phone|street|address|zip|city|name_first|name_last|password|tax_id|ein)(_|$)/i

export function parseSpiffyOrderId(params: URLSearchParams): string | undefined {
  return (
    params.get('order') ||
    params.get('order_id') ||
    params.get('id') ||
    params.get('orderId') ||
    undefined
  )?.trim() || undefined
}

/** Spiffy `total` is cents → dollars. Returns undefined if missing/invalid. */
export function parseSpiffyOrderTotalDollars(params: URLSearchParams): number | undefined {
  const raw = params.get('total')
  if (raw == null || raw === '') return undefined
  const cents = Number(raw)
  if (!Number.isFinite(cents) || cents < 0) return undefined
  return cents / 100
}

export function resolvePurchaseAmountDollars(
  params: URLSearchParams,
  fallbackDollars: number,
): number {
  return parseSpiffyOrderTotalDollars(params) ?? fallbackDollars
}

/** JSON of allowlisted thank-you params for Vercel analytics (no PII). */
export function buildSafePurchaseMetadata(params: URLSearchParams): string {
  const safe: Record<string, string> = {}
  params.forEach((value, key) => {
    if (!PURCHASE_METADATA_ALLOWLIST.has(key)) return
    if (SENSITIVE_PARAM_PATTERN.test(key)) return
    safe[key] = value
  })
  return JSON.stringify(safe)
}
