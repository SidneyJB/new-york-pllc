import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Newspaper, FileCheck2, Mail, Clock, GraduationCap } from 'lucide-react'

const timelineSteps = [
  {
    step: 1,
    title: 'Order Submitted',
    description: 'You complete the order form with your business details and professional license information.',
    duration: 'Same day',
    icon: FileText,
    status: 'completed',
  },
  {
    step: 2,
    title: 'NYSED Preapproval',
    description: 'We prepare and submit your preapproval package to the New York State Education Department (NYSED) within one day of receiving your license information. The 2-3 month timeline is NYSED\'s review period, not our processing time.',
    duration: '2-3 months (NYSED review)',
    icon: GraduationCap,
    status: 'active',
  },
  {
    step: 3,
    title: 'State Filing',
    description: 'Once NYSED approves, we file your Articles of Organization (PLLC) with the New York Department of State within one day. Within 1-2 days, we deliver your PLLC documents, EIN, and Operating Agreement.',
    duration: '1-2 days',
    icon: FileCheck2,
    status: 'pending',
  },
  {
    step: 4,
    title: 'Publication Period',
    description: 'Your PLLC name is published in two approved newspapers for six consecutive weeks, as required by NY law.',
    duration: '6 weeks',
    icon: Newspaper,
    status: 'pending',
  },
  {
    step: 5,
    title: 'Certificate Filed',
    description: 'We file the Certificate of Publication with the Department of State within one day after publication is complete.',
    duration: 'Within one day',
    icon: FileCheck2,
    status: 'pending',
  },
  {
    step: 6,
    title: 'Documents Delivered',
    description: 'You receive official documents from the state confirming that the publishing process is complete.',
    duration: 'After publication',
    icon: Mail,
    status: 'pending',
  },
]

export function TimelineSection() {
  return (
    <section className="py-20 lg:py-32 bg-muted/30" aria-labelledby="timeline-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="timeline-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Your PLLC Formation Timeline
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Here's exactly what happens after you submit your order. We handle every step, keeping you updated along the way.
          </p>
        </div>

        {/* Timeline */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="relative">
            {/* Vertical line connecting all steps */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20 md:left-12" aria-hidden="true" />

            {/* Timeline steps */}
            <div className="space-y-8">
              {timelineSteps.map((item, index) => {
                const Icon = item.icon
                const isLast = index === timelineSteps.length - 1
                const isStep3 = item.step === 3

                return (
                  <div key={item.step}>
                    <div className="relative flex items-start gap-6 md:gap-8">
                      {/* Timeline dot and connector */}
                      <div className="relative flex-shrink-0">
                        {/* Connector line */}
                        {!isLast && (
                          <div
                            className="absolute left-8 top-16 h-8 w-0.5 bg-primary/20 md:left-12"
                            aria-hidden="true"
                          />
                        )}
                        {/* Timeline dot */}
                        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-primary bg-primary/10 text-primary">
                          <Icon className="h-6 w-6" aria-hidden="true" />
                          <span className="sr-only">Step {item.step}</span>
                        </div>
                      </div>

                      {/* Content card */}
                      <div className="flex-1 pt-2">
                        <Card className="h-full">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <span className="text-muted-foreground">Step {item.step}</span>
                              <span>{item.title}</span>
                            </CardTitle>
                            <CardDescription className="mt-2">{item.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" aria-hidden="true" />
                              <span>{item.duration}</span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Highlighted box after step 3 */}
                    {isStep3 && (
                      <div className="ml-0 md:ml-24 mt-4">
                        <div className="rounded-lg border-2 border-amber-300 bg-amber-50 p-4">
                          <p className="text-sm font-medium text-amber-900">
                            ✓ You can begin doing business at this point
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Summary note */}
          <div className="mt-12 rounded-lg border bg-background p-6 text-center">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Total timeline:</strong> Approximately 3-4 months from order submission to completion.
              NYSED preapproval (2-3 months) is required for most professions, followed by state filing and the mandatory 6-week publication period.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

