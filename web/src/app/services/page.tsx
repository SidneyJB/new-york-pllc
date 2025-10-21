// File: web/src/app/services/page.tsx - TEMPORARILY DISABLED
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AlertTriangle, ArrowRight } from 'lucide-react'
import { APP_CONFIG } from '@/lib/constants'

export const metadata = {
  title: `Services - Coming Soon | ${APP_CONFIG.name}`,
  description: 'Services page temporarily disabled for updates.',
}

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      <section className="py-20 lg:py-32" aria-labelledby="services-disabled">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-8 sm:p-12">
                <AlertTriangle className="mx-auto h-12 w-12 text-orange-600" aria-hidden="true" />
                <h1 id="services-disabled" className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Services Page Temporarily Disabled
                </h1>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">
                  We're updating our services information and will be back soon with improved content.
                </p>
                <p className="mt-4 text-base text-muted-foreground">
                  In the meantime, you can:
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <Button asChild>
                    <Link href="/" className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      Back to Home
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/contact">
                      Contact Us
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}