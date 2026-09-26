"use client";

import React, { useTransition } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
}

/**
 * 🧠 [SENIOR MENTAL MODEL]: Paginação Orientada à URL
 * Mantém a página atual no searchParams (?page=2).
 * Isso permite que links de páginas específicas sejam compartilhados
 * e evita perda de estado ao dar F5.
 */
export function PaginationControls({
  currentPage,
  totalPages,
  totalCount,
  pageSize,
}: PaginationControlsProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  const startRecord = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, totalCount);

  return (
    <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-t border-zinc-800 bg-zinc-900/30 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs">
      <div className="text-zinc-400">
        Mostrando{" "}
        <span className="font-mono font-medium text-zinc-200">
          {startRecord}
        </span>{" "}
        a{" "}
        <span className="font-mono font-medium text-zinc-200">{endRecord}</span>{" "}
        de{" "}
        <span className="font-mono font-medium text-zinc-200">
          {totalCount}
        </span>{" "}
        parceiros
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1 || isPending}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-300 hover:bg-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Anterior</span>
        </button>

        <div className="px-3 py-1 font-mono text-zinc-400">
          Página{" "}
          <span className="text-zinc-100 font-semibold">{currentPage}</span> de{" "}
          <span className="text-zinc-100 font-semibold">
            {Math.max(1, totalPages)}
          </span>
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || isPending}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-300 hover:bg-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <span>Próxima</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
