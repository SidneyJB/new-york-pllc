import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import { ScrollTracking } from './scroll-tracking'
import { useScrollDepthTracking } from './form-tracking'

vi.mock('./form-tracking', () => ({
  useScrollDepthTracking: vi.fn(),
}))

describe('ScrollTracking', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubGlobal('requestIdleCallback', (cb: IdleRequestCallback) => {
      cb({ didTimeout: false, timeRemaining: () => 50 } as IdleDeadline)
      return 1
    })
    vi.stubGlobal('cancelIdleCallback', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should call useScrollDepthTracking hook after idle', async () => {
    render(<ScrollTracking />)
    await waitFor(() => {
      expect(useScrollDepthTracking).toHaveBeenCalledTimes(1)
    })
  })

  it('should render nothing (null)', async () => {
    const { container } = render(<ScrollTracking />)
    await waitFor(() => {
      expect(useScrollDepthTracking).toHaveBeenCalled()
    })
    expect(container.firstChild).toBeNull()
  })

  it('should work when rendered multiple times', async () => {
    const { rerender } = render(<ScrollTracking />)
    await waitFor(() => {
      expect(useScrollDepthTracking).toHaveBeenCalledTimes(1)
    })

    rerender(<ScrollTracking />)
    await waitFor(() => {
      expect(useScrollDepthTracking).toHaveBeenCalledTimes(2)
    })
  })
})
