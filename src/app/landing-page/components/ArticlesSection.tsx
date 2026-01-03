"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useBlogPosts } from "@/lib/hooks/use-blog"
import { BlogCard } from "./BlogCard" // Assure-toi que le chemin est bon

export default function ArticlesSection() {
  const { data: blogData, isLoading } = useBlogPosts()
  const articles = (blogData?.data || []).slice(0, 3)

  return (
    <section className="relative py-24 bg-white dark:bg-[#0A1128] overflow-hidden">

      {/* Background Decoratif Subtil */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />

      <div className="container relative z-10 px-4">

        {/* Header de section: Editorial Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4 max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-[#0A1128] dark:text-white leading-[0.9] tracking-[-0.04em] uppercase"
            >
              Le <span className="text-[#FFD700] lowercase italic font-serif">Journal</span> <br className="hidden md:block" />
              d&apos;Afrique.
            </motion.h2>
          </div>

          <div className="mb-2">
            <Link href="/blog" className="group flex items-center gap-4 text-[#0A1128] dark:text-white font-black text-sm uppercase tracking-[0.2em] border-b-2 border-[#FFD700] pb-2 transition-all hover:gap-6">
              Explorer le Journal
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Grid des Cartes */}
        {isLoading ? (
          <div className="flex md:grid md:grid-cols-3 gap-8 overflow-x-auto md:overflow-visible pb-10">
            {[1, 2, 3].map(i => (
              <div key={i} className="min-w-[85vw] md:min-w-0 h-[520px] w-full bg-white dark:bg-white/5 rounded-[2rem] border border-gray-100 dark:border-white/5 animate-pulse overflow-hidden">
                <div className="h-[240px] bg-gray-200 dark:bg-white/10" />
                <div className="p-8 space-y-4">
                  <div className="h-4 w-20 bg-gray-200 dark:bg-white/10 rounded-full" />
                  <div className="h-8 w-full bg-gray-200 dark:bg-white/10 rounded-lg" />
                  <div className="h-4 w-2/3 bg-gray-200 dark:bg-white/10 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-auto md:overflow-visible pb-12 md:pb-0 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
            {articles.map((post, idx) => (
              <div key={post.id} className="min-w-[85vw] md:min-w-0 snap-center">
                <BlogCard post={post} index={idx} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 md:hidden flex justify-center">
          <Link href="/blog" className="flex items-center gap-4 px-10 py-5 bg-[#0A1128] dark:bg-white text-white dark:text-[#0A1128] rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-xl w-full justify-center group active:scale-95 transition-all">
            Tous les articles <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  )
}