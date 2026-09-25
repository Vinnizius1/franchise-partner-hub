"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";


const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

const STORAGE_KEY = "b2b-hub:case-guide-seen";
const CASE_SEEN_EVENT = "b2b-hub:case-seen-event";

function subscribeToStorage(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(CASE_SEEN_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CASE_SEEN_EVENT, callback);
  };
}

function useHasSeenGuide() {
  return useSyncExternalStore(
    subscribeToStorage,
    () => {
      try {
        return localStorage.getItem(STORAGE_KEY) === "true";
      } catch {
        return false;
      }
    },
    () => true // SSR snapshot repousado para hidratação perfeita
  );
}

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
  const isClient = useIsClient();
  const hasSeenGuide = useHasSeenGuide();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const markGuideAsSeen = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
      window.dispatchEvent(new Event(CASE_SEEN_EVENT));
    } catch {
      // Ignora restrições de navegação anônima
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    markGuideAsSeen();
  };


  useEffect(() => {
    if (!isOpen) return;

    // Foca no botão de fechar ao abrir
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }

      // Focus Trap dentro do Modal
      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const modalContent = isOpen ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-guide-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (Fixo) */}
        <div className="shrink-0 px-6 py-5 border-b border-zinc-800/80 bg-zinc-900/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 id="case-guide-title" className="text-base font-semibold text-zinc-100">
                Case B2B Hub v1.1 • Grupo BITTENCOURT
              </h2>
              <p className="text-xs text-zinc-400">
                Apresentação Executiva & Destaques de Engenharia
              </p>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Fechar apresentação do case"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo (Scrollável em telas curtas) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-zinc-300 leading-relaxed">
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

        {/* Rodapé com Links do Autor (Fixo) */}
        <div className="shrink-0 px-6 py-4 border-t border-zinc-800/80 bg-zinc-900/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
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
              onClick={() => {
                setIsOpen(false);
                markGuideAsSeen();
              }}
              className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors cursor-pointer"
            >
              Entendi
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* Botão Gatilho no Header com Feature Discovery Beacon */}
      <button
        onClick={handleOpen}
        className={`relative group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-medium transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          !hasSeenGuide && isClient
            ? "bg-gradient-to-r from-blue-600/30 via-indigo-600/20 to-blue-600/30 border-blue-500/60 text-blue-200 shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:border-blue-400 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]"
            : "bg-blue-500/10 border-blue-500/30 text-blue-300 hover:bg-blue-500/20 hover:border-blue-500/50 shadow-sm"
        }`}
        title="Ver apresentação executiva do case BITTENCOURT"
      >
        {/* Beacon Pulse Dot animado (ativo apenas antes do primeiro clique) */}
        {!hasSeenGuide && isClient && (
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
        )}

        <Sparkles
          className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${
            !hasSeenGuide && isClient ? "text-blue-300 animate-pulse" : "text-blue-400"
          }`}
        />
        <span className="font-semibold tracking-wide">Sobre o Case</span>

        {/* Badge contextual elegante */}
        {!hasSeenGuide && isClient ? (
          <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-500/20 text-blue-200 border border-blue-400/40 animate-pulse">
            Novo • Guia
          </span>
        ) : (
          <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-zinc-800/80 text-zinc-400 border border-zinc-700/50">
            Guia
          </span>
        )}
      </button>

      {/* Renderiza via Portal no document.body para escapar do backdrop-blur do header */}
      {isClient && modalContent && createPortal(modalContent, document.body)}
    </>
  );
}

