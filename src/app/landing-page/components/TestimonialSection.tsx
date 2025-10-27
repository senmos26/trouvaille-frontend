"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Quote, ArrowLeft, ArrowRight } from "lucide-react"
import { sectionVariants, itemVariants } from "@/lib/animations"
import { useTestimonials } from "@/lib/hooks/use-testimonials"

export default function TestimonialSection() {
  const { data: testimonialsData, isLoading, error } = useTestimonials()
  const [currentIndex, setCurrentIndex] = useState(0)

  // Utiliser uniquement les données Supabase
  const displayTestimonials = testimonialsData || []

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
  }

  // Gestion des états de chargement et d'erreur
  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FFD700]"></div>
          </div>
        </div>
      </section>
    )
  }

  if (error || displayTestimonials.length === 0) {
    return null // Ne pas afficher la section si erreur ou pas de données
  }

  return (
    <motion.section 
      variants={sectionVariants} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, amount: 0.2 }} 
      className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white"
    >
      <div className="container">
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ils ont choisi <span className="text-[#FFD700]">La Trouvaille</span>
          </h2>
        </motion.div>

        <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20">
                  <Quote size={48} className="text-[#FFD700] mb-6" />
                  <blockquote className="text-xl md:text-2xl leading-relaxed mb-8 italic">
                    &ldquo;{displayTestimonials[currentIndex].quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#FFD700] flex items-center justify-center text-white font-bold text-xl">
                      {displayTestimonials[currentIndex].initials || displayTestimonials[currentIndex].author_name?.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{displayTestimonials[currentIndex].author_name || displayTestimonials[currentIndex].name}</h4>
                      <p className="text-gray-300">{displayTestimonials[currentIndex].author_title || displayTestimonials[currentIndex].title}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button 
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
              onClick={prevTestimonial}
              aria-label="Témoignage précédent"
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <ArrowLeft size={20} />
              </motion.div>
            </button>

            <div className="flex gap-2">
              {displayTestimonials.map((_: { id: string }, index: number) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex ? 'bg-[#FFD700] w-8' : 'bg-white/30'
                  }`}
                  onClick={() => goToTestimonial(index)}
                  aria-label={`Aller au témoignage ${index + 1}`}
                >
                  <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} />
                </button>
              ))}
            </div>

            <button 
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
              onClick={nextTestimonial}
              aria-label="Témoignage suivant"
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <ArrowRight size={20} />
              </motion.div>
            </button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
