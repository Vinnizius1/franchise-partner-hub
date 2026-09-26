import React from "react";
import { createClient } from "@/lib/supabase/server";
import { PaginationControls } from "@/components/partners/pagination-controls";
import { InteractivePartnersView } from "@/components/partners/interactive-partners-view";
import { Building2 } from "lucide-react";
import {
  parsePageParam,
  calculatePaginationRange,
  calculateTotalPages,
  buildSearchFilter,
} from "@/lib/utils/query";


interface PartnersTableProps {
  searchParams?: Promise<{
    search?: string;
    status?: string;
    region?: string;
    page?: string;
  }>;
}

/**
 * 🧠 [SENIOR MENTAL MODEL]: Server Component com Filtragem e Paginação no Banco
 * Em vez de buscar todos os registros e filtrar no JavaScript (inviável para big data),
 * a filtragem é delegada ao PostgreSQL via Supabase (Database-Level Filtering & Pagination),
 * consumindo os Search Params da URL de forma reativa.
 */
export async function PartnersTable({ searchParams }: PartnersTableProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const rawSearch = resolvedParams.search;
  const search =
    (Array.isArray(rawSearch) ? rawSearch[0] : rawSearch)?.trim() || "";
  const status = resolvedParams.status || "all";
  const region = resolvedParams.region || "all";

  const currentPage = parsePageParam(resolvedParams.page);
  const { from, to, pageSize } = calculatePaginationRange(currentPage);

  const supabase = await createClient();

  // Construção dinâmica da query no PostgreSQL com contagem exata
  let query = supabase
    .from("corporate_partners")
    .select("*", { count: "exact" });

  const searchFilter = buildSearchFilter(search);
  if (searchFilter) {
    query = query.or(searchFilter);
  }

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  if (region && region !== "all") {
    query = query.eq("region", region);
  }

  const {
    data: rawPartners,
    count,
    error,
  } = await query.order("annual_revenue", { ascending: false }).range(from, to);

  // PGRST103: Requested range not satisfiable (ocorre se ?page= for maior que a última página)
  const isOutOfRange = error?.code === "PGRST103";

  if (error && !isOutOfRange) {
    return (
      <div className="p-8 text-center border border-rose-500/20 rounded-xl bg-rose-500/5 text-rose-400">
        <p className="font-medium">Erro ao carregar dados do Supabase</p>
        <p className="text-xs text-rose-500/80 mt-1 font-mono">
          {error.message}
        </p>
      </div>
    );
  }

  const partners = isOutOfRange ? [] : rawPartners || [];

  const totalCount = count || 0;
  const totalPages = calculateTotalPages(totalCount, pageSize);

  return (
    <div className="w-full rounded-xl border border-zinc-800 bg-zinc-950/60 backdrop-blur overflow-hidden shadow-2xl">
      <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-900/30">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-zinc-100">
              Redes & Franqueados Corporativos
            </h2>
            <p className="text-[11px] sm:text-xs text-zinc-400">
              Total de {totalCount} parceiros encontrados sob demanda (RSC)
            </p>
          </div>
        </div>
        <div className="text-[11px] sm:text-xs text-zinc-500 font-mono shrink-0">
          <span className="hidden sm:inline">PostgreSQL RLS • Active</span>
          <span className="sm:hidden">RLS Active</span>
        </div>
      </div>

      {/* Renderização Híbrida Responsiva (Table no Desktop / Cards no Mobile) */}
      <InteractivePartnersView partners={partners} />

      {/* Controles de Paginação */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
        pageSize={pageSize}
      />
    </div>
  );
}
