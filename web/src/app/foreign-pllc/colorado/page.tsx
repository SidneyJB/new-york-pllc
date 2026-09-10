import { Metadata } from 'next'
import { SEO_CONFIG } from '@/lib/seo/config'
import { StateForeignQualificationPage, StateForeignQualificationContent } from '../_components/state-foreign-qualification-page'

const content: StateForeignQualificationContent = {
  state: 'Colorado',
  slug: 'colorado',
  pllcPrice: 895,
  pcPrice: 895,
  intro:
    'A Colorado professional LLC or professional corporation that will do business in New York still needs New York authority. Colorado standing certificates and certified copies are free from the Secretary of State; we pull those and file the New York Application for Authority, NYSED consent, and six-week publication.',
  whoThisIsFor: [
    'Colorado professional LLCs or PLLCs seeking New York foreign PLLC authority.',
    'Colorado professional corporations that need the New York foreign PC path.',
    'Practices that already treat patients or clients in New York or are opening a NY location.',
    'Owners who formed in Colorado and now need the NY entity on credentialing and bank paperwork.',
  ],
  documents: [
    'Current Colorado entity legal name.',
    'Colorado SOS ID, if available.',
    'Entity type as you understand it (professional LLC, PLLC, professional corporation, etc.).',
    'Owner, member, manager, shareholder, officer, or director license information.',
    'Desired NY-facing assumed name, if needed.',
  ],
  eligibilityNuance:
    'The Colorado price is $895 for both foreign PLLC and foreign PC. Colorado does not charge for online good standing or certified copies. The New York filing stack and publication are what the package covers.',
  whatWeCheck:
    'Before filing, we review the Colorado record (free SOS standing and certified formation copy), entity type, purpose language, owner licenses, and name. We also assess whether a New York assumed name is required.',
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
    'Send us the Colorado entity name and a short description of the NY-facing activity, and we will confirm whether the foreign PLLC or foreign PC path fits before filing.',
  faqs: [
    {
      question: 'Can my Colorado professional LLC do business in New York?',
      answer:
        'Only if it qualifies under New York professional entity rules. We review the Colorado formation documents to confirm whether the entity was formed for a professional purpose that can support foreign PLLC qualification.',
    },
    {
      question: 'Do I need to buy a Colorado certificate of good standing?',
      answer:
        'No. Colorado issues standing certificates and certified copies free online. We still obtain them for the New York filing packet.',
    },
    {
      question: 'Can my Colorado PC become a New York PLLC?',
      answer:
        'No. A Colorado professional corporation stays on the foreign PC path. Foreign qualification does not convert a PC into a PLLC.',
    },
    {
      question: 'What if my Colorado entity is just a regular LLC?',
      answer:
        'A general-purpose Colorado LLC may not qualify as a foreign PLLC in New York. The formation documents usually need to show a professional purpose.',
    },
    {
      question: 'Will I need a DBA or assumed name in New York?',
      answer:
        'Possibly. If the Colorado legal name does not comply with New York professional naming rules, we can file a Certificate of Assumed Name. The assumed-name service is $199.',
    },
    {
      question: 'Does the price include publication?',
      answer:
        'Yes. The flat package includes end-to-end six-week legal notice publication (two county newspapers and Certificate of Publication filing). We handle the newspapers, affidavits, and filing for you.',
    },
    {
      question: 'How long does Colorado to NY foreign qualification take?',
      answer:
        'Timing depends on document review, NYSED, DOS, and whether an assumed name is needed. We give a practical estimate after reviewing the entity record.',
    },
  ],
}

export const metadata: Metadata = {
  title: `Colorado PLLC/PC Foreign Qualification in NY | NYPLLC`,
  description:
    'Qualify your Colorado professional LLC, PLLC, or PC for New York. NYSED authority, DOS filing, 6-week publication handled end-to-end. Starting at $895.',
  keywords: [
    'Colorado PLLC foreign qualification New York',
    'Colorado professional LLC do business in NY',
    'Colorado PC foreign qualification New York',
    'foreign PLLC New York',
    'foreign professional corporation New York',
  ],
  alternates: { canonical: `${SEO_CONFIG.siteUrl}/foreign-pllc/colorado` },
}

export default function ColoradoForeignPLLCPage() {
  return <StateForeignQualificationPage content={content} />
}
