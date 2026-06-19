'use client'

import { useFormTracking, trackFormSubmit } from '@/components/analytics/form-tracking'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'
import {
  PARTNER_CLIENT_TYPES,
  PARTNER_MODELS,
  PARTNER_ORGANIZATION_TYPES,
  PARTNER_REFERRAL_VOLUME,
  PARTNER_SERVICES,
} from '@/lib/partners/partner-intake-options'

const selectClassName =
  'w-full mt-1 px-3 py-2 border border-input bg-background rounded-md text-sm'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? 'Submitting...' : 'Apply to Partner Program'}
    </Button>
  )
}

interface PartnerIntakeFormProps {
  action: (formData: FormData) => Promise<void>
}

export function PartnerIntakeForm({ action }: PartnerIntakeFormProps) {
  const { handleFirstInput } = useFormTracking('partner-intake')

  const handleSubmit = async (formData: FormData) => {
    trackFormSubmit('partner-intake')
    await action(formData)
  }

  return (
    <form className="space-y-5" action={handleSubmit}>
      <div>
        <Label htmlFor="contactName">Your name *</Label>
        <Input
          id="contactName"
          name="contactName"
          type="text"
          autoComplete="name"
          required
          className="mt-1"
          onInput={handleFirstInput}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="email">Work email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-1"
            onInput={handleFirstInput}
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="mt-1"
            onInput={handleFirstInput}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="organizationName">Organization name *</Label>
        <Input
          id="organizationName"
          name="organizationName"
          type="text"
          autoComplete="organization"
          required
          className="mt-1"
          onInput={handleFirstInput}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="organizationType">Organization type *</Label>
          <select
            id="organizationType"
            name="organizationType"
            required
            className={selectClassName}
            defaultValue=""
            onInput={handleFirstInput}
          >
            <option value="" disabled>
              Select type
            </option>
            {PARTNER_ORGANIZATION_TYPES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            name="website"
            type="url"
            placeholder="https://"
            className="mt-1"
            onInput={handleFirstInput}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="clientTypes">Primary client types you serve *</Label>
        <select
          id="clientTypes"
          name="clientTypes"
          required
          className={selectClassName}
          defaultValue=""
          onInput={handleFirstInput}
        >
          <option value="" disabled>
            Select client focus
          </option>
          {PARTNER_CLIENT_TYPES.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className="text-sm font-medium leading-none">Services you want to refer *</legend>
        <div className="mt-3 space-y-2">
          {PARTNER_SERVICES.map((item) => (
            <label key={item.value} className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                name="servicesInterested"
                value={item.value}
                className="mt-1"
                onChange={handleFirstInput}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="partnershipModel">Partnership model *</Label>
          <select
            id="partnershipModel"
            name="partnershipModel"
            required
            className={selectClassName}
            defaultValue=""
            onInput={handleFirstInput}
          >
            <option value="" disabled>
              Select model
            </option>
            {PARTNER_MODELS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="estimatedReferralsPerMonth">Estimated referrals *</Label>
          <select
            id="estimatedReferralsPerMonth"
            name="estimatedReferralsPerMonth"
            required
            className={selectClassName}
            defaultValue=""
            onInput={handleFirstInput}
          >
            <option value="" disabled>
              Select volume
            </option>
            {PARTNER_REFERRAL_VOLUME.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="message">Anything else? (optional)</Label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="w-full mt-1 px-3 py-2 border border-input bg-background rounded-md resize-none text-sm"
          placeholder="Typical client scenario, current workflow, or questions..."
          onInput={handleFirstInput}
        />
      </div>

      <SubmitButton />
    </form>
  )
}
