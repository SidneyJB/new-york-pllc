import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = process.env.CHECKOUT_ABANDONMENT_SECRET?.trim()
  const ingestUrl =
    process.env.CHECKOUT_ABANDONMENT_INGEST_URL?.trim() ||
    'https://billing.nypllc.com/api/public/checkout-abandonment'
  if (!secret) {
    console.error('CHECKOUT_ABANDONMENT_SECRET is not set')
    return NextResponse.json({ ok: false, skipped: 'not configured' }, { status: 503 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }

  const forwarded = await fetch(ingestUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secret}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const text = await forwarded.text()
  return new NextResponse(text, {
    status: forwarded.status,
    headers: { 'Content-Type': forwarded.headers.get('content-type') || 'application/json' },
  })
}
