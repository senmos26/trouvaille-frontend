"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight, MapPin, Clock, UserCheck, Search, Filter, Calendar, CalendarX, X, ChevronDown, Check } from "lucide-react"
import { useEvents } from "@/lib/hooks/use-events"
import { useEventCategories, useEventRubriques } from "@/lib/hooks/use-categories"

export default function EventsPage() {
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
  const rubriques = ["Toutes", ...(rubriquesData || [])]

  // Type pour les événements avec propriétés étendues
  type EventWithTime = {
    time?: string
    date?: string
    category?: { name: string } | string
    [key: string]: unknown
  }

  // Helper functions pour accéder aux propriétés de manière sécurisée
  const getCategoryName = (category?: { name: string } | string) => {
    return typeof category === 'string' ? category : category?.name || ''
  }

  const getRubriqueName = (rubrique?: { name: string } | string) => {
    return typeof rubrique === 'string' ? rubrique : rubrique?.name || ''
  }

  const getEventTime = (event: EventWithTime) => {
    return event.time || ''
  }

  const getEventDate = (event: EventWithTime) => {
    return event.date || ''
  }

  const getEventCategory = (event: EventWithTime) => {
    return event.category
  }
  
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

  // Filtrage et recherche (les données viennent déjà filtrées de Supabase)
  let filteredEvents = eventsData?.data || []
  
  // Filtrage local supplémentaire si nécessaire
  if (selectedTag) {
    filteredEvents = filteredEvents.filter((event: { tags?: Array<{ tag?: { name?: string } }> }) => 
      event.tags?.some((tag: { tag?: { name?: string } }) => tag.tag?.name?.toLowerCase() === selectedTag.toLowerCase())
    )
  }

  // Filtrage par rubrique (local car l'API ne gère pas encore ce filtre)
  if (selectedRubriqueId) {
    filteredEvents = filteredEvents.filter((event: { rubrique?: { id: string } }) => 
      event.rubrique?.id === selectedRubriqueId
    )
  }
  
  // Tri
  if (sortBy === "date") {
    filteredEvents = [...filteredEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  } else if (sortBy === "title") {
    filteredEvents = [...filteredEvents].sort((a, b) => a.title.localeCompare(b.title))
  }

  // Pagination
  const visibleEvents = filteredEvents.slice(0, displayCount)
  const hasMore = filteredEvents.length > displayCount

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 6)
  }

  // Réinitialiser displayCount quand les filtres changent
  const resetDisplayCount = () => {
    setDisplayCount(6)
  }

  // Fonction pour gérer la sélection de catégorie
  const handleCategorySelect = (category: { name: string; id: string }) => {
    setSelectedCategory(category.name)
    setSelectedCategoryId(category.id)
    setSelectedRubrique("Toutes")
    setSelectedRubriqueId("")
    resetDisplayCount()
  }

  // Fonction pour gérer la sélection de rubrique
  const handleRubriqueSelect = (rubrique: { name: string; id: string }) => {
    setSelectedRubrique(rubrique.name)
    setSelectedRubriqueId(rubrique.id)
    resetDisplayCount()
  }

  // Fonction pour réinitialiser tous les filtres
  const resetAllFilters = () => {
    setSearchQuery("")
    setSelectedCategory("")
    setSelectedCategoryId("")
    setSelectedTag("")
    setSelectedRubrique("Toutes")
    setSelectedRubriqueId("")
    resetDisplayCount()
  }

  // Statistiques dynamiques
  const totalEvents = eventsData?.total || 0
  const totalParticipants = filteredEvents.reduce((sum: number, event: { participants?: number }) => sum + (event.participants || 0), 0)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-[#0A1128] to-[#172B4D] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#FFD700 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        </div>
        <div className="container relative z-10 pt-20 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Texte à gauche */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Nos <span className="text-[#FFD700]">Événements</span>
                <br />
                à venir
              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                Rejoignez-nous lors de nos événements pour échanger, apprendre et construire 
                ensemble l&apos;avenir de l&apos;Afrique. Chaque rencontre est une opportunité de créer 
                des liens durables et de développer des projets concrets.
              </p>
            </motion.div>

            {/* Stats cards à droite */}
            <div className="grid grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-[#FFD700] rounded-2xl p-10 hover:bg-[#E6C200] transition-all shadow-2xl"
              >
                <div className="flex flex-col items-center justify-center text-center h-full">
                  <div className="text-9xl font-bold text-[#0A1128] mb-4 leading-none">{totalEvents}</div>
                  <div className="text-2xl text-[#0A1128] font-bold">Événements</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-[#FFD700] rounded-2xl p-10 hover:bg-[#E6C200] transition-all shadow-2xl"
              >
                <div className="flex flex-col items-center justify-center text-center h-full">
                  <div className="text-9xl font-bold text-[#0A1128] mb-4 leading-none">{totalParticipants}</div>
                  <div className="text-2xl text-[#0A1128] font-bold">Participants</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Événements */}
      <section className="py-20 bg-white">
        <div className="container">
          {/* En-tête avec compteur */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A1128] mb-2">
              {selectedTag 
                ? `Événements #${selectedTag}`
                : selectedCategory 
                ? `Événements ${selectedCategory}` 
                : 'Tous les événements'}
            </h2>
            <p className="text-lg text-muted-foreground">
              {filteredEvents.length} événement{filteredEvents.length > 1 ? 's' : ''} à venir
            </p>
            
            {/* Tag actif */}
            {selectedTag && (
              <div className="mt-4">
                <button
                  onClick={() => {
                    setSelectedTag("")
                    resetDisplayCount()
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A1128] text-white rounded-full text-sm font-semibold hover:bg-[#0A1128]/80 transition-all"
                >
                  Filtré par : #{selectedTag}
                  <span className="text-lg">×</span>
                </button>
              </div>
            )}
          </div>

          {/* Barre de recherche et filtres */}
          <motion.div 
            className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Recherche */}
            <div className="flex gap-4 mb-6 flex-wrap items-center">
              <div className="flex-1 min-w-[250px] relative">
                <Search 
                  size={20} 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0A1128]"
                />
                <input
                  type="text"
                  placeholder="Rechercher un événement, lieu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0A1128] focus:ring-2 focus:ring-[#0A1128]/20 outline-none transition-all"
                />
              </div>
              
              {/* Tri Popover */}
              <div className="relative min-w-[200px]">
                <button
                  onClick={() => setShowSortPopover(!showSortPopover)}
                  className="w-full flex items-center justify-between gap-2 pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl hover:border-[#0A1128] focus:border-[#0A1128] focus:ring-2 focus:ring-[#0A1128]/20 outline-none transition-all bg-white"
                >
                  <Filter 
                    size={20} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0A1128]"
                  />
                  <span className="text-gray-700 font-medium">
                    {sortBy === "date" ? "Trier par date" : "Trier par titre"}
                  </span>
                  <ChevronDown 
                    size={18} 
                    className={`text-[#0A1128] transition-transform ${showSortPopover ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Popover Menu */}
                {showSortPopover && (
                  <>
                    {/* Overlay */}
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowSortPopover(false)}
                    />
                    
                    {/* Menu */}
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border-2 border-gray-200 shadow-xl z-50 overflow-hidden"
                    >
                      <div className="py-2">
                        {[
                          { value: "date", label: "Trier par date", icon: Calendar },
                          { value: "title", label: "Trier par titre", icon: Filter }
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setSortBy(option.value)
                              setShowSortPopover(false)
                            }}
                            className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors ${
                              sortBy === option.value ? 'bg-[#FFD700]/10' : ''
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <option.icon size={18} className="text-[#0A1128]" />
                              <span className="text-sm font-medium text-gray-700">
                                {option.label}
                              </span>
                            </div>
                            {sortBy === option.value && (
                              <Check size={18} className="text-[#FFD700]" />
                            )}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </div>

              {/* Bouton Réinitialiser */}
              {(searchQuery || selectedCategory || selectedTag || selectedRubrique !== "Toutes") && (
                <button
                  onClick={resetAllFilters}
                  className="inline-flex items-center gap-2 px-4 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all whitespace-nowrap"
                  title="Réinitialiser tous les filtres"
                >
                  <X size={18} />
                  Réinitialiser
                </button>
              )}
            </div>

            {/* Filtres de catégories */}
            <div className="flex gap-2 flex-wrap items-center mb-4">
              <span className="text-sm font-semibold text-gray-700 mr-2">
                Catégories :
              </span>
              <button
                onClick={() => {
                  setSelectedCategory("")
                  setSelectedCategoryId("")
                  setSelectedRubrique("Toutes")
                  setSelectedRubriqueId("")
                  resetDisplayCount()
                }}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  !selectedCategory
                    ? 'bg-[#0A1128] text-white'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-[#0A1128]'
                }`}
              >
                Tous
              </button>
              {categories.map((category: { id: string; name: string }) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedCategory === category.name
                      ? 'bg-[#0A1128] text-white'
                      : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-[#0A1128]'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Filtres de rubriques (seulement pour Webinaires) */}
            {selectedCategory === "Webinaire" && (
              <div className="flex gap-2 flex-wrap items-center pt-4 border-t border-gray-200">
                <span className="text-sm font-semibold text-gray-700 mr-2">
                  Rubriques :
                </span>
                <button
                  onClick={() => {
                    setSelectedRubrique("Toutes")
                    setSelectedRubriqueId("")
                    resetDisplayCount()
                  }}
                  className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                    selectedRubrique === "Toutes"
                      ? 'bg-[#FFD700] text-[#0A1128]'
                      : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-[#FFD700]'
                  }`}
                >
                  Toutes
                </button>
                {rubriques.filter(rubrique => typeof rubrique !== 'string').map((rubrique: { id: string; name: string }) => (
                  <button
                    key={rubrique.id}
                    onClick={() => handleRubriqueSelect(rubrique)}
                    className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                      selectedRubrique === rubrique.name
                        ? 'bg-[#FFD700] text-[#0A1128]'
                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-[#FFD700]'
                    }`}
                  >
                    {rubrique.name}
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Événements Grid */}
          {visibleEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleEvents.map((event: { id: string; image: string; title: string; date: string; location?: string; participants?: number; category?: { name: string }; rubrique?: { name: string }; speakers?: Array<{ name: string }>; moderators?: Array<{ name: string }>; description?: string; highlights?: Array<string>; tags?: Array<{ tag?: { name: string } }> }, index: number) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image 
                      src={event.image} 
                      alt={event.title}
                      width={400}
                      height={224}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/60 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 bg-[#FFD700] text-[#0A1128] rounded-full text-xs font-bold">
                        {getCategoryName(event.category)}
                      </span>
                      {getCategoryName(event.category) === "Webinaire" && event.rubrique && (
                        <span className="px-3 py-1 bg-[#0A1128] text-white rounded-full text-xs font-bold">
                          {getRubriqueName(event.rubrique)}
                        </span>
                      )}
                    </div>
                    {/* Date badge */}
                    <div className="absolute top-4 right-4 bg-white rounded-lg p-2 text-center shadow-lg">
                      <div className="text-2xl font-bold text-[#0A1128] leading-none">
                        {new Date(event.date || '').getDate()}
                      </div>
                      <div className="text-xs font-semibold text-gray-600 uppercase">
                        {new Date(event.date || '').toLocaleDateString('fr-FR', { month: 'short' })}
                      </div>
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Titre */}
                    <h3 className="text-xl font-bold text-[#0A1128] mb-3 line-clamp-2">
                      {event.title}
                    </h3>
                    
                    {/* Description (pour les webinaires) */}
                    {getCategoryName(event.category) === "Webinaire" && event.description && (
                      <div className="mb-3">
                        <h4 className="text-xs font-bold text-[#0A1128] mb-1">Description :</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                      </div>
                    )}

                    {/* Intervenants (pour les webinaires) */}
                    {event.category?.name === "Webinaire" && event.speakers && event.speakers.length > 0 && (
                      <div className="mb-3 flex-1">
                        <h4 className="text-xs font-bold text-[#0A1128] mb-1">Intervenants :</h4>
                        <div className="flex flex-wrap gap-1">
                          {event.speakers.slice(0, 2).map((speaker: { name: string }, idx: number) => (
                            <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {speaker.name}
                            </span>
                          ))}
                          {event.speakers.length > 2 && (
                            <span className="text-xs text-[#FFD700] font-semibold">
                              +{event.speakers.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Modérateurs (pour les webinaires) */}
                    {event.category?.name === "Webinaire" && event.moderators && event.moderators.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-xs font-bold text-[#0A1128] mb-1">Modérateurs :</h4>
                        <p className="text-xs text-muted-foreground">{event.moderators.map((m: { name: string }) => m.name).join(", ")}</p>
                      </div>
                    )}

                    {/* Description (pour les non-webinaires) */}
                    {event.category?.name !== "Webinaire" && (
                      <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">
                        {event.description}
                      </p>
                    )}

                    {/* Détails */}
                    <div className="space-y-2 mb-4 pt-3 border-t">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={16} className="text-[#0A1128]" />
                        <span>{event.location}</span>
                      </div>
                      {getEventTime(event) && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock size={16} className="text-[#0A1128]" />
                          <span>{getEventTime(event)}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <UserCheck size={16} className="text-[#0A1128]" />
                        <span>{event.participants || 0} inscrits</span>
                      </div>
                    </div>

                    {/* Tags */}
                    {event.tags && event.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {event.tags.slice(0, 3).map((tag: { tag?: { name: string }; name?: string }, idx: number) => (
                          <Link
                            key={idx}
                            href={`/events?tag=${encodeURIComponent(tag.tag?.name || tag.name || '')}`}
                            className="px-2 py-1 bg-[#0A1128]/5 text-[#0A1128] text-xs font-medium rounded hover:bg-[#0A1128] hover:text-white transition-all"
                          >
                            #{tag.tag?.name || tag.name || ''}
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Bouton - Toujours en bas */}
                    <div className="mt-auto pt-4">
                      <Link 
                        href={`/event/${event.id}`}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-[#FFD700] text-[#0A1128] font-bold rounded-xl hover:bg-[#E6C200] transition-all hover:scale-105"
                      >
                        S&apos;inscrire maintenant
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="flex justify-center mb-6">
                <CalendarX size={80} className="text-gray-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                {selectedTag 
                  ? `Aucun événement avec le tag #${selectedTag}`
                  : selectedCategory 
                  ? `Aucun événement ${selectedCategory}` 
                  : 'Aucun événement à venir'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {selectedTag || selectedCategory
                  ? 'Essayez une autre catégorie ou consultez tous nos événements.'
                  : 'De nouveaux événements seront bientôt programmés. Restez connecté !'}
              </p>
              {(selectedTag || selectedCategory) && (
                <button 
                  onClick={resetAllFilters}
                  className="px-8 py-3 bg-[#FFD700] text-[#0A1128] font-bold rounded-xl hover:bg-[#E6C200] transition-all"
                >
                  Voir tous les événements
                </button>
              )}
            </div>
          )}

          {/* Bouton Voir plus */}
          {hasMore && (
            <div className="text-center mt-12">
              <button 
                onClick={handleLoadMore}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFD700] text-[#0A1128] font-bold rounded-xl hover:bg-[#E6C200] hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                Voir plus d&apos;événements
                <ArrowRight size={20} />
              </button>
              <p className="mt-4 text-muted-foreground text-sm">
                {visibleEvents.length} sur {filteredEvents.length} événements affichés
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Section Événements passés */}
      <section className="py-20 bg-gray-50">
      <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
           
              Nos événements passés
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez les moments forts de nos précédents événements et 
              l&apos;impact qu&apos;ils ont eu sur notre communauté.
        </p>
      </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {filteredEvents.slice(0, 4).map((event: { id: string; image: string; title: string }) => (
              <Link key={event.id} href="/gallery">
                <motion.div 
                  className="relative h-48 rounded-xl overflow-hidden cursor-pointer group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image 
                    src={event.image}
                    alt={event.title}
                    width={300}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="font-semibold text-sm mb-1">{event.title}</div>
                    <div className="text-xs opacity-80">
                      {new Date(getEventDate(event)).toLocaleDateString('fr-FR', { 
                        year: 'numeric', 
                        month: 'long' 
                      })}
                    </div>
                    <div className="inline-block mt-2 px-2 py-0.5 bg-[#FFD700]/20 text-[#FFD700] text-xs rounded">
                      {getCategoryName(getEventCategory(event))}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link 
              href="/gallery"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFD700] text-[#0A1128] font-bold rounded-xl shadow-lg hover:bg-[#E6C200] hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              
              Voir toute la galerie d&apos;événements
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Newsletter */}
      <section className="py-20 bg-gradient-to-br from-[#0A1128] to-[#172B4D] text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
           
            Ne manquez aucun événement
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Inscrivez-vous à notre newsletter pour être informé en avant-première 
            de tous nos événements et opportunités.
          </p>
          
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border-2 border-white/30 text-white placeholder:text-white/60 focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 outline-none transition-all"
            />
            <button className="px-6 py-3 bg-[#FFD700] text-[#0A1128] font-bold rounded-lg hover:bg-[#E6C200] transition-all whitespace-nowrap">
              S&apos;inscrire
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
