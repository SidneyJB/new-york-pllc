import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import { TawkOnGesture } from './tawk-on-gesture'

describe('TawkOnGesture', () => {
  beforeEach(() => {
    document.head.innerHTML = ''
    delete (window as Window & { Tawk_API?: unknown }).Tawk_API
  })

  afterEach(() => {
    document.getElementById('tawk-script')?.remove()
  })

  it('does not load Tawk until a user gesture', () => {
    render(<TawkOnGesture />)
    expect(document.getElementById('tawk-script')).toBeNull()
  })

  it('loads Tawk once on first pointerdown', async () => {
    render(<TawkOnGesture />)
    window.dispatchEvent(new Event('pointerdown'))

    await waitFor(() => {
      const script = document.getElementById('tawk-script') as HTMLScriptElement | null
      expect(script).not.toBeNull()
      expect(script?.src).toContain('embed.tawk.to')
    })

    window.dispatchEvent(new Event('pointerdown'))
    expect(document.querySelectorAll('#tawk-script')).toHaveLength(1)
  })
})
