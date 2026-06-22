import { Metadata } from 'next'
import { SEO_CONFIG } from '@/lib/seo/config'
import { StateForeignQualificationPage, StateForeignQualificationContent } from '../_components/state-foreign-qualification-page'

const content: StateForeignQualificationContent = {
  state: 'Pennsylvania',
  slug: 'pennsylvania',
  pllcPrice: 995,
  pcPrice: 995,
  intro:
    'Pennsylvania professionals often reach New York through border-state client work, Philadelphia-to-NYC expansion, telehealth, consulting, or contracts with New York organizations. We help determine whether the Pennsylvania entity belongs on New York’s foreign PLLC path or foreign PC path, then handle the filing workflow when eligible.',
  whoThisIsFor: [
    'Pennsylvania professional LLCs, restricted professional companies, and similar professional-purpose entities seeking NY authority.',
    'Pennsylvania professional corporations that need to qualify in New York as foreign PCs.',
    'Licensed practices serving NY clients through telehealth, professional services contracts, or regional expansion.',
    'Owners who need certified Pennsylvania documents reviewed before preparing the NY Application for Authority.',
  ],
  documents: [
    'Current Pennsylvania entity name.',
    'Pennsylvania entity number, if available.',
    'Entity type shown in the Pennsylvania Department of State record.',
    'Pennsylvania Certificate of Subsistence.',
    'Certified Pennsylvania Certificate of Organization for an LLC or restricted professional company.',
    'Certified Pennsylvania Articles of Incorporation or charter record for a professional corporation.',
    'Any amendments affecting name, purpose, owners, or professional-service language.',
    'Owner, member, manager, shareholder, officer, or director license information.',
    'NY business address or registered agent details.',
    'Desired NY-facing assumed name, if needed.',
  ],
  stateDocuments: [
    'Pennsylvania Certificate of Subsistence from the Department of State.',
    'Certified Certificate of Organization for a Pennsylvania LLC or restricted professional company.',
    'Certified Articles of Incorporation for a Pennsylvania professional corporation.',
    'Filed amendments, especially if they add restricted professional company or professional-purpose language.',
    'Long certified articles or amendments that may affect Pennsylvania per-page copy costs.',
  ],
  eligibilityNuance:
    'Pennsylvania entity vocabulary can vary, including professional LLC, restricted professional company, and professional corporation. New York focuses on whether the Pennsylvania charter supports the professional entity path, not just how the owner describes the company.',
  whatWeCheck:
    'Before filing, we review the Pennsylvania certificate of subsistence or status, certified articles or charter, entity type, professional purpose, owner licensing, and name. Pennsylvania certified-copy cost can vary with page count, so unusually long articles, amendments, or charter records may require a quote adjustment before filing.',
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
    'Send us the Pennsylvania entity name and any articles or charter documents you already have, and we will map the correct New York foreign PLLC or foreign PC path before filing.',
  faqs: [
    {
      question: 'Can my Pennsylvania professional LLC do business in New York?',
      answer:
        'Only if it qualifies under New York’s professional entity rules. We review the Pennsylvania articles or charter to confirm whether the entity was formed for a professional or restricted professional purpose.',
    },
    {
      question: 'Can my Pennsylvania PC become a New York PLLC?',
      answer:
        'No. A Pennsylvania professional corporation stays on the foreign PC path. We do not convert a foreign PC into a NY PLLC through foreign qualification.',
    },
    {
      question: 'Why can Pennsylvania certified-copy page count affect the quote?',
      answer:
        'Pennsylvania certified-copy costs can vary when the articles, charter, amendments, or underlying record are unusually long. The standard Pennsylvania price is $995 for either path, but we quote any unusual document cost before filing.',
    },
    {
      question: 'What if my Pennsylvania entity is just a regular LLC?',
      answer:
        'A general-purpose LLC may not qualify as a foreign PLLC in New York. The formation documents usually need to show a professional or restricted professional purpose.',
    },
    {
      question: 'Will I need a DBA or assumed name in New York?',
      answer:
        'Possibly. If your Pennsylvania legal name does not comply with New York professional naming rules, we can file a Certificate of Assumed Name. The assumed-name service is $109.',
    },
    {
      question: 'Does the price include publication?',
      answer:
        'We explain the publication requirement and quote any publication-related costs before filing. Publication is not included unless specifically quoted.',
    },
    {
      question: 'How long does New York foreign qualification take?',
      answer:
        'Timing depends on Pennsylvania document retrieval, NY review, professional approvals, and whether an assumed name is needed. We give practical timing expectations after reviewing the entity record.',
    },
  ],
}

export const metadata: Metadata = {
  title: `Pennsylvania PLLC or PC Foreign Qualification in New York`,
  description:
    'Qualify your Pennsylvania professional LLC, PLLC, or PC to do business in New York. Foreign PLLC and foreign PC filing help for licensed professionals. Starting at $995.',
  keywords: [
    'Pennsylvania PLLC foreign qualification New York',
    'Pennsylvania professional LLC do business in NY',
    'Pennsylvania PC foreign qualification New York',
    'foreign PLLC New York',
    'foreign professional corporation New York',
  ],
  alternates: { canonical: `${SEO_CONFIG.siteUrl}/foreign-pllc/pennsylvania` },
}

export default function PennsylvaniaForeignPLLCPage() {
  return <StateForeignQualificationPage content={content} />
}
