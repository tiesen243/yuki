import { createMetadata } from '@/lib/metadata'
import { AppShowcase } from './_components/app-showcase'
import { CtaSection } from './_components/cta-section'
import { FeatureSection } from './_components/feature-section'
import { HeroSection } from './_components/hero-section'
import { SmoothScrollHelper } from './_components/smooth-scroll-helper'
import { TestimonialSection } from './_components/testimonial-section'
import { UniqueSellingPoints } from './_components/unique-selling-points'

export default function LandingPage() {
  return (
    <>
      <SmoothScrollHelper />
      <main>
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

export const metadata = createMetadata({
  title: 'Yuki - Comprehensive E-Commerce Platform',
  description:
    'Discover Yuki, your ultimate shopping destination. Explore our extensive catalog featuring fashion, electronics, home goods, and more with personalized recommendations tailored to your preferences.',
  openGraph: { url: '/home' },
})
