import { Metadata } from 'next'
import { SEO_CONFIG } from '@/lib/seo/config'
import { StateForeignQualificationPage, StateForeignQualificationContent } from '../_components/state-foreign-qualification-page'

const content: StateForeignQualificationContent = {
  state: 'New Jersey',
  slug: 'new-jersey',
  pllcPrice: 975,
  pcPrice: 945,
  intro:
    'New Jersey clinicians, therapists, physicians, dentists, and other licensed professionals often expand across the Hudson before they think of it as a New York filing issue. If your New Jersey professional entity is serving NY clients, hiring in NY, or opening a New York office, we review the entity path and handle the New York foreign qualification filing when eligible.',
  whoThisIsFor: [
    'New Jersey professional service corporations and professional corporations that need the New York foreign PC path.',
    'New Jersey LLCs with professional-purpose formation language that may support a New York foreign PLLC filing.',
    'NJ practices serving clients across the Hudson, contracting with New York facilities, or adding New York operations.',
    'Licensed owners who need a practical review before ordering New Jersey standing and certified formation documents.',
  ],
  documents: [
    'Current New Jersey entity legal name.',
    'New Jersey 10-digit business ID, if available.',
    'Entity type as you understand it (LLC, professional LLC, professional service corporation, PC, etc.).',
    'Owner, member, shareholder, officer, director, or manager license information.',
    'NY business address or registered agent details.',
    'Desired NY-facing assumed name, if needed.',
  ],
  eligibilityNuance:
    'New Jersey customers may call the entity a professional service corporation, professional corporation, or LLC. New York still looks at the underlying entity type and professional purpose, so a New Jersey PC stays on the foreign PC path and is not converted into a PLLC.',
  whatWeCheck:
    'Before filing, we compare the New Jersey legal name, entity type, standing record, certified formation document, professional-purpose language, and owner license details against New York foreign PLLC or foreign PC requirements. We also flag names that may need a NY assumed name because the New Jersey name does not identify the licensed profession clearly enough for New York.',
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
    'Send us your New Jersey entity name and document status, and we will confirm whether your NY filing should move as a foreign PLLC or foreign PC before you order anything unnecessary.',
  faqs: [
    {
      question: 'Can my New Jersey PLLC or professional LLC do business in New York?',
      answer:
        'Only if it qualifies under New York professional entity rules. We review the New Jersey formation document to confirm whether the entity was formed with a professional purpose that can support the foreign PLLC path.',
    },
    {
      question: 'Can my New Jersey PC qualify as a New York foreign PLLC?',
      answer:
        'No. A New Jersey professional corporation or professional service corporation stays on the New York foreign PC path. Foreign qualification does not convert a PC into a PLLC.',
    },
    {
      question: 'Why is the New Jersey PC price lower than the PLLC price?',
      answer:
        'New Jersey PC source documents are usually less expensive for this workflow than LLC source documents, so the New Jersey foreign PC starting price is $945 and the eligible PLLC path starts at $975.',
    },
    {
      question: 'What if my New Jersey entity is just a regular LLC?',
      answer:
        'A general-purpose New Jersey LLC may not qualify as a foreign PLLC in New York. The formation documents usually need to show a professional or restricted professional purpose.',
    },
    {
      question: 'Will I need a DBA or assumed name in New York?',
      answer:
        'Possibly. If the New Jersey legal name does not comply with New York professional naming rules, we can file a New York Certificate of Assumed Name. The assumed-name service is $109.',
    },
    {
      question: 'Does the price include publication?',
      answer:
        'We explain the publication requirement and quote any publication-related costs before filing. Publication is not promised as included in these state-specific foreign qualification prices unless specifically quoted.',
    },
    {
      question: 'Do I still need a New York professional license?',
      answer:
        'Yes. Foreign qualification lets an eligible entity do business in NY, but it does not replace individual professional licensing requirements.',
    },
  ],
}

export const metadata: Metadata = {
  title: `New Jersey PLLC or PC Foreign Qualification in New York`,
  description:
    'Qualify your New Jersey professional LLC, PLLC, or PC to do business in New York. Foreign PLLC and foreign PC filing help for licensed professionals. Starting at $975.',
  keywords: [
    'New Jersey PLLC foreign qualification New York',
    'New Jersey professional LLC do business in NY',
    'New Jersey PC foreign qualification New York',
    'foreign PLLC New York',
    'foreign professional corporation New York',
  ],
  alternates: { canonical: `${SEO_CONFIG.siteUrl}/foreign-pllc/new-jersey` },
}

export default function NewJerseyForeignPLLCPage() {
  return <StateForeignQualificationPage content={content} />
}
