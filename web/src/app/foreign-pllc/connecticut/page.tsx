import { Metadata } from 'next'
import { SEO_CONFIG } from '@/lib/seo/config'
import { StateForeignQualificationPage, StateForeignQualificationContent } from '../_components/state-foreign-qualification-page'

const content: StateForeignQualificationContent = {
  state: 'Connecticut',
  slug: 'connecticut',
  pllcPrice: 1000,
  pcPrice: 1000,
  intro:
    'Connecticut professionals can be close enough to New York that the business line feels informal, especially for Fairfield County practices, NYC-adjacent clients, hybrid schedules, and cross-state professional services. Proximity does not replace New York authority when the entity is doing business in NY, so we review the Connecticut entity and handle the foreign qualification path when eligible.',
  whoThisIsFor: [
    'Connecticut professional LLCs or similar professional-purpose entities seeking New York foreign PLLC authority.',
    'Connecticut professional corporations that need the New York foreign PC path.',
    'Fairfield County and NYC-adjacent practices serving New York clients or opening NY operations.',
    'Hybrid practices that occasionally cross into NY and want the entity authority reviewed before filing.',
  ],
  documents: [
    'Current Connecticut entity legal name.',
    'Connecticut Business ID, if available.',
    'Entity type as you understand it (professional LLC, PLLC, professional corporation, etc.).',
    'Owner, member, manager, shareholder, officer, or director license information.',
    'Desired NY-facing assumed name, if needed.',
  ],
  eligibilityNuance:
    'The Connecticut price is unified at $1000 for both foreign PLLC and foreign PC paths. The practical issue is usually not distance from New York, but whether the Connecticut entity type, purpose, ownership, and name match New York professional entity rules.',
  whatWeCheck:
    'Before filing, we review the Connecticut certificate of legal existence or status, certified formation document or charter, entity type, purpose language, owner or shareholder license details, and name. We also assess whether a nearby CT practice actually needs NY authority based on NY-facing activity.',
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
    'Send us the Connecticut entity name and a short description of the NY-facing activity, and we will confirm whether the foreign PLLC or foreign PC path fits before filing.',
  faqs: [
    {
      question: 'Can my Connecticut professional LLC do business in New York?',
      answer:
        'Only if it qualifies under New York’s professional entity rules. We review the Connecticut formation documents to confirm whether the entity was formed for a professional purpose that can support foreign PLLC qualification.',
    },
    {
      question: 'Does being close to New York change the foreign qualification requirement?',
      answer:
        'No. Proximity does not replace NY authority if the entity is doing business in New York. A Fairfield County or NYC-adjacent practice still needs the correct NY path when its NY activity triggers foreign qualification.',
    },
    {
      question: 'Can my Connecticut PC become a New York PLLC?',
      answer:
        'No. A Connecticut professional corporation stays on the foreign PC path. Foreign qualification does not convert a PC into a PLLC.',
    },
    {
      question: 'What if my Connecticut entity is just a regular LLC?',
      answer:
        'A general-purpose Connecticut LLC may not qualify as a foreign PLLC in New York. The formation documents usually need to show a professional or restricted professional purpose.',
    },
    {
      question: 'Will I need a DBA or assumed name in New York?',
      answer:
        'Possibly. If the Connecticut legal name does not comply with New York professional naming rules, we can file a Certificate of Assumed Name. The assumed-name service is $199.',
    },
    {
      question: 'Does the price include publication?',
      answer:
        'We explain the publication requirement and quote any publication-related costs before filing. Publication is not included unless specifically quoted.',
    },
    {
      question: 'How long does Connecticut to NY foreign qualification take?',
      answer:
        'Timing depends on Connecticut document availability, NY review, professional approvals, and whether an assumed name is needed. We give a practical estimate after reviewing the entity record.',
    },
  ],
}

export const metadata: Metadata = {
  title: `Connecticut PLLC/PC Foreign Qualification in NY | NYPLLC`,
  description:
    'Qualify your Connecticut professional LLC, PLLC, or PC for New York. NYSED authority, DOS filing, 6-week publication handled end-to-end. Starting at $1000.',
  keywords: [
    'Connecticut PLLC foreign qualification New York',
    'Connecticut professional LLC do business in NY',
    'Connecticut PC foreign qualification New York',
    'foreign PLLC New York',
    'foreign professional corporation New York',
  ],
  alternates: { canonical: `${SEO_CONFIG.siteUrl}/foreign-pllc/connecticut` },
}

export default function ConnecticutForeignPLLCPage() {
  return <StateForeignQualificationPage content={content} />
}
