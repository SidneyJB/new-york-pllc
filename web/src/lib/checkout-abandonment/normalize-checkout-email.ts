/**
 * Strict-enough email check for abandoned-checkout capture.
 * Rejects half-typed values (`sid@gmail`, `sid@gmail.c`) so the CRM does not store
 * a partial address while the buyer is still typing.
 */
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i

export const MAX_CHECKOUT_EMAIL_LENGTH = 254

export function normalizeCheckoutEmail(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const email = value.trim()
  if (!email || email.length > MAX_CHECKOUT_EMAIL_LENGTH) return null
  return EMAIL_RE.test(email) ? email : null
}
