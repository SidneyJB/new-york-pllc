import {
  HeroSection,
  FeaturesSection,
  ProcessSection,
  GuaranteeSection,
  DisclaimerSection,
  CTASection
} from '@/components/sections'
import { AboutBlurbSection } from '@/components/sections/blurb'

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturesSection />
			<AboutBlurbSection />
      {/* <ProcessSection /> */}
      <GuaranteeSection />
      <DisclaimerSection />
      <CTASection />
    </div>
  )
}
