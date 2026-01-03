"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Mail, Phone, MapPin, MessageCircle, User, BookText, MessageSquare, ArrowUpRight } from "lucide-react"
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
    <div className="min-h-screen overflow-x-hidden bg-white dark:bg-[#0A1128] text-[#0A1128] dark:text-white font-sans selection:bg-[#FFD700] selection:text-[#0A1128]">

      {/* 1. CINEMATIC HERO */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-16 overflow-hidden border-b border-gray-100 dark:border-transparent">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-500/5 dark:bg-blue-500/10 blur-[80px] md:blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-50 dark:opacity-100 translate-x-1/2 -translate-y-1/2 md:translate-x-1/3 md:-translate-y-1/3" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10 px-6">
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 md:w-12 h-px bg-[#FFD700]" />
                <span className="text-[#FFD700] font-black uppercase tracking-[0.3em] text-[9px] md:text-[10px]">Service d&apos;Excellence</span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.9] uppercase mb-6">
                Contactez-<br />
                <span className="text-[#FFD700] lowercase italic font-serif">nous.</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex flex-col md:flex-row justify-between items-start md:items-end border-t border-gray-100 dark:border-white/10 pt-8 gap-6 md:gap-0"
            >
              <p className="max-w-md text-sm md:text-base font-light leading-relaxed text-gray-500 dark:text-gray-300 italic font-serif">
                &quot;Une question, un partenariat ou simplement l&apos;envie de rejoindre l&apos;aventure ? Nos équipes vous écoutent.&quot;
              </p>
              <div className="flex flex-col items-start md:items-end gap-1">
                <span className="text-[9px] uppercase tracking-[0.4em] font-black text-gray-400 dark:text-white/40">Disponibilité</span>
                <span className="text-xl md:text-2xl font-black text-[#FFD700]">Lundi - Samedi</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. CONTACT SECTION */}
      <section className="py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-12 gap-12 md:gap-16">

            {/* LEFT: FORM */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <div className="bg-white dark:bg-white/5 p-6 sm:p-10 md:p-14 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl hover:shadow-[#FFD700]/5 transition-all duration-700">
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter mb-8 md:mb-10 flex items-center gap-3">
                  <MessageSquare className="text-[#FFD700] w-6 h-6 md:w-8 md:h-8" />
                  Laissez une trace
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                  <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-2">
                      <label className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">votre nom</label>
                      <div className="relative group">
                        <User className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 text-gray-300 dark:text-white/20 group-focus-within:text-[#FFD700] transition-colors w-4.5 h-4.5" />
                        <input
                          required
                          type="text"
                          placeholder="John Doe"
                          className="w-full h-14 md:h-16 pl-12 md:pl-14 pr-6 rounded-xl md:rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 focus:border-[#FFD700]/50 text-[#0A1128] dark:text-white outline-none transition-all font-bold text-sm md:text-base"
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">votre email</label>
                      <div className="relative group">
                        <Mail className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 text-gray-300 dark:text-white/20 group-focus-within:text-[#FFD700] transition-colors w-4.5 h-4.5" />
                        <input
                          required
                          type="email"
                          placeholder="john@example.com"
                          className="w-full h-14 md:h-16 pl-12 md:pl-14 pr-6 rounded-xl md:rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 focus:border-[#FFD700]/50 text-[#0A1128] dark:text-white outline-none transition-all font-bold text-sm md:text-base"
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">sujet</label>
                    <div className="relative group">
                      <BookText className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 text-gray-300 dark:text-white/20 group-focus-within:text-[#FFD700] transition-colors w-4.5 h-4.5" />
                      <input
                        required
                        type="text"
                        placeholder="Comment pouvons-nous vous aider ?"
                        className="w-full h-14 md:h-16 pl-12 md:pl-14 pr-6 rounded-xl md:rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 focus:border-[#FFD700]/50 text-[#0A1128] dark:text-white outline-none transition-all font-bold text-sm md:text-base"
                        value={formData.subject}
                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">votre message</label>
                    <div className="relative group">
                      <MessageCircle className="absolute left-5 md:left-6 top-7 text-gray-300 dark:text-white/20 group-focus-within:text-[#FFD700] transition-colors w-4.5 h-4.5" />
                      <textarea
                        required
                        rows={5}
                        placeholder="Écrivez votre projet ici..."
                        className="w-full pl-12 md:pl-14 pr-6 py-5 md:py-6 rounded-xl md:rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 focus:border-[#FFD700]/50 text-[#0A1128] dark:text-white outline-none transition-all font-bold resize-none text-sm md:text-base"
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>
                  </div>

                  <button
                    disabled={isSubmitting}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="w-full py-5 md:py-6 bg-[#0A1128] dark:bg-white text-white dark:text-[#0A1128] font-black text-lg md:text-xl uppercase tracking-tighter rounded-xl md:rounded-2xl shadow-xl md:hover:scale-[1.02] md:active:scale-[0.98] transition-all flex items-center justify-center gap-3 md:gap-4 overflow-hidden relative group/btn"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 md:w-6 md:h-6 border-4 border-[#FFD700] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <motion.span
                          animate={{ x: isHovered && typeof window !== 'undefined' && window.innerWidth > 768 ? -10 : 0 }}
                        >
                          Envoyer le message
                        </motion.span>
                        <ArrowUpRight
                          className={cn(
                            "w-6 h-6 transition-all duration-300",
                            isHovered && typeof window !== 'undefined' && window.innerWidth > 768 ? "translate-x-2 -translate-y-2 text-[#FFD700]" : ""
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
              className="lg:col-span-5 space-y-8 md:space-y-10"
            >
              <div className="space-y-3 md:space-y-4">
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Nos coordonnées.</h2>
                <p className="text-sm md:text-base text-gray-400 font-medium font-serif italic leading-relaxed">Une équipe dédiée pour vous accompagner dans votre ascension.</p>
              </div>

              <div className="space-y-4 md:space-y-6">
                {[
                  { icon: Mail, label: "Email", value: "club.latrouvaille@gmail.com", href: "mailto:club.latrouvaille@gmail.com" },
                  { icon: Phone, label: "Téléphone", value: "+212 600 850 149", href: "tel:+212600850149" },
                  { icon: MapPin, label: "Localisation", value: "Casablanca, Maroc", href: "#" },
                ].map((item, idx) => (
                  <motion.a
                    key={idx}
                    href={item.href}
                    className="group block p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 md:hover:border-[#FFD700]/30 transition-all duration-500 overflow-hidden"
                  >
                    <div className="flex items-center gap-4 md:gap-6">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white dark:bg-white/10 flex items-center justify-center text-[#FFD700] shadow-sm transition-transform md:group-hover:scale-110 md:group-hover:bg-[#FFD700] md:group-hover:text-white shrink-0">
                        <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{item.label}</p>
                        <p className="text-sm sm:text-base md:text-lg font-black text-[#0A1128] dark:text-white uppercase tracking-tighter transition-colors md:group-hover:text-[#FFD700] break-all sm:break-normal">{item.value}</p>
                      </div>
                    </div>
                  </motion.a>
                ))}

                {/* LEGAL LINKS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    href="/legal/mentions-legales"
                    className="group block p-6 md:p-8 rounded-xl md:rounded-2xl bg-[#0A1128] border border-white/5 md:hover:border-[#FFD700]/30 transition-all duration-500 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFD700]/5 blur-2xl rounded-full translate-x-12 -translate-y-12" />
                    <div className="relative z-10">
                      <span className="text-[#FFD700] text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] mb-2 block">Juridique</span>
                      <h4 className="text-white font-black uppercase tracking-tighter text-base md:text-lg leading-none group-hover:text-[#FFD700] transition-colors">Mentions Légales</h4>
                    </div>
                  </Link>

                  <Link
                    href="/legal/politique-confidentialite"
                    className="group block p-6 md:p-8 rounded-xl md:rounded-2xl bg-[#0A1128] border border-white/5 md:hover:border-[#FFD700]/30 transition-all duration-500 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFD700]/5 blur-2xl rounded-full translate-x-12 -translate-y-12" />
                    <div className="relative z-10">
                      <span className="text-[#FFD700] text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] mb-2 block">Données</span>
                      <h4 className="text-white font-black uppercase tracking-tighter text-base md:text-lg leading-none group-hover:text-[#FFD700] transition-colors">Confidentialité</h4>
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  )
}
