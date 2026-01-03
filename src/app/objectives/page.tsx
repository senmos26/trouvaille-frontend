"use client"

import React, { useRef, ReactNode } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, MotionValue, useMotionTemplate } from "framer-motion"
import { Target, ArrowRight, ArrowUpRight } from "lucide-react"
import { useObjectives } from "@/lib/hooks/use-objectives"
import * as LucideIcons from "lucide-react"

// ============================================================================
// 1. COMPOSANTS UI PARTAGÉS (Basés sur AboutPage)
// ============================================================================

interface ScrollRevealProps {
  children: string
  className?: string
}

const ScrollRevealParagraph = ({ children, className }: ScrollRevealProps) => {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "end 0.25"]
  })

  const words = children.split(" ")

  return (
    <p ref={container} className={`flex flex-wrap leading-[1.05] justify-center ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + (1 / words.length)
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        )
      })}
    </p>
  )
}

const Word = ({ children, progress, range }: { children: string, progress: MotionValue<number>, range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.08, 1])
  const blurValue = useTransform(progress, range, [8, 0])
  const filter = useMotionTemplate`blur(${blurValue}px)`
  const scale = useTransform(progress, range, [0.95, 1])

  return (
    <span className="relative mx-[0.3rem] md:mx-[0.6rem] lg:mx-[0.8rem] inline-block">
      <motion.span
        style={{
          opacity,
          filter,
          scale
        }}
        className="transition-all duration-300"
      >
        {children}
      </motion.span>
    </span>
  )
}

const SectionTitle = ({ children, subtitle, dark = false }: { children: ReactNode, subtitle?: string, dark?: boolean }) => (
  <div className="mb-16 md:mb-24">
    {subtitle && (
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FFD700] mb-4 block"
      >
        {subtitle}
      </motion.span>
    )}
    <h2 className={`text-4xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-[-0.04em] uppercase overflow-hidden ${dark ? "text-white" : "text-[#0A1128] dark:text-white"}`}>
      <motion.span
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        viewport={{ once: true }}
        className="block"
      >
        {children}
      </motion.span>
    </h2>
  </div>
)



// ============================================================================
// 2. SOUS-COMPOSANTS SPÉCIFIQUES
// ============================================================================

const HeroParallax = () => {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const translateXLeft = useTransform(scrollYProgress, [0, 1], [0, -400])
  const translateXRight = useTransform(scrollYProgress, [0, 1], [0, 400])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  return (
    <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0A1128]/5 via-transparent to-transparent opacity-50" />

      <div className="container mx-auto px-4 z-10 text-center">
        <div className="flex flex-col items-center select-none">
          <motion.div
            style={{ x: translateXLeft, opacity, scale }}
            className="text-[15vw] md:text-[12rem] font-black leading-[0.7] tracking-[-0.05em] uppercase text-[#0A1128] dark:text-white"
          >
            Vision<span className="text-[#FFD700] text-[2rem] md:text-[5rem] align-top relative top-4 md:top-8 font-serif italic lowercase tracking-normal ml-2">&</span>
          </motion.div>

          <motion.div
            style={{ x: translateXRight, opacity, scale }}
            className="text-[15vw] md:text-[12rem] font-black leading-[0.7] tracking-[-0.05em] uppercase text-[#0A1128] dark:text-white mt-4"
          >
            Piliers
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-16 flex flex-col items-center gap-6"
        >
          <p className="max-w-md mx-auto text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-[#0A1128]/40 dark:text-white/40">
            L&apos;architecture de notre impact
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// 3. PAGE OBJECTIFS
// ============================================================================

export default function ObjectivesPage() {
  const { data: objectivesData, isLoading } = useObjectives()

  // Utiliser uniquement les données Supabase
  const objectives = objectivesData || []
  const displayObjectives = objectivesData && objectivesData.length > 0 ? objectivesData : objectives

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#050A15] flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FFD700]"></div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-[#050A15] text-[#0A1128] dark:text-white selection:bg-[#FFD700] selection:text-[#0A1128] overflow-x-hidden">

      <HeroParallax />

      {/* 2. MANIFESTE - ACERNETITY STYLE REVEAL */}
      <section className="py-32 md:py-60 relative overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#FFD700]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mb-12"
            >
              <h2 className="text-4xl md:text-7xl font-black leading-[0.9] tracking-[-0.04em] uppercase text-[#0A1128] dark:text-white">
                Un engagement <span className="text-[#FFD700] italic font-serif lowercase">total</span> <br className="hidden md:block" /> pour l&apos;avenir.
              </h2>
            </motion.div>

            <div className="max-w-5xl mx-auto mt-8">
              <ScrollRevealParagraph className="text-3xl md:text-5xl lg:text-7xl font-black text-[#0A1128] dark:text-white uppercase tracking-tighter leading-[0.9] justify-center text-center">
                Bâtir une jeunesse africaine épanouie, innovante et souveraine. Nos actions ne sont pas des gouttes d&apos;eau, mais les fondations structurelles d&apos;un continent en pleine renaissance.
              </ScrollRevealParagraph>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GRID SECTION - DARK & PREMIUM CARDS (Style "Savoir-Faire" de About) */}
      <section className="pt-24 md:pt-40 pb-32 md:pb-48 bg-[#0A1128] text-white rounded-t-[3rem] md:rounded-t-[8rem] relative z-10">
        <div className="container mx-auto px-4">
          <SectionTitle subtitle="Stratégie" dark>
            Nos 6 Axes <span className="text-[#FFD700] italic font-serif lowercase">d&apos;impact</span>.
          </SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 text-left">
            {displayObjectives.map((objective: { id: string; title: string; description: string; icon: string; color: string }, index: number) => {
              // Récupérer l'icône Lucide dynamiquement
              const IconComponent = objectivesData && objectivesData.length > 0
                ? (LucideIcons as unknown as Record<string, React.ComponentType>)[objective.icon] || Target
                : Target

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group p-10 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-[#FFD700] hover:text-[#0A1128] transition-all duration-500 cursor-pointer flex flex-col h-full"
                >
                  <div className="flex items-start justify-between mb-8">
                    <IconComponent className="w-12 h-12 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="text-4xl font-black opacity-10 group-hover:opacity-20 transition-opacity">0{index + 1}</span>
                  </div>

                  <h3 className="text-2xl font-black uppercase mb-4 tracking-tight leading-[0.9]">{objective.title}</h3>
                  <p className="text-sm font-medium opacity-60 group-hover:opacity-90 leading-relaxed min-h-[80px]">
                    {objective.description}
                  </p>

                  <div className="mt-auto pt-6 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                    <ArrowUpRight size={24} />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. CTA SECTION - GOLD ROUNDED (Style "Rejoignez le mouvement" de About) */}
      <section className="py-24 px-4 bg-white dark:bg-[#050A15] -mt-[4rem] relative z-20">
        <div className="container mx-auto">
          <div className="relative rounded-[3rem] bg-[#FFD700] p-12 md:p-32 overflow-hidden text-[#0A1128] text-center shadow-2xl">
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-[-0.05em] leading-[0.85]">
                Prêt à <br /> impacter ?
              </h2>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
                <Link href="/contact" className="px-8 py-4 bg-[#0A1128] text-white font-bold rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-2">
                  Devenir Membre <ArrowRight size={18} />
                </Link>
                <Link href="/about" className="px-8 py-4 border-2 border-[#0A1128] text-[#0A1128] font-bold rounded-full hover:bg-[#0A1128] hover:text-white transition-colors flex items-center justify-center gap-2">
                  Notre Histoire <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
