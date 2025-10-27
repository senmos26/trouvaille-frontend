import type { Metadata } from "next"
import EventsPageClient from "./EventsPageClient"

export const metadata: Metadata = {
  title: "Événements | La Trouvaille - Découvrez nos formations et conférences",
  description: "Découvrez tous nos événements, formations et conférences. Participez à des sessions d'apprentissage et de networking avec La Trouvaille.",
  openGraph: {
    title: "Événements | La Trouvaille - Découvrez nos formations et conférences",
    description: "Découvrez tous nos événements, formations et conférences. Participez à des sessions d'apprentissage et de networking avec La Trouvaille.",
    images: [
      {
        url: '/images/la_trouvaille.png',
        width: 1200,
        height: 630,
        alt: 'La Trouvaille - Événements',
      },
    ],
  },
  twitter: {
    title: "Événements | La Trouvaille - Découvrez nos formations et conférences",
    description: "Découvrez tous nos événements, formations et conférences. Participez à des sessions d'apprentissage et de networking.",
    images: ['/images/la_trouvaille.png'],
  },
}

export default function EventsPage() {
  return <EventsPageClient />
}