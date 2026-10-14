import { extractEmailFromCheckoutFieldEvent } from '@/lib/checkout-abandonment/extract-email-from-checkout-field-event'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function decodeSpiffyB64(value: unknown): string | null {
  if (typeof value !== 'string' || !value) return null
  try {
    const decoded = atob(value).trim()
    return EMAIL_RE.test(decoded) ? decoded : null
  } catch {
    return null
  }
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  return value as Record<string, unknown>
}

/**
 * Pull a customer email from a Spiffy postMessage / event-bus payload.
 * Current Elements SDK emits `identify` with base64 `em`, not `change:field`.
 */
export function extractEmailFromSpiffyMessage(data: unknown): string | null {
  if (typeof data === 'string') {
    try {
      return extractEmailFromSpiffyMessage(JSON.parse(data))
    } catch {
      return null
    }
  }

  const rec = asRecord(data)
  if (!rec) return null

  const fromEm = decodeSpiffyB64(rec.em)
  if (fromEm) return fromEm

  if (typeof rec.email === 'string' && EMAIL_RE.test(rec.email.trim())) {
    return rec.email.trim()
  }

  const nested = asRecord(rec.data)
  if (nested) {
    const nestedEm = decodeSpiffyB64(nested.em)
    if (nestedEm) return nestedEm
  }

  return (
    extractEmailFromCheckoutFieldEvent(rec) ||
    (nested ? extractEmailFromCheckoutFieldEvent(nested) : null)
  )
}
