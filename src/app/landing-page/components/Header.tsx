"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ModernNavigation } from "@/components/modern-navigation"
import ThemeToggle from "@/components/theme-toggle"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const mainNavLinks = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À Propos" },
  { href: "/contact", label: "Contact" },
]

const dropdownMenus = {
  "Découvrir": [
    { href: "/objectives", label: "Nos Objectifs" },
    { href: "/team", label: "Notre Équipe" },
    { href: "/about", label: "Notre Mission" }
  ],
  "Actualités": [
    { href: "/blog", label: "Articles" },
    { href: "/events", label: "Événements" },
    { href: "/gallery", label: "Galerie" }
  ]
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActiveLink = (href: string) => pathname === href

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled
          ? 'h-20 bg-white/80 dark:bg-[#050A15]/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/5 shadow-lg shadow-black/5'
          : 'h-24 bg-transparent border-b border-transparent'
          }`}
      >
        <div className="container h-full flex items-center justify-between px-6">
          {/* Logo Branding - Premium Startup Style */}
          <Link href="/" className="group flex items-center space-x-3">
            <div className={`relative transition-all duration-500 ${isScrolled ? 'w-10 h-10' : 'w-12 h-12'}`}>
              <Image
                src="/images/la_trouvaille.png"
                alt="La Trouvaille"
                fill
                className="object-contain"
              />
            </div>
            <span className={`font-black tracking-tighter uppercase transition-all duration-300 ${isScrolled
              ? 'text-xl md:text-2xl text-[#0A1128] dark:text-white'
              : 'text-2xl md:text-3xl text-white'
              }`}>
              La Trouvaille
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <ModernNavigation isScrolled={isScrolled} />
            <div className={`pl-6 border-l ${isScrolled ? 'border-gray-200 dark:border-white/10' : 'border-white/20'}`}>
              <ThemeToggle isScrolled={isScrolled} />
            </div>

            {/* CTA Button in Header */}
            <Link href="/contact">
              <button className="hidden lg:flex items-center justify-center px-6 py-2.5 bg-[#0A1128] dark:bg-white text-white dark:text-[#0A1128] rounded-full font-bold text-sm tracking-wide hover:opacity-90 transition-opacity">
                Rejoindre
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white/95 dark:bg-[#050A15]/95 backdrop-blur-2xl md:hidden pt-28 px-6"
          >
            <nav className="flex flex-col space-y-6">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-3xl font-black tracking-tight ${isActiveLink(link.href) ? 'text-[#FFD700]' : 'text-[#0A1128] dark:text-white'
                    }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="h-px w-full bg-gray-200 dark:bg-white/10 my-6" />

              <div className="grid grid-cols-2 gap-8">
                {Object.entries(dropdownMenus).map(([menuName, menuItems]) => (
                  <div key={menuName} className="space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                      {menuName}
                    </h4>
                    <ul className="space-y-3">
                      {menuItems.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-base font-medium text-[#0A1128] dark:text-gray-300 hover:text-[#FFD700] transition-colors"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-8 w-full py-4 bg-[#FFD700] text-[#0A1128] font-black text-center text-xl rounded-2xl uppercase tracking-wide"
              >
                Rejoindre le club
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
