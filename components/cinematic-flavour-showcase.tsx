"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useInView } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

interface Flavour {
  id: number
  nameKey: string
  descriptionEn: string
  descriptionAr: string
  sizes: string
  accentColor: string
  accentColorLight?: string
  image: string
  tags: { en: string[]; ar: string[] }
  tasteProfile: {
    taste: { en: string; ar: string }
    intensity: { en: string; ar: string }
    freshness: { en: string; ar: string }
  }
}

const flavours: Flavour[] = [
  {
    id: 1,
    nameKey: "product.chatCola",
    descriptionEn: "The original refreshing cola taste with a bold Palestinian identity.",
    descriptionAr: "طعم الكولا الأصلي المنعش مع هوية فلسطينية جريئة.",
    sizes: "150ml & 250ml",
    accentColor: "#DC2626",
    accentColorLight: "#EF4444",
    image: "/images/chat-cola.png",
    tags: { en: ["Original", "Refreshing", "Classic"], ar: ["أصلي", "منعش", "كلاسيكي"] },
    tasteProfile: {
      taste: { en: "Classic Cola", ar: "كولا كلاسيك" },
      intensity: { en: "Medium", ar: "متوسط" },
      freshness: { en: "Bold", ar: "جريء" },
    },
  },
  {
    id: 2,
    nameKey: "product.orange",
    descriptionEn: "Bright orange flavour with a refreshing fizzy kick.",
    descriptionAr: "نكهة برتقال مشرقة مع انتعاش فوّار.",
    sizes: "150ml & 250ml",
    accentColor: "#EA580C",
    accentColorLight: "#FB923C",
    image: "/images/orange.png",
    tags: { en: ["Orange", "Citrus", "Bright"], ar: ["برتقال", "حمضيات", "مشرق"] },
    tasteProfile: {
      taste: { en: "Orange Citrus", ar: "برتقال حمضي" },
      intensity: { en: "Medium", ar: "متوسط" },
      freshness: { en: "Bright", ar: "مشرق" },
    },
  },
  {
    id: 3,
    nameKey: "product.apple",
    descriptionEn: "Fresh apple soda with a crisp and playful taste.",
    descriptionAr: "صودا تفاح طازجة بطعم هش ومرح.",
    sizes: "150ml & 250ml",
    accentColor: "#16A34A",
    accentColorLight: "#4ADE80",
    image: "/images/apple.png",
    tags: { en: ["Apple", "Crisp", "Fruity"], ar: ["تفاح", "هش", "فاكهي"] },
    tasteProfile: {
      taste: { en: "Fresh Apple", ar: "تفاح طازج" },
      intensity: { en: "Medium", ar: "متوسط" },
      freshness: { en: "Crisp", ar: "هش" },
    },
  },
  {
    id: 4,
    nameKey: "product.fruits",
    descriptionEn: "A mixed fruit flavour made for people who like variety.",
    descriptionAr: "نكهة فواكه مشكّلة لمحبي التنوع.",
    sizes: "150ml & 250ml",
    accentColor: "#DC2626",
    accentColorLight: "#F87171",
    image: "/images/fruits.png",
    tags: { en: ["Mixed Fruit", "Sweet", "Refreshing"], ar: ["فواكه مشكلة", "حلو", "منعش"] },
    tasteProfile: {
      taste: { en: "Mixed Fruits", ar: "فواكه مشكلة" },
      intensity: { en: "Medium", ar: "متوسط" },
      freshness: { en: "Sweet", ar: "حلو" },
    },
  },
  {
    id: 5,
    nameKey: "product.lemon",
    descriptionEn: "Crisp citrus refreshment with a clean sparkling finish.",
    descriptionAr: "انتعاش حمضي هش مع لمسة فوّارة نظيفة.",
    sizes: "150ml & 250ml",
    accentColor: "#CA8A04",
    accentColorLight: "#FACC15",
    image: "/images/lemon.png",
    tags: { en: ["Lemon", "Citrus", "Zesty"], ar: ["ليمون", "حمضيات", "منعش"] },
    tasteProfile: {
      taste: { en: "Citrus", ar: "حمضيات" },
      intensity: { en: "High", ar: "عالي" },
      freshness: { en: "Zesty", ar: "منعش" },
    },
  },
  {
    id: 6,
    nameKey: "product.strawberry",
    descriptionEn: "Sweet strawberry sparkle with a smooth fruity finish.",
    descriptionAr: "فوران فراولة حلو مع لمسة فاكهية ناعمة.",
    sizes: "250ml",
    accentColor: "#BE185D",
    accentColorLight: "#EC4899",
    image: "/images/strawberry.png",
    tags: { en: ["Strawberry", "Sweet", "Fruity"], ar: ["فراولة", "حلو", "فاكهي"] },
    tasteProfile: {
      taste: { en: "Strawberry", ar: "فراولة" },
      intensity: { en: "Medium", ar: "متوسط" },
      freshness: { en: "Sweet", ar: "حلو" },
    },
  },
  {
    id: 7,
    nameKey: "product.grape",
    descriptionEn: "Rich grape flavour with a bold sparkling finish.",
    descriptionAr: "نكهة عنب غنية مع لمسة فوّارة جريئة.",
    sizes: "150ml & 250ml",
    accentColor: "#6B21A8",
    accentColorLight: "#A855F7",
    image: "/images/grape.png",
    tags: { en: ["Grape", "Bold", "Rich"], ar: ["عنب", "جريء", "غني"] },
    tasteProfile: {
      taste: { en: "Grape", ar: "عنب" },
      intensity: { en: "High", ar: "عالي" },
      freshness: { en: "Bold", ar: "جريء" },
    },
  },
  {
    id: 8,
    nameKey: "product.blueChat",
    descriptionEn: "A bold blue soda flavour made to stand out.",
    descriptionAr: "نكهة صودا زرقاء جريئة صُنعت لتتميز.",
    sizes: "250ml",
    accentColor: "#1E40AF",
    accentColorLight: "#3B82F6",
    image: "/images/blue-chat.png",
    tags: { en: ["Blue", "Bold", "Fizzy"], ar: ["أزرق", "جريء", "فوّار"] },
    tasteProfile: {
      taste: { en: "Berry Blue", ar: "توت أزرق" },
      intensity: { en: "High", ar: "عالي" },
      freshness: { en: "Icy", ar: "مثلج" },
    },
  },
  {
    id: 9,
    nameKey: "product.zeroCola",
    descriptionEn: "The cola taste you love with a lighter zero-style option.",
    descriptionAr: "طعم الكولا الذي تحبه مع خيار زيرو خفيف.",
    sizes: "150ml & 250ml",
    accentColor: "#1F2937",
    accentColorLight: "#374151",
    image: "/images/zero-chat.png",
    tags: { en: ["Zero", "Cola", "Light"], ar: ["زيرو", "كولا", "خفيف"] },
    tasteProfile: {
      taste: { en: "Zero Sugar", ar: "بدون سكر" },
      intensity: { en: "Medium", ar: "متوسط" },
      freshness: { en: "Clean", ar: "نظيف" },
    },
  },
]

interface Bubble {
  id: number
  size: number
  x: number
  delay: number
  duration: number
}

const generateBubbles = (count: number): Bubble[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 4,
  }))
}

export function CinematicFlavourShowcase() {
  const { t, language, isRTL } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [showProductModal, setShowProductModal] = useState(false)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const handleSwipe = (_: any, info: PanInfo) => {
    const threshold = 50
    if (info.offset.x < -threshold) {
      // Swiped left
      setIsAutoPlaying(false)
      if (isRTL) setActiveIndex((p) => (p - 1 + flavours.length) % flavours.length)
      else setActiveIndex((p) => (p + 1) % flavours.length)
    } else if (info.offset.x > threshold) {
      // Swiped right
      setIsAutoPlaying(false)
      if (isRTL) setActiveIndex((p) => (p + 1) % flavours.length)
      else setActiveIndex((p) => (p - 1 + flavours.length) % flavours.length)
    }
  }

  useEffect(() => {
    setBubbles(generateBubbles(20))
  }, [])

  const activeFlavour = flavours[activeIndex]

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % flavours.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextFlavour = () => {
    setIsAutoPlaying(false)
    setActiveIndex((prev) => (prev + 1) % flavours.length)
  }

  const prevFlavour = () => {
    setIsAutoPlaying(false)
    setActiveIndex((prev) => (prev - 1 + flavours.length) % flavours.length)
  }

  const selectFlavour = (index: number) => {
    setIsAutoPlaying(false)
    setActiveIndex(index)
  }

  return (
    <section
      ref={containerRef}
      id="flavours"
      className="relative w-full min-h-screen bg-[#0a0a0a] overflow-hidden flex flex-col justify-center items-center py-16 md:py-24"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Deep dark background with gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
      
      {/* Animated spotlight glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${activeFlavour.accentColor}20, transparent 70%)`,
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* Soda bubbles animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full bg-white/10"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: `${bubble.x}%`,
              bottom: -20,
            }}
            animate={{
              y: [0, -800],
              x: [0, Math.sin(bubble.id) * 30],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              delay: bubble.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div
        className="relative z-10 text-center mb-12 md:mb-16 px-4"
        initial={{ opacity: 0, y: -40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <motion.span
          className="font-mono text-red-600 text-xs tracking-widest inline-block"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.2 }}
        >
          {t("flavours.eyebrow")}
        </motion.span>
        <h2 className={`text-4xl md:text-6xl font-black text-white tracking-tighter mt-3 overflow-hidden ${isRTL ? "font-arabic" : ""}`}>
          <motion.span
            className="inline-block"
            initial={{ y: 80 }}
            animate={isInView ? { y: 0 } : { y: 80 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay: 0.1 }}
          >
            {t("flavours.heading1")}{" "}
          </motion.span>
          <motion.span
            className="inline-block"
            style={{ color: activeFlavour.accentColor }}
            initial={{ y: 80 }}
            animate={isInView ? { y: 0 } : { y: 80 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay: 0.15 }}
          >
            {t("flavours.heading2")}
          </motion.span>
        </h2>
        <motion.p
          className={`text-white/60 text-sm max-w-2xl mx-auto mt-4 ${isRTL ? "font-arabic leading-relaxed" : "font-mono"}`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3 }}
        >
          {t("flavours.subtext")}
        </motion.p>
      </motion.div>

      {/* Main Product Display */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[500px] lg:min-h-[600px]">
          
          {/* Left Info Panel */}
          <motion.div
            className={`lg:col-span-3 flex flex-col gap-6 ${isRTL ? "lg:order-3" : "lg:order-1"}`}
            initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isRTL ? 40 : -40 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={`space-y-4 ${isRTL ? "text-right" : "text-left"}`}
              >
                <h3 className={`text-2xl md:text-3xl font-black text-white tracking-tight ${isRTL ? "font-arabic" : ""}`}>
                  {t(activeFlavour.nameKey)}
                </h3>
                <p className={`text-white/70 text-sm leading-relaxed ${isRTL ? "font-arabic" : "font-mono"}`}>
                  {language === "ar" ? activeFlavour.descriptionAr : activeFlavour.descriptionEn}
                </p>
                
                {/* Tags */}
                <div className={`flex flex-wrap gap-2 ${isRTL ? "justify-end" : "justify-start"}`}>
                  {(language === "ar" ? activeFlavour.tags.ar : activeFlavour.tags.en).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-white/10 rounded-full text-xs font-mono text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-white/50 font-mono text-xs tracking-wider">
                  {t("flavours.sizes")}: {activeFlavour.sizes}
                </p>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-2 pt-4 w-full">
                  <motion.button
                    onClick={() => {
                      setIsAutoPlaying(false)
                      setShowProductModal(true)
                    }}
                    className="w-full px-4 py-2.5 rounded-lg font-bold text-xs sm:text-sm tracking-wide text-white relative overflow-hidden"
                    style={{ backgroundColor: activeFlavour.accentColor }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.span
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative z-10">{t("flavours.viewProduct")}</span>
                  </motion.button>
                  <Link href="/contact" className="w-full">
                    <motion.div
                      className="w-full px-4 py-2.5 rounded-lg font-bold text-xs sm:text-sm tracking-wide border-2 relative overflow-hidden text-center"
                      style={{ borderColor: activeFlavour.accentColor, color: activeFlavour.accentColor }}
                      whileHover={{ scale: 1.02, backgroundColor: activeFlavour.accentColor, color: "#fff" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">{t("flavours.askSupply")}</span>
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Center Stage - Large Product Image */}
          <motion.div
            className="lg:col-span-6 lg:order-2 relative flex flex-col items-center justify-center min-h-[400px] lg:min-h-[550px] touch-pan-y"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleSwipe}
          >
            {/* Large spotlight glow */}
            <motion.div
              className="absolute w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none"
              style={{ backgroundColor: activeFlavour.accentColor }}
              animate={{
                opacity: [0.2, 0.35, 0.2],
                scale: [0.9, 1.1, 0.9],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Ice base effect */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-32 pointer-events-none">
              <motion.div
                className="absolute inset-0 rounded-full blur-3xl"
                style={{ backgroundColor: activeFlavour.accentColor }}
                animate={{ opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* Product Image with smooth transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                className="relative z-10"
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src={activeFlavour.image}
                    alt={t(activeFlavour.nameKey)}
                    width={380}
                    height={570}
                    className="object-contain drop-shadow-2xl pointer-events-none select-none"
                    draggable={false}
                    priority
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Mobile arrows BELOW the image */}
            <div className="flex lg:hidden items-center gap-4 mt-6 relative z-20">
              <motion.button
                onClick={prevFlavour}
                className="flex items-center justify-center w-11 h-11 rounded-full border-2 border-white/30 hover:border-white hover:bg-white/10 transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                {isRTL ? <ChevronRight className="w-5 h-5 text-white" /> : <ChevronLeft className="w-5 h-5 text-white" />}
              </motion.button>
              <p className={`text-white/40 text-[10px] tracking-widest uppercase ${isRTL ? "font-arabic" : "font-mono"}`}>
                {language === "ar" ? "اسحب أو اضغط" : "Swipe or tap"}
              </p>
              <motion.button
                onClick={nextFlavour}
                className="flex items-center justify-center w-11 h-11 rounded-full border-2 border-white/30 hover:border-white hover:bg-white/10 transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                {isRTL ? <ChevronLeft className="w-5 h-5 text-white" /> : <ChevronRight className="w-5 h-5 text-white" />}
              </motion.button>
            </div>
          </motion.div>

          {/* Right Side - Taste Profile (Desktop only) */}
          <motion.div
            className={`lg:col-span-3 hidden lg:flex flex-col gap-6 ${isRTL ? "lg:order-1" : "lg:order-3"}`}
            initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isRTL ? -40 : 40 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={`space-y-4 ${isRTL ? "text-right" : "text-left"}`}>
              <h4 className="text-sm font-mono text-white/50 tracking-widest">{t("flavours.tasteProfile")}</h4>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-3"
                >
                  <div className="border-b border-white/10 pb-3">
                    <p className="text-white/50 font-mono text-xs mb-1">{t("flavours.taste")}</p>
                    <p className={`text-white font-bold ${isRTL ? "font-arabic" : ""}`}>
                      {language === "ar" ? activeFlavour.tasteProfile.taste.ar : activeFlavour.tasteProfile.taste.en}
                    </p>
                  </div>
                  <div className="border-b border-white/10 pb-3">
                    <p className="text-white/50 font-mono text-xs mb-1">{t("flavours.intensity")}</p>
                    <p className={`text-white font-bold ${isRTL ? "font-arabic" : ""}`}>
                      {language === "ar" ? activeFlavour.tasteProfile.intensity.ar : activeFlavour.tasteProfile.intensity.en}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/50 font-mono text-xs mb-1">{t("flavours.freshness")}</p>
                    <p className={`text-white font-bold ${isRTL ? "font-arabic" : ""}`}>
                      {language === "ar" ? activeFlavour.tasteProfile.freshness.ar : activeFlavour.tasteProfile.freshness.en}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Desktop Navigation Arrows */}
        <div className="hidden lg:flex justify-between items-center absolute -left-8 -right-8 xl:-left-16 xl:-right-16 top-1/2 -translate-y-1/2 pointer-events-none">
          <motion.button
            onClick={prevFlavour}
            className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-white/30 hover:border-white hover:bg-white/10 transition-colors pointer-events-auto"
            whileHover={{ scale: 1.1, x: -4 }}
            whileTap={{ scale: 0.9 }}
          >
            {isRTL ? <ChevronRight className="w-6 h-6 text-white" /> : <ChevronLeft className="w-6 h-6 text-white" />}
          </motion.button>
          <motion.button
            onClick={nextFlavour}
            className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-white/30 hover:border-white hover:bg-white/10 transition-colors pointer-events-auto"
            whileHover={{ scale: 1.1, x: 4 }}
            whileTap={{ scale: 0.9 }}
          >
            {isRTL ? <ChevronLeft className="w-6 h-6 text-white" /> : <ChevronRight className="w-6 h-6 text-white" />}
          </motion.button>
        </div>
      </div>

      {/* Premium Thumbnail Selector */}
      <motion.div
        className="relative z-20 w-full max-w-5xl mx-auto px-4 mt-12"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {/* Desktop: Show thumbnail images */}
        <div className="hidden md:flex flex-wrap gap-3 justify-center">
          {flavours.map((flavour, index) => (
            <motion.button
              key={flavour.id}
              onClick={() => selectFlavour(index)}
              className={`relative px-4 py-2 rounded-xl font-mono text-xs tracking-wide transition-all flex items-center gap-2 ${
                activeIndex === index
                  ? "text-white border-2 bg-white/5"
                  : "text-white/50 border-2 border-white/10 hover:border-white/30"
              }`}
              style={
                activeIndex === index
                  ? {
                      borderColor: flavour.accentColor,
                      boxShadow: `0 0 20px ${flavour.accentColor}30`,
                    }
                  : {}
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative w-6 h-8 overflow-hidden">
                <Image
                  src={flavour.image}
                  alt={t(flavour.nameKey)}
                  fill
                  className="object-contain"
                />
              </div>
              <span className={isRTL ? "font-arabic" : ""}>{t(flavour.nameKey)}</span>
            </motion.button>
          ))}
        </div>

        {/* Mobile: Clean dot indicators */}
        <div className="flex md:hidden justify-center gap-2">
          {flavours.map((flavour, index) => (
            <motion.button
              key={flavour.id}
              onClick={() => selectFlavour(index)}
              className="p-1"
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="rounded-full transition-all"
                style={{
                  backgroundColor: activeIndex === index ? flavour.accentColor : "rgba(255,255,255,0.2)",
                }}
                animate={{
                  width: activeIndex === index ? 24 : 8,
                  height: 8,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Product Modal */}
      <AnimatePresence>
        {showProductModal && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            dir={isRTL ? "rtl" : "ltr"}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setShowProductModal(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="relative w-full max-w-4xl bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Glow */}
              <div
                className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
                style={{ backgroundColor: activeFlavour.accentColor, opacity: 0.3 }}
              />

              {/* Close */}
              <button
                onClick={() => setShowProductModal(false)}
                className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} z-10 w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-colors`}
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="grid md:grid-cols-2 gap-0 max-h-[85vh] overflow-y-auto">
                {/* Image side */}
                <div
                  className="relative flex items-center justify-center p-8 md:p-12 min-h-[320px] md:min-h-[520px]"
                  style={{
                    background: `radial-gradient(circle at center, ${activeFlavour.accentColor}25, transparent 70%)`,
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -12, 0], rotate: [0, 1.5, 0, -1.5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative"
                  >
                    <Image
                      src={activeFlavour.image}
                      alt={t(activeFlavour.nameKey)}
                      width={420}
                      height={630}
                      className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                    />
                  </motion.div>
                </div>

                {/* Info side */}
                <div className={`p-6 md:p-10 flex flex-col gap-5 ${isRTL ? "text-right" : "text-left"}`}>
                  <div>
                    <span
                      className="font-mono text-[10px] tracking-[0.3em] uppercase"
                      style={{ color: activeFlavour.accentColor }}
                    >
                      {language === "ar" ? activeFlavour.tags.ar[0] : activeFlavour.tags.en[0]}
                    </span>
                    <h3 className={`text-3xl md:text-4xl font-black text-white tracking-tighter mt-2 ${isRTL ? "font-arabic" : ""}`}>
                      {t(activeFlavour.nameKey)}
                    </h3>
                  </div>

                  <p className={`text-white/70 text-sm leading-relaxed ${isRTL ? "font-arabic" : "font-mono"}`}>
                    {language === "ar" ? activeFlavour.descriptionAr : activeFlavour.descriptionEn}
                  </p>

                  <div className={`flex flex-wrap gap-2 ${isRTL ? "justify-end" : "justify-start"}`}>
                    {(language === "ar" ? activeFlavour.tags.ar : activeFlavour.tags.en).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-mono"
                        style={{
                          backgroundColor: `${activeFlavour.accentColor}20`,
                          color: activeFlavour.accentColor,
                          border: `1px solid ${activeFlavour.accentColor}40`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Taste profile cards */}
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {[
                      { labelKey: "flavours.taste", value: activeFlavour.tasteProfile.taste },
                      { labelKey: "flavours.intensity", value: activeFlavour.tasteProfile.intensity },
                      { labelKey: "flavours.freshness", value: activeFlavour.tasteProfile.freshness },
                    ].map((item) => (
                      <div
                        key={item.labelKey}
                        className="bg-white/[0.03] border border-white/10 rounded-xl p-3"
                      >
                        <p className="text-white/40 text-[9px] uppercase tracking-widest font-mono mb-1">
                          {t(item.labelKey)}
                        </p>
                        <p className={`text-white text-xs font-bold ${isRTL ? "font-arabic" : ""}`}>
                          {language === "ar" ? item.value.ar : item.value.en}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Sizes */}
                  <div className="bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3">
                    <p className="text-white/40 text-[10px] uppercase tracking-widest font-mono mb-1">
                      {t("flavours.sizes")}
                    </p>
                    <p className="text-white text-sm font-bold">{activeFlavour.sizes}</p>
                  </div>

                  <Link href="/contact" className="mt-auto">
                    <motion.div
                      className="w-full px-5 py-3 rounded-xl font-bold text-sm tracking-wide text-white text-center relative overflow-hidden"
                      style={{ backgroundColor: activeFlavour.accentColor }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.span
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                      <span className="relative z-10">{t("flavours.askSupply")}</span>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
