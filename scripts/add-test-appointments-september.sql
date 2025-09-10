-- Aggiungi appuntamenti di test per l'8 settembre 2025
-- Prima cancella eventuali appuntamenti esistenti per quella data
DELETE FROM appointments WHERE date = '2025-09-08';

-- Inserisci appuntamenti di test
INSERT INTO appointments (
  name, email, phone, service, date, time, message, status, priority, created_at, updated_at
) VALUES 
  ('Mario Rossi', 'mario.rossi@email.com', '+39 123 456 7890', 'ai-automation', '2025-09-08', '09:30', 'Consulenza per automazione AI', 'confirmed', false, NOW(), NOW()),
  ('Giulia Bianchi', 'giulia.bianchi@email.com', '+39 987 654 3210', 'chatbots', '2025-09-08', '11:00', 'Demo chatbot per e-commerce', 'pending', false, NOW(), NOW()),
  ('Luca Verdi', 'luca.verdi@email.com', '+39 555 123 4567', 'web-development', '2025-09-08', '15:00', 'Sviluppo sito web aziendale', 'confirmed', false, NOW(), NOW()),
  ('Anna Neri', 'anna.neri@email.com', '+39 333 987 6543', 'ai-marketing', '2025-09-08', '16:30', 'Strategia marketing con AI', 'pending', true, NOW(), NOW());

-- Verifica che i dati siano stati inseriti
SELECT 
  id, name, email, service, date, time, status, priority, created_at
FROM appointments 
WHERE date = '2025-09-08' 
ORDER BY time ASC;
