import React from "react";
import { createClient } from "@/lib/supabase/server";
import { CorporatePartner } from "@/types/partner.types";
import { StatusBadge } from "@/components/ui/badge";
import { PaginationControls } from "@/components/partners/pagination-controls";
import { Building2, MapPin, Calendar, Store, Inbox } from "lucide-react";

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

  const rawPage = resolvedParams.page;
  const pageParam = Array.isArray(rawPage) ? rawPage[0] : rawPage;
  const parsedPage = Math.floor(Number(pageParam));
  const currentPage =
    Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const pageSize = 6; // Tamanho ideal de página para PoC com 15 registros
  const from = (currentPage - 1) * pageSize;
  const to = from + pageSize - 1;

  const supabase = await createClient();

  // Construção dinâmica da query no PostgreSQL com contagem exata
  let query = supabase
    .from("corporate_partners")
    .select("*", { count: "exact" });

  if (search) {
    const escaped = search.replace(/[\\"]/g, "\\$&");
    const pattern = `"%${escaped}%"`;
    query = query.or(`company_name.ilike.${pattern},cnpj.ilike.${pattern}`);
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
  const totalPages = Math.ceil(totalCount / pageSize);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "short",
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="w-full rounded-xl border border-zinc-800 bg-zinc-950/60 backdrop-blur overflow-hidden shadow-2xl">
      <div className="px-6 py-4 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-900/30">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-zinc-100">
              Redes & Franqueados Corporativos
            </h2>
            <p className="text-xs text-zinc-400">
              Total de {totalCount} parceiros encontrados sob demanda (RSC)
            </p>
          </div>
        </div>
        <div className="text-xs text-zinc-500 font-mono">
          PostgreSQL RLS • Active
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/40 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
              <th className="py-3 px-6">Rede / Franquia</th>
              <th className="py-3 px-4">Segmento</th>
              <th className="py-3 px-4">Região</th>
              <th className="py-3 px-4 text-center">Unidades</th>
              <th className="py-3 px-4">Faturamento Anual (LTV)</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Gestor BITTENCOURT</th>
              <th className="py-3 px-6 text-right">Última Interação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {partners && partners.length > 0 ? (
              partners.map((partner: CorporatePartner) => (
                <tr
                  key={partner.id}
                  className="hover:bg-zinc-900/50 transition-colors group cursor-default"
                >
                  {/* 1. Nome & CNPJ */}
                  <td className="py-3.5 px-6">
                    <div className="font-medium text-zinc-100 group-hover:text-blue-400 transition-colors">
                      {partner.company_name}
                    </div>
                    <div className="text-xs font-mono text-zinc-500 mt-0.5">
                      {partner.cnpj}
                    </div>
                  </td>

                  {/* 2. Segmento */}
                  <td className="py-3.5 px-4 text-xs text-zinc-300">
                    <span className="px-2 py-0.5 rounded bg-zinc-800/80 border border-zinc-700/50 text-[11px]">
                      {partner.segment}
                    </span>
                  </td>

                  {/* 3. Região */}
                  <td className="py-3.5 px-4 text-xs text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                      {partner.region}
                    </div>
                  </td>

                  {/* 4. Unidades */}
                  <td className="py-3.5 px-4 text-center font-mono text-xs text-zinc-300">
                    <span className="inline-flex items-center gap-1">
                      <Store className="w-3 h-3 text-zinc-500" />
                      {partner.units_count}
                    </span>
                  </td>

                  {/* 5. Faturamento Anual */}
                  <td className="py-3.5 px-4 font-mono font-medium text-xs text-emerald-400">
                    {formatCurrency(partner.annual_revenue)}
                  </td>

                  {/* 6. Status Badge */}
                  <td className="py-3.5 px-4">
                    <StatusBadge status={partner.status} />
                  </td>

                  {/* 7. Gestor da Conta */}
                  <td className="py-3.5 px-4 text-xs text-zinc-300 font-medium">
                    {partner.account_manager}
                  </td>

                  {/* 8. Data da Última Interação */}
                  <td className="py-3.5 px-6 text-right text-xs text-zinc-400 font-mono">
                    <div className="flex items-center justify-end gap-1.5">
                      <Calendar className="w-3 h-3 text-zinc-500" />
                      {formatDate(partner.last_interaction_at)}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-12 text-center text-zinc-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Inbox className="w-8 h-8 text-zinc-600" />
                    <p className="text-sm font-medium text-zinc-400">
                      Nenhum parceiro encontrado com esses filtros
                    </p>
                    <p className="text-xs text-zinc-500">
                      Tente alterar os termos de busca ou limpar os filtros.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
