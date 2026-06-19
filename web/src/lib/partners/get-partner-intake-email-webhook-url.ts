export function getPartnerIntakeEmailWebhookUrl(): string | null {
  return (
    process.env.PARTNER_INTAKE_EMAIL_WEBHOOK_URL ??
    process.env.ZAPIER_EMAIL_WEBHOOK_URL ??
    null
  )
}
