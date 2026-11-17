import { extractEmailFromCheckoutFieldEvent } from '@/lib/checkout-abandonment/extract-email-from-checkout-field-event'
import { normalizeCheckoutEmail } from '@/lib/checkout-abandonment/normalize-checkout-email'

/** Spiffy's own messages are small; anything bigger is not ours. */
const MAX_MESSAGE_STRING_LENGTH = 20_000

function decodeSpiffyB64(value: unknown): string | null {
  if (typeof value !== 'string' || !value) return null
  try {
    return normalizeCheckoutEmail(atob(value))
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
 *
 * Shapes handled:
 * - Custom JS in the checkout (Nov 2026):
 *   `JSON.stringify({ event: 'identify', data: { email } })` (string or object)
 * - spiffy.js bus `identify` (parent-page autoIdentify): `{ em: base64 }` or `{ data: { em } }`
 * - Field-shaped payloads (`{ name: 'email', value }`, `customer.email`, ...)
 */
export function extractEmailFromSpiffyMessage(data: unknown): string | null {
  if (typeof data === 'string') {
    if (data.length > MAX_MESSAGE_STRING_LENGTH) return null
    try {
      return extractEmailFromSpiffyMessage(JSON.parse(data))
    } catch {
      return null
    }
  }

  const rec = asRecord(data)
  if (!rec) return null

  const nested = asRecord(rec.data)

  if (rec.event === 'identify') {
    const fromIdentify =
      normalizeCheckoutEmail(nested?.email) ||
      normalizeCheckoutEmail(rec.email) ||
      decodeSpiffyB64(nested?.em) ||
      decodeSpiffyB64(rec.em)
    if (fromIdentify) return fromIdentify
  }

  const fromEm = decodeSpiffyB64(rec.em)
  if (fromEm) return fromEm

  const topLevel = normalizeCheckoutEmail(rec.email)
  if (topLevel) return topLevel

  if (nested) {
    const nestedEm = decodeSpiffyB64(nested.em)
    if (nestedEm) return nestedEm
  }

  return normalizeCheckoutEmail(
    extractEmailFromCheckoutFieldEvent(rec) ||
      (nested ? extractEmailFromCheckoutFieldEvent(nested) : null),
  )
}
