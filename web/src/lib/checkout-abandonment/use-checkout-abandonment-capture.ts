'use client'

import { useEffect, useRef } from 'react'
import { trackLeadStart } from '@/lib/analytics/track'
import { extractEmailFromSpiffyMessage } from '@/lib/checkout-abandonment/extract-email-from-spiffy-message'
import { readSpiffyCustomerEmailFromCookie } from '@/lib/checkout-abandonment/read-spiffy-customer-cookie'
import { extractEmailFromCheckoutFieldEvent } from '@/lib/checkout-abandonment/extract-email-from-checkout-field-event'
import { reportCheckoutAbandonment } from '@/lib/checkout-abandonment/report-checkout-abandonment'

type SpiffyCheckoutHandle = {
  on: (event: string, handler: (ev: unknown) => void) => void
}

type SpiffyGlobal = {
  on?: (event: string, handler: (ev: unknown) => void) => void
  checkout?: (url: string) => SpiffyCheckoutHandle
}

const LEGACY_CHECKOUT_EVENTS = ['change:field', 'change:order', 'change:paymethod'] as const
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

function parseMessageEventData(data: unknown): unknown {
  if (typeof data !== 'string') return data
  try {
    return JSON.parse(data)
  } catch {
    return data
  }
}

/**
 * Registers Spiffy checkout abandonment capture.
 * Do not use `window.checkout` — that name is the checkout iframe element in Elements v1.1.
 */
export function useCheckoutAbandonmentCapture(): void {
  const lastReportedEmail = useRef('')
  const trackedLeadStart = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const maybeReport = (email: string | null) => {
      if (!email || email === lastReportedEmail.current) return
      void reportCheckoutAbandonment(email).then((ok) => {
        if (ok) lastReportedEmail.current = email
      })
    }

    const onSpiffyPayload = (payload: unknown) => {
      const email =
        extractEmailFromSpiffyMessage(payload) || extractEmailFromCheckoutFieldEvent(payload)
      if (!email) return

      const now = Date.now()
      if (!trackedLeadStart.current) {
        trackedLeadStart.current = true
        sessionStorage.setItem('form_first_interaction_time', now.toString())
        trackLeadStart({ form: 'checkout', step: 'field_interaction' })
      }
      const prev = Number(sessionStorage.getItem('form_field_change_count') || '0')
      sessionStorage.setItem('form_field_change_count', String(prev + 1))
      sessionStorage.setItem('form_last_interaction_time', now.toString())
      maybeReport(email)
    }

    const onPageExit = () => {
      maybeReport(readSpiffyCustomerEmailFromCookie())
    }

    const onMessage = (event: MessageEvent) => {
      onSpiffyPayload(parseMessageEventData(event.data))
    }

    window.addEventListener('message', onMessage)
    window.addEventListener('pagehide', onPageExit)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') onPageExit()
    })

    const attachCheckoutHandle = (spiffy: SpiffyGlobal, url: string) => {
      if (typeof spiffy.checkout !== 'function') return
      try {
        const handle = spiffy.checkout(url)
        for (const eventName of LEGACY_CHECKOUT_EVENTS) {
          handle.on(eventName, onSpiffyPayload)
        }
      } catch {
        // checkout() throws if URL not mounted yet
      }
    }

    const attachGlobalBus = (spiffy: SpiffyGlobal) => {
      if (typeof spiffy.on !== 'function') return
      for (const eventName of SPIFFY_BUS_EVENTS) {
        spiffy.on(eventName, onSpiffyPayload)
      }
      spiffy.on('ready', () => {
        const url = resolveCheckoutUrlFromDom()
        if (url) attachCheckoutHandle(spiffy, url)
      })
    }

    let attempts = 0
    const maxAttempts = 120
    const poll = () => {
      const spiffy = getSpiffy()
      if (spiffy) {
        attachGlobalBus(spiffy)
        const url = resolveCheckoutUrlFromDom()
        if (url) attachCheckoutHandle(spiffy, url)
        return
      }
      attempts += 1
      if (attempts < maxAttempts) setTimeout(poll, 500)
    }
    poll()

    return () => {
      window.removeEventListener('message', onMessage)
      window.removeEventListener('pagehide', onPageExit)
    }
  }, [])
}
