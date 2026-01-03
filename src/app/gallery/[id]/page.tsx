"use client"

import { useState, useEffect, useRef, useCallback, use } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, MapPin, Users, X, ArrowLeft, ChevronLeft, ChevronRight, Camera, Grid3x3, Grid2x2, Sparkles, LayoutGrid } from "lucide-react"
import { useOutsideClick } from "@/hooks/use-outside-click"
import { useEvent } from "@/lib/hooks/use-events"
import { cn } from "@/lib/utils"

export default function EventGalleryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: eventId } = use(params)
  const { data: eventData, isLoading, error } = useEvent(eventId)
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null)
  const [gridSize, setGridSize] = useState<"2" | "3" | "4">("4")
  const ref = useRef<HTMLDivElement | null>(null)

  const getPhotos = useCallback((item: { gallery?: Array<string | { id?: string; image_url: string; alt_text?: string }>; photos?: Array<string | { id?: string; image_url: string; alt_text?: string }>; event_images?: Array<string | { id?: string; image_url: string; alt_text?: string }> } | null | undefined): Array<{ id: string; image_url: string; alt_text?: string }> => {
    if (!item) return []
    const rawPhotos = item.gallery || item.photos || item.event_images || []
    return (rawPhotos as Array<string | { id?: string; image_url: string; alt_text?: string }>).map((p, idx: number) => ({
      id: (typeof p !== 'string' && p.id) ? p.id : `photo-${idx}`,
      image_url: typeof p === 'string' ? p : p.image_url,
      alt_text: (typeof p !== 'string' && p.alt_text) ? p.alt_text : ''
    }))
  }, [])

  const getCategoryName = (item: { category?: { name: string } | string } | null | undefined) => typeof item?.category === 'string' ? item.category : item?.category?.name || ''

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setActivePhotoIndex(null)
      else if (e.key === "ArrowLeft" && activePhotoIndex !== null && activePhotoIndex > 0) setActivePhotoIndex(activePhotoIndex - 1)
      else if (e.key === "ArrowRight" && activePhotoIndex !== null && eventData && activePhotoIndex < getPhotos(eventData).length - 1) setActivePhotoIndex(activePhotoIndex + 1)
    }
    document.body.style.overflow = activePhotoIndex !== null ? "hidden" : "auto"
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [activePhotoIndex, eventData, getPhotos])

  useOutsideClick(ref, () => setActivePhotoIndex(null))

  if (isLoading) return (
    <div className="bg-white dark:bg-[#0A1128] min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#FFD700] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-black uppercase tracking-widest text-[#FFD700]">Révélation en cours...</p>
      </div>
    </div>
  )

  if (error || !eventData) return (
    <div className="bg-white dark:bg-[#0A1128] min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 text-[#0A1128] dark:text-white">Relique égarée.</h2>
        <p className="text-gray-500 mb-8 font-medium">Cette galerie semble avoir disparu des archives du temps.</p>
        <Link href="/gallery" className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFD700] text-[#0A1128] font-black uppercase tracking-widest text-xs rounded-full hover:scale-105 transition-transform">
          <ArrowLeft size={16} /> Retour à l&apos;exposition
        </Link>
      </div>
    </div>
  )

  const photos = getPhotos(eventData)

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A1128] selection:bg-[#FFD700] selection:text-[#0A1128]">

      {/* 1. IMMERSIVE HERO */}
      <section className="relative h-[60vh] flex items-end overflow-hidden">
        {/* Blurred Background from first image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={photos[0]?.image_url || '/images/placeholder.jpg'}
            alt="" fill className="object-cover scale-110 blur-2xl opacity-20 dark:opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0A1128] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />
        </div>

        <div className="container mx-auto max-w-7xl px-4 pb-16 relative z-10">
          <Link href="/gallery" className="group inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-[#0A1128] dark:text-white/60 mb-12 hover:text-[#FFD700] transition-colors">
            <div className="w-10 h-10 rounded-full border border-gray-100 dark:border-white/10 flex items-center justify-center group-hover:border-[#FFD700] transition-all">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            </div>
            Retour à l&apos;agenda
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[#FFD700] lowercase italic font-serif text-2xl">{getCategoryName(eventData)}</span>
              <div className="w-12 h-px bg-[#FFD700]/30" />
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-[#0A1128] dark:text-white tracking-tight uppercase leading-[0.9] mb-8">
              {eventData.title}
            </h1>

            <div className="flex flex-wrap gap-8 items-center border-t border-gray-100 dark:border-white/10 pt-8 mt-8">
              <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-gray-500">
                <Calendar size={18} className="text-[#FFD700]" />
                <span className="dark:text-white/80">{new Date(eventData.created_at || eventData.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-gray-500">
                <MapPin size={18} className="text-[#FFD700]" />
                <span className="dark:text-white/80">{eventData.location}</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-gray-500">
                <Users size={18} className="text-[#FFD700]" />
                <span className="dark:text-white/80">{eventData.participants || 0} Témoins</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. STICKY CONTROLS */}
      <section className="sticky top-[72px] z-30 bg-white/80 dark:bg-[#0A1128]/90 backdrop-blur-xl border-y border-gray-100 dark:border-white/5 py-6">
        <div className="container mx-auto max-w-7xl px-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#0A1128] dark:text-white">{photos.length}</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Captures</span>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 p-1.5 rounded-2xl border border-gray-100 dark:border-white/10">
            {(["2", "3", "4"] as const).map((size) => (
              <button
                key={size}
                onClick={() => setGridSize(size)}
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                  gridSize === size
                    ? "bg-[#FFD700] text-[#0A1128] shadow-lg shadow-[#FFD700]/20"
                    : "text-gray-400 hover:text-[#0A1128] dark:hover:text-white"
                )}
              >
                {size === "2" ? <Grid2x2 size={20} /> : size === "3" ? <Grid3x3 size={20} /> : <LayoutGrid size={20} />}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PHOTO GRID */}
      <section className="py-24 container mx-auto max-w-7xl px-4">
        <motion.div
          layout
          className={cn(
            "grid gap-4 md:gap-8",
            gridSize === "2" ? "grid-cols-1 md:grid-cols-2" :
              gridSize === "3" ? "grid-cols-2 md:grid-cols-3" :
                "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          )}
        >
          {photos.map((photo, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              key={photo.id}
              className="group relative cursor-pointer overflow-hidden rounded-[2rem] aspect-[4/5] md:aspect-square bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5"
              onClick={() => setActivePhotoIndex(index)}
            >
              <Image
                src={photo.image_url}
                alt=""
                fill
                className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#0A1128]/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white dark:bg-[#FFD700] text-[#0A1128] flex items-center justify-center scale-75 group-hover:scale-100 transition-transform">
                  <Camera size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* --- 4. PREMIUM LIGHTBOX --- */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <div className="fixed inset-0 z-[100] flex flex-col md:flex-row items-center justify-center bg-black/95 backdrop-blur-3xl overflow-hidden p-4 md:p-8">

            {/* Minimalist Sidebar (Mobile: Bottom bar) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="order-2 md:order-1 flex md:flex-col justify-between w-full md:w-32 py-12 border-t md:border-t-0 md:border-r border-white/10"
            >
              <div className="flex md:flex-col items-center gap-12">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-4xl font-black text-[#FFD700] leading-none">{activePhotoIndex + 1}</span>
                  <div className="h-0.5 w-6 bg-white/20" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{photos.length}</span>
                </div>

                <div className="hidden md:flex flex-col gap-8 text-white/30">
                  <Camera size={20} />
                  <Sparkles size={20} />
                </div>
              </div>

              <button
                onClick={() => setActivePhotoIndex(null)}
                className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#0A1128] transition-all"
              >
                <X size={24} />
              </button>
            </motion.div>

            {/* Immersive Photo Viewer */}
            <div className="order-1 md:order-2 flex-1 relative h-full w-full flex items-center justify-center">

              {/* Navigation Controls */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 z-10 pointer-events-none">
                <button
                  onClick={(e) => { e.stopPropagation(); if (activePhotoIndex > 0) setActivePhotoIndex(activePhotoIndex - 1); }}
                  className={cn(
                    "w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white backdrop-blur-xl pointer-events-auto transition-all hover:bg-[#FFD700] hover:text-[#0A1128] disabled:opacity-0",
                    activePhotoIndex === 0 && "invisible"
                  )}
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); if (activePhotoIndex < photos.length - 1) setActivePhotoIndex(activePhotoIndex + 1); }}
                  className={cn(
                    "w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white backdrop-blur-xl pointer-events-auto transition-all hover:bg-[#FFD700] hover:text-[#0A1128] disabled:opacity-0",
                    activePhotoIndex === photos.length - 1 && "invisible"
                  )}
                >
                  <ChevronRight size={28} />
                </button>
              </div>

              {/* Main Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhotoIndex}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 150 }}
                  className="relative w-full h-[70vh] md:h-[85vh] group"
                >
                  <Image
                    src={photos[activePhotoIndex].image_url}
                    alt=""
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Info Overlay */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-12 inset-x-12 hidden md:block"
              >
                <div className="max-w-xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[#FFD700] italic font-serif text-xl">{getCategoryName(eventData)}</span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-none mb-6">
                    {eventData.title}
                  </h3>
                  <p className="text-white/40 text-xs font-black uppercase tracking-[0.3em]">
                    Archives Secrètes de La Trouvaille • {new Date(eventData.created_at || eventData.date).getFullYear()}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}


