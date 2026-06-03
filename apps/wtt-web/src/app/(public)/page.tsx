import { packages, upcomingDepartures } from '@/data/packages'
import HeroCarousel from '@/components/landing/HeroCarousel'
import DiscoveryStrips from '@/components/landing/DiscoveryStrips'
import FeaturedPackages from '@/components/landing/FeaturedPackages'
import ByDeity from '@/components/landing/ByDeity'
import ByRegion from '@/components/landing/ByRegion'
import JyotirlingasStrip from '@/components/landing/JyotirlingasStrip'
import HowItWorks from '@/components/landing/HowItWorks'
import FestivalPilgrimages from '@/components/landing/FestivalPilgrimages'
import UpcomingDepartures from '@/components/landing/UpcomingDepartures'
import TrustSignals from '@/components/landing/TrustSignals'
import Reviews from '@/components/landing/Reviews'
import VillageExperiences from '@/components/landing/VillageExperiences'
import LandingCTA from '@/components/landing/LandingCTA'

export default function LandingPage() {
  return (
    <>
      {/* 1. Hero Carousel */}
      <HeroCarousel />

      {/* 2. Discovery strips — package types + states */}
      <DiscoveryStrips />

      {/* 3. Featured packages carousel */}
      <FeaturedPackages packages={packages.filter(p => p.isActive)} departures={upcomingDepartures} />

      {/* 4. By Deity tabs */}
      <ByDeity packages={packages.filter(p => p.isActive)} />

      {/* 5. By Region cards */}
      <ByRegion />

      {/* 6. Jyotirlingas strip */}
      <JyotirlingasStrip />

      {/* 7. How it works */}
      <HowItWorks />

      {/* 8. Festival pilgrimages */}
      <FestivalPilgrimages />

      {/* 9. Upcoming departures */}
      <UpcomingDepartures />

      {/* 10. Trust signals */}
      <TrustSignals />

      {/* 11. Reviews */}
      <Reviews />

      {/* 12. Village experiences */}
      <VillageExperiences />

      {/* 13. Final CTA */}
      <LandingCTA />
    </>
  )
}
