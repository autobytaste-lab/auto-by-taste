# Architecture

**Analysis Date:** 2026-03-07

## Pattern Overview

**Overall:** Component-based Single Page Application (SPA) with vertical feature slicing

**Key Characteristics:**
- React 19 with TypeScript for type safety
- Presentation-focused architecture with no backend/API logic
- Vite-based build system with hot module replacement
- Static asset-driven UI (image URLs, recharts visualizations)
- Tailwind CSS for styling with custom CSS overlays

## Layers

**Presentation Layer:**
- Purpose: Render UI components and handle user interactions
- Location: `components/` directory
- Contains: React functional components (`.tsx` files)
- Depends on: React, Tailwind CSS, recharts, types
- Used by: `App.tsx` orchestration layer

**Orchestration Layer:**
- Purpose: Compose and arrange presentation components into full page layout
- Location: `App.tsx`
- Contains: Main app component with section routing via anchor links
- Depends on: All component exports, React
- Used by: `index.tsx` entry point

**Entry Point Layer:**
- Purpose: Mount React application to DOM and initialize runtime
- Location: `index.tsx`
- Contains: ReactDOM root creation with StrictMode
- Depends on: React, ReactDOM, App
- Used by: `index.html` (SPA bootstrap)

**Type Definition Layer:**
- Purpose: Define shared TypeScript interfaces across components
- Location: `types.ts`
- Contains: ProductTier, FundingAllocation, NavItem interfaces
- Depends on: None (pure type definitions)
- Used by: ProductTiers.tsx, FundingSection.tsx, Navbar.tsx

**Build/Config Layer:**
- Purpose: Configure development and build tooling
- Location: `vite.config.ts`, `tsconfig.json`, `package.json`
- Contains: Vite plugin setup, TypeScript compiler options, dependency declarations
- Depends on: Vite, React plugin, TypeScript
- Used by: Development and build processes

## Data Flow

**Page Load Flow:**

1. Browser requests `index.html`
2. HTML loads Tailwind CDN, Inter font, imports React via importmap (esm.sh)
3. `index.tsx` mounts React app to `#root` element
4. `App.tsx` renders navigation and 9 section components in sequence
5. Components render static content with inline styles and CSS classes
6. FundingSection uses recharts for interactive pie chart visualization

**Section Navigation Flow:**

- User clicks navbar anchor links (href="#section-id")
- Browser handles native anchor navigation (no JavaScript routing)
- Navbar.tsx detects scroll position and changes styling via useState + scroll listener
- Each section renders independently; no inter-component state sharing

**Static Content Pattern:**

- All content is hardcoded in components (no data fetching)
- Images sourced from external CDN: `umxxfeuo5ed9xpid.public.blob.vercel-storage.com`
- Zalo contact link: `https://zalo.me/0337776435`
- WhatsApp link: `https://wa.me/84337776435`

**State Management:**

- Minimal local state: only Navbar tracks scroll position via `useState`
- No global state management (Redux, Zustand, Context) needed
- No async operations or side effects beyond scroll listener

## Key Abstractions

**Component Pattern:**
- Purpose: Reusable presentation units following React functional component convention
- Examples: `Hero.tsx`, `ProblemSolution.tsx`, `BusinessModel.tsx`
- Pattern: Named exports of `React.FC` components with inline styles and Tailwind classes

**Card Component (Local):**
- Purpose: Reusable card layout with problem/solution theming
- Examples: Defined inside `ProblemSolution.tsx` for 2-card grid
- Pattern: Local functional component with typed props (title, description, icon, isProblem)

**Data-Driven Rendering:**
- Purpose: Render lists from typed data arrays
- Examples:
  - `ProductTiers.tsx` maps over `tiers: ProductTier[]`
  - `FundingSection.tsx` maps over `data: FundingAllocation[]`
  - `BusinessModel.tsx` maps over `models` array
  - `TargetSegments.tsx` maps over `segments` array
- Pattern: Define data inline, iterate with `.map()`, apply conditional styling

**Glass Morphism UI:**
- Purpose: Aesthetic effect for cards and containers
- Implementation: CSS class `.glass-card` with `background: rgba(255, 255, 255, 0.03)` and `backdrop-filter: blur(10px)`
- Location: Defined in `index.html` `<style>` tag
- Usage: Applied via className on div containers throughout components

**Gradient Text:**
- Purpose: Highlight key phrases with visual emphasis
- Implementation: CSS class `.text-gradient` with background-clip: text
- Location: Defined in `index.html` `<style>` tag
- Usage: `<span className="text-gradient">AI Local Agent.</span>`

**Animation Patterns:**
- Purpose: Add motion to decorative and UI elements
- Examples:
  - `@keyframes float` for floating cards in Hero section
  - `animate-pulse` on status indicator dots
  - `hover:scale-105` and `transition-transform` on hover states
- Location: CSS defined in `index.html` or inline Tailwind classes

## Entry Points

**HTML Entry Point:**
- Location: `index.html`
- Triggers: Browser page load
- Responsibilities:
  - Define DOM root element (`<div id="root"></div>`)
  - Load Tailwind CSS via CDN
  - Load custom CSS class definitions (.glass-card, .text-gradient, @keyframes)
  - Import React libraries via importmap for esm.sh
  - Bootstrap React app via `<script type="module" src="/index.tsx"></script>`

**React Entry Point:**
- Location: `index.tsx`
- Triggers: Browser script module execution
- Responsibilities:
  - Import App component
  - Verify root element exists (error handling)
  - Create ReactDOM root
  - Render App within StrictMode for development checks

**App Component:**
- Location: `App.tsx`
- Triggers: React bootstrap
- Responsibilities:
  - Import all 9 section components
  - Arrange them in semantic `<section>` tags with `id` attributes matching navbar links
  - Provide main layout structure (flex column, min-h-screen)
  - Render floating Zalo action button (fixed position)

## Error Handling

**Strategy:** Minimal error handling - landing page with no critical dependencies

**Patterns:**
- Root element verification: `if (!rootElement) throw new Error(...)` in `index.tsx`
- External image failures: Graceful fallback via native browser image error handling
- External link failures: Navigation handled by browser (Zalo, WhatsApp links)

## Cross-Cutting Concerns

**Styling:** Tailwind CSS utility-first approach with custom class overlays in index.html

**Responsive Design:** Mobile-first with Tailwind breakpoints (sm, md, lg)
- Example: `hidden md:flex` (hide on mobile, show on tablet+)
- Example: `flex-col sm:flex-row` (stack on mobile, row on small screens+)
- Example: Text sizes: `text-5xl lg:text-8xl` (scale with viewport)

**Internationalization:** Vietnamese language content hardcoded throughout
- Navbar labels in Vietnamese
- All section headings and copy in Vietnamese
- Button labels in Vietnamese

**Accessibility:**
- Semantic HTML structure with `<section>`, `<nav>`, `<footer>`, `<main>`
- Link attributes: `target="_blank" rel="noopener noreferrer"` for external links
- Alt text on images: `alt="AI Local Hub Agent on Macmini M4"`
- Limited ARIA annotations (landing page focus over accessibility depth)

**Performance:**
- Image optimization: External CDN images (Vercel blob storage)
- Code splitting: Not used (landing page size is small)
- Lazy loading: Not implemented (no offscreen content)
- Bundle optimization: Vite handles automatic splitting on build

---

*Architecture analysis: 2026-03-07*
