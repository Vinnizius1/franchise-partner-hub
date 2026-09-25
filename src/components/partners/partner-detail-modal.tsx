"use client";

import React, { useEffect, useState } from "react";
import {
  X,
  Building2,
  MapPin,
  Store,
  Calendar,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Copy,
  Check,
  Send,
} from "lucide-react";
import type { CorporatePartner } from "@/types/partner.types";
import { formatBRLCurrency, formatDateBR } from "@/lib/utils/formatters";
import { calculateAverageRevenuePerUnit } from "@/lib/utils/kpi";
import { StatusBadge } from "@/components/ui/badge";


interface PartnerDetailModalProps {
  partner: CorporatePartner | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PartnerDetailModal({
  partner,
  isOpen,
  onClose,
}: PartnerDetailModalProps) {
  const [copied, setCopied] = useState(false);
  const [contactSimulated, setContactSimulated] = useState(false);

  // Fecha no ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleClose = () => {
    setCopied(false);
    setContactSimulated(false);
    onClose();
  };

  if (!isOpen || !partner) return null;

  const averageRevenuePerUnit = calculateAverageRevenuePerUnit(
    partner.annual_revenue,
    partner.units_count
  );

  const handleCopyDetails = async () => {
    const summary = `
=== FICHA CADASTRAL BITTENCOURT ===
Empresa: ${partner.company_name}
CNPJ: ${partner.cnpj}
Segmento: ${partner.segment}
Região: ${partner.region}
Unidades: ${partner.units_count}
Faturamento Anual (LTV): ${formatBRLCurrency(partner.annual_revenue)}
Ticket Médio por Unidade: ${formatBRLCurrency(averageRevenuePerUnit)}
Status: ${partner.status.toUpperCase()}
Gestor Responsável: ${partner.account_manager}
Última Interação: ${formatDateBR(partner.last_interaction_at)}
===================================
`.trim();

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback gracioso caso clipboard API esteja indisponível
      setCopied(false);
    }
  };

  const handleSimulateContact = () => {
    setContactSimulated(true);
    setTimeout(() => setContactSimulated(false), 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-partner-title"
    >
      <div
        className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header do Modal */}
        <div className="px-6 py-5 border-b border-zinc-800/80 bg-zinc-900/40 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-inner">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2
                  id="modal-partner-title"
                  className="text-base font-semibold text-zinc-100"
                >
                  {partner.company_name}
                </h2>
                <StatusBadge status={partner.status} />
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                {partner.segment} •{" "}
                <span className="font-mono text-zinc-500">{partner.cnpj}</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-colors cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>


        {/* Corpo do Modal */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Tags de Contexto */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
              {partner.segment}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
              <MapPin className="w-3.5 h-3.5 text-zinc-500" />
              Região {partner.region}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              PostgreSQL RLS Active
            </span>
          </div>

          {/* Cards de Inteligência & BI */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* LTV */}
            <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/30">
              <div className="flex items-center justify-between text-zinc-400 mb-1.5">
                <span className="text-xs font-medium">Faturamento Anual</span>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-lg font-bold font-mono text-emerald-400">
                {formatBRLCurrency(partner.annual_revenue)}
              </div>
              <p className="text-[11px] text-zinc-500 mt-1">LTV consolidado</p>
            </div>

            {/* Unidades */}
            <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/30">
              <div className="flex items-center justify-between text-zinc-400 mb-1.5">
                <span className="text-xs font-medium">Unidades Operacionais</span>
                <Store className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-lg font-bold font-mono text-zinc-100">
                {partner.units_count}
              </div>
              <p className="text-[11px] text-zinc-500 mt-1">Pontos em operação</p>
            </div>

            {/* Ticket Médio */}
            <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/30">
              <div className="flex items-center justify-between text-zinc-400 mb-1.5">
                <span className="text-xs font-medium">Receita / Unidade</span>
                <TrendingUp className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-lg font-bold font-mono text-amber-400">
                {formatBRLCurrency(averageRevenuePerUnit)}
              </div>
              <p className="text-[11px] text-zinc-500 mt-1">Média por franqueado</p>
            </div>
          </div>

          {/* Seção de Gestão & Governança */}
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/20 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Governança & Atendimento BITTENCOURT
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-zinc-800 text-zinc-300">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-zinc-500">Gestor de Conta</div>
                  <div className="font-medium text-zinc-200">
                    {partner.account_manager}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-zinc-800 text-zinc-300">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-zinc-500">Última Auditoria / Contato</div>
                  <div className="font-medium text-zinc-200">
                    {formatDateBR(partner.last_interaction_at)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback de Ação */}
          {contactSimulated && (
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs flex items-center gap-2 animate-in fade-in">
              <Send className="w-4 h-4 shrink-0 text-blue-400" />
              <span>
                Solicitação de alinhamento estratégico enviada para o gestor{" "}
                <strong>{partner.account_manager}</strong>!
              </span>
            </div>
          )}
        </div>

        {/* Rodapé de Ações */}
        <div className="px-6 py-4 border-t border-zinc-800/80 bg-zinc-900/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleCopyDetails}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Ficha Copiada!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
                <span>Copiar Ficha Cadastral</span>
              </>
            )}
          </button>

          <div className="w-full sm:w-auto flex items-center gap-2">
            <button
              onClick={handleSimulateContact}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-medium text-white transition-colors cursor-pointer shadow-lg shadow-blue-600/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Contatar Gestor</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-zinc-800 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
