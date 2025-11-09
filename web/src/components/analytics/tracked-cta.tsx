'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { trackCTAClick, trackPhoneClick, trackEmailClick } from '@/lib/analytics/track'
import { PRICING } from '@/lib/constants'

interface TrackedCTAButtonProps {
  href: string
  children: React.ReactNode
  cta: string
  location?: string
  variant?: 'default' | 'outline' | 'secondary'
  size?: 'default' | 'sm' | 'lg'
  className?: string
  asChild?: boolean
}

export function TrackedCTAButton({
  href,
  children,
  cta,
  location,
  variant = 'default',
  size = 'default',
  className,
  asChild = true,
}: TrackedCTAButtonProps) {
  const handleClick = () => {
    trackCTAClick({
      cta,
      location,
      value: href.includes('/order') ? PRICING.basePrice : undefined,
    })
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      asChild={asChild}
      onClick={handleClick}
    >
      <Link href={href}>
        {children}
      </Link>
    </Button>
  )
}

interface TrackedPhoneLinkProps {
  phone: string
  children: React.ReactNode
  location?: string
  className?: string
}

export function TrackedPhoneLink({ phone, children, location, className }: TrackedPhoneLinkProps) {
  const handleClick = () => {
    trackPhoneClick({ location })
  }

  return (
    <a
      href={`tel:${phone}`}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  )
}

interface TrackedEmailLinkProps {
  email: string
  children: React.ReactNode
  location?: string
  className?: string
}

export function TrackedEmailLink({ email, children, location, className }: TrackedEmailLinkProps) {
  const handleClick = () => {
    trackEmailClick({ location })
  }

  return (
    <a
      href={`mailto:${email}`}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  )
}

