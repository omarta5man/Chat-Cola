"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Instagram, Facebook, ArrowLeft, ArrowRight, Check } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const inquiryKeys = [
  "contact.form.inquiryStock",
  "contact.form.inquiryGeneral",
  "contact.form.inquiryEvent",
  "contact.form.inquiryDistribution",
] as const

export function ContactPageClient() {
  const { t, isRTL, language } = useLanguage()
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    business: "",
    inquiry: inquiryKeys[0] as string,
    message: "",
  })

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 1200)
  }

  const contactItems = [
    {
      icon: MapPin,
      labelKey: "contact.location",
      valueKey: "contact.locationValue",
      href: "#",
    },
    {
      icon: Phone,
      labelKey: "contact.phone",
      valueKey: "contact.phoneValue",
      href: "tel:+97092510083",
    },
    {
      icon: Mail,
      labelKey: "contact.email",
      valueKey: "contact.emailValue",
      href: "mailto:info@chatcola.ps",
    },
    {
      icon: Instagram,
      labelKey: "contact.instagram",
      valueKey: "contact.instagramValue",
      href: "https://instagram.com/chat.cola",
    },
    {
      icon: Facebook,
      labelKey: "contact.facebook",
      valueKey: "contact.facebookValue",
      href: "https://www.facebook.com/chatcola",
    },
  ]

  const ArrowIcon = isRTL ? ArrowRight : ArrowLeft

  return (
    <>
      <Navigation />
      <main
        className="relative min-h-screen bg-[#0a0a0a] overflow-hidden pt-28 pb-16"
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black pointer-events-none" />
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-red-600/20 blur-[120px] pointer-events-none"
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-red-600/15 blur-[120px] pointer-events-none"
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Giant background word */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[20rem] md:text-[30rem] font-black text-white/[0.02] tracking-tighter whitespace-nowrap leading-none">
            Chat Cola
          </span>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/"
              className={`inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-mono tracking-wide ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <ArrowIcon className="w-4 h-4" />
              <span>{language === "ar" ? "العودة للرئيسية" : "Back to home"}</span>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <motion.span
              className="font-mono text-red-600 text-xs tracking-[0.3em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {t("contact.eyebrow")}
            </motion.span>
            <h1
              className={`text-4xl md:text-6xl font-black text-white tracking-tighter mt-3 leading-[1.05] ${isRTL ? "font-arabic" : ""}`}
            >
              {t("contact.heading")}
            </h1>
            <p
              className={`text-white/60 text-sm md:text-base max-w-2xl mx-auto mt-5 ${isRTL ? "font-arabic leading-relaxed" : "font-mono"}`}
            >
              {t("contact.subtext")}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact info card */}
            <motion.aside
              className="lg:col-span-2 space-y-4"
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#121212] border border-white/10 rounded-3xl p-7 overflow-hidden">
                <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-red-600/10 blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="relative w-10 h-10">
                      <Image src="/images/logo1.png" alt="Chat Cola" fill className="object-contain" />
                    </div>
                    <span className="text-white font-black text-lg tracking-tight">
                      <span className="text-white">Chat</span>
                      <span className="text-red-600">Cola</span>
                    </span>
                  </div>

                  <h3 className={`text-white font-bold text-lg mb-4 ${isRTL ? "font-arabic" : ""}`}>
                    {language === "ar" ? "معلومات التواصل" : "Reach us directly"}
                  </h3>

                  <ul className="space-y-4">
                    {contactItems.map((item, i) => (
                      <motion.li
                        key={item.labelKey}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.08 }}
                      >
                        <a
                          href={item.href}
                          className={`flex items-start gap-3 group ${isRTL ? "flex-row-reverse text-right" : ""}`}
                        >
                          <div className="shrink-0 w-9 h-9 rounded-lg bg-red-600/15 border border-red-600/25 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-colors">
                            <item.icon className="w-4 h-4 text-red-500 group-hover:text-white transition-colors" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-white/40 text-[10px] uppercase tracking-[0.2em] ${isRTL ? "font-arabic" : "font-mono"}`}>
                              {t(item.labelKey)}
                            </p>
                            <p className={`text-white text-sm font-medium mt-0.5 break-words group-hover:text-red-500 transition-colors ${isRTL ? "font-arabic" : ""}`}>
                              {t(item.valueKey)}
                            </p>
                          </div>
                        </a>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-7 pt-6 border-t border-white/10">
                    <p className={`text-white/50 text-xs leading-relaxed ${isRTL ? "font-arabic" : "font-mono"}`}>
                      {language === "ar"
                        ? "نرد على رسائلك خلال 24 ساعة عمل."
                        : "We typically respond within 24 business hours."}
                    </p>
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-white/10 rounded-3xl p-6 md:p-8 overflow-hidden">
                <motion.div
                  className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-red-600/15 blur-3xl pointer-events-none"
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative text-center py-12"
                    >
                      <motion.div
                        className="w-16 h-16 rounded-full bg-red-600/20 border-2 border-red-600 flex items-center justify-center mx-auto mb-5"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      >
                        <Check className="w-7 h-7 text-red-500" />
                      </motion.div>
                      <h3 className={`text-2xl font-black text-white mb-2 ${isRTL ? "font-arabic" : ""}`}>
                        {language === "ar" ? "تم استلام رسالتك!" : "Message received!"}
                      </h3>
                      <p className={`text-white/60 max-w-md mx-auto ${isRTL ? "font-arabic" : "font-mono text-sm"}`}>
                        {language === "ar"
                          ? "شكراً للتواصل. سيعود إليك فريقنا قريباً."
                          : "Thanks for reaching out. Our team will get back to you shortly."}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false)
                          setForm({
                            fullName: "",
                            phone: "",
                            email: "",
                            business: "",
                            inquiry: inquiryKeys[0],
                            message: "",
                          })
                        }}
                        className="mt-6 text-red-500 hover:text-red-400 font-mono text-xs tracking-wider uppercase"
                      >
                        {language === "ar" ? "إرسال رسالة أخرى" : "Send another message"}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="relative space-y-5"
                    >
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField
                          label={t("contact.form.fullName")}
                          value={form.fullName}
                          onChange={(v) => handleChange("fullName", v)}
                          required
                          isRTL={isRTL}
                        />
                        <FormField
                          label={t("contact.form.phoneNumber")}
                          value={form.phone}
                          onChange={(v) => handleChange("phone", v)}
                          type="tel"
                          required
                          isRTL={isRTL}
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField
                          label={t("contact.form.email")}
                          value={form.email}
                          onChange={(v) => handleChange("email", v)}
                          type="email"
                          required
                          isRTL={isRTL}
                        />
                        <FormField
                          label={t("contact.form.businessName")}
                          value={form.business}
                          onChange={(v) => handleChange("business", v)}
                          isRTL={isRTL}
                        />
                      </div>

                      {/* Inquiry type */}
                      <div>
                        <label className={`block text-white/50 text-[10px] uppercase tracking-[0.25em] mb-2 ${isRTL ? "font-arabic text-right" : "font-mono"}`}>
                          {t("contact.form.inquiry")}
                        </label>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {inquiryKeys.map((key) => {
                            const active = form.inquiry === key
                            return (
                              <button
                                key={key}
                                type="button"
                                onClick={() => handleChange("inquiry", key)}
                                className={`relative px-3 py-2.5 rounded-xl border-2 text-xs font-medium transition-all ${isRTL ? "text-right font-arabic" : "text-left font-mono"} ${
                                  active
                                    ? "border-red-600 bg-red-600/10 text-white"
                                    : "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/30 hover:text-white"
                                }`}
                              >
                                <span className="relative z-10">{t(key)}</span>
                                {active && (
                                  <motion.span
                                    layoutId="inquiry-indicator"
                                    className={`absolute top-2 ${isRTL ? "left-2" : "right-2"} w-2 h-2 rounded-full bg-red-600`}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                  />
                                )}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className={`block text-white/50 text-[10px] uppercase tracking-[0.25em] mb-2 ${isRTL ? "font-arabic text-right" : "font-mono"}`}>
                          {t("contact.form.message")}
                        </label>
                        <textarea
                          value={form.message}
                          onChange={(e) => handleChange("message", e.target.value)}
                          required
                          rows={5}
                          className={`w-full bg-white/[0.03] border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-red-600 transition-all duration-300 resize-none ${isRTL ? "text-right font-arabic" : "font-mono"}`}
                          placeholder={
                            language === "ar"
                              ? "اكتب رسالتك هنا..."
                              : "Tell us how we can help..."
                          }
                        />
                      </div>

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-red-600 text-white px-6 py-4 rounded-xl font-bold text-sm tracking-wide relative overflow-hidden group disabled:opacity-70"
                        whileHover={{ scale: submitting ? 1 : 1.01 }}
                        whileTap={{ scale: submitting ? 1 : 0.99 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                          animate={submitting ? {} : { x: ["-100%", "200%"] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                        />
                        <span className="relative z-10">
                          {submitting
                            ? language === "ar"
                              ? "جاري الإرسال..."
                              : "Sending..."
                            : t("contact.form.submit")}
                        </span>
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function FormField({
  label,
  value,
  onChange,
  type = "text",
  required,
  isRTL,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
  isRTL: boolean
}) {
  return (
    <div>
      <label className={`block text-white/50 text-[10px] uppercase tracking-[0.25em] mb-2 ${isRTL ? "font-arabic text-right" : "font-mono"}`}>
        {label}
        {required && <span className="text-red-600 ms-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={`w-full bg-white/[0.03] border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-red-600 transition-all duration-300 ${isRTL ? "text-right font-arabic" : "font-mono"}`}
      />
    </div>
  )
}
