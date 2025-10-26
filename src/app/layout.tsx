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
  title: "La Trouvaille",
  description: "Découvrez une plateforme innovante qui transforme votre façon de travailler.",
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
