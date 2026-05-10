"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

type Language = "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isRTL: boolean
}

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.flavours": "Flavours",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.contactSales": "Contact Sales",

    // Hero
    "hero.badge": "PALESTINIAN REFRESHMENT BRAND",
    "hero.headline1": "TASTE THE",
    "hero.headline2": "SPARK OF PALESTINE",
    "hero.subtext": "Refreshing carbonated drinks crafted for every taste, every table, and every moment. Proudly Palestinian. Boldly refreshing.",
    "hero.exploreFlavours": "Explore Flavours",
    "hero.contactUs": "Contact Us",
    "hero.since": "Since 2020",
    "hero.madeIn": "Made in Palestine",
    "hero.sizes": "150ml & 250ml",
    "hero.wideRange": "Wide Flavour Range",

    // Flavours Section
    "flavours.eyebrow": "OUR FLAVOURS",
    "flavours.heading1": "CHOOSE YOUR",
    "flavours.heading2": "CHAT",
    "flavours.subtext": "A refreshing lineup of Palestinian carbonated drinks crafted for every taste, every table, and every moment.",
    "flavours.viewProduct": "View Product",
    "flavours.askSupply": "Ask for Supply",
    "flavours.tasteProfile": "TASTE PROFILE",
    "flavours.taste": "TASTE",
    "flavours.intensity": "INTENSITY",
    "flavours.freshness": "FRESHNESS",
    "flavours.sizes": "SIZES",

    // Why Chat Cola (Bento Grid)
    "why.eyebrow": "Why Chat Cola",
    "why.heading": "Built for Taste, Quality & Value",
    "why.quality.title": "Quality",
    "why.quality.subtitle": "Premium Production",
    "why.quality.description": "Produced with a focus on consistent quality from ingredients to packaging.",
    "why.variety.title": "Variety",
    "why.variety.subtitle": "Flavor Range",
    "why.variety.description": "A wide flavour range made for different tastes and occasions.",
    "why.affordable.title": "Affordable",
    "why.affordable.subtitle": "Competitive Pricing",
    "why.affordable.description": "Refreshing drinks made accessible for Palestinian consumers.",
    "why.local.title": "Local",
    "why.local.subtitle": "Palestinian Brand",
    "why.local.description": "A Palestinian brand expanding across local markets and beyond.",

    // About Section
    "about.eyebrow": "OUR STORY",
    "about.heading": "ABOUT CHAT COLA",
    "about.text": "Chat Cola is a Palestinian beverage company established in 2020 in Salfit. The company manufactures carbonated beverages, juices, energy drinks, and purified water, and has become a recognized name in the Palestinian market through quality, variety, affordability, and innovation.",
    "about.vision": "Our vision is to become the optimal Palestinian model in serving customers and meeting their needs innovatively, by building an advanced and effective commercial system in the Palestinian beverage market.",
    "about.achievementsEyebrow": "OUR ACHIEVEMENTS",
    "about.achievementsHeading": "A PALESTINIAN BRAND GROWING FAST",
    "about.rapidGrowth.title": "Rapid Growth",
    "about.rapidGrowth.description": "Chat Cola achieved rapid growth in the Palestinian market within a short period.",
    "about.distribution.title": "Distribution",
    "about.distribution.description": "Products have expanded across the West Bank, Gaza Strip, and Palestinian territories.",
    "about.export.title": "Export",
    "about.export.description": "Chat Cola has started exporting to Jordan and aims to reach new markets.",
    "about.qualityAchievement.title": "Quality",
    "about.qualityAchievement.description": "High-quality products at competitive prices, with a focus on customer service.",

    // Social Section
    "social.eyebrow": "FOLLOW THE SPARK",
    "social.heading": "@CHAT.COLA",
    "social.follow": "Follow @chat.cola",
    "social.newFlavour": "New Flavour",
    "social.onShelves": "On Shelves",
    "social.madeInPalestine": "Made in Palestine",
    "social.freshTaste": "Fresh Taste",

    // Contact Section/Page
    "contact.eyebrow": "GET IN TOUCH",
    "contact.heading": "LET'S BRING CHAT COLA TO YOU",
    "contact.subtext": "Have a question, want to stock Chat Cola, or need more information about our products? Contact our team and we'll get back to you.",
    "contact.location": "Location",
    "contact.locationValue": "Palestine, Ramallah - Salfit",
    "contact.phone": "Phone",
    "contact.phoneValue": "092510083",
    "contact.email": "Email",
    "contact.emailValue": "info@chatcola.ps",
    "contact.instagram": "Instagram",
    "contact.instagramValue": "@chat.cola",
    "contact.facebook": "Facebook",
    "contact.facebookValue": "facebook.com/chatcola",
    "contact.form.fullName": "Full Name",
    "contact.form.phoneNumber": "Phone Number",
    "contact.form.email": "Email",
    "contact.form.businessName": "Business / Store Name",
    "contact.form.message": "Message",
    "contact.form.inquiry": "Inquiry Type",
    "contact.form.inquiryStock": "I want to stock Chat Cola",
    "contact.form.inquiryGeneral": "I have a general question",
    "contact.form.inquiryEvent": "I want event / sponsorship information",
    "contact.form.inquiryDistribution": "I want distribution information",
    "contact.form.submit": "Send Message",

    // Footer
    "footer.heading1": "READY TO",
    "footer.heading2": "REFRESH YOUR SHELVES?",
    "footer.emailPlaceholder": "your@email.com",
    "footer.description": "Chat Cola is a Palestinian beverage company producing carbonated drinks, juices, energy drinks, and purified water with a focus on quality, variety, and competitive pricing.",
    "footer.products": "Products",
    "footer.company": "Company",
    "footer.categories": "Categories",
    "footer.contact": "Contact",
    "footer.copyright": "© 2026 Chat Cola. All rights reserved.",
    "footer.madeWith": "made with energy",

    // Product Names
    "product.chatCola": "Chat Cola",
    "product.zeroCola": "Zero Cola",
    "product.blueChat": "Blue Chat",
    "product.lemon": "Lemon",
    "product.lemonMint": "Lemon Mint",
    "product.strawberry": "Strawberry",
    "product.orange": "Orange",
    "product.apple": "Apple",
    "product.grape": "Grape",
    "product.fruits": "Fruits",
  },
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.flavours": "النكهات",
    "nav.about": "من نحن",
    "nav.contact": "تواصل معنا",
    "nav.contactSales": "تواصل معنا",

    // Hero
    "hero.badge": "علامة مشروبات فلسطينية",
    "hero.headline1": "تذوّق نكهة",
    "hero.headline2": "الانتعاش الفلسطيني",
    "hero.subtext": "مشروبات غازية منعشة مصنوعة لكل ذوق، وكل لحظة، وكل مناسبة. بفخر فلسطيني ونكهة جريئة.",
    "hero.exploreFlavours": "استكشف النكهات",
    "hero.contactUs": "تواصل معنا",
    "hero.since": "منذ 2020",
    "hero.madeIn": "صنع في فلسطين",
    "hero.sizes": "150مل و 250مل",
    "hero.wideRange": "تشكيلة واسعة من النكهات",

    // Flavours Section
    "flavours.eyebrow": "نكهاتنا",
    "flavours.heading1": "اختر نكهتك",
    "flavours.heading2": "من شات",
    "flavours.subtext": "مجموعة منعشة من المشروبات الغازية الفلسطينية المصممة لتناسب كل الأذواق.",
    "flavours.viewProduct": "عرض المنتج",
    "flavours.askSupply": "اطلب التوريد",
    "flavours.tasteProfile": "ملف النكهة",
    "flavours.taste": "النكهة",
    "flavours.intensity": "القوة",
    "flavours.freshness": "الانتعاش",
    "flavours.sizes": "الأحجام",

    // Why Chat Cola (Bento Grid)
    "why.eyebrow": "لماذا شات كولا",
    "why.heading": "نكهة، جودة، وقيمة حقيقية",
    "why.quality.title": "الجودة",
    "why.quality.subtitle": "إنتاج متميز",
    "why.quality.description": "يتم إنتاج مشروباتنا بعناية للحفاظ على جودة ثابتة من المكونات حتى التغليف.",
    "why.variety.title": "التنوع",
    "why.variety.subtitle": "تشكيلة النكهات",
    "why.variety.description": "مجموعة واسعة من النكهات لتناسب مختلف الأذواق والمناسبات.",
    "why.affordable.title": "السعر المناسب",
    "why.affordable.subtitle": "أسعار تنافسية",
    "why.affordable.description": "مشروبات منعشة بجودة عالية وسعر مناسب للمستهلك الفلسطيني.",
    "why.local.title": "نمو محلي",
    "why.local.subtitle": "علامة فلسطينية",
    "why.local.description": "علامة فلسطينية تتوسع في الأسواق المحلية وخارجها.",

    // About Section
    "about.eyebrow": "قصتنا",
    "about.heading": "من نحن",
    "about.text": "شات كولا هي شركة مشروبات فلسطينية تأسست عام 2020 في سلفيت. تعمل الشركة في إنتاج المشروبات الغازية والعصائر ومشروبات الطاقة والمياه النقية، وأصبحت اسماً معروفاً في السوق الفلسطيني من خلال الجودة، التنوع، السعر المناسب، والابتكار.",
    "about.vision": "رؤيتنا هي أن نكون النموذج الفلسطيني الأمثل في خدمة العملاء وتلبية احتياجاتهم بطريقة مبتكرة، من خلال بناء نظام تجاري متطور وفعّال في سوق المشروبات الفلسطيني.",
    "about.achievementsEyebrow": "إنجازاتنا",
    "about.achievementsHeading": "علامة فلسطينية تنمو بسرعة",
    "about.rapidGrowth.title": "نمو سريع",
    "about.rapidGrowth.description": "حققت شات كولا نمواً سريعاً في السوق الفلسطيني خلال فترة قصيرة.",
    "about.distribution.title": "انتشار واسع",
    "about.distribution.description": "وصلت منتجات شات كولا إلى مناطق مختلفة في الضفة الغربية وقطاع غزة والأراضي الفلسطينية.",
    "about.export.title": "تصدير",
    "about.export.description": "بدأت شات كولا بالتصدير إلى الأردن وتسعى للوصول إلى أسواق جديدة.",
    "about.qualityAchievement.title": "منتجات عالية الجودة",
    "about.qualityAchievement.description": "منتجات بجودة عالية وأسعار منافسة مع تركيز واضح على رضا العملاء.",

    // Social Section
    "social.eyebrow": "تابع الانتعاش",
    "social.heading": "@CHAT.COLA",
    "social.follow": "تابعنا @chat.cola",
    "social.newFlavour": "نكهة جديدة",
    "social.onShelves": "على الرفوف",
    "social.madeInPalestine": "صنع في فلسطين",
    "social.freshTaste": "طعم منعش",

    // Contact Section/Page
    "contact.eyebrow": "تواصل معنا",
    "contact.heading": "خلينا نوصل شات كولا إلك",
    "contact.subtext": "لديك سؤال؟ تريد توفير شات كولا في متجرك أو معرفة المزيد عن منتجاتنا؟ تواصل مع فريقنا وسنعود إليك قريباً.",
    "contact.location": "الموقع",
    "contact.locationValue": "فلسطين، رام الله - سلفيت",
    "contact.phone": "الهاتف",
    "contact.phoneValue": "092510083",
    "contact.email": "البريد الإلكتروني",
    "contact.emailValue": "info@chatcola.ps",
    "contact.instagram": "انستغرام",
    "contact.instagramValue": "@chat.cola",
    "contact.facebook": "فيسبوك",
    "contact.facebookValue": "facebook.com/chatcola",
    "contact.form.fullName": "الاسم الكامل",
    "contact.form.phoneNumber": "رقم الهاتف",
    "contact.form.email": "البريد الإلكتروني",
    "contact.form.businessName": "اسم المتجر / الشركة",
    "contact.form.message": "الرسالة",
    "contact.form.inquiry": "نوع الاستفسار",
    "contact.form.inquiryStock": "أريد توفير شات كولا في متجري",
    "contact.form.inquiryGeneral": "لدي سؤال عام",
    "contact.form.inquiryEvent": "أريد معلومات عن الفعاليات أو الرعاية",
    "contact.form.inquiryDistribution": "أريد معلومات عن التوزيع",
    "contact.form.submit": "إرسال الرسالة",

    // Footer
    "footer.heading1": "جاهز",
    "footer.heading2": "لتنعيش رفوفك؟",
    "footer.emailPlaceholder": "بريدك@email.com",
    "footer.description": "شات كولا هي شركة مشروبات فلسطينية تنتج المشروبات الغازية والعصائر ومشروبات الطاقة والمياه النقية مع التركيز على الجودة والتنوع والأسعار التنافسية.",
    "footer.products": "المنتجات",
    "footer.company": "الشركة",
    "footer.categories": "الفئات",
    "footer.contact": "تواصل معنا",
    "footer.copyright": "© 2026 شات كولا. جميع الحقوق محفوظة.",
    "footer.madeWith": "صُنع بحب وطاقة",

    // Product Names
    "product.chatCola": "شات كولا",
    "product.zeroCola": "زيرو كولا",
    "product.blueChat": "بلو شات",
    "product.lemon": "ليمون",
    "product.lemonMint": "ليمون نعناع",
    "product.strawberry": "فراولة",
    "product.orange": "برتقال",
    "product.apple": "تفاح",
    "product.grape": "عنب",
    "product.fruits": "فواكه",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
  }, [])

  const t = useCallback(
    (key: string): string => {
      return translations[language][key as keyof typeof translations.en] || key
    },
    [language]
  )

  const isRTL = language === "ar"

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
