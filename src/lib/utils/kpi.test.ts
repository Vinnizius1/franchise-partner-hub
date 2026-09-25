import { describe, it, expect } from "vitest";
import { calculateTotalRevenue, calculatePartnersCount } from "./kpi";

describe("KPI Domain Calculations (kpi.ts)", () => {
  describe("calculateTotalRevenue", () => {
    it("deve retornar 0 quando a lista for vazia, nula ou indefinida", () => {
      expect(calculateTotalRevenue([])).toBe(0);
      expect(calculateTotalRevenue(null)).toBe(0);
      expect(calculateTotalRevenue(undefined)).toBe(0);
    });

    it("deve somar corretamente os faturamentos de múltiplos parceiros", () => {
      const mockPartners = [
        { annual_revenue: 10_000_000 },
        { annual_revenue: 25_500_000 },
        { annual_revenue: 4_500_000 },
      ];
      expect(calculateTotalRevenue(mockPartners)).toBe(40_000_000);
    });

    it("deve converter strings numéricas retornadas pelo Supabase/PostgreSQL", () => {
      const mockPartners = [
        { annual_revenue: "15000000" },
        { annual_revenue: "5000000.50" },
      ];
      expect(calculateTotalRevenue(mockPartners)).toBe(20_000_000.5);
    });

    it("deve ignorar registros nulos, indefinidos ou valores não numéricos (resiliência defensiva)", () => {
      const mockPartners = [
        { annual_revenue: 10_000_000 },
        { annual_revenue: null },
        { annual_revenue: undefined },
        { annual_revenue: "inválido" },
        { annual_revenue: -500 }, // não deve somar faturamento negativo
      ];
      expect(calculateTotalRevenue(mockPartners)).toBe(10_000_000);
    });
  });

  describe("calculatePartnersCount", () => {
    it("deve retornar o tamanho exato da lista de parceiros", () => {
      const partners = [{ id: "1" }, { id: "2" }, { id: "3" }];
      expect(calculatePartnersCount(partners)).toBe(3);
    });

    it("deve retornar 0 para entradas nulas, indefinidas ou não-arrays", () => {
      expect(calculatePartnersCount(null)).toBe(0);
      expect(calculatePartnersCount(undefined)).toBe(0);
      expect(calculatePartnersCount([])).toBe(0);
    });
  });
});
