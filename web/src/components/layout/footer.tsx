import Image from 'next/image'
import Link from 'next/link'
import { APP_CONFIG, BUSINESS_INFO, NAVIGATION } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <Link href="/" className="inline-block flex-shrink-0 self-start -mt-10">
                <Image
                  src="/logo.png"
                  alt="Business Filing Solutions - New York PLLC formation"
                  width={600}
                  height={600}
                  className="h-72 w-auto mix-blend-darken"
                />
              </Link>
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Contact Information</p>
                <p>{BUSINESS_INFO.legalName}</p>
                <p>{BUSINESS_INFO.address.street}</p>
                <p>{BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state} {BUSINESS_INFO.address.zipCode}</p>
                <p className="mt-2">
                  <a href={`mailto:${APP_CONFIG.supportEmail}`} className="hover:text-foreground transition-colors">
                    {APP_CONFIG.supportEmail}
                  </a>
                </p>
                <p>
                  <a href={`tel:${APP_CONFIG.phone}`} className="hover:text-foreground transition-colors">
                    {APP_CONFIG.phone}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/order"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  New PLLC Formation ($885)
                </Link>
              </li>
              <li>
                <Link
                  href="/order-llc"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  LLC Formation
                </Link>
              </li>
              <li>
                <Link
                  href="/foreign-pllc"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Foreign PLLC Qualification
                </Link>
              </li>
              <li>
                <Link
                  href="/virtual-address-services"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Virtual Address Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {NAVIGATION.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="https://www.trustpilot.com/review/cheapnewyorkllc.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              {NAVIGATION.footer.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Description */}
        <div className="mt-8">
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            {APP_CONFIG.description}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col items-center">
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} {BUSINESS_INFO.legalName}. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              {BUSINESS_INFO.license}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
