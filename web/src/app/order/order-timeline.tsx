const STEPS = [
  {
    title: 'Right after you pay',
    who: 'You',
    body: 'You get an order confirmation by email. If anything in your intake is missing or unclear, we email you about it.',
  },
  {
    title: 'NYSED application',
    who: 'Us',
    body: 'We prepare and submit your professional application to the NYS Education Department, usually within 1–3 business days of a complete intake.',
  },
  {
    title: 'NYSED review',
    who: 'State',
    body: 'NYSED reviews the application. This usually takes about 8–12 weeks and is outside our control. We handle any correction letters.',
  },
  {
    title: 'Department of State filing',
    who: 'Us',
    body: 'Once NYSED approves, we file your Articles of Organization, typically within one business day.',
  },
  {
    title: 'Publication and completion',
    who: 'Us + newspapers',
    body: 'Notices run in two newspapers for six weeks. We then file the Certificate of Publication and send your documents digitally.',
  },
]

export function OrderTimeline() {
  return (
    <ol className="space-y-5">
      {STEPS.map((step, index) => (
        <li key={step.title} className="flex gap-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
            {index + 1}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold">{step.title}</h3>
              <span className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground">{step.who}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
