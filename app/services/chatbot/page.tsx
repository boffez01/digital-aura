"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Clock, Target, Play, XCircle, CheckCircle2, Calendar, Database, Globe, ArrowRight } from "lucide-react"
import Link from "next/link"
import Navbar from "../../components/navbar"
import ServiceNavbar from "../../components/service-navbar"
import ChatbotWidget from "../../components/chatbot-widget"

export default function ChatbotPage() {
  const features = [
    { icon: <MessageSquare className="h-8 w-8" />, title: "Chat & Voce", description: "Un'unica intelligenza che gestisce sia le chat sul sito che le telefonate in arrivo.", color: "text-blue-400", bgColor: "bg-blue-900/20" },
    { icon: <Clock className="h-8 w-8" />, title: "Risposte Istantanee", description: "Niente più 'Ti faremo sapere'. Il bot risponde, spiega e convince in tempo reale.", color: "text-green-400", bgColor: "bg-green-900/20" },
    { icon: <Target className="h-8 w-8" />, title: "Conversione Lead", description: "Trasforma i visitatori anonimi in contatti qualificati chiedendo le cose giuste.", color: "text-orange-400", bgColor: "bg-orange-900/20" },
  ]

  const integrations = [
    { name: "Google Calendar", icon: <Calendar className="w-6 h-6" /> },
    { name: "WhatsApp Business", icon: <MessageSquare className="w-6 h-6" /> },
    { name: "HubSpot / Salesforce", icon: <Database className="w-6 h-6" /> },
    { name: "Sito Web & E-commerce", icon: <Globe className="w-6 h-6" /> },
  ]

  const scenarios = [
    {
      title: "Chatbot Sito Web",
      icon: <MessageSquare className="w-6 h-6 text-blue-400" />,
      role: "Assistente Commerciale",
      context: "Visitatore sul Sito",
      dialogue: [
        { role: "bot", text: "Ciao! 👋 Vedo che stai guardando i nostri servizi. Hai bisogno di un preventivo rapido?" },
        { role: "user", text: "Sì, vorrei capire i costi." },
        { role: "bot", text: "Dipende dal progetto. Se mi dici il tuo settore, ti do una stima subito." },
        { role: "user", text: "Immobiliare." },
        { role: "bot", text: "Perfetto. Per le agenzie abbiamo pacchetti da 2k. Vuoi vedere una demo?" }
      ]
    },
    {
      title: "Voice Receptionist",
      icon: <Calendar className="w-6 h-6 text-green-400" />,
      role: "Segretaria Telefonica",
      context: "Chiamata in Entrata",
      dialogue: [
        { role: "bot", text: "Buongiorno, Studio Rossi. Sono l'assistente virtuale. Come posso aiutarla?" },
        { role: "user", text: "Vorrei prenotare una visita di controllo." },
        { role: "bot", text: "Certamente. Ho disponibilità domani alle 15 o giovedì alle 10. Cosa preferisce?" },
        { role: "user", text: "Giovedì va bene." },
        { role: "bot", text: "Segnato per Giovedì ore 10. Le ho inviato un SMS di conferma." }
      ]
    },
    {
      title: "Supporto WhatsApp",
      icon: <Target className="w-6 h-6 text-purple-400" />,
      role: "Customer Care",
      context: "Chat WhatsApp",
      dialogue: [
        { role: "user", text: "Il mio ordine #12345 non è arrivato." },
        { role: "bot", text: "Controllo subito... 📦 Il pacco risulta in consegna oggi con Bartolini." },
        { role: "user", text: "Ah ottimo, grazie!" },
        { role: "bot", text: "Di nulla! Se non arriva entro le 18, scrivimi pure qui. Altro?" }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <ServiceNavbar currentService="chatbot" />

      {/* HERO SECTION */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto max-w-7xl text-center">
          <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2">
            Chatbot & Voice AI
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Chatbot e Segreteria AI:<br />
            <span className="text-blue-400">Il Tuo Team H24.</span>
          </h1>
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Smetti di perdere clienti con form statici noiosi o telefoni che squillano a vuoto.
            I nostri <strong>Chatbot Intelligenti</strong> e <strong>Assistenti Vocali</strong> dialogano con i visitatori, rispondono alle domande e fissano appuntamenti in autonomia. <br />
            Su Sito Web, WhatsApp e Telefono.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <Link href="/appointments">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-blue-500/25 transition-all">
                Voglio una Demo Live
              </Button>
            </Link>
          </div>

          {/* VIDEO DEMO REALE */}
          <div className="max-w-4xl mx-auto mt-8 bg-slate-800/50 p-2 rounded-3xl border border-slate-700">
            <div className="text-center mb-6 pt-4">
              <h3 className="text-2xl font-bold text-white">Ascolta la Differenza 🎧</h3>
              <p className="text-slate-400 text-sm">Registrazione reale: Nessuno script, solo AI.</p>
            </div>
            
            <div className="aspect-video rounded-2xl overflow-hidden bg-black relative flex items-center justify-center group cursor-pointer">
              {/* Sostituisci questo div con il tuo iframe quando hai il video */}
              <div className="text-center group-hover:scale-105 transition-transform">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 pl-1 shadow-2xl">
                  <Play className="w-8 h-8 text-white fill-current" />
                </div>
                <p className="text-slate-500 font-mono">Demo Video (In arrivo)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONFRONTO BRUTALE */}
      <section className="py-20 px-6 bg-slate-900">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Il Vecchio Modo vs Il Nuovo Modo</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* The Old Way */}
            <Card className="bg-red-900/10 border-red-900/50">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <XCircle className="w-8 h-8 text-red-500" />
                  <h3 className="text-2xl font-bold text-white">Form & Segreteria</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex gap-3 text-slate-300"><span className="text-red-500 font-bold">✗</span> I clienti odiano compilare form lunghi</li>
                  <li className="flex gap-3 text-slate-300"><span className="text-red-500 font-bold">✗</span> Rispondi alle email dopo ore (o giorni)</li>
                  <li className="flex gap-3 text-slate-300"><span className="text-red-500 font-bold">✗</span> Perdi le chiamate quando sei occupato</li>
                  <li className="flex gap-3 text-slate-300"><span className="text-red-500 font-bold">✗</span> Costi fissi elevati per il personale</li>
                </ul>
              </CardContent>
            </Card>

            {/* The New Way */}
            <Card className="bg-green-900/10 border-green-500/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">VINCENTE</div>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                  <h3 className="text-2xl font-bold text-white">Ecosistema AI</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex gap-3 text-white"><span className="text-green-500 font-bold">✓</span> Il Chatbot qualifica il cliente in 30 secondi</li>
                  <li className="flex gap-3 text-white"><span className="text-green-500 font-bold">✓</span> Risposte istantanee h24 su Sito e WhatsApp</li>
                  <li className="flex gap-3 text-white"><span className="text-green-500 font-bold">✓</span> L'Assistente Vocale risponde se non puoi</li>
                  <li className="flex gap-3 text-white"><span className="text-green-500 font-bold">✓</span> Paghi una frazione rispetto a un umano</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SCENARIO SHOWCASE */}
      <section className="py-20 px-6 bg-slate-800/30 border-y border-slate-800">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Chatbot o Voce? Abbiamo entrambi.</h2>
            <p className="text-slate-400">Esempi reali di come l'AI gestisce le conversazioni per te.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {scenarios.map((scenario, index) => (
              <Card key={index} className="bg-slate-900 border-slate-700 overflow-hidden hover:border-blue-500/50 transition-all group">
                <div className="p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-700 rounded-lg">{scenario.icon}</div>
                    <div>
                      <h4 className="font-semibold text-white">{scenario.title}</h4>
                      <p className="text-xs text-slate-400">{scenario.context}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">{scenario.role}</Badge>
                </div>
                <CardContent className="p-6 space-y-4">
                  {scenario.dialogue.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                        msg.role === 'user' 
                          ? 'bg-blue-600 text-white rounded-tr-sm' 
                          : 'bg-slate-800 text-slate-200 rounded-tl-sm'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section className="py-16 px-6 border-t border-slate-800 bg-slate-900">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-slate-400 mb-8 uppercase tracking-widest text-sm">Si integra perfettamente con</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {integrations.map((tool, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-300 font-semibold text-lg opacity-70 hover:opacity-100 transition-opacity">
                {tool.icon} {tool.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA - IL REMINDER */}
      <section className="py-24 px-6 bg-gradient-to-b from-slate-900 to-blue-900/20 text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            Il Tuo Sito Web Sta Perdendo Lead <br />
            <span className="text-blue-400">Mentre Leggi Questo.</span>
          </h2>
          <p className="text-xl text-slate-300 mb-10">
            Ogni visitatore che esce senza contattarti è un cliente regalato alla concorrenza.
            <br />Blocca questa emorragia oggi stesso.
          </p>
          <Link href="/appointments">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-slate-100 font-bold px-10 py-6 text-lg rounded-full shadow-2xl hover:scale-105 transition-transform">
              Installa Chatbot Ora <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <p className="mt-6 text-sm text-slate-500">Setup completo in meno di 48 ore.</p>
        </div>
      </section>

      <ChatbotWidget />
    </div>
  )
}
