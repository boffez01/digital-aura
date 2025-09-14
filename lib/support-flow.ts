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

      // Check if escalation is needed (after 3 attempts)
      if (attemptCount >= 3) {
        console.log(`🚨 Escalation triggered for session ${sessionId}`)
        return await this.escalateToBooking(sessionId, language)
      }

      // Provide support response based on attempt count
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
    const lowerMessage = message.toLowerCase()

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

    const responses = {
      it: {
        chatbot: {
          1: `🤖 **SUPPORTO CHATBOT - Tentativo 1/3**

Problemi comuni con il chatbot:

**🔧 Soluzioni Immediate:**
1. Ricarica la pagina (Ctrl+F5)
2. Cancella cache del browser
3. Disabilita AdBlock temporaneamente

**📱 Verifica Compatibilità:**
- Browser supportati: Chrome, Firefox, Safari, Edge
- JavaScript deve essere abilitato
- Connessione internet stabile

Il problema persiste? Dimmi di più!`,

          2: `🤖 **SUPPORTO CHATBOT - Tentativo 2/3**

Soluzioni avanzate:

**🛠️ Diagnostica Avanzata:**
1. Apri Console Sviluppatore (F12)
2. Vai su "Console" e cerca errori in rosso
3. Prova modalità incognito/privata
4. Disabilita estensioni del browser

**🔍 Controlli Specifici:**
- Cookies abilitati?
- Firewall aziendale attivo?
- Antivirus che blocca JavaScript?

Condividi eventuali messaggi di errore che vedi!`,

          3: `🤖 **SUPPORTO CHATBOT - Tentativo 3/3**

Sembra un problema complesso. 

**🚨 Escalation Automatica**
Ti propongo una chiamata tecnica gratuita con il nostro team per risolvere definitivamente il problema.

**📞 Vantaggi della chiamata:**
- Diagnosi in tempo reale
- Risoluzione immediata
- Supporto personalizzato
- Nessun costo

**Vuoi prenotare una chiamata tecnica?** 
Rispondi "sì" per procedere con la prenotazione.`,
        },
        booking: {
          1: `📅 **SUPPORTO PRENOTAZIONI - Tentativo 1/3**

Problemi con le prenotazioni:

**✅ Controlli Base:**
1. Data nel formato corretto (GG/MM/AAAA)
2. Orario disponibile selezionato
3. Tutti i campi obbligatori compilati
4. Email valida inserita

**🔧 Soluzioni Rapide:**
- Riprova con una data diversa
- Verifica formato email
- Controlla connessione internet

Che errore specifico vedi?`,

          2: `📅 **SUPPORTO PRENOTAZIONI - Tentativo 2/3**

Soluzioni avanzate per prenotazioni:

**🛠️ Controlli Tecnici:**
1. Cancella cache del browser
2. Prova con browser diverso
3. Disabilita estensioni
4. Verifica JavaScript abilitato

**📋 Dati Richiesti:**
- Nome e cognome completi
- Email valida e attiva
- Numero di telefono
- Tipo di servizio desiderato

Hai compilato tutti i campi correttamente?`,

          3: `📅 **SUPPORTO PRENOTAZIONI - Tentativo 3/3**

Il problema sembra persistere.

**🚨 Escalation Automatica**
Ti propongo una chiamata diretta per completare la prenotazione insieme e risolvere il problema tecnico.

**📞 Vantaggi:**
- Prenotazione assistita
- Risoluzione immediata
- Supporto personalizzato
- Conferma istantanea

**Vuoi che ti chiamiamo per completare la prenotazione?**
Rispondi "sì" per procedere.`,
        },
        general: {
          1: `🔧 **SUPPORTO TECNICO - Tentativo 1/3**

Ti aiuto a risolvere il problema:

**📋 Informazioni Utili:**
- Che browser stai usando?
- Che dispositivo (PC, tablet, smartphone)?
- Ci sono messaggi di errore specifici?
- Quando è iniziato il problema?

**🚀 Soluzioni Comuni:**
1. Ricarica la pagina
2. Cancella cache del browser
3. Prova modalità incognito
4. Verifica connessione internet

Dimmi di più sul problema specifico!`,

          2: `🔧 **SUPPORTO TECNICO - Tentativo 2/3**

Approfondiamo la diagnosi:

**🛠️ Controlli Avanzati:**
1. Disabilita estensioni del browser
2. Controlla impostazioni firewall
3. Verifica antivirus non blocchi il sito
4. Prova da rete diversa (hotspot mobile)

**📱 Test Compatibilità:**
- Prova da dispositivo diverso
- Testa con browser alternativo
- Verifica versione browser aggiornata

Il problema si presenta sempre o solo a volte?`,

          3: `🔧 **SUPPORTO TECNICO - Tentativo 3/3**

Problema complesso rilevato.

**🚨 Escalation Automatica**
Ti propongo una sessione di supporto tecnico personalizzata per risolvere definitivamente il problema.

**📞 Supporto Dedicato:**
- Diagnosi remota completa
- Risoluzione step-by-step
- Test di funzionamento
- Prevenzione futuri problemi

**Vuoi prenotare una sessione di supporto tecnico?**
Rispondi "sì" per procedere con la prenotazione.`,
        },
      },
      en: {
        chatbot: {
          1: `🤖 **CHATBOT SUPPORT - Attempt 1/3**

Common chatbot issues:

**🔧 Immediate Solutions:**
1. Reload page (Ctrl+F5)
2. Clear browser cache
3. Temporarily disable AdBlock

**📱 Compatibility Check:**
- Supported browsers: Chrome, Firefox, Safari, Edge
- JavaScript must be enabled
- Stable internet connection required

Problem persists? Tell me more!`,

          2: `🤖 **CHATBOT SUPPORT - Attempt 2/3**

Advanced solutions:

**🛠️ Advanced Diagnostics:**
1. Open Developer Console (F12)
2. Go to "Console" and look for red errors
3. Try incognito/private mode
4. Disable browser extensions

**🔍 Specific Checks:**
- Cookies enabled?
- Corporate firewall active?
- Antivirus blocking JavaScript?

Share any error messages you see!`,

          3: `🤖 **CHATBOT SUPPORT - Attempt 3/3**

This seems like a complex issue.

**🚨 Automatic Escalation**
I suggest a free technical call with our team to definitively resolve the problem.

**📞 Call Benefits:**
- Real-time diagnosis
- Immediate resolution
- Personalized support
- No cost

**Want to book a technical call?**
Reply "yes" to proceed with booking.`,
        },
        booking: {
          1: `📅 **BOOKING SUPPORT - Attempt 1/3**

Booking problems:

**✅ Basic Checks:**
1. Date in correct format (DD/MM/YYYY)
2. Available time slot selected
3. All required fields completed
4. Valid email entered

**🔧 Quick Solutions:**
- Try a different date
- Verify email format
- Check internet connection

What specific error do you see?`,

          2: `📅 **BOOKING SUPPORT - Attempt 2/3**

Advanced booking solutions:

**🛠️ Technical Checks:**
1. Clear browser cache
2. Try different browser
3. Disable extensions
4. Verify JavaScript enabled

**📋 Required Data:**
- Full name
- Valid and active email
- Phone number
- Desired service type

Have you filled all fields correctly?`,

          3: `📅 **BOOKING SUPPORT - Attempt 3/3**

The problem seems to persist.

**🚨 Automatic Escalation**
I suggest a direct call to complete the booking together and resolve the technical issue.

**📞 Benefits:**
- Assisted booking
- Immediate resolution
- Personalized support
- Instant confirmation

**Want us to call you to complete the booking?**
Reply "yes" to proceed.`,
        },
        general: {
          1: `🔧 **TECHNICAL SUPPORT - Attempt 1/3**

I'll help you solve the problem:

**📋 Useful Information:**
- What browser are you using?
- What device (PC, tablet, smartphone)?
- Are there specific error messages?
- When did the problem start?

**🚀 Common Solutions:**
1. Reload the page
2. Clear browser cache
3. Try incognito mode
4. Check internet connection

Tell me more about the specific problem!`,

          2: `🔧 **TECHNICAL SUPPORT - Attempt 2/3**

Let's deepen the diagnosis:

**🛠️ Advanced Checks:**
1. Disable browser extensions
2. Check firewall settings
3. Verify antivirus isn't blocking the site
4. Try from different network (mobile hotspot)

**📱 Compatibility Test:**
- Try from different device
- Test with alternative browser
- Verify browser version is updated

Does the problem occur always or sometimes?`,

          3: `🔧 **TECHNICAL SUPPORT - Attempt 3/3**

Complex problem detected.

**🚨 Automatic Escalation**
I suggest a personalized technical support session to definitively resolve the problem.

**📞 Dedicated Support:**
- Complete remote diagnosis
- Step-by-step resolution
- Functionality testing
- Future problem prevention

**Want to book a technical support session?**
Reply "yes" to proceed with booking.`,
        },
      },
    }

    const langResponses = responses[language as keyof typeof responses] || responses.it
    const typeResponses = langResponses[problemType as keyof typeof langResponses] || langResponses.general

    return typeResponses[attemptCount as keyof typeof typeResponses] || typeResponses[1]
  }

  private async escalateToBooking(sessionId: string, language: string): Promise<SupportResponse> {
    try {
      // Increment escalation count
      const escalationCount = await this.sessionManager.incrementEscalationCount(sessionId)

      // Activate booking mode
      await this.sessionManager.activateBookingMode(sessionId)

      const escalationMessages = {
        it: `🚨 **ESCALATION AUTOMATICA ATTIVATA**

Dopo 3 tentativi di supporto, ti propongo una **chiamata tecnica gratuita** per risolvere definitivamente il problema.

**📞 CHIAMATA TECNICA GRATUITA:**
✅ Diagnosi completa in tempo reale
✅ Risoluzione immediata del problema  
✅ Supporto personalizzato 1-a-1
✅ Test di funzionamento insieme
✅ Nessun costo - completamente gratuita

**🎯 DISPONIBILITÀ:**
- Lunedì-Venerdì: 9:00-18:00
- Durata: 15-30 minuti
- Modalità: Videocall o telefono

**Vuoi prenotare la chiamata tecnica gratuita?**
Rispondi "sì" per vedere gli orari disponibili.`,

        en: `🚨 **AUTOMATIC ESCALATION ACTIVATED**

After 3 support attempts, I suggest a **free technical call** to definitively resolve the problem.

**📞 FREE TECHNICAL CALL:**
✅ Complete real-time diagnosis
✅ Immediate problem resolution
✅ Personalized 1-on-1 support
✅ Functionality testing together
✅ No cost - completely free

**🎯 AVAILABILITY:**
- Monday-Friday: 9:00-18:00
- Duration: 15-30 minutes
- Mode: Videocall or phone

**Want to book the free technical call?**
Reply "yes" to see available times.`,
      }

      return {
        message: escalationMessages[language as keyof typeof escalationMessages] || escalationMessages.it,
        needsEscalation: true,
        escalated: true,
        attemptCount: 3,
      }
    } catch (error) {
      console.error("❌ Error in escalation:", error)

      const errorMessages = {
        it: "🚨 Errore durante l'escalation. Contattaci direttamente: +39 02 1234567",
        en: "🚨 Error during escalation. Contact us directly: +39 02 1234567",
      }

      return {
        message: errorMessages[language as keyof typeof errorMessages] || errorMessages.it,
        needsEscalation: false,
        escalated: false,
        attemptCount: 3,
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
