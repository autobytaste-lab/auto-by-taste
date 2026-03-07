# Codebase Structure

**Analysis Date:** 2026-03-07

## Directory Layout

```
auto-by-taste/
├── index.html              # HTML entry point with Tailwind CDN, style definitions, React bootstrap
├── index.tsx               # React DOM mount point and StrictMode wrapper
├── App.tsx                 # Main app component orchestrating all sections
├── types.ts                # Shared TypeScript interfaces (ProductTier, FundingAllocation, NavItem)
├── package.json            # Dependencies: React, React-DOM, Recharts
├── tsconfig.json           # TypeScript compiler options with path aliases (@/*)
├── vite.config.ts          # Vite build config, React plugin, alias setup
├── index.css               # (empty or minimal - Tailwind CDN used instead)
├── components/             # All React presentation components
│   ├── Navbar.tsx          # Fixed navigation bar with scroll detection
│   ├── Hero.tsx            # Hero section with main value prop and CTA buttons
│   ├── ProblemSolution.tsx # Problem/solution two-column layout with embedded Card component
│   ├── TargetSegments.tsx  # 3-column grid of target market segments
│   ├── ProductTiers.tsx    # 3-column product pricing tiers with ProductTier typed data
│   ├── BusinessModel.tsx   # 4-column business model cards with recap section
│   ├── StrategySection.tsx # 2-column sales strategy with ROI comparison
│   ├── FundingSection.tsx  # Funding allocation with recharts PieChart
│   └── Footer.tsx          # Footer with links, contact info, social links
├── .planning/
│   ├── codebase/           # GSD codebase mapping documents
│   │   ├── ARCHITECTURE.md
│   │   ├── STRUCTURE.md
│   │   ├── CONVENTIONS.md
│   │   ├── TESTING.md
│   │   ├── STACK.md
│   │   ├── INTEGRATIONS.md
│   │   └── CONCERNS.md
│   └── [other GSD files]
└── node_modules/           # Installed dependencies (not committed)
```

## Directory Purposes

**Root Directory:**
- Purpose: Project configuration and entry points
- Contains: Configuration files (package.json, tsconfig.json, vite.config.ts) and HTML/React bootstrapping
- Key files: `index.html` (DOM root), `index.tsx` (React mount), `App.tsx` (component orchestration)

**components/:**
- Purpose: All React presentation components
- Contains: 9 section components following vertical feature slicing
- Key files: Navbar.tsx (header), Hero.tsx (hero section), ProblemSolution.tsx, ProductTiers.tsx, BusinessModel.tsx, StrategySection.tsx, FundingSection.tsx, TargetSegments.tsx, Footer.tsx
- Organization: One file per section/component (no subdirectories)

**node_modules/:**
- Purpose: Installed npm dependencies
- Contains: react, react-dom, recharts, vite, typescript, and devDependencies
- Generated: Yes (created by `npm install`)
- Committed: No (excluded via .gitignore)

**.planning/codebase/:**
- Purpose: GSD codebase analysis documents
- Contains: ARCHITECTURE.md, STRUCTURE.md, CONVENTIONS.md, TESTING.md, STACK.md, INTEGRATIONS.md, CONCERNS.md
- Generated: No (manually created by GSD agent)
- Committed: Yes (markdown documentation)

## Key File Locations

**Entry Points:**
- `index.html`: HTML shell with Tailwind CDN, style definitions, and React importmap
- `index.tsx`: React app mount point - creates root, verifies DOM element, renders App in StrictMode
- `App.tsx`: Main orchestration component - imports all 9 sections and arranges into layout with anchor-link navigation

**Configuration:**
- `package.json`: NPM dependencies (react, react-dom, recharts) and dev scripts (dev, build, preview)
- `tsconfig.json`: TS compiler options with @ path alias mapping to project root
- `vite.config.ts`: Vite build config with React plugin, env var injection, and path alias resolution
- `types.ts`: Shared TypeScript interfaces for ProductTier, FundingAllocation, NavItem

**Core Logic:**
- `components/Navbar.tsx`: Navigation with scroll-state detection (useState, useEffect)
- `components/Hero.tsx`: Hero section with decorative animations and CTA buttons
- `components/ProblemSolution.tsx`: Problem statement with local Card component and solution explanation
- `components/TargetSegments.tsx`: Market segmentation with 3 industry verticals
- `components/ProductTiers.tsx`: Product offering with 3 tiers (Basic/Pro/Enterprise) mapped from typed array
- `components/BusinessModel.tsx`: Revenue model covering Setup, Subscription, Training, Hardware-as-a-Service
- `components/StrategySection.tsx`: Go-to-market strategy with trial and ROI messaging
- `components/FundingSection.tsx`: Funding allocation visualized with recharts PieChart
- `components/Footer.tsx`: Footer with links and contact information

**Styling:**
- `index.html` `<style>` block: Custom CSS classes (.glass-card, .text-gradient, @keyframes float, .animate-float, .hologram-glow)
- Tailwind CSS: Loaded via CDN, utility-first styling throughout all components
- No dedicated CSS files (all styling via Tailwind + inline style props)

## Naming Conventions

**Files:**
- Components: PascalCase with .tsx extension (e.g., `Hero.tsx`, `ProductTiers.tsx`)
- Config files: lowercase with dots (e.g., `vite.config.ts`, `tsconfig.json`)
- Type file: `types.ts` (singular)

**Directories:**
- Components folder: lowercase plural (`components/`)
- Planning folder: hidden folder with dot prefix (`.planning/`)
- Codebase docs folder: `codebase/` (lowercase)

**React Components:**
- Export pattern: `export const ComponentName: React.FC = () => { ... }`
- Type annotation: Always use `React.FC` for functional components
- Props: Destructured in function signature when needed

**Variables and Functions:**
- camelCase for variables: `scrolled`, `setScrolled`, `tiers`, `data`
- camelCase for functions: `handleScroll`, `map()`, `filter()`
- Constants (arrays): camelCase (`segments`, `models`, `tiers`, `data`)

**CSS Classes:**
- Tailwind utilities: lowercase with hyphens (e.g., `flex`, `items-center`, `space-x-2`)
- Custom classes: lowercase with hyphens (e.g., `glass-card`, `text-gradient`, `animate-float`)
- Color tokens: Tailwind color names (e.g., `bg-blue-600`, `text-white`, `border-slate-400`)

**TypeScript Interfaces:**
- PascalCase: `ProductTier`, `FundingAllocation`, `NavItem`
- Property names: camelCase (e.g., `hardware`, `target`, `capability`, `color`)

## Where to Add New Code

**New Feature (e.g., new section):**
- Primary code: Create new file in `components/[SectionName].tsx` following component pattern
- Tests: Create `components/[SectionName].test.tsx` (if testing added in future)
- Type definitions: Add interface to `types.ts` if data-driven (export interface SectionData)
- Integration: Import in `App.tsx` and add `<section id="[anchor-id]"><[SectionName] /></section>`

**New Component (reusable sub-component):**
- Implementation: Create file in `components/` (e.g., `components/Button.tsx`, `components/Card.tsx`)
- Pattern: Follow functional component with `React.FC<Props>` typing
- Styling: Use Tailwind classes passed via props or default internal classes
- Example from codebase: Card component defined inline in `ProblemSolution.tsx` - consider extracting to separate file if reused

**Utilities/Helpers:**
- Shared helpers: Create `utils/` directory (does not exist yet)
- Type utilities: Add to `types.ts`
- API clients: Create `services/` directory (would be for future backend integration)

**Styling:**
- Global CSS: Add to `<style>` block in `index.html` (for reusable class definitions)
- Component-scoped: Use inline style props or Tailwind className strings
- Animations: Define @keyframes in `index.html` style block (e.g., `@keyframes float`)

**Configuration:**
- Build config: Update `vite.config.ts` (environment variables, plugin setup)
- Type config: Update `tsconfig.json` (compiler options, path aliases)
- Dependencies: Update `package.json` via `npm install [package]`

## Special Directories

**.planning/**
- Purpose: GSD (Go Smart Development) planning and codebase analysis documents
- Contents: Subdirectory `codebase/` containing ARCHITECTURE.md, STRUCTURE.md, CONVENTIONS.md, etc.
- Generated: No (created by GSD agents)
- Committed: Yes (markdown documentation)
- Access: For reference during development planning, not used at runtime

**.git/**
- Purpose: Version control repository metadata
- Generated: Yes (created by `git init`)
- Committed: No (Git metadata, not included in code)

**node_modules/**
- Purpose: Installed npm packages and dependencies
- Generated: Yes (created by `npm install`)
- Committed: No (excluded via .gitignore)

## Import Path Aliases

**Alias Definition:**
- `@/*` maps to project root (`/`)
- Configured in `tsconfig.json` under `compilerOptions.paths`
- Resolved in `vite.config.ts` via `resolve.alias` setup

**Usage Examples:**
- `import { ProductTier } from '@/types'` (instead of `../../types`)
- `import { Navbar } from '@/components/Navbar'` (instead of `../components/Navbar`)

**Note:** Currently minimal usage in codebase - components import types directly, but alias is available for future use

---

*Structure analysis: 2026-03-07*
