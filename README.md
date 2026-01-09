# 🦷 Ellen Teixeira - Odontologia

Landing page moderna e otimizada para o consultório odontológico da Dra. Ellen Teixeira, desenvolvida com Next.js 15, focando em performance, SEO e experiência do usuário.

## 📖 Sobre o Projeto

Site institucional responsivo e profissional que apresenta os serviços odontológicos da Dra. Ellen Teixeira, especializada em estética dental, implantes e ortodontia.

**Funcionalidades principais:**
- ✨ Design moderno e responsivo
- 📱 PWA (Progressive Web App) - Instalável no dispositivo
- 🚀 Performance otimizada (AVIF, WebP, lazy loading)
- 🔍 SEO completo com structured data
- 📊 Analytics integrado (GA4 + Vercel)
- 💬 Integração direta com WhatsApp
- 📍 Localização com Google Maps
- 🎨 Design System customizado

## 🚀 Stack Tecnológico

### Core
- **[Next.js 15](https://nextjs.org/)** - Framework React com App Router e Turbopack
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática para maior segurança
- **[React 18](https://react.dev/)** - Biblioteca para interfaces de usuário

### Estilização
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utilitário
- **[Star Flicks DS](https://www.npmjs.com/package/star-flicks-ds)** - Design System customizado
- **[Poppins Font](https://fonts.google.com/specimen/Poppins)** - Tipografia (todos os pesos)

### Performance & PWA
- **[@ducanh2912/next-pwa](https://www.npmjs.com/package/@ducanh2912/next-pwa)** - Plugin PWA para Next.js
- **[Critters](https://www.npmjs.com/package/critters)** - Inlining crítico de CSS
- **Image Optimization** - AVIF e WebP automático

### Analytics
- **[Vercel Analytics](https://vercel.com/analytics)** - Dados de tráfego
- **[Vercel Speed Insights](https://vercel.com/docs/speed-insights)** - Core Web Vitals
- **[Google Analytics 4](https://analytics.google.com/)** - Análise de audiência

### UI Components
- **[React Icons](https://react-icons.github.io/react-icons/)** - Biblioteca de ícones
- **[Swiper](https://swiperjs.com/)** - Carrossel responsivo

### Dev Tools
- **[@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)** - Análise de bundle
- **[ESLint](https://eslint.org/)** - Linter para JavaScript/TypeScript

## 📋 Pré-requisitos

- Node.js 20.x ou superior
- npm ou yarn

## 🔧 Instalação

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

Edite o arquivo `.env` com suas configurações:
- `NEXT_PUBLIC_SITE_URL` - URL do site em produção
- `NEXT_PUBLIC_GA_ID` - ID do Google Analytics (opcional)

## 💻 Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev           # Servidor de desenvolvimento (http://localhost:3000)
npm run dev:turbo     # Servidor com Turbopack (mais rápido, recomendado)

# Produção
npm run build         # Build otimizado para produção
npm start             # Servidor de produção

# Qualidade de Código
npm run lint          # Executa ESLint

# Análise e Manutenção
npm run analyze       # Analisa o tamanho do bundle
npm run clean         # Limpa cache do Next.js (.next)
```

> 💡 **Dica**: Use `npm run dev:turbo` para desenvolvimento mais rápido com hot reload melhorado.

## 🔧 Troubleshooting

Se o **hot reload não estiver funcionando** após salvar alterações:

1. **Limpe o cache do navegador:**
   - DevTools (F12) → Application → Service Workers → Unregister
   - Application → Storage → Clear site data

2. **Reinicie o servidor:**
   ```bash
   npm run clean
   npm run dev:turbo
   ```

3. **Veja mais detalhes em:** [`DESENVOLVIMENTO.md`](./DESENVOLVIMENTO.md)

> ⚠️ **Nota**: O PWA cria service workers que fazem cache agressivo. Durante o desenvolvimento, sempre mantenha o cache desabilitado no DevTools (Network → Disable cache).

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx           # Layout raiz com metadata, fontes e analytics
│   ├── page.tsx             # Página principal (composição das seções)
│   ├── manifest.ts          # Configuração PWA
│   ├── robots.ts            # Configuração de robots.txt
│   ├── sitemap.ts           # Geração de sitemap
│   └── globals.css          # Estilos globais e variáveis CSS
│
├── components/
│   ├── Header.tsx           # Cabeçalho com logo e CTA
│   ├── Footer.tsx           # Rodapé com links sociais
│   ├── GoogleAnalytics.tsx  # Integração com GA4
│   ├── StructuredData.tsx   # Schema.org para SEO
│   │
│   └── sections/            # Seções da landing page
│       ├── HeroSection.tsx       # Banner principal
│       ├── AboutSection.tsx      # Sobre a dentista
│       ├── TreatmentsSection.tsx # Serviços oferecidos
│       ├── ReviewsSection.tsx    # Depoimentos
│       └── LocationSection.tsx   # Localização e contato
│
├── config/                  # Arquivos de configuração
├── data/                    # Dados estáticos (textos, depoimentos, etc)
└── utils/                   # Funções utilitárias
```

## 🎨 Design System

O projeto utiliza o **Star Flicks DS**, um design system customizado. As cores são configuradas através de CSS variables:

- `--background`: #575D4B (verde oliva)
- `--background-body`: #eeeeee (cinza claro)
- `rose`: #C0C2BA (botões)
- `button-primary`: #262721 (texto dos botões)

## 🌐 Deploy

O projeto está configurado para deploy na **Vercel**:

1. Conecte o repositório na Vercel
2. Configure as variáveis de ambiente no painel da Vercel
3. O deploy será automático a cada push na branch principal

### Vercel Analytics

As integrações com Vercel Analytics e Speed Insights são ativadas automaticamente quando o projeto é deployado na Vercel.

## 📱 PWA (Progressive Web App)

O site funciona como PWA, permitindo instalação no dispositivo do usuário:

- **Ícones**: 192x192 e 512x512 pixels
- **Modo**: Standalone (aparência de app nativo)
- **Tema**: #575D4B
- **Orientação**: Portrait

Os service workers são gerados automaticamente no build e desabilitados em desenvolvimento.

## 🔍 SEO

O projeto inclui otimizações completas de SEO:

- Meta tags OpenGraph e Twitter Cards
- Sitemap.xml gerado automaticamente
- Robots.txt configurado
- Structured data para mecanismos de busca
- Imagens otimizadas (AVIF e WebP)

## 📊 Analytics

Três soluções de analytics integradas:

1. **Google Analytics 4** - Análise detalhada de audiência
2. **Vercel Analytics** - Dados de tráfego e comportamento
3. **Vercel Speed Insights** - Métricas de performance (Core Web Vitals)

## 🔗 Integrações Externas

O site integra com:

- 💬 **WhatsApp Business** - Agendamento direto via chat
- 📸 **Instagram** - Perfil social (@draellenteixeira)
- 📍 **Google Maps** - Localização do consultório (R. Sete de Setembro, 98 - Sala 609, Centro, RJ)

## 🎯 Performance

O projeto é otimizado para máxima performance:

- ⚡ **Lighthouse Score**: 95+ em todas as métricas
- 🖼️ **Imagens**: AVIF/WebP com lazy loading
- 🎨 **CSS**: Critical CSS inlining via Critters
- 📦 **Bundle**: Code splitting automático
- 🔄 **Cache**: Service Worker com estratégias otimizadas
- 🚀 **Turbopack**: Build e HMR ultra-rápidos

## 📚 Documentação Adicional

- **[DESENVOLVIMENTO.md](./DESENVOLVIMENTO.md)** - Guia de desenvolvimento e troubleshooting
- **[CLAUDE.md](./CLAUDE.md)** - Instruções para Claude Code (AI assistant)

## 🤝 Contribuindo

Para contribuir com o projeto:

1. Leia o guia [`DESENVOLVIMENTO.md`](./DESENVOLVIMENTO.md)
2. Crie uma branch para sua feature: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -m 'feat: adiciona nova funcionalidade'`
4. Push para a branch: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

## 📝 Licença

© 2025 Dra. Ellen Teixeira. Todos os direitos reservados.

---

<div align="center">

Desenvolvido com ❤️ usando [Next.js](https://nextjs.org)

**[Site](https://ellenteixeira.com.br)** • **[Instagram](https://instagram.com/draellenteixeira)** • **[WhatsApp](https://wa.me/5521981035557)**

</div>
