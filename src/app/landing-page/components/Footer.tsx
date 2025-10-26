import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const navigationLinks = [
    { href: "/", label: "Accueil" },
    { href: "/about", label: "À Propos" },
    { href: "/objectives", label: "Objectifs" },
    { href: "/team", label: "Équipe" }
  ]

  const resourceLinks = [
    { href: "/blog", label: "Blog" },
    { href: "/events", label: "Événements" },
    { href: "/downloads", label: "Téléchargements" },
    { href: "/gallery", label: "Galerie" }
  ]

  return (
    <footer className="bg-[#0A1128] text-white py-12 md:py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* À propos */}
          <div>
            <h3 className="text-[#FFD700] font-bold text-lg mb-4">
              La Trouvaille
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              Des idées pour bâtir une meilleure Afrique. 
              Une tribune pour les jeunes leaders du continent.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[#FFD700] font-bold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-white/80 hover:text-[#FFD700] hover:opacity-100 transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h4 className="text-[#FFD700] font-bold mb-4">
              Ressources
            </h4>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-white/80 hover:text-[#FFD700] hover:opacity-100 transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#FFD700] font-bold mb-4">
              Contact
            </h4>
            <div className="space-y-3 text-sm text-white/80">
              <p className="flex items-center gap-2">
                <Mail size={16} className="text-[#FFD700] flex-shrink-0" />
                club.latrouvaille@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} className="text-[#FFD700] flex-shrink-0" />
                +212 600 850 149
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-[#FFD700] flex-shrink-0" />
                Casablanca, Maroc
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-sm text-white/60">
            © 2025 La Trouvaille. Tous droits réservés. Des idées pour bâtir !
          </p>
        </div>
      </div>
    </footer>
  )
}
