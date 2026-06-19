import { APP_CONFIG } from '@/lib/constants'
import {
  buildPartnerIntakeEmailSections,
  flattenPartnerIntakeEmailSections,
} from '@/lib/partners/build-partner-intake-email-sections'
import { buildPartnerIntakeEmailHtml } from '@/lib/partners/build-partner-intake-email-html'
import type { PartnerIntakeData } from '@/lib/validations/partner-intake'

const PARTNER_INTAKE_TO = 'contact@nypllc.com'

export function buildPartnerIntakeEmail(data: PartnerIntakeData) {
  const sections = buildPartnerIntakeEmailSections(data, new Date())

  const text = [
    `Partner program application: ${data.organizationName}`,
    '',
    ...flattenPartnerIntakeEmailSections(sections).map(([label, value]) => `${label}: ${value}`),
  ].join('\n')

  return {
    to: PARTNER_INTAKE_TO,
    from: APP_CONFIG.supportEmail,
    subject: `Partner application: ${data.organizationName}`,
    text,
    html: buildPartnerIntakeEmailHtml(sections),
  }
}
