type PartnerOption = { value: string; label: string }

export function lookupPartnerOptionLabel(
  options: readonly PartnerOption[],
  value: string,
): string {
  return options.find((option) => option.value === value)?.label ?? value
}
