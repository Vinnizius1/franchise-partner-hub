import React from "react";

/**
 * 🧠 [SENIOR MENTAL MODEL]: Progressive Streaming & Skeleton Loaders
 * Em aplicações de alta densidade, o usuário corporativo não deve esperar
 * uma tela em branco (trava de LCP). O Skeleton antecipa o layout exato
 * da tabela enquanto o Server Component busca os dados no Supabase.
 */
export function TableSkeleton() {
  return (
    <div className="w-full rounded-xl border border-zinc-800 bg-zinc-950/50 backdrop-blur overflow-hidden">
      <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-zinc-800 flex justify-between items-center animate-pulse">
        <div className="h-5 w-44 sm:w-48 bg-zinc-800 rounded" />
        <div className="h-5 w-20 sm:w-24 bg-zinc-800 rounded" />
      </div>

      {/* Desktop Skeleton */}
      <div className="hidden md:block divide-y divide-zinc-800/60 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-1/4">
              <div className="w-8 h-8 rounded-lg bg-zinc-800" />
              <div className="space-y-1.5 flex-1">
                <div className="h-4 w-3/4 bg-zinc-800 rounded" />
                <div className="h-3 w-1/2 bg-zinc-800/60 rounded" />
              </div>
            </div>
            <div className="h-4 w-24 bg-zinc-800 rounded" />
            <div className="h-5 w-20 bg-zinc-800 rounded-full" />
            <div className="h-4 w-28 bg-zinc-800 rounded font-mono" />
            <div className="h-4 w-24 bg-zinc-800 rounded" />
            <div className="h-8 w-20 bg-zinc-800 rounded-lg" />
          </div>
        ))}
      </div>

      {/* Mobile Skeleton */}
      <div className="block md:hidden p-3 sm:p-4 space-y-3 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="p-3.5 bg-zinc-900/40 border border-zinc-800/80 rounded-xl space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-36 bg-zinc-800 rounded" />
              <div className="h-5 w-16 bg-zinc-800 rounded-full" />
            </div>
            <div className="h-12 bg-zinc-950/60 rounded-lg" />
            <div className="flex justify-between items-center">
              <div className="h-3 w-28 bg-zinc-800 rounded" />
              <div className="h-3 w-16 bg-zinc-800 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
