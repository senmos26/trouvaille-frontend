"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { MessageSquare, BookOpen, Globe, Briefcase, Users, Leaf, Target, ArrowRight } from "lucide-react"
import { useObjectives } from "@/lib/hooks/use-objectives"
import * as LucideIcons from "lucide-react"

// ============================================================================
// COMPOSANT PRINCIPAL
// ============================================================================

export default function ObjectivesPage() {
  const { data: objectivesData, isLoading, error } = useObjectives()
  
  // Utiliser uniquement les données Supabase
  const objectives = objectivesData || []

  // Gestion des états de chargement et d'erreur
  if (isLoading) {
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

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#0A1128] mb-4">Erreur de chargement</h2>
            <p className="text-gray-600">Impossible de charger les objectifs. Veuillez réessayer plus tard.</p>
          </div>
        </div>
      </div>
    )
  }

  // Utiliser les données Supabase ou les données de fallback
  const displayObjectives = objectivesData && objectivesData.length > 0 ? objectivesData : objectives

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section 
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(10, 17, 40, 0.9), rgba(10, 17, 40, 0.8)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-full text-[#FFD700] font-semibold text-sm mb-6">
                <Target size={16} />
                <span>Notre Mission</span>
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
            >
              Notre Mission pour une <span className="text-[#FFD700]">Jeunesse Africaine</span> Épanouie
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto"
            >
              Découvrez les piliers qui guident notre action quotidienne pour le développement durable du continent.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Objectives Grid Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A1128] mb-4">
              Nos 6 Piliers Stratégiques
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Chaque objectif est un engagement fondamental de notre vision pour transformer 
              l'avenir et contribuer au rayonnement du continent.
            </p>
          </motion.header>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayObjectives.map((objective: any, index: number) => {
              // Récupérer l'icône Lucide dynamiquement
              const IconComponent = objectivesData && objectivesData.length > 0 
                ? (LucideIcons as any)[objective.icon] || Target
                : objective.icon
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group"
                >
                    <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 h-full border-t-4 overflow-hidden"
                      style={{ borderColor: objective.color || "#FFD700" }}
                    >
                      {/* Gradient background on hover */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                        style={{ backgroundColor: objective.color || "#FFD700" }}
                      />
                      
                      <div className="relative z-10 flex flex-col h-full">
                        <div 
                          className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                          style={{ 
                            backgroundColor: `${objective.color || "#FFD700"}1A`,
                            color: objective.color || "#FFD700"
                          }}
                        >
                          <IconComponent size={28} />
                        </div>
                        
                        <h3 className="text-xl font-bold text-[#0A1128] mb-3 leading-snug">
                          {objective.title}
                        </h3>
                        
                        <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                          {objective.description}
                        </p>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <span 
                            className="text-5xl font-bold opacity-10"
                            style={{ color: objective.color || "#FFD700" }}
                          >
                            0{index + 1}
                          </span>
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                            style={{ 
                              backgroundColor: `${objective.color || "#FFD700"}15`,
                              color: objective.color || "#FFD700"
                            }}
                          >
                            <ArrowRight size={20} />
                          </div>
                        </div>
                      </div>
                    </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0A1128] via-[#0A1128] to-[#172B4D] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#FFD700] rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FFD700] rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
      <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Rejoignez Notre Mission
              </h2>
              <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">
                Ensemble, construisons un avenir où chaque jeune africain peut s'épanouir, 
                innover et contribuer au développement durable de notre continent.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-[#FFD700] text-[#0A1128] font-bold text-lg rounded-xl hover:bg-[#E6C200] transition-all shadow-lg hover:shadow-2xl"
                  >
                    Devenir Membre
                  </motion.button>
                </Link>
                
                <Link href="/about">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold text-lg rounded-xl hover:bg-white/10 hover:border-white/50 transition-all"
                  >
                    En Savoir Plus
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
      </div>
      </section>
    </div>
  )
}
