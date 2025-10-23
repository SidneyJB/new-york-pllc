import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Award } from 'lucide-react'

export function GuaranteeSection() {
  return (
    <section className="bg-muted/30 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success-500">
                  <Award className="h-4 w-4 text-green-500" />
                </div>
                <span className="trust-indicator text-green-500">100% Money-Back Guarantee</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Complete satisfaction guaranteed.</strong> If we cannot complete your PLLC formation for any reason,
                we will refund your entire payment with no questions asked. We&apos;re confident in our process and stand
                behind our service with this unconditional guarantee.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
