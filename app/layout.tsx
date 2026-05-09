import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono, Noto_Sans_Arabic } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LenisProvider } from "@/components/lenis-provider"
import { LanguageProvider } from "@/lib/language-context"
import ClickSpark from "@/components/click-spark"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
})

export const metadata: Metadata = {
  title: "Chat Cola | Palestinian Beverages | Taste the Spark",
  description: "Chat Cola is a Palestinian beverage company producing premium carbonated drinks, juices, energy drinks, and purified water. Made in Palestine, distributed across territories and beyond.",
  keywords: ["chat cola", "palestinian beverages", "carbonated drinks", "palestine", "soft drinks", "energy drinks"],
  generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#DC2626",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${notoSansArabic.variable} font-sans antialiased`}>
        <LanguageProvider>
          <ClickSpark
            sparkColor="#DC2626"
            sparkSize={12}
            sparkRadius={20}
            sparkCount={8}
            duration={400}
            easing="ease-out"
          >
            <LenisProvider>{children}</LenisProvider>
          </ClickSpark>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
