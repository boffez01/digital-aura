// in lib/support-flow.ts

// Support Flow with Intelligent Escalation
// Version 244 - Automatic escalation after 3 attempts

import { SessionManager } from "./session-manager"

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

  async handleSupportRequest(sessionId: string, message: string, language = "it"): Promise<SupportResponse> {
    try {
      console.log(`🔧 Processing support request: ${sessionId}`)

      // Get current session
      const session = await this.sessionManager.getSession(sessionId)
      if (!session) {
        throw new Error("Session not found")
      }

      // Activate support mode if not already active
      if (!session.support_mode) {
        await this.sessionManager.activateSupportMode(sessionId)
      }

      // Increment attempt count
      const attemptCount = await this.sessionManager.incrementAttemptCount(sessionId)

      console.log(`📊 Support attempt #${attemptCount} for session ${sessionId}`)

      // Provide support response with booking option always available
      const supportMessage = this.getSupportMessage(message, attemptCount, language)

      return {
        message: supportMessage,
        needsEscalation: false,
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
        message: errorMessages[language as keyof typeof errorMessages] || errorMessages.it,
        needsEscalation: false,
        escalated: false,
        attemptCount: 0,
      }
    }
  }

  private getSupportMessage(message: string, attemptCount: number, language: string): string {
    const lowerMessage = typeof message === "string" ? message.toLowerCase() : ""

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
      it: '\n\n💡 **Vuoi supporto immediato?**\nPrenota una consulenza supporto con il nostro team. Scrivi "prenota supporto" per vedere gli orari disponibili.',
      en: '\n\n💡 **Want immediate support?**\nBook a support consultation with our team. Write "book support" to see available times.',
    }

    const footer = bookingOptionFooter[language as keyof typeof bookingOptionFooter] || bookingOptionFooter.en

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

    const langResponses = responses[language as keyof typeof responses] || responses.en
    const response = langResponses[problemType as keyof typeof langResponses] || langResponses.general

    return response
  }

  async manualEscalation(sessionId: string, language: string): Promise<SupportResponse> {
    return await this.escalateToBooking(sessionId, language)
  }

  private async escalateToBooking(sessionId: string, language: string): Promise<SupportResponse> {
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
        message: escalationMessages[language as keyof typeof escalationMessages] || escalationMessages.en,
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
        message: errorMessages[language as keyof typeof errorMessages] || errorMessages.en,
        needsEscalation: false,
        escalated: false,
        attemptCount: 0,
      }
    }
  }
}

// Export functions for compatibility
export async function handleSupportFlow(sessionId: string, message: string, language = "it"): Promise<SupportResponse> {
  const supportFlow = new SupportFlow()
  return supportFlow.handleSupportRequest(sessionId, message, language)
}

export function isBookingComplete(session: any): boolean {
  return session?.booking_mode && session?.flow_step === "booking_complete"
}
