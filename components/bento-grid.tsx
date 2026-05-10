"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Award, Sparkles, Tag, MapPin } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const features = [
  {
    icon: Award,
    titleKey: "why.quality.title",
    subtitleKey: "why.quality.subtitle",
    descriptionKey: "why.quality.description",
    accent: "#DC2626",
  },
  {
    icon: Sparkles,
    titleKey: "why.variety.title",
    subtitleKey: "why.variety.subtitle",
    descriptionKey: "why.variety.description",
    accent: "#F97316",
  },
  {
    icon: Tag,
    titleKey: "why.affordable.title",
    subtitleKey: "why.affordable.subtitle",
    descriptionKey: "why.affordable.description",
    accent: "#FACC15",
  },
  {
    icon: MapPin,
    titleKey: "why.local.title",
    subtitleKey: "why.local.subtitle",
    descriptionKey: "why.local.description",
    accent: "#16A34A",
  },
]

export function BentoGrid() {
  const { t, isRTL } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      id="formula"
      className="relative py-24 md:py-32 bg-[#0a0a0a] overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
      <motion.div
        className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-red-600/10 blur-[140px] pointer-events-none"
        animate={{ x: [0, 40, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 -right-32 w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-[140px] pointer-events-none"
        animate={{ x: [0, -40, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-14 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <motion.span
            className="inline-block font-mono text-red-600 text-[10px] tracking-[0.3em] uppercase"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.15 }}
          >
            {t("why.eyebrow")}
          </motion.span>
          <div className="overflow-hidden mt-3">
            <motion.h2
              className={`text-4xl md:text-6xl font-black text-white tracking-tighter leading-[1.05] ${isRTL ? "font-arabic" : ""}`}
              initial={{ y: 80 }}
              animate={isInView ? { y: 0 } : { y: 80 }}
              transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1], delay: 0.2 }}
            >
              {t("why.heading")}
            </motion.h2>
          </div>
          <motion.div
            className="h-[2px] w-16 bg-red-600 mx-auto mt-5 rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.25, 0.4, 0.25, 1] }}
          />
        </motion.div>

        {/* Showcase: image + features */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Image side */}
          <motion.div
            className={`lg:col-span-6 relative ${isRTL ? "lg:order-2" : "lg:order-1"}`}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="relative aspect-square w-full max-w-[560px] mx-auto">
              {/* Glow */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(220,38,38,0.35), rgba(249,115,22,0.15) 45%, transparent 70%)",
                  filter: "blur(40px)",
                }}
                animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Rotating ring */}
              <motion.div
                className="absolute inset-4 rounded-full border border-white/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-12 rounded-full border border-white/5"
                animate={{ rotate: -360 }}
                transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
              />

              {/* Image */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="relative w-[88%] h-[88%]">
                  <Image
                    src="/images/Allcolas.png"
                    alt="Chat Cola lineup"
                    fill
                    sizes="(max-width: 1024px) 90vw, 560px"
                    className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
                    priority
                  />
                </div>
              </motion.div>

              {/* Floating stat chips */}
              <motion.div
                className="absolute top-6 left-0 bg-[#121212]/85 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 shadow-2xl"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0, y: [0, -6, 0] } : { opacity: 0, x: -30 }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.7 },
                  x: { duration: 0.6, delay: 0.7 },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 },
                }}
              >
                <p className="text-red-500 font-black text-2xl leading-none">9+</p>
                <p className="text-white/60 font-mono text-[10px] tracking-widest uppercase mt-1">
                  {isRTL ? "نكهات" : "Flavours"}
                </p>
              </motion.div>

              <motion.div
                className="absolute bottom-8 right-0 bg-[#121212]/85 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 shadow-2xl"
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0, y: [0, -6, 0] } : { opacity: 0, x: 30 }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.85 },
                  x: { duration: 0.6, delay: 0.85 },
                  y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.3 },
                }}
              >
                <p className="text-orange-500 font-black text-2xl leading-none">2020</p>
                <p className="text-white/60 font-mono text-[10px] tracking-widest uppercase mt-1">
                  {isRTL ? "سنة التأسيس" : "Established"}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Features side */}
          <div className={`lg:col-span-6 ${isRTL ? "lg:order-1" : "lg:order-2"}`}>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.titleKey}
                  initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
                  animate={
                    isInView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: isRTL ? -40 : 40 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: 0.4 + index * 0.1,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                  whileHover={{ x: isRTL ? -6 : 6 }}
                  className="group relative"
                >
                  <div className="relative bg-gradient-to-br from-[#1a1a1a]/80 to-[#121212]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-5 md:p-6 overflow-hidden hover:border-white/20 transition-colors">
                    {/* Accent bar */}
                    <motion.span
                      className="absolute inset-y-0 left-0 w-[3px]"
                      style={{ backgroundColor: feature.accent }}
                      initial={{ scaleY: 0, originY: 0 }}
                      animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    />

                    {/* Hover glow */}
                    <div
                      className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `linear-gradient(120deg, ${feature.accent}30, transparent 60%)`,
                      }}
                    />

                    <div className={`relative flex items-start gap-4 ${isRTL ? "flex-row-reverse text-right" : ""}`}>
                      {/* Icon */}
                      <div className="shrink-0">
                        <motion.div
                          className="relative w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{
                            backgroundColor: `${feature.accent}18`,
                            border: `1px solid ${feature.accent}30`,
                          }}
                          whileHover={{ scale: 1.08, rotate: -5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          <feature.icon className="w-5 h-5" style={{ color: feature.accent }} />
                        </motion.div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className={`flex items-baseline gap-3 flex-wrap ${isRTL ? "flex-row-reverse" : ""}`}>
                          <h3
                            className={`text-xl md:text-2xl font-black tracking-tight ${isRTL ? "font-arabic" : ""}`}
                            style={{ color: feature.accent }}
                          >
                            {t(feature.titleKey)}
                          </h3>
                          <span
                            className={`text-white/50 font-mono text-[10px] tracking-[0.2em] uppercase ${isRTL ? "font-arabic" : ""}`}
                          >
                            {t(feature.subtitleKey)}
                          </span>
                        </div>
                        <p
                          className={`text-white/65 text-sm mt-2 leading-relaxed ${isRTL ? "font-arabic" : "font-mono"}`}
                        >
                          {t(feature.descriptionKey)}
                        </p>
                      </div>

                      {/* Number indicator */}
                      <div
                        className={`shrink-0 hidden sm:block ${isRTL ? "text-left" : "text-right"}`}
                      >
                        <span className="text-white/10 font-black text-3xl tabular-nums">
                          0{index + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
