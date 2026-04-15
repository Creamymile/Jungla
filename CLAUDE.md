# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Jungla — luxury villa construction & management company website (Lombok, Indonesia). Production-grade, multi-page site targeting international investors and high-end rental guests.

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint
```

## Tech Stack

- **Next.js 14** (App Router, `src/` dir, `@/*` import alias)
- **TypeScript** — `any` is allowed via ESLint config
- **Tailwind CSS** + CSS custom properties for design tokens
- **Sanity.io** — headless CMS (schemas in `src/sanity/schemaTypes/`)
- **Framer Motion** — scroll-triggered animations (always `'use client'`)
- **Fonts**: `next/font` — Libre Baskerville (serif) + DM Sans (sans)
- **lucide-react** for icons, **clsx** for class merging
- **react-hook-form** + **Zod** + **Resend** for forms/email

## Architecture

- **Server Components by default** — only add `'use client'` for interactivity (animations, forms, state)
- **Sanity data** fetched server-side via `src/lib/sanity.client.ts` with GROQ queries from `src/lib/sanity.queries.ts`
- **Root layout** (`src/app/layout.tsx`) wraps all pages with Nav + Footer + WhatsAppFloat
- **Pages** live under `src/app/` with App Router conventions (`page.tsx`, `[slug]/page.tsx`)
- **Components** organized by domain: `layout/`, `ui/`, `home/`, `projects/`, `invest/`, `bookings/`, `about/`, `contact/`
- **Types** centralized in `src/types/index.ts` — all Sanity document types defined there
- **API routes** at `src/app/api/contact/` and `src/app/api/invest-lead/`

## Design System

- **Black & Cream palette** — CSS vars in `globals.css`, Tailwind colors in `tailwind.config.ts`
- Primary: `--black: #080808`, `--cream: #f5f0e8`, `--white: #fefcf8`, `--muted: #8a8478`
- Nav height: `76px` (`--nav-height`), section padding: `120px 5.5vw`
- Grain texture overlay on `body::after` for luxury depth
- UI primitives: `Button` (cream/ghost/dark variants), `SectionLabel` (eyebrow with rule), `RevealWrapper` (scroll fade-in), `GoldRule`, `Marquee`

## Sanity Client Guard

`src/lib/sanity.client.ts` exports `isSanityConfigured` (boolean) and `client` (nullable). All pages check these before fetching — the site renders fully with placeholder data when Sanity credentials aren't set.

## SEO

- `metadataBase` set in root layout from `NEXT_PUBLIC_SITE_URL`
- Title template: `%s | Jungla` (set in root layout)
- JSON-LD: Organization schema on homepage, RealEstateListing on project detail, InvestmentOrDeposit on invest detail
- `sitemap.ts` generates static + dynamic (Sanity) routes at `/sitemap.xml`
- `robots.ts` allows all, disallows `/api/` and `/studio/`

## Site Config

`src/lib/site.config.ts` — single source of truth for brand contact details, social handles, and legal entity info. Update this file when the client provides real phone/email/Instagram values.

## API Routes

- `POST /api/contact` — validates name/email/message, honeypot check, rate-limited, sends via Resend
- `POST /api/invest-lead` — validates email/phone/country, honeypot check, rate-limited, sends via Resend
- `POST /api/booking-inquiry` — validates dates/guests/contact, honeypot check, rate-limited, sends inquiry + auto-reply
- `POST /api/revalidate?secret=` — Sanity webhook endpoint, calls `revalidateTag('sanity')` to flush ISR cache

## Caching Strategy

- All Sanity data is fetched via `sanityFetch()` which uses `next: { tags: ['sanity'], revalidate: 60 }`
- Pages use ISR (`export const revalidate = 60`) — most are statically prerendered at build time
- Dynamic routes (`/projects/[slug]`, `/invest/[slug]`) use `generateStaticParams` for build-time pre-rendering
- On-demand revalidation: Sanity webhook → `POST /api/revalidate` → `revalidateTag('sanity')` flushes all Sanity data

## Environment Variables

Stored in `.env.local` (never committed). See `.env.example` for the full list:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN`
- `SANITY_REVALIDATE_SECRET` (for webhook-based cache invalidation)
- `RESEND_API_KEY`, `CONTACT_EMAIL`
- `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (optional)
