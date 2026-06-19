import { z } from 'zod'
import {
  PARTNER_CLIENT_TYPES,
  PARTNER_MODELS,
  PARTNER_ORGANIZATION_TYPES,
  PARTNER_REFERRAL_VOLUME,
  PARTNER_SERVICES,
} from '@/lib/partners/partner-intake-options'

const organizationTypeValues = PARTNER_ORGANIZATION_TYPES.map((item) => item.value)
const clientTypeValues = PARTNER_CLIENT_TYPES.map((item) => item.value)
const serviceValues = PARTNER_SERVICES.map((item) => item.value)
const modelValues = PARTNER_MODELS.map((item) => item.value)
const volumeValues = PARTNER_REFERRAL_VOLUME.map((item) => item.value)

export const partnerIntakeSchema = z.object({
  contactName: z.string().trim().min(2, 'Name is required').max(120),
  email: z.string().trim().email('Enter a valid work email'),
  phone: z.string().trim().max(30).optional(),
  organizationName: z.string().trim().min(2, 'Organization name is required').max(160),
  organizationType: z.enum(organizationTypeValues as [string, ...string[]]),
  website: z.string().trim().max(200).optional(),
  clientTypes: z.enum(clientTypeValues as [string, ...string[]]),
  servicesInterested: z
    .array(z.enum(serviceValues as [string, ...string[]]))
    .min(1, 'Select at least one service'),
  partnershipModel: z.enum(modelValues as [string, ...string[]]),
  estimatedReferralsPerMonth: z.enum(volumeValues as [string, ...string[]]),
  message: z.string().trim().max(1000).optional(),
})

export type PartnerIntakeData = z.infer<typeof partnerIntakeSchema>

export function parsePartnerIntakeFormData(formData: FormData): PartnerIntakeData {
  return partnerIntakeSchema.parse({
    contactName: formData.get('contactName')?.toString() ?? '',
    email: formData.get('email')?.toString() ?? '',
    phone: formData.get('phone')?.toString() || undefined,
    organizationName: formData.get('organizationName')?.toString() ?? '',
    organizationType: formData.get('organizationType')?.toString() ?? '',
    website: formData.get('website')?.toString() || undefined,
    clientTypes: formData.get('clientTypes')?.toString() ?? '',
    servicesInterested: formData.getAll('servicesInterested').map(String),
    partnershipModel: formData.get('partnershipModel')?.toString() ?? '',
    estimatedReferralsPerMonth: formData.get('estimatedReferralsPerMonth')?.toString() ?? '',
    message: formData.get('message')?.toString() || undefined,
  })
}
