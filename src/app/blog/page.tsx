"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Sparkles, X, Filter, SortAsc, ChevronLeft, ChevronRight, BookOpen } from "lucide-react"
import { useBlogPosts } from "@/lib/hooks/use-blog"
import { BlogCard } from "@/app/landing-page/components/BlogCard"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const POSTS_PER_PAGE = 6

// --- MAIN PAGE ---
export default function BlogPage() {
  // --- STATES ---
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tout")
  const [sortOrder, setSortOrder] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory])

  // Data Fetching
  const { data: blogData, isLoading } = useBlogPosts()
  const allPosts = blogData?.data || []

  // Extraction des Catégories uniques
  const categories = ["Tout", ...Array.from(new Set(allPosts.map((p: { category?: { name: string } }) => p.category?.name).filter(Boolean).map(String)))]

  // --- LOGIQUE DE FILTRE & TRI ---
  const filteredPosts = allPosts
    .filter((post: { category?: { name: string }; title: string; excerpt?: string }) => {
      const matchCat = selectedCategory === "Tout" || post.category?.name === selectedCategory
      const matchSearch = !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCat && matchSearch
    })
    .sort((a: { published_at?: string; created_at: string; title: string }, b: { published_at?: string; created_at: string; title: string }) => {
      const dateA = new Date(a.published_at || a.created_at).getTime()
      const dateB = new Date(b.published_at || b.created_at).getTime()
      if (sortOrder === "newest") return dateB - dateA
      if (sortOrder === "oldest") return dateA - dateB
      if (sortOrder === "alpha") return a.title.localeCompare(b.title)
      return 0
    })

  // Pagination Logic
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const currentPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A1128] text-[#0A1128] dark:text-white font-sans selection:bg-[#FFD700] selection:text-[#0A1128]">

      {/* --- 1. CINEMATIC HERO SECTION --- */}
      <section className="relative pt-28 pb-4 px-4 overflow-hidden border-b border-gray-100 dark:border-transparent">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-50 dark:opacity-100" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay pointer-events-none" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-px bg-[#FFD700]" />
                <span className="text-[#FFD700] font-black uppercase tracking-[0.3em] text-[10px]">Le Journal d&apos;Excellence</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[4.5rem] font-black tracking-tighter leading-[0.85] uppercase mb-2">
                <span className="text-[#0A1128] dark:text-white">Nos</span> <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-tr from-[#E6C200] via-[#FFD700] to-[#F3C200] drop-shadow-sm">
                  Insights.
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex justify-between items-end border-t border-gray-100 dark:border-white/10 pt-4"
            >
              <p className="max-w-md text-sm md:text-base font-light leading-relaxed text-gray-500 dark:text-gray-300 italic font-serif">
                &quot;Partager la connaissance pour bâtir l&apos;avenir. Découvrez nos dernières réflexions sur l&apos;innovation et le leadership.&quot;
              </p>
              <div className="hidden md:flex flex-col items-end gap-1">
                <span className="text-[9px] uppercase tracking-[0.4em] font-black text-gray-400 dark:text-white/40">Total des pensées</span>
                <span className="text-2xl font-black text-[#FFD700]">{allPosts.length}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 2. SELECTOR BAR (Sticky Glassmorphism) --- */}
      <div className="sticky top-0 z-40 bg-white/90 dark:bg-[#0A1128]/95 backdrop-blur-2xl border-y border-gray-100 dark:border-white/5 py-8 transition-colors duration-500">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">

            {/* Premium Search Interface */}
            <div className="relative w-full lg:max-w-md group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#FFD700] pointer-events-none group-focus-within:scale-110 transition-transform">
                <Search size={20} strokeWidth={2.5} />
              </div>
              <input
                type="text"
                placeholder="Rechercher une pensée..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-16 pl-16 pr-12 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl focus:outline-none focus:border-[#FFD700]/50 focus:bg-white dark:focus:bg-white/10 transition-all font-bold text-base text-[#0A1128] dark:text-white placeholder:text-gray-300 dark:placeholder:text-white/20 shadow-sm focus:shadow-xl"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={16} className="text-gray-400 dark:text-white/40" />
                </button>
              )}
            </div>

            {/* Filter Interface */}
            <div className="flex w-full lg:w-auto items-center gap-4 overflow-x-auto no-scrollbar pb-1">

              <div className="flex flex-col min-w-[200px]">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 dark:text-white/30 mb-2 ml-1">Domaine</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="h-16 px-6 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl font-black text-sm text-[#0A1128] dark:text-white shadow-sm hover:border-[#FFD700]/50 transition-all">
                    <div className="flex items-center gap-3">
                      <Filter size={16} className="text-[#FFD700]" strokeWidth={2.5} />
                      <SelectValue placeholder="Catégorie" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-[#050A15] border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl z-50">
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat} className="font-bold py-4 text-[#0A1128] dark:text-white focus:bg-gray-100 dark:focus:bg-white/10 cursor-pointer">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col min-w-[200px]">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 dark:text-white/30 mb-2 ml-1">Ordre</label>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="h-16 px-6 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl font-black text-sm text-[#0A1128] dark:text-white shadow-sm hover:border-[#FFD700]/50 transition-all">
                    <div className="flex items-center gap-3">
                      <SortAsc size={16} className="text-[#FFD700]" strokeWidth={2.5} />
                      <SelectValue placeholder="Trier par" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-[#050A15] border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl z-50">
                    <SelectItem value="newest" className="font-bold py-4 text-[#0A1128] dark:text-white focus:bg-gray-100 dark:focus:bg-white/10 cursor-pointer text-sm">Plus récent</SelectItem>
                    <SelectItem value="oldest" className="font-bold py-4 text-[#0A1128] dark:text-white focus:bg-gray-100 dark:focus:bg-white/10 cursor-pointer text-sm">Plus ancien</SelectItem>
                    <SelectItem value="alpha" className="font-bold py-4 text-[#0A1128] dark:text-white focus:bg-gray-100 dark:focus:bg-white/10 cursor-pointer text-sm">Alphabétique</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Reset Interface */}
              {(selectedCategory !== "Tout" || searchQuery) && (
                <button
                  onClick={() => { setSelectedCategory("Tout"); setSearchQuery("") }}
                  className="h-16 px-6 mt-6 flex items-center justify-center gap-2 text-sm font-black text-[#FFD700] hover:bg-gray-50 dark:hover:bg-white/5 rounded-2xl transition-all border border-gray-100 dark:border-white/10"
                >
                  <X size={16} />
                  Réinitialiser
                </button>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* --- 3. ARTICLES GRID (The Stage) --- */}
      <div className="container mx-auto max-w-7xl px-4 py-24 pb-48">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-[500px] w-full bg-gray-50 dark:bg-white/5 rounded-[3rem] border border-gray-100 dark:border-white/5 animate-pulse overflow-hidden">
                <div className="h-full bg-gray-200 dark:bg-white/5 opacity-30" />
              </div>
            ))}
          </div>
        ) : currentPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-48 text-center"
          >
            <div className="relative w-32 h-32 mb-10 group">
              <div className="absolute inset-0 bg-[#FFD700] rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative w-full h-full bg-white dark:bg-[#050A15] rounded-full flex items-center justify-center border border-gray-100 dark:border-white/10 shadow-2xl">
                <BookOpen size={48} className="text-[#FFD700]" strokeWidth={1.5} />
              </div>
            </div>
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">Le silence est d&apos;or.</h3>
            <p className="text-gray-400 dark:text-gray-400 max-w-xs text-lg font-medium leading-relaxed">Aucun article ne correspond pour le moment. Essayez d&apos;élargir votre horizon.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            <AnimatePresence mode="popLayout">
              {currentPosts.map((post: any, idx: number) => (
                <BlogCard key={post.id} post={post} index={idx} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* --- PAGINATION (Elegance) --- */}
        {!isLoading && totalPages > 1 && (
          <div className="mt-32 flex flex-col items-center gap-10">
            <div className="flex items-center gap-4 p-2 bg-gray-50 dark:bg-white/5 rounded-[2rem] border border-gray-100 dark:border-white/5 backdrop-blur-xl">
              <button
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage(prev => Math.max(1, prev - 1))
                  window.scrollTo({ top: 400, behavior: "smooth" })
                }}
                className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white dark:bg-white/5 text-[#0A1128] dark:text-white disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white/10 hover:text-[#FFD700] transition-all border border-gray-100 dark:border-transparent shadow-sm"
              >
                <ChevronLeft size={24} strokeWidth={2.5} />
              </button>

              <div className="flex items-center gap-4 px-4">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => {
                      setCurrentPage(page)
                      window.scrollTo({ top: 400, behavior: "smooth" })
                    }}
                    className={`min-w-[56px] h-14 rounded-2xl font-black text-sm transition-all
                      ${currentPage === page
                        ? "bg-[#FFD700] text-[#0A1128] shadow-[0_10px_30px_rgba(255,215,0,0.3)] scale-110"
                        : "text-gray-400 dark:text-white/40 hover:text-[#0A1128] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                      }`}
                  >
                    {String(page).padStart(2, '0')}
                  </button>
                ))}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage(prev => Math.min(totalPages, prev + 1))
                  window.scrollTo({ top: 400, behavior: "smooth" })
                }}
                className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white dark:bg-white/5 text-[#0A1128] dark:text-white disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white/10 hover:text-[#FFD700] transition-all border border-gray-100 dark:border-transparent shadow-sm"
              >
                <ChevronRight size={24} strokeWidth={2.5} />
              </button>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="h-10 w-[1px] bg-gradient-to-b from-[#FFD700] to-transparent" />
              <p className="text-[10px] font-black uppercase tracking-[0.6em] text-gray-400 dark:text-white/20">
                Période {currentPage} / {totalPages}
              </p>
            </div>
          </div>
        )}

      </div>

    </div>
  )
}