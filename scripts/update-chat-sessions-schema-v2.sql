-- Chat Sessions Table Schema Fix
-- Align database schema with application code

-- Add missing booking_data column if it doesn't exist
ALTER TABLE chat_sessions 
ADD COLUMN IF NOT EXISTS booking_data JSONB DEFAULT NULL;

-- Add support columns if they don't exist
ALTER TABLE chat_sessions 
ADD COLUMN IF NOT EXISTS support_mode BOOLEAN DEFAULT false;

ALTER TABLE chat_sessions 
ADD COLUMN IF NOT EXISTS attempt_count INTEGER DEFAULT 0;

ALTER TABLE chat_sessions 
ADD COLUMN IF NOT EXISTS escalation_count INTEGER DEFAULT 0;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_chat_sessions_support_mode ON chat_sessions(support_mode);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_booking_mode ON chat_sessions(booking_mode);

-- Verify schema
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns 
WHERE table_name = 'chat_sessions' 
ORDER BY ordinal_position;
