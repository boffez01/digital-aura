-- Script per controllare il contenuto del database
-- Esegui questo per vedere tutti i dati reali

-- 1. Controlla la struttura della tabella appointments
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'appointments'
ORDER BY ordinal_position;

-- 2. Conta tutti gli appuntamenti
SELECT 
  COUNT(*) as total_appointments,
  COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
  COUNT(CASE WHEN status = 'confirmed' THEN 1 END) as confirmed,
  COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled,
  COUNT(CASE WHEN priority = true THEN 1 END) as priority_appointments
FROM appointments;

-- 3. Mostra tutti gli appuntamenti (se ci sono)
SELECT 
  id,
  name,
  email,
  phone,
  service,
  date,
  time,
  status,
  priority,
  created_at
FROM appointments 
ORDER BY created_at DESC
LIMIT 20;

-- 4. Controlla appuntamenti per data
SELECT 
  date,
  COUNT(*) as appointments_count,
  string_agg(time, ', ' ORDER BY time) as times
FROM appointments 
GROUP BY date 
ORDER BY date DESC;

-- 5. Controlla se ci sono dati nella tabella contacts
SELECT COUNT(*) as total_contacts FROM contacts;

-- 6. Mostra ultimi 5 contatti (se ci sono)
SELECT id, name, email, subject, created_at 
FROM contacts 
ORDER BY created_at DESC 
LIMIT 5;
