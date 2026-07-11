import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { FOREIGN_QUALIFICATION_STATES } from '@/lib/constants/foreign-states'

export function ForeignStateChooser() {
  return (
    <div className="w-full max-w-3xl">
      <p className="mb-4 text-base font-medium text-foreground">Select your home state</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {FOREIGN_QUALIFICATION_STATES.map((state) => (
          <Link
            key={state.slug}
            href={`/foreign-pllc/${state.slug}`}
            className="group flex min-h-24 flex-col justify-between rounded-lg border border-border bg-background px-4 py-4 text-left transition-colors hover:border-primary/40 hover:bg-primary/5"
          >
            <span className="text-base font-semibold text-foreground">{state.state}</span>
            <span className="mt-2 flex items-center justify-between gap-2 text-sm text-muted-foreground">
              <span>From ${state.pllcPrice}</span>
              <ArrowRight className="h-4 w-4 shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
            </span>
          </Link>
        ))}
      </div>
      <p className="mt-5 text-sm text-muted-foreground">
        We foreign-qualify PLLCs from all 50 states. Don&apos;t see yours?{' '}
        <Link href="/contact" className="font-medium text-primary underline underline-offset-2 hover:text-primary/80">
          Contact us
        </Link>
        .
      </p>
    </div>
  )
}
