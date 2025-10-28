"use client"

import { useLanguage } from "@/app/contexts/language-context" // Manteniamo il contesto lingua
import Navbar from "@/app/components/navbar" // Manteniamo la navbar

export default function AppointmentsPage() {
  const { language } = useLanguage() // Otteniamo la lingua attuale ('it' o 'en')

  // Definiamo gli URL specifici per lingua
  const italianWidgetSrc = "https://admin-praxisfutura.zohobookings.eu/portal-embed#/praxisfutura"
  const englishWidgetSrc = "https://admin-praxisfutura.zohobookings.eu/portal-embed#/251678000000053004" // Corretto typo

  // Scegliamo l'URL corretto in base alla lingua
  const widgetSrc = language === "it" ? italianWidgetSrc : englishWidgetSrc

  const title = language === "it" ? "Prenota una Consulenza" : "Book a Consultation"

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <Navbar /> {/* Renderizziamo la Navbar */}
      <main className="flex-grow pt-20">
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="mt-0 overflow-hidden">
              <iframe
                key={language}
                width="100%"
                height="750px"
                src={widgetSrc}
                frameBorder="0"
                allowFullScreen
                title={title}
              ></iframe>
            </div>
          </div>
        </section>
      </main>
      {/* Assicurati di avere un componente Footer in app/components/footer.tsx */}
      {/* Se non lo hai, rimuovi la riga seguente */}
      {/* <Footer /> */}
    </div>
  )
}

// Se non hai un componente Footer, assicurati di rimuovere l'import e l'uso di <Footer />
