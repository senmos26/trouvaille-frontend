"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Rocket, Heart } from "lucide-react"
import Counter from "@/components/counter"
import { sectionVariants } from "@/lib/animations"

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"])
  const subtitleY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"])
  const buttonsY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const statsY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div 
        className="absolute inset-0"
        style={{ 
          y: backgroundY,
          backgroundImage: 'linear-gradient(135deg, rgba(10, 17, 40, 0.95) 0%, rgba(23, 43, 77, 0.85) 50%, rgba(5, 10, 24, 0.95) 100%), url(/images/6007.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }} 
      />
      
      <motion.div
        className="container relative z-10 py-20"
        style={{ y: textY }}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div style={{ y: titleY, opacity }} className="text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
            Des idées pour bâtir
            <br />
            <span className="text-[#FFD700]">l'Afrique de demain</span>
          </h1>
        </motion.div>
        
        <motion.div style={{ y: subtitleY, opacity }} className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xl md:text-2xl text-white/90">
            La Trouvaille est un organisme fondé par des jeunes et pour les jeunes. 
            Une tribune où chaque voix compte pour construire une Afrique prospère, innovante et unie.
          </p>
        </motion.div>
        
        <motion.div style={{ y: buttonsY, opacity }} className="flex flex-wrap gap-4 justify-center mb-16">
          <Link href="/about">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFD700] text-[#0A1128] rounded-full font-semibold text-lg hover:bg-[#E6C200] transition-all hover:scale-105 hover:shadow-lg">
              <Rocket size={20} /> Découvrir notre mission
            </button>
          </Link>
          <Link href="/contact">
            <button className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/10 hover:border-white transition-all hover:scale-105">
              <Heart size={20} /> Nous rejoindre
            </button>
          </Link>
        </motion.div>
        
        <motion.div style={{ y: statsY, opacity }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { value: 500, suffix: "+", label: "Jeunes Engagés" },
              { value: 100, suffix: "+", label: "Webinaires Réalisés" },
              { value: 12, suffix: "", label: "Partenariats" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-2">
                  <Counter end={stat.value} suffix={stat.suffix} duration={2500} />
                </div>
                <div className="text-sm md:text-base text-white/80 font-medium uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
