"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Database, Workflow, CheckCircle, Factory, Building, ShoppingBag, ArrowRight, Gavel, Utensils, HeartPulse, FileText, MessageCircle, Brain } from 'lucide-react'
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

export default function AIAutomationPage() {
  const automationTypes = [
    {
      id: "workflow",
      title: "Workflow Automation",
      icon: <Workflow className="h-8 w-8" />,
      description: "Connettiamo le tue app (CRM, Email, Fogli di calcolo) per farle parlare tra loro.",
      features: [
        "Sincronizzazione Lead tra Facebook e CRM",
        "Notifiche Slack/Team su nuove vendite",
        "Aggiornamento automatico database clienti",
      ],
    },
    {
      id: "docs",
      title: "Gestione Documentale AI",
      icon: <FileText className="h-8 w-8" />,
      description: "L'AI legge preventivi, fatture e contratti PDF ed estrae i dati automaticamente.",
      features: [
        "Estrazione dati da PDF/Immagini",
        "Inserimento automatico in contabilità",
        "Archiviazione intelligente",
      ],
    },
    {
      id: "comms",
      title: "Smart Communication",
      icon: <MessageCircle className="h-8 w-8" />,
      description: "Gestione centralizzata e automatizzata delle comunicazioni con i clienti.",
      features: [
        "Risposte email automatiche intelligenti",
        "Follow-up WhatsApp automatici",
        "Riattivazione clienti dormienti",
      ],
    },
    {
      id: "data",
      title: "Business Intelligence",
      icon: <Brain className="h-8 w-8" />,
      description: "Trasforma i dati grezzi in decisioni strategiche.",
      features: [
        "Report settimanali automatici",
        "Analisi predittiva vendite",
        "Scoring automatico dei lead",
      ],
    },
  ]

  const industries = [
    {
      name: "Edilizia & Impianti",
      icon: <Factory className="h-10 w-10" />,
      description: "Idraulici, Elettricisti, Imprese Edili.",
      automations: ["Recupero chiamate perse", "Preventivi WhatsApp"],
      benefits: "Zero clienti persi in cantiere",
    },
    {
      name: "Immobiliare",
      icon: <Building className="h-10 w-10" />,
      description: "Agenzie e Property Managers.",
      automations: ["Pre-qualifica inquilini", "Booking visite"],
      benefits: "Solo visite qualificate",
    },
    {
      name: "Studi Professionali",
      icon: <Gavel className="h-10 w-10" />,
      description: "Avvocati, Commercialisti, Notai.",
      automations: ["Analisi documenti", "Agenda appuntamenti"],
      benefits: "-50% tempo burocratico",
    },
    {
      name: "Ristorazione & Hotel",
      icon: <Utensils className="h-10 w-10" />,
      description: "Ristoranti, B&B, Hotel.",
      automations: ["Prenotazioni tavolo/camera", "Risposte recensioni"],
      benefits: "Receptionist virtuale h24",
    },
    {
      name: "Salute & Benessere",
      icon: <HeartPulse className="h-10 w-10" />,
      description: "Cliniche, Dentisti, Centri Estetici.",
      automations: ["Recall pazienti", "Promemoria appuntamenti"],
      benefits: "-80% No-Show (Appuntamenti saltati)",
    },
    {
      name: "E-commerce",
      icon: <ShoppingBag className="h-10 w-10" />,
      description: "Negozi Online e Retail.",
      automations: ["Supporto post-vendita", "Recupero carrelli"],
      benefits: "Vendite automatiche",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Navbar />
      <ServiceNavbar currentService="ai-automation" />

      {/* HERO */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="container mx-auto max-w-7xl text-center relative z-10">
          <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30 px-6 py-2 text-sm font-medium">
            <Zap className="h-4 w-4 mr-2" />
            Efficienza Operativa
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            Il Tuo Business,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Senza Frizioni.
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Smetti di essere il "collo di bottiglia" della tua azienda. 
            Costruiamo ecosistemi digitali che automatizzano il lavoro manuale e lavorano 24/7 al posto tuo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/appointments">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-full shadow-lg">
                Prenota Audit Processi
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* AUTOMATION GRID */}
      <section className="py-20 px-6 bg-slate-800/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Cosa Automatizziamo</h2>
            <p className="text-slate-400">Dalla gestione documenti al customer care, copriamo ogni reparto.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {automationTypes.map((type) => (
              <Card key={type.id} className="bg-slate-800 border-slate-700 hover:border-purple-500/50 transition-all group">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 group-hover:scale-110 transition-transform duration-300">
                      {type.icon}
                    </div>
                    <CardTitle className="text-2xl text-white">{type.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-6 text-lg">{type.description}</p>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {type.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-slate-400 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES GRID */}
      <section className="py-20 px-6 bg-slate-900">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Settori di Specializzazione</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700 hover:bg-slate-800/80 transition-colors hover:border-purple-500/30">
                <CardContent className="p-8 text-center">
                  <div className="text-purple-400 mb-6 flex justify-center transform hover:scale-110 transition-transform duration-300 bg-slate-900/50 p-4 rounded-full w-20 h-20 items-center mx-auto border border-slate-700">
                    {industry.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{industry.name}</h3>
                  <p className="text-slate-400 text-sm mb-6">{industry.description}</p>
                  
                  <div className="text-left bg-slate-900/50 rounded-xl p-4 mb-4 border border-slate-700/50">
                    <p className="text-xs font-bold text-purple-400 mb-2 uppercase tracking-wider">Cosa facciamo:</p>
                    <ul className="text-sm text-slate-300 space-y-1.5">
                      {industry.automations.map((a, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-purple-500"/> {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="inline-flex items-center gap-2 text-xs font-medium text-green-400 bg-green-400/10 px-3 py-1 rounded-full border border-green-400/20">
                    <CheckCircle className="w-3 h-3" /> {industry.benefits}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 px-6 bg-slate-800/30 border-y border-slate-800">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Domande sull'Automazione</h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border-slate-700">
              <AccordionTrigger className="text-white hover:text-purple-400">Devo cambiare il mio software attuale?</AccordionTrigger>
              <AccordionContent className="text-slate-400">
                Assolutamente no. Noi creiamo "ponti" tra i software che usi già (es. Gmail, Excel, Gestionale, WhatsApp). Non devi imparare nulla di nuovo.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-slate-700">
              <AccordionTrigger className="text-white hover:text-purple-400">E se qualcosa si rompe?</AccordionTrigger>
              <AccordionContent className="text-slate-400">
                Tutti i nostri sistemi hanno un monitoraggio attivo. Se un'automazione fallisce (es. server di posta giù), veniamo notificati istantaneamente e interveniamo noi.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-slate-700">
              <AccordionTrigger className="text-white hover:text-purple-400">È sicuro per i dati dei miei clienti?</AccordionTrigger>
              <AccordionContent className="text-slate-400">
                Sì. Usiamo standard di crittografia bancaria e siamo conformi al GDPR. I dati non vengono "venduti" all'AI, ma processati in ambienti sicuri e privati.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-slate-700">
              <AccordionTrigger className="text-white hover:text-purple-400">Quanto costa un'automazione?</AccordionTrigger>
              <AccordionContent className="text-slate-400">
                {/* CORREZIONE QUI SOTTO: Freccia HTML invece di carattere > */}
                Dipende dalla complessità. Un&apos;automazione semplice (es. Email &rarr; Excel) parte da poche centinaia di euro. Un sistema completo di gestione aziendale è un investimento che si ripaga in 3 mesi.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 bg-gradient-to-t from-slate-900 to-purple-900/20 text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            Quanto ti costa <span className="text-purple-400">NON</span> automatizzare?
          </h2>
          <p className="text-xl text-slate-300 mb-10">
            L'inefficienza è una tassa occulta che paghi ogni mese.
            <br />Smetti di pagarla. Trasforma la tua azienda in una macchina efficiente.
          </p>
          <Link href="/appointments">
            <Button size="lg" className="bg-white text-purple-900 hover:bg-slate-100 font-bold px-10 py-6 text-lg rounded-full shadow-2xl hover:scale-105 transition-transform">
              Automatizza il Business Ora <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <p className="mt-6 text-sm text-slate-500">Analisi gratuita dei processi inclusa.</p>
        </div>
      </section>

      <ChatbotWidget />
    </div>
  )
}
