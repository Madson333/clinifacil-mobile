import { createClient } from '@supabase/supabase-js';

// Substitua pelos valores do seu projeto Supabase
const SUPABASE_URL = 'https://SEU-PROJETO.supabase.co';
const SUPABASE_ANON_KEY = 'SUA-CHAVE-ANONIMA';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
