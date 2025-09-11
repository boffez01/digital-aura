import { google } from "@ai-sdk/google"
import { streamText } from "ai"
import type { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { messages, sessionId } = await req.json()

    // Check if we have the API key
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY

    if (!apiKey) {
      console.warn("⚠️ Google AI API key not found, using fallback responses")

      // Fallback response when no API key
      const lastMessage = messages[messages.length - 1]?.content || ""

      let fallbackResponse = "Ciao! Sono l'assistente AI di Digital Aura. Come posso aiutarti oggi?"

      if (lastMessage.toLowerCase().includes("prenotare") || lastMessage.toLowerCase().includes("book")) {
        fallbackResponse =
          "Per prenotare un appuntamento, puoi usare il nostro sistema di prenotazione online. Che tipo di consulenza ti interessa?"
      } else if (lastMessage.toLowerCase().includes("servizi") || lastMessage.toLowerCase().includes("services")) {
        fallbackResponse =
          "Offriamo servizi di sviluppo web, chatbot AI, marketing digitale e automazione. Su quale servizio vorresti saperne di più?"
      }

      return new Response(fallbackResponse, {
        headers: { "Content-Type": "text/plain" },
      })
    }

    // Use Google AI with the available key
    const result = await streamText({
      model: google("gemini-1.5-flash", { apiKey }),
      messages,
      system: `Sei AuraBot, l'assistente AI di Digital Aura, un'azienda specializzata in soluzioni di intelligenza artificiale per il business.

PERSONALITÀ:
- Professionale ma amichevole
- Esperto in AI, automazione e trasformazione digitale
- Sempre disponibile ad aiutare
- Rispondi nella lingua dell'utente (italiano o inglese)

SERVIZI PRINCIPALI:
1. Sviluppo Web - Siti web moderni e responsive
2. Chatbot AI - Assistenti virtuali intelligenti
3. AI Marketing - Automazione marketing con AI
4. Automazione AI - Processi aziendali automatizzati

FUNZIONALITÀ:
- Puoi aiutare con informazioni sui servizi
- Puoi guidare verso la prenotazione di appuntamenti
- Puoi fornire supporto tecnico
- Mantieni sempre un tono professionale ma cordiale

Se l'utente vuole prenotare, guidalo verso il sistema di prenotazione.
Se ha problemi tecnici, offri supporto immediato.
Rispondi sempre in modo utile e pertinente.`,
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error("❌ Chat API Error:", error)

    // Fallback response on error
    return new Response(
      "Mi dispiace, sto avendo alcuni problemi tecnici. Puoi provare a riformulare la tua domanda o contattarci direttamente per assistenza.",
      {
        headers: { "Content-Type": "text/plain" },
      },
    )
  }
}
