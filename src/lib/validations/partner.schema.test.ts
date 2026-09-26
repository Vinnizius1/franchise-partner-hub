import { describe, it, expect } from "vitest";
import {
  parsePartnerSearchParams,
  UpdatePartnerStatusSchema,
} from "./partner.schema";

describe("partner.schema - Runtime Boundary Validation", () => {
  describe("parsePartnerSearchParams (URL Defense)", () => {
    it("deve retornar valores default seguros quando receber objeto vazio ou nulo", () => {
      const resultEmpty = parsePartnerSearchParams({});
      expect(resultEmpty).toEqual({
        search: "",
        status: "all",
        region: "all",
        page: 1,
      });

      const resultNull = parsePartnerSearchParams(null);
      expect(resultNull).toEqual({
        search: "",
        status: "all",
        region: "all",
        page: 1,
      });

      const resultUndefined = parsePartnerSearchParams(undefined);
      expect(resultUndefined).toEqual({
        search: "",
        status: "all",
        region: "all",
        page: 1,
      });
    });

    it("deve fazer o parse e coerção correta de parâmetros válidos", () => {
      const result = parsePartnerSearchParams({
        search: "Burger King",
        status: "ativo",
        region: "Sudeste",
        page: "3",
      });

      expect(result).toEqual({
        search: "Burger King",
        status: "ativo",
        region: "Sudeste",
        page: 3,
      });
    });

    it("deve aparar (trim) espaços em branco no termo de busca", () => {
      const result = parsePartnerSearchParams({
        search: "   O Boticário   ",
      });

      expect(result.search).toBe("O Boticário");
    });

    it("deve extrair o primeiro elemento caso o Next.js receba arrays duplicados na URL", () => {
      const result = parsePartnerSearchParams({
        search: ["Localiza", "Arezzo"],
        status: ["negociacao", "ativo"],
        region: ["Sul", "Norte"],
        page: ["2", "5"],
      });

      expect(result).toEqual({
        search: "Localiza",
        status: "negociacao",
        region: "Sul",
        page: 2,
      });
    });

    it("deve recuperar graciosamente com fallback quando status for inválido ou malicioso", () => {
      const result = parsePartnerSearchParams({
        status: "DROP_TABLE;--",
      });

      expect(result.status).toBe("all");
    });

    it("deve recuperar graciosamente com fallback quando region for inválida", () => {
      const result = parsePartnerSearchParams({
        region: "Inexistente",
      });

      expect(result.region).toBe("all");
    });

    it("deve recuperar graciosamente para página 1 quando page for negativa, zero ou string arbitrária", () => {
      expect(parsePartnerSearchParams({ page: "-10" }).page).toBe(1);
      expect(parsePartnerSearchParams({ page: "0" }).page).toBe(1);
      expect(parsePartnerSearchParams({ page: "abc" }).page).toBe(1);
      expect(parsePartnerSearchParams({ page: "NaN" }).page).toBe(1);
    });

    it("deve rejeitar entradas de página não-decimais (hex, binário, notação científica) e recorrer ao fallback 1", () => {
      expect(parsePartnerSearchParams({ page: "0x10" }).page).toBe(1);
      expect(parsePartnerSearchParams({ page: "1e3" }).page).toBe(1);
      expect(parsePartnerSearchParams({ page: "0b10" }).page).toBe(1);
      expect(parsePartnerSearchParams({ page: "0o10" }).page).toBe(1);
    });
  });

  describe("UpdatePartnerStatusSchema (Server Actions Defense)", () => {
    it("deve validar com sucesso um payload correto com UUID e status válido", () => {
      const validPayload = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        status: "ativo",
      };

      const result = UpdatePartnerStatusSchema.safeParse(validPayload);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validPayload);
      }
    });

    it("deve rejeitar IDs que não sejam UUIDs válidos", () => {
      const invalidPayload = {
        id: "123-id-invalido",
        status: "ativo",
      };

      const result = UpdatePartnerStatusSchema.safeParse(invalidPayload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("UUID válido");
      }
    });

    it("deve rejeitar status desconhecidos fora da enumeração de negócio", () => {
      const invalidPayload = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        status: "status_inexistente",
      };

      const result = UpdatePartnerStatusSchema.safeParse(invalidPayload);
      expect(result.success).toBe(false);
    });
  });
});
