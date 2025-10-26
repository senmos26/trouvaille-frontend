import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export function ExampleNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Accueil</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <div className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      La Trouvaille
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Découvrez notre plateforme innovante
                    </p>
                  </a>
                </NavigationMenuLink>
              </div>
              <NavigationMenuLink href="/about">
                <div className="text-sm font-medium">À propos</div>
                <p className="text-sm leading-snug text-muted-foreground">
                  En savoir plus sur notre mission
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink href="/features">
                <div className="text-sm font-medium">Fonctionnalités</div>
                <p className="text-sm leading-snug text-muted-foreground">
                  Explorez nos outils et services
                </p>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <NavigationMenuLink href="/service1">
                <div className="text-sm font-medium">Service 1</div>
                <p className="text-sm leading-snug text-muted-foreground">
                  Description du premier service
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink href="/service2">
                <div className="text-sm font-medium">Service 2</div>
                <p className="text-sm leading-snug text-muted-foreground">
                  Description du deuxième service
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink href="/service3">
                <div className="text-sm font-medium">Service 3</div>
                <p className="text-sm leading-snug text-muted-foreground">
                  Description du troisième service
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink href="/service4">
                <div className="text-sm font-medium">Service 4</div>
                <p className="text-sm leading-snug text-muted-foreground">
                  Description du quatrième service
                </p>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuLink href="/contact">
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
