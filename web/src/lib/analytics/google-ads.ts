import { hashEmailForEnhancedConversions } from './enhanced-conversions'

/**
 * Google Ads conversion tag (AW-17672972971).
 * Action: "Purchase (Spiffy thank-you value)" — primary as of Jul 9 2026 flip.
 * Created via API 2026-07-08; id 7678072764.
 *
 * Enhanced Conversions: pass thank-you `email` when Spiffy includes it; hashed client-side.
 */
export const GOOGLE_ADS_PURCHASE_SEND_TO = 'AW-17672972971/w4sBCLyvmM0cEKvVkOtB'

export async function trackGoogleAdsPurchase(options: {
  value: number
  transactionId?: string
  email?: string | null
}): Promise<void> {
  if (typeof window === 'undefined' || !window.gtag) return

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
