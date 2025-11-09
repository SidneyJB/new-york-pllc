import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderHook, act } from '@testing-library/react'
import {
  useFormTracking,
  trackFormSubmit,
  useCheckoutTracking,
} from '@/components/analytics/form-tracking'
import { trackLeadStart, trackLeadSubmit, trackCheckoutStart } from '@/lib/analytics/track'

vi.mock('@/lib/analytics/track', () => ({
  trackLeadStart: vi.fn(),
  trackLeadSubmit: vi.fn(),
  trackCheckoutStart: vi.fn(),
}))

describe('useFormTracking', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should track lead start on first input', () => {
    const { result } = renderHook(() => useFormTracking('contact'))
    act(() => {
      result.current.handleFirstInput()
    })
    expect(trackLeadStart).toHaveBeenCalledWith({ form: 'contact' })
  })

  it('should only track once even if called multiple times', () => {
    const { result } = renderHook(() => useFormTracking('contact'))
    act(() => {
      result.current.handleFirstInput()
      result.current.handleFirstInput()
      result.current.handleFirstInput()
    })
    expect(trackLeadStart).toHaveBeenCalledTimes(1)
    expect(trackLeadStart).toHaveBeenCalledWith({ form: 'contact' })
  })

  it('should work with different form names', () => {
    const { result: result1 } = renderHook(() => useFormTracking('contact'))
    const { result: result2 } = renderHook(() => useFormTracking('checkout'))
    act(() => {
      result1.current.handleFirstInput()
      result2.current.handleFirstInput()
    })
    expect(trackLeadStart).toHaveBeenCalledTimes(2)
    expect(trackLeadStart).toHaveBeenNthCalledWith(1, { form: 'contact' })
    expect(trackLeadStart).toHaveBeenNthCalledWith(2, { form: 'checkout' })
  })
})

describe('trackFormSubmit', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should track form submission with form name', () => {
    trackFormSubmit('contact')
    expect(trackLeadSubmit).toHaveBeenCalledWith({
      form: 'contact',
      step: undefined,
      value: undefined,
    })
  })

  it('should track form submission with step', () => {
    trackFormSubmit('checkout', 'payment')
    expect(trackLeadSubmit).toHaveBeenCalledWith({
      form: 'checkout',
      step: 'payment',
      value: 885, // checkout form includes value
    })
  })

  it('should include value for checkout form', () => {
    trackFormSubmit('checkout')
    expect(trackLeadSubmit).toHaveBeenCalledWith({
      form: 'checkout',
      step: undefined,
      value: 885, // PRICING.basePrice
    })
  })

  it('should not include value for non-checkout forms', () => {
    trackFormSubmit('contact')
    expect(trackLeadSubmit).toHaveBeenCalledWith({
      form: 'contact',
      step: undefined,
      value: undefined,
    })
  })
})

describe('useCheckoutTracking', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    document.body.innerHTML = ''
  })

  it('should track checkout start when Spiffy form is present', () => {
    const spiffyForm = document.createElement('spiffy-checkout')
    document.body.appendChild(spiffyForm)

    renderHook(() => useCheckoutTracking())

    // Wait for the effect to run
    act(() => {
      // The effect runs immediately and after 1 second
    })

    // Should be called at least once (immediate check)
    expect(trackCheckoutStart).toHaveBeenCalledWith({
      plan: 'PLLC Formation',
      price: 885,
      entityType: 'PLLC',
    })
  })

  it('should not track if Spiffy form is not present', () => {
    renderHook(() => useCheckoutTracking())

    act(() => {
      // The effect runs but no form is found
    })

    // Should still be called (checks immediately and after delay)
    // But with the form not found, it won't track
    // Actually, looking at the implementation, it checks immediately and after 1s
    // So it will be called if form exists, but we need to wait for the timeout
    // Let's check that it doesn't track when form doesn't exist
    expect(trackCheckoutStart).not.toHaveBeenCalled()
  })

  it('should clean up timeout on unmount', () => {
    const { unmount } = renderHook(() => useCheckoutTracking())
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')
    unmount()
    expect(clearTimeoutSpy).toHaveBeenCalled()
  })
})

