"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Users, MessageCircle, User, BookText, MessageSquare, Clock, ArrowUpRight, Sparkles } from "lucide-react"
import { createContact } from "@/lib/actions/contacts"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await createContact(formData)
      if (!result.success) {
        toast.error(`Erreur lors de l'envoi : ${result.error || "Veuillez réessayer."}`)
        return
      }
      toast.success("Message envoyé !", { description: "Nous vous répondrons sous 24h." })
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch {
      toast.error("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A1128] text-[#0A1128] dark:text-white font-sans selection:bg-[#FFD700] selection:text-[#0A1128]">

      {/* 1. CINEMATIC HERO */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden border-b border-gray-100 dark:border-transparent">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-50 dark:opacity-100" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay pointer-events-none" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-px bg-[#FFD700]" />
                <span className="text-[#FFD700] font-black uppercase tracking-[0.3em] text-[10px]">Service d&apos;Excellence</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.9] uppercase mb-6">
                Contactez-<br />
                <span className="text-[#FFD700] lowercase italic font-serif">nous.</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex justify-between items-end border-t border-gray-100 dark:border-white/10 pt-8"
            >
              <p className="max-w-md text-sm md:text-base font-light leading-relaxed text-gray-500 dark:text-gray-300 italic font-serif">
                &quot;Une question, un partenariat ou simplement l&apos;envie de rejoindre l&apos;aventure ? Nos équipes vous écoutent.&quot;
              </p>
              <div className="hidden md:flex flex-col items-end gap-1">
                <span className="text-[9px] uppercase tracking-[0.4em] font-black text-gray-400 dark:text-white/40">Disponibilité</span>
                <span className="text-2xl font-black text-[#FFD700]">Lundi - Samedi</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. CONTACT SECTION */}
      <section className="py-24 container mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-12 gap-16">

          {/* LEFT: FORM */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="bg-white dark:bg-white/5 p-10 md:p-14 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl hover:shadow-[#FFD700]/5 transition-all duration-700">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-10 flex items-center gap-4">
                <MessageSquare className="text-[#FFD700]" size={24} />
                Laissez une trace
              </h2>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">votre nom</label>
                    <div className="relative group">
                      <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 dark:text-white/20 group-focus-within:text-[#FFD700] transition-colors" size={18} />
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        className="w-full h-16 pl-14 pr-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 focus:border-[#FFD700]/50 text-[#0A1128] dark:text-white outline-none transition-all font-bold"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">votre email</label>
                    <div className="relative group">
                      <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 dark:text-white/20 group-focus-within:text-[#FFD700] transition-colors" size={18} />
                      <input
                        required
                        type="email"
                        placeholder="john@example.com"
                        className="w-full h-16 pl-14 pr-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 focus:border-[#FFD700]/50 text-[#0A1128] dark:text-white outline-none transition-all font-bold"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">sujet</label>
                  <div className="relative group">
                    <BookText className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 dark:text-white/20 group-focus-within:text-[#FFD700] transition-colors" size={18} />
                    <input
                      required
                      type="text"
                      placeholder="Comment pouvons-nous vous aider ?"
                      className="w-full h-16 pl-14 pr-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 focus:border-[#FFD700]/50 text-[#0A1128] dark:text-white outline-none transition-all font-bold"
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">votre message</label>
                  <div className="relative group">
                    <MessageCircle className="absolute left-6 top-8 text-gray-300 dark:text-white/20 group-focus-within:text-[#FFD700] transition-colors" size={18} />
                    <textarea
                      required
                      rows={6}
                      placeholder="Écrivez votre projet ici..."
                      className="w-full pl-14 pr-6 py-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 focus:border-[#FFD700]/50 text-[#0A1128] dark:text-white outline-none transition-all font-bold resize-none"
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                </div>

                <button
                  disabled={isSubmitting}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="w-full py-6 bg-[#0A1128] dark:bg-white text-white dark:text-[#0A1128] font-black text-xl uppercase tracking-tighter rounded-2xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 overflow-hidden relative group/btn"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-4 border-[#FFD700] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <motion.span
                        animate={{ x: isHovered ? -10 : 0 }}
                      >
                        Envoyer le message
                      </motion.span>
                      <ArrowUpRight
                        size={24}
                        className={cn(
                          "transition-all duration-300",
                          isHovered ? "translate-x-2 -translate-y-2 text-[#FFD700]" : ""
                        )}
                      />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* RIGHT: INFO */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-10"
          >
            <div className="space-y-4">
              <h2 className="text-4xl font-black uppercase tracking-tighter">Nos coordonnées.</h2>
              <p className="text-gray-400 font-medium">Une équipe dédiée pour vous accompagner dans votre ascension.</p>
            </div>

            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email", value: "club.latrouvaille@gmail.com", href: "mailto:club.latrouvaille@gmail.com" },
                { icon: Phone, label: "Téléphone", value: "+212 600 850 149", href: "tel:+212600850149" },
                { icon: MapPin, label: "Localisation", value: "Casablanca, Maroc", href: "#" },
              ].map((item, idx) => (
                <motion.a
                  key={idx}
                  href={item.href}
                  className="group block p-8 rounded-[2rem] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-[#FFD700]/30 transition-all duration-500"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-white/10 flex items-center justify-center text-[#FFD700] shadow-sm transition-transform group-hover:scale-110 group-hover:bg-[#FFD700] group-hover:text-white">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{item.label}</p>
                      <p className="text-lg font-black text-[#0A1128] dark:text-white uppercase tracking-tighter transition-colors group-hover:text-[#FFD700]">{item.value}</p>
                    </div>
                  </div>
                </motion.a>
              ))}

              <div className="p-8 rounded-[2rem] bg-[#0A1128] border border-white/5 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FFD700]/10 to-transparent" />
                <div className="relative z-10 flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#FFD700] flex items-center justify-center text-[#0A1128] shadow-lg">
                    <Users size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-black uppercase tracking-tighter text-xl mb-1">Communauté</h4>
                    <p className="text-white/50 text-xs font-medium uppercase tracking-widest flex items-center gap-2">
                      <Sparkles size={12} className="text-[#FFD700]" />
                      5000+ Ambassadeurs
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timings */}
            <div className="p-8 border-t border-gray-100 dark:border-white/10 flex items-center gap-6 opacity-60">
              <Clock size={20} className="text-[#FFD700]" />
              <div className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                Temps de réponse moyen : <span className="text-[#0A1128] dark:text-white">Moins de 24h</span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  )
}
