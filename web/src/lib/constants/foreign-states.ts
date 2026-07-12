export const FOREIGN_QUALIFICATION_STATES = [
  {
    state: 'New Jersey',
    slug: 'new-jersey',
    pllcPrice: 995,
    pcPrice: 995,
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
    pllcPrice: 930,
    pcPrice: 930,
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
    pllcPrice: 1000,
    pcPrice: 1000,
  },
] as const

/**
 * Pricing rule (Jul 2026): for each home state, charge one flat package price for
 * foreign PLLC and foreign PC — round_to_5(895 + unified home-doc CoGS), where unified
 * docs = max(PLLC path, PC path). Quote unusual document/member/publication costs separately.
 * Source: data/foreign-qualification-cogs.json
 */
