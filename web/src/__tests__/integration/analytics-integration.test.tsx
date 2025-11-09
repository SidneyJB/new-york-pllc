import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { trackCTAClick, trackPhoneClick, trackEmailClick, trackPurchase, trackCheckoutStart, trackLeadStart, trackLeadSubmit } from '@/lib/analytics/track'
import { HeroSection } from '@/components/sections/hero-section'
import { CTASection } from '@/components/sections/cta-section'
import ContactPage from '@/app/contact/page'
import OrderPage from '@/app/order/page'
import OrderConfirmationPage from '@/app/order/confirmation/page'
import { ContactForm } from '@/components/forms/contact-form'
import { OrderPageClient } from '@/app/order/order-client'
import { OrderConfirmationClient } from '@/app/order/confirmation/confirmation-client'

vi.mock('@/lib/analytics/track', () => ({
  trackCTAClick: vi.fn(),
  trackPhoneClick: vi.fn(),
  trackEmailClick: vi.fn(),
  trackPurchase: vi.fn(),
  trackCheckoutStart: vi.fn(),
  trackLeadStart: vi.fn(),
  trackLeadSubmit: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}))

describe('Analytics Integration Tests - All Pages', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Home Page - HeroSection', () => {
    it('should render all tracked CTA buttons', () => {
      render(<HeroSection />)
      
      // Main CTA button
      const mainCTA = screen.getByRole('link', { name: /start your pllc/i })
      expect(mainCTA).toBeInTheDocument()
      
      // Sidebar CTA button
      const sidebarCTA = screen.getByRole('link', { name: /begin your order/i })
      expect(sidebarCTA).toBeInTheDocument()
    })

    it('should track main CTA click with correct properties', async () => {
      const user = userEvent.setup()
      render(<HeroSection />)
      
      const mainCTA = screen.getByRole('link', { name: /start your pllc/i })
      await user.click(mainCTA)
      
      expect(trackCTAClick).toHaveBeenCalledWith({
        cta: 'start-now',
        location: 'hero',
        value: 885,
      })
    })

    it('should track sidebar CTA click with correct properties', async () => {
      const user = userEvent.setup()
      render(<HeroSection />)
      
      const sidebarCTA = screen.getByRole('link', { name: /begin your order/i })
      await user.click(sidebarCTA)
      
      expect(trackCTAClick).toHaveBeenCalledWith({
        cta: 'begin-order-secondary',
        location: 'hero-sidebar',
        value: 885,
      })
    })

    it('should track both CTAs independently', async () => {
      const user = userEvent.setup()
      render(<HeroSection />)
      
      const mainCTA = screen.getByRole('link', { name: /start your pllc/i })
      const sidebarCTA = screen.getByRole('link', { name: /begin your order/i })
      
      await user.click(mainCTA)
      await user.click(sidebarCTA)
      
      expect(trackCTAClick).toHaveBeenCalledTimes(2)
      expect(trackCTAClick).toHaveBeenNthCalledWith(1, {
        cta: 'start-now',
        location: 'hero',
        value: 885,
      })
      expect(trackCTAClick).toHaveBeenNthCalledWith(2, {
        cta: 'begin-order-secondary',
        location: 'hero-sidebar',
        value: 885,
      })
    })
  })

  describe('Home Page - CTASection', () => {
    it('should render tracked CTA button', () => {
      render(<CTASection />)
      
      const cta = screen.getByRole('link', { name: /start your pllc today/i })
      expect(cta).toBeInTheDocument()
    })

    it('should track CTA click with correct properties', async () => {
      const user = userEvent.setup()
      render(<CTASection />)
      
      const cta = screen.getByRole('link', { name: /start your pllc today/i })
      await user.click(cta)
      
      expect(trackCTAClick).toHaveBeenCalledWith({
        cta: 'start-pllc-today',
        location: 'cta-section',
        value: 885,
      })
    })
  })

  describe('Contact Page', () => {
    const mockAction = vi.fn()

    it('should render all tracked elements', () => {
      render(<ContactPage searchParams={{}} />)
      
      // Email link
      const emailLink = screen.getByRole('link', { name: /contact@newyorkpllc\.com/i })
      expect(emailLink).toBeInTheDocument()
      
      // Phone links (there are multiple)
      const phoneLinks = screen.getAllByRole('link', { name: /646-444-2102/i })
      expect(phoneLinks.length).toBeGreaterThanOrEqual(1)
      
      // CTA button
      const ctaButton = screen.getByRole('link', { name: /start formation/i })
      expect(ctaButton).toBeInTheDocument()
      
      // Contact form
      const form = screen.getByRole('textbox', { name: /first name/i })
      expect(form).toBeInTheDocument()
    })

    it('should track email link click', async () => {
      const user = userEvent.setup()
      render(<ContactPage searchParams={{}} />)
      
      const emailLink = screen.getByRole('link', { name: /contact@newyorkpllc\.com/i })
      await user.click(emailLink)
      
      expect(trackEmailClick).toHaveBeenCalledWith({
        location: 'contact-page',
      })
    })

    it('should track phone link click', async () => {
      const user = userEvent.setup()
      render(<ContactPage searchParams={{}} />)
      
      const phoneLinks = screen.getAllByRole('link', { name: /646-444-2102/i })
      // Click the first phone link (in contact info section)
      await user.click(phoneLinks[0])
      
      expect(trackPhoneClick).toHaveBeenCalledWith({
        location: 'contact-page',
      })
    })

    it('should track CTA button click', async () => {
      const user = userEvent.setup()
      render(<ContactPage searchParams={{}} />)
      
      const ctaButton = screen.getByRole('link', { name: /start formation/i })
      await user.click(ctaButton)
      
      expect(trackCTAClick).toHaveBeenCalledWith({
        cta: 'start-formation-contact',
        location: 'contact-cta',
        value: 885,
      })
    })

    it('should track phone link in CTA section', async () => {
      const user = userEvent.setup()
      render(<ContactPage searchParams={{}} />)
      
      const phoneLinks = screen.getAllByRole('link', { name: /call: 646-444-2102/i })
      if (phoneLinks.length > 0) {
        await user.click(phoneLinks[0])
        expect(trackPhoneClick).toHaveBeenCalledWith({
          location: 'contact-cta',
        })
      }
    })

    it('should track form first input (lead_start)', async () => {
      const user = userEvent.setup()
      render(<ContactForm action={mockAction} />)
      
      const firstNameInput = screen.getByRole('textbox', { name: /first name/i })
      await user.type(firstNameInput, 'John')
      
      expect(trackLeadStart).toHaveBeenCalledTimes(1)
      expect(trackLeadStart).toHaveBeenCalledWith({
        form: 'contact',
      })
    })

    it('should only track lead_start once per form', async () => {
      const user = userEvent.setup()
      render(<ContactForm action={mockAction} />)
      
      const firstNameInput = screen.getByRole('textbox', { name: /first name/i })
      const lastNameInput = screen.getByRole('textbox', { name: /last name/i })
      
      await user.type(firstNameInput, 'John')
      await user.type(lastNameInput, 'Doe')
      
      expect(trackLeadStart).toHaveBeenCalledTimes(1)
    })

    it('should track form submission (lead_submit)', async () => {
      const user = userEvent.setup()
      render(<ContactForm action={mockAction} />)
      
      // Fill required fields
      await user.type(screen.getByRole('textbox', { name: /first name/i }), 'John')
      await user.type(screen.getByRole('textbox', { name: /last name/i }), 'Doe')
      await user.type(screen.getByRole('textbox', { name: /email address/i }), 'john@example.com')
      await user.selectOptions(screen.getByRole('combobox', { name: /subject/i }), 'general')
      await user.type(screen.getByRole('textbox', { name: /message/i }), 'Test message')
      
      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)
      
      expect(trackLeadSubmit).toHaveBeenCalledWith({
        form: 'contact',
        step: undefined,
        value: undefined,
      })
    })
  })

  describe('Order Page', () => {
    it('should render OrderPageClient component', () => {
      render(<OrderPage />)
      // Component renders null but hook should execute
      expect(true).toBe(true)
    })

    it('should track checkout start when Spiffy form is present', async () => {
      // Create Spiffy form element
      const spiffyForm = document.createElement('spiffy-checkout')
      document.body.appendChild(spiffyForm)
      
      render(<OrderPageClient />)
      
      // Wait for the effect to run (checks immediately and after 1s)
      await waitFor(() => {
        expect(trackCheckoutStart).toHaveBeenCalled()
      }, { timeout: 2000 })
      
      expect(trackCheckoutStart).toHaveBeenCalledWith({
        plan: 'PLLC Formation',
        price: 885,
        entityType: 'PLLC',
      })
      
      document.body.removeChild(spiffyForm)
    })

    it('should not track checkout start when Spiffy form is not present', async () => {
      render(<OrderPageClient />)
      
      // Wait a bit to ensure no tracking happens
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      expect(trackCheckoutStart).not.toHaveBeenCalled()
    })
  })

  describe('Order Confirmation Page', () => {
    it('should track purchase on page load', async () => {
      render(<OrderConfirmationClient amount={885} />)
      
      await waitFor(() => {
        expect(trackPurchase).toHaveBeenCalled()
      })
      
      expect(trackPurchase).toHaveBeenCalledWith({
        value: 885,
        plan: 'PLLC Formation',
        entityType: 'PLLC',
      })
    })

    it('should track purchase with custom amount', async () => {
      render(<OrderConfirmationClient amount={1000} />)
      
      await waitFor(() => {
        expect(trackPurchase).toHaveBeenCalled()
      })
      
      expect(trackPurchase).toHaveBeenCalledWith({
        value: 1000,
        plan: 'PLLC Formation',
        entityType: 'PLLC',
      })
    })

    it('should track purchase only once', async () => {
      const { rerender } = render(<OrderConfirmationClient amount={885} />)
      
      await waitFor(() => {
        expect(trackPurchase).toHaveBeenCalledTimes(1)
      })
      
      rerender(<OrderConfirmationClient amount={885} />)
      
      // Should still be called only once (useEffect dependency)
      await new Promise(resolve => setTimeout(resolve, 100))
      expect(trackPurchase).toHaveBeenCalledTimes(1)
    })
  })

  describe('Complete User Journey', () => {
    it('should track complete funnel: CTA click -> form start -> form submit -> checkout -> purchase', async () => {
      const user = userEvent.setup()
      const mockAction = vi.fn()
      
      // Step 1: Click CTA on home page
      render(<HeroSection />)
      const cta = screen.getByRole('link', { name: /start your pllc/i })
      await user.click(cta)
      expect(trackCTAClick).toHaveBeenCalledWith({
        cta: 'start-now',
        location: 'hero',
        value: 885,
      })
      
      // Step 2: Fill contact form (simulating order page form)
      vi.clearAllMocks()
      render(<ContactForm action={mockAction} />)
      const firstNameInput = screen.getByRole('textbox', { name: /first name/i })
      await user.type(firstNameInput, 'John')
      expect(trackLeadStart).toHaveBeenCalledWith({ form: 'contact' })
      
      // Step 3: Submit form
      await user.type(screen.getByRole('textbox', { name: /last name/i }), 'Doe')
      await user.type(screen.getByRole('textbox', { name: /email address/i }), 'john@example.com')
      await user.selectOptions(screen.getByRole('combobox', { name: /subject/i }), 'general')
      await user.type(screen.getByRole('textbox', { name: /message/i }), 'Test')
      await user.click(screen.getByRole('button', { name: /send message/i }))
      expect(trackLeadSubmit).toHaveBeenCalledWith({
        form: 'contact',
        step: undefined,
        value: undefined,
      })
      
      // Step 4: Checkout start
      vi.clearAllMocks()
      const spiffyForm = document.createElement('spiffy-checkout')
      document.body.appendChild(spiffyForm)
      render(<OrderPageClient />)
      await waitFor(() => {
        expect(trackCheckoutStart).toHaveBeenCalled()
      })
      
      // Step 5: Purchase
      vi.clearAllMocks()
      render(<OrderConfirmationClient amount={885} />)
      await waitFor(() => {
        expect(trackPurchase).toHaveBeenCalled()
      })
      
      document.body.removeChild(spiffyForm)
    })
  })

  describe('All Instances Verification', () => {
    it('should verify all CTA buttons on home page are tracked', async () => {
      const user = userEvent.setup()
      
      // Render full home page sections
      render(
        <>
          <HeroSection />
          <CTASection />
        </>
      )
      
      // Find all CTA links
      const allCTAs = screen.getAllByRole('link', { name: /start|begin|pllc/i })
      expect(allCTAs.length).toBeGreaterThanOrEqual(3)
      
      // Click each CTA
      for (const cta of allCTAs) {
        await user.click(cta)
      }
      
      // Verify all were tracked
      expect(trackCTAClick).toHaveBeenCalledTimes(allCTAs.length)
    })

    it('should verify all contact page tracked elements', async () => {
      const user = userEvent.setup()
      render(<ContactPage searchParams={{}} />)
      
      // Track email click
      const emailLink = screen.getByRole('link', { name: /contact@newyorkpllc\.com/i })
      await user.click(emailLink)
      expect(trackEmailClick).toHaveBeenCalled()
      
      // Track phone click
      vi.clearAllMocks()
      const phoneLinks = screen.getAllByRole('link', { name: /646-444-2102/i })
      await user.click(phoneLinks[0])
      expect(trackPhoneClick).toHaveBeenCalled()
      
      // Track CTA button
      vi.clearAllMocks()
      const ctaButton = screen.getByRole('link', { name: /start formation/i })
      await user.click(ctaButton)
      expect(trackCTAClick).toHaveBeenCalled()
    })
  })
})

