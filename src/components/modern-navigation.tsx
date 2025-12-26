"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

const mainNavLinks = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À Propos" },
]

const dropdownMenus = {
  "Découvrir": [
    { 
      href: "/objectives", 
      label: "Nos Objectifs",
      description: "Découvrez nos objectifs et notre vision pour l'avenir"
    },
    { 
      href: "/team", 
      label: "Notre Équipe",
      description: "Rencontrez les membres de notre équipe passionnée"
    }
  ],
  "Actualités": [
    { 
      href: "/blog", 
      label: "Articles",
      description: "Lisez nos derniers articles et actualités"
    },
    { 
      href: "/events", 
      label: "Événements",
      description: "Découvrez nos événements à venir"
    },
    { 
      href: "/gallery", 
      label: "Galerie",
      description: "Explorez notre galerie photos et vidéos"
    }
  ]
}

export function ModernNavigation() {
  const pathname = usePathname()

  const isActiveLink = (href: string) => pathname === href

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-1">
        {/* Main Links */}
        {mainNavLinks.map((link) => (
          <NavigationMenuItem key={link.href}>
            <Link
              href={link.href}
              className="relative group/link px-4 py-2 text-sm font-medium transition-all duration-300"
            >
              <span className={cn(
                "relative z-10 transition-colors duration-300",
                isActiveLink(link.href) 
                  ? "text-[#0A1128] dark:text-white" 
                  : "text-[#0A1128] dark:text-gray-200 group-hover/link:text-[#0A1128] dark:group-hover/link:text-white"
              )}>
                {link.label}
              </span>
              
              {/* Active indicator with gradient */}
              {isActiveLink(link.href) && (
                <motion.div
                  layoutId="mainNavActiveTab"
                  className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-[#FFD700] to-[#FFC107] rounded-lg"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              {/* Hover effect - only when NOT active */}
              {!isActiveLink(link.href) && (
                <span className="absolute inset-0 bg-[#FFD700]/10 rounded-lg scale-0 group-hover/link:scale-100 transition-transform duration-300" />
              )}
              
              {/* Bottom border animation - only when NOT active */}
              {!isActiveLink(link.href) && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#FFD700] w-0 group-hover/link:w-[calc(100%-2rem)] transition-all duration-300" />
              )}
            </Link>
          </NavigationMenuItem>
        ))}

        {/* Dropdown Menus */}
        {Object.entries(dropdownMenus).map(([menuName, menuItems]) => {
          const isActive = menuItems.some(item => pathname === item.href)
          
          return (
            <NavigationMenuItem key={menuName}>
              <NavigationMenuTrigger
                className={cn(
                  "relative group bg-transparent hover:bg-[#FFD700]/10 data-[state=open]:bg-[#FFD700]/10 transition-all duration-300 text-[#0A1128] dark:text-gray-200 hover:text-[#0A1128] dark:hover:text-white",
                  isActive && "text-[#0A1128] dark:text-[#0A1128] font-semibold bg-gradient-to-r from-[#FFD700] via-[#FFD700] to-[#FFC107]"
                )}
              >
                {menuName}
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId={`activeDropdown-${menuName}`}
                    className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-[#FFD700] to-[#FFC107] rounded-lg -z-10"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[450px] gap-2 p-3 md:w-[550px] lg:w-[650px]">
                  {menuItems.map((item, idx) => (
                    <motion.li 
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "group relative flex items-start gap-3 select-none rounded-xl p-4 leading-none no-underline outline-none transition-all hover:shadow-md",
                            isActiveLink(item.href) 
                              ? "bg-gradient-to-r from-[#FFD700]/20 to-[#FFC107]/10 border-l-4 border-[#FFD700]" 
                              : "hover:bg-gradient-to-r hover:from-[#0A1128]/5 hover:to-transparent border-l-4 border-transparent hover:border-[#FFD700]/30"
                          )}
                        >
                          {/* Subtle gradient background on hover */}
                          <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/0 via-[#FFD700]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                          
                          <div className="flex-1 relative z-10">
                            <div className={cn(
                              "flex items-center gap-2 text-sm font-semibold mb-1 transition-colors duration-300",
                              isActiveLink(item.href) 
                                ? "text-[#0A1128] dark:text-white" 
                                : "text-[#0A1128] dark:text-gray-200 group-hover:text-[#0A1128] dark:group-hover:text-white"
                            )}>
                              {item.label}
                              <ChevronRight className={cn(
                                "w-4 h-4 transition-all duration-300",
                                isActiveLink(item.href) 
                                  ? "text-[#FFD700] translate-x-1" 
                                  : "text-[#0A1128]/30 dark:text-gray-500 translate-x-0 group-hover:translate-x-1 group-hover:text-[#FFD700]"
                              )} />
                            </div>
                            <p className={cn(
                              "text-xs leading-relaxed transition-colors duration-300",
                              isActiveLink(item.href) 
                                ? "text-[#0A1128]/70 dark:text-gray-300" 
                                : "text-[#0A1128]/60 dark:text-gray-400 group-hover:text-[#0A1128]/80 dark:group-hover:text-gray-300"
                            )}>
                              {item.description}
                            </p>
                          </div>
                          
                          {/* Active indicator dot */}
                          {isActiveLink(item.href) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 rounded-full bg-[#FFD700] mt-2"
                            />
                          )}
                        </Link>
                      </NavigationMenuLink>
                    </motion.li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )
        })}

        {/* Contact - Last Item with special styling */}
        <NavigationMenuItem>
          <Link
            href="/contact"
            className="relative group/link px-4 py-2 text-sm font-medium transition-all duration-300"
          >
            <span className={cn(
              "relative z-10 transition-colors duration-300",
              isActiveLink("/contact") 
                ? "text-[#0A1128] dark:text-white" 
                : "text-[#0A1128] dark:text-gray-200 group-hover/link:text-[#0A1128] dark:group-hover/link:text-white"
            )}>
              Contact
            </span>
            
            {/* Active indicator */}
            {isActiveLink("/contact") && (
              <motion.div
                layoutId="mainNavActiveTab"
                className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-[#FFD700] to-[#FFC107] rounded-lg"
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            
            {/* Hover effect - only when NOT active */}
            {!isActiveLink("/contact") && (
              <span className="absolute inset-0 bg-[#FFD700]/10 rounded-lg scale-0 group-hover/link:scale-100 transition-transform duration-300" />
            )}
            
            {/* Bottom border animation - only when NOT active */}
            {!isActiveLink("/contact") && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#FFD700] w-0 group-hover/link:w-[calc(100%-2rem)] transition-all duration-300" />
            )}
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
