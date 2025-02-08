import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dpxjwspnyjfxacdokfzf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRweGp3c3BueWpmeGFjZG9rZnpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODMwNzIsImV4cCI6MjA1NDI1OTA3Mn0.zWFaSsITBPn755pg3M7ClsYnOfh2NkIoW3cBj4yCc70';

export const supabase = createClient(supabaseUrl, supabaseKey);
