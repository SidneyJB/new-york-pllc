'use client'

import { useEffect } from 'react'
import { readPartnerCodeFromSearch } from '@/lib/referral-attribution/read-partner-code-from-search'
import { setPartnerCodeCookie } from '@/lib/referral-attribution/set-partner-code-cookie'

export function PartnerReferralCapture() {
  useEffect(() => {
    const code = readPartnerCodeFromSearch(window.location.search)
    if (code) setPartnerCodeCookie(code)
  }, [])

  return null
}
