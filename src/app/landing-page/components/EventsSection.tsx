"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, Clock, UserCheck, ArrowRight } from "lucide-react"
import { sectionVariants, itemVariants } from "@/lib/animations"
import { useEvents } from "@/lib/hooks/use-events"

export default function EventsSection() {
  const { data: eventsData, isLoading } = useEvents({ limit: 3 })
  
  // Utiliser uniquement les données Supabase
  const displayEvents = eventsData?.data || []
  
  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFD700] mx-auto"></div>
        </div>
      </section>
    )
  }
  
  return (
    <motion.section 
      variants={sectionVariants} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, amount: 0.2 }} 
      className="py-20 bg-white"
    >
      <div className="container">
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Prochains Rendez-vous</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Participez à nos événements et rejoignez une communauté dynamique de jeunes leaders africains.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayEvents.map((event, index) => (
            <motion.div 
              key={event.id} 
              variants={itemVariants} 
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/60 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 bg-[#FFD700] text-[#0A1128] rounded-full text-xs font-bold">
                    {event.category?.name}
                  </span>
                  {event.category?.name === "Webinaire" && event.rubrique?.name && (
                    <span className="px-3 py-1 bg-[#0A1128] text-white rounded-full text-xs font-bold">
                      {event.rubrique.name}
                    </span>
                  )}
                </div>
                {/* Date badge */}
                <div className="absolute top-4 right-4 bg-white rounded-lg p-2 text-center shadow-lg">
                  <div className="text-2xl font-bold text-[#0A1128] leading-none">
                    {new Date(event.date).getDate()}
                  </div>
                  <div className="text-xs font-semibold text-gray-600 uppercase">
                    {new Date(event.date).toLocaleDateString('fr-FR', { month: 'short' })}
                  </div>
                </div>
              </div>

              {/* Contenu */}
              <div className="p-6">
                {/* Titre */}
                <h3 className="text-xl font-bold text-[#0A1128] mb-3 line-clamp-2">
                  {event.title}
                </h3>
                
                {/* Thèmes (pour les webinaires) */}
                {event.category?.name === "Webinaire" && event.themes && (
                  <div className="mb-3">
                    <h4 className="text-xs font-bold text-[#0A1128] mb-1">Thèmes :</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{event.themes}</p>
                  </div>
                )}

                {/* Intervenants (pour les webinaires) */}
                {event.category?.name === "Webinaire" && event.speakers && event.speakers.length > 0 && (
                  <div className="mb-3">
                    <h4 className="text-xs font-bold text-[#0A1128] mb-1">Intervenants :</h4>
                    <div className="flex flex-wrap gap-1">
                      {event.speakers.slice(0, 2).map((speaker: any, idx: number) => (
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
                    <p className="text-xs text-muted-foreground">{event.moderators.map((mod: any) => mod.name).join(", ")}</p>
                  </div>
                )}

                {/* Description (pour les non-webinaires) */}
                {event.category?.name !== "Webinaire" && (
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {event.description}
                  </p>
                )}

                {/* Détails */}
                <div className="space-y-2 mb-4 pt-3 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={16} className="text-[#0A1128]" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock size={16} className="text-[#0A1128]" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <UserCheck size={16} className="text-[#0A1128]" />
                    <span>{event.participants} inscrits</span>
                  </div>
                </div>

                {/* Tags */}
                {event.tags && event.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.tags.slice(0, 3).map((tag: any, idx: number) => (
                      <Link
                        key={idx}
                        href={`/events?tag=${encodeURIComponent(tag.tag?.name || tag.name)}`}
                        className="px-2 py-1 bg-[#0A1128]/5 text-[#0A1128] text-xs font-medium rounded hover:bg-[#0A1128] hover:text-white transition-all"
                      >
                        #{tag.tag?.name || tag.name}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Bouton */}
                <Link 
                  href={`/event/${event.id}`}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#FFD700] text-[#0A1128] font-bold rounded-xl hover:bg-[#E6C200] transition-all hover:scale-105"
                >
                  S'inscrire maintenant
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="text-center">
          <Link href="/events">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFD700] text-[#0A1128] font-bold rounded-xl shadow-lg hover:bg-[#E6C200] hover:shadow-xl hover:-translate-y-1 transition-all">
              Voir tous les événements
              <ArrowRight size={20} />
            </button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}
