import { describe, it, expect, vi, beforeEach } from 'vitest'
import { track } from '@vercel/analytics'
import {
  getUTMParams,
  trackCTAClick,
  trackLeadStart,
  trackLeadSubmit,
  trackCheckoutStart,
  trackPurchase,
  trackPhoneClick,
  trackEmailClick,
} from '@/lib/analytics/track'
import { setLocationSearch } from '@/test/setup'

vi.mock('@vercel/analytics', () => ({
  track: vi.fn(),
}))

describe('Analytics Tracking', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setLocationSearch('')
  })

  describe('getUTMParams', () => {
    it('should return empty object when no UTM params', () => {
      const result = getUTMParams()
      expect(result).toEqual({})
    })

    it('should extract utm_source and utm_campaign', () => {
      setLocationSearch('?utm_source=google&utm_campaign=test')
      const result = getUTMParams()
      expect(result).toEqual({
        utm_source: 'google',
        utm_campaign: 'test',
      })
    })

    it('should return undefined for missing UTM params', () => {
      setLocationSearch('?utm_source=google')
      const result = getUTMParams()
      expect(result).toEqual({
        utm_source: 'google',
        utm_campaign: undefined,
      })
    })

    it('should return empty object when window is undefined', () => {
      const originalWindow = global.window
      // @ts-expect-error - intentionally setting to undefined for test
      global.window = undefined
      const result = getUTMParams()
      expect(result).toEqual({})
      global.window = originalWindow
    })
  })

  describe('trackCTAClick', () => {
    it('should track CTA click with required fields', () => {
      trackCTAClick({ cta: 'start-now' })
      expect(track).toHaveBeenCalledWith('cta_click', {
        cta: 'start-now',
      })
    })

    it('should track CTA click with all optional fields', () => {
      trackCTAClick({
        cta: 'start-now',
        location: 'hero',
        value: 885,
        variant: 'primary',
      })
      expect(track).toHaveBeenCalledWith('cta_click', {
        cta: 'start-now',
        location: 'hero',
        value: 885,
        variant: 'primary',
      })
    })

    it('should include UTM parameters when present', () => {
      setLocationSearch('?utm_source=google&utm_campaign=test')
      trackCTAClick({ cta: 'start-now', location: 'hero' })
      expect(track).toHaveBeenCalledWith('cta_click', {
        cta: 'start-now',
        location: 'hero',
        utm_source: 'google',
        utm_campaign: 'test',
      })
    })

    it('should filter out undefined values', () => {
      trackCTAClick({ cta: 'start-now' })
      const callArgs = vi.mocked(track).mock.calls[0]
      const properties = callArgs[1] as Record<string, unknown>
      expect(properties).not.toHaveProperty('location')
      expect(properties).not.toHaveProperty('value')
      expect(properties).not.toHaveProperty('variant')
    })
  })

  describe('trackLeadStart', () => {
    it('should track lead start without options', () => {
      trackLeadStart()
      expect(track).toHaveBeenCalledWith('lead_start', {})
    })

    it('should track lead start with form name', () => {
      trackLeadStart({ form: 'contact' })
      expect(track).toHaveBeenCalledWith('lead_start', {
        form: 'contact',
      })
    })

    it('should track lead start with form and step', () => {
      trackLeadStart({ form: 'checkout', step: 'payment' })
      expect(track).toHaveBeenCalledWith('lead_start', {
        form: 'checkout',
        step: 'payment',
      })
    })

    it('should include UTM parameters', () => {
      setLocationSearch('?utm_source=facebook')
      trackLeadStart({ form: 'contact' })
      expect(track).toHaveBeenCalledWith('lead_start', {
        form: 'contact',
        utm_source: 'facebook',
      })
    })
  })

  describe('trackLeadSubmit', () => {
    it('should track lead submit without options', () => {
      trackLeadSubmit()
      expect(track).toHaveBeenCalledWith('lead_submit', {})
    })

    it('should track lead submit with form name', () => {
      trackLeadSubmit({ form: 'contact' })
      expect(track).toHaveBeenCalledWith('lead_submit', {
        form: 'contact',
      })
    })

    it('should track lead submit with value', () => {
      trackLeadSubmit({ form: 'checkout', value: 885 })
      expect(track).toHaveBeenCalledWith('lead_submit', {
        form: 'checkout',
        value: 885,
      })
    })
  })

  describe('trackCheckoutStart', () => {
    it('should track checkout start with defaults', () => {
      trackCheckoutStart()
      expect(track).toHaveBeenCalledWith('checkout_start', {
        entityType: 'PLLC',
      })
    })

    it('should track checkout start with all options', () => {
      trackCheckoutStart({
        plan: 'PLLC Formation',
        price: 885,
        entityType: 'PLLC',
      })
      expect(track).toHaveBeenCalledWith('checkout_start', {
        plan: 'PLLC Formation',
        price: 885,
        entityType: 'PLLC',
      })
    })

    it('should use LLC entity type when specified', () => {
      trackCheckoutStart({ entityType: 'LLC' })
      expect(track).toHaveBeenCalledWith('checkout_start', {
        entityType: 'LLC',
      })
    })
  })

  describe('trackPurchase', () => {
    it('should track purchase with required value', () => {
      trackPurchase({ value: 885 })
      expect(track).toHaveBeenCalledWith('purchase', {
        value: 885,
        entityType: 'PLLC',
      })
    })

    it('should track purchase with all options', () => {
      trackPurchase({
        value: 885,
        plan: 'PLLC Formation',
        entityType: 'PLLC',
      })
      expect(track).toHaveBeenCalledWith('purchase', {
        value: 885,
        plan: 'PLLC Formation',
        entityType: 'PLLC',
      })
    })

    it('should include UTM parameters', () => {
      setLocationSearch('?utm_source=google&utm_campaign=promo')
      trackPurchase({ value: 885 })
      expect(track).toHaveBeenCalledWith('purchase', {
        value: 885,
        entityType: 'PLLC',
        utm_source: 'google',
        utm_campaign: 'promo',
      })
    })
  })

  describe('trackPhoneClick', () => {
    it('should track phone click without location', () => {
      trackPhoneClick()
      expect(track).toHaveBeenCalledWith('phone_click', {})
    })

    it('should track phone click with location', () => {
      trackPhoneClick({ location: 'contact-page' })
      expect(track).toHaveBeenCalledWith('phone_click', {
        location: 'contact-page',
      })
    })
  })

  describe('trackEmailClick', () => {
    it('should track email click without location', () => {
      trackEmailClick()
      expect(track).toHaveBeenCalledWith('email_click', {})
    })

    it('should track email click with location', () => {
      trackEmailClick({ location: 'footer' })
      expect(track).toHaveBeenCalledWith('email_click', {
        location: 'footer',
      })
    })
  })
})

