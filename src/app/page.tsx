import type { Metadata } from "next"
import HeroSection from "./landing-page/components/HeroSection"
import AboutSection from "./landing-page/components/AboutSection"
import EventsSection from "./landing-page/components/EventsSection"
import ArticlesSection from "./landing-page/components/ArticlesSection"
import TestimonialSection from "./landing-page/components/TestimonialSection"
import CtaSection from "./landing-page/components/CtaSection"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trouvaille-frontend-zeta.vercel.app'
const ogImageUrl = `${siteUrl}/images/la_trouvaille.png`

export const metadata: Metadata = {
  title: "La Trouvaille - Accueil | Plateforme d'Innovation et d'Apprentissage",
  description: "Rejoignez La Trouvaille, la plateforme qui transforme votre façon d'apprendre et d'innover. Découvrez nos événements, formations et opportunités de développement au Maroc.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteUrl,
    title: "La Trouvaille - Accueil | Plateforme d'Innovation et d'Apprentissage",
    description: "Rejoignez La Trouvaille, la plateforme qui transforme votre façon d'apprendre et d'innover. Découvrez nos événements, formations et opportunités de développement au Maroc.",
    siteName: 'La Trouvaille',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'La Trouvaille - Accueil',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "La Trouvaille - Accueil | Plateforme d'Innovation et d'Apprentissage",
    description: "Rejoignez La Trouvaille, la plateforme qui transforme votre façon d'apprendre et d'innover.",
    images: [ogImageUrl],
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
