"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight, MapPin, Clock, UserCheck, Search, Filter, Calendar, CalendarX, ChevronDown } from "lucide-react"
import { useEvents } from "@/lib/hooks/use-events"
import { useEventCategories, useEventRubriques } from "@/lib/hooks/use-categories"

function EventsPageContent() {
  const searchParams = useSearchParams()
  const tagFromUrl = searchParams.get('tag')

  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("")
  const [selectedRubrique, setSelectedRubrique] = useState<string>("Toutes")
  const [selectedRubriqueId, setSelectedRubriqueId] = useState<string>("")
  const [selectedTag, setSelectedTag] = useState<string>(tagFromUrl || "")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [sortBy, setSortBy] = useState<string>("date")
  const [displayCount, setDisplayCount] = useState(6)
  const [showSortPopover, setShowSortPopover] = useState(false)

  // Hooks Supabase
  const { data: eventsData, isLoading: eventsLoading, error: eventsError } = useEvents({
    limit: displayCount,
    category_id: selectedCategoryId || undefined,
    rubrique_id: selectedRubriqueId || undefined,
    search: searchQuery || undefined
  })

  const { data: categoriesData } = useEventCategories()
  const { data: rubriquesData } = useEventRubriques()

  // Mettre à jour selectedTag quand l'URL change
  useEffect(() => {
    if (tagFromUrl) {
      setSelectedTag(tagFromUrl)
    }
  }, [tagFromUrl])

  const categories = categoriesData || []
  const rubriques = ["Toutes", ...(rubriquesData?.map((rubrique: { name: string }) => rubrique.name) || [])]

  // Type pour les événements avec propriétés étendues
  type EventWithTime = {
    id: string
    title?: string
    description?: string
    image?: string
    location?: string
    participants?: number
    time?: string
    date?: string
    category?: { name: string } | string
    rubrique?: { name: string } | string
    tags?: Array<{ name?: string; tag?: { name: string } } | string>
    [key: string]: unknown
  }

  // Helper functions pour accéder aux propriétés de manière sécurisée
  const getCategoryName = (category?: { name: string } | string) => {
    return typeof category === 'string' ? category : category?.name || ''
  }

  const getRubriqueName = (rubrique?: { name: string } | string) => {
    return typeof rubrique === 'string' ? rubrique : rubrique?.name || ''
  }

  // Filtrer les événements
  const filteredEvents = eventsData?.data?.filter((event: EventWithTime) => {
    const matchesCategory = !selectedCategory || getCategoryName(event.category) === selectedCategory
    const matchesRubrique = selectedRubrique === "Toutes" || getRubriqueName(event.rubrique) === selectedRubrique
    const matchesTag = !selectedTag || event.tags?.some((tag: { name?: string; tag?: { name: string } } | string) => {
      const tagName = typeof tag === 'string' ? tag : (tag.tag?.name || tag.name || '')
      return tagName.toLowerCase().includes(selectedTag.toLowerCase())
    })
    const matchesSearch = !searchQuery || 
      event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesRubrique && matchesTag && matchesSearch
  }) || []

  // Trier les événements
  const sortedEvents = [...filteredEvents].sort((a: EventWithTime, b: EventWithTime) => {
    switch (sortBy) {
      case "date":
        return new Date(a.date || '').getTime() - new Date(b.date || '').getTime()
      case "participants":
        return (b.participants || 0) - (a.participants || 0)
      case "title":
        return (a.title || '').localeCompare(b.title || '')
      default:
        return 0
    }
  })

  // Gestion des états de chargement et d'erreur
  if (eventsLoading) {
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

  if (eventsError) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#0A1128] mb-4">Erreur de chargement</h2>
            <p className="text-gray-600">Impossible de charger les événements. Veuillez réessayer plus tard.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-[#0A1128] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#FFD700 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        </div>
        <div className="container relative z-10 text-center py-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Nos <span className="text-[#FFD700]">Événements</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Découvrez nos formations, conférences et ateliers conçus pour développer vos compétences et élargir votre réseau professionnel.
          </p>
        </div>
      </section>

      {/* Filtres et recherche */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Barre de recherche */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher un événement..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FFD700] focus:border-transparent text-lg"
              />
            </div>

            {/* Filtres */}
            <div className="flex flex-wrap gap-4 mb-8">
              {/* Filtre par catégorie */}
              <div className="relative">
                <button
                  onClick={() => setShowSortPopover(!showSortPopover)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                >
                  <Filter size={18} />
                  <span>Catégorie</span>
                  <ChevronDown size={16} />
                </button>
                {showSortPopover && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    <div className="p-2">
                      <button
                        onClick={() => {
                          setSelectedCategory("")
                          setSelectedCategoryId("")
                          setShowSortPopover(false)
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-all ${
                          !selectedCategory ? 'bg-[#FFD700]/20 text-[#0A1128]' : ''
                        }`}
                      >
                        Toutes les catégories
                      </button>
                      {categories.map((category: { id: string; name: string }) => (
                        <button
                          key={category.id}
                          onClick={() => {
                            setSelectedCategory(category.name)
                            setSelectedCategoryId(category.id)
                            setShowSortPopover(false)
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-all ${
                            selectedCategory === category.name ? 'bg-[#FFD700]/20 text-[#0A1128]' : ''
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Filtre par rubrique */}
              <div className="flex gap-2">
                {rubriques.map((rubrique: string) => (
                  <button
                    key={rubrique}
                    onClick={() => {
                      setSelectedRubrique(rubrique)
                      setSelectedRubriqueId(rubrique === "Toutes" ? "" : rubrique)
                    }}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      selectedRubrique === rubrique
                        ? 'bg-[#FFD700] text-[#0A1128] font-semibold'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {rubrique}
                  </button>
                ))}
              </div>

              {/* Tri */}
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Trier par:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                >
                  <option value="date">Date</option>
                  <option value="participants">Participants</option>
                  <option value="title">Titre</option>
                </select>
              </div>
            </div>

            {/* Résultats */}
            <div className="text-center mb-8">
              <p className="text-gray-600">
                {sortedEvents.length} événement{sortedEvents.length > 1 ? 's' : ''} trouvé{sortedEvents.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Liste des événements */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {sortedEvents.length === 0 ? (
              <div className="text-center py-20">
                <CalendarX size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-2xl font-bold text-[#0A1128] mb-2">Aucun événement trouvé</h3>
                <p className="text-gray-600 mb-6">Essayez de modifier vos critères de recherche.</p>
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("")
                    setSelectedCategoryId("")
                    setSelectedRubrique("Toutes")
                    setSelectedRubriqueId("")
                    setSelectedTag("")
                  }}
                  className="px-6 py-3 bg-[#FFD700] text-[#0A1128] rounded-lg font-semibold hover:bg-[#E6C200] transition-all"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedEvents.map((event: EventWithTime) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
                  >
                    <div className="relative h-48 overflow-hidden group">
                      <Image 
                        src={event.image || '/images/placeholder-event.jpg'}
                        alt={event.title || 'Événement'} 
                        width={400}
                        height={192}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        unoptimized={!!(event.image && (event.image.includes('supabase.co/storage') || event.image.includes('storage/v1/object/public')))}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                        <span className="px-3 py-1 bg-[#FFD700] text-[#0A1128] text-sm font-semibold rounded-full">
                          {getCategoryName(event.category)}
                        </span>
                        <span className="px-3 py-1 bg-white/90 text-[#0A1128] text-sm font-semibold rounded-full">
                          {getRubriqueName(event.rubrique)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-[#0A1128] mb-2 line-clamp-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                        {event.description}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar size={16} />
                          <span>
                            {new Date(event.date || '').toLocaleDateString('fr-FR', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock size={16} />
                          <span>{(event as EventWithTime).time || 'À confirmer'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin size={16} />
                          <span>{event.location || 'Lieu à confirmer'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <UserCheck size={16} />
                          <span>{event.participants || 0} participants</span>
                        </div>
                      </div>

                      {/* Tags */}
                      {event.tags && event.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {event.tags.slice(0, 3).map((tag: { name?: string; tag?: { name: string } } | string, index: number) => {
                            const tagName = typeof tag === 'string' ? tag : (tag.tag?.name || tag.name || '')
                            return (
                              <span 
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                              >
                                {tagName}
                              </span>
                            )
                          })}
                        </div>
                      )}

                      <div className="mt-auto pt-4">
                        <Link 
                          href={`/event/${event.id}`}
                          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FFD700] text-[#0A1128] font-semibold rounded-lg hover:bg-[#E6C200] transition-all hover:scale-105"
                        >
                          Voir les détails
                          <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Bouton "Voir plus" */}
            {sortedEvents.length >= displayCount && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setDisplayCount(prev => prev + 6)}
                  className="px-8 py-3 bg-[#FFD700] text-[#0A1128] rounded-lg font-semibold hover:bg-[#E6C200] transition-all hover:scale-105"
                >
                  Voir plus d&apos;événements
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section événements passés */}
      {sortedEvents.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-[#0A1128] text-center mb-12">
                Événements Récents
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {sortedEvents.slice(0, 4).map((event: EventWithTime) => (
                  <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
                    <div className="relative h-32 overflow-hidden">
                      <Image 
                        src={event.image || '/images/placeholder-event.jpg'}
                        unoptimized={!!(event.image && (event.image.includes('supabase.co/storage') || event.image.includes('storage/v1/object/public')))} 
                        alt={event.title || 'Événement'} 
                        width={300}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-[#0A1128] mb-2 line-clamp-2">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {new Date((event as EventWithTime).date || '').toLocaleDateString('fr-FR')}
                      </p>
                      <p className="text-sm text-gray-500">
                        {getCategoryName((event as EventWithTime).category) || 'Événement'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default function EventsPageClient() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FFD700]"></div>
          </div>
        </div>
      </div>
    }>
      <EventsPageContent />
    </Suspense>
  )
}
