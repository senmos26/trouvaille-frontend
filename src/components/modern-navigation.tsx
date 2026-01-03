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

interface ModernNavigationProps {
  isScrolled?: boolean
}

export function ModernNavigation({ isScrolled = false }: ModernNavigationProps) {
  const pathname = usePathname()

  const isActiveLink = (href: string) => pathname === href

  // Helper to get text color classes based on scroll state
  const getTextColorClass = (isActive: boolean) => {
    if (!isScrolled) {
      // Transparent header on dark hero: Always white text
      return isActive ? "text-white" : "text-white/80 hover:text-white"
    }
    // Scrolled header (white/dark bg): Standard theme colors
    return isActive
      ? "text-[#0A1128] dark:text-white"
      : "text-[#0A1128] dark:text-gray-200 group-hover/link:text-[#0A1128] dark:group-hover/link:text-white"
  }

  const getTriggerColorClass = (isActive: boolean) => {
    if (!isScrolled) {
      return isActive ? "text-white font-semibold" : "text-white/90 hover:text-white"
    }
    return cn(
      "text-[#0A1128] dark:text-gray-200 hover:text-[#0A1128] dark:hover:text-white",
      isActive && "text-[#0A1128] dark:text-white font-semibold"
    )
  }

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
                getTextColorClass(isActiveLink(link.href))
              )}>
                {link.label}
              </span>

              {/* Active indicator underline */}
              {isActiveLink(link.href) && (
                <motion.div
                  layoutId="mainNavActiveTab"
                  className="absolute bottom-[-22px] left-0 right-0 h-[3px] bg-[#FFD700]"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              {/* Hover effect */}
              {!isActiveLink(link.href) && (
                <span className="absolute bottom-[-22px] left-1/2 -translate-x-1/2 h-[3px] bg-[#FFD700] w-0 group-hover/link:w-full transition-all duration-300" />
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
                  "relative group bg-transparent transition-all duration-300",
                  getTriggerColorClass(isActive)
                )}
              >
                {menuName}
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId={`activeDropdown-${menuName}`}
                    className="absolute bottom-[-22px] left-0 right-0 h-[3px] bg-[#FFD700] -z-10"
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
                            "group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            isActiveLink(item.href) && "bg-accent text-accent-foreground"
                          )}
                        >
                          <div className="flex items-center gap-2 text-sm font-medium leading-none">
                            <span className="text-[#0A1128] dark:text-white group-hover:text-[#0A1128] dark:group-hover:text-white">
                              {item.label}
                            </span>
                            <ChevronRight className={cn(
                              "ml-auto h-4 w-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1",
                              isActiveLink(item.href) && "opacity-100 text-[#FFD700]"
                            )} />
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground group-hover:text-[#0A1128]/70 dark:group-hover:text-gray-300">
                            {item.description}
                          </p>
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
              getTextColorClass(isActiveLink("/contact"))
            )}>
              Contact
            </span>

            {/* Active indicator */}
            {isActiveLink("/contact") && (
              <motion.div
                layoutId="mainNavActiveTab"
                className="absolute bottom-[-22px] left-0 right-0 h-[3px] bg-[#FFD700]"
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}

            {/* Hover effect */}
            {!isActiveLink("/contact") && (
              <span className="absolute bottom-[-22px] left-1/2 -translate-x-1/2 h-[3px] bg-[#FFD700] w-0 group-hover/link:w-full transition-all duration-300" />
            )}
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
