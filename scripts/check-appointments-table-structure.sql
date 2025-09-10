-- Check the actual structure of the appointments table
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'appointments' 
ORDER BY ordinal_position;

-- Show all data in appointments table
SELECT * FROM appointments LIMIT 5;
