import type { Metadata } from "next"
import { ContactPageClient } from "@/components/contact-page-client"

export const metadata: Metadata = {
  title: "Contact | Chat Cola",
  description: "Get in touch with Chat Cola. Stock our products, ask a question, or learn more about our Palestinian beverage brand.",
}

export default function ContactPage() {
  return <ContactPageClient />
}
