/**
 * Schedule work after the browser is idle (with a timeout fallback).
 * Used to keep attribution / scroll listeners off the LCP critical path.
 */
export function deferUntilIdle(callback: () => void, timeoutMs = 4000): () => void {
  if (typeof window === 'undefined') {
    return () => {}
  }

  if (typeof window.requestIdleCallback === 'function') {
    const id = window.requestIdleCallback(() => callback(), { timeout: timeoutMs })
    return () => {
      if (typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(id)
      }
    }
  }

  const id = window.setTimeout(callback, 1)
  return () => window.clearTimeout(id)
}
