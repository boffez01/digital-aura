-- Create chat_sessions table for persistent session management
CREATE TABLE IF NOT EXISTS chat_sessions (
  session_id VARCHAR(255) PRIMARY KEY,
  messages JSONB DEFAULT '[]'::jsonb,
  context JSONB DEFAULT '{}'::jsonb,
  booking_data JSONB DEFAULT '{}'::jsonb,
  user_data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '2 hours')
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_chat_sessions_expires_at ON chat_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_updated_at ON chat_sessions(updated_at);

-- Add a column for pending AI responses
ALTER TABLE chat_sessions ADD COLUMN IF NOT EXISTS pending_response JSONB DEFAULT NULL;
ALTER TABLE chat_sessions ADD COLUMN IF NOT EXISTS response_ready BOOLEAN DEFAULT FALSE;

COMMENT ON TABLE chat_sessions IS 'Stores chat session data with persistent memory and async AI processing';
