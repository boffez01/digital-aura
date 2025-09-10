-- Verifica gli appuntamenti per l'8 settembre 2025
SELECT 
  id, 
  name, 
  email, 
  service, 
  date, 
  time, 
  status, 
  priority,
  created_at
FROM appointments 
WHERE date = '2025-09-08' 
ORDER BY time ASC;

-- Conta gli appuntamenti per data
SELECT 
  date, 
  COUNT(*) as total_appointments,
  COUNT(CASE WHEN status != 'cancelled' THEN 1 END) as active_appointments
FROM appointments 
WHERE date = '2025-09-08'
GROUP BY date;

-- Mostra tutti gli orari occupati
SELECT 
  time,
  name,
  status
FROM appointments 
WHERE date = '2025-09-08' AND status != 'cancelled'
ORDER BY time ASC;
