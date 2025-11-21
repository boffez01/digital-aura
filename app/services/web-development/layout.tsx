import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sviluppo Web Professionale - Praxis Futura",
  description:
    "Crea siti web moderni, veloci e ottimizzati SEO. Sviluppo su misura con tecnologie all'avanguardia per far crescere il tuo business online.",
  keywords: ["sviluppo web", "siti web professionali", "web development", "Next.js", "React", "siti responsive"],
  openGraph: {
    title: "Sviluppo Web Professionale - Praxis Futura",
    description: "Crea siti web moderni, veloci e ottimizzati SEO.",
    type: "website",
  },
}

export default function WebDevelopmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
