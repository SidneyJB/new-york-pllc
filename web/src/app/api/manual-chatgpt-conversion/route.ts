import { NextResponse } from 'next/server'
import { track } from '@vercel/analytics/server'

// Temporary API route to manually send a ChatGPT-attributed purchase conversion
// Usage (production):
//   https://www.nypllc.com/api/manual-chatgpt-conversion
//
// This will send a single `purchase` event to Vercel Analytics with:
// - value: 885
// - plan: 'PLLC Formation'
// - entityType: 'PLLC'
// - order_id: 'manual-chatgpt-1'
// - utm_source: 'chatgpt'
// - utm_campaign: 'referral'
//
// IMPORTANT: After you see the event in Vercel Analytics, delete this file.
export async function GET() {
  // Keep total keys ≤ 8 (Vercel Analytics limit)
  await track('purchase', {
    value: 885,
    plan: 'PLLC Formation',
    entityType: 'PLLC',
    order_id: 'manual-chatgpt-1',
    utm_source: 'chatgpt',
    utm_campaign: 'referral',
  })

  return NextResponse.json({ ok: true })
}


