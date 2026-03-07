# Coding Conventions

**Analysis Date:** 2026-03-07

## Naming Patterns

**Files:**
- PascalCase for React components: `Navbar.tsx`, `Hero.tsx`, `ProductTiers.tsx`, `BusinessModel.tsx`
- camelCase for utility files and configuration: `index.tsx`, `vite.config.ts`, `types.ts`
- All source files use `.tsx` extension for React components, `.ts` for pure TypeScript

**Functions:**
- Arrow functions preferred for React functional components
- Components exported as named exports with PascalCase names: `export const Navbar: React.FC = () => {}`
- Event handlers use camelCase with `handle` prefix: `handleScroll`, `handleChange`
- Exported utility/callback functions use camelCase

**Variables:**
- State variables use camelCase: `scrolled`, `setScrolled`
- Constants and data arrays use camelCase: `tiers`, `models`, `segments`, `data`
- Inline object keys use camelCase: `name`, `hardware`, `target`, `capability`, `priceEstimate`, `color`, `value`

**Types & Interfaces:**
- PascalCase for all type definitions: `ProductTier`, `FundingAllocation`, `NavItem`
- Interfaces use `export interface` pattern for shared types in `types.ts`
- Type annotations use React.FC for functional component type definition

## Code Style

**Formatting:**
- No explicit linting configuration (no .eslintrc, .prettierrc files found)
- Consistent use of 2-space indentation throughout
- String quotes: Single quotes preferred in code (`import`, exports), double quotes in JSX attributes
- Component functions typically 40-75 lines with clear section separation

**Linting:**
- No linter configured (no ESLint, Biome, or StyleLint detected)
- Manual adherence to conventions observed
- No automated code formatting tool configured

**TypeScript Configuration:**
- Target: ES2022
- Module: ESNext
- Strict mode features enabled: `isolatedModules: true`, `allowImportingTsExtensions: true`
- JSX handled with React 19 jsx runtime

## Import Organization

**Order:**
1. External libraries (React, react-dom, chart libraries)
2. Local type imports
3. Local component imports (relative paths)
4. CSS imports (if applicable)

**Path Aliases:**
- `@/*` alias configured in `tsconfig.json` to reference root-level files
- Used inconsistently: `ProductTiers.tsx` uses relative `../types`, not `@/types`
- Import example: `import { ProductTier } from '../types'`

**Import Examples from codebase:**
```typescript
// App.tsx style - component imports
import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';

// ProductTiers.tsx style - type imports
import React from 'react';
import { ProductTier } from '../types';

// FundingSection.tsx style - library + type imports
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { FundingAllocation } from '../types';
```

## Error Handling

**Patterns:**
- Root element validation in `index.tsx`: explicit error throw if root DOM element not found
  ```typescript
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error("Could not find root element to mount to");
  }
  ```
- No try-catch blocks observed in components
- React StrictMode enabled at root level for development warnings
- No explicit error boundaries implemented

## Logging

**Framework:** Native `console` API (JavaScript standard)

**Patterns:**
- No observable console.log, console.error, or console.warn statements in production code
- React.StrictMode wraps app to catch issues in development
- Reliance on browser dev tools for debugging

## Comments

**When to Comment:**
- Comments are minimal throughout codebase
- Comments used to clarify component sections with comment tags:
  ```typescript
  {/* Floating Action Button for Zalo/Contact */}
  {/* Dynamic Background Elements */}
  {/* Floating UI Decorative Elements (resembling the image) */}
  {/* Updated Hero Image Container with Holographic Pedestal Look */}
  {/* Visual overlay for "Pedestal" feel */}
  ```
- Comments typically precede complex visual/styling sections
- No JSDoc/TSDoc comments found in codebase

**JSDoc/TSDoc:**
- Not used in codebase
- No function documentation comments
- No parameter documentation observed

## Function Design

**Size:**
- Components typically 40-75 lines
- Largest component (FundingSection.tsx) is 73 lines
- Inline subcomponents used for repeated patterns: `Card` in `ProblemSolution.tsx` (lines 4-12)

**Parameters:**
- React.FC functional component pattern: no explicit props parameter in signature
- Component props passed directly in type definition: `React.FC<{ title: string; description: string; icon: string; isProblem?: boolean }>`
- Event handlers inline or imported via closure
- Maps over data arrays without extracting separate iterator functions

**Return Values:**
- All components return JSX.Element
- Single root JSX wrapper per component (div, section, footer, nav)
- Conditional rendering with ternary operators: `{idx === 1 ? 'bg-blue-600/10 border-2 border-blue-500/50' : 'glass-card'}`
- Array mapping returns single JSX element per iteration: `.map((item, i) => (<div key={i}>...</div>))`

**Example pattern from ProductTiers.tsx (lines 26-45):**
```typescript
export const ProductTiers: React.FC = () => {
  return (
    <div className="py-24 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">Các Gói Giải Pháp</h2>
          <p className="text-slate-400">Thiết kế linh hoạt theo nhu cầu quy mô của mọi khách hàng.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <div key={idx} className={`relative p-8 rounded-[2.5rem] flex flex-col ${idx === 1 ? 'bg-blue-600/10 border-2 border-blue-500/50' : 'glass-card'}`}>
              {/* content */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
```

## Module Design

**Exports:**
- Named exports preferred: `export const ComponentName: React.FC = () => {}`
- Default export in `App.tsx`: `export default App;`
- Type exports in dedicated `types.ts`: `export interface ComponentName { ... }`
- No barrel files (index.ts files) used for re-exports

**Barrel Files:**
- Not used in this codebase
- Components imported directly from component files
- Types imported directly from `types.ts`

## Styling Patterns

**Approach:** Tailwind CSS via CDN (in index.html) with inline class definitions

**Key Classes Observed:**
- Responsive design: `hidden md:flex`, `lg:grid-cols-3`, `w-full sm:w-auto`
- Color system: `bg-blue-600`, `text-slate-400`, `border-white/5`
- Opacity modifiers: `bg-blue-500/10`, `hover:bg-blue-600/20`, `text-white/10`
- Custom utilities defined in `index.html`:
  - `.glass-card`: glassmorphic effect with backdrop blur
  - `.text-gradient`: gradient text effect
  - `.animate-float`: floating animation
  - `.hologram-glow`: glow shadow effect

**CSS-in-JS:** None used; all styling via Tailwind utility classes

## Common Patterns

**Component Structure:**
Most components follow this pattern:
1. Container div with padding/background
2. Centered content wrapper with max-width
3. Title section with heading and description
4. Content grid (flex or grid layout)
5. Optional footer/action buttons

**Data Management:**
- Local constant arrays defined at module level
- No state management beyond local React hooks (useState, useEffect)
- Example in `ProductTiers.tsx`: constant `tiers` array at top, mapped in JSX

**Hook Usage:**
- Only standard React hooks observed: `useState`, `useEffect`
- Example in `Navbar.tsx` (lines 7-13):
  ```typescript
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  ```

**Conditional Rendering:**
- Inline ternary operators: `{condition ? 'classA' : 'classB'}`
- Logical AND for conditionals: `{showElement && <div>content</div>}`
- Array indexing for conditional styling: `{idx === 1 ? 'featured' : 'normal'}`

---

*Convention analysis: 2026-03-07*
