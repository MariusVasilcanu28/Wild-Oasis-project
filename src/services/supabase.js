import { createClient } from "@supabase/supabase-js";
export const jwtExpiry = 24 * 60 * 60 * 1000; // 24 hours in milliseconds (86400000 ms)

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
