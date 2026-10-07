import type { ClickAttribution } from '@/lib/click-attribution/constants'
import { getClickAttributionFromCookie } from '@/lib/click-attribution/get-click-attribution-from-cookie'

const MAX_ATTEMPTS = 3
const RETRY_BASE_DELAY_MS = 400

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function reportCheckoutAbandonment(email: string): Promise<boolean> {
  if (typeof window === 'undefined') return false
  const key = `checkout_abandonment_reported:${email.trim().toLowerCase()}`
  try {
    if (sessionStorage.getItem(key) === '1') return true
  } catch {
    // private mode
  }

  const attr: ClickAttribution = getClickAttributionFromCookie()
  const payload = {
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
  }

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch('/api/checkout-abandonment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: attempt === MAX_ATTEMPTS,
      })
      if (res.ok) {
        try {
          sessionStorage.setItem(key, '1')
        } catch {
          // ignore
        }
        return true
      }
      const body = await res.text().catch(() => '')
      console.error('checkout abandonment ingest failed', res.status, body)
      const retryable = res.status === 429 || res.status >= 500
      if (!retryable || attempt === MAX_ATTEMPTS) return false
    } catch (error) {
      console.error('checkout abandonment ingest error', error)
      if (attempt === MAX_ATTEMPTS) return false
    }
    await sleep(RETRY_BASE_DELAY_MS * attempt)
  }

  return false
}
