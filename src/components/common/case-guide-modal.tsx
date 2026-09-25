"use client";

import React, { useEffect, useState } from "react";
import {
  Sparkles,
  X,
  Building2,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ExternalLink,
  Code2,
} from "lucide-react";

export function CaseGuideModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
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
  }, [isOpen]);

  return (
    <>
      {/* Botão Gatilho no Header */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 text-xs font-medium transition-all cursor-pointer shadow-sm hover:shadow-blue-500/10"
        title="Ver apresentação executiva do case BITTENCOURT"
      >
        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
        <span className="hidden sm:inline">Sobre o Case</span>
        <span className="sm:hidden">Case</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-zinc-800/80 bg-zinc-900/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-zinc-100">
                    Case B2B Hub v1.1 • Grupo BITTENCOURT
                  </h2>

                  <p className="text-xs text-zinc-400">
                    Apresentação Executiva & Destaques de Engenharia
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs text-zinc-300 leading-relaxed">
              {/* Contexto de Negócio */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" />
                  Visão de Negócio (Grupo BITTENCOURT)
                </h3>
                <p className="text-zinc-300">
                  Plataforma B2B desktop-first desenvolvida sob medida para a gestão e inteligência
                  de redes de franquias corporativas. Resolve o gargalo de consolidação financeira de
                  LTV, conformidade jurídica (CNPJ) e acompanhamento por gestores de conta dedicados.
                </p>
              </div>

              {/* Diferenciais Técnicos */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Zap className="w-4 h-4" />
                  Arquitetura de Alta Performance
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/30">
                    <div className="font-semibold text-zinc-100 flex items-center gap-1.5 mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Next.js 16 + React 19 RSC
                    </div>
                    <p className="text-zinc-400 text-[11px]">
                      Server Components com Streaming Suspense para renderização imediata de métricas.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/30">
                    <div className="font-semibold text-zinc-100 flex items-center gap-1.5 mb-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                      PostgreSQL RLS Ativo
                    </div>
                    <p className="text-zinc-400 text-[11px]">
                      Segurança em profundidade com políticas declarativas de Row-Level Security no Supabase.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/30">
                    <div className="font-semibold text-zinc-100 flex items-center gap-1.5 mb-1">
                      <Code2 className="w-3.5 h-3.5 text-blue-400" />
                      Estado Orientado à URL
                    </div>
                    <p className="text-zinc-400 text-[11px]">
                      Busca debouncada (300ms), filtros regionais e paginação com links 100% compartilháveis.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/30">
                    <div className="font-semibold text-zinc-100 flex items-center gap-1.5 mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                      35 Testes com Vitest
                    </div>
                    <p className="text-zinc-400 text-[11px]">
                      Cobertura unitária de cálculos de KPI, formatters BRL/CNPJ e sanitização de query.
                    </p>
                  </div>
                </div>
              </div>

              {/* Guia de Demonstração Interativa */}
              <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-2">
                <h4 className="font-semibold text-zinc-100 flex items-center gap-1.5">
                  💡 Como interagir com a demonstração:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-zinc-400 text-[11px]">
                  <li>
                    <strong className="text-zinc-200">Clique em qualquer linha da tabela:</strong> Abre o Dossiê Estratégico do franqueado com cálculo de ticket médio por unidade e ações rápidas.
                  </li>
                  <li>
                    <strong className="text-zinc-200">Filtre por Região ou Status:</strong> Veja a URL atualizar de forma declarativa e os dados serem re-streamados pelo servidor.
                  </li>
                  <li>
                    <strong className="text-zinc-200">Busque por Nome ou CNPJ:</strong> Experimente digitar &quot;Burger&quot;, &quot;Boticario&quot; ou pontuações de CNPJ com debounce suave.
                  </li>
                </ul>
              </div>
            </div>

            {/* Rodapé com Links do Autor */}
            <div className="px-6 py-4 border-t border-zinc-800/80 bg-zinc-900/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="text-zinc-400">
                Desenvolvido por{" "}
                <strong className="text-zinc-200">Vinicius Matos de Mendonça</strong>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/Vinnizius1/franchise-partner-hub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-zinc-300 hover:text-white transition-colors"
                >
                  <span>Repositório GitHub</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>

                <button
                  onClick={() => setIsOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors cursor-pointer"
                >
                  Entendi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
