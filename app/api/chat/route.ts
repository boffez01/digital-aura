import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function POST(request: NextRequest) {
  try {
    const { message, context, products, services, faqs, cart, appointments } = await request.json()

    // Utilizziamo gemini-1.5-flash che è il modello attualmente supportato
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    let systemPrompt = ""
    let contextData = ""

    // Personalizza il prompt in base al contesto
    switch (context) {
      case "ecommerce":
        systemPrompt = `Sei un assistente shopping AI per un e-commerce. Devi essere amichevole, utile e focalizzato sulle vendite. 
        Rispondi sempre in italiano. Aiuta i clienti a trovare prodotti, gestire il carrello e completare acquisti.
        Usa emoji appropriate e mantieni un tono professionale ma amichevole.`

        if (products) {
          contextData += `\nProdotti disponibili: ${JSON.stringify(products)}`
        }
        if (cart) {
          contextData += `\nCarrello attuale: ${JSON.stringify(cart)}`
        }
        break

      case "business":
        systemPrompt = `Sei un assistente per servizi business di Digital Aura. Devi essere professionale, competente e orientato ai risultati.
        Rispondi sempre in italiano. Aiuta i clienti con prenotazioni, preventivi e informazioni sui servizi.
        Mantieni un tono professionale e consulenziale.`

        if (services) {
          contextData += `\nServizi disponibili: ${JSON.stringify(services)}`
        }
        if (appointments) {
          contextData += `\nAppuntamenti prenotati: ${JSON.stringify(appointments)}`
        }
        break

      case "support":
        systemPrompt = `Sei un assistente di supporto clienti per Digital Aura. Devi essere paziente, comprensivo e risolutivo.
        Rispondi sempre in italiano. Aiuta i clienti a risolvere problemi tecnici e rispondere alle loro domande.
        Usa un tono empatico e professionale. Se non puoi risolvere un problema, indirizza verso un operatore umano.`

        if (faqs) {
          contextData += `\nFAQ disponibili: ${JSON.stringify(faqs)}`
        }
        break

      default:
        systemPrompt = `Sei l'assistente AI di Digital Aura, un'azienda specializzata in soluzioni digitali innovative.
        Rispondi sempre in italiano. Sei professionale, competente e orientato ad aiutare i clienti.
        Fornisci informazioni sui servizi: AI Automation, Chatbot Development, Web Development, AI Marketing.`
    }

    const fullPrompt = `${systemPrompt}

${contextData}

Domanda del cliente: ${message}

Rispondi in modo naturale, utile e pertinente al contesto. Mantieni la risposta concisa ma completa (massimo 150 parole).`

    const result = await model.generateContent(fullPrompt)
    const response = result.response
    const text = response.text()

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Errore API Gemini:", error)

    // Fallback responses in caso di errore
    const fallbackResponses = {
      ecommerce:
        "Mi dispiace, sto avendo problemi tecnici. Puoi provare a navigare il nostro catalogo o contattare il supporto per assistenza immediata.",
      business:
        "Scusa per l'inconveniente tecnico. Per prenotazioni urgenti puoi chiamarci al +393500216480 o inviare una email a info@digitalaura.it",
      support:
        "Mi dispiace, sto riscontrando difficoltà tecniche. Ti metto subito in contatto con un operatore umano per ricevere assistenza immediata.",
      default:
        "Mi dispiace, sto avendo problemi di connessione. Puoi riprovare tra qualche momento o contattarci direttamente per assistenza.",
    }

    const context_key = request.url.includes("context") ? (await request.json()).context || "default" : "default"

    return NextResponse.json({
      response: fallbackResponses[context_key as keyof typeof fallbackResponses] || fallbackResponses.default,
    })
  }
}
