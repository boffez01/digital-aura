-- Migration to support Italian workspace tokens
-- This adds support for storing separate tokens for English and Italian workspaces

-- Check if zoho_tokens table exists, if not create it
CREATE TABLE IF NOT EXISTS zoho_tokens (
  id SERIAL PRIMARY KEY,
  service VARCHAR(50) NOT NULL UNIQUE,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Add index on service for faster lookups
CREATE INDEX IF NOT EXISTS idx_zoho_tokens_service ON zoho_tokens(service);

-- Insert placeholder for Italian workspace if it doesn't exist
INSERT INTO zoho_tokens (service, access_token, refresh_token, expires_at)
VALUES ('bookings_italian', 'pending', 'pending', NOW() + INTERVAL '1 hour')
ON CONFLICT (service) DO NOTHING;

-- Comment explaining the service naming convention
COMMENT ON COLUMN zoho_tokens.service IS 'Service identifier: "bookings" for English workspace, "bookings_italian" for Italian workspace';
