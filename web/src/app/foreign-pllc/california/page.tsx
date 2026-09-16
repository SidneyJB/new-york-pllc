import { Metadata } from 'next'
import { SEO_CONFIG } from '@/lib/seo/config'
import {
  StateForeignQualificationContent,
  StateForeignQualificationPage,
} from '../_components/state-foreign-qualification-page'

const content: StateForeignQualificationContent = {
  state: 'California',
  slug: 'california',
  pllcPrice: 905,
  pcPrice: 905,
  intro:
    'California professional practices often use a professional corporation because California generally does not allow an LLC to render licensed professional services. We review the California record and licensing rules before preparing the New York Application for Authority, NYSED consent, and six-week publication.',
  whoThisIsFor: [
    'California professional corporations that need authority to practice or operate in New York.',
    'California entities whose owners need a review before choosing the New York foreign PC or foreign PLLC path.',
    'Practices hiring licensed professionals in New York or opening a New York location.',
    'Owners who need New York authority for credentialing, banking, or client contracts.',
  ],
  documents: [
    'Current California entity legal name.',
    'California Secretary of State entity number, if available.',
    'Articles of Incorporation or other formation document, if you have it.',
    'Shareholder, officer, director, member, or manager license information.',
    'Desired New York assumed name, if the California name may not meet New York rules.',
  ],
  eligibilityNuance:
    'California generally does not permit domestic or foreign LLCs to render licensed professional services. Many California applicants therefore use the foreign PC path in New York. We confirm the entity type and profession before filing rather than assuming that an LLC can qualify as a foreign PLLC.',
  whatWeCheck:
    'We review the California entity record, certified formation document, professional purpose, ownership, licenses, and legal name. A California Certificate of Status and certified formation copy normally cost $5 each; we obtain the standard documents needed for the New York filing.',
  professions: [
    'mental health professionals',
    'physicians',
    'dentists',
    'psychologists',
    'nurse practitioners',
    'physical therapists',
    'architects',
    'engineers',
    'other licensed professionals',
  ],
  stateCta:
    'Send us the California entity name and profession. We will review the record and tell you whether the New York foreign PC or foreign PLLC path applies.',
  faqs: [
    {
      question:
        'Can a California professional corporation do business in New York?',
      answer:
        'An eligible California professional corporation can apply for authority in New York as a foreign professional corporation. We review its purpose, shareholders, licenses, and name before filing.',
    },
    {
      question: 'Can a California LLC qualify as a foreign PLLC in New York?',
      answer:
        'It depends on what the LLC is legally allowed to do and what its formation documents say. California generally does not permit an LLC to render licensed professional services, so many California practices need the foreign PC path instead. We review the actual entity before advising which New York filing fits.',
    },
    {
      question:
        'Can my California professional corporation become a New York PLLC?',
      answer:
        'No. Foreign qualification does not change the entity from a corporation into an LLC. A California professional corporation stays on the foreign PC path.',
    },
    {
      question: 'What California documents are needed?',
      answer:
        'The standard review uses a current California Certificate of Status and a certified copy of the formation document. We obtain those records as part of the package.',
    },
    {
      question: 'Will I need an assumed name in New York?',
      answer:
        'Possibly. If the California legal name does not meet New York professional naming rules, we can file a Certificate of Assumed Name. That service is $199.',
    },
    {
      question: 'Does the $905 price include publication?',
      answer:
        'Yes. The flat package includes the required six-week legal notice publication in two newspapers, collection of the affidavits, and Certificate of Publication filing.',
    },
    {
      question: 'Do I still need a New York professional license?',
      answer:
        'Yes. Entity authority does not replace the individual licenses required to practice a profession in New York.',
    },
  ],
}

export const metadata: Metadata = {
  title:
    'California PC/Professional Entity Foreign Qualification in NY | NYPLLC',
  description:
    'Qualify an eligible California professional corporation or professional entity in New York. NYSED, DOS filing, and six-week publication included. $905 flat.',
  keywords: [
    'California professional corporation foreign qualification New York',
    'California PC do business in New York',
    'California professional entity New York authority',
    'California PLLC New York',
    'foreign professional corporation New York',
  ],
  alternates: { canonical: `${SEO_CONFIG.siteUrl}/foreign-pllc/california` },
}

export default function CaliforniaForeignPLLCPage() {
  return <StateForeignQualificationPage content={content} />
}
