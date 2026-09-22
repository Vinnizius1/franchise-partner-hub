# Architecture & Decisions

Este documento descreve as diretrizes arquiteturais e de engenharia adotadas na construção do **Franchise Partner Hub**.

## 1. Estratégia de Renderização (RSC vs SSG)

Para o painel B2B corporativo (com alta densidade de dados privados), adotamos **React Server Components (RSC) com Streaming (Suspense)** em detrimento de abordagens tradicionais como SSG (Static Site Generation).

### O Porquê:
- **Segurança de Dados Privados**: SSG faz o cache de dados no momento do build ou da revalidação. Para dados corporativos sensíveis (faturamento, status de contratos), não queremos páginas estáticas expostas ou em cache global. A busca deve ser feita per-request para quem tem acesso.
- **Performance Per-Request**: Usando RSC, a busca (Data Fetching) ocorre diretamente no servidor, perto do banco de dados (Supabase), eliminando cachoeiras de requisições (waterfalls) no client.
- **Streaming (LCP imediato)**: Envolvemos as tabelas de alta densidade em limites de <Suspense>. Isso permite que o layout do painel seja renderizado quase instantaneamente (Largest Contentful Paint baixo), enquanto a tabela pesada carrega em paralelo de forma assíncrona.

## 2. Padrão de Componentização (Default to Server)
- **Regra de Ouro**: Todo componente nasce como *Server Component*.
- **Transição para Client**: Só adicionamos a diretiva "use client" quando a interatividade (Hooks de React como useState, useEffect ou eventos de janela/mouse) obriga a execução no navegador. 
- *Exemplo*: A estrutura principal da tabela é renderizada no servidor. Apenas as "células" interativas (botão de favoritar, abrir modal de detalhes) são convertidas para Client Components em folhas (leaves) da árvore.

## 3. Estado na URL vs useState
Filtros, pesquisa e paginação NÃO utilizam estado global (Redux/Zustand) ou useState. 
Utilizamos a própria URL (Search Params) através da biblioteca `nuqs`.
### O Sim (Vantagens):
- O estado se torna compartilhável (links podem ser enviados para a equipe de gestão).
- Permite manter o componente que consome os dados como um Server Component.

## 4. Segurança e Validação
- **Row Level Security (RLS)**: Toda a lógica de quem pode ver qual parceiro corporativo reside no nível do banco de dados (Supabase RLS), blindando o frontend.
- **Server Actions Estritas**: Qualquer mutação (ex: atualizar status de franquia) usa Server Actions validadas estritamente com Zod antes de tocar no banco.

## 5. Pirâmide de Testes
- **Testes Unitários (Vitest)**: Para utilitários de formatação de dados e validações Zod.
- **Testes E2E (Playwright)**: Para validar fluxos críticos corporativos (ex: login, filtro de tabela).
