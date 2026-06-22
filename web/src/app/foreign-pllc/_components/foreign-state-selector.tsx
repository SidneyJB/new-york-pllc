'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FOREIGN_QUALIFICATION_STATES } from '@/lib/constants/foreign-states'

type ForeignStateSelectorProps = {
  currentSlug?: string
}

export function ForeignStateSelector({ currentSlug }: ForeignStateSelectorProps) {
  const [open, setOpen] = useState(false)
  const current = FOREIGN_QUALIFICATION_STATES.find((state) => state.slug === currentSlug)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
        {current ? `${current.state} to New York` : 'Select home state'}
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-72">
        {FOREIGN_QUALIFICATION_STATES.map((state) => (
          <DropdownMenuItem key={state.slug} asChild className="m-0">
            <Link
              href={`/foreign-pllc/${state.slug}`}
              className="flex w-full flex-col items-start gap-1"
              onClick={() => setOpen(false)}
            >
              <span className="font-medium">{state.state}</span>
              <span className="text-xs text-muted-foreground leading-tight">
                From ${state.pllcPrice} PLLC · ${state.pcPrice} PC
              </span>
            </Link>
          </DropdownMenuItem>
        ))}
        <div className="border-t pt-2 px-3 pb-2">
          <p className="text-xs text-muted-foreground leading-tight">
            We handle foreign qualification from all states. The pages listed above are a selection of home states with
            dedicated resources, with more coming soon.{' '}
            <Link
              href="/contact"
              className="text-primary underline underline-offset-2 hover:text-primary/80"
              onClick={() => setOpen(false)}
            >
              Don&apos;t see yours? Contact us.
            </Link>
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
