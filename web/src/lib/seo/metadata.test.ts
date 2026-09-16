import { describe, expect, it } from 'vitest'
import {
  FOREIGN_QUAL_HUB_METADATA,
  generateStateForeignQualMetadata,
} from './metadata'

describe('generateStateForeignQualMetadata', () => {
  it('sets page-specific openGraph and twitter tags', () => {
    const metadata = generateStateForeignQualMetadata({
      slug: 'california',
      title: 'California PC/Professional Entity Foreign Qualification in NY | NYPLLC',
      description:
        'Qualify an eligible California professional corporation or professional entity in New York. NYSED, DOS filing, and six-week publication included. $905 flat.',
      keywords: ['California PC foreign qualification New York'],
    })

    expect(metadata.openGraph?.title).toContain('California')
    expect(metadata.openGraph?.title).not.toContain('$885')
    expect(metadata.openGraph?.description).toContain('$905')
    expect(metadata.twitter?.title).toContain('California')
    expect(metadata.twitter?.description).toContain('$905')
    expect(metadata.alternates?.canonical).toBe('https://www.nypllc.com/foreign-pllc/california')
  })
})

describe('FOREIGN_QUAL_HUB_METADATA', () => {
  it('does not inherit homepage formation pricing in openGraph', () => {
    expect(FOREIGN_QUAL_HUB_METADATA.openGraph?.title).toContain('Foreign-Qualify')
    expect(FOREIGN_QUAL_HUB_METADATA.openGraph?.title).not.toContain('$885')
    expect(FOREIGN_QUAL_HUB_METADATA.openGraph?.description).toContain('foreign-qualify')
  })
})
