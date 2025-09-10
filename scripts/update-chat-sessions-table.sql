-- Complete Chat Sessions Table Update
-- Version 244 - JSONB support with intelligent escalation

-- Drop existing table if it exists (be careful in production!)
DROP TABLE IF EXISTS chat_sessions CASCADE;

-- Create new chat_sessions table with JSONB support
CREATE TABLE chat_sessions (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) UNIQUE NOT NULL,
    messages JSONB DEFAULT '[]'::jsonb,
    context JSONB DEFAULT '{}'::jsonb,
    metadata JSONB DEFAULT '{}'::jsonb,
    language VARCHAR(10) DEFAULT 'it',
    support_mode BOOLEAN DEFAULT false,
    booking_mode BOOLEAN DEFAULT false,
    flow_step VARCHAR(50),
    attempt_count INTEGER DEFAULT 0,
    escalation_count INTEGER DEFAULT 0,
    processing_status VARCHAR(20) DEFAULT 'idle',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_chat_sessions_session_id ON chat_sessions(session_id);
CREATE INDEX idx_chat_sessions_language ON chat_sessions(language);
CREATE INDEX idx_chat_sessions_support_mode ON chat_sessions(support_mode);
CREATE INDEX idx_chat_sessions_booking_mode ON chat_sessions(booking_mode);
CREATE INDEX idx_chat_sessions_processing_status ON chat_sessions(processing_status);
CREATE INDEX idx_chat_sessions_last_activity ON chat_sessions(last_activity);

-- Create trigger to update updated_at and last_activity
CREATE OR REPLACE FUNCTION update_chat_sessions_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    NEW.last_activity = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_chat_sessions_timestamp
    BEFORE UPDATE ON chat_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_chat_sessions_timestamp();

-- Insert test session for verification
INSERT INTO chat_sessions (
    session_id, 
    messages, 
    context, 
    metadata,
    language,
    support_mode,
    booking_mode,
    attempt_count,
    escalation_count,
    processing_status
) VALUES (
    'test-session-244',
    '[{"role": "assistant", "content": "Test message", "timestamp": "2024-01-01T00:00:00Z"}]'::jsonb,
    '{"test": true, "version": "244"}'::jsonb,
    '{"created_by": "system", "version": "244"}'::jsonb,
    'it',
    false,
    false,
    0,
    0,
    'idle'
);

-- Verify table structure
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns 
WHERE table_name = 'chat_sessions' 
ORDER BY ordinal_position;

-- Test JSONB operations
SELECT 
    session_id,
    messages,
    context,
    metadata,
    jsonb_array_length(messages) as message_count
FROM chat_sessions 
WHERE session_id = 'test-session-244';

COMMIT;
