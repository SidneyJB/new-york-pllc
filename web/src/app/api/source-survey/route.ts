import { NextRequest, NextResponse } from 'next/server'

/**
 * Proxy for the post-payment source survey on /order/confirmation -> CRM ingest.
 * Uses ORDER_SOURCE_SURVEY_SECRET, falling back to the existing CHECKOUT_ABANDONMENT_SECRET
 * (same shared site -> CRM secret), so no new env var is required.
 */
const MAX_BODY_BYTES = 4000

export async function POST(request: NextRequest) {
  const secret =
    process.env.ORDER_SOURCE_SURVEY_SECRET?.trim() || process.env.CHECKOUT_ABANDONMENT_SECRET?.trim()
  const ingestUrl =
    process.env.ORDER_SOURCE_SURVEY_INGEST_URL?.trim() ||
    'https://billing.nypllc.com/api/public/order-source-survey'
  if (!secret) {
    console.error('Source survey secret is not set')
    return NextResponse.json({ ok: false, skipped: 'not configured' }, { status: 503 })
  }

  const raw = await request.text()
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'too large' }, { status: 413 })
  }
  try {
    JSON.parse(raw)
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }

  const forwarded = await fetch(ingestUrl, {
    method: 'POST',
    headers: { Authorization: `Bearer ${secret}`, 'Content-Type': 'application/json' },
    body: raw,
  })

  const text = await forwarded.text()
  return new NextResponse(text, {
    status: forwarded.status,
    headers: { 'Content-Type': forwarded.headers.get('content-type') || 'application/json' },
  })
}
