import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export function supabaseBrowser() {
  if (!url || !key) throw new Error("Faltan las variables de Supabase. Configura .env.local.");
  return createClient(url, key);
}
