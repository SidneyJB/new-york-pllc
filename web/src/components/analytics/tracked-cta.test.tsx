import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TrackedCTAButton, TrackedPhoneLink, TrackedEmailLink } from '@/components/analytics/tracked-cta'
import { trackCTAClick, trackPhoneClick, trackEmailClick } from '@/lib/analytics/track'

vi.mock('@/lib/analytics/track', () => ({
  trackCTAClick: vi.fn(),
  trackPhoneClick: vi.fn(),
  trackEmailClick: vi.fn(),
}))

describe('TrackedCTAButton', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render button with link', () => {
    render(
      <TrackedCTAButton href="/order" cta="test-cta">
        Click me
      </TrackedCTAButton>
    )
    const link = screen.getByRole('link', { name: /click me/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/order')
  })

  it('should track click when button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <TrackedCTAButton href="/order" cta="test-cta" location="hero">
        Click me
      </TrackedCTAButton>
    )
    const link = screen.getByRole('link', { name: /click me/i })
    await user.click(link)
    expect(trackCTAClick).toHaveBeenCalledWith({
      cta: 'test-cta',
      location: 'hero',
      value: 885, // PRICING.basePrice since href includes '/order'
    })
  })

  it('should include value when href includes /order', async () => {
    const user = userEvent.setup()
    render(
      <TrackedCTAButton href="/order" cta="test-cta">
        Click me
      </TrackedCTAButton>
    )
    const link = screen.getByRole('link', { name: /click me/i })
    await user.click(link)
    expect(trackCTAClick).toHaveBeenCalledWith(
      expect.objectContaining({
        value: 885,
      })
    )
  })

  it('should not include value when href does not include /order', async () => {
    const user = userEvent.setup()
    render(
      <TrackedCTAButton href="/contact" cta="test-cta">
        Click me
      </TrackedCTAButton>
    )
    const link = screen.getByRole('link', { name: /click me/i })
    await user.click(link)
    expect(trackCTAClick).toHaveBeenCalledWith({
      cta: 'test-cta',
      location: undefined,
      value: undefined,
    })
  })

  it('should pass through button props', () => {
    render(
      <TrackedCTAButton
        href="/order"
        cta="test-cta"
        variant="outline"
        size="lg"
        className="custom-class"
      >
        Click me
      </TrackedCTAButton>
    )
    const link = screen.getByRole('link', { name: /click me/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/order')
  })
})

describe('TrackedPhoneLink', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render phone link', () => {
    render(
      <TrackedPhoneLink phone="646-444-2102" location="contact">
        Call us
      </TrackedPhoneLink>
    )
    const link = screen.getByRole('link', { name: /call us/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'tel:646-444-2102')
  })

  it('should track click when phone link is clicked', async () => {
    const user = userEvent.setup()
    render(
      <TrackedPhoneLink phone="646-444-2102" location="contact">
        Call us
      </TrackedPhoneLink>
    )
    const link = screen.getByRole('link', { name: /call us/i })
    await user.click(link)
    expect(trackPhoneClick).toHaveBeenCalledWith({
      location: 'contact',
    })
  })

  it('should work without location', async () => {
    const user = userEvent.setup()
    render(<TrackedPhoneLink phone="646-444-2102">Call us</TrackedPhoneLink>)
    const link = screen.getByRole('link', { name: /call us/i })
    await user.click(link)
    expect(trackPhoneClick).toHaveBeenCalledWith({
      location: undefined,
    })
  })
})

describe('TrackedEmailLink', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render email link', () => {
    render(
      <TrackedEmailLink email="test@example.com" location="footer">
        Email us
      </TrackedEmailLink>
    )
    const link = screen.getByRole('link', { name: /email us/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'mailto:test@example.com')
  })

  it('should track click when email link is clicked', async () => {
    const user = userEvent.setup()
    render(
      <TrackedEmailLink email="test@example.com" location="footer">
        Email us
      </TrackedEmailLink>
    )
    const link = screen.getByRole('link', { name: /email us/i })
    await user.click(link)
    expect(trackEmailClick).toHaveBeenCalledWith({
      location: 'footer',
    })
  })

  it('should work without location', async () => {
    const user = userEvent.setup()
    render(<TrackedEmailLink email="test@example.com">Email us</TrackedEmailLink>)
    const link = screen.getByRole('link', { name: /email us/i })
    await user.click(link)
    expect(trackEmailClick).toHaveBeenCalledWith({
      location: undefined,
    })
  })
})

