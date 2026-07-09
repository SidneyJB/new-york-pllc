import { describe, expect, it } from 'vitest'
import { mergeClickAttribution } from './merge-click-attribution'

describe('mergeClickAttribution', () => {
  it('lets URL values win over cookie per key', () => {
    expect(
      mergeClickAttribution(
        { gclid: 'from-url', utm_source: 'google' },
        { gclid: 'from-cookie', wbraid: 'wb-1', utm_source: 'old' },
      ),
    ).toEqual({
      gclid: 'from-url',
      wbraid: 'wb-1',
      utm_source: 'google',
    })
  })

  it('never clears a stored key with an empty primary value', () => {
    expect(
      mergeClickAttribution({ gclid: '  ' }, { gclid: 'kept', utm_campaign: 'brand' }),
    ).toEqual({
      gclid: 'kept',
      utm_campaign: 'brand',
    })
  })
})
