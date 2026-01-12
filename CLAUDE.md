# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 landing page for Dra. Ellen Teixeira's dental practice (Odontologia). It's a single-page application built with TypeScript, React, and Tailwind CSS, featuring PWA support, analytics integration, and SEO optimization.

**Key Technologies:**

- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- star-flicks-ds (custom design system)
- PWA support via @ducanh2912/next-pwa
- Vercel Analytics & Speed Insights
- Google Analytics

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

# Analyze bundle size
npm run analyze

# Clean Next.js cache
npm run clean
```

**Note:** If hot reload is not working properly, see `DESENVOLVIMENTO.md` for troubleshooting steps. Common issues include PWA service worker cache and need to clear browser cache or use `npm run clean` before restarting the dev server.

## Architecture

### App Structure

The project uses Next.js 15's App Router with a minimal structure:

- `src/app/` - App Router pages and layouts
  - `layout.tsx` - Root layout with metadata, fonts (Poppins), and analytics integrations
  - `page.tsx` - Main landing page (single page with WhatsApp, Instagram, and location links)
  - `manifest.ts` - PWA manifest configuration
  - `robots.ts` - Robots.txt generation
  - `sitemap.ts` - Sitemap generation
  - `globals.css` - Global styles with Tailwind and DS imports

- `src/components/` - React components
  - `GoogleAnalytics.tsx` - Client-side GA4 integration component

### Design System Integration

The project uses `star-flicks-ds`, a custom design system package. Key integration points:

1. **Tailwind Configuration** (`tailwind.config.ts:8`)
   - Includes DS component paths in content array
   - Extends theme with DS color tokens using CSS variables (rgb format)
   - Custom landing page colors: `rose` (#C0C2BA), `button-primary` (#262721)

2. **Global Styles** (`src/app/globals.css:5-7`)
   - Imports DS token and font icon styles first
   - Overrides DS variables with project-specific values:
     - `--background`: #575D4B (olive green)
     - `--background-body`: #eeeeee (light gray)

3. **Components**
   - Uses `SFTypography` component from DS for all text elements
   - Icons from react-icons (FaWhatsapp, FaInstagram, FaMapMarkedAlt)

### Next.js Configuration

**next.config.ts** includes multiple plugins:

1. **PWA Plugin** (`withPWA`)
   - Disabled in development
   - Outputs to `/public` directory
   - Configured for manifest at `src/app/manifest.ts`

2. **Bundle Analyzer**
   - Enabled with `ANALYZE=true` environment variable
   - Run with `npm run analyze`

3. **Image Optimization**
   - Formats: AVIF and WebP
   - Remote pattern: `ugc.production.linktr.ee`
   - Custom device sizes and image sizes configured

4. **CSS Optimization**
   - `experimental.optimizeCss: true` enabled

### Path Aliases

TypeScript is configured with `@/*` alias pointing to `./src/*` (`tsconfig.json:22-23`)

### Analytics Stack

The application has three analytics integrations:

1. **Google Analytics** - Custom client component reading `NEXT_PUBLIC_GA_ID`
2. **Vercel Analytics** - `<Analytics />` in root layout
3. **Vercel Speed Insights** - `<SpeedInsights />` in root layout

All three are loaded in `src/app/layout.tsx:85-88`

### SEO Configuration

Comprehensive metadata configuration in `src/app/layout.tsx:16-75`:

- Dynamic metadataBase from `NEXT_PUBLIC_SITE_URL` env var
- OpenGraph and Twitter card meta tags
- Keywords: odontologia, dentista, Ellen Teixeira, estética dental, implantes, ortodontia
- Robots configuration with googleBot settings
- Placeholder for search console verification codes

### PWA Configuration

- Theme color: #575D4B (matches background)
- Background color: #eeeeee (matches background-body)
- Icons: 192x192 and 512x512 (maskable and any purpose)
- Display: standalone
- Orientation: portrait

## Environment Variables

See `.env.example` for required configuration:

- `NEXT_PUBLIC_SITE_URL` - Site base URL (required for metadata)
- `NEXT_PUBLIC_GA_ID` - Google Analytics measurement ID (optional)
- `VERCEL_ANALYTICS_ID` - Auto-configured on Vercel
- `VERCEL_SPEED_INSIGHTS_ID` - Auto-configured on Vercel
- Search engine verification codes (optional)

## Important Notes

- This is a **single-page landing page** - not a multi-page site
- The design uses a custom color scheme that overrides the DS defaults
- Font: Poppins (all weights, 100-900, normal and italic)
- Language: Portuguese (pt-BR)
- All external links open in new tabs with proper security attributes
- Custom rounded button design with nested divs for visual effect (rose background with button-primary text)
