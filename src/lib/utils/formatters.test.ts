import { describe, it, expect } from "vitest";
import {
  formatBRLCurrencyCompact,
  formatBRLCurrency,
  formatDateBR,
  formatCNPJ,
} from "./formatters";

describe("Formatting Utilities (formatters.ts)", () => {
  describe("formatBRLCurrencyCompact", () => {
    it("deve formatar valores em notação compacta contendo prefixo R$", () => {
      const result = formatBRLCurrencyCompact(45_000_000);
      // Remove espaços não separáveis (\u00A0 ou \u202F) para comparação resiliente
      const sanitized = result.replace(/[\s\u00A0\u202F]/g, " ");
      expect(sanitized).toMatch(/R\$\s*45/);
    });

    it("deve formatar 0 e valores inválidos de forma graciosa sem estourar exceção", () => {
      expect(formatBRLCurrencyCompact(0).replace(/[\s\u00A0\u202F]/g, " ")).toMatch(/R\$\s*0/);
      expect(formatBRLCurrencyCompact(null).replace(/[\s\u00A0\u202F]/g, " ")).toMatch(/R\$\s*0/);
      expect(formatBRLCurrencyCompact(undefined).replace(/[\s\u00A0\u202F]/g, " ")).toMatch(/R\$\s*0/);
    });
  });

  describe("formatBRLCurrency", () => {
    it("deve formatar valores em moeda cheia BRL sem decimais", () => {
      const formatted = formatBRLCurrency(5_000_000).replace(/[\s\u00A0\u202F]/g, " ");
      expect(formatted).toBe("R$ 5.000.000");
    });

    it("deve formatar zero quando a entrada for nula ou indefinida", () => {
      const formatted = formatBRLCurrency(null).replace(/[\s\u00A0\u202F]/g, " ");
      expect(formatted).toBe("R$ 0");
    });
  });

  describe("formatDateBR", () => {
    it("deve formatar strings ISO válidas em formato pt-BR", () => {
      // 2024-03-24 UTC
      const formatted = formatDateBR("2024-03-24T12:00:00Z");
      expect(formatted).toContain("2024");
      expect(formatted).toMatch(/24/);
    });

    it("deve retornar traço '-' para strings inválidas, nulas ou indefinidas", () => {
      expect(formatDateBR("")).toBe("-");
      expect(formatDateBR("data_invalida")).toBe("-");
      expect(formatDateBR(null)).toBe("-");
      expect(formatDateBR(undefined)).toBe("-");
    });
  });

  describe("formatCNPJ", () => {
    it("deve aplicar a máscara XX.XXX.XXX/XXXX-XX em 14 dígitos numéricos", () => {
      expect(formatCNPJ("12345678000199")).toBe("12.345.678/0001-99");
    });

    it("deve ignorar caracteres não numéricos prévios e aplicar máscara", () => {
      expect(formatCNPJ("12.345.678.0001-99")).toBe("12.345.678/0001-99");
    });

    it("deve retornar o próprio valor se não contiver exatamente 14 dígitos", () => {
      expect(formatCNPJ("123")).toBe("123");
      expect(formatCNPJ("")).toBe("");
      expect(formatCNPJ(null)).toBe("");
    });
  });
});
