import HeroSection from "./landing-page/components/HeroSection"
import AboutSection from "./landing-page/components/AboutSection"
import EventsSection from "./landing-page/components/EventsSection"
import ArticlesSection from "./landing-page/components/ArticlesSection"
import TestimonialSection from "./landing-page/components/TestimonialSection"
import CtaSection from "./landing-page/components/CtaSection"

export default function Home() {
  return (
    <>
      <HeroSection />
      <EventsSection />
      <AboutSection />
      <ArticlesSection />
      <TestimonialSection />
      <CtaSection />
    </>
  )
}
