"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, ThumbsUp, MessageCircle, Share2, PenSquare } from "lucide-react"
import { sectionVariants, itemVariants } from "@/lib/animations"
import { useBlogPosts } from "@/lib/hooks/use-blog"

export default function ArticlesSection() {
  const { data: blogData, isLoading } = useBlogPosts()
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  
  // Utiliser uniquement les données Supabase, limiter à 3 articles
  const displayArticles = (blogData?.data || []).slice(0, 3)
  
  const [postLikes, setPostLikes] = useState<Record<number, number>>(
    displayArticles.reduce((acc: Record<number, number>, post: { id: number; likes?: number }) => ({ ...acc, [post.id]: post.likes || 0 }), {})
  )

  const handleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId))
      setPostLikes({ ...postLikes, [postId]: postLikes[postId] - 1 })
    } else {
      setLikedPosts([...likedPosts, postId])
      setPostLikes({ ...postLikes, [postId]: postLikes[postId] + 1 })
    }
  }
  
  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFD700] mx-auto"></div>
        </div>
      </section>
    )
  }
  return (
    <motion.section 
      variants={sectionVariants} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, amount: 0.2 }} 
      className="py-20 bg-gray-50"
    >
      <div className="container">
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Derniers Articles</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos réflexions sur les enjeux qui façonnent l&apos;avenir de l&apos;Afrique.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayArticles.map((article: { id: number; title: string; excerpt: string; image: string; category?: { name: string }; author_name: string; published_at: string; likes: number; comments_count: number }) => (
            <motion.article
              key={article.id}
              variants={itemVariants}
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
                  {article.category?.name}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-4 p-6 flex-1 min-h-[320px]">
                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-muted-foreground gap-4 flex-wrap">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={16} />
                    {new Date(article.published_at).toLocaleDateString('fr-FR')}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <PenSquare size={16} />
                    {article.author_name}
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
                      title={`${postLikes[article.id]} j'aime`}
                    >
                      <ThumbsUp size={18} className={likedPosts.includes(article.id) ? 'fill-current' : ''} />
                      {postLikes[article.id] > 0 && (
                        <span className="absolute -top-1 -right-1 bg-[#FFD700] text-[#0A1128] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {postLikes[article.id]}
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
                    <Link href={`/blog/${article.id}`}>
                      <button
                        type="button"
                        aria-label="Partager l'article"
                        className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 inline-flex items-center justify-center hover:bg-[#FFD700]/20 hover:text-[#0A1128] transition-all"
                      >
                        <Share2 size={18} />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div variants={itemVariants} className="text-center">
          <Link href="/blog">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFD700] text-[#0A1128] font-bold rounded-xl shadow-lg hover:bg-[#E6C200] hover:shadow-xl hover:-translate-y-1 transition-all">
              Voir tous les articles
            </button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}
