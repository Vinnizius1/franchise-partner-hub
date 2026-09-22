import React, { Suspense } from "react";
import { PartnersTable } from "@/components/partners/partners-table";
import { TableSkeleton } from "@/components/partners/table-skeleton";
import { Building2, TrendingUp, ShieldCheck, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-blue-500/20 selection:text-blue-300">
      {/* 1. Header Corporativo */}
      <header className="border-b border-zinc-800/80 bg-zinc-900/40 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
              B
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-zinc-100">
                  Grupo BITTENCOURT
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  B2B Hub v1.0
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Portal de Relacionamento Corporativo & Franquias
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Supabase Postgres Live</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Banner de Apresentação e KPIs */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-xs font-medium">Franquias na Rede</span>
              <Building2 className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-zinc-100">15</div>
            <p className="text-[11px] text-zinc-500 mt-1">
              Top redes corporativas do Brasil
            </p>
          </div>

          <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-xs font-medium">Faturamento Total Gerenciado</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-400">
              R$ 310,7M
            </div>
            <p className="text-[11px] text-zinc-500 mt-1">
              Volume anual de LTV monitorado
            </p>
          </div>

          <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-xs font-medium">Segurança de Dados</span>
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-bold text-zinc-100">RLS Ativo</div>
            <p className="text-[11px] text-zinc-500 mt-1">
              Políticas de leitura e atualização no Postgres
            </p>
          </div>

          <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-xs font-medium">Arquitetura de Entrega</span>
              <Zap className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-zinc-100">RSC + Streaming</div>
            <p className="text-[11px] text-zinc-500 mt-1">
              Largest Contentful Paint imediato via Suspense
            </p>
          </div>
        </section>

        {/* Bloco de Alta Densidade com Suspense Streaming */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-zinc-100">
                Painel Geral de Franquias Parceiras
              </h1>
              <p className="text-xs text-zinc-400">
                Dados corporativos consultados sob demanda pelo servidor via Supabase SSR.
              </p>
            </div>
          </div>

          {/* 🧠 [SENIOR MENTAL MODEL]: Limite de Suspense para Streaming */}
          <Suspense fallback={<TableSkeleton />}>
            <PartnersTable />
          </Suspense>
        </section>
      </main>
    </div>
  );
}
