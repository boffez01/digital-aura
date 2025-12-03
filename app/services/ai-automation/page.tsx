"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Zap,
  Workflow,
  CheckCircle,
  Factory,
  Building,
  ShoppingBag,
  ArrowRight,
  Gavel,
  Utensils,
  HeartPulse,
  FileText,
  MessageCircle,
  Brain,
} from "lucide-react"
import Link from "next/link"
import Navbar from "../../components/navbar"
import ServiceNavbar from "../../components/service-navbar"
import ChatbotWidget from "../../components/chatbot-widget"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useLanguage } from "../../contexts/language-context"

export default function AIAutomationPage() {
  const { language } = useLanguage()

  const automationTypes = [
    {
      id: "workflow",
      title: language === "it" ? "Workflow Automation" : "Workflow Automation",
      icon: <Workflow className="h-8 w-8" />,
      description:
        language === "it"
          ? "Connettiamo le tue app (CRM, Email, Fogli di calcolo) per farle parlare tra loro."
          : "We connect your apps (CRM, Email, Spreadsheets) to make them talk to each other.",
      features:
        language === "it"
          ? [
              "Sincronizzazione Lead tra Facebook e CRM",
              "Notifiche Slack/Team su nuove vendite",
              "Aggiornamento automatico database clienti",
            ]
          : [
              "Lead sync between Facebook and CRM",
              "Slack/Teams notifications on new sales",
              "Automatic customer database updates",
            ],
    },
    {
      id: "docs",
      title: language === "it" ? "Gestione Documentale AI" : "AI Document Management",
      icon: <FileText className="h-8 w-8" />,
      description:
        language === "it"
          ? "L'AI legge preventivi, fatture e contratti PDF ed estrae i dati automaticamente."
          : "AI reads quotes, invoices and PDF contracts and extracts data automatically.",
      features:
        language === "it"
          ? ["Estrazione dati da PDF/Immagini", "Inserimento automatico in contabilità", "Archiviazione intelligente"]
          : ["Data extraction from PDF/Images", "Automatic entry into accounting", "Smart archiving"],
    },
    {
      id: "comms",
      title: language === "it" ? "Smart Communication" : "Smart Communication",
      icon: <MessageCircle className="h-8 w-8" />,
      description:
        language === "it"
          ? "Gestione centralizzata e automatizzata delle comunicazioni con i clienti."
          : "Centralized and automated customer communications management.",
      features:
        language === "it"
          ? [
              "Risposte email automatiche intelligenti",
              "Follow-up WhatsApp automatici",
              "Riattivazione clienti dormienti",
            ]
          : ["Smart automatic email replies", "Automatic WhatsApp follow-ups", "Dormant customer reactivation"],
    },
    {
      id: "data",
      title: "Business Intelligence",
      icon: <Brain className="h-8 w-8" />,
      description:
        language === "it"
          ? "Trasforma i dati grezzi in decisioni strategiche."
          : "Transform raw data into strategic decisions.",
      features:
        language === "it"
          ? ["Report settimanali automatici", "Analisi predittiva vendite", "Scoring automatico dei lead"]
          : ["Automatic weekly reports", "Predictive sales analysis", "Automatic lead scoring"],
    },
  ]

  const industries = [
    {
      name: language === "it" ? "Edilizia & Impianti" : "Construction & Installations",
      icon: <Factory className="h-10 w-10" />,
      description:
        language === "it"
          ? "Idraulici, Elettricisti, Imprese Edili."
          : "Plumbers, Electricians, Construction Companies.",
      automations:
        language === "it"
          ? ["Recupero chiamate perse", "Preventivi WhatsApp"]
          : ["Missed call recovery", "WhatsApp quotes"],
      benefits: language === "it" ? "Zero clienti persi in cantiere" : "Zero customers lost on site",
    },
    {
      name: language === "it" ? "Immobiliare" : "Real Estate",
      icon: <Building className="h-10 w-10" />,
      description: language === "it" ? "Agenzie e Property Managers." : "Agencies and Property Managers.",
      automations:
        language === "it"
          ? ["Pre-qualifica inquilini", "Booking visite"]
          : ["Tenant pre-qualification", "Visit booking"],
      benefits: language === "it" ? "Solo visite qualificate" : "Only qualified visits",
    },
    {
      name: language === "it" ? "Studi Professionali" : "Professional Firms",
      icon: <Gavel className="h-10 w-10" />,
      description: language === "it" ? "Avvocati, Commercialisti, Notai." : "Lawyers, Accountants, Notaries.",
      automations:
        language === "it"
          ? ["Analisi documenti", "Agenda appuntamenti"]
          : ["Document analysis", "Appointment scheduling"],
      benefits: language === "it" ? "-50% tempo burocratico" : "-50% bureaucratic time",
    },
    {
      name: language === "it" ? "Ristorazione & Hotel" : "Restaurants & Hotels",
      icon: <Utensils className="h-10 w-10" />,
      description: language === "it" ? "Ristoranti, B&B, Hotel." : "Restaurants, B&Bs, Hotels.",
      automations:
        language === "it"
          ? ["Prenotazioni tavolo/camera", "Risposte recensioni"]
          : ["Table/room reservations", "Review responses"],
      benefits: language === "it" ? "Receptionist virtuale h24" : "24/7 virtual receptionist",
    },
    {
      name: language === "it" ? "Salute & Benessere" : "Health & Wellness",
      icon: <HeartPulse className="h-10 w-10" />,
      description: language === "it" ? "Cliniche, Dentisti, Centri Estetici." : "Clinics, Dentists, Beauty Centers.",
      automations:
        language === "it"
          ? ["Recall pazienti", "Promemoria appuntamenti"]
          : ["Patient recalls", "Appointment reminders"],
      benefits: language === "it" ? "-80% No-Show (Appuntamenti saltati)" : "-80% No-Show (Missed appointments)",
    },
    {
      name: "E-commerce",
      icon: <ShoppingBag className="h-10 w-10" />,
      description: language === "it" ? "Negozi Online e Retail." : "Online Stores and Retail.",
      automations:
        language === "it" ? ["Supporto post-vendita", "Recupero carrelli"] : ["Post-sale support", "Cart recovery"],
      benefits: language === "it" ? "Vendite automatiche" : "Automatic sales",
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
            {language === "it" ? "Efficienza Operativa" : "Operational Efficiency"}
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            {language === "it" ? "Il Tuo Business," : "Your Business,"}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {language === "it" ? "Senza Frizioni." : "Without Friction."}
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            {language === "it" ? (
              <>
                Smetti di essere il "collo di bottiglia" della tua azienda. Costruiamo ecosistemi digitali che
                automatizzano il lavoro manuale e lavorano 24/7 al posto tuo.
              </>
            ) : (
              <>
                Stop being the "bottleneck" of your company. We build digital ecosystems that automate manual work and
                work 24/7 for you.
              </>
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/appointments">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-full shadow-lg"
              >
                {language === "it" ? "Prenota Audit Processi" : "Book Process Audit"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* AUTOMATION GRID */}
      <section className="py-20 px-6 bg-slate-800/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {language === "it" ? "Cosa Automatizziamo" : "What We Automate"}
            </h2>
            <p className="text-slate-400">
              {language === "it"
                ? "Dalla gestione documenti al customer care, copriamo ogni reparto."
                : "From document management to customer care, we cover every department."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {automationTypes.map((type) => (
              <Card
                key={type.id}
                className="bg-slate-800 border-slate-700 hover:border-purple-500/50 transition-all group"
              >
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
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            {language === "it" ? "Settori di Specializzazione" : "Areas of Specialization"}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <Card
                key={index}
                className="bg-slate-800 border-slate-700 hover:bg-slate-800/80 transition-colors hover:border-purple-500/30"
              >
                <CardContent className="p-8 text-center">
                  <div className="text-purple-400 mb-6 flex justify-center transform hover:scale-110 transition-transform duration-300 bg-slate-900/50 p-4 rounded-full w-20 h-20 items-center mx-auto border border-slate-700">
                    {industry.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{industry.name}</h3>
                  <p className="text-slate-400 text-sm mb-6">{industry.description}</p>

                  <div className="text-left bg-slate-900/50 rounded-xl p-4 mb-4 border border-slate-700/50">
                    <p className="text-xs font-bold text-purple-400 mb-2 uppercase tracking-wider">
                      {language === "it" ? "Cosa facciamo:" : "What We Do:"}
                    </p>
                    <ul className="text-sm text-slate-300 space-y-1.5">
                      {industry.automations.map((a, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-purple-500" /> {a}
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
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            {language === "it" ? "Domande sull'Automazione" : "Automation Questions"}
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border-slate-700">
              <AccordionTrigger className="text-white hover:text-purple-400">
                {language === "it"
                  ? "Devo cambiare il mio software attuale?"
                  : "Do I need to change my current software?"}
              </AccordionTrigger>
              <AccordionContent className="text-slate-400">
                {language === "it"
                  ? 'Assolutamente no. Noi creiamo "ponti" tra i software che usi già (es. Gmail, Excel, Gestionale, WhatsApp). Non devi imparare nulla di nuovo.'
                  : 'Absolutely not. We create "bridges" between the software you already use (e.g. Gmail, Excel, Management System, WhatsApp). You don\'t have to learn anything new.'}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-slate-700">
              <AccordionTrigger className="text-white hover:text-purple-400">
                {language === "it" ? "E se qualcosa si rompe?" : "What if something breaks?"}
              </AccordionTrigger>
              <AccordionContent className="text-slate-400">
                {language === "it"
                  ? "Tutti i nostri sistemi hanno un monitoraggio attivo. Se un'automazione fallisce (es. server di posta giù), veniamo notificati istantaneamente e interveniamo noi."
                  : "All our systems have active monitoring. If an automation fails (e.g. mail server down), we are notified instantly and we intervene."}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-slate-700">
              <AccordionTrigger className="text-white hover:text-purple-400">
                {language === "it" ? "È sicuro per i dati dei miei clienti?" : "Is it safe for my customers' data?"}
              </AccordionTrigger>
              <AccordionContent className="text-slate-400">
                {language === "it"
                  ? 'Sì. Usiamo standard di crittografia bancaria e siamo conformi al GDPR. I dati non vengono "venduti" all\'AI, ma processati in ambienti sicuri e privati.'
                  : 'Yes. We use bank-grade encryption standards and are GDPR compliant. Data is not "sold" to AI, but processed in secure and private environments.'}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-slate-700">
              <AccordionTrigger className="text-white hover:text-purple-400">
                {language === "it" ? "Quanto costa un'automazione?" : "How much does an automation cost?"}
              </AccordionTrigger>
              <AccordionContent className="text-slate-400">
                {language === "it"
                  ? "Dipende dalla complessità. Un'automazione semplice (es. Email a Excel) parte da poche centinaia di euro. Un sistema completo di gestione aziendale è un investimento che si ripaga in 3 mesi."
                  : "It depends on complexity. A simple automation (e.g. Email to Excel) starts from a few hundred euros. A complete business management system is an investment that pays off in 3 months."}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 bg-gradient-to-t from-slate-900 to-purple-900/20 text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            {language === "it" ? (
              <>
                Quanto ti costa <span className="text-purple-400">NON</span> automatizzare?
              </>
            ) : (
              <>
                How much does <span className="text-purple-400">NOT</span> automating cost you?
              </>
            )}
          </h2>
          <p className="text-xl text-slate-300 mb-10">
            {language === "it" ? (
              <>
                L'inefficienza è una tassa occulta che paghi ogni mese.
                <br />
                Smetti di pagarla. Trasforma la tua azienda in una macchina efficiente.
              </>
            ) : (
              <>
                Inefficiency is a hidden tax you pay every month.
                <br />
                Stop paying it. Transform your company into an efficient machine.
              </>
            )}
          </p>
          <Link href="/appointments">
            <Button
              size="lg"
              className="bg-white text-purple-900 hover:bg-slate-100 font-bold px-10 py-6 text-lg rounded-full shadow-2xl hover:scale-105 transition-transform"
            >
              {language === "it" ? "Automatizza il Business Ora" : "Automate Business Now"}{" "}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <p className="mt-6 text-sm text-slate-500">
            {language === "it" ? "Analisi gratuita dei processi inclusa." : "Free process analysis included."}
          </p>
        </div>
      </section>

      <ChatbotWidget />
    </div>
  )
}
