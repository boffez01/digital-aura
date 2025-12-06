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
Praxis Futura è un'agenzia di Automazione AI e Sviluppo Web per PMI.
Mission: Eliminare il lavoro manuale ripetitivo per aumentare i profitti.

SERVIZI E PREZZI (Indicativi - Spingi alla call):
1. AI Voice Receptionist (Vapi): Segretaria virtuale che risponde al telefono h24, qualifica e fissa appuntamenti.
2. Chatbot Intelligenti: Assistenti 24/7 per il sito web. Da €2.000 una tantum.
3. Automazione Processi: Integrazioni CRM, preventivi automatici. Su preventivo.
4. Sviluppo Web: Siti Next.js ad alta conversione. Da €3.000.

CONTATTI:
Email: info@praxisfutura.it
Orari: Lun-Ven 9:00-18:00

REGOLE DI INGAGGIO:
- Rispondi SEMPRE nella lingua dell'utente.
- Sii breve, professionale e orientato al risultato.
- Se chiedono prezzi esatti: "Dipende dal progetto, fissiamo una call di 15min per valutarlo?".
- Se chiedono servizi che NON offriamo (es. App Mobile, Grafica Cartacea): Rispondi onestamente che non lo facciamo e riporta il discorso sui nostri servizi.
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
    const customPrompt = `
      Sei PraxisBot, l'AI Sales Assistant di Praxis Futura.
      TUA CONOSCENZA: ${KNOWLEDGE_BASE}
      
      OBIETTIVO: Rispondi alle domande e cerca di portare l'utente a prenotare una consulenza.
      
      REGOLE TRIGGER BOOKING:
      - Aggiungi il tag "[TRIGGER_BOOKING]" alla fine della risposta SOLO SE l'utente dice esplicitamente "Sì, prenotiamo", "Voglio fissare un appuntamento", "Ok procediamo".
      - NON usare il tag se l'utente fa solo una domanda informativa (es. "Fate app mobili?"). In quel caso rispondi alla domanda e basta.
    `

    const responseText = await geminiAI.generateResponse(message, "it", customPrompt)

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
