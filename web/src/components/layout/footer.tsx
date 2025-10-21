import Link from 'next/link'
import { APP_CONFIG, BUSINESS_INFO, NAVIGATION } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">NY</span>
              </div>
              <span className="font-bold text-xl text-foreground">
                {APP_CONFIG.name}
              </span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              {APP_CONFIG.description}
            </p>
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

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {BUSINESS_INFO.legalName}. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground mt-2 sm:mt-0">
              {BUSINESS_INFO.license}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
