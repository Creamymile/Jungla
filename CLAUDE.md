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

## API Routes

- `POST /api/contact` — validates name/email/message, sends notification + auto-reply via Resend
- `POST /api/invest-lead` — validates email/phone/country, sends notification + auto-reply via Resend

## Environment Variables

Stored in `.env.local` (never committed): `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `RESEND_API_KEY`, `CONTACT_EMAIL`, `NEXT_PUBLIC_SITE_URL`

## Build Phases (all complete)

- Phase 1: Shell — Nav, Footer, WhatsApp, UI components, folder structure, Sanity schemas
- Phase 2: Homepage (Hero, IntroSplit, ServicesGrid, WhyJungla, FeaturedProjects, Testimonials, LombokStrip, CtaBanner)
- Phase 3: Projects (FilterBar, ProjectCard, ProjectGrid, ImageGallery, ProjectDetail, listing + detail pages)
- Phase 4: Invest (InvestHero, InvestmentModel, OpportunityCard, LeadForm) & Bookings (BookingCard, BookingWidget, AdvantagesStrip)
- Phase 5: About (FounderStory, TeamGrid, ApproachSteps, ValuesSection) & Contact (ContactForm, CalendlyEmbed)
- Phase 6: API routes, SEO metadata, JSON-LD, sitemap, robots.txt
