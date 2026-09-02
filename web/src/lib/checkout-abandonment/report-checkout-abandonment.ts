import type { ClickAttribution } from '@/lib/click-attribution/constants'
import { getClickAttributionFromCookie } from '@/lib/click-attribution/get-click-attribution-from-cookie'

export async function reportCheckoutAbandonment(email: string): Promise<void> {
  if (typeof window === 'undefined') return
  const key = `checkout_abandonment_reported:${email.trim().toLowerCase()}`
  try {
    if (sessionStorage.getItem(key) === '1') return
  } catch {
    // private mode
  }

  const attr: ClickAttribution = getClickAttributionFromCookie()
  try {
    await fetch('/api/checkout-abandonment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        url: window.location.href,
        gclid: attr.gclid,
        wbraid: attr.wbraid,
        gbraid: attr.gbraid,
        utmSource: attr.utm_source,
        utmMedium: attr.utm_medium,
        utmCampaign: attr.utm_campaign,
        utmContent: attr.utm_content,
        utmTerm: attr.utm_term,
      }),
      keepalive: true,
    })
    try {
      sessionStorage.setItem(key, '1')
    } catch {
      // ignore
    }
  } catch {
    // Best-effort: never break checkout.
  }
}
