import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://uttrmejusykewdwaehlj.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0dHJtZWp1c3lrZXdkd2FlaGxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY2NDQwODAsImV4cCI6MjEwMjIyMDA4MH0.QtUBIjLPyWiqKGC3aTzxsLa1MwsL4FWknNa7VrZBZIU"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)