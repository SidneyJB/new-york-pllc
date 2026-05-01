'use client'

import { useEffect, useRef } from 'react'

type SpiffyCheckoutEmbedProps = {
  checkoutUrl: string
  className?: string
}

/**
 * Spiffy registers/upgrades <spiffy-checkout> when the node is appended in the browser.
 * Server-rendered innerHTML often misses that path on Next.js client navigations.
 */
export function SpiffyCheckoutEmbed({ checkoutUrl, className }: SpiffyCheckoutEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const el = document.createElement('spiffy-checkout')
    el.setAttribute('url', checkoutUrl)
    container.appendChild(el)

    return () => {
      container.replaceChildren()
    }
  }, [checkoutUrl])

  return <div ref={containerRef} className={className} />
}
