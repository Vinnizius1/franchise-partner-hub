import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * 🧠 [SENIOR MENTAL MODEL]: Factory de Conexão no Servidor (RSC & Server Actions)
 * No Next.js App Router (v15/v16), a API `cookies()` é assíncrona.
 * Usamos `@supabase/ssr` para ler cookies com segurança no servidor,
 * viabilizando data fetching direto perto do banco e autenticação estrita.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Em Server Components puros, cookies não podem ser gravados, apenas lidos.
            // O tratamento de erro silencioso aqui é o padrão recomendado pela doc oficial.
          }
        },
      },
    },
  );
}
