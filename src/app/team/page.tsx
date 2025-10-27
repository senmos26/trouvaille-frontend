"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Linkedin, ArrowRight } from "lucide-react"
import { useTeamMembers } from "@/lib/hooks/use-team"

export default function TeamPage() {
  const { data: teamMembers, isLoading, error } = useTeamMembers()
  const [displayCount, setDisplayCount] = useState(6)
  
  const visibleMembers = (teamMembers || []).slice(0, displayCount)
  const hasMore = (teamMembers || []).length > displayCount

  // Gestion des états de chargement et d'erreur
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FFD700]"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#0A1128] mb-4">Erreur de chargement</h2>
            <p className="text-gray-600">Impossible de charger l&apos;équipe. Veuillez réessayer plus tard.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-[#0A1128] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#FFD700 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        </div>
        <div className="container relative z-10 text-center py-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Les Visages Derrière la <span className="text-[#FFD700]">Mission</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Découvrez les leaders, innovateurs et passionnés qui œuvrent chaque jour pour transformer les idées en actions concrètes.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden group">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    width={400}
                    height={256}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {member.social_facebook && (
                      <a href={member.social_facebook} className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-[#0A1128] hover:bg-[#FFD700] transition-colors">
                        <Facebook size={18} />
                      </a>
                    )}
                    {member.social_twitter && (
                      <a href={member.social_twitter} className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-[#0A1128] hover:bg-[#FFD700] transition-colors">
                        <Twitter size={18} />
                      </a>
                    )}
                    {member.social_linkedin && (
                      <a href={member.social_linkedin} className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-[#0A1128] hover:bg-[#FFD700] transition-colors">
                        <Linkedin size={18} />
                      </a>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0A1128] mb-1">{member.name}</h3>
                  <p className="text-[#FFD700] font-semibold mb-3">{member.position}</p>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{member.bio}</p>
                  
                  {member.skills && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.skills.slice(0, 3).map((skill: string, idx: number) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 text-[#0A1128] text-xs font-semibold rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link href={`/team/${member.id}`} className="inline-flex items-center gap-2 text-[#FFD700] font-semibold hover:gap-3 transition-all">
                    Voir le profil <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="text-center mt-12">
              <button 
                onClick={() => setDisplayCount(prev => prev + 6)}
                className="px-8 py-3 bg-[#FFD700] text-[#0A1128] rounded-lg font-semibold hover:bg-[#E6C200] transition-all"
              >
                Voir plus
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
