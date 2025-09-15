-- Aggiungi colonne mancanti alla tabella contacts se non esistono
DO $$ 
BEGIN
    -- Aggiungi colonna priority se non esiste
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='priority') THEN
        ALTER TABLE contacts ADD COLUMN priority VARCHAR(10) DEFAULT 'medium';
    END IF;
    
    -- Aggiungi colonna status se non esiste
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='status') THEN
        ALTER TABLE contacts ADD COLUMN status VARCHAR(20) DEFAULT 'new';
    END IF;
    
    -- Aggiungi colonna notes se non esiste
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='notes') THEN
        ALTER TABLE contacts ADD COLUMN notes TEXT;
    END IF;
END $$;

-- Verifica la struttura della tabella
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'contacts' 
ORDER BY ordinal_position;
