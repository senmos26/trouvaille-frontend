"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Users } from "lucide-react"

export default function CtaSection() {
  return (
    <section className="py-24 md:py-32 px-4 bg-white dark:bg-[#050A15]  rounded-b-[3rem]">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[3rem] md:rounded-[5rem] bg-[#0A1128] text-white shadow-2xl border border-white/5"
        >

          <div className="relative z-10 p-10 md:p-24 flex flex-col items-center text-center">

            {/* Titre Editorial Massif */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-[-0.04em] max-w-4xl mb-10"
            >
              Prêt à transformer <br />
              <span className="text-[#FFD700] italic font-serif lowercase tracking-normal">l&apos;avenir</span> avec nous ?
            </motion.h2>


            {/* Boutons d'Action Premium */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
            >
              <Link href="/contact" className="w-full sm:w-auto">
                <button className="group relative w-full sm:w-auto px-10 py-5 bg-[#FFD700] text-[#0A1128] font-black text-lg uppercase tracking-tighter rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                  Devenir Membre
                  <ArrowUpRight className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </Link>

              <Link href="/team" className="w-full sm:w-auto text-center">
                <button className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black text-lg uppercase tracking-tighter rounded-2xl transition-all duration-300 flex items-center justify-center gap-3">
                  <Users size={20} />
                  Notre Équipe
                </button>
              </Link>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}