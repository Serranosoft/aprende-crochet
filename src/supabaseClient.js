import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = "https://lprvpqlrafnadcofezxc.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwcnZwcWxyYWZuYWRjb2ZlenhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg4MTY2MTMsImV4cCI6MjAwNDM5MjYxM30.biv4QBe2v-Jz6zoxpgxRHQplKuqhElIoR6PwTp4Upcw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: false
    }
})