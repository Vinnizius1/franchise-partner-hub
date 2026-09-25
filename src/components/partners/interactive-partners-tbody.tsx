"use client";

import React, { useState } from "react";
import type { CorporatePartner } from "@/types/partner.types";
import { StatusBadge } from "@/components/ui/badge";
import { MapPin, Calendar, Store, Inbox, ChevronRight } from "lucide-react";
import { formatBRLCurrency, formatDateBR } from "@/lib/utils/formatters";
import { PartnerDetailModal } from "@/components/partners/partner-detail-modal";

interface InteractivePartnersTbodyProps {
  partners: CorporatePartner[];
}

export function InteractivePartnersTbody({
  partners,
}: InteractivePartnersTbodyProps) {
  const [selectedPartner, setSelectedPartner] =
    useState<CorporatePartner | null>(null);

  return (
    <>
      <tbody className="divide-y divide-zinc-800/50">
        {partners && partners.length > 0 ? (
          partners.map((partner: CorporatePartner) => (
            <tr
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
              className="hover:bg-zinc-900/80 transition-all group cursor-pointer focus:outline-none focus:bg-zinc-900/90 focus:ring-1 focus:ring-blue-500/50"
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

              {/* 8. Data da Última Interação & Gatilho Operável por Teclado */}
              <td className="py-3.5 px-6 text-right text-xs text-zinc-400 font-mono">
                <div className="flex items-center justify-end gap-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-zinc-500" />
                    <span>{formatDateBR(partner.last_interaction_at)}</span>
                  </div>

                  {/* Botão de Ação Acessível por Teclado e Foco */}
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
                  Tente ajustar a busca ou limpar os filtros de região e status.
                </p>
              </div>
            </td>
          </tr>
        )}
      </tbody>

      {/* Modal Interativo do Franqueado (Renderizado via Portal em document.body) */}
      <PartnerDetailModal
        partner={selectedPartner}
        isOpen={!!selectedPartner}
        onClose={() => setSelectedPartner(null)}
      />
    </>
  );
}
