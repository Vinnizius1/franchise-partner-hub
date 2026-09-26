"use client";

import React, { useRef, useTransition } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Search, RotateCcw, Loader2 } from "lucide-react";
import { buildUpdatedSearchParams } from "@/lib/utils/query";

/**
 * 🧠 [SENIOR MENTAL MODEL]: Filtros na URL com useDebouncedCallback & useTransition
 * Em vez de manter estado volátil no client (useState), serializamos a busca
 * e os filtros diretamente na URL (?search=...&status=...&region=...).
 * O `useDebouncedCallback` evita sobrecarregar o banco com requisições a cada tecla,
 * e o `useTransition` informa ao usuário que a tabela no servidor está atualizando.
 */
export function PartnerFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const currentSearch = searchParams.get("search") || "";
  const currentStatus = searchParams.get("status") || "all";
  const currentRegion = searchParams.get("region") || "all";

  const updateParam = (key: string, value: string) => {
    const params = buildUpdatedSearchParams(searchParams, key, value);

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    updateParam("search", term);
  }, 300);

  const handleReset = () => {
    handleSearch.cancel();
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
    startTransition(() => {
      router.replace(pathname);
    });
  };

  const hasActiveFilters =
    Boolean(currentSearch) ||
    currentStatus !== "all" ||
    currentRegion !== "all";

  return (
    <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur space-y-3">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* 1. Campo de Busca com Ícone e Indicador de Transição */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </div>
          <input
            ref={searchInputRef}
            type="text"
            defaultValue={currentSearch}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Buscar por rede ou CNPJ..."
            className="w-full pl-9 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* 2. Filtros e Ações */}
        <div className="grid grid-cols-2 sm:flex sm:items-center gap-2">
          <select
            value={currentRegion}
            onChange={(e) => updateParam("region", e.target.value)}
            className="w-full sm:w-auto bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer"
          >
            <option value="all">Todas as Regiões</option>
            <option value="Sudeste">Sudeste</option>
            <option value="Sul">Sul</option>
            <option value="Nordeste">Nordeste</option>
            <option value="Centro-Oeste">Centro-Oeste</option>
            <option value="Norte">Norte</option>
          </select>

          {/* 3. Filtro por Status */}
          <select
            value={currentStatus}
            onChange={(e) => updateParam("status", e.target.value)}
            className="w-full sm:w-auto bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer"
          >
            <option value="all">Todos os Status</option>
            <option value="ativo">Ativo</option>
            <option value="negociacao">Em Negociação</option>
            <option value="lead">Lead</option>
            <option value="inadimplente">Inadimplente</option>
            <option value="cancelado">Cancelado</option>
          </select>

          {/* 4. Botão Limpar Filtros */}
          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-800/50 hover:bg-zinc-800 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
              title="Limpar todos os filtros"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpar</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
