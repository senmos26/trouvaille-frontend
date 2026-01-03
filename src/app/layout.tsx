import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/lib/providers/query-provider";
import Header from "./landing-page/components/Header";
import { PointerProvider } from "@/components/pointer-provider";
import Footer from "./landing-page/components/Footer";
import { Toaster } from "sonner";
import ParallaxLayout from "@/components/parallax-layout";
import CookieConsent from "@/components/shared/CookieConsent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trouvaille-frontend-zeta.vercel.app'
const ogImageUrl = `${siteUrl}/images/la_trouvaille.png`

export const metadata: Metadata = {
  title: "La Trouvaille - Plateforme d'Innovation et d'Apprentissage",
  description: "Découvrez une plateforme innovante qui transforme votre façon de travailler, d'apprendre et de vous développer. Événements, formations, et opportunités d'innovation au Maroc.",
  keywords: ["innovation", "formation", "événements", "apprentissage", "développement", "Maroc", "jeunesse", "entrepreneuriat"],
  authors: [{ name: "La Trouvaille" }],
  creator: "La Trouvaille",
  publisher: "La Trouvaille",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteUrl,
    title: 'La Trouvaille - Plateforme d\'Innovation et d\'Apprentissage',
    description: 'Découvrez une plateforme innovante qui transforme votre façon de travailler, d\'apprendre et de vous développer. Événements, formations, et opportunités d\'innovation au Maroc.',
    siteName: 'La Trouvaille',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'La Trouvaille - Logo',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'La Trouvaille - Plateforme d\'Innovation et d\'Apprentissage',
    description: 'Découvrez une plateforme innovante qui transforme votre façon de travailler, d\'apprendre et de vous développer.',
    images: [ogImageUrl],
    creator: '@latrouvaille',
    site: '@latrouvaille',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  other: {
    'msapplication-TileColor': '#0A1128',
    'msapplication-config': '/browserconfig.xml',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className="antialiased  "
      >
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="dark-gradient" />
            <PointerProvider>
              <div className="content-wrapper">
                <Header />
                <Toaster richColors position="top-right" />

                <ParallaxLayout footer={<Footer />}>
                  <main className="relative z-20 bg-white dark:bg-[#050A15] ">
                    {children}
                  </main>
                </ParallaxLayout>
                <CookieConsent />
              </div>
            </PointerProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
