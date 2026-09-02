'use client'

import { useSearchParams } from 'next/navigation'

export function StoppedRenewalBanner() {
  const params = useSearchParams()
  const stopped = params.get('stopped')
  if (stopped === 'renewal') {
    return (
      <div className="rounded-md border border-primary/30 bg-primary/5 px-4 py-3 text-sm">
        The year-2 registered agent charge is set to stop at the end of the current period. NYPLLC
        remains your agent of record with New York until you file a Certificate of Change (self-file
        below, or pay $99 for us to file).
      </div>
    )
  }
  if (stopped === 'already') {
    return (
      <div className="rounded-md border border-primary/30 bg-primary/5 px-4 py-3 text-sm">
        This registered agent renewal was already set to stop at period end. NYPLLC remains agent of
        record until you file a Certificate of Change.
      </div>
    )
  }
  if (stopped === 'missing') {
    return (
      <div className="rounded-md border border-primary/30 bg-primary/5 px-4 py-3 text-sm">
        We could not find an active registered agent subscription to stop. If you still see a
        renewal, email contact@nypllc.com.
      </div>
    )
  }
  return null
}
