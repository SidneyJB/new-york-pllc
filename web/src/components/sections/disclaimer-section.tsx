import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle } from 'lucide-react'

export function DisclaimerSection() {
  return (
    <section className="border-t py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                </div>
                <span>Important Legal Disclaimer</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm leading-relaxed">
                <strong>This is not legal advice.</strong> We provide administrative filing services for PLLC formation in New York.
                PLLC formation involves complex legal and regulatory requirements that vary by profession and situation.
                We recommend consulting with a licensed attorney for legal advice regarding your specific situation,
                professional licensing requirements, and business structure decisions. Our service is limited to filing
                and administrative tasks as permitted by law.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
