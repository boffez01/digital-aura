# Setup Workspace Italiano Zoho Bookings

## Panoramica

Il tuo sistema ora supporta **due workspace Zoho Bookings separati**:
- **Workspace Inglese** (esistente) - Email in inglese
- **Workspace Italiano** (da configurare) - Email in italiano

Il sistema sceglie automaticamente il workspace corretto in base alla lingua selezionata dall'utente.

---

## Prerequisiti

Prima di iniziare, assicurati di avere:
- ✅ Account Zoho con accesso a entrambi i workspace (Inglese e Italiano)
- ✅ Accesso al dashboard di Vercel per aggiungere variabili d'ambiente
- ✅ I 5 servizi italiani già creati su Zoho Bookings workspace italiano

---

## Passo 1: Esegui la Migrazione Database

Il sistema ha bisogno di una nuova tabella per salvare i token del workspace italiano.

1. Vai nella sezione **Scripts** del progetto
2. Esegui lo script SQL: `scripts/add-italian-workspace-support.sql`
3. Verifica che la tabella `zoho_tokens` abbia il campo `service` aggiornato

---

## Passo 2: Autorizza il Workspace Italiano

1. Apri nel browser: `https://tuodominio.com/setup-italian-workspace`
2. Clicca su **"Inizia Autorizzazione Workspace Italiano"**
3. Verrai reindirizzato a Zoho OAuth
4. **IMPORTANTE**: Quando Zoho ti chiede di selezionare il workspace, scegli **"Praxis Futura Italian"** (o il nome del tuo workspace italiano)
5. Autorizza l'accesso alle API
6. Verrai reindirizzato a una pagina di successo che mostrerà:
   - ✅ Conferma autorizzazione completata
   - 📋 **Organization ID** del workspace italiano (copialo!)

---

## Passo 3: Aggiungi Variabili d'Ambiente

Vai su **Vercel Dashboard** → Tuo Progetto → **Settings** → **Environment Variables**

Aggiungi queste nuove variabili:

### `ZOHO_ORGANIZATION_ID_IT`
- **Valore**: L'Organization ID che hai copiato dalla pagina di successo (es: `123456789`)
- **Descrizione**: Organization ID del workspace italiano

### `ZOHO_REFRESH_TOKEN_IT` (Opzionale)
- **Valore**: Se vuoi salvare il refresh token nelle variabili d'ambiente invece che nel database
- **Nota**: Il sistema salva automaticamente il refresh token nel database, quindi questa variabile è opzionale

---

## Passo 4: Redeploy

1. Dopo aver aggiunto le variabili, fai un redeploy del progetto su Vercel
2. Il sistema ora è configurato per usare entrambi i workspace

---

## Come Funziona

### Switch Automatico Workspace

Quando un utente prenota:
1. Il sistema rileva la lingua selezionata (italiano o inglese)
2. Se **italiano**:
   - Usa i service ID italiani: `251678000000045068`, `251678000000045096`, etc.
   - Usa il token del workspace italiano (`bookings_italian` nel database)
   - Usa `ZOHO_ORGANIZATION_ID_IT`
   - L'email arriva in italiano dal workspace italiano
3. Se **inglese**:
   - Usa i service ID inglesi dalle variabili ambiente esistenti
   - Usa il token del workspace inglese (`bookings` nel database)
   - Usa `ZOHO_ORGANIZATION_ID`
   - L'email arriva in inglese dal workspace inglese

---

## Verifica che Funzioni

### Test Prenotazione Italiana

1. Vai sul sito in lingua italiana
2. Apri il chatbot
3. Scrivi "prenota" o "book"
4. Completa il flusso di prenotazione
5. Verifica che:
   - ✅ La prenotazione appaia nel workspace italiano di Zoho
   - ✅ L'email arrivi in italiano
   - ✅ Il service corretto sia selezionato

### Test Prenotazione Inglese

1. Cambia lingua in inglese
2. Ripeti il test
3. Verifica che la prenotazione vada nel workspace inglese

---

## Troubleshooting

### ❌ Email ancora in inglese
**Causa**: Organization ID italiano non configurato o errato
**Soluzione**: 
- Verifica che `ZOHO_ORGANIZATION_ID_IT` sia configurato correttamente in Vercel
- Redeploy il progetto

### ❌ Errore "Token not found"
**Causa**: OAuth non completato o token non salvato nel database
**Soluzione**:
- Vai su `/setup-italian-workspace` e riautorizza il workspace italiano
- Verifica che il database abbia la riga con `service = 'bookings_italian'`

### ❌ Service ID non trovato
**Causa**: I service ID italiani non esistono nel workspace
**Soluzione**:
- Verifica che i 5 servizi siano stati creati nel workspace italiano
- Controlla che gli ID corrispondano a quelli hardcoded in `lib/zoho-service.ts`:
  - AI Automation: `251678000000045068`
  - Chatbots: `251678000000045096`
  - Web Development: `251678000000045082`
  - AI Marketing: `251678000000045110`
  - Priority Support: `251678000000051010`

---

## Service ID Configurati

### Workspace Italiano (Hardcoded)
- **AI Automation**: `251678000000045068`
- **Intelligent Chatbots**: `251678000000045096`
- **Web Development**: `251678000000045082`
- **AI Marketing**: `251678000000045110`
- **Priority Support**: `251678000000051010`

### Workspace Inglese (Variabili Ambiente)
- **AI Automation**: `ZOHO_SERVICE_ID_AI_AUTOMATION`
- **Intelligent Chatbots**: `ZOHO_SERVICE_ID_CHATBOTS`
- **Web Development**: `ZOHO_SERVICE_ID_WEB_DEVELOPMENT`
- **AI Marketing**: `ZOHO_SERVICE_ID_AI_MARKETING`
- **Priority Support**: `ZOHO_SERVICE_ID_PRIORITY_SUPPORT`

---

## Supporto

Se hai problemi con la configurazione:
1. Controlla i log del server per errori OAuth
2. Verifica che il database abbia la riga `bookings_italian` nella tabella `zoho_tokens`
3. Controlla che le variabili d'ambiente siano configurate correttamente su Vercel
