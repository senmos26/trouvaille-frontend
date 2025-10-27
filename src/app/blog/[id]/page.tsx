"use client"

import { useMemo, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Calendar,
  Clock,
  PenSquare,
  Share2,
  Tag,
  Twitter,
  Linkedin,
  Facebook,
  Bookmark,
  Sparkles,
  X,
  Copy,
  CheckCircle,
  Send,
  Mail,
  MessageCircle,
  ThumbsUp,
} from "lucide-react"
import { useBlogPost } from "../../../../lib/hooks/use-blog"

const HERO_PLACEHOLDER =
  "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1600&q=80"

// Données d'articles statiques - À synchroniser avec blog/page.tsx
const blogPosts = [
  {
    id: 1,
    title: "L'Afrique et la révolution numérique",
    excerpt: "Comment le digital transforme les économies africaines et crée de nouvelles opportunités pour les jeunes.",
    content: `
      <p><strong>Technologie</strong> : Comment le digital transforme les économies africaines et crée de nouvelles opportunités pour les jeunes.</p>
      <p>
        La révolution numérique est en marche en Afrique. Avec plus de 500 millions d'utilisateurs d'internet sur le continent, 
        les opportunités sont immenses pour les jeunes entrepreneurs et innovateurs.
      </p>
      <h2>L'impact du numérique en Afrique</h2>
      <p>
        Les technologies numériques transforment profondément les économies africaines. Du mobile banking à l'e-commerce, 
        en passant par l'agriculture de précision, les solutions digitales répondent aux défis locaux tout en créant 
        de nouvelles opportunités d'emploi et d'entrepreneuriat.
      </p>
      <h2>Les secteurs clés de transformation</h2>
      <p>
        La fintech, l'agritech, l'edtech et la healthtech sont les secteurs qui connaissent la croissance la plus rapide. 
        Des startups africaines lèvent des fonds record et développent des solutions innovantes adaptées aux réalités du continent.
      </p>
      <p>
        Les jeunes africains sont au cœur de cette transformation. Ils développent des applications, créent des plateformes 
        et proposent des services qui améliorent la vie quotidienne de millions de personnes.
      </p>
    `,
    date: "2025-10-15",
    category: "Technologie",
    author: "Équipe La Trouvaille",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop",
    likes: 42,
    comments: 12,
  },
  {
    id: 2,
    title: "Entrepreneuriat social en Afrique",
    excerpt: "Découvrez les initiatives qui allient business et impact social positif sur le continent.",
    content: `
      <p><strong>Entrepreneuriat</strong> : Découvrez les initiatives qui allient business et impact social positif sur le continent.</p>
      <p>
        L'entrepreneuriat social en Afrique connaît un essor remarquable. Des entrepreneurs innovants développent des modèles 
        économiques qui génèrent des profits tout en résolvant des problèmes sociaux et environnementaux.
      </p>
      <h2>Qu'est-ce que l'entrepreneuriat social ?</h2>
      <p>
        L'entrepreneuriat social combine objectifs commerciaux et mission sociale. Ces entreprises cherchent à créer un impact 
        positif mesurable tout en étant financièrement viables et durables.
      </p>
      <h2>Des exemples inspirants</h2>
      <p>
        De nombreuses startups africaines illustrent cette approche : des entreprises qui fournissent de l'énergie solaire 
        abordable, qui facilitent l'accès à l'éducation, ou qui créent des emplois dans des zones rurales défavorisées.
      </p>
      <p>
        Ces initiatives démontrent qu'il est possible de bâtir des entreprises prospères tout en contribuant au développement 
        durable du continent et à l'amélioration des conditions de vie des populations.
      </p>
    `,
    date: "2025-10-10",
    category: "Entrepreneuriat",
    author: "Marie Kouassi",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop",
    likes: 38,
    comments: 8,
  },
  {
    id: 3,
    title: "Leadership féminin : nouvelles perspectives",
    excerpt: "Les femmes africaines redéfinissent le leadership et inspirent la nouvelle génération.",
    content: `
      <p><strong>Leadership</strong> : Les femmes africaines redéfinissent le leadership et inspirent la nouvelle génération.</p>
      <p>
        Le leadership féminin en Afrique connaît une transformation profonde. Les femmes occupent de plus en plus de postes 
        de direction et créent des entreprises à succès, changeant ainsi le visage du leadership sur le continent.
      </p>
      <h2>Une nouvelle génération de leaders</h2>
      <p>
        Les femmes leaders africaines apportent des perspectives uniques, combinant vision stratégique, empathie et 
        détermination. Elles brisent les barrières et ouvrent la voie pour les générations futures.
      </p>
      <h2>Impact et inspiration</h2>
      <p>
        Ces leaders inspirent des millions de jeunes femmes à poursuivre leurs ambitions. Elles démontrent qu'avec 
        la formation, le soutien et l'opportunité, les femmes peuvent exceller dans tous les domaines.
      </p>
      <p>
        Des initiatives comme les réseaux de mentorat, les programmes de formation en leadership et les plateformes 
        de financement dédiées aux femmes entrepreneurs contribuent à accélérer cette transformation.
      </p>
    `,
    date: "2025-10-05",
    category: "Leadership",
    author: "Amina Diallo",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop",
    likes: 56,
    comments: 15,
  },
]

// Commentaires statiques pour l'exemple
const initialComments = {
  1: [
    { id: 1, author: "Kofi Mensah", date: "2025-10-16", content: "Excellente analyse ! La transformation numérique est vraiment en marche en Afrique. J'aimerais voir plus d'articles sur ce sujet.", avatar: "KM" },
    { id: 2, author: "Amina Traoré", date: "2025-10-16", content: "Merci pour cet article très instructif. Les exemples concrets sont très pertinents.", avatar: "AT" },
    { id: 3, author: "Jean-Paul Konan", date: "2025-10-17", content: "C'est inspirant de voir comment la technologie change nos sociétés africaines !", avatar: "JK" },
  ],
  2: [
    { id: 1, author: "Sarah Diop", date: "2025-10-11", content: "L'entrepreneuriat social est effectivement l'avenir ! Merci pour ces insights.", avatar: "SD" },
    { id: 2, author: "Omar Ben", date: "2025-10-12", content: "Article très pertinent. J'ai hâte de voir plus d'exemples de startups sociales.", avatar: "OB" },
  ],
  3: [
    { id: 1, author: "Fatima Ndiaye", date: "2025-10-06", content: "Merci pour cet article inspirant sur le leadership féminin en Afrique !", avatar: "FN" },
    { id: 2, author: "Mariam Kamara", date: "2025-10-07", content: "C'est exactement ce dont nous avons besoin. Plus de visibilité pour nos femmes leaders !", avatar: "MK" },
    { id: 3, author: "Aissatou Ba", date: "2025-10-08", content: "Bravo pour cet article ! Les réseaux de mentorat sont essentiels.", avatar: "AB" },
  ],
}


function formatDate(date?: string) {
  if (!date) return "Date inconnue"
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function computeReadingTime(text: string) {
  const words = text.trim().split(/\s+/).length
  const minutes = Math.max(3, Math.round(words / 220))
  return `${minutes} min de lecture`
}

function extractHighlights(text: string, category: string, author?: string) {
  const sentences = text
    .replace(/\n+/g, " ")
    .split(/[.!?]/)
    .map((s) => s.trim())
    .filter(Boolean)

  const base = [
    `Perspective ${category.toLowerCase()} avec un focus actionnable`,
    `Analyse proposée par ${author || "l'équipe La Trouvaille"}`,
    "Recommandations concrètes pour les jeunes leaders africains",
  ]

  const picks = sentences.slice(0, 3)
  const highlights = picks.length ? picks : base
  return highlights.slice(0, 3).map((item, index) => item || base[index])
}

function buildShareUrl(id: string) {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/blog/${id}`
  }
  return `https://la-trouvaille.com/blog/${id}`
}

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const numericId = Number(params.id)
  const { data: post, isLoading, error } = useBlogPost(params.id)
  const [showSharePopup, setShowSharePopup] = useState(false)
  const [copied, setCopied] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [comments, setComments] = useState<Array<{ id: number; author: string; date: string; content: string; avatar: string }>>([])
  const [newComment, setNewComment] = useState({ name: "", email: "", content: "" })
  const [showCommentForm, setShowCommentForm] = useState(false)
  
  // Utiliser les données Supabase ou les données de fallback
  const displayPost = post || blogPosts.find((item) => item.id === numericId)
  
  // Helper functions pour accéder aux données de manière sécurisée
  const getCategoryName = (item: { category?: string | { name: string } }) => typeof item?.category === 'string' ? item.category : item?.category?.name || ''
  const getAuthorName = (item: { author_name?: string; author?: string }) => item?.author_name || item?.author || ''
  const getDate = (item: { created_at?: string; date?: string }) => item?.created_at || item?.date || ''
  const getLikes = (item: { likes_count?: number; likes?: number }) => item?.likes_count || item?.likes || 0

  const relatedPosts = useMemo(
    () =>
      blogPosts
        .filter((item) => item.id !== numericId && displayPost && getCategoryName(item) === getCategoryName(displayPost))
        .slice(0, 3),
    [numericId, displayPost]
  )

  // Initialiser les likes et commentaires
  useEffect(() => {
    if (displayPost) {
      setLikeCount(getLikes(displayPost))
      setComments(initialComments[numericId as keyof typeof initialComments] || [])
    }
  }, [displayPost, numericId])

  // Gestion des états de chargement et d'erreur
  if (isLoading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFD700] mx-auto mb-4"></div>
          <p className="text-[#0A1128]">Chargement de l&apos;article...</p>
        </div>
      </div>
    )
  }

  if (error || !displayPost) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Article non trouvé</p>
          <p className="text-gray-600 mb-6">L&apos;article que vous recherchez n&apos;existe pas ou a été supprimé</p>
          <Link href="/blog" className="px-6 py-3 bg-[#FFD700] text-[#0A1128] rounded-lg font-semibold hover:bg-[#E6C200] transition-all">
            Retour au blog
          </Link>
        </div>
      </div>
    )
  }

  const handleLike = () => {
    if (liked) {
      setLiked(false)
      setLikeCount(likeCount - 1)
    } else {
      setLiked(true)
      setLikeCount(likeCount + 1)
    }
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.name && newComment.content) {
      const comment = {
        id: comments.length + 1,
        author: newComment.name,
        date: new Date().toISOString().split('T')[0],
        content: newComment.content,
        avatar: newComment.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      }
      setComments([...comments, comment])
      setNewComment({ name: "", email: "", content: "" })
      setShowCommentForm(false)
    }
  }

  // Cette vérification est maintenant gérée dans la gestion d'erreur ci-dessus

  const heroImage = displayPost.image || HERO_PLACEHOLDER
  const readingTime = computeReadingTime(displayPost.content ?? displayPost.excerpt ?? "")
  const highlights = extractHighlights(displayPost.content ?? displayPost.excerpt ?? "", getCategoryName(displayPost), getAuthorName(displayPost))
  const shareUrl = buildShareUrl(params.id)
  const shareText = `Lisez cet article : "${displayPost.title}"`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(displayPost.title)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`
  }

  const shareButtons = [
    {
      label: "Twitter",
      icon: Twitter,
      href: shareLinks.twitter,
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: shareLinks.linkedin,
    },
    {
      label: "Facebook",
      icon: Facebook,
      href: shareLinks.facebook,
    },
  ]

  return (
    <div className="bg-white">
      {/* Hero section */}
      <section
        className="relative h-[70vh] min-h-[520px] overflow-hidden"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/85 via-[#0A1128]/45 to-transparent" />
        
        {/* Boutons retour et partage */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 text-[#0A1128] rounded-lg font-medium hover:bg-white transition-all backdrop-blur-sm"
          >
            <ArrowLeft size={18} />
            Retour au blog
          </Link>
          
          <button
            onClick={() => setShowSharePopup(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 text-[#0A1128] rounded-lg font-medium hover:bg-white transition-all backdrop-blur-sm hover:scale-105"
          >
            <Share2 size={18} />
            <span className="hidden sm:inline">Partager</span>
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex gap-3 mb-4 flex-wrap">
                <span className="px-4 py-1.5 bg-[#FFD700] text-[#0A1128] rounded-full font-semibold text-sm">
                  {getCategoryName(displayPost)}
                </span>
                <span className="px-4 py-1.5 rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/30 font-medium text-sm inline-flex items-center gap-2">
                  <Bookmark className="h-3.5 w-3.5" /> Insight La Trouvaille
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight max-w-4xl">
                {displayPost.title}
              </h1>

              <div className="flex gap-6 flex-wrap text-white/90">
                <span className="inline-flex items-center gap-2">
                  <Calendar size={20} />
                  <span className="font-medium">{formatDate(getDate(displayPost))}</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <PenSquare size={20} />
                  <span className="font-medium">{getAuthorName(displayPost) || "Équipe La Trouvaille"}</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock size={20} />
                  <span className="font-medium">{readingTime}</span>
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 bg-gray-50">
      <div className="container">
          <div className="grid lg:grid-cols-[2fr_1fr] gap-12 items-start">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="h-4 w-4 text-[#FFD700]" />
                <span className="text-[#0A1128] font-semibold">En bref</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <div className="grid gap-5 mb-8">
                {highlights.map((item, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="w-3 h-3 rounded-full bg-[#FFD700] mt-1.5 flex-shrink-0" />
                    <p className="text-[#0A1128] leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>

              <div className="h-px bg-gray-200 my-6" />

              <div
                className="prose prose-lg max-w-none text-gray-800"
                dangerouslySetInnerHTML={{ __html: displayPost.content }}
              />

              <div className="h-px bg-gray-200 my-10" />

              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex gap-3 text-gray-600">
                  <span className="inline-flex items-center gap-2">
                    <Tag className="h-4 w-4" /> {getCategoryName(displayPost)}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <PenSquare className="h-4 w-4" /> {getAuthorName(displayPost) || "La Trouvaille"}
                  </span>
                </div>
                <div className="inline-flex gap-3">
                  {shareButtons.map(({ label, icon: Icon, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-100 inline-flex items-center justify-center text-[#0A1128] hover:bg-[#FFD700]/25 transition-all"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.article>

            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-8"
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h3 className="text-[#0A1128] font-bold text-lg mb-4">Faits rapides</h3>
                <div className="grid gap-3.5">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-[#FFD700]" />
                    <span className="text-gray-800 font-medium">{formatDate(getDate(displayPost))}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-[#FFD700]" />
                    <span className="text-gray-800 font-medium">{readingTime}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <PenSquare className="h-4 w-4 text-[#FFD700]" />
                    <span className="text-gray-800 font-medium">{getAuthorName(displayPost) || "La Trouvaille"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Share2 className="h-4 w-4 text-[#FFD700]" />
                    <span className="text-gray-800 font-medium">Diffuser l&apos;idée autour de vous</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#FFD700] to-[#FCCE45] rounded-3xl p-8 text-[#0A1128] shadow-2xl">
                <h3 className="font-bold text-xl mb-2">
                  Recevez nos insights
                </h3>
                <p className="opacity-85 mb-4">
                  Une veille mensuelle sur l&apos;entrepreneuriat, l&apos;innovation et le leadership africain.
                </p>
                <button className="w-full px-6 py-3 border-2 border-[#0A1128] bg-white text-[#0A1128] font-bold rounded-xl hover:bg-[#0A1128] hover:text-white transition-all">
                  S&apos;abonner à la newsletter
                </button>
              </div>
            </motion.aside>
          </div>

          {relatedPosts && relatedPosts.length > 0 && (
            <div className="mt-20">
              <h2 className="text-[#0A1128] text-3xl font-bold mb-6">
                Articles connexes
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((related, idx) => (
                  <motion.div
                    key={related.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-100"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" })
                      setTimeout(() => router.push(`/blog/${related.id}`), 350)
                    }}
                  >
                    <div className="h-48 overflow-hidden">
                      <Image
                        src={related.image || HERO_PLACEHOLDER}
                        alt={related.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5 flex flex-col gap-3">
                      <span className="text-xs font-bold text-[#0A1128] bg-[#FFD700]/20 px-3 py-1.5 rounded-xl self-start">
                        {related.category}
                      </span>
                      <h3 className="text-[#0A1128] text-lg font-bold leading-snug line-clamp-2">{related.title}</h3>
                      <p className="text-gray-600 text-sm">{formatDate(related.date)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Section Likes et Commentaires */}
          <div id="commentaires" className="mt-20 scroll-mt-24">
            {/* Likes et Stats */}
            <div className="flex items-center justify-between gap-6 mb-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-6">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    liked
                      ? 'bg-[#FFD700] text-[#0A1128]'
                      : 'bg-gray-100 text-gray-700 hover:bg-[#FFD700]/20'
                  }`}
                >
                  <ThumbsUp size={20} className={liked ? 'fill-current' : ''} />
                  <span>J&apos;aime ({likeCount})</span>
                </button>
                <div className="flex items-center gap-2 text-gray-600">
                  <MessageCircle size={20} />
                  <span className="font-semibold">{comments.length} commentaire{comments.length > 1 ? 's' : ''}</span>
                </div>
              </div>
              <button
                onClick={() => setShowSharePopup(true)}
                className="flex items-center gap-2 px-6 py-3 bg-[#0A1128] text-white rounded-xl font-semibold hover:bg-[#172B4D] transition-all"
              >
                <Share2 size={20} />
                <span className="hidden sm:inline">Partager</span>
              </button>
            </div>

            {/* Commentaires */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-[#0A1128]">
                  Commentaires ({comments.length})
                </h3>
                <button
                  onClick={() => setShowCommentForm(!showCommentForm)}
                  className="px-6 py-2.5 bg-[#FFD700] text-[#0A1128] font-semibold rounded-xl hover:bg-[#E6C200] transition-all"
                >
                  {showCommentForm ? 'Annuler' : 'Ajouter un commentaire'}
                </button>
              </div>

              {/* Formulaire de commentaire */}
              {showCommentForm && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleSubmitComment}
                  className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200"
                >
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        value={newComment.name}
                        onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                        placeholder="Votre nom"
                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 outline-none transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email (optionnel)
                      </label>
                      <input
                        type="email"
                        value={newComment.email}
                        onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                        placeholder="votre.email@exemple.com"
                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Commentaire *
                    </label>
                    <textarea
                      value={newComment.content}
                      onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                      placeholder="Partagez votre réflexion..."
                      rows={4}
                      className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 outline-none transition-all resize-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#FFD700] text-[#0A1128] font-bold rounded-xl hover:bg-[#E6C200] transition-all hover:scale-105"
                  >
                    Publier le commentaire
                  </button>
                </motion.form>
              )}

              {/* Liste des commentaires */}
              <div className="space-y-6">
                {comments.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageCircle size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 text-lg">Aucun commentaire pour le moment.</p>
                    <p className="text-gray-400">Soyez le premier à partager votre avis !</p>
                  </div>
                ) : (
                  comments.map((comment, idx) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      className="flex gap-4 p-5 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-[#FFD700] text-[#0A1128] rounded-full flex items-center justify-center font-bold text-lg">
                          {comment.avatar}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold text-[#0A1128]">{comment.author}</h4>
                          <span className="text-sm text-gray-500">
                            {new Date(comment.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Share Popup */}
      {showSharePopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#0A1128]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowSharePopup(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0A1128] to-[#172B4D] text-white p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Share2 size={20} />
                  <h3 className="text-xl font-bold">Partager l&apos;article</h3>
                </div>
                <button
                  onClick={() => setShowSharePopup(false)}
                  className="p-1.5 hover:bg-white/10 rounded-full transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* QR Code */}
              <div className="flex flex-col items-center mb-6">
                <div className="bg-white p-3 rounded-xl shadow-md border-2 border-[#FFD700]/20 mb-3">
                  <Image 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(shareUrl)}`}
                    alt="QR Code"
                    width={150}
                    height={150}
                    className="w-32 h-32"
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Scannez ce code QR pour accéder à l&apos;article
        </p>
      </div>

              {/* Share Options */}
              <div className="space-y-3">
                <h4 className="font-bold text-base mb-3">Partager via</h4>
                
                <div className="grid grid-cols-2 gap-2">
                  {/* WhatsApp */}
                  <a
                    href={shareLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 rounded-lg transition-all hover:scale-105"
                  >
                    <div className="p-1.5 bg-[#25D366] rounded-md text-white">
                      <Send size={16} />
                    </div>
                    <span className="font-semibold text-sm text-[#25D366]">WhatsApp</span>
                  </a>

                  {/* Facebook */}
                  <a
                    href={shareLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 rounded-lg transition-all hover:scale-105"
                  >
                    <div className="p-1.5 bg-[#1877F2] rounded-md text-white">
                      <Facebook size={16} />
                    </div>
                    <span className="font-semibold text-sm text-[#1877F2]">Facebook</span>
                  </a>

                  {/* Twitter */}
                  <a
                    href={shareLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 rounded-lg transition-all hover:scale-105"
                  >
                    <div className="p-1.5 bg-[#1DA1F2] rounded-md text-white">
                      <Twitter size={16} />
                    </div>
                    <span className="font-semibold text-sm text-[#1DA1F2]">Twitter</span>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={shareLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 rounded-lg transition-all hover:scale-105"
                  >
                    <div className="p-1.5 bg-[#0A66C2] rounded-md text-white">
                      <Linkedin size={16} />
                    </div>
                    <span className="font-semibold text-sm text-[#0A66C2]">LinkedIn</span>
                  </a>

                  {/* Email */}
                  <a
                    href={shareLinks.email}
                    className="flex items-center gap-2 p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all hover:scale-105"
                  >
                    <div className="p-1.5 bg-gray-700 rounded-md text-white">
                      <Mail size={16} />
                    </div>
                    <span className="font-semibold text-sm text-gray-700">Email</span>
                  </a>

                  {/* Copy Link */}
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 p-3 bg-[#FFD700]/10 hover:bg-[#FFD700]/20 rounded-lg transition-all hover:scale-105"
                  >
                    <div className="p-1.5 bg-[#FFD700] rounded-md text-[#0A1128]">
                      {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                    </div>
                    <span className="font-semibold text-sm text-[#0A1128]">
                      {copied ? 'Copié !' : 'Copier'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
