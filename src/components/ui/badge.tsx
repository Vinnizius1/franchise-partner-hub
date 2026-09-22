import React from "react";
import { PartnerStatus } from "@/types/partner.types";

interface StatusBadgeProps {
  status: PartnerStatus;
}

const statusConfig: Record<PartnerStatus, { label: string; className: string }> = {
  ativo: {
    label: "Ativo",
    className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  negociacao: {
    label: "Em Negociação",
    className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  lead: {
    label: "Lead",
    className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  inadimplente: {
    label: "Inadimplente",
    className: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  },
  cancelado: {
    label: "Cancelado",
    className: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.lead;

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${config.className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80" />
      {config.label}
    </span>
  );
}
