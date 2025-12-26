"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Globe, Users, Lightbulb, TrendingUp } from "lucide-react"
import Image from "next/image"
import { sectionVariants } from "@/lib/animations"
import { HoverEffect } from "@/components/ui/card-hover-effect"

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"])
  const descriptionY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"])
  const buttonY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"])
  const africaY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"])
  const valuesY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"])
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0])

  const values = [
    { 
      icon: Globe,
      title: "Impact", 
      description: "Chaque action contribue au développement durable de l'Afrique",
      link: "#impact"
    },
    { 
      icon: Users,
      title: "Collaboration", 
      description: "L'union fait la force, ensemble nous sommes plus forts",
      link: "#collaboration"
    },
    { 
      icon: Lightbulb,
      title: "Innovation", 
      description: "Nous encourageons la créativité et les idées novatrices",
      link: "#innovation"
    },
    { 
      icon: TrendingUp,
      title: "Excellence", 
      description: "Nous visons l'excellence dans tout ce que nous entreprenons",
      link: "#excellence"
    },
  ]

  return (
    <motion.section 
      ref={ref}
      variants={sectionVariants} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, amount: 0.2 }} 
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="container">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-4 px-8 md:px-12">
          <div>
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-foreground"
              style={{ y: titleY, opacity }}
            >
              Qui sommes-nous ?
            </motion.h2>
            
            <motion.div 
              className="space-y-5 text-lg md:text-xl text-muted-foreground leading-relaxed"
              style={{ y: descriptionY, opacity }}
            >
              <p>
                <strong className="text-foreground">La Trouvaille</strong> est plus qu&apos;une organisation : c&apos;est un mouvement 
                de jeunes africains déterminés à transformer leur continent.
              </p>
              <p>
                Notre mission est de créer une plateforme où chaque jeune peut 
                exprimer ses idées et contribuer activement à la construction 
                d&apos;une Afrique prospère, unie et respectée.
              </p>
            </motion.div>

            <motion.div style={{ y: buttonY, opacity }} className="mt-8">
              <Link href="/about">
                <button className="px-9 py-3.5 bg-[#FFD700] text-[#0A1128] rounded-xl font-bold text-lg hover:bg-[#E6C200] transition-all hover:scale-105 shadow-md dark:shadow-[#FFD700]/20">
                  En savoir plus
                </button>
              </Link>
            </motion.div>
          </div>

          <motion.div 
            className="relative flex justify-center items-center"
            style={{ y: africaY, opacity }}
          >
            <div className="relative w-4/5 md:w-3/4 aspect-square flex items-center justify-center">
              <Image 
                src="/images/afrique2.png" 
                alt="Carte de l'Afrique avec jeunes engagés" 
                width={800}
                height={800}
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>

        <motion.div 
          style={{ y: valuesY, opacity }}
        >
          <HoverEffect 
            items={values.map(value => ({
              ...value,
              icon: value.icon
            }))}
            className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-0"
          />
        </motion.div>
      </div>
    </motion.section>
  )
}
