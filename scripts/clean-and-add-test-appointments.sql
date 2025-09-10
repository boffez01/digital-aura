-- Clean existing test data and add proper test appointments
DELETE FROM appointments WHERE date = '2025-09-08';

-- Add clean test data for September 8, 2025
INSERT INTO appointments (name, email, phone, service, date, time, message, status, priority, created_at, updated_at) VALUES
('Mario Rossi', 'mario.rossi@email.com', '+39 123 456 7890', 'ai-automation', '2025-09-08', '09:30', 'Consulenza strategica per automazione AI', 'confirmed', false, NOW(), NOW()),
('Giulia Bianchi', 'giulia.bianchi@email.com', '+39 234 567 8901', 'chatbots', '2025-09-08', '11:00', 'Demo chatbot per e-commerce', 'pending', false, NOW(), NOW()),
('Luca Verdi', 'luca.verdi@email.com', '+39 345 678 9012', 'web-development', '2025-09-08', '15:00', 'Sviluppo sito web aziendale', 'confirmed', false, NOW(), NOW()),
('Anna Neri', 'anna.neri@email.com', '+39 456 789 0123', 'ai-marketing', '2025-09-08', '16:30', 'Strategia marketing con AI', 'pending', false, NOW(), NOW());

-- Verify the data
SELECT 
  id, name, email, service, date, time, status, created_at
FROM appointments 
WHERE date = '2025-09-08' 
ORDER BY time ASC;
