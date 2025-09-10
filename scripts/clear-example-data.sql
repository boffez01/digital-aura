-- Script per pulire completamente il database dai dati di esempio
-- ⚠️ ATTENZIONE: Questo cancellerà TUTTI i dati!

-- 1. Cancella tutti gli appuntamenti
DELETE FROM appointments;

-- 2. Cancella tutti i contatti  
DELETE FROM contacts;

-- 3. Reset delle sequenze (se necessario)
ALTER SEQUENCE appointments_id_seq RESTART WITH 1;
ALTER SEQUENCE contacts_id_seq RESTART WITH 1;

-- 4. Verifica che tutto sia pulito
SELECT 
  'appointments' as table_name, 
  COUNT(*) as record_count 
FROM appointments
UNION ALL
SELECT 
  'contacts' as table_name, 
  COUNT(*) as record_count 
FROM contacts;

-- 5. Mostra la struttura delle tabelle per conferma
\d appointments;
\d contacts;
