// Gemini AI with 3-second timeout and zero retries
// Version 245 - STRICT language enforcement and service list

import { GoogleGenerativeAI } from "@google/generative-ai"

export interface AIResponse {
  success: boolean
  message: string
  error?: string
  fallback?: boolean
}

export class GeminiAI {
  private genAI: GoogleGenerativeAI | null
  private model: any | null
  private readonly TIMEOUT = 3000 // 3 seconds timeout
  private readonly MAX_RETRIES = 0 // Zero retries for 503 errors

  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      console.warn("⚠️ GEMINI_API_KEY not found - AI responses will use fallback")
      this.genAI = null
      this.model = null
      return
    }

    try {
      this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
      this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
      console.log("✅ Gemini AI initialized successfully")
    } catch (error) {
      console.error("❌ Failed to initialize Gemini AI:", error)
      this.genAI = null
      this.model = null
    }
  }

  async generateResponse(prompt: string, context: any = {}, language = "it"): Promise<AIResponse> {
    if (!this.model) {
      console.log("🚫 Gemini AI not available - using fallback")
      return this.getFallbackResponse(prompt, context, language)
    }

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
      it: `Sei AuraBot, l'assistente AI di Digital Aura, specializzato nel gestire prenotazioni e informazioni.

**REGOLA OBBLIGATORIA #1: Rispondi SEMPRE E SOLO in italiano.** Non usare MAI l'inglese o altre lingue.
**REGOLA OBBLIGATORIA #2: NON menzionare MAI "preventivi" o "quotes". Offriamo solo CONSULENZE GRATUITE.**

**CONTESTO SESSIONE:**
- Modalità supporto: ${context.support_mode ? "ATTIVA" : "inattiva"}
- Modalità prenotazione: ${context.booking_mode ? "ATTIVA" : "inattiva"}  
- Step corrente: ${context.flow_step || "iniziale"}

**SERVIZI DISPONIBILI (elenca SOLO questi):**
1. AI Automation - Automazione processi aziendali
2. Chatbot Intelligenti - Assistenti AI personalizzati
3. Web Development - Siti web moderni e applicazioni
4. AI Marketing - Campagne automatizzate e analisi

**ISTRUZIONI:**
1. Rispondi SEMPRE in italiano, mai in inglese
2. Sii professionale ma amichevole
3. Se l'utente vuole prenotare, guidalo passo dopo passo
4. Menziona solo i 4 servizi elencati sopra
5. NON parlare mai di "preventivi" - offriamo CONSULENZE GRATUITE
6. Sii conciso ma completo (max 150 parole)
7. Usa emoji per rendere la conversazione più piacevole

Richiesta dell'utente: ${prompt}`,

      en: `You are AuraBot, Digital Aura's AI assistant, specialized in handling bookings and information.

**MANDATORY RULE #1: Always and ONLY respond in English.** NEVER use Italian or other languages.
**MANDATORY RULE #2: NEVER mention "quotes" or "preventivi". We only offer FREE CONSULTATIONS.**

**SESSION CONTEXT:**
- Support mode: ${context.support_mode ? "ACTIVE" : "inactive"}
- Booking mode: ${context.booking_mode ? "ACTIVE" : "inactive"}
- Current step: ${context.flow_step || "initial"}

**AVAILABLE SERVICES (list ONLY these):**
1. AI Automation - Business process automation
2. Intelligent Chatbots - Personalized AI assistants
3. Web Development - Modern websites and applications
4. AI Marketing - Automated campaigns and analytics

**INSTRUCTIONS:**
1. Always respond in English, never in Italian
2. Be professional but friendly
3. If user wants to book, guide them step by step
4. Only mention the 4 services listed above
5. NEVER talk about "quotes" - we offer FREE CONSULTATIONS
6. Be concise but complete (max 150 words)
7. Use emojis to make conversation pleasant

User request: ${prompt}`,
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

Ti aiuto a prenotare una consulenza gratuita!

**🎯 Servizi disponibili:**
1. 🤖 AI Automation - Automazione processi
2. 💬 Chatbot Intelligenti - Assistenti AI
3. 🌐 Web Development - Siti e applicazioni
4. 📈 AI Marketing - Campagne automatizzate

**📋 Per prenotare ti serve:**
- Servizio desiderato
- Data preferita
- Orario preferito
- Email e telefono

Quale servizio ti interessa? 😊`,

      en: `📅 **BOOKING ASSISTANT**

I'll help you book a free consultation!

**🎯 Available services:**
1. 🤖 AI Automation - Process automation
2. 💬 Intelligent Chatbots - AI assistants
3. 🌐 Web Development - Websites and apps
4. 📈 AI Marketing - Automated campaigns

**📋 To book you need:**
- Desired service
- Preferred date
- Preferred time
- Email and phone

Which service interests you? 😊`,
    }

    return {
      success: true,
      message: responses[language as keyof typeof responses] || responses.it,
      fallback: true,
    }
  }

  private getGeneralFallback(prompt: string, language: string): AIResponse {
    const responses = {
      it: `👋 **Ciao! Sono AuraBot di Digital Aura**

Posso aiutarti con:

**🤖 Servizi AI:**
- 🔄 AI Automation - Automazione processi
- 💬 Chatbot Intelligenti - Assistenti AI
- 🎯 Soluzioni personalizzate

**🌐 Sviluppo Web:**
- 🖥️ Siti web moderni
- 🛒 E-commerce
- 📱 Applicazioni web

**📈 AI Marketing:**
- 🎯 Campagne automatizzate
- 📊 Analisi dati
- 🚀 Ottimizzazione conversioni

**📅 Prenota Consulenza Gratuita:**
Offriamo consulenze gratuite per valutare il tuo progetto!

Come posso aiutarti oggi? 😊`,

      en: `👋 **Hi! I'm AuraBot from Digital Aura**

I can help you with:

**🤖 AI Services:**
- 🔄 AI Automation - Process automation
- 💬 Intelligent Chatbots - AI assistants
- 🎯 Custom solutions

**🌐 Web Development:**
- 🖥️ Modern websites
- 🛒 E-commerce
- 📱 Web applications

**📈 AI Marketing:**
- 🎯 Automated campaigns
- 📊 Data analysis
- 🚀 Conversion optimization

**📅 Book Free Consultation:**
We offer free consultations to evaluate your project!

How can I help you today? 😊`,
    }

    return {
      success: true,
      message: responses[language as keyof typeof responses] || responses.it,
      fallback: true,
    }
  }
}
