import { escapeHtml } from '@/lib/partners/escape-html'
import type { PartnerIntakeEmailField } from '@/lib/partners/build-partner-intake-email-sections'

function renderFieldValue(field: PartnerIntakeEmailField): string {
  const safeValue = escapeHtml(field.value)

  if (!field.href) {
    return `<span style="color:#0f172a;font-size:15px;line-height:1.5;">${safeValue}</span>`
  }

  return `<a href="${escapeHtml(field.href)}" style="color:#0284c7;font-size:15px;line-height:1.5;text-decoration:none;">${safeValue}</a>`
}

export function renderPartnerIntakeEmailHtmlField(field: PartnerIntakeEmailField): string {
  return `
    <tr>
      <td style="padding:0 0 14px 0;">
        <div style="font-size:12px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:#64748b;margin:0 0 4px 0;">
          ${escapeHtml(field.label)}
        </div>
        ${renderFieldValue(field)}
      </td>
    </tr>
  `.trim()
}
