"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { TrendingUp, Truck, Globe, Award } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function AboutSection() {
  const { t, isRTL } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const achievements = [
    {
      titleKey: "about.rapidGrowth.title",
      descriptionKey: "about.rapidGrowth.description",
      icon: TrendingUp,
    },
    {
      titleKey: "about.distribution.title",
      descriptionKey: "about.distribution.description",
      icon: Truck,
    },
    {
      titleKey: "about.export.title",
      descriptionKey: "about.export.description",
      icon: Globe,
    },
    {
      titleKey: "about.qualityAchievement.title",
      descriptionKey: "about.qualityAchievement.description",
      icon: Award,
    },
  ]

  return (
    <section id="about" className="relative py-16 bg-white overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-10"
        >
          <motion.span
            className="font-mono text-red-600/60 text-xs tracking-widest inline-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t("about.eyebrow")}
          </motion.span>
          <h2 className={`text-3xl md:text-5xl font-black text-[#121212] tracking-tighter mt-2 overflow-hidden ${isRTL ? "font-arabic" : ""}`}>
            <motion.span
              className="inline-block"
              initial={{ y: 80 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            >
              {t("about.heading")}
            </motion.span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <p className={`text-lg text-[#121212]/80 leading-relaxed text-center ${isRTL ? "font-arabic" : "font-mono"}`}>
            {t("about.text")}
          </p>
          <p className={`text-base text-[#121212]/60 leading-relaxed text-center mt-4 ${isRTL ? "font-arabic" : "font-mono"}`}>
            {t("about.vision")}
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid md:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.titleKey}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className={`bg-red-600/5 border-2 border-red-600/20 rounded-2xl p-6 hover:border-red-600/50 transition-colors ${isRTL ? "text-right" : "text-center"}`}
            >
              <div className={`w-12 h-12 rounded-xl bg-red-600/10 flex items-center justify-center mb-3 ${isRTL ? "mr-0 ml-auto md:mx-auto" : "mx-auto"}`}>
                <achievement.icon className="w-6 h-6 text-red-600" />
              </div>
              <h3 className={`text-lg font-black text-[#121212] mb-2 ${isRTL ? "font-arabic" : ""}`}>{t(achievement.titleKey)}</h3>
              <p className={`text-sm text-[#121212]/60 ${isRTL ? "font-arabic leading-relaxed" : "font-mono"}`}>{t(achievement.descriptionKey)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
