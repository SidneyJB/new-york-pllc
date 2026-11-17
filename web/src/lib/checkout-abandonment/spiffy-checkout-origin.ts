/**
 * Origins allowed to post checkout messages to the order page.
 * The inline `<spiffy-checkout>` iframe is served from the checkout URL's host
 * (`SPIFFY_PLLC_CHECKOUT_URL` / `SPIFFY_LLC_CHECKOUT_URL`), and spiffy.js itself only
 * trusts `https://<account>.spiffy.co` for this account.
 */
export const SPIFFY_CHECKOUT_ORIGINS: readonly string[] = ['https://nypllc.spiffy.co']

export function isTrustedSpiffyOrigin(origin: unknown): boolean {
  return typeof origin === 'string' && SPIFFY_CHECKOUT_ORIGINS.includes(origin)
}
