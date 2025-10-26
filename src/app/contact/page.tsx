"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Users, Send, MessageCircle, User, BookText, MessageSquare, Clock, Globe } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simuler l'envoi
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })
    
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-[#0A1128] via-[#1a2851] to-[#0A1128] text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#FFD700] rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FFD700] rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #FFD700 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="container relative z-10 text-center py-24 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFD700] text-[#0A1128] rounded-full font-bold mb-8 shadow-lg"
          >
            <MessageCircle size={18} />
            Parlons de votre projet
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
          >
            Transformons vos
            <span className="block bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FFD700] bg-clip-text text-transparent animate-gradient">
              Idées en Réalité
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed"
          >
            Votre voix compte. Partagez vos questions, vos idées ou rejoignez notre mouvement pour bâtir un avenir meilleur ensemble.
          </motion.p>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 flex flex-wrap justify-center gap-8"
          >
            <div className="flex items-center gap-2 text-white/80">
              <Clock className="text-[#FFD700]" size={20} />
              <span className="text-sm font-medium">Réponse sous 24h</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Users className="text-[#FFD700]" size={20} />
              <span className="text-sm font-medium">5000+ membres</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Globe className="text-[#FFD700]" size={20} />
              <span className="text-sm font-medium">Présence internationale</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-[3fr_2fr] gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-100"
            >
              <div className="mb-8">
                <div className="inline-block p-3 bg-[#FFD700]/10 rounded-xl mb-4">
                  <MessageSquare className="text-[#FFD700]" size={28} />
                </div>
                <h2 className="text-4xl font-extrabold text-[#0A1128] mb-3">Envoyez-nous un message</h2>
                <p className="text-[#0A1128]/60 text-lg">Remplissez le formulaire ci-dessous et notre équipe vous répondra rapidement.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="group">
                  <label className="block text-sm font-bold text-[#0A1128] mb-3">Nom complet</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-[#FFD700]/10 rounded-lg group-focus-within:bg-[#FFD700]/20 transition-colors">
                      <User size={18} className="text-[#0A1128]/60 group-focus-within:text-[#0A1128]" />
                    </div>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Votre nom et prénom"
                      className="w-full pl-16 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#FFD700] focus:ring-4 focus:ring-[#FFD700]/10 transition-all text-[#0A1128]"
                      required
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-bold text-[#0A1128] mb-3">Adresse Email</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-[#FFD700]/10 rounded-lg group-focus-within:bg-[#FFD700]/20 transition-colors">
                      <Mail size={18} className="text-[#0A1128]/60 group-focus-within:text-[#0A1128]" />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="votre.email@exemple.com"
                      className="w-full pl-16 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#FFD700] focus:ring-4 focus:ring-[#FFD700]/10 transition-all text-[#0A1128]"
                      required
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-bold text-[#0A1128] mb-3">Sujet</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-[#FFD700]/10 rounded-lg group-focus-within:bg-[#FFD700]/20 transition-colors">
                      <BookText size={18} className="text-[#0A1128]/60 group-focus-within:text-[#0A1128]" />
                    </div>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder="L'objet de votre message"
                      className="w-full pl-16 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#FFD700] focus:ring-4 focus:ring-[#FFD700]/10 transition-all text-[#0A1128]"
                      required
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-bold text-[#0A1128] mb-3">Message</label>
                  <div className="relative">
                    <div className="absolute left-4 top-5 p-2 bg-[#FFD700]/10 rounded-lg group-focus-within:bg-[#FFD700]/20 transition-colors">
                      <MessageSquare size={18} className="text-[#0A1128]/60 group-focus-within:text-[#0A1128]" />
                    </div>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Écrivez votre message ici..."
                      rows={6}
                      className="w-full pl-16 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#FFD700] focus:ring-4 focus:ring-[#FFD700]/10 transition-all resize-none text-[#0A1128]"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-[#0A1128] to-[#1a2851] text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Envoyer le message</span>
                      <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 text-green-800 rounded-xl flex items-center gap-4 shadow-lg"
                  >
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 shadow-md">✓</div>
                    <div>
                      <p className="font-bold">Message envoyé avec succès !</p>
                      <p className="text-sm text-green-700">Nous vous répondrons dans les plus brefs délais.</p>
                    </div>
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <div className="inline-block p-3 bg-[#FFD700]/10 rounded-xl mb-4">
                  <Phone className="text-[#FFD700]" size={28} />
                </div>
                <h2 className="text-4xl font-extrabold text-[#0A1128] mb-3">Nos Coordonnées</h2>
                <p className="text-[#0A1128]/60 text-lg">Contactez-nous directement ou retrouvez-nous sur nos réseaux.</p>
              </div>

              <div className="space-y-4">
                <motion.a
                  href="mailto:club.latrouvaille@gmail.com"
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group relative flex items-start gap-5 p-6 bg-white border-2 border-gray-200 rounded-2xl hover:border-[#FFD700] hover:shadow-xl transition-all overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#FFC107] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <Mail className="text-[#0A1128]" size={24} />
                  </div>
                  <div className="relative">
                    <h3 className="font-bold text-[#0A1128] mb-2 text-lg">Email</h3>
                    <p className="text-[#0A1128]/70 group-hover:text-[#0A1128] transition-colors break-all">
                      club.latrouvaille@gmail.com
                    </p>
                  </div>
                </motion.a>

                <motion.a
                  href="tel:+212600850149"
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group relative flex items-start gap-5 p-6 bg-white border-2 border-gray-200 rounded-2xl hover:border-[#FFD700] hover:shadow-xl transition-all overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#FFC107] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <Phone className="text-[#0A1128]" size={24} />
                  </div>
                  <div className="relative">
                    <h3 className="font-bold text-[#0A1128] mb-2 text-lg">Téléphone</h3>
                    <p className="text-[#0A1128]/70 group-hover:text-[#0A1128] transition-colors">
                      +212 600 850 149
                    </p>
                  </div>
                </motion.a>

                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group relative flex items-start gap-5 p-6 bg-white border-2 border-gray-200 rounded-2xl hover:border-[#FFD700] hover:shadow-xl transition-all overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#FFC107] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <MapPin className="text-[#0A1128]" size={24} />
                  </div>
                  <div className="relative">
                    <h3 className="font-bold text-[#0A1128] mb-2 text-lg">Localisation</h3>
                    <p className="text-[#0A1128]/70">Casablanca, Maroc</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group relative flex items-start gap-5 p-6 bg-gradient-to-br from-[#0A1128] to-[#1a2851] border-2 border-[#0A1128] rounded-2xl shadow-xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative w-16 h-16 bg-[#FFD700] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <Users className="text-[#0A1128]" size={24} />
                  </div>
                  <div className="relative">
                    <h3 className="font-bold text-white mb-2 text-lg">Rejoignez-nous</h3>
                    <p className="text-white/80 group-hover:text-white transition-colors">Une communauté de 5000+ membres passionnés</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
