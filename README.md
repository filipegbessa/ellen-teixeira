# Ellen Teixeira - Odontologia

Landing page moderna e otimizada para o consultório odontológico da Dra. Ellen Teixeira, desenvolvida com Next.js 15, focando em performance, SEO e experiência do usuário.

## Sobre o Projeto

Site institucional responsivo com duas rotas distintas:

- `/` — Página link-in-bio (mobile-first, estilo Linktree) com WhatsApp, Instagram e endereço
- `/site` — Landing page completa com seções: Hero, Sobre, Tratamentos, Avaliações e Localização

**Funcionalidades principais:**

- Design moderno e responsivo
- PWA (Progressive Web App) — instalável no dispositivo
- Performance otimizada (AVIF, WebP, lazy loading)
- SEO completo com structured data (Schema.org)
- Analytics integrado (GA4 + Vercel)
- Integração direta com WhatsApp
- Localização com Google Maps embed
- Avaliações em tempo real via API backend (ellen-api)

## Stack Tecnológico

### Core
- **[Next.js 15](https://nextjs.org/)** — Framework React com App Router
- **[TypeScript](https://www.typescriptlang.org/)** — Tipagem estática
- **[React 18](https://react.dev/)** — Biblioteca para interfaces de usuário

### Estilização
- **[Tailwind CSS](https://tailwindcss.com/)** — Framework CSS utilitário
- **[Star Flicks DS](https://www.npmjs.com/package/star-flicks-ds)** — Design system customizado (rota `/`)
- **Fraunces** — Tipografia principal (Google Fonts)

### Performance & PWA
- **[@ducanh2912/next-pwa](https://www.npmjs.com/package/@ducanh2912/next-pwa)** — Plugin PWA para Next.js
- **Image Optimization** — AVIF e WebP automático

### Analytics
- **[Vercel Analytics](https://vercel.com/analytics)** — Dados de tráfego
- **[Vercel Speed Insights](https://vercel.com/docs/speed-insights)** — Core Web Vitals
- **[Google Analytics 4](https://analytics.google.com/)** — Análise de audiência

### UI Components
- **[React Icons](https://react-icons.github.io/react-icons/)** — Biblioteca de ícones
- **[Swiper](https://swiperjs.com/)** — Carrossel responsivo (tratamentos e avaliações)

### HTTP Client
- **[Axios](https://axios-http.com/)** — Requisições para a API backend

### Dev Tools
- **[@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)** — Análise de bundle
- **[ESLint](https://eslint.org/)** — Linter para JavaScript/TypeScript
- **[Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/)** — Testes unitários

## Pré-requisitos

- Node.js 20.x ou superior
- npm

## Instalação

1. Clone o repositório:

```bash
git clone <repository-url>
cd ellen-teixeira
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

Edite o `.env` com suas configurações (veja seção [Variáveis de Ambiente](#variáveis-de-ambiente)).

## Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev           # Servidor de desenvolvimento (http://localhost:3000)
npm run dev:turbo     # Servidor com Turbopack (mais rápido, recomendado)

# Produção
npm run build         # Build otimizado para produção
npm start             # Servidor de produção

# Qualidade de código
npm run lint          # Executa ESLint
npm test              # Roda todos os testes
npm run test:watch    # Testes em modo watch

# Manutenção
npm run analyze       # Analisa o tamanho do bundle
npm run clean         # Limpa cache do Next.js (.next)
```

> **Dica**: Use `npm run dev:turbo` para desenvolvimento mais rápido com hot reload melhorado.

## Variáveis de Ambiente

| Variável | Descrição | Obrigatório |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL base do site em produção | Sim |
| `NEXT_PUBLIC_GA_ID` | ID do Google Analytics (ex: G-XXXXXXXX) | Não |
| `NEXT_PUBLIC_PLACE_ID` | Place ID do consultório no Google Maps | Não |
| `REVIEWS_API_URL` | URL da API backend (ellen-api) | Não* |

> *Se `REVIEWS_API_URL` não estiver configurado, a seção de avaliações exibe estado vazio.

## Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx           # Layout raiz: metadata, fonte Fraunces, analytics
│   ├── page.tsx             # Rota `/` — Link-in-bio (WhatsApp, Instagram)
│   ├── icon.svg             # Favicon (dente branco em fundo roxo)
│   ├── site/
│   │   └── page.tsx         # Rota `/site` — Landing page completa
│   ├── globals.css          # Estilos globais, Tailwind, Swiper, variáveis CSS
│   ├── manifest.ts          # Configuração PWA
│   ├── robots.ts            # Robots.txt dinâmico
│   └── sitemap.ts           # Sitemap dinâmico
│
├── components/
│   ├── GoogleAnalytics.tsx  # Integração GA4 (client-side)
│   ├── GoogleMapEmbed.tsx   # Google Maps com lazy loading
│   ├── Header.tsx           # Header fixo com nav desktop + menu mobile
│   ├── Footer.tsx           # Rodapé com copyright e CRO
│   ├── StructuredData.tsx   # Schema.org JSON-LD (Dentist)
│   ├── WhatsAppButton.tsx   # Botão com 3 variantes: icon, large, custom
│   └── sections/
│       ├── HeroSection.tsx        # Hero com headline e CTA
│       ├── AboutSection.tsx       # Bio, formação e anos de experiência
│       ├── TreatmentsSection.tsx  # Carrossel de tratamentos (Swiper)
│       ├── ReviewsSection.tsx     # Server Component — busca avaliações da API
│       ├── ReviewsCarousel.tsx    # Client Component — carrossel de avaliações
│       └── LocationSection.tsx    # Endereço, contato e mapa
│
├── config/
│   └── contact.ts           # Re-exporta businessInfo para componentes
│
├── data/
│   ├── business.ts          # Fonte única de verdade: todos os dados do negócio
│   └── treatments.ts        # Lista de tratamentos oferecidos
│
├── lib/
│   └── api.ts               # API client (axios + unstable_cache) para ellen-api
│
├── styles/
│   └── colors.css           # Design tokens: variáveis CSS de cor
│
├── types/
│   ├── gtag.d.ts            # Tipagem global para window.gtag
│   └── review.ts            # Interface Review e ReviewsSummary
│
└── utils/
    ├── analytics.ts         # Funções de tracking de eventos GA4
    └── Helper.ts            # Helpers: getWhatsAppUrl, getTreatments
```

## Arquitetura de Dados

### Fonte de verdade — `src/data/business.ts`
Único arquivo a editar para atualizar informações do negócio: dados da profissional, qualificações, especialidades, contato, endereço e horários.

`experienceYears` é **calculado automaticamente** a partir do `periodEnd` da qualificação marcada com `isMain: true`.

### Avaliações — ellen-api
As avaliações dos pacientes são buscadas da API backend (NestJS + PostgreSQL), que sincroniza periodicamente com o Google Places. O frontend usa `unstable_cache` com revalidação a cada 1 hora.

## Deploy

O projeto está hospedado na **Vercel**: [ellen-teixeira.vercel.app](https://ellen-teixeira.vercel.app)

Para um novo deploy:
1. Conecte o repositório na Vercel
2. Configure as variáveis de ambiente no painel
3. O deploy é automático a cada push na branch `main`

## Troubleshooting

Se o **hot reload não estiver funcionando**:

```bash
npm run clean
npm run dev:turbo
```

> O PWA cria service workers com cache agressivo. Em desenvolvimento, mantenha o cache desabilitado no DevTools (Network → Disable cache).

## Licença

© 2026 Dra. Ellen Teixeira. Todos os direitos reservados.

---

<div align="center">

**[Site](https://ellen-teixeira.vercel.app)** • **[Instagram](https://instagram.com/draellenteixeira)** • **[WhatsApp](https://wa.me/5521974924374)**

</div>
