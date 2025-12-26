"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Users } from "lucide-react"

export default function CtaSection() {
  return (
    <section className="py-24 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl">

        {/* La "Carte" principale : Coins arrondis, sombre, texture subtile */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2rem] bg-[#0A1128] dark:bg-gray-800 text-white shadow-2xl"
        >

          {/* Background Pattern - Abstraction de carte ou de réseau */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="none" stroke="white" strokeWidth="0.5" />
              <path d="M0 100 C 30 20 70 20 100 100 Z" fill="none" stroke="white" strokeWidth="0.5" />
              <circle cx="80" cy="20" r="30" fill="url(#grad1)" />
            </svg>
          </div>

          {/* Dégradé lumineux pour donner de la profondeur sans faire "Tech" */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-[#FFD700]/20 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-500/20 blur-[80px] rounded-full" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-8 md:p-16 gap-10">

            {/* Colonne Texte */}
            <div className="lg:w-3/5 text-center lg:text-left space-y-6">

              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Prêt à bâtir l&apos;avenir <br />
                <span className="text-[#FFD700]">avec nous ?</span>
              </h2>

              <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
                Ne restez pas spectateur. Devenez acteur du changement en rejoignant une communauté de plus de 500 jeunes leaders qui transforment l&apos;Afrique au quotidien.
              </p>
            </div>

            {/* Colonne Actions */}
            <div className="lg:w-2/5 flex flex-col items-center lg:items-end gap-4 w-full">

              {/* Bouton Primaire - Très large et incitatif */}
              <Link href="/contact" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto group relative flex items-center justify-center gap-3 bg-[#FFD700] text-[#0A1128] px-8 py-5 rounded-xl font-bold text-lg transition-all hover:bg-[#FFE55C] shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                >
                  Devenir Membre
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </Link>

              {/* Bouton Secondaire - Plus discret */}
              <Link href="/team" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 bg-transparent border border-white/20 dark:border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/5 dark:hover:bg-white/10 transition-all"
                >
                  <Users className="w-5 h-5" />
                  Rencontrer l&apos;équipe
                </motion.button>
              </Link>


            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}