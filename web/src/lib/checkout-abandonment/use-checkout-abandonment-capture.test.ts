import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { trackLeadStart } from '@/lib/analytics/track'
import { reportCheckoutAbandonment } from './report-checkout-abandonment'
import {
  CHECKOUT_EMAIL_DEBOUNCE_MS,
  useCheckoutAbandonmentCapture,
} from './use-checkout-abandonment-capture'

vi.mock('@/lib/analytics/track', () => ({
  trackLeadStart: vi.fn(),
}))

vi.mock('./report-checkout-abandonment', () => ({
  reportCheckoutAbandonment: vi.fn(),
}))

const SPIFFY_ORIGIN = 'https://nypllc.spiffy.co'

function identifyString(email: string) {
  // Exactly what Spiffy's example posts.
  return JSON.stringify({ event: 'identify', data: { email } })
}

function post(data: unknown, origin = SPIFFY_ORIGIN) {
  act(() => {
    window.dispatchEvent(new MessageEvent('message', { data, origin }))
  })
}

function settle() {
  act(() => {
    vi.advanceTimersByTime(CHECKOUT_EMAIL_DEBOUNCE_MS + 10)
  })
}

async function flushPromises() {
  await act(async () => {
    await Promise.resolve()
    await Promise.resolve()
  })
}

function setVisibility(state: 'visible' | 'hidden') {
  Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => state })
}

describe('useCheckoutAbandonmentCapture', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.clearAllMocks()
    vi.mocked(reportCheckoutAbandonment).mockResolvedValue(true)
    sessionStorage.clear()
    document.cookie = '_sp_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
    delete (window as { spiffy?: unknown }).spiffy
    setVisibility('visible')
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("reports the email from Spiffy's example message (JSON string) after the debounce", () => {
    renderHook(() => useCheckoutAbandonmentCapture())

    post(identifyString('sid@nypllc.com'))
    expect(reportCheckoutAbandonment).not.toHaveBeenCalled()
    expect(trackLeadStart).toHaveBeenCalledWith({ form: 'checkout', step: 'field_interaction' })

    settle()
    expect(reportCheckoutAbandonment).toHaveBeenCalledTimes(1)
    expect(reportCheckoutAbandonment).toHaveBeenCalledWith('sid@nypllc.com', { keepalive: false })
    expect(sessionStorage.getItem('form_field_change_count')).toBe('1')
  })

  it('accepts the same message as an object', () => {
    renderHook(() => useCheckoutAbandonmentCapture())
    post({ event: 'identify', data: { email: 'obj@nypllc.com' } })
    settle()
    expect(reportCheckoutAbandonment).toHaveBeenCalledWith('obj@nypllc.com', { keepalive: false })
  })

  it.each([
    'https://evil.example',
    'https://www.nypllc.com',
    'http://nypllc.spiffy.co',
    'https://nypllc.spiffy.co.evil.example',
    '',
    'null',
  ])('ignores messages from untrusted origin %j', (origin) => {
    renderHook(() => useCheckoutAbandonmentCapture())
    post(identifyString('sid@nypllc.com'), origin)
    settle()
    expect(reportCheckoutAbandonment).not.toHaveBeenCalled()
    expect(trackLeadStart).not.toHaveBeenCalled()
  })

  it.each([
    ['invalid JSON', '{"event":"identify","data":{"email":"sid@nypllc.com"'],
    ['plain text', 'hello'],
    ['partial email', identifyString('sid@gmail')],
    ['no TLD', identifyString('sid@gmail.c')],
    ['empty email', identifyString('')],
    ['UI event', JSON.stringify({ event: 'form:size', data: { height: 1200 } })],
  ])('ignores %s', (_label, data) => {
    renderHook(() => useCheckoutAbandonmentCapture())
    post(data)
    settle()
    expect(reportCheckoutAbandonment).not.toHaveBeenCalled()
  })

  it('de-duplicates repeated change:field posts of the same email', async () => {
    renderHook(() => useCheckoutAbandonmentCapture())
    for (let i = 0; i < 5; i++) post(identifyString('dup@nypllc.com'))
    settle()
    await flushPromises()
    post(identifyString('dup@nypllc.com'))
    post(identifyString('DUP@nypllc.com'))
    settle()
    expect(reportCheckoutAbandonment).toHaveBeenCalledTimes(1)
  })

  it('sends only the latest email while the buyer is still editing', () => {
    renderHook(() => useCheckoutAbandonmentCapture())
    post(identifyString('sid@gmail.co'))
    act(() => vi.advanceTimersByTime(500))
    post(identifyString('sid@gmail.com'))
    settle()
    expect(reportCheckoutAbandonment).toHaveBeenCalledTimes(1)
    expect(reportCheckoutAbandonment).toHaveBeenCalledWith('sid@gmail.com', { keepalive: false })
  })

  it('reports a changed email after the first one was sent', async () => {
    renderHook(() => useCheckoutAbandonmentCapture())
    post(identifyString('first@nypllc.com'))
    settle()
    await flushPromises()
    post(identifyString('second@nypllc.com'))
    settle()
    expect(vi.mocked(reportCheckoutAbandonment).mock.calls.map((c) => c[0])).toEqual([
      'first@nypllc.com',
      'second@nypllc.com',
    ])
  })

  it('retries the same email later when the first report failed', async () => {
    vi.mocked(reportCheckoutAbandonment).mockResolvedValueOnce(false)
    renderHook(() => useCheckoutAbandonmentCapture())
    post(identifyString('retry@nypllc.com'))
    settle()
    await flushPromises()
    post(identifyString('retry@nypllc.com'))
    settle()
    expect(reportCheckoutAbandonment).toHaveBeenCalledTimes(2)
  })

  it('flushes the pending email with keepalive on pagehide', () => {
    renderHook(() => useCheckoutAbandonmentCapture())
    post(identifyString('exit@nypllc.com'))
    act(() => {
      window.dispatchEvent(new Event('pagehide'))
    })
    expect(reportCheckoutAbandonment).toHaveBeenCalledWith('exit@nypllc.com', { keepalive: true })
    settle()
    expect(reportCheckoutAbandonment).toHaveBeenCalledTimes(1)
  })

  it('flushes the pending email when the tab is hidden', () => {
    renderHook(() => useCheckoutAbandonmentCapture())
    post(identifyString('hidden@nypllc.com'))
    setVisibility('hidden')
    act(() => {
      document.dispatchEvent(new Event('visibilitychange'))
    })
    expect(reportCheckoutAbandonment).toHaveBeenCalledWith('hidden@nypllc.com', { keepalive: true })
  })

  it('falls back to the _sp_id cookie on exit when nothing is pending', () => {
    document.cookie = `_sp_id=${encodeURIComponent(JSON.stringify({ email: 'cookie@nypllc.com' }))}; path=/`
    renderHook(() => useCheckoutAbandonmentCapture())
    act(() => {
      window.dispatchEvent(new Event('pagehide'))
    })
    expect(reportCheckoutAbandonment).toHaveBeenCalledWith('cookie@nypllc.com', { keepalive: true })
  })

  it('does nothing on exit with no email', () => {
    renderHook(() => useCheckoutAbandonmentCapture())
    act(() => {
      window.dispatchEvent(new Event('pagehide'))
    })
    expect(reportCheckoutAbandonment).not.toHaveBeenCalled()
  })

  it('flushes on unmount and stops listening afterwards', () => {
    const { unmount } = renderHook(() => useCheckoutAbandonmentCapture())
    post(identifyString('nav@nypllc.com'))
    unmount()
    expect(reportCheckoutAbandonment).toHaveBeenCalledWith('nav@nypllc.com', { keepalive: true })

    post(identifyString('after@nypllc.com'))
    setVisibility('hidden')
    act(() => {
      document.dispatchEvent(new Event('visibilitychange'))
      window.dispatchEvent(new Event('pagehide'))
    })
    settle()
    expect(reportCheckoutAbandonment).toHaveBeenCalledTimes(1)
  })

  it('handles spiffy.js bus identify (parent-page autoIdentify) but skips bus copies of cross-frame messages', () => {
    const busHandlers: Record<string, ((ev: unknown, raw?: unknown) => void)[]> = {}
    ;(window as { spiffy?: unknown }).spiffy = {
      on: (name: string, fn: (ev: unknown, raw?: unknown) => void) => {
        ;(busHandlers[name] ||= []).push(fn)
      },
    }
    renderHook(() => useCheckoutAbandonmentCapture())
    expect(busHandlers.identify).toHaveLength(1)

    const raw = new MessageEvent('message', { data: identifyString('x@nypllc.com'), origin: SPIFFY_ORIGIN })
    act(() => busHandlers.identify[0]({ event: 'identify', email: 'bus-copy@nypllc.com' }, raw))
    settle()
    expect(reportCheckoutAbandonment).not.toHaveBeenCalled()

    act(() => busHandlers.identify[0]({ event: 'identify', em: btoa('auto@nypllc.com') }))
    settle()
    expect(reportCheckoutAbandonment).toHaveBeenCalledWith('auto@nypllc.com', { keepalive: false })
  })

  it('does not throw when the report call rejects', async () => {
    vi.mocked(reportCheckoutAbandonment).mockRejectedValueOnce(new Error('boom'))
    renderHook(() => useCheckoutAbandonmentCapture())
    post(identifyString('reject@nypllc.com'))
    settle()
    await flushPromises()
    post(identifyString('reject@nypllc.com'))
    settle()
    expect(reportCheckoutAbandonment).toHaveBeenCalledTimes(2)
  })
})
