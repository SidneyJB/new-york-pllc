import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import {
  trackGoogleAdsBeginCheckout,
  trackGoogleAdsPurchase,
  waitForGtag,
} from './google-ads'

describe('waitForGtag', () => {
  afterEach(() => {
    delete window.gtag
  })

  it('resolves true when gtag is already present', async () => {
    window.gtag = vi.fn()
    await expect(waitForGtag(100)).resolves.toBe(true)
  })

  it('resolves false when gtag never appears', async () => {
    delete window.gtag
    await expect(waitForGtag(120)).resolves.toBe(false)
  })
})

describe('trackGoogleAdsBeginCheckout', () => {
  const gtag = vi.fn()

  beforeEach(() => {
    gtag.mockClear()
    window.gtag = gtag
  })

  afterEach(() => {
    delete window.gtag
  })

  it('fires secondary Begin checkout conversion', async () => {
    await trackGoogleAdsBeginCheckout()
    expect(gtag).toHaveBeenCalledWith('event', 'conversion', {
      send_to: 'AW-17672972971/dWKtCIi5zM0cEKvVkOtB',
    })
  })

  it('no-ops when gtag never loads', async () => {
    delete window.gtag
    await trackGoogleAdsBeginCheckout()
    // waitForGtag times out; no conversion fired
    expect(gtag).not.toHaveBeenCalled()
  }, 6000)
})

describe('trackGoogleAdsPurchase', () => {
  const gtag = vi.fn()

  beforeEach(() => {
    gtag.mockClear()
    window.gtag = gtag
  })

  afterEach(() => {
    delete window.gtag
  })

  it('sets Enhanced Conversions user_data then fires conversion', async () => {
    await trackGoogleAdsPurchase({
      value: 885,
      transactionId: '2446882',
      email: 'Susan@Example.com',
    })

    expect(gtag).toHaveBeenNthCalledWith(1, 'set', 'user_data', {
      sha256_email_address: expect.stringMatching(/^[a-f0-9]{64}$/),
    })
    expect(gtag).toHaveBeenNthCalledWith(
      2,
      'event',
      'conversion',
      expect.objectContaining({
        send_to: 'AW-17672972971/w4sBCLyvmM0cEKvVkOtB',
        value: 885,
        currency: 'USD',
        transaction_id: '2446882',
      }),
    )
  })

  it('skips user_data when email is missing', async () => {
    await trackGoogleAdsPurchase({ value: 885, transactionId: '1' })

    expect(gtag).toHaveBeenCalledTimes(1)
    expect(gtag).toHaveBeenCalledWith(
      'event',
      'conversion',
      expect.objectContaining({ transaction_id: '1' }),
    )
  })
})
