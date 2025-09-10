// Gemini AI with 3-second timeout and zero retries
// Version 244 - Robust AI with intelligent fallback

import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export interface AIResponse {
  success: boolean
  message: string
  error?: string
  fallback?: boolean
}

export class GeminiAI {
  private model: any
  private readonly TIMEOUT = 3000 // 3 seconds timeout
  private readonly MAX_RETRIES = 0 // Zero retries for 503 errors

  constructor() {
    this.model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
  }

  async generateResponse(prompt: string, context: any = {}, language = "it"): Promise<AIResponse> {
    try {
      console.log("🤖 Gemini AI request started")

      const enhancedPrompt = this.buildPrompt(prompt, context, language)

      // Create timeout promise
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("TIMEOUT")), this.TIMEOUT)
      })

      // Race between AI response and timeout
      const responsePromise = this.model.generateContent(enhancedPrompt)

      const result = await Promise.race([responsePromise, timeoutPromise])
      const response = await result.response
      const text = response.text()

      console.log("✅ Gemini AI response received")

      return {
        success: true,
        message: text.trim(),
        fallback: false,
      }
    } catch (error: any) {
      console.error("❌ Gemini AI error:", error.message)

      // Check for specific error types
      if (error.message === "TIMEOUT") {
        console.log("⏰ Gemini timeout - using fallback")
        return this.getFallbackResponse(prompt, context, language)
      }

      if (error.message?.includes("503") || error.message?.includes("overloaded")) {
        console.log("🚫 Gemini overloaded - using fallback (no retry)")
        return this.getFallbackResponse(prompt, context, language)
      }

      // For other errors, still use fallback
      return this.getFallbackResponse(prompt, context, language)
    }
  }

  private buildPrompt(prompt: string, context: any, language: string): string {
    const systemPrompts = {
      it: `Sei l'assistente AI di Digital Aura, azienda specializzata in soluzioni AI e automazione.

CONTESTO SESSIONE:
- Modalità supporto: ${context.support_mode ? "ATTIVA" : "inattiva"}
- Modalità prenotazione: ${context.booking_mode ? "ATTIVA" : "inattiva"}  
- Step corrente: ${context.flow_step || "iniziale"}
- Tentativi supporto: ${context.attempt_count || 0}
- Escalation: ${context.escalation_count || 0}

ISTRUZIONI:
1. Rispondi sempre in italiano professionale ma amichevole
2. Se in modalità supporto, fornisci soluzioni tecniche dettagliate
3. Se in modalità prenotazione, guida nel processo di booking
4. Mantieni il focus sul problema specifico dell'utente
5. Sii conciso ma completo (max 200 parole)

SERVIZI DISPONIBILI:
- AI Automation
- Chatbots Intelligenti  
- Web Development
- AI Marketing

Domanda utente: ${prompt}`,

      en: `You are Digital Aura's AI assistant, a company specialized in AI solutions and automation.

SESSION CONTEXT:
- Support mode: ${context.support_mode ? "ACTIVE" : "inactive"}
- Booking mode: ${context.booking_mode ? "ACTIVE" : "inactive"}
- Current step: ${context.flow_step || "initial"}
- Support attempts: ${context.attempt_count || 0}
- Escalations: ${context.escalation_count || 0}

INSTRUCTIONS:
1. Always respond in professional but friendly English
2. If in support mode, provide detailed technical solutions
3. If in booking mode, guide through the booking process
4. Keep focus on user's specific problem
5. Be concise but complete (max 200 words)

AVAILABLE SERVICES:
- AI Automation
- Intelligent Chatbots
- Web Development  
- AI Marketing

User question: ${prompt}`,
    }

    return systemPrompts[language as keyof typeof systemPrompts] || systemPrompts.it
  }

  private getFallbackResponse(prompt: string, context: any, language: string): AIResponse {
    const lowerPrompt = prompt.toLowerCase()

    // Intelligent fallback based on context and keywords
    if (context.support_mode) {
      return this.getSupportFallback(lowerPrompt, language)
    }

    if (context.booking_mode) {
      return this.getBookingFallback(lowerPrompt, language)
    }

    return this.getGeneralFallback(lowerPrompt, language)
  }

  private getSupportFallback(prompt: string, language: string): AIResponse {
    const responses = {
      it: {
        chatbot: `🤖 **SUPPORTO TECNICO CHATBOT**

Problemi comuni e soluzioni:

**🔧 Soluzioni Immediate:**
1. Ricarica la pagina (Ctrl+F5)
2. Cancella cache del browser
3. Disabilita AdBlock temporaneamente

**🛠️ Controlli Avanzati:**
- Verifica JavaScript abilitato
- Prova modalità incognito
- Controlla console errori (F12)

Hai provato questi passaggi?`,

        booking: `📅 **SUPPORTO PRENOTAZIONI**

Problemi con le prenotazioni:

**✅ Controlli Base:**
1. Data formato YYYY-MM-DD
2. Orario disponibile
3. Tutti i campi compilati

**🔧 Soluzioni:**
- Riprova con data diversa
- Verifica formato email
- Controlla connessione

Il problema persiste?`,

        general: `🔧 **SUPPORTO TECNICO**

Ti aiuto a risolvere il problema:

**📋 Informazioni utili:**
- Descrivi il problema dettagliatamente
- Che browser stai usando?
- Ci sono messaggi di errore?

**🚀 Soluzioni comuni:**
1. Ricarica pagina
2. Cancella cache
3. Prova browser diverso

Dimmi di più sul problema!`,
      },
      en: {
        chatbot: `🤖 **CHATBOT TECHNICAL SUPPORT**

Common problems and solutions:

**🔧 Immediate Solutions:**
1. Reload page (Ctrl+F5)
2. Clear browser cache
3. Temporarily disable AdBlock

**🛠️ Advanced Checks:**
- Verify JavaScript enabled
- Try incognito mode
- Check error console (F12)

Have you tried these steps?`,

        booking: `📅 **BOOKING SUPPORT**

Booking problems:

**✅ Basic Checks:**
1. Date format YYYY-MM-DD
2. Available time slot
3. All fields completed

**🔧 Solutions:**
- Try different date
- Verify email format
- Check connection

Does the problem persist?`,

        general: `🔧 **TECHNICAL SUPPORT**

I'll help you solve the problem:

**📋 Useful information:**
- Describe the problem in detail
- What browser are you using?
- Are there error messages?

**🚀 Common solutions:**
1. Reload page
2. Clear cache
3. Try different browser

Tell me more about the problem!`,
      },
    }

    const langResponses = responses[language as keyof typeof responses] || responses.it

    let responseKey = "general"
    if (prompt.includes("chatbot") || prompt.includes("bot")) responseKey = "chatbot"
    if (prompt.includes("prenotaz") || prompt.includes("booking")) responseKey = "booking"

    return {
      success: true,
      message: langResponses[responseKey as keyof typeof langResponses],
      fallback: true,
    }
  }

  private getBookingFallback(prompt: string, language: string): AIResponse {
    const responses = {
      it: `📅 **ASSISTENTE PRENOTAZIONI**

Ti aiuto a prenotare un appuntamento:

**🎯 Servizi disponibili:**
- AI Automation
- Chatbots Intelligenti
- Web Development
- AI Marketing

**📋 Informazioni necessarie:**
1. Servizio desiderato
2. Data preferita
3. Orario preferito
4. Dati di contatto

Per quale servizio vorresti prenotare?`,

      en: `📅 **BOOKING ASSISTANT**

I'll help you book an appointment:

**🎯 Available services:**
- AI Automation
- Intelligent Chatbots
- Web Development
- AI Marketing

**📋 Required information:**
1. Desired service
2. Preferred date
3. Preferred time
4. Contact details

Which service would you like to book?`,
    }

    return {
      success: true,
      message: responses[language as keyof typeof responses] || responses.it,
      fallback: true,
    }
  }

  private getGeneralFallback(prompt: string, language: string): AIResponse {
    const responses = {
      it: `👋 **Ciao! Sono l'assistente di Digital Aura**

Posso aiutarti con:

**🤖 Servizi AI:**
- Automazione processi
- Chatbots intelligenti
- Soluzioni personalizzate

**🌐 Sviluppo Web:**
- Siti web moderni
- E-commerce
- Applicazioni web

**📈 Marketing AI:**
- Campagne automatizzate
- Analisi dati
- Ottimizzazione conversioni

**📅 Prenotazioni:**
- Consulenze gratuite
- Demo personalizzate
- Supporto tecnico

Come posso aiutarti oggi?`,

      en: `👋 **Hi! I'm Digital Aura's assistant**

I can help you with:

**🤖 AI Services:**
- Process automation
- Intelligent chatbots
- Custom solutions

**🌐 Web Development:**
- Modern websites
- E-commerce
- Web applications

**📈 AI Marketing:**
- Automated campaigns
- Data analysis
- Conversion optimization

**📅 Bookings:**
- Free consultations
- Custom demos
- Technical support

How can I help you today?`,
    }

    return {
      success: true,
      message: responses[language as keyof typeof responses] || responses.it,
      fallback: true,
    }
  }
}
