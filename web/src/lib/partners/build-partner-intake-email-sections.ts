import { lookupPartnerOptionLabel } from '@/lib/partners/lookup-partner-option-label'
import {
  PARTNER_CLIENT_TYPES,
  PARTNER_MODELS,
  PARTNER_ORGANIZATION_TYPES,
  PARTNER_REFERRAL_VOLUME,
  PARTNER_SERVICES,
} from '@/lib/partners/partner-intake-options'
import type { PartnerIntakeData } from '@/lib/validations/partner-intake'

export type PartnerIntakeEmailField = {
  label: string
  value: string
  href?: string
}

export type PartnerIntakeEmailSection = {
  title: string
  fields: PartnerIntakeEmailField[]
}

function formatServices(services: string[]): string {
  return services
    .map((value) => lookupPartnerOptionLabel(PARTNER_SERVICES, value))
    .join(', ')
}

function formatSubmittedAt(date: Date): string {
  return date.toLocaleString('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  })
}

export function buildPartnerIntakeEmailSections(
  data: PartnerIntakeData,
  submittedAt = new Date(),
): PartnerIntakeEmailSection[] {
  const sections: PartnerIntakeEmailSection[] = [
    {
      title: 'Contact',
      fields: [
        { label: 'Name', value: data.contactName },
        { label: 'Work email', value: data.email, href: `mailto:${data.email}` },
        { label: 'Phone', value: data.phone || 'Not provided', href: data.phone ? `tel:${data.phone}` : undefined },
      ],
    },
    {
      title: 'Organization',
      fields: [
        { label: 'Company', value: data.organizationName },
        {
          label: 'Type',
          value: lookupPartnerOptionLabel(PARTNER_ORGANIZATION_TYPES, data.organizationType),
        },
        {
          label: 'Website',
          value: data.website || 'Not provided',
          href: data.website?.startsWith('http') ? data.website : undefined,
        },
        {
          label: 'Client focus',
          value: lookupPartnerOptionLabel(PARTNER_CLIENT_TYPES, data.clientTypes),
        },
      ],
    },
    {
      title: 'Partnership interest',
      fields: [
        { label: 'Services', value: formatServices(data.servicesInterested) },
        {
          label: 'Model',
          value: lookupPartnerOptionLabel(PARTNER_MODELS, data.partnershipModel),
        },
        {
          label: 'Estimated referrals',
          value: lookupPartnerOptionLabel(PARTNER_REFERRAL_VOLUME, data.estimatedReferralsPerMonth),
        },
      ],
    },
  ]

  if (data.message?.trim()) {
    sections.push({
      title: 'Message',
      fields: [{ label: 'Notes', value: data.message.trim() }],
    })
  }

  sections.push({
    title: 'Submission',
    fields: [{ label: 'Submitted', value: formatSubmittedAt(submittedAt) }],
  })

  return sections
}

export function flattenPartnerIntakeEmailSections(
  sections: PartnerIntakeEmailSection[],
): Array<[string, string]> {
  return sections.flatMap((section) =>
    section.fields.map(
      (field): [string, string] => [`${section.title} · ${field.label}`, field.value],
    ),
  )
}
