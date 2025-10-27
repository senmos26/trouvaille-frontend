import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/lib/providers/query-provider";
import Header from "./landing-page/components/Header";
import { PointerProvider } from "@/components/pointer-provider";
import Footer from "./landing-page/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://latrouvaille.ma'),
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: '/',
    title: 'La Trouvaille - Plateforme d\'Innovation et d\'Apprentissage',
    description: 'Découvrez une plateforme innovante qui transforme votre façon de travailler, d\'apprendre et de vous développer. Événements, formations, et opportunités d\'innovation au Maroc.',
    siteName: 'La Trouvaille',
    images: [
      {
        url: '/images/la_trouvaille.png',
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
    images: ['/images/la_trouvaille.png'],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
              <div className="content-wrapper flex min-h-screen flex-col">
                <Header />

                <main className="flex-grow">{children}</main>

                <Footer />
              </div>
            </PointerProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
