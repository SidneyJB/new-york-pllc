import type { PartnerIntakeEmailSection } from '@/lib/partners/build-partner-intake-email-sections'
import { escapeHtml } from '@/lib/partners/escape-html'
import { renderPartnerIntakeEmailHtmlField } from '@/lib/partners/render-partner-intake-email-html-field'

function renderMessageSection(section: PartnerIntakeEmailSection): string {
  const message = section.fields[0]?.value ?? ''

  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 16px 0;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;">
      <tr>
        <td style="padding:16px 18px;">
          <div style="font-size:13px;font-weight:700;color:#0f172a;margin:0 0 12px 0;padding-bottom:10px;border-bottom:1px solid #e2e8f0;">
            Message
          </div>
          <div style="background:#f8fafc;border-left:4px solid #0284c7;border-radius:8px;padding:14px 16px;font-size:15px;line-height:1.6;color:#0f172a;white-space:pre-wrap;">
            ${escapeHtml(message)}
          </div>
        </td>
      </tr>
    </table>
  `.trim()
}

export function renderPartnerIntakeEmailHtmlSection(section: PartnerIntakeEmailSection): string {
  if (section.title === 'Message') {
    return renderMessageSection(section)
  }

  const rows = section.fields.map(renderPartnerIntakeEmailHtmlField).join('')

  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 16px 0;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;">
      <tr>
        <td style="padding:16px 18px 6px 18px;">
          <div style="font-size:13px;font-weight:700;color:#0f172a;margin:0 0 12px 0;padding-bottom:10px;border-bottom:1px solid #e2e8f0;">
            ${escapeHtml(section.title)}
          </div>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            ${rows}
          </table>
        </td>
      </tr>
    </table>
  `.trim()
}
