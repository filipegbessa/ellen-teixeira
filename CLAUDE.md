# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 site for Dra. Ellen Teixeira's dental practice (Odontologia). It has two distinct pages:

- `/` — Link-in-bio page (simpler, mobile-first, estilo Linktree) with WhatsApp and Instagram
- `/site` — Full landing page with sections (Hero, About, Treatments, Reviews, Location)

Built with TypeScript, React, and Tailwind CSS, featuring PWA support, analytics integration, and SEO optimization.

**Key Technologies:**

- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- star-flicks-ds (custom design system — usado principalmente na rota `/`)
- Swiper.js (carrosséis de tratamentos e avaliações)
- Axios (HTTP client para API backend)
- PWA support via @ducanh2912/next-pwa
- Vercel Analytics & Speed Insights
- Google Analytics (GA4)

## Testing

```bash
# Rodar todos os testes
npm test

# Modo watch (útil durante desenvolvimento)
npm run test:watch
```

**Setup:** Jest + React Testing Library + `next/jest`
- Configuração: `jest.config.js` + `jest.setup.ts`
- Alias `@/` configurado via `moduleNameMapper`

**Testes existentes:**
- `src/utils/__tests__/Helper.test.ts` — `getWhatsAppUrl()`: URL, número, encoding
- `src/app/__tests__/page.test.tsx` — links da rota `/` batem com `contactConfig`
- `src/components/__tests__/WhatsAppButton.test.tsx` — href e segurança das 3 variantes

## Development Commands

```bash
# Start development server
npm run dev

# Start development with Turbopack (faster, better HMR)
npm run dev:turbo

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Run tests
npm test

# Analyze bundle size
npm run analyze

# Clean Next.js cache
npm run clean
```

**Note:** If hot reload is not working properly, common issues include PWA service worker cache — clear the browser cache or use `npm run clean` before restarting the dev server.

## Architecture

### App Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout: metadata, Fraunces font, analytics
│   ├── page.tsx            # Rota `/` — Link-in-bio (WhatsApp, Instagram)
│   ├── icon.svg            # Favicon (dente branco em fundo roxo #452B9E)
│   ├── site/
│   │   └── page.tsx        # Rota `/site` — Full landing page
│   ├── globals.css         # Global styles: DS imports, Tailwind, Swiper, overrides
│   ├── manifest.ts         # PWA manifest
│   ├── robots.ts           # Robots.txt
│   └── sitemap.ts          # Sitemap
│
├── components/
│   ├── GoogleAnalytics.tsx # Client-side GA4 integration
│   ├── GoogleMapEmbed.tsx  # Google Maps com lazy loading (placeholder no mobile)
│   ├── Header.tsx          # Header fixo com nav desktop + menu mobile
│   ├── Footer.tsx          # Rodapé com copyright e CRO
│   ├── StructuredData.tsx  # Schema.org JSON-LD (Dentist)
│   ├── WhatsAppButton.tsx  # Botão reutilizável com 3 variantes: icon, large, custom
│   └── sections/
│       ├── HeroSection.tsx        # Hero com headline e CTA
│       ├── AboutSection.tsx       # Bio, formação e anos de experiência
│       ├── TreatmentsSection.tsx  # Carrossel de tratamentos (Swiper)
│       ├── ReviewsSection.tsx     # Server Component — busca avaliações da API
│       ├── ReviewsCarousel.tsx    # Client Component — carrossel Swiper de avaliações
│       └── LocationSection.tsx    # Endereço, contato e mapa
│
├── config/
│   └── contact.ts          # Re-exporta businessInfo para compatibilidade com componentes
│
├── data/
│   ├── business.ts         # Fonte única de verdade: dados da profissional, contato, endereço, etc.
│   └── treatments.ts       # Lista de tratamentos oferecidos
│
├── lib/
│   └── api.ts              # API client: axios + unstable_cache para consumir a ellen-api
│
├── styles/
│   └── colors.css          # Design tokens: todas as variáveis CSS de cor do projeto
│
├── types/
│   ├── gtag.d.ts           # Tipagem global para window.gtag
│   └── review.ts           # Interface Review e ReviewsSummary (contrato com a API)
│
└── utils/
    ├── analytics.ts        # Funções de tracking de eventos GA4
    └── Helper.ts           # Helpers: getWhatsAppUrl, getTreatments
```

### Fonte de Verdade dos Dados

**`src/data/business.ts`** é o único arquivo a editar para atualizar informações do negócio:
- Dados da profissional (nome, CRO, bio)
- `experienceYears` — calculado automaticamente a partir do `periodEnd` da qualificação com `isMain: true`
- Qualificações e especialidades
- Contato (telefone, WhatsApp, email, Instagram)
- Endereço e coordenadas
- Horário de funcionamento
- Estatísticas (rating médio, total de reviews)

`src/config/contact.ts` apenas re-exporta `businessInfo` para compatibilidade — não editar diretamente.

### Avaliações — Integração com API

As avaliações vêm da **ellen-api** (NestJS + PostgreSQL), que sincroniza com o Google Places API periodicamente.

- **`src/lib/api.ts`** — `getReviews()` e `getReviewsSummary()` com `unstable_cache` (revalida a cada 1h)
- Se `REVIEWS_API_URL` não estiver configurado ou a API estiver fora, retorna `[]` — a UI exibe estado vazio
- **`ReviewsSection.tsx`** — Server Component que busca os dados
- **`ReviewsCarousel.tsx`** — Client Component com o Swiper (recebe `reviews` como prop)

### Sistema de Cores

O projeto tem dois sistemas de cores:

1. **`src/styles/colors.css`** — tokens principais do site (`/site`):
   - Cor primária: roxo `#452B9E` (`--color-primary`)
   - Cor secundária: índigo `#6366F1` (`--color-secondary`)
   - Accent: verde esmeralda `#10B981` (`--color-accent`)
   - Superfícies, bordas, sombras, cores sociais

2. **`src/app/globals.css`** — variáveis legadas usadas na rota `/` (link-in-bio):
   - `--background`: #575D4B (olive green — fundo da página `/`)
   - `rose` e `button-primary`: cores dos botões da página `/`

### Tipografia

- **Fonte:** Fraunces (`next/font/google`)
- **Pesos carregados:** 300 (light), 600 (semibold), 700 (bold), 900 (black)
- **Variável CSS:** `--font-fraunces`
- **Fallback:** Georgia, serif
- Tailwind classes `font-sans` e `font-fraunces` ambas apontam para Fraunces

### Design System (star-flicks-ds)

Usado principalmente na rota `/` (link-in-bio):
- `SFTypography` para elementos de texto
- Tokens CSS importados via `globals.css`
- Paths incluídos no `tailwind.config.ts` para purging correto

### Next.js Configuration

**next.config.ts** inclui:

1. **PWA Plugin** (`withPWA`) — desabilitado em desenvolvimento
2. **Bundle Analyzer** — ativado com `ANALYZE=true`
3. **Image Optimization** — formatos AVIF e WebP
4. **Webpack** — polling de 1s para HMR em desenvolvimento

### Analytics Stack

1. **Google Analytics (GA4)** — `src/components/GoogleAnalytics.tsx`, lê `NEXT_PUBLIC_GA_ID`
2. **Vercel Analytics** — `<Analytics />` no root layout
3. **Vercel Speed Insights** — `<SpeedInsights />` no root layout

Eventos customizados em `src/utils/analytics.ts`:
- `trackWhatsAppClick(source)`
- `trackInstagramClick(source)`
- `trackSectionNavigation(sectionName)`
- `trackContactClick(type)`
- `trackMapInteraction(action)`
- `trackSectionView(sectionName)`

### SEO

- Metadata em `src/app/layout.tsx` com metadataBase via `NEXT_PUBLIC_SITE_URL`
- OpenGraph e Twitter card configurados
- Schema.org JSON-LD (tipo `Dentist`) em `src/components/StructuredData.tsx`
- `robots.ts` e `sitemap.ts` gerados dinamicamente

### PWA

- Manifest em `src/app/manifest.ts`
- Icons: 192x192 e 512x512 (maskable e any) em `public/images/`
- Favicon: `src/app/icon.svg` (detectado automaticamente pelo Next.js)
- Display: standalone, orientação portrait

## Environment Variables

| Variável | Descrição | Obrigatório |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL base do site | Sim |
| `NEXT_PUBLIC_GA_ID` | Google Analytics measurement ID | Não |
| `NEXT_PUBLIC_PLACE_ID` | Place ID do consultório no Google Maps | Não |
| `REVIEWS_API_URL` | URL da ellen-api (NestJS backend) | Não* |

> *Se não configurado, a seção de avaliações exibe estado vazio.

**Produção:** `https://draellenteixeira.com.br`
**API backend:** `https://ellen-api-dun.vercel.app`

## Status do Projeto

O projeto está **em desenvolvimento ativo**:
- CRO preenchido: `41617`
- Email de contato: placeholder — aguardando email real (`business.ts`)
- Imagem OG (`/images/og-image.png`): aguardando criação
- QR Code na seção de avaliações: não implementado
- Avaliações reais: dependem da indexação do novo endereço no Google Places

## Roadmap / Próximos Passos

- **`/site` → `/`**: A rota `/site` (full landing page) será migrada para a home (`/`). Quando ocorrer:
  - Substituir `src/app/page.tsx` pelo conteúdo de `src/app/site/page.tsx`
  - Adicionar `metadata` próprio à página
  - Atualizar `sitemap.ts`
  - A rota `/` atual (link-in-bio) pode ser descontinuada ou movida para outra rota

## Important Notes

- Linguagem: Português (pt-BR)
- Todos os links externos abrem em nova aba com `rel="noopener noreferrer"`
- `WhatsAppButton` tem 3 variantes: `icon` (header), `large` (hero), `custom` (página `/`)
- `GoogleMapEmbed` carrega automaticamente em desktop, mostra placeholder no mobile até o clique
- **Nunca usar prefixo `NEXT_PUBLIC_` para chaves de API sensíveis** — ficam expostas no bundle do browser
- `unstable_cache` do Next.js substitui o `next: { revalidate }` do fetch nativo quando usando axios
- Para limpar cache do `unstable_cache`: `npm run clean` e reiniciar o servidor
