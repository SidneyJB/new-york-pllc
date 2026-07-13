import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MobileStickyCta } from './mobile-sticky-cta'

const pathnameRef = { current: '/' as string }

vi.mock('next/navigation', () => ({
  usePathname: () => pathnameRef.current,
}))

vi.mock('@/components/analytics/tracked-cta', () => ({
  TrackedCTAButton: ({
    children,
    href,
  }: {
    children: React.ReactNode
    href: string
  }) => <a href={href}>{children}</a>,
  TrackedPhoneLink: ({
    children,
    phone,
  }: {
    children: React.ReactNode
    phone: string
  }) => <a href={`tel:${phone}`}>{children}</a>,
}))

describe('MobileStickyCta', () => {
  beforeEach(() => {
    pathnameRef.current = '/'
    document.documentElement.style.removeProperty('--mobile-sticky-cta-h')
  })

  afterEach(() => {
    document.documentElement.style.removeProperty('--mobile-sticky-cta-h')
  })

  it('renders order CTA and call link on marketing pages', () => {
    render(<MobileStickyCta />)
    expect(screen.getByTestId('mobile-sticky-cta')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Start your PLLC/i })).toHaveAttribute(
      'href',
      '/order',
    )
    expect(screen.getByRole('link', { name: /Call/i })).toHaveAttribute(
      'href',
      'tel:646-444-2102',
    )
    expect(document.documentElement.style.getPropertyValue('--mobile-sticky-cta-h')).toBe(
      '72px',
    )
  })

  it('hides on checkout routes and clears height var', () => {
    pathnameRef.current = '/order'
    const { rerender } = render(<MobileStickyCta />)
    expect(screen.queryByTestId('mobile-sticky-cta')).toBeNull()
    expect(document.documentElement.style.getPropertyValue('--mobile-sticky-cta-h')).toBe('')

    pathnameRef.current = '/order/confirmation'
    rerender(<MobileStickyCta />)
    expect(screen.queryByTestId('mobile-sticky-cta')).toBeNull()

    pathnameRef.current = '/order-llc'
    rerender(<MobileStickyCta />)
    expect(screen.queryByTestId('mobile-sticky-cta')).toBeNull()
  })
})
