-- Ensure chat_sessions table exists with correct structure
CREATE TABLE IF NOT EXISTS chat_sessions (
    session_id VARCHAR(255) PRIMARY KEY,
    booking_data JSONB,
    flow_step VARCHAR(100),
    booking_mode BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_chat_sessions_session_id ON chat_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_booking_mode ON chat_sessions(booking_mode);

-- Ensure appointments table has proper indexes for availability checks
CREATE INDEX IF NOT EXISTS idx_appointments_date_time ON appointments(date, time);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_date_status ON appointments(date, status);

-- Show table structure for verification
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'chat_sessions' 
ORDER BY ordinal_position;

SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'appointments' 
ORDER BY ordinal_position;
