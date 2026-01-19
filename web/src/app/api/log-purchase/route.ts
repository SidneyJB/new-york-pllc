import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { url, userAgent } = data

    // This will appear in Vercel's "Logs" tab in the dashboard
    console.log('--- PURCHASE AUDIT LOG ---')
    printLog('TIMESTAMP', new Date().toISOString())
    printLog('FULL_URL', url)
    printLog('USER_AGENT', userAgent)
    console.log('--------------------------')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Audit log error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

function printLog(label: string, value: string) {
  // Using fixed labels to make searching in Vercel logs easier
  console.log(`[AUDIT] ${label}: ${value}`)
}
