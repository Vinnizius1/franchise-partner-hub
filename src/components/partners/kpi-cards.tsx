import React from "react";
import { createClient } from "@/lib/supabase/server";
import {
  Building2,
  TrendingUp,
  ShieldCheck,
  Zap,
  AlertCircle,
} from "lucide-react";
import { calculateTotalRevenue, calculatePartnersCount } from "@/lib/utils/kpi";
import { formatBRLCurrencyCompact } from "@/lib/utils/formatters";

/**
 * 🧠 [SENIOR MENTAL MODEL]: Agregações Dinâmicas no Servidor
 * Para garantir consistência com a tabela e evitar discrepâncias de dados (Data Drift),
 * os KPIs de faturamento e contagem são derivados diretamente dos dados do Supabase
 * utilizando funções puras de domínio desacopladas e testáveis.
 */
export async function KpiCards() {
  const supabase = await createClient();
  const { data: partners, error } = await supabase
    .from("corporate_partners")
    .select("annual_revenue");

  if (error) {
    return (
      <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-400 text-xs flex items-center gap-2">
        <AlertCircle className="w-4 h-4 shrink-0" />
        <span>
          Não foi possível carregar os KPIs consolidados: {error.message}
        </span>
      </div>
    );
  }

  const totalPartners = calculatePartnersCount(partners);
  const totalRevenue = calculateTotalRevenue(partners);

  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* 1. Total de Redes */}
      <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur">
        <div className="flex items-center justify-between text-zinc-400 mb-2">
          <span className="text-xs font-medium">Franquias na Rede</span>
          <Building2 className="w-4 h-4 text-blue-400" />
        </div>
        <div className="text-2xl font-bold font-mono text-zinc-100">
          {totalPartners}
        </div>
        <p className="text-[11px] text-zinc-500 mt-1">
          Total derivado dinamicamente do banco
        </p>
      </div>

      {/* 2. Faturamento Total */}
      <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur">
        <div className="flex items-center justify-between text-zinc-400 mb-2">
          <span className="text-xs font-medium">
            Faturamento Total Gerenciado
          </span>
          <TrendingUp className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="text-2xl font-bold font-mono text-emerald-400">
          {formatBRLCurrencyCompact(totalRevenue)}
        </div>
        <p className="text-[11px] text-zinc-500 mt-1">
          Volume anual de LTV consolidado
        </p>
      </div>

      {/* 3. Segurança RLS */}
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

      {/* 4. Arquitetura RSC */}
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
  );
}
