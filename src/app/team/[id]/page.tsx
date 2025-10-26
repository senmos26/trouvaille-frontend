"use client"

import Link from "next/link"
import { ArrowLeft, Mail, Linkedin, Twitter, Facebook, Award, Briefcase, GraduationCap, Download } from "lucide-react"

const teamData = {
  "1": {
    id: 1,
    name: "Amina Diallo",
    position: "Présidente & Fondatrice",
    bio: "Passionnée par le développement durable en Afrique, Amina dirige La Trouvaille avec vision et détermination depuis sa création en 2021.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=800&fit=crop",
    email: "amina.diallo@latrouvaille.org",
    skills: ["Leadership", "Stratégie", "Développement", "Gestion de projet", "Partenariats"],
    education: [
      { degree: "MBA Management", school: "HEC Paris", year: "2019" },
      { degree: "Master Économie du Développement", school: "Université Cheikh Anta Diop", year: "2016" }
    ],
    experience: [
      { title: "Présidente", company: "La Trouvaille", period: "2021 - Présent" },
      { title: "Consultante", company: "Banque Mondiale", period: "2019 - 2021" },
      { title: "Chargée de projet", company: "ONG Développement Afrique", period: "2016 - 2019" }
    ],
    achievements: [
      "Lancement de La Trouvaille et mobilisation de 5000+ jeunes",
      "50+ projets menés avec succès à travers l'Afrique",
      "Partenariats stratégiques avec des organisations internationales"
    ],
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      facebook: "https://facebook.com"
    }
  },
  "2": {
    id: 2,
    name: "Kofi Mensah",
    position: "Directeur Innovation",
    bio: "Expert en technologies émergentes, Kofi pilote nos initiatives d'innovation et de transformation digitale.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=800&fit=crop",
    email: "kofi.mensah@latrouvaille.org",
    skills: ["Tech", "Innovation", "IA", "Blockchain", "IoT"],
    education: [
      { degree: "Doctorat IA", school: "MIT", year: "2020" }
    ],
    experience: [
      { title: "Directeur Innovation", company: "La Trouvaille", period: "2021 - Présent" }
    ],
    achievements: ["Innovation hub créé", "15+ startups accompagnées"],
    socials: { linkedin: "https://linkedin.com", twitter: "https://twitter.com" }
  }
}

export default function TeamMemberPage({ params }: { params: { id: string } }) {
  const member = teamData[params.id as keyof typeof teamData] || teamData["1"]
  return (
    <div className="bg-white min-h-screen">
      {/* Top hero */}
      <section className="bg-white">
        <div className="container py-14">
          <Link href="/team" className="inline-flex items-center gap-2 text-[#0A1128]/60 hover:text-[#0A1128] mb-6 transition-colors">
            <ArrowLeft size={18} />
            Retour à l'équipe
          </Link>

          <div className="grid gap-8 md:grid-cols-[320px_1fr] items-start">
            {/* Sidebar profile */}
            <aside className="bg-gray-50 p-6 rounded-2xl shadow-lg border border-gray-200 sticky top-24">
              <div className="flex flex-col items-center text-center">
                <img src={member.image} alt={member.name} className="w-48 h-48 rounded-xl object-cover shadow-xl ring-4 ring-[#FFD700]/20" />
                <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-[#0A1128]">{member.name}</h2>
                <p className="mt-1 text-[#0A1128]/70 font-semibold text-lg md:text-xl">{member.position}</p>
           

                <div className="mt-6 w-full">
                  <a href={`mailto:${member.email}`} className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#FFD700] text-[#0A1128] rounded-xl font-bold hover:bg-[#E6C200] transition shadow-md hover:shadow-lg">
                    <Mail size={16} /> Contacter
                  </a>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  {member.socials.linkedin && (
                    <a href={member.socials.linkedin} className="p-2 bg-white border border-gray-200 rounded-md hover:bg-[#0A1128] hover:text-[#FFD700] hover:border-[#0A1128] transition-all text-[#0A1128]/60">
                      <Linkedin size={18} />
                    </a>
                  )}
                  {member.socials.twitter && (
                    <a href={member.socials.twitter} className="p-2 bg-white border border-gray-200 rounded-md hover:bg-[#0A1128] hover:text-[#FFD700] hover:border-[#0A1128] transition-all text-[#0A1128]/60">
                      <Twitter size={18} />
                    </a>
                  )}
                  {'facebook' in member.socials && member.socials.facebook && (
                    <a href={member.socials.facebook} className="p-2 bg-white border border-gray-200 rounded-md hover:bg-[#0A1128] hover:text-[#FFD700] hover:border-[#0A1128] transition-all text-[#0A1128]/60">
                      <Facebook size={18} />
                    </a>
                  )}
                </div>
              </div>
            </aside>

            {/* Main content */}
            <main className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <header className="mb-8 pb-6 border-b border-gray-200">
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#0A1128]">{member.name}</h1>
                <p className="mt-2 text-[#0A1128]/70 font-semibold text-2xl">{member.position}</p>
              </header>

              <section className="max-w-none text-[#0A1128]/80 mb-8">
                <p className="text-lg md:text-xl leading-relaxed">{member.bio}</p>
              </section>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                {/* Education card */}
                <div className="p-6 rounded-xl bg-gray-50 border border-gray-200 hover:shadow-md transition-shadow">
                  <h3 className="flex items-center gap-2 text-lg font-bold mb-4 text-[#0A1128]">
                    <GraduationCap className="text-[#FFD700]" size={24} /> 
                    Formation académique
                  </h3>
                  <div className="space-y-4">
                    {member.education.map((edu, idx) => (
                      <div key={idx} className="pb-4 last:pb-0 border-b last:border-0 border-gray-200">
                        <div className="font-semibold text-[#0A1128]">{edu.degree}</div>
                        <div className="text-sm text-[#0A1128]/60">{edu.school}</div>
                        <div className="text-xs text-[#FFD700] font-semibold mt-1">{edu.year}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick facts / contact */}
                <div className="p-6 rounded-xl bg-gray-50 border border-gray-200 hover:shadow-md transition-shadow">
                  <h3 className="flex items-center gap-2 text-lg font-bold mb-4 text-[#0A1128]">
                    <Award className="text-[#FFD700]" size={24} /> 
                    Informations de contact
                  </h3>
                  <div className="space-y-3 text-sm md:text-base text-[#0A1128]/70">
                    <div className="flex justify-between pb-3 border-b border-gray-200">
                      <span className="text-[#0A1128]/60 font-medium">Email</span>
                      <span className="font-semibold text-[#0A1128]">{member.email}</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-[#0A1128]/60 font-medium">Projets</span>
                      <span className="font-semibold text-[#FFD700]">{member.experience.length}+ expériences</span>
                    </div>
                  </div>
                </div>
              </div>

              <section className="mt-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-[#0A1128]">
                  <Briefcase className="text-[#FFD700]" size={28} /> 
                  Expérience professionnelle
                </h3>
                <div className="space-y-4">
                  {member.experience.map((exp, idx) => (
                    <div key={idx} className="p-5 rounded-xl border-l-4 border-[#FFD700] bg-gray-50 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <div className="font-bold text-[#0A1128] text-lg">{exp.title}</div>
                          <div className="text-sm text-[#0A1128]/60 mt-1">{exp.company}</div>
                        </div>
                        <div className="text-sm text-[#FFD700] font-semibold whitespace-nowrap">{exp.period}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Réalisations - volontairement masqué selon demande */}
            </main>
          </div>
        </div>
      </section>
    </div>
  )
}
