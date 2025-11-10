-- Crea tabella per memorizzare i token OAuth di Zoho
CREATE TABLE IF NOT EXISTS zoho_tokens (
  id SERIAL PRIMARY KEY,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Crea indice per ottimizzare le query di scadenza
CREATE INDEX IF NOT EXISTS idx_zoho_tokens_expires_at ON zoho_tokens(expires_at);

-- Commento descrittivo
COMMENT ON TABLE zoho_tokens IS 'Memorizza i token OAuth2 per l''integrazione Zoho Bookings e CRM';
