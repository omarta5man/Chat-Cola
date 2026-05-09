"use client"

import { motion, useInView } from "framer-motion"
import { useState, useRef } from "react"
import Link from "next/link"
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
  const [email, setEmail] = useState("")
  const [isHovering, setIsHovering] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, margin: "-100px" })

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => setIsSubmitting(false), 2000)
  }

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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mx-auto mb-12"
        >
          <div className={`flex flex-col sm:flex-row gap-3 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
            <motion.div className="flex-1 relative" whileFocus={{ scale: 1.02 }}>
              <motion.input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("footer.emailPlaceholder")}
                className={`w-full bg-white/5 border-2 border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 font-mono text-sm focus:outline-none focus:border-red-600 transition-all duration-300 ${isRTL ? "text-right" : "text-left"}`}
                whileFocus={{ borderColor: "#DC2626" }}
              />
              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                animate={email.length > 0 ? { boxShadow: "0 0 20px rgba(175,255,0,0.2)" } : { boxShadow: "none" }}
              />
            </motion.div>
            <motion.button
              className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold text-sm tracking-wide whitespace-nowrap relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={handleSubmit}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <motion.span
                className="relative z-10"
                animate={isSubmitting ? { opacity: [1, 0.5, 1] } : {}}
                transition={{ duration: 0.5, repeat: isSubmitting ? Number.POSITIVE_INFINITY : 0 }}
              >
                {isSubmitting ? "..." : t("nav.contactSales")}
              </motion.span>
            </motion.button>
          </div>
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
          className={`flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/10 gap-3 ${isRTL ? "md:flex-row-reverse" : ""}`}
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
            <span className="text-xl font-black">
              <span className="text-white">Chat</span>
              <span className="text-red-600">Cola</span>
            </span>
          </motion.div>

          <p className={`text-white/40 text-xs ${isRTL ? "font-arabic" : "font-mono"}`}>{t("footer.copyright")}</p>

          <motion.p
            className={`text-white/30 text-xs cursor-pointer ${isRTL ? "font-arabic" : "font-mono"}`}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
            animate={
              isHovering
                ? {
                    rotate: [0, -5, 5, -5, 5, 0],
                    scale: [1, 1.1, 1],
                    color: "#AFFF00",
                  }
                : {
                    rotate: 0,
                    scale: 1,
                    color: "rgba(255,255,255,0.3)",
                  }
            }
            transition={{ duration: 0.5 }}
          >
            {t("footer.madeWith")}
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[15rem] md:text-[30rem] font-black text-white/[0.02] pointer-events-none select-none leading-none whitespace-nowrap text-center"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Chat Cola
      </motion.div>
    </footer>
  )
}
