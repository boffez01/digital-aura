// Analisi della conversazione del chatbot - Problemi identificati

const conversationLog = {
  // Problema 1: Il bot non riconosce "voglio prenotare" come intent di booking
  issue1: {
    userMessage: "voglio prenotare",
    botResponse: "❌ Servizio non riconosciuto", // ERRORE: dovrebbe avviare booking
    expectedResponse: "📅 PRENOTAZIONE CONSULENZA GRATUITA - Scegli servizio 1-4",
  },

  // Problema 2: Parsing errato dei dati utente
  issue2: {
    userMessage: "harshpreet singh, qwert@gmail.com, 3500216480",
    botParsing: {
      name: "harshpreet singh, qwert@gmail.com, 3500216480", // ERRORE: tutto in un campo
      email: "harshpreet singh, qwert@gmail.com, 3500216480", // ERRORE: stesso valore
      phone: "harshpreet singh, qwert@gmail.com, 3500216480", // ERRORE: stesso valore
    },
    expectedParsing: {
      name: "harshpreet singh",
      email: "qwert@gmail.com",
      phone: "3500216480",
    },
  },

  // Problema 3: "Modifica" riavvia tutto invece di chiedere cosa modificare
  issue3: {
    userMessage: "modifica",
    botResponse: "📅 PRENOTAZIONE CONSULENZA GRATUITA - Scegli servizio...", // ERRORE: restart completo
    expectedResponse: "Cosa vuoi modificare? (data, orario, dati personali)",
  },

  // Problema 4: Loop nel supporto tecnico
  issue4: {
    userMessage: "ho un problema",
    botResponse: "🔧 Supporto Tecnico Attivato - Che problema hai?",
    userFollowUp: "il chatbot non funziona",
    botResponse: "🔧 Supporto Tecnico Attivato - Che problema hai?", // ERRORE: stesso messaggio
    expectedResponse: "Ho capito, problema con il chatbot. Ti aiuto subito...",
  },
}

// Soluzioni da implementare
const solutions = {
  solution1: "Migliorare intent detection per 'voglio prenotare', 'prenota', 'prenotazione'",
  solution2: "Parsing intelligente dei dati: regex per email, split per virgole e newline",
  solution3: "Step 'ask_modification' per gestire modifiche specifiche",
  solution4: "Context awareness nel supporto per evitare loop",
}
