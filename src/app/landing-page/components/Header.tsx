"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModernNavigation } from "@/components/modern-navigation"
import ThemeToggle from "@/components/theme-toggle"
import { Menu, X } from "lucide-react"

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
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActiveLink = (href: string) => pathname === href

  return (
    <header 
      className={`sticky top-0 z-50 w-full border-b backdrop-blur transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 shadow-sm supports-[backdrop-filter]:bg-background/80' 
          : 'bg-background/10 border-border/40'
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img 
            src="/images/la_trouvaille.png" 
            alt="La Trouvaille" 
            className="h-10 w-auto"
          />
          <span className="font-bold text-lg tracking-tight">
            LA TROUVAILLE
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <ModernNavigation />
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 w-9"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="border-t md:hidden animate-in slide-in-from-top-5">
          <div className="container py-4">
            <nav className="flex flex-col space-y-3">
              {/* Main Links */}
              {mainNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                    isActiveLink(link.href) 
                      ? 'text-[#FFD700] font-semibold bg-accent/50' 
                      : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Dropdown Sections */}
              {Object.entries(dropdownMenus).map(([menuName, menuItems]) => (
                <div key={menuName} className="pt-3 border-t">
                  <div className="px-4 py-2 text-sm font-semibold text-[#FFD700]">
                    {menuName}
                  </div>
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-6 py-2 rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                        isActiveLink(item.href) 
                          ? 'text-[#FFD700] font-semibold bg-accent/50' 
                          : 'text-muted-foreground'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
