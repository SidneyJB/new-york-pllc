import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { reportCheckoutAbandonment } from './report-checkout-abandonment'

describe('reportCheckoutAbandonment', () => {
  beforeEach(() => {
    sessionStorage.clear()
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('retries on 503 and succeeds on later attempt', async () => {
    const fetchMock = vi.mocked(fetch)
    fetchMock
      .mockResolvedValueOnce(new Response('not ready', { status: 503 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ ok: true }), { status: 200 }))

    const ok = await reportCheckoutAbandonment('sid@nypllc.com')

    expect(ok).toBe(true)
    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(sessionStorage.getItem('checkout_abandonment_reported:sid@nypllc.com')).toBe('1')
  })

  it('does not mark session storage when all attempts fail', async () => {
    const fetchMock = vi.mocked(fetch)
    fetchMock.mockResolvedValue(new Response('no secret', { status: 503 }))

    const ok = await reportCheckoutAbandonment('fail@nypllc.com')

    expect(ok).toBe(false)
    expect(fetchMock).toHaveBeenCalledTimes(3)
    expect(sessionStorage.getItem('checkout_abandonment_reported:fail@nypllc.com')).toBeNull()
  })
})
