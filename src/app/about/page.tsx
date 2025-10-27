"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  MessageSquare,
  Calendar,
  MessageCircle,
  Users,
  Target,
  Sparkles,
  Globe,
  Heart,
  Award,
  BarChart,
  GitBranch,
  Rocket,
  TrendingUp,
  MapPin
} from "lucide-react"
import { Timeline } from "@/components/ui/timeline"
import { useTimelineEntries } from "../../../lib/hooks/use-timeline"

const stats = [
  { icon: <GitBranch size={24} />, value: "2021", label: "Année de création", description: "Une initiative née de la volonté des jeunes Africains." },
  { icon: <Award size={24} />, value: "50+", label: "Projets menés", description: "Actions concrètes sur le terrain dans plusieurs pays." },
  { icon: <BarChart size={24} />, value: "5000+", label: "Jeunes mobilisés", description: "Une communauté engagée qui grandit chaque année." }
]

const specialities = [
  { icon: <MessageSquare size={28} />, title: "Tribune d'expression", description: "Nous amplifions la voix de la jeunesse pour faire entendre ses idées." },
  { icon: <Calendar size={28} />, title: "Organisation d'événements", description: "Des rencontres impactantes qui créent des passerelles durables." },
  { icon: <MessageCircle size={28} />, title: "Débats & plaidoyers", description: "Des espaces de dialogue pour influencer les décisions publiques." }
]

const pillars = [
  { icon: <Target size={24} />, title: "Mission", text: "Offrir une plateforme où chaque jeune peut transformer ses idées en actions." },
  { icon: <Sparkles size={24} />, title: "Vision", text: "Une Afrique solidaire, prospère et propulsée par la créativité de sa jeunesse." },
  { icon: <Heart size={24} />, title: "Valeurs", text: "Engagement, inclusion, excellence et collaboration permanente." }
]

// Données de fallback pour la timeline (en cas d'erreur ou de données vides)
const fallbackTimelineData = [
  {
    title: "2021",
    content: (
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-[#0A1128] mb-4">
          Naissance du mouvement
        </h3>
        <p className="text-neutral-700 text-sm md:text-base mb-8 leading-relaxed">
          Création de La Trouvaille et lancement des premiers labs d&apos;idées. Un groupe de jeunes visionnaires se réunit avec une mission claire : donner une voix à la jeunesse africaine.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
            alt="Lancement La Trouvaille"
            width={800}
            height={600}
            className="h-20 md:h-44 lg:h-60 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(10,17,40,0.06)]"
          />
          <Image
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop"
            alt="Premiers labs"
            width={800}
            height={600}
            className="h-20 md:h-44 lg:h-60 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(10,17,40,0.06)]"
          />
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-[#FFD700]/10 text-[#0A1128] rounded-full text-xs font-semibold flex items-center gap-1">
            <Rocket size={14} /> Lancement officiel
          </span>
          <span className="px-3 py-1 bg-[#0A1128]/10 text-[#0A1128] rounded-full text-xs font-semibold">
            1er Labs d&apos;idées
          </span>
        </div>
      </div>
    ),
  },
  {
    title: "2022",
    content: (
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-[#0A1128] mb-4">
          Structuration continentale
        </h3>
        <p className="text-neutral-700 text-sm md:text-base mb-6 leading-relaxed">
          Organisation de tournées régionales et signature de partenariats clés. Expansion de notre réseau dans plusieurs pays africains.
        </p>
        <div className="mb-6 space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#FFD700] mt-2 flex-shrink-0" />
            <p className="text-neutral-700 text-sm md:text-base">
              Tournées régionales dans 8 pays africains
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#FFD700] mt-2 flex-shrink-0" />
            <p className="text-neutral-700 text-sm md:text-base">
              Signature de 15+ partenariats stratégiques
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#FFD700] mt-2 flex-shrink-0" />
            <p className="text-neutral-700 text-sm md:text-base">
              Création de bureaux régionaux
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Image
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop"
            alt="Tournées régionales"
            width={800}
            height={600}
            className="h-20 md:h-44 lg:h-60 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(10,17,40,0.06)]"
          />
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
            alt="Partenariats"
            width={800}
            height={600}
            className="h-20 md:h-44 lg:h-60 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(10,17,40,0.06)]"
          />
        </div>
        <div className="mt-6 flex items-center gap-2 text-[#0A1128]">
          <MapPin size={16} />
          <span className="text-sm font-semibold">8 pays • 15 partenariats • 3 bureaux</span>
        </div>
      </div>
    ),
  },
  {
    title: "2023",
    content: (
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-[#0A1128] mb-4">
          Impact démultiplié
        </h3>
        <p className="text-neutral-700 text-sm md:text-base mb-6 leading-relaxed">
          Plus de 30 projets accompagnés et un réseau de mentors confirmés. L&apos;année de la consolidation et de l&apos;expansion de notre impact.
        </p>
        <div className="mb-8">
          <h4 className="font-semibold text-[#0A1128] mb-4">Réalisations majeures</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs md:text-sm text-neutral-700">
              ✅ 30+ projets jeunesse accompagnés
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm text-neutral-700">
              ✅ Réseau de 50+ mentors experts
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm text-neutral-700">
              ✅ 3 grands événements continentaux
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm text-neutral-700">
              ✅ 2000+ jeunes formés et accompagnés
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm text-neutral-700">
              ✅ Plateforme digitale lancée
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Image
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop"
            alt="Projets accompagnés"
            width={800}
            height={600}
            className="h-20 md:h-44 lg:h-60 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(10,17,40,0.06)]"
          />
          <Image
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop"
            alt="Formations"
            width={800}
            height={600}
            className="h-20 md:h-44 lg:h-60 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(10,17,40,0.06)]"
          />
          <Image
            src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop"
            alt="Événements"
            width={800}
            height={600}
            className="h-20 md:h-44 lg:h-60 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(10,17,40,0.06)]"
          />
          <Image
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop"
            alt="Réseau mentors"
            width={800}
            height={600}
            className="h-20 md:h-44 lg:h-60 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(10,17,40,0.06)]"
          />
        </div>
      </div>
    ),
  },
  {
    title: "2024",
    content: (
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-[#0A1128] mb-4">
          Accélération & Innovation
        </h3>
        <p className="text-neutral-700 text-sm md:text-base mb-8 leading-relaxed">
          Lancement du programme Youth Voices et expansion dans 5 nouveaux pays africains. Une année marquée par l&apos;innovation et la scalabilité de nos programmes.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Image
            src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop"
            alt="Youth Voices"
            width={800}
            height={600}
            className="h-20 md:h-44 lg:h-60 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(10,17,40,0.06)]"
          />
          <Image
            src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop"
            alt="Expansion"
            width={800}
            height={600}
            className="h-20 md:h-44 lg:h-60 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(10,17,40,0.06)]"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-[#FFD700] text-[#0A1128] rounded-full text-xs font-bold flex items-center gap-1">
            <TrendingUp size={14} /> 5 nouveaux pays
          </span>
          <span className="px-3 py-1 bg-[#0A1128] text-white rounded-full text-xs font-bold">
            Youth Voices lancé
          </span>
          <span className="px-3 py-1 bg-[#14B8A6]/20 text-[#14B8A6] rounded-full text-xs font-bold">
            50+ projets actifs
          </span>
        </div>
      </div>
    ),
  },
]

// Variants simplifiés pour éviter les erreurs de type
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.2 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function AboutPage() {
  const { data: timelineData, isLoading: timelineLoading, error: timelineError } = useTimelineEntries()

  // Gestion des états de chargement et d'erreur pour la timeline
  if (timelineLoading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFD700] mx-auto mb-4"></div>
          <p className="text-[#0A1128]">Chargement de la page...</p>
        </div>
      </div>
    )
  }

  if (timelineError) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Erreur lors du chargement des données</p>
          <p className="text-gray-600">Veuillez réessayer plus tard</p>
        </div>
      </div>
    )
  }

  // Utiliser les données Supabase ou les données de fallback
  const displayTimelineData = timelineData && timelineData.length > 0 ? timelineData : fallbackTimelineData

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-[70vh] flex items-center justify-center text-center bg-[#0A1128] text-white overflow-hidden py-24"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#FFD700 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        </div>
        <div className="container relative z-10 max-w-4xl">
          <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            La plateforme où chaque idée de jeunesse devient une <span className="text-[#FFD700]">réalité tangible</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-white/85 mb-8 max-w-2xl mx-auto">
            Depuis 2021, La Trouvaille fédère des milliers de jeunes Africains pour imaginer, co-construire
            et mettre en œuvre des solutions concrètes au service du continent.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <motion.button whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }} className="px-8 py-3 bg-[#FFD700] text-[#0A1128] rounded-lg font-semibold hover:bg-[#E6C200] transition-all">
                Nous contacter
              </motion.button>
            </Link>
            <Link href="/events">
              <motion.button whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }} className="px-8 py-3 border-2 border-white/35 text-white rounded-lg font-semibold hover:bg-white/10 hover:border-white transition-all">
                Découvrir nos actions
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80" alt="Jeunes réunis" width={1200} height={800} className="w-full h-full object-cover" />
              <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-[#0A1128]/80 backdrop-blur-sm text-white px-4 py-3 rounded-lg">
                <Globe size={28} />
                <div>
                  <p className="text-sm">Présence sur</p>
                  <strong className="text-[#FFD700]">5 pays africains</strong>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-4xl font-bold mb-6">Une organisation portée par la jeunesse africaine</h2>
              <p className="text-lg text-muted-foreground mb-8">
                La Trouvaille est née de l&apos;impulsion de jeunes passionnés qui refusent de laisser les défis du continent
                sans réponses. Notre communauté accompagne la jeunesse à chaque étape : idéation, structuration, financement
                et déploiement de projets à impact.
              </p>
              <div className="space-y-4">
                {pillars.map((pillar) => (
                  <motion.div variants={itemVariants} key={pillar.title} className="flex items-start gap-4 bg-gray-50 rounded-xl p-4 border">
                    <span className="flex items-center justify-center w-11 h-11 rounded-lg bg-[#0A1128] text-[#FFD700] flex-shrink-0">
                      {pillar.icon}
                    </span>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{pillar.title}</h3>
                      <p className="text-sm text-muted-foreground">{pillar.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="py-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                key={stat.label}
                className="bg-white rounded-xl p-6 border"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[#FFD700]">{stat.icon}</span>
                  <span className="text-4xl font-bold text-[#0A1128]">{stat.value}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{stat.label}</h3>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Specialities Section */}
      <motion.section
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container">
          <motion.div variants={itemVariants} className="text-center mb-12 max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1 bg-[#0A1128]/5 text-[#0A1128] rounded-full text-sm font-semibold mb-4">Nos expertises</span>
            <h2 className="text-4xl font-bold mb-4">Ce que nous faisons au quotidien</h2>
            <p className="text-lg text-muted-foreground">
              Au-delà des discours, nous accompagnons les jeunes leaders avec des programmes pragmatiques, une communauté bienveillante
              et un réseau d&apos;experts mobilisés.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {specialities.map((speciality) => (
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                key={speciality.title}
                className="text-center bg-white rounded-xl p-8 border shadow-lg"
              >
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br from-[#FFD700] to-[#FFD700] text-[#0A1128] mb-6">
                  {speciality.icon}
                </span>
                <h3 className="text-xl font-bold mb-3">{speciality.title}</h3>
                <p className="text-muted-foreground">{speciality.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <section className="py-0 bg-white overflow-hidden">
        <div className="w-full">
          <Timeline data={displayTimelineData} />
        </div>
      </section>

      {/* Team CTA Section */}
      <motion.section
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={sectionVariants}
      >
        <div className="container">
          <motion.div variants={itemVariants} className="relative bg-[#0A1128] text-white rounded-2xl p-12 md:p-16 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#FFD700]/10 to-transparent pointer-events-none" />
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-4">Des talents engagés au service de la jeunesse</h2>
                <p className="text-white/80 text-lg">
                  La Trouvaille réunit des profils variés, tous partageant la même
                  envie d&apos;accompagner la relève africaine et de créer des opportunités durables.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/team" className="flex-1 min-w-[200px]">
                  <motion.button whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }} className="w-full px-6 py-3 bg-[#FFD700] text-[#0A1128] rounded-lg font-semibold hover:bg-[#E6C200] transition-all flex items-center justify-center gap-2">
                    <Users size={18} /> Découvrir notre collectif
                  </motion.button>
                </Link>
                <Link href="/about" className="flex-1 min-w-[200px]">
                  <motion.button whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }} className="w-full px-6 py-3 border-2 border-white/35 text-white rounded-lg font-semibold hover:bg-white/10 hover:border-white transition-all">
                    En savoir plus
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
