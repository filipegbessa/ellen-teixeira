---
🎨 1. UX/UI & Design

[FEITO] 1.1 Imagens Faltantes (Crítico)

Localização: Múltiplos componentes

Problema:
- HeroSection.tsx:51-59: Placeholder genérico para imagem da equipe
- AboutSection.tsx:36-38: Div com bg-placeholder (vermelho) sem imagem da Dra. Ellen
- src/app/page.tsx:16: Header image existe (/images/header.webp)

Impacto: Design incompleto afeta credibilidade e profissionalismo do site

Sugestão:
// Criar componente de placeholder mais profissional
<div className="relative w-full h-96 bg-gradient-to-br from-primary-light to-secondary-light rounded-lg overflow-hidden">
  <div className="absolute inset-0 flex items-center justify-center">
    <FaUser className="text-6xl text-primary opacity-20" />
  </div>
</div>

[FEITO] 1.2 Placeholder Vermelho Agressivo
Localização: AboutSection.tsx:36
Problema: bg-placeholder usa vermelho forte que quebra a harmonia visual
Sugestão: Substituir por gradiente ou cor neutra enquanto imagem não é adicionada

---

2. Acessibilidade (WCAG 2.1)

[FEITO] 2.1 Falta de lang em elementos específicos
Localização: Múltiplos componentes
Problema: Apesar do HTML ter lang="pt-BR", não há elementos para conteúdo em inglês
Exemplo:
// AboutSection.tsx - Siglas em inglês

<div lang="en">CRO</div>

2.2 Contraste de Cores
Localização: HeroSection.tsx:24 e outros
Problema: Texto text-secondary em fundo from-primary-light to-secondary-light pode ter baixo contraste
Verificar: Use ferramenta como https://webaim.org/resources/contrastchecker/

[FEITO] 2.3 Navegação por Teclado no Swiper
Localização: TreatmentsSection.tsx:53-104
Problema: Botões customizados podem não ter foco visível
Sugestão:
button:focus-visible {
outline: 2px solid rgb(var(--color-primary));
outline-offset: 2px;
}

[FEITO] 2.4 Falta de Skip Links
Problema: Usuários de teclnão conseguem pular navegação
Sugestão: Adicionar no início do layout:
<a href="#main-content" className="sr-only focus:not-sr-only">
Pular para conteúdo principal
</a>

[FEITO] 2.5 Títulos de Seção sem Hierarquia Clara
Localização: Múltiplos componentes
Problema: Pode confundir leitores de tela
Recomendação:

- H1: Apenas no HeroSection
- H2: Títulos de seção (Sobre, Tratamentos, etc.)
- H3: Subtítulos dentro de seções

---

🚀 3. Performance

[FEITO] 3.1 Fonte Fraunces Carregando Muitos Pesos
Localização: layout.tsx:9-14
Problema: Carregando 8 pesos diferentes (100-900)
Análise: Verificar quais pesos são realmente usados

# Buscar por font-weight no projeto

grep -r "font-\(thin\|light\|normal\|medium\|semibold\|bold\|extrabold\|black\)" src/
ado
Sugestão: Carregar apenas 300 (light), 400 (normal), 600 (semibold), 700 (bold)

[FEITO] 3.2 Google Maps Iframe sem Lazy Loading Estratégico
Localização: LocationSection.tsx:19-28
Problema: iframe tem loading="lazy" mas está dentro de seção que pode aparecer acima da dobra em mobile
Sugestão: Adicionar facade (thumbnail clicável) que carrega iframe apenas quando usuário interage

3.3 Imagens dos Tratamentos Faltantes
Localização: src/data/treatments.ts:6,12,18,24,30
Problema: Referencia imagens que não existem (/images/treatments/1-5.jpg)
Impacto: Causará 404s e prejudicará performance (Lighthouse)
Sugestão:

1. Adicionar imagens otimizadas (WebP/AVIF)
2. Ou usar placeholders com gradientes temáticos

[FEITO] 3.4 Falta de Otimização de Imagens
Problema: Não há evidência de uso do componente next/image em todos os lugares
Verificar:

- Imagens estáticas devem usar next/image
- Definir priority para imagens above-the-fold

[FEITO] 3.5 Bundle Size do Swiper
Localização: TreatmentsSection.tsx:4-5
Análise: Importando módulos específicos (bom!), mas pode ser otimizado
Sugestão: Avaliar se vale a pena trocar por solução mais leve (Embla Carousel, Keen Slider)

---

🔍 4. SEO

[FEITO] 4.1 Imagem OG Faltando
Localização: layout.tsx:57,69
Problema: /images/og-image.png não existe
Impacto: Compartilhamentos em redes sociais não terão preview
Sugestão: Criar imagem 1200x630px com:

- Foto da Dra. Ellen
- Nome + CRO
- Logo/branding
- Cores do site

  4.2 Falta de Canonical URLs
  Problema: Não há tags canonical definidas
  Sugestão:
  // layout.tsx metadata
  alternates: {
  canonical: '/',
  }

  4.3 Página /site sem Metadata Específico
  Localização: src/app/site/page.tsx
  Problema: Usa metadata padrão do layout
  Sugestão: Exportar metadata customizado:
  export const metadata = {
  title: 'Clínica - Dra. Ellen Teixeira',
  description: '...'
  }

  4.4 Falta de FAQ Schema
  Oportunidade: Adicionar FAQ structured data para rich snippets
  Exemplo:
  {
  "@type": "FAQPage",
  "mainEntity": [{
  "@type": "Question",
  "name": "Quais tratamentos são oferecidos?",
  "acceptedAnswer": {
  "@type": "Answer",
  "text": "..."
  }
  }]
  }

  4.5 Sitemap Poderia Incluir Prioridades
  Localização: src/app/sitemap.ts
  Sugestão:
  {
  url: 'https://...',
  lastModified: new Date(),
  changeFrequency: 'monthly',
  priority: 1.0, // Home
  }

[FEITO] 4.6 Imagem da Dra. Ellen no Schema
Localização: StructuredData.tsx:12
Problema: Referencia /images/dra-ellen.jpg que não existe
Impacto: Schema.org incompleto

---

🔐 5. Segurança & Boas Práticas

5.1 Headers de Segurança Faltando
Localização: Configuração do Next.js
Sugestão: Adicionar em next.config.ts:
headers: async () => [
{
source: '/:path\*',
headers: [
{
key: 'X-Frame-Options',
value: 'SAMEORIGIN',
},
{
key: 'X-Content-Type-Options',
value: 'nosniff',
},
{
key: 'Referrer-Policy',
value: 'strict-origin-when-cross-origin',
},
],
},
],

5.2 CSP (Content Security Policy)
Oportunidade: Implementar CSP para maior segurança
Desafio: Compatibilizar com Google Analytics e outros scripts

5.3 Rate Limiting no WhatsApp Link
Localização: Múltiplos componentes com link WhatsApp
Problema: Usuário pode disparar múltiplas janelas
Sugestão: Adicionar debounce ou cooldown

---

📱 6. PWA & Mobile

[FEITO] 6.1 Ícones PWA
Verificar: Se os ícones /icon-192x192.png e /icon-512x512.png existem
Localização: src/app/manifest.ts

6.2 Offline Fallback
Oportunidade: Criar página offline customizada
Sugestão:
// src/app/offline/page.tsx
export default function Offline() {
return (
<div className="min-h-screen flex items-center justify-center">
<div className="text-center">
<h1>Você está offline</h1>
<p>Verifique sua conexão com a internet</p>
</div>
</div>
)
}

[FEITO] 6.3 Menu Mobile UX
Localização: Header.tsx:99-114
Problemas:

- Menu abre sobre o header (position absolute)
- Não fecha ao clicar fora
- Não trava scroll do body quando aberto
  Sugestão: Implementar overlay com backdrop blur

---

🧪 7. Testing & Quality

7.1 Falta de Testes
Problema: Projeto não tem testes
Sugestão: Adicionar:

- Unit tests (componentes, utils)
- E2E tests (Playwright/Cypress) para fluxo crítico
- Visual regression tests (Chromatic/Percy)

  7.2 Falta de Storybook
  Oportunidade: Documentar componentes visualmente

  7.3 Falta de Validação de Tipos
  Problema: Dados em business.ts e treatments.ts não têm tipos
  Sugestão:
  // src/types/business.ts
  export interface ProfessionalInfo {
  name: string;
  title: string;
  cro: string;
  experienceYears: number;
  bio: string;
  }
  export interface BusinessInfo {
  professional: ProfessionalInfo;
  // ...
  }
  // business.ts
  export const businessInfo: BusinessInfo = {
  // TypeScript validará estrutura
  }

---

🎯 8. Code Quality & Manutenibilidade

8.1 Comentários de Loop no Swiper
Localização: TreatmentsSection.tsx:64
Problema: // loop={treatments.length > 4} comentado sem contexto
Sugestão: Documentar por que foi desabilitado ou remover

8.2 Magic Numbers
Localização: Múltiplos arquivos
Exemplos:

- TreatmentsSection.tsx:86: slidesPerView: 4
- AboutSection.tsx:13: md:grid-cols-[487px_1fr]
  Sugestão: Extrair para constantes nomeadas:
  const TREATMENTS_SLIDES_CONFIG = {
  mobile: 1,
  tablet: 2,
  desktop: 3,
  large: 4,
  } as const;

[FEITO] 8.3 Duplicação de Código
Localização: Links do WhatsApp repetidos em 3 lugares
Sugestão: Criar componente <WhatsAppButton />

8.4 Strings Hardcoded
Problema: Textos direto no JSX
Sugestão: Extrair para arquivo de i18n (mesmo que apenas pt-BR)
// src/locales/pt-BR.ts
export const messages = {
hero: {
title: 'Seu Sorriso Merece o Melhor Cuidado',
cta: 'WhatsApp',
},
// ...
}
Benefício: Facilita manutenção e futuras traduções

8.5 Inconsistência de Estilos
Problema: Alguns componentes usam classes inline, outros constantes
Exemplo:
// Inconsistente
className="text-4xl md:text-5xl font-bold text-primary mb-12"
// Melhor: extrair para objeto ou usar cva
const sectionTitleStyles = "text-4xl md:text-5xl font-bold text-primary mb-12"

---

📊 9. Analytics & Monitoring

[FEIOT] 9.1 Falta de Event Tracking
Problema: Google Analytics sem eventos customizados
Sugestão: Trackear:

- Cliques no WhatsApp (por origem)
- Cliques no Instagram
- Navegação por seções
- Interações no Swiper
  Exemplo:
  // utils/analytics.ts
  export const trackWhatsAppClick = (source: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
  window.gtag('event', 'whatsapp_click', {
  event_category: 'contact',
  event_label: source,
  });
  }
  };

  9.2 Falta de Error Boundary
  Problema: Erros não são capturados
  Sugestão: Implementar Error Boundary global
  // src/app/error.tsx
  'use client'

export default function Error({
error,
reset,
}: {
error: Error & { digest?: string }
reset: () => void
}) {
return (
<div>
<h2>Algo deu errado!</h2>
<button onClick={() => reset()}>Tentar novamente</button>
</div>
)
}

9.3 Falta de Logging/Monitoring

Sugestão: Integrar Sentry ou similar

---

🌐 10. DevEx & CI/CD

10.1 Falta de Husky/Lint-Staged
Problema: Não há validação pré-commit
Sugestão: Adicionar hooks:
npm install -D husky lint-staged
npx husky install
// package.json
"lint-staged": {
"_.{ts,tsx}": ["eslint --fix", "prettier --write"],
"_.{css,scss}": ["prettier --write"]
}

[FEITO] 10.2 Falta de Prettier
Problema: Formatação inconsistente
Análise: ESLint está configurado mas não Prettier
Sugestão: Adicionar:
npm install -D prettier eslint-config-prettier

10.3 Falta de GitHub Actions
Oportunidade: Automatizar build, lint, tests
Sugestão:

# .github/workflows/ci.yml

name: CI
on: [push, pull_request]
jobs:
build:
runs-on: ubuntu-latest
steps: - uses: actions/checkout@v3 - uses: actions/setup-node@v3 - run: npm ci - run: npm run lint - run: npm run build

10.4 Scripts NPM Faltando
Sugestão: Adicionar em package.json:
"scripts": {
"type-check": "tsc --noEmit",
"format": "prettier --write .",
"format:check": "prettier --check .",
"validate": "npm run type-check && npm run lint && npm run build"
}

---

🔄 11. Funcionalidades Adicionais
11.1 Loading States
Problema: Componentes não têm loading/skeleton
Sugestão: Usar loading.tsx do Next.js 15

11.2 Formulário de Contato
Oportunidade: Além do WhatsApp, ter form de contato
Benefícios:

- Usuários que não têm WhatsApp
- Lead capture mais robusto
- Integração com CRM

  11.3 Blog/Artigos
  Oportunidade: Seção de conteúdo para SEO
  Temas:

- Cuidados bucais
- Tratamentos explicados
- Depoimentos expandidos

  11.4 Agendamento Online
  Oportunidade: Integração com Calendly/Agendor

  11.5 Chat ao Vivo
  Oportunidade: Implementar chat (Tidio, Intercom)

---

📈 12. Melhorias Específicas por Componente

Header.tsx
12.1 Adicionar active state nos links de navegação
const isActive = (href: string) => {
// Implementar lógica de seção visível
}

12.2 Logo placeholder deveria ter width/height definidos

12.3 Transição do menu mobile pode ser suavizada com Framer Motion
HeroSection.tsx

12.4 Texto dinâmico poderia usar animação (typewriter effect)

12.5 CTA button muito grande (h-20) - considerar h-14/h-16
AboutSection.tsx

12.6 Grid com medidas específicas (487px) não é responsivo idealmente
Sugestão: Usar proporções ou minmax
grid-cols-[minmax(320px, 487px)_1fr]
TreatmentsSection.tsx

12.7 Cards dos tratamentos deveriam ter imagens

12.8 Hover state poderia ter animação mais rica (scale, shadow)

12.9 Botões de navegação poderiam ser maiores no mobile

LocationSection.tsx

12.10 Horário de funcionamento não está exibido visualmente

Sugestão: Adicionar na card:

<div className="flex items-center gap-3">
  <FaClock className="text-2xl" />
  <div>
    <p className="font-semibold">Horário de Atendimento</p>
    <p>{contactConfig.businessHours.days}</p>
    <p>{contactConfig.businessHours.time}</p>
  </div>
</div>

Footer.tsx

12.11 Footer muito simples - poderia incluir:

- Links de navegação
- Redes sociais
- Política de privacidade
- Termos de uso

---

🎨 13. Design System

13.1 Cores não Semânticas
Problema: bg-rose, bg-button-primary não estão no colors.css
Análise: Parecem vir do tailwind.config.ts
Sugestão: Centralizar todas as cores em um lugar

13.2 Espaçamento Inconsistente
Problema: Uso misto de classes (gap-3, gap-5, mb-4, mb-9)
Sugestão: Definir escala de espaçamento padrão

13.3 Border Radius Inconsistente
Problema: rounded-3xl, rounded-[20px], rounded-full
Sugestão: Padronizar escala
