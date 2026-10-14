const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Spiffy sets `_sp_id` JSON `{ email, name_first, name_last }` on identify (first-party). */
export function readSpiffyCustomerEmailFromCookie(): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/(?:^|; )_sp_id=([^;]*)/)
  if (!match?.[1]) return null
  try {
    const raw = decodeURIComponent(match[1])
    const parsed = JSON.parse(raw) as { email?: unknown }
    const email = typeof parsed.email === 'string' ? parsed.email.trim() : ''
    return EMAIL_RE.test(email) ? email : null
  } catch {
    return null
  }
}
