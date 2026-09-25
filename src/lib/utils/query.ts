/**
 * 🧠 [SENIOR MENTAL MODEL]: Sanitização e Aritmética de Paginação / URL
 * Funções puras isoladas para construção de queries PostgREST e manipulação de URLSearchParams.
 * Protege contra injeção lógica e inconsistências de paginação (HTTP 416).
 */

export const DEFAULT_PAGE_SIZE = 6;

/**
 * Escapa aspas duplas e barras invertidas para prevenir PostgREST Logic Injection
 * em filtros compostos or(...) com .ilike.
 */
export function sanitizeSearchTerm(term: string | null | undefined): string {
  if (!term) return "";
  return term.trim().replace(/[\\"]/g, "\\$&");
}

/**
 * Constrói a cláusula PostgREST OR para busca textual segura.
 * Retorna null se o termo for vazio ou só contiver espaços.
 */
export function buildSearchFilter(term: string | null | undefined): string | null {
  const sanitized = sanitizeSearchTerm(term);
  if (!sanitized) return null;
  const pattern = `"%${sanitized}%"`;
  return `company_name.ilike.${pattern},cnpj.ilike.${pattern}`;
}

/**
 * Converte o parâmetro de página bruto da URL em um número de página inteiro e seguro (>= 1).
 */
export function parsePageParam(
  rawPage: string | string[] | undefined,
  defaultPage = 1
): number {
  const single = Array.isArray(rawPage) ? rawPage[0] : rawPage;
  if (!single) return defaultPage;

  const parsed = Math.floor(Number(single));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : defaultPage;
}

/**
 * Calcula os índices `from` e `to` para a cláusula `.range(from, to)` do Supabase.
 */
export function calculatePaginationRange(
  page: number,
  pageSize = DEFAULT_PAGE_SIZE
): { from: number; to: number; pageSize: number } {
  const safePage = Math.max(1, Math.floor(page));
  const safeSize = Math.max(1, Math.floor(pageSize));
  const from = (safePage - 1) * safeSize;
  const to = from + safeSize - 1;

  return { from, to, pageSize: safeSize };
}

/**
 * Calcula o total de páginas com base no total de registros e tamanho da página.
 */
export function calculateTotalPages(
  totalCount: number | null | undefined,
  pageSize = DEFAULT_PAGE_SIZE
): number {
  const count = Number.isFinite(totalCount) && Number(totalCount) > 0 ? Number(totalCount) : 0;
  const size = Math.max(1, Math.floor(pageSize));
  return Math.ceil(count / size);
}

/**
 * Atualiza um parâmetro de filtro na URL mantendo os outros e resetando a página para 1.
 */
export function buildUpdatedSearchParams(
  currentParams: URLSearchParams | string,
  key: string,
  value: string
): URLSearchParams {
  const params = new URLSearchParams(
    typeof currentParams === "string" ? currentParams : currentParams.toString()
  );

  if (value && value !== "all") {
    params.set(key, value);
  } else {
    params.delete(key);
  }

  // Sempre reseta para a página 1 ao alterar filtros
  params.set("page", "1");

  return params;
}
