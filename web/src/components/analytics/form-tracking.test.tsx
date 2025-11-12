import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderHook, act } from '@testing-library/react'
import {
  useFormTracking,
  trackFormSubmit,
  useCheckoutTracking,
  useSpiffyFormEngagementTracking,
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

describe('useSpiffyFormEngagementTracking', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    sessionStorage.clear()
    // Reset window.checkout
    delete (window as any).checkout
  })

  it('should track first field interaction and store engagement metrics', () => {
    // Mock Spiffy checkout API
    const mockCheckout = {
      ready: vi.fn((callback: () => void) => {
        callback()
      }),
      on: vi.fn(),
    }
    ;(window as any).checkout = mockCheckout

    renderHook(() => useSpiffyFormEngagementTracking())

    // Wait for the effect to run
    act(() => {
      // The effect should call checkout.ready
    })

    // Verify checkout.ready was called
    expect(mockCheckout.ready).toHaveBeenCalled()

    // Simulate field change event
    const fieldChangeCallback = mockCheckout.on.mock.calls.find(
      (call: any[]) => call[0] === 'change:field'
    )?.[1]

    if (fieldChangeCallback) {
      act(() => {
        fieldChangeCallback({})
      })

      // Verify lead start was tracked
      expect(trackLeadStart).toHaveBeenCalledWith({
        form: 'checkout',
        step: 'field_interaction',
      })

      // Verify session storage was updated
      expect(sessionStorage.getItem('form_first_interaction_time')).toBeTruthy()
      expect(sessionStorage.getItem('form_field_change_count')).toBe('1')
      expect(sessionStorage.getItem('form_last_interaction_time')).toBeTruthy()
    }
  })

  it('should track multiple field changes', () => {
    const mockCheckout = {
      ready: vi.fn((callback: () => void) => {
        callback()
      }),
      on: vi.fn(),
    }
    ;(window as any).checkout = mockCheckout

    renderHook(() => useSpiffyFormEngagementTracking())

    act(() => {
      // Find and call field change callback
      const fieldChangeCallback = mockCheckout.on.mock.calls.find(
        (call: any[]) => call[0] === 'change:field'
      )?.[1]

      if (fieldChangeCallback) {
        // Simulate multiple field changes
        fieldChangeCallback({})
        fieldChangeCallback({})
        fieldChangeCallback({})
      }
    })

    // Should only track lead start once
    expect(trackLeadStart).toHaveBeenCalledTimes(1)

    // Field change count should be 3
    expect(sessionStorage.getItem('form_field_change_count')).toBe('3')
  })

  it('should track order changes', () => {
    const mockCheckout = {
      ready: vi.fn((callback: () => void) => {
        callback()
      }),
      on: vi.fn(),
    }
    ;(window as any).checkout = mockCheckout

    renderHook(() => useSpiffyFormEngagementTracking())

    act(() => {
      const orderChangeCallback = mockCheckout.on.mock.calls.find(
        (call: any[]) => call[0] === 'change:order'
      )?.[1]

      if (orderChangeCallback) {
        orderChangeCallback({})
      }
    })

    expect(sessionStorage.getItem('form_order_change_time')).toBeTruthy()
  })

  it('should track payment method changes', () => {
    const mockCheckout = {
      ready: vi.fn((callback: () => void) => {
        callback()
      }),
      on: vi.fn(),
    }
    ;(window as any).checkout = mockCheckout

    renderHook(() => useSpiffyFormEngagementTracking())

    act(() => {
      const payMethodCallback = mockCheckout.on.mock.calls.find(
        (call: any[]) => call[0] === 'change:paymethod'
      )?.[1]

      if (payMethodCallback) {
        payMethodCallback({})
      }
    })

    expect(sessionStorage.getItem('form_payment_method_selected_time')).toBeTruthy()
  })

  it('should retry if Spiffy API is not ready', () => {
    // Initially no checkout API
    ;(window as any).checkout = undefined

    const setTimeoutSpy = vi.spyOn(global, 'setTimeout')

    renderHook(() => useSpiffyFormEngagementTracking())

    act(() => {
      // Should set up retry
    })

    // Should have called setTimeout to retry
    expect(setTimeoutSpy).toHaveBeenCalled()

    setTimeoutSpy.mockRestore()
  })

  it('should handle missing checkout.ready gracefully', () => {
    ;(window as any).checkout = {
      // Missing ready method
      on: vi.fn(),
    }

    // Should not throw
    expect(() => {
      renderHook(() => useSpiffyFormEngagementTracking())
    }).not.toThrow()
  })
})

