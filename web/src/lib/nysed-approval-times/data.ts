import type { ApprovalTimesPublicPayload } from './types'

/**
 * Manually maintained NYSED pre-approval wait times for the marketing page.
 *
 * Refresh about once a month:
 *   cd PLLC-CRM/crm && npx tsx scripts/report-nysed-approval-times.ts --year 2026
 * Then paste the PUBLIC payload below (wait days only — never sample sizes).
 *
 * Last CRM pull: 2026-07-22 (overall median OP Submitted → OP Approved).
 */
export const NYSED_APPROVAL_TIMES: ApprovalTimesPublicPayload = {
  asOf: '2026-07-22',
  updatedAt: '2026-07-22T21:33:56.262Z',
  overall: {
    medianCalendarDays: 56,
  },
  byProfession: [
    {
      professionLabel: 'Architecture',
      professionSlug: 'architecture',
      medianCalendarDays: 54,
    },
    {
      professionLabel: 'Chiropractic',
      professionSlug: 'chiropractic',
      medianCalendarDays: 54,
    },
    {
      professionLabel: 'Dentistry',
      professionSlug: 'dentistry',
      medianCalendarDays: 57,
    },
    {
      professionLabel: 'Licensed Clinical Social Work',
      professionSlug: 'licensed-clinical-social-work',
      medianCalendarDays: 54,
    },
    {
      professionLabel: 'Medicine',
      professionSlug: 'medicine',
      medianCalendarDays: 56,
    },
    {
      professionLabel: 'Mental Health Counseling',
      professionSlug: 'mental-health-counseling',
      medianCalendarDays: 60,
    },
    {
      professionLabel: 'Nurse Practitioner',
      professionSlug: 'nurse-practitioner',
      medianCalendarDays: 54,
    },
    {
      professionLabel: 'Physical Therapy',
      professionSlug: 'physical-therapy',
      medianCalendarDays: 78,
    },
    {
      professionLabel: 'Registered Professional Nursing',
      professionSlug: 'registered-professional-nursing',
      medianCalendarDays: 67,
    },
  ],
  monthlyHistory: [
    { month: '2026-01', medianCalendarDays: 53 },
    { month: '2026-02', medianCalendarDays: 47 },
    { month: '2026-03', medianCalendarDays: 55 },
    { month: '2026-04', medianCalendarDays: 65 },
    { month: '2026-05', medianCalendarDays: 52 },
    { month: '2026-06', medianCalendarDays: 35 },
    { month: '2026-07', medianCalendarDays: 75 },
  ],
}
