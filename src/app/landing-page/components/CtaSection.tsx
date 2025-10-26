"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Users } from "lucide-react"
import { sectionVariants, itemVariants } from "@/lib/animations"

export default function CtaSection() {
  return (
    <motion.section 
      variants={sectionVariants} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, amount: 0.2 }} 
      className="py-20 bg-[#FFD700] text-gray-900"
    >
      <div className="container text-center">
        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-6">
          Prêt à bâtir l'avenir avec nous ?
        </motion.h2>
        <motion.p variants={itemVariants} className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto">
          Faites partie de notre famille de jeunes bâtisseurs engagés. Ensemble, transformons nos idées en actions concrètes.
        </motion.p>
        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center">
          <Link href="/contact">
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-semibold text-lg hover:bg-gray-800 transition-all"
            >
              <Mail size={20} /> Nous contacter
            </motion.button>
          </Link>
          <Link href="/team">
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-full font-semibold text-lg hover:bg-gray-900 hover:text-white transition-all"
            >
              <Users size={20} /> Rencontrer l'équipe
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}
