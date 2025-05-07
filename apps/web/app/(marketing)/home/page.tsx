import { AppShowcase } from './_components/app-showcase'
import { CtaSection } from './_components/cta-section'
import { FeatureSection } from './_components/feature-section'
import { Header } from './_components/header'
import { HeroSection } from './_components/hero-section'
import { SmoothScrollHelper } from './_components/smooth-scroll-helper'
import { TestimonialSection } from './_components/testimonial-section'
import { UniqueSellingPoints } from './_components/unique-selling-points'

export default function LandingPage() {
  return (
    <>
      <Header />
      <SmoothScrollHelper />
      <main className="scroll-smooth">
        <HeroSection />
        <FeatureSection />
        <AppShowcase />
        <UniqueSellingPoints />
        <TestimonialSection />
        <CtaSection />
      </main>
    </>
  )
}
