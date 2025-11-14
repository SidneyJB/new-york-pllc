import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { ScrollTracking } from './scroll-tracking'
import { useScrollDepthTracking } from './form-tracking'

vi.mock('./form-tracking', () => ({
  useScrollDepthTracking: vi.fn(),
}))

describe('ScrollTracking', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call useScrollDepthTracking hook', () => {
    render(<ScrollTracking />)
    expect(useScrollDepthTracking).toHaveBeenCalledTimes(1)
  })

  it('should render nothing (null)', () => {
    const { container } = render(<ScrollTracking />)
    expect(container.firstChild).toBeNull()
  })

  it('should work when rendered multiple times', () => {
    const { rerender } = render(<ScrollTracking />)
    expect(useScrollDepthTracking).toHaveBeenCalledTimes(1)

    rerender(<ScrollTracking />)
    expect(useScrollDepthTracking).toHaveBeenCalledTimes(2)
  })
})

