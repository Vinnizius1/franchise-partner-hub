# Tech Stack - Franchise Partner Hub

Este documento registra as versões exatas e validadas utilizadas no projeto, garantindo reprodutibilidade e prevenindo alucinações de versão por assistentes de IA (Context Dilution).

## Core

- **Next.js**: 16.3.5 (App Router & Turbopack)
- **React**: 19.2.8 (React 19 Server Components)
- **TypeScript**: 5.x (strict: true)

## Estilização & UI

- **Tailwind CSS**: 4.x (@tailwindcss/postcss)
- **Componentes**: shadcn/ui & Tailwind Primitives (Dark Mode B2B)
- **Ícones**: Lucide React (^1.47.0)

## Banco de Dados & Backend

- **Database**: Supabase (PostgreSQL 15+ com Row-Level Security)
- **Client JS**: @supabase/supabase-js ^2.117.0
- **SSR Client**: @supabase/ssr ^0.12.7

## Gerenciamento de Estado & Validação

- **URL State**: Nativo Next.js (`useSearchParams`, `usePathname`, `useRouter`, `useTransition`) + `use-debounce` (^10.1.1). *(Nota arquitetural: `nuqs` é a recomendação de mercado para cenários com múltiplos formulários de busca complexos).*
- **Validação de Tipos**: TypeScript Strict Contracts (`src/types/partner.types.ts`).
- **Validação em Runtime**: `zod` (^4.x - Runtime Boundary Validation para URL Search Params com defesa resiliente e schemas para Server Actions).

## Testes & Qualidade

- **Test Runner**: Vitest ^5.0.2 (46 testes unitários e de integração de lógica)
