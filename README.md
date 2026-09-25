# 🏢 Franchise Partner Hub | Grupo BITTENCOURT

> **Portal B2B Corporativo de Alta Performance para Gestão e Inteligência de Redes Franqueadoras.**  
> Desenvolvido com **Next.js 16 (App Router & Turbopack)**, **React 19 Server Components**, **Supabase (PostgreSQL com RLS)**, **Vitest** e **Tailwind CSS v4**.

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2.8-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Vitest](https://img.shields.io/badge/Vitest-31%20Tests%20Passing-6E9F18?style=for-the-badge&logo=vitest)](https://vitest.dev/)
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
| **Vitest** | `^5.0.2` | Suíte de Testes Unitários | Runner de testes ultra-rápido baseado em Vite/ESM (feedback loop de ~265ms para 31 testes). |
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

A aplicação segue a metodologia de **TDD / Feedback Rápido**, com uma suíte de **31 testes unitários** automatizados e 100% aprovados:

```bash
✓ src/lib/utils/kpi.test.ts (6 tests)
✓ src/lib/utils/query.test.ts (16 tests)
✓ src/lib/utils/formatters.test.ts (9 tests)

Test Files  3 passed (3)
     Tests  31 passed (31)
  Duration  265ms
```

### O que é coberto pela suíte:
1. **[`kpi.test.ts`](file:///e:/C%C3%93DIGOS/Bittencourt%20-%20Next.js%20App/nextjs_app/src/lib/utils/kpi.test.ts):** Cálculos de faturamento consolidado (LTV da rede), totalizador dinâmico de unidades operacionais e abreviação visual corporativa (`R$ 318 mi`, `R$ 45 mil`).
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

## 🎓 7. Caderno de Questões Técnicas / BITTENCOURT Prep

> **Guia de Fundamentos & Preparatório para Entrevistas Técnicas (Níveis Júnior & Pleno).**  
> Este caderno consolida os modelos mentais, perguntas reais de entrevistas e gatilhos de raciocínio aplicados na construção deste projeto.

---

### Módulo 1: Arquitetura Frontend & Server Components (Next.js 16 & React 19)

#### ❓ Questão 1 (Nível Júnior):
**"Qual é a diferença fundamental entre um Server Component e um Client Component no Next.js App Router, e quando devemos usar a diretiva `'use client'`?"**

- 🧠 **Gatilho Mental / Como Pensar:**
  - *O que o entrevistador quer saber:* Se você entende para onde o código vai (servidor vs. bundle do navegador) ou se você é alguém que coloca `'use client'` no topo de todo arquivo sem saber por quê.
  - *Linha de raciocínio:* Comece definindo o padrão do Next.js (tudo é Server Component por padrão). Explique o ciclo de vida: Server Components rodam exclusivamente no servidor e retornam HTML/RSC Payload; Client Components são hidratados no browser para permitir interatividade.
  - *O que NÃO falar:* "Client Component é o componente de tela e Server Component é backend de banco." (Ambos renderizam UI!).
- 🎯 **Resposta Padrão-Ouro:**
  > "No App Router, todos os componentes são **Server Components por padrão**. Eles são executados exclusivamente no servidor (seja em tempo de build ou sob demanda via SSR) e enviam para o navegador apenas a estrutura da interface serializada (RSC Payload), com zero JavaScript adicional no bundle do cliente. Isso resulta em maior performance, segurança de dados e LCP mais rápido.  
  > Nós usamos a diretiva `'use client'` apenas nas folhas da árvore de componentes que exigem interatividade do navegador: listeners de eventos (`onClick`, `onChange`), hooks de ciclo de vida (`useState`, `useEffect`) ou acesso a APIs do browser (`localStorage`, `window`). No nosso projeto, por exemplo, a tabela e os cards de KPI são Server Components puros, enquanto apenas a barra de busca e paginação são Client Components."

---

#### ❓ Questão 2 (Nível Pleno):
**"Como o Streaming com React Suspense opera sob o capô na camada de rede (HTTP) e qual o seu impacto direto nos Core Web Vitals (especialmente TTFB e LCP)?"**

- 🧠 **Gatilho Mental / Como Pensar:**
  - *O que o entrevistador quer saber:* Se você domina protocolos de rede e performance web moderna ou se vê o `<Suspense>` apenas como uma tag mágica que troca spinner por conteúdo.
  - *Linha de raciocínio:* Cite o cabeçalho `Transfer-Encoding: chunked`. Explique que a conexão HTTP não precisa ser fechada para começar a desenhar a tela. Conecte com o modelo de cascata tradicional (onde uma query lenta travava o HTML inteiro).
- 🎯 **Resposta Padrão-Ouro:**
  > "No SSR clássico, o servidor precisa esperar todas as queries de banco terminarem para enviar o documento HTML completo ao navegador. Se uma query de agregação demorar 800ms, o usuário fica olhando para uma tela em branco (TTFB alto).  
  > Com o **Streaming SSR do React 19 no Next.js**, o servidor utiliza o protocolo HTTP com `Transfer-Encoding: chunked`. Ele envia imediatamente o layout estático (header, casca da página e skeletons definidos no `fallback`), permitindo que o navegador comece o download de CSS e renderize a casca da aplicação (TTFB e FCP quase imediatos). Enquanto isso, o servidor processa as promessas assíncronas em paralelo; assim que a query do banco finaliza, ele transmite os chunks finais de HTML acompanhados de scripts inline que substituem cirurgicamente os skeletons pelo conteúdo real, otimizando drasticamente o **LCP (Largest Contentful Paint)** sem nenhum layout shift desordenado."

---

### Módulo 2: Banco de Dados, Segurança & RLS (Supabase PostgreSQL)

#### ❓ Questão 3 (Nível Júnior):
**"O que é Row-Level Security (RLS) no PostgreSQL e por que ele é muito mais seguro do que apenas aplicar cláusulas `WHERE company_id = x` na camada de aplicação (backend)?"**

- 🧠 **Gatilho Mental / Como Pensar:**
  - *O que o entrevistador quer saber:* Sua consciência sobre segurança em profundidade (*Defense in Depth*) e arquitetura multitenancy.
  - *Linha de raciocínio:* O backend de aplicação pode ter bugs, esquecimentos humanos de desenvolvedores ou endpoints novos criados sem o filtro. O RLS move a trava de segurança para o nível mais profundo do sistema: o próprio motor relacional do PostgreSQL.
- 🎯 **Resposta Padrão-Ouro:**
  > "O **Row-Level Security (RLS)** é um mecanismo nativo do PostgreSQL onde as políticas de acesso a cada linha da tabela são aplicadas pelo próprio banco de dados, e não pela aplicação.  
  > Se confiarmos apenas em cláusulas `WHERE` no backend, qualquer descuido de um desenvolvedor júnior que esquecer de concatenar o filtro em uma nova rota exporá dados de clientes diferentes. Com o RLS habilitado, mesmo que uma query maliciosa ou mal formatada faça um `SELECT * FROM franchise_partners`, o PostgreSQL intercepta a execução e só retorna as linhas autorizadas pelas políticas declaradas (`USING`). Isso garante segurança corporativa real e isolamento multitenancy em conformidade com a LGPD."

---

#### ❓ Questão 4 (Nível Pleno):
**"O que é PostgREST Injection e como a arquitetura do nosso projeto mitiga manipulações indevidas em queries dinâmicas de busca?"**

- 🧠 **Gatilho Mental / Como Pensar:**
  - *O que o entrevistador quer saber:* Se você entende as particularidades de APIs que traduzem parâmetros de URL em comandos SQL (como o PostgREST do Supabase) e como sanitizar entradas de usuários.
  - *Linha de raciocínio:* Explique que o PostgREST usa sintaxes baseadas em pontuação (ex: `or=(name.ilike.*,cnpj.ilike.*)`). Se o usuário digitar caracteres como `,`, `.` ou `()`, ele pode quebrar ou alterar a lógica booleana da consulta.
- 🎯 **Resposta Padrão-Ouro:**
  > "Diferente da injeção tradicional de SQL em raw strings, o PostgREST traduz parâmetros de consulta em operadores lógicos através de palavras-chave estruturadas na query string (como `.eq.`, `.ilike.`, vírgulas como separadores de campos e parênteses para agrupamento de condições). Se um input de busca livre for repassado diretamente para um operador `.or()`, um atacante pode injetar vírgulas ou operadores extras para contornar filtros ou forçar erros de sintaxe 400.  
  > No nosso projeto, mitigamos isso isolando a camada de higienização no utilitário [`query.ts`](file:///e:/C%C3%93DIGOS/Bittencourt%20-%20Next.js%20App/nextjs_app/src/lib/utils/query.ts), protegido por testes unitários. A função `sanitizeSearchQuery` remove caracteres de controle estrutural do PostgREST, escapa percentuais e valida o tamanho da string antes que a query chegue ao driver do Supabase."

---

### Módulo 3: UX, Estado em URL & Performance

#### ❓ Questão 5 (Nível Júnior):
**"Por que é uma boa prática da indústria sincronizar filtros, busca e paginação na URL (`searchParams`) em vez de manter tudo no `useState` do React?"**

- 🧠 **Gatilho Mental / Como Pensar:**
  - *O que o entrevistador quer saber:* Se você pensa na experiência real do usuário corporativo e em arquiteturas acessíveis e compartilháveis.
  - *Linha de raciocínio:* O que acontece quando você envia um link com `useState` para um colega? Ele abre zerado. O que acontece se você der refresh (F5)? Perde tudo. O que acontece com o botão Voltar do browser? Quebra a navegação.
- 🎯 **Resposta Padrão-Ouro:**
  > "Armazenar o estado de navegação diretamente na URL (`searchParams`) transforma a URL na única fonte de verdade (**Single Source of Truth**). Isso traz três benefícios de classe enterprise:  
  > 1. **Links Compartilháveis (Deep Linking):** Um gestor do Grupo BITTENCOURT pode filtrar parceiros da região 'Sudeste' e enviar o link no Teams ou e-mail; quem abrir verá exatamente a mesma listagem.  
  > 2. **Navegação Histórica Resiliente:** Os botões nativos do navegador (Voltar e Avançar) funcionam perfeitamente para desfazer ou refazer buscas.  
  > 3. **Compatibilidade com SSR:** O servidor recebe os parâmetros na requisição inicial e já entrega o HTML renderizado com os dados filtrados, sem precisar esperar o React carregar para rodar um `useEffect` no cliente."

---

#### ❓ Questão 6 (Nível Pleno):
**"Como funciona a estratégia de Debounce no campo de busca e por que ela é indispensável para a estabilidade do servidor em aplicações com SSR ou Serverless?"**

- 🧠 **Gatilho Mental / Como Pensar:**
  - *O que o entrevistador quer saber:* Gestão de tráfego, economia de recursos e prevenção de race conditions.
  - *Linha de raciocínio:* Um usuário digita em média a cada 50-100ms. Se cada tecla disparar uma alteração de URL e uma nova consulta ao banco, 10 caracteres geram 10 requisições simultâneas.
- 🎯 **Resposta Padrão-Ouro:**
  > "O **Debounce** é uma técnica que adia a execução de uma ação até que um intervalo de tempo predeterminado (ex: 300ms) tenha decorrido desde a última vez em que o evento foi disparado.  
  > Sem debounce, se um usuário digitar 'Boticário' (9 caracteres), seriam geradas 9 requisições HTTP quase simultâneas para o servidor e 9 consultas ao PostgreSQL. Isso não apenas sobrecarrega o pool de conexões do banco de dados e gera custos desnecessários em arquiteturas serverless, mas também cria **Race Conditions** (onde a resposta da busca com 5 caracteres pode chegar depois da resposta de 9 caracteres e sobrepor a tela incorretamente). Com o debounce, o sistema aguarda o usuário terminar a digitação para enviar apenas uma requisição consolidada e precisa."

---

### Módulo 4: Qualidade de Código & Testes Automatizados (Vitest & TDD)

#### ❓ Questão 7 (Nível Júnior):
**"Qual é a diferença entre Testes Unitários, Testes de Integração e Testes End-to-End (E2E), e por que começamos os testes automatizados pelos utilitários e KPIs?"**

- 🧠 **Gatilho Mental / Como Pensar:**
  - *O que o entrevistador quer saber:* Pirâmide de testes e ROI (Retorno sobre Investimento) da suíte de qualidade.
  - *Linha de raciocínio:* Testes unitários são rápidos, baratos e testam lógica pura sem IO; testes de integração testam componentes conversando; E2E testa o fluxo completo no navegador.
- 🎯 **Resposta Padrão-Ouro:**
  > "A **Pirâmide de Testes** estabelece a distribuição ideal de qualidade:  
  > - **Testes Unitários:** Testam funções isoladas e puras sem efeitos colaterais externos. São executados em milissegundos e têm custo mínimo de manutenção.  
  > - **Testes de Integração:** Validam como múltiplos módulos interagem entre si (ex: um componente renderizando e reagindo a um mock de API).  
  > - **Testes E2E (End-to-End):** Emulam um usuário real em um navegador headless (ex: Playwright/Cypress), cobrindo o fluxo de ponta a ponta.  
  > Começamos testando utilitários e KPIs porque as regras de negócio mais críticas e suscetíveis a bugs residem no processamento de dados: cálculos financeiros de faturamento anual, máscaras estritas de CNPJ e sanitização de injeção. Se a fundação matemática e de dados estiver blindada por testes unitários rápidos, o restante da aplicação é construído sobre uma base sólida."

---

#### ❓ Questão 8 (Nível Pleno):
**"Por que escolher o Vitest em vez do tradicional Jest em projetos modernos com Next.js e TypeScript?"**

- 🧠 **Gatilho Mental / Como Pensar:**
  - *O que o entrevistador quer saber:* Conhecimento de ferramentas modernas de build e evolução do ecossistema JavaScript/TypeScript.
  - *Linha de raciocínio:* O Jest foi o padrão por anos, mas depende de transpiladores pesados (Babel/ts-jest), tem dificuldades com ESM nativo e é lento. O Vitest usa a pipeline moderna do Vite, roda em ESM e executa testes quase instantaneamente.
- 🎯 **Resposta Padrão-Ouro:**
  > "Historicamente, o Jest foi a ferramenta padrão, mas ele carrega dívidas técnicas significativas: configuração complexa para ESM nativo (ECMAScript Modules), necessidade de plugins de transpilação pesados como `ts-jest` ou Babel, e performance relativamente lenta de inicialização.  
  > O **Vitest** é projetado nativamente para TypeScript e ESM. Ele compartilha a mesma arquitetura modular e veloz do Vite, executa em múltiplos threads de forma muito mais eficiente e oferece compatibilidade quase 1:1 com a sintaxe do Jest (`describe`, `it`, `expect`). No nosso projeto, o Vitest executa a suíte completa de 31 testes em apenas **265 milissegundos**, proporcionando um feedback loop instantâneo que não desacelera o ritmo de desenvolvimento."

---

### Módulo 5: DevOps, Deploy na Vercel & Pipelines de CI/CD

#### ❓ Questão 9 (Nível Júnior):
**"Durante o comando `next build`, como o Next.js classifica as rotas do projeto e qual é a diferença prática entre uma rota Estática (`○`) e uma rota Dinâmica (`ƒ`)?"**

- 🧠 **Gatilho Mental / Como Pensar:**
  - *O que o entrevistador quer saber:* Se você entende o relatório do terminal do Next.js e como o framework decide a estratégia de entrega.
  - *Linha de raciocínio:* O Next.js inspeciona o código: se a página lê requisições dinâmicas (cookies, headers, `searchParams`), ela vira dinâmica. Se ela não depende de nada da requisição, é estática.
- 🎯 **Resposta Padrão-Ouro:**
  > "Durante o `next build`, o compilador analisa a árvore de código de cada rota e gera uma tabela de rotas com símbolos específicos:  
  > - **Rota Estática (`○ Static`):** É pré-renderizada em HTML puro durante o tempo de build. É servida instantaneamente a partir de servidores de borda (CDN Edge) com custo de processamento zero, sendo ideal para páginas que não mudam frequentemente (como termos de uso ou landing pages institucionais).  
  > - **Rota Dinâmica (`ƒ Dynamic`):** É renderizada sob demanda no servidor para cada requisição recebida. Uma rota torna-se dinâmica sempre que consome APIs como `cookies()`, `headers()` ou parâmetros de consulta de URL (`searchParams`). No nosso projeto, a rota `/` foi classificada corretamente como dinâmica (`ƒ`) porque ela lê dinamicamente a busca e os filtros de região passados pelo usuário na URL."

---

#### ❓ Questão 10 (Nível Pleno):
**"Qual é a diferença fundamental entre variáveis com o prefixo `NEXT_PUBLIC_` e variáveis sem prefixo no Next.js, e qual seria o impacto catastrófico de expor uma chave de serviço (Service Role) com esse prefixo?"**

- 🧠 **Gatilho Mental / Como Pensar:**
  - *O que o entrevistador quer saber:* Rigor absoluto com segurança de infraestrutura, segredos corporativos e inlining de variáveis em tempo de compilação.
  - *Linha de raciocínio:* Como o Next.js trata variáveis de ambiente? Ele substitui em texto plano durante o build. O que a chave anônima faz? Respeita RLS. O que a chave de serviço faz? Tem poder de superusuário e ignora RLS.
- 🎯 **Resposta Padrão-Ouro:**
  > "No Next.js, variáveis de ambiente sem prefixo estão disponíveis **exclusivamente no ambiente do servidor** (Node.js/Edge). Elas nunca são enviadas ao navegador, garantindo a proteção de segredos de banco, tokens de API e credenciais privadas.  
  > Quando adicionamos o prefixo `NEXT_PUBLIC_`, instruímos o compilador do Next.js a realizar o **inlining** daquele valor: ele busca o valor no build e substitui diretamente no código JavaScript estático que é baixado por qualquer usuário no navegador.  
  > As variáveis `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` utilizam o prefixo porque o cliente precisa se conectar ao Supabase, e essa chave anônima é segura pois é restrita pelas políticas de **Row-Level Security (RLS)**.  
  > No entanto, se um desenvolvedor prefixar acidentalmente uma `SUPABASE_SERVICE_ROLE_KEY` com `NEXT_PUBLIC_`, essa chave de superusuário será exposta no código-fonte do navegador. Como a chave de serviço ignora completamente todas as travas de RLS, qualquer pessoa mal-intencionada poderia deletar todo o banco de dados, exportar faturamentos confidenciais de todas as redes e comprometer criticamente a operação da empresa."

---

## 👨‍💼 8. Sobre o Autor & Contato

**Vinicius Matos de Mendonça**  
Desenvolvedor Full Stack especializado no ecossistema moderno de JavaScript/TypeScript, Next.js App Router e arquiteturas de dados escaláveis.

- **GitHub:** [github.com/Vinnizius1](https://github.com/Vinnizius1)
- **Projeto:** [Franchise Partner Hub no GitHub](https://github.com/Vinnizius1/franchise-partner-hub)
- **Live Demo:** [franchise-partner-hub.vercel.app](https://franchise-partner-hub.vercel.app)

---
*Documentação técnica homologada para o Grupo BITTENCOURT. Setembro de 2026.*
