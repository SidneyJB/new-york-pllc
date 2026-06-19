import { wrapEmailHtml } from '@/lib/email/wrap-email-html'
import { buildPartnerIntakeEmail } from '@/lib/partners/build-partner-intake-email'
import { getPartnerIntakeEmailWebhookUrl } from '@/lib/partners/get-partner-intake-email-webhook-url'
import type { PartnerIntakeData } from '@/lib/validations/partner-intake'

export async function postPartnerIntakeEmail(data: PartnerIntakeData): Promise<boolean> {
  const webhookUrl = getPartnerIntakeEmailWebhookUrl()
  if (!webhookUrl) {
    console.error('Partner intake email webhook URL is not configured')
    return false
  }

  const email = buildPartnerIntakeEmail(data)
  const htmlContent = wrapEmailHtml(email.html)

  const payload = {
    to: email.to,
    from: email.from,
    subject: email.subject,
    text: email.text,
    html: htmlContent,
    body: htmlContent,
    attachmentUrl: null,
    attachmentFilename: null,
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  return response.ok
}
