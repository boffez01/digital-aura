-- 🧹 CLEAN DUPLICATE APPOINTMENTS
-- First, let's see what we have
SELECT date, time, COUNT(*) as count 
FROM appointments 
WHERE date = '2025-09-09' 
GROUP BY date, time 
HAVING COUNT(*) > 1;

-- Delete all appointments for the test date
DELETE FROM appointments WHERE date = '2025-09-09';

-- Insert clean test data with proper time format
INSERT INTO appointments (
  name, email, phone, service, date, time, message, status, priority, created_at, updated_at
) VALUES 
  ('Mario Rossi', 'mario.rossi@email.com', '+39 123 456 7890', 'Consulenza Strategica', '2025-09-09', '09:30', 'Richiesta consulenza per startup', 'confirmed', false, NOW(), NOW()),
  ('Laura Bianchi', 'laura.bianchi@email.com', '+39 987 654 3210', 'Demo Personalizzata', '2025-09-09', '11:00', 'Interessata alle soluzioni AI', 'pending', false, NOW(), NOW()),
  ('Giuseppe Verdi', 'giuseppe.verdi@email.com', '+39 555 123 4567', 'Analisi Progetto', '2025-09-09', '15:00', 'Valutazione progetto e-commerce', 'confirmed', true, NOW(), NOW()),
  ('Anna Neri', 'anna.neri@email.com', '+39 333 987 6543', 'Supporto Prioritario', '2025-09-09', '16:30', 'Problema critico da risolvere', 'confirmed', true, NOW(), NOW());

-- Verify the data
SELECT 
  id, 
  name, 
  date, 
  time, 
  service, 
  status,
  created_at
FROM appointments 
WHERE date = '2025-09-09' 
ORDER BY time ASC;

-- Count to verify that there are no duplicates
SELECT 
  date, 
  time, 
  COUNT(*) as count
FROM appointments 
WHERE date = '2025-09-09'
GROUP BY date, time
HAVING COUNT(*) > 1;
