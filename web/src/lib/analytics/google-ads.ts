/**
 * Google Ads conversion tag (AW-17672972971).
 * Action: "Purchase (Spiffy thank-you value)" — secondary until flip after verify.
 * Created via API 2026-07-08; id 7678072764.
 */
export const GOOGLE_ADS_PURCHASE_SEND_TO = 'AW-17672972971/w4sBCLyvmM0cEKvVkOtB'

export function trackGoogleAdsPurchase(options: {
  value: number
  transactionId?: string
}): void {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', 'conversion', {
    send_to: GOOGLE_ADS_PURCHASE_SEND_TO,
    value: options.value,
    currency: 'USD',
    transaction_id: options.transactionId ?? '',
  })
}
