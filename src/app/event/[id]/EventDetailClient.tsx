"use client"

import { useState, use } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, MapPin, Users, ArrowLeft, Clock, CheckCircle, X, Tag, Share2, Copy, Facebook, Twitter, Linkedin, Send } from "lucide-react"
import { useEvent } from "@/lib/hooks/use-events"
import { useCreateRegistration } from "@/lib/hooks/use-registrations"

// Données mockées pour fallback
const mockEventData = {
  "1": {
    id: 1,
    title: "Webinaire : Innovation en Afrique",
    description: "Découvrez les dernières innovations technologiques qui transforment le continent africain et leurs impacts sur l'économie locale.",
    date: "2025-11-15",
    time: "18h00",
    location: "En ligne (Zoom)",
    rubrique: "Innovation",
    category: "Webinaire",
    themes: "La santé mentale (dans notre société)",
    intervenants: ["Emmanuel ABINA", "Nahila TSHAMANDJOU", "Marc ZEZAI"],
    moderateurs: ["Abel ALOUA", "Françoise MOAPKPLINE"],
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
    participants: 500,
    price: "Gratuit",
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200",
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800"
    ],
    highlights: [
      "Panel d'experts internationaux",
      "Cas d'études concrets",
      "Session de questions-réponses",
      "Réseautage virtuel"
    ],
    program: [
      { time: "18h00", activity: "Accueil et introduction" },
      { time: "18h15", activity: "Présentation des intervenants" },
      { time: "18h30", activity: "Panel principal : Innovation en Afrique" },
      { time: "19h30", activity: "Questions-réponses" },
      { time: "20h00", activity: "Réseautage virtuel" }
    ],
    tags: ["Innovation", "Technologie", "Afrique", "Économie", "Développement"]
  }
}

interface EventDetailClientProps {
  params: Promise<{ id: string }>
}

export default function EventDetailClient({ params }: EventDetailClientProps) {
  const resolvedParams = use(params)
  const eventId = resolvedParams.id

  // Récupérer l'événement depuis Supabase
  const { data: eventData, isLoading, error } = useEvent(eventId)
  
  // Fallback vers données mockées si pas de données Supabase
  const event = eventData || mockEventData[eventId as keyof typeof mockEventData] || mockEventData["1"]

  // États pour le formulaire d'inscription
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)

  // Hook pour l'inscription
  const createRegistrationMutation = useCreateRegistration()

  // Fonction pour gérer l'inscription
  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await createRegistrationMutation.mutateAsync({
        event_id: eventId,
        email,
        name,
        phone: phone || undefined
      })
      
      setRegistrationSuccess(true)
      setShowRegistrationForm(false)
      setEmail("")
      setName("")
      setPhone("")
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Fonction pour partager
  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = event.title

    let shareUrl = ""
    
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`
        break
      case "copy":
        navigator.clipboard.writeText(url)
        return
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400")
    }
    
    setShowShareModal(false)
  }

  // Fonction helper pour obtenir le texte des highlights
  const getHighlightText = (highlight: string | { highlight?: string }) => {
    return typeof highlight === 'string' ? highlight : highlight.highlight || ''
  }

  // Fonction helper pour obtenir le nom d'un speaker/moderator
  const getSpeakerName = (speaker: { name?: string; title?: string } | string) => {
    return typeof speaker === 'string' ? speaker : speaker.name || 'Inconnu'
  }

  // Fonction helper pour obtenir le titre d'un speaker/moderator
  const getSpeakerTitle = (speaker: { name?: string; title?: string } | string) => {
    return typeof speaker === 'string' ? 'Expert' : speaker.title || 'Expert'
  }

  // Fonction helper pour obtenir le nom d'un tag
  const getTagName = (tag: { name?: string; tag?: { name: string } } | string) => {
    if (typeof tag === 'string') return tag
    return tag.tag?.name || tag.name || 'Tag'
  }

  // Gestion des états de chargement et d'erreur
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FFD700]"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#0A1128] mb-4">Erreur de chargement</h2>
            <p className="text-gray-600">Impossible de charger l&apos;événement. Veuillez réessayer plus tard.</p>
            <Link href="/events" className="mt-4 inline-block px-6 py-3 bg-[#FFD700] text-[#0A1128] rounded-lg font-semibold hover:bg-[#E6C200] transition-all">
              Retour aux événements
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Bouton retour */}
      <div className="container mx-auto px-4 py-6">
        <Link 
          href="/events" 
          className="inline-flex items-center gap-2 text-[#0A1128] hover:text-[#FFD700] transition-colors"
        >
          <ArrowLeft size={20} />
          Retour aux événements
        </Link>
      </div>

      {/* Hero Image */}
      <section className="relative h-[70vh] overflow-hidden">
        <Image 
          src={event.gallery?.[0]?.image_url || event.image} 
          alt={event.title} 
          width={1200}
          height={700}
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/80 via-[#0A1128]/40 to-transparent" />
        
        {/* Boutons retour et partage */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
          <Link 
            href="/events" 
            className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all"
          >
            <ArrowLeft size={18} />
            Retour
          </Link>
          
          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all"
          >
            <Share2 size={18} />
            Partager
          </button>
        </div>

        {/* Contenu principal */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto">
            <div className="max-w-4xl">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {event.tags?.map((tag: { name?: string; tag?: { name: string } } | string, index: number) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-[#FFD700]/20 text-[#FFD700] text-sm font-semibold rounded-full"
                  >
                    {getTagName(tag)}
                  </span>
                ))}
              </div>

              {/* Titre */}
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {event.title}
              </h1>

              {/* Informations principales */}
              <div className="flex flex-wrap gap-6 text-white/90 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar size={20} />
                  <span>{new Date(event.date).toLocaleDateString('fr-FR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={20} />
                  <span>{event.time || 'À confirmer'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={20} />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={20} />
                  <span>{event.participants || 0} participants</span>
                </div>
              </div>

              {/* Bouton d'inscription */}
              <div className="flex gap-4">
                <button
                  onClick={() => setShowRegistrationForm(true)}
                  className="px-8 py-4 bg-[#FFD700] text-[#0A1128] font-bold rounded-xl hover:bg-[#E6C200] transition-all hover:scale-105 hover:shadow-lg"
                >
                  S&apos;inscrire maintenant
                </button>
                <button
                  onClick={() => setShowShareModal(true)}
                  className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-[#0A1128] transition-all"
                >
                  Partager l&apos;événement
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contenu principal */}
              <div className="lg:col-span-2 space-y-12">
                {/* Description */}
                <div>
                  <h2 className="text-3xl font-bold text-[#0A1128] mb-6">À propos de cet événement</h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {event.description}
                  </p>
                </div>

                {/* Intervenants */}
                {event.speakers && event.speakers.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold text-[#0A1128] mb-6">Intervenants</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {event.speakers.map((speaker: { name?: string; title?: string } | string, index: number) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center text-[#0A1128] font-bold">
                            {getSpeakerName(speaker).charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#0A1128]">{getSpeakerName(speaker)}</h4>
                            <p className="text-gray-600 text-sm">{getSpeakerTitle(speaker)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modérateurs */}
                {event.moderators && event.moderators.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold text-[#0A1128] mb-6">Modérateurs</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {event.moderators.map((moderator: { name?: string; title?: string } | string, index: number) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="w-12 h-12 bg-[#0A1128] rounded-full flex items-center justify-center text-white font-bold">
                            {getSpeakerName(moderator).charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#0A1128]">{getSpeakerName(moderator)}</h4>
                            <p className="text-gray-600 text-sm">{getSpeakerTitle(moderator)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Points forts */}
                {event.highlights && event.highlights.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold text-[#0A1128] mb-6">Points forts</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {event.highlights.map((highlight: string | { highlight?: string }, index: number) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-[#FFD700]/10 rounded-lg">
                          <CheckCircle className="w-6 h-6 text-[#FFD700] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{getHighlightText(highlight)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Programme */}
                {event.program && event.program.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold text-[#0A1128] mb-6">Programme</h3>
                    <div className="space-y-4">
                      {event.program.map((item: { time: string; activity: string }, index: number) => (
                        <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="w-20 text-[#FFD700] font-bold text-sm">
                            {item.time}
                          </div>
                          <div className="flex-1 text-gray-700">
                            {item.activity}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Galerie d'images */}
                {event.gallery && event.gallery.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold text-[#0A1128] mb-6">Galerie</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {event.gallery.slice(0, 6).map((photo: { image_url: string; alt_text?: string }, index: number) => (
                        <div key={index} className="aspect-square overflow-hidden rounded-lg">
                          <Image
                            src={photo.image_url}
                            alt={`${event.title} - Image ${index + 1}`}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Informations de l'événement */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-[#0A1128] mb-4">Détails de l&apos;événement</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-[#FFD700]" />
                      <div>
                        <p className="font-semibold text-[#0A1128]">Date</p>
                        <p className="text-gray-600">
                          {new Date(event.date).toLocaleDateString('fr-FR', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-[#FFD700]" />
                      <div>
                        <p className="font-semibold text-[#0A1128]">Heure</p>
                        <p className="text-gray-600">{event.time || 'À confirmer'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-[#FFD700]" />
                      <div>
                        <p className="font-semibold text-[#0A1128]">Lieu</p>
                        <p className="text-gray-600">{event.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-[#FFD700]" />
                      <div>
                        <p className="font-semibold text-[#0A1128]">Participants</p>
                        <p className="text-gray-600">{event.participants || 0} inscrits</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Tag className="w-5 h-5 text-[#FFD700]" />
                      <div>
                        <p className="font-semibold text-[#0A1128]">Prix</p>
                        <p className="text-gray-600">{event.price || 'Gratuit'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bouton d'inscription */}
                <div className="bg-[#FFD700]/10 p-6 rounded-xl text-center">
                  <h3 className="text-xl font-bold text-[#0A1128] mb-4">Rejoignez-nous !</h3>
                  <p className="text-gray-700 mb-6">
                    Ne ratez pas cette opportunité unique d&apos;apprendre et de réseauter.
                  </p>
                  <button
                    onClick={() => setShowRegistrationForm(true)}
                    className="w-full px-6 py-3 bg-[#FFD700] text-[#0A1128] font-bold rounded-lg hover:bg-[#E6C200] transition-all hover:scale-105"
                  >
                    S&apos;inscrire maintenant
                  </button>
                </div>

                {/* Tags */}
                {event.tags && event.tags.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-[#0A1128] mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag: { name?: string; tag?: { name: string } } | string, index: number) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full hover:bg-[#FFD700] hover:text-[#0A1128] transition-colors cursor-pointer"
                        >
                          {getTagName(tag)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal d'inscription */}
      {showRegistrationForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#0A1128]">Inscription à l&apos;événement</h2>
              <button
                onClick={() => setShowRegistrationForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleRegistration} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0A1128] mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                  placeholder="Votre nom complet"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0A1128] mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0A1128] mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                  placeholder="+212 6XX XXX XXX"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowRegistrationForm(false)}
                  className="flex-1 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-[2] py-3 font-bold rounded-xl transition-all hover:scale-105 hover:shadow-lg ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-[#FFD700] text-[#0A1128] hover:bg-[#E6C200]'
                  }`}
                >
                  {isSubmitting ? 'Inscription...' : 'Confirmer l\'inscription'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Modal de partage */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#0A1128]">Partager l&apos;événement</h2>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleShare('facebook')}
                className="flex items-center justify-center gap-3 p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
              >
                <Facebook size={24} />
                Facebook
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="flex items-center justify-center gap-3 p-4 bg-blue-400 text-white rounded-xl hover:bg-blue-500 transition-all"
              >
                <Twitter size={24} />
                Twitter
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="flex items-center justify-center gap-3 p-4 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-all"
              >
                <Linkedin size={24} />
                LinkedIn
              </button>
              <button
                onClick={() => handleShare('whatsapp')}
                className="flex items-center justify-center gap-3 p-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all"
              >
                <Send size={24} />
                WhatsApp
              </button>
              <button
                onClick={() => handleShare('copy')}
                className="flex items-center justify-center gap-3 p-4 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all col-span-2"
              >
                <Copy size={24} />
                Copier le lien
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Message de succès */}
      {registrationSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          <div className="flex items-center gap-2">
            <CheckCircle size={20} />
            <span>Inscription réussie !</span>
          </div>
        </div>
      )}
    </div>
  )
}
