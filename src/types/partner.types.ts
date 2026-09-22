/**
 * 🧠 [SENIOR MENTAL MODEL]: Contratos Estritos e Single Source of Truth
 * Em aplicações enterprise, a integridade dos dados vem em primeiro lugar.
 * Estes tipos espelham estritamente o Schema do PostgreSQL no Supabase,
 * garantindo que o front-end nunca acesse campos inexistentes ou tente
 * passar estados inválidos para o banco de dados.
 */

export type PartnerStatus =
  | "lead"
  | "negociacao"
  | "ativo"
  | "inadimplente"
  | "cancelado";

export type PartnerRegion =
  | "Sudeste"
  | "Sul"
  | "Nordeste"
  | "Centro-Oeste"
  | "Norte";

export type PartnerSegment =
  | "Alimentação"
  | "Moda & Calçados"
  | "Acessórios"
  | "Saúde & Beleza"
  | "Fitness"
  | "Educação"
  | "Serviços"
  | "Automotivo"
  | "Turismo";

/**
 * Entidade Principal de Relacionamento Corporativo (Franquia/Parceiro)
 */
export interface CorporatePartner {
  id: string;
  company_name: string;
  cnpj: string;
  segment: PartnerSegment;
  status: PartnerStatus;
  annual_revenue: number;
  units_count: number;
  region: PartnerRegion;
  account_manager: string;
  last_interaction_at: string;
  created_at: string;
  updated_at: string;
}

/**
 * 🧠 [SENIOR MENTAL MODEL]: Filtros orientados à URL (Search Params)
 * Em vez de manter estado volátil no React (useState), os filtros da tabela
 * são serializados na URL para permitir links compartilháveis e manter
 * a renderização principal como Server Component.
 */
export interface PartnerFilterParams {
  search?: string;
  status?: PartnerStatus;
  region?: PartnerRegion;
  page?: number;
  perPage?: number;
}

/**
 * DTO (Data Transfer Object) para mutações via Server Actions
 */
export interface UpdatePartnerStatusDTO {
  id: string;
  status: PartnerStatus;
}
