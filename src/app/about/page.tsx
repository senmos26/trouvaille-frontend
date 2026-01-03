"use client"

import { useRef, ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import { ArrowRight, Ticket, Globe, Zap, Users } from "lucide-react"
import { Timeline } from "@/components/ui/timeline"
import { useTimelineEntries } from "@/lib/hooks/use-timeline"

// --- 1. COMPOSANT TEXTE REVEAL (LE CŒUR DE L'EFFET) ---

interface ScrollRevealProps {
  children: string
  className?: string
}

const ScrollRevealParagraph = ({ children, className }: ScrollRevealProps) => {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "end 0.25"] // Commence quand le haut du texte entre, finit quand le bas est haut
  })

  const words = children.split(" ")

  return (
    <p ref={container} className={`flex flex-wrap leading-[1.1] ${className}`}>
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
  const opacity = useTransform(progress, range, [0.15, 1]) // 0.15 pour le texte "inactif", 1 pour "actif"

  // On ajoute une petite transition sur le Y pour un effet de montée subtil
  const y = useTransform(progress, range, [10, 0])

  return (
    <span className="relative mr-[1.5%] lg:mr-[1.2%] mt-[0.5%] inline-block">
      <motion.span style={{ opacity, y }} className="transition-colors duration-200">
        {children}
      </motion.span>
    </span>
  )
}

// --- 2. COMPOSANTS UI PREMIUM ---

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

const ParallaxImage = ({ src, alt, className = "" }: { src: string, alt: string, className?: string }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"])
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.2])

  return (
    <div ref={ref} className={`relative w-full h-full overflow-hidden will-change-transform ${className}`}>
      <motion.div style={{ y, scale, height: "130%", width: "100%", top: "-15%", position: "absolute" }}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[#0A1128]/10 pointer-events-none" />
    </div>
  )
}

// Données institutionnelles de la chronologie
const fallbackTimelineData = [
  { title: "2020", content: "L'Étincelle initiale. Une réunion visionnaire à Dakar pose les jalons d'un mouvement dédié à l'empowerment de la jeunesse africaine à travers l'innovation et la culture." },
  { title: "2021", content: "Fondation et Structure. Immatriculation officielle de La Trouvaille et inauguration de notre premier hub créatif, un espace de synergie pour les talents émergents." },
  { title: "2022", content: "Lancement de 'Youth Voices'. Un programme d'envergure qui a permis de cartographier et d'amplifier les initiatives à fort impact social à travers l'Afrique de l'Ouest." },
  { title: "2023", content: "Sommet de l'Excellence. Organisation de notre premier forum panafricain réunissant décideurs, artistes et entrepreneurs pour redéfinir l'architecture du futur africain." },
  { title: "2024", content: "L'Échelle Continentale. Expansion stratégique dans 10 pays, consolidant notre position de leader dans l'accompagnement des leaders responsables de demain." },
]

export default function AboutPage() {
  const { data: timelineData } = useTimelineEntries()
  const containerRef = useRef(null)

  // Timeline Data Adapté - Typographie Éditoriale
  const displayTimelineData = (timelineData || []).length > 0
    ? (timelineData || []).map((entry: { year?: string; title?: string; content?: string }) => ({
      title: entry.year || entry.title || "",
      content: (
        <div className="space-y-6">
          <h3 className="text-3xl md:text-5xl font-black text-[#0A1128] dark:text-white uppercase tracking-tighter leading-none">{entry.title}</h3>
          <p className="text-xl md:text-2xl font-serif italic text-[#0A1128]/80 dark:text-white/80 leading-relaxed max-w-2xl">{entry.content}</p>
        </div>
      )
    }))
    : fallbackTimelineData.map(item => ({
      title: item.title,
      content: (
        <div className="space-y-6">
          <h3 className="text-3xl md:text-5xl font-black text-[#0A1128] dark:text-white uppercase tracking-tighter leading-none">{item.title === "2021" ? "Genèse" : "Expansion"}</h3>
          <p className="text-xl md:text-2xl font-serif italic text-[#0A1128]/80 dark:text-white/80 leading-relaxed max-w-2xl">{item.content}</p>
        </div>
      )
    }))

  return (
    <div ref={containerRef} className="bg-white dark:bg-[#050A15] text-[#0A1128] dark:text-white selection:bg-[#FFD700] selection:text-[#0A1128] overflow-x-hidden">

      {/* 1. HERO SECTION - EFFET TEXTE MASSIF */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0A1128]/5 via-transparent to-transparent opacity-50" />

        <div className="container mx-auto px-4 z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} // Courbe "Apple"
          >
            <h1 className="text-[14vw] md:text-[11rem] font-black leading-[0.8] tracking-[-0.05em] uppercase mix-blend-difference text-[#0A1128] dark:text-white">
              Audace<span className="text-[#FFD700] text-[1.5rem] md:text-[3rem] align-top relative top-4 md:top-8 font-serif italic lowercase tracking-normal">et</span>
              <br />
              Impact
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-12 flex flex-col items-center gap-6"
          >
            <p className="max-w-md mx-auto text-sm md:text-base font-bold uppercase tracking-[0.2em] text-[#0A1128]/40 dark:text-white/40">
              L&apos;architecture du futur africain
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. STORY SECTION */}
      <section className="py-24 md:py-40">
        <div className="container mx-auto px-4">

          {/* Main Manifeste Reveal - Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start mb-16 lg:mb-0">
            <div className="lg:col-span-6 lg:sticky lg:top-32 h-fit">
              <SectionTitle subtitle="Le Manifeste">
                Bâtir le <span className="text-[#FFD700] italic font-serif lowercase">monde</span> de demain.
              </SectionTitle>

              <ScrollRevealParagraph className="text-3xl md:text-5xl lg:text-6xl font-black text-[#0A1128] dark:text-white uppercase tracking-tighter leading-[0.9]">
                Nous ne sommes pas de simples spectateurs des mutations de l&apos;Afrique. Nous sommes les architectes de sa renaissance. Chaque projet est une brique, chaque idée est un moteur.
              </ScrollRevealParagraph>
            </div>

            <div className="lg:col-span-6 lg:mt-32">
              <div className="aspect-[3/4] relative w-full">
                <ParallaxImage
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2574"
                  alt="African Leadership"
                  className="rounded-[2.5rem]"
                />
              </div>
            </div>
          </div>

          {/* Mission/Vision + Small Photo Aligned - Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 mt-20 lg:mt-32 relative z-20">
            {/* L'Engagement & L'Horizon - Now stays below the text without overlap */}
            <div className="lg:col-span-7 xl:col-span-8 order-2 lg:order-1 self-end">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-[#0A1128]/10 dark:border-white/10 pt-12">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-[#FFD700]">L&apos;Engagement / Mission</h4>
                  <p className="text-xl md:text-2xl font-serif italic text-[#0A1128] dark:text-white leading-[1.2] tracking-tight">
                    Propulser l&apos;excellence africaine en bâtissant l&apos;infrastructure qui transforme chaque talent brut en un leader d&apos;impact mondial.
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-[#FFD700]">L&apos;Horizon / Vision</h4>
                  <p className="text-xl md:text-2xl font-serif italic text-[#0A1128] dark:text-white leading-[1.2] tracking-tight">
                    Voir une jeunesse africaine unie, souveraine et maîtresse de sa destinée, au cœur des innovations qui façonneront le siècle.
                  </p>
                </div>
              </div>
            </div>

            {/* Overlapping Small Photo - Negative margin only on this column */}
            <div className="lg:col-span-5 xl:col-span-4 order-1 lg:order-2 flex justify-end lg:-mt-[25rem]">
              <div className="aspect-square relative w-full border-8 border-white dark:border-[#050A15] rounded-[2.5rem] overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] duration-700">
                <ParallaxImage src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800" alt="Team work" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. FULL PARALLAX QUOTE - Seamless Transition */}
      <section className="pt-20 md:pt-32 pb-0 bg-gradient-to-b from-white via-white to-[#0A1128] dark:from-[#050A15] dark:via-[#050A15] dark:to-[#0A1128] transition-colors duration-500">
        <div className="w-full h-[70vh] md:h-[90vh] relative overflow-hidden rounded-t-[3rem] md:rounded-t-[10rem] bg-[#0A1128] shadow-2xl">
          <div className="absolute inset-0 z-0">
            <ParallaxImage src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=2000" alt="Crowd" />
          </div>
          {/* Dégradé progressif vers le bleu profond pour fusionner avec la section suivante */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A1128]/60 to-[#0A1128] z-10" />

          <div className="relative z-20 h-full flex items-center justify-center p-6 md:p-24 text-center">
            <ScrollRevealParagraph className="text-3xl md:text-7xl lg:text-[7.5rem] font-black text-white uppercase tracking-[-0.04em] justify-center text-center leading-[0.8] max-w-[90vw]">
              &quot;L&apos;avenir appartient à ceux qui voient des solutions là où les autres voient des problèmes.&quot;
            </ScrollRevealParagraph>
          </div>
        </div>
      </section>

      {/* 4. EXPERTISE - Seamlessly connected */}
      <section className="pt-24 md:pt-40 pb-32 md:pb-48 bg-[#0A1128] text-white rounded-b-[3rem] md:rounded-b-[10rem]">
        <div className="container mx-auto px-4">
          <SectionTitle subtitle="Savoir-Faire" dark>Nos Leviers.</SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              { icon: Globe, title: "Tribune d'Exode", desc: "Amplification médiatique des voix émergentes." },
              { icon: Zap, title: "Impact Labs", desc: "Incubateur de solutions concrètes et locales." },
              { icon: Users, title: "Ponts Décisifs", desc: "Mentorat stratégique intergénérationnel." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group p-10 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-[#FFD700] hover:text-[#0A1128] transition-all duration-500 cursor-pointer"
              >
                <item.icon className="w-10 h-10 mb-8 opacity-50 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">{item.title}</h3>
                <p className="text-sm font-medium opacity-60 group-hover:opacity-90">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-[#050A15]">
        <div className="container mx-auto px-4">
          <Timeline data={displayTimelineData} />
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="relative rounded-[3rem] bg-[#FFD700] p-12 md:p-32 overflow-hidden text-[#0A1128] text-center">
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-[-0.05em] leading-[0.85]">
                Rejoignez le <br /> mouvement.
              </h2>
              <div className="flex justify-center gap-4 pt-8">
                <Link href="/contact" className="px-8 py-4 bg-[#0A1128] text-white font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2">
                  Agir maintenant <ArrowRight size={18} />
                </Link>
                <Link href="/team" className="px-8 py-4 border-2 border-[#0A1128] text-[#0A1128] font-bold rounded-full hover:bg-[#0A1128] hover:text-white transition-colors flex items-center gap-2">
                  L&apos;équipe <Ticket size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}