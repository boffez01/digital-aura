-- Digital Aura Portfolio Database Initialization Script
-- This script creates all necessary tables and inserts sample data

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    service VARCHAR(100),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    service VARCHAR(100) NOT NULL,
    preferred_date DATE NOT NULL,
    preferred_time TIME NOT NULL,
    message TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    image_url VARCHAR(500),
    category VARCHAR(100),
    tags TEXT[],
    author VARCHAR(255) DEFAULT 'Digital Aura Team',
    published BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    views INTEGER DEFAULT 0,
    reading_time INTEGER DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    image_url VARCHAR(500),
    tags TEXT[],
    timeline VARCHAR(100),
    investment VARCHAR(100),
    roi VARCHAR(100),
    problem TEXT,
    solution TEXT,
    results TEXT[],
    technologies TEXT[],
    client_name VARCHAR(255),
    client_industry VARCHAR(255),
    featured BOOLEAN DEFAULT false,
    status VARCHAR(50) DEFAULT 'completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name VARCHAR(255) NOT NULL,
    client_position VARCHAR(255),
    client_company VARCHAR(255) NOT NULL,
    client_image VARCHAR(500),
    testimonial TEXT NOT NULL,
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    project_id UUID REFERENCES projects(id),
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create analytics table
CREATE TABLE IF NOT EXISTS analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_path VARCHAR(500) NOT NULL,
    visitor_id VARCHAR(255),
    session_id VARCHAR(255),
    user_agent TEXT,
    referrer VARCHAR(500),
    country VARCHAR(100),
    city VARCHAR(100),
    device_type VARCHAR(50),
    browser VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create chat_conversations table
CREATE TABLE IF NOT EXISTS chat_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id VARCHAR(255) NOT NULL,
    user_message TEXT NOT NULL,
    bot_response TEXT NOT NULL,
    user_ip VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    status VARCHAR(50) DEFAULT 'active',
    source VARCHAR(100),
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(preferred_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_analytics_page_path ON analytics(page_path);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_session_id ON chat_conversations(session_id);

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, image_url, category, tags, published, featured, reading_time) VALUES
('Come l''AI sta Rivoluzionando il Business nel 2024', 'ai-rivoluzione-business-2024', 'Scopri come l''intelligenza artificiale sta trasformando le aziende e creando nuove opportunità di crescita.', 'L''intelligenza artificiale non è più fantascienza, ma realtà quotidiana per milioni di aziende...', '/ai-business-automation.png', 'AI & Automation', ARRAY['AI', 'Business', 'Automation', 'Innovazione'], true, true, 8),
('Chatbot vs Assistenti Virtuali: Quale Scegliere?', 'chatbot-vs-assistenti-virtuali', 'Guida completa per scegliere tra chatbot tradizionali e assistenti virtuali AI per il tuo business.', 'La scelta tra chatbot e assistenti virtuali dipende dalle esigenze specifiche del tuo business...', '/customer-service-chatbot.png', 'Chatbot', ARRAY['Chatbot', 'AI', 'Customer Service'], true, true, 6),
('Tendenze Web Development 2024: Cosa Aspettarsi', 'tendenze-web-development-2024', 'Le ultime tendenze nel sviluppo web che domineranno il 2024, dalle PWA all''AI integration.', 'Il mondo dello sviluppo web evolve rapidamente e il 2024 porta innovazioni rivoluzionarie...', '/web-development-trends.png', 'Web Development', ARRAY['Web Development', 'Trends', 'React', 'Next.js'], true, false, 7),
('Strategie di Marketing AI per Influencer', 'marketing-ai-influencer-strategie', 'Come gli influencer possono sfruttare l''AI per crescere organicamente e aumentare l''engagement.', 'Il marketing per influencer sta evolvendo grazie all''intelligenza artificiale...', '/ai-marketing-strategies.png', 'Marketing', ARRAY['Marketing', 'AI', 'Influencer', 'Growth'], true, false, 5),
('Data Analytics: Trasforma i Dati in Decisioni Vincenti', 'data-analytics-decisioni-business', 'Scopri come utilizzare l''analisi dei dati per prendere decisioni strategiche e migliorare le performance.', 'I dati sono il nuovo petrolio, ma solo se sai come raffinarli e utilizzarli strategicamente...', '/data-analytics-business.png', 'Analytics', ARRAY['Data Analytics', 'Business Intelligence', 'KPI'], true, false, 9);

-- Insert sample projects
INSERT INTO projects (title, slug, description, category, image_url, tags, timeline, investment, roi, problem, solution, results, technologies, client_name, client_industry, featured) VALUES
('E-commerce AI Assistant', 'ecommerce-ai-assistant', 'Sistema di raccomandazioni AI che ha aumentato le vendite del 40% per un e-commerce fashion con oltre 10.000 prodotti', 'AI Automation', '/modern-ecommerce-dashboard.png', ARRAY['AI', 'Machine Learning', 'E-commerce', 'Raccomandazioni'], '3 mesi', '€25.000', '320%', 'L''e-commerce aveva difficoltà a personalizzare l''esperienza utente e le vendite erano stagnanti nonostante il traffico elevato.', 'Abbiamo implementato un sistema di raccomandazioni AI avanzato che analizza il comportamento degli utenti in tempo reale.', ARRAY['40% aumento vendite', '60% miglior engagement', '25% carrelli abbandonati in meno'], ARRAY['TensorFlow', 'Python', 'React', 'Node.js', 'MongoDB'], 'Fashion Store Milano', 'E-commerce Fashion', true),
('Customer Support Bot', 'customer-support-bot', 'Chatbot multilingue che gestisce 1000+ query giornaliere con 95% di soddisfazione per una multinazionale', 'Chatbot', '/chatbot-interface-design.png', ARRAY['NLP', 'Customer Service', 'Automation', 'Multilingue'], '2 mesi', '€18.000', '280%', 'Il supporto clienti era sovraccarico con tempi di risposta lunghi e costi operativi elevati.', 'Sviluppato un chatbot intelligente con NLP avanzato per gestire automaticamente le richieste più comuni.', ARRAY['95% soddisfazione clienti', '70% riduzione tempi risposta', '50% riduzione costi supporto'], ARRAY['OpenAI GPT', 'Node.js', 'React', 'WebSocket', 'MongoDB'], 'TechCorp International', 'Technology', true),
('Corporate Website Redesign', 'corporate-website-redesign', 'Sito web aziendale moderno con CMS personalizzato che ha triplicato il traffico organico per una startup B2B', 'Web Development', '/modern-corporate-website.png', ARRAY['React', 'Next.js', 'CMS', 'SEO', 'Performance'], '6 settimane', '€15.000', '250%', 'Il sito esistente era obsoleto, lento e non generava lead qualificati per l''azienda.', 'Creato un sito moderno, veloce e ottimizzato SEO con funzionalità avanzate di lead generation.', ARRAY['300% aumento traffico', '150% più lead qualificati', '80% miglior velocità caricamento'], ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Strapi CMS', 'Vercel'], 'InnovateTech Solutions', 'B2B Software', true);

-- Insert sample testimonials
INSERT INTO testimonials (client_name, client_position, client_company, testimonial, rating, featured) VALUES
('Marco Rossi', 'CEO', 'Fashion Store Milano', 'Digital Aura ha trasformato completamente il nostro e-commerce. Il sistema di raccomandazioni AI ha superato ogni aspettativa, aumentando le vendite del 40% in soli 3 mesi. Professionalità e risultati eccezionali!', 5, true),
('Sarah Johnson', 'Head of Customer Service', 'TechCorp International', 'Il chatbot sviluppato da Digital Aura ha rivoluzionato il nostro supporto clienti. Ora gestiamo 1000+ query al giorno con il 95% di soddisfazione. Un investimento che si è ripagato in pochi mesi.', 5, true),
('Andrea Bianchi', 'Marketing Director', 'InnovateTech Solutions', 'Il nuovo sito web ha triplicato il nostro traffico organico e migliorato drasticamente la generazione di lead. Il team di Digital Aura è stato fantastico, sempre disponibile e professionale.', 5, true);

-- Insert sample newsletter subscribers
INSERT INTO newsletter_subscribers (email, name, source) VALUES
('marco.rossi@example.com', 'Marco Rossi', 'website'),
('sarah.johnson@example.com', 'Sarah Johnson', 'blog'),
('andrea.bianchi@example.com', 'Andrea Bianchi', 'contact_form');

-- Insert sample analytics data
INSERT INTO analytics (page_path, visitor_id, device_type, browser, country, city) VALUES
('/', 'visitor_1', 'desktop', 'Chrome', 'Italy', 'Milan'),
('/services/ai-automation', 'visitor_2', 'mobile', 'Safari', 'Italy', 'Rome'),
('/blog', 'visitor_3', 'tablet', 'Firefox', 'Italy', 'Naples'),
('/appointments', 'visitor_4', 'desktop', 'Chrome', 'Italy', 'Turin');

-- Create views for common queries
CREATE OR REPLACE VIEW contact_summary AS
SELECT 
    DATE(created_at) as date,
    COUNT(*) as total_contacts,
    COUNT(CASE WHEN status = 'new' THEN 1 END) as new_contacts,
    COUNT(CASE WHEN status = 'contacted' THEN 1 END) as contacted,
    COUNT(CASE WHEN status = 'converted' THEN 1 END) as converted
FROM contacts 
GROUP BY DATE(created_at)
ORDER BY date DESC;

CREATE OR REPLACE VIEW appointment_summary AS
SELECT 
    DATE(preferred_date) as date,
    COUNT(*) as total_appointments,
    COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
    COUNT(CASE WHEN status = 'confirmed' THEN 1 END) as confirmed,
    COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed
FROM appointments 
GROUP BY DATE(preferred_date)
ORDER BY date DESC;

CREATE OR REPLACE VIEW popular_pages AS
SELECT 
    page_path,
    COUNT(*) as visits,
    COUNT(DISTINCT visitor_id) as unique_visitors
FROM analytics 
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY page_path
ORDER BY visits DESC;

-- Grant permissions (adjust as needed for your setup)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_app_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_app_user;

-- Success message
SELECT 'Database initialization completed successfully!' as message;
SELECT 'Tables created: ' || COUNT(*) || ' tables' as summary 
FROM information_schema.tables 
WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
