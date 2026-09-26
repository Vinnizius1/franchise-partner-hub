import { z } from "zod";

/**
 * 🧠 [SENIOR MENTAL MODEL]: Zod como Runtime Boundary Validator
 * Enquanto TypeScript protege em tempo de desenvolvimento/compilação,
 * estes schemas inspecionam dados reais em runtime na fronteira do sistema:
 * - Parâmetros de URL (?page=...&status=...)
 * - Mutações e Server Actions (formData/JSON)
 */

export const PARTNER_STATUSES = [
  "lead",
  "negociacao",
  "ativo",
  "inadimplente",
  "cancelado",
] as const;

export const PARTNER_REGIONS = [
  "Sudeste",
  "Sul",
  "Nordeste",
  "Centro-Oeste",
  "Norte",
] as const;

export const PARTNER_SEGMENTS = [
  "Alimentação",
  "Moda & Calçados",
  "Acessórios",
  "Saúde & Beleza",
  "Fitness",
  "Educação",
  "Serviços",
  "Automotivo",
  "Turismo",
] as const;

export const PartnerStatusSchema = z.enum(PARTNER_STATUSES);
export const PartnerRegionSchema = z.enum(PARTNER_REGIONS);
export const PartnerSegmentSchema = z.enum(PARTNER_SEGMENTS);

/**
 * Schema para validação e higienização estrita de Search Params da URL.
 * Utiliza .catch() para fallback resiliente: se um usuário/bot injetar
 * valores corrompidos ou maliciosos na URL, o sistema se auto-recupera
 * com valores default seguros em vez de estourar 500 no Supabase.
 */
export const PartnerSearchParamsSchema = z.object({
  search: z.preprocess(
    (val) => (Array.isArray(val) ? val[0] : val),
    z.string().optional().default("").transform((s) => s.trim())
  ),
  status: z.preprocess(
    (val) => (Array.isArray(val) ? val[0] : val),
    z.union([PartnerStatusSchema, z.literal("all")]).catch("all")
  ),
  region: z.preprocess(
    (val) => (Array.isArray(val) ? val[0] : val),
    z.union([PartnerRegionSchema, z.literal("all")]).catch("all")
  ),
  page: z.preprocess((val) => {
    const single = Array.isArray(val) ? val[0] : val;
    // Rejeita entradas não decimais (ex: hexadecimal "0x10", binário "0b10", notação científica "1e3")
    if (typeof single === "string" && !/^\d+$/.test(single.trim())) {
      return undefined;
    }
    return single;
  }, z.coerce.number().int().positive().catch(1)),
});

export type SafePartnerSearchParams = z.infer<typeof PartnerSearchParamsSchema>;

/**
 * Helper resiliente para parsing de SearchParams recebidos no Page / Server Components.
 */
export function parsePartnerSearchParams(rawParams: unknown): SafePartnerSearchParams {
  const safeInput = rawParams && typeof rawParams === "object" ? rawParams : {};
  return PartnerSearchParamsSchema.parse(safeInput);
}

/**
 * Schema para mutação de status de parceiro (Server Actions).
 * Garante que somente IDs em formato UUID e status válidos sejam processados.
 */
export const UpdatePartnerStatusSchema = z.object({
  id: z.string().uuid("O ID do parceiro deve ser um UUID válido"),
  status: PartnerStatusSchema,
});

export type UpdatePartnerStatusInput = z.infer<typeof UpdatePartnerStatusSchema>;
