import { createClient } from '@supabase/supabase-js';
import { ENV } from './env';

export const supabaseClient = createClient(ENV.PUBLIC_SUPABASE_URL, ENV.PUBLIC_SUPABASE_ANON_KEY);
