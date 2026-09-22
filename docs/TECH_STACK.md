# Tech Stack - Franchise Partner Hub

Este documento registra as versões exatas e validadas utilizadas no projeto, garantindo reprodutibilidade e prevenindo alucinações de versão por assistentes de IA (Context Dilution).

## Core

- **Next.js**: 16.3.5 (App Router)
- **React**: 19.3.0
- **TypeScript**: Estrito (strict: true)

## Estilização & UI

- **Tailwind CSS**: 4.3.3
- **Componentes**: shadcn/ui (Radix Primitives)
- **Ícones**: Lucide React

## Banco de Dados & Backend

- **Database**: Supabase (PostgreSQL)
- **Client JS**: @supabase/supabase-js v2.116.0

## Gerenciamento de Estado & Validação

- **URL State**: `nuqs` (para paginação e filtros via Search Params)
- **Validação**: zod (para validação de Server Actions e formulários)
