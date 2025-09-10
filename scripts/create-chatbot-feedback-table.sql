-- Tabella per raccogliere feedback sui messaggi del chatbot
CREATE TABLE IF NOT EXISTS chatbot_feedback (
    id SERIAL PRIMARY KEY,
    message_id VARCHAR(255) NOT NULL,
    feedback VARCHAR(20) NOT NULL CHECK (feedback IN ('positive', 'negative')),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_agent TEXT,
    session_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indici per performance
CREATE INDEX IF NOT EXISTS idx_chatbot_feedback_message_id ON chatbot_feedback(message_id);
CREATE INDEX IF NOT EXISTS idx_chatbot_feedback_timestamp ON chatbot_feedback(timestamp);
CREATE INDEX IF NOT EXISTS idx_chatbot_feedback_feedback ON chatbot_feedback(feedback);

-- Commenti per documentazione
COMMENT ON TABLE chatbot_feedback IS 'Raccoglie feedback degli utenti sui messaggi del chatbot per miglioramento continuo';
COMMENT ON COLUMN chatbot_feedback.message_id IS 'ID univoco del messaggio del chatbot';
COMMENT ON COLUMN chatbot_feedback.feedback IS 'Tipo di feedback: positive o negative';
COMMENT ON COLUMN chatbot_feedback.user_agent IS 'User agent del browser per analisi dispositivi';
COMMENT ON COLUMN chatbot_feedback.session_id IS 'ID sessione per raggruppare feedback dello stesso utente';

-- Inserisci alcuni dati di esempio per testing
INSERT INTO chatbot_feedback (message_id, feedback, user_agent, session_id, notes) VALUES
('msg_001', 'positive', 'Mozilla/5.0', 'session_123', 'Risposta molto utile per il supporto tecnico'),
('msg_002', 'negative', 'Chrome/91', 'session_124', 'Il chatbot non ha capito la richiesta'),
('msg_003', 'positive', 'Safari/14', 'session_125', 'Prenotazione completata senza problemi');

-- Query di esempio per analytics
-- SELECT feedback, COUNT(*) as count, 
--        ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 2) as percentage
-- FROM chatbot_feedback 
-- GROUP BY feedback;
