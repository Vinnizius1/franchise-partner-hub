import { createBrowserClient } from "@supabase/ssr";

/**
 * 🧠 [SENIOR MENTAL MODEL]: Factory Client para o Navegador
 * Usado exclusivamente em Client Components ('use client').
 * Cria uma única instância otimizada para o runtime do browser.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
