const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value)
}

function fieldNameLooksLikeNotes(name: string): boolean {
  return /note|comment|message|memo/.test(name)
}

function fieldNameLooksLikeEmail(name: string): boolean {
  return /email/.test(name) || /customer\[email\]/.test(name)
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  return value as Record<string, unknown>
}

function emailFromNamedValue(name: string, value: unknown): string | null {
  if (typeof value !== 'string' || !value.includes('@')) return null
  const email = value.trim()
  if (!isValidEmail(email)) return null
  if (fieldNameLooksLikeNotes(name)) return null
  if (fieldNameLooksLikeEmail(name)) return email
  return null
}

function emailFromRecord(rec: Record<string, unknown>, depth = 0): string | null {
  if (depth > 4) return null

  const field = asRecord(rec.field)
  const name = String(
    rec.name ?? rec.key ?? rec.id ?? field?.name ?? field?.key ?? field?.id ?? '',
  ).toLowerCase()
  const value = rec.value ?? rec.email ?? field?.value ?? field?.email
  const looksLikeEmailField =
    fieldNameLooksLikeEmail(name) || rec.type === 'email' || field?.type === 'email'

  if (typeof value === 'string' && value.includes('@')) {
    const email = value.trim()
    if (isValidEmail(email) && looksLikeEmailField && !fieldNameLooksLikeNotes(name)) {
      return email
    }
  }

  const named = emailFromNamedValue(name, value)
  if (named) return named

  for (const key of ['email', 'customerEmail', 'customer_email', 'billingEmail'] as const) {
    const candidate = rec[key]
    if (typeof candidate === 'string') {
      const email = candidate.trim()
      if (isValidEmail(email)) return email
    }
  }

  for (const nestedKey of ['customer', 'billing', 'data', 'order', 'purchaser'] as const) {
    const nested = asRecord(rec[nestedKey])
    if (!nested) continue
    const nestedEmail = nested.email
    if (typeof nestedEmail === 'string') {
      const email = nestedEmail.trim()
      if (isValidEmail(email)) return email
    }
    const deeper = emailFromRecord(nested, depth + 1)
    if (deeper) return deeper
  }

  return null
}

export function extractEmailFromCheckoutFieldEvent(ev: unknown): string | null {
  const rec = asRecord(ev)
  if (!rec) return null
  return emailFromRecord(rec)
}
