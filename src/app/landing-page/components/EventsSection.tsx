"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Calendar, ArrowUpRight, Users, Sparkles } from "lucide-react"
import { useEvents } from "@/lib/hooks/use-events"
import { cn } from "@/lib/utils"

// 1. Loading Skeleton Premium (Pour ne pas briser l'immersion pendant le fetch)
const EventSkeleton = () => (
  <div className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-gray-100 dark:bg-gray-800/50">
    <div className="aspect-[4/3] w-full animate-pulse bg-gray-200 dark:bg-gray-700" />
    <div className="p-6 space-y-4">
      <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
      <div className="h-8 w-3/4 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
      <div className="flex gap-2 pt-2">
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
      </div>
    </div>
  </div>
)

// Helper to strip HTML tags for clean preview
const stripHtml = (html: string) => {
  return html?.replace(/<[^>]*>?/gm, '') || '';
};

export default function EventsSection() {
  const { data: eventsData, isLoading } = useEvents({ limit: 3 })
  const displayEvents = eventsData?.data || []
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section className="relative py-24 bg-white dark:bg-[#0A1128] overflow-hidden">

      {/* Background Decoratif Subtil */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />

      <div className="container relative z-10">

        {/* Header de section: Editorial Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-[#0A1128] dark:text-white leading-[0.9] tracking-[-0.04em] uppercase"
            >
              Nos <br className="hidden md:block" />
              <span className="text-[#FFD700] lowercase italic font-serif">prochaines</span> Escales.
            </motion.h2>
          </div>

          <div className="mb-2">
            <Link href="/events" className="group flex items-center gap-4 text-[#0A1128] dark:text-white font-black text-sm uppercase tracking-[0.2em] border-b-2 border-[#FFD700] pb-2 transition-all hover:gap-6">
              Explorer l&apos;agenda
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* LOADING STATE */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => <EventSkeleton key={i} />)}
          </div>
        )}

        {/* CONTENT STATE */}
        {!isLoading && displayEvents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayEvents.map((event) => (
              <Link
                key={event.id}
                href={`/event/${event.id}`}
                className="block h-full"
                onMouseEnter={() => setHoveredId(event.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group relative flex flex-col h-full overflow-hidden rounded-[2rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm hover:shadow-2xl hover:shadow-[#FFD700]/10 transition-all duration-500"
                >

                  {/* 1. IMAGE AREA - Aspect Ratio Cinematic 4:3 */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {event.image ? (
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1128] to-[#1a2a4a] flex items-center justify-center">
                        <MapPin className="text-white/20 w-16 h-16" />
                      </div>
                    )}

                    {/* Overlay Gradient pour lisibilité des badges */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                    {/* Badge Catégorie Flottant */}
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-2 bg-white/90 dark:bg-black/80 backdrop-blur-md text-[#0A1128] dark:text-white text-xs font-bold uppercase tracking-wide rounded-full shadow-lg">
                        {event.category?.name || "Événement"}
                      </span>
                    </div>

                    {/* Date "Ticket" Style - Très visuel */}
                    <div className="absolute top-4 right-4 flex flex-col items-center bg-[#FFD700] text-[#0A1128] rounded-xl p-3 min-w-[70px] shadow-xl text-center leading-none">
                      <span className="text-2xl font-black">{new Date(event.date).getDate()}</span>
                      <span className="text-xs font-bold uppercase tracking-tighter">
                        {new Date(event.date).toLocaleDateString('fr-FR', { month: 'short' })}
                      </span>
                    </div>
                  </div>

                  {/* 2. CONTENT AREA */}
                  <div className="flex flex-col flex-grow p-8 relative">

                    {/* Metadata Line - Redesigned for cleanliness and legibility */}
                    <div className="flex items-center gap-4 mb-5">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#0A1128] dark:text-white/90 uppercase tracking-widest">
                        <MapPin size={15} className="text-[#FFD700]" />
                        <span className="truncate max-w-[140px]">{event.location}</span>
                      </div>

                      <div className="h-4 w-px bg-gray-200 dark:bg-white/10" />

                      <div className="flex items-center gap-2 text-xs font-bold text-[#0A1128]/70 dark:text-white/70 uppercase tracking-widest">
                        <Users size={15} className="text-[#FFD700]" />
                        <span>{event.participants || 0} Places</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-black text-[#0A1128] dark:text-white mb-4 line-clamp-2 leading-tight uppercase tracking-tighter group-hover:text-[#FFD700] transition-colors">
                      {event.title}
                    </h3>

                    {/* Description courte */}
                    <p className="text-[#0A1128]/70 dark:text-gray-400 line-clamp-2 text-sm font-medium leading-relaxed mb-6 flex-grow italic">
                      {stripHtml(event.description)}
                    </p>

                    {/* Bottom Action Area */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-white/10 mt-auto">

                      {/* Speaker Avatars Stack */}
                      <div className="flex items-center -space-x-3">
                        {event.speakers && event.speakers.length > 0 ? (
                          event.speakers.slice(0, 3).map((speaker: { name: string }, idx: number) => (
                            <div key={idx} className="h-8 w-8 rounded-full border-2 border-white dark:border-[#0A1128] bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600 overflow-hidden relative" title={speaker.name}>
                              {/* Si tu as une image speaker, mets la ici, sinon Initiales */}
                              <span className="z-10">{speaker.name.charAt(0)}</span>
                            </div>
                          ))
                        ) : (
                          <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                            <Sparkles size={14} className="text-[#FFD700]" />
                            <span>La Trouvaille</span>
                          </div>
                        )}
                        {event.speakers && event.speakers.length > 3 && (
                          <div className="h-8 w-8 rounded-full border-2 border-white dark:border-[#0A1128] bg-[#0A1128] text-white flex items-center justify-center text-[10px] font-bold z-10">
                            +{event.speakers.length - 3}
                          </div>
                        )}
                      </div>

                      {/* Animated CTA Button */}
                      <div className="relative overflow-hidden rounded-full p-2">
                        <div className={cn(
                          "flex items-center justify-center h-10 w-10 rounded-full bg-[#0A1128] dark:bg-white text-white dark:text-[#0A1128] transition-all duration-300",
                          hoveredId === event.id ? "w-28" : "w-10"
                        )}>
                          <ArrowUpRight size={20} className={cn("transition-transform", hoveredId === event.id && "translate-x-8 opacity-0 absolute")} />
                          <span className={cn(
                            "absolute text-xs font-bold whitespace-nowrap opacity-0 transition-all duration-300",
                            hoveredId === event.id && "opacity-100"
                          )}>
                            S&apos;inscrire
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        )}

        {/* EMPTY STATE - Illustration Design */}
        {!isLoading && displayEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center py-20 px-4 rounded-[2.5rem] bg-gray-50 dark:bg-white/5 border border-dashed border-gray-300 dark:border-white/20"
          >
            <div className="h-24 w-24 rounded-full bg-[#FFD700]/10 flex items-center justify-center mb-6 text-[#FFD700]">
              <Calendar size={40} />
            </div>
            <h3 className="text-3xl font-black text-[#0A1128] dark:text-white mb-4 uppercase tracking-tighter">
              Le silence avant <span className="text-[#FFD700]">l&apos;impact</span>.
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8 italic font-medium leading-relaxed">
              Nous préparons actuellement de nouvelles expériences immersives pour la jeunesse. <br /> Soyez prêts pour le prochain chapitre.
            </p>
            <Link href="/contact" className="px-10 py-5 bg-[#0A1128] dark:bg-white text-white dark:text-black font-black text-lg uppercase tracking-tighter transition-all hover:scale-105 active:scale-95 shadow-2xl">
              Rester informé
            </Link>
          </motion.div>
        )}

      </div>
    </section>
  )
}