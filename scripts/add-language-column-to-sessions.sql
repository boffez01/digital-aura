-- Add language column to chat_sessions table
ALTER TABLE chat_sessions 
ADD COLUMN IF NOT EXISTS language VARCHAR(2) DEFAULT 'it';

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_chat_sessions_language 
ON chat_sessions(language);
