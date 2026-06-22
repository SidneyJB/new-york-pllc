import { Metadata } from 'next'
import { SEO_CONFIG } from '@/lib/seo/config'
import { StateForeignQualificationPage, StateForeignQualificationContent } from '../_components/state-foreign-qualification-page'

const content: StateForeignQualificationContent = {
  state: 'Florida',
  slug: 'florida',
  pllcPrice: 910,
  pcPrice: 915,
  intro:
    'Florida professionals often keep a Florida entity while relocating, serving New York clients, running a snowbird practice, or adding telehealth and consulting work in NY. We review whether the Florida entity can qualify in New York and handle the foreign PLLC or foreign PC filing path when eligible.',
  whoThisIsFor: [
    'Florida professional LLCs or PLLCs with professional-purpose language that may support New York foreign PLLC authority.',
    'Florida professional associations or professional corporations that need New York foreign PC treatment.',
    'Licensed professionals relocating from Florida to New York while keeping the Florida entity active.',
    'Practices serving NY clients through telehealth, seasonal operations, or New York contracts.',
  ],
  documents: [
    'Current Florida entity legal name.',
    'Florida Sunbiz document number, if available.',
    'Entity type as you understand it (professional LLC, PLLC, P.A., professional corporation, etc.).',
    'Owner, member, shareholder, officer, director, or manager license information.',
    'Desired NY-facing assumed name, if needed.',
  ],
  eligibilityNuance:
    'Florida document costs are often relatively low, but New York still performs its own review. A name or entity description accepted in Florida may need adjustment or a NY assumed name before the entity can operate under a compliant New York-facing name.',
  whatWeCheck:
    'Before filing, we review the Florida certificate of status, certified articles or charter, entity type, professional purpose, active status, ownership and license information, and the exact legal name. We pay particular attention to whether the Florida name works under New York professional naming rules.',
  professions: [
    'mental health counselors',
    'clinical social workers',
    'psychologists',
    'physicians',
    'nurse practitioners',
    'physical therapists',
    'dentists',
    'architects',
    'engineers',
    'other licensed professionals',
  ],
  stateCta:
    'Send us the Florida entity name and we will check the NY path before you spend time ordering documents or changing the practice name.',
  faqs: [
    {
      question: 'Can my Florida professional LLC or PLLC do business in New York?',
      answer:
        'Only if it qualifies under New York’s professional entity rules. We review the Florida articles or charter to confirm whether the entity was formed with a professional purpose that supports the foreign PLLC path.',
    },
    {
      question: 'Can my Florida PC or professional association become a New York PLLC?',
      answer:
        'No. A Florida professional corporation or professional association stays on the New York foreign PC path. Foreign qualification does not convert it into a PLLC.',
    },
    {
      question: 'Can my Florida entity use the same legal name in New York?',
      answer:
        'Sometimes, but not always. A name accepted in Florida may still fail New York professional naming rules. If needed, we can file a New York Certificate of Assumed Name for $109.',
    },
    {
      question: 'What if my Florida entity is just a regular LLC?',
      answer:
        'A general-purpose Florida LLC may not qualify as a foreign PLLC in New York. The formation documents usually need to show a professional or restricted professional purpose.',
    },
    {
      question: 'Does the price include publication?',
      answer:
        'We explain the publication requirement and quote any publication-related costs before filing. Publication is not included unless specifically quoted.',
    },
    {
      question: 'Do I still need a New York professional license?',
      answer:
        'Yes. Foreign qualification lets an eligible entity do business in NY, but it does not replace individual professional licensing requirements.',
    },
    {
      question: 'How long does Florida to NY foreign qualification take?',
      answer:
        'Timing depends on Florida document availability, NY review, professional approvals, and whether an assumed name is needed. We give a clearer estimate after the eligibility review.',
    },
  ],
}

export const metadata: Metadata = {
  title: `Florida PLLC or PC Foreign Qualification in New York`,
  description:
    'Qualify your Florida professional LLC, PLLC, or PC to do business in New York. Foreign PLLC and foreign PC filing help for licensed professionals. Starting at $910.',
  keywords: [
    'Florida PLLC foreign qualification New York',
    'Florida professional LLC do business in NY',
    'Florida PC foreign qualification New York',
    'foreign PLLC New York',
    'foreign professional corporation New York',
  ],
  alternates: { canonical: `${SEO_CONFIG.siteUrl}/foreign-pllc/florida` },
}

export default function FloridaForeignPLLCPage() {
  return <StateForeignQualificationPage content={content} />
}
