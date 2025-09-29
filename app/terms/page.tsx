"use client"

import { useLanguage } from "../contexts/language-context"
import Navbar from "../components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Mail, Phone, MapPin, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TermsOfService() {
  const { language } = useLanguage()

  const content = {
    it: {
      title: "Termini e Condizioni di Servizio",
      lastUpdated: "Ultimo aggiornamento: 29 settembre 2024",
      sections: [
        {
          title: "1. Oggetto del Servizio",
          content: `Digital Aura fornisce servizi di consulenza e sviluppo in ambito intelligenza artificiale, automazione, sviluppo web e marketing digitale. I servizi includono:

• Consulenza strategica per l'implementazione di soluzioni AI
• Sviluppo di chatbot intelligenti personalizzati
• Automazione di processi aziendali
• Sviluppo di siti web e applicazioni
• Strategie di marketing digitale AI-powered
• Supporto tecnico e manutenzione
• Servizio di chatbot AuraBot per assistenza clienti`,
        },
        {
          title: "2. Accettazione dei Termini",
          content: `Utilizzando i nostri servizi, accetti integralmente questi Termini e Condizioni. Se non accetti questi termini, non utilizzare i nostri servizi.

L'accettazione può avvenire attraverso:
• Utilizzo del sito web e dei servizi
• Prenotazione di appuntamenti
• Interazione con AuraBot
• Firma di contratti specifici
• Comunicazione via email o telefono`,
        },
        {
          title: "3. Prenotazione Appuntamenti",
          content: `Il sistema di prenotazione appuntamenti funziona come segue:

**Prenotazione:**
• Disponibile 24/7 attraverso il sito web
• Conferma automatica via email
• Promemoria 24 ore prima dell'appuntamento
• Integrazione con Google Calendar

**Modifiche:**
• Possibili fino a 24 ore prima dell'appuntamento
• Notifica automatica delle modifiche
• Riprogrammazione gratuita (max 2 volte)

**Cancellazioni:**
• Gratuite fino a 24 ore prima
• Penale del 50% per cancellazioni tardive
• No-show: addebito del 100% della consulenza`,
        },
        {
          title: "4. AuraBot - Chatbot AI",
          content: `AuraBot è il nostro assistente virtuale AI che fornisce:

**Servizi Disponibili:**
• Informazioni sui nostri servizi
• Supporto per prenotazioni
• FAQ e risposte tecniche
• Assistenza pre e post vendita
• Raccolta feedback clienti

**Limitazioni:**
• Non sostituisce la consulenza professionale
• Le risposte sono generate da AI e possono contenere errori
• Non può accedere a dati sensibili o riservati
• Disponibile in italiano e inglese

**Responsabilità:**
• Le informazioni fornite da AuraBot sono indicative
• Per decisioni importanti, consulta sempre un esperto umano
• Non ci assumiamo responsabilità per errori dell'AI`,
        },
        {
          title: "5. Obblighi del Cliente",
          content: `Il cliente si impegna a:

**Informazioni:**
• Fornire informazioni accurate e complete
• Aggiornare tempestivamente i dati di contatto
• Comunicare eventuali modifiche ai requisiti

**Collaborazione:**
• Partecipare attivamente al processo di sviluppo
• Fornire feedback costruttivo e tempestivo
• Rispettare le scadenze concordate

**Pagamenti:**
• Effettuare i pagamenti secondo i termini concordati
• Comunicare eventuali problemi di fatturazione
• Mantenere aggiornati i metodi di pagamento

**Utilizzo Appropriato:**
• Non utilizzare i servizi per scopi illegali
• Rispettare i diritti di proprietà intellettuale
• Non interferire con il funzionamento dei sistemi`,
        },
        {
          title: "6. Proprietà Intellettuale",
          content: `**Nostri Diritti:**
• Digital Aura mantiene tutti i diritti su metodologie, framework e know-how
• Il codice sorgente sviluppato rimane di nostra proprietà salvo accordi specifici
• Marchi, loghi e contenuti del sito sono protetti da copyright

**Diritti del Cliente:**
• Licenza d'uso esclusiva per le soluzioni sviluppate
• Proprietà dei dati e contenuti forniti
• Diritto di utilizzo commerciale delle soluzioni

**Materiali di Terze Parti:**
• Librerie e framework open source: soggetti alle rispettive licenze
• Servizi di terze parti (Google, OpenAI): soggetti ai loro termini
• Immagini e contenuti: utilizzati secondo licenze appropriate`,
        },
        {
          title: "7. Limitazioni di Responsabilità",
          content: `**Esclusioni:**
Digital Aura non è responsabile per:
• Danni indiretti, consequenziali o punitivi
• Perdita di profitti o opportunità commerciali
• Interruzioni di servizio dovute a cause esterne
• Errori o malfunzionamenti di sistemi di terze parti

**Limitazioni:**
• La responsabilità massima è limitata all'importo pagato per il servizio
• Garanzia limitata a 90 giorni per difetti di sviluppo
• Esclusione di garanzie implicite di commerciabilità

**Forza Maggiore:**
• Eventi naturali, guerre, pandemie
• Interruzioni di servizi internet o cloud
• Modifiche normative che impediscono l'esecuzione`,
        },
        {
          title: "8. Protezione dei Dati",
          content: `**Conformità GDPR:**
• Trattamento dati secondo Privacy Policy
• Misure di sicurezza appropriate
• Diritti dell'interessato garantiti

**Dati del Cliente:**
• Backup automatici e sicuri
• Crittografia end-to-end
• Accesso limitato al personale autorizzato
• Conservazione secondo termini di legge

**Trasferimenti Internazionali:**
• Utilizzo di servizi cloud conformi GDPR
• Clausole contrattuali standard
• Garanzie di protezione adeguata`,
        },
        {
          title: "9. Modifiche ai Termini",
          content: `**Procedura di Modifica:**
• Notifica via email 30 giorni prima
• Pubblicazione sul sito web
• Notifica attraverso AuraBot

**Accettazione:**
• Uso continuato dei servizi implica accettazione
• Diritto di recesso entro 30 giorni
• Contratti in corso: applicazione graduale

**Versioning:**
• Mantenimento storico delle versioni
• Data di entrata in vigore chiaramente indicata
• Archivio consultabile su richiesta`,
        },
        {
          title: "10. Risoluzione Controversie",
          content: `**Tentativo di Conciliazione:**
• Comunicazione diretta con il nostro team
• Mediazione attraverso organismo qualificato
• Tentativo di risoluzione amichevole

**Foro Competente:**
• Tribunale di Brescia per controversie con consumatori italiani
• Legge italiana applicabile
• Procedimenti in lingua italiana

**Arbitrato:**
• Possibilità di arbitrato per controversie commerciali
• Camera di Commercio di Brescia
• Procedura semplificata per importi inferiori a €25.000`,
        },
        {
          title: "11. Disposizioni Finali",
          content: `**Validità:**
• Se una clausola è invalida, le altre rimangono efficaci
• Interpretazione secondo buona fede
• Prevalenza della versione italiana in caso di conflitto

**Comunicazioni:**
• Email: legal@digitalaura.it
• PEC: digitalaura@pec.it
• Raccomandata: Via dei Mille 5, Brescia

**Entrata in Vigore:**
• Termini efficaci dal 29 settembre 2024
• Applicabili a tutti i nuovi contratti
• Contratti esistenti: transizione graduale`,
        },
      ],
    },
    en: {
      title: "Terms and Conditions of Service",
      lastUpdated: "Last updated: September 29, 2024",
      sections: [
        {
          title: "1. Service Object",
          content: `Digital Aura provides consulting and development services in artificial intelligence, automation, web development and digital marketing. Services include:

• Strategic consulting for AI solution implementation
• Development of personalized intelligent chatbots
• Business process automation
• Website and application development
• AI-powered digital marketing strategies
• Technical support and maintenance
• AuraBot chatbot service for customer assistance`,
        },
        {
          title: "2. Acceptance of Terms",
          content: `By using our services, you fully accept these Terms and Conditions. If you do not accept these terms, do not use our services.

Acceptance can occur through:
• Use of website and services
• Booking appointments
• Interaction with AuraBot
• Signing specific contracts
• Communication via email or phone`,
        },
        {
          title: "3. Appointment Booking",
          content: `The appointment booking system works as follows:

**Booking:**
• Available 24/7 through the website
• Automatic email confirmation
• Reminder 24 hours before appointment
• Google Calendar integration

**Modifications:**
• Possible up to 24 hours before appointment
• Automatic notification of changes
• Free rescheduling (max 2 times)

**Cancellations:**
• Free up to 24 hours before
• 50% penalty for late cancellations
• No-show: 100% consultation charge`,
        },
        {
          title: "4. AuraBot - AI Chatbot",
          content: `AuraBot is our AI virtual assistant that provides:

**Available Services:**
• Information about our services
• Support for bookings
• FAQ and technical answers
• Pre and post-sales assistance
• Customer feedback collection

**Limitations:**
• Does not replace professional consulting
• Responses are AI-generated and may contain errors
• Cannot access sensitive or confidential data
• Available in Italian and English

**Responsibility:**
• Information provided by AuraBot is indicative
• For important decisions, always consult a human expert
• We assume no responsibility for AI errors`,
        },
        {
          title: "5. Client Obligations",
          content: `The client commits to:

**Information:**
• Provide accurate and complete information
• Update contact details promptly
• Communicate any requirement changes

**Collaboration:**
• Actively participate in the development process
• Provide constructive and timely feedback
• Respect agreed deadlines

**Payments:**
• Make payments according to agreed terms
• Communicate any billing issues
• Keep payment methods updated

**Appropriate Use:**
• Not use services for illegal purposes
• Respect intellectual property rights
• Not interfere with system operations`,
        },
        {
          title: "6. Intellectual Property",
          content: `**Our Rights:**
• Digital Aura maintains all rights to methodologies, frameworks and know-how
• Developed source code remains our property unless specifically agreed
• Trademarks, logos and site content are copyright protected

**Client Rights:**
• Exclusive use license for developed solutions
• Ownership of provided data and content
• Right to commercial use of solutions

**Third-Party Materials:**
• Open source libraries and frameworks: subject to respective licenses
• Third-party services (Google, OpenAI): subject to their terms
• Images and content: used according to appropriate licenses`,
        },
        {
          title: "7. Liability Limitations",
          content: `**Exclusions:**
Digital Aura is not responsible for:
• Indirect, consequential or punitive damages
• Loss of profits or business opportunities
• Service interruptions due to external causes
• Errors or malfunctions of third-party systems

**Limitations:**
• Maximum liability limited to amount paid for service
• Limited warranty to 90 days for development defects
• Exclusion of implied warranties of merchantability

**Force Majeure:**
• Natural events, wars, pandemics
• Internet or cloud service interruptions
• Regulatory changes preventing execution`,
        },
        {
          title: "8. Data Protection",
          content: `**GDPR Compliance:**
• Data processing according to Privacy Policy
• Appropriate security measures
• Data subject rights guaranteed

**Client Data:**
• Automatic and secure backups
• End-to-end encryption
• Limited access to authorized personnel
• Retention according to legal terms

**International Transfers:**
• Use of GDPR-compliant cloud services
• Standard contractual clauses
• Adequate protection guarantees`,
        },
        {
          title: "9. Terms Modifications",
          content: `**Modification Procedure:**
• Email notification 30 days before
• Publication on website
• Notification through AuraBot

**Acceptance:**
• Continued use of services implies acceptance
• Right of withdrawal within 30 days
• Ongoing contracts: gradual application

**Versioning:**
• Historical maintenance of versions
• Effective date clearly indicated
• Archive available on request`,
        },
        {
          title: "10. Dispute Resolution",
          content: `**Conciliation Attempt:**
• Direct communication with our team
• Mediation through qualified organization
• Attempt at amicable resolution

**Competent Court:**
• Court of Brescia for disputes with Italian consumers
• Italian law applicable
• Proceedings in Italian language

**Arbitration:**
• Possibility of arbitration for commercial disputes
• Chamber of Commerce of Brescia
• Simplified procedure for amounts under €25,000`,
        },
        {
          title: "11. Final Provisions",
          content: `**Validity:**
• If a clause is invalid, others remain effective
• Interpretation according to good faith
• Italian version prevails in case of conflict

**Communications:**
• Email: legal@digitalaura.it
• PEC: digitalaura@pec.it
• Registered mail: Via dei Mille 5, Brescia

**Entry into Force:**
• Terms effective from September 29, 2024
• Applicable to all new contracts
• Existing contracts: gradual transition`,
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
            <FileText className="w-8 h-8 text-cyan-400 mr-3" />
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
              {language === "it" ? "Domande Legali?" : "Legal Questions?"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 mb-6">
              {language === "it"
                ? "Per qualsiasi domanda sui termini di servizio o questioni legali, contattaci."
                : "For any questions about terms of service or legal matters, contact us."}
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center text-slate-300">
                <Mail className="w-4 h-4 mr-2 text-cyan-400" />
                <a href="mailto:legal@digitalaura.it" className="hover:text-cyan-300">
                  legal@digitalaura.it
                </a>
              </div>
              <div className="flex items-center text-slate-300">
                <Phone className="w-4 h-4 mr-2 text-cyan-400" />
                <a href="tel:+393500216480" className="hover:text-cyan-300">
                  +39 350 021 6480
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
