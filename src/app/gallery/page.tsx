"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, MapPin, Users, Filter, Camera, Search, X, ChevronDown, Sparkles, ArrowUpRight } from "lucide-react"
import { useEvents } from "@/lib/hooks/use-events"
import { useEventCategories, useEventRubriques } from "@/lib/hooks/use-categories"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// --- HELPERS ---
const getCategoryName = (category?: { name: string } | string) => {
  return typeof category === 'string' ? category : category?.name || ''
}

const getRubriqueName = (rubrique?: { name: string } | string) => {
  return typeof rubrique === 'string' ? rubrique : rubrique?.name || ''
}

// --- LOADING SKELETON ---
const SkeletonCard = () => (
  <div className="h-[500px] w-full bg-gray-50 dark:bg-white/5 rounded-[2.5rem] border border-gray-100 dark:border-white/5 animate-pulse overflow-hidden">
    <div className="h-[60%] bg-gray-200 dark:bg-white/5 opacity-30" />
    <div className="p-8 space-y-4">
      <div className="h-4 w-1/4 bg-gray-200 dark:bg-white/10 rounded" />
      <div className="h-8 w-3/4 bg-gray-200 dark:bg-white/10 rounded" />
      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map(i => <div key={i} className="aspect-square rounded-lg bg-gray-200 dark:bg-white/5" />)}
      </div>
    </div>
  </div>
)

// --- GALLERY EVENT CARD ---
const GalleryEventCard = ({ event, index }: { event: { id: string; gallery: { image_url: string }[]; category?: { name: string } | string; title: string; created_at?: string; date: string; location: string; participants?: number; rubrique?: { name: string } | string }; index: number }) => {
  const photos = event.gallery || [];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group w-full"
    >
      <Link href={`/gallery/${event.id}`} className="block h-full w-full">
        <article className="relative h-full w-full rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-white/5 bg-white dark:bg-white/5 shadow-sm hover:shadow-2xl hover:shadow-[#FFD700]/10 transition-all duration-700">

          {/* 1. IMAGE AREA */}
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={photos[0]?.image_url || 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800'}
              alt={event.title}
              fill
              className="object-cover transition-all duration-1000 ease-out grayscale group-hover:grayscale-0 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

            {/* Photo Count Badge */}
            <div className="absolute top-6 right-6">
              <div className="bg-[#FFD700] text-[#0A1128] rounded-full px-4 py-2 flex items-center gap-2 shadow-xl border border-white/20">
                <Camera size={14} strokeWidth={3} />
                <span className="text-xs font-black tracking-widest">{photos.length}</span>
              </div>
            </div>

            {/* Category Tags */}
            <div className="absolute top-6 left-6 flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-white/90 dark:bg-black/80 backdrop-blur-md text-[#0A1128] dark:text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-white/10">
                {getCategoryName(event.category)}
              </span>
              {getCategoryName(event.category) === "Webinaire" && event.rubrique && (
                <span className="px-3 py-1.5 bg-[#0A1128] dark:bg-white text-white dark:text-[#0A1128] text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                  {getRubriqueName(event.rubrique)}
                </span>
              )}
            </div>
          </div>

          {/* 2. CONTENT AREA */}
          <div className="p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2 text-[10px] font-black text-[#0A1128]/60 dark:text-white/60 uppercase tracking-widest">
                <Calendar size={15} className="text-[#FFD700]" />
                <span>{new Date(event.created_at || event.date).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}</span>
              </div>
              <div className="h-4 w-px bg-gray-200 dark:bg-white/10" />
              <div className="flex items-center gap-2 text-[10px] font-black text-[#0A1128]/60 dark:text-white/60 uppercase tracking-widest">
                <MapPin size={15} className="text-[#FFD700]" />
                <span className="truncate max-w-[120px]">{event.location}</span>
              </div>
            </div>

            <h3 className="text-2xl font-black text-[#0A1128] dark:text-white mb-6 line-clamp-1 leading-tight uppercase tracking-tighter group-hover:text-[#FFD700] transition-colors">
              {event.title}
            </h3>

            {/* Thumbnails Preview */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {photos.slice(1, 5).map((photo: { image_url: string }, idx: number) => (
                <div key={idx} className="aspect-square rounded-xl overflow-hidden relative">
                  <Image src={photo.image_url} alt="" fill className="object-cover" />
                  {idx === 3 && photos.length > 5 && (
                    <div className="absolute inset-0 bg-[#0A1128]/80 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="text-white font-black text-xs">+{photos.length - 5}</span>
                    </div>
                  )}
                </div>
              ))}
              {photos.length <= 1 && [1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square rounded-xl bg-gray-50 dark:bg-white/5 border border-dashed border-gray-200 dark:border-white/10" />
              ))}
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#0A1128] dark:text-white">
                <Users size={14} className="text-[#FFD700]" />
                <span>{event.participants || 0}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#0A1128] dark:text-white group-hover:text-[#FFD700] transition-colors">
                Voir l&apos;album
                <div className="w-8 h-8 rounded-full border border-[#0A1128]/10 dark:border-white/10 flex items-center justify-center group-hover:bg-[#FFD700] group-hover:border-[#FFD700] transition-all">
                  <ArrowUpRight size={14} className="group-hover:text-[#0A1128]" />
                </div>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}

export default function GalleryPage() {
  const { data: eventsData, isLoading: eventsLoading } = useEvents()
  const { data: categoriesData } = useEventCategories()
  const { data: rubriquesData } = useEventRubriques()

  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [selectedRubrique, setSelectedRubrique] = useState("Toutes")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("date")

  const allEventsRaw = eventsData?.data || []
  const today = new Date().setHours(0, 0, 0, 0)

  // Only past events for the gallery
  const pastEvents = allEventsRaw.filter((e: { created_at?: string; date: string }) => new Date(e.created_at || e.date).getTime() < today)

  const categories = ["Tous", ...(categoriesData?.map((cat: { name: string }) => cat.name) || [])]
  const rubriques = ["Toutes", ...(rubriquesData?.map((rub: { name: string }) => rub.name) || [])]

  // Filtering
  const filteredEvents = pastEvents.filter((event: { title: string; location?: string; category?: { name: string } | string; rubrique?: { name: string } | string }) => {
    const matchSearch = !searchQuery ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.location || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchCat = selectedCategory === "Tous" || getCategoryName(event.category) === selectedCategory;
    const matchRub = selectedCategory !== "Webinaire" || selectedRubrique === "Toutes" || getRubriqueName(event.rubrique) === selectedRubrique;

    return matchSearch && matchCat && matchRub;
  });

  // Sorting
  filteredEvents.sort((a: { created_at?: string; date: string; title: string; gallery?: { length: number } }, b: { created_at?: string; date: string; title: string; gallery?: { length: number } }) => {
    if (sortBy === "date") return new Date(b.created_at || b.date).getTime() - new Date(a.created_at || a.date).getTime();
    if (sortBy === "title") return a.title.localeCompare(b.title);
    if (sortBy === "photos") return (b.gallery?.length || 0) - (a.gallery?.length || 0);
    return 0;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A1128] text-[#0A1128] dark:text-white font-sans selection:bg-[#FFD700] selection:text-[#0A1128]">

      {/* --- 1. CINEMATIC HERO SECTION --- */}
      <section className="relative pt-28 pb-4 px-4 overflow-hidden border-b border-gray-100 dark:border-transparent">
        <div className="absolute inset-0 z-0">
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-50 dark:opacity-100" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay pointer-events-none" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-px bg-[#FFD700]" />
                <span className="text-[#FFD700] font-black uppercase tracking-[0.3em] text-[10px]">L&apos;Héritage Visuel</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#0A1128] dark:text-white leading-[0.9] tracking-[-0.04em] uppercase mb-2">
                Nos <br />
                <span className="text-[#FFD700] lowercase italic font-serif">souvenirs.</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex justify-between items-end border-t border-gray-100 dark:border-white/10 pt-4"
            >
              <p className="max-w-md text-sm md:text-base font-light leading-relaxed text-gray-500 dark:text-gray-300 italic font-serif">
                &quot;Capturer l&apos;énergie de l&apos;innovation et la force de notre communauté à travers le continent.&quot;
              </p>
              <div className="hidden md:flex flex-col items-end gap-1">
                <span className="text-[9px] uppercase tracking-[0.4em] font-black text-gray-400 dark:text-white/40">Instants Gravés</span>
                <span className="text-2xl font-black text-[#FFD700]">{pastEvents.reduce((acc: number, e: { gallery?: { image_url: string }[] }) => acc + (e.gallery?.length || 0), 0)}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 2. SELECTOR BAR --- */}
      <div className="sticky top-0 z-40 bg-white/90 dark:bg-[#0A1128]/95 backdrop-blur-2xl border-y border-gray-100 dark:border-white/5 py-8 transition-colors duration-500">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">

            {/* Search */}
            <div className="relative w-full lg:max-w-md group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#FFD700] pointer-events-none group-focus-within:scale-110 transition-transform">
                <Search size={20} strokeWidth={2.5} />
              </div>
              <input
                type="text"
                placeholder="Chercher un événement..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-16 pl-16 pr-12 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl focus:outline-none focus:border-[#FFD700]/50 focus:bg-white dark:focus:bg-white/10 transition-all font-bold text-base text-[#0A1128] dark:text-white placeholder:text-gray-300 dark:placeholder:text-white/20 shadow-sm focus:shadow-xl"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full">
                  <X size={16} className="text-gray-400 dark:text-white/40" />
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="flex w-full lg:w-auto items-center gap-4 overflow-x-auto no-scrollbar pb-1">
              {/* Category */}
              <div className="flex flex-col min-w-[180px]">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 dark:text-white/30 mb-2 ml-1">Catégorie</label>
                <Select value={selectedCategory} onValueChange={(val) => { setSelectedCategory(val); setSelectedRubrique("Toutes"); }}>
                  <SelectTrigger className="h-16 px-6 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl font-black text-sm text-[#0A1128] dark:text-white shadow-sm hover:border-[#FFD700]/50 transition-all">
                    <div className="flex items-center gap-3">
                      <Filter size={16} className="text-[#FFD700]" strokeWidth={2.5} />
                      <SelectValue placeholder="Catégorie" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-[#050A15] border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl">
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat} className="font-bold py-4 cursor-pointer">{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Rubrique (Conditional) */}
              {selectedCategory === "Webinaire" && (
                <div className="flex flex-col min-w-[180px]">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 dark:text-white/30 mb-2 ml-1">Rubrique</label>
                  <Select value={selectedRubrique} onValueChange={setSelectedRubrique}>
                    <SelectTrigger className="h-16 px-6 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl font-black text-sm text-[#0A1128] dark:text-white shadow-sm hover:border-[#FFD700]/50 transition-all">
                      <div className="flex items-center gap-3">
                        <Sparkles size={16} className="text-[#FFD700]" strokeWidth={2.5} />
                        <SelectValue placeholder="Rubrique" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-[#050A15] border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl">
                      {rubriques.map(rub => (
                        <SelectItem key={rub} value={rub} className="font-bold py-4 cursor-pointer">{rub}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Sort */}
              <div className="flex flex-col min-w-[180px]">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 dark:text-white/30 mb-2 ml-1">Tri</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-16 px-6 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl font-black text-sm text-[#0A1128] dark:text-white shadow-sm hover:border-[#FFD700]/50 transition-all">
                    <div className="flex items-center gap-3">
                      <ChevronDown size={16} className="text-[#FFD700]" strokeWidth={2.5} />
                      <SelectValue placeholder="Trier par" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-[#050A15] border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl">
                    <SelectItem value="date" className="font-bold py-4 cursor-pointer">Plus récent</SelectItem>
                    <SelectItem value="title" className="font-bold py-4 cursor-pointer">Alphabétique</SelectItem>
                    <SelectItem value="photos" className="font-bold py-4 cursor-pointer">Nb. Photos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Reset */}
              {(searchQuery || selectedCategory !== "Tous") && (
                <button
                  onClick={() => { setSearchQuery(""); setSelectedCategory("Tous"); setSelectedRubrique("Toutes"); }}
                  className="h-16 px-6 mt-6 flex items-center justify-center gap-2 text-sm font-black text-[#FFD700] hover:bg-gray-50 dark:hover:bg-white/5 rounded-2xl transition-all border border-gray-100 dark:border-white/10"
                >
                  <X size={16} />
                  Réinitialiser
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- 3. GALLERY GRID --- */}
      <section className="container mx-auto max-w-7xl px-4 py-24">
        {eventsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-48 text-center">
            <Camera size={64} className="text-[#FFD700]/20 mb-8" />
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">Fin de l&apos;exposition.</h3>
            <p className="text-gray-400 dark:text-gray-400 max-w-xs text-lg font-medium">Aucun album trouvé pour ces critères. Raffinez votre recherche.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event: { id: string; gallery: { image_url: string }[]; category?: { name: string } | string; title: string; created_at?: string; date: string; location: string; participants?: number; rubrique?: { name: string } | string }, idx: number) => (
                <GalleryEventCard key={event.id} event={event} index={idx} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

    </div>
  )
}
