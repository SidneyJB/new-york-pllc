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

describe('reportCheckoutAbandonment keepalive', () => {
  beforeEach(() => {
    sessionStorage.clear()
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('uses keepalive on the first attempt when the page is closing', async () => {
    const fetchMock = vi.mocked(fetch)
    fetchMock.mockResolvedValueOnce(new Response('{}', { status: 200 }))

    await reportCheckoutAbandonment('exit@nypllc.com', { keepalive: true })

    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('/api/checkout-abandonment')
    expect(init?.keepalive).toBe(true)
    expect(JSON.parse(String(init?.body))).toMatchObject({ email: 'exit@nypllc.com' })
  })

  it('does not use keepalive on the first attempt by default', async () => {
    const fetchMock = vi.mocked(fetch)
    fetchMock.mockResolvedValueOnce(new Response('{}', { status: 200 }))

    await reportCheckoutAbandonment('live@nypllc.com')

    expect(fetchMock.mock.calls[0][1]?.keepalive).toBe(false)
  })

  it('skips the network when this session already reported the email', async () => {
    const fetchMock = vi.mocked(fetch)
    sessionStorage.setItem('checkout_abandonment_reported:dup@nypllc.com', '1')

    expect(await reportCheckoutAbandonment('Dup@nypllc.com')).toBe(true)
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
