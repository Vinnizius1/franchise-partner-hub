"use client";

import React, { useState } from "react";
import type { CorporatePartner } from "@/types/partner.types";
import { StatusBadge } from "@/components/ui/badge";
import {
  MapPin,
  Calendar,
  Store,
  Inbox,
  ChevronRight,
} from "lucide-react";
import {
  formatBRLCurrency,
  formatBRLCurrencyCompact,
  formatDateBR,
} from "@/lib/utils/formatters";
import { PartnerDetailModal } from "@/components/partners/partner-detail-modal";

interface InteractivePartnersViewProps {
  partners: CorporatePartner[];
}

/**
 * 🧠 [SENIOR MENTAL MODEL]: Padrão Responsivo Híbrido (Table -> Cards)
 * No Desktop (>= 768px): Exibe a tabela tabular completa de 8 colunas para navegação densa com cursor.
 * No Mobile (< 768px): Exibe um feed de cartões táteis (Touch Targets generosos),
 * eliminando scroll horizontal involuntário e respeitando a "Thumb Zone".
 * Ambas as visões compartilham o mesmo estado do modal de dossiê estratégico.
 */
export function InteractivePartnersView({
  partners,
}: InteractivePartnersViewProps) {
  const [selectedPartner, setSelectedPartner] =
    useState<CorporatePartner | null>(null);

  if (!partners || partners.length === 0) {
    return (
      <div className="py-12 px-4 text-center text-zinc-500">
        <div className="flex flex-col items-center justify-center gap-2">
          <Inbox className="w-8 h-8 text-zinc-600" />
          <p className="text-sm font-medium text-zinc-400">
            Nenhum parceiro encontrado com esses filtros
          </p>
          <p className="text-xs text-zinc-500">
            Tente ajustar a busca ou limpar os filtros de região e status.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* 1. VISÃO DESKTOP: Tabela Tabular Completa (md:block) */}
      <div className="hidden md:block overflow-x-auto">
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
            {partners.map((partner: CorporatePartner) => (
              <tr
                key={partner.id}
                onClick={() => setSelectedPartner(partner)}
                className="hover:bg-zinc-900/80 transition-all group cursor-pointer"
                title="Clique para abrir o Dossiê Estratégico do Franqueado"
              >
                {/* 1. Nome & CNPJ */}
                <td className="py-3.5 px-6">
                  <div className="font-medium text-zinc-100 group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                    <span>{partner.company_name}</span>
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
                  {formatBRLCurrency(partner.annual_revenue)}
                </td>

                {/* 6. Status Badge */}
                <td className="py-3.5 px-4">
                  <StatusBadge status={partner.status} />
                </td>

                {/* 7. Gestor da Conta */}
                <td className="py-3.5 px-4 text-xs text-zinc-300 font-medium">
                  {partner.account_manager}
                </td>

                {/* 8. Data da Última Interação & Ação */}
                <td className="py-3.5 px-6 text-right text-xs text-zinc-400 font-mono">
                  <div className="flex items-center justify-end gap-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-zinc-500" />
                      <span>{formatDateBR(partner.last_interaction_at)}</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPartner(partner);
                      }}
                      aria-label={`Abrir dossiê de ${partner.company_name}`}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:border-blue-500/40 group-hover:text-blue-300 group-hover:bg-blue-500/10 transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 text-[11px]"
                    >
                      <span className="hidden sm:inline">Ver Ficha</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 2. VISÃO MOBILE: Feed de Cartões Táteis (Touch Targets Amigáveis) */}
      <div className="block md:hidden p-3 sm:p-4 space-y-3">
        {partners.map((partner: CorporatePartner) => (
          <article
            key={partner.id}
            tabIndex={0}
            role="button"
            aria-haspopup="dialog"
            aria-label={`Ver dossiê estratégico de ${partner.company_name}`}
            onClick={() => setSelectedPartner(partner)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedPartner(partner);
              }
            }}
            className="p-3.5 bg-zinc-900/40 hover:bg-zinc-900/70 active:bg-zinc-800/80 border border-zinc-800/80 rounded-xl space-y-3 cursor-pointer transition-all focus:outline-none focus:ring-1 focus:ring-blue-500/50 group"
          >
            {/* Topo do Card: Nome da Franquia & Badge de Status */}
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-zinc-100 text-sm group-hover:text-blue-400 transition-colors">
                  {partner.company_name}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-zinc-400">
                  <span className="font-mono text-zinc-500 text-[11px]">
                    {partner.cnpj}
                  </span>
                  <span>•</span>
                  <span className="px-1.5 py-0.5 rounded bg-zinc-800/80 border border-zinc-700/50 text-[10px] text-zinc-300">
                    {partner.segment}
                  </span>
                </div>
              </div>
              <div className="shrink-0">
                <StatusBadge status={partner.status} />
              </div>
            </div>

            {/* Miolo do Card: Métricas Essenciais de BI em Grid 3x1 */}
            <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-lg bg-zinc-950/70 border border-zinc-800/60 text-xs">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-medium">
                  Faturamento
                </span>
                <span className="font-mono font-semibold text-emerald-400 text-xs block mt-0.5">
                  {formatBRLCurrencyCompact(partner.annual_revenue)}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-medium">
                  Unidades
                </span>
                <span className="font-mono text-zinc-200 text-xs inline-flex items-center gap-1 mt-0.5">
                  <Store className="w-3 h-3 text-zinc-500" />
                  {partner.units_count}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-medium">
                  Região
                </span>
                <span className="text-zinc-300 text-xs inline-flex items-center gap-1 mt-0.5 truncate">
                  <MapPin className="w-3 h-3 text-zinc-500 shrink-0" />
                  {partner.region}
                </span>
              </div>
            </div>

            {/* Rodapé do Card: Gestor BITTENCOURT & CTA Touch */}
            <div className="flex items-center justify-between text-xs text-zinc-400 pt-0.5">
              <div className="text-[11px] truncate text-zinc-400">
                <span className="text-zinc-500">Gestor: </span>
                <span className="text-zinc-300 font-medium">
                  {partner.account_manager}
                </span>
              </div>

              <div className="inline-flex items-center gap-1 text-blue-400 font-medium text-xs group-hover:translate-x-0.5 transition-transform">
                <span>Ver Ficha</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Modal Interativo do Franqueado */}
      <PartnerDetailModal
        partner={selectedPartner}
        isOpen={!!selectedPartner}
        onClose={() => setSelectedPartner(null)}
      />
    </>
  );
}
