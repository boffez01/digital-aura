import { type NextRequest, NextResponse } from "next/server"
import { GeminiAI } from "@/lib/gemini-ai"
import { BookingFlow } from "@/lib/booking-flow"
import { SupportFlow } from "@/lib/support-flow"
import { neon } from "@neondatabase/serverless"
import { ZohoService } from "@/lib/zoho-service"

const sql = neon(process.env.DATABASE_URL!)
const zohoService = new ZohoService()
const geminiAI = new GeminiAI()

const KNOWLEDGE_BASE = `
CHI SIAMO:
Praxis Futura è un'agenzia specializzata in Automazione AI e Sviluppo Web per PMI italiane.
Mission: Eliminare il lavoro manuale ripetitivo attraverso l'AI per aumentare efficienza e profitti.

SERVIZI OFFERTI:
1. 🤖 AI Automation - Automazione completa di processi aziendali
2. 💬 Chatbot Intelligenti - Assistenti AI 24/7 per siti web e customer service
3. 🌐 Web Development - Siti web moderni e applicazioni ad alta conversione
4. 📈 AI Marketing - Campagne marketing automatizzate e ottimizzate con AI

PREZZI:
I prezzi variano in base alla complessità e alle esigenze specifiche del progetto.
**Spingi sempre l'utente a prenotare una consulenza gratuita di 15 minuti per valutarlo insieme?**

CONTATTI:
- Email: info@praxisfutura.com
- Sito: https://praxisfutura.com
- Orari: Lunedì-Venerdì 9:00-18:00

REGOLE DI COMPORTAMENTO:
- Rispondi SEMPRE nella lingua dell'utente (italiano o inglese)
- Sii conciso, professionale e orientato al risultato
- Se chiedono prezzi esatti: "Il prezzo dipende dalle specifiche del progetto. Possiamo fissare una call gratuita di 15 minuti per valutarlo insieme?"
- Se chiedono servizi che NON offriamo: Rispondi onestamente che non li forniamo e riporta il focus sui nostri 4 servizi principali
- Obiettivo principale: portare l'utente a prenotare una consulenza gratuita
`

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId } = await request.json()
    if (!message) return NextResponse.json({ error: "Message required" }, { status: 400 })

    const currentSessionId = sessionId || `session_${Date.now()}`

    // Recupera o Crea Sessione nel DB
    let sessionData = await sql`
      SELECT booking_mode, flow_step, booking_data, support_mode
      FROM chat_sessions
      WHERE session_id = ${currentSessionId}
    `

    if (sessionData.length === 0) {
      await sql`
            INSERT INTO chat_sessions (session_id, language, created_at)
            VALUES (${currentSessionId}, 'it', NOW())
        `
      sessionData =
        await sql`SELECT booking_mode, flow_step, support_mode FROM chat_sessions WHERE session_id = ${currentSessionId}`
    }

    const isBookingMode = sessionData[0]?.booking_mode === true
    const isSupportMode = sessionData[0]?.support_mode === true
    const currentStep = sessionData[0]?.flow_step

    // 1. PRIORITÀ AI FLUSSI GUIDATI
    if (isBookingMode && currentStep) {
      const bookingFlow = new BookingFlow()
      const bookingResponse = await bookingFlow.handleBookingStep(currentSessionId, message, currentStep, "it")
      return NextResponse.json({
        response: bookingResponse.message,
        type: "booking",
        sessionId: currentSessionId,
        bookingMode: !bookingResponse.completed,
        nextStep: bookingResponse.nextStep,
      })
    }

    if (isSupportMode) {
      const supportFlow = new SupportFlow()
      const supportResponse = await supportFlow.handleSupportRequest(currentSessionId, message, "it")
      return NextResponse.json({
        response: supportResponse.message,
        type: "support",
        sessionId: currentSessionId,
        supportMode: !supportResponse.completed,
      })
    }

    // 2. INTELLIGENZA ARTIFICIALE
    const context = {
      booking_mode: isBookingMode,
      support_mode: isSupportMode,
      knowledgeBase: KNOWLEDGE_BASE,
    }

    const aiResponse = await geminiAI.generateResponse(message, context, "it")
    const responseText = aiResponse.message

    // 3. IL PONTE MIGLIORATO (Mostra risposta AI + Menu)
    if (responseText.includes("[TRIGGER_BOOKING]") || message.toLowerCase().includes("prenota")) {
      // Puliamo il tag dalla risposta dell'AI per mostrarla all'utente
      const cleanAiResponse = responseText.replace("[TRIGGER_BOOKING]", "").trim()

      await sql`
          UPDATE chat_sessions 
          SET booking_mode = true, flow_step = 'booking_start'
          WHERE session_id = ${currentSessionId}
       `
      const bookingFlow = new BookingFlow()
      const bookingResponse = await bookingFlow.handleBookingStep(currentSessionId, "", "booking_start", "it")

      return NextResponse.json({
        // QUI STA LA MAGIA: Uniamo la risposta dell'AI (es. "Certo!") con il menu del booking
        response: cleanAiResponse + "\n\n" + bookingResponse.message,
        type: "booking",
        sessionId: currentSessionId,
        bookingMode: true,
        nextStep: bookingResponse.nextStep,
      })
    }

    return NextResponse.json({
      response: responseText,
      type: "ai",
      sessionId: currentSessionId,
    })
  } catch (error) {
    console.error("Chat Error:", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}
