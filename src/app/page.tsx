import type { Metadata } from "next"
import HeroSection from "./landing-page/components/HeroSection"
import AboutSection from "./landing-page/components/AboutSection"
import EventsSection from "./landing-page/components/EventsSection"
import ArticlesSection from "./landing-page/components/ArticlesSection"
import TestimonialSection from "./landing-page/components/TestimonialSection"
import CtaSection from "./landing-page/components/CtaSection"

export const metadata: Metadata = {
  title: "La Trouvaille - Accueil | Plateforme d'Innovation et d'Apprentissage",
  description: "Rejoignez La Trouvaille, la plateforme qui transforme votre façon d'apprendre et d'innover. Découvrez nos événements, formations et opportunités de développement au Maroc.",
  openGraph: {
    title: "La Trouvaille - Accueil | Plateforme d'Innovation et d'Apprentissage",
    description: "Rejoignez La Trouvaille, la plateforme qui transforme votre façon d'apprendre et d'innover. Découvrez nos événements, formations et opportunités de développement au Maroc.",
    images: [
      {
        url: '/images/la_trouvaille.png',
        width: 1200,
        height: 630,
        alt: 'La Trouvaille - Accueil',
      },
    ],
  },
  twitter: {
    title: "La Trouvaille - Accueil | Plateforme d'Innovation et d'Apprentissage",
    description: "Rejoignez La Trouvaille, la plateforme qui transforme votre façon d'apprendre et d'innover.",
    images: ['/images/la_trouvaille.png'],
  },
}

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
