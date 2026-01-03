"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search, Calendar, MapPin, ArrowUpRight,
  ChevronDown, SlidersHorizontal, Users, Filter, X,
  Clock, Bookmark, Sparkles
} from "lucide-react"
import { useEvents } from "@/lib/hooks/use-events"
import { useEventCategories } from "@/lib/hooks/use-categories"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// --- HELPERS ---
const stripHtml = (html: string) => {
  return html?.replace(/<[^>]*>?/gm, '') || '';
};

// --- LOADING SKELETON ---
const SkeletonCard = () => (
  <div className="group relative flex flex-col overflow-hidden rounded-[2.5rem] bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-white/5 h-[600px]">
    <div className="aspect-[4/3] w-full animate-pulse bg-gray-200 dark:bg-gray-700" />
    <div className="p-8 space-y-4">
      <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
      <div className="h-8 w-3/4 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
      <div className="h-20 w-full rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
      <div className="flex justify-between items-center pt-6">
        <div className="flex -space-x-3">
          {[1, 2, 3].map(i => <div key={i} className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse border-2 border-white dark:border-[#0A1128]" />)}
        </div>
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
      </div>
    </div>
  </div>
)

// --- EVENT CARD COMPONENT ---
const EventCard = ({ event, index }: { event: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const eventDate = new Date(event.date);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group w-full h-[600px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/event/${event.id}`} className="block h-full w-full">
        <article className="relative h-full w-full rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-white/5 bg-white dark:bg-white/5 shadow-sm hover:shadow-2xl hover:shadow-[#FFD700]/10 transition-all duration-700">

          {/* 1. IMAGE AREA - Aspect Ratio Cinematic 4:3 */}
          <div className="relative h-[55%] w-full overflow-hidden">
            <Image
              src={event.image || '/images/placeholder.jpg'}
              alt={event.title}
              fill
              className="object-cover transition-all duration-1000 ease-out grayscale group-hover:grayscale-0 group-hover:scale-110"
              unoptimized={event.image?.includes('supabase')}
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-700" />

            {/* Category Badge */}
            <div className="absolute top-6 left-6">
              <span className="px-4 py-2 bg-white/90 dark:bg-black/80 backdrop-blur-md text-[#0A1128] dark:text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg border border-white/20">
                {event.category?.name || "Événement"}
              </span>
            </div>

            {/* Date Sticker (Luxury Style) */}
            <div className="absolute top-4 right-4 flex flex-col items-center bg-[#FFD700] text-[#0A1128] rounded-xl p-3 min-w-[70px] shadow-xl text-center leading-none border border-white/20">
              <span className="text-2xl font-black">{eventDate.getDate()}</span>
              <span className="text-[10px] font-black uppercase tracking-widest mt-1">
                {eventDate.toLocaleDateString('fr-FR', { month: 'short' })}
              </span>
            </div>
          </div>

          {/* 2. CONTENT AREA */}
          <div className="flex flex-col p-8 h-[45%] transition-colors duration-500">
            {/* Metadata Line */}
            <div className="flex items-center gap-4 mb-5">
              <div className="flex items-center gap-2 text-[10px] font-black text-[#0A1128]/60 dark:text-white/60 uppercase tracking-widest">
                <MapPin size={15} className="text-[#FFD700]" />
                <span className="truncate max-w-[120px]">{event.location}</span>
              </div>

              <div className="h-4 w-px bg-gray-200 dark:bg-white/10" />

              <div className="flex items-center gap-2 text-[10px] font-black text-[#0A1128]/60 dark:text-white/60 uppercase tracking-widest">
                <Users size={15} className="text-[#FFD700]" />
                <span>{event.participants || 0} Places</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-black text-[#0A1128] dark:text-white mb-4 line-clamp-2 leading-[1.1] uppercase tracking-tighter group-hover:text-[#FFD700] transition-colors">
              {event.title}
            </h3>

            {/* Description */}
            <p className="text-[#0A1128]/70 dark:text-gray-400 line-clamp-2 text-sm font-medium leading-relaxed italic mb-8">
              {stripHtml(event.description)}
            </p>

            {/* Call to Action */}
            <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-100 dark:border-white/10">
              <div className="flex -space-x-3">
                {event.speakers && event.speakers.length > 0 ? (
                  event.speakers.slice(0, 3).map((speaker: any, idx: number) => (
                    <div key={idx} className="h-8 w-8 rounded-full border-2 border-white dark:border-[#0A1128] bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600 overflow-hidden relative" title={speaker.name}>
                      <span className="z-10">{speaker.name.charAt(0)}</span>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                    <Sparkles size={14} className="text-[#FFD700]" />
                    <span>La Trouvaille</span>
                  </div>
                )}
              </div>

              {/* Animated CTA Button */}
              <div className="relative overflow-hidden rounded-full p-2">
                <div className={cn(
                  "flex items-center justify-center h-10 w-10 rounded-full bg-[#0A1128] dark:bg-white text-white dark:text-[#0A1128] transition-all duration-300",
                  isHovered ? "w-28" : "w-10"
                )}>
                  <ArrowUpRight size={20} className={cn("transition-transform", isHovered && "translate-x-8 opacity-0 absolute")} />
                  <span className={cn(
                    "absolute text-xs font-bold whitespace-nowrap opacity-0 transition-all duration-300",
                    isHovered && "opacity-100"
                  )}>
                    S'inscrire
                  </span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
};

// --- MAIN PAGE CONTENT ---
function EventsPageContent() {
  const [selectedCategory, setSelectedCategory] = useState("Tout")
  const [selectedSort, setSelectedSort] = useState("date-asc")
  const [searchQuery, setSearchQuery] = useState("")

  // Hook Data
  const { data: eventsData, isLoading } = useEvents({ limit: 100 })
  const { data: categoriesData } = useEventCategories()

  // Data processing
  const allEventsRaw = eventsData?.data || []
  const today = new Date().setHours(0, 0, 0, 0)

  // Only future events for this page
  const upcomingEvents = allEventsRaw.filter((e: any) => new Date(e.date).getTime() >= today)
  const categories = ["Tout", ...(categoriesData?.map((c: any) => c.name) || [])]

  const filteredEvents = upcomingEvents
    .filter((event: any) => {
      const matchCat = selectedCategory === "Tout" || event.category?.name === selectedCategory
      const matchSearch = !searchQuery ||
        event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location?.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCat && matchSearch
    })
    .sort((a: any, b: any) => {
      if (selectedSort === 'date-asc') return new Date(a.date).getTime() - new Date(b.date).getTime()
      if (selectedSort === 'date-desc') return new Date(b.date).getTime() - new Date(a.date).getTime()
      if (selectedSort === 'participants') return (b.participants || 0) - (a.participants || 0)
      return 0
    })

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A1128] text-[#0A1128] dark:text-white font-sans selection:bg-[#FFD700] selection:text-[#0A1128]">

      {/* --- 1. CINEMATIC HERO SECTION --- */}
      <section className="relative pt-28 pb-4 px-4 overflow-hidden border-b border-gray-100 dark:border-transparent">
        {/* Background Effects */}
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
                <span className="text-[#FFD700] font-black uppercase tracking-[0.3em] text-[10px]">Agenda d'Excellence</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#0A1128] dark:text-white leading-[0.9] tracking-[-0.04em] uppercase mb-2">
                Nos <br />
                <span className="text-[#FFD700] lowercase italic font-serif">prochaines</span> Escales.
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex justify-between items-end border-t border-gray-100 dark:border-white/10 pt-4"
            >
              <p className="max-w-md text-sm md:text-base font-light leading-relaxed text-gray-500 dark:text-gray-300 italic font-serif">
                "Des moments d'exception pour forger des alliances et célébrer l'innovation africaine."
              </p>
              <div className="hidden md:flex flex-col items-end gap-1">
                <span className="text-[9px] uppercase tracking-[0.4em] font-black text-gray-400 dark:text-white/40">Rencontres Prévues</span>
                <span className="text-2xl font-black text-[#FFD700]">{upcomingEvents.length}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 2. SELECTOR BAR (Sticky Glassmorphism) --- */}
      <div className="sticky top-0 z-40 bg-white/90 dark:bg-[#0A1128]/95 backdrop-blur-2xl border-y border-gray-100 dark:border-white/5 py-8 transition-colors duration-500">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">

            {/* Premium Search Interface */}
            <div className="relative w-full lg:max-w-md group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#FFD700] pointer-events-none group-focus-within:scale-110 transition-transform">
                <Search size={20} strokeWidth={2.5} />
              </div>
              <input
                type="text"
                placeholder="Rechercher un événement..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-16 pl-16 pr-12 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl focus:outline-none focus:border-[#FFD700]/50 focus:bg-white dark:focus:bg-white/10 transition-all font-bold text-base text-[#0A1128] dark:text-white placeholder:text-gray-300 dark:placeholder:text-white/20 shadow-sm focus:shadow-xl"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={16} className="text-gray-400 dark:text-white/40" />
                </button>
              )}
            </div>

            {/* Filter Interface */}
            <div className="flex w-full lg:w-auto items-center gap-4 overflow-x-auto no-scrollbar pb-1">

              <div className="flex flex-col min-w-[200px]">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 dark:text-white/30 mb-2 ml-1">Type</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="h-16 px-6 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl font-black text-sm text-[#0A1128] dark:text-white shadow-sm hover:border-[#FFD700]/50 transition-all">
                    <div className="flex items-center gap-3">
                      <Filter size={16} className="text-[#FFD700]" strokeWidth={2.5} />
                      <SelectValue placeholder="Catégorie" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-[#050A15] border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl z-50">
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat} className="font-bold py-4 text-[#0A1128] dark:text-white focus:bg-gray-100 dark:focus:bg-white/10 cursor-pointer">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col min-w-[200px]">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 dark:text-white/30 mb-2 ml-1">Ordre</label>
                <Select value={selectedSort} onValueChange={setSelectedSort}>
                  <SelectTrigger className="h-16 px-6 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl font-black text-sm text-[#0A1128] dark:text-white shadow-sm hover:border-[#FFD700]/50 transition-all">
                    <div className="flex items-center gap-3">
                      <SlidersHorizontal size={16} className="text-[#FFD700]" strokeWidth={2.5} />
                      <SelectValue placeholder="Trier par" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-[#050A15] border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl z-50">
                    <SelectItem value="date-asc" className="font-bold py-4 text-[#0A1128] dark:text-white focus:bg-gray-100 dark:focus:bg-white/10 cursor-pointer text-sm">Plus proche</SelectItem>
                    <SelectItem value="date-desc" className="font-bold py-4 text-[#0A1128] dark:text-white focus:bg-gray-100 dark:focus:bg-white/10 cursor-pointer text-sm">Plus éloigné</SelectItem>
                    <SelectItem value="participants" className="font-bold py-4 text-[#0A1128] dark:text-white focus:bg-gray-100 dark:focus:bg-white/10 cursor-pointer text-sm">Popularité</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Reset Button */}
              {(selectedCategory !== "Tout" || searchQuery) && (
                <button
                  onClick={() => { setSelectedCategory("Tout"); setSearchQuery("") }}
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

      {/* --- 3. THE GRID --- */}
      <section className="container mx-auto max-w-7xl px-4 py-24 pb-48">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : filteredEvents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-48 text-center"
          >
            <div className="relative w-32 h-32 mb-10 group">
              <div className="absolute inset-0 bg-[#FFD700] rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative w-full h-full bg-white dark:bg-[#050A15] rounded-full flex items-center justify-center border border-gray-100 dark:border-white/10 shadow-2xl">
                <Calendar size={48} className="text-[#FFD700]" strokeWidth={1.5} />
              </div>
            </div>
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-4 text-[#0A1128] dark:text-white">Le silence est d'or.</h3>
            <p className="text-gray-400 dark:text-gray-400 max-w-xs text-lg font-medium leading-relaxed">Aucun événement ne correspond pour le moment. Essayez d'élargir votre horizon.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event: any, idx: number) => (
                <EventCard key={event.id} event={event} index={idx} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

    </div>
  )
}

export default function EventsPageClient() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <EventsPageContent />
    </Suspense>
  )
}