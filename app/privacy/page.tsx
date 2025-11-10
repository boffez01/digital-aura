"use client"

import { useLanguage } from "../contexts/language-context"
import Navbar from "../components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Mail, Phone, MapPin, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicy() {
  const { language } = useLanguage()

  const content = {
    it: {
      title: "Privacy Policy",
      lastUpdated: "Ultimo aggiornamento: 29 settembre 2024",
      sections: [
        {
          title: "1. Introduzione",
          content: `Praxis Futura ("noi", "nostro" o "la Società") rispetta la tua privacy e si impegna a proteggere i tuoi dati personali. Questa Privacy Policy spiega come raccogliamo, utilizziamo e proteggiamo le tue informazioni quando utilizzi il nostro sito web e i nostri servizi.`,
        },
        {
          title: "2. Dati che Raccogliamo",
          content: `Raccogliamo i seguenti tipi di dati personali:
          
• **Dati di Contatto**: Nome, email, numero di telefono, azienda
• **Dati di Prenotazione**: Informazioni per appuntamenti e consultazioni
• **Dati di Navigazione**: Indirizzo IP, browser, pagine visitate
• **Dati del Chatbot**: Conversazioni con PraxisBot per migliorare il servizio
• **Cookie e Tecnologie Simili**: Per personalizzare l'esperienza utente`,
        },
        {
          title: "3. Come Utilizziamo i Tuoi Dati",
          content: `Utilizziamo i tuoi dati personali per:
          
• Fornire i nostri servizi di consulenza AI e sviluppo web
• Gestire appuntamenti e comunicazioni
• Migliorare PraxisBot e i nostri servizi attraverso l'analisi delle conversazioni
• Inviarti aggiornamenti sui nostri servizi (solo con il tuo consenso)
• Rispettare obblighi legali e contrattuali
• Analizzare l'utilizzo del sito per miglioramenti`,
        },
        {
          title: "4. Base Legale per il Trattamento",
          content: `Trattiamo i tuoi dati personali sulla base di:
          
• **Consenso**: Per marketing e comunicazioni promozionali
• **Esecuzione del Contratto**: Per fornire i servizi richiesti
• **Interesse Legittimo**: Per migliorare i nostri servizi e sicurezza
• **Obbligo Legale**: Per rispettare normative applicabili`,
        },
        {
          title: "5. Condivisione dei Dati",
          content: `Non vendiamo i tuoi dati personali. Possiamo condividere i tuoi dati con:
          
• **Fornitori di Servizi**: Google Analytics, OpenAI per PraxisBot, servizi di hosting
• **Partner Tecnologici**: Solo per fornire i servizi richiesti
• **Autorità Legali**: Se richiesto dalla legge
• **Successori Aziendali**: In caso di fusione o acquisizione`,
        },
        {
          title: "6. Sicurezza dei Dati",
          content: `Implementiamo misure di sicurezza appropriate per proteggere i tuoi dati:
          
• Crittografia SSL/TLS per tutte le comunicazioni
• Accesso limitato ai dati solo al personale autorizzato
• Backup regolari e sistemi di recupero
• Monitoraggio continuo per attività sospette
• Conformità agli standard di sicurezza ISO 27001`,
        },
        {
          title: "7. I Tuoi Diritti (GDPR)",
          content: `Hai i seguenti diritti sui tuoi dati personali:
          
• **Accesso**: Richiedere una copia dei tuoi dati
• **Rettifica**: Correggere dati inesatti o incompleti
• **Cancellazione**: Richiedere la cancellazione dei tuoi dati
• **Limitazione**: Limitare il trattamento dei tuoi dati
• **Portabilità**: Ricevere i tuoi dati in formato strutturato
• **Opposizione**: Opporsi al trattamento per marketing
• **Revoca del Consenso**: Ritirare il consenso in qualsiasi momento`,
        },
        {
          title: "8. Conservazione dei Dati",
          content: `Conserviamo i tuoi dati personali per il tempo necessario a:
          
• **Dati di Contatto**: 3 anni dall'ultimo contatto
• **Dati di Prenotazione**: 5 anni per obblighi contrattuali
• **Conversazioni Chatbot**: 2 anni per miglioramento del servizio
• **Dati di Marketing**: Fino alla revoca del consenso
• **Dati Legali**: Secondo i termini di legge applicabili`,
        },
        {
          title: "9. Trasferimenti Internazionali",
          content: `I tuoi dati possono essere trasferiti e trattati in paesi al di fuori dell'UE, inclusi Stati Uniti (per servizi OpenAI e Google). Garantiamo protezioni adeguate attraverso:
          
• Clausole Contrattuali Standard della Commissione Europea
• Decisioni di Adeguatezza della Commissione Europea
• Certificazioni Privacy Shield (dove applicabili)
• Garanzie contrattuali specifiche con i fornitori`,
        },
        {
          title: "10. Cookie e Tecnologie di Tracciamento",
          content: `Utilizziamo cookie e tecnologie simili per:
          
• **Cookie Tecnici**: Funzionamento del sito (sempre attivi)
• **Cookie Analitici**: Google Analytics per statistiche di utilizzo
• **Cookie di Preferenza**: Salvare le tue impostazioni linguistiche
• **Cookie di Marketing**: Solo con il tuo consenso esplicito
          
Puoi gestire le preferenze cookie attraverso le impostazioni del browser.`,
        },
        {
          title: "11. Minori",
          content: `I nostri servizi non sono destinati a minori di 16 anni. Non raccogliamo consapevolmente dati personali da minori. Se veniamo a conoscenza di aver raccolto dati da un minore, li cancelleremo immediatamente.`,
        },
        {
          title: "12. Modifiche alla Privacy Policy",
          content: `Possiamo aggiornare questa Privacy Policy periodicamente. Ti notificheremo eventuali modifiche significative tramite:
          
• Avviso sul nostro sito web
• Email (se hai fornito il consenso)
• Notifica nel chatbot PraxisBot
          
L'uso continuato dei nostri servizi dopo le modifiche costituisce accettazione della nuova policy.`,
        },
        {
          title: "13. Contatti",
          content: `Per qualsiasi domanda sulla privacy o per esercitare i tuoi diritti, contattaci:
          
**Data Protection Officer**
Email: info@praxisfutura.com
Telefono: +393500216480
Indirizzo: Via dei Mille 5, Brescia, Italia
          
**Autorità di Controllo**
Puoi anche presentare reclamo al Garante per la Protezione dei Dati Personali (www.gpdp.it).`,
        },
      ],
    },
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: September 29, 2024",
      sections: [
        {
          title: "1. Introduction",
          content: `Praxis Futura ("we", "our" or "the Company") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use and protect your information when you use our website and services.`,
        },
        {
          title: "2. Data We Collect",
          content: `We collect the following types of personal data:
          
• **Contact Data**: Name, email, phone number, company
• **Booking Data**: Information for appointments and consultations
• **Navigation Data**: IP address, browser, pages visited
• **Chatbot Data**: Conversations with PraxisBot to improve service
• **Cookies and Similar Technologies**: To personalize user experience`,
        },
        {
          title: "3. How We Use Your Data",
          content: `We use your personal data to:
          
• Provide our AI consulting and web development services
• Manage appointments and communications
• Improve PraxisBot and our services through conversation analysis
• Send you service updates (only with your consent)
• Comply with legal and contractual obligations
• Analyze site usage for improvements`,
        },
        {
          title: "4. Legal Basis for Processing",
          content: `We process your personal data based on:
          
• **Consent**: For marketing and promotional communications
• **Contract Performance**: To provide requested services
• **Legitimate Interest**: To improve our services and security
• **Legal Obligation**: To comply with applicable regulations`,
        },
        {
          title: "5. Data Sharing",
          content: `We do not sell your personal data. We may share your data with:
          
• **Service Providers**: Google Analytics, OpenAI for PraxisBot, hosting services
• **Technology Partners**: Only to provide requested services
• **Legal Authorities**: If required by law
• **Business Successors**: In case of merger or acquisition`,
        },
        {
          title: "6. Data Security",
          content: `We implement appropriate security measures to protect your data:
          
• SSL/TLS encryption for all communications
• Limited data access only to authorized personnel
• Regular backups and recovery systems
• Continuous monitoring for suspicious activities
• Compliance with ISO 27001 security standards`,
        },
        {
          title: "7. Your Rights (GDPR)",
          content: `You have the following rights regarding your personal data:
          
• **Access**: Request a copy of your data
• **Rectification**: Correct inaccurate or incomplete data
• **Erasure**: Request deletion of your data
• **Restriction**: Limit processing of your data
• **Portability**: Receive your data in structured format
• **Objection**: Object to processing for marketing
• **Consent Withdrawal**: Withdraw consent at any time`,
        },
        {
          title: "8. Data Retention",
          content: `We retain your personal data for the time necessary to:
          
• **Contact Data**: 3 years from last contact
• **Booking Data**: 5 years for contractual obligations
• **Chatbot Conversations**: 2 years for service improvement
• **Marketing Data**: Until consent withdrawal
• **Legal Data**: According to applicable law terms`,
        },
        {
          title: "9. International Transfers",
          content: `Your data may be transferred and processed in countries outside the EU, including United States (for OpenAI and Google services). We ensure adequate protections through:
          
• European Commission Standard Contractual Clauses
• European Commission Adequacy Decisions
• Privacy Shield certifications (where applicable)
• Specific contractual guarantees with suppliers`,
        },
        {
          title: "10. Cookies and Tracking Technologies",
          content: `We use cookies and similar technologies for:
          
• **Technical Cookies**: Site functionality (always active)
• **Analytics Cookies**: Google Analytics for usage statistics
• **Preference Cookies**: Save your language settings
• **Marketing Cookies**: Only with your explicit consent
          
You can manage cookie preferences through browser settings.`,
        },
        {
          title: "11. Minors",
          content: `Our services are not intended for minors under 16 years. We do not knowingly collect personal data from minors. If we become aware of having collected data from a minor, we will delete it immediately.`,
        },
        {
          title: "12. Privacy Policy Changes",
          content: `We may update this Privacy Policy periodically. We will notify you of any significant changes through:
          
• Notice on our website
• Email (if you have provided consent)
• Notification in PraxisBot chatbot
          
Continued use of our services after changes constitutes acceptance of the new policy.`,
        },
        {
          title: "13. Contact",
          content: `For any privacy questions or to exercise your rights, contact us:
          
**Data Protection Officer**
Email: info@praxisfutura.com
Phone: +393500216480
Address: Via dei Mille 5, Brescia, Italy
          
**Supervisory Authority**
You can also file a complaint with the Italian Data Protection Authority (www.gpdp.it).`,
        },
      ],
    },
  }

  const currentContent = content[language as keyof typeof content]

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <Navbar />

      <div className="container mx-auto max-w-4xl px-4 py-20">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-6 text-cyan-400 hover:text-cyan-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === "it" ? "Torna alla Home" : "Back to Home"}
            </Button>
          </Link>

          <div className="flex items-center mb-6">
            <Shield className="w-8 h-8 text-cyan-400 mr-3" />
            <h1 className="text-4xl font-bold text-white">{currentContent.title}</h1>
          </div>

          <p className="text-slate-400 text-lg">{currentContent.lastUpdated}</p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {currentContent.sections.map((section, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-xl text-cyan-400">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-slate-300 leading-relaxed whitespace-pre-line">{section.content}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="mt-12 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-2xl text-cyan-400 flex items-center">
              <Mail className="w-6 h-6 mr-3" />
              {language === "it" ? "Hai Domande?" : "Have Questions?"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 mb-6">
              {language === "it"
                ? "Per qualsiasi domanda sulla privacy o per esercitare i tuoi diritti, non esitare a contattarci."
                : "For any privacy questions or to exercise your rights, don't hesitate to contact us."}
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center text-slate-300">
                <Mail className="w-4 h-4 mr-2 text-cyan-400" />
                <a href="mailto:info@praxisfutura.com" className="hover:text-cyan-300">
                  info@praxisfutura.com
                </a>
              </div>
              <div className="flex items-center text-slate-300">
                <Phone className="w-4 h-4 mr-2 text-cyan-400" />
                <a href="tel:+393500216480" className="hover:text-cyan-300">
                  +393500216480
                </a>
              </div>
              <div className="flex items-center text-slate-300">
                <MapPin className="w-4 h-4 mr-2 text-cyan-400" />
                <span>Brescia, Italia</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
