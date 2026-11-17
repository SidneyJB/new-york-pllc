import { readFileSync } from 'node:fs'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { extractEmailFromSpiffyMessage } from './extract-email-from-spiffy-message'

/**
 * Unit test for the snippet Sid pastes into Spiffy's checkout custom JS.
 * Runs the exact file with a fake `checkout` and fake parent window.
 */
const SNIPPET_PATH = path.resolve(__dirname, '../../../../docs/spiffy-custom-js-email-capture.html')

function snippetBody(): string {
  const html = readFileSync(SNIPPET_PATH, 'utf8')
  const match = html.match(/<script>([\s\S]*)<\/script>/)
  if (!match) throw new Error('snippet has no <script> block')
  return match[1]
}

type FieldHandler = (fields: unknown) => void

function runSnippet(opts: { ancestorOrigin?: string; referrer?: string; embedded?: boolean } = {}) {
  const handlers: Record<string, FieldHandler[]> = {}
  const checkout = {
    ready: (cb: () => void) => cb(),
    on: (name: string, fn: FieldHandler) => {
      ;(handlers[name] ||= []).push(fn)
    },
  }
  const postMessage = vi.fn()
  const fakeWindow: Record<string, unknown> = {
    location: { ancestorOrigins: opts.ancestorOrigin ? [opts.ancestorOrigin] : [] },
  }
  fakeWindow.parent = opts.embedded === false ? fakeWindow : { postMessage }
  const fakeDocument = { referrer: opts.referrer ?? '' }
  new Function('window', 'document', 'checkout', snippetBody())(fakeWindow, fakeDocument, checkout)
  const fire = (fields: unknown) => (handlers['change:field'] || []).forEach((fn) => fn(fields))
  return { postMessage, fire, handlers }
}

const fields = (email: string) => [
  { name: 'name_first', value: 'Sid' },
  { name: 'email', value: email },
  { name: 'phone', value: '5555555555' },
]

describe('Spiffy custom JS snippet', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('posts the identify message our listener parses, to www.nypllc.com only', () => {
    const { postMessage, fire } = runSnippet({ ancestorOrigin: 'https://www.nypllc.com' })
    fire(fields('sid@nypllc.com'))
    expect(postMessage).not.toHaveBeenCalled()
    vi.advanceTimersByTime(900)
    expect(postMessage).toHaveBeenCalledTimes(1)
    const [msg, target] = postMessage.mock.calls[0]
    expect(target).toBe('https://www.nypllc.com')
    expect(typeof msg).toBe('string')
    expect(JSON.parse(msg)).toEqual({ event: 'identify', data: { email: 'sid@nypllc.com' } })
    expect(extractEmailFromSpiffyMessage(msg)).toBe('sid@nypllc.com')
  })

  it('never uses "*" as the target origin', () => {
    for (const ancestorOrigin of [undefined, 'https://evil.example', 'https://www.nypllc.com']) {
      const { postMessage, fire } = runSnippet({ ancestorOrigin })
      fire(fields('sid@nypllc.com'))
      vi.advanceTimersByTime(900)
      for (const call of postMessage.mock.calls) expect(call[1]).not.toBe('*')
    }
  })

  it('falls back to the fixed nypllc.com origins when the embedding origin is unknown or foreign', () => {
    for (const ancestorOrigin of [undefined, 'https://evil.example']) {
      const { postMessage, fire } = runSnippet({ ancestorOrigin })
      fire(fields('sid@nypllc.com'))
      vi.advanceTimersByTime(900)
      expect(postMessage.mock.calls.map((c) => c[1])).toEqual([
        'https://www.nypllc.com',
        'https://nypllc.com',
      ])
    }
  })

  it('uses document.referrer when ancestorOrigins is unavailable (Firefox)', () => {
    const { postMessage, fire } = runSnippet({ referrer: 'https://www.nypllc.com/order?c=ABC' })
    fire(fields('sid@nypllc.com'))
    vi.advanceTimersByTime(900)
    expect(postMessage.mock.calls.map((c) => c[1])).toEqual(['https://www.nypllc.com'])
  })

  it.each([
    'https://new-york-pllc-abc123-team.vercel.app',
    'https://new-york-pllc-git-main-team.vercel.app',
    'http://localhost:3000',
    'https://localhost:3000',
  ])('targets the preview/dev parent %s', (origin) => {
    const { postMessage, fire } = runSnippet({ ancestorOrigin: origin })
    fire(fields('sid@nypllc.com'))
    vi.advanceTimersByTime(900)
    expect(postMessage.mock.calls.map((c) => c[1])).toEqual([origin])
  })

  it('does not target other vercel apps', () => {
    const { postMessage, fire } = runSnippet({ ancestorOrigin: 'https://someone-else.vercel.app' })
    fire(fields('sid@nypllc.com'))
    vi.advanceTimersByTime(900)
    expect(postMessage.mock.calls.map((c) => c[1])).not.toContain('https://someone-else.vercel.app')
  })

  it('debounces typing and sends only the final valid email', () => {
    const { postMessage, fire } = runSnippet({ ancestorOrigin: 'https://www.nypllc.com' })
    fire(fields('sid@'))
    vi.advanceTimersByTime(200)
    fire(fields('sid@gmail.co'))
    vi.advanceTimersByTime(200)
    fire(fields('sid@gmail.com'))
    vi.advanceTimersByTime(900)
    expect(postMessage).toHaveBeenCalledTimes(1)
    expect(JSON.parse(postMessage.mock.calls[0][0]).data.email).toBe('sid@gmail.com')
  })

  it('does not post invalid emails', () => {
    const { postMessage, fire } = runSnippet({ ancestorOrigin: 'https://www.nypllc.com' })
    for (const bad of ['', 'sid', 'sid@gmail', 'sid@gmail.c', 'a b@c.com']) {
      fire(fields(bad))
      vi.advanceTimersByTime(900)
    }
    expect(postMessage).not.toHaveBeenCalled()
  })

  it('does not re-post the same email when other fields change', () => {
    const { postMessage, fire } = runSnippet({ ancestorOrigin: 'https://www.nypllc.com' })
    fire(fields('sid@nypllc.com'))
    vi.advanceTimersByTime(900)
    fire([{ name: 'phone', value: '1' }, { name: 'email', value: 'SID@nypllc.com' }])
    vi.advanceTimersByTime(900)
    fire([{ name: 'phone', value: '2' }])
    vi.advanceTimersByTime(900)
    expect(postMessage).toHaveBeenCalledTimes(1)
  })

  it('tolerates a single field object and junk payloads without throwing', () => {
    const { postMessage, fire } = runSnippet({ ancestorOrigin: 'https://www.nypllc.com' })
    expect(() => {
      fire(undefined)
      fire(null)
      fire('email')
      fire([null, 1, { name: 'email', value: 42 }])
      fire({ name: 'email', value: 'single@nypllc.com' })
      vi.advanceTimersByTime(900)
    }).not.toThrow()
    expect(postMessage).toHaveBeenCalledTimes(1)
    expect(JSON.parse(postMessage.mock.calls[0][0]).data.email).toBe('single@nypllc.com')
  })

  it('does nothing on the hosted (non-embedded) checkout page', () => {
    const { handlers } = runSnippet({ embedded: false })
    expect(handlers['change:field']).toBeUndefined()
  })
})
