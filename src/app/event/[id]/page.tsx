import type { Metadata } from "next"
import EventDetailClient from "./EventDetailClient"

export async function generateMetadata(): Promise<Metadata> {
  // Ici vous pourriez récupérer les données de l'événement depuis l'API
  // Pour l'instant, nous utilisons des métadonnées par défaut
  return {
    title: `Événement | La Trouvaille`,
    description: "Découvrez cet événement exceptionnel organisé par La Trouvaille. Rejoignez-nous pour une expérience d'apprentissage unique.",
    openGraph: {
      title: `Événement | La Trouvaille`,
      description: "Découvrez cet événement exceptionnel organisé par La Trouvaille. Rejoignez-nous pour une expérience d'apprentissage unique.",
    images: [
        {
          url: '/images/la_trouvaille.png',
          width: 1200,
          height: 630,
          alt: 'La Trouvaille - Événement',
        },
      ],
    },
    twitter: {
      title: `Événement | La Trouvaille`,
      description: "Découvrez cet événement exceptionnel organisé par La Trouvaille.",
      images: ['/images/la_trouvaille.png'],
    },
  }
}

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <EventDetailClient params={params} />
}