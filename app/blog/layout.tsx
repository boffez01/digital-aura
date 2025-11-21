import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - Insights su AI e Sviluppo Web | Praxis Futura",
  description:
    "Scopri le ultime novità su AI, automazione, sviluppo web e marketing digitale. Guide pratiche e case study per far crescere il tuo business.",
  keywords: ["blog AI", "blog sviluppo web", "intelligenza artificiale", "tutorial automazione", "digital marketing"],
  openGraph: {
    title: "Blog - Insights su AI e Sviluppo Web | Praxis Futura",
    description: "Scopri le ultime novità su AI, automazione, sviluppo web e marketing digitale.",
    type: "website",
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
