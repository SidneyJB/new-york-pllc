import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import { PRICING } from '@/lib/constants'

export function CTASection() {
  return (
    <section className="bg-primary-50/50 py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to Form Your PLLC?
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Join thousands of licensed professionals who have successfully formed their PLLC with us.
          </p>

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="trust-indicator text-green-500 ">
              <CheckCircle className="h-4 w-4" />
              <span>NY State Compliant</span>
            </div>
            <div className="trust-indicator text-green-500 ">
              <CheckCircle className="h-4 w-4" />
              <span>Licensed Professional Focus</span>
            </div>
            <div className="trust-indicator text-green-500 ">
              <CheckCircle className="h-4 w-4" />
              <span>Money-Back Guarantee</span>
            </div>
          </div>

          <div className="mt-10">
            <Button size="lg" className="bg-primary hover:bg-primary-700" asChild>
              <Link href="/order">
                Start your PLLC today
              </Link>
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              ✓ No hidden fees • ✓ All-inclusive pricing • ✓ Fast processing
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
