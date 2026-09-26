# 🏢 Franchise Partner Hub | Grupo BITTENCOURT

> **Portal B2B Corporativo de Alta Performance para Gestão e Inteligência de Redes Franqueadoras.**  
> Desenvolvido com **Next.js 16 (App Router & Turbopack)**, **React 19 Server Components**, **Supabase (PostgreSQL com RLS)**, **Vitest** e **Tailwind CSS v4**.

<p align="center">
  <img src="./docs/assets/dashboard-preview.png" alt="Franchise Partner Hub Dashboard Preview" width="100%" />
</p>

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
- 🏛️ **Arquitetura & Trade-offs:** [ARCHITECTURE.md](./ARCHITECTURE.md)
- ⚙️ **Engenharia & Matriz Tecnológica:** [ENGINEERING.md](./ENGINEERING.md)
- 🎯 **Objetivo:** Demonstração prática e arquitetural para o case do **Grupo BITTENCOURT**

---

## 🎯 1. Visão Executiva & Contexto de Negócio

O **Grupo BITTENCOURT** é o ecossistema líder no mercado brasileiro em consultoria estratégica, desenvolvimento, expansão e gestão de redes de franquias e negócios multicanais.

Em redes com dezenas a centenas de marcas parceiras (como Burger King, O Boticário, Localiza, Smart Fit, Arezzo, etc.), o volume de informações financeiras, contratuais e geográficas exige uma plataforma B2B centralizada, resiliente e segura.

### Dores Críticas Resolvidas por este Hub:
1. **Inteligência de Faturamento em Tempo Real:** Consolidação instantânea de LTV (Faturamento Anual Gerenciado) e contagem de unidades operacionais em nível nacional e regional.
2. **Navegação & Auditoria Sem Fricção:** Busca corporativa ultra-rápida por Razão Social/Nome Fantasia ou CNPJ formatado, com filtros multifatoriais (Regiões e Status de Contrato) e paginação no banco de dados.
3. **Segurança de Dados Granular:** Políticas de segurança declarativas aplicadas diretamente no banco de dados via **PostgreSQL Row-Level Security (RLS)**.
4. **Experiência de Carregamento Instantâneo:** Eliminação de telas brancas com *Streaming SSR* e *React Suspense*, garantindo métricas visíveis no primeiro instante de interação.
5. **Acessibilidade & Ergonomia Móvel:** Padrão responsivo híbrido (*Table-to-Card Pattern*) adaptado para a *Thumb Zone* no celular e plena conformidade com diretrizes **WAI-ARIA / WCAG 2.1**.

---

## 🏛️ 2. Documentação Técnica & Arquitetura

Para manter este `README` focado na visão executiva e de produto, os detalhes de engenharia e modelagem foram segregados em documentos especializados:

- 🏛️ [**ARCHITECTURE.md**](./ARCHITECTURE.md): Análise aprofundada dos trade-offs técnicos (RSC vs. SPA, Streaming Suspense, Estado na URL, Sanitização de Queries PostgREST) e Script DDL relacional do PostgreSQL com índices e políticas de RLS.
- ⚙️ [**ENGINEERING.md**](./ENGINEERING.md): Matriz de tecnologias corporativas LTS (Stack 2026), engenharia da suíte de 35 testes automatizados (Vitest) e módulos conceituais de engenharia.

---

## 🚀 3. Como Executar Localmente

### Pré-requisitos
- Node.js `22.x LTS` ou superior
- Git instalado
- Projeto no [Supabase](https://supabase.com) (ou Supabase CLI com Docker)

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

## 👨‍💼 4. Sobre o Autor & Contato

**Vinicius Matos de Mendonça**  
Desenvolvedor Full Stack com foco no ecossistema moderno de JavaScript/TypeScript, Next.js App Router e arquiteturas de dados escaláveis.

- **GitHub:** [github.com/Vinnizius1](https://github.com/Vinnizius1)
- **Live Demo:** [franchise-partner-hub.vercel.app](https://franchise-partner-hub.vercel.app)

---
*Projeto prático e documentação técnica desenvolvidos para o case do Grupo BITTENCOURT. Setembro de 2026.*
