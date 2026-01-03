"use client"

import { use, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft, Mail, Linkedin, Twitter, Facebook,
  Award, Briefcase, GraduationCap, Loader2, MapPin,
  Copy, Check, X, Send, Phone
} from "lucide-react"
import { useTeamMember } from "@/lib/hooks/use-team"
import { cn } from "@/lib/utils"

// --- UI COMPONENTS FROM EVENT DETAIL ---

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl md:text-3xl font-black text-[#0A1128] dark:text-white mb-10 tracking-tighter uppercase flex items-center gap-4">
    <span className="w-10 h-1 bg-[#FFD700]" />
    {children}
  </h2>
)

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

export default function TeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: memberId } = use(params)
  const { data: member, isLoading, error } = useTeamMember(memberId)
  const [showContact, setShowContact] = useState(false)

  // Safety helpers
  const getSafeString = (val: any) => (typeof val === 'string' ? val : val?.name || "")

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0A1128] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#FFD700] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error || !member) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0A1128] flex flex-col items-center justify-center gap-4 text-[#0A1128] dark:text-white">
        <h2 className="text-2xl font-bold">Membre introuvable</h2>
        <Link href="/team" className="text-[#FFD700] hover:underline">Retour à l'équipe</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A1128] text-[#0A1128] dark:text-white font-sans selection:bg-[#FFD700] selection:text-[#0A1128]">

      {/* --- 1. IMMERSIVE HERO HEADER --- */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden bg-[#0A1128]">
        {/* Back Button */}
        <Link
          href="/team"
          className="absolute top-28 left-6 z-50 flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-2.5 rounded-full font-medium transition-all group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Retour</span>
        </Link>

        {/* Hero Background - Cinematic Gradient/Texture */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#0A1128]" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-[#0A1128] to-black" />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FFD700]/10 blur-[150px] rounded-full mix-blend-screen" />
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
                  L'équipe
                </span>
                <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md text-white text-sm font-bold uppercase tracking-wide rounded-md border border-white/20">
                  Membre Fondateur
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.85] tracking-[-0.04em] uppercase drop-shadow-2xl">
                {member.name}
              </h1>

              <div className="flex flex-wrap items-center gap-8 text-white/90 font-black text-sm uppercase tracking-widest">
                <div className="flex items-center gap-3">
                  <Briefcase className="text-[#FFD700]" size={18} />
                  {member.position}
                </div>
                <div className="h-4 w-px bg-white/20 hidden sm:block" />
                <div className="flex items-center gap-3">
                  <MapPin className="text-[#FFD700]" size={18} />
                  Maroc
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- 2. MAIN LAYOUT --- */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* LEFT COLUMN: Narrative Content (Cols 8) */}
          <div className="lg:col-span-8 space-y-16">

            {/* BIO */}
            <section className="mb-10">
              <p className="whitespace-pre-line text-lg md:text-xl text-[#0A1128]/80 dark:text-white/80 leading-relaxed font-serif">
                {member.bio}
              </p>
            </section>

            {/* SKILLS / EXPERTISE HIGHLIGHTS */}
            {member.skills && member.skills.length > 0 && (
              <section>
                <SectionTitle>Domaines d'expertise</SectionTitle>
                <div className="grid sm:grid-cols-2 gap-4">
                  {member.skills.map((skill: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#FFD700]/5 border border-[#FFD700]/10">
                      <div className="mt-1 p-1 bg-[#FFD700] rounded-full text-[#0A1128]">
                        <Check size={12} strokeWidth={4} />
                      </div>
                      <span className="font-medium text-gray-700 dark:text-gray-200">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* EXPERIENCE */}
            {member.experience && member.experience.length > 0 && (
              <section>
                <SectionTitle>Parcours Pro</SectionTitle>
                <div className="space-y-6">
                  {member.experience.map((exp: any, i: number) => (
                    <div key={i} className="group flex flex-col md:flex-row gap-6 p-6 rounded-3xl border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 shadow-sm hover:shadow-xl transition-all duration-500">
                      <div className="shrink-0 md:w-48">
                        <div className="inline-block px-3 py-1 bg-[#FFD700]/20 text-[#FFD700] font-black text-xs uppercase tracking-wider rounded-lg mb-2">
                          {exp.period}
                        </div>
                        <div className="text-[#0A1128]/50 dark:text-white/50 text-sm font-bold uppercase">{exp.company}</div>
                      </div>
                      <div>
                        <h4 className="font-black text-[#0A1128] dark:text-white uppercase tracking-tight text-xl mb-3 group-hover:text-[#FFD700] transition-colors">{exp.title}</h4>
                        {exp.description && (
                          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{exp.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* EDUCATION */}
            {member.education && member.education.length > 0 && (
              <section>
                <SectionTitle>Formation</SectionTitle>
                <div className="grid sm:grid-cols-2 gap-4">
                  {member.education.map((edu: any, i: number) => (
                    <div key={i} className="group p-6 rounded-3xl border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 shadow-sm hover:border-[#FFD700]/30 transition-all">
                      <GraduationCap className="text-[#FFD700] mb-4" size={32} />
                      <h4 className="text-xl font-bold text-[#0A1128] dark:text-white mb-2 uppercase tracking-tight">{edu.degree}</h4>
                      <p className="text-base text-gray-600 dark:text-gray-400 font-medium">{edu.school}</p>
                      <span className="text-sm font-bold text-[#FFD700] mt-3 block tracking-wider uppercase">{edu.year}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ACHIEVEMENTS */}
            {member.achievements && member.achievements.length > 0 && (
              <section>
                <SectionTitle>Accomplissements</SectionTitle>
                <div className="space-y-4">
                  {member.achievements.map((ach: any, i: number) => (
                    <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                      <Award className="text-[#FFD700] shrink-0" size={24} />
                      <p className="text-[#0A1128]/80 dark:text-white/80 font-medium">{ach.achievement}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}


          </div>

          {/* RIGHT COLUMN: Sticky Sidebar (Cols 4) */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-32 space-y-6">

              {/* PROFILE CARD */}
              <div className="p-8 rounded-[2.5rem] bg-white dark:bg-[#050A15]/50 border-2 border-gray-100 dark:border-white/5 shadow-2xl backdrop-blur-xl group overflow-hidden">

                {/* IMAGE */}
                <div className="aspect-square w-full rounded-2xl overflow-hidden relative mb-8 border border-gray-200 dark:border-white/10 shadow-lg">
                  <Image
                    src={member.image || "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=800&h=800&fit=crop"}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <h3 className="text-2xl font-black mb-2 uppercase tracking-tighter text-[#0A1128] dark:text-white text-center">
                  {member.name}
                </h3>
                <p className="text-center text-[#FFD700] font-bold uppercase text-xs tracking-widest mb-8">
                  {member.position}
                </p>

                <div className="space-y-4 mb-8">
                  {member.email && (
                    <button onClick={() => window.open(`mailto:${member.email}`)} className="w-full py-4 bg-[#FFD700] text-[#0A1128] font-black text-sm uppercase tracking-widest rounded-xl hover:bg-[#E6C200] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1">
                      <Mail size={18} /> Contacter
                    </button>
                  )}
                </div>

                <div className="flex justify-center gap-4">
                  {member.social_linkedin && (
                    <a href={member.social_linkedin} target="_blank" className="p-3 bg-gray-100 dark:bg-white/5 hover:bg-[#0077b5] hover:text-white text-gray-500 dark:text-gray-400 rounded-xl transition-colors">
                      <Linkedin size={20} />
                    </a>
                  )}
                  {member.social_twitter && (
                    <a href={member.social_twitter} target="_blank" className="p-3 bg-gray-100 dark:bg-white/5 hover:bg-[#1DA1F2] hover:text-white text-gray-500 dark:text-gray-400 rounded-xl transition-colors">
                      <Twitter size={20} />
                    </a>
                  )}
                  {member.social_facebook && (
                    <a href={member.social_facebook} target="_blank" className="p-3 bg-gray-100 dark:bg-white/5 hover:bg-[#1877F2] hover:text-white text-gray-500 dark:text-gray-400 rounded-xl transition-colors">
                      <Facebook size={20} />
                    </a>
                  )}
                </div>

              </div>

              {/* Additional Sidebar Info (Maybe Stats or Quote) */}
              <div className="p-8 rounded-[2rem] bg-[#FFD700]/5 dark:bg-gradient-to-br dark:from-[#FFD700]/20 dark:to-transparent border border-[#FFD700]/20 dark:border-[#FFD700]/10">
                <p className="font-serif italic text-gray-500 dark:text-white/60 text-center">
                  "Ensemble pour transformer l'avenir de l'Afrique."
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
