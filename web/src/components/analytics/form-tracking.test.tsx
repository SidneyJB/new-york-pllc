import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderHook, act, waitFor } from '@testing-library/react'
import {
  useFormTracking,
  trackFormSubmit,
  useCheckoutTracking,
  useSpiffyFormEngagementTracking,
  useScrollDepthTracking,
} from '@/components/analytics/form-tracking'
import { trackLeadStart, trackLeadSubmit, trackCheckoutStart, trackScrollDepth } from '@/lib/analytics/track'
import { usePathname } from 'next/navigation'

vi.mock('@/lib/analytics/track', () => ({
  trackLeadStart: vi.fn(),
  trackLeadSubmit: vi.fn(),
  trackCheckoutStart: vi.fn(),
  trackScrollDepth: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/'),
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

  it('should allow overriding plan, price, and entity type', () => {
    const spiffyForm = document.createElement('spiffy-checkout')
    document.body.appendChild(spiffyForm)

    renderHook(() => useCheckoutTracking({
      plan: 'LLC Formation',
      price: 425,
      entityType: 'LLC',
    }))

    act(() => {
      // effect runs immediately
    })

    expect(trackCheckoutStart).toHaveBeenCalledWith({
      plan: 'LLC Formation',
      price: 425,
      entityType: 'LLC',
    })
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

describe('useScrollDepthTracking', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(usePathname).mockReturnValue('/')
    
    // Mock DOM properties that are read-only
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      configurable: true,
      value: 2000,
    })
    Object.defineProperty(document.documentElement, 'scrollTop', {
      writable: true,
      configurable: true,
      value: 0,
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 500,
    })
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    })
    
    // Mock requestAnimationFrame
    global.requestAnimationFrame = vi.fn((cb) => {
      setTimeout(cb, 0)
      return 0
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should track 25% scroll depth', async () => {
    renderHook(() => useScrollDepthTracking())

    // For 25%: (scrollTop + windowHeight) / scrollHeight = 0.25
    // If scrollHeight = 2000, windowHeight = 500, then scrollTop = 0
    // scrollPercentage = (0 + 500) / 2000 = 0.25
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      configurable: true,
      value: 2000,
    })
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 500,
    })

    // Trigger scroll event
    const scrollEvent = new Event('scroll')
    window.dispatchEvent(scrollEvent)

    await waitFor(() => {
      expect(trackScrollDepth).toHaveBeenCalledWith({
        page: '/',
        depth: '25%',
        timeToDepth: expect.any(Number),
      })
    }, { timeout: 1000 })
  })

  it('should track 50% scroll depth', async () => {
    renderHook(() => useScrollDepthTracking())

    // For 50%: (scrollTop + windowHeight) / scrollHeight = 0.5
    // If scrollHeight = 2000, windowHeight = 500, then scrollTop = 500
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      configurable: true,
      value: 2000,
    })
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 500,
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 500,
    })

    const scrollEvent = new Event('scroll')
    window.dispatchEvent(scrollEvent)

    await waitFor(() => {
      expect(trackScrollDepth).toHaveBeenCalledWith({
        page: '/',
        depth: '50%',
        timeToDepth: expect.any(Number),
      })
    }, { timeout: 1000 })
  })

  it('should track 75% scroll depth', async () => {
    renderHook(() => useScrollDepthTracking())

    // For 75%: (scrollTop + windowHeight) / scrollHeight = 0.75
    // If scrollHeight = 2000, windowHeight = 500, then scrollTop = 1000
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      configurable: true,
      value: 2000,
    })
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 1000,
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 500,
    })

    const scrollEvent = new Event('scroll')
    window.dispatchEvent(scrollEvent)

    await waitFor(() => {
      expect(trackScrollDepth).toHaveBeenCalledWith({
        page: '/',
        depth: '75%',
        timeToDepth: expect.any(Number),
      })
    }, { timeout: 1000 })
  })

  it('should track 100% scroll depth', async () => {
    renderHook(() => useScrollDepthTracking())

    // For 100%: (scrollTop + windowHeight) / scrollHeight >= 1.0
    // If scrollHeight = 2000, windowHeight = 500, then scrollTop = 1500
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      configurable: true,
      value: 2000,
    })
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 1500,
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 500,
    })

    const scrollEvent = new Event('scroll')
    window.dispatchEvent(scrollEvent)

    await waitFor(() => {
      expect(trackScrollDepth).toHaveBeenCalledWith({
        page: '/',
        depth: '100%',
        timeToDepth: expect.any(Number),
      })
    }, { timeout: 1000 })
  })

  it('should track milestones in order', async () => {
    renderHook(() => useScrollDepthTracking())

    // Start at 0%
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      configurable: true,
      value: 2000,
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 500,
    })

    // Scroll to 25%
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    })
    window.dispatchEvent(new Event('scroll'))
    await waitFor(() => {
      expect(trackScrollDepth).toHaveBeenCalledWith(
        expect.objectContaining({ depth: '25%' })
      )
    }, { timeout: 1000 })

    // Scroll to 50%
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 500,
    })
    window.dispatchEvent(new Event('scroll'))
    await waitFor(() => {
      expect(trackScrollDepth).toHaveBeenCalledWith(
        expect.objectContaining({ depth: '50%' })
      )
    }, { timeout: 1000 })

    // Scroll to 75%
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 1000,
    })
    window.dispatchEvent(new Event('scroll'))
    await waitFor(() => {
      expect(trackScrollDepth).toHaveBeenCalledWith(
        expect.objectContaining({ depth: '75%' })
      )
    }, { timeout: 1000 })

    // Scroll to 100%
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 1500,
    })
    window.dispatchEvent(new Event('scroll'))
    await waitFor(() => {
      expect(trackScrollDepth).toHaveBeenCalledWith(
        expect.objectContaining({ depth: '100%' })
      )
    }, { timeout: 1000 })

    expect(trackScrollDepth).toHaveBeenCalledTimes(4)
  })

  it('should only track each milestone once', async () => {
    renderHook(() => useScrollDepthTracking())

    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      configurable: true,
      value: 2000,
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 500,
    })

    // Scroll to 25% multiple times
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    })
    window.dispatchEvent(new Event('scroll'))
    window.dispatchEvent(new Event('scroll'))
    window.dispatchEvent(new Event('scroll'))

    await waitFor(() => {
      const calls = vi.mocked(trackScrollDepth).mock.calls
      const depth25Calls = calls.filter(call => call[0].depth === '25%')
      expect(depth25Calls.length).toBe(1)
    }, { timeout: 1000 })
  })

  it('should reset tracking when pathname changes', async () => {
    const { rerender } = renderHook(() => useScrollDepthTracking())

    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      configurable: true,
      value: 2000,
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 500,
    })

    // Scroll to 25% on first page
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    })
    window.dispatchEvent(new Event('scroll'))
    await waitFor(() => {
      expect(trackScrollDepth).toHaveBeenCalledWith(
        expect.objectContaining({ page: '/', depth: '25%' })
      )
    }, { timeout: 1000 })

    // Change pathname
    vi.mocked(usePathname).mockReturnValue('/order')
    rerender()

    // Scroll to 25% again - should track again because pathname changed
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    })
    window.dispatchEvent(new Event('scroll'))
    await waitFor(() => {
      expect(trackScrollDepth).toHaveBeenCalledWith(
        expect.objectContaining({ page: '/order', depth: '25%' })
      )
    }, { timeout: 1000 })

    // Should have been called twice (once per page)
    const calls = vi.mocked(trackScrollDepth).mock.calls
    const depth25Calls = calls.filter(call => call[0].depth === '25%')
    expect(depth25Calls.length).toBe(2)
  })

  it('should use pathname from usePathname hook', async () => {
    vi.mocked(usePathname).mockReturnValue('/professions/dentist')
    renderHook(() => useScrollDepthTracking())

    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      configurable: true,
      value: 2000,
    })
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 500,
    })

    window.dispatchEvent(new Event('scroll'))

    await waitFor(() => {
      expect(trackScrollDepth).toHaveBeenCalledWith(
        expect.objectContaining({ page: '/professions/dentist' })
      )
    }, { timeout: 1000 })
  })

  it('should use "/" as default page when pathname is null', async () => {
    vi.mocked(usePathname).mockReturnValue(null as any)
    renderHook(() => useScrollDepthTracking())

    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      configurable: true,
      value: 2000,
    })
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 500,
    })

    window.dispatchEvent(new Event('scroll'))

    await waitFor(() => {
      expect(trackScrollDepth).toHaveBeenCalledWith(
        expect.objectContaining({ page: '/' })
      )
    }, { timeout: 1000 })
  })

  it('should clean up scroll listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(() => useScrollDepthTracking())

    unmount()

    // removeEventListener is called with the throttled function
    // The options object is not passed to removeEventListener
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    )

    removeEventListenerSpy.mockRestore()
  })

  it('should throttle scroll events using requestAnimationFrame', async () => {
    const rafSpy = vi.spyOn(global, 'requestAnimationFrame')
    renderHook(() => useScrollDepthTracking())

    // Dispatch multiple scroll events rapidly
    for (let i = 0; i < 10; i++) {
      window.dispatchEvent(new Event('scroll'))
    }

    // Should use requestAnimationFrame for throttling
    expect(rafSpy).toHaveBeenCalled()

    rafSpy.mockRestore()
  })
})

