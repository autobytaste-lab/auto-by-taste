# Technology Stack

**Analysis Date:** 2026-03-07

## Languages

**Primary:**
- TypeScript ~5.8.2 - Frontend application code
- JSX/TSX - React component syntax

**Secondary:**
- HTML5 - Application markup via Vite
- CSS3 - Styling via Tailwind CSS CDN

## Runtime

**Environment:**
- Node.js (required for development; specified in README as prerequisite)

**Package Manager:**
- npm - Package management
- Lockfile: Not found (dependencies installed via package.json)

## Frameworks

**Core:**
- React 19.2.4 - UI framework for building components and pages
- React DOM 19.2.4 - DOM rendering for React applications

**Visualization:**
- Recharts 3.7.0 - Chart library for data visualization (pie charts in `components/FundingSection.tsx`)

**Build/Dev:**
- Vite 6.2.0 - Build tool and dev server
- @vitejs/plugin-react 5.0.0 - Vite plugin for React JSX transformation

## Key Dependencies

**Critical:**
- React 19.2.4 - Core UI library; required for all components
- React DOM 19.2.4 - Required for rendering React components to DOM

**Visualization:**
- Recharts 3.7.0 - Data visualization for charts; used in `components/FundingSection.tsx`

## Configuration

**Environment:**
- Configuration via `.env.local` file
- Key variable: `GEMINI_API_KEY` - exposed via Vite define plugin in `vite.config.ts`
- Vite loads environment variables with `loadEnv()` and injects them as `process.env.*`

**Build:**
- `vite.config.ts` - Main build configuration file
- TypeScript: `tsconfig.json` - Compiler options
- Target: ES2022
- Module: ESNext
- JSX: react-jsx
- Path alias: `@/*` maps to project root

**CSS:**
- Tailwind CSS 4 - Via CDN in `index.html` (`https://cdn.tailwindcss.com`)
- Google Fonts - Inter font family loaded in `index.html`

## Platform Requirements

**Development:**
- Node.js (required)
- npm package manager
- Vite dev server runs on `0.0.0.0:3000` by default

**Production:**
- Static site deployment compatible
- Built output: `dist/` directory (compiled from Vite build)
- Client-side rendering only (no backend required)

## Dev Scripts

```bash
npm run dev      # Start Vite development server
npm run build    # Build for production
npm run preview  # Preview production build locally
```

---

*Stack analysis: 2026-03-07*
