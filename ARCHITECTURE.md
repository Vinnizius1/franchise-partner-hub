# 🏛️ Arquitetura de Software & Decisões de Engenharia

> **Documentação de Engenharia e Racional Técnico do Franchise Partner Hub (Grupo BITTENCOURT)**  
> Autor: Vinicius Matos de Mendonça • Setembro de 2026

---

## 📌 Visão Geral do Sistema

O **Franchise Partner Hub** foi projetado seguindo uma arquitetura híbrida moderna no ecossistema **Next.js 16 (App Router)** e **React 19**, integrando um banco de dados relacional **Supabase (PostgreSQL)** com segurança em nível de linha (RLS) e renderização transmitida via streaming.

```
                                      ┌────────────────────────────────────────┐
                                      │              CLIENT BROWSER            │
                                      │  (Filtros Reativos, Debounce, URL)     │
                                      └───────────────────┬────────────────────┘
                                                          │ HTTP Request (?q=...&region=...)
                                                          ▼
                                      ┌────────────────────────────────────────┐
                                      │        NEXT.JS 16 APP ROUTER           │
                                      │  (Vercel Edge / Serverless Functions)  │
                                      └─────┬────────────────────────────┬──────┘
                                            │                            │
                     ┌──────────────────────┴─────────┐                  │
                     ▼                                ▼                  │
        ┌─────────────────────────┐      ┌─────────────────────────┐     │
        │   RSC: KpiCardsSection  │      │   RSC: PartnersTable    │     │
        │   (Streaming Suspense)  │      │   (Streaming Suspense)  │     │
        └────────────┬────────────┘      └────────────┬────────────┘     │
                     │                                │                  │
                     └────────────────┬───────────────┘                  │
                                      ▼                                  │
                        ┌───────────────────────────┐                    │
                        │   Supabase SSR Driver     │◄───────────────────┘
                        │   (Query Sanitizer)       │
                        └─────────────┬─────────────┘
                                      │ PostgREST over HTTPS
                                      ▼
                        ┌───────────────────────────┐
                        │    PostgreSQL Database    │
                        │    • Row-Level Security   │
                        │    • B-Tree Indexes       │
                        │    • CHECK Constraints    │
                        └───────────────────────────┘
```

---

## ⚖️ Trade-offs Arquiteturais: O Porquê, o Sim e o Não

Toda decisão de engenharia em aplicações de missão crítica envolve trade-offs conscientes de performance, complexidade e manutenibilidade. Abaixo estão os principais compromissos técnicos adotados:

### 1. React Server Components (RSC) vs. Client-Side Data Fetching (SPA tradicional)
- **O Porquê:** Reduzir drasticamente o JavaScript enviado ao cliente e executar regras de agregação de faturamento diretamente no servidor.
- **O Sim (Prós):** Bundle inicial ultra-leve, proteção de regras de negócio, carregamento instantâneo (SSR) e segurança absoluta das chamadas ao banco.
- **O Não (Riscos/Contras):** Exige segregação rigorosa de responsabilidades entre Server Components (sem hooks/eventos) e Client Components (`"use client"` pontual).

### 2. Streaming com React Suspense
- **O Porquê:** A agregação de faturamento de toda a rede (KPIs) e a query da tabela paginada não devem travar a renderização inicial da página.
- **O Sim (Prós):** O usuário recebe a casca da página e os *skeletons* de loading imediatamente via HTTP Chunked Transfer, melhorando as métricas de **LCP (Largest Contentful Paint)**.
- **O Não (Riscos/Contras):** Exige planejamento de fallbacks visuais limpos para evitar Layout Shifts (CLS).

### 3. URL Search Params como Gerenciador de Estado
- **O Porquê:** Manter busca (`?q=`), filtros (`?region=`, `?status=`) e página (`?page=`) diretamente na URL, eliminando dependência de bibliotecas de estado global como Redux ou Zustand.
- **O Sim (Prós):** Links 100% compartilháveis (deep linking), persistência nativa no histórico do navegador (botões Voltar/Avançar funcionam) e suporte imediato a SSR em qualquer link compartilhado.
- **O Não (Riscos/Contras):** Exige debounce controlado no cliente para não disparar requisições em excesso a cada tecla digitada.

### 4. PostgREST Injection Protection & Sanitização de Queries
- **O Porquê:** O Supabase utiliza PostgREST internamente, onde caracteres especiais como `%`, `.`, `,` e operadores `.or()` podem alterar o plano de execução da query.
- **O Sim (Prós):** Sanitização estrita em camada utilitária isolada e testada ([`src/lib/utils/query.ts`](./src/lib/utils/query.ts)), garantindo integridade e prevenção de queries maliciosas.
- **O Não (Riscos/Contras):** Queries complexas requerem métodos de escape cuidadosos para não anular buscas válidas com acentuação ou pontuação de CNPJ.

---

## 🛡️ Modelagem de Dados & Segurança (Supabase DDL)

A tabela relacional `franchise_partners` conta com tipagem rigorosa, índices estratégicos para acelerar consultas e políticas de RLS ativas:

```sql
-- DDL da Tabela Corporativa de Franqueados
CREATE TABLE franchise_partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name VARCHAR(255) NOT NULL,
    cnpj VARCHAR(18) NOT NULL UNIQUE,
    segment VARCHAR(100) NOT NULL,
    region VARCHAR(50) NOT NULL,
    units_count INTEGER NOT NULL DEFAULT 1 CHECK (units_count >= 0),
    annual_revenue NUMERIC(15, 2) NOT NULL DEFAULT 0.00 CHECK (annual_revenue >= 0),
    status VARCHAR(50) NOT NULL DEFAULT 'ativo' 
        CHECK (status IN ('ativo', 'negociacao', 'lead', 'inadimplente', 'cancelado')),
    account_manager VARCHAR(255) NOT NULL,
    last_interaction_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices B-Tree para buscas e filtros de alta frequência
CREATE INDEX idx_franchise_partners_region ON franchise_partners(region);
CREATE INDEX idx_franchise_partners_status ON franchise_partners(status);
CREATE INDEX idx_franchise_partners_company_search ON franchise_partners USING gin(to_tsvector('portuguese', company_name));

-- Ativação de Row Level Security (RLS)
ALTER TABLE franchise_partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to active partners"
    ON franchise_partners FOR SELECT
    USING (true);
-- Nota de Arquitetura: Política pública adotada deliberadamente para visualização fluida nesta POC demonstrativa.
-- Em ambiente produtivo multitenant com autenticação, restringe-se com TO authenticated associado a tenant_id ou auth.uid().
```

---

## 🧪 Engenharia de Testes Automatizados (Vitest)

A aplicação segue a metodologia de **TDD / Feedback Rápido**, com uma suíte de **35 testes unitários** automatizados e 100% aprovados:

```bash
✓ src/lib/utils/kpi.test.ts (10 tests)
✓ src/lib/utils/query.test.ts (16 tests)
✓ src/lib/utils/formatters.test.ts (9 tests)

Test Files  3 passed (3)
     Tests  35 passed (35)
  Duration  ~260ms
```

### O que é coberto pela suíte:
1. **[`kpi.test.ts`](./src/lib/utils/kpi.test.ts):** Cálculos de faturamento consolidado (LTV da rede), totalizador dinâmico de unidades operacionais, cálculo de ticket médio por unidade e abreviação visual corporativa (`R$ 318 mi`, `R$ 45 mil`).
2. **[`formatters.test.ts`](./src/lib/utils/formatters.test.ts):** Formatação monetária em padrão BRL (`Intl.NumberFormat`), aplicação de máscara estrita de CNPJ (`##.###.###/####-##`) e formatação humanizada de datas no fuso horário corporativo (`pt-BR`).
3. **[`query.test.ts`](./src/lib/utils/query.test.ts):** Remoção de caracteres maliciosos, tratamento de filtros de região/status, cálculo de offsets de paginação e prevenção contra falhas de injeção em APIs PostgREST.

---
*Documento de referência arquitetural • Franchise Partner Hub*
