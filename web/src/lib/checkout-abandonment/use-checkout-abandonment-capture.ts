'use client'

import { useEffect, useRef } from 'react'
import { trackLeadStart } from '@/lib/analytics/track'
import { extractEmailFromSpiffyMessage } from '@/lib/checkout-abandonment/extract-email-from-spiffy-message'
import { readSpiffyCustomerEmailFromCookie } from '@/lib/checkout-abandonment/read-spiffy-customer-cookie'
import { reportCheckoutAbandonment } from '@/lib/checkout-abandonment/report-checkout-abandonment'
import { isTrustedSpiffyOrigin } from '@/lib/checkout-abandonment/spiffy-checkout-origin'

type SpiffyCheckoutHandle = {
  on: (event: string, handler: (ev: unknown, raw?: unknown) => void) => void
}

type SpiffyGlobal = {
  on?: (event: string, handler: (ev: unknown, raw?: unknown) => void) => void
  checkout?: (url: string) => SpiffyCheckoutHandle
}

/**
 * Wait this long after the last email change before sending it, so a buyer who is
 * still typing or fixing a typo produces one CRM row, not one per keystroke/blur.
 * Page exit flushes immediately.
 */
export const CHECKOUT_EMAIL_DEBOUNCE_MS = 1500

// Spiffy (Nov 16 2026): these never reach the parent page; kept as harmless no-ops.
const LEGACY_CHECKOUT_EVENTS = ['change:field', 'change:order', 'change:paymethod'] as const
// `identify` fires on the spiffy.js bus for parent-page autoIdentify and for the
// checkout custom-JS message (see docs/spiffy-custom-js-email-capture.html).
const SPIFFY_BUS_EVENTS = ['identify', 'customer:auth', 'form:ready', 'order:error'] as const

function getSpiffy(): SpiffyGlobal | undefined {
  if (typeof window === 'undefined') return undefined
  return (window as typeof window & { spiffy?: SpiffyGlobal }).spiffy
}

function resolveCheckoutUrlFromDom(): string | null {
  const el = document.querySelector('spiffy-checkout')
  const url = el?.getAttribute('url')?.trim()
  return url || null
}

function safeSessionStorage(): Storage | null {
  try {
    return window.sessionStorage
  } catch {
    return null
  }
}

/**
 * Registers Spiffy checkout abandonment capture.
 *
 * Source of the email (Nov 2026): custom JS pasted into the Spiffy checkout posts
 * `JSON.stringify({ event: 'identify', data: { email } })` to `window.parent`.
 * Only messages from the Spiffy checkout origin are accepted.
 *
 * Do not use `window.checkout` — that name is the checkout iframe element in Elements v1.1.
 */
export function useCheckoutAbandonmentCapture(): void {
  const trackedLeadStart = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let disposed = false
    let pendingEmail: string | null = null
    let debounceTimer: ReturnType<typeof setTimeout> | null = null
    let pollTimer: ReturnType<typeof setTimeout> | null = null
    const reported = new Set<string>()
    const inFlight = new Set<string>()

    const send = (email: string, keepalive: boolean) => {
      const key = email.toLowerCase()
      if (reported.has(key) || inFlight.has(key)) return
      inFlight.add(key)
      Promise.resolve(reportCheckoutAbandonment(email, { keepalive }))
        .then((ok) => {
          if (ok) reported.add(key)
        })
        .catch(() => undefined)
        .finally(() => inFlight.delete(key))
    }

    const flush = (keepalive: boolean) => {
      if (debounceTimer) {
        clearTimeout(debounceTimer)
        debounceTimer = null
      }
      const email = pendingEmail
      pendingEmail = null
      if (email) send(email, keepalive)
    }

    const recordEngagement = () => {
      const storage = safeSessionStorage()
      const now = Date.now()
      if (!trackedLeadStart.current) {
        trackedLeadStart.current = true
        storage?.setItem('form_first_interaction_time', now.toString())
        trackLeadStart({ form: 'checkout', step: 'field_interaction' })
      }
      const prev = Number(storage?.getItem('form_field_change_count') || '0')
      storage?.setItem('form_field_change_count', String(prev + 1))
      storage?.setItem('form_last_interaction_time', now.toString())
    }

    const onSpiffyPayload = (payload: unknown) => {
      if (disposed) return
      const email = extractEmailFromSpiffyMessage(payload)
      if (!email) return
      recordEngagement()
      if (reported.has(email.toLowerCase())) {
        pendingEmail = null
        return
      }
      pendingEmail = email
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => flush(false), CHECKOUT_EMAIL_DEBOUNCE_MS)
    }

    const onPageExit = () => {
      if (pendingEmail) {
        flush(true)
        return
      }
      const cookieEmail = readSpiffyCustomerEmailFromCookie()
      if (cookieEmail) send(cookieEmail, true)
    }

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') onPageExit()
    }

    const onMessage = (event: MessageEvent) => {
      if (!isTrustedSpiffyOrigin(event.origin)) return
      onSpiffyPayload(event.data)
    }

    // spiffy.js re-dispatches trusted cross-frame messages on its bus with the
    // MessageEvent as the 2nd arg; `onMessage` already handled those.
    const onBusEvent = (payload: unknown, raw?: unknown) => {
      if (typeof MessageEvent !== 'undefined' && raw instanceof MessageEvent) return
      onSpiffyPayload(payload)
    }

    window.addEventListener('message', onMessage)
    window.addEventListener('pagehide', onPageExit)
    document.addEventListener('visibilitychange', onVisibilityChange)

    const attachCheckoutHandle = (spiffy: SpiffyGlobal, url: string) => {
      if (typeof spiffy.checkout !== 'function') return
      try {
        const handle = spiffy.checkout(url)
        for (const eventName of LEGACY_CHECKOUT_EVENTS) {
          handle.on(eventName, onBusEvent)
        }
      } catch {
        // checkout() throws if URL not mounted yet
      }
    }

    const attachGlobalBus = (spiffy: SpiffyGlobal) => {
      if (typeof spiffy.on !== 'function') return
      for (const eventName of SPIFFY_BUS_EVENTS) {
        spiffy.on(eventName, onBusEvent)
      }
      spiffy.on('ready', () => {
        if (disposed) return
        const url = resolveCheckoutUrlFromDom()
        if (url) attachCheckoutHandle(spiffy, url)
      })
    }

    let attempts = 0
    const maxAttempts = 120
    const poll = () => {
      pollTimer = null
      if (disposed) return
      const spiffy = getSpiffy()
      if (spiffy) {
        attachGlobalBus(spiffy)
        const url = resolveCheckoutUrlFromDom()
        if (url) attachCheckoutHandle(spiffy, url)
        return
      }
      attempts += 1
      if (attempts < maxAttempts) pollTimer = setTimeout(poll, 500)
    }
    poll()

    return () => {
      // Client-side navigation away from /order: send what we have.
      flush(true)
      disposed = true
      if (pollTimer) clearTimeout(pollTimer)
      window.removeEventListener('message', onMessage)
      window.removeEventListener('pagehide', onPageExit)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])
}
