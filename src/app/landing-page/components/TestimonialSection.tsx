"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Quote, Star } from "lucide-react"
import { useTestimonials } from "@/lib/hooks/use-testimonials"

// --- 1. SKELETON LOADING (Brutalist Style) ---
const TestimonialSkeleton = () => (
  <div className="container mx-auto px-4">
    <div className="relative border-[4px] border-[#111827]/10 dark:border-white/20 p-1 pb-1">
      <div className="bg-white dark:bg-[#050A15] border-[4px] border-[#111827]/10 dark:border-white/20 p-8 md:p-12 animate-pulse">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="md:col-span-3 aspect-square border-[2px] border-[#111827]/5 dark:border-white/10 bg-[#111827]/5 dark:bg-white/5" />
          <div className="md:col-span-9 space-y-8">
            <div className="h-10 w-full bg-[#111827]/5 dark:bg-white/10" />
            <div className="h-10 w-3/4 bg-[#111827]/5 dark:bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  </div>
)

// --- 2. BRUTALIST AVATAR COMPONENT ---
const BrutalistAvatar = ({ name, avatarUrl }: { name: string, avatarUrl?: string }) => {
  if (avatarUrl) {
    return (
      <div className="aspect-square w-full border-[2px] border-[#111827] dark:border-white overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
        <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
      </div>
    )
  }

  const words = name.split(' ');
  const initials = words.length > 1
    ? (words[0][0] + words[words.length - 1][0]).toUpperCase()
    : words[0].slice(0, 2).toUpperCase();

  const colors = [
    'bg-yellow-400', 'bg-cyan-400', 'bg-emerald-400',
    'bg-rose-400', 'bg-purple-400', 'bg-orange-400', 'bg-white'
  ];
  const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;

  return (
    <div className={`aspect-square w-full flex items-center justify-center font-black text-5xl md:text-7xl tracking-tighter text-[#111827] ${colors[colorIndex]} border-[2px] border-[#111827] dark:border-white`}>
      {initials}
    </div>
  );
};

export default function TestimonialSection() {
  const { data: testimonialsData, isLoading, error } = useTestimonials()
  const testimonials = (testimonialsData || []) as { id: string; author_name: string; avatar_url?: string; quote: string; author_title?: string }[]

  const [index, setIndex] = useState(0)
  const paginate = useCallback((dir: number) => {
    if (testimonials.length === 0) return;
    setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") paginate(-1)
      if (e.key === "ArrowRight") paginate(1)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [paginate])

  // Si pas de données ou erreur, ne rien afficher (ou fallback)
  if (!isLoading && (error || testimonials.length === 0)) return null

  const current = testimonials[index]
  const total = testimonials.length

  return (
    <section className="relative py-48 bg-white dark:bg-[#050A15] overflow-hidden font-sans transition-colors duration-500">

      {/* ATMOSPHERE BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] dark:opacity-[0.05]" />

        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#FFD700]/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {isLoading ? <TestimonialSkeleton /> : (
          <div className="w-full mx-auto">
            <div className="relative border-[4px] border-[#111827] dark:border-white p-1 pb-1 shadow-[20px_20px_0px_0px_rgba(23,43,77,0.05)] dark:shadow-[20px_20px_0px_0px_rgba(255,255,255,0.05)]">

              {/* STICKER */}
              <div className="absolute -top-[52px] left-0 bg-[#111827] dark:bg-white px-8 py-3 z-20 transition-all">
                <span className="text-white dark:text-black font-black text-xl uppercase tracking-tighter flex items-center gap-3">
                  <Star className="fill-current" size={16} />
                  Paroles de nos partenaires
                </span>
              </div>

              <div className="bg-white dark:bg-[#050A15] border-[4px] border-[#111827] dark:border-white p-6 md:p-12 relative overflow-hidden transition-colors duration-500">
                <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">

                  {/* LEFT: AVATAR */}
                  <div className="md:col-span-3 p-0.5 max-w-[300px] md:max-w-none mx-auto md:mx-0">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={current.id}
                        initial={{ opacity: 0, x: -50, filter: 'grayscale(1) blur(10px)' }}
                        animate={{ opacity: 1, x: 0, filter: 'grayscale(1) blur(0px)' }}
                        exit={{ opacity: 0, x: 50, filter: 'grayscale(1) blur(10px)' }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <BrutalistAvatar name={current.author_name} avatarUrl={current.avatar_url} />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* RIGHT: CONTENT */}
                  <div className="md:col-span-9 flex flex-col justify-center h-full space-y-8">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={current.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="space-y-6"
                      >
                        <blockquote className="relative">
                          <p className="text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-black text-[#111827] dark:text-white leading-[1.1] uppercase tracking-tighter italic transition-colors">
                            &quot;{current.quote}&quot;
                          </p>
                        </blockquote>

                        <div className="space-y-1">
                          <h4 className="text-xl md:text-2xl font-black text-[#111827] dark:text-white uppercase tracking-tight transition-colors">
                            {current.author_name}
                          </h4>
                          <p className="text-base font-bold text-[#FFB800] dark:text-[#FFD700] uppercase tracking-tight">
                            {current.author_title || "Partenaire Stratégique"}
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    <div className="space-y-6">
                      {/* NAVIGATION & SCALABLE COUNTER */}
                      <div className="flex flex-col sm:flex-row items-center gap-8 pt-6">
                        <div className="flex gap-4 w-full sm:w-auto">
                          <button
                            onClick={() => paginate(-1)}
                            className="flex-1 sm:flex-none bg-[#111827] dark:bg-white text-white dark:text-black py-4 px-8 font-black text-lg uppercase tracking-tighter hover:bg-[#FFD700] hover:dark:bg-[#FFD700] hover:text-black transition-all active:translate-y-1 active:translate-x-1 border-b-4 border-r-4 border-gray-700 dark:border-gray-300 hover:border-black"
                          >
                            Précédent
                          </button>
                          <button
                            onClick={() => paginate(1)}
                            className="flex-1 sm:flex-none bg-[#111827] dark:bg-white text-white dark:text-black py-4 px-8 font-black text-lg uppercase tracking-tighter hover:bg-[#FFD700] hover:dark:bg-[#FFD700] hover:text-black transition-all active:translate-y-1 active:translate-x-1 border-b-4 border-r-4 border-gray-700 dark:border-gray-300 hover:border-black"
                          >
                            Suivant
                          </button>
                        </div>

                        {/* SCALABLE COUNTER (Handles 1 or 100+ items gracefully) */}

                      </div>

                      {/* CONTINUOUS PROGRESS BAR (Handles large counts better than blocks) */}
                      <div className="w-full h-1 bg-black/5 dark:bg-white/5 relative overflow-hidden">
                        <motion.div
                          className="absolute top-0 left-0 h-full bg-[#FFD700]"
                          initial={false}
                          animate={{ width: `${((index + 1) / total) * 100}%` }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  )
}