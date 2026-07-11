export const FOREIGN_QUALIFICATION_STATES = [
  {
    state: 'New Jersey',
    slug: 'new-jersey',
    pllcPrice: 975,
    pcPrice: 975,
  },
  {
    state: 'Pennsylvania',
    slug: 'pennsylvania',
    pllcPrice: 995,
    pcPrice: 995,
  },
  {
    state: 'Florida',
    slug: 'florida',
    pllcPrice: 915,
    pcPrice: 915,
  },
  {
    state: 'Texas',
    slug: 'texas',
    pllcPrice: 930,
    pcPrice: 930,
  },
  {
    state: 'Connecticut',
    slug: 'connecticut',
    pllcPrice: 995,
    pcPrice: 995,
  },
] as const

/**
 * Pricing rule (Jul 2026): for each home state, charge one flat package price for
 * foreign PLLC and foreign PC — the higher of the two path costs. Do not split
 * PLLC vs PC list price when adding new states; use max(path costs) and quote
 * unusual document/member/publication costs separately.
 */
