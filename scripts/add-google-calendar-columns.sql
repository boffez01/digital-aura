-- Aggiungi colonne per Google Calendar se non esistono già
DO $$ 
BEGIN
    -- Aggiungi google_event_id se non esiste
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'appointments' AND column_name = 'google_event_id') THEN
        ALTER TABLE appointments ADD COLUMN google_event_id VARCHAR(255);
        RAISE NOTICE 'Added google_event_id column';
    END IF;

    -- Aggiungi google_event_link se non esiste
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'appointments' AND column_name = 'google_event_link') THEN
        ALTER TABLE appointments ADD COLUMN google_event_link TEXT;
        RAISE NOTICE 'Added google_event_link column';
    END IF;

    -- Aggiungi updated_at se non esiste
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'appointments' AND column_name = 'updated_at') THEN
        ALTER TABLE appointments ADD COLUMN updated_at TIMESTAMP DEFAULT NOW();
        RAISE NOTICE 'Added updated_at column';
    END IF;

    -- Crea trigger per aggiornare updated_at automaticamente
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_appointments_updated_at') THEN
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
        $$ language 'plpgsql';

        CREATE TRIGGER update_appointments_updated_at
            BEFORE UPDATE ON appointments
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
        
        RAISE NOTICE 'Created updated_at trigger';
    END IF;

END $$;

-- Aggiorna tutti i record esistenti che non hanno updated_at
UPDATE appointments 
SET updated_at = created_at 
WHERE updated_at IS NULL;

-- Mostra struttura finale della tabella
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'appointments'
ORDER BY ordinal_position;
