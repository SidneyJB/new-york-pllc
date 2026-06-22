import { Metadata } from 'next'
import { SEO_CONFIG } from '@/lib/seo/config'
import { StateForeignQualificationPage, StateForeignQualificationContent } from '../_components/state-foreign-qualification-page'

const content: StateForeignQualificationContent = {
  state: 'Texas',
  slug: 'texas',
  pllcPrice: 910,
  pcPrice: 930,
  intro:
    'Texas licensed practices often expand into New York for enterprise clients, hiring, telehealth, design work, or a physical NY operation. We review the Texas certificate of formation and status record to determine whether New York should treat the entity as a foreign PLLC or foreign PC, then prepare the filing when eligible.',
  whoThisIsFor: [
    'Texas professional limited liability companies and professional LLCs seeking New York foreign PLLC authority.',
    'Texas professional corporations that need to qualify into New York as foreign PCs.',
    'Texas practices hiring in NY, contracting with NY customers, or opening New York operations.',
    'Licensed owners who need the Texas certificate of formation reviewed before ordering NY foreign qualification filings.',
  ],
  documents: [
    'Current Texas entity name.',
    'Texas Secretary of State file number, if available.',
    'Entity type shown in the Texas Secretary of State record.',
    'Texas Certificate of Fact - Status.',
    'Certified Texas Certificate of Formation for a professional limited liability company or professional corporation.',
    'Any Texas amendments affecting name, purpose, owners, managers, shareholders, officers, or directors.',
    'Professional-purpose language from the Texas Certificate of Formation.',
    'Owner, member, manager, shareholder, officer, or director license information.',
    'NY business address or registered agent details.',
    'Desired NY-facing assumed name, if needed.',
  ],
  stateDocuments: [
    'Texas Certificate of Fact - Status from the Secretary of State.',
    'Certified Certificate of Formation - Professional Limited Liability Company.',
    'Certified Certificate of Formation - Professional Corporation.',
    'Texas Certificate of Formation - Professional Association, if the entity was formed as a PA.',
    'Filed amendments showing changes to name, professional purpose, or governing persons.',
  ],
  eligibilityNuance:
    'Texas pricing uses similar source-document assumptions for both paths, with a higher PC price because of the NY PC-side professional filing adjustment. New York reviews the Texas certificate of formation closely before treating an entity as a foreign PLLC.',
  whatWeCheck:
    'Before filing, we review the Texas certificate of fact/status, certified certificate of formation, professional purpose, entity type, owner or shareholder license details, and exact name. We flag Texas names that are acceptable locally but may be too broad, misleading, or insufficiently profession-specific for New York.',
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
    'Send us the Texas entity name and certificate of formation if you have it, and we will check whether New York can treat it as a foreign PLLC or whether the foreign PC path applies.',
  faqs: [
    {
      question: 'Can my Texas PLLC do business in New York?',
      answer:
        'Only if it qualifies under New York’s professional entity rules. We review the Texas certificate of formation to confirm whether it shows a professional purpose that supports foreign PLLC qualification.',
    },
    {
      question: 'How does New York review a Texas certificate of formation?',
      answer:
        'New York looks beyond the Texas entity name and checks whether the certificate of formation supports a professional or restricted professional purpose. If the document is general-purpose, the entity may not qualify as a foreign PLLC.',
    },
    {
      question: 'Can my Texas professional corporation become a New York PLLC?',
      answer:
        'No. A Texas professional corporation stays on the foreign PC path. We do not convert a foreign PC into a NY PLLC through foreign qualification.',
    },
    {
      question: 'Will I need a DBA or assumed name in New York?',
      answer:
        'Possibly. If the Texas legal name does not comply with New York professional naming rules, we can file a Certificate of Assumed Name. The assumed-name service is $109.',
    },
    {
      question: 'Why is the Texas PC price different from the PLLC price?',
      answer:
        'The Texas foreign PLLC path starts at $910. The Texas foreign PC path starts at $930 because of the NY PC-side professional filing adjustment.',
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
  ],
}

export const metadata: Metadata = {
  title: `Texas PLLC or PC Foreign Qualification in New York`,
  description:
    'Qualify your Texas professional LLC, PLLC, or PC to do business in New York. Foreign PLLC and foreign PC filing help for licensed professionals. Starting at $910.',
  keywords: [
    'Texas PLLC foreign qualification New York',
    'Texas professional LLC do business in NY',
    'Texas PC foreign qualification New York',
    'foreign PLLC New York',
    'foreign professional corporation New York',
  ],
  alternates: { canonical: `${SEO_CONFIG.siteUrl}/foreign-pllc/texas` },
}

export default function TexasForeignPLLCPage() {
  return <StateForeignQualificationPage content={content} />
}
