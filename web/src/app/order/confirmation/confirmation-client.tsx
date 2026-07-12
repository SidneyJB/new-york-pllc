'use client'

import { useEffect } from 'react'
import { readSpiffyThankYouEmail } from '@/lib/analytics/enhanced-conversions'
import { trackGoogleAdsPurchase, waitForGtag } from '@/lib/analytics/google-ads'
import {
  buildSafePurchaseMetadata,
  parseSpiffyOrderId,
  resolvePurchaseAmountDollars,
} from '@/lib/analytics/spiffy-confirmation'
import { trackPurchase } from '@/lib/analytics/track'
import { PRICING } from '@/lib/constants'
import * as fbq from '@/lib/fbpixel'

interface OrderConfirmationClientProps {
  amount?: number
  plan?: string
  entityType?: 'PLLC' | 'LLC'
  fbContentId?: string
}

export function OrderConfirmationClient({
  amount,
  plan = 'PLLC Formation',
  entityType = 'PLLC',
  fbContentId = 'pllc-formation',
}: OrderConfirmationClientProps) {
  useEffect(() => {
    void (async () => {
      // Calculate time spent on order form
      const checkoutStartTime = sessionStorage.getItem('checkout_start_time')
      let timeSpentSeconds: number | undefined

      if (checkoutStartTime) {
        const startTime = parseInt(checkoutStartTime, 10)
        const endTime = Date.now()
        timeSpentSeconds = Math.round((endTime - startTime) / 1000) // Convert to seconds

        // Clean up session storage
        sessionStorage.removeItem('checkout_start_time')
      }

      // Calculate engagement metrics from Spiffy API tracking
      const firstInteractionTime = sessionStorage.getItem('form_first_interaction_time')
      const lastInteractionTime = sessionStorage.getItem('form_last_interaction_time')

      let engagementTimeSeconds: number | undefined
      if (firstInteractionTime && lastInteractionTime) {
        const engagementStart = parseInt(firstInteractionTime, 10)
        const engagementEnd = parseInt(lastInteractionTime, 10)
        engagementTimeSeconds = Math.round((engagementEnd - engagementStart) / 1000)
      }

      const urlParams = new URLSearchParams(window.location.search)
      const orderId = parseSpiffyOrderId(urlParams)
      const purchaseAmount = resolvePurchaseAmountDollars(
        urlParams,
        amount ?? PRICING.basePrice,
      )
      const thankYouEmail = readSpiffyThankYouEmail(urlParams)

      // Allowlisted Spiffy params only (never SSN/DOB/email/address)
      const metadata = buildSafePurchaseMetadata(urlParams)

      // Clear engagement keys now that values are captured (don't wait on lazy tags)
      sessionStorage.removeItem('form_first_interaction_time')
      sessionStorage.removeItem('form_last_interaction_time')
      sessionStorage.removeItem('form_field_change_count')
      sessionStorage.removeItem('form_order_change_time')
      sessionStorage.removeItem('form_payment_method_selected_time')

      // Track purchase on confirmation page load with engagement metrics
      trackPurchase({
        value: purchaseAmount,
        plan,
        entityType,
        timeSpentSeconds,
        orderId,
        engagementTimeSeconds,
        metadata,
      })

      // Track Facebook Pixel Purchase (pixel may still be lazy-loading; don't block other trackers)
      void fbq.waitForFbq().then((ready) => {
        if (!ready) return
        fbq.event('Purchase', {
          value: purchaseAmount,
          currency: 'USD',
          content_ids: [fbContentId],
          content_type: 'product',
        })
      })

      // GA4 + Google Ads purchase (merged gtag may still be lazy-loading)
      if (await waitForGtag()) {
        window.gtag?.('event', 'purchase', {
          transaction_id: orderId,
          value: purchaseAmount,
          currency: 'USD',
          items: [
            {
              item_id: fbContentId,
              item_name: plan,
              price: purchaseAmount,
              quantity: 1,
            },
          ],
        })
      }

      await trackGoogleAdsPurchase({
        value: purchaseAmount,
        transactionId: orderId,
        email: thankYouEmail,
      })
    })()
  }, [amount, plan, entityType, fbContentId])

  return null
}
