import React, { Suspense } from "react";
import { PartnersTable } from "@/components/partners/partners-table";
import { TableSkeleton } from "@/components/partners/table-skeleton";
import { KpiCards } from "@/components/partners/kpi-cards";
import { PartnerFilters } from "@/components/partners/partner-filters";

interface HomePageProps {
  searchParams?: Promise<{
    search?: string;
    status?: string;
    region?: string;
    page?: string;
  }>;
}

export default function HomePage({ searchParams }: HomePageProps) {
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
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Supabase Postgres Conectado</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Banner de KPIs Derivados Dinamicamente */}
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-pulse">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-28 rounded-xl border border-zinc-800 bg-zinc-900/30"
                />
              ))}
            </div>
          }
        >
          <KpiCards />
        </Suspense>

        {/* Bloco de Busca, Filtros e Tabela de Alta Densidade */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-zinc-100">
                Painel Geral de Franquias Parceiras
              </h1>
              <p className="text-xs text-zinc-400">
                Busca, filtros e paginação gerenciados via URL Search Params com
                SSR.
              </p>
            </div>
          </div>

          {/* Componente de Filtros Interativos ('use client') */}
          <Suspense
            fallback={
              <div className="h-16 rounded-xl bg-zinc-900/20 animate-pulse" />
            }
          >
            <PartnerFilters />
          </Suspense>

          {/* 🧠 [SENIOR MENTAL MODEL]: Limite de Suspense para Streaming */}
          <Suspense fallback={<TableSkeleton />}>
            <PartnersTable searchParams={searchParams} />
          </Suspense>
        </section>
      </main>
    </div>
  );
}
