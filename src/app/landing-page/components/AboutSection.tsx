"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"

// --- COMPOSANT VALEUR (EDITORIAL CARD) ---
const ValueCard = ({ number, title, description, index }: { number: string, title: string, description: string, index: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    className="group relative p-7 rounded-[2rem] bg-white dark:bg-[#0A1128] border border-gray-100 dark:border-white/5 overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-[#FFD700]/10"
  >
    {/* Decorative Number Background */}
    <div className="absolute -top-6 -right-6 text-[8rem] font-black text-gray-50 dark:text-white/5 select-none pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:-translate-x-3 group-hover:translate-y-3">
      {number}
    </div>

    <div className="relative z-10 flex flex-col h-full">
      {/* Small accent line */}
      <div className="w-10 h-1 bg-[#FFD700] mb-4 group-hover:w-16 transition-all duration-500" />

      <h3 className="text-xl font-black text-[#0A1128] dark:text-white mb-2 tracking-tighter uppercase leading-tight">
        {title}
      </h3>

      <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-xs font-medium">
        {description}
      </p>

    
    </div>
  </motion.div>
)

export default function AboutSection() {
  const values = [
    {
      number: "01",
      title: "Impact Durable",
      description: "Chaque action est pensée pour laisser une empreinte positive et pérenne sur notre continent."
    },
    {
      number: "02",
      title: "Symbiose",
      description: "Nous favorisons l'intelligence collective pour démultiplier nos forces et nos succès."
    },
    {
      number: "03",
      title: "Audace Créative",
      description: "Nous refusons le conventionnel. L'innovation prospère là où l'on ose briser les codes."
    },
    {
      number: "04",
      title: "Excellence",
      description: "La jeunesse mérite le meilleur. Nous appliquons les standards de qualité les plus rigoureux."
    },
  ]

  return (
    <section className="relative min-h-screen flex flex-col justify-center py-16 bg-white dark:bg-[#050A15] overflow-hidden">

      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#FFD700]/5 to-transparent pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-4">

        {/* --- PARTIE 1: STORYTELLING (EDITORIAL LAYOUT) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">

          {/* GAUCHE: TEXTE (6 cols) */}
          <div className="lg:col-span-6 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0A1128] dark:text-white leading-[0.95] tracking-[-0.04em] mb-6 uppercase"
            >
              Plus qu’une <br />
              organisation, <br />
              <span className="text-[#FFD700] lowercase italic font-serif">un</span> Mouvement.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-4 text-sm md:text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg"
            >
              <p>
                <strong className="text-[#0A1128] dark:text-white font-black uppercase tracking-tight text-lg block mb-1">La Trouvaille</strong>
                est née d’une conviction inébranlable : la jeunesse africaine détient les clés de sa propre destinée.
              </p>
              <p className="italic">
                Nous ne sommes pas des spectateurs. Nous bâtissons l’infrastructure qui permet à chaque talent de s’exprimer pleinement.
              </p>

              <div className="pt-4">
                <Link href="/about" className="group relative overflow-hidden inline-flex items-center gap-4 px-7 py-3.5 bg-[#0A1128] dark:bg-white text-white dark:text-black font-black text-base uppercase tracking-tighter transition-all hover:scale-105 active:scale-95 shadow-lg">
                  <span>Notre Histoire</span>
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* DROITE: ARCHITECTURAL COMPOSITION (6 cols) */}
          <div className="lg:col-span-6 relative group">
            {/* Decorative Frame */}
            <div className="absolute inset-0 border-[8px] border-[#FFD700]/10 translate-x-4 translate-y-4 rounded-[2.5rem] transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2" />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[400px] lg:h-[450px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl bg-gray-100 dark:bg-[#1A2333]"
            >
              <Image
                src="/images/6007.jpg"
                alt="Dynamisme"
                fill
                className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 grayscale hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/60 via-transparent to-transparent opacity-40" />
            </motion.div>
          </div>
        </div>

        {/* --- PARTIE 2: VALUES GRID --- */}
        <div className="space-y-8">
          <div className="flex items-end justify-between border-b border-gray-100 dark:border-white/5 pb-6">
            <h3 className="text-2xl font-black text-[#0A1128] dark:text-white uppercase tracking-tighter">
              Nos <span className="text-[#FFD700]">Piliers</span>.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <ValueCard key={idx} {...val} index={idx} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}