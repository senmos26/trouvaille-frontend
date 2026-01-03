"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Facebook, Twitter, Linkedin, ArrowUpRight, Plus } from "lucide-react"
import { useTeamMembers } from "@/lib/hooks/use-team"
import { cn } from "@/lib/utils"

export default function TeamPage() {
  const { data: teamMembers, isLoading, error } = useTeamMembers()
  const [displayCount, setDisplayCount] = useState(6)

  const visibleMembers = (teamMembers || []).slice(0, displayCount)
  const hasMore = (teamMembers || []).length > displayCount

  // Gestion des états de chargement et d'erreur
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A1128] flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FFD700]"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0A1128] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Erreur de chargement</h2>
          <p className="text-white/60">Impossible de charger l&apos;équipe.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#0A1128] min-h-screen text-white selection:bg-[#FFD700] selection:text-[#0A1128]">

      {/* 1. HERO SECTION - EDITORIAL SPLIT STYLE */}
      <section className="pt-40 pb-20 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-b border-white/10 pb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-1/2"
          >
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-serif italic text-[#FFD700] opacity-90 leading-none">
              L'Humain
            </h1>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-white uppercase tracking-tight mt-2 lg:ml-24">
              Au cœur de l'innovation
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/3 text-lg text-white/60 font-light leading-relaxed"
          >
            <p>
              Nous sommes une mosaïque de talents, de cultures et d'ambitions.
              Unis par la volonté de redéfinir les standards et de propulser
              l'Afrique vers son plein potentiel.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. TEAM GRID - STAGGERED / MASONRY FEEL */}
      <section className="py-20 container mx-auto px-4">
        {/* Filter / Stats placeholder (optional decorative) */}
        <div className="flex justify-end mb-24 opacity-30">
          <span className="text-sm uppercase tracking-widest border-b border-white/50 pb-1">
            {teamMembers?.length || 0} Membres Fondateurs
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-32">
          {visibleMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.7 }}
              className={cn(
                "group relative flex flex-col",
                // Stagger effect: Push down every 2nd item in a 3-col grid logic, or vary margins
                index % 3 === 1 ? "lg:translate-y-24" : "",
                // Mobile stagger
                index % 2 === 1 ? "md:lg:translate-y-0 md:translate-y-16 lg:translate-y-24" : ""
              )}
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-8 bg-white/5">
                <Link href={`/team/${member.id}`} className="block w-full h-full cursor-pointer">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  {/* Hover Overlay - Minimal Tint */}
                  <div className="absolute inset-0 bg-[#0A1128]/20 group-hover:bg-[#0A1128]/0 transition-colors duration-500" />

                  {/* Socials appearing on Hover */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 -translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {member.social_linkedin && (
                      <a href={member.social_linkedin} className="p-2 bg-white text-[#0A1128] rounded-full hover:bg-[#FFD700] transition-colors">
                        <Linkedin size={16} />
                      </a>
                    )}
                    {member.social_twitter && (
                      <a href={member.social_twitter} className="p-2 bg-white text-[#0A1128] rounded-full hover:bg-[#FFD700] transition-colors">
                        <Twitter size={16} />
                      </a>
                    )}
                  </div>
                </Link>
              </div>

              {/* Info - Outside the image, Clean Text */}
              <div className="flex justify-between items-start border-t border-white/10 pt-6 group-hover:border-[#FFD700] transition-colors duration-300">
                <div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight text-white group-hover:text-[#FFD700] transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-white/50 font-serif italic mt-1 text-lg">
                    {member.position}
                  </p>
                </div>

                <Link
                  href={`/team/${member.id}`}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 group-hover:bg-[#FFD700] group-hover:text-[#0A1128] group-hover:border-[#FFD700] transition-all rotate-0 group-hover:rotate-45"
                >
                  <ArrowUpRight size={20} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More - Minimal */}
        {hasMore && (
          <div className="mt-32 flex justify-center">
            <button
              onClick={() => setDisplayCount(prev => prev + 6)}
              className="group flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors"
            >
              <span className="w-12 h-[1px] bg-white/30 group-hover:bg-white transition-colors" />
              Charger plus
              <Plus size={16} className="group-hover:rotate-90 transition-transform" />
            </button>
          </div>
        )}
      </section>

      {/* 3. CTA - MINIMALIST TEXT ONLY */}
      <section className="py-32 container mx-auto px-4 text-center border-t border-white/5 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-serif italic text-white mb-8">
            Une vision commune ?
          </h2>
          <Link href="/contact" className="inline-block relative group">
            <span className="text-xl md:text-2xl uppercase font-bold tracking-widest text-[#FFD700]">
              Rejoignez l'aventure
            </span>
            <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#FFD700] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </Link>
        </motion.div>
      </section>

    </div>
  )
}
