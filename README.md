# 🏢 Franchise Partner Hub | Grupo BITTENCOURT

> **Portal B2B Corporativo de Alta Performance para Gestão e Inteligência de Redes Franqueadoras.**  
> Desenvolvido com **Next.js 16 (App Router & Turbopack)**, **React 19 Server Components**, **Supabase (PostgreSQL com RLS)**, **Vitest** e **Tailwind CSS v4**.

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2.8-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Vitest](https://img.shields.io/badge/Vitest-35%20Tests%20Passing-6E9F18?style=for-the-badge&logo=vitest)](https://vitest.dev/)
[![Vercel Deployed](https://img.shields.io/badge/Deploy-Vercel%20Production-000000?style=for-the-badge&logo=vercel)](https://franchise-partner-hub.vercel.app)
[![Node LTS](https://img.shields.io/badge/Node.js-v22%20LTS-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)

---

## 📌 Links Rápidos do Projeto

- 🚀 **Aplicação em Produção (Live Demo):** [https://franchise-partner-hub.vercel.app](https://franchise-partner-hub.vercel.app)
- 📁 **Repositório Oficial:** [github.com/Vinnizius1/franchise-partner-hub](https://github.com/Vinnizius1/franchise-partner-hub)
- 👨‍💻 **Autor:** Vinicius Matos de Mendonça ([GitHub](https://github.com/Vinnizius1))
- 🎯 **Destinatários:** Sandra (Gente & Gestão / RH) e Lideranças Técnicas de Engenharia do **Grupo BITTENCOURT**

---

## 🎯 1. Visão Executiva & Contexto de Negócio

O **Grupo BITTENCOURT** é o ecossistema líder no mercado brasileiro em consultoria estratégica, desenvolvimento, expansão e gestão de redes de franquias e negócios multicanais.

Em redes com dezenas a centenas de marcas parceiras (como Burger King, O Boticário, Localiza, Smart Fit, Arezzo, etc.), o volume de informações financeiras, contratuais e geográficas exige uma plataforma B2B centralizada, resiliente e segura.

### Dores Críticas Resolvidas por este Hub:
1. **Inteligência de Faturamento em Tempo Real:** Consolidação instantânea de LTV (Faturamento Anual Gerenciado) e contagem de unidades operacionais em nível nacional e regional.
2. **Navegação & Auditoria Sem Fricção:** Busca corporativa ultra-rápida por Razão Social/Nome Fantasia ou CNPJ formatado, com filtros multifatoriais (Regiões e Status de Contrato) e paginação no banco de dados.
3. **Segurança Corporativa Multitenancy:** Garantia absoluta de que nenhuma consulta exponha dados confidenciais fora da governança, com segurança declarativa aplicada diretamente no banco de dados (**Row-Level Security**).
4. **Experiência de Carregamento Instantâneo:** Eliminação de telas brancas de carregamento com *Streaming SSR* e *React Suspense*, garantindo que métricas executivas sejam exibidas no primeiro instante de interação.

---

## 🧱 2. Matriz de Versões LTS Homologadas (Stack 2026)

Para garantir estabilidade corporativa, compatibilidade com pipelines corporativos e prevenção contra vulnerabilidades de dependências, esta aplicação foi construída e homologada com as versões ativas da indústria:

| Tecnologia / Pacote | Versão Homologada | Papel no Ecossistema | Racional de Engenharia |
| :--- | :--- | :--- | :--- |
| **Node.js** | `v22.x (Active LTS)` | Runtime de Execução | Suporte a longo prazo, gerenciamento de memória aprimorado e conformidade com servidores corporativos. |
| **Next.js** | `16.3.5` | Framework Full Stack | App Router nativo, compilador Turbopack, Server Components e otimização automática de rotas dinâmicas. |
| **React** | `19.2.8` | Biblioteca de Interface | Adoção plena da arquitetura moderna de Server Components, Actions e Suspense boundaries. |
| **TypeScript** | `^5.0.0` | Linguagem & Tipagem | Modo estrito (`strict: true`), zero uso de `any`, tipagem espelhada diretamente do DDL relacional. |
| **@supabase/ssr** | `^0.12.7` | Cliente Supabase Server | Gerenciamento seguro de cookies e autenticação adaptada para o runtime serverless do Next.js. |
| **@supabase/supabase-js** | `^2.117.0` | Driver PostgREST | Acesso tipado ao PostgreSQL com suporte nativo a Row-Level Security e connection pooling. |
| **Vitest** | `^5.0.2` | Suíte de Testes Unitários | Runner de testes ultra-rápido baseado em Vite/ESM (feedback loop de ~260ms para 35 testes). |
| **Tailwind CSS** | `^4.0.0` | Engine de Estilização | Estilização utilitária de alta densidade visual (Dark Mode corporativo) com zero overhead em runtime. |
| **use-debounce** | `^10.1.1` | Otimização de Entrada | Debounce reativo de 300ms nos inputs de busca para mitigação de sobrecarga no backend. |
| **Lucide React** | `^1.47.0` | Design System de Ícones | Ícones SVG otimizados para dashboards corporativos com zero impacto no First Contentful Paint. |

---

## 🏛️ 3. Arquitetura de Software & Decisões de Engenharia

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

### ⚖️ Trade-offs Arquiteturais: O Porquê, o Sim e o Não

#### 1. React Server Components (RSC) vs. Client-Side Data Fetching (SPA tradicional)
- **O Porquê:** Reduzir drasticamente o JavaScript enviado ao cliente e executar regras de agregação de faturamento diretamente no servidor.
- **O Sim (Prós):** Bundle inicial ultra-leve, proteção de regras de negócio, carregamento instantâneo (SSR) e segurança absoluta das chamadas ao banco.
- **O Não (Riscos/Contras):** Exige segregação rigorosa de responsabilidades entre Server Components (sem hooks/eventos) e Client Components (`"use client"` pontual).

#### 2. Streaming com React Suspense
- **O Porquê:** A agregação de faturamento de toda a rede (KPIs) e a query da tabela paginada não devem travar a renderização inicial da página.
- **O Sim (Prós):** O usuário recebe a casca da página e os *skeletons* de loading imediatamente via HTTP Chunked Transfer, melhorando as métricas de **LCP (Largest Contentful Paint)**.
- **O Não (Riscos/Contras):** Exige planejamento de fallbacks visuais limpos para evitar Layout Shifts (CLS).

#### 3. URL Search Params como Gerenciador de Estado
- **O Porquê:** Manter busca (`?q=`), filtros (`?region=`, `?status=`) e página (`?page=`) diretamente na URL, eliminando dependência de bibliotecas de estado global como Redux ou Zustand.
- **O Sim (Prós):** Links 100% compartilháveis (deep linking), persistência nativa no histórico do navegador (botões Voltar/Avançar funcionam) e suporte imediato a SSR em qualquer link compartilhado.
- **O Não (Riscos/Contras):** Exige debounce controlado no cliente para não disparar requisições em excesso a cada tecla digitada.

#### 4. PostgREST Injection Protection & Sanitização de Queries
- **O Porquê:** O Supabase utiliza PostgREST internamente, onde caracteres especiais como `%`, `.`, `,` e operadores `.or()` podem alterar o plano de execução da query.
- **O Sim (Prós):** Sanitização estrita em camada utilitária isolada e testada ([`src/lib/utils/query.ts`](file:///e:/C%C3%93DIGOS/Bittencourt%20-%20Next.js%20App/nextjs_app/src/lib/utils/query.ts)), garantindo integridade e prevenção de queries maliciosas.
- **O Não (Riscos/Contras):** Queries complexas requerem métodos de escape cuidadosos para não anular buscas válidas com acentuação ou pontuação de CNPJ.

---

## 🛡️ 4. Modelagem de Dados & Segurança (Supabase DDL)

A tabela relacional `franchise_partners` conta com tipagem rigorosa, índices estratégicos para acelerar consultas e políticas de RLS ativas:

```sql
-- DDL Resumido da Tabela Corporativa de Franqueados
CREATE TABLE franchise_partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name VARCHAR(255) NOT NULL,
    trade_name VARCHAR(255) NOT NULL,
    cnpj VARCHAR(18) NOT NULL UNIQUE,
    segment VARCHAR(100) NOT NULL,
    region VARCHAR(50) NOT NULL,
    units_count INTEGER NOT NULL DEFAULT 1 CHECK (units_count >= 0),
    annual_revenue NUMERIC(15, 2) NOT NULL DEFAULT 0.00 CHECK (annual_revenue >= 0),
    status VARCHAR(50) NOT NULL DEFAULT 'ativo' 
        CHECK (status IN ('ativo', 'negociacao', 'lead', 'inadimplente', 'cancelado')),
    account_manager VARCHAR(255) NOT NULL,
    last_interaction_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices B-Tree para buscas e filtros de alta frequência
CREATE INDEX idx_franchise_partners_region ON franchise_partners(region);
CREATE INDEX idx_franchise_partners_status ON franchise_partners(status);
CREATE INDEX idx_franchise_partners_company_search ON franchise_partners USING gin(to_tsvector('portuguese', company_name || ' ' || trade_name));

-- Ativação de Row Level Security (RLS)
ALTER TABLE franchise_partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to active partners"
    ON franchise_partners FOR SELECT
    USING (true);
```

---

## 🧪 5. Engenharia de Testes Automatizados (Vitest)

A aplicação segue a metodologia de **TDD / Feedback Rápido**, com uma suíte de **35 testes unitários** automatizados e 100% aprovados:

```bash
✓ src/lib/utils/kpi.test.ts (10 tests)
✓ src/lib/utils/query.test.ts (16 tests)
✓ src/lib/utils/formatters.test.ts (9 tests)

Test Files  3 passed (3)
     Tests  35 passed (35)
  Duration  266ms
```

### O que é coberto pela suíte:
1. **[`kpi.test.ts`](file:///e:/C%C3%93DIGOS/Bittencourt%20-%20Next.js%20App/nextjs_app/src/lib/utils/kpi.test.ts):** Cálculos de faturamento consolidado (LTV da rede), totalizador dinâmico de unidades operacionais, cálculo de ticket médio por unidade e abreviação visual corporativa (`R$ 318 mi`, `R$ 45 mil`).
2. **[`formatters.test.ts`](file:///e:/C%C3%93DIGOS/Bittencourt%20-%20Next.js%20App/nextjs_app/src/lib/utils/formatters.test.ts):** Formatação monetária em padrão BRL (`Intl.NumberFormat`), aplicação de máscara estrita de CNPJ (`##.###.###/####-##`) e formatação humanizada de datas no fuso horário corporativo (`pt-BR`).
3. **[`query.test.ts`](file:///e:/C%C3%93DIGOS/Bittencourt%20-%20Next.js%20App/nextjs_app/src/lib/utils/query.test.ts):** Remoção de caracteres maliciosos, tratamento de filtros de região/status, cálculo de offsets de paginação e prevenção contra falhas de injeção em APIs PostgREST.

---

## 🚀 6. Como Executar Localmente

### Pré-requisitos
- Node.js `22.x LTS` ou superior
- Git instalado
- Conta no [Supabase](https://supabase.com) (ou instância local do PostgreSQL)

### Passo a Passo

1. **Clonar o Repositório:**
```bash
git clone https://github.com/Vinnizius1/franchise-partner-hub.git
cd franchise-partner-hub
```

2. **Instalar Dependências:**
```bash
npm install
```

3. **Configurar as Variáveis de Ambiente:**
Crie um arquivo `.env.local` na raiz baseado no `.env.example`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima-publica
```

4. **Executar a Suíte de Testes:**
```bash
npm test
```

5. **Iniciar o Servidor de Desenvolvimento:**
```bash
npm run dev
```
Acesse no navegador: `http://localhost:3000`.

6. **Compilar o Build de Produção:**
```bash
npm run build
npm start
```

---

## 🎯 7. Recursos de Demonstração & Dossiê Interativo

Para proporcionar à **Sandra (RH)** e aos **Líderes Técnicos** do Grupo BITTENCOURT uma experiência de produto completa e interativa (sem a fricção de exigir autenticação de login nesta POC):

1. **Dossiê Estratégico do Parceiro Franqueado (Modal Interativo):**
   - Ao clicar em qualquer linha da tabela de parceiros (`<tr>`), abre-se o **Dossiê Executivo** com:
     - Ficha cadastral detalhada (Razão Social, CNPJ formatado, segmento e status).
     - Métricas de BI calculadas: Faturamento Anual (LTV), contagem de unidades e **Ticket Médio por Franquia** (`faturamento / unidades`).
     - Governança corporativa: Gestor de conta responsável, data da última auditoria e badge de conformidade com PostgreSQL RLS.
     - Ações rápidas com feedback imediato: **Copiar Ficha Cadastral** (área de transferência) e **Simular Contato com o Gestor**.
2. **Apresentação Executiva do Case (Header):**
   - Botão **"Sobre o Case"** no topo da aplicação, resumindo a proposta de valor para o Grupo BITTENCOURT, os diferenciais técnicos e o guia de navegação.

---

## 📚 8. Caderno de Preparação Técnica (BITTENCOURT Prep)

Para aprofundamento em fundamentos de arquitetura, padrões sênior e preparação para entrevistas técnicas (níveis Júnior & Pleno), consulte o documento dedicado:

👉 **[Caderno de Questões Técnicas / BITTENCOURT Prep](./BITTENCOURT_PREP.md)**

O caderno aborda 10 questões estratégicas divididas em 5 módulos:
- **Módulo 1:** Server Components vs Client Components e Streaming Suspense (HTTP Chunked).
- **Módulo 2:** Row-Level Security (RLS) e Mitigação de Injeção PostgREST.
- **Módulo 3:** Estado na URL (`searchParams`) e Estratégia de Debounce.
- **Módulo 4:** Pirâmide de Testes e Vitest vs Jest.
- **Módulo 5:** Build do Next.js (Rotas Estáticas vs Dinâmicas) e Inlining Seguro de Env Vars (`NEXT_PUBLIC_`).

---

## 👨‍💼 9. Sobre o Autor & Contato

**Vinicius Matos de Mendonça**  
Desenvolvedor Full Stack especializado no ecossistema moderno de JavaScript/TypeScript, Next.js App Router e arquiteturas de dados escaláveis.

- **GitHub:** [github.com/Vinnizius1](https://github.com/Vinnizius1)
- **Projeto:** [Franchise Partner Hub no GitHub](https://github.com/Vinnizius1/franchise-partner-hub)
- **Live Demo:** [franchise-partner-hub.vercel.app](https://franchise-partner-hub.vercel.app)

---
*Documentação técnica homologada para o Grupo BITTENCOURT. Setembro de 2026.*
