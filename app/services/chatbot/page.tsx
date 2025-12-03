"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MessageSquare,
  Clock,
  Target,
  XCircle,
  CheckCircle2,
  Calendar,
  Database,
  Globe,
  ArrowDownRight,
  Zap,
  ShieldCheck,
  Cpu,
} from "lucide-react"
import Navbar from "../../components/navbar"
import ServiceNavbar from "../../components/service-navbar"
import ChatbotWidget from "../../components/chatbot-widget"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useLanguage } from "../../contexts/language-context"

export default function ChatbotPage() {
  const { language } = useLanguage()

  const features = [
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: language === "it" ? "Chat & Voce" : "Chat & Voice",
      description:
        language === "it"
          ? "Un'unica intelligenza che gestisce sia le chat sul sito che le telefonate in arrivo."
          : "A single intelligence that manages both website chats and incoming calls.",
      color: "text-blue-400",
      bgColor: "bg-blue-900/20",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: language === "it" ? "Risposte Istantanee" : "Instant Responses",
      description:
        language === "it"
          ? "Niente più 'Ti faremo sapere'. Il bot risponde, spiega e convince in tempo reale."
          : "No more 'We'll get back to you'. The bot responds, explains and convinces in real time.",
      color: "text-green-400",
      bgColor: "bg-green-900/20",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: language === "it" ? "Conversione Lead" : "Lead Conversion",
      description:
        language === "it"
          ? "Trasforma i visitatori anonimi in contatti qualificati chiedendo le cose giuste."
          : "Turn anonymous visitors into qualified contacts by asking the right questions.",
      color: "text-orange-400",
      bgColor: "bg-orange-900/20",
    },
  ]

  const processSteps = [
    {
      step: "01",
      title: language === "it" ? "Analisi & Knowledge Base" : "Analysis & Knowledge Base",
      desc:
        language === "it"
          ? "Analizziamo le tue telefonate/chat storiche e creiamo il 'cervello' del bot con le tue risposte migliori."
          : "We analyze your historical calls/chats and create the bot's 'brain' with your best responses.",
      icon: <Database className="w-6 h-6 text-purple-400" />,
    },
    {
      step: "02",
      title: language === "it" ? "Training & Tuning" : "Training & Tuning",
      desc:
        language === "it"
          ? "Addestriamo l'AI a parlare col tuo tono di voce (formale o amichevole) e a gestire le obiezioni."
          : "We train the AI to speak in your tone of voice (formal or friendly) and handle objections.",
      icon: <Cpu className="w-6 h-6 text-cyan-400" />,
    },
    {
      step: "03",
      title: language === "it" ? "Integrazione & Go Live" : "Integration & Go Live",
      desc:
        language === "it"
          ? "Colleghiamo il bot al tuo numero di telefono, al sito e al tuo calendario. Sei operativo."
          : "We connect the bot to your phone number, website and calendar. You're live.",
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
    },
  ]

  const scenarios = [
    {
      title: language === "it" ? "Chatbot Sito Web" : "Website Chatbot",
      icon: <MessageSquare className="w-6 h-6 text-blue-400" />,
      role: language === "it" ? "Assistente Commerciale" : "Sales Assistant",
      context: language === "it" ? "Visitatore sul Sito" : "Website Visitor",
      dialogue:
        language === "it"
          ? [
              {
                role: "bot",
                text: "Ciao! 👋 Vedo che stai guardando i nostri servizi. Hai bisogno di un preventivo rapido?",
              },
              { role: "user", text: "Sì, vorrei capire i costi." },
              { role: "bot", text: "Dipende dal progetto. Se mi dici il tuo settore, ti do una stima subito." },
              { role: "user", text: "Immobiliare." },
              { role: "bot", text: "Perfetto. Per le agenzie abbiamo pacchetti da 2k. Vuoi vedere una demo?" },
            ]
          : [
              { role: "bot", text: "Hi! 👋 I see you're looking at our services. Need a quick quote?" },
              { role: "user", text: "Yes, I'd like to understand the costs." },
              {
                role: "bot",
                text: "It depends on the project. If you tell me your industry, I can give you an estimate right away.",
              },
              { role: "user", text: "Real estate." },
              { role: "bot", text: "Perfect. For agencies we have packages starting at 2k. Want to see a demo?" },
            ],
    },
    {
      title: language === "it" ? "Voice Receptionist" : "Voice Receptionist",
      icon: <Calendar className="w-6 h-6 text-green-400" />,
      role: language === "it" ? "Segretaria Telefonica" : "Phone Secretary",
      context: language === "it" ? "Chiamata in Entrata" : "Incoming Call",
      dialogue:
        language === "it"
          ? [
              { role: "bot", text: "Buongiorno, Studio Rossi. Sono l'assistente virtuale. Come posso aiutarla?" },
              { role: "user", text: "Vorrei prenotare una visita di controllo." },
              { role: "bot", text: "Certamente. Ho disponibilità domani alle 15 o giovedì alle 10. Cosa preferisce?" },
              { role: "user", text: "Giovedì va bene." },
              { role: "bot", text: "Segnato per Giovedì ore 10. Le ho inviato un SMS di conferma." },
            ]
          : [
              { role: "bot", text: "Good morning, Studio Rossi. I'm the virtual assistant. How can I help you?" },
              { role: "user", text: "I'd like to book a check-up visit." },
              { role: "bot", text: "I have availability tomorrow at 3 PM or Thursday at 10 AM. What do you prefer?" },
              { role: "user", text: "Thursday works." },
              { role: "bot", text: "Booked for Thursday at 10 AM. I've sent you a confirmation SMS." },
            ],
    },
    {
      title: language === "it" ? "Supporto WhatsApp" : "WhatsApp Support",
      icon: <Target className="w-6 h-6 text-purple-400" />,
      role: language === "it" ? "Customer Care" : "Customer Care",
      context: language === "it" ? "Chat WhatsApp" : "WhatsApp Chat",
      dialogue:
        language === "it"
          ? [
              { role: "user", text: "Il mio ordine #12345 non è arrivato." },
              { role: "bot", text: "Controllo subito... 📦 Il pacco risulta in consegna oggi con Bartolini." },
              { role: "user", text: "Ah ottimo, grazie!" },
              { role: "bot", text: "Di nulla! Se non arriva entro le 18, scrivimi pure qui. Altro?" },
            ]
          : [
              { role: "user", text: "My order #12345 hasn't arrived." },
              { role: "bot", text: "Checking now... 📦 The package is out for delivery today with Bartolini." },
              { role: "user", text: "Ah great, thanks!" },
              {
                role: "bot",
                text: "You're welcome! If it doesn't arrive by 6 PM, just message me here. Anything else?",
              },
            ],
    },
  ]

  const integrations = [
    { name: "Google Calendar", icon: <Calendar className="w-6 h-6" /> },
    { name: "WhatsApp Business", icon: <MessageSquare className="w-6 h-6" /> },
    { name: "HubSpot / Salesforce", icon: <Database className="w-6 h-6" /> },
    { name: language === "it" ? "Sito Web & E-commerce" : "Website & E-commerce", icon: <Globe className="w-6 h-6" /> },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Navbar />
      <ServiceNavbar currentService="chatbot" />

      {/* HERO SECTION */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="container mx-auto max-w-7xl text-center relative z-10">
          <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2">
            {language === "it" ? "Chatbot & Voice AI" : "Chatbot & Voice AI"}
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {language === "it" ? "Chatbot e Segreteria AI:" : "AI Chatbot & Receptionist:"}
            <br />
            <span className="text-blue-400">{language === "it" ? "Il Tuo Team H24." : "Your 24/7 Team."}</span>
          </h1>
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            {language === "it" ? (
              <>
                Smetti di perdere clienti con form statici noiosi o telefoni che squillano a vuoto. I nostri{" "}
                <strong>Chatbot Intelligenti</strong> e <strong>Assistenti Vocali</strong> dialogano con i visitatori,
                rispondono alle domande e fissano appuntamenti in autonomia.
              </>
            ) : (
              <>
                Stop losing customers with boring static forms or phones ringing unanswered. Our{" "}
                <strong>Intelligent Chatbots</strong> and <strong>Voice Assistants</strong> engage with visitors, answer
                questions and book appointments autonomously.
              </>
            )}
          </p>

          {/* LIVE DEMO CTA */}
          <div className="max-w-2xl mx-auto mt-8 bg-blue-900/20 p-8 rounded-3xl border border-blue-500/30 backdrop-blur-sm relative">
            <div className="absolute -top-4 -right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce">
              {language === "it" ? "LIVE DEMO" : "LIVE DEMO"}
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-2">
              <Zap className="w-6 h-6 text-yellow-400" />
              {language === "it" ? "Non fidarti delle parole. Provalo ora." : "Don't trust words. Try it now."}
            </h3>
            <p className="text-slate-300 mb-6">
              {language === "it" ? (
                <>
                  Il nostro Chatbot è attivo proprio su questa pagina. <br />
                  Clicca l'icona in basso a destra e prova a chiedergli qualsiasi cosa o a{" "}
                  <strong>prenotare un appuntamento</strong>.
                </>
              ) : (
                <>
                  Our Chatbot is active right on this page. <br />
                  Click the icon at the bottom right and try asking it anything or{" "}
                  <strong>booking an appointment</strong>.
                </>
              )}
            </p>
            <div className="flex justify-center items-center gap-2 text-blue-400 font-bold animate-pulse">
              <span>{language === "it" ? "Clicca qui sotto" : "Click below"}</span>
              <ArrowDownRight className="w-6 h-6" />
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="py-20 px-6 bg-slate-800/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              {language === "it" ? "Come lo Costruiamo" : "How We Build It"}
            </h2>
            <p className="text-slate-400">
              {language === "it"
                ? "Un processo collaudato per portarti online in meno di una settimana."
                : "A proven process to get you online in less than a week."}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, i) => (
              <Card key={i} className="bg-slate-900 border-slate-700 relative overflow-hidden">
                <div className="absolute top-0 left-0 p-4 text-6xl font-bold text-slate-800 select-none opacity-50">
                  {step.step}
                </div>
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
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            {language === "it" ? "Umano vs AI: Il Confronto" : "Human vs AI: The Battle"}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-red-900/10 border-red-900/50">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <XCircle className="w-8 h-8 text-red-500" />
                  <h3 className="text-2xl font-bold text-white">
                    {language === "it" ? "Segreteria Umana" : "Human Receptionist"}
                  </h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex gap-3 text-slate-300">
                    <span className="text-red-500 font-bold">✗</span>{" "}
                    {language === "it" ? "Disponibile solo 8 ore al giorno" : "Available only 8 hours a day"}
                  </li>
                  <li className="flex gap-3 text-slate-300">
                    <span className="text-red-500 font-bold">✗</span>{" "}
                    {language === "it" ? "Costa 25.000€+ l'anno" : "Costs 25,000€+ per year"}
                  </li>
                  <li className="flex gap-3 text-slate-300">
                    <span className="text-red-500 font-bold">✗</span>{" "}
                    {language === "it" ? "Gestisce 1 chiamata alla volta" : "Handles one call at a time"}
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-green-900/10 border-green-500/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                VINCENTE
              </div>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                  <h3 className="text-2xl font-bold text-white">
                    {language === "it" ? "Assistente AI" : "AI Assistant"}
                  </h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex gap-3 text-white">
                    <span className="text-green-500 font-bold">✓</span>{" "}
                    {language === "it" ? "Disponibile 24/7/365" : "Available 24/7/365"}
                  </li>
                  <li className="flex gap-3 text-white">
                    <span className="text-green-500 font-bold">✓</span>{" "}
                    {language === "it" ? "Costa una frazione" : "Costs a fraction"}
                  </li>
                  <li className="flex gap-3 text-white">
                    <span className="text-green-500 font-bold">✓</span>{" "}
                    {language === "it"
                      ? "Gestisce infiniti clienti contemporaneamente"
                      : "Handles unlimited clients simultaneously"}
                  </li>
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
            <h2 className="text-3xl font-bold text-white mb-4">
              {language === "it" ? "Esempi di Conversazione" : "Conversation Examples"}
            </h2>
            <p className="text-slate-400">
              {language === "it"
                ? "Ecco come l'AI gestisce i tuoi clienti in modo naturale."
                : "Here's how AI handles your clients in a natural way."}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {scenarios.map((scenario, index) => (
              <Card
                key={index}
                className="bg-slate-900 border-slate-700 overflow-hidden hover:border-blue-500/50 transition-all group"
              >
                <div className="p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-700 rounded-lg">{scenario.icon}</div>
                    <div>
                      <h4 className="font-semibold text-white">{scenario.title}</h4>
                      <p className="text-xs text-slate-400">{scenario.context}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                    {scenario.role}
                  </Badge>
                </div>
                <CardContent className="p-6 space-y-4">
                  {scenario.dialogue.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                          msg.role === "user"
                            ? "bg-blue-600 text-white rounded-tr-sm"
                            : "bg-slate-800 text-slate-200 rounded-tl-sm"
                        }`}
                      >
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

      {/* SECURITY & TRUST */}
      <section className="py-12 px-6 border-b border-slate-800 bg-slate-900">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-900/20 border border-green-500/30 text-green-400 mb-6">
            <ShieldCheck className="w-5 h-5" /> {language === "it" ? "Sicurezza Garantita" : "Guaranteed Security"}
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">
            {language === "it" ? "I tuoi dati sono al sicuro." : "Your data is safe."}
          </h3>
          <p className="text-slate-400">
            {language === "it"
              ? "I nostri sistemi sono conformi al <strong>GDPR</strong>. Le conversazioni sono criptate e i dati vengono salvati solo sul tuo CRM proprietario."
              : "Our systems comply with the <strong>GDPR</strong>. Conversations are encrypted and data is saved only on your proprietary CRM."}
          </p>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            {language === "it" ? "Domande Frequenti" : "Frequently Asked Questions"}
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border-slate-700">
              <AccordionTrigger className="text-white hover:text-blue-400">
                {language === "it" ? "Sembrerà un robot?" : "Will it sound like a robot?"}
              </AccordionTrigger>
              <AccordionContent className="text-slate-400">
                {language === "it"
                  ? 'No. Usiamo modelli vocali avanzati (come ElevenLabs) che hanno intonazione, pause e "respiro" umani. Spesso i clienti non si accorgono della differenza.'
                  : "No. We use advanced voice models (like ElevenLabs) that have human intonation, pauses and 'breath'. Often customers don't notice the difference."}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-slate-700">
              <AccordionTrigger className="text-white hover:text-blue-400">
                {language === "it"
                  ? "Cosa succede se l'AI non sa rispondere?"
                  : "What if the AI doesn't know the answer?"}
              </AccordionTrigger>
              <AccordionContent className="text-slate-400">
                {language === "it"
                  ? 'Abbiamo un protocollo di sicurezza. Se l\'AI è confusa, dice gentilmente: "Per questa domanda specifica preferisco farla contattare da un mio collega umano" e ti inoltra la notifica.'
                  : 'We have a safety protocol. If the AI is confused, it politely says: "For this specific question I prefer to have you contacted by a human colleague" and forwards you the notification.'}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-slate-700">
              <AccordionTrigger className="text-white hover:text-blue-400">
                {language === "it" ? "Posso collegarlo al mio calendario?" : "Can I connect it to my calendar?"}
              </AccordionTrigger>
              <AccordionContent className="text-slate-400">
                {language === "it"
                  ? "Assolutamente sì. Si integra con Google Calendar, Outlook, Calendly e i principali CRM. Controlla la tua disponibilità in tempo reale."
                  : "Absolutely yes. It integrates with Google Calendar, Outlook, Calendly and major CRMs. It checks your availability in real time."}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-slate-700">
              <AccordionTrigger className="text-white hover:text-blue-400">
                {language === "it" ? "Quanto tempo ci vuole per il setup?" : "How long does setup take?"}
              </AccordionTrigger>
              <AccordionContent className="text-slate-400">
                {language === "it"
                  ? "Per un chatbot standard, siamo operativi in 3-5 giorni lavorativi. Per automazioni complesse, circa 2 settimane."
                  : "For a standard chatbot, we're operational in 3-5 business days. For complex automations, about 2 weeks."}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section className="py-16 px-6 border-t border-slate-800 bg-slate-900">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-slate-400 mb-8 uppercase tracking-widest text-sm">
            {language === "it" ? "Si integra perfettamente con" : "Integrates seamlessly with"}
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {integrations.map((tool, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-slate-300 font-semibold text-lg opacity-70 hover:opacity-100 transition-opacity"
              >
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
            {language === "it" ? (
              <>
                Il Tuo Sito Web Sta Perdendo Lead <br />
                <span className="text-blue-400">Mentre Leggi Questo.</span>
              </>
            ) : (
              <>
                Your Website Is Losing Leads <br />
                <span className="text-blue-400">While You Read This.</span>
              </>
            )}
          </h2>
          <p className="text-xl text-slate-300 mb-10">
            {language === "it" ? (
              <>
                Ogni visitatore che esce senza contattarti è un cliente regalato alla concorrenza.
                <br />
                Blocca questa emorragia oggi stesso.
              </>
            ) : (
              <>
                Every visitor who leaves without contacting you is a customer gifted to the competition.
                <br />
                Stop this hemorrhage today.
              </>
            )}
          </p>
          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-900 hover:bg-slate-100 font-bold px-10 py-6 text-lg rounded-full shadow-2xl hover:scale-105 transition-transform"
              onClick={() => {
                const widgetBtn = document.querySelector('button[class*="fixed bottom-6"]')
                if (widgetBtn instanceof HTMLElement) widgetBtn.click()
              }}
            >
              {language === "it" ? "Prova la Chatbot Live" : "Try Live Chatbot"}{" "}
              <ArrowDownRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            {language === "it" ? "Setup completo in meno di 48 ore." : "Full setup in less than 48 hours."}
          </p>
        </div>
      </section>

      <ChatbotWidget />
    </div>
  )
}
