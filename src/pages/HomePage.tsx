import { AboutSection } from '../components/home/AboutSection'
import { CtaSection } from '../components/home/CtaSection'
import { FeaturedProperties } from '../components/home/FeaturedProperties'
import { Hero } from '../components/home/Hero'
import { ServicesSection } from '../components/home/ServicesSection'
import { TeamSection } from '../components/home/TeamSection'
import { WhySection } from '../components/home/WhySection'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function HomePage() {
  useDocumentTitle()

  return (
    <>
      <Hero />
      <FeaturedProperties />
      <AboutSection />
      <ServicesSection />
      <WhySection />
      <TeamSection />
      <CtaSection />
    </>
  )
}
