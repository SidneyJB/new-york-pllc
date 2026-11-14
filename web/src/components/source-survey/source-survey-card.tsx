'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { readSpiffyThankYouEmail } from '@/lib/analytics/enhanced-conversions'
import { parseSpiffyOrderId } from '@/lib/analytics/spiffy-confirmation'
import {
  HEARD_FROM_OPTIONS,
  OTHER_SERVICE_OPTIONS,
  SURVEY_LONG_TEXT_MAX,
  SURVEY_SHORT_TEXT_MAX,
  type HeardFromKey,
  type OtherServiceKey,
} from '@/lib/source-survey/survey-options'

type Status = 'loading' | 'open' | 'sending' | 'done' | 'hidden'

function doneKey(orderId: string | undefined): string {
  return `source_survey_done:${orderId ?? 'no-order'}`
}

function readDone(key: string): boolean {
  try {
    return window.localStorage.getItem(key) === '1'
  } catch {
    return false
  }
}

function writeDone(key: string): void {
  try {
    window.localStorage.setItem(key, '1')
  } catch {
    // Storage blocked (private window): the card simply shows again on reload.
  }
}

const fieldClass =
  'w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring'

/** Optional two-question survey shown after payment. Never blocks or delays the confirmation page. */
export function SourceSurveyCard() {
  const [status, setStatus] = useState<Status>('loading')
  const [orderId, setOrderId] = useState<string | undefined>()
  const [email, setEmail] = useState<string | undefined>()
  const [heardFrom, setHeardFrom] = useState<HeardFromKey | ''>('')
  const [heardFromOther, setHeardFromOther] = useState('')
  const [tried, setTried] = useState<'yes' | 'no' | ''>('')
  const [services, setServices] = useState<OtherServiceKey[]>([])
  const [servicesOther, setServicesOther] = useState('')
  const [why, setWhy] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const id = parseSpiffyOrderId(params)
    setOrderId(id)
    setEmail(readSpiffyThankYouEmail(params))
    setStatus(readDone(doneKey(id)) ? 'hidden' : 'open')
  }, [])

  if (status === 'loading' || status === 'hidden') return null

  if (status === 'done') {
    return (
      <Card className="mb-8">
        <CardContent className="py-6 text-sm text-muted-foreground">Thanks, that helps us a lot.</CardContent>
      </Card>
    )
  }

  const hasAnswer = heardFrom !== '' || tried !== '' || why.trim() !== ''

  function toggleService(key: OtherServiceKey) {
    setServices((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))
  }

  function skip() {
    writeDone(doneKey(orderId))
    setStatus('hidden')
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    if (!hasAnswer) return
    setStatus('sending')
    setError(false)
    try {
      const response = await fetch('/api/source-survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          email,
          heardFrom: heardFrom || null,
          heardFromOther: heardFrom === 'other' ? heardFromOther : null,
          triedOtherService: tried || null,
          triedOtherServices: tried === 'yes' ? services : [],
          triedOtherServiceOther: tried === 'yes' && services.includes('other') ? servicesOther : null,
          whyChoseUs: why,
        }),
      })
      if (!response.ok) throw new Error(`survey ${response.status}`)
      writeDone(doneKey(orderId))
      setStatus('done')
    } catch {
      setError(true)
      setStatus('open')
    }
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>How did you find us?</CardTitle>
        <CardDescription>Optional. Your order is already confirmed. Your answers tell us where to spend our time.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-6">
          <fieldset className="space-y-2">
            <legend className="text-sm font-semibold">How did you hear about us?</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {HEARD_FROM_OPTIONS.map((option) => (
                <label key={option.key} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="heardFrom"
                    value={option.key}
                    checked={heardFrom === option.key}
                    onChange={() => setHeardFrom(option.key)}
                    className="h-4 w-4 accent-primary"
                  />
                  {option.label}
                </label>
              ))}
            </div>
            {heardFrom === 'other' && (
              <input
                type="text"
                aria-label="Where did you hear about us?"
                placeholder="Where?"
                maxLength={SURVEY_SHORT_TEXT_MAX}
                value={heardFromOther}
                onChange={(e) => setHeardFromOther(e.target.value)}
                className={fieldClass}
              />
            )}
          </fieldset>

          <fieldset className="space-y-2">
            <legend className="text-sm font-semibold">Did you look at or try another service before choosing us?</legend>
            <div className="flex gap-6">
              {(['no', 'yes'] as const).map((value) => (
                <label key={value} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="triedOther"
                    value={value}
                    checked={tried === value}
                    onChange={() => setTried(value)}
                    className="h-4 w-4 accent-primary"
                  />
                  {value === 'yes' ? 'Yes' : 'No'}
                </label>
              ))}
            </div>
            {tried === 'yes' && (
              <div className="space-y-2 pt-1">
                <p className="text-sm text-muted-foreground">Which ones? Pick any that apply.</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {OTHER_SERVICE_OPTIONS.map((option) => (
                    <label key={option.key} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={services.includes(option.key)}
                        onChange={() => toggleService(option.key)}
                        className="h-4 w-4 accent-primary"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
                {services.includes('other') && (
                  <input
                    type="text"
                    aria-label="Which other service?"
                    placeholder="Which one?"
                    maxLength={SURVEY_SHORT_TEXT_MAX}
                    value={servicesOther}
                    onChange={(e) => setServicesOther(e.target.value)}
                    className={fieldClass}
                  />
                )}
              </div>
            )}
          </fieldset>

          <div className="space-y-2">
            <label htmlFor="source-survey-why" className="text-sm font-semibold">
              What made you choose us? <span className="font-normal text-muted-foreground">(optional)</span>
            </label>
            <textarea
              id="source-survey-why"
              rows={2}
              maxLength={SURVEY_LONG_TEXT_MAX}
              value={why}
              onChange={(e) => setWhy(e.target.value)}
              className={fieldClass}
            />
          </div>

          {error && (
            <p className="text-sm text-destructive" role="alert">
              That didn&apos;t go through. Please try again.
            </p>
          )}

          <div className="flex items-center gap-4">
            <Button type="submit" disabled={!hasAnswer || status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send'}
            </Button>
            <button type="button" onClick={skip} className="text-sm text-muted-foreground underline underline-offset-4">
              Skip
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
