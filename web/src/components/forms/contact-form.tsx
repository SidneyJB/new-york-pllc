'use client'

import { useFormTracking, trackFormSubmit } from '@/components/analytics/form-tracking'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? 'Sending...' : 'Send Message'}
    </Button>
  )
}

interface ContactFormProps {
  action: (formData: FormData) => Promise<void>
}

export function ContactForm({ action }: ContactFormProps) {
  const { handleFirstInput } = useFormTracking('contact')

  const handleSubmit = async (formData: FormData) => {
    trackFormSubmit('contact')
    await action(formData)
  }

  return (
    <form className="space-y-6" action={handleSubmit}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            className="mt-1"
            onInput={handleFirstInput}
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            className="mt-1"
            onInput={handleFirstInput}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email Address *</Label>
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
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className="mt-1"
          onInput={handleFirstInput}
        />
      </div>

      <div>
        <Label htmlFor="professionalType">Professional Type</Label>
        <select
          id="professionalType"
          name="professionalType"
          className="w-full mt-1 px-3 py-2 border border-input bg-background rounded-md"
          onInput={handleFirstInput}
        >
          <option value="">Select your profession</option>
          <option value="physician">Physician (MD/DO)</option>
          <option value="dentist">Dentist (DDS/DMD)</option>
          <option value="attorney">Attorney/Lawyer</option>
          <option value="cpa">Certified Public Accountant (CPA)</option>
          <option value="architect">Architect</option>
          <option value="engineer">Engineer</option>
          <option value="veterinarian">Veterinarian</option>
          <option value="optometrist">Optometrist</option>
          <option value="pharmacist">Pharmacist</option>
          <option value="other">Other Licensed Professional</option>
        </select>
      </div>

      <div>
        <Label htmlFor="subject">Subject *</Label>
        <select
          id="subject"
          name="subject"
          required
          className="w-full mt-1 px-3 py-2 border border-input bg-background rounded-md"
          onInput={handleFirstInput}
        >
          <option value="">Select inquiry type</option>
          <option value="general">General Question</option>
          <option value="pricing">Pricing Question</option>
          <option value="pllc-formation">PLLC Formation</option>
          <option value="publishing">Publishing Process</option>
          <option value="license">Professional License</option>
          <option value="technical">Technical Support</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <Label htmlFor="message">Message *</Label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full mt-1 px-3 py-2 border border-input bg-background rounded-md resize-none"
          placeholder="Please describe your question or concern in detail..."
          onInput={handleFirstInput}
        />
      </div>

      <SubmitButton />
    </form>
  )
}

