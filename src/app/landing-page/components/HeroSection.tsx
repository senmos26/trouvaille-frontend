"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { ArrowRight, Heart, CheckCircle2 } from "lucide-react"
import Counter from "@/components/counter"
import TextType from "@/components/TextType"
import { useStats } from "@/lib/hooks/use-stats"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { data: statsData } = useStats()
  
  // Valeurs par défaut si les données ne sont pas encore chargées
  const stats = statsData?.data || {
    young_leaders: 500,
    webinars: 100,
    partnerships: 12
  }
  
  // On track le scroll par rapport à ce container spécifique
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // --- CONFIGURATION PARALLAXE EXPERT ---
  
  // 1. L'Image de fond : Doit être plus grande que le container et bouger lentement
  // On utilise spring pour lisser le mouvement (doux arrêt)
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.15]) // Zoom très léger continu

  // 2. Le Texte (Gauche) : Monte plus vite que le fond pour créer le détachement
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"])
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]) // Fade out à mi-chemin

  // 3. La Carte (Droite) : Effet de "flottement" distinct (inertie différente)
  // Elle monte un peu moins vite que le texte, donnant l'impression d'être "posée"
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  
  return (
    <section 
      ref={containerRef} 
      className="relative h-[95vh] min-h-[700px] w-full flex items-center overflow-hidden"
    >
      
      {/* 1. LAYER ARRIÈRE-PLAN (Background) */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <motion.div 
          style={{ y: bgY, scale: bgScale }}
          className="relative w-full h-[120%] -top-[10%] will-change-transform" // will-change pour performance GPU
        >
          <Image 
            src="/images/6007.jpg" 
            alt="Jeunesse Africaine en action"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          
          {/* Les dégradés sont DANS le div qui bouge pour rester collés à l'image */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1128]/95 via-[#0A1128]/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/60 to-transparent" />
        </motion.div>
      </div>

      <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full pt-20">
        
        {/* 2. LAYER PREMIER PLAN (Texte) */}
        <motion.div 
          style={{ y: textY, opacity: textOpacity }}
          className="lg:col-span-7 text-white space-y-8 will-change-transform"
        >
          
         

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight"
          >
            Des idées pour bâtir <br/>
            <span className="text-[#FFD700] underline decoration-4 underline-offset-8 decoration-white/10">
              <TextType
                as="span"
                text={[
                  "l'Afrique de demain",
                  "l'Afrique qui innove",
                  "l'Afrique qui ose"
                ]}
                typingSpeed={80}
                pauseDuration={2000}
                showCursor={true}
                cursorCharacter="|"
              />
            </span>.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 max-w-xl leading-relaxed font-medium"
          >
            La Trouvaille est la tribune où chaque voix compte. Ensemble, transformons le potentiel de la jeunesse en impact réel pour notre continent.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 pt-2"
          >
            <Link href="/contact">
              <button className="group h-14 px-8 bg-[#FFD700] text-[#0A1128] font-bold text-lg hover:bg-white dark:hover:bg-gray-100 transition-all duration-300 rounded-sm flex items-center justify-center gap-2 min-w-[200px] shadow-[0_0_20px_rgba(255,215,0,0.2)] hover:shadow-[0_0_30px_rgba(255,215,0,0.4)]">
                Nous rejoindre
                <ArrowRight size={20} strokeWidth={3} className="transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
            <Link href="/about">
              <button className="h-14 px-8 border-2 border-white/20 dark:border-white/30 text-white font-bold text-lg hover:bg-white hover:text-[#0A1128] hover:border-white transition-all duration-300 rounded-sm min-w-[200px] backdrop-blur-sm">
                Notre Mission
              </button>
            </Link>
          </motion.div>
          
         
        </motion.div>

        {/* 3. LAYER FLOTTANT (Card) - Inertie différente */}
        <motion.div 
          style={{ y: cardY, opacity: textOpacity }} // Utilise cardY ici
          className="hidden lg:block lg:col-start-9 lg:col-span-4 perspective-1000"
        >
          <motion.div 
            initial={{ opacity: 0, x: 50, rotateY: -10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.2 }}
            className="bg-white dark:bg-gray-800 text-[#0A1128] dark:text-white p-8 rounded-sm shadow-2xl relative will-change-transform"
          >
            {/* Petit accent décoratif */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#FFD700] to-[#FFE55C]" />
            
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Heart className="fill-[#FFD700] text-[#FFD700]" />
              Notre Impact en Chiffres
            </h3>

            <div className="space-y-6 divide-y divide-gray-100">
              <div className="pt-4 group cursor-default">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tabular-nums group-hover:text-blue-700 dark:group-hover:text-[#FFD700] transition-colors">
                    <Counter end={stats.young_leaders} suffix="+" duration={2500} />
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wide mt-1">Jeunes Leaders Engagés</p>
              </div>

              <div className="pt-4 group cursor-default">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tabular-nums group-hover:text-blue-700 dark:group-hover:text-[#FFD700] transition-colors">
                    <Counter end={stats.webinars} suffix="+" duration={2500} />
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wide mt-1">Webinaires Éducatifs</p>
              </div>

              <div className="pt-4 group cursor-default">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tabular-nums group-hover:text-blue-700 dark:group-hover:text-[#FFD700] transition-colors">
                    <Counter end={stats.partnerships} duration={2500} />
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wide mt-1">Partenariats Stratégiques</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
               <p className="text-sm text-gray-500 italic">
                 "Une tribune pour construire une Afrique prospère et unie."
               </p>
            </div>
          </motion.div>
        </motion.div>

      </div>
      
      {/* Mobile Stats (Only visible on mobile) - Fixed at bottom */}
      <div className="absolute bottom-0 z-20 w-full bg-[#0A1128] py-6 lg:hidden border-t border-white/10">
        <div className="container flex justify-around text-center">
            <div>
               <p className="text-2xl font-bold text-white"><Counter end={500} suffix="+" /></p>
               <p className="text-xs text-gray-400 uppercase">Membres</p>
            </div>
            <div>
               <p className="text-2xl font-bold text-white"><Counter end={12} /></p>
               <p className="text-xs text-gray-400 uppercase">Partenaires</p>
            </div>
        </div>
      </div>

    </section>
  )
}