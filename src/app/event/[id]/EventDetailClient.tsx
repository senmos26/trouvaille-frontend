"use client"

import { useState, use } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar, MapPin, Users, ArrowLeft, Clock, Share2,
  Check, X, Copy, Facebook, Linkedin, Send, Ticket,
  ChevronRight, ChevronLeft, Twitter, Sparkles, ArrowUpRight
} from "lucide-react"
import { useEvent } from "@/lib/hooks/use-events"
import { useCreateRegistration } from "@/lib/hooks/use-registrations"
import { cn } from "@/lib/utils"
import DOMPurify from 'dompurify'

// --- 1. COMPOSANTS UI PREMIUM ---

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl md:text-3xl font-black text-[#0A1128] dark:text-white mb-10 tracking-tighter uppercase flex items-center gap-4">
    <span className="w-10 h-1 bg-[#FFD700]" />
    {children}
  </h2>
)

const SpeakerCard = ({ name, role, colorIndex = 0 }: any) => {
  return (
    <div className="group flex items-center gap-4 p-5 rounded-3xl border border-gray-100 dark:border-white/5 bg-white dark:bg-white/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
      <div className="relative shrink-0">
        <div className="w-16 h-16 rounded-2xl bg-[#0A1128] dark:bg-white/10 flex items-center justify-center text-xl font-black text-white transition-transform group-hover:rotate-6">
          {name.charAt(0)}
        </div>
      </div>
      <div>
        <h4 className="font-black text-[#0A1128] dark:text-white uppercase tracking-tighter text-lg leading-none mb-1">{name}</h4>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{role || "Expert Invité"}</p>
      </div>
    </div>
  )
}

const InfoItem = ({ icon: Icon, label, value }: any) => (
  <div className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent hover:border-[#FFD700]/30 transition-all group">
    <div className="p-3 bg-white dark:bg-white/10 rounded-xl text-[#0A1128] dark:text-white shadow-sm group-hover:scale-110 transition-transform">
      <Icon size={22} className="text-[#FFD700]" />
    </div>
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{label}</p>
      <p className="font-black text-[#0A1128] dark:text-white text-base leading-none">{value}</p>
    </div>
  </div>
)

interface EventDetailClientProps {
  params: Promise<{ id: string }>
}

export default function EventDetailClient({ params }: EventDetailClientProps) {
  const resolvedParams = use(params)
  const eventId = resolvedParams.id

  // Data Fetching
  const { data: event, isLoading, error } = useEvent(eventId)

  // States
  const [showRegister, setShowRegister] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [lightbox, setLightbox] = useState<{ open: boolean, index: number }>({ open: false, index: 0 })

  // Form States
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const createRegistration = useCreateRegistration()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const result = await createRegistration.mutateAsync({
        event_id: event.id,
        ...formData
      })
      if (result.success) {
        setStatus('success')
        setTimeout(() => setShowRegister(false), 2000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  // --- RENDERING ---

  if (isLoading) return <div className="min-h-screen bg-white dark:bg-[#0A1128] flex items-center justify-center"><div className="w-16 h-16 border-4 border-[#FFD700] border-t-transparent rounded-full animate-spin" /></div>

  if (error || !event) return <div className="min-h-screen flex flex-col items-center justify-center gap-4"><h2 className="text-2xl font-bold">Événement introuvable</h2><Link href="/events" className="text-blue-600 hover:underline">Retour au catalogue</Link></div>

  // Safety helpers
  const getSafeString = (val: any) => (typeof val === 'string' ? val : val?.name || "")

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A1128] text-[#0A1128] dark:text-white font-sans selection:bg-[#FFD700] selection:text-[#0A1128]">

      {/* --- 1. IMMERSIVE HERO HEADER --- */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        {/* Back Button (Floating) */}
        <Link
          href="/events"
          className="absolute top-28 left-6 z-50 flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-2.5 rounded-full font-medium transition-all group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Retour</span>
        </Link>

        {/* Hero Image with Cinematic Gradient */}
        <div className="absolute inset-0">
          <Image
            src={event.image || '/images/placeholder-event.jpg'}
            alt={event.title}
            fill
            className="object-cover"
            priority
            unoptimized={event.image?.includes('supabase')}
          />
          {/* Advanced Gradient Map: Darker at bottom for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/60 to-transparent" />
          {/* Texture Overlay */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay" />
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 w-full p-6 md:p-12 z-20">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl"
            >
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-4 py-1.5 bg-[#FFD700] text-[#0A1128] text-xs font-black uppercase tracking-widest rounded-full">
                  {getSafeString(event.category)}
                </span>
                {event.rubrique && (
                  <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md text-white text-sm font-bold uppercase tracking-wide rounded-md border border-white/20">
                    {getSafeString(event.rubrique)}
                  </span>
                )}
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.85] tracking-[-0.04em] uppercase drop-shadow-2xl">
                {event.title}
              </h1>

              <div className="flex flex-wrap items-center gap-8 text-white/90 font-black text-sm uppercase tracking-widest">
                <div className="flex items-center gap-3">
                  <Calendar className="text-[#FFD700]" size={18} />
                  {new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <div className="h-4 w-px bg-white/20 hidden sm:block" />
                <div className="flex items-center gap-3">
                  <Clock className="text-[#FFD700]" size={18} />
                  {event.time}
                </div>
                <div className="h-4 w-px bg-white/20 hidden sm:block" />
                <div className="flex items-center gap-3">
                  <MapPin className="text-[#FFD700]" size={18} />
                  {event.location}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- 2. MAIN LAYOUT (Content + Sticky Sidebar) --- */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* LEFT COLUMN: Narrative Content (Cols 8) */}
          <div className="lg:col-span-8 space-y-12">

            {/* Description Block */}
            <section className="prose prose-lg dark:prose-invert max-w-none 
              prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase 
              prose-p:leading-relaxed prose-p:text-gray-600 dark:prose-p:text-gray-400 
              prose-a:text-[#FFD700] 
              prose-strong:text-[#0A1128] dark:prose-strong:text-white">
              <div
                className="text-[#0A1128] dark:text-white/80 
                  [&_strong]:font-black [&_strong]:text-[#0A1128] dark:[&_strong]:text-white
                  [&_b]:font-black [&_b]:text-[#0A1128] dark:[&_b]:text-white"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(event.description || "") }}
              />
            </section>

            {/* Highlights Grid */}
            {event.highlights?.length > 0 && (
              <section>
                <SectionTitle>Pourquoi participer ?</SectionTitle>
                <div className="grid sm:grid-cols-2 gap-4">
                  {event.highlights.map((h: any, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#FFD700]/5 border border-[#FFD700]/10">
                      <div className="mt-1 p-1 bg-[#FFD700] rounded-full text-[#0A1128]">
                        <Check size={12} strokeWidth={4} />
                      </div>
                      <span className="font-medium text-gray-700 dark:text-gray-200">
                        {typeof h === 'string' ? h : h.highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Speakers Section */}
            {(event.speakers?.length > 0 || event.moderators?.length > 0) && (
              <section>
                <SectionTitle>Les Experts</SectionTitle>
                <div className="grid sm:grid-cols-2 gap-4">
                  {event.speakers?.map((s: any, i: number) => (
                    <SpeakerCard key={i} name={getSafeString(s)} role={s.title || "Intervenant"} colorIndex={i} />
                  ))}
                  {event.moderators?.map((m: any, i: number) => (
                    <SpeakerCard key={`mod-${i}`} name={getSafeString(m)} role="Modérateur" colorIndex={i + 2} />
                  ))}
                </div>
              </section>
            )}

            {/* Gallery Section */}
            {event.gallery?.length > 0 && (
              <section>
                <SectionTitle>Album <span className="text-[#FFD700] lowercase italic font-serif px-2">des</span> Souvenirs</SectionTitle>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {event.gallery.map((img: any, i: number) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setLightbox({ open: true, index: i })}
                      className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-white/5 cursor-pointer shadow-xl"
                    >
                      <Image
                        src={img.image_url}
                        alt={`Souvenir ${i + 1}`}
                        fill
                        className="object-cover transition-all duration-1000 group-hover:scale-110 grayscale hover:grayscale-0"
                        unoptimized={img.image_url.includes('supabase')}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-4 left-4 text-white font-black uppercase text-[10px] tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        Agrandir l'image
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* RIGHT COLUMN: Sticky Sidebar (Cols 4) */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-24 space-y-6">

              {/* Primary Action Card */}
              <div className="p-8 rounded-[2.5rem] bg-white dark:bg-[#050A15]/50 border-2 border-gray-100 dark:border-white/5 shadow-2xl backdrop-blur-xl group">
                <h3 className="text-2xl font-black mb-8 uppercase tracking-tighter text-[#0A1128] dark:text-white">
                  Réserver <span className="text-[#FFD700] italic font-serif lowercase">sa</span> Place
                </h3>

                <div className="space-y-4 mb-10">
                  <InfoItem icon={Calendar} label="Date de l'expérience" value={new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })} />
                  <InfoItem icon={Clock} label="Horaire Précis" value={event.time} />
                  <InfoItem icon={Users} label="Capacité d'accueil" value={`${event.participants || 0} participants`} />
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => setShowRegister(true)}
                    className="w-full py-5 bg-[#0A1128] dark:bg-white text-white dark:text-[#0A1128] font-black text-lg uppercase tracking-tighter rounded-2xl shadow-xl hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center justify-center gap-3 group/btn"
                  >
                    <span>S'inscrire Maintenant</span>
                    <Ticket className="group-hover/btn:rotate-12 transition-transform" size={22} />
                  </button>

                  <button
                    onClick={() => setShowShare(true)}
                    className="w-full py-5 bg-transparent border-2 border-gray-200 dark:border-white/10 font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-gray-400"
                  >
                    Partager l'événement
                  </button>
                </div>

                <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-6 italic">
                  Gratuité totale • La Trouvaille
                </p>
              </div>


            </div>
          </div>

        </div>
      </div>

      {/* --- MODALS (AnimatePresence for Smoothness) --- */}
      <AnimatePresence>

        {/* REGISTER MODAL */}
        {showRegister && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0A1128]/80 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-[#0A1128] w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowRegister(false)}
                className="absolute top-6 right-6 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-all z-10"
              >
                <X size={20} />
              </button>

              <div className="p-10 pt-16">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                      >
                        <Check size={48} className="text-green-500" strokeWidth={3} />
                      </motion.div>
                    </div>

                    <h3 className="text-3xl font-black text-green-500 uppercase tracking-tighter mb-4">
                      Inscription Confirmée !
                    </h3>
                    <p className="text-white/40 text-sm font-medium leading-relaxed max-w-xs mx-auto">
                      Votre place est sécurisée. Un email de confirmation vient d'être envoyé à votre adresse.
                    </p>

                    <button
                      onClick={() => setShowRegister(false)}
                      className="mt-12 px-8 py-4 bg-white/5 hover:bg-white/10 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all"
                    >
                      Retour à l'événement
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-10 text-center">
                      <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Finaliser l'inscription</h2>
                      <p className="text-white/40 text-sm font-medium">Remplissez vos informations pour recevoir votre invitation.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">Nom Complet</label>
                        <input
                          required
                          type="text"
                          placeholder="Ex: Alexander Traore"
                          className="w-full h-16 px-6 rounded-2xl bg-white/5 border border-white/10 focus:border-[#FFD700]/50 text-white outline-none transition-all font-bold placeholder:text-white/10"
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">Email Professionnel</label>
                        <input
                          required
                          type="email"
                          placeholder="votre@email.com"
                          className="w-full h-16 px-6 rounded-2xl bg-white/5 border border-white/10 focus:border-[#FFD700]/50 text-white outline-none transition-all font-bold placeholder:text-white/10"
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">Téléphone</label>
                        <input
                          type="tel"
                          placeholder="+212 ..."
                          className="w-full h-16 px-6 rounded-2xl bg-white/5 border border-white/10 focus:border-[#FFD700]/50 text-white outline-none transition-all font-bold placeholder:text-white/10"
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>

                      <button
                        disabled={status === 'loading'}
                        className="w-full h-20 mt-4 bg-white text-[#0A1128] font-black text-lg uppercase tracking-tighter rounded-2xl shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                      >
                        {status === 'loading' ? (
                          <div className="w-6 h-6 border-4 border-[#0A1128] border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>Confirmer mon billet</span>
                            <ArrowUpRight size={22} />
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* SHARE MODAL (Grid Layout) */}
        {showShare && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowShare(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-[#0A1128] p-8 rounded-[2rem] max-w-sm w-full shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-6 text-center">Partager via</h3>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => window.open(`https://wa.me/?text=${event.title}`)} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition-colors">
                  <Send size={24} /> <span className="text-sm font-bold">WhatsApp</span>
                </button>
                <button onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`)} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">
                  <Linkedin size={24} /> <span className="text-sm font-bold">LinkedIn</span>
                </button>
                <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${event.title}`)} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-sky-50 text-sky-500 hover:bg-sky-100 transition-colors">
                  <Twitter size={24} /> <span className="text-sm font-bold">Twitter</span>
                </button>
                <button onClick={() => navigator.clipboard.writeText(window.location.href)} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
                  <Copy size={24} /> <span className="text-sm font-bold">Copier</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* LIGHTBOX MODAL (Carousel) */}
        {lightbox.open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-start p-4 md:p-10 pt-64 pb-20 overflow-y-auto"
          >
            <button
              onClick={() => setLightbox({ open: false, index: 0 })}
              className="absolute top-28 right-10 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-[110]"
            >
              <X size={32} />
            </button>

            <div className="relative w-full max-w-6xl aspect-[16/9] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightbox.index}
                  initial={{ opacity: 0, scale: 0.9, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-4 border-white/5 shadow-2xl"
                >
                  <Image
                    src={event.gallery[lightbox.index].image_url}
                    alt="Gallery Fullscreen"
                    fill
                    className="object-contain"
                    unoptimized={event.gallery[lightbox.index].image_url.includes('supabase')}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              {event.gallery.length > 1 && (
                <>
                  <button
                    onClick={() => setLightbox(prev => ({ ...prev, index: (prev.index - 1 + event.gallery.length) % event.gallery.length }))}
                    className="absolute left-8 p-4 bg-white/10 hover:bg-white text-white hover:text-[#0A1128] rounded-full backdrop-blur-xl transition-all border border-white/20 shadow-2xl z-[120] group"
                  >
                    <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => setLightbox(prev => ({ ...prev, index: (prev.index + 1) % event.gallery.length }))}
                    className="absolute right-8 p-4 bg-white/10 hover:bg-white text-white hover:text-[#0A1128] rounded-full backdrop-blur-xl transition-all border border-white/20 shadow-2xl z-[120] group"
                  >
                    <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </>
              )}
            </div>

            {/* Pagination / Thumbnails Indicator */}
            <div className="mt-10 flex gap-4 overflow-x-auto p-4 max-w-4xl no-scrollbar">
              {event.gallery.map((img: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setLightbox(prev => ({ ...prev, index: i }))}
                  className={cn(
                    "w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all",
                    lightbox.index === i ? "border-[#FFD700] scale-110" : "border-white/20 opacity-40 hover:opacity-100"
                  )}
                >
                  <Image src={img.image_url} alt="Thumbnail" width={100} height={100} className="object-cover w-full h-full" unoptimized={img.image_url.includes('supabase')} />
                </button>
              ))}
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}