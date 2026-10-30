import { Check } from 'lucide-react'
import { APP_CONFIG, PRICING } from '@/lib/constants'

const INSTALLMENT_COUNT = 4

const INCLUDED = [
  'NYSED professional application, including any correction letters',
  'Articles of Organization filed with the Department of State',
  'Six-week, two-newspaper publication',
  'Certificate of Publication filed',
  'Registered agent, first year included',
]

export function OrderPriceSummary() {
  const installment = (PRICING.basePrice / INSTALLMENT_COUNT).toFixed(2)

  return (
    <div className="mb-8 rounded-lg border bg-card p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Total price</p>
          <p className="mt-1 text-4xl font-bold tracking-tight text-foreground">${PRICING.basePrice}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Pay in full, or split into {INSTALLMENT_COUNT} payments of ${installment}. Same ${PRICING.basePrice}{' '}
            total either way.
          </p>
        </div>
        <ul className="space-y-1.5 text-sm sm:max-w-xs">
          {INCLUDED.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 border-t pt-4 text-xs leading-relaxed text-muted-foreground">
        Publication is included for every county except New York County (Manhattan), where newspaper rates add
        $995. Optional add-ons (S-corp election, virtual address) are checkboxes and cost nothing unless you pick
        them. Questions before you pay? Call{' '}
        <a href={`tel:${APP_CONFIG.phone}`} className="underline underline-offset-2">
          {APP_CONFIG.phone}
        </a>{' '}
        or email{' '}
        <a href={`mailto:${APP_CONFIG.supportEmail}`} className="underline underline-offset-2">
          {APP_CONFIG.supportEmail}
        </a>
        . We answer filing and process questions; legal or tax structure decisions belong with your attorney or
        accountant.
      </p>
    </div>
  )
}
