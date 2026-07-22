import Link from 'next/link'
import type { ApprovalTimesPublicPayload } from '@/lib/nysed-approval-times/types'

function formatUpdatedStamp(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/New_York',
  })
}

function formatMonthLabel(month: string): string {
  const [year, mon] = month.split('-')
  const date = new Date(Number(year), Number(mon) - 1, 1)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })
}

interface TrackerContentProps {
  data: ApprovalTimesPublicPayload
}

function monthlyBarHeightPct(days: number, minDays: number, maxDays: number): number {
  // Zoom the axis into the observed range (not from zero) so small month-to-month
  // shifts read clearly. Keep a floor so the shortest bar is still visible.
  if (maxDays <= minDays) return 70
  const span = maxDays - minDays
  const floor = Math.max(0, minDays - span * 0.35)
  const ceiling = maxDays + span * 0.08
  const pct = ((days - floor) / (ceiling - floor)) * 100
  return Math.min(100, Math.max(18, Math.round(pct)))
}

export function TrackerContent({ data }: TrackerContentProps) {
  const updatedLabel = formatUpdatedStamp(data.updatedAt)
  const monthlyDays = data.monthlyHistory.map((p) => p.medianCalendarDays)
  const minMonthly = monthlyDays.length ? Math.min(...monthlyDays) : 0
  const maxMonthly = monthlyDays.length ? Math.max(...monthlyDays) : 1

  return (
    <div className="space-y-12">
      <section className="bg-gradient-to-br from-background via-muted/30 to-muted/50 py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              How Long Does NYSED Take to Approve a PLLC?
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              As of July 2026, the typical wait for New York PLLC pre-approval from the Office of the
              Professions is {data.overall.medianCalendarDays} days, based on real filings we handle.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Last updated <time dateTime={data.updatedAt}>{updatedLabel}</time>
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl border bg-card p-8 text-center shadow-sm">
            <p className="text-sm font-medium text-muted-foreground">Typical wait</p>
            <p className="mt-2 text-6xl font-bold text-primary tabular-nums">
              {data.overall.medianCalendarDays}
              <span className="text-2xl font-semibold text-muted-foreground ml-2">days</span>
            </p>
            <p className="mt-3 text-muted-foreground">
              From the day we send your packet to NYSED until pre-approval comes back.
            </p>
          </div>
        </div>
      </section>

      {data.monthlyHistory.length > 0 && (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight">Has the wait been changing in 2026?</h2>
            <p className="mt-2 text-muted-foreground">
              Typical wait by month so far this year.
            </p>
            <div className="mt-8 rounded-xl border bg-card p-6">
              <div className="flex items-end gap-1.5 sm:gap-2" aria-hidden="true">
                {data.monthlyHistory.map((point) => {
                  const heightPct = monthlyBarHeightPct(
                    point.medianCalendarDays,
                    minMonthly,
                    maxMonthly,
                  )
                  return (
                    <div
                      key={point.month}
                      className="flex min-w-0 flex-1 flex-col items-center gap-2"
                    >
                      <span className="text-xs font-semibold text-foreground tabular-nums">
                        {point.medianCalendarDays}
                      </span>
                      <div className="flex h-44 w-full items-end">
                        <div
                          className="w-full rounded-t bg-primary"
                          style={{ height: `${heightPct}%` }}
                          title={`${point.medianCalendarDays} days`}
                        />
                      </div>
                      <span className="w-full truncate text-center text-[10px] text-muted-foreground sm:text-xs">
                        {formatMonthLabel(point.month)}
                      </span>
                    </div>
                  )
                })}
              </div>
              <table className="mt-6 w-full text-sm sr-only">
                <caption>Typical NYSED pre-approval wait by month</caption>
                <thead>
                  <tr>
                    <th scope="col">Month</th>
                    <th scope="col">Typical days</th>
                  </tr>
                </thead>
                <tbody>
                  {data.monthlyHistory.map((point) => (
                    <tr key={point.month}>
                      <td>{formatMonthLabel(point.month)}</td>
                      <td>{point.medianCalendarDays}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {data.byProfession.length > 0 && (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight">By license type</h2>
            <p className="mt-2 text-muted-foreground">
              Your profession may move a little faster or slower than the overall figure above.
            </p>
            <div className="mt-6 overflow-hidden rounded-xl border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left font-semibold">
                      Profession
                    </th>
                    <th scope="col" className="px-4 py-3 text-right font-semibold">
                      Typical wait
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {data.byProfession.map((row) => (
                    <tr key={row.professionSlug} className="bg-card">
                      <td className="px-4 py-3 font-medium">{row.professionLabel}</td>
                      <td className="px-4 py-3 text-right tabular-nums">
                        {row.medianCalendarDays} days
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-3xl mx-auto rounded-xl border bg-muted/30 p-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
          <h2 className="text-lg font-semibold text-foreground">About these numbers</h2>
          <p>
            This is the wait after your Office of the Professions packet goes out, until NYSED sends
            pre-approval and Articles can be filed with the Department of State. For most people,
            that is the longest stretch of forming a New York PLLC.
          </p>
          <p>
            The figures come from real New York PLLC filings we handle. &quot;Typical wait&quot; means
            the middle of recent cases.
          </p>
          <p>
            Your own timeline can still differ. Incomplete packets, deficiency letters, your
            profession, and how busy NYSED is that season all affect timing. This is past experience,
            not a guarantee.
          </p>
          <p>
            Educational only. Not legal advice. For advice on your situation, talk to NYSED or a New
            York attorney.
          </p>
          <p>
            Related:{' '}
              <Link
                href="/how-long-to-form-a-pllc-in-ny"
                className="text-primary underline underline-offset-2"
              >
                how long to form a PLLC in NY
              </Link>
              {' · '}
              <Link
                href="/how-to-form-a-pllc-in-ny"
                className="text-primary underline underline-offset-2"
              >
                DIY guide
              </Link>
              {' · '}
              <Link
                href="/ny-pllc-cost"
                className="text-primary underline underline-offset-2"
              >
                PLLC cost breakdown
              </Link>
              {' · '}
              <Link href="/order" className="text-primary underline underline-offset-2">
                Start your PLLC for $885
              </Link>
            .
          </p>
        </div>
      </section>
    </div>
  )
}
