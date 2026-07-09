/**
 * Google Enhanced Conversions helpers (hashed email on thank-you).
 * @see https://support.google.com/google-ads/answer/9888656
 */

export function normalizeEmailForEnhancedConversions(email: string): string {
  return email.trim().toLowerCase()
}

export async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function hashEmailForEnhancedConversions(
  email: string | null | undefined,
): Promise<string | undefined> {
  if (!email) return undefined
  const normalized = normalizeEmailForEnhancedConversions(email)
  if (!normalized) return undefined
  return sha256Hex(normalized)
}

export function readSpiffyThankYouEmail(params: URLSearchParams): string | undefined {
  const raw = params.get('email')?.trim()
  return raw || undefined
}
