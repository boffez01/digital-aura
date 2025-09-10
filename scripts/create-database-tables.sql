-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    service VARCHAR(100),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new',
    priority BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50),
    service VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    message TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    priority BOOLEAN DEFAULT FALSE,
    notes TEXT,
    estimated_duration INTEGER DEFAULT 45,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample contacts
INSERT INTO contacts (name, email, phone, service, message, status, priority) VALUES
('Marco Rossi', 'marco.rossi@email.com', '+39 333 1234567', 'ai-automation', 'Interessato all''automazione dei processi aziendali', 'new', false),
('Laura Bianchi', 'laura.bianchi@azienda.it', '+39 334 2345678', 'chatbot', 'Vorrei un chatbot per il customer service', 'contacted', false),
('Giuseppe Verdi', 'g.verdi@startup.com', '+39 335 3456789', 'web-development', 'Sviluppo sito e-commerce', 'qualified', false),
('Anna Neri', 'anna.neri@company.com', '+39 336 4567890', 'ai-marketing', 'Strategie marketing con AI', 'new', true),
('Francesco Blu', 'f.blu@business.it', '+39 337 5678901', 'assistance', 'Problema urgente con il sistema', 'new', true);

-- Insert sample appointments
INSERT INTO appointments (customer_name, customer_email, customer_phone, service, date, time, message, status, priority, estimated_duration) VALUES
('Mario Gialli', 'mario.gialli@email.com', '+39 338 6789012', 'ai-automation', '2024-01-20', '10:00', 'Consulenza automazione processi', 'pending', false, 60),
('Sofia Viola', 'sofia.viola@azienda.it', '+39 339 7890123', 'chatbot', '2024-01-21', '14:30', 'Demo chatbot personalizzato', 'confirmed', false, 45),
('Roberto Arancio', 'r.arancio@startup.com', '+39 340 8901234', 'web-development', '2024-01-22', '09:15', 'Revisione progetto web', 'pending', false, 90),
('Elena Rosa', 'elena.rosa@company.com', '+39 341 9012345', 'ai-marketing', '2024-01-23', '16:00', 'Strategia marketing AI', 'pending', true, 75),
('Davide Grigio', 'd.grigio@business.it', '+39 342 0123456', 'assistance', '2024-01-19', '11:30', 'Assistenza prioritaria urgente', 'in_progress', true, 30);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_service ON contacts(service);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);
CREATE INDEX IF NOT EXISTS idx_appointments_priority ON appointments(priority);
