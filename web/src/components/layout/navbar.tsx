'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { APP_CONFIG, NAVIGATION } from '@/lib/constants'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [professionsOpen, setProfessionsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false) // desktop services dropdown
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false) // mobile services accordion
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const telHref = APP_CONFIG.phone.replace(/[^+\d]/g, '')

  return (
    <>
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">NY</span>
              </div>
              <span className="font-bold text-xl text-foreground">
                {APP_CONFIG.name}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {/* Services Dropdown */}
              <DropdownMenu open={servicesOpen} onOpenChange={setServicesOpen}>
                <DropdownMenuTrigger className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1">
                  Services
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64">
                  <DropdownMenuItem asChild>
                    <Link href="/order">
                      PLLC Formation
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/order-llc">
                      LLC Formation
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/foreign-pllc">
                      Foreign Qualification (Existing Entity)
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Professions Dropdown */}
              <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1">
                  Professions
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[32rem]">
                  <div className="grid grid-cols-2">
                    {NAVIGATION.professions.map((profession, index) => (
                      <DropdownMenuItem 
                        key={profession.name} 
                        asChild 
                        className={`m-0 ${index % 2 === 0 ? 'border-r border-border/50' : ''}`}
                      >
                        <Link
                          href={profession.href}
                          className="flex flex-col items-start gap-1 w-full"
                        >
                          <span className="font-medium">{profession.shortName}</span>
                          <span className="text-xs text-muted-foreground leading-tight">
                            {profession.name.replace(`${profession.shortName} (`, '').replace(')', '')}
                          </span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </div>
                  <div className="border-t pt-2 px-3 pb-2">
                    <p className="text-xs text-muted-foreground leading-tight">
                      We serve all licensed professions in New York. The pages listed above represent a selection of the professions for which we've created dedicated resources. Additional profession-specific pages are being added regularly.{' '}
                      <Link 
                        href="/contact" 
                        className="text-primary underline underline-offset-2 hover:text-primary/80"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Don't see yours? Request it!
                      </Link>
                    </p>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                href="/about"
                className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors"
              >
                About
              </Link>
              <Link
                href="/faq"
                className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Button variant="outline" asChild>
              <a href={`tel:${telHref}`} aria-label={`Call or text ${APP_CONFIG.phone}`}>
                Call or Text: {APP_CONFIG.phone}
              </a>
            </Button>
            <Button asChild>
              <Link href="/order">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-muted-foreground"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* Services in Mobile Menu */}
              <div className="pt-1 pb-1">
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <span>Services</span>
                  {mobileServicesOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                {mobileServicesOpen && (
                  <div className="space-y-1">
                    <Link
                      href="/order"
                      className="text-muted-foreground hover:text-foreground hover:bg-muted block px-6 py-2 text-sm transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      PLLC Formation
                    </Link>
                    <Link
                      href="/order-llc"
                      className="text-muted-foreground hover:text-foreground hover:bg-muted block px-6 py-2 text-sm transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      LLC Formation
                    </Link>
                    <Link
                      href="/foreign-pllc"
                      className="text-muted-foreground hover:text-foreground hover:bg-muted block px-6 py-2 text-sm transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Foreign Qualification (Existing Entity)
                    </Link>
                  </div>
                )}
              </div>

              {/* Professions in Mobile Menu */}
              <div className="pt-1 pb-1">
                <button
                  onClick={() => setProfessionsOpen(!professionsOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <span>Professions</span>
                  {professionsOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                {professionsOpen && (
                  <>
                    <div className="space-y-1">
                      {NAVIGATION.professions.map((profession) => (
                        <Link
                          key={profession.name}
                          href={profession.href}
                          className="text-muted-foreground hover:text-foreground hover:bg-muted block px-6 py-2 text-sm transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{profession.shortName}</span>
                            <span className="text-xs text-muted-foreground">
                              {profession.name.replace(`${profession.shortName} (`, '').replace(')', '')}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="px-6 pt-2 pb-2 border-t mt-2">
                      <p className="text-xs text-muted-foreground leading-tight">
                        We serve all licensed professions in New York. The pages listed above represent a selection of the professions for which we've created dedicated resources. Additional profession-specific pages are being added regularly.{' '}
                        <Link href="/contact" className="text-primary underline underline-offset-2 hover:text-primary/80" onClick={() => setMobileMenuOpen(false)}>
                          Don't see yours? Request it!
                        </Link>
                      </p>
                    </div>
                  </>
                )}
              </div>

              <Link
                href="/foreign-pllc"
                className="text-muted-foreground hover:text-foreground hover:bg-muted block px-3 py-2 text-base font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Qualify an existing PLLC
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-foreground hover:bg-muted block px-3 py-2 text-base font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/faq"
                className="text-muted-foreground hover:text-foreground hover:bg-muted block px-3 py-2 text-base font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-foreground hover:bg-muted block px-3 py-2 text-base font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 pb-3 border-t">
                <div className="px-3 mb-2">
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <a href={`tel:${telHref}`} aria-label={`Call or text ${APP_CONFIG.phone}`}>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call or Text
                    </a>
                  </Button>
                </div>
                <div className="px-3">
                  <Button asChild className="w-full">
                    <Link href="/order" onClick={() => setMobileMenuOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
    {/* Callout Bar */}
    <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end py-1.5">
          <p className="text-xs text-primary whitespace-nowrap">
            We personally answer texts & emails 7 days/week
          </p>
        </div>
      </div>
    </div>
    </>
  )
}
