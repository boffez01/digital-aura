"use client"

import { useLanguage } from "../contexts/language-context"
import Navbar from "../components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cookie, Mail, Phone, MapPin, ArrowLeft, Settings } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CookiePolicy() {
  const { language } = useLanguage()

  const content = {
    it: {
      title: "Cookie Policy",
      lastUpdated: "Ultimo aggiornamento: 29 settembre 2024",
      sections: [
        {
          title: "1. Cosa sono i Cookie",
          content: `I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo quando visiti un sito web. Vengono utilizzati per migliorare la tua esperienza di navigazione e fornire funzionalità personalizzate.

**Tipi di Cookie:**
• **Cookie di Sessione**: Temporanei, eliminati alla chiusura del browser
• **Cookie Persistenti**: Rimangono sul dispositivo per un periodo determinato
• **Cookie di Prima Parte**: Impostati direttamente dal nostro sito
• **Cookie di Terze Parti**: Impostati da servizi esterni che utilizziamo`,
        },
        {
          title: "2. Cookie che Utilizziamo",
          content: `**Cookie Tecnici (Sempre Attivi)**
Necessari per il funzionamento del sito:
• Gestione sessioni utente
• Preferenze linguistiche (IT/EN)
• Sicurezza e autenticazione
• Funzionalità del carrello/prenotazioni

**Cookie Analitici**
Google Analytics per statistiche anonime:
• Pagine più visitate
• Tempo di permanenza
• Dispositivi utilizzati
• Provenienza del traffico
• Comportamento di navigazione

**Cookie di Preferenza**
Per personalizzare l'esperienza:
• Impostazioni lingua salvate
• Preferenze di visualizzazione
• Cronologia interazioni chatbot
• Impostazioni accessibilità

**Cookie di Marketing (Solo con Consenso)**
Per pubblicità personalizzata:
• Remarketing Google Ads
• Facebook Pixel (se attivato)
• LinkedIn Insight Tag
• Tracciamento conversioni`,
        },
        {
          title: "3. Cookie di Terze Parti",
          content: `**Google Analytics**
• Finalità: Analisi traffico e comportamento utenti
• Durata: 2 anni
• Opt-out: https://tools.google.com/dlpage/gaoptout

**Google Fonts**
• Finalità: Caricamento font personalizzati
• Durata: 1 anno
• Dati: Indirizzo IP, user agent

**OpenAI (per AuraBot)**
• Finalità: Funzionamento chatbot AI
• Durata: Sessione
• Dati: Conversazioni anonimizzate

**Vercel (Hosting)**
• Finalità: Performance e sicurezza sito
• Durata: Sessione
• Dati: Metriche tecniche

**reCAPTCHA (se attivo)**
• Finalità: Protezione spam
• Durata: 6 mesi
• Dati: Interazioni utente`,
        },
        {
          title: "4. Base Legale",
          content: `**Cookie Tecnici**
• Base legale: Interesse legittimo
• Necessari per fornire il servizio richiesto
• Non richiedono consenso esplicito

**Cookie Analitici**
• Base legale: Interesse legittimo
• Dati aggregati e anonimi
• Possibilità di opt-out

**Cookie di Marketing**
• Base legale: Consenso esplicito
• Richiesta autorizzazione specifica
• Revocabile in qualsiasi momento

**Cookie di Profilazione**
• Base legale: Consenso esplicito
• Solo per servizi personalizzati
• Controllo granulare delle preferenze`,
        },
        {
          title: "5. Durata dei Cookie",
          content: `**Cookie di Sessione**
• Durata: Fino alla chiusura del browser
• Utilizzo: Funzionalità temporanee
• Esempi: Carrello, login temporaneo

**Cookie Persistenti**
• Cookie tecnici: 1 anno
• Cookie analitici: 2 anni (Google Analytics)
• Cookie preferenze: 1 anno
• Cookie marketing: 30-90 giorni (variabile)

**Pulizia Automatica**
• Rimozione automatica alla scadenza
• Possibilità di eliminazione manuale
• Reset periodico per privacy`,
        },
        {
          title: "6. Come Gestire i Cookie",
          content: `**Impostazioni Browser**
Tutti i browser permettono di:
• Bloccare tutti i cookie
• Bloccare cookie di terze parti
• Eliminare cookie esistenti
• Ricevere notifiche prima dell'installazione

**Browser Specifici:**

**Chrome:**
Impostazioni > Privacy e sicurezza > Cookie

**Firefox:**
Impostazioni > Privacy e sicurezza > Cookie e dati dei siti web

**Safari:**
Preferenze > Privacy > Gestisci dati siti web

**Edge:**
Impostazioni > Privacy, ricerca e servizi > Cookie

**Modalità Incognito/Privata:**
• Non salva cookie permanenti
• Elimina tutto alla chiusura
• Limitazioni funzionalità sito`,
        },
        {
          title: "7. Cookie e PraxisBot",
          content: `Il nostro chatbot PraxisBot utilizza cookie per:

**Funzionalità:**
• Mantenere contesto conversazione
• Ricordare preferenze utente
• Migliorare risposte personalizzate
• Salvare cronologia chat (locale)

**Privacy:**
• Conversazioni anonimizzate
• Nessun dato personale nei cookie
• Crittografia end-to-end
• Eliminazione automatica dopo 30 giorni

**Controllo:**
• Possibilità di disabilitare cronologia
• Reset conversazione manuale
• Opt-out completo dal servizio`,
        },
        {
          title: "8. Cookie e Performance",
          content: `**Ottimizzazione Sito:**
• Cache intelligente per velocità
• Precaricamento contenuti
• Compressione automatica
• CDN geografico

**Monitoraggio Performance:**
• Tempi di caricamento pagine
• Errori JavaScript
• Metriche Core Web Vitals
• Esperienza utente mobile

**Dati Raccolti:**
• Solo metriche tecniche anonime
• Nessun dato personale identificabile
• Aggregazione statistica
• Finalità esclusivamente tecniche`,
        },
        {
          title: "9. I Tuoi Diritti",
          content: `**Diritto di Controllo:**
• Accettare o rifiutare cookie non tecnici
• Modificare preferenze in qualsiasi momento
• Eliminare cookie esistenti
• Ricevere informazioni dettagliate

**Diritto di Accesso:**
• Sapere quali cookie sono attivi
• Conoscere finalità di utilizzo
• Ottenere durata di conservazione
• Identificare terze parti coinvolte

**Diritto di Opposizione:**
• Opt-out da cookie analitici
• Blocco cookie marketing
• Disattivazione profilazione
• Revoca consenso precedente

**Diritto alla Portabilità:**
• Esportazione preferenze
• Trasferimento impostazioni
• Backup configurazioni personali`,
        },
        {
          title: "10. Modifiche alla Cookie Policy",
          content: `**Notifiche di Modifica:**
• Banner informativo sul sito
• Email agli utenti registrati
• Notifica tramite PraxisBot
• Aggiornamento data "ultimo aggiornamento"

**Periodo di Transizione:**
• 30 giorni per adeguamento
• Mantenimento impostazioni esistenti
• Possibilità di opt-out
• Supporto per domande

**Versioning:**
• Archivio versioni precedenti
• Changelog dettagliato
• Confronto modifiche
• Storico accessibile su richiesta`,
        },
        {
          title: "11. Contatti e Supporto",
          content: `**Per Domande sui Cookie:**
Email: info@praxisfutura.com
Telefono: +393500216480
Orari: Lun-Ven 9:00-18:00

**Supporto Tecnico:**
• Guida configurazione browser
• Assistenza problemi cookie
• Supporto impostazioni privacy
• Risoluzione conflitti

**Data Protection Officer:**
• Responsabile protezione dati
• Consulenza specializzata
• Gestione reclami
• Interfaccia con autorità

**Risorse Utili:**
• Guide browser aggiornate
• Tool controllo cookie
• Verificatori privacy
• Best practice sicurezza`,
        },
      ],
    },
    en: {
      title: "Cookie Policy",
      lastUpdated: "Last updated: September 29, 2024",
      sections: [
        {
          title: "1. What are Cookies",
          content: `Cookies are small text files that are stored on your device when you visit a website. They are used to improve your browsing experience and provide personalized functionality.

**Types of Cookies:**
• **Session Cookies**: Temporary, deleted when browser closes
• **Persistent Cookies**: Remain on device for a determined period
• **First-Party Cookies**: Set directly by our site
• **Third-Party Cookies**: Set by external services we use`,
        },
        {
          title: "2. Cookies We Use",
          content: `**Technical Cookies (Always Active)**
Necessary for site functionality:
• User session management
• Language preferences (IT/EN)
• Security and authentication
• Cart/booking functionality

**Analytics Cookies**
Google Analytics for anonymous statistics:
• Most visited pages
• Time spent on site
• Devices used
• Traffic sources
• Navigation behavior

**Preference Cookies**
To personalize experience:
• Saved language settings
• Display preferences
• Chatbot interaction history
• Accessibility settings

**Marketing Cookies (Only with Consent)**
For personalized advertising:
• Google Ads remarketing
• Facebook Pixel (if activated)
• LinkedIn Insight Tag
• Conversion tracking`,
        },
        {
          title: "3. Third-Party Cookies",
          content: `**Google Analytics**
• Purpose: Traffic analysis and user behavior
• Duration: 2 years
• Opt-out: https://tools.google.com/dlpage/gaoptout

**Google Fonts**
• Purpose: Loading custom fonts
• Duration: 1 year
• Data: IP address, user agent

**OpenAI (for AuraBot)**
• Purpose: AI chatbot functionality
• Duration: Session
• Data: Anonymized conversations

**Vercel (Hosting)**
• Purpose: Site performance and security
• Duration: Session
• Data: Technical metrics

**reCAPTCHA (if active)**
• Purpose: Spam protection
• Duration: 6 months
• Data: User interactions`,
        },
        {
          title: "4. Legal Basis",
          content: `**Technical Cookies**
• Legal basis: Legitimate interest
• Necessary to provide requested service
• Do not require explicit consent

**Analytics Cookies**
• Legal basis: Legitimate interest
• Aggregated and anonymous data
• Opt-out possibility

**Marketing Cookies**
• Legal basis: Explicit consent
• Specific authorization required
• Revocable at any time

**Profiling Cookies**
• Legal basis: Explicit consent
• Only for personalized services
• Granular preference control`,
        },
        {
          title: "5. Cookie Duration",
          content: `**Session Cookies**
• Duration: Until browser closure
• Use: Temporary functionality
• Examples: Cart, temporary login

**Persistent Cookies**
• Technical cookies: 1 year
• Analytics cookies: 2 years (Google Analytics)
• Preference cookies: 1 year
• Marketing cookies: 30-90 days (variable)

**Automatic Cleanup**
• Automatic removal at expiration
• Manual deletion possibility
• Periodic reset for privacy`,
        },
        {
          title: "6. How to Manage Cookies",
          content: `**Browser Settings**
All browsers allow you to:
• Block all cookies
• Block third-party cookies
• Delete existing cookies
• Receive notifications before installation

**Browser Specific:**

**Chrome:**
Settings > Privacy and security > Cookies

**Firefox:**
Settings > Privacy and security > Cookies and site data

**Safari:**
Preferences > Privacy > Manage website data

**Edge:**
Settings > Privacy, search and services > Cookies

**Incognito/Private Mode:**
• Doesn't save permanent cookies
• Deletes everything on closure
• Site functionality limitations`,
        },
        {
          title: "7. Cookies and PraxisBot",
          content: `Our PraxisBot chatbot uses cookies for:

**Functionality:**
• Maintain conversation context
• Remember user preferences
• Improve personalized responses
• Save chat history (local)

**Privacy:**
• Anonymized conversations
• No personal data in cookies
• End-to-end encryption
• Automatic deletion after 30 days

**Control:**
• Ability to disable history
• Manual conversation reset
• Complete service opt-out`,
        },
        {
          title: "8. Cookies and Performance",
          content: `**Site Optimization:**
• Intelligent cache for speed
• Content preloading
• Automatic compression
• Geographic CDN

**Performance Monitoring:**
• Page loading times
• JavaScript errors
• Core Web Vitals metrics
• Mobile user experience

**Data Collected:**
• Only anonymous technical metrics
• No personally identifiable data
• Statistical aggregation
• Exclusively technical purposes`,
        },
        {
          title: "9. Your Rights",
          content: `**Right of Control:**
• Accept or refuse non-technical cookies
• Modify preferences at any time
• Delete existing cookies
• Receive detailed information

**Right of Access:**
• Know which cookies are active
• Know usage purposes
• Get retention duration
• Identify involved third parties

**Right of Opposition:**
• Opt-out from analytics cookies
• Block marketing cookies
• Disable profiling
• Revoke previous consent

**Right to Portability:**
• Export preferences
• Transfer settings
• Backup personal configurations`,
        },
        {
          title: "10. Cookie Policy Changes",
          content: `**Change Notifications:**
• Informative banner on site
• Email to registered users
• Notification via PraxisBot
• Update of "last updated" date

**Transition Period:**
• 30 days for adaptation
• Maintenance of existing settings
• Opt-out possibility
• Support for questions

**Versioning:**
• Archive of previous versions
• Detailed changelog
• Change comparison
• History accessible on request`,
        },
        {
          title: "11. Contact and Support",
          content: `**For Cookie Questions:**
Email: info@praxisfutura.com
Phone: +393500216480
Hours: Mon-Fri 9:00-18:00

**Technical Support:**
• Browser configuration guide
• Cookie problem assistance
• Privacy settings support
• Conflict resolution

**Data Protection Officer:**
• Data protection manager
• Specialized consulting
• Complaint management
• Interface with authorities

**Useful Resources:**
• Updated browser guides
• Cookie control tools
• Privacy checkers
• Security best practices`,
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
            <Cookie className="w-8 h-8 text-cyan-400 mr-3" />
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

        {/* Cookie Management Section */}
        <Card className="mt-12 bg-gradient-to-r from-orange-600/10 to-yellow-600/10 border-orange-500/30">
          <CardHeader>
            <CardTitle className="text-2xl text-orange-400 flex items-center">
              <Settings className="w-6 h-6 mr-3" />
              {language === "it" ? "Gestisci Cookie" : "Manage Cookies"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 mb-6">
              {language === "it"
                ? "Puoi gestire le tue preferenze sui cookie attraverso le impostazioni del browser o contattandoci direttamente."
                : "You can manage your cookie preferences through browser settings or by contacting us directly."}
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center text-slate-300">
                <Mail className="w-4 h-4 mr-2 text-orange-400" />
                <a href="mailto:info@praxisfutura.com" className="hover:text-orange-300">
                  info@praxisfutura.com
                </a>
              </div>
              <div className="flex items-center text-slate-300">
                <Phone className="w-4 h-4 mr-2 text-orange-400" />
                <a href="tel:+393500216480" className="hover:text-orange-300">
                  +393500216480
                </a>
              </div>
              <div className="flex items-center text-slate-300">
                <MapPin className="w-4 h-4 mr-2 text-orange-400" />
                <span>Brescia, Italia</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
