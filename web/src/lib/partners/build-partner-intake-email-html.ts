import type { PartnerIntakeEmailSection } from '@/lib/partners/build-partner-intake-email-sections'
import { renderPartnerIntakeEmailHtmlSection } from '@/lib/partners/render-partner-intake-email-html-section'

export function buildPartnerIntakeEmailHtml(sections: PartnerIntakeEmailSection[]): string {
  return sections.map(renderPartnerIntakeEmailHtmlSection).join('')
}
