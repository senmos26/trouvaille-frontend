"use client"

import { useState, useEffect, useId, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, MapPin, Users, X, ArrowLeft, ChevronLeft, ChevronRight, Camera, Grid3x3, Grid2x2 } from "lucide-react"
import { useOutsideClick } from "@/hooks/use-outside-click"
import { useEvent } from "../../../../lib/hooks/use-events"

export default function EventGalleryPage({ params }: { params: { id: string } }) {
  const { data: eventData, isLoading, error } = useEvent(params.id)
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null)
  const [gridSize, setGridSize] = useState<"2" | "3" | "4">("4")
  const ref = useRef<HTMLDivElement | null>(null)
  const id = useId()

  // Type pour les événements avec toutes les propriétés nécessaires
  type GalleryEventItem = {
    id: string | number
    title: string
    photos?: Array<{ id: string; image_url: string; alt_text?: string }> | string[]
    event_images?: Array<{ id: string; image_url: string; alt_text?: string }>
    gallery?: Array<{ id: string; image_url: string; alt_text?: string | null }>
    category?: string | { name: string }
    rubrique?: string | { name: string }
    created_at?: string
    date?: string
    location?: string
    participants?: number
  }

  // Données d'événements (à synchroniser avec gallery/page.tsx)
  const galleryEvents: GalleryEventItem[] = []

  // Utiliser les données Supabase ou les données de fallback
  const eventItem: GalleryEventItem | undefined = eventData || galleryEvents.find(e => e.id === parseInt(params.id))
  
  // Helper functions pour accéder aux données de manière sécurisée
  const getPhotos = useCallback((item: GalleryEventItem | undefined): Array<{ id: string; image_url: string; alt_text?: string }> => {
    if (!item) return []

    if (Array.isArray(item.gallery) && item.gallery.length > 0) {
      return item.gallery.map((p) => ({
        id: p.id,
        image_url: p.image_url,
        alt_text: p.alt_text ?? undefined,
      }))
    }
    
    // Si photos est un tableau de strings (données de fallback)
    if (Array.isArray(item.photos) && item.photos.length > 0 && typeof item.photos[0] === 'string') {
      return (item.photos as string[]).map((url, index) => ({
        id: `fallback-${index}`,
        image_url: url,
        alt_text: `${item.title} - Photo ${index + 1}`
      }))
    }
    
    // Si photos est un tableau d'objets (données Supabase)
    return (item.photos as Array<{ id: string; image_url: string; alt_text?: string }>) || item.event_images || []
  }, [])
  const getCategoryName = (item: GalleryEventItem | undefined) => {
    if (!item?.category) return ''
    return typeof item.category === 'string' ? item.category : item.category.name || ''
  }
  const getRubriqueName = (item: GalleryEventItem | undefined) => {
    if (!item?.rubrique) return ''
    return typeof item.rubrique === 'string' ? item.rubrique : item.rubrique.name || ''
  }
  const getDate = (item: GalleryEventItem | undefined) => item?.created_at || item?.date || ''

  // Navigation avec clavier et gestion du scroll
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActivePhotoIndex(null)
      } else if (e.key === "ArrowLeft" && activePhotoIndex !== null && activePhotoIndex > 0) {
        setActivePhotoIndex(activePhotoIndex - 1)
      } else if (e.key === "ArrowRight" && activePhotoIndex !== null && eventItem && activePhotoIndex < getPhotos(eventItem).length - 1) {
        setActivePhotoIndex(activePhotoIndex + 1)
      }
    }

    if (activePhotoIndex !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [activePhotoIndex, eventItem, getPhotos])

  useOutsideClick(ref, () => setActivePhotoIndex(null))

  // Gestion des états de chargement et d'erreur
  if (isLoading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFD700] mx-auto mb-4"></div>
          <p className="text-[#0A1128]">Chargement de la galerie...</p>
        </div>
      </div>
    )
  }

  if (error || !eventItem) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Galerie non trouvée</p>
          <p className="text-gray-600 mb-6">La galerie que vous recherchez n&apos;existe pas</p>
          <Link href="/gallery" className="px-6 py-3 bg-[#FFD700] text-[#0A1128] rounded-lg font-semibold hover:bg-[#E6C200] transition-all">
            Retour à la galerie
          </Link>
        </div>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0A1128] to-[#172B4D] text-white py-16">
        <div className="container">
          <Link 
            href="/gallery"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all mb-6 backdrop-blur-sm"
          >
            <ArrowLeft size={18} />
            Retour à la galerie
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="px-3 py-1.5 bg-[#FFD700] text-[#0A1128] rounded-full font-semibold text-sm">
                {getCategoryName(eventItem)}
              </span>
              {getCategoryName(eventItem) === "Webinaire" && getRubriqueName(eventItem) && (
                <span className="px-3 py-1.5 bg-white/20 text-white rounded-full font-semibold text-sm backdrop-blur-sm">
                  {getRubriqueName(eventItem)}
                </span>
              )}
             
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">{eventItem.title}</h1>
            
            <div className="flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar size={20} />
                <span>{new Date(getDate(eventItem)).toLocaleDateString('fr-FR', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={20} />
                <span>{eventItem.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={20} />
                <span>{eventItem.participants || 0} participants</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Options et compteur */}
      <section className="py-6 bg-gray-50 border-b border-gray-200">
        <div className="container">
          <div className="flex gap-4 flex-wrap items-center justify-between">
            {/* Compteur de photos */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-[#0A1128]">
               
                
                  <div className="text-2xl font-bold">{getPhotos(eventItem).length}</div>
                  <div className="text-xl font-bold">Photos</div>
              
              </div>
            </div>

            {/* Taille de grille */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-700 hidden sm:block">
                Affichage :
              </span>
              <div className="flex gap-2 bg-white rounded-xl p-1 border-2 border-gray-200">
                <button
                  onClick={() => setGridSize("2")}
                  className={`p-2 rounded-lg transition-all ${
                    gridSize === "2" ? 'bg-[#0A1128] text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Grille 2 colonnes"
                >
                  <Grid2x2 size={20} />
                </button>
                <button
                  onClick={() => setGridSize("3")}
                  className={`p-2 rounded-lg transition-all ${
                    gridSize === "3" ? 'bg-[#0A1128] text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Grille 3 colonnes"
                >
                  <Grid3x3 size={20} />
                </button>
                <button
                  onClick={() => setGridSize("4")}
                  className={`p-2 rounded-lg transition-all ${
                    gridSize === "4" ? 'bg-[#0A1128] text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Grille 4 colonnes"
                >
                  <Camera size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photos Grid */}
      <section className="py-12">
        <div className="container">
          <div className={`grid gap-4 ${
            gridSize === "2" ? "grid-cols-2" : 
            gridSize === "3" ? "grid-cols-2 md:grid-cols-3" : 
            "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          }`}>
            {getPhotos(eventItem).map((photo: { id: string; image_url: string; alt_text?: string }, index: number) => (
              <motion.div
                layoutId={`photo-${index}-${id}`}
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative group cursor-pointer overflow-hidden rounded-xl aspect-square"
                onClick={() => setActivePhotoIndex(index)}
              >
                <motion.img 
                  layoutId={`image-${index}-${id}`}
                  src={photo.image_url} 
                  alt={`${eventItem.title} - Photo ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#0A1128]/0 group-hover:bg-[#0A1128]/40 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-[#0A1128] font-semibold text-sm">
                    Voir
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expandable Photo Modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <>
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 h-full w-full z-[100]"
            />
            
            {/* Modal Container */}
            <div className="fixed inset-0 grid place-items-center z-[100]">
              {/* Close Button (Mobile) */}
              <motion.button
                key={`button-${activePhotoIndex}-${id}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className="flex absolute top-4 right-4 lg:hidden items-center justify-center bg-white rounded-full h-10 w-10 shadow-lg z-10"
                onClick={() => setActivePhotoIndex(null)}
              >
                <X size={20} className="text-[#0A1128]" />
              </motion.button>

              {/* Expandable Card */}
              <motion.div
                layoutId={`photo-${activePhotoIndex}-${id}`}
                ref={ref}
                className="w-full max-w-5xl h-full md:h-fit md:max-h-[90%] flex flex-col bg-white sm:rounded-3xl overflow-hidden mx-4 shadow-2xl"
              >
                {/* Photo */}
                <motion.div 
                  layoutId={`image-${activePhotoIndex}-${id}`}
                  className="relative"
                >
                  <Image
                    src={getPhotos(eventItem)[activePhotoIndex]?.image_url || ''}
                    alt={`${eventItem.title} - Photo ${activePhotoIndex + 1}`}
                    width={800}
                    height={600}
                    className="w-full h-[50vh] md:h-[60vh] lg:h-[70vh] sm:rounded-tr-3xl sm:rounded-tl-3xl object-contain bg-gray-100"
                  />
                  
                  {/* Navigation Buttons */}
                  {activePhotoIndex > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setActivePhotoIndex(activePhotoIndex - 1)
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full transition-all shadow-lg"
                    >
                      <ChevronLeft size={24} className="text-[#0A1128]" />
                    </button>
                  )}
                  
                  {activePhotoIndex < getPhotos(eventItem).length - 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setActivePhotoIndex(activePhotoIndex + 1)
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full transition-all shadow-lg"
                    >
                      <ChevronRight size={24} className="text-[#0A1128]" />
                    </button>
                  )}
                </motion.div>

                {/* Info Section */}
                <div className="p-6 bg-white">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <motion.h3
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-2xl font-bold text-[#0A1128] mb-2"
                      >
                        {eventItem.title}
                      </motion.h3>
                      <motion.p
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-muted-foreground mb-3"
                      >
                        Photo {activePhotoIndex + 1} sur {getPhotos(eventItem).length}
                      </motion.p>
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="px-3 py-1.5 bg-[#FFD700] text-[#0A1128] rounded-full font-semibold text-sm">
                          {getCategoryName(eventItem)}
                        </span>
                        {getCategoryName(eventItem) === "Webinaire" && getRubriqueName(eventItem) && (
                          <span className="px-3 py-1.5 bg-[#0A1128] text-white rounded-full font-semibold text-sm">
                            {getRubriqueName(eventItem)}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Close Button (Desktop) */}
                    <button
                      onClick={() => setActivePhotoIndex(null)}
                      className="hidden lg:flex items-center justify-center p-2 hover:bg-gray-100 rounded-full transition-all"
                    >
                      <X size={24} className="text-[#0A1128]" />
                    </button>
                  </div>

                  {/* Event Details */}
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-wrap gap-4 text-sm text-muted-foreground"
                  >
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-[#0A1128]" />
                      <span>{new Date(getDate(eventItem)).toLocaleDateString('fr-FR', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-[#0A1128]" />
                      <span>{eventItem.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-[#0A1128]" />
                      <span>{eventItem.participants || 0} participants</span>
                    </div>
                  </motion.div>

                  {/* Keyboard Hint */}
                  <div className="mt-4 pt-4 border-t border-gray-200 text-center text-xs text-muted-foreground">
                    Utilisez ← → pour naviguer • ESC pour fermer • Cliquez en dehors pour fermer
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}


