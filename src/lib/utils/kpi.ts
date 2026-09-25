/**
 * 🧠 [SENIOR MENTAL MODEL]: Funções Puras de Domínio para KPIs
 * Desacopla a computação matemática do ciclo de vida dos componentes React.
 * Permite testes unitários instantâneos (< 2ms) sem necessidade de mocks de banco ou rede.
 */

export interface RevenueRecord {
  annual_revenue: number | string | null | undefined;
}

/**
 * Calcula a soma consolidada de faturamento anual de uma lista de parceiros.
 * Trata com resiliência valores nulos, strings numéricas do Postgres ou registros corrompidos.
 */
export function calculateTotalRevenue(
  records?: RevenueRecord[] | null
): number {
  if (!records || !Array.isArray(records) || records.length === 0) {
    return 0;
  }

  return records.reduce((acc, item) => {
    const rawVal = item?.annual_revenue;
    const num = typeof rawVal === "number" ? rawVal : Number(rawVal);
    return Number.isFinite(num) && num > 0 ? acc + num : acc;
  }, 0);
}

/**
 * Retorna a contagem total de parceiros de forma defensiva.
 */
export function calculatePartnersCount(records?: unknown[] | null): number {
  if (!records || !Array.isArray(records)) {
    return 0;
  }
  return records.length;
}

/**
 * Calcula o ticket médio anual de faturamento por unidade franqueada.
 * Trata defensivamente divisão por zero, valores negativos ou dados nulos.
 */
export function calculateAverageRevenuePerUnit(
  annualRevenue: number | string | null | undefined,
  unitsCount: number | string | null | undefined
): number {

  const rev = typeof annualRevenue === "number" ? annualRevenue : Number(annualRevenue);
  const units = typeof unitsCount === "number" ? unitsCount : Number(unitsCount);

  if (!Number.isFinite(rev) || rev <= 0 || !Number.isFinite(units) || units <= 0) {
    return 0;
  }

  return Math.round(rev / units);
}

