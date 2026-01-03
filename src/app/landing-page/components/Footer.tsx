"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Linkedin, ArrowUpRight, Facebook } from "lucide-react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export default function Footer() {
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  useEffect(() => setMounted(true), [])
  const linkGroups = [
    {
      title: "Navigation",
      links: [
        { href: "/", label: "Accueil" },
        { href: "/about", label: "À Propos" },
        { href: "/contact", label: "Contact" },
      ]
    },
    {
      title: "Découvrir",
      links: [
        { href: "/objectives", label: "Nos Objectifs" },
        { href: "/team", label: "Notre Équipe" },
        { href: "/about", label: "Notre Mission" }
      ]
    },
    {
      title: "Actualités",
      links: [
        { href: "/blog", label: "Articles" },
        { href: "/events", label: "Événements" },
        { href: "/gallery", label: "Galerie" }
      ]
    }
  ]

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/latrouvaille.club/", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/club-la-trouvaille", label: "LinkedIn" },
    { icon: Facebook, href: "https://www.facebook.com/latrouvaille2021", label: "Facebook" }
  ]

  return (
    <div className="w-full h-full bg-[#0A1128] text-white flex flex-col justify-between py-12 md:py-16 relative overflow-hidden">

      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FFD700] opacity-[0.02] blur-[150px] rounded-full -mr-32 -mt-32 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">

          {/* Left: Huge Editorial Statement */}
          <div className="lg:col-span-7 space-y-8">
            {/* Logo - Format GIGANTESQUE pour impact maximal */}
            <Link href="/" className="inline-flex items-center space-x-4 md:space-x-6 group">
              <Image
                src="/images/la_trouvaille.png"
                alt="La Trouvaille"
                width={400}
                height={160}
                className="h-16 md:h-32 lg:h-40 w-auto transition-transform group-hover:scale-105"
              />
              <span className="font-black text-4xl md:text-[6.5rem] lg:text-[5rem] tracking-tighter text-white uppercase leading-[0.8] mb-[-0.1em]">
                LA <br className="md:hidden" /> TROUVAILLE
              </span>
            </Link>

            <div className="space-y-6 pt-4">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#FFD700]">L&apos;impact par l&apos;action</span>
              <h2 className="text-[11vw] md:text-[7rem] lg:text-[6.5rem] font-black uppercase leading-[0.75] tracking-[-0.05em] mt-6">
                Bâtissons<br />
                <span className="text-[#FFD700] italic font-serif lowercase tracking-normal">le</span> futur.
              </h2>
            </div>

            <div className="pt-6">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-6 text-xl md:text-2xl font-black uppercase tracking-tighter hover:text-[#FFD700] transition-all duration-300"
              >
                Lancez un projet avec nous
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#FFD700] group-hover:border-[#FFD700] group-hover:text-[#0A1128] transition-all duration-500">
                  <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8" />
                </div>
              </Link>
            </div>
          </div>

          {/* Right: Grid of Links */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8 lg:pl-12">
            {linkGroups.map((group) => (
              <div key={group.title} className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">{group.title}</h4>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className={`text-base font-bold uppercase tracking-tighter transition-colors ${pathname === link.href ? 'text-[#FFD700]' : 'hover:text-[#FFD700]'
                          }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Block */}
            <div className="col-span-2 md:col-span-3 pt-12 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Nous contacter</h4>
                <div className="space-y-2 text-base font-bold">
                  <a href="mailto:club.latrouvaille@gmail.com" className="block hover:text-[#FFD700] transition-colors">
                    club.latrouvaille@gmail.com
                  </a>
                  <a href="tel:+212600850149" className="block hover:text-[#FFD700] transition-colors">
                    +212 600 850 149
                  </a>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Casablanca-Settat,+MA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-[#FFD700]  transition-colors"
                  >
                    Casablanca, Maroc
                  </a>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Suivre l&apos;audace</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.label}
                      href={social.href} target="_blank"
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#FFD700] hover:border-[#FFD700] hover:text-[#0A1128] transition-all"
                    >
                      <social.icon size={18} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Footer Bottom */}
      <div className="container mx-auto px-6 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/5 relative z-10">
        <p className="text-[9px] uppercase tracking-[0.4em] text-white/20">
          © 2026 La Trouvaille — Des idées pour bâtir une meilleure Afrique.
        </p>
        <div className="flex gap-8 text-[9px] uppercase tracking-[0.4em] text-white/20">
          {mounted ? (
            <>
              <Link href="/legal/politique-confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</Link>
              <Link href="/legal/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
            </>
          ) : (
            <>
              <Link href="#" className="hover:text-white transition-colors">Politique de confidentialité</Link>
              <Link href="#" className="hover:text-white transition-colors">Mentions légales</Link>
            </>
          )}
        </div>
      </div>

      {/* Decorative Watermark */}
      <div className="absolute bottom-[5%] left-0 w-full flex justify-center pointer-events-none select-none opacity-[0.015] overflow-hidden">
        <span className="text-[15vw] md:text-[12vw] font-black uppercase leading-none tracking-[-0.05em] whitespace-nowrap text-white">
          La Trouvaille
        </span>
      </div>
    </div>
  )
}
