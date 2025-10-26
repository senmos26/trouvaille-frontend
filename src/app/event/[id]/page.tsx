"use client"

import { useState, use } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, MapPin, Users, ArrowLeft, Clock, Mail, CheckCircle, X, Tag, AlertCircle, Share2, Copy, Facebook, Twitter, Linkedin, Send } from "lucide-react"
import { useEvent } from "@/lib/hooks/use-events"
import { useCreateRegistration, useCheckEmailExists } from "@/lib/hooks/use-registrations"

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
      "https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=800",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800"
    ],
    highlights: [
      "Session interactive en direct avec des experts",
      "Networking virtuel en salles de discussion",
      "Enregistrement disponible après l'événement",
      "Certificat de participation numérique",
      "Accès aux ressources exclusives et replays",
      "Chat en direct pour poser vos questions"
    ],
    program: [
      { time: "18:00", title: "Ouverture et présentation" },
      { time: "18:10", title: "Introduction au thème" },
      { time: "18:25", title: "Interventions des experts" },
      { time: "19:00", title: "Session Q&A interactive" },
      { time: "19:30", title: "Networking en salles virtuelles" },
      { time: "19:50", title: "Clôture et ressources" }
    ],
    tags: ["Innovation", "Santé Mentale", "Technologie", "Afrique"],
    featured: true
  },
  "2": {
    id: 2,
    title: "Webinaire : Leadership Jeunesse",
    description: "Un webinaire interactif pour développer vos compétences en leadership et apprendre à mobiliser votre communauté pour un impact durable.",
    date: "2025-11-20",
    time: "14h30",
    location: "En ligne (Zoom)",
    rubrique: "Leadership",
    category: "Webinaire",
    themes: "Jeunes et monde professionnel",
    intervenants: ["Wilfried Konn N'TOUGAN", "Roméo HOTAN", "Paul Kouassi AVITE"],
    moderateurs: ["Abel ALOUA"],
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop",
    participants: 500,
    price: "Gratuit",
    images: [
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800"
    ],
    highlights: [
      "Session interactive en direct avec des experts",
      "Networking virtuel en salles de discussion",
      "Enregistrement disponible après l'événement",
      "Certificat de participation numérique",
      "Accès aux ressources exclusives et replays"
    ],
    program: [
      { time: "14:30", title: "Accueil et introduction" },
      { time: "14:45", title: "Leadership et jeunesse africaine" },
      { time: "15:20", title: "Table ronde des intervenants" },
      { time: "15:50", title: "Questions-réponses" },
      { time: "16:15", title: "Clôture" }
    ],
    tags: ["Leadership", "Jeunesse", "Professionnel", "Carrière"],
    featured: false
  },
  "3": {
    id: 3,
    title: "Webinaire : Entrepreneuriat Africain",
    description: "Rejoignez en ligne des entrepreneurs à succès et des investisseurs pour échanger sur les opportunités d'affaires en Afrique.",
    date: "2025-12-05",
    time: "16h00",
    location: "En ligne (Zoom)",
    rubrique: "Entrepreneuriat",
    category: "Webinaire",
    themes: "L'amour existe t-il? Il s'il d'agir ou faut-il attendre pour s'engager?",
    intervenants: ["MISTER FARID", "N'JNA LUMEN", "Eudes TEUBISSIEH"],
    moderateurs: ["Françoise MOAPKPLINE"],
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop",
    participants: 500,
    price: "Gratuit",
    images: [
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800"
    ],
    highlights: [
      "Session interactive en direct avec des experts",
      "Networking virtuel en salles de discussion",
      "Enregistrement disponible après l'événement",
      "Certificat de participation numérique"
    ],
    program: [
      { time: "16:00", title: "Ouverture" },
      { time: "16:10", title: "Présentation du thème" },
      { time: "16:30", title: "Interventions" },
      { time: "17:00", title: "Discussion" },
      { time: "17:30", title: "Conclusion" }
    ],
    tags: ["Entrepreneuriat", "Investissement", "Business", "Afrique"],
    featured: true
  }
}

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", organization: "" })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSharePopup, setShowSharePopup] = useState(false)
  const [copied, setCopied] = useState(false)
  const [emailError, setEmailError] = useState("")

  // Déballer les paramètres avec React.use()
  const resolvedParams = use(params)

  // Récupérer l'événement depuis Supabase
  const { data: eventData, isLoading, error } = useEvent(resolvedParams.id)
  
  // Hooks pour l'inscription
  const createRegistrationMutation = useCreateRegistration()
  const checkEmailMutation = useCheckEmailExists()
  
  // Fallback vers données mockées si pas de données Supabase
  const event = eventData || mockEventData[resolvedParams.id as keyof typeof mockEventData] || mockEventData["1"]
  
  // États de chargement et d'erreur
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FFD700] mx-auto mb-4"></div>
          <p className="text-[#0A1128]">Chargement de l'événement...</p>
        </div>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#0A1128] mb-4">Événement introuvable</h2>
          <p className="text-gray-600 mb-6">Cet événement n'existe pas ou a été supprimé.</p>
          <Link href="/events" className="px-6 py-3 bg-[#FFD700] text-[#0A1128] font-bold rounded-lg hover:bg-[#E6C200] transition-all">
            Retour aux événements
          </Link>
        </div>
      </div>
    )
  }
  
  // URL de l'événement pour le partage
  const eventUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = `Rejoignez-moi pour "${event.title}" le ${new Date(event.date).toLocaleDateString('fr-FR')}`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setEmailError("")

    try {
      // Vérifier si l'email existe déjà pour cet événement
      const emailCheck = await checkEmailMutation.mutateAsync({
        eventId: event.id,
        email: formData.email
      })

      if (emailCheck.success && emailCheck.data) {
        setEmailError("Cette adresse email est déjà inscrite à cet événement.")
        setIsSubmitting(false)
        return
      }

      // Créer l'inscription
      const result = await createRegistrationMutation.mutateAsync({
        event_id: event.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.organization,
        position: "", // Pas de champ position dans le formulaire actuel
        motivation: "" // Pas de champ motivation dans le formulaire actuel
      })

      if (result.success) {
        setSubmitted(true)
        setTimeout(() => {
          setShowRegistrationForm(false)
          setSubmitted(false)
          setFormData({ name: "", email: "", phone: "", organization: "" })
          setEmailError("")
        }, 3000)
      } else {
        setEmailError(result.error || "Une erreur est survenue lors de l'inscription.")
      }
    } catch (error) {
      console.error('Error during registration:', error)
      setEmailError("Une erreur est survenue lors de l'inscription. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(eventUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + eventUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(eventUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(eventUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(event.title)}&body=${encodeURIComponent(shareText + '\n\n' + eventUrl)}`
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <section className="relative h-[70vh] overflow-hidden">
        <img 
          src={event.gallery?.[0]?.image_url || event.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200"} 
          alt={event.title} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/80 via-[#0A1128]/40 to-transparent" />
        
        {/* Boutons retour et partage */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 text-[#0A1128] rounded-lg font-medium hover:bg-white transition-all backdrop-blur-sm"
          >
            <ArrowLeft size={18} />
            Retour à la galerie
          </Link>
          
          <button
            onClick={() => setShowSharePopup(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 text-[#0A1128] rounded-lg font-medium hover:bg-white transition-all backdrop-blur-sm hover:scale-105"
          >
            <Share2 size={18} />
            <span className="hidden sm:inline">Partager</span>
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex gap-3 mb-4 flex-wrap">
                <span className="px-4 py-1.5 bg-[#FFD700] text-[#0A1128] rounded-full font-semibold text-sm">
                  {event.category?.name || event.category}
                </span>
                {(event.category?.name === "Webinaire" || event.category === "Webinaire") && event.rubrique && (
                  <span className="px-4 py-1.5 bg-white/10 text-white backdrop-blur-sm border border-white/30 rounded-full font-semibold text-sm">
                    {event.rubrique?.name || event.rubrique}
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                {event.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Calendar size={20} />
                  <span className="font-medium">{new Date(event.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={20} />
                  <span className="font-medium">{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={20} />
                  <span className="font-medium">{event.location}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-[2fr_1fr] gap-12">
            {/* Main Content */}
            <div>
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12"
              >
                {(event.category?.name === "Webinaire" || event.category === "Webinaire") && event.rubrique && (
                  <div className="inline-block px-4 py-1.5 bg-[#0A1128]/10 text-[#0A1128] rounded-full text-sm font-semibold mb-4">
                    {event.rubrique?.name || event.rubrique}
                  </div>
                )}
                <h2 className="text-3xl font-bold mb-6">
                  {(event.category?.name === "Webinaire" || event.category === "Webinaire") ? "À propos du webinaire" : "À propos de l'événement"}
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{event.description}</p>
                
                <div className="p-5 bg-gradient-to-r from-[#0A1128]/5 to-[#0A1128]/3 border-l-4 border-[#0A1128] rounded-lg">
                  <div className="text-sm font-semibold text-[#0A1128] mb-2">Thèmes abordés</div>
                  <div className="text-foreground font-medium">{event.themes}</div>
                </div>
              </motion.div>

              {/* Intervenants et Modérateurs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="mb-12"
              >
                <h3 className="text-2xl font-bold mb-6">Intervenants & Modérateurs</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Intervenants */}
                  <div className="p-6 bg-gray-50 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-[#0A1128]" />
                      <h4 className="font-bold text-lg">Intervenants</h4>
                    </div>
                    <ul className="space-y-3">
                      {event.speakers?.map((speaker: any, idx: number) => (
                        <li key={idx} className="flex items-center gap-3 text-muted-foreground">
                          <Users size={16} className="text-[#0A1128] flex-shrink-0" />
                          <span className="font-medium">{speaker.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Modérateurs */}
                  <div className="p-6 bg-gray-50 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-[#0A1128]" />
                      <h4 className="font-bold text-lg">Modérateurs</h4>
                    </div>
                    <ul className="space-y-3">
                      {event.moderators?.map((moderator: any, idx: number) => (
                        <li key={idx} className="flex items-center gap-3 text-muted-foreground">
                          <Users size={16} className="text-[#0A1128] flex-shrink-0" />
                          <span className="font-medium">{moderator.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Points forts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="mb-12"
              >
                <h3 className="text-2xl font-bold mb-6">Points forts & Bénéfices</h3>
                <div className="grid gap-4">
                  {event.highlights?.map((highlight: any, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl shadow-sm border border-gray-200"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#0A1128] mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{highlight.highlight || highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            

              {/* Programme */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                <h3 className="text-2xl font-bold mb-6">Programme du webinaire</h3>
                <div className="space-y-3">
                  {event.program?.map((item: any, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-sm"
                    >
                      <div className="flex items-center gap-2 text-[#0A1128] font-bold whitespace-nowrap">
                        <Clock size={18} />
                        {item.time}
                      </div>
                      <div className="font-semibold text-foreground">{item.title}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gray-50 rounded-2xl p-8 shadow-xl border border-gray-200 sticky top-24"
              >
                <h3 className="text-xl font-bold mb-6">Informations pratiques</h3>
                
                <div className="space-y-5 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Calendar size={18} className="text-[#0A1128]" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-muted-foreground uppercase tracking-wide mb-1">Date & Heure</div>
                      <div className="font-bold text-sm">{new Date(event.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</div>
                      <div className="font-medium text-sm text-muted-foreground">{event.time}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <MapPin size={18} className="text-[#0A1128]" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-muted-foreground uppercase tracking-wide mb-1">Format</div>
                      <div className="font-bold text-sm">{event.location}</div>
                      <div className="text-xs text-muted-foreground mt-1">Lien envoyé après inscription</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Users size={18} className="text-[#0A1128]" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-muted-foreground uppercase tracking-wide mb-1">Participants</div>
                      <div className="font-bold text-sm">{event.participants} inscrits</div>
                    </div>
                  </div>

                  {event.tags && event.tags.length > 0 && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Tag size={18} className="text-[#0A1128]" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-xs text-muted-foreground uppercase tracking-wide mb-2">Tags</div>
                        <div className="flex flex-wrap gap-2">
                          {event.tags?.map((tag: any, idx: number) => (
                            <Link 
                              key={idx} 
                              href={`/events?tag=${encodeURIComponent(tag.tag?.name || tag.name || tag)}`}
                              className="px-3 py-1.5 bg-white text-[#0A1128] text-xs font-medium rounded-full shadow-sm border border-gray-200 hover:bg-[#0A1128] hover:text-white hover:border-[#0A1128] transition-all duration-200 hover:scale-105 cursor-pointer"
                            >
                              #{tag.tag?.name || tag.name || tag}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t pt-6">
                  <div className="text-3xl font-bold text-[#FFD700] mb-2">{event.price}</div>
                  <p className="text-xs text-muted-foreground mb-4">Participation 100% en ligne</p>
                  <button
                    onClick={() => setShowRegistrationForm(true)}
                    className="w-full py-4 bg-[#FFD700] text-[#0A1128] font-bold rounded-xl hover:bg-[#E6C200] transition-all hover:scale-105 hover:shadow-lg"
                  >
                    S'inscrire au webinaire
                  </button>
                  <p className="text-xs text-center text-muted-foreground mt-3 flex items-center justify-center gap-1">
                    <Mail size={14} />
                    Lien de connexion envoyé par email
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Share Popup */}
      {showSharePopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#0A1128]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowSharePopup(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0A1128] to-[#172B4D] text-white p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Share2 size={20} />
                  <h3 className="text-xl font-bold">Partager l'événement</h3>
                </div>
                <button
                  onClick={() => setShowSharePopup(false)}
                  className="p-1.5 hover:bg-white/10 rounded-full transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* QR Code */}
              <div className="flex flex-col items-center mb-6">
                <div className="bg-white p-3 rounded-xl shadow-md border-2 border-[#FFD700]/20 mb-3">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(eventUrl)}`}
                    alt="QR Code"
                    className="w-32 h-32"
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Scannez ce code QR pour accéder à l'événement
                </p>
              </div>

              {/* Share Options */}
              <div className="space-y-3">
                <h4 className="font-bold text-base mb-3">Partager via</h4>
                
                <div className="grid grid-cols-2 gap-2">
                  {/* WhatsApp */}
                  <a
                    href={shareLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 rounded-lg transition-all hover:scale-105 group"
                  >
                    <div className="p-1.5 bg-[#25D366] rounded-md text-white">
                      <Send size={16} />
                    </div>
                    <span className="font-semibold text-sm text-[#25D366]">WhatsApp</span>
                  </a>

                  {/* Facebook */}
                  <a
                    href={shareLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 rounded-lg transition-all hover:scale-105 group"
                  >
                    <div className="p-1.5 bg-[#1877F2] rounded-md text-white">
                      <Facebook size={16} />
                    </div>
                    <span className="font-semibold text-sm text-[#1877F2]">Facebook</span>
                  </a>

                  {/* Twitter */}
                  <a
                    href={shareLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 rounded-lg transition-all hover:scale-105 group"
                  >
                    <div className="p-1.5 bg-[#1DA1F2] rounded-md text-white">
                      <Twitter size={16} />
                    </div>
                    <span className="font-semibold text-sm text-[#1DA1F2]">Twitter</span>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={shareLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 rounded-lg transition-all hover:scale-105 group"
                  >
                    <div className="p-1.5 bg-[#0A66C2] rounded-md text-white">
                      <Linkedin size={16} />
                    </div>
                    <span className="font-semibold text-sm text-[#0A66C2]">LinkedIn</span>
                  </a>

                  {/* Email */}
                  <a
                    href={shareLinks.email}
                    className="flex items-center gap-2 p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all hover:scale-105 group"
                  >
                    <div className="p-1.5 bg-gray-700 rounded-md text-white">
                      <Mail size={16} />
                    </div>
                    <span className="font-semibold text-sm text-gray-700">Email</span>
                  </a>

                  {/* Copy Link */}
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 p-3 bg-[#FFD700]/10 hover:bg-[#FFD700]/20 rounded-lg transition-all hover:scale-105 group"
                  >
                    <div className="p-1.5 bg-[#FFD700] rounded-md text-[#0A1128]">
                      {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                    </div>
                    <span className="font-semibold text-sm text-[#0A1128]">
                      {copied ? 'Copié !' : 'Copier'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Registration Modal */}
      {showRegistrationForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#0A1128]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowRegistrationForm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-[#0A1128] to-[#172B4D] text-white p-6 rounded-t-3xl">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold mb-1">Inscription à l'événement</h3>
                  <p className="text-white/80 text-sm">{event.title}</p>
                </div>
                <button
                  onClick={() => setShowRegistrationForm(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-all"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-white" />
                  </div>
                  <h4 className="text-3xl font-bold mb-3">Inscription réussie !</h4>
                  <p className="text-lg text-muted-foreground mb-4">
                    Vous recevrez un email avec le lien de connexion Zoom.
                  </p>
                  <div className="p-4 bg-[#FFD700]/10 rounded-xl inline-block">
                    <p className="text-sm font-semibold text-[#FFD700] mb-2 flex items-center justify-center gap-2">
                      <Mail size={16} />
                      Vérifiez votre boîte mail
                    </p>
                    <p className="text-xs text-muted-foreground">Le lien sera envoyé 24h avant l'événement</p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nom complet *</label>
                    <input
                      type="text"
                      placeholder="Votre nom complet"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 outline-none transition-all"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      placeholder="votre.email@exemple.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({...formData, email: e.target.value})
                        setEmailError("")
                      }}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-[#FFD700]/20 outline-none transition-all ${
                        emailError ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#FFD700]'
                      }`}
                      required
                    />
                    {emailError && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {emailError}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone *</label>
                    <input
                      type="tel"
                      placeholder="+225 07 00 00 00 00"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 outline-none transition-all"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Organisation</label>
                    <input
                      type="text"
                      placeholder="Votre organisation (optionnel)"
                      value={formData.organization}
                      onChange={(e) => setFormData({...formData, organization: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 outline-none transition-all"
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
                          ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                          : 'bg-[#FFD700] text-[#0A1128] hover:bg-[#E6C200]'
                      }`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#0A1128]"></div>
                          Inscription en cours...
                        </div>
                      ) : (
                        'Confirmer l\'inscription'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
