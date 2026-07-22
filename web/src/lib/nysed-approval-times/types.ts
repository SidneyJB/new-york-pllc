/**
 * Public types for the NYSED approval-times page.
 * Wait times (days) only — never sample sizes or formation counts.
 */

export interface ApprovalTimesProfessionStat {
  professionLabel: string
  professionSlug: string
  medianCalendarDays: number
}

export interface ApprovalTimesMonthlyPoint {
  /** YYYY-MM */
  month: string
  medianCalendarDays: number
}

export interface ApprovalTimesPublicPayload {
  /** Date the stats were last hand-updated (YYYY-MM-DD). */
  asOf: string
  /** ISO timestamp for schema / <time>. */
  updatedAt: string
  overall: {
    medianCalendarDays: number
  }
  byProfession: ApprovalTimesProfessionStat[]
  monthlyHistory: ApprovalTimesMonthlyPoint[]
}
