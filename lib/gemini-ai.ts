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
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY

    if (!apiKey) {
      console.warn("⚠️ GEMINI_API_KEY or GOOGLE_GENERATIVE_AI_API_KEY not found - AI responses will use fallback")
      this.genAI = null
      this.model = null
      return
    }

    try {
      this.genAI = new GoogleGenerativeAI(apiKey)
      this.model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" })
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

  // ===== CODICE MODIFICATO =====
  private buildPrompt(prompt: string, context: any, language: string): string {
    // 1. Recupera la Knowledge Base dal contesto
    const knowledgeBase = context.knowledgeBase || ""

    const systemPrompts = {
      it: `Sei PraxisBot, un assistente AI per Praxis Futura.
      
${knowledgeBase}

**REGOLA CRITICA E OBBLIGATORIA:**
**DEVI RISPONDERE SEMPRE E SOLO IN ITALIANO.** Non usare MAI un'altra lingua.

**ISTRUZIONI:**
1. Sii professionale, amichevole e conciso.
2. Usa le informazioni fornite sopra (prezzi, orari, servizi) per rispondere.
3. Se l'utente vuole prenotare, incoraggialo a scrivere "prenota".
4. **NON menzionare mai 'preventivi' (quotes) generici se hai i prezzi sopra.**

Domanda utente: ${prompt}`,

      en: `You are PraxisBot, an AI assistant for Praxis Futura.

${knowledgeBase}

**CRITICAL AND MANDATORY RULE:**
**YOU MUST ALWAYS AND ONLY RESPOND IN ENGLISH.** Never use any other language.

**INSTRUCTIONS:**
1. Be professional, friendly, and concise.
2. Use the information provided above (prices, hours, services) to respond.
3. If the user wants to book, encourage them to write "book".
4. **NEVER mention generic 'quotes' if you have prices above.**

User question: ${prompt}`,
    }

    // Se la lingua passata non esiste (es. hai passato il prompt per sbaglio), usa IT
    return systemPrompts[language as keyof typeof systemPrompts] || systemPrompts.it
  }
  // ===== FINE CODICE MODIFICATO =====

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
      it: `👋 **Ciao! Sono PraxisBot di Praxis Futura**

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

      en: `👋 **Hi! I'm PraxisBot from Praxis Futura**

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
