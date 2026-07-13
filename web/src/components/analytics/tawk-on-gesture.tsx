'use client'

import { useEffect } from 'react'

const TAWK_SRC = 'https://embed.tawk.to/68f940cd511129194ce113cc/1j86qa8he'
const GESTURE_EVENTS = ['pointerdown', 'keydown', 'touchstart', 'scroll'] as const

declare global {
  interface Window {
    Tawk_API?: {
      customStyle?: {
        visibility?: {
          desktop?: { position?: string; xOffset?: number; yOffset?: number }
          mobile?: { position?: string; xOffset?: number; yOffset?: number }
        }
      }
      [key: string]: unknown
    }
    Tawk_LoadStart?: Date
  }
}

function loadTawk(): void {
  if (typeof window === 'undefined') return
  if (document.getElementById('tawk-script')) return

  window.Tawk_API = window.Tawk_API || {}
  // Sit above the mobile sticky CTA (desktop unchanged).
  window.Tawk_API.customStyle = {
    visibility: {
      desktop: {
        position: 'br',
        xOffset: 20,
        yOffset: 0,
      },
      mobile: {
        position: 'br',
        xOffset: 12,
        yOffset: 72,
      },
    },
  }
  window.Tawk_LoadStart = new Date()

  const script = document.createElement('script')
  script.id = 'tawk-script'
  script.async = true
  script.src = TAWK_SRC
  script.charset = 'UTF-8'
  script.setAttribute('crossorigin', '*')
  document.head.appendChild(script)
}

/**
 * Load Tawk.to only after the first user gesture so chat JS
 * does not compete with LCP on initial paint.
 */
export function TawkOnGesture() {
  useEffect(() => {
    let loaded = false

    const onGesture = () => {
      if (loaded) return
      loaded = true
      teardown()
      loadTawk()
    }

    const teardown = () => {
      for (const event of GESTURE_EVENTS) {
        window.removeEventListener(event, onGesture)
      }
    }

    for (const event of GESTURE_EVENTS) {
      window.addEventListener(event, onGesture, { passive: true })
    }

    return teardown
  }, [])

  return null
}
