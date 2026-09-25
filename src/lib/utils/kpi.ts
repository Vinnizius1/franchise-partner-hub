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
