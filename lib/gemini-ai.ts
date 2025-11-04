"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "")

export async function generateAIResponse(message: string, context = "", language: "it" | "en" = "en"): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const systemPrompt =
      language === "it"
        ? `Sei AuraBot, l'assistente AI di Praxis Futura. Sei professionale, amichevole e competente. 
         Praxis Futura offre servizi di:
         - AI Services: Automazione e chatbot intelligenti
         - Web Development: Siti web moderni ed e-commerce
         - AI Marketing: Campagne automatizzate
         - Bookings: Consulenze gratuite
         
         Rispondi in modo conciso e utile. ${context}`
        : `You are AuraBot, Praxis Futura's AI assistant. You are professional, friendly, and knowledgeable.
         Praxis Futura offers:
         - AI Services: Automation and intelligent chatbots
         - Web Development: Modern websites and e-commerce
         - AI Marketing: Automated campaigns
         - Bookings: Free consultations
         
         Respond concisely and helpfully. ${context}`

    const prompt = `${systemPrompt}\n\nUser: ${message}\nAssistant:`

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error("[v0] Gemini AI error:", error)
    return language === "it"
      ? "Mi dispiace, si è verificato un errore. Riprova tra poco."
      : "Sorry, an error occurred. Please try again shortly."
  }
}
