/**
 * 🧠 [SENIOR MENTAL MODEL]: Utilitários de Formatação Determinísticos
 * Todas as funções de formatação utilizam a API nativa Intl padronizada em pt-BR.
 * Funções puras garantem consistência visual entre Server Components, Client Components e Testes.
 */

/**
 * Formata um valor numérico em moeda BRL de forma compacta (ex: R$ 45M, R$ 1,2 bi).
 */
export function formatBRLCurrencyCompact(val: number | null | undefined): string {
  const safeVal = Number.isFinite(val) ? Number(val) : 0;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(safeVal);
}

/**
 * Formata um valor numérico em moeda BRL completa sem casas decimais (ex: R$ 45.000.000).
 */
export function formatBRLCurrency(val: number | null | undefined): string {
  const safeVal = Number.isFinite(val) ? Number(val) : 0;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(safeVal);
}

/**
 * Formata uma string ISO ou timestamp para exibição amigável em pt-BR (ex: "24 de mar. de 2024").
 */
export function formatDateBR(dateStr: string | null | undefined): string {
  if (!dateStr) return "-";
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return "-";
    }
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  } catch {
    return "-";
  }
}

/**
 * Formata dígitos crus de CNPJ (14 dígitos) para a máscara padrão XX.XXX.XXX/XXXX-XX.
 */
export function formatCNPJ(cnpj: string | null | undefined): string {
  if (!cnpj) return "";
  const cleaned = cnpj.replace(/\D/g, "");
  if (cleaned.length !== 14) return cnpj;
  return cleaned.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
}
