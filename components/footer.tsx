"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
}

export function Footer() {
  const { t, isRTL, language } = useLanguage()
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, margin: "-100px" })

  const footerLinks = [
    {
      titleKey: "footer.products",
      links: [
        { labelKey: "product.chatCola", href: "#" },
        { labelKey: "product.zeroCola", href: "#" },
        { labelKey: "product.blueChat", href: "#" },
        { labelKey: "product.lemon", href: "#" },
        { labelKey: "product.strawberry", href: "#" },
        { labelKey: "product.orange", href: "#" },
        { labelKey: "product.apple", href: "#" },
        { labelKey: "product.grape", href: "#" },
        { labelKey: "product.fruits", href: "#" },
      ],
    },
    {
      titleKey: "footer.company",
      links: [
        { label: language === "ar" ? "من نحن" : "About", href: "#about" },
        { label: language === "ar" ? "المنتجات" : "Products", href: "#flavours" },
        { label: language === "ar" ? "تواصل معنا" : "Contact", href: "#footer" },
      ],
    },
    {
      titleKey: "footer.categories",
      links: [
        { label: "150 ml", href: "#" },
        { label: "250 ml", href: "#" },
        { label: language === "ar" ? "مشروب طاقة" : "Energy Drink", href: "#" },
        { label: language === "ar" ? "مياه" : "Water", href: "#" },
      ],
    },
    {
      titleKey: "footer.contact",
      links: [
        { label: language === "ar" ? "فلسطين" : "Palestine", href: "#" },
        { label: language === "ar" ? "سلفيت" : "Salfit", href: "#" },
        { label: "+970 (0)9 251 0083", href: "tel:+97092510083" },
        { label: "info@chatcola.ps", href: "mailto:info@chatcola.ps" },
      ],
    },
  ]

  return (
    <footer ref={footerRef} id="footer" className="relative bg-[#121212] pt-16 pb-6 overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] overflow-hidden ${isRTL ? "font-arabic" : ""}`}>
            <motion.span
              className="block"
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            >
              {t("footer.heading1")}
            </motion.span>
            <motion.span
              className="block text-red-600"
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay: 0.1 }}
            >
              {t("footer.heading2")}
            </motion.span>
          </h2>
        </motion.div>

        <motion.p
          className={`text-white/60 text-xs max-w-xl mx-auto leading-relaxed text-center mb-8 ${isRTL ? "font-arabic" : "font-mono"}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {t("footer.description")}
        </motion.p>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-white/10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {footerLinks.map((section) => (
            <motion.div key={section.titleKey} variants={itemVariants} className={isRTL ? "text-right" : "text-left"}>
              <h4 className={`font-bold text-white text-sm mb-3 ${isRTL ? "font-arabic" : ""}`}>{t(section.titleKey)}</h4>
              <ul className="space-y-2">
                {section.links.map((item) => (
                  <li key={item.labelKey || item.label}>
                    <motion.div 
                      whileHover={{ x: isRTL ? -4 : 4 }} 
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Link
                        href={item.href}
                        className={`text-white/60 hover:text-red-500 text-xs transition-colors inline-block ${isRTL ? "font-arabic" : "font-mono"}`}
                      >
                        {item.labelKey ? t(item.labelKey) : item.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={`flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/10 gap-4 ${isRTL ? "md:flex-row-reverse" : ""}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div className="relative w-12 h-12">
              <Image src="/images/logo2.png" alt="Chat Cola" fill className="object-contain" />
            </div>
          </motion.div>

          <p className={`text-white/40 text-xs ${isRTL ? "font-arabic" : "font-mono"}`}>{t("footer.copyright")}</p>

          <div className="flex items-center gap-3">
            <motion.a
              href="https://www.facebook.com/chatcola"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-red-600 hover:bg-red-600/10 transition-all"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Facebook className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="https://instagram.com/chat.cola"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-red-600 hover:bg-red-600/10 transition-all"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10rem] sm:text-[14rem] md:text-[30rem] font-black text-white/[0.02] pointer-events-none select-none leading-[0.85] md:leading-none text-center md:whitespace-nowrap w-full md:w-auto"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <span className="block md:inline">Chat</span>
        <span className="block md:inline md:ms-4">Cola</span>
      </motion.div>
    </footer>
  )
}
