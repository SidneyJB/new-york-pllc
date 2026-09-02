export function extractEmailFromCheckoutFieldEvent(ev: unknown): string | null {
  if (!ev || typeof ev !== 'object') return null
  const rec = ev as Record<string, unknown>
  const field = rec.field && typeof rec.field === 'object' ? (rec.field as Record<string, unknown>) : null
  const name = String(rec.name ?? rec.key ?? field?.name ?? field?.key ?? '').toLowerCase()
  const value = rec.value ?? rec.email ?? field?.value ?? field?.email
  const looksLikeEmailField = /email/.test(name) || rec.type === 'email' || field?.type === 'email'
  if (typeof value === 'string' && value.includes('@')) {
    const email = value.trim()
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && looksLikeEmailField) {
      return email
    }
  }
  const nested = rec.data
  if (nested && typeof nested === 'object' && typeof (nested as { email?: unknown }).email === 'string') {
    const email = String((nested as { email: string }).email).trim()
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return email
  }
  return null
}
