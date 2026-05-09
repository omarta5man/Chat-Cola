"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useLenis } from "lenis/react"
import { Menu, X, Globe } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const lenis = useLenis()
  const { language, setLanguage, t, isRTL } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id)
    if (element && lenis) {
      lenis.scrollTo(element, { offset: -100 })
    }
    setMobileMenuOpen(false)
  }

  const navLinks = [
    { label: t("nav.home"), href: "#hero" },
    { label: t("nav.flavours"), href: "#flavours" },
    { label: t("nav.about"), href: "#about" },
  ]

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-0"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <motion.div
        className={`mx-auto transition-all duration-500 ease-out ${
          scrolled
            ? "max-w-3xl bg-[#121212]/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/20 rounded-full mx-4 md:mx-auto"
            : "max-w-7xl bg-transparent"
        }`}
        layout
      >
        <div className={`flex items-center justify-between ${scrolled ? "px-4 py-2" : "px-6 py-4"}`}>
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              className={`relative transition-all duration-300 ${scrolled ? "w-9 h-9" : "w-11 h-11"}`}
              whileHover={{ scale: 1.08, rotate: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Image
                src="/images/logo1.png"
                alt="Chat Cola"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </Link>

          <div className={`hidden md:flex items-center ${isRTL ? "gap-6" : "gap-6"}`}>
            {navLinks.map((item, i) => (
              <motion.button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className={`text-sm font-medium tracking-wide transition-colors relative ${
                  scrolled ? "text-white/80 hover:text-red-500" : "text-[#121212]/80 hover:text-[#121212]"
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                />
              </motion.button>
            ))}

            {/* Language Switcher */}
            <motion.button
              onClick={toggleLanguage}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all ${
                scrolled
                  ? "bg-white/10 text-white hover:bg-white/20"
                  : "bg-[#121212]/10 text-[#121212] hover:bg-[#121212]/20"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === "en" ? "AR" : "EN"}</span>
            </motion.button>
          </div>

          <Link href="/contact" className="hidden md:block">
            <motion.div
              className="px-5 py-2 rounded-full font-bold text-sm tracking-wide relative overflow-hidden bg-red-600 text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
              />
              <span className="relative z-10">{t("nav.contactSales")}</span>
            </motion.div>
          </Link>

          <div className="flex md:hidden items-center gap-3">
            {/* Mobile Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${
                scrolled ? "bg-white/10 text-white" : "bg-[#121212]/10 text-[#121212]"
              }`}
              whileTap={{ scale: 0.9 }}
            >
              {language === "en" ? "AR" : "EN"}
            </motion.button>

            <motion.button
              className="p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className={scrolled ? "text-white" : "text-[#121212]"} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className={scrolled ? "text-white" : "text-[#121212]"} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="md:hidden bg-[#121212]/95 backdrop-blur-md border-t border-white/10 overflow-hidden mt-2 mx-4 rounded-2xl"
            dir={isRTL ? "rtl" : "ltr"}
          >
            <div className="px-6 py-4 space-y-4">
              {navLinks.map((item, i) => (
                <motion.button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-white/80 hover:text-red-500 text-lg font-medium py-2 ${isRTL ? "text-right" : "text-left"}`}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {item.label}
                </motion.button>
              ))}
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                <motion.div
                  className="w-full bg-red-600 text-white px-6 py-3 rounded-full font-bold text-sm tracking-wide mt-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {t("nav.contactSales")}
                </motion.div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
