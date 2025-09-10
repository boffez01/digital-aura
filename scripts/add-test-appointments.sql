-- Add some test appointments to see the occupied slots functionality
INSERT INTO appointments (name, email, phone, service, date, time, message, status, priority) VALUES
('Mario Rossi', 'mario@test.com', '+39 123 456 7890', 'ai-automation', '2025-09-05', '09:30', 'Test appointment 1', 'confirmed', false),
('Giulia Bianchi', 'giulia@test.com', '+39 098 765 4321', 'chatbots', '2025-09-05', '11:00', 'Test appointment 2', 'confirmed', false),
('Luca Verdi', 'luca@test.com', '+39 555 123 456', 'web-development', '2025-09-05', '15:00', 'Test appointment 3', 'pending', false),
('Anna Neri', 'anna@test.com', '+39 777 888 999', 'ai-marketing', '2025-09-05', '16:30', 'Test appointment 4', 'confirmed', true);

-- Add appointments for other dates too
INSERT INTO appointments (name, email, phone, service, date, time, message, status, priority) VALUES
('Test User 1', 'test1@example.com', '+39 111 222 333', 'ai-automation', '2025-01-15', '10:00', 'Test for January', 'confirmed', false),
('Test User 2', 'test2@example.com', '+39 444 555 666', 'chatbots', '2025-01-15', '14:30', 'Test for January', 'confirmed', false);
