import { hashEmailForEnhancedConversions } from './enhanced-conversions'

/**
 * Google Ads conversion tag (AW-17672972971).
 * Purchase: "Purchase (Spiffy thank-you value)" — primary as of Jul 9 2026 flip (id 7678072764).
 * Begin checkout: secondary observation only (id 7678925960) — not in Conversions / bidding.
 *
 * Enhanced Conversions: pass thank-you `email` when Spiffy includes it; hashed client-side.
 *
 * Site loads a merged gtag (Ads + GA4) via lazyOnload — wait before money/funnel events.
 */
export const GOOGLE_ADS_PURCHASE_SEND_TO = 'AW-17672972971/w4sBCLyvmM0cEKvVkOtB'
export const GOOGLE_ADS_BEGIN_CHECKOUT_SEND_TO = 'AW-17672972971/dWKtCIi5zM0cEKvVkOtB'

/** Wait for merged gtag stub/library when loaded via lazyOnload. */
export async function waitForGtag(timeoutMs = 4000): Promise<boolean> {
  if (typeof window === 'undefined') return false
  if (window.gtag) return true

  const started = Date.now()
  while (Date.now() - started < timeoutMs) {
    await new Promise((resolve) => setTimeout(resolve, 50))
    if (window.gtag) return true
  }
  return false
}

export async function trackGoogleAdsBeginCheckout(): Promise<void> {
  if (!(await waitForGtag()) || !window.gtag) return
  window.gtag('event', 'conversion', {
    send_to: GOOGLE_ADS_BEGIN_CHECKOUT_SEND_TO,
  })
}

export async function trackGoogleAdsPurchase(options: {
  value: number
  transactionId?: string
  email?: string | null
}): Promise<void> {
  if (!(await waitForGtag()) || !window.gtag) return

  const hashedEmail = await hashEmailForEnhancedConversions(options.email)
  if (hashedEmail) {
    window.gtag('set', 'user_data', {
      sha256_email_address: hashedEmail,
    })
  }

  window.gtag('event', 'conversion', {
    send_to: GOOGLE_ADS_PURCHASE_SEND_TO,
    value: options.value,
    currency: 'USD',
    transaction_id: options.transactionId ?? '',
  })
}
