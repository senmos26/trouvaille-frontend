"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight, Calendar, User } from "lucide-react"

export const BlogCard = ({ post, index = 0 }: { post: { id: string; title: string; excerpt?: string; category?: { name: string }; published_at?: string; created_at: string; image?: string; author_name?: string }, index?: number }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group w-full h-[520px]"
    >
      <Link href={`/blog/${post.id}`} className="block h-full w-full">
        <article className="relative h-full w-full rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-white/5 bg-white dark:bg-white/5 shadow-sm hover:shadow-2xl hover:shadow-[#FFD700]/10 transition-all duration-700">

          {/* 1. IMAGE AREA - Grayscale to Color Transition */}
          <div className="relative h-[60%] w-full overflow-hidden">
            <Image
              src={post.image || '/images/placeholder-blog.jpg'}
              alt={post.title}
              fill
              className="object-cover transition-all duration-1000 ease-out grayscale group-hover:grayscale-0 group-hover:scale-110"
              unoptimized={post.image?.includes('supabase')}
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40 group-hover:opacity-0 transition-opacity duration-700" />

            {/* Badge Catégorie Flottant */}
            <div className="absolute top-6 left-6">
              <span className="px-4 py-2 bg-white/90 dark:bg-[#0A1128]/80 backdrop-blur-md text-[#0A1128] dark:text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg border border-white/20">
                {post.category?.name || "Actualité"}
              </span>
            </div>

            {/* Icon Arrow Corner */}
            <div className="absolute top-6 right-6 w-10 h-10 bg-[#FFD700] text-[#0A1128] rounded-full flex items-center justify-center opacity-0 translate-x-4 -translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
              <ArrowUpRight size={20} strokeWidth={3} />
            </div>
          </div>

          {/* 2. CONTENT AREA */}
          <div className="flex flex-col p-8 h-[40%] bg-white dark:bg-transparent transition-colors duration-500">

            {/* Metadata Line - Redesigned */}
            <div className="flex items-center gap-4 mb-5">
              <div className="flex items-center gap-2 text-[10px] font-black text-[#0A1128]/60 dark:text-white/60 uppercase tracking-widest">
                <Calendar size={15} className="text-[#FFD700]" />
                <span>
                  {new Date(post.published_at || post.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>

              <div className="h-4 w-px bg-gray-200 dark:bg-white/10" />

              <div className="flex items-center gap-2 text-[10px] font-black text-[#0A1128]/60 dark:text-white/60 uppercase tracking-widest">
                <User size={15} className="text-[#FFD700]" />
                <span className="truncate max-w-[100px]">{post.author_name || "La Trouvaille"}</span>
              </div>
            </div>

            {/* Title - Bold & Impactful */}
            <h3 className="text-xl lg:text-2xl font-black text-[#0A1128] dark:text-white mb-4 line-clamp-2 leading-[1.1] uppercase tracking-tighter group-hover:text-[#FFD700] transition-colors">
              {post.title}
            </h3>

            {/* Description / Excerpt */}
            <p className="text-gray-500 dark:text-gray-400 line-clamp-2 text-sm font-medium leading-relaxed italic">
              {post.excerpt || "Une analyse approfondie des tendances actuelles qui façonnent notre continent..."}
            </p>

          </div>

        </article>
      </Link>
    </motion.div>
  )
}