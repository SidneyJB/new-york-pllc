export function normalizePartnerCode(value: string | null | undefined): string | null {
  const code = value?.trim()
  return code ? code : null
}
