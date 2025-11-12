// in lib/support-flow.ts

// Support Flow with Intelligent Escalation
// Version 245 - Using Gemini 2.5 Flash Lite

import { SessionManager } from "./session-manager"
import { GoogleGenerativeAI } from "@google/generative-ai"

let genAI: GoogleGenerativeAI | null = null
let model: any = null

try {
  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY)
    model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" })
    console.log("✅ Gemini 2.5 Flash Lite initialized in support flow")
  } else {
    console.warn("⚠️ GOOGLE_GENERATIVE_AI_API_KEY not found in support flow")
  }
} catch (error) {
  console.error("❌ Failed to initialize Gemini AI in support flow:", error)
}

export interface SupportResponse {
  message: string
  needsEscalation: boolean
  escalated: boolean
  attemptCount: number
}

export class SupportFlow {
  private sessionManager: SessionManager

  constructor() {
    this.sessionManager = SessionManager.getInstance()
  }

  async handleSupportRequest(sessionId: string, message: string, language: "it" | "en"): Promise<SupportResponse> {
    try {
      console.log(`[v0] 🔧 Processing support request: ${sessionId}, language param: ${language}`)

      const session = await this.sessionManager.getSession(sessionId)
      if (!session) {
        throw new Error("Session not found")
      }

      const sessionLanguage = (session as any).language
      const finalLanguage = language || sessionLanguage || "en"

      console.log(
        `[v0] 🌐 Language resolution - param: ${language}, session: ${sessionLanguage}, final: ${finalLanguage}`,
      )

      if (!session.support_mode) {
        await this.sessionManager.activateSupportMode(sessionId)
      }

      const attemptCount = await this.sessionManager.incrementAttemptCount(sessionId)

      console.log(`[v0] 📊 Support attempt #${attemptCount} for session ${sessionId}`)

      const aiResponse = await this.generateAISupportResponse(message, attemptCount, finalLanguage, session)

      console.log(`[v0] 🤖 Gemini AI generated support response in ${finalLanguage}`)

      return {
        message: aiResponse,
        needsEscalation: attemptCount >= 5, // Suggest escalation after 5 attempts
        escalated: false,
        attemptCount,
      }
    } catch (error) {
      console.error("❌ Error in support flow:", error)

      const errorMessages = {
        it: "🔧 **Supporto Tecnico**\n\nSi è verificato un errore. Contattaci direttamente:\n📞 +39 02 1234567\n📧 info@digitalaura.it",
        en: "🔧 **Technical Support**\n\nAn error occurred. Contact us directly:\n📞 +39 02 1234567\n📧 info@digitalaura.it",
      }

      return {
        message: errorMessages[language] || errorMessages.en,
        needsEscalation: false,
        escalated: false,
        attemptCount: 0,
      }
    }
  }

  private async generateAISupportResponse(
    message: string,
    attemptCount: number,
    language: "it" | "en",
    session: any,
  ): Promise<string> {
    const bookingFooter = {
      it: '\n\n💡 **Vuoi supporto immediato?** Prenota una consulenza supporto con il nostro team. Scrivi **"prenota supporto"** per iniziare la prenotazione.',
      en: '\n\n💡 **Want immediate support?** Book a support consultation with our team. Write **"book support"** to start booking.',
    }

    const systemPrompts = {
      it: `Sei un assistente di supporto tecnico esperto per Praxis Futura, un'agenzia di AI automation, chatbot intelligenti, sviluppo web e AI marketing.

**IL TUO RUOLO:**
- Analizza il problema tecnico dell'utente
- Fornisci soluzioni pratiche e specifiche
- Fai domande di chiarimento se necessario
- Sii empatico e professionale
- Usa emoji appropriati 🔧 🚀 ✅

**CONTESTO:**
- Tentativo supporto #${attemptCount}
- Servizi: AI Automation, Intelligent Chatbots, Web Development, AI Marketing
- Lingua: Italiano

**ISTRUZIONI:**
1. Analizza attentamente il problema descritto
2. Fornisci soluzioni step-by-step
3. Chiedi dettagli specifici se necessario
4. Suggerisci test diagnostici
5. Sii conciso ma completo (max 300 parole)

Rispondi SEMPRE in italiano, anche se l'utente scrive in inglese.

**PROBLEMA UTENTE:**
${message}

**LA TUA RISPOSTA SUPPORTO:**`,

      en: `You are an expert technical support assistant for Praxis Futura, an AI automation, intelligent chatbots, web development and AI marketing agency.

**YOUR ROLE:**
- Analyze the user's technical problem
- Provide practical and specific solutions
- Ask clarifying questions if needed
- Be empathetic and professional
- Use appropriate emojis 🔧 🚀 ✅

**CONTEXT:**
- Support attempt #${attemptCount}
- Services: AI Automation, Intelligent Chatbots, Web Development, AI Marketing
- Language: English

**INSTRUCTIONS:**
1. Carefully analyze the described problem
2. Provide step-by-step solutions
3. Ask for specific details if necessary
4. Suggest diagnostic tests
5. Be concise but complete (max 300 words)

Always respond in English, even if the user writes in another language.

**USER PROBLEM:**
${message}

**YOUR SUPPORT RESPONSE:**`,
    }

    if (model) {
      try {
        console.log(`[v0] 🤖 Calling Gemini 2.5 Flash Lite for support in ${language}`)

        const result = await model.generateContent(systemPrompts[language])
        const response = await result.response
        const text = response.text()

        console.log(`[v0] ✅ Gemini AI response generated successfully`)

        return text + bookingFooter[language]
      } catch (error) {
        console.error("❌ Error generating AI response:", error)
        // Fallback to template if AI fails
        return this.getSupportMessage(message, attemptCount, language)
      }
    } else {
      console.warn("⚠️ Gemini model not available, using template fallback")
      return this.getSupportMessage(message, attemptCount, language)
    }
  }

  private getSupportMessage(message: string, attemptCount: number, language: "it" | "en"): string {
    const lowerMessage = typeof message === "string" ? message.toLowerCase() : ""

    console.log(`[v0] 📝 Generating support message in language: ${language}`)

    // Detect problem type
    let problemType = "general"
    if (lowerMessage.includes("chatbot") || lowerMessage.includes("bot")) {
      problemType = "chatbot"
    } else if (
      lowerMessage.includes("prenotaz") ||
      lowerMessage.includes("booking") ||
      lowerMessage.includes("appuntamento")
    ) {
      problemType = "booking"
    } else if (lowerMessage.includes("sito") || lowerMessage.includes("website") || lowerMessage.includes("pagina")) {
      problemType = "website"
    }

    const bookingOptionFooter = {
      it: '\n\n💡 **Vuoi supporto immediato?** Prenota una consulenza supporto con il nostro team. Scrivi **"prenota supporto"** per iniziare la prenotazione.',
      en: '\n\n💡 **Want immediate support?** Book a support consultation with our team. Write **"book support"** to start booking.',
    }

    const footer = bookingOptionFooter[language]

    const responses = {
      it: {
        general: `🔧 **Supporto Tecnico**

Ti aiuto a risolvere il problema. Dammi più dettagli:

**📋 Informazioni Utili:**
- Che browser e dispositivo stai usando?
- Ci sono messaggi di errore specifici?
- Quando è iniziato il problema?

**🚀 Soluzioni Comuni:**
1. Ricarica la pagina (Ctrl+F5)
2. Cancella cache del browser
3. Prova modalità incognito
4. Verifica connessione internet

Descrivimi il problema in dettaglio!${footer}`,

        chatbot: `🤖 **Supporto Chatbot**

Problemi con il chatbot:

**🔧 Verifica Rapida:**
1. JavaScript è abilitato?
2. Browser aggiornato? (Chrome, Firefox, Safari, Edge)
3. AdBlock disabilitato?
4. Cookies abilitati?

**📱 Test Diagnostici:**
- Apri Console (F12) e cerca errori
- Prova modalità incognito
- Testa da dispositivo diverso

Quali sintomi specifici stai riscontrando?${footer}`,

        booking: `📅 **Supporto Prenotazioni**

Problemi con le prenotazioni:

**✅ Controlli:**
1. Data nel formato corretto (GG/MM/AAAA)
2. Tutti i campi obbligatori compilati
3. Email valida inserita
4. Servizio selezionato

**🔧 Soluzioni:**
- Cancella cache del browser
- Prova con browser diverso
- Verifica email corretta

Che errore specifico vedi?${footer}`,

        website: `🌐 **Supporto Sito Web**

Problemi con il sito:

**🛠️ Diagnostica:**
1. Quale pagina non funziona?
2. Che errore appare?
3. Browser e dispositivo usati?

**🚀 Soluzioni Rapide:**
- Ricarica pagina
- Cancella cache
- Prova browser diverso
- Verifica connessione

Dimmi di più sul problema!${footer}`,
      },
      en: {
        general: `🔧 **Technical Support**

I'll help you solve the problem. Give me more details:

**📋 Useful Information:**
- What browser and device are you using?
- Are there specific error messages?
- When did the problem start?

**🚀 Common Solutions:**
1. Reload page (Ctrl+F5)
2. Clear browser cache
3. Try incognito mode
4. Check internet connection

Describe the problem in detail!${footer}`,

        chatbot: `🤖 **Chatbot Support**

Chatbot problems:

**🔧 Quick Check:**
1. Is JavaScript enabled?
2. Browser updated? (Chrome, Firefox, Safari, Edge)
3. AdBlock disabled?
4. Cookies enabled?

**📱 Diagnostic Tests:**
- Open Console (F12) and look for errors
- Try incognito mode
- Test from different device

What specific symptoms are you experiencing?${footer}`,

        booking: `📅 **Booking Support**

Booking problems:

**✅ Checks:**
1. Date in correct format (DD/MM/YYYY)
2. All required fields completed
3. Valid email entered
4. Service selected

**🔧 Solutions:**
- Clear browser cache
- Try different browser
- Verify correct email

What specific error do you see?${footer}`,

        website: `🌐 **Website Support**

Website problems:

**🛠️ Diagnostics:**
1. Which page isn't working?
2. What error appears?
3. Browser and device used?

**🚀 Quick Solutions:**
- Reload page
- Clear cache
- Try different browser
- Check connection

Tell me more about the problem!${footer}`,
      },
    }

    const langResponses = responses[language]
    const response = langResponses[problemType as keyof typeof langResponses] || langResponses.general

    console.log(`[v0] ✅ Returning ${language} support message for ${problemType} problem`)

    return response
  }

  async manualEscalation(sessionId: string, language: "it" | "en"): Promise<SupportResponse> {
    return await this.escalateToBooking(sessionId, language)
  }

  private async escalateToBooking(sessionId: string, language: "it" | "en"): Promise<SupportResponse> {
    try {
      // Increment escalation count
      const escalationCount = await this.sessionManager.incrementEscalationCount(sessionId)

      // This ensures the booking flow uses the correct Zoho service for technical support
      const bookingData = { service: "Priority Support" }
      await this.sessionManager.updateSession(sessionId, {
        booking_data: bookingData,
      })

      // Activate booking mode
      await this.sessionManager.activateBookingMode(sessionId)

      const escalationMessages = {
        it: `🚨 **ESCALATION SUPPORTO ATTIVATA**

Ti propongo una **consulenza supporto gratuita** per risolvere definitivamente il problema.

**📞 CONSULENZA SUPPORTO GRATUITA:**
✅ Diagnosi completa in tempo reale
✅ Risoluzione immediata del problema  
✅ Supporto personalizzato 1-a-1
✅ Test di funzionamento insieme
✅ Nessun costo - completamente gratuita

**🎯 DISPONIBILITÀ:**
- Lunedì-Venerdì: 9:00-18:00
- Durata: 30 minuti
- Modalità: Videocall o telefono

**Vuoi prenotare la consulenza supporto gratuita?**
Rispondi "sì" per vedere gli orari disponibili.`,

        en: `🚨 **SUPPORT ESCALATION ACTIVATED**

I suggest a **free support consultation** to definitively resolve the problem.

**📞 FREE SUPPORT CONSULTATION:**
✅ Complete real-time diagnosis
✅ Immediate problem resolution
✅ Personalized 1-on-1 support
✅ Functionality testing together
✅ No cost - completely free

**🎯 AVAILABILITY:**
- Monday-Friday: 9:00-18:00
- Duration: 30 minutes
- Mode: Videocall or phone

**Want to book the free support consultation?**
Reply "yes" to see available times.`,
      }

      return {
        message: escalationMessages[language] || escalationMessages.en,
        needsEscalation: true,
        escalated: true,
        attemptCount: escalationCount,
      }
    } catch (error) {
      console.error("❌ Error in escalation:", error)

      const errorMessages = {
        it: "🚨 Errore durante l'escalation. Contattaci direttamente: +39 02 1234567",
        en: "🚨 Error during escalation. Contact us directly: +39 02 1234567",
      }

      return {
        message: errorMessages[language] || errorMessages.en,
        needsEscalation: false,
        escalated: false,
        attemptCount: 0,
      }
    }
  }
}

export async function handleSupportFlow(
  sessionId: string,
  message: string,
  language: "it" | "en",
): Promise<SupportResponse> {
  const supportFlow = new SupportFlow()
  return supportFlow.handleSupportRequest(sessionId, message, language)
}

export function isBookingComplete(session: any): boolean {
  return session?.booking_mode && session?.flow_step === "booking_complete"
}
