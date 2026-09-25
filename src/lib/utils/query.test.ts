import { describe, it, expect } from "vitest";
import {
  sanitizeSearchTerm,
  buildSearchFilter,
  parsePageParam,
  calculatePaginationRange,
  calculateTotalPages,
  buildUpdatedSearchParams,
} from "./query";

describe("Query, Sanitization & Pagination (query.ts)", () => {
  describe("sanitizeSearchTerm", () => {
    it("deve remover espaços no início e fim", () => {
      expect(sanitizeSearchTerm("   Cacau Show   ")).toBe("Cacau Show");
    });

    it("deve escapar aspas duplas e barras invertidas para prevenir PostgREST Logic Injection", () => {
      const malicious = 'test" OR 1=1 -- \\';
      const sanitized = sanitizeSearchTerm(malicious);
      expect(sanitized).toBe('test\\" OR 1=1 -- \\\\');
    });

    it("deve retornar string vazia para entradas nulas ou indefinidas", () => {
      expect(sanitizeSearchTerm(null)).toBe("");
      expect(sanitizeSearchTerm(undefined)).toBe("");
    });
  });

  describe("buildSearchFilter", () => {
    it("deve retornar null para strings vazias ou só espaços", () => {
      expect(buildSearchFilter("")).toBeNull();
      expect(buildSearchFilter("    ")).toBeNull();
      expect(buildSearchFilter(null)).toBeNull();
    });

    it("deve construir a cláusula PostgREST OR sanitizada com wildcards %", () => {
      const filter = buildSearchFilter("Giraffas");
      expect(filter).toBe(
        'company_name.ilike."%Giraffas%",cnpj.ilike."%Giraffas%"'
      );
    });

    it("deve blindar o payload contra quebra de sintaxe PostgREST", () => {
      const filter = buildSearchFilter('Bob"s');
      expect(filter).toBe('company_name.ilike."%Bob\\"s%",cnpj.ilike."%Bob\\"s%"');
    });
  });

  describe("parsePageParam", () => {
    it("deve converter string numérica em inteiro", () => {
      expect(parsePageParam("3")).toBe(3);
    });

    it("deve aceitar array de strings (típico do Next.js searchParams)", () => {
      expect(parsePageParam(["2", "3"])).toBe(2);
    });

    it("deve retornar a página padrão (1) se o valor for inválido, negativo ou zero", () => {
      expect(parsePageParam("0")).toBe(1);
      expect(parsePageParam("-5")).toBe(1);
      expect(parsePageParam("abc")).toBe(1);
      expect(parsePageParam(undefined)).toBe(1);
      expect(parsePageParam(undefined, 5)).toBe(5);
    });
  });

  describe("calculatePaginationRange", () => {
    it("deve calcular corretamente from e to para a página 1 (tamanho 6)", () => {
      const range = calculatePaginationRange(1, 6);
      expect(range).toEqual({ from: 0, to: 5, pageSize: 6 });
    });

    it("deve calcular corretamente from e to para a página 2 (tamanho 6)", () => {
      const range = calculatePaginationRange(2, 6);
      expect(range).toEqual({ from: 6, to: 11, pageSize: 6 });
    });

    it("deve tratar páginas menores que 1 usando clamp defensivo", () => {
      const range = calculatePaginationRange(0, 6);
      expect(range).toEqual({ from: 0, to: 5, pageSize: 6 });
    });
  });

  describe("calculateTotalPages", () => {
    it("deve calcular o número total de páginas arredondando para cima", () => {
      expect(calculateTotalPages(15, 6)).toBe(3); // 6 + 6 + 3 = 3 páginas
      expect(calculateTotalPages(12, 6)).toBe(2); // múltiplos exatos
      expect(calculateTotalPages(5, 6)).toBe(1);
    });

    it("deve retornar 0 para contagens nulas ou zeradas", () => {
      expect(calculateTotalPages(0, 6)).toBe(0);
      expect(calculateTotalPages(null, 6)).toBe(0);
      expect(calculateTotalPages(undefined, 6)).toBe(0);
    });
  });

  describe("buildUpdatedSearchParams", () => {
    it("deve adicionar novo filtro e resetar page para 1", () => {
      const initial = new URLSearchParams("status=ativo&page=3");
      const updated = buildUpdatedSearchParams(initial, "region", "Sudeste");

      expect(updated.get("region")).toBe("Sudeste");
      expect(updated.get("status")).toBe("ativo");
      expect(updated.get("page")).toBe("1");
    });

    it("deve remover a chave quando o valor for 'all' ou vazio", () => {
      const initial = new URLSearchParams("status=ativo&region=Sul&page=2");
      const updated = buildUpdatedSearchParams(initial, "status", "all");

      expect(updated.has("status")).toBe(false);
      expect(updated.get("region")).toBe("Sul");
      expect(updated.get("page")).toBe("1");
    });
  });
});
