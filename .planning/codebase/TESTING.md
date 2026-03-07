# Testing Patterns

**Analysis Date:** 2026-03-07

## Test Framework

**Status:** Not Configured

**Runner:**
- No test runner detected (Jest, Vitest, Mocha not found)
- No test configuration files present
- No `*.test.ts`, `*.test.tsx`, `*.spec.ts`, `*.spec.tsx` files in codebase

**Assertion Library:**
- Not applicable - no testing framework configured

**Run Commands:**
No test scripts defined in `package.json`. Current scripts:
```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

## Test File Organization

**Location:**
- No test files exist in codebase
- No `/tests`, `/test`, `/__tests__` directories created

**Naming Convention:**
- Not established - no test files present

**Structure:**
- Not applicable

## Test Coverage

**Requirements:**
- No coverage requirements enforced
- No coverage configuration found

**View Coverage:**
- No coverage tools configured

## Current Testing Status

**What is Tested:**
- No automated tests present
- No unit tests for components
- No integration tests for component interactions
- No end-to-end tests configured

**Testing Strategy:**
- Manual testing only (suggested by presence of dev server via Vite)
- Development testing via browser dev tools and manual QA
- React.StrictMode enabled in `index.tsx` (line 13) to catch React-specific issues in development

## Recommended Testing Approach

**Test Framework Options:**
- **Vitest** (preferred): Pairs well with Vite build tool already in use
- **Jest with React Testing Library**: Industry standard with good React support

**Components That Should Have Tests:**
Based on codebase analysis, these components should be tested first:

1. **`Navbar.tsx`** - Complex scroll behavior
   - Scroll listener attachment/cleanup
   - Class name changes based on `scrolled` state
   - Link navigation functionality

2. **`Hero.tsx`** - Visual component with animations
   - Layout rendering
   - Image loading
   - Button functionality

3. **`ProductTiers.tsx`** - Data-driven component
   - Rendering of `tiers` array
   - Conditional styling based on index
   - Badge visibility for "popular" tier (idx === 1)

4. **`BusinessModel.tsx`** - Data mapping and conditional rendering
   - Rendering of `models` array
   - Icon display
   - Conditional class application

5. **`FundingSection.tsx`** - Chart integration
   - Recharts integration
   - Data visualization
   - Tooltip and legend rendering

## Existing Code That Supports Testing

**Modular Components:**
All components in `/components/` are self-contained and importable, making them easily testable:
- `Navbar.tsx`
- `Hero.tsx`
- `ProblemSolution.tsx`
- `TargetSegments.tsx`
- `ProductTiers.tsx`
- `BusinessModel.tsx`
- `StrategySection.tsx`
- `FundingSection.tsx`
- `Footer.tsx`

**Type Definitions:**
Shared types in `types.ts` provide testable interfaces:
```typescript
export interface ProductTier {
  name: string;
  hardware: string;
  target: string;
  capability: string;
  priceEstimate?: string;
}

export interface FundingAllocation {
  name: string;
  value: number;
  color: string;
}

export interface NavItem {
  label: string;
  href: string;
}
```

**Testable Patterns in Code:**

1. **Pure data arrays** (easily testable):
   - `ProductTiers.tsx`: `const tiers: ProductTier[]`
   - `BusinessModel.tsx`: `const models: [...array...]`
   - `TargetSegments.tsx`: `const segments: [...array...]`
   - `FundingSection.tsx`: `const data: FundingAllocation[]`

2. **React Hooks** (testable with @testing-library/react-hooks):
   - `Navbar.tsx` uses `useState` and `useEffect` for scroll behavior
   - Event listener setup and cleanup pattern (lines 7-13 in Navbar.tsx)

3. **Conditional Rendering** (testable with React Testing Library):
   - Ternary operators for class selection
   - Index-based conditionals (ProductTiers.tsx line 38)
   - Optional property rendering (types.ts shows `priceEstimate?: string`)

## Setup Path for Testing

**Step 1: Install Testing Dependencies**
```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom
```

**Step 2: Create vitest.config.ts**
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});
```

**Step 3: Create test/setup.ts**
```typescript
import '@testing-library/jest-dom';
```

**Step 4: Create First Test**
Location: `components/Navbar.test.tsx`

**Step 5: Update package.json**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

## Component-Specific Test Guidelines

**For Components with State (Navbar.tsx):**
- Test initial state
- Test event listener attachment
- Test state change on window scroll
- Test event listener cleanup on unmount

**For Data-Driven Components (ProductTiers.tsx, BusinessModel.tsx):**
- Test rendering of array items
- Test conditional styling based on item properties/index
- Test button rendering and click handlers

**For Chart Components (FundingSection.tsx):**
- Test Recharts component mounting
- Test data prop passed correctly
- Test colors applied to chart segments

**For Layout Components (Hero.tsx, Footer.tsx):**
- Test image sources
- Test link hrefs and targets
- Test responsive classes render correctly

## Testing Library Best Practices for This Codebase

**Query Priority:**
1. Prefer `screen.getByRole()` for accessible components
2. Use `screen.getByText()` for text content
3. Fallback to `screen.getByTestId()` only when necessary

**Component Isolation:**
- Render components independently without parent App wrapper when possible
- For interdependent components, use integration test approach

**Mocking Strategy:**
- Mock external images (currently loading from Vercel blob storage)
- Mock Recharts for chart component tests (or use actual Recharts)
- Mock window events (scroll, resize) using `vi.spyOn(window, 'addEventListener')`

**Example Test Pattern for Navbar.tsx:**
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  it('renders navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText('Tổng quan')).toBeInTheDocument();
  });

  it('adds class on scroll', () => {
    render(<Navbar />);
    const nav = screen.getByRole('navigation');

    fireEvent.scroll(window, { scrollY: 50 });
    // Assert class applied
  });
});
```

---

*Testing analysis: 2026-03-07*
