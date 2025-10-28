"use client"

import { useLanguage } from "@/app/contexts/language-context" // Manteniamo il contesto lingua
import Navbar from "@/app/components/navbar" // Manteniamo la navbar

export default function AppointmentsPage() {
  const { language } = useLanguage() // Otteniamo la lingua attuale ('it' o 'en')

  // Definiamo l'URL base del widget
  const baseUrl = "https://admin-praxisfutura.zohobookings.eu/portal-embed#/praxisfutura"

  // Aggiungiamo il parametro ?lang= in base alla lingua del contesto
  const widgetSrc = `${baseUrl}?lang=${language}`

  // Titoli e descrizioni bilingue per la pagina (FUORI dal widget)
  const title = language === "it" ? "Prenota una Consulenza" : "Book a Consultation"
  const description =
    language === "it"
      ? "Scegli il servizio, la data e l'orario. Incontriamoci per discutere di come possiamo trasformare il tuo business."
      : "Choose the service, date, and time. Let's meet to discuss how we can transform your business."

  return (
    <div className="bg-slate-900 text-white min-h-screen flex flex-col">
      <Navbar /> {/* Renderizziamo la Navbar */}
      <main className="flex-grow pt-20">
        {" "}
        {/* Aggiunto padding-top se la navbar è fissa */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            {" "}
            {/* Contenitore più stretto per il widget */}
            {/* Intestazione della pagina */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                {title}
              </h1>
              <p className="text-lg text-slate-300">{description}</p>
            </div>
            {/* Widget di Zoho Bookings reso direttamente con l'URL corretto */}
            <div
              className="bg-slate-800/50 border border-slate-700 rounded-lg shadow-lg overflow-hidden" // Stile contenitore opzionale
            >
              <iframe
                width="100%"
                height="750px" // Puoi aggiustare l'altezza se necessario
                src={widgetSrc} // Usiamo l'URL dinamico costruito sopra
                frameBorder="0"
                allowFullScreen
                title={title} // Aggiunto titolo per accessibilità
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
