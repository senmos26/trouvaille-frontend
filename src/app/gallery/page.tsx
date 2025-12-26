"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, MapPin, Users, Filter, Camera, Search, X, ChevronDown, Check } from "lucide-react"
import { useEvents } from "../../../lib/hooks/use-events"
import { useEventCategories, useEventRubriques } from "../../../lib/hooks/use-categories"

export default function GalleryPage() {
  const { data: eventsData, isLoading: eventsLoading, error: eventsError } = useEvents()
  const { data: categoriesData } = useEventCategories()
  const { data: rubriquesData } = useEventRubriques()
  
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [selectedRubrique, setSelectedRubrique] = useState("Toutes")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [showSortPopover, setShowSortPopover] = useState(false)
  
  // Utiliser uniquement les données Supabase
  const displayEvents = eventsData?.data || []
  const categories = ["Tous", ...(categoriesData?.map((cat: { name: string }) => cat.name) || [])]
  const rubriques = ["Toutes", ...(rubriquesData?.map((rub: { name: string }) => rub.name) || [])]

  // Type pour les événements avec toutes les propriétés nécessaires
  type GalleryEvent = {
    id: string
    title: string
    gallery?: Array<{ image_url: string; alt_text?: string | null }>
    category?: { name: string } | string
    rubrique?: { name: string } | string
    created_at?: string
    date?: string
    location?: string
    participants?: number
  }

  // Helper functions pour accéder aux propriétés de manière sécurisée
  const getCategoryName = (category?: { name: string } | string) => {
    return typeof category === 'string' ? category : category?.name || ''
  }

  const getRubriqueName = (rubrique?: { name: string } | string) => {
    return typeof rubrique === 'string' ? rubrique : rubrique?.name || ''
  }

  // Filtrage par catégorie
  let filteredEvents: GalleryEvent[] = selectedCategory === "Tous" 
    ? displayEvents 
    : displayEvents.filter((event: GalleryEvent) => getCategoryName(event.category) === selectedCategory)

  // Si Webinaire est sélectionné, filtrer aussi par rubrique
  if (selectedCategory === "Webinaire" && selectedRubrique !== "Toutes") {
    filteredEvents = filteredEvents.filter((event: GalleryEvent) => getRubriqueName(event.rubrique) === selectedRubrique)
  }

  // Recherche
  if (searchQuery) {
    filteredEvents = filteredEvents.filter((event: GalleryEvent) => 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.location || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      getCategoryName(event.category).toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  // Tri
  if (sortBy === "date") {
    filteredEvents = [...filteredEvents].sort((a: GalleryEvent, b: GalleryEvent) => 
      new Date(b.created_at || b.date || '').getTime() - new Date(a.created_at || a.date || '').getTime()
    )
  } else if (sortBy === "title") {
    filteredEvents = [...filteredEvents].sort((a: GalleryEvent, b: GalleryEvent) => a.title.localeCompare(b.title))
  } else if (sortBy === "photos") {
    filteredEvents = [...filteredEvents].sort((a: GalleryEvent, b: GalleryEvent) => (b.gallery?.length || 0) - (a.gallery?.length || 0))
  }

  const totalEvents = filteredEvents.length
  const totalPhotos = filteredEvents.reduce((sum: number, event: GalleryEvent) => sum + (event.gallery?.length || 0), 0)

  // Gestion des états de chargement et d'erreur
  if (eventsLoading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFD700] mx-auto mb-4"></div>
          <p className="text-[#0A1128]">Chargement de la galerie...</p>
        </div>
      </div>
    )
  }

  if (eventsError) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Erreur lors du chargement de la galerie</p>
          <p className="text-gray-600">Veuillez réessayer plus tard</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-[#0A1128] to-[#172B4D] text-white overflow-hidden">
       
        <div className="container relative z-10 pt-20 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Texte à gauche */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
             
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Nos Événements <br />
                en <span className="text-[#FFD700]">Images</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                Revivez les moments forts de nos événements qui façonnent l&apos;avenir de l&apos;Afrique. 
                Découvrez les rencontres, les échanges et les projets qui transforment notre continent.
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
                  <div className="text-9xl font-bold text-[#0A1128] mb-4 leading-none">{totalPhotos}</div>
                  <div className="text-2xl text-[#0A1128] font-bold">Photos</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-[#FFD700] rounded-2xl p-10 hover:bg-[#E6C200] transition-all shadow-2xl"
              >
                <div className="flex flex-col items-center justify-center text-center h-full">
                  <div className="text-9xl font-bold text-[#0A1128] mb-4 leading-none">{totalEvents}</div>
                  <div className="text-2xl text-[#0A1128] font-bold">Événements</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Barre de recherche et filtres */}
      <section className="pt-6 pb-8 bg-white sticky top-[72px] z-40 border-b border-gray-200 shadow-sm">
        <div className="container">
          <motion.div 
            className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Recherche et tri */}
            <div className="flex gap-4 mb-6 flex-wrap items-center">
              <div className="flex-1 min-w-[250px] relative">
                <Search 
                  size={20} 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0A1128]"
                />
                <input
                  type="text"
                  placeholder="Rechercher un événement, lieu, catégorie..."
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
                    {sortBy === "date" ? "Trier par date" : sortBy === "title" ? "Trier par titre" : "Trier par nb. photos"}
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
                          { value: "title", label: "Trier par titre", icon: Filter },
                          { value: "photos", label: "Trier par nb. photos", icon: Camera }
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
              {(searchQuery || selectedCategory !== "Tous" || selectedRubrique !== "Toutes") && (
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("Tous")
                    setSelectedRubrique("Toutes")
                  }}
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
              {categories.map((cat: string) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat)
                    setSelectedRubrique("Toutes") // Réinitialiser la rubrique
                  }}
                  className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#0A1128] text-white'
                      : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-[#0A1128]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Filtres de rubriques (seulement pour Webinaires) */}
            {selectedCategory === "Webinaire" && (
              <div className="flex gap-2 flex-wrap items-center pt-4 border-t border-gray-200">
                <span className="text-sm font-semibold text-gray-700 mr-2">
                  Rubriques :
                </span>
                {rubriques.map(rubrique => (
                  <button
                    key={rubrique}
                    onClick={() => setSelectedRubrique(rubrique)}
                    className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                      selectedRubrique === rubrique
                        ? 'bg-[#FFD700] text-[#0A1128]'
                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-[#FFD700]'
                    }`}
                  >
                    {rubrique}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-2">Nos événements passés</h2>
            <p className="text-center text-muted-foreground">
              {filteredEvents.length} événement{filteredEvents.length > 1 ? 's' : ''} trouvé{filteredEvents.length > 1 ? 's' : ''}
            </p>
          </div>
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event: GalleryEvent) => (
              <Link key={event.id} href={`/gallery/${event.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={event.gallery?.[0]?.image_url || 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800'} 
                    alt={event.title}
                    width={400}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1.5 bg-[#FFD700] text-[#0A1128] rounded-full font-semibold text-xs">
                      {getCategoryName(event.category)}
                    </span>
                    {getCategoryName(event.category) === "Webinaire" && event.rubrique && (
                      <span className="px-3 py-1.5 bg-[#0A1128] text-white rounded-full font-semibold text-xs">
                        {getRubriqueName(event.rubrique)}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs font-semibold text-[#0A1128]">
                    {event.gallery?.length || 0} photos
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0A1128] mb-3">{event.title}</h3>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-[#0A1128]" />
                      {new Date(event.created_at || event.date || '').toLocaleDateString('fr-FR', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-[#0A1128]" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-[#0A1128]" />
                      {event.participants || 0} participants
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-4 gap-2">
                    {(event.gallery || []).slice(1, 5).map((photo: { image_url: string }, idx: number) => (
                      <div 
                        key={idx} 
                        className="aspect-square rounded-lg overflow-hidden relative group"
                      >
                        <Image src={photo.image_url} alt="" width={100} height={100} className="w-full h-full object-cover" />
                        {/* Indicateur "+X photos" sur la dernière miniature */}
                        {idx === 3 && (event.gallery?.length || 0) > 5 && (
                          <div className="absolute inset-0 bg-[#0A1128]/80 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              +{(event.gallery?.length || 0) - 5}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
              </Link>
            ))}
          </div>
          ) : (
            <div className="text-center py-20">
              <Camera size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold mb-2">Aucun événement trouvé</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery 
                  ? `Aucun résultat pour "${searchQuery}"`
                  : "Essayez une autre catégorie ou recherche"}
              </p>
              {(searchQuery || selectedCategory !== "Tous" || selectedRubrique !== "Toutes") && (
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("Tous")
                    setSelectedRubrique("Toutes")
                  }}
                  className="px-6 py-3 bg-[#FFD700] text-[#0A1128] font-bold rounded-xl hover:bg-[#E6C200] transition-all"
                >
                  Réinitialiser les filtres
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
