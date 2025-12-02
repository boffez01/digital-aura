"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  MessageSquare, Clock, Target, Play, XCircle, CheckCircle2, 
  Calendar, Database, Globe, ArrowDownRight, Zap, ShieldCheck, 
  Cpu, Settings 
} from "lucide-react"
import Link from "next/link"
import Navbar from "../../components/navbar"
import ServiceNavbar from "../../components/service-navbar"
import ChatbotWidget from "../../components/chatbot-widget"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function ChatbotPage() {
  const features = [
    { icon: <MessageSquare className="h-8 w-8" />, title: "Chat & Voce", description: "Un'unica intelligenza che gestisce sia le chat sul sito che le telefonate in arrivo.", color: "text-blue-400", bgColor: "bg-blue-900/20" },
    { icon: <Clock className="h-8 w-8" />, title: "Risposte Istantanee", description: "Niente più 'Ti faremo sapere'. Il bot risponde, spiega e convince in tempo reale.", color: "text-green-400", bgColor: "bg-green-900/20" },
    { icon: <Target className="h-8 w-8" />, title: "Conversione Lead", description: "Trasforma i visitatori anonimi in contatti qualificati chiedendo le cose giuste.", color: "text-orange-400", bgColor: "bg-orange-900/20" },
  ]

  const processSteps = [
    { 
      step: "01", 
      title: "Analisi & Knowledge Base", 
      desc: "Analizziamo le tue telefonate/chat storiche e creiamo il 'cervello' del bot con le tue risposte migliori.",
      icon: <Database className="w-6 h-6 text-purple-400"/> 
    },
    { 
      step: "02", 
      title: "Training & Tuning", 
      desc: "Addestriamo l'AI a parlare col tuo tono di voce (formale o amichevole) e a gestire le obiezioni.",
      icon: <Cpu className="w-6 h-6 text-cyan-400"/> 
    },
    { 
      step: "03", 
      title: "Integrazione & Go Live", 
      desc: "Colleghiamo il bot al tuo numero di telefono, al sito e al tuo calendario. Sei operativo.",
      icon: <Zap className="w-6 h-6 text-yellow-400"/> 
    },
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

  const integrations = [
    { name: "Google Calendar", icon: <Calendar className="w-6 h-6" /> },
    { name: "WhatsApp Business", icon: <MessageSquare className="w-6 h-6" /> },
    { name: "HubSpot / Salesforce", icon: <Database className="w-6 h-6" /> },
    { name: "Sito Web & E-commerce", icon: <Globe className="w-6 h-6" /> },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Navbar />
      <ServiceNavbar currentService="chatbot" />

      {/* HERO SECTION */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="container mx-auto max-w-7xl text-center relative z-10">
          <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2">
            Chatbot & Voice AI
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Chatbot e Segreteria AI:<br />
            <span className="text-blue-400">Il Tuo Team H24.</span>
          </h1>
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Smetti di perdere clienti con form statici noiosi o telefoni che squillano a vuoto.
            I nostri <strong>Chatbot Intelligenti</strong> e <strong>Assistenti Vocali</strong> dialogano con i visitatori, rispondono alle domande e fissano appuntamenti in autonomia.
          </p>
          
          {/* LIVE DEMO CTA */}
          <div className="max-w-2xl mx-auto mt-8 bg-blue-900/20 p-8 rounded-3xl border border-blue-500/30 backdrop-blur-sm relative">
            <div className="absolute -top-4 -right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce">
              LIVE DEMO
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-2">
              <Zap className="w-6 h-6 text-yellow-400" />
              Non fidarti delle parole. Provalo ora.
            </h3>
            <p className="text-slate-300 mb-6">
              Il nostro Chatbot è attivo proprio su questa pagina. <br/>
              Clicca l'icona in basso a destra e prova a chiedergli qualsiasi cosa o a <strong>prenotare un appuntamento</strong>.
            </p>
            <div className="flex justify-center items-center gap-2 text-blue-400 font-bold animate-pulse">
              <span>Clicca qui sotto</span>
              <ArrowDownRight className="w-6 h-6" />
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION (NUOVA) */}
      <section className="py-20 px-6 bg-slate-800/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Come lo Costruiamo</h2>
            <p className="text-slate-400">Un processo collaudato per portarti online in meno di una settimana.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, i) => (
              <Card key={i} className="bg-slate-900 border-slate-700 relative overflow-hidden">
                <div className="absolute top-0 left-0 p-4 text-6xl font-bold text-slate-800 select-none opacity-50">{step.step}</div>
                <CardContent className="p-8 relative z-10 pt-12">
                  <div className="mb-6 bg-slate-800 w-fit p-3 rounded-xl border border-slate-700">{step.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CONFRONTO BRUTALE */}
      <section className="py-20 px-6 bg-slate-900">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Umano vs AI: Il Confronto</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-red-900/10 border-red-900/50">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <XCircle className="w-8 h-8 text-red-500" />
                  <h3 className="text-2xl font-bold text-white">Segreteria Umana</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex gap-3 text-slate-300"><span className="text-red-500 font-bold">✗</span> Disponibile solo 8 ore al giorno</li>
                  <li className="flex gap-3 text-slate-300"><span className="text-red-500 font-bold">✗</span> Costa 25.000€+ l'anno</li>
                  <li className="flex gap-3 text-slate-300"><span className="text-red-500 font-bold">✗</span> Gestisce 1 chiamata alla volta</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-green-900/10 border-green-500/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">VINCENTE</div>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                  <h3 className="text-2xl font-bold text-white">Assistente AI</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex gap-3 text-white"><span className="text-green-500 font-bold">✓</span> Disponibile 24/7/365</li>
                  <li className="flex gap-3 text-white"><span className="text-green-500 font-bold">✓</span> Costa una frazione</li>
                  <li className="flex gap-3 text-white"><span className="text-green-500 font-bold">✓</span> Gestisce infiniti clienti contemporaneamente</li>
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
            <h2 className="text-3xl font-bold text-white mb-4">Esempi di Conversazione</h2>
            <p className="text-slate-400">Ecco come l'AI gestisce i tuoi clienti in modo naturale.</p>
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

      {/* SECURITY & TRUST (NUOVA) */}
      <section className="py-12 px-6 border-b border-slate-800 bg-slate-900">
         <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-900/20 border border-green-500/30 text-green-400 mb-6">
               <ShieldCheck className="w-5 h-5" /> Sicurezza Garantita
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">I tuoi dati sono al sicuro.</h3>
            <p className="text-slate-400">
               I nostri sistemi sono conformi al <strong>GDPR</strong>. Le conversazioni sono criptate e i dati vengono salvati solo sul tuo CRM proprietario.
            </p>
         </div>
      </section>

      {/* FAQ SECTION (NUOVA) */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Domande Frequenti</h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border-slate-700">
              <AccordionTrigger className="text-white hover:text-blue-400">Sembrerà un robot?</AccordionTrigger>
              <AccordionContent className="text-slate-400">
                No. Usiamo modelli vocali avanzati (come ElevenLabs) che hanno intonazione, pause e "respiro" umani. Spesso i clienti non si accorgono della differenza.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-slate-700">
              <AccordionTrigger className="text-white hover:text-blue-400">Cosa succede se l'AI non sa rispondere?</AccordionTrigger>
              <AccordionContent className="text-slate-400">
                Abbiamo un protocollo di sicurezza. Se l'AI è confusa, dice gentilmente: "Per questa domanda specifica preferisco farla contattare da un mio collega umano" e ti inoltra la notifica.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-slate-700">
              <AccordionTrigger className="text-white hover:text-blue-400">Posso collegarlo al mio calendario?</AccordionTrigger>
              <AccordionContent className="text-slate-400">
                Assolutamente sì. Si integra con Google Calendar, Outlook, Calendly e i principali CRM. Controlla la tua disponibilità in tempo reale.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-slate-700">
              <AccordionTrigger className="text-white hover:text-blue-400">Quanto tempo ci vuole per il setup?</AccordionTrigger>
              <AccordionContent className="text-slate-400">
                Per un chatbot standard, siamo operativi in 3-5 giorni lavorativi. Per automazioni complesse, circa 2 settimane.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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

      {/* FINAL CTA */}
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
          <div className="flex justify-center">
             <Button 
               size="lg" 
               className="bg-white text-blue-900 hover:bg-slate-100 font-bold px-10 py-6 text-lg rounded-full shadow-2xl hover:scale-105 transition-transform"
               onClick={() => {
                 const widgetBtn = document.querySelector('button[class*="fixed bottom-6"]'); 
                 if(widgetBtn instanceof HTMLElement) widgetBtn.click();
               }}
             >
               Prova la Chatbot Live <ArrowDownRight className="ml-2 w-5 h-5" />
             </Button>
          </div>
          <p className="mt-6 text-sm text-slate-500">Setup completo in meno di 48 ore.</p>
        </div>
      </section>

      <ChatbotWidget />
    </div>
  )
}
