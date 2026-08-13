import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Debug: This will print to your terminal so we can see if the keys are actually there
console.log("Supabase URL detected:", supabaseUrl);
console.log("Supabase Key detected:", supabaseAnonKey ? "Key Found" : "KEY MISSING");

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables!");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)