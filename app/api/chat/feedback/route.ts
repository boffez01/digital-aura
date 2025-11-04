import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { messageId, feedback, timestamp } = body

    // Log del feedback per miglioramento continuo
    console.log(`📊 Feedback ricevuto:`, {
      messageId,
      feedback,
      timestamp,
      userAgent: request.headers.get("user-agent"),
    })

    // Qui potresti salvare il feedback in un database per analisi
    // await saveFeedbackToDatabase({ messageId, feedback, timestamp })

    return NextResponse.json({
      success: true,
      message: "Feedback ricevuto con successo",
    })
  } catch (error) {
    console.error("Errore nel salvare il feedback:", error)
    return NextResponse.json({
      success: false,
      error: "Errore nel processare il feedback",
    })
  }
}
