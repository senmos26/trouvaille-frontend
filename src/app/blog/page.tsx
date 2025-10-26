"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Calendar,
  Mail,
  MessageCircle,
  PenSquare,
  Search,
  Share2,
  ThumbsUp,
  FileText,
  X,
  Copy,
  CheckCircle,
  Send,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react"
import { useBlogPosts, useBlogCategories, useLikeBlogPost } from "@/lib/hooks/use-blog"

export default function BlogPage() {
  const { data: blogData, isLoading: blogLoading, error: blogError } = useBlogPosts()
  const { data: categoriesData } = useBlogCategories()
  const likeBlogPostMutation = useLikeBlogPost()
  
  const [searchQuery, setSearchQuery] = useState("")
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [likedPosts, setLikedPosts] = useState<string[]>([])
  const [showShareModal, setShowShareModal] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  // Utiliser uniquement les données Supabase
  const displayPosts = blogData?.data || []
  const categories = categoriesData || []

  const filteredPosts = displayPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Gestion des états de chargement et d'erreur
  if (blogLoading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFD700] mx-auto mb-4"></div>
          <p className="text-[#0A1128]">Chargement des articles...</p>
        </div>
      </div>
    )
  }

  if (blogError) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Erreur lors du chargement des articles</p>
          <p className="text-gray-600">Veuillez réessayer plus tard</p>
        </div>
      </div>
    )
  }

  const handleLike = async (postId: string) => {
    try {
      const result = await likeBlogPostMutation.mutateAsync({ 
        postId, 
        userIp: 'anonymous' // En production, récupérer la vraie IP
      })
      
      // Mettre à jour l'état local selon le résultat
      if (result.success) {
        if (result.action === 'liked') {
          setLikedPosts([...likedPosts, postId])
        } else if (result.action === 'unliked') {
          setLikedPosts(likedPosts.filter(id => id !== postId))
        }
      }
    } catch (error) {
      console.error('Error liking post:', error)
    }
  }

  const handleCopyLink = (postId: string) => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/blog/${postId}` : ''
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getShareLinks = (postId: string, title: string) => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/blog/${postId}` : ''
    const text = `Lisez cet article : "${title}"`
    
    return {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`
    }
  }

  return (
    <div>
      {/* Hero Header */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-[#0A1128] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 animate-float" style={{ backgroundImage: 'radial-gradient(#FFD700 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        </div>
        
        <div className="container relative z-10 text-center max-w-4xl py-20">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg leading-tight">
            Nos <span className="text-[#FFD700]">Réflexions</span>
            <br />
            sur l'Afrique
          </h1>
          
          <p className="text-xl mb-12 text-white/90 leading-relaxed max-w-2xl mx-auto">
            Découvrez nos analyses approfondies, témoignages inspirants et solutions innovantes 
            pour les défis contemporains de l'Afrique. Chaque article est une invitation à 
            réfléchir et à agir pour un continent prospère.
          </p>

          {/* Search Bar */}
          <div className="max-w-lg mx-auto relative">
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pr-12 text-base rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-lg text-white placeholder:text-white/70 focus:outline-none focus:border-[#FFD700] transition-all"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 pointer-events-none">
              <Search size={20} />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="min-h-screen bg-white py-16">
        <div className="container">
          {/* Stats and Filters */}
          <div className="flex justify-between items-center mb-12 flex-wrap gap-6">
            <div>
              <h2 className="text-2xl font-bold text-[#0A1128] mb-2">
                {searchQuery ? `Résultats pour "${searchQuery}"` : 'Tous les articles'}
              </h2>
              <p className="text-muted-foreground">
                {filteredPosts.length} article{filteredPosts.length > 1 ? 's' : ''} trouvé{filteredPosts.length > 1 ? 's' : ''}
              </p>
            </div>

            <div className="flex gap-2 flex-wrap">
              <span className="px-4 py-1.5 bg-[#0A1128] text-white rounded-full text-sm font-semibold cursor-pointer hover:bg-[#FFD700] hover:text-[#0A1128] transition-all">Technologie</span>
              <span className="px-4 py-1.5 bg-gray-200 text-[#0A1128] rounded-full text-sm font-semibold cursor-pointer hover:bg-[#FFD700] transition-all">Entrepreneuriat</span>
              <span className="px-4 py-1.5 bg-[#FFD700] text-[#0A1128] rounded-full text-sm font-semibold cursor-pointer hover:bg-[#E6C200] transition-all">Leadership</span>
              <span className="px-4 py-1.5 border-2 border-[#0A1128] text-[#0A1128] rounded-full text-sm font-semibold cursor-pointer hover:bg-[#0A1128] hover:text-white transition-all">Innovation</span>
            </div>
          </div>

          {/* Articles Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((article) => (
                <article
                  key={article.id}
                  className="flex flex-col bg-white rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer"
                  style={{
                    boxShadow: hoveredCard === article.id ? '0 18px 45px rgba(10, 17, 40, 0.18)' : '0 10px 30px rgba(10, 17, 40, 0.08)',
                    transform: hoveredCard === article.id ? 'translateY(-6px)' : 'translateY(0)',
                    borderColor: hoveredCard === article.id ? 'rgba(212, 175, 55, 0.3)' : 'rgba(17, 24, 39, 0.05)',
                  }}
                  onMouseEnter={() => setHoveredCard(article.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `linear-gradient(135deg, rgba(10, 17, 40, 0.25), rgba(23, 43, 77, 0.25)), url('${article.image}')`,
                      }}
                    />
                    <div
                      className="absolute inset-0 transition-all duration-300"
                      style={{
                        background: hoveredCard === article.id
                          ? 'linear-gradient(135deg, rgba(10, 17, 40, 0.75), rgba(212, 175, 55, 0.25))'
                          : 'linear-gradient(135deg, rgba(10, 17, 40, 0.45), rgba(212, 175, 55, 0.05))',
                      }}
                    />
                    <div className="absolute top-4 left-4 inline-flex items-center px-3 py-1.5 rounded-full bg-white/90 text-[#0A1128] font-semibold text-sm shadow-lg">
                      {article.category?.name || article.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-4 p-6 flex-1 min-h-[320px]">
                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground gap-4 flex-wrap">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar size={16} />
                        {new Date(article.published_at || article.created_at).toLocaleDateString('fr-FR')}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <PenSquare size={16} />
                        {article.author}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-[#0A1128] text-xl font-bold leading-tight min-h-[3.5rem]">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-muted-foreground leading-relaxed flex-1 line-clamp-4 min-h-[5.6rem]">
                      {article.excerpt}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t gap-4">
                      <Link href={`/blog/${article.id}`}>
                        <button className="px-5 py-2.5 bg-[#FFD700] text-[#0A1128] font-semibold text-sm rounded-lg shadow-md hover:bg-[#E6C200] transition-all">
                          Lire la suite
                        </button>
                      </Link>

                      <div className="inline-flex gap-2.5">
                        <button
                          type="button"
                          onClick={() => handleLike(article.id)}
                          aria-label="Aimer l'article"
                          className={`relative w-9 h-9 rounded-full inline-flex items-center justify-center transition-all ${
                            likedPosts.includes(article.id)
                              ? 'bg-[#FFD700]/20 text-[#FFD700]'
                              : 'bg-gray-100 text-gray-600 hover:bg-[#FFD700]/20 hover:text-[#0A1128]'
                          }`}
                          title={`${article.likes || 0} j'aime`}
                        >
                          <ThumbsUp size={18} className={likedPosts.includes(article.id) ? 'fill-current' : ''} />
                          {(article.likes || 0) > 0 && (
                            <span className="absolute -top-1 -right-1 bg-[#FFD700] text-[#0A1128] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                              {article.likes || 0}
                            </span>
                          )}
                        </button>
                        <Link href={`/blog/${article.id}#commentaires`}>
                          <button
                            type="button"
                            aria-label="Commenter l'article"
                            className="relative w-9 h-9 rounded-full bg-gray-100 text-gray-600 inline-flex items-center justify-center hover:bg-[#FFD700]/20 hover:text-[#0A1128] transition-all"
                            title={`${article.comments_count || 0} commentaires`}
                          >
                            <MessageCircle size={18} />
                            {(article.comments_count || 0) > 0 && (
                              <span className="absolute -top-1 -right-1 bg-[#0A1128] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {article.comments_count || 0}
                              </span>
                            )}
                          </button>
                        </Link>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setShowShareModal(article.id)
                          }}
                          aria-label="Partager l'article"
                          className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 inline-flex items-center justify-center hover:bg-[#FFD700]/20 hover:text-[#0A1128] transition-all"
                        >
                          <Share2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="mb-6 text-muted-foreground flex justify-center">
                <FileText size={64} />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                {searchQuery ? 'Aucun article trouvé' : 'Aucun article disponible'}
              </h3>
              <p className="text-muted-foreground mb-8">
                {searchQuery 
                  ? 'Essayez avec d\'autres mots-clés ou parcourez tous nos articles.'
                  : 'Les articles seront bientôt disponibles. Revenez plus tard !'}
              </p>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="px-6 py-3 bg-[#FFD700] text-[#0A1128] rounded-lg font-semibold hover:bg-[#E6C200] transition-all"
                >
                  Voir tous les articles
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-[#FFD700] to-[#E6C200] text-[#0A1128] text-center">
        <div className="container">
          <h2 className="text-3xl font-bold mb-4 inline-flex items-center justify-center gap-3">
            <Mail size={28} />
            Restez informé
          </h2>
          <p className="text-lg mb-8 text-[#0A1128]/80">
            Recevez nos derniers articles et analyses directement dans votre boîte mail.
          </p>
          
          <div className="max-w-lg mx-auto flex gap-4 flex-wrap">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 min-w-[250px] px-4 py-3 bg-white border-2 border-[#0A1128] text-[#0A1128] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A1128]"
            />
            <button className="px-6 py-3 bg-[#0A1128] text-white font-semibold rounded-lg hover:bg-[#172B4D] transition-all whitespace-nowrap">
              S'abonner
            </button>
          </div>
        </div>
      </section>

      {/* Share Modal */}
      {showShareModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#0A1128]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => {
            setShowShareModal(null)
            setCopied(false)
          }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
          >
            {(() => {
              const article = mockPosts.find(p => p.id === showShareModal)
              if (!article) return null
              const shareLinks = getShareLinks(article.id, article.title)
              
              return (
                <>
                  {/* Header */}
                  <div className="bg-gradient-to-r from-[#0A1128] to-[#172B4D] text-white p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Share2 size={20} />
                        <h3 className="text-xl font-bold">Partager l'article</h3>
                      </div>
                      <button
                        onClick={() => {
                          setShowShareModal(null)
                          setCopied(false)
                        }}
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
                        <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(typeof window !== 'undefined' ? `${window.location.origin}/blog/${article.id}` : '')}`}
                          alt="QR Code"
                          className="w-32 h-32"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        Scannez ce code QR pour accéder à l'article
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
                          onClick={() => handleCopyLink(article.id)}
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
                </>
              )
            })()}
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
