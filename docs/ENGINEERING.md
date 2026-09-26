# ⚙️ Engenharia de Software, Matriz Tecnológica & Testes | Grupo BITTENCOURT

> **Especificação técnica detalhada das dependências corporativas LTS (Stack 2026), suíte de testes automatizados e decisões de engenharia do Franchise Partner Hub.**

---

## 🧱 1. Matriz Tecnológica LTS (Stack 2026)

Para garantir estabilidade corporativa, compatibilidade com pipelines modernos e prevenção contra vulnerabilidades de dependências, esta aplicação foi construída com as versões ativas da indústria:

| Tecnologia / Pacote | Versão | Papel no Ecossistema | Racional de Engenharia |
| :--- | :--- | :--- | :--- |
| **Node.js** | `v22.x LTS` | Runtime de Execução | Suporte a longo prazo (LTS), gerenciamento de memória aprimorado e conformidade corporativa. |
| **Next.js** | `16.3.5` | Framework Full Stack | App Router nativo, compilador Turbopack, Server Components e otimização automática de rotas. |
| **React** | `19.2.8` | Biblioteca de Interface | Adoção plena de Server Components, Actions e Suspense boundaries. |
| **TypeScript** | `^5.0.0` | Linguagem & Tipagem | Modo estrito (`strict: true`), zero uso de `any`, tipagem espelhada diretamente do DDL relacional. |
| **@supabase/ssr** | `^0.12.7` | Cliente Supabase Server | Gerenciamento seguro de cookies e autenticação adaptada para o runtime serverless do Next.js. |
| **@supabase/supabase-js** | `^2.117.0` | Driver PostgREST | Acesso tipado ao PostgreSQL com suporte nativo a Row-Level Security e connection pooling. |
| **Vitest** | `^5.0.1` | Suíte de Testes Unitários | Runner de testes ultra-rápido baseado em Vite/ESM (feedback loop de ~260ms para 35 testes). |
| **Tailwind CSS** | `^4.0.0` | Engine de Estilização | Estilização utilitária de alta densidade visual (Dark Mode corporativo) com zero overhead em runtime. |
| **use-debounce** | `^10.1.1` | Otimização de Entrada | Debounce reativo de 300ms nos inputs de busca para mitigação de sobrecarga no backend. |
| **Lucide React** | `^1.47.0` | Design System de Ícones | Ícones SVG otimizados para dashboards corporativos com zero impacto no First Contentful Paint. |

---

## 🧪 2. Engenharia de Testes Automatizados (Vitest)

A aplicação segue a metodologia de **TDD / Feedback Rápido**, com uma suíte de **35 testes unitários** automatizados e 100% aprovados em ~260ms:

```bash
 ✓ src/lib/utils/kpi.test.ts (10 tests)
 ✓ src/lib/utils/query.test.ts (16 tests)
 ✓ src/lib/utils/formatters.test.ts (9 tests)

 Test Files  3 passed (3)
      Tests  35 passed (35)
   Duration  ~260ms
```

### O que é coberto pela suíte:

1. **[`kpi.test.ts`](./src/lib/utils/kpi.test.ts):** Cálculos de faturamento consolidado (LTV da rede), totalizador dinâmico de unidades operacionais, cálculo de ticket médio por unidade e abreviação visual compacta (`R$ 318 mi`, `R$ 45 mil`).
2. **[`formatters.test.ts`](./src/lib/utils/formatters.test.ts):** Formatação monetária em padrão BRL (`Intl.NumberFormat`), aplicação de máscara estrita de CNPJ (`##.###.###/####-##`) e formatação humanizada de datas no fuso horário corporativo (`pt-BR`).
3. **[`query.test.ts`](./src/lib/utils/query.test.ts):** Escape de aspas e barras delimitadoras, tratamento de filtros de região/status, cálculo de offsets de paginação e prevenção contra falhas de injeção em APIs PostgREST.

---

## 📚 3. Fundamentos Técnicos & Decisões de Engenharia

Os conceitos fundamentais de arquitetura, boas práticas e decisões de engenharia de software foram estruturados em módulos de referência:

- **Módulo 1: Server Components vs Client Components:** Composição de RSC Boundary e Streaming Suspense para First Contentful Paint imediato.
- **Módulo 2: Segurança no Banco & PostgREST:** Row-Level Security (RLS) declarativo no PostgreSQL e sanitização defensiva de parâmetros de busca.
- **Módulo 3: Estado na URL (`searchParams`):** Gerenciamento reativo de busca, filtros e paginação diretamente na URL com debounce no cliente, garantindo links 100% compartilháveis e histórico navegável.
- **Módulo 4: Pirâmide de Testes & Vitest:** Pipeline de feedback loop instantâneo (~260ms) contra quebras de regressão em lógica de negócio crítica.
- **Módulo 5: Build do Next.js & Turbopack:** Otimização entre rotas estáticas e dinâmicas, e inlining seguro de variáveis de ambiente (`NEXT_PUBLIC_`).

---

_Documento de especificação técnica • Franchise Partner Hub | Grupo BITTENCOURT_
